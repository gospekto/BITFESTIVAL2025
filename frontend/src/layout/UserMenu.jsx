import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpenMenu((s) => !s)}
        className="flex items-center gap-2 rounded-full bg-slate-100/80 dark:bg-slate-900/80 
        border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 text-[11px]"
      >
        <div className="h-6 w-6 rounded-full bg-accentBlue/20 text-[11px] flex items-center justify-center text-accentBlue font-semibold">
          {user?.name?.slice(0, 2)?.toUpperCase() || "U"}
        </div>

        <div className="hidden sm:flex flex-col items-start">
          <span className="text-[11px] font-medium">
            Cześć, {user?.name || "Użytkowniku"}
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            konto wolontariusza
          </span>
        </div>
      </button>

      {openMenu && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50">

          <button
            onClick={() => {
              setOpenMenu(false);
              navigate("/profile");
            }}
            className="w-full px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Profil
          </button>

          <button
            onClick={() => {
              setOpenMenu(false);
              navigate("/organization-panel");
            }}
            className="w-full px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Panel organizacji
          </button>

          <button
            onClick={() => {
              setOpenMenu(false);
              logout();
            }}
            className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Wyloguj
          </button>
        </div>
      )}
    </div>
  );
}
