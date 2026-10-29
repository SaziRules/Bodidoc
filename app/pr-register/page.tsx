import type { Metadata } from "next";
import { Anton, League_Spartan } from "next/font/google";
import PRRegisterForm from "@/components/PRRegisterForm";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const spartan = League_Spartan({ subsets: ["latin"], variable: "--font-spartan", display: "swap" });

export const metadata: Metadata = {
  title: "PR & Creator Registration",
  robots: { index: false, follow: false },
};

export default function PRRegisterPage() {
  return (
    <div className={`${anton.variable} ${spartan.variable} bg-[#112942]`}>
      <PRRegisterForm />
    </div>
  );
}
