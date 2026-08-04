# CanSat Ground Control Software

Professional Ground Control Station dashboard built with React and Vite for CanSat mission telemetry visualization.

## Features

- Real-time telemetry simulator
- Mission control commands with status states
- Live graphs using Chart.js
- GPS tracking with Leaflet and OpenStreetMap
- 3D orientation visualization via Three.js
- Browser camera video stream controls
- Error monitoring with 4-digit flight health code
- Local CSV export and graph export

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Build production bundle:
   ```bash
   npm run build
   ```

## Notes

- The telemetry generator runs on an interval and updates mission state every second.
- The architecture is modular and split into reusable components.
- Designed for dark aerospace theme with responsive layout and glassmorphism.
