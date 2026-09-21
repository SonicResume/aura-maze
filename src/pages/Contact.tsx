import { Mail } from "lucide-react";

const Facebook = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M13.5 8H16V4h-2.5C10.6 4 9 5.7 9 8.7V11H6v4h3v5h4v-5h3l.5-4H13v-2.1c0-.9.2-1.9.5-1.9Z" />
  </svg>
);

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090708] px-4 font-sans text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/40 backdrop-blur">

        {/* Header */}
        <div className="mb-7 text-center">
          <div className="inline-flex rounded-xl border border-purple-400/20 bg-purple-500/10 p-3 text-purple-300">
            <Mail size={20} />
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white">
            Contact
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Choose how to reach us
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">

          <a
            href="https://www.sonicresume.com/contact"
            className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-700 to-purple-600 p-3.5 text-sm font-bold text-white shadow-lg shadow-purple-950/30 transition hover:from-purple-600 hover:to-purple-500"
          >
            Contact Business
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61585916721060"
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#9a6a3f]/40 bg-[#9a6a3f]/10 p-3.5 text-sm font-bold text-[#d3a875] transition hover:border-[#b17b4c]/60 hover:bg-[#9a6a3f]/20"
          >
            <Facebook size={16} />
            Facebook
          </a>

        </div>

        {/* Accent */}
        <div className="mx-auto mt-8 h-px w-20 bg-gradient-to-r from-transparent via-[#9a6a3f] to-transparent" />

      </div>
    </div>
  );
}