import React, { useEffect, useRef } from 'react';
import { UserProgress } from '../../types';

interface WeaknessRadarProps {
  metrics: UserProgress['radarMetrics'];
  size?: number;
}

export const WeaknessRadar: React.FC<WeaknessRadarProps> = ({ metrics, size = 320 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const axes = [
    { key: 'algebra', label: 'Algebra', value: metrics.algebra },
    { key: 'geometry', label: 'Geometry', value: metrics.geometry },
    { key: 'numberTheory', label: 'Number Theory', value: metrics.numberTheory },
    { key: 'combinatorics', label: 'Combinatorics', value: metrics.combinatorics },
    { key: 'differentialCalculus', label: 'Diff Calculus', value: metrics.differentialCalculus },
    { key: 'integralCalculus', label: 'Integ Calculus', value: metrics.integralCalculus },
    { key: 'proofRigor', label: 'Proof Rigor', value: metrics.proofRigor },
    { key: 'speed', label: 'Pacing / Speed', value: metrics.speed }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 40;
    const numAxes = axes.length;
    const angleSlice = (Math.PI * 2) / numAxes;

    ctx.clearRect(0, 0, width, height);

    // Draw concentric polygon grid (20%, 40%, 60%, 80%, 100%)
    const levels = 5;
    for (let l = 1; l <= levels; l++) {
      const levelRadius = (radius / levels) * l;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < numAxes; i++) {
        const angle = i * angleSlice - Math.PI / 2;
        const x = centerX + levelRadius * Math.cos(angle);
        const y = centerY + levelRadius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Draw Spoke Lines & Labels
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < numAxes; i++) {
      const angle = i * angleSlice - Math.PI / 2;
      const xEnd = centerX + radius * Math.cos(angle);
      const yEnd = centerY + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(xEnd, yEnd);
      ctx.stroke();

      // Axis label position slightly outside radius
      const labelDist = radius + 22;
      const xLabel = centerX + labelDist * Math.cos(angle);
      const yLabel = centerY + labelDist * Math.sin(angle);
      ctx.fillText(axes[i].label, xLabel, yLabel);
    }

    // Draw Student Polygon
    ctx.fillStyle = 'rgba(99, 102, 241, 0.35)'; // Indigo translucent
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    for (let i = 0; i < numAxes; i++) {
      const valRatio = Math.max(0.1, Math.min(1.0, axes[i].value / 100));
      const valRadius = radius * valRatio;
      const angle = i * angleSlice - Math.PI / 2;
      const x = centerX + valRadius * Math.cos(angle);
      const y = centerY + valRadius * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw Data Point Circles
    for (let i = 0; i < numAxes; i++) {
      const valRatio = Math.max(0.1, Math.min(1.0, axes[i].value / 100));
      const valRadius = radius * valRatio;
      const angle = i * angleSlice - Math.PI / 2;
      const x = centerX + valRadius * Math.cos(angle);
      const y = centerY + valRadius * Math.sin(angle);

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }, [metrics]);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="block"
      />
    </div>
  );
};
