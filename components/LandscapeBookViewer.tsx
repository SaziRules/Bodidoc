"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const RENDER_W = 1400;
const PRELOAD  = 2;

// ── PDF slide ──────────────────────────────────────────────────────────────────
// Renders one PDF page into a canvas, scaled to RENDER_W.
// The canvas uses CSS width:100%/height:100% so the parent's aspect-ratio
// box handles all responsive scaling — no ResizeObserver needed.

function PDFSlide({
  pageNum,
  pdf,
  renderH,
  shouldRender,
}: {
  pageNum: number;
  pdf: any;
  renderH: number;
  shouldRender: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const taskRef   = useRef<{ cancel: () => void } | null>(null);

  useEffect(() => {
    if (!shouldRender || !pdf || !canvasRef.current) return;
    taskRef.current?.cancel();
    let active = true;

    pdf.getPage(pageNum).then((page: any) => {
      if (!active || !canvasRef.current) return;
      const baseVp = page.getViewport({ scale: 1 });
      const vp     = page.getViewport({ scale: RENDER_W / baseVp.width });
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

  // Aspect-ratio container: paddingTop % maintains the page proportions at
  // any container width, letting the canvas scale purely through CSS.
  const pt = `${((renderH / RENDER_W) * 100).toFixed(4)}%`;

  return (
    <div style={{ position: "relative", paddingTop: pt, width: "100%" }}>
      {shouldRender ? (
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
        />
      ) : (
        <div
          style={{ position: "absolute", inset: 0 }}
          className="bg-[#e4e8ed] animate-pulse"
        />
      )}
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────────

const ChevL    = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>;
const ChevR    = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>;
const IcoPrint = () => <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>;
const IcoDl    = () => <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const IcoShare = () => <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
const IcoView  = () => <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;

// ── Component ──────────────────────────────────────────────────────────────────

export interface LandscapeBookViewerProps {
  src:   string;
  title: string;
}

export default function LandscapeBookViewer({ src, title }: LandscapeBookViewerProps) {
  const outerRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, duration: 28 });

  const [pdf,        setPdf       ] = useState<any>(null);
  const [numPages,   setNumPages  ] = useState(0);
  const [renderH,    setRenderH   ] = useState(Math.round(RENDER_W / 1.414)); // landscape A4 default
  const [status,     setStatus    ] = useState<"loading" | "ready" | "error">("loading");
  const [current,    setCurrent   ] = useState(0);
  const [rendered,   setRendered  ] = useState<Set<number>>(new Set([0, 1, 2])); // 0-indexed
  const [canPrev,    setCanPrev   ] = useState(false);
  const [canNext,    setCanNext   ] = useState(false);
  const [copied,     setCopied    ] = useState(false);

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
        setRenderH(Math.round(RENDER_W * (vp.height / vp.width)));
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => { cancelled = true; };
  }, [src]);

  // ── Embla events ────────────────────────────────────────────────────────────

  const updateState = useCallback(() => {
    if (!emblaApi) return;
    const idx = emblaApi.selectedScrollSnap();
    setCurrent(idx);
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setRendered(prev => {
      const next = new Set(prev);
      for (let i = Math.max(0, idx - PRELOAD); i <= Math.min(numPages - 1, idx + PRELOAD); i++)
        next.add(i);
      return next;
    });
  }, [emblaApi, numPages]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select",     updateState);
    emblaApi.on("reInit",     updateState);
    emblaApi.on("init",       updateState);
    updateState();
    return () => {
      emblaApi.off("select",  updateState);
      emblaApi.off("reInit",  updateState);
      emblaApi.off("init",    updateState);
    };
  }, [emblaApi, updateState]);

  // ── Reinit on container resize ───────────────────────────────────────────

  useEffect(() => {
    if (!outerRef.current) return;
    const ro = new ResizeObserver(() => emblaApi?.reInit());
    ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, [emblaApi]);

  // ── Actions ─────────────────────────────────────────────────────────────────

  const handlePrint = () => { const w = window.open(src); if (w) w.onload = () => w.print(); };
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

  return (
    <div ref={outerRef} className="w-full select-none">

      {/* Loading */}
      {status === "loading" && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <div className="w-9 h-9 border-[3px] border-[#112942]/15 border-t-[#112942]/60 rounded-full animate-spin" />
          <p className="text-sm text-[#112942]/40">Loading…</p>
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div className="flex items-center justify-center py-32">
          <p className="text-sm text-red-400">Failed to load PDF.</p>
        </div>
      )}

      {/* Carousel */}
      {status === "ready" && (
        <>
          <div className="relative flex items-center py-10 px-[72px]">
            {/* Prev */}
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Previous page"
              className="absolute left-0 w-14 h-14 rounded-full z-10
                         bg-[#112942]/6 hover:bg-[#112942]/14 border border-[#112942]/10
                         flex items-center justify-center text-[#112942]
                         disabled:opacity-15 transition-all cursor-pointer"
            >
              <ChevL />
            </button>

            {/* Embla viewport */}
            <div
              className="w-full overflow-hidden"
              ref={emblaRef}
              style={{ boxShadow: "0 28px 90px rgba(17,41,66,0.2), 0 6px 22px rgba(17,41,66,0.12)" }}
            >
              <div className="flex">
                {Array.from({ length: numPages }, (_, i) => (
                  <div key={i} className="flex-shrink-0 min-w-0 w-full">
                    <PDFSlide
                      pageNum={i + 1}
                      pdf={pdf}
                      renderH={renderH}
                      shouldRender={rendered.has(i)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Next */}
            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              aria-label="Next page"
              className="absolute right-0 w-14 h-14 rounded-full z-10
                         bg-[#112942]/6 hover:bg-[#112942]/14 border border-[#112942]/10
                         flex items-center justify-center text-[#112942]
                         disabled:opacity-15 transition-all cursor-pointer"
            >
              <ChevR />
            </button>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between px-2 py-2.5 border-t border-[#112942]/8">
            <span className="text-xs tabular-nums text-[#112942]/45 min-w-[90px]">
              {current + 1} of {numPages}
            </span>
            <span className="hidden  text-xs text-[#112942]/55 font-medium tracking-wide truncate px-4 md:hidden">
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
