import { createContext, useContext, useEffect, useState } from "react";
import api from "../axios"; // importujemy instancję Axios z retry i tokenem

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---- inicjalizacja usera przy starcie aplikacji ----
  const init = async () => {
    try {
      const res = await api.get("/user");
      setUser(res.data.user);
    } catch (err) {
      console.log("Brak aktywnego użytkownika lub token wygasł");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  // ---- logowanie ----
  const login = async (email, password) => {
    try {
      const res = await api.post("/login", { email, password });
      const { token, user } = res.data;
      console.log(res.data);

      // zapis tokena w localStorage
      localStorage.setItem("access_token", token);
      setUser(user);

      return user;
    } catch (err) {
      throw err;
    }
  };

  // ---- rejestracja ----
  const register = async (payload) => {
    try {
      const res = await api.post("/register", payload);
      const { token, user } = res.data;

      localStorage.setItem("access_token", token);
      setUser(user);

      return user;
    } catch (err) {
      throw err;
    }
  };

  // ---- wylogowanie ----
  const logout = async () => {
    try {
      await api.get("/logout"); // jeśli backend wymaga wylogowania
    } catch (err) {
      console.log("Błąd podczas logout");
    } finally {
      localStorage.removeItem("access_token");
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isLoggedIn: !!user,
    api, // eksportujemy instancję Axios
    init,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
