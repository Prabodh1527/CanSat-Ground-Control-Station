import html2canvas from 'html2canvas';

export const downloadCsv = (packets = []) => {
  const headers = [
    'missionTime',
    'packetCount',
    'altitude',
    'pressure',
    'temperature',
    'humidity',
    'batteryVoltage',
    'batteryPercentage',
    'latitude',
    'longitude',
    'gpsSatellites',
    'roll',
    'pitch',
    'yaw',
    'speed',
    'verticalVelocity',
    'descentRate',
    'flightMode',
    'missionPhase',
    'errorCode'
  ];

  const rows = packets.map((packet) =>
    headers.map((header) => JSON.stringify(packet[header] ?? '')).join(',')
  );

  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `mission-telemetry-${Date.now()}.csv`);
  link.click();
  URL.revokeObjectURL(link.href);
};

export const exportGraphImage = async (chartElement) => {
  if (!chartElement) return;
  const canvas = await html2canvas(chartElement, { backgroundColor: '#050b14' });
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = `mission-graph-${Date.now()}.png`;
  link.click();
};
