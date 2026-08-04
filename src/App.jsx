import { useEffect, useMemo, useState } from 'react';
import TopControlBar from './components/TopControlBar.jsx';
import MissionControlPanel from './components/MissionControlPanel.jsx';
import TelemetryPanel from './components/TelemetryPanel.jsx';
import RealTimeGraphs from './components/RealTimeGraphs.jsx';
import GPSTrackingMap from './components/GPSTrackingMap.jsx';
import OrientationVisualization from './components/OrientationVisualization.jsx';
import LiveCameraFeed from './components/LiveCameraFeed.jsx';
import ErrorMonitoringPanel from './components/ErrorMonitoringPanel.jsx';
import MissionStatusCard from './components/MissionStatusCard.jsx';
import FooterStatus from './components/FooterStatus.jsx';
import { generateTelemetryFrame } from './services/telemetrySimulator.js';
import { formatTime } from './utils/formatters.js';
import { evaluateErrorCode } from './utils/errorCodeParser.js';
import { DEFAULT_TELEMETRY, COMMAND_STATES } from './utils/constants.js';
import './styles/dashboard.css';

const INITIAL_COMMANDS = {
  manualSeparation: COMMAND_STATES.IDLE,
  emergencyParachute: COMMAND_STATES.IDLE,
  redundantActivation: COMMAND_STATES.IDLE,
  abortMission: COMMAND_STATES.IDLE
};

function App() {
  const [telemetry, setTelemetry] = useState({ ...DEFAULT_TELEMETRY });
  const [telemetryActive, setTelemetryActive] = useState(false);
  const [packetHistory, setPacketHistory] = useState([]);
  const [commands, setCommands] = useState({ ...INITIAL_COMMANDS });
  const [missionSeconds, setMissionSeconds] = useState(0);
  const [cameraStatus, setCameraStatus] = useState('Idle');
  const [statusMessage, setStatusMessage] = useState('System ready for launch.');
  const [errorCode, setErrorCode] = useState('0000');

  useEffect(() => {
    let intervalId;

    if (telemetryActive) {
      intervalId = setInterval(() => {
        setMissionSeconds((seconds) => seconds + 1);
        setTelemetry((prev) => {
          const next = generateTelemetryFrame(prev, commands, missionSeconds + 1);
          const nextErrorCode = evaluateErrorCode(next, commands);
          setErrorCode(nextErrorCode);
          setPacketHistory((history) => [next, ...history].slice(0, 240));
          return { ...next, missionTime: formatTime(missionSeconds + 1), packetCount: prev.packetCount + 1 };
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [telemetryActive, commands, missionSeconds]);

  useEffect(() => {
    if (!telemetryActive) return;
    const intervalId = setInterval(() => {
      setStatusMessage('Live telemetry stream synchronized.');
    }, 15000);
    return () => clearInterval(intervalId);
  }, [telemetryActive]);

  const commandHandlers = {
    startTelemetry: () => setTelemetryActive(true),
    stopTelemetry: () => setTelemetryActive(false),
    resetPackets: () => {
      setPacketHistory([]);
      setTelemetry((prev) => ({ ...prev, packetCount: 0 }));
      setStatusMessage('Packet counter reset.');
    }
  };

  const handleCommand = (commandKey) => {
    setCommands((current) => ({
      ...current,
      [commandKey]: COMMAND_STATES.PENDING
    }));

    setTimeout(() => {
      setCommands((current) => ({
        ...current,
        [commandKey]: Math.random() > 0.12 ? COMMAND_STATES.SUCCESS : COMMAND_STATES.FAILED
      }));
      setStatusMessage(`Command ${commandKey.replace(/([A-Z])/g, ' $1')} completed.`);
    }, 1200);
  };

  const telemetrySnapshot = useMemo(() => telemetry, [telemetry]);

  return (
    <div className="dashboard-container">
      <TopControlBar
        telemetryActive={telemetryActive}
        onStart={commandHandlers.startTelemetry}
        onStop={commandHandlers.stopTelemetry}
        onResetPackets={commandHandlers.resetPackets}
        packetCount={telemetry.packetCount}
        missionTime={formatTime(missionSeconds)}
        connectionStatus={telemetryActive ? 'ONLINE' : 'OFFLINE'}
        statusMessage={statusMessage}
      />

      <div className="dashboard-grid">
        <section className="gcs-card col-span-8">
          <MissionControlPanel commands={commands} onCommand={handleCommand} />
        </section>

        <section className="gcs-card col-span-4">
          <MissionStatusCard
            telemetry={telemetrySnapshot}
            packetCount={telemetry.packetCount}
            errorCode={errorCode}
            telemetryActive={telemetryActive}
          />
        </section>

        <section className="gcs-card col-span-4">
          <TelemetryPanel telemetry={telemetrySnapshot} />
        </section>

        <section className="gcs-card col-span-8">
          <RealTimeGraphs telemetry={telemetrySnapshot} packetHistory={packetHistory} />
        </section>

        <section className="gcs-card col-span-4">
          <ErrorMonitoringPanel errorCode={errorCode} />
        </section>

        <section className="gcs-card col-span-6">
          <GPSTrackingMap telemetry={telemetrySnapshot} />
        </section>

        <section className="gcs-card col-span-6">
          <OrientationVisualization telemetry={telemetrySnapshot} />
        </section>

        <section className="gcs-card col-span-12">
          <LiveCameraFeed cameraStatus={cameraStatus} setCameraStatus={setCameraStatus} />
        </section>
      </div>

      <FooterStatus telemetry={telemetrySnapshot} />
    </div>
  );
}

export default App;
