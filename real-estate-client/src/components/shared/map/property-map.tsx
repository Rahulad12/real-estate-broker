import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface PropertyMapProps {
  lat: number;
  lng: number;
  className?: string;
}

const customIcon = new L.DivIcon({
  html: `<div style="background-color: #037171; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
    <div style="width: 10px; height: 10px; background: white; border-radius: 50%; transform: rotate(45deg);"></div>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: "custom-marker-icon",
});

function MapUpdater({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  map.setView([lat, lng], 15);
  return null;
}

export function PropertyMap({ lat, lng, className = "" }: PropertyMapProps) {
  return (
    <div className={`rounded-xl overflow-hidden border border-border ${className}`}>
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        className="h-full min-h-[160px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={customIcon} />
        <MapUpdater lat={lat} lng={lng} />
      </MapContainer>
    </div>
  );
}