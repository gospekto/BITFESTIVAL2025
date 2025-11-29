import { FiBell } from "react-icons/fi";

export default function NotificationsButton() {
  return (
    <button className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white transition">
      <FiBell className="text-sm" />
      <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-accentOrange" />
    </button>
  );
}
