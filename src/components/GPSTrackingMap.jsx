import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import './GPSTrackingMap.css';

const markerIcon = new L.DivIcon({
  className: 'gps-marker',
  html: '<div class="gps-dot"></div>'
});

function GPSTrackingMap({ telemetry }) {
  const [path, setPath] = useState([]);

  useEffect(() => {
    setPath((current) => [...current.slice(-20), [telemetry.latitude, telemetry.longitude]]);
  }, [telemetry.latitude, telemetry.longitude]);

  const position = useMemo(() => [telemetry.latitude, telemetry.longitude], [telemetry.latitude, telemetry.longitude]);

  return (
    <div className="gps-tracking-map">
      <div className="panel-header">
        <div>
          <h2>GPS Tracking Map</h2>
          <p>Current location, path trace, and altitude popup.</p>
        </div>
        <span className="panel-tag">OpenStreetMap</span>
      </div>
      <MapContainer center={position} zoom={14} scrollWheelZoom={false} className="map-frame">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={path} pathOptions={{ color: '#00e5ff', weight: 4, opacity: 0.75 }} />
        <Marker position={position} icon={markerIcon}>
          <Popup>
            <div className="popup-body">
              <p><strong>Latitude:</strong> {telemetry.latitude.toFixed(5)}</p>
              <p><strong>Longitude:</strong> {telemetry.longitude.toFixed(5)}</p>
              <p><strong>Altitude:</strong> {telemetry.altitude.toFixed(1)} m</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default GPSTrackingMap;
