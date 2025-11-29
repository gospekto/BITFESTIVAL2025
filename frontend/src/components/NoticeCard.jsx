import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
  FiHeart,
  FiArrowRight,
} from "react-icons/fi";

export default function NoticeCard({ notice, className = "" }) {
  const {
    id,
    title,
    category,
    date,
    time,
    location,
    image_path,
    organization,
    max_people,
    registered_users_count = 0,
  } = notice || {};

  const spotsLeft =
    typeof max_people === "number"
      ? Math.max(max_people - registered_users_count, 0)
      : null;

  const capacityPercent =
    typeof max_people === "number" && max_people > 0
      ? Math.min((registered_users_count / max_people) * 100, 100)
      : null;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("pl-PL", {
        day: "2-digit",
        month: "short",
      })
    : null;

  const orgInitial =
    organization?.name?.[0]?.toUpperCase() || title?.[0]?.toUpperCase() || "H";

  return (
    <article
      className={
        "rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-5 flex gap-4 sm:gap-5 " +
        className
      }
    >
      <div className="flex-shrink-0">
        {image_path ? (
          <div className="h-20 w-24 sm:h-24 sm:w-32 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              src={image_path}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="h-20 w-24 sm:h-24 sm:w-32 rounded-xl bg-gradient-to-tr from-accentBlue via-accentGreen to-accentOrange flex items-center justify-center text-white font-semibold text-xl">
            {orgInitial}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white truncate">
              {title}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
              {organization?.name || "Zweryfikowana organizacja"}
            </p>
          </div>

          {category && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] uppercase tracking-wide bg-accentBlue/10 text-accentBlue whitespace-nowrap">
              {category}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-3 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
          {formattedDate && (
            <div className="inline-flex items-center gap-1.5">
              <FiCalendar className="text-accentBlue" />
              <span>{formattedDate}</span>
            </div>
          )}
          {time && (
            <div className="inline-flex items-center gap-1.5">
              <FiClock className="text-accentGreen" />
              <span>{time}</span>
            </div>
          )}
          {location && (
            <div className="inline-flex items-center gap-1.5">
              <FiMapPin className="text-accentOrange" />
              <span className="truncate max-w-[140px] sm:max-w-[200px]">
                {location}
              </span>
            </div>
          )}
        </div>

        {(typeof max_people === "number" || registered_users_count > 0) && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
              <div className="inline-flex items-center gap-1.5">
                <FiUsers className="text-accentGreen" />
                <span>
                  {registered_users_count} zgłoszeń
                  {typeof max_people === "number" && ` / ${max_people} miejsc`}
                </span>
              </div>
              {spotsLeft !== null && (
                <span
                  className={
                    "text-[10px] font-medium " +
                    (spotsLeft === 0
                      ? "text-accentOrange"
                      : "text-accentGreen")
                  }
                >
                  {spotsLeft === 0
                    ? "Brak wolnych miejsc"
                    : `Zostało ${spotsLeft} miejsc`}
                </span>
              )}
            </div>

            {capacityPercent !== null && (
              <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accentGreen via-accentBlue to-accentOrange transition-all"
                  style={{ width: `${capacityPercent}%` }}
                />
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <div className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            <FiHeart className="text-accentPink" />
            <span>Wolontariat z realnym wpływem</span>
          </div>

          <Link
            to={`/notice/${id}`}
            className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-accentBlue hover:text-accentBlue/80"
          >
            Zobacz szczegóły
            <FiArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </article>
  );
}
