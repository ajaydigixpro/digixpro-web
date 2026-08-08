"use client";

import dynamic from "next/dynamic";

// The sticky bar is not visible until the visitor scrolls. Keep its listener,
// Link and icon out of the initial homepage client bundle.
const StickyMobileCTA = dynamic(() => import("./StickyMobileCTA"), {
  ssr: false,
});

export default function DeferredStickyMobileCTA() {
  return <StickyMobileCTA />;
}
