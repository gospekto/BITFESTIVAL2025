import axios from "axios";

// Tworzymy instancję Axios
const api = axios.create({
  baseURL: "https://hackathon.drokgames.pl/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // np. 10s timeout
});

// Interceptor request - dodaje token do każdego zapytania
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Funkcja retry
const retryRequest = async (error) => {
  const config = error.config;

  if (!config) return Promise.reject(error);

  config.__retryCount = config.__retryCount || 0;

  if (config.__retryCount >= 3) {
    // Jeśli próbowaliśmy już 3 razy → odrzucamy
    return Promise.reject(error);
  }

  config.__retryCount += 1;

  // opcjonalny delay przed retry, np. 500ms
  await new Promise((resolve) => setTimeout(resolve, 500));

  return api(config);
};

// Interceptor response - obsługa 401 i retry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Retry dla błędów sieciowych lub timeout
    if (!error.response || error.code === "ECONNABORTED") {
      return retryRequest(error);
    }

    // Jeśli 401 → token nieprawidłowy
    if (error.response.status === 401) {
      console.log("Token wygasł lub nieprawidłowy");
      localStorage.removeItem("access_token");
      // window.location.href = "/login"; // opcjonalne przekierowanie
    }

    return Promise.reject(error);
  }
);

export default api;
