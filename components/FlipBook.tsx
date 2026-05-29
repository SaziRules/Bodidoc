"use client";

import { useCallback, useEffect, useRef, useState, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";

const PAGE_W = 550;
const PAGE_H = 733;
const PRELOAD = 3;

// ─── PDF page ─────────────────────────────────────────────────────────────────

interface PageProps {
  pageNum: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pdf: any | null;
  shouldRender: boolean;
}

const PDFPage = forwardRef<HTMLDivElement, PageProps>(
  ({ pageNum, pdf, shouldRender }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const renderTaskRef = useRef<{ cancel: () => void; promise: Promise<void> } | null>(null);

    useEffect(() => {
      if (!shouldRender || !pdf || !canvasRef.current) return;

      renderTaskRef.current?.cancel();
      renderTaskRef.current = null;
      let active = true;

      pdf.getPage(pageNum).then((page: any) => {
        if (!active || !canvasRef.current) return;
        const baseVp = page.getViewport({ scale: 1 });
        const vp = page.getViewport({ scale: PAGE_W / baseVp.width });
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = Math.round(vp.width);
        canvas.height = Math.round(vp.height);
        const task = page.render({ canvasContext: ctx, viewport: vp });
        renderTaskRef.current = task;
        task.promise.catch(() => {});
      });

      return () => {
        active = false;
        renderTaskRef.current?.cancel();
        renderTaskRef.current = null;
      };
    }, [shouldRender, pdf, pageNum]);

    return (
      <div ref={ref} className="overflow-hidden bg-white" style={{ width: PAGE_W, height: PAGE_H }}>
        {shouldRender ? (
          <canvas ref={canvasRef} className="block w-full" />
        ) : (
          <div className="w-full h-full bg-[#e8e8e8] animate-pulse" />
        )}
      </div>
    );
  }
);
PDFPage.displayName = "PDFPage";

const BlankPage = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="bg-white" style={{ width: PAGE_W, height: PAGE_H }} />
));
BlankPage.displayName = "BlankPage";

// ─── Flip sound ───────────────────────────────────────────────────────────────

function playFlipSound(ctxRef: React.MutableRefObject<AudioContext | null>) {
  try {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume();

    const dur = 0.11;
    const n = Math.round(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < n; i++) {
      const t = i / n;
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 1.8) * (1 - Math.pow(1 - Math.min(t * 8, 1), 2));
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass"; bp.frequency.value = 1400; bp.Q.value = 0.6;
    const shelf = ctx.createBiquadFilter();
    shelf.type = "highshelf"; shelf.frequency.value = 3000; shelf.gain.value = 6;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.22, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    src.connect(bp); bp.connect(shelf); shelf.connect(gain); gain.connect(ctx.destination);
    src.start();
  } catch { /* silently skip */ }
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconClose = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconChevLeft = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconChevRight = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IconSpread = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="9" height="16" rx="1" /><rect x="13" y="4" width="9" height="16" rx="1" />
  </svg>
);
const IconSingle = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="6" y="4" width="12" height="16" rx="1" />
  </svg>
);
const IconZoomIn = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);
const IconFullscreen = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);
const IconShare = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

// ─── Ref type ─────────────────────────────────────────────────────────────────

type BookRef = {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    getCurrentPageIndex: () => number;
  };
};

// ─── FlipBook modal ───────────────────────────────────────────────────────────

interface FlipBookProps {
  onClose: () => void;
}

export default function FlipBook({ onClose }: FlipBookProps) {
  const bookRef = useRef<BookRef>(null);
  const bookAreaRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [pdf, setPdf] = useState<any>(null);
  const [numPages, setNumPages] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [currentPage, setCurrentPage] = useState(0);
  const [rendered, setRendered] = useState<Set<number>>(new Set([1, 2, 3, 4]));
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  // Load PDF
  useEffect(() => {
    import("pdfjs-dist").then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      return pdfjs.getDocument("/docs/trade-book.pdf").promise;
    }).then((doc) => {
      setPdf(doc);
      setNumPages(doc.numPages);
      setStatus("ready");
    }).catch(() => setStatus("error"));
  }, []);

  // Responsive scale
  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      const areaW = bookAreaRef.current?.offsetWidth ?? window.innerWidth;
      const areaH = bookAreaRef.current?.offsetHeight ?? window.innerHeight;
      const available = areaW - (mobile ? 32 : 140);
      const scaleW = available / (PAGE_W * 2);
      const scaleH = (areaH - 16) / PAGE_H;
      setScale(Math.min(1, scaleW, scaleH));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Keyboard nav + Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") bookRef.current?.pageFlip().flipPrev();
      if (e.key === "ArrowRight") bookRef.current?.pageFlip().flipNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Cleanup AudioContext
  useEffect(() => () => { audioCtxRef.current?.close(); }, []);

  const expandRendered = useCallback((center: number) => {
    setRendered((prev) => {
      const next = new Set(prev);
      for (let i = Math.max(1, center - PRELOAD); i <= Math.min(numPages, center + PRELOAD); i++) next.add(i);
      return next;
    });
  }, [numPages]);

  const onFlip = useCallback((e: any) => {
    const idx: number = e.data;
    setCurrentPage(idx);
    expandRendered(idx + 1);
    playFlipSound(audioCtxRef);
    setIsFlipping(false);
  }, [expandRendered]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // ── Shared loading/error shell ─────────────────────────────────────────────

  if (status === "loading" || status === "error") {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center gap-4">
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer">
          <IconClose />
        </button>
        {status === "loading" ? (
          <>
            <div className="w-10 h-10 border-[3px] border-white/30 border-t-white/80 rounded-full animate-spin" />
            <p className="font-sans text-sm text-white/40">Loading trade book…</p>
          </>
        ) : (
          <p className="font-sans text-sm text-red-400">Could not load the trade book PDF.</p>
        )}
      </div>
    );
  }

  // ── Book ──────────────────────────────────────────────────────────────────

  const pages: (number | null)[] = Array.from({ length: numPages }, (_, i) => i + 1);
  if (numPages % 2 !== 0) pages.push(null);

  const bookTotalW = PAGE_W * 2;
  const isFirst = currentPage === 0;
  const isLast  = currentPage >= numPages - 2;
  const displayL = currentPage + 1;
  const displayR = currentPage + 2;

  // Cover and back page: clip the double-width canvas to show only the
  // relevant half, mirroring TradeBookViewer's oneCol logic.
  const isOnCover = currentPage === 0;
  const isOnBack  = pages.length > 0 && currentPage >= pages.length - 1;
  const oneCol    = !isFlipping && (isOnCover || isOnBack);

  const displayNatW    = oneCol ? PAGE_W : PAGE_W * 2;
  const innerOffsetNat = oneCol && isOnCover ? -PAGE_W : 0;
  const displayW       = displayNatW    * scale;
  const displayH       = PAGE_H         * scale;
  const innerOffset    = innerOffsetNat * scale;

  const flipPrev = () => { setIsFlipping(true); bookRef.current?.pageFlip().flipPrev(); };
  const flipNext = () => { setIsFlipping(true); bookRef.current?.pageFlip().flipNext(); };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/85 select-none" style={{ backdropFilter: "blur(4px)" }}>

      {/* ── Top bar ── */}
      <div className="shrink-0 flex items-center justify-between px-5 md:px-8 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          {/* tiny bodidoc logo */}
          <img src="/images/logo.webp" alt="bodidoc" className="h-5 brightness-0 invert opacity-70" />
          <span className="font-sans text-white/30 text-xs hidden sm:inline">Trade Catalogue</span>
        </div>

        <span className="font-sans text-sm text-white/45 absolute left-1/2 -translate-x-1/2 hidden md:block">
          {displayR <= numPages
            ? `${displayL} – ${displayR} / ${numPages}`
            : `${displayL} / ${numPages}`}
        </span>

        <button
          onClick={onClose}
          aria-label="Close"
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/22 border border-white/15
                     flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          <IconClose />
        </button>
      </div>

      {/* ── Book area ── */}
      <div ref={bookAreaRef} className="flex-1 flex items-center justify-center relative px-4 md:px-6 py-4 overflow-hidden">

        {/* Left arrow */}
        <button onClick={flipPrev} disabled={isFirst} aria-label="Previous page"
          className="absolute left-3 md:left-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full
                     bg-white/8 hover:bg-white/18 border border-white/12
                     hidden md:flex items-center justify-center text-white
                     disabled:opacity-15 transition-all cursor-pointer">
          <IconChevLeft />
        </button>

        {/* Outer clip — single-page for cover/back, double for spreads */}
        <div style={{
          width:      displayW,
          height:     displayH,
          overflow:   "hidden",
          transition: isFlipping ? "none" : "width 0.4s ease",
        }}>
          {/* Inner translate — shifts canvas left to reveal cover (right half) */}
          <div style={{
            transform:  `translateX(${innerOffset}px)`,
            transition: isFlipping ? "none" : "transform 0.4s ease",
          }}>
            {/* Scale */}
            <div style={{
              transform:       `scale(${scale})`,
              transformOrigin: "top left",
              width:           bookTotalW,
              position:        "relative",
            }}>
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                boxShadow: "0 32px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05)",
              }} />
              <HTMLFlipBook
                key="flipbook"
                ref={bookRef}
                width={PAGE_W} height={PAGE_H}
                size="fixed"
                minWidth={PAGE_W} maxWidth={PAGE_W}
                minHeight={PAGE_H} maxHeight={PAGE_H}
                startPage={0}
                drawShadow flippingTime={650}
                usePortrait={false}
                startZIndex={0} autoSize={false}
                maxShadowOpacity={0.6}
                showCover
                mobileScrollSupport={false}
                clickEventForward useMouseEvents
                swipeDistance={30} showPageCorners
                disableFlipByClick={false}
                onFlip={onFlip}
                className="" style={{}}
              >
                {pages.map((n) => {
                  if (n === null) return <BlankPage key="blank" />;
                  return <PDFPage key={n} pageNum={n} pdf={pdf} shouldRender={rendered.has(n)} />;
                })}
              </HTMLFlipBook>
            </div>
          </div>
        </div>

        {/* Right arrow */}
        <button onClick={flipNext} disabled={isLast} aria-label="Next page"
          className="absolute right-3 md:right-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full
                     bg-white/8 hover:bg-white/18 border border-white/12
                     hidden md:flex items-center justify-center text-white
                     disabled:opacity-15 transition-all cursor-pointer">
          <IconChevRight />
        </button>
      </div>

      {/* ── Bottom toolbar ── */}
      <div className="shrink-0 border-t border-white/10">

        {/* Mobile: prev / page counter / next */}
        <div className="flex md:hidden items-center px-6 pt-3 pb-8">
          <button onClick={flipPrev} disabled={isFirst} aria-label="Previous page"
            className="w-12 h-12 rounded-full bg-white/8 hover:bg-white/18 border border-white/12
                       flex items-center justify-center text-white disabled:opacity-20 transition-all cursor-pointer">
            <IconChevLeft />
          </button>
          <span className="flex-1 text-center text-sm tabular-nums text-white/45">
            {displayR <= numPages ? `${displayL} – ${displayR}` : `${displayL}`} / {numPages}
          </span>
          <button onClick={flipNext} disabled={isLast} aria-label="Next page"
            className="w-12 h-12 rounded-full bg-white/8 hover:bg-white/18 border border-white/12
                       flex items-center justify-center text-white disabled:opacity-20 transition-all cursor-pointer">
            <IconChevRight />
          </button>
        </div>

        {/* Desktop: tool icons */}
        <div className="hidden md:flex items-center justify-center gap-1 px-6 py-3">
          {[
            { icon: <IconSingle />, label: "Single page", action: () => {} },
            { icon: <IconSpread />, label: "Two-page spread", action: () => {} },
            { icon: <IconZoomIn />, label: "Zoom", action: () => {} },
            { icon: <IconFullscreen />, label: "Fullscreen", action: toggleFullscreen },
            { icon: <IconShare />, label: "Share", action: () => {} },
          ].map(({ icon, label, action }) => (
            <button key={label} onClick={action} aria-label={label} title={label}
              className="w-9 h-9 rounded flex items-center justify-center
                         text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
              {icon}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}
