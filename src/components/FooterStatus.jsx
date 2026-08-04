import './FooterStatus.css';

function FooterStatus({ telemetry }) {
  return (
    <footer className="footer-status gcs-card">
      <div>
        <span>Telemetry Packet</span>
        <strong>{telemetry.packetCount}</strong>
      </div>
      <div>
        <span>Latitude</span>
        <strong>{telemetry.latitude.toFixed(5)}</strong>
      </div>
      <div>
        <span>Longitude</span>
        <strong>{telemetry.longitude.toFixed(5)}</strong>
      </div>
      <div>
        <span>Battery</span>
        <strong>{telemetry.batteryPercentage.toFixed(0)}%</strong>
      </div>
      <div>
        <span>Altitude</span>
        <strong>{telemetry.altitude.toFixed(1)} m</strong>
      </div>
    </footer>
  );
}

export default FooterStatus;
