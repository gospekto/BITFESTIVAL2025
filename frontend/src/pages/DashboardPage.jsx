import {
  FiMapPin,
  FiBell,
  FiUser,
  FiSearch,
  FiCompass,
  FiClock,
  FiCheckCircle,
  FiTarget,
  FiHeart
} from "react-icons/fi"
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function DashboardPage() {
  const menuRef = useRef();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid lg:grid-cols-[1.2fr,0.9fr] gap-6 mb-8">
          <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-accentBlue/80 font-medium">
                  Radar aktywności
                </p>
                <h2 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                  Pomoc w Twojej okolicy
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Zobacz miejsca, gdzie potrzebna jest pomoc, oraz wolontariuszy w terenie.
                </p>
              </div>
              <button className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-[11px] text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition">
                <FiCompass className="text-xs" />
                Użyj mojej lokalizacji
              </button>
            </div>

            <div className="relative rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 h-64 sm:h-72 overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_10%_20%,#38bdf8_0,transparent_50%),radial-gradient(circle_at_80%_0,#22c55e_0,transparent_55%),radial-gradient(circle_at_50%_90%,#f97316_0,transparent_55%)]" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-40 w-40 rounded-full border border-slate-600/60" />
                <div className="h-56 w-56 rounded-full border border-slate-700/60" />
                <div className="h-72 w-72 rounded-full border border-slate-800/80" />
              </div>

              <RadarPin x="22%" y="35%" label="Potrzebna pomoc" tone="orange" />
              <RadarPin x="65%" y="25%" label="Aktywna akcja" tone="blue" />
              <RadarPin x="45%" y="70%" label="Zgłoszona potrzeba" tone="green" />

              <RadarPin x="32%" y="55%" label="Wolontariusz - Kasia" tone="volunteer" />
              <RadarPin x="78%" y="60%" label="Wolontariusz - Michał" tone="volunteer" />

              <div className="absolute left-3 bottom-3 flex flex-wrap gap-2 bg-slate-900/70 backdrop-blur rounded-2xl px-3 py-2 text-[10px] text-slate-200">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-accentOrange" />
                  <span>miejsca wymagające pomocy</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-accentBlue" />
                  <span>aktywne akcje</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-accentGreen" />
                  <span>zgłoszone potrzeby</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full border border-accentGreen" />
                  <span>wolontariusze</span>
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-accentGreen/80 font-medium">
                    Najbliższe akcje
                  </p>
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                    W Twoim promieniu 10 km
                  </h2>
                </div>
                <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[11px] text-slate-600 dark:text-slate-300">
                  3 dostępne
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <ActionListItem
                  title="Sprzątanie po zalaniu piwnicy"
                  distance="2,4 km od Ciebie"
                  time="dzisiaj 17:00 - 20:00"
                  needed="Potrzebne 3 osoby"
                  status="Pilne"
                  color="orange"
                />
                <ActionListItem
                  title="Dowożenie paczek seniorom"
                  distance="4,1 km od Ciebie"
                  time="jutro 10:00 - 14:00"
                  needed="Potrzebne 5 osób"
                  status="Stała akcja"
                  color="green"
                />
                <ActionListItem
                  title="Malowanie świetlicy dla dzieci"
                  distance="7,8 km od Ciebie"
                  time="sobota 9:00 - 15:00"
                  needed="Potrzebne 6 osób"
                  status="Planowane"
                  color="blue"
                />
              </div>

              <button
                onClick={() => navigate('/feed')}
                className="mt-4 w-full inline-flex items-center justify-center
                           rounded-2xl px-5 py-3
                           text-base sm:text-lg font-semibold
                           bg-accentBlue text-white
                           hover:bg-accentBlue/90
                           active:translate-y-[1px]
                           shadow-soft transition"
              >
                Zobacz wszystkie ogłoszenia
              </button>

            </div>

            <div className="rounded-3xl bg-slate-900 text-slate-50 border border-slate-800 p-4 flex items-start gap-3">
              <div className="h-8 w-8 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                <FiHeart className="text-emerald-400" />
              </div>
              <div className="text-[11px]">
                <p className="font-semibold mb-1">
                  Możesz zostać poproszony o pomoc, gdy jesteś w pobliżu akcji
                </p>
                <p className="text-slate-300 mb-1.5">
                  Organizacje widzą anonimowo, że znajdujesz się niedaleko zgłoszonej potrzeby i mogą
                  zaprosić Cię do wsparcia konkretnego działania.
                </p>
                <p className="text-slate-400">
                  Twoja lokalizacja jest przetwarzana tylko za Twoją zgodą i wyłącznie na potrzeby
                  dopasowania akcji.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-xl bg-accentGreen/15 flex items-center justify-center">
                <FiUser className="text-accentGreen" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Twoje konto wolontariusza
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Zobacz swoje zgłoszenia i historię pomocy.
                </p>
              </div>
            </div>
            <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-accentGreen text-sm" />
                <span>Ukończone akcje: <strong>7</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <FiClock className="text-accentBlue text-sm" />
                <span>Szacowany czas pomocy: <strong>26 godzin</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <FiTarget className="text-accentOrange text-sm" />
                <span>Najczęściej pomagane obszary: <strong>seniorzy, porządki</strong></span>
              </li>
            </ul>
         <button
            onClick={() => navigate("/profile")}
            className="mt-3 w-full inline-flex items-center justify-center rounded-2xl bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-950 text-[11px] font-medium px-3 py-1.5 hover:bg-slate-800 dark:hover:bg-slate-200 transition"
          >
          Przejdź do profilu
        </button>
          </section>

          <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
              Twoje nadchodzące działania
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
              Zobacz gdzie i kiedy w najbliższym czasie będziesz pomagać.
            </p>

            <div className="space-y-2 text-xs">
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-3 py-2">
                <p className="font-medium text-slate-900 dark:text-white">
                  Sobota - Warsztaty dla dzieci
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  10:00 - 13:00, Dom Kultury "Przystań"
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-3 py-2">
                <p className="font-medium text-slate-900 dark:text-white">
                  Niedziela - Zbiórka żywności w sklepie
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  12:00 - 16:00, osiedlowy market
                </p>
              </div>
              <button className="mt-2 text-[11px] text-accentBlue hover:text-accentBlue/80">
                Pokaż cały kalendarz
              </button>
            </div>
          </section>

          <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Szybkie akcje
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
              Co możesz zrobić w Helpi w kilka kliknięć.
            </p>
            <div className="space-y-2 text-xs">
              <QuickAction label="Znajdź najbliższą akcję dziś" />
              <QuickAction label="Zaktualizuj swoją dostępność" />
              <QuickAction label="Dodaj swoje umiejętności do profilu" />
              <QuickAction label="Włącz powiadomienia o akcjach w Twojej okolicy" />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}


function RadarPin({ x, y, label, tone }) {
  let colorClasses = ""
  if (tone === "orange") {
    colorClasses = "bg-accentOrange/90"
  } else if (tone === "blue") {
    colorClasses = "bg-accentBlue/90"
  } else if (tone === "green") {
    colorClasses = "bg-accentGreen/90"
  } else if (tone === "volunteer") {
    colorClasses = "border border-accentGreen bg-slate-900/80"
  }

  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ left: x, top: y }}
    >
      <div className={`h-3 w-3 rounded-full ${colorClasses} shadow-lg`} />
      <div className="mt-1 rounded-full bg-slate-900/80 px-2 py-0.5 text-[9px] text-slate-100 whitespace-nowrap">
        {label}
      </div>
    </div>
  )
}

function ActionListItem({ title, distance, time, needed, status, color }) {
  const badgeClass =
    color === "orange"
      ? "bg-accentOrange/10 text-accentOrange"
      : color === "green"
      ? "bg-accentGreen/10 text-accentGreen"
      : "bg-accentBlue/10 text-accentBlue"

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/80 px-3 py-2">
      <div className="flex items-center justify-between mb-0.5">
        <p className="text-[12px] font-semibold text-slate-900 dark:text-white">
          {title}
        </p>
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${badgeClass}`}>
          {status}
        </span>
      </div>
      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        {distance} • {time}
      </p>
      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        {needed}
      </p>
    </div>
  )
}

function QuickAction({ label }) {
  return (
    <button className="w-full text-left flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-700 px-3 py-1.5 hover:border-accentBlue/70 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-200 transition">
      <span className="h-1.5 w-1.5 rounded-full bg-accentBlue" />
      <span>{label}</span>
    </button>
  )
}
