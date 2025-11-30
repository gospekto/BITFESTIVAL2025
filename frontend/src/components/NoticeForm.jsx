import { useState } from "react";
import {
  FiType,
  FiTag,
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiImage,
  FiAlignLeft,
  FiX,
} from "react-icons/fi";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import axios from '../axios';
import { useNavigate } from "react-router-dom";
import VolunteerMap from "./VolunteerMap";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

async function createNotice(notice) {
  try {
    const formData = new FormData();
    formData.append("title", notice.title);
    formData.append("category", notice.category);
    formData.append("date", notice.date);
    formData.append("description", notice.description);
    formData.append("location", notice.location);
    formData.append("latitude", notice.latitude);
    formData.append("longitude", notice.longitude);
    if (notice.max_people !== null && notice.max_people !== undefined) {
      formData.append("max_people", String(notice.max_people));
    }
    if (notice.imageFile) {
      formData.append("image", notice.imageFile);
    }
    const res = await axios.post("/notices", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { status: "ok", notice: res.data };
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const errors = error.response.data.errors || {};
      const messages = Object.values(errors).flat();
      throw new Error(messages[0] || "Błąd walidacji formularza.");
    }
    console.error("Błąd zapisu ogłoszenia:", error);
    throw new Error("Nie udało się dodać ogłoszenia.");
  }
}

function LocationPicker({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect({
        lat: Number(e.latlng.lat.toFixed(6)),
        lng: Number(e.latlng.lng.toFixed(6)),
      });
    },
  });
  return null;
}

export default function NoticeForm({ onNoticeCreated }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [locationCoords, setLocationCoords] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [maxPeople, setMaxPeople] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [noticeCreated, setNoticeCreated] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImageFile(null);
      setImagePreview("");
      return;
    }
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!locationCoords) {
      setApiError("Wybierz lokalizację na mapie.");
      return;
    }

    setApiError("");
    setApiSuccess("");
    setIsSubmitting(true);

    const locationPayload = `${locationCoords.lat} ${locationCoords.lng}`;

    const noticePayload = {
      title,
      category,
      date,
      description,
      location: locationPayload,
      latitude: locationCoords.lat,
      longitude: locationCoords.lng,
      imageFile: imageFile || null,
      max_people: maxPeople ? Number(maxPeople) : null,
    };

    try {
      const res = await createNotice(noticePayload);
      setApiSuccess("Ogłoszenie zostało dodane.");
      setNoticeCreated(res.notice);
      setIsModalOpen(true); // otwórz modal z mapą
      onNoticeCreated && onNoticeCreated(res.notice);

      // reset formularza
      setTitle("");
      setCategory("");
      setDate("");
      setDescription("");
      setLocationCoords(null);
      setMaxPeople("");
      setImageFile(null);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview("");
    } catch (err) {
      setApiError(err.message || "Błąd dodawania ogłoszenia.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div
      className="w-full 
                 bg-white dark:bg-slate-900 
                 rounded-2xl shadow-soft border 
                 border-slate-200 dark:border-slate-800
                 p-6 sm:p-8 transition-colors"
    >
      <button
        onClick={() => navigate("/feed")}
        className="px-3 py-1 my-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
      >
        Zobacz wszystkie ogłoszenia
      </button>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-2 py-1 mb-3 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="h-2 w-2 rounded-full bg-accentBlue" />
            Formularz dodawania ogłoszenia • Helpi
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
            Dodaj nowe ogłoszenie
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Opisz potrzebę, wybierz kategorię i wskaż miejsce na mapie.
          </p>
        </div>
      </div>

      {apiError && (
        <div className="mb-4 text-sm rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 px-3 py-2 text-red-700 dark:text-red-300">
          {apiError}
        </div>
      )}
      {apiSuccess && (
        <div className="mb-4 text-sm rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950 px-3 py-2 text-emerald-700 dark:text-emerald-300">
          {apiSuccess}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Tytuł ogłoszenia
          </label>
          <div
            className="flex items-center gap-2 rounded-2xl 
                       border border-slate-200 
                       bg-slate-50
                       px-3 py-2.5 
                       focus-within:border-accentBlue/70 
                       focus-within:bg-white
                       transition"
          >
            <FiType className="text-slate-400 text-sm" />
            <input
              type="text"
              className="w-full bg-transparent text-sm outline-none 
                         placeholder:text-slate-400 
                         text-slate-900"
              placeholder="Np. Weekendowa akcja sprzątania parku"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Kategoria
            </label>
            <div
              className="flex items-center gap-2 rounded-2xl 
                         border border-slate-200 
                         bg-slate-50
                         px-3 py-2.5 
                         focus-within:border-accentBlue/70 
                         focus-within:bg-white
                         transition"
            >
              <FiTag className="text-slate-400 text-sm" />
              <select
                className="w-full bg-transparent text-sm outline-none text-slate-900 placeholder:text-slate-400"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isSubmitting}
              >
                <option value="">Wybierz kategorię</option>
                <option value="event">Wydarzenie / event</option>
                <option value="fundraising">Zbiórka / fundraising</option>
                <option value="workshop">Edukacja / warsztaty</option>
                <option value="individual_support">Wsparcie indywidualne</option>
                <option value="other">Inne</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Data wydarzenia
            </label>
            <div
              className="flex items-center gap-2 rounded-2xl 
                         border border-slate-200 
                         bg-slate-50
                         px-3 py-2.5 
                         focus-within:border-accentBlue/70 
                         focus-within:bg-white
                         transition"
            >
              <FiCalendar className="text-slate-400 text-sm" />
              <input
                type="date"
                className="w-full bg-transparent text-sm outline-none text-slate-900"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <FiMapPin className="text-slate-400" />
              Lokalizacja na mapie (wymagana)
            </label>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
            {!isMapReady && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="h-6 w-6 rounded-full border-2 border-accentBlue border-t-transparent animate-spin mb-2" />
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Ładowanie mapy…
                </p>
              </div>
            )}

            <MapContainer
              center={[52.23, 21.01]}
              zoom={6}
              scrollWheelZoom={true}
              className="h-64 w-full"
              whenReady={() => setIsMapReady(true)}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationPicker onSelect={(coords) => setLocationCoords(coords)} />
              {locationCoords && (
                <Marker
                  position={[locationCoords.lat, locationCoords.lng]}
                  icon={markerIcon}
                />
              )}
            </MapContainer>

            <div className="absolute bottom-0 inset-x-0 bg-white/80 dark:bg-slate-900/85 border-t border-slate-200/70 dark:border-slate-800/80 px-3 py-2 flex items-center justify-between gap-3 text-[11px] text-slate-600 dark:text-slate-300">
              <div className="flex flex-col">
                {locationCoords ? (
                  <>
                    <span className="font-medium">Lokalizacja wybrana na mapie</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      Lat: {locationCoords.lat} · Lng: {locationCoords.lng}
                    </span>
                  </>
                ) : (
                  <span>
                    Kliknij w mapę, aby ustawić lokalizację wydarzenia (wymagane
                    do zapisania ogłoszenia).
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-[0.9fr,1.1fr] gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Maksymalna liczba wolontariuszy
              </label>
              <div
                className="flex items-center gap-2 rounded-2xl 
                           border border-slate-200 
                           bg-slate-50
                           px-3 py-2.5 
                           focus-within:border-accentGreen/70 
                           focus-within:bg-white
                           transition"
              >
                <FiUsers className="text-slate-400 text-sm" />
                <input
                  type="number"
                  min="1"
                  className="w-full bg-transparent text-sm outline-none 
                             placeholder:text-slate-400 
                             text-slate-900"
                  placeholder="Np. 10"
                  value={maxPeople}
                  onChange={(e) => setMaxPeople(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Obrazek / grafika wydarzenia (opcjonalnie)
          </label>
          <div
            className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl 
                       border border-slate-200 
                       bg-slate-50
                       px-3 py-2.5 
                       transition"
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-accentOrange/20 flex items-center justify-center">
                <FiImage className="text-accentOrange" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-700">Dodaj plik graficzny</span>
                <span className="text-[11px] text-slate-400">
                  Nazwa pliku zostanie wysłana jako{" "}
                  <code>image_path</code>
                </span>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-end gap-2">
              <label className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 cursor-pointer transition">
                Wybierz plik
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isSubmitting}
                  className="hidden"
                />
              </label>
              {imageFile && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="inline-flex items-center gap-1 text-[11px] px-3 py-1.5 rounded-full border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition"
                >
                  <FiX className="text-xs" />
                  Usuń zdjęcie
                </button>
              )}
            </div>
          </div>

          {imageFile && (
            <div className="mt-2 flex items-center gap-3">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Podgląd"
                  className="h-12 w-12 rounded-xl object-cover border border-slate-200"
                />
              )}
              <div className="flex flex-col">
                <span className="text-xs text-slate-700 dark:text-slate-200">
                  {imageFile.name}
                </span>
                <span className="text-[11px] text-slate-400">
                  Rozmiar: {(imageFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Opis ogłoszenia
          </label>
          <div
            className="flex items-start gap-2 rounded-2xl 
                       border border-slate-200 
                       bg-slate-50
                       px-3 py-2.5 
                       focus-within:border-accentBlue/70 
                       focus-within:bg-white
                       transition"
          >
            <FiAlignLeft className="text-slate-400 text-sm mt-1" />
            <textarea
              rows={4}
              className="w-full bg-transparent text-sm outline-none 
                         placeholder:text-slate-400 
                         text-slate-900 resize-none"
              placeholder="Opisz krótko, czego dotyczy akcja, jakie są zadania wolontariuszy, ile czasu potrzeba itp."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 
                       rounded-2xl 
                       bg-accentBlue/80 hover:bg-accentBlue/90 
                       text-white dark:text-slate-950
                       text-sm font-medium py-2.5 px-6
                       shadow-soft hover:shadow-none hover:translate-y-[1px] active:translate-y-[2px]
                       transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Zapisywanie ogłoszenia...
              </>
            ) : (
              "Dodaj ogłoszenie"
            )}
          </button>
        </div>
      </form>
    </div>
      {isModalOpen && noticeCreated && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl w-[90%] max-w-3xl p-6 relative"
            onClick={(e) => e.stopPropagation()} // zapobiega zamknięciu przy kliknięciu w treść
          >
            <button
              className="absolute top-3 right-3 text-slate-600 dark:text-slate-400 hover:text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              <FiX size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
              Wolontariusze w pobliżu
            </h2>
            <div className="h-96 w-full">
              <VolunteerMap
                latitude={noticeCreated.latitude}
                longitude={noticeCreated.longitude}
              />
            </div>
          </div>
        </div>
      )}
    </> 
  );
}
