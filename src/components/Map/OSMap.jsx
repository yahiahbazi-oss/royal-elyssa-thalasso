import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons
const goldIcon = new L.Icon({
  iconUrl:
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="%23D4AF37" stroke="%23B8860B" stroke-width="2"/><circle cx="16" cy="16" r="8" fill="%23B8860B"/><circle cx="16" cy="16" r="4" fill="%23FFD700"/></svg>',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function OSMap() {
  const position = [35.766667, 10.759167]; // Royal Elyssa coordinates

  return (
    <MapContainer
      center={position}
      zoom={15}
      className="w-full h-96 md:h-[500px] lg:h-[600px] rounded-2xl shadow-inner border-2 border-amber-100 z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={position} icon={goldIcon}>
        <Popup className="font-serif">
          <h3 className="text-amber-600 font-bold">
            Royal Elyssa Thalasso & Spa
          </h3>
          <p className="text-stone-700">
            B.P 75 Route Touristique Skanes
            <br />
            Monastir 5060, Tunisia
          </p>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
