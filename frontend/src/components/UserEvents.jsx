import { useEffect, useState } from "react";
import api from "../axios"; 

function getDaysForMonth(year, month) {
  const date = new Date(year, month, 1);
  const days = [];
  const firstWeekday = (date.getDay() + 6) % 7;

  for (let i = 0; i < firstWeekday; i += 1) {
    days.push(null);
  }

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
}

function formatDateLocal(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`; 
}

export default function UserEvents() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(today);

  const [events, setEvents] = useState([]); 
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    async function loadEvents() {
      try {
        setStatus("loading");

        const res = await api.get("/my-notices");

        // API zwraca { notices: [...] }
        const notices = Array.isArray(res.data?.notices)
          ? res.data.notices
          : [];

        // Normalizacja struktury na potrzeby kalendarza
        const normalized = notices.map(n => ({
          id: n.id,
          title: n.title,
          date: n.date, // format YYYY-MM-DD
          time: "", // backend nie zwraca godziny, zostawiamy puste
          place: n.organization?.name ?? n.location ?? "Lokalizacja nie podana",
          type: n.category ?? "Wydarzenie"
        }));

        setEvents(normalized);
        setStatus("success");
      } catch (err) {
        console.error("my-notices error", err);
        setStatus("error");
      }
    }

    loadEvents();
  }, []);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const monthDays = getDaysForMonth(year, month);

  const selectedDateStr = formatDateLocal(selectedDate);
    
  // na wszelki wypadek jeszcze raz pilnujemy tablicy
  const safeEvents = Array.isArray(events) ? events : [];
  const eventsForSelectedDay = safeEvents.filter(
    e => e.date === selectedDateStr
  );

  const monthFormatter = new Intl.DateTimeFormat("pl-PL", {
    month: "long",
    year: "numeric"
  });

  function changeMonth(offset) {
    setCurrentMonth(new Date(year, month + offset, 1));
  }

  function isSameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  return (
    <section
      id="my-events"
      className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft p-4 sm:p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-accentBlue/80 font-medium">
            Moje wydarzenia
          </p>
          <h2 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
            Kalendarz Twoich działań
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Sprawdź zaplanowane akcje i spotkania z Twoim udziałem.
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => changeMonth(-1)}
            className="rounded-full border border-slate-300 dark:border-slate-700 px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {"<"}
          </button>
          <span className="px-2 text-slate-700 dark:text-slate-200">
            {monthFormatter.format(currentMonth)}
          </span>
          <button
            onClick={() => changeMonth(1)}
            className="rounded-full border border-slate-300 dark:border-slate-700 px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {">"}
          </button>
        </div>
      </div>

      {status === "loading" && (
        <p className="text-xs text-slate-500 mb-3">
          Ładuję Twoje wydarzenia...
        </p>
      )}

      {status === "error" && (
        <p className="text-xs text-red-500 mb-3">
          Nie udało się pobrać wydarzeń. Spróbuj ponownie później.
        </p>
      )}

      <div className="grid lg:grid-cols-[1.2fr,0.9fr] gap-4">
        {/* Kalendarz dzienny */}
        <div>
          <div className="grid grid-cols-7 gap-1 text-[10px] text-slate-500 mb-1">
            <span>Pn</span>
            <span>Wt</span>
            <span>Śr</span>
            <span>Cz</span>
            <span>Pt</span>
            <span>Sb</span>
            <span>Nd</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-xs">
            {monthDays.map((day, idx) =>
              day ? (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={[
                    "aspect-square rounded-2xl border text-center flex items-center justify-center transition",
                    isSameDay(day, selectedDate)
                      ? "bg-accentBlue text-white border-accentBlue"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-accentBlue/70",
                    isSameDay(day, today) && !isSameDay(day, selectedDate)
                      ? "ring-1 ring-accentBlue/60"
                      : ""
                  ].join(" ")}
                >
                  {day.getDate()}
                </button>
              ) : (
                <div key={`empty-${idx}`} />
              )
            )}
          </div>
        </div>

        {/* Lista wydarzeń dla wybranego dnia */}
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-3 text-xs">
          <p className="text-[11px] font-semibold text-slate-900 dark:text-white mb-1.5">
            Wydarzenia w dniu{" "}
            {selectedDate.toLocaleDateString("pl-PL")}
          </p>

          {eventsForSelectedDay.length === 0 ? (
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Brak zaplanowanych wydarzeń w tym dniu.
            </p>
          ) : (
            <ul className="space-y-2">
              {eventsForSelectedDay.map(event => (
                <li
                  key={event.id}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2"
                >
                  <p className="font-medium text-slate-900 dark:text-white">
                    {event.title}
                  </p>
                  {!!event.time && (
                    <p className="text-slate-500 dark:text-slate-400">
                      {event.time}
                    </p>
                  )}
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                    {event.place}
                  </p>
                  <span className="inline-flex mt-1 text-[10px] px-2 py-0.5 rounded-full bg-accentGreen/10 text-accentGreen">
                    {event.type}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
