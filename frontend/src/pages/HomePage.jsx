import { FiUsers, FiSearch, FiCheckCircle, FiZap, FiShield, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom"; // jeśli nie używasz react-router, zamień <Link> na <button>/<a>

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <header className="border-b border-slate-200/70 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
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

          <nav className="hidden sm:flex items-center gap-6 text-xs font-medium text-slate-500 dark:text-slate-400">
            <a href="#jak-dziala" className="hover:text-slate-900 dark:hover:text-white transition">
              Jak działa
            </a>
            <a href="#funkcje" className="hover:text-slate-900 dark:hover:text-white transition">
              Funkcje
            </a>
            <a href="#seo" className="hover:text-slate-900 dark:hover:text-white transition">
              Dla kogo
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200 hover:border-accentBlue/70 hover:text-slate-900 dark:hover:text-white transition"
            >
              Zaloguj się
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-1.5 text-xs rounded-full bg-accentBlue/80 hover:bg-accentBlue/90 dark:bg-accentBlue/70 dark:hover:bg-accentBlue/80 text-white dark:text-slate-950 font-medium shadow-soft active:translate-y-[1px] transition"
            >
              Dołącz do Helpi
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12 sm:pt-16 sm:pb-20">
          <div className="grid md:grid-cols-[1.1fr,1fr] gap-10 md:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2 py-1 mb-4 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="h-2 w-2 rounded-full bg-accentGreen" />
                Aplikacja dla wolontariuszy i organizacji • Helpi
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white mb-4">
                Helpi – połącz{" "}
                <span className="text-accentBlue">zweryfikowane organizacje</span>{" "}
                z <span className="text-accentGreen">wolontariuszami</span> w kilka kliknięć.
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-5 max-w-xl">
                Helpi to nowoczesna aplikacja internetowa, która automatyzuje
                cały proces współpracy – od publikacji zleceń, przez
                dopasowanie wolontariuszy, aż po raportowanie wykonanych działań.
                Mniej Excela, więcej realnej pomocy.
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
                <li className="flex items-start gap-2">
                  <FiCheckCircle className="mt-[3px] text-accentGreen" />
                  <span>
                    <strong>Automatyczne przydzielanie zadań</strong> na podstawie
                    dostępności, umiejętności i lokalizacji wolontariuszy.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheckCircle className="mt-[3px] text-accentBlue" />
                  <span>
                    <strong>Szybkie wyszukiwanie zleceń i wolontariuszy</strong> – filtry,
                    tagi, rekomendacje, statusy.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheckCircle className="mt-[3px] text-accentOrange" />
                  <span>
                    <strong>Tylko zweryfikowane organizacje</strong> – bez chaosu, bez SPAMu,
                    z naciskiem na bezpieczeństwo i jakość.
                  </span>
                </li>
              </ul>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-5 py-2 rounded-2xl text-sm font-medium
                             bg-accentGreen/80 hover:bg-accentGreen/90
                             text-white dark:text-slate-950 shadow-soft active:translate-y-[1px] transition"
                >
                  Załóż konto organizacji
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-5 py-2 rounded-2xl text-sm font-medium
                             bg-white/90 hover:bg-white
                             dark:bg-slate-900/80 dark:hover:bg-slate-900
                             border border-slate-200 dark:border-slate-700
                             text-slate-700 dark:text-slate-100 transition"
                >
                  Dołącz jako wolontariusz
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Dzisiejsze działania
                    </p>
                    <p className="text-xl font-semibold text-slate-900 dark:text-white">
                      124 wolontariuszy aktywnych
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded-full bg-accentBlue/10 text-[11px] text-accentBlue">
                      NGO
                    </span>
                    <span className="px-2 py-1 rounded-full bg-accentGreen/10 text-[11px] text-accentGreen">
                      Wolontariat
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 p-3">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Nowe zgłoszenia
                    </p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                      38
                    </p>
                    <p className="text-[11px] text-accentBlue mt-1">
                      +12 dzisiaj
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 p-3">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Zadania przydzielone
                    </p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                      76
                    </p>
                    <p className="text-[11px] text-accentGreen mt-1">
                      92% automatycznie
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 p-3">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Organizacje
                    </p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                      142
                    </p>
                    <p className="text-[11px] text-accentOrange mt-1">
                      zweryfikowane ✔
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                    Aktywność wolontariuszy (ostatnie 7 dni)
                  </p>
                  <div className="flex gap-1 items-end h-24">
                    <div className="w-3 rounded-full bg-accentBlue/70 h-8" />
                    <div className="w-3 rounded-full bg-accentGreen/70 h-14" />
                    <div className="w-3 rounded-full bg-accentOrange/70 h-6" />
                    <div className="w-3 rounded-full bg-accentBlue/70 h-16" />
                    <div className="w-3 rounded-full bg-accentGreen/70 h-10" />
                    <div className="w-3 rounded-full bg-accentOrange/70 h-12" />
                    <div className="w-3 rounded-full bg-accentBlue/70 h-18" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accentGreen" />
                    <span>Automatyczne dopasowania aktywne</span>
                  </div>
                  <button className="inline-flex items-center gap-1 text-accentBlue hover:text-accentBlue/80">
                    Otwórz panel
                    <FiZap className="text-xs" />
                  </button>
                </div>
              </div>

              <div className="hidden sm:flex absolute -bottom-6 -right-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-2 shadow-soft items-center gap-2 text-[11px]">
                <FiShield className="text-accentGreen" />
                <span className="text-slate-500 dark:text-slate-400">
                  Każda organizacja jest ręcznie weryfikowana w Helpi.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="funkcje" className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
          <div className="mb-8">
            <p className="text-xs font-medium text-accentBlue/80 uppercase tracking-wide mb-1">
              Kluczowe korzyści
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
              Wszystko, czego potrzebuje nowoczesny wolontariat – w jednym miejscu.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <div className="h-9 w-9 rounded-xl bg-accentBlue/15 flex items-center justify-center mb-3">
                <FiSearch className="text-accentBlue" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Inteligentne wyszukiwanie
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Filtruj zlecenia i wolontariuszy po lokalizacji, dostępności, kompetencjach,
                typie akcji, czasie trwania czy trybie (online/offline).
              </p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <div className="h-9 w-9 rounded-xl bg-accentGreen/15 flex items-center justify-center mb-3">
                <FiUsers className="text-accentGreen" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Automatyczne przydzielanie
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Helpi analizuje profile wolontariuszy i zadania organizacji, proponując
                najlepsze dopasowania i automatycznie wysyłając zaproszenia.
              </p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <div className="h-9 w-9 rounded-xl bg-accentOrange/15 flex items-center justify-center mb-3">
                <FiHeart className="text-accentOrange" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Zaufanie i bezpieczeństwo
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Weryfikacja organizacji, przejrzyste opisy zleceń, jasne statusy,
                zgody RODO i czytelna komunikacja – wszystko w jednym panelu.
              </p>
            </div>
          </div>
        </section>

        <section
          id="seo"
          className="border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/60"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Helpi – aplikacja internetowa dla wolontariuszy i organizacji pozarządowych
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Helpi to <strong>platforma wolontariatu online</strong>, która łączy
              zweryfikowane organizacje pozarządowe, fundacje, stowarzyszenia oraz
              lokalne inicjatywy z zaangażowanymi wolontariuszami. Nasza aplikacja
              internetowa upraszcza cały proces współpracy: od publikowania
              ogłoszeń wolontariackich, przez automatyczne przydzielanie zadań,
              aż po monitorowanie postępów i raportowanie liczby godzin.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Dzięki Helpi organizacje mogą w jednym miejscu
              <strong> szukać wolontariuszy</strong>, zarządzać zgłoszeniami, tworzyć
              cykliczne projekty oraz komunikować się z zespołem. Wolontariusze
              zyskują wygodny panel, w którym mogą
              <strong> wyszukiwać zlecenia wolontariackie</strong> dopasowane do
              ich zainteresowań, kompetencji i dostępności – zarówno w formule
              stacjonarnej, jak i zdalnej.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Jeśli prowadzisz NGO, fundację, organizację społeczną lub chcesz
              zaangażować się jako wolontariusz, Helpi pomoże Ci w
              <strong> automatyzacji przydzielania zadań</strong>, uporządkowaniu
              procesów i skutecznym dotarciu do osób, które naprawdę chcą pomagać.
              Dołącz do Helpi i zamień chaotyczne arkusze w przejrzysty, nowoczesny
              system zarządzania wolontariatem.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
