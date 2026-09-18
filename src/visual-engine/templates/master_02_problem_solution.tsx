import React from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { Footer } from '../components/Footer';
import { Background } from '../components/Background';
import { BackgroundFamilyVariant, Master02Payload } from '../renderer/types';
import { IconArrowDown } from '../components/Icons';
import { GeometrySignalRail } from '../components/Geometries';

export interface Master02Props {
  data: Master02Payload;
  backgroundVariant?: BackgroundFamilyVariant;
  bgDataUri?: string;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
  showFooter?: boolean;
  palette?: {
    id: string;
    name: string;
    primary: string;
    secondary: string;
  };
  injectedAssetDataUri?: string;
  injectedAssetBounds?: {
    left: number;
    top: number;
    width: number;
    height: number;
    opacity?: number;
  };
}

export const Master02ProblemSolution: React.FC<Master02Props> = ({
  data,
  backgroundVariant = 'radial_focus',
  bgDataUri,
  variant = 'v1',
  showFooter = true,
  palette,
  injectedAssetDataUri,
  injectedAssetBounds,
}) => {
  const activeVariant = data.variant || variant;
  const primaryColor = palette?.primary || '#007A55';
  const secondaryColor = palette?.secondary || '#10B981';

  const probLen = data.problem_headline.length;
  const solLen = data.solution_headline.length;
  const probFontSize = probLen > 65 ? 32 : probLen > 40 ? 38 : 44;
  const solFontSize = solLen > 65 ? 32 : solLen > 40 ? 38 : 44;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 1080,
        height: 1080,
        position: 'relative',
        backgroundColor: activeVariant === 'v1' ? '#F5F7F7' : '#f8fafc',
      }}
    >
      <Background
        variant={activeVariant === 'v1' ? 'base_light' : backgroundVariant}
        imageSrc={bgDataUri}
        width={1080}
        height={1080}
      />

      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 75,
          left: 80,
          alignItems: 'center',
        }}
      >
        <BrandLogo theme="dark" />
      </div>

      {((data as any).reference_note || data.category_badge_text) && (
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: 75,
            right: 80,
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: 'Poppins',
              fontWeight: 700,
              fontSize: 13,
              color: primaryColor,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            {(data as any).reference_note || data.category_badge_text}
          </span>
        </div>
      )}

      {/* ============================================================
         LOCKED — FOUNDER-APPROVED FINAL v1 DESIGN
         Archetype: 02 Problem / Solution (Dashed Rail + Diamond Markers)
         Approved: 2026-09-12
         Do NOT modify this v1 composition in any future session —
         including "improvement" attempts, dead-space fixes, geometry
         swaps, or art-direction passes — without a SEPARATE, EXPLICIT
         founder re-approval for this specific archetype's v1.
         If asked to "improve all templates" or similar broad instructions
         in a future session, treat this v1 as OUT OF SCOPE by default
         unless the founder names this specific archetype/variant.
         ============================================================ */}
      {/* VARIANT 1: Canonical Semantic Transformation (Problem -> Shift -> Solution) */}
      {activeVariant === 'v1' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* The Problem Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 185,
              left: 80,
              width: 920,
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid #E2E8F0',
              padding: '28px 40px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: 15,
                color: '#b91c1c',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              THE PROBLEM
            </div>
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: probFontSize,
                color: '#0A0A0A',
                lineHeight: 1.22,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                maxWidth: 840,
              }}
            >
              {data.problem_headline}
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 10,
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontSize: 22,
                color: '#475569',
                lineHeight: 1.4,
                textAlign: 'center',
                letterSpacing: '0.5px',
                maxWidth: 800,
              }}
            >
              {data.problem_supporting_text}
            </div>
          </div>

          {/* Central Semantic Transition Connector (Physically linking Problem to Solution) */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 480,
              left: 80,
              width: 920,
              alignItems: 'center',
              justifyContent: 'center',
              height: 60,
            }}
          >
            {/* Vertical Flow Interconnect Spine */}
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                top: -35,
                left: 459,
                width: 2,
                height: 130,
                backgroundColor: primaryColor,
                opacity: 0.45,
              }}
            />

            {/* Horizontal Context Wings */}
            <div style={{ display: 'flex', flex: 1, height: 1.5, backgroundColor: '#E2E8F0' }} />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                backgroundColor: primaryColor,
                color: '#FFFFFF',
                borderRadius: 20,
                padding: '8px 22px',
                margin: '0 16px',
                zIndex: 2,
                boxShadow: `0 4px 14px ${primaryColor}40`,
              }}
            >
              <IconArrowDown size={16} color="#FFFFFF" strokeWidth={2.5} />
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                OPERATIONAL SHIFT
              </span>
            </div>
            <div style={{ display: 'flex', flex: 1, height: 1.5, backgroundColor: '#E2E8F0' }} />
          </div>

          {/* The Solution Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 560,
              left: 80,
              width: 920,
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              border: `1.5px solid ${primaryColor}`,
              padding: '28px 40px',
              boxShadow: `0 8px 24px ${primaryColor}14`,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: 15,
                color: primaryColor,
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              THE SOLUTION
            </div>
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: solFontSize,
                color: '#0A0A0A',
                lineHeight: 1.22,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                maxWidth: 840,
              }}
            >
              {data.solution_headline}
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 10,
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontSize: 22,
                color: '#064E3B',
                lineHeight: 1.4,
                textAlign: 'center',
                letterSpacing: '0.5px',
                maxWidth: 800,
              }}
            >
              {data.solution_supporting_text}
            </div>
          </div>


        </div>
      )}

      {/* ============================================================
         LOCKED — FOUNDER-APPROVED FINAL v2 DESIGN
         Approved: 2026-09-12
         Do not modify this v2 composition in any future session without
         separate, explicit founder re-approval for this specific archetype's
         v2.
         ============================================================ */}
      {/* VARIANT 2: Asymmetric Stepped Shift (Upper-Left Bottleneck -> Lower-Right Elevated Solution) */}
      {activeVariant === 'v2' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Top-Right Micro-Badge */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 75,
              right: 80,
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: 13,
                color: '#007A55',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              TRANSFORMATION // 02
            </span>
          </div>

          {/* CONFIRMED CORRECT EMPTY-ZONE LOCATION — do not re-identify; only the element placed here may change. */}
          {/* Dynamic Transformation Stream: Smooth flowing ribbon bending from bottleneck state toward resolution */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 0,
              left: 0,
              width: 1080,
              height: 1080,
              pointerEvents: 'none',
            }}
          >
            <svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none">
              {/* Primary Transformation Flow Line */}
              <path
                d="M 155 450 C 155 630, 185 745, 335 810"
                stroke="#007A55"
                strokeWidth={2.4}
                strokeOpacity={0.36}
                strokeLinecap="round"
                fill="none"
              />
              {/* Harmonizing Parallel Streamline */}
              <path
                d="M 172 470 C 172 625, 200 725, 315 785"
                stroke="#007A55"
                strokeWidth={1.4}
                strokeOpacity={0.20}
                strokeLinecap="round"
                fill="none"
              />
              {/* Initial Waypoint Anchor */}
              <circle cx={155} cy={450} r={3.5} fill="#EF4444" fillOpacity={0.55} />
              {/* Terminal Flow Indicator into Solution Plane */}
              <polygon
                points="342,813 330,807 333,817"
                fill="#007A55"
                fillOpacity={0.60}
              />
            </svg>
          </div>

          {/* Upper-Left: System Bottleneck Hero */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 175,
              left: 80,
              width: 540,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                borderRadius: 4,
                padding: '4px 10px',
                marginBottom: 14,
                alignSelf: 'flex-start',
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#EF4444' }} />
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#B91C1C',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                OPERATIONAL BOTTLENECK
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: probFontSize > 36 ? 36 : probFontSize,
                color: '#0F172A',
                lineHeight: 1.22,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                maxWidth: 520,
              }}
            >
              {data.problem_headline}
            </div>

            <div
              style={{
                display: 'flex',
                marginTop: 12,
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontSize: 20,
                color: '#64748B',
                lineHeight: 1.4,
                maxWidth: 500,
              }}
            >
              {data.problem_supporting_text}
            </div>

            {/* Downward Stepped Directional Ray */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 18 }}>
              <div style={{ width: 80, height: 2, backgroundColor: '#007A55', opacity: 0.6 }} />
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                <polygon points="0,6 10,0 10,12" fill="#007A55" fillOpacity="0.8" transform="rotate(180 9 6)" />
              </svg>
            </div>
          </div>

          {/* Lower-Right: Elevated Architectural Solution Panel */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 475,
              left: 360,
              width: 640,
              height: 340,
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              border: '1.5px solid #CBD5E1',
              borderLeft: '8px solid #007A55',
              boxShadow: '0 16px 36px rgba(0, 122, 85, 0.06)',
              padding: '30px 36px',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: '#007A55',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}
                >
                  THE ARCHITECTURAL RESOLUTION
                </span>
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: 10.5, color: '#64748B', letterSpacing: '1.5px' }}>
                STAGE // SOL-02
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: solFontSize > 34 ? 34 : solFontSize,
                color: '#007A55',
                lineHeight: 1.22,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                maxWidth: 570,
              }}
            >
              {data.solution_headline}
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontSize: 22,
                color: '#334155',
                lineHeight: 1.4,
                maxWidth: 570,
              }}
            >
              {data.solution_supporting_text}
            </div>

            <div style={{ display: 'flex', width: '100%', height: 1, backgroundColor: '#E2E8F0', marginTop: 8 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#64748B', letterSpacing: '1px' }}>
                STATUS: ROOT BOTTLENECK ELIMINATED
              </span>
              <div style={{ display: 'flex', gap: 4 }}>
                {[40, 70, 30].map((w, idx) => (
                  <div key={`sol-tick-${idx}`} style={{ width: w, height: 3.5, backgroundColor: '#007A55', opacity: 0.3, borderRadius: 1 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VARIANT 3: Side-by-Side Dual Contrast Columns (Left: Problem vs Right: Solution) */}
      {activeVariant === 'v3' && (
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: 185,
            left: 80,
            width: 920,
            justifyContent: 'space-between',
          }}
        >
          {/* Column 1: Problem in Crisp White Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 440,
              height: 680,
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: '34px 30px',
              border: '1.5px solid #E2E8F0',
              borderTop: '8px solid #EF4444',
              boxShadow: '0 6px 24px rgba(0, 0, 0, 0.04)',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#B91C1C',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}
              >
                01 // THE SYSTEM PROBLEM
              </span>
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: 27,
                  color: '#0F172A',
                  lineHeight: 1.25,
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}
              >
                {data.problem_headline}
              </div>
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontSize: 20,
                  color: '#64748B',
                  lineHeight: 1.4,
                }}
              >
                {data.problem_supporting_text}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <div style={{ width: '100%', height: 1, backgroundColor: '#E2E8F0', marginBottom: 12 }} />
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#94A3B8', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                IMPACT: SYSTEM FRICTION & LATENCY
              </span>
            </div>
          </div>

          {/* Central Connecting Vector Arrow linking left to right column */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 315,
              left: 436,
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: '#007A55',
              boxShadow: '0 4px 14px rgba(0, 122, 85, 0.3)',
              zIndex: 3,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Column 2: Solution in Deep Emerald Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 440,
              height: 680,
              backgroundColor: '#064E3B',
              borderRadius: 16,
              padding: '34px 30px',
              borderTop: '8px solid #86EFAC',
              boxShadow: '0 10px 30px rgba(6, 78, 59, 0.16)',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#86EFAC',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}
              >
                02 // THE ARCHITECTURAL FIX
              </span>
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: 27,
                  color: '#FFFFFF',
                  lineHeight: 1.25,
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}
              >
                {data.solution_headline}
              </div>
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontSize: 20,
                  color: '#D1FAE5',
                  lineHeight: 1.4,
                }}
              >
                {data.solution_supporting_text}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <div style={{ width: '100%', height: 1, backgroundColor: 'rgba(255, 255, 255, 0.15)', marginBottom: 12 }} />
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#86EFAC', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                OUTCOME: DECOUPLED STABILITY
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VARIANT 4: Typographic Split Horizon (Porcelain Upper Zone -> Charcoal Lower Zone) */}
      {activeVariant === 'v4' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Upper Zone: The Operational Bottleneck */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 175,
              left: 80,
              width: 920,
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid #E2E8F0',
              padding: '28px 36px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#B91C1C',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                CURRENT STATE BOTTLENECK
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: 10.5, color: '#94A3B8' }}>PHASE // 01</span>
            </div>
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: probFontSize > 34 ? 34 : probFontSize,
                color: '#0F172A',
                lineHeight: 1.22,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                maxWidth: 850,
              }}
            >
              {data.problem_headline}
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 8,
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontSize: 20,
                color: '#64748B',
                lineHeight: 1.4,
                maxWidth: 820,
              }}
            >
              {data.problem_supporting_text}
            </div>
          </div>

          {/* Central Structural Transformation Vector Datum */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 480,
              left: 80,
              width: 920,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', width: 340, height: 1.5, backgroundColor: '#CBD5E1' }} />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: '#0F172A',
                border: '1px solid #007A55',
                borderRadius: 20,
                padding: '5px 18px',
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#86EFAC' }} />
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: '#86EFAC',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                ARCHITECTURAL TRANSITION
              </span>
            </div>
            <div style={{ display: 'flex', width: 340, height: 1.5, backgroundColor: '#CBD5E1' }} />
          </div>

          {/* Lower Zone: Deep Charcoal Technical Solution Chassis */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 535,
              left: 80,
              width: 920,
              height: 290,
              backgroundColor: '#0F172A',
              borderRadius: 16,
              border: '1px solid #1E293B',
              borderLeft: '8px solid #007A55',
              padding: '28px 36px',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.15)',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#86EFAC',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                FUTURE STATE // PRODUCTION SOLUTION
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: 10.5, color: '#64748B' }}>PHASE // 02</span>
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: solFontSize > 34 ? 34 : solFontSize,
                color: '#FFFFFF',
                lineHeight: 1.22,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                maxWidth: 850,
              }}
            >
              {data.solution_headline}
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontSize: 20,
                color: '#CBD5E1',
                lineHeight: 1.4,
                maxWidth: 820,
              }}
            >
              {data.solution_supporting_text}
            </div>

            <div style={{ display: 'flex', width: '100%', height: 1, backgroundColor: '#1E293B', marginBottom: 2 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#64748B', letterSpacing: '1px' }}>
                RESOLUTION: ARCHITECTURE MODERNIZED
              </span>
              <div style={{ display: 'flex', gap: 4 }}>
                {[60, 25, 90].map((w, idx) => (
                  <div key={`sol-charcoal-bar-${idx}`} style={{ width: w, height: 3, backgroundColor: '#007A55', opacity: 0.5, borderRadius: 1 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Injected Asset (when provided by intelligence engine) */}
      {injectedAssetDataUri && injectedAssetBounds && (
        <img
          src={injectedAssetDataUri}
          style={{
            position: 'absolute',
            left: injectedAssetBounds.left,
            top: injectedAssetBounds.top,
            width: injectedAssetBounds.width,
            height: injectedAssetBounds.height,
            opacity: injectedAssetBounds.opacity ?? 0.85,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Footer Bar */}
      {showFooter && <Footer urlText="DigiXPro.in" />}
    </div>
  );
};
