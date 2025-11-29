import {
  FiMapPin,
  FiPlus,
  FiUsers,
  FiClipboard,
  FiClock,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiTarget
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function OrganizationDashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [ads, setAds] = useState([
    {
      id: 1,
      title: "Zbiórka żywności dla seniorów",
      date: "2025-02-12",
      volunteers: 12,
      status: "Aktywne",
      color: "green"
    },
    {
      id: 2,
      title: "Wsparcie po burzy – sprzątanie parku",
      date: "2025-02-14",
      volunteers: 4,
      status: "Planowane",
      color: "blue"
    },
    {
      id: 3,
      title: "Malowanie świetlicy",
      date: "2025-02-20",
      volunteers: 6,
      status: "Zakończone",
      color: "gray"
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">

      {/* HEADER */}
      <header className="px-4 sm:px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 backdrop-blur">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Panel organizacji</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Witaj, {user?.name || "organizacjo"}! Zarządzaj ogłoszeniami i akcjami.
            </p>
          </div>

          <button
            onClick={() => navigate("/new-ad")}
            className="inline-flex items-center gap-2 bg-accentBlue/80 hover:bg-accentBlue/90 text-white dark:text-slate-900 px-4 py-2 rounded-2xl text-sm font-medium shadow-soft transition"
          >
            <FiPlus className="text-sm" />
            Dodaj ogłoszenie
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* GRID 1 – MAPA + PODSUMOWANIA */}
        <div className="grid lg:grid-cols-[1.5fr,1fr] gap-6 mb-8">

          {/* MAPA */}
          <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-accentBlue/80 font-medium">
                  Mapa działań
                </p>
                <h2 className="text-sm sm:text-base font-semibold">Twoje aktywności w terenie</h2>
              </div>
              <button className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-[11px] hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                Użyj mojej lokalizacji
              </button>
            </div>

            <div className="relative h-72 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden shadow-inner">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_40%_30%,#38bdf8_0,transparent_50%),radial-gradient(circle_at_80%_80%,#22c55e_0,transparent_55%)]" />

              <p className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                (Mapa – tu możesz podłączyć Leaflet, Mapbox lub Google Maps)
              </p>
            </div>
          </section>

          {/* PODSUMOWANIA */}
          <section className="flex flex-col gap-4">

            <SummaryCard
              icon={<FiUsers />}
              title="Wolontariusze przypisani do Twoich akcji"
              value="42"
              sub="aktywnych w tym miesiącu"
              color="green"
            />

            <SummaryCard
              icon={<FiClipboard />}
              title="Opublikowane ogłoszenia"
              value={ads.length}
              sub="zarządzaj wszystkimi ogłoszeniami"
              color="blue"
            />

            <SummaryCard
              icon={<FiClock />}
              title="Średni czas realizacji akcji"
              value="3.5h"
              sub="na podstawie ostatnich 10 akcji"
              color="orange"
            />
          </section>
        </div>

        {/* LISTA OGŁOSZEŃ */}
        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-accentGreen/80 font-medium">
                Twoje ogłoszenia
              </p>
              <h2 className="text-sm font-semibold">Zarządzaj bieżącymi działaniami</h2>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {ads.length} ogłoszeń
            </span>
          </div>

          <div className="space-y-3">
            {ads.map((a) => (
              <AdItem key={a.id} ad={a} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* === KOMPONENTY POMOCNICZE === */
/* ─────────────────────────────────────────────────────────────── */

function SummaryCard({ icon, title, value, sub, color }) {
  const colorMap = {
    green: "text-accentGreen bg-accentGreen/15",
    blue: "text-accentBlue bg-accentBlue/15",
    orange: "text-accentOrange bg-accentOrange/15"
  };

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-start gap-3 shadow-sm">
      <div className={`h-10 w-10 rounded-2xl flex items-center justify-center ${colorMap[color]}`}>
        {icon}
      </div>
      <div className="text-xs">
        <p className="font-semibold">{title}</p>
        <p className="text-lg font-bold mt-1">{value}</p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">{sub}</p>
      </div>
    </div>
  );
}

function AdItem({ ad }) {
  let badge =
    ad.color === "green"
      ? "bg-accentGreen/10 text-accentGreen"
      : ad.color === "blue"
      ? "bg-accentBlue/10 text-accentBlue"
      : "bg-slate-400/10 text-slate-400";

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/70 px-3 py-3 flex items-center justify-between">
      <div>
        <p className="text-[13px] font-semibold">{ad.title}</p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Data: {ad.date} • Wolontariusze: {ad.volunteers}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${badge}`}>
          {ad.status}
        </span>

        <button className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition">
          <FiEdit2 className="text-slate-500 dark:text-slate-300" />
        </button>
        <button className="p-1.5 rounded-xl hover:bg-red-200/30 dark:hover:bg-red-900/20 transition">
          <FiTrash2 className="text-red-500" />
        </button>
      </div>
    </div>
  );
}
