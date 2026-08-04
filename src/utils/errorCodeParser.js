export const evaluateErrorCode = (telemetry, commandStates = {}) => {
  let d1 = '0';
  let d2 = '0';
  let d3 = '0';
  let d4 = '0';

  if (telemetry.missionPhase === 'DESCENT') {
    if (telemetry.descentRate < 8.0 || telemetry.descentRate > 10.0) {
      d1 = '1';
    }
  }

  if (telemetry.gpsSatellites < 4) {
    d2 = '1';
  }

  if (commandStates.manualSeparation === 'Failed' || telemetry.payloadStatus === 'FAULT') {
    d3 = '1';
  }

  if (commandStates.emergencyParachute === 'Success' || telemetry.flightMode === 'EMERGENCY_DESCENT') {
    d4 = '1';
  }

  return `${d1}${d2}${d3}${d4}`;
};

export const parseErrorCodeDetails = (code) => {
  if (!code || code.length !== 4) code = '0000';

  return [
    {
      digit: 1,
      label: 'Descent Rate Fault',
      status: code[0] === '1' ? 'FAULT' : 'OK',
      description:
        code[0] === '1'
          ? 'Descent rate outside 8-10 m/s during descent.'
          : 'Descent rate nominal.',
      color: code[0] === '1' ? 'var(--accent-red)' : 'var(--accent-green)'
    },
    {
      digit: 2,
      label: 'GPS Fault',
      status: code[1] === '1' ? 'FAULT' : 'OK',
      description:
        code[1] === '1' ? 'GPS signal weak or satellite count low.' : 'GPS telemetry nominal.',
      color: code[1] === '1' ? 'var(--accent-red)' : 'var(--accent-green)'
    },
    {
      digit: 3,
      label: 'Payload Separation Fault',
      status: code[2] === '1' ? 'FAULT' : 'OK',
      description:
        code[2] === '1' ? 'Payload separation abnormal.' : 'Payload separation nominal.',
      color: code[2] === '1' ? 'var(--accent-red)' : 'var(--accent-green)'
    },
    {
      digit: 4,
      label: 'Emergency Parachute',
      status: code[3] === '1' ? 'ACTIVE' : 'INACTIVE',
      description:
        code[3] === '1' ? 'Emergency parachute deployed.' : 'Standard descent routines active.',
      color: code[3] === '1' ? 'var(--accent-yellow)' : 'var(--accent-green)'
    }
  ];
};
