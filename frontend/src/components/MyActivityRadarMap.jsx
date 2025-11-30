import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const categoryIcons = {
  fundraising: L.icon({ ...defaultIcon, iconUrl: "/icons/fundraising.png" }),
  action: L.icon({ ...defaultIcon, iconUrl: "/icons/action.png" }),
  help_request: L.icon({ ...defaultIcon, iconUrl: "/icons/help_request.png" }),
  volunteer: L.icon({ ...defaultIcon, iconUrl: "/icons/volunteer.png" }),
};

export default function MyActivityRadarMap({ rangeKm = 15 }) {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotices = async () => {
      if (!user?.latitude || !user?.longitude) return;

      try {
        setLoading(true);
        console.log('test');
        const res = await axios.get("/notices", {
          params: {
            latitude: user.latitude,
            longitude: user.longitude,
            range: rangeKm,
          },
        });
        console.log(res.data);
        setNotices(res.data?.notices || []);
      } catch (err) {
        console.error(err);
        setError("Nie udało się pobrać danych z radarów.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [user, rangeKm]);

  if (!user) return <p className="text-xs text-slate-500">Zaloguj się, aby zobaczyć radar aktywności.</p>;
  if (loading) return <p className="text-xs text-slate-500">Ładowanie radarów...</p>;
  if (error) return <p className="text-xs text-red-500">{error}</p>;

  const center = [user.latitude, user.longitude];

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 h-64 sm:h-72">
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Twoja lokalizacja */}
        <Marker position={center} icon={defaultIcon}>
          <Popup>Twoja lokalizacja</Popup>
        </Marker>

        {/* Notices */}
        {notices.map((notice) => {
          const lat = notice.latitude;
          const lng = notice.longitude;
          if (lat == null || lng == null) return null;

          const icon = categoryIcons[notice.category] || defaultIcon;

          return (
            <Marker key={notice.id} position={[lat, lng]} icon={defaultIcon}>
              <Popup>
                <div className="flex flex-col gap-1">
                  <strong>{notice.title}</strong>
                  <span>{notice.description?.slice(0, 100)}...</span>
                  <button
                    onClick={() => navigate(`/notice/${notice.id}`)}
                    className="mt-1 text-xs text-accentBlue hover:underline"
                  >
                    Zobacz szczegóły
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
