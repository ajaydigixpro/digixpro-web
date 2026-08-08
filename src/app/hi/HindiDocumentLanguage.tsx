"use client";

import { useEffect } from "react";

/** Keeps the document language correct after client-side navigation to /hi. */
export default function HindiDocumentLanguage() {
  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    document.documentElement.lang = "hi";

    return () => {
      document.documentElement.lang = previousLanguage || "en";
    };
  }, []);

  return null;
}
