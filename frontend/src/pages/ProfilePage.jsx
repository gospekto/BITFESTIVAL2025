import { useState, useEffect } from "react";
import { FiArrowLeft, FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";
import UserEvents from "../components/UserEvents.jsx";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, init } = useAuth();
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [placeResults, setPlaceResults] = useState([]);
  const [isSearchingPlaces, setIsSearchingPlaces] = useState(false);

  useEffect(() => {
    if (!user) return;

    setName(user.name || "");
    setSurname(user.surname || "");
    setEmail(user.email || "");
    setLatitude(user.latitude || "");
    setLongitude(user.longitude || "");
    setAddress("");
  }, [user]);

  const handleAddressChange = async (e) => {
    const value = e.target.value;
    setAddress(value);

    setLatitude("");
    setLongitude("");
    setPlaceResults([]);

    if (!value || value.length < 3) return;

    try {
      setIsSearchingPlaces(true);
      const res = await axios.get(`/search-places?search=${encodeURIComponent(value)}`);
      setPlaceResults(res.data || []);
    } catch (err) {
      console.error("Błąd wyszukiwania miejsc:", err);
    } finally {
      setIsSearchingPlaces(false);
    }
  };

  const handleSelectPlace = (place) => {
    if (!place) return;
    setAddress(place.address || place.name || "");
    setLatitude(place.latitude || "");
    setLongitude(place.longitude || "");
    setPlaceResults([]);
  };

  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    try {
      setSaving(true);
      console.log(        name,
        surname,
        email,
        address,
        latitude,
        longitude,);
      await axios.put("/user", {
        name,
        surname,
        email,
        address,
        latitude,
        longitude,
      });
      await init();
      setEditing(false);
    } catch (err) {
      console.error("Błąd zapisu:", err);
    } finally {
      setSaving(false);
    }
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Ładowanie profilu...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
        >
          <FiArrowLeft className="text-xs" />
          Wróć
        </Link>

        <h1 className="text-xl sm:text-2xl font-semibold mb-4">
          Twój profil wolontariusza
        </h1>

        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-accentBlue/20 flex items-center justify-center text-accentBlue font-semibold">
              {user.name?.[0]}
              {user.surname?.[0]}
            </div>
            <div>
              <p className="text-sm font-semibold">
                {user.name} {user.surname}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                konto wolontariusza
              </p>
            </div>
          </div>

          {!editing && (
            <>
              <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Email</span>
                  <span className="font-medium">{user.email}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Latitude</span>
                  <span className="font-medium">{user.latitude ?? "-"}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Longitude</span>
                  <span className="font-medium">{user.longitude ?? "-"}</span>
                </div>
              </div>

              <button
                onClick={() => setEditing(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-950 text-xs font-medium px-4 py-2 hover:bg-slate-800 dark:hover:bg-slate-200 transition"
              >
                <FiEdit3 className="text-sm" />
                Edytuj profil
              </button>
            </>
          )}

          {editing && (
            <>
              <div className="space-y-4 text-sm">
                <div className="flex flex-col gap-1">
                  <label>Imię</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl border px-3 py-2 bg-slate-50 dark:bg-slate-800"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>Nazwisko</label>
                  <input
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className="rounded-xl border px-3 py-2 bg-slate-50 dark:bg-slate-800"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl border px-3 py-2 bg-slate-50 dark:bg-slate-800"
                  />
                </div>

                <div className="flex flex-col gap-1 relative">
                  <label>Adres</label>

                  <input
                    value={address}
                    onChange={handleAddressChange}
                    placeholder="np. Kraków, ul. Długa 10"
                    className="rounded-xl border px-3 py-2 bg-slate-50 dark:bg-slate-800"
                  />

                  {isSearchingPlaces && (
                    <p className="text-[11px] text-slate-500 mt-1">Szukam...</p>
                  )}

                  {placeResults.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-800 border rounded-xl shadow max-h-48 overflow-y-auto z-20 mt-1">
                      {placeResults.map((p, i) => (
                        <button
                          key={i}
                          className="w-full text-left px-3 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-700"
                          onClick={() => handleSelectPlace(p)}
                        >
                          <div className="font-medium">{p.name}</div>
                          <div className="text-[10px] text-slate-500">{p.address}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 mt-1">
                  <strong>Latitude:</strong> {latitude || "-"}<br/>
                  <strong>Longitude:</strong> {longitude || "-"}
                </p>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-5 py-2 rounded-2xl bg-accentGreen text-white text-xs font-medium"
                >
                  {saving ? "Zapisywanie..." : "Zapisz"}
                </button>

                <button
                  onClick={() => setEditing(false)}
                  className="px-5 py-2 rounded-2xl bg-slate-300 dark:bg-slate-700 text-xs"
                >
                  Anuluj
                </button>
              </div>
            </>
          )}
        </section>
        <UserEvents />
      </main>
    </div>
  );
}
