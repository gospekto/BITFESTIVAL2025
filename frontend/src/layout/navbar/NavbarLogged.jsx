import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiBell, FiSearch } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

export default function NavbarLogged() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();

  const handleLogout = async () => {
    setOpenMenu(false);
    await logout();
    navigate("/");
  };

  useEffect(() => {
    const handle = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenu(false);
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);

  return (
    <header className="border-b border-slate-200/70 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(user ? "/dashboard" : "/")}> 
          <div className="h-8 w-8 rounded-2xl bg-gradient-to-tr from-accentBlue via-accentGreen to-accentOrange flex items-center justify-center text-white font-semibold text-base">
            H
          </div>

          <div className="flex flex-col">
            <span className="font-semibold">Helpi</span>
            <span className="text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Panel użytkownika
            </span>
          </div>
        </div>

        {/* SEARCH */}
        <div className="hidden md:flex flex-1 max-w-md items-center gap-2">
          <div className="flex items-center w-full rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400">
            <FiSearch className="mr-2 text-slate-400 dark:text-slate-500" />
            <input type="text" placeholder="Szukaj..." className="flex-1 bg-transparent outline-none" />
          </div>
        </div>

        {/* IKONY */}
        <div className="flex items-center gap-3">

          {/* Powiadomienia */}
          <button className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white transition">
            <FiBell className="text-sm" />
            <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-accentOrange" />
          </button>

          {/* MENU USERA */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpenMenu((s) => !s)}
              className="flex items-center gap-2 rounded-full bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 text-[11px]"
            >
              <div className="h-6 w-6 rounded-full bg-accentBlue/20 text-[11px] flex items-center justify-center text-accentBlue font-semibold">
                {user?.name?.slice(0, 2)?.toUpperCase()}
              </div>

              <div className="hidden sm:flex flex-col items-start">
                <span className="text-[11px] font-medium">
                  Cześć, {user?.name}
                </span>
                
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {user?.is_organizer ? "konto wolontariusza" : "konto organizacji"}
                </span>
              </div>
            </button>

            {openMenu && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50">
                <button onClick={() => navigate("/profile")} className="w-full px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
                  Profil
                </button>

                <button onClick={() => navigate("/organization-panel")} className="w-full px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
                  Panel organizacji
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Wyloguj
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
