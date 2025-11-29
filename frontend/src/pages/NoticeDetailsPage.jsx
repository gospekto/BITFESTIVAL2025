import { useParams, useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
  FiHeart,
  FiArrowLeft,
} from "react-icons/fi";
import PaymentModal from "../components/PaymentModal";
import { useEffect, useState } from "react";
import axios from "../axios";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function NoticeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  const handleSupportFinancially = () => setOpenPaymentModal(true);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/notices/${id}`);
        setNotice(res.data.notice);
      } catch (err) {
        setError("Nie udało się pobrać ogłoszenia.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Ładowanie ogłoszenia...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <button onClick={() => navigate(-1)} className="mb-4">
          <FiArrowLeft /> Wróć
        </button>
        <p>{error}</p>
      </div>
    );

  if (!notice)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <button onClick={() => navigate(-1)} className="mb-4">
          <FiArrowLeft /> Wróć
        </button>
        <p>Ogłoszenie nie zostało znalezione.</p>
      </div>
    );

  // ---- MAPA – parsowanie "50.050085,19.160156"
  const [lat, lng] = notice.location
    ? notice.location.split(",").map((v) => parseFloat(v.trim()))
    : [null, null];

  const formattedDate = notice.date
    ? new Date(notice.date).toLocaleDateString("pl-PL", {
        weekday: "short",
        day: "2-digit",
        month: "long",
      })
    : null;

  const spotsLeft =
    typeof notice.max_people === "number"
      ? Math.max(
          notice.max_people - (notice.registered_users_count ?? 0),
          0
        )
      : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            <FiArrowLeft className="text-xs" /> Wróć
          </button>

          {notice.category && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] uppercase tracking-wide bg-accentBlue/10 text-accentBlue">
              {notice.category}
            </span>
          )}
        </div>

        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft overflow-hidden">
          {notice.image_url && (
            <div className="h-48 sm:h-64 w-full overflow-hidden">
              <img
                src={`https://hackathon.drokgames.pl${notice.image_url}`}
                alt={notice.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="p-5 sm:p-7">
            {/* Tytuł + organizacja */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold mb-1">
                  {notice.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {notice.organization?.name || "Organizacja"} ·{" "}
                  <span className="inline-flex items-center gap-1 text-accentGreen">
                    <FiHeart className="text-xs" /> Wolontariat
                  </span>
                </p>
              </div>

              {spotsLeft !== null && (
                <span
                  className={
                    "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium " +
                    (spotsLeft === 0
                      ? "bg-accentOrange/10 text-accentOrange"
                      : "bg-accentGreen/10 text-accentGreen")
                  }
                >
                  {spotsLeft === 0
                    ? "Brak wolnych miejsc"
                    : `Zostało ${spotsLeft} miejsc`}
                </span>
              )}
            </div>

            {/* Data + godzina + lokalizacja */}
            <div className="grid sm:grid-cols-3 gap-3 mb-5 text-xs text-slate-600 dark:text-slate-300">
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/70 border p-3 flex items-start gap-2">
                <FiCalendar className="mt-[2px] text-accentBlue" />
                <div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Data
                  </p>
                  <p className="font-medium">{formattedDate}</p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/70 border p-3 flex items-start gap-2">
                <FiClock className="mt-[2px] text-accentGreen" />
                <div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Godzina
                  </p>
                  <p className="font-medium">{notice.time || "Do ustalenia"}</p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/70 border p-3 flex items-start gap-2">
                <FiMapPin className="mt-[2px] text-accentOrange" />
                <div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Lokalizacja
                  </p>
                  <p className="font-medium">{notice.location}</p>
                </div>
              </div>
            </div>

            {/* MAPA */}
            {lat && lng && (
              <div className="rounded-2xl overflow-hidden mb-6 border border-slate-200 dark:border-slate-700">
                <MapContainer
                  center={[lat, lng]}
                  zoom={14}
                  scrollWheelZoom={false}
                  style={{ height: "300px", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[lat, lng]} icon={markerIcon}>
                    <Popup>{notice.title}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            )}

            {/* Opis */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold mb-2">Opis ogłoszenia</h2>
              <p className="text-sm leading-relaxed">
                {notice.description}
              </p>
            </div>

            {/* Organizacja */}
            {notice.organization && (
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/60 border p-4 flex gap-3 items-start">
                <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-accentBlue via-accentGreen to-accentOrange flex items-center justify-center text-white text-sm font-semibold">
                  {notice.organization.name?.[0]}
                </div>
                <div>
                  <p className="text-xs font-semibold">
                    {notice.organization.name}
                  </p>
                </div>
              </div>
            )}

            {/* Przyciski */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
              <button className="inline-flex items-center justify-center px-6 py-2.5 rounded-2xl text-xl font-semibold bg-accentGreen/90 hover:bg-accentGreen text-white w-full sm:w-auto">
                Zgłoś się do ogłoszenia
              </button>
              <button
                onClick={handleSupportFinancially}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-2xl text-xl font-semibold bg-accentBlue/90 hover:bg-accentBlue text-white w-full sm:w-auto"
              >
                Wesprzyj finansowo
              </button>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        open={openPaymentModal}
        notice={notice}
        onClose={() => setOpenPaymentModal(false)}
      />
    </div>
  );
}
