'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Hero = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement for 3D title effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!titleRef.current) return;

      const rect = titleRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate mouse position relative to title center
      const deltaX = (e.clientX - centerX) / window.innerWidth;
      const deltaY = (e.clientY - centerY) / window.innerHeight;

      setMousePosition({ x: deltaX, y: deltaY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animated background particles
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.x -= (dx / distance) * force * 2;
          particle.y -= (dy / distance) * force * 2;
        }

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 100, 100, ${particle.opacity})`;
        ctx.fill();

        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(120, 120, 120, ${0.15 * (1 - distance / 120)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 3D Portrait effect
  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const image = loader.load('/res/hero-portrait.png');
    const depth = loader.load('/res/heatmap.png');
    depth.wrapS = depth.wrapT = THREE.ClampToEdgeWrapping;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: image },
        uDepth: { value: depth },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      },
      transparent: true,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform sampler2D uDepth;
        uniform vec2 uMouse;
        varying vec2 vUv;
        void main() {
          float depth = texture2D(uDepth, vUv).r;
          float mx = (uMouse.x - 0.5) * 0.04;
          float my = (uMouse.y - 0.5) * 0.02;
          vec2 displacedUv = vUv + vec2(mx * depth, my * depth);
          vec4 color = texture2D(uTexture, displacedUv);
          float brightness = (color.r + color.g + color.b) / 3.0;
          float alpha = 1.0 - smoothstep(0.75, 0.95, brightness);
          gl_FragColor = vec4(color.rgb, color.a * alpha);
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(1.8, 2.2, 50, 50);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let targetX = 0.5;
    let targetY = 0.5;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX / window.innerWidth;
      targetY = e.clientY / window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      const currentX = material.uniforms.uMouse.value.x;
      const currentY = material.uniforms.uMouse.value.y;
      const newX = currentX + (targetX - currentX) * 0.1;
      const newY = currentY + (targetY - currentY) * 0.1;

      material.uniforms.uMouse.value.set(newX, newY);
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="hero-section">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(2deg); }
          66% { transform: translateY(10px) rotate(-2deg); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 50%, #e8e8e8 100%);
          overflow: hidden;
        }

        .particles-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          margin-top: 50px;
        }

        .wave-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1;
          opacity: 0.3;
        }

        .wave {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: float 8s ease-in-out infinite;
        }

        .wave-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(150, 150, 150, 0.15) 0%, transparent 70%);
          top: -200px;
          left: -100px;
          animation-delay: 0s;
        }

        .wave-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(130, 130, 130, 0.12) 0%, transparent 70%);
          bottom: -150px;
          right: -100px;
          animation-delay: 2s;
        }

        .wave-3 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(110, 110, 110, 0.1) 0%, transparent 70%);
          top: 50%;
          right: 10%;
          animation-delay: 4s;
        }

        .hero-container {
          max-width: 1600px;
          width: 100%;
          padding: 0 50px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }

        .hero-content {
          flex: 1;
          animation: fadeInUp 1s ease-out;
        }

        .hero-subtitle {
          font-size: 18px;
          font-weight: 500;
          color: rgba(80, 80, 80, 0.8);
          letter-spacing: 2px;
          margin-bottom: 20px;
          text-transform: uppercase;
        }

        .hero-title {
          font-size: 140px;
          font-weight: 900;
          line-height: 0.9;
          color: #1a1a1a;
          letter-spacing: -6px;
          text-transform: uppercase;
          margin: 0;
          position: relative;
          transition: transform 0.15s ease-out;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .hero-3d-wrapper {
          width: 600px;
          height: 700px;
          position: relative;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          text-align: center;
          font-size: 14px;
          color: rgba(100, 100, 100, 0.7);
          letter-spacing: 1px;
        }

        .scroll-arrow {
          position: relative;
          width: 30px;
          height: 50px;
          margin: 10px auto 0;
          border: 2px solid rgba(100, 100, 100, 0.3);
          border-radius: 15px;
        }

        .scroll-arrow::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-top: 12px solid rgba(100, 100, 100, 0.5);
        }

        @media (max-width: 1400px) {
          .hero-title { font-size: 120px; }
          .hero-3d-wrapper { width: 550px; height: 650px; }
        }

        @media (max-width: 1200px) {
          .hero-title { font-size: 100px; }
          .hero-3d-wrapper { width: 500px; height: 600px; }
        }

        @media (max-width: 1024px) {
          .hero-container {
            flex-direction: column;
            text-align: center;
            padding: 0 30px;
          }
          .hero-content { margin-bottom: 40px; }
          .hero-title { font-size: 80px; letter-spacing: -4px; }
          .hero-3d-wrapper { width: 450px; height: 550px; }
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 60px; letter-spacing: -3px; }
          .hero-subtitle { font-size: 14px; }
          .hero-3d-wrapper { width: 380px; height: 480px; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 48px; letter-spacing: -2px; }
          .hero-subtitle { font-size: 12px; }
          .hero-3d-wrapper { width: 320px; height: 400px; }
        }
      `}</style>

      <canvas ref={particlesRef} className="particles-canvas"></canvas>

      <div className="wave-bg">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-subtitle">VA Licensed Realtor</div>
          <div className="hero-subtitle" style={{ fontWeight: 700 }}>IKON Realty</div>
          <h1
            ref={titleRef}
            className="hero-title"
            style={{
              transform: `
                perspective(1000px)
                rotateX(${mousePosition.y * -15}deg)
                rotateY(${mousePosition.x * 15}deg)
                translateZ(20px)
              `
            }}
          >
            RAJ<br />KHAREL
          </h1>
        </div>
        <div className="hero-3d-wrapper" ref={mountRef}></div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll down</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;