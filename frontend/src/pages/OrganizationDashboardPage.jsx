import {
  FiPlus,
  FiMapPin,
  FiClock,
  FiArrowLeft,
  FiTrash2,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import MyActivityRadarMap from "../components/MyActivityRadarMap";

export default function OrganizationDashboardPage() {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);

  // pobranie ogłoszeń organizacji
  useEffect(() => {
    const loadAds = async () => {
      try {
        const res = await axios.get("/notices");
        setAds(res.data.notices || []);
        } catch (err) {
        console.error("Błąd ładowania ogłoszeń:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAds();
  }, []);
  
  const handleDelete = async (id) => {
     try {
       await axios.delete(`/notices/${id}`);
       setAds((prev) => prev.filter((ad) => ad.id !== id));
       setSuccessMessage("Usunięto");
       setTimeout(() => setSuccessMessage(null), 2000);
     } catch (e) {
       console.error("Błąd usuwania ogłoszenia:", e);
     }
   };

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

            <MyActivityRadarMap rangeKm={15}/>
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
                <AdItem key={item.id} ad={item} onDelete={handleDelete}/>
              ))}
            </div>
          )}
        </section>
      </div>
      {successMessage && (
        <div
          className="
            fixed top-4 left-1/2 -translate-x-1/2
            bg-emerald-500 text-white 
            px-4 py-2 rounded-xl shadow-lg 
            animate-slide-in
          "
        >
          {successMessage}
        </div>
      )}
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

function AdItem({ ad, onDelete }) {
  const navigate = useNavigate();
  
  const handleDeleteClick = async () => {
      try {
        await onDelete(ad.id);
      } catch (e) {
        console.log(e);
      }
    };
  
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-sm">{ad.title}</h3>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/notice/${ad.id}`)}
            className="
              inline-flex items-center gap-2
              px-4 py-2
              rounded-xl
              bg-accentBlue/10 text-accentBlue
              dark:bg-accentBlue/20 dark:text-accentBlue
              hover:bg-accentBlue/20 dark:hover:bg-accentBlue/30
              text-sm font-medium
              shadow-sm hover:shadow-md
              transition-all
            "
          >
            Zobacz szczegóły
            <FiArrowLeft className="rotate-180 text-[14px]" />
          </button>
          <button 
            className="p-2 rounded-xl bg-red-200/20 dark:bg-red-800/30 hover:bg-red-300/30 dark:hover:bg-red-700/30 transition"
            onClick={() => handleDeleteClick()}
          >
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
    </div>
  );
}
