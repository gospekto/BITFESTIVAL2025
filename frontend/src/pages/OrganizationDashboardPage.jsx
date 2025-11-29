import {
  FiPlus,
  FiMapPin,
  FiClock,
  FiEdit2,
  FiTrash2,
  FiUsers,
  FiLayers
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

export default function OrganizationDashboardPage() {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // pobranie ogłoszeń organizacji
  useEffect(() => {
    const loadAds = async () => {
      try {
        const res = await axios.get("/organization/ads");
        setAds(res.data || []);
      } catch (err) {
        console.error("Błąd ładowania ogłoszeń:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAds();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">

        {/* ====== GŁÓWNY NAGŁÓWEK ====== */}
        <header className="mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold">Panel organizacji</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Zarządzaj ogłoszeniami i działaniami swojej organizacji.
          </p>
        </header>

        {/* ====== MAPA ====== */}
        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft p-5 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Mapa działań Twojej organizacji</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Zobacz gdzie prowadzone są akcje lub oczekiwana jest pomoc.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 h-72 overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_10%_20%,#38bdf8_0,transparent_50%),radial-gradient(circle_at_80%_0,#22c55e_0,transparent_55%),radial-gradient(circle_at_50%_90%,#f97316_0,transparent_55%)]" />

            <MapPin x="45%" y="50%" label="Akcja: Zbiórka żywności" />
            <MapPin x="70%" y="30%" label="Akcja: Warsztaty" />
            <MapPin x="25%" y="65%" label="Miejsce potrzeb" />
          </div>
        </section>

        {/* ====== OGŁOSZENIA + PRZYCISK ====== */}
        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold">Twoje ogłoszenia</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Zarządzaj akcjami i publikacjami swojej organizacji.
              </p>
            </div>

            <button
              onClick={() => navigate("/new-ad")}
              className="inline-flex items-center gap-2 bg-accentBlue text-white px-4 py-2 rounded-2xl text-sm font-medium shadow-soft hover:bg-accentBlue/90 transition"
            >
              <FiPlus className="text-sm" />
              Dodaj ogłoszenie
            </button>
          </div>

          {loading ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Ładowanie ogłoszeń...
            </p>
          ) : ads.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Nie masz jeszcze żadnych ogłoszeń.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {ads.map((item) => (
                <AdItem key={item.id} ad={item} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* ====== PIN NA MAPIE ====== */
function MapPin({ x, y, label }) {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ left: x, top: y }}
    >
      <div className="h-3 w-3 rounded-full bg-accentBlue shadow-lg" />
      <div className="mt-1 rounded-full bg-slate-900/80 px-2 py-0.5 text-[9px] text-slate-100 whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}

/* ====== POJEDYNCZE OGŁOSZENIE ====== */
function AdItem({ ad }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-sm">{ad.title}</h3>

        <div className="flex gap-2">
          <button className="p-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition">
            <FiEdit2 className="text-xs" />
          </button>
          <button className="p-2 rounded-xl bg-red-200/20 dark:bg-red-800/30 hover:bg-red-300/30 dark:hover:bg-red-700/30 transition">
            <FiTrash2 className="text-xs text-red-500" />
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
        {ad.short_description}
      </p>

      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
        <FiMapPin />
        <span>{ad.location}</span>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
        <FiClock />
        <span>{ad.date}</span>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
        <FiUsers />
        <span>{ad.people_needed} osób potrzebnych</span>
      </div>
    </div>
  );
}
