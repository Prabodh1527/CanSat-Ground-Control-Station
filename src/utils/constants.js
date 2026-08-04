export const DEFAULT_TELEMETRY = {
  altitude: 0.0,
  pressure: 1013.25,
  temperature: 25.0,
  humidity: 52.0,
  batteryVoltage: 4.2,
  batteryPercentage: 100,
  latitude: 28.6139,
  longitude: 77.2090,
  gpsSatellites: 12,
  missionTime: '00:00:00',
  packetCount: 0,
  roll: 0.0,
  pitch: 0.0,
  yaw: 0.0,
  speed: 0.0,
  verticalVelocity: 0.0,
  descentRate: 0.0,
  containerStatus: 'STANDBY',
  payloadStatus: 'DOCKED',
  flightMode: 'PRE-LAUNCH',
  missionPhase: 'PAD_PREPARATION',
  errorCode: '0000'
};

export const COMMAND_STATES = {
  IDLE: 'Idle',
  PENDING: 'Pending',
  EXECUTING: 'Executing',
  SUCCESS: 'Success',
  FAILED: 'Failed'
};

export const MISSION_PHASES = [
  'PAD_PREPARATION',
  'ASCENT',
  'APOGEE',
  'DESCENT',
  'RECOVERY'
];
