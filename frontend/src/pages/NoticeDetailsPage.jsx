import { useParams, Link } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
  FiArrowLeft,
  FiHeart,
} from "react-icons/fi";
import PaymentModal from "../components/PaymentModal";
import { useState } from "react";

const mockNotices = [
  {
    id: 1,
    title: "Pomoc przy wydawaniu żywności",
    category: "Humanitarian",
    date: "2025-03-12",
    time: "17:00",
    location: "Warszawa, ul. Dobra 15",
    image_path: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb",
    max_people: 20,
    registered_users_count: 12,
    organization: {
      name: "Fundacja Serce Miasta",
      description:
        "Fundacja wspierająca osoby w kryzysie bezdomności oraz rodziny w trudnej sytuacji życiowej.",
    },
    description:
      "Potrzebujemy wolontariuszy do pomocy przy wydawaniu posiłków osobom potrzebującym. Zadania obejmują pomoc na stołówce, wydawanie posiłków, utrzymanie porządku oraz krótkie rozmowy wspierające.",
  },
  {
    id: 2,
    title: "Sprzątanie lasu Kabackiego",
    category: "Environment",
    date: "2025-03-20",
    time: "10:00",
    location: "Las Kabacki, Parking Pólko",
    image_path: null,
    max_people: 50,
    registered_users_count: 44,
    organization: {
      name: "EcoVolunteers",
      description:
        "Grupa wolontariuszy dbających o tereny zielone i edukację ekologiczną.",
    },
    description:
      "Dołącz do akcji sprzątania Lasu Kabackiego! Zapewniamy rękawiczki, worki i dobrą atmosferę. Weź wygodne buty i strój odpowiedni do pogody.",
  },
  {
    id: 3,
    title: "Warsztaty dla dzieci z Ukrainy",
    category: "Education",
    date: "2025-03-18",
    time: "15:30",
    location: "Kraków, ul. Karmelicka 20",
    image_path: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c",
    max_people: 12,
    registered_users_count: 12,
    organization: {
      name: "Stowarzyszenie Wsparcie Razem",
      description:
        "Organizacja wspierająca rodziny uchodźcze poprzez edukację, integrację i działania lokalne.",
    },
    description:
      "Prowadzenie kreatywnych warsztatów plastycznych i gier integracyjnych dla dzieci w wieku 6–12 lat. Materiały zapewnia organizacja.",
  },
];

export default function NoticeDetailsPage() {
  const { id } = useParams();
  const noticeId = Number(id);
  const notice = mockNotices.find((n) => n.id === noticeId);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  
  const handleSupportFinancially = () => {
    setOpenPaymentModal(true);
  }

  if (!notice) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mb-4"
          >
            <FiArrowLeft className="text-xs" />
            Wróć do strony głównej
          </Link>
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Ogłoszenie o podanym identyfikatorze nie istnieje lub zostało
              usunięte.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const {
    title,
    category,
    date,
    time,
    location,
    image_path,
    max_people,
    registered_users_count,
    organization,
    description,
  } = notice;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("pl-PL", {
        weekday: "short",
        day: "2-digit",
        month: "long",
      })
    : null;

  const spotsLeft =
    typeof max_people === "number"
      ? Math.max(max_people - registered_users_count, 0)
      : null;

  const capacityPercent =
    typeof max_people === "number" && max_people > 0
      ? Math.min((registered_users_count / max_people) * 100, 100)
      : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            <FiArrowLeft className="text-xs" />
            Wróć
          </Link>
          {category && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] uppercase tracking-wide bg-accentBlue/10 text-accentBlue">
              {category}
            </span>
          )}
        </div>

        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft overflow-hidden">
          {image_path && (
            <div className="h-48 sm:h-64 w-full overflow-hidden">
              <img
                src={image_path}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="p-5 sm:p-7">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white mb-1">
                  {title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {organization?.name || "Zweryfikowana organizacja"} ·{" "}
                  <span className="inline-flex items-center gap-1 text-accentGreen">
                    <FiHeart className="text-xs" />
                    Wolontariat
                  </span>
                </p>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-2">
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
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mb-5 text-xs text-slate-600 dark:text-slate-300">
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 p-3 flex items-start gap-2">
                <FiCalendar className="mt-[2px] text-accentBlue" />
                <div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Data
                  </p>
                  <p className="font-medium">
                    {formattedDate || "Do ustalenia"}
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 p-3 flex items-start gap-2">
                <FiClock className="mt-[2px] text-accentGreen" />
                <div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Godzina
                  </p>
                  <p className="font-medium">{time || "Do ustalenia"}</p>
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 p-3 flex items-start gap-2">
                <FiMapPin className="mt-[2px] text-accentOrange" />
                <div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Lokalizacja
                  </p>
                  <p className="font-medium">{location}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mb-1">
                <div className="inline-flex items-center gap-1.5">
                  <FiUsers className="text-accentGreen" />
                  <span>
                    {registered_users_count} zgłoszeń
                    {typeof max_people === "number" && ` / ${max_people} miejsc`}
                  </span>
                </div>
                {capacityPercent !== null && (
                  <span>{Math.round(capacityPercent)}% zajętych miejsc</span>
                )}
              </div>
              {capacityPercent !== null && (
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accentGreen via-accentBlue to-accentOrange transition-all"
                    style={{ width: `${capacityPercent}%` }}
                  />
                </div>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Opis ogłoszenia
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {description}
              </p>
            </div>

            {organization && (
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 p-4 flex gap-3 items-start">
                <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-accentBlue via-accentGreen to-accentOrange flex items-center justify-center text-white text-sm font-semibold">
                  {organization.name[0]}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">
                    {organization.name}
                  </p>
                  {organization.description && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      {organization.description}
                    </p>
                  )}
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center sm:items-center gap-3 sm:gap-4 mt-2">
              <button
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-2xl text-xl font-semibold
                           bg-accentGreen/90 hover:bg-accentGreen
                           text-white shadow-soft active:translate-y-[1px] transition-all
                           w-full sm:w-auto"
              >
                Zgłoś się do ogłoszenia
              </button>
              <button
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-2xl text-xl font-semibold
                           bg-accentBlue/90 hover:bg-accentBlue
                           text-white shadow-soft active:translate-y-[1px] transition-all
                           w-full sm:w-auto"
                onClick={handleSupportFinancially}
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
        onClose={() => {
          setOpenPaymentModal(false);
        }}
      />
    </div>
  );
}
