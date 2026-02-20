import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/vaulto-logo.png"
              alt="Vaulto"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
            <span className="font-sans text-sm text-white/60">
              est August 2025
            </span>
          </div>
          <nav className="flex flex-wrap gap-6 font-sans text-sm">
            <Link
              href="https://legal.vaulto.ai/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="https://legal.vaulto.ai/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
            <Link
              href="https://api.vaulto.ai/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 transition-colors hover:text-white"
            >
              API Docs
            </Link>
            <a
              href="mailto:support@vaulto.ai"
              className="text-white/70 transition-colors hover:text-white"
            >
              Contact
            </a>
          </nav>
        </div>
        <p className="mt-8 border-t border-white/10 pt-8 font-sans text-sm text-white/60">
          © 2025 Vaulto. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
