import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const volunteerIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const userIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function VolunteerMap() {
  const { user } = useAuth();
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.latitude || !user?.longitude) return;

    const fetchVolunteers = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/nearby-volunteers", {
          params: {
            latitude: user.latitude,
            longitude: user.longitude,
          },
        });
        setVolunteers(res.data?.volunteers || []);
      } catch (err) {
        console.error(err);
        setError("Nie udało się pobrać wolontariuszy.");
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, [user]);

  if (!user) return <p className="text-xs text-slate-500">Zaloguj się, aby zobaczyć wolontariuszy w okolicy.</p>;
  if (loading) return <p className="text-xs text-slate-500">Ładowanie wolontariuszy...</p>;
  if (error) return <p className="text-xs text-red-500">{error}</p>;

  const center = [user.latitude, user.longitude];

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 h-72">
      <MapContainer center={center} zoom={13} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={center} icon={userIcon}>
          <Popup>Twoja lokalizacja</Popup>
        </Marker>

        {volunteers.map((vol) => (
          <Marker key={vol.id} position={[vol.latitude, vol.longitude]} icon={volunteerIcon}>
            <Popup>
              <div className="flex flex-col gap-2">
                <strong>{vol.name}</strong>
                <span>{vol.skills?.join(", ") || "Brak podanych umiejętności"}</span>
                <button
                  className="mt-1 px-2 py-1 text-xs rounded-lg bg-accentBlue text-white hover:bg-accentBlue/90"
                  onClick={() => {}}
                >
                  Zaproś do pomocy
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
