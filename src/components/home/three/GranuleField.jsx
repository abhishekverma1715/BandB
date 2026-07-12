import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * GranuleField (Geodesic Globe Structure)
 * Architectural rotating geodesic globe structure without orbiting dots,
 * engineered to frame the hero product slider.
 */
const GranuleField = ({ className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = canvas.clientWidth || 600;
    let height = canvas.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);

    const ambient = new THREE.AmbientLight(0xffffff, 0.72);
    scene.add(ambient);

    const key = new THREE.PointLight(0x3b82f6, 2.0, 40);
    key.position.set(6, 6, 8);
    scene.add(key);

    const globeGroup = new THREE.Group();

    // Outer Geodesic Wireframe Sphere (Slightly larger)
    const outerGeo = new THREE.IcosahedronGeometry(4.7, 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.30,
    });
    const outerSphere = new THREE.Mesh(outerGeo, outerMat);
    globeGroup.add(outerSphere);

    // Inner Structural Polyhedron (Slightly larger)
    const innerGeo = new THREE.IcosahedronGeometry(3.6, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.20,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerSphere);

    // Equatorial Molecular Ring (Slightly larger)
    const ringGeo = new THREE.TorusGeometry(5.0, 0.022, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    globeGroup.add(ring);

    scene.add(globeGroup);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!prefersReducedMotion) window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      width = canvas.clientWidth || 600;
      height = canvas.clientHeight || 600;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    window.addEventListener('resize', handleResize);

    let rafId;
    let t = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      if (!prefersReducedMotion) t += delta;

      globeGroup.rotation.y = t * 0.1;
      globeGroup.rotation.x = Math.sin(t * 0.08) * 0.15;
      ring.rotation.z = t * 0.05;

      camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 0.8 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default GranuleField;
