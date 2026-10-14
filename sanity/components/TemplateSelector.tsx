// sanity/components/TemplateSelector.tsx
"use client";

import React from "react";
import { set } from "sanity";
import type { StringInputProps } from "sanity";

// ─── The 4 selectable layouts ──────────────────────────────────────────────────

const TEMPLATES = [
  { value: "product-spotlight", label: "Product Spotlight" },
  { value: "tips-list",         label: "Tips & Lists" },
  { value: "sustainability",    label: "Sustainability" },
  { value: "story-campaign",    label: "Story & Campaign" },
] as const;

type TemplateValue = (typeof TEMPLATES)[number]["value"] | "generic";

// ─── SVG wireframe diagrams (all normalised to 80 × 56 viewBox) ───────────────

function SpotlightDiagram() {
  return (
    <svg viewBox="0 0 80 56" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      {/* Text left */}
      <rect x="0"  y="4"  width="44" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="0"  y="10" width="38" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="0"  y="16" width="44" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
      {/* Image right */}
      <rect x="48" y="2"  width="32" height="23" rx="2" fill="currentColor" fillOpacity="0.15" />
      {/* Divider */}
      <rect x="0"  y="30" width="80" height="1" rx="0.5" fill="currentColor" fillOpacity="0.12" />
      {/* Text block below */}
      <rect x="0"  y="34" width="80" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="0"  y="40" width="68" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="0"  y="46" width="54" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
    </svg>
  );
}

function TipsDiagram() {
  return (
    <svg viewBox="0 0 80 56" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      {/* Row 1 — bullets left, image right */}
      <circle cx="3"  cy="5"  r="1.5" fill="currentColor" fillOpacity="0.45" />
      <rect x="7"  y="3.5"  width="32" height="2.5" rx="1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="3"  cy="11" r="1.5" fill="currentColor" fillOpacity="0.45" />
      <rect x="7"  y="9.5"  width="26" height="2.5" rx="1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="3"  cy="17" r="1.5" fill="currentColor" fillOpacity="0.45" />
      <rect x="7"  y="15.5" width="32" height="2.5" rx="1" fill="currentColor" fillOpacity="0.3" />
      <rect x="44" y="2"   width="36" height="22" rx="2" fill="currentColor" fillOpacity="0.15" />
      {/* Row 2 — image left, bullets right */}
      <rect x="0"  y="30" width="34" height="22" rx="2" fill="currentColor" fillOpacity="0.15" />
      <circle cx="40" cy="34" r="1.5" fill="currentColor" fillOpacity="0.45" />
      <rect x="44" y="32.5" width="28" height="2.5" rx="1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="40" cy="40" r="1.5" fill="currentColor" fillOpacity="0.45" />
      <rect x="44" y="38.5" width="32" height="2.5" rx="1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="40" cy="46" r="1.5" fill="currentColor" fillOpacity="0.45" />
      <rect x="44" y="44.5" width="22" height="2.5" rx="1" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

function SustainabilityDiagram() {
  return (
    <svg viewBox="0 0 80 56" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      {/* Row 1 — text left, image right */}
      <rect x="0"  y="2"  width="42" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="0"  y="7"  width="36" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="46" y="2"  width="34" height="12" rx="2" fill="currentColor" fillOpacity="0.15" />
      {/* Row 2 — image left, text right */}
      <rect x="0"  y="18" width="34" height="12" rx="2" fill="currentColor" fillOpacity="0.15" />
      <rect x="38" y="18" width="42" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="38" y="23" width="36" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
      {/* Row 3 — text left, image right */}
      <rect x="0"  y="34" width="42" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="0"  y="39" width="34" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="46" y="34" width="34" height="12" rx="2" fill="currentColor" fillOpacity="0.15" />
      {/* Centred closing line */}
      <rect x="10" y="50" width="60" height="3" rx="1" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

function StoryDiagram() {
  return (
    <svg viewBox="0 0 80 56" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      {/* Row 1 — text left, image right */}
      <rect x="0"  y="2"  width="42" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="0"  y="7"  width="36" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="46" y="2"  width="34" height="12" rx="2" fill="currentColor" fillOpacity="0.15" />
      {/* Full-width callout */}
      <rect x="0"  y="18" width="80" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="0"  y="23" width="68" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
      {/* Row 2 — image left, text right */}
      <rect x="0"  y="30" width="34" height="12" rx="2" fill="currentColor" fillOpacity="0.15" />
      <rect x="38" y="30" width="42" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="38" y="35" width="34" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
      {/* CTA button */}
      <rect x="22" y="46" width="36" height="8" rx="4" fill="currentColor" fillOpacity="0.18" />
    </svg>
  );
}

const DIAGRAMS: Record<string, React.ReactNode> = {
  "product-spotlight": <SpotlightDiagram />,
  "tips-list":         <TipsDiagram />,
  "sustainability":    <SustainabilityDiagram />,
  "story-campaign":    <StoryDiagram />,
};

// ─── Component ────────────────────────────────────────────────────────────────

export function TemplateSelector(props: StringInputProps) {
  const { value, onChange, readOnly } = props;
  const current = (value ?? "generic") as TemplateValue;
  const isGeneric = !current || current === "generic";

  return (
    <div>
      {/* 4 equal-width, equal-height cards — one row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          paddingTop: 4,
        }}
      >
        {TEMPLATES.map((t) => {
          const selected = current === t.value;
          return (
            <button
              key={t.value}
              type="button"
              disabled={!!readOnly}
              onClick={() => !readOnly && onChange(set(t.value))}
              style={{
                all: "unset",
                cursor: readOnly ? "default" : "pointer",
                display: "block",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  border: selected ? "2px solid #112942" : "1.5px solid #d8d8d8",
                  borderRadius: 6,
                  padding: "10px 10px 8px",
                  background: selected ? "#eef3f8" : "#fafafa",
                  color: "#112942",
                  transition: "border-color 0.15s ease, background 0.15s ease",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                {/* Wireframe — fixed aspect so all cards stay the same height */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingBottom: "70%",
                    opacity: selected ? 1 : 0.55,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "stretch",
                    }}
                  >
                    {DIAGRAMS[t.value]}
                  </div>
                </div>

                {/* Label only — no description */}
                <div
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 10,
                    fontWeight: selected ? 700 : 500,
                    color: "#112942",
                    textAlign: "center",
                    marginTop: 7,
                    lineHeight: 1.2,
                  }}
                >
                  {t.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Back to Standard — only shown when a template is currently active */}
      {!isGeneric && (
        <div style={{ marginTop: 8, textAlign: "right" }}>
          <button
            type="button"
            disabled={!!readOnly}
            onClick={() => !readOnly && onChange(set("generic"))}
            style={{
              all: "unset",
              fontFamily: "sans-serif",
              fontSize: 10.5,
              color: "#888",
              cursor: readOnly ? "default" : "pointer",
              textDecoration: "underline",
            }}
          >
            ← Reset to Standard layout
          </button>
        </div>
      )}
    </div>
  );
}
