import { useEffect, useRef, useState } from 'react';
import './LiveCameraFeed.css';

function LiveCameraFeed({ cameraStatus, setCameraStatus }) {
  const videoRef = useRef(null);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (!navigator.mediaDevices) return;

    navigator.mediaDevices.enumerateDevices().then((list) => {
      const cams = list.filter((device) => device.kind === 'videoinput');
      setDevices(cams);
      if (cams.length && !selectedDeviceId) {
        setSelectedDeviceId(cams[0].deviceId);
      }
    });
  }, [selectedDeviceId]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined, width: 1280, height: 720 }
      });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setCameraStatus('Streaming');
      setRecording(true);
    } catch (error) {
      console.error(error);
      setCameraStatus('Unavailable');
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraStatus('Stopped');
    setRecording(false);
  };

  return (
    <div className="live-camera-feed">
      <div className="panel-header">
        <div>
          <h2>Live Camera Feed</h2>
          <p>Browser camera stream control for live payload observation.</p>
        </div>
        <span className="panel-tag">Video Stream</span>
      </div>
      <div className="camera-controls">
        <div className="camera-select">
          <label htmlFor="cameraDevice">Camera Selection</label>
          <select id="cameraDevice" value={selectedDeviceId} onChange={(e) => setSelectedDeviceId(e.target.value)}>
            {devices.length ? (
              devices.map((device) => (
                <option value={device.deviceId} key={device.deviceId}>
                  {device.label || 'Camera #' + (devices.indexOf(device) + 1)}
                </option>
              ))
            ) : (
              <option value="">No camera found</option>
            )}
          </select>
        </div>
        <div className="camera-actions">
          <button onClick={startCamera} disabled={!devices.length}>
            Start Camera
          </button>
          <button onClick={stopCamera} disabled={!recording}>
            Stop Camera
          </button>
        </div>
      </div>
      <div className="camera-card">
        <video ref={videoRef} muted playsInline className="camera-view" />
        <div className="camera-status-bar">
          <span>Status: {cameraStatus}</span>
          <span>{recording ? '● Recording' : '● Idle'}</span>
        </div>
      </div>
    </div>
  );
}

export default LiveCameraFeed;
