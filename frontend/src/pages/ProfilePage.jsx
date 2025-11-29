import { FiUser, FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
        >
          <FiArrowLeft className="text-xs" />
          Wróć
        </Link>
        <h1 className="text-xl sm:text-2xl font-semibold mb-4">
          Twój profil wolontariusza
        </h1>

        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-accentBlue/20 flex items-center justify-center text-accentBlue font-semibold">
              JK
            </div>
            <div>
              <p className="text-sm font-semibold">Jakub</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                konto wolontariusza
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-center justify-between">
              <span>Email</span>
              <span className="font-medium">twoj.mail@example.com</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Miasto</span>
              <span className="font-medium">np. Warszawa</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Obszary aktywności</span>
              <span className="font-medium">seniorzy, porządki</span>
            </div>
          </div>

          <button className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-950 text-xs font-medium px-4 py-2 hover:bg-slate-800 dark:hover:bg-slate-200 transition">
            <FiEdit3 className="text-sm" />
            Edytuj profil
          </button>
        </section>
      </main>
    </div>
  );
}
