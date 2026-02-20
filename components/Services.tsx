"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useServicesCard } from "@/contexts/ServicesCardContext";
import {
  FileCheck,
  Coins,
  LineChart,
  Table,
  Plug,
  Shield,
  type LucideIcon,
} from "lucide-react";

const CARD_GAP_PX = 32;
const NUM_CARDS = 6;
const SNAP_BLOCK_HEIGHT_VH = 100;
const SCROLL_SECTION_HEIGHT = `${NUM_CARDS * SNAP_BLOCK_HEIGHT_VH}vh`;

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  highlights?: string[];
  href?: string;
  linkLabel?: string;
};

const services: ServiceItem[] = [
  {
    id: "equity-digitization",
    title: "Equity Digitization & Monitoring",
    description:
      "Turn paper equity into on-chain records with immutable audit trails. Issue, track, and monitor public and private ownership in one place. Support for multiple asset types, automated event capture, and real-time visibility for issuers and investors. Reduces reconciliation overhead and eliminates manual ledger errors.",
    icon: FileCheck,
    highlights: ["On-chain audit trails", "Real-time visibility", "Public & private ownership"],
    href: "#contact",
    linkLabel: "Learn more",
  },
  {
    id: "tokenized-assets",
    title: "Tokenized Asset Management",
    description:
      "End-to-end lifecycle for tokenized equity and digital securities.",
    icon: Coins,
    highlights: ["Custody & transfers", "Corporate actions", "On-chain reporting"],
    href: "#contact",
    linkLabel: "Learn more",
  },
  {
    id: "financial-analytics",
    title: "Financial Analytics & Lifecycle Management",
    description:
      "Drive decisions with analytics and automation. Cap table analytics, workflow automation, lifecycle events, and reporting keep digital securities and stakeholders in sync. Custom dashboards, scheduled reports, and alerts so finance and legal teams stay on top of vesting, conversions, and dilution without spreadsheets.",
    icon: LineChart,
    highlights: ["Cap table analytics", "Workflow automation", "Lifecycle events"],
    href: "#contact",
    linkLabel: "Learn more",
  },
  {
    id: "cap-table",
    title: "Cap Table Management",
    description:
      "Single source of truth for equity and ownership. Maintain and track cap tables, option pools, and ownership changes with accuracy and transparency for fundraising and compliance.",
    icon: Table,
    highlights: ["Option pools", "Ownership tracking", "Fundraising & compliance"],
    href: "#contact",
    linkLabel: "Learn more",
  },
  {
    id: "api",
    title: "API Integration Platform",
    description:
      "Connect your stack without custom builds. REST and webhook APIs plug blockchain-based equity and compliance data into ERPs, transfer agents, and financial systems for one integrated workflow. Documentation, sandboxes, and versioned endpoints so your engineering team can integrate quickly and safely.",
    icon: Plug,
    highlights: ["ERPs & transfer agents", "Single integrated workflow", "No custom builds"],
    href: "https://api.vaulto.ai",
    linkLabel: "Explore API",
  },
  {
    id: "compliance",
    title: "Tokenized Equity PaaS",
    description:
      "Launch and run compliant tokenized offerings. Issuance, administration, KYC/AML, and regulatory reporting in one platform so you can focus on growth instead of manual compliance. Configurable rules, jurisdiction-specific workflows, and audit-ready exports for regulators and auditors.",
    icon: Shield,
    highlights: ["KYC/AML & reporting", "Issuance & administration", "Compliant offerings"],
    href: "#compliance",
    linkLabel: "Book a demo",
  },
];

function ServiceCard({
  title,
  description,
  index,
  id,
  cardWidthPx,
  icon: Icon,
  highlights,
  href,
  linkLabel,
}: {
  title: string;
  description: string;
  index: number;
  id?: string;
  cardWidthPx: number;
  icon: LucideIcon;
  highlights?: string[];
  href?: string;
  linkLabel?: string;
}) {
  return (
    <article
      id={id}
      className="relative flex max-h-[420px] flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-vaulto-border bg-[var(--vaulto-card)] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-vaulto-accent/40 hover:shadow-[0_8px_32px_rgba(59,130,246,0.12)] sm:p-8"
      style={{ width: cardWidthPx }}
    >
      {/* Accent strip + subtle gradient background */}
      <div
        className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-vaulto-accent"
        aria-hidden
      />
      <div
        className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-vaulto-accent/10 blur-2xl"
        aria-hidden
      />
      <div className="relative flex flex-1 flex-col">
        <div className="mb-3 flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-vaulto-accent/15 text-vaulto-accent">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <span className="font-serif text-sm font-medium text-vaulto-accent">
            {index + 1} of {NUM_CARDS}
          </span>
        </div>
        <h3 className="font-serif text-xl font-semibold text-vaulto-fg sm:text-2xl">
          {title}
        </h3>
        <p className="mt-3 line-clamp-4 font-sans text-base leading-relaxed text-vaulto-muted sm:line-clamp-5 sm:text-lg">
          {description}
        </p>
        {highlights && highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5 font-sans text-sm text-vaulto-fg">
            {highlights.slice(0, 3).map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-vaulto-accent" />
                {item}
              </li>
            ))}
          </ul>
        )}
        {href && linkLabel && (
          <a
            href={href}
            className="mt-4 inline-flex items-center gap-1 font-sans text-sm font-medium text-vaulto-accent underline-offset-2 transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-vaulto-accent focus:ring-offset-2 focus:ring-offset-[var(--vaulto-card)]"
            aria-label={`${linkLabel} for ${title}`}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {linkLabel}
            <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </article>
  );
}

export function Services() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const { setCardIndex: setContextCardIndex } = useServicesCard();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [cardWidthPx, setCardWidthPx] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const updateCardWidth = useRef(() => {
    const el = viewportRef.current;
    if (el) {
      const w = el.clientWidth;
      if (w > 0) setCardWidthPx((prev) => (prev !== w ? w : prev));
    }
  });

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    updateCardWidth.current();
    const ro = new ResizeObserver(() => updateCardWidth.current());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const [cardIndex, setCardIndex] = useState(0);
  const syncIndex = (progress: number) => {
    const i = Math.min(NUM_CARDS - 1, Math.floor(progress * NUM_CARDS));
    setCardIndex((prev) => (prev !== i ? i : prev));
    setContextCardIndex(i);
  };
  useMotionValueEvent(scrollYProgress, "change", syncIndex);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", syncIndex);
    syncIndex(scrollYProgress.get());
    return unsub;
  }, [scrollYProgress, setContextCardIndex]);

  const effectiveCardWidth = Math.max(280, cardWidthPx);
  const stepPx = effectiveCardWidth + CARD_GAP_PX;
  const targetX = -cardIndex * stepPx;

  const progressScaleX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1]
  );

  return (
    <div
      id="services"
      ref={wrapperRef}
      className="relative"
      style={{ minHeight: SCROLL_SECTION_HEIGHT }}
    >
      {/* Sticky viewport: first snap target */}
      <div className="sticky top-0 min-h-screen snap-start overflow-hidden bg-[var(--vaulto-bg)] px-4 pt-32 pb-16 sm:px-6 sm:pt-40 sm:pb-20 lg:px-8 lg:pt-44">
        <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-7xl flex-col sm:min-h-[calc(100vh-8rem)]">
          <header className="mb-10 sm:mb-12">
            <h2 className="font-serif text-3xl font-semibold text-vaulto-fg sm:text-4xl">
              Platform & Services
            </h2>
            <p className="mt-3 max-w-2xl font-sans text-vaulto-muted">
              SaaS and PaaS solutions for tokenized equity and digital asset
              management.
            </p>
          </header>

          {/* Progress bar */}
          <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-vaulto-border/60 sm:mb-10">
            <motion.div
              className="h-full origin-left rounded-full bg-vaulto-accent"
              style={{ scaleX: progressScaleX }}
            />
          </div>

          {/* Card row: one card per snap, smooth animate to next */}
          <div
            ref={viewportRef}
            className="flex min-w-0 flex-1 items-stretch overflow-hidden"
          >
            <motion.div
              className="flex items-start will-change-transform"
              style={{ gap: CARD_GAP_PX }}
              animate={{
                x: prefersReducedMotion ? 0 : targetX,
              }}
              transition={{
                type: "tween",
                duration: 0.45,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {services.map((svc, i) => (
                <ServiceCard
                  key={svc.id}
                  id={svc.id}
                  title={svc.title}
                  description={svc.description}
                  index={i}
                  cardWidthPx={effectiveCardWidth}
                  icon={svc.icon}
                  highlights={svc.highlights}
                  href={svc.href}
                  linkLabel={svc.linkLabel}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      {/* Extra snap targets: one scroll = one card */}
      {Array.from({ length: NUM_CARDS - 1 }, (_, i) => (
        <div
          key={i}
          className="snap-start"
          style={{ height: SNAP_BLOCK_HEIGHT_VH + "vh" }}
          aria-hidden
        />
      ))}
    </div>
  );
}
