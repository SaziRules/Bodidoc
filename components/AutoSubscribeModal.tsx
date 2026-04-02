"use client";

import { useEffect, useState } from "react";
import SubscriptionModal from "@/components/SubscriptionModal";

const STORAGE_KEY  = "bodidoc_subscribe_shown";
const COOLDOWN_MS  = 7 * 24 * 60 * 60 * 1000; // 7 days
const DELAY_MS     = 3000;                      // show after 3s

export default function AutoSubscribeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const last = localStorage.getItem(STORAGE_KEY);
    const shouldShow = !last || Date.now() - Number(last) > COOLDOWN_MS;

    if (!shouldShow) return;

    const timer = setTimeout(() => {
      setOpen(true);
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;
  return <SubscriptionModal onClose={() => setOpen(false)} />;
}