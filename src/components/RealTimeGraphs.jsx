import { useEffect, useMemo, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { downloadCsv, exportGraphImage } from '../services/exportService.js';
import './RealTimeGraphs.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

function buildDataset(label, data, borderColor) {
  return {
    label,
    data,
    fill: true,
    tension: 0.35,
    borderColor,
    backgroundColor: `${borderColor}22`,
    pointRadius: 0
  };
}

function RealTimeGraphs({ telemetry, packetHistory }) {
  const chartRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  const times = useMemo(() => packetHistory.map((item) => item.missionTime).reverse(), [packetHistory]);

  const currentFrames = useMemo(() => {
    const history = packetHistory.slice(0, 12).reverse();
    return {
      altitude: history.map((item) => item.altitude),
      pressure: history.map((item) => item.pressure),
      temperature: history.map((item) => item.temperature),
      battery: history.map((item) => item.batteryVoltage),
      descentRate: history.map((item) => item.descentRate)
    };
  }, [packetHistory]);

  const graphData = useMemo(
    () => ({
      labels: times,
      datasets: [
        buildDataset('Altitude (m)', currentFrames.altitude, '#00e5ff'),
        buildDataset('Pressure (hPa)', currentFrames.pressure, '#6fc9ff'),
        buildDataset('Temperature (°C)', currentFrames.temperature, '#72ffda'),
        buildDataset('Battery (V)', currentFrames.battery, '#5e72ff'),
        buildDataset('Descent Rate (m/s)', currentFrames.descentRate, '#ff7d7d')
      ]
    }),
    [times, currentFrames]
  );

  useEffect(() => {
    if (packetHistory.length === 0) return;
  }, [packetHistory]);

  const handleExport = async () => {
    setExporting(true);
    await exportGraphImage(chartRef.current?.containerRef?.current || document.querySelector('.real-time-graph-chart'));
    setExporting(false);
  };

  return (
    <div className="real-time-graphs">
      <div className="panel-header">
        <div>
          <h2>Real-time Graphs</h2>
          <p>Continuous mission metrics over the past telemetry packets.</p>
        </div>
        <div className="graph-controls">
          <button onClick={() => downloadCsv(packetHistory)}>Export CSV</button>
          <button onClick={handleExport} disabled={exporting}>
            {exporting ? 'Exporting...' : 'Export Graph'}
          </button>
        </div>
      </div>
      <div className="graph-card real-time-graph-chart">
        <Line ref={chartRef} data={graphData} options={{ responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#cce7ff' } } }, scales: { x: { ticks: { color: '#8eb9f2' }, grid: { color: 'rgba(0,229,255,0.05)' } }, y: { ticks: { color: '#8eb9f2' }, grid: { color: 'rgba(0,229,255,0.05)' } } } }} />
      </div>
    </div>
  );
}

export default RealTimeGraphs;
