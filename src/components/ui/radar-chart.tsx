'use client';

import React from 'react';

export type RadarDatum = { label: string; value: number };

interface RadarChartProps {
  data: RadarDatum[];
  size?: number; // px
  max?: number; // max value (e.g., 100)
  rings?: number; // number of grid rings
  className?: string;
}

export function RadarChart({ data, size = 320, max = 100, rings = 5, className }: RadarChartProps) {
  const width = size;
  const height = size;
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(cx, cy) - 12;
  const angleStep = (Math.PI * 2) / data.length;

  const toPoint = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2; // start at top
    const r = (Math.max(0, Math.min(value, max)) / max) * radius;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return `${x},${y}`;
  };

  const polygonPoints = data.map((d, i) => toPoint(d.value, i)).join(' ');

  // Axis lines
  const axes = data.map((_, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const x2 = cx + radius * Math.cos(angle);
    const y2 = cy + radius * Math.sin(angle);
    return { x1: cx, y1: cy, x2, y2 };
  });

  // Grid rings (circles)
  const ringRadii = Array.from({ length: rings }, (_, i) => radius * ((i + 1) / rings));

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className}>
      <defs>
        <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* Rings */}
      {ringRadii.map((r, idx) => (
        <circle key={idx} cx={cx} cy={cy} r={r} fill="none" stroke="hsl(var(--foreground)/0.08)" strokeWidth={1} />
      ))}

      {/* Axes */}
      {axes.map((a, idx) => (
        <line key={idx} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke="hsl(var(--foreground)/0.12)" strokeWidth={1} />
      ))}

      {/* Data polygon shadow */}
      <polygon points={polygonPoints} fill="url(#radarFill)" stroke="hsl(var(--primary))" strokeWidth={2} />

      {/* Points */}
      {data.map((d, i) => {
        const [x, y] = toPoint(d.value, i).split(',').map(Number);
        return <circle key={d.label} cx={x} cy={y} r={3} fill="hsl(var(--primary))" />;
      })}
    </svg>
  );
}


