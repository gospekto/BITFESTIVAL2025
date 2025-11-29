import { useState } from "react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

function fakeAuthRequest({ mode, name, email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email.includes("@")) {
        reject(new Error("Podaj prawidłowy adres e-mail."));
      } else if (password.length < 6) {
        reject(new Error("Hasło musi mieć co najmniej 6 znaków."));
      } else if (mode === "register" && !name.trim()) {
        reject(new Error("Imię jest wymagane przy rejestracji."));
      } else {
        resolve({
          status: "ok",
          user: { name: name || "User", email },
          mode,
        });
      }
    }, 1200);
  });
}

export default function AuthForm({ onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const isLogin = mode === "login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setApiSuccess("");
    setIsSubmitting(true);

    try {
      const res = await fakeAuthRequest({ mode, name, email, password });

      setApiSuccess(
        isLogin
          ? `Zalogowano jako ${res.user.email}`
          : `Konto utworzone dla ${res.user.email}`
      );

      if (onAuthSuccess) onAuthSuccess(res);
    } catch (err) {
      setApiError(err.message || "Coś poszło nie tak.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="
      max-w-md w-full 
      bg-white dark:bg-slate-900
      rounded-2xl shadow-soft border 
      border-slate-200 dark:border-slate-800
      p-6 sm:p-8 transition-colors"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
            {isLogin ? "Witaj ponownie" : "Załóż nowe konto"}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isLogin
              ? "Miło Cię znowu widzieć."
              : "Twoja przygoda zaczyna się tutaj."}
          </p>
        </div>

        <div className="bg-slate-100 dark:bg-slate-700/40 rounded-full p-1 flex gap-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`px-3 py-1 text-xs rounded-full transition
              ${
                isLogin
                  ? "bg-accentBlue/70 text-white dark:bg-accentBlue/60"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
              }
            `}
          >
            Logowanie
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`px-3 py-1 text-xs rounded-full transition
              ${
                !isLogin
                  ? "bg-accentGreen/70 text-white dark:bg-accentGreen/60"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
              }
            `}
          >
            Rejestracja
          </button>
        </div>
      </div>

      {apiError && (
        <div className="mb-4 text-sm rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 px-3 py-2 text-red-700 dark:text-red-300">
          {apiError}
        </div>
      )}
      {apiSuccess && (
        <div className="mb-4 text-sm rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950 px-3 py-2 text-emerald-700 dark:text-emerald-300">
          {apiSuccess}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Imię
            </label>
            <div
              className="
                flex items-center gap-2 rounded-2xl 
                border border-slate-200 
                bg-slate-50
                px-3 py-2.5 
                focus-within:border-accentBlue/70 
                focus-within:bg-white
                transition"
            >
              <FiUser className="text-slate-400 text-sm" />
              <input
                type="text"
                className="w-full bg-transparent text-sm outline-none 
                           placeholder:text-slate-400 
                           text-slate-900"
                placeholder="Twoje imię"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
            E-mail
          </label>
          <div
            className="
              flex items-center gap-2 rounded-2xl 
              border border-slate-200 
              bg-slate-50
              px-3 py-2.5 
              focus-within:border-accentBlue/70 
              focus-within:bg-white
              transition"
          >
            <FiMail className="text-slate-400 text-sm" />
            <input
              type="email"
              className="w-full bg-transparent text-sm outline-none 
                         placeholder:text-slate-400 
                         text-slate-900"
              placeholder="ty@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Hasło
          </label>
          <div
            className="
              flex items-center gap-2 rounded-2xl 
              border border-slate-200 
              bg-slate-50
              px-3 py-2.5 
              focus-within:border-accentGreen/70 
              focus-within:bg-white
              transition"
          >
            <FiLock className="text-slate-400 text-sm" />
            <input
              type="password"
              className="w-full bg-transparent text-sm outline-none 
                         placeholder:text-slate-400 
                         text-slate-900"
              placeholder="Minimum 6 znaków"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>

        {isLogin && (
          <div className="flex items-center justify-between text-xs mt-1">
            <label className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <input
                type="checkbox"
                className="rounded border-slate-300 dark:border-slate-600 
                           text-accentBlue focus:ring-accentBlue/70"
              />
              Zapamiętaj mnie
            </label>
            <button
              type="button"
              className="text-accentBlue/80 hover:text-accentBlue"
            >
              Zapomniałeś hasła?
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            mt-3 w-full inline-flex items-center justify-center gap-2 
            rounded-2xl 
            bg-accentBlue/80 dark:bg-accentBlue/60 
            hover:bg-accentBlue/90 dark:hover:bg-accentBlue/70
            text-white dark:text-slate-900
            text-sm font-medium py-2.5 
            shadow-soft hover:shadow-none hover:translate-y-[1px] active:translate-y-[2px] 
            transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              {isLogin ? "Logowanie..." : "Tworzenie konta..."}
            </>
          ) : isLogin ? (
            "Zaloguj się"
          ) : (
            "Utwórz konto"
          )}
        </button>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-5 py-2 rounded-2xl text-sm font-medium
                     bg-white/90 hover:bg-white
                     dark:bg-slate-900/80 dark:hover:bg-slate-900
                     border border-slate-200 dark:border-slate-700
                     text-slate-700 dark:text-slate-100 transition w-full"
        >
          Strona główna
        </Link>

        <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center mt-2">
          Kontynuując, akceptujesz nasze{" "}
          <button type="button" className="text-accentBlue hover:underline">
            warunki korzystania
          </button>{" "}
          i{" "}
          <button type="button" className="text-accentGreen hover:underline">
            politykę prywatności
          </button>
          .
        </p>
      </form>
    </div>
  );
}
