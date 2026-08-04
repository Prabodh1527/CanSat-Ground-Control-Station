import { formatNumber, formatPercent } from '../utils/formatters.js';
import './TelemetryPanel.css';

function TelemetryPanel({ telemetry }) {
  const telemetryCards = [
    { label: 'Altitude', value: `${formatNumber(telemetry.altitude, 1)} m` },
    { label: 'Pressure', value: `${formatNumber(telemetry.pressure, 1)} hPa` },
    { label: 'Temperature', value: `${formatNumber(telemetry.temperature, 1)} °C` },
    { label: 'Humidity', value: `${formatNumber(telemetry.humidity, 0)} %` },
    { label: 'Battery Voltage', value: `${formatNumber(telemetry.batteryVoltage, 2)} V` },
    { label: 'Battery', value: formatPercent(telemetry.batteryPercentage) },
    { label: 'Latitude', value: telemetry.latitude.toFixed(5) },
    { label: 'Longitude', value: telemetry.longitude.toFixed(5) },
    { label: 'GPS Satellites', value: telemetry.gpsSatellites },
    { label: 'Roll', value: `${formatNumber(telemetry.roll, 1)}°` },
    { label: 'Pitch', value: `${formatNumber(telemetry.pitch, 1)}°` },
    { label: 'Yaw', value: `${formatNumber(telemetry.yaw, 1)}°` },
    { label: 'Speed', value: `${formatNumber(telemetry.speed, 1)} m/s` },
    { label: 'Vertical Velocity', value: `${formatNumber(telemetry.verticalVelocity, 1)} m/s` },
    { label: 'Descent Rate', value: `${formatNumber(telemetry.descentRate, 1)} m/s` },
    { label: 'Container Status', value: telemetry.containerStatus },
    { label: 'Payload Status', value: telemetry.payloadStatus },
    { label: 'Flight Mode', value: telemetry.flightMode },
    { label: 'Mission Phase', value: telemetry.missionPhase }
  ];

  return (
    <div className="telemetry-panel">
      <div className="panel-header">
        <div>
          <h2>Telemetry Panel</h2>
          <p>Live values streaming from the CanSat telemetry bus.</p>
        </div>
      </div>
      <div className="telemetry-grid">
        {telemetryCards.map((card) => (
          <article key={card.label} className="telemetry-card">
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        ))}
      </div>
    </div>
  );
}

export default TelemetryPanel;
