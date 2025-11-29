import { useState, useEffect } from "react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthForm() {
  const { login, register } = useAuth();

  const [mode, setMode] = useState("login");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("mode") === "register") {
      setMode("register");
    } else {
      setMode("login");
    }
  }, [searchParams]);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [role, setRole] = useState("");

  const [organizationName, setOrganizationName] = useState("");
  const [areaOfActivity, setAreaOfActivity] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [address, setAddress] = useState("");
  const [logo, setLogo] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const isLogin = mode === "login";
  const navigate = useNavigate();

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setLogo(null);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setApiError("Logo może mieć maksymalnie 2 MB.");
      setLogo(null);
      return;
    }

    setApiError("");
    setLogo(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setApiSuccess("");

    if (!isLogin) {
      if (!role) {
        setApiError("Pole typ konta jest wymagane.");
        return;
      }

      const isOrganizer = role === "organization";

      if (isOrganizer) {
        if (!organizationName || !areaOfActivity || !contactEmail || !address) {
          setApiError(
            "Nazwa organizacji, obszar działalności, email kontaktowy i adres są wymagane dla konta organizacji."
          );
          return;
        }

        if (logo && logo.size > 2 * 1024 * 1024) {
          setApiError("Logo może mieć maksymalnie 2 MB.");
          return;
        }
      }
    }

    setIsSubmitting(true);

    try {
      let res;

      if (isLogin) {
        res = await login(email, password);
        setApiSuccess(`Zalogowano jako ${res.email}`);
        navigate("/dashboard");
      } else {

        const isOrganizer = role === "organization";

        const formData = new FormData();
        formData.append("name", name);
        formData.append("surname", surname);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("password_confirmation", passwordConfirmation);

        formData.append("is_organizer", isOrganizer ? "1" : "0");

        if (isOrganizer) {
          formData.append("organization_name", organizationName);
          formData.append("area_of_activity", areaOfActivity);
          formData.append("contact_email", contactEmail);
          formData.append("address", address);
          if (logo) {
            formData.append("logo", logo);
          }
        }
        res = await register(formData);
        setApiSuccess(`Konto utworzone dla ${res.email}`);
      }

      setPassword("");
      setPasswordConfirmation("");

      if (!isLogin) {
        setName("");
        setSurname("");
        setRole("");
        setOrganizationName("");
        setAreaOfActivity("");
        setContactEmail("");
        setAddress("");
        setLogo(null);
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Coś poszło nie tak.";
      setApiError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-soft border border-slate-200 dark:border-slate-800 p-6 sm:p-8 transition-colors">
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
            onClick={() => {
              setMode("login");
              setApiError("");
              setApiSuccess("");
            }}
            className={`px-3 py-1 text-xs rounded-full transition ${
              isLogin
                ? "bg-accentBlue/70 text-white dark:bg-accentBlue/60"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            Logowanie
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setApiError("");
              setApiSuccess("");
            }}
            className={`px-3 py-1 text-xs rounded-full transition ${
              !isLogin
                ? "bg-accentGreen/70 text-white dark:bg-accentGreen/60"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
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
          <>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Typ konta
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("volunteer")}
                  className={`px-3 py-2 text-xs rounded-2xl border transition flex items-center justify-center ${
                    role === "volunteer"
                      ? "border-accentBlue bg-accentBlue/10 text-accentBlue"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-accentBlue/60"
                  }`}
                >
                  Konto wolontariusza
                </button>
                <button
                  type="button"
                  onClick={() => setRole("organization")}
                  className={`px-3 py-2 text-xs rounded-2xl border transition flex items-center justify-center ${
                    role === "organization"
                      ? "border-accentGreen bg-accentGreen/10 text-accentGreen"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-accentGreen/60"
                  }`}
                >
                  Konto organizacji
                </button>
              </div>
            </div>

            {role === "organization" && (
              <>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    Nazwa organizacji
                  </label>
                  <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-accentBlue/70 focus-within:bg-white transition">
                    <FiUser className="text-slate-400 text-sm" />
                    <input
                      type="text"
                      placeholder="Nazwa organizacji"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900 dark:text-black"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    Obszar działalności
                  </label>
                  <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-accentBlue/70 focus-within:bg-white transition">
                    <FiUser className="text-slate-400 text-sm" />
                    <input
                      type="text"
                      placeholder="Na przykład pomoc seniorom, edukacja"
                      value={areaOfActivity}
                      onChange={(e) => setAreaOfActivity(e.target.value)}
                      disabled={isSubmitting}
                     className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900 dark:text-black"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    Email kontaktowy
                  </label>
                  <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-accentBlue/70 focus-within:bg-white transition">
                    <FiMail className="text-slate-400 text-sm" />
                    <input
                      type="email"
                      placeholder="kontakt@twojaorganizacja.pl"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      disabled={isSubmitting}
                     className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900 dark:text-black"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    Adres
                  </label>
                  <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-accentBlue/70 focus-within:bg-white transition">
                    <FiUser className="text-slate-400 text-sm" />
                    <input
                      type="text"
                      placeholder="Ulica, miasto"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      disabled={isSubmitting}
                     className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900 dark:text-black"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    Logo organizacji
                  </label>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 flex items-center justify-between gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      disabled={isSubmitting}
                      className="w-full text-xs text-slate-600 dark:text-slate-300 file:mr-3 file:rounded-xl file:border file:border-slate-300 file:bg-white file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-700 hover:file:border-accentBlue/70"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Obsługiwane obrazki, maksymalny rozmiar 2 MB.
                  </p>
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Imię
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-accentBlue/70 focus-within:bg-white transition">
                <FiUser className="text-slate-400 text-sm" />
                <input
                  type="text"
                  placeholder="Twoje imię"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                 className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900 dark:text-black"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Nazwisko
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-accentBlue/70 focus-within:bg-white transition">
                <FiUser className="text-slate-400 text-sm" />
                <input
                  type="text"
                  placeholder="Twoje nazwisko"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  disabled={isSubmitting}
                 className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900 dark:text-black"
                />
              </div>
            </div>
          </>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
            E mail
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-accentBlue/70 focus-within:bg-white transition">
            <FiMail className="text-slate-400 text-sm" />
            <input
              type="email"
              placeholder="ty@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
             className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900 dark:text-black"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Hasło
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-accentGreen/70 focus-within:bg-white transition">
            <FiLock className="text-slate-400 text-sm" />
            <input
              type="password"
              placeholder="Minimum 6 znaków"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
             className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900 dark:text-black"
            />
          </div>
        </div>

        {!isLogin && (
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Powtórz hasło
            </label>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-accentGreen/70 focus-within:bg-white transition">
              <FiLock className="text-slate-400 text-sm" />
              <input
                type="password"
                placeholder="Powtórz hasło"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                disabled={isSubmitting}
               className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900 dark:text-black"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-accentBlue/80 dark:bg-accentBlue/60 hover:bg-accentBlue/90 dark:hover:bg-accentBlue/70 text-white dark:text-slate-900 text-sm font-medium py-2.5 shadow-soft transition disabled:opacity-60 disabled:cursor-not-allowed"
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
      </form>
    </div>
  );
}
