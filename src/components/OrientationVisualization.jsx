import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './OrientationVisualization.css';

function OrientationVisualization({ telemetry }) {
  const containerRef = useRef();
  const animationIdRef = useRef();
  const cubeRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#08111f');

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    camera.position.set(4.5, 3.5, 5.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x08111f, 1);
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x9bc7ff, 0.95);
    const directional = new THREE.DirectionalLight(0x00d8ff, 1.4);
    directional.position.set(5, 7, 5);
    scene.add(ambient, directional);

    const geometry = new THREE.BoxGeometry(2, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x1d5b83,
      metalness: 0.45,
      roughness: 0.18,
      emissive: 0x003656,
      emissiveIntensity: 0.24
    });

    const cube = new THREE.Mesh(geometry, material);
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry),
      new THREE.LineBasicMaterial({ color: 0x00e5ff, linewidth: 1.8 })
    );
    cube.add(edges);
    cubeRef.current = cube;
    scene.add(cube);

    const grid = new THREE.GridHelper(10, 10, 0x00d0ff, 0x00203c);
    grid.position.y = -0.65;
    scene.add(grid);

    const axes = new THREE.AxesHelper(3);
    axes.position.y = -0.5;
    scene.add(axes);

    const animate = () => {
      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;
    cube.rotation.x = THREE.MathUtils.degToRad(telemetry.pitch);
    cube.rotation.y = THREE.MathUtils.degToRad(telemetry.yaw);
    cube.rotation.z = THREE.MathUtils.degToRad(telemetry.roll);
  }, [telemetry.pitch, telemetry.yaw, telemetry.roll]);

  return (
    <div className="orientation-visualization">
      <div className="panel-header">
        <div>
          <h2>Orientation Visualization</h2>
          <p>3D satellite attitude rendering in real time.</p>
        </div>
        <span className="panel-tag">Roll / Pitch / Yaw</span>
      </div>
      <div className="orientation-canvas" ref={containerRef} />
    </div>
  );
}

export default OrientationVisualization;
