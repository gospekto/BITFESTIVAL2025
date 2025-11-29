import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import NotificationsButton from "./NotificationsButton";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
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
        <SearchBar />

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          <NotificationsButton />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
