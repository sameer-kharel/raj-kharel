display: flex;
align - items: center;
justify - content: center;
background: linear - gradient(135deg, #f5f5f5 0 %, #ffffff 50 %, #e8e8e8 100 %);
overflow: hidden;
        }

        .particles - canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100 %;
  height: 100 %;
  z - index: 1;
  margin - top: 50px;
}

        .wave - bg {
  position: absolute;
  width: 100 %;
  height: 100 %;
  top: 0;
  left: 0;
  z - index: 1;
  opacity: 0.3;
}

        .wave {
  position: absolute;
  border - radius: 50 %;
  filter: blur(80px);
  animation: float 8s ease -in -out infinite;
}

        .wave - 1 {
  width: 600px;
  height: 600px;
  background: radial - gradient(circle, rgba(150, 150, 150, 0.15) 0 %, transparent 70 %);
  top: -200px;
  left: -100px;
  animation - delay: 0s;
}

        .wave - 2 {
  width: 500px;
  height: 500px;
  background: radial - gradient(circle, rgba(130, 130, 130, 0.12) 0 %, transparent 70 %);
  bottom: -150px;
  right: -100px;
  animation - delay: 2s;
}

        .wave - 3 {
  width: 400px;
  height: 400px;
  background: radial - gradient(circle, rgba(110, 110, 110, 0.1) 0 %, transparent 70 %);
  top: 50 %;
  right: 10 %;
  animation - delay: 4s;
}

        .hero - container {
  max - width: 1600px;
  width: 100 %;
  padding: 0 50px;
  display: flex;
  align - items: center;
  justify - content: space - between;
  position: relative;
  z - index: 2;
}

        .hero - content {
  flex: 1;
  animation: fadeInUp 1s ease - out;
}

        .hero - subtitle {
  font - size: 18px;
  font - weight: 500;
  color: rgba(80, 80, 80, 0.8);
  letter - spacing: 2px;
  margin - bottom: 20px;
  text - transform: uppercase;
}

        .hero - title {
  font - size: 140px;
  font - weight: 900;
  line - height: 0.9;
  color: #1a1a1a;
  letter - spacing: -6px;
  text - transform: uppercase;
  margin: 0;
  position: relative;
  transition: transform 0.15s ease - out;
  transform - style: preserve - 3d;
  will - change: transform;
}

        .hero - 3d - wrapper {
  width: 600px;
  height: 700px;
  position: relative;
}

        .scroll - indicator {
  position: absolute;
  bottom: 40px;
  left: 50 %;
  transform: translateX(-50 %);
  z - index: 3;
  text - align: center;
  font - size: 14px;
  color: rgba(100, 100, 100, 0.7);
  letter - spacing: 1px;
}

        .scroll - arrow {
  position: relative;
  width: 30px;
  height: 50px;
  margin: 10px auto 0;
  border: 2px solid rgba(100, 100, 100, 0.3);
  border - radius: 15px;
}

        .scroll - arrow::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50 %;
  transform: translateX(-50 %);
  width: 0;
  height: 0;
  border - left: 7px solid transparent;
  border - right: 7px solid transparent;
  border - top: 12px solid rgba(100, 100, 100, 0.5);
}

@media(max - width: 1400px) {
          .hero - title { font - size: 120px; }
          .hero - 3d - wrapper { width: 550px; height: 650px; }
}

@media(max - width: 1200px) {
          .hero - title { font - size: 100px; }
          .hero - 3d - wrapper { width: 500px; height: 600px; }
}

@media(max - width: 1024px) {
          .hero - container {
    flex - direction: column;
    text - align: center;
    padding: 0 30px;
  }
          .hero - content { margin - bottom: 40px; }
          .hero - title { font - size: 80px; letter - spacing: -4px; }
          .hero - 3d - wrapper { width: 450px; height: 550px; }
}

@media(max - width: 768px) {
          .hero - title { font - size: 60px; letter - spacing: -3px; }
          .hero - subtitle { font - size: 14px; }
          .hero - 3d - wrapper { width: 380px; height: 480px; }
}

@media(max - width: 480px) {
          .hero - title { font - size: 48px; letter - spacing: -2px; }
          .hero - subtitle { font - size: 12px; }
          .hero - 3d - wrapper { width: 320px; height: 400px; }
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
          <h1 
            ref={titleRef}
            className="hero-title"
            style={{
              transform: `
perspective(1000px)
rotateX(${ mousePosition.y * -15 }deg)
rotateY(${ mousePosition.x * 15 }deg)
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