import { parseErrorCodeDetails } from '../utils/errorCodeParser.js';
import './ErrorMonitoringPanel.css';

function ErrorMonitoringPanel({ errorCode }) {
  const details = parseErrorCodeDetails(errorCode);

  return (
    <div className="error-monitoring-panel">
      <div className="panel-header">
        <div>
          <h2>Error Monitoring</h2>
          <p>Flight health status represented by a 4-digit mission code.</p>
        </div>
      </div>
      <div className="error-code-summary">
        <span className="error-code-label">Error Code</span>
        <strong className="error-code-value">{errorCode}</strong>
      </div>

      <div className="error-list">
        {details.map((item) => (
          <div key={item.digit} className="error-row">
            <div>
              <span>{item.label}</span>
              <strong style={{ color: item.color }}>{item.status}</strong>
            </div>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ErrorMonitoringPanel;
