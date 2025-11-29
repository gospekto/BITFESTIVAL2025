import { FiCalendar, FiMapPin, FiUsers, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ManageNoticesList({ notices = [], onDelete }) {
  const navigate = useNavigate();
  
  return (
    <div className="w-full max-w-5xl mx-auto">
      <header className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-2 py-1 mb-3 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="h-2 w-2 rounded-full bg-accentBlue" />
          Panel ogłoszeń organizacji • Helpi
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
          Ogłoszenia
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Zarządzaj opublikowanymi ogłoszeniami. Możesz je przeglądać i usuwać.
        </p>
      </header>

      {notices.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/60 px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
          Nie masz jeszcze żadnych ogłoszeń. Dodaj pierwsze, aby pojawiło się
          na tej liście.
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map((notice) => (
            <article
              key={notice.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm px-4 py-4 sm:px-5 sm:py-4 flex flex-col gap-3"
            >
              <div 
                className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    {notice.title}
                  </h2>
                  {notice.category && (
                    <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-[2px] text-[10px] font-medium text-slate-600 dark:text-slate-300">
                      {notice.category}
                    </p>
                  )}
                </div>
                <div className="flex gap-8">
                  <button
                    type="button"
                    onClick={() => onDelete && onDelete(notice.id)}
                    className="inline-flex items-center gap-1.5 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 px-3 py-1.5 text-[11px] font-semibold text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900 active:translate-y-[1px] transition"
                  >
                    <FiTrash2 className="text-xs" />
                    USUŃ
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/notice/${notice.id}`)}
                    className="inline-flex items-center gap-1.5 rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 px-3 py-1.5 text-[11px] font-semibold text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 active:translate-y-[1px] transition"
                  >
                    Zobacz szczegóły
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                {notice.date && (
                  <span className="inline-flex items-center gap-1.5">
                    <FiCalendar className="text-slate-400" />
                    {notice.date}
                  </span>
                )}
                {notice.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <FiMapPin className="text-slate-400" />
                    {notice.location}
                  </span>
                )}
                {typeof notice.max_people !== "undefined" &&
                  notice.max_people !== null && (
                    <span className="inline-flex items-center gap-1.5">
                      <FiUsers className="text-slate-400" />
                      max {notice.max_people} osób
                    </span>
                  )}
              </div>

              {notice.description && (
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {notice.description}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
