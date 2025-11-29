import { Link } from "react-router-dom";

export default function NavbarGuest() {
  return (
    <header className="border-b border-slate-200/70 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-accentBlue via-accentGreen to-accentOrange flex items-center justify-center text-white font-semibold text-lg">
            H
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900 dark:text-white">
              Helpi
            </span>
            <span className="text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Volunteering Match Platform
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200 hover:border-accentBlue/70 hover:text-slate-900 dark:hover:text-white transition"
          >
            Zaloguj się
          </Link>

          <Link
            to="/login?mode=register"
            className="inline-flex items-center px-4 py-1.5 text-xs rounded-full bg-accentBlue/80 hover:bg-accentBlue/90 dark:bg-accentBlue/70 dark:hover:bg-accentBlue/80 text-white dark:text-slate-950 font-medium shadow-soft active:translate-y-[1px] transition"
          >
            Dołącz do Helpi
          </Link>
        </div>
      </div>
    </header>
  );
}
