import { COMMAND_STATES } from '../utils/constants.js';
import './MissionControlPanel.css';

const actions = [
  { key: 'manualSeparation', label: 'Manual Separation' },
  { key: 'emergencyParachute', label: 'Emergency Parachute' },
  { key: 'redundantActivation', label: 'Redundant Activation' },
  { key: 'abortMission', label: 'Abort Mission' }
];

function MissionControlPanel({ commands, onCommand }) {
  return (
    <div className="mission-control-panel">
      <div className="panel-header">
        <div>
          <h2>Mission Control</h2>
          <p>Command sequencing with real-time state tracking.</p>
        </div>
        <span className="panel-tag">Critical systems</span>
      </div>

      <div className="command-grid">
        {actions.map((action) => {
          const status = commands[action.key];
          const isDisabled = status === COMMAND_STATES.PENDING || status === COMMAND_STATES.EXECUTING;
          return (
            <article key={action.key} className="command-card">
              <div>
                <h3>{action.label}</h3>
                <span className={`command-pill ${status.toLowerCase()}`}>{status}</span>
              </div>
              <button onClick={() => onCommand(action.key)} disabled={isDisabled}>
                Execute
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default MissionControlPanel;
