import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  return (
    <div className="hidden md:flex flex-1 max-w-md items-center">
      <div className="flex items-center w-full rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400">
        <FiSearch className="mr-2 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          placeholder="Szukaj..."
          className="flex-1 bg-transparent outline-none"
        />
      </div>
    </div>
  );
}
