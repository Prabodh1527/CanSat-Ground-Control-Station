import { DEFAULT_TELEMETRY, MISSION_PHASES } from '../utils/constants.js';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const nextMissionPhase = (seconds) => {
  if (seconds < 30) return MISSION_PHASES[0];
  if (seconds < 120) return MISSION_PHASES[1];
  if (seconds < 180) return MISSION_PHASES[2];
  if (seconds < 300) return MISSION_PHASES[3];
  return MISSION_PHASES[4];
};

const drift = (value, variance) => value + (Math.random() * variance * 2 - variance);

export const generateTelemetryFrame = (previous, commands, seconds) => {
  const phase = nextMissionPhase(seconds);
  const altitudeTarget = phase === 'PAD_PREPARATION' ? 0 : phase === 'ASCENT' ? 2400 : phase === 'APOGEE' ? 4200 : phase === 'DESCENT' ? Math.max(0, previous.altitude - 14) : 0;
  const altitude = clamp(phase === 'PAD_PREPARATION' ? 0 : altitudeTarget, 0, 4500);

  const descentRate = phase === 'DESCENT' ? clamp(8 + Math.sin(seconds / 6) * 1.2, 5.4, 11.5) : 0;
  const batteryVoltage = clamp(previous.batteryVoltage - 0.0035, 3.1, 4.25);
  const batteryPercentage = clamp((batteryVoltage - 3.1) / (4.2 - 3.1) * 100, 4, 100);
  const pressure = clamp(1013.25 - altitude * 0.11 + Math.sin(seconds / 12) * 0.4, 625, 1013.25);
  const temperature = clamp(23 + Math.sin(seconds / 18) * 3 + (phase === 'ASCENT' ? -2 : phase === 'DESCENT' ? 2 : 0), -10, 32);
  const humidity = clamp(48 + Math.sin(seconds / 14) * 6, 24, 82);
  const speed = clamp(phase === 'ASCENT' ? 24 + Math.random() * 4 : phase === 'DESCENT' ? 12 + Math.random() * 3 : 0, 0, 40);
  const verticalVelocity = phase === 'ASCENT' ? 12 + Math.random() * 3 : phase === 'DESCENT' ? -descentRate : 0;
  const gpsSatellites = clamp(10 + Math.round(Math.sin(seconds / 24) * 2), 3, 14);

  const roll = clamp((Math.sin(seconds / 4) * 18) + (commands.redundantActivation === 'Success' ? 4 : 0), -45, 45);
  const pitch = clamp((Math.cos(seconds / 5) * 12) + (commands.abortMission === 'Failed' ? 6 : 0), -35, 35);
  const yaw = clamp((Math.sin(seconds / 7) * 22) + (commands.manualSeparation === 'Success' ? 10 : 0), -60, 60);

  const latitude = previous.latitude + ((Math.random() * 0.00012) - 0.00006);
  const longitude = previous.longitude + ((Math.random() * 0.0002) - 0.0001);

  return {
    ...previous,
    altitude,
    pressure,
    temperature,
    humidity,
    batteryVoltage,
    batteryPercentage,
    latitude,
    longitude,
    gpsSatellites,
    roll,
    pitch,
    yaw,
    speed,
    verticalVelocity,
    descentRate,
    flightMode:
      phase === 'PAD_PREPARATION'
        ? 'PRE-LAUNCH'
        : phase === 'ASCENT'
        ? 'ASCENT'
        : phase === 'APOGEE'
        ? 'APOGEE'
        : phase === 'DESCENT'
        ? 'DESCENT'
        : 'RECOVERY',
    missionPhase: phase,
    containerStatus: phase === 'PAD_PREPARATION' ? 'STANDBY' : phase === 'DESCENT' ? 'OPEN' : 'SEALED',
    payloadStatus: commands.manualSeparation === 'Success' ? 'SEPARATED' : 'DOCKED'
  };
};
