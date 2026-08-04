import './MissionStatusCard.css';

function MissionStatusCard({ telemetry, packetCount, errorCode, telemetryActive }) {
  return (
    <div className="mission-status-card">
      <div className="panel-header">
        <div>
          <h2>Mission Status</h2>
          <p>Live mission health and telemetry snapshot.</p>
        </div>
        <span className="panel-tag">Status Deck</span>
      </div>

      <div className="status-grid">
        <div className="status-pill status-primary">
          <span>Telemetry</span>
          <strong>{telemetryActive ? 'Active' : 'Offline'}</strong>
        </div>
        <div className="status-pill status-accent">
          <span>Packets</span>
          <strong>{packetCount}</strong>
        </div>
        <div className="status-pill status-alert">
          <span>Flight Mode</span>
          <strong>{telemetry.flightMode}</strong>
        </div>
        <div className="status-pill status-alert-soft">
          <span>Phase</span>
          <strong>{telemetry.missionPhase}</strong>
        </div>
      </div>

      <div className="status-metrics">
        <div>
          <span>Altitude</span>
          <strong>{telemetry.altitude.toFixed(1)} m</strong>
        </div>
        <div>
          <span>Battery</span>
          <strong>{telemetry.batteryPercentage.toFixed(0)}%</strong>
        </div>
        <div>
          <span>GPS sats</span>
          <strong>{telemetry.gpsSatellites}</strong>
        </div>
        <div>
          <span>Error Code</span>
          <strong>{errorCode}</strong>
        </div>
      </div>
    </div>
  );
}

export default MissionStatusCard;
