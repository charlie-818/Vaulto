"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section
      id="platform"
      className="relative overflow-hidden px-4 pt-48 pb-20 sm:px-6 sm:pt-52 sm:pb-28 lg:px-8 lg:pt-60 lg:pb-36"
    >
      <div className="max-w-2xl text-left ml-16 sm:ml-24 lg:ml-32">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
          Institutional-Grade
          <br />
          Infrastructure for
          <br />
          Tokenized Equity
        </h1>
        <p className="mt-5 font-sans text-lg text-vaulto-muted sm:text-xl leading-relaxed">
          Vaulto provides SaaS and PaaS solutions for digitizing,
          <br />
          managing, and maintaining equity ownership records
          <br />
          and capitalization tables on blockchain, with an integration-focused
          demo to map these capabilities into your existing workflows and discuss
          pricing in detail.
        </p>
        <div className="mt-6">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg bg-vaulto-accent px-5 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:bg-vaulto-accent-dim"
          >
            Schedule a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
