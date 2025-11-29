import NoticeCard from "../components/NoticeCard";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function NoticesFeed() {
  const mockData = [
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
      },
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
      },
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
      },
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-4 py-12">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
      >
        <FiArrowLeft className="text-xs" />
        Wróć
      </Link>
      <h1 className="text-center w-full text-2xl font-bold">Ogłoszenia</h1>
      {mockData.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} />
      ))}
    </div>
  );
}
