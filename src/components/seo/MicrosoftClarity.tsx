"use client";

import React, { useEffect, useState } from "react";

export default function MicrosoftClarity() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem("digixpro_cookie_consent");
      setHasConsent(consent === "accepted");
    };

    // Check initial consent state
    checkConsent();

    // Listen for consent updates from CookieConsent component
    window.addEventListener("digixpro-cookie-consent-updated", checkConsent);
    return () => {
      window.removeEventListener("digixpro-cookie-consent-updated", checkConsent);
    };
  }, []);

  if (!hasConsent) return null;

  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "yd6064jvlw";

  const clarityScript = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${clarityId}");`;

  return (
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{ __html: clarityScript }}
    />
  );
}
