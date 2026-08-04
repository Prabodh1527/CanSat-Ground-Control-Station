import { useMemo } from 'react';
import './TopControlBar.css';

function TopControlBar({ telemetryActive, onStart, onStop, onResetPackets, packetCount, missionTime, connectionStatus, statusMessage }) {
  const connectionClass = useMemo(() => (connectionStatus === 'ONLINE' ? 'status-online' : 'status-offline'), [connectionStatus]);

  return (
    <header className="top-control-bar gcs-card">
      <div className="top-control-left">
        <div className="brand-pill">
          <span>CanSat GCS</span>
        </div>
        <div className="mission-data-pill">
          <span>Mission Time</span>
          <strong>{missionTime}</strong>
        </div>
        <div className="mission-data-pill">
          <span>Packets</span>
          <strong>{packetCount}</strong>
        </div>
      </div>

      <div className="top-control-buttons">
        <button className="primary-btn" onClick={onStart} disabled={telemetryActive}>
          Start Telemetry
        </button>
        <button className="secondary-btn" onClick={onStop} disabled={!telemetryActive}>
          Stop Telemetry
        </button>
        <button className="secondary-btn" onClick={onResetPackets}>
          Reset Packets
        </button>
      </div>

      <div className="top-control-right">
        <div className={`status-badge ${connectionClass}`}>
          <span className="status-label">Connection</span>
          <strong>{connectionStatus}</strong>
        </div>
        <div className="status-badge status-warm">
          <span className="status-label">System</span>
          <strong>{statusMessage}</strong>
        </div>
      </div>
    </header>
  );
}

export default TopControlBar;
