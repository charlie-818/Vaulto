"use client";

import Script from "next/script";
import { useRef, useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

const CALENDLY_URL =
  "https://calendly.com/charliebc-vaulto/vaulto-meeting?hide_gdpr_banner=1&hide_event_type_details=1";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement | null;
        prefill?: Record<string, unknown>;
        utm?: Record<string, unknown>;
        resize?: boolean;
      }) => void;
    };
  }
}

export function BookConsultation() {
  const { ref, isInView } = useInView();
  const calendlyRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!scriptReady || !calendlyRef.current || hasInitialized.current) return;
    if (!window.Calendly) return;
    hasInitialized.current = true;
    window.Calendly.initInlineWidget({
      url: CALENDLY_URL,
      parentElement: calendlyRef.current,
      prefill: {},
      utm: {},
      resize: true,
    });
  }, [scriptReady]);

  return (
    <section
      id="contact"
      ref={ref}
      className={`fade-in px-4 py-16 sm:px-6 sm:py-24 lg:px-8 ${isInView ? "visible" : ""}`}
    >
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
      <div className="mx-auto max-w-4xl">
        <h2 className="font-serif text-3xl font-semibold text-vaulto-fg sm:text-4xl">
          Schedule a Demo
        </h2>
        <p className="mt-3 font-sans text-vaulto-muted">
          Speak with our team to explore how Vaulto&apos;s platform fits your
          institutional workflow.
        </p>

        <div className="mt-10 overflow-hidden rounded-xl border border-vaulto-border bg-[var(--vaulto-card)] p-0">
          <div
            ref={calendlyRef}
            className="calendly-widget-root w-full min-h-[630px] overflow-hidden"
            aria-label="Book a consultation with Vaulto"
          />
        </div>
      </div>
    </section>
  );
}
