import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Play, Pause, Sparkles } from 'lucide-react';

/**
 * AuthBackgroundVideo:
 * An ambient, medical-grade moving visual background for KOSHIKA authentication pages.
 * Simulates living cellular regeneration, organic bio-fluids, and neural/stem-cell
 * connection networks (the "BRIDGE" in STEMBRIDGE).
 *
 * Seamlessly adapts to both Light Mode and Dark Mode palettes with zero latency.
 */
const AuthBackgroundVideo = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle high DPI displays
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initCells();
    };

    window.addEventListener('resize', handleResize);

    // Color definitions based on current mode
    const getColors = () => {
      if (isDark) {
        return {
          bgGradientStart: '#060b14',
          bgGradientMid: '#0a1424',
          bgGradientEnd: '#05121c',
          nodeColors: ['#2dd4bf', '#14b8a6', '#38bdf8', '#c084fc', '#818cf8'],
          glowColor: 'rgba(20, 184, 166, 0.22)',
          lineColor: 'rgba(45, 212, 191, 0.12)',
          pulseColor: 'rgba(56, 189, 248, 0.08)',
          wave1: 'rgba(13, 148, 136, 0.07)',
          wave2: 'rgba(56, 189, 248, 0.05)',
          wave3: 'rgba(192, 132, 252, 0.04)',
          packetColor: 'rgba(94, 234, 212, 0.85)',
          vignette: 'rgba(6, 11, 20, 0.55)'
        };
      } else {
        return {
          bgGradientStart: '#f4fcf9',
          bgGradientMid: '#edf8fa',
          bgGradientEnd: '#f8fafc',
          nodeColors: ['#0d9488', '#059669', '#0284c7', '#9333ea', '#2563eb'],
          glowColor: 'rgba(13, 148, 136, 0.15)',
          lineColor: 'rgba(13, 148, 136, 0.12)',
          pulseColor: 'rgba(2, 132, 199, 0.06)',
          wave1: 'rgba(20, 184, 166, 0.07)',
          wave2: 'rgba(2, 132, 199, 0.05)',
          wave3: 'rgba(147, 51, 234, 0.03)',
          packetColor: 'rgba(13, 148, 136, 0.75)',
          vignette: 'rgba(240, 253, 250, 0.45)'
        };
      }
    };

    let colors = getColors();

    // Biological Cellular Nodes
    const CELL_COUNT = Math.floor(Math.min(width, height) / 28);
    let cells = [];
    let signalPackets = [];

    const initCells = () => {
      cells = [];
      const count = Math.max(22, Math.min(48, Math.floor((width * height) / 30000)));
      for (let i = 0; i < count; i++) {
        const radius = 2.5 + Math.random() * 4.5;
        cells.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius,
          baseRadius: radius,
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.025,
          color: colors.nodeColors[Math.floor(Math.random() * colors.nodeColors.length)],
          membraneOpacity: 0.2 + Math.random() * 0.35
        });
      }
    };

    initCells();

    // Rhythmic Mitosis / Life Heartbeat Waves
    let mitosisRipples = [
      { radius: 40, maxRadius: Math.max(width, height) * 0.6, speed: 0.85, opacity: 0.25 },
      { radius: 180, maxRadius: Math.max(width, height) * 0.6, speed: 0.75, opacity: 0.15 }
    ];

    let time = 0;
    let lastPacketTime = 0;

    const render = () => {
      time += 0.012;
      colors = getColors();

      // 1. Clear & Render Soft Radial Atmosphere Gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        width * 0.08,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, colors.bgGradientMid);
      bgGrad.addColorStop(0.55, colors.bgGradientStart);
      bgGrad.addColorStop(1, colors.bgGradientEnd);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Undulating Fluid Bio-Streams (Laminar Waves)
      const renderWave = (waveColor, amplitude, freq, speed, yOffset) => {
        ctx.beginPath();
        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 15) {
          const y =
            yOffset +
            Math.sin(x * freq + time * speed) * amplitude +
            Math.cos(x * freq * 0.5 + time * (speed * 0.7)) * (amplitude * 0.4);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = waveColor;
        ctx.fill();
      };

      renderWave(colors.wave1, 55, 0.0022, 0.9, height * 0.65);
      renderWave(colors.wave2, 70, 0.0016, -0.65, height * 0.72);
      renderWave(colors.wave3, 40, 0.003, 0.5, height * 0.58);

      // 3. Heartbeat / Mitosis Biological Ripples
      mitosisRipples.forEach((ripple) => {
        ripple.radius += ripple.speed;
        const progress = ripple.radius / ripple.maxRadius;
        const currentAlpha = Math.max(0, (1 - progress) * ripple.opacity);

        if (currentAlpha > 0.005) {
          ctx.beginPath();
          ctx.arc(width * 0.5, height * 0.48, ripple.radius, 0, Math.PI * 2);
          ctx.strokeStyle = isDark
            ? `rgba(45, 212, 191, ${currentAlpha})`
            : `rgba(13, 148, 136, ${currentAlpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Subtle secondary aura
          ctx.beginPath();
          ctx.arc(width * 0.5, height * 0.48, ripple.radius * 0.96, 0, Math.PI * 2);
          ctx.strokeStyle = isDark
            ? `rgba(192, 132, 252, ${currentAlpha * 0.6})`
            : `rgba(56, 189, 248, ${currentAlpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        if (ripple.radius >= ripple.maxRadius) {
          ripple.radius = 20;
        }
      });

      // 4. Update and Draw Cellular Synaptic Connections (The Bridge)
      const maxConnectDist = Math.min(width, height) * 0.22;
      for (let i = 0; i < cells.length; i++) {
        for (let j = i + 1; j < cells.length; j++) {
          const dx = cells[i].x - cells[j].x;
          const dy = cells[i].y - cells[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * (isDark ? 0.32 : 0.26);
            ctx.beginPath();
            ctx.moveTo(cells[i].x, cells[i].y);
            ctx.lineTo(cells[j].x, cells[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(45, 212, 191, ${alpha})`
              : `rgba(13, 148, 136, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Randomly spawn communication signals along connections
            if (time - lastPacketTime > 1.8 && Math.random() < 0.015 && signalPackets.length < 8) {
              signalPackets.push({
                x1: cells[i].x,
                y1: cells[i].y,
                x2: cells[j].x,
                y2: cells[j].y,
                progress: 0,
                speed: 0.015 + Math.random() * 0.02
              });
              lastPacketTime = time;
            }
          }
        }
      }

      // 5. Draw Transiting Signal Packets (Cytoplasmic Messaging)
      for (let p = signalPackets.length - 1; p >= 0; p--) {
        const packet = signalPackets[p];
        packet.progress += packet.speed;
        const curX = packet.x1 + (packet.x2 - packet.x1) * packet.progress;
        const curY = packet.y1 + (packet.y2 - packet.y1) * packet.progress;

        const packetAlpha = Math.sin(packet.progress * Math.PI) * 0.85;
        ctx.beginPath();
        ctx.arc(curX, curY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(94, 234, 212, ${packetAlpha})`
          : `rgba(13, 148, 136, ${packetAlpha})`;
        ctx.shadowColor = isDark ? '#2dd4bf' : '#0d9488';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (packet.progress >= 1) {
          signalPackets.splice(p, 1);
        }
      }

      // 6. Draw Stem Cell Nodes with Living Membrane & Nucleus
      cells.forEach((cell) => {
        // Brownian motion with boundary wrap
        cell.x += cell.vx;
        cell.y += cell.vy;

        if (cell.x < -30) cell.x = width + 30;
        if (cell.x > width + 30) cell.x = -30;
        if (cell.y < -30) cell.y = height + 30;
        if (cell.y > height + 30) cell.y = -30;

        // Biological rhythmic respiration
        const respiration = Math.sin(time * 2 + cell.pulseOffset) * 0.8;
        const curRadius = Math.max(1.8, cell.baseRadius + respiration);

        // Outer Cytoplasm Halo / Glow
        const haloGrad = ctx.createRadialGradient(
          cell.x,
          cell.y,
          curRadius * 0.4,
          cell.x,
          cell.y,
          curRadius * 3.4
        );
        haloGrad.addColorStop(0, cell.color + (isDark ? '66' : '44'));
        haloGrad.addColorStop(1, cell.color + '00');

        ctx.beginPath();
        ctx.arc(cell.x, cell.y, curRadius * 3.4, 0, Math.PI * 2);
        ctx.fillStyle = haloGrad;
        ctx.fill();

        // Cellular Lipid Bilayer Membrane (Outer Ring)
        ctx.beginPath();
        ctx.arc(cell.x, cell.y, curRadius, 0, Math.PI * 2);
        ctx.strokeStyle = cell.color + (isDark ? 'cc' : '99');
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Inner Cytoplasm Fill
        ctx.fillStyle = cell.color + (isDark ? '33' : '28');
        ctx.fill();

        // Dense Living Nucleolus Core
        ctx.beginPath();
        ctx.arc(cell.x - curRadius * 0.25, cell.y - curRadius * 0.25, curRadius * 0.38, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#ffffff' : cell.color;
        ctx.globalAlpha = isDark ? 0.8 : 0.9;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // 7. Subtle Vignette Shadowing for Card Contrast
      const vignetteGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.3,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.75
      );
      vignetteGrad.addColorStop(0, 'rgba(0,0,0,0)');
      vignetteGrad.addColorStop(1, isDark ? 'rgba(4, 8, 16, 0.65)' : 'rgba(230, 247, 244, 0.45)');
      ctx.fillStyle = vignetteGrad;
      ctx.fillRect(0, 0, width, height);

      if (isPlaying) {
        animFrameId.current = requestAnimationFrame(render);
      }
    };

    if (isPlaying) {
      animFrameId.current = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isDark, isPlaying]);

  return (
    <div
      className="auth-video-wrapper position-relative min-vh-100 d-flex flex-column align-items-center justify-content-center p-3 overflow-hidden user-select-none"
      style={{
        backgroundColor: isDark ? '#060b14' : '#f0fdfa',
        transition: 'background-color 0.4s ease'
      }}
    >
      {/* Dynamic 60fps Cellular Video Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.95
        }}
        aria-hidden="true"
      />

      {/* Floating Top Bar with Mode Switcher & Motion Control */}
      <div
        className="position-fixed top-0 end-0 p-3 p-md-4 d-flex align-items-center gap-2"
        style={{ zIndex: 1050 }}
      >
        {/* Motion Play/Pause Accessibility Control */}
        <button
          type="button"
          className="btn btn-sm rounded-pill d-flex align-items-center gap-1.5 shadow-sm px-2.5 py-1.5 border"
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(8px)',
            borderColor: isDark ? 'rgba(45, 212, 191, 0.25)' : 'rgba(13, 148, 136, 0.2)',
            color: isDark ? '#94a3b8' : '#475569',
            fontSize: '0.78rem'
          }}
          onClick={() => setIsPlaying(!isPlaying)}
          title={isPlaying ? 'Pause ambient motion' : 'Play ambient motion'}
          aria-label={isPlaying ? 'Pause background motion' : 'Play background motion'}
        >
          {isPlaying ? <Pause size={13} /> : <Play size={13} />}
          <span className="d-none d-sm-inline">{isPlaying ? 'Motion Active' : 'Paused'}</span>
        </button>

        {/* Theme Mode Toggle (Light / Dark Mode) */}
        <button
          type="button"
          className="btn btn-sm rounded-pill d-flex align-items-center gap-1.5 shadow-sm px-2.5 py-1.5 border"
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(8px)',
            borderColor: isDark ? 'rgba(45, 212, 191, 0.25)' : 'rgba(13, 148, 136, 0.2)',
            color: isDark ? '#38bdf8' : '#0d9488',
            fontSize: '0.78rem'
          }}
          onClick={toggleTheme}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? <Sun size={13} className="text-warning" /> : <Moon size={13} />}
          <span className="fw-semibold d-none d-sm-inline">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>

      {/* Floating Subtle Biological Spec Badge (Bottom-Left) */}
      <div
        className="position-fixed bottom-0 start-0 p-3 d-none d-md-flex align-items-center gap-2"
        style={{ zIndex: 10, opacity: 0.7 }}
      >
        <div
          className="badge rounded-pill px-2.5 py-1.5 d-flex align-items-center gap-1.5 border"
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(8px)',
            borderColor: isDark ? 'rgba(45, 212, 191, 0.2)' : 'rgba(13, 148, 136, 0.2)',
            color: isDark ? '#94a3b8' : '#64748b',
            fontSize: '0.72rem',
            fontWeight: 500
          }}
        >
          <Sparkles size={11} className={isDark ? 'text-teal' : 'text-teal'} />
          <span>KOSHIKA Bio-Fluidic Mesh • Cellular Signaling</span>
        </div>
      </div>

      {/* Foreground Authentication Content (Centered Card) */}
      <div
        className="position-relative w-100 d-flex justify-content-center"
        style={{ zIndex: 20 }}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthBackgroundVideo;
