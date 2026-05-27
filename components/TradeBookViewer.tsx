"use client";

import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";

const PAGE_W   = 900;
const PRELOAD  = 4;
const ARROW_PAD = 144; // 72px each side

// ── Sub-components ─────────────────────────────────────────────────────────────

const PDFPage = forwardRef<
  HTMLDivElement,
  { pageNum: number; pdf: any; pageH: number; shouldRender: boolean }
>(({ pageNum, pdf, pageH, shouldRender }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const taskRef   = useRef<{ cancel: () => void } | null>(null);

  useEffect(() => {
    if (!shouldRender || !pdf || !canvasRef.current) return;
    taskRef.current?.cancel();
    let active = true;

    pdf.getPage(pageNum).then((page: any) => {
      if (!active || !canvasRef.current) return;
      const baseVp = page.getViewport({ scale: 1 });
      const vp     = page.getViewport({ scale: PAGE_W / baseVp.width });
      const canvas = canvasRef.current;
      const ctx    = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width  = Math.round(vp.width);
      canvas.height = Math.round(vp.height);
      const task = page.render({ canvasContext: ctx, viewport: vp });
      taskRef.current = task;
      task.promise.catch(() => {});
    });

    return () => { active = false; taskRef.current?.cancel(); taskRef.current = null; };
  }, [shouldRender, pdf, pageNum]);

  return (
    <div ref={ref} style={{ width: PAGE_W, height: pageH }} className="overflow-hidden bg-white">
      {shouldRender
        ? <canvas ref={canvasRef} className="block w-full" />
        : <div className="w-full h-full bg-[#e4e8ed] animate-pulse" />}
    </div>
  );
});
PDFPage.displayName = "PDFPage";

const BlankPage = forwardRef<HTMLDivElement, { pageH: number }>(({ pageH }, ref) => (
  <div ref={ref} style={{ width: PAGE_W, height: pageH }} className="bg-white" />
));
BlankPage.displayName = "BlankPage";

// ── Flip sound ─────────────────────────────────────────────────────────────────

function playFlipSound(ctxRef: React.MutableRefObject<AudioContext | null>) {
  try {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    const dur = 0.11;
    const n   = Math.round(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const d   = buf.getChannelData(0);
    for (let i = 0; i < n; i++) {
      const t = i / n;
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 1.8) * (1 - Math.pow(1 - Math.min(t * 8, 1), 2));
    }
    const src   = ctx.createBufferSource();
    src.buffer  = buf;
    const bp    = ctx.createBiquadFilter();
    bp.type     = "bandpass"; bp.frequency.value = 1400; bp.Q.value = 0.6;
    const shelf = ctx.createBiquadFilter();
    shelf.type  = "highshelf"; shelf.frequency.value = 3000; shelf.gain.value = 6;
    const gain  = ctx.createGain();
    gain.gain.setValueAtTime(0.22, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    src.connect(bp); bp.connect(shelf); shelf.connect(gain); gain.connect(ctx.destination);
    src.start();
  } catch { /* silently skip */ }
}

// ── Icons ──────────────────────────────────────────────────────────────────────

const ChevL    = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>;
const ChevR    = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>;
const IcoPrint = () => <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>;
const IcoDl    = () => <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const IcoShare = () => <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
const IcoView  = () => <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;

type BookRef = { pageFlip: () => { flipNext: () => void; flipPrev: () => void } };

export interface TradeBookViewerProps {
  src:   string;
  title: string;
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function TradeBookViewer({ src, title }: TradeBookViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef      = useRef<BookRef>(null);
  const audioCtxRef  = useRef<AudioContext | null>(null);

  const [pdf,         setPdf        ] = useState<any>(null);
  const [numPages,    setNumPages   ] = useState(0);
  const [pageH,       setPageH      ] = useState(Math.round(PAGE_W * Math.SQRT2));
  const [status,      setStatus     ] = useState<"loading" | "ready" | "error">("loading");
  const [currentPage, setCurrentPage] = useState(0);
  const [rendered,    setRendered   ] = useState<Set<number>>(new Set([1, 2, 3, 4]));
  const [scale,       setScale      ] = useState(0);
  const [isMobile,    setIsMobile   ] = useState(false);
  const [copied,      setCopied     ] = useState(false);
  // isFlipping: instantly expand to full double-width before the animation
  // so the turning page is never clipped by the single-col container.
  const [isFlipping,  setIsFlipping ] = useState(false);

  // ── Load PDF ────────────────────────────────────────────────────────────────

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const doc   = await pdfjs.getDocument(src).promise;
        if (cancelled) return;
        const first = await doc.getPage(1);
        const vp    = first.getViewport({ scale: 1 });
        setPdf(doc);
        setNumPages(doc.numPages);
        setPageH(Math.round(PAGE_W * (vp.height / vp.width)));
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => { cancelled = true; };
  }, [src]);

  // ── Responsive scale ────────────────────────────────────────────────────────
  // containerRef is always mounted so this fires even during loading.

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const cw     = containerRef.current.offsetWidth;
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      const available = Math.max(cw - ARROW_PAD, 100);
      setScale(available / (mobile ? PAGE_W : PAGE_W * 2));
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", update);
    return () => { ro.disconnect(); window.removeEventListener("resize", update); };
  }, []);

  // ── Page list ───────────────────────────────────────────────────────────────
  // Odd page count: insert blank before the last page so the back cover stays last.

  const pages = useMemo<(number | null)[]>(() => {
    if (status !== "ready" || numPages === 0) return [];
    const arr: (number | null)[] = Array.from({ length: numPages }, (_, i) => i + 1);
    if (!isMobile && numPages % 2 !== 0) arr.splice(arr.length - 1, 0, null);
    return arr;
  }, [status, numPages, isMobile]);

  // ── Callbacks ───────────────────────────────────────────────────────────────

  const expandRendered = useCallback((center: number) => {
    setRendered(prev => {
      const next = new Set(prev);
      for (let i = Math.max(1, center - PRELOAD); i <= Math.min(numPages, center + PRELOAD); i++)
        next.add(i);
      return next;
    });
  }, [numPages]);

  const onFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
    expandRendered(e.data + 1);
    playFlipSound(audioCtxRef);
    setIsFlipping(false);
  }, [expandRendered]);

  const flipNext = () => { setIsFlipping(true); bookRef.current?.pageFlip().flipNext(); };
  const flipPrev = () => { setIsFlipping(true); bookRef.current?.pageFlip().flipPrev(); };

  // ── Actions ─────────────────────────────────────────────────────────────────

  const handlePrint    = () => { const w = window.open(src); if (w) w.onload = () => w.print(); };
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = src; a.download = title.toLowerCase().replace(/\s+/g, "-") + ".pdf";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) { await navigator.share({ title, url }).catch(() => {}); }
    else { await navigator.clipboard.writeText(url).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2500); }
  };
  const handleView = () => window.open(src, "_blank");

  // ── Geometry ────────────────────────────────────────────────────────────────
  //
  // react-pageflip with showCover renders the front cover in the RIGHT panel
  // and the back cover in the LEFT panel of the double-page canvas.
  // We clip the outer container to one page width and shift the inner content
  // so only the relevant half is visible:
  //   cover → clip right half:  innerOffset = -PAGE_W * scale
  //   back  → clip left half:   innerOffset = 0
  //   spread → full width, no clip
  //
  // While isFlipping: expand instantly to full width so the animation is
  // never clipped. After onFlip fires, contract smoothly via CSS transition.

  const isOnCover = currentPage === 0;
  const isOnBack  = pages.length > 0 && currentPage >= pages.length - 1;
  const oneCol    = !isMobile && !isFlipping && (isOnCover || isOnBack);

  const displayNatW    = oneCol ? PAGE_W : PAGE_W * 2;
  const innerOffsetNat = (oneCol && isOnCover) ? -PAGE_W : 0;
  const displayW       = displayNatW    * scale;
  const displayH       = pageH          * scale;
  const innerOffset    = innerOffsetNat * scale;

  const isFirst    = currentPage === 0;
  const isLast     = pages.length > 0 && currentPage >= pages.length - (isMobile ? 1 : 2);
  const dispL      = currentPage + 1;
  const dispR      = currentPage + 2;
  const showRange  = !isMobile && !oneCol && dispR <= pages.length;

  return (
    <div ref={containerRef} className="w-full select-none">

      {status === "loading" && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <div className="w-9 h-9 border-[3px] border-[#112942]/15 border-t-[#112942]/60 rounded-full animate-spin" />
          <p className="text-sm text-[#112942]/40">Loading…</p>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center justify-center py-32">
          <p className="text-sm text-red-400">Failed to load PDF.</p>
        </div>
      )}

      {status === "ready" && scale > 0 && (
        <>
          <div className="relative flex items-center justify-center py-10 px-[72px]">

            <button onClick={flipPrev} disabled={isFirst} aria-label="Previous page"
              className="absolute left-0 w-14 h-14 rounded-full
                         bg-[#112942]/6 hover:bg-[#112942]/14 border border-[#112942]/10
                         flex items-center justify-center text-[#112942]
                         disabled:opacity-15 transition-all cursor-pointer">
              <ChevL />
            </button>

            {/* Outer clip — no transition while expanding, smooth while contracting */}
            <div style={{
              width:      displayW,
              height:     displayH,
              overflow:   "hidden",
              transition: isFlipping ? "none" : "width 0.4s ease",
            }}>
              {/* Inner translate */}
              <div style={{
                transform:  `translateX(${innerOffset}px)`,
                transition: isFlipping ? "none" : "transform 0.4s ease",
              }}>
                {/* Scale */}
                <div style={{
                  transform:       `scale(${scale})`,
                  transformOrigin: "top left",
                  width:           PAGE_W * 2,
                  position:        "relative",
                }}>
                  <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    boxShadow: "0 28px 90px rgba(17,41,66,0.2), 0 6px 22px rgba(17,41,66,0.12)",
                  }} />
                  <HTMLFlipBook
                    key={`${src}-${pageH}-${isMobile ? "m" : "d"}`}
                    ref={bookRef}
                    width={PAGE_W}    height={pageH}
                    size="fixed"
                    minWidth={PAGE_W} maxWidth={PAGE_W}
                    minHeight={pageH} maxHeight={pageH}
                    startPage={0}
                    drawShadow        flippingTime={700}
                    usePortrait={isMobile}
                    startZIndex={0}   autoSize={false}
                    maxShadowOpacity={0.55}
                    showCover={true}
                    mobileScrollSupport clickEventForward
                    useMouseEvents    swipeDistance={28}
                    showPageCorners   disableFlipByClick={false}
                    onFlip={onFlip}   className="" style={{}}
                  >
                    {pages.map((n, i) =>
                      n === null
                        ? <BlankPage key={`blank-${i}`} pageH={pageH} />
                        : <PDFPage   key={n} pageNum={n} pdf={pdf} pageH={pageH} shouldRender={rendered.has(n)} />
                    )}
                  </HTMLFlipBook>
                </div>
              </div>
            </div>

            <button onClick={flipNext} disabled={isLast} aria-label="Next page"
              className="absolute right-0 w-14 h-14 rounded-full
                         bg-[#112942]/6 hover:bg-[#112942]/14 border border-[#112942]/10
                         flex items-center justify-center text-[#112942]
                         disabled:opacity-15 transition-all cursor-pointer">
              <ChevR />
            </button>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between px-2 py-2.5 border-t border-[#112942]/8">
            <span className="text-xs tabular-nums text-[#112942]/45 min-w-[90px]">
              {showRange ? `${dispL} – ${dispR} of ${numPages}` : `${dispL} of ${numPages}`}
            </span>
            <span className="hidden md:hidden text-xs text-[#112942]/55 font-medium tracking-wide truncate px-4">
              {title}
            </span>
            <div className="flex items-center gap-0.5">
              {[
                { label: "Print",    icon: <IcoPrint />, action: handlePrint    },
                { label: "Download", icon: <IcoDl    />, action: handleDownload },
                { label: copied ? "Copied!" : "Share", icon: <IcoShare />, action: handleShare },
                { label: "View",     icon: <IcoView  />, action: handleView     },
              ].map(({ label, icon, action }) => (
                <button key={label} onClick={action} title={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded
                             text-[#112942]/55 hover:text-[#112942] hover:bg-[#112942]/6
                             transition-colors cursor-pointer text-xs">
                  {icon}
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
