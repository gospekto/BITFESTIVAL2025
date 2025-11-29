import {
  FiShield,
  FiMapPin,
  FiMail,
  FiPhone,
  FiGlobe,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

export default function VerifyOrganizations({
  organizations = [],
  onVerify,
  onReject,
}) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <header className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-2 py-1 mb-3 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="h-2 w-2 rounded-full bg-accentBlue" />
          Panel weryfikacji organizacji • Helpi
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
          Weryfikacja organizacji
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Sprawdź zgłoszone organizacje, przejrzyj ich dane i zdecyduj, czy
          chcesz je dopuścić do publikowania ogłoszeń.
        </p>
      </header>

      {organizations.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/60 px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
          Brak organizacji oczekujących na weryfikację.
        </div>
      ) : (
        <div className="space-y-4">
          {organizations.map((org) => (
            <article
              key={org.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm px-4 py-4 sm:px-5 sm:py-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-2xl bg-accentBlue/10 flex items-center justify-center">
                    <FiShield className="text-accentBlue text-lg" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                      {org.name}
                    </h2>
                    {org.legal_name && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {org.legal_name}
                      </p>
                    )}
                    {org.type && (
                      <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-[2px] text-[10px] font-medium text-slate-600 dark:text-slate-300">
                        {org.type}
                      </p>
                    )}
                  </div>
                </div>

                <div className="hidden sm:flex flex-col items-end gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                  {org.submitted_at && (
                    <span>Zgłoszono: {org.submitted_at}</span>
                  )}
                  {org.krs && (
                    <span>
                      KRS:{" "}
                      <span className="font-mono text-slate-600 dark:text-slate-300">
                        {org.krs}
                      </span>
                    </span>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-[1.2fr,1.4fr] gap-3 sm:gap-4 text-[11px] sm:text-xs">
                <div className="space-y-1.5">
                  {org.city && (
                    <p className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <FiMapPin className="text-slate-400 shrink-0" />
                      <span>
                        {org.city}
                        {org.address ? `, ${org.address}` : ""}
                      </span>
                    </p>
                  )}
                  {org.email && (
                    <p className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <FiMail className="text-slate-400 shrink-0" />
                      <a
                        href={`mailto:${org.email}`}
                        className="hover:text-accentBlue"
                      >
                        {org.email}
                      </a>
                    </p>
                  )}
                  {org.phone && (
                    <p className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <FiPhone className="text-slate-400 shrink-0" />
                      <a
                        href={`tel:${org.phone}`}
                        className="hover:text-accentBlue"
                      >
                        {org.phone}
                      </a>
                    </p>
                  )}
                  {org.website && (
                    <p className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <FiGlobe className="text-slate-400 shrink-0" />
                      <a
                        href={org.website}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-accentBlue truncate max-w-[220px]"
                      >
                        {org.website}
                      </a>
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  {org.mission && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-0.5">
                        Misja / opis organizacji
                      </p>
                      <p className="text-slate-600 dark:text-slate-300 line-clamp-3">
                        {org.mission}
                      </p>
                    </div>
                  )}
                  {org.note && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-0.5">
                        Notatka z wniosku
                      </p>
                      <p className="text-slate-600 dark:text-slate-300 line-clamp-2">
                        {org.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Sprawdź dane rejestrowe (np. KRS), stronę www i dane kontaktowe,
                  zanim dopuścisz organizację do publikacji ogłoszeń.
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onReject && onReject(org)}
                    className="inline-flex items-center gap-1.5 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 px-3 py-1.5 text-[11px] font-medium text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900 transition"
                  >
                    <FiXCircle className="text-xs" />
                    Odrzuć
                  </button>
                  <button
                    type="button"
                    onClick={() => onVerify && onVerify(org.organization?.id)}
                    className="inline-flex items-center gap-1.5 rounded-2xl bg-accentGreen/90 hover:bg-accentGreen text-white text-[11px] font-semibold px-4 py-1.5 shadow-soft active:translate-y-[1px] transition"
                  >
                    <FiCheckCircle className="text-xs" />
                    Zweryfikuj
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
