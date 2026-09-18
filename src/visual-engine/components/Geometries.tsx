import React from 'react';

/**
 * Locked Visual System 2.0 Geometry Primitives
 * Low opacity (roughly 5-8% on base canvas, up to 15% on thin hairpins),
 * placed strictly in empty corner/edge space — never behind text.
 */

export interface GeometryProps {
  color?: string;
  style?: React.CSSProperties;
}

/**
 * G1 — Precision Grid
 * Small dot-grid pattern in empty corner/edge space.
 * Assigned to: master_05_data_signal, master_07_comparison
 */
export const GeometryPrecisionGrid: React.FC<{
  color?: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  cols?: number;
  rows?: number;
  spacing?: number;
  dotRadius?: number;
  opacity?: number;
}> = ({
  color = '#007A55',
  top,
  left,
  right,
  bottom,
  cols = 5,
  rows = 5,
  spacing = 16,
  dotRadius = 1.5,
  opacity = 0.08,
}) => {
  const width = (cols - 1) * spacing + dotRadius * 4;
  const height = (rows - 1) * spacing + dotRadius * 4;

  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push(
        <circle
          key={`dot-${r}-${c}`}
          cx={dotRadius * 2 + c * spacing}
          cy={dotRadius * 2 + r * spacing}
          r={dotRadius}
          fill={color}
          fillOpacity={opacity}
        />
      );
    }
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    position: 'absolute',
  };
  if (top !== undefined) containerStyle.top = top;
  if (left !== undefined) containerStyle.left = left;
  if (right !== undefined) containerStyle.right = right;
  if (bottom !== undefined) containerStyle.bottom = bottom;

  return (
    <div style={containerStyle}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
      >
        {dots}
      </svg>
    </div>
  );
};

/**
 * G2 — Architectural Frame
 * Thin corner brackets (blueprint marks) in 2 opposite corners.
 * Assigned to: master_03_framework, master_04_architecture, master_06_case_study
 */
export const GeometryArchitecturalFrame: React.FC<{
  color?: string;
  width?: number;
  height?: number;
  armLength?: number;
  inset?: number;
  strokeWidth?: number;
  opacity?: number;
  position?: 'all' | 'bottom-right' | 'top-left';
}> = ({
  color = '#007A55',
  width = 1080,
  height = 1080,
  armLength = 32,
  inset = 56,
  strokeWidth = 1.5,
  opacity = 0.15,
  position = 'all',
}) => {
  // Top-Left corner bracket
  const tlX = inset;
  const tlY = inset + 80; // slightly below header area
  // Bottom-Right corner bracket
  const brX = width - inset;
  const brY = height - inset - 50; // slightly above footer area

  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
      >
        {/* Top-Left Bracket: L mark */}
        {position !== 'bottom-right' && (
          <path
            d={`M ${tlX + armLength} ${tlY} L ${tlX} ${tlY} L ${tlX} ${tlY + armLength}`}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeOpacity={opacity}
            strokeLinecap="square"
          />
        )}
        {/* Bottom-Right Bracket: flipped L mark */}
        {position !== 'top-left' && (
          <path
            d={`M ${brX - armLength} ${brY} L ${brX} ${brY} L ${brX} ${brY - armLength}`}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeOpacity={opacity}
            strokeLinecap="square"
          />
        )}
      </svg>
    </div>
  );
};

export const GeometryCornerBracket = GeometryArchitecturalFrame;


/**
 * G3 — Bold Stepped Rail
 * A vertical dashed line running the left margin with large diamond markers
 * at telemetry waypoints, in brand emerald at 40%+ opacity.
 * Assigned to: master_02_problem_solution ONLY
 */
export const GeometrySignalRail: React.FC<{
  color?: string;
  x?: number;
  y1?: number;
  y2?: number;
  nodes?: number[];
  strokeWidth?: number;
  lineOpacity?: number;
  markerSize?: number;
}> = ({
  color = '#007A55',
  x = 64,
  y1 = 200,
  y2 = 940,
  nodes = [320, 570, 820],
  strokeWidth = 3,
  lineOpacity = 0.45,
  markerSize = 18,
}) => {
  const half = Math.round(markerSize / 2);
  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1080,
        height: 1080,
      }}
    >
      <svg
        width="1080"
        height="1080"
        viewBox="0 0 1080 1080"
        fill="none"
      >
        {/* Terminal End-Caps */}
        <line
          x1={x - 14}
          y1={y1}
          x2={x + 14}
          y2={y1}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeOpacity={Math.min(lineOpacity * 1.3, 0.9)}
        />
        <line
          x1={x - 14}
          y1={y2}
          x2={x + 14}
          y2={y2}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeOpacity={Math.min(lineOpacity * 1.3, 0.9)}
        />

        {/* Vertical Dashed Rail Spine */}
        <line
          x1={x}
          y1={y1}
          x2={x}
          y2={y2}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray="12 10"
          strokeOpacity={lineOpacity}
        />

        {/* Telemetry Waypoints: 16-18px Diamond Markers + Cross-Ticks + Core Eye */}
        {nodes.map((ny, idx) => (
          <g key={`bold-node-${idx}`}>
            {/* Horizontal Cross-Tick */}
            <line
              x1={x - 16}
              y1={ny}
              x2={x + 16}
              y2={ny}
              stroke={color}
              strokeWidth={2}
              strokeOpacity={Math.min(lineOpacity * 1.4, 0.85)}
            />
            {/* Bold Diamond Marker (18px tip-to-tip) */}
            <polygon
              points={`${x},${ny - half} ${x + half},${ny} ${x},${ny + half} ${x - half},${ny}`}
              fill={color}
              fillOpacity={0.65}
              stroke={color}
              strokeWidth={2}
              strokeOpacity={0.90}
            />
            {/* Central Precision Core */}
            <circle
              cx={x}
              cy={ny}
              r={2.5}
              fill="#ffffff"
              fillOpacity={0.95}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * G4 — Orbit
 * Concentric circles in center-bottom canvas.
 * Assigned to: master_01_insight ONLY (nowhere else)
 */
export const GeometryOrbit: React.FC<{
  color?: string;
  cx?: number;
  cy?: number;
  radii?: number[];
  strokeWidth?: number;
  opacity?: number;
}> = ({
  color = '#007A55',
  cx = 540,
  cy = 800,
  radii = [80, 180, 280],
  strokeWidth = 2.2,
  opacity = 0.24,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1080,
        height: 1080,
      }}
    >
      <svg
        width="1080"
        height="1080"
        viewBox="0 0 1080 1080"
        fill="none"
      >
        {radii.map((r, idx) => (
          <circle
            key={`orbit-ring-${idx}`}
            cx={cx}
            cy={cy}
            r={r}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeOpacity={opacity}
            fill="none"
          />
        ))}
      </svg>
    </div>
  );
};

/**
 * G5 — Ruler Ticks (NEW)
 * A row of short perpendicular tick marks (like an engineering measurement scale)
 * along one edge — visually nothing like a circle, dot, bracket, or line.
 * Assigned to: master_08_announcement ONLY
 */
export const GeometryRulerTicks: React.FC<{
  color?: string;
  x1?: number;
  x2?: number;
  y?: number;
  step?: number;
  opacity?: number;
}> = ({
  color = '#007A55',
  x1 = 660,
  x2 = 1000,
  y = 85,
  step = 10,
  opacity = 0.50,
}) => {
  const tickCount = Math.floor((x2 - x1) / step);
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => x1 + i * step);

  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1080,
        height: 1080,
      }}
    >
      <svg
        width="1080"
        height="1080"
        viewBox="0 0 1080 1080"
        fill="none"
      >
        {/* Horizontal Spine */}
        <line
          x1={x1}
          y1={y}
          x2={x2}
          y2={y}
          stroke={color}
          strokeWidth={2.5}
          strokeOpacity={opacity}
        />

        {/* Perpendicular Measurement Ticks */}
        {ticks.map((tx, idx) => {
          let tickH = 9;
          let sWidth = 1.4;
          let sOp = opacity * 0.7;

          if (idx === 0 || idx === ticks.length - 1) {
            tickH = 28;
            sWidth = 2.5;
            sOp = opacity * 1.3;
          } else if (idx % 4 === 0) {
            // Major tick (every 40px)
            tickH = 22;
            sWidth = 2.4;
            sOp = opacity * 1.2;
          } else if (idx % 2 === 0) {
            // Medium tick (every 20px)
            tickH = 15;
            sWidth = 1.8;
            sOp = opacity;
          }

          return (
            <line
              key={`ruler-tick-${idx}`}
              x1={tx}
              y1={y}
              x2={tx}
              y2={y + tickH}
              stroke={color}
              strokeWidth={sWidth}
              strokeOpacity={Math.min(sOp, 0.95)}
            />
          );
        })}
      </svg>
    </div>
  );
};

/**
 * G6 — Diagonal Accent Bar (NEW)
 * A single thin diagonal colored bar/stripe crossing one corner at an angle —
 * visually nothing like the other 5 families.
 * Assigned to: master_09_occasion ONLY
 */
export const GeometryDiagonalBar: React.FC<{
  color?: string;
  opacity?: number;
}> = ({
  color = '#007A55',
  opacity = 0.60,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1080,
        height: 1080,
      }}
    >
      <svg
        width="1080"
        height="1080"
        viewBox="0 0 1080 1080"
        fill="none"
      >
        {/* Secondary fine parallel technical hairline (offset inward by 18px) */}
        <line
          x1={834}
          y1={0}
          x2={1080}
          y2={246}
          stroke={color}
          strokeWidth={2}
          strokeOpacity={opacity * 0.55}
          strokeLinecap="square"
        />

        {/* Primary bold architectural diagonal stripe (6px) cutting corner at 45 degrees */}
        <line
          x1={860}
          y1={0}
          x2={1080}
          y2={220}
          stroke={color}
          strokeWidth={6.5}
          strokeOpacity={opacity}
          strokeLinecap="square"
        />
      </svg>
    </div>
  );
};

/**
 * Metric Calibration Scale
 * A short measurement/ruler scale positioned directly beneath a primary metric
 * to communicate audited measurement / telemetry verification.
 * Assigned to: master_05_data_signal ONLY
 */
export const GeometryMetricScale: React.FC<{
  color?: string;
  width?: number;
  opacity?: number;
}> = ({
  color = '#007A55',
  width = 180,
  opacity = 0.40,
}) => {
  const step = 15;
  const tickCount = Math.floor(width / step);
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => i * step);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height: 16,
        marginTop: 18,
      }}
    >
      <svg width={width} height={16} viewBox={`0 0 ${width} 16`} fill="none">
        {/* Horizontal Baseline */}
        <line
          x1={0}
          y1={2}
          x2={width}
          y2={2}
          stroke={color}
          strokeWidth={1.8}
          strokeOpacity={opacity}
        />
        {/* Measurement Scale Ticks */}
        {ticks.map((tx, idx) => {
          const isMajor = idx === 0 || idx === Math.floor(tickCount / 2) || idx === tickCount;
          const isMid = idx % 2 === 0;
          const h = isMajor ? 12 : isMid ? 8 : 5;
          const sw = isMajor ? 2 : 1.2;
          const op = isMajor ? Math.min(opacity * 1.5, 0.9) : isMid ? opacity : opacity * 0.7;

          return (
            <line
              key={`metric-tick-${idx}`}
              x1={tx}
              y1={2}
              x2={tx}
              y2={2 + h}
              stroke={color}
              strokeWidth={sw}
              strokeOpacity={op}
            />
          );
        })}
      </svg>
    </div>
  );
};

/**
 * Central Split Axis (Comparison)
 * A single clean vertical transformation axis between columns with directional
 * before->after row connectors.
 * Assigned to: master_07_comparison ONLY
 */
export const GeometrySplitAxis: React.FC<{
  x?: number;
  yTop?: number;
  badgeTop?: number;
  badgeBottom?: number;
  yBottom?: number;
  rowYs?: number[];
  color?: string;
  opacity?: number;
}> = ({
  x = 540,
  yTop = 330,
  badgeTop = 360,
  badgeBottom = 416,
  yBottom = 750,
  rowYs = [498, 597, 696],
  color = '#007A55',
  opacity = 0.35,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1080,
        height: 1080,
      }}
    >
      <svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none">
        {/* Upper Axis Segment */}
        <line
          x1={x}
          y1={yTop}
          x2={x}
          y2={badgeTop}
          stroke={color}
          strokeWidth={1.5}
          strokeOpacity={opacity}
        />
        {/* Lower Axis Segment */}
        <line
          x1={x}
          y1={badgeBottom}
          x2={x}
          y2={yBottom}
          stroke={color}
          strokeWidth={1.5}
          strokeOpacity={opacity}
        />
        {/* Terminal end-ticks */}
        <line
          x1={x - 8}
          y1={yTop}
          x2={x + 8}
          y2={yTop}
          stroke={color}
          strokeWidth={1.5}
          strokeOpacity={opacity * 1.3}
        />
        <line
          x1={x - 8}
          y1={yBottom}
          x2={x + 8}
          y2={yBottom}
          stroke={color}
          strokeWidth={1.5}
          strokeOpacity={opacity * 1.3}
        />
        {/* Directional Row Connectors (Before -> After transformation) */}
        {rowYs.map((ry, idx) => (
          <g key={`split-conn-${idx}`}>
            {/* Source node on left (muted grey before) */}
            <circle
              cx={x - 22}
              cy={ry}
              r={3.5}
              fill="#64748B"
              fillOpacity={0.70}
            />
            {/* Horizontal connector line */}
            <line
              x1={x - 22}
              y1={ry}
              x2={x + 20}
              y2={ry}
              stroke={color}
              strokeWidth={1.8}
              strokeOpacity={opacity * 1.6}
            />
            {/* Target arrow point on right (emerald after) */}
            <polygon
              points={`${x + 24},${ry} ${x + 16},${ry - 4.5} ${x + 16},${ry + 4.5}`}
              fill={color}
              fillOpacity={0.85}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * G7 — Offset Linear Bars
 * 3-4 short horizontal bars of varying lengths stacked with small gaps,
 * communicating structured, layered observations.
 * Assigned to: master_01_insight ONLY
 */
export const GeometryOffsetBars: React.FC<{
  color?: string;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  widths?: number[];
  barHeight?: number;
  gap?: number;
  opacity?: number;
  align?: 'left' | 'right' | 'top' | 'bottom';
  orientation?: 'horizontal' | 'vertical';
}> = ({
  color = '#007A55',
  left = 80,
  right,
  top = 780,
  bottom,
  widths = [160, 85, 230, 120],
  barHeight = 7,
  gap = 9,
  opacity = 0.18,
  align = 'left',
  orientation = 'horizontal',
}) => {
  const isVertical = orientation === 'vertical';
  const posStyle: React.CSSProperties = {
    position: 'absolute',
    display: 'flex',
    flexDirection: isVertical ? 'row' : 'column',
    gap,
    alignItems: isVertical
      ? (align === 'bottom' ? 'flex-end' : 'flex-start')
      : (align === 'right' ? 'flex-end' : 'flex-start'),
  };
  if (top !== undefined) posStyle.top = top;
  if (bottom !== undefined) posStyle.bottom = bottom;
  if (left !== undefined) posStyle.left = left;
  if (right !== undefined) posStyle.right = right;

  return (
    <div style={posStyle}>
      {widths.map((w, idx) => (
        <div
          key={`offset-bar-${idx}`}
          style={{
            display: 'flex',
            width: isVertical ? barHeight : w,
            height: isVertical ? w : barHeight,
            backgroundColor: color,
            opacity,
            borderRadius: 3,
          }}
        />
      ))}
    </div>
  );
};

/**
 * G8 — Node Network
 * 4 small circular nodes connected by thin straight lines,
 * communicating connected systems and advisory reach.
 * Assigned to: master_08_announcement ONLY
 */
export const GeometryNodeNetwork: React.FC<{
  color?: string;
  nodes?: Array<{ x: number; y: number; r?: number }>;
  connections?: Array<[number, number]>;
  opacity?: number;
  strokeWidth?: number;
}> = ({
  color = '#007A55',
  nodes = [
    { x: 800, y: 855, r: 6.5 },
    { x: 875, y: 785, r: 7.5 },
    { x: 955, y: 825, r: 6.5 },
    { x: 905, y: 895, r: 7.0 },
  ],
  connections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [1, 3],
  ],
  opacity = 0.22,
  strokeWidth = 1.5,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1080,
        height: 1080,
      }}
    >
      <svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none">
        {/* Connecting Lines */}
        {connections.map(([fromIdx, toIdx], cIdx) => {
          const p1 = nodes[fromIdx];
          const p2 = nodes[toIdx];
          if (!p1 || !p2) return null;
          return (
            <line
              key={`net-line-${cIdx}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeOpacity={opacity * 0.9}
            />
          );
        })}
        {/* Circular Nodes */}
        {nodes.map((n, idx) => (
          <g key={`net-node-${idx}`}>
            {/* Outer subtle halo ring */}
            <circle
              cx={n.x}
              cy={n.y}
              r={(n.r || 7) + 3}
              stroke={color}
              strokeWidth={1}
              strokeOpacity={opacity * 0.7}
              fill="none"
            />
            {/* Solid core node */}
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r || 7}
              fill={color}
              fillOpacity={opacity * 1.2}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * G9 — Blueprint Coordinate Marker
 * Monospace coordinate/system identity tag paired with a 1px line segment,
 * positioned with generous margin from edges (>70px inset).
 * Assigned to: master_09_occasion ONLY
 */
export const GeometryCoordinateMarker: React.FC<{
  tag?: string;
  color?: string;
  top?: number;
  right?: number;
  opacity?: number;
}> = ({
  tag = 'DXP / 09',
  color = '#007A55',
  top = 75,
  right = 80,
  opacity = 0.45,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        top,
        right,
        alignItems: 'center',
        gap: 12,
        opacity,
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 28,
          height: 1,
          backgroundColor: color,
        }}
      />
      <span
        style={{
          fontFamily: 'monospace',
          fontSize: 11,
          fontWeight: 600,
          color,
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
        }}
      >
        {tag}
      </span>
    </div>
  );
};

/**
 * Progressive Step Connector (Framework)
 * Horizontal dataflow connectors and directional indicators linking sequential methodology cards.
 * Assigned to: master_03_framework
 */
export const GeometryStepConnector: React.FC<{
  color?: string;
  opacity?: number;
}> = ({
  color = '#007A55',
  opacity = 0.50,
}) => {
  // Gap 1: between Card 1 (right: 365) and Card 2 (left: 397) -> center x: 381
  // Gap 2: between Card 2 (right: 682) and Card 3 (left: 715) -> center x: 698
  const gaps = [381, 698];
  const y = 582; // vertical center of the 365px high cards at top: 400

  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1080,
        height: 1080,
      }}
    >
      <svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none">
        {gaps.map((gx, idx) => (
          <g key={`step-connector-${idx}`}>
            {/* Connecting baseline */}
            <line
              x1={gx - 14}
              y1={y}
              x2={gx + 10}
              y2={y}
              stroke={color}
              strokeWidth={2}
              strokeOpacity={opacity}
            />
            {/* Directional arrow head pointing to next phase */}
            <polygon
              points={`${gx + 15},${y} ${gx + 8},${y - 4} ${gx + 8},${y + 4}`}
              fill={color}
              fillOpacity={opacity * 1.3}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * Architectural Pipeline Spine
 * A continuous vertical dataflow spine linking system architecture nodes.
 * Assigned to: master_04_architecture
 */
export const GeometryPipelineSpine: React.FC<{
  color?: string;
  opacity?: number;
}> = ({
  color = '#007A55',
  opacity = 0.45,
}) => {
  const spineX = 114; // aligns with the center of the protruding number badges
  // Midpoints between the 4 cards:
  // Step 1: 350-446, Step 2: 468-564, Step 3: 586-682, Step 4: 704-800
  const transitions = [457, 575, 693];

  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1080,
        height: 1080,
      }}
    >
      <svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none">
        {/* Continuous background spine line */}
        <line
          x1={spineX}
          y1={320}
          x2={spineX}
          y2={830}
          stroke={color}
          strokeWidth={2}
          strokeDasharray="6 4"
          strokeOpacity={opacity * 0.7}
        />

        {/* Directional flow indicators between nodes */}
        {transitions.map((ty, idx) => (
          <g key={`pipeline-trans-${idx}`}>
            {/* Downward chevron indicator */}
            <polygon
              points={`${spineX},${ty + 5} ${spineX - 4},${ty - 2} ${spineX + 4},${ty - 2}`}
              fill={color}
              fillOpacity={opacity * 1.5}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * Architectural Crosshairs
 * Restrained technical registration benchmarks (+) at coordinate datum points.
 * Assigned to: master_09_occasion
 */
export const GeometryCrosshairs: React.FC<{
  color?: string;
  points?: Array<{ x: number; y: number }>;
  armLength?: number;
  opacity?: number;
}> = ({
  color = '#007A55',
  points = [
    { x: 80, y: 175 },
    { x: 1000, y: 175 },
    { x: 80, y: 920 },
    { x: 1000, y: 920 },
  ],
  armLength = 10,
  opacity = 0.35,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1080,
        height: 1080,
      }}
    >
      <svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none">
        {points.map((pt, idx) => (
          <g key={`crosshair-${idx}`}>
            {/* Horizontal arm */}
            <line
              x1={pt.x - armLength}
              y1={pt.y}
              x2={pt.x + armLength}
              y2={pt.y}
              stroke={color}
              strokeWidth={1.2}
              strokeOpacity={opacity}
            />
            {/* Vertical arm */}
            <line
              x1={pt.x}
              y1={pt.y - armLength}
              x2={pt.x}
              y2={pt.y + armLength}
              stroke={color}
              strokeWidth={1.2}
              strokeOpacity={opacity}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * Architectural Construction Grid (Occasion Poster)
 * Museum-grade architectural elevation lines and structural golden-section framing.
 * Assigned to: master_09_occasion
 */
export const GeometryArchitecturalGrid: React.FC<{
  color?: string;
  opacity?: number;
}> = ({
  color = '#007A55',
  opacity = 0.16,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1080,
        height: 1080,
      }}
    >
      <svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none">
        {/* Outer subtle architectural structural bounding box */}
        <rect
          x={80}
          y={170}
          width={920}
          height={740}
          stroke={color}
          strokeWidth={1}
          strokeOpacity={opacity * 0.8}
          fill="none"
        />

        {/* Structural Datum Axis (Horizontal midpoint & vertical third) */}
        <line
          x1={80}
          y1={540}
          x2={1000}
          y2={540}
          stroke={color}
          strokeWidth={0.8}
          strokeDasharray="4 8"
          strokeOpacity={opacity * 0.6}
        />

        {/* Diagonal architectural tension rays in bottom corners */}
        <line
          x1={80}
          y1={910}
          x2={200}
          y2={790}
          stroke={color}
          strokeWidth={1}
          strokeOpacity={opacity * 0.7}
        />
        <line
          x1={1000}
          y1={910}
          x2={880}
          y2={790}
          stroke={color}
          strokeWidth={1}
          strokeOpacity={opacity * 0.7}
        />
        <line
          x1={80}
          y1={170}
          x2={200}
          y2={290}
          stroke={color}
          strokeWidth={1}
          strokeOpacity={opacity * 0.7}
        />
        <line
          x1={1000}
          y1={170}
          x2={880}
          y2={290}
          stroke={color}
          strokeWidth={1}
          strokeOpacity={opacity * 0.7}
        />

        {/* Corner registration marks */}
        <line x1={70} y1={170} x2={90} y2={170} stroke={color} strokeWidth={1.5} strokeOpacity={opacity * 1.5} />
        <line x1={80} y1={160} x2={80} y2={180} stroke={color} strokeWidth={1.5} strokeOpacity={opacity * 1.5} />

        <line x1={990} y1={170} x2={1010} y2={170} stroke={color} strokeWidth={1.5} strokeOpacity={opacity * 1.5} />
        <line x1={1000} y1={160} x2={1000} y2={180} stroke={color} strokeWidth={1.5} strokeOpacity={opacity * 1.5} />

        <line x1={70} y1={910} x2={90} y2={910} stroke={color} strokeWidth={1.5} strokeOpacity={opacity * 1.5} />
        <line x1={80} y1={900} x2={80} y2={920} stroke={color} strokeWidth={1.5} strokeOpacity={opacity * 1.5} />

        <line x1={990} y1={910} x2={1010} y2={910} stroke={color} strokeWidth={1.5} strokeOpacity={opacity * 1.5} />
        <line x1={1000} y1={900} x2={1000} y2={920} stroke={color} strokeWidth={1.5} strokeOpacity={opacity * 1.5} />
      </svg>
    </div>
  );
};

/**
 * Ecosystem Network (Announcement)
 * Structured 3-node connected telemetry network.
 * Assigned to: master_08_announcement
 */
export const GeometryEcosystemNetwork: React.FC<{
  color?: string;
  opacity?: number;
}> = ({
  color = '#007A55',
  opacity = 0.45,
}) => {
  // 3 intentional nodes in bottom-right
  const n1 = { x: 720, y: 890 };
  const n2 = { x: 840, y: 810 };
  const n3 = { x: 960, y: 890 };

  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1080,
        height: 1080,
      }}
    >
      <svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none">
        {/* Telemetry connection vectors */}
        <line x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke={color} strokeWidth={1.5} strokeOpacity={opacity} />
        <line x1={n2.x} y1={n2.y} x2={n3.x} y2={n3.y} stroke={color} strokeWidth={1.5} strokeOpacity={opacity} />
        <line x1={n1.x} y1={n1.y} x2={n3.x} y2={n3.y} stroke={color} strokeWidth={1} strokeDasharray="4 4" strokeOpacity={opacity * 0.6} />

        {/* Directional arrow from n1 to n2 */}
        <polygon
          points={`${(n1.x + n2.x) / 2 + 3},${(n1.y + n2.y) / 2 - 2} ${(n1.x + n2.x) / 2 - 4},${(n1.y + n2.y) / 2 - 6} ${(n1.x + n2.x) / 2},${(n1.y + n2.y) / 2 + 4}`}
          fill={color}
          fillOpacity={opacity * 1.5}
        />
        {/* Directional arrow from n2 to n3 */}
        <polygon
          points={`${(n2.x + n3.x) / 2 + 4},${(n2.y + n3.y) / 2 + 3} ${(n2.x + n3.x) / 2},${(n2.y + n3.y) / 2 - 4} ${(n2.x + n3.x) / 2 - 4},${(n2.y + n3.y) / 2 + 2}`}
          fill={color}
          fillOpacity={opacity * 1.5}
        />

        {/* Solid precision nodes - no concentric rings */}
        <circle cx={n1.x} cy={n1.y} r={5} fill={color} fillOpacity={opacity * 1.8} />
        <circle cx={n2.x} cy={n2.y} r={6} fill={color} fillOpacity={opacity * 2.0} />
        <circle cx={n3.x} cy={n3.y} r={5} fill={color} fillOpacity={opacity * 1.8} />
      </svg>
    </div>
  );
};
