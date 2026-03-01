import React, { useEffect, useRef, useState } from 'react';

export const WebsiteBackground = ({
  // Background color
  backgroundColor = '#FFFFFF', 
  // Square/Grid styles
  squareSize = 40,
  lineThickness = 1,
  lineColor = 'rgba(188, 255, 247, 0.5)', 
  
  // Glow styles
  glowColor = 'rgb(168, 255, 242)', 
  glowSize = 400,
  
  // Follow speed 
  followSpeed = 0.08,
}) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 }); 
  const currentPosRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      // Smooth follow with easing
      currentPosRef.current.x += (mouseRef.current.x - currentPosRef.current.x) * followSpeed;
      currentPosRef.current.y += (mouseRef.current.y - currentPosRef.current.y) * followSpeed;

      // Clear canvas
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineThickness;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += squareSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += squareSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw enhanced glow only on grid lines in circular glow area with radial gradient
      const glowRadius = glowSize * 0.6;

      // Vertical glowing lines - draw segments within circular glow area
      for (let x = 0; x < canvas.width; x += squareSize) {
        ctx.beginPath();
        let isInGlow = false;
        let segmentStart = null;

        // Sample points along the vertical line
        for (let y = 0; y < canvas.height; y += 2) {
          const dx = x - currentPosRef.current.x;
          const dy = y - currentPosRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < glowRadius) {
            if (!isInGlow) {
              segmentStart = y;
              isInGlow = true;
            }
          } else if (isInGlow) {
            // Draw the segment with radial gradient glow
            const gradient = ctx.createRadialGradient(
              currentPosRef.current.x,
              currentPosRef.current.y,
              0,
              currentPosRef.current.x,
              currentPosRef.current.y,
              glowRadius
            );
            gradient.addColorStop(0, glowColor);
            gradient.addColorStop(0.1, glowColor + 'cc');
            gradient.addColorStop(0.3, glowColor + '66');
            gradient.addColorStop(0.6, glowColor + '1a');
            gradient.addColorStop(1, glowColor + '00');

            ctx.strokeStyle = gradient;
            ctx.lineWidth = lineThickness * 2;
            ctx.shadowBlur = 20;
            ctx.shadowColor = glowColor;
            ctx.globalAlpha = 1;
            ctx.moveTo(x, segmentStart);
            ctx.lineTo(x, y);
            ctx.stroke();
            isInGlow = false;
          }
        }

        // Draw final segment if still in glow
        if (isInGlow) {
          const gradient = ctx.createRadialGradient(
            currentPosRef.current.x,
            currentPosRef.current.y,
            0,
            currentPosRef.current.x,
            currentPosRef.current.y,
            glowRadius
          );
          gradient.addColorStop(0, glowColor);
          gradient.addColorStop(0.1, glowColor + 'cc');
          gradient.addColorStop(0.3, glowColor + '66');
          gradient.addColorStop(0.6, glowColor + '1a');
          gradient.addColorStop(1, glowColor + '00');

          ctx.strokeStyle = gradient;
          ctx.lineWidth = lineThickness * 2;
          ctx.shadowBlur = 20;
          ctx.shadowColor = glowColor;
          ctx.globalAlpha = 1;
          ctx.moveTo(x, segmentStart);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
      }

      // Horizontal glowing lines - draw segments within circular glow area
      for (let y = 0; y < canvas.height; y += squareSize) {
        ctx.beginPath();
        let isInGlow = false;
        let segmentStart = null;

        // Sample points along the horizontal line
        for (let x = 0; x < canvas.width; x += 2) {
          const dx = x - currentPosRef.current.x;
          const dy = y - currentPosRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < glowRadius) {
            if (!isInGlow) {
              segmentStart = x;
              isInGlow = true;
            }
          } else if (isInGlow) {
            // Draw the segment with radial gradient glow
            const gradient = ctx.createRadialGradient(
              currentPosRef.current.x,
              currentPosRef.current.y,
              0,
              currentPosRef.current.x,
              currentPosRef.current.y,
              glowRadius
            );
            gradient.addColorStop(0, glowColor);
            gradient.addColorStop(0.1, glowColor + 'cc');
            gradient.addColorStop(0.3, glowColor + '66');
            gradient.addColorStop(0.6, glowColor + '1a');
            gradient.addColorStop(1, glowColor + '00');

            ctx.strokeStyle = gradient;
            ctx.lineWidth = lineThickness * 2;
            ctx.shadowBlur = 20;
            ctx.shadowColor = glowColor;
            ctx.globalAlpha = 1;
            ctx.moveTo(segmentStart, y);
            ctx.lineTo(x, y);
            ctx.stroke();
            isInGlow = false;
          }
        }

        // Draw final segment if still in glow
        if (isInGlow) {
          const gradient = ctx.createRadialGradient(
            currentPosRef.current.x,
            currentPosRef.current.y,
            0,
            currentPosRef.current.x,
            currentPosRef.current.y,
            glowRadius
          );
          gradient.addColorStop(0, glowColor);
          gradient.addColorStop(0.1, glowColor + 'cc');
          gradient.addColorStop(0.3, glowColor + '66');
          gradient.addColorStop(0.6, glowColor + '1a');
          gradient.addColorStop(1, glowColor + '00');

          ctx.strokeStyle = gradient;
          ctx.lineWidth = lineThickness * 2;
          ctx.shadowBlur = 20;
          ctx.shadowColor = glowColor;
          ctx.globalAlpha = 1;
          ctx.moveTo(segmentStart, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }

      // Reset shadow and alpha
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    backgroundColor,
    squareSize,
    lineThickness,
    lineColor,
    glowColor,
    glowSize,
    followSpeed,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="glowing-grid-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -10,
        pointerEvents: 'none',
      }}
    />
  );
};
