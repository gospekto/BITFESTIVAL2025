// AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// ------- AXIOS GLOBAL CONFIG -------
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

// Optional: automatyczne pobieranie CSRF przed zapytaniami mutującymi
axios.interceptors.request.use(async (config) => {
  const methodsRequiringCsrf = ["post", "put", "patch", "delete"];

  if (methodsRequiringCsrf.includes(config.method)) {
    await axios.get("/sanctum/csrf-cookie");
  }

  return config;
});


// ------- AUTH CONTEXT -------
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // ---- Przywracanie sesji przy starcie aplikacji ----
  const init = async () => {
    try {
      const { data } = await axios.get("/api/user");
      setUser(data);
    } catch (err) {
      setUser(null); // nie zalogowany
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);


  // ---- LOGOWANIE ----
  const login = async (email, password) => {
    await axios.get("/sanctum/csrf-cookie");

    await axios.post("/login", {
      email,
      password,
    });

    // Pobierz usera po zalogowaniu
    const { data } = await axios.get("/api/user");
    setUser(data);

    return data;
  };


  // ---- REJESTRACJA ----
  const register = async (payload) => {
    await axios.get("/sanctum/csrf-cookie");

    await axios.post("/register", payload);

    const { data } = await axios.get("/api/user");
    setUser(data);

    return data;
  };


  // ---- WYLOGOWANIE ----
  const logout = async () => {
    await axios.post("/logout");
    setUser(null);
  };


  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isLoggedIn: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
