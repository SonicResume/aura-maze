
export default function Navbar() {
  return (
    <header className="w-full border-b border-[#4a3020]/60 bg-[#090708]">
      <div className="mx-auto flex min-h-[86px] w-full max-w-[1200px] items-center justify-between px-6 sm:px-8">
        {/* Logo */}
        <a
          href="/"
          aria-label="Aura Maze home"
          className="group relative flex shrink-0 items-center"
        >
          {/* Neon purple glow */}
          <span
            className="
              pointer-events-none
              absolute left-1/2 top-1/2
              h-14 w-36
              -translate-x-1/2 -translate-y-1/2
              rounded-full
              bg-purple-600/70
              blur-2xl
              transition duration-500
              group-hover:bg-fuchsia-500/80
              group-hover:scale-110
            "
          />

          {/* Logo light */}
          <span
            className="
              pointer-events-none
              absolute left-1/2 top-1/2
              h-9 w-28
              -translate-x-1/2 -translate-y-1/2
              rounded-full
              bg-violet-400/50
              blur-xl
            "
          />

          <img
            src="/logo.png"
            alt="Aura Maze"
            className="
              relative z-10
              h-16 w-auto
              object-contain
              brightness-125
              saturate-[1.8]
              hue-rotate-[245deg]
              drop-shadow-[0_3px_2px_rgba(0,0,0,0.9)]
              drop-shadow-[0_0_6px_rgba(168,85,247,1)]
              drop-shadow-[0_0_15px_rgba(139,92,246,0.95)]
              drop-shadow-[0_0_28px_rgba(139,92,246,0.75)]
              transition duration-300
              group-hover:scale-105
              group-hover:brightness-150
            "
          />
        </a>

        {/* Main Navigation */}
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-8 sm:gap-12"
        >
          <a
            href="/"
            className="
              text-[16px] font-semibold tracking-wide
              text-[#b88952]
              transition-all duration-200
              hover:text-[#e0b56f]
              hover:drop-shadow-[0_0_8px_rgba(192,138,77,0.35)]
            "
          >
            Home
          </a>

          <a
            href="/pricing"
            className="
              text-[16px] font-semibold tracking-wide
              text-[#b88952]
              transition-all duration-200
              hover:text-[#e0b56f]
              hover:drop-shadow-[0_0_8px_rgba(192,138,77,0.35)]
            "
          >
            Pricing
          </a>

          <a
            href="/contact"
            className="
              text-[16px] font-semibold tracking-wide
              text-[#b88952]
              transition-all duration-200
              hover:text-[#e0b56f]
              hover:drop-shadow-[0_0_8px_rgba(192,138,77,0.35)]
            "
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
