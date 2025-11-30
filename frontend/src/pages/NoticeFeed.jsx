import { useEffect, useState } from "react";
import NoticeCard from "../components/NoticeCard";
import { FiArrowLeft } from "react-icons/fi";
import api from "../axios";
import { useNavigate } from "react-router-dom";

export default function NoticesFeed() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);

        const res = await api.get("/all-notices");
        setNotices(res.data?.notices || []);

      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Nie udało się pobrać ogłoszeń."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-4 py-12">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
      >
        <FiArrowLeft className="text-xs" />
        Wróć
      </button>

      <h1 className="text-center w-full text-2xl font-bold">Ogłoszenia</h1>

      {loading && (
        <p className="text-center text-slate-500">Ładowanie ogłoszeń...</p>
      )}

      {error && (
        <div className="text-center text-red-500 text-sm">{error}</div>
      )}

      {!loading && notices.length === 0 && (
        <p className="text-center text-slate-400 text-sm">
          Brak dostępnych ogłoszeń.
        </p>
      )}

      {notices.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} />
      ))}
    </div>
  );
}
