import type { Metadata } from "next";
import TradeBookTeaser from "@/components/TradeBookTeaser";

export const metadata: Metadata = {
  title: "Trade Book — Bodidoc",
  description:
    "Browse the complete Bodidoc trade catalogue and discover our full product range.",
};

export default function TradeBookPage() {
  return (
    <div className="w-full">
      <TradeBookTeaser />
    </div>
  );
}
