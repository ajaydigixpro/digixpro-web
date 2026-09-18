import React from 'react';
import fs from 'fs';
import path from 'path';
import { Master01Payload, BackgroundFamilyVariant } from '../renderer/types';
import { BrandLogo } from '../components/BrandLogo';
import { Footer } from '../components/Footer';
import { Background } from '../components/Background';
import { IconLightbulb } from '../components/Icons';
import { GeometryOffsetBars } from '../components/Geometries';

// Canonical physical SVG asset path for Bottom-Zone Foundation BB-01
const BB01_ASSET_RELATIVE_PATH = 'src/visual-engine/assets/bottom_zone/BB01_flow_foundation.svg';
let cachedBB01Base64: string | null = null;

function getBB01DataUri(): string {
  if (cachedBB01Base64) return cachedBB01Base64;

  const candidatePaths = [
    path.resolve(process.cwd(), BB01_ASSET_RELATIVE_PATH),
    path.resolve(__dirname, '../assets/bottom_zone/BB01_flow_foundation.svg'),
    path.resolve(process.cwd(), 'digixpro-web', BB01_ASSET_RELATIVE_PATH),
  ];

  for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
      const rawSvg = fs.readFileSync(p, 'utf8');
      cachedBB01Base64 = `data:image/svg+xml;base64,${Buffer.from(rawSvg).toString('base64')}`;
      return cachedBB01Base64;
    }
  }

  throw new Error(`[Master01Insight] BB-01 SVG asset not found in candidate paths: ${candidatePaths.join(', ')}`);
}

export interface Master01Props {
  data: Master01Payload;
  backgroundVariant?: BackgroundFamilyVariant;
  bgDataUri?: string;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
  showFooter?: boolean;
}

export const Master01Insight: React.FC<Master01Props> = ({
  data,
  backgroundVariant = 'editorial_desk_code',
  bgDataUri,
  variant = 'v1',
  showFooter = true,
}) => {
  const activeVariant = data.variant || variant;
  const headline = data.insight_headline;
  const supportingText = data.supporting_text;

  let headlineFontSize = 48;
  if (headline.length > 70) {
    headlineFontSize = 38;
  } else if (headline.length > 40) {
    headlineFontSize = 44;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 1080,
        height: 1080,
        position: 'relative',
        backgroundColor: '#F5F7F7',
      }}
    >
      <Background
        variant="base_light"
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

      {/* ============================================================
         LOCKED — FOUNDER-APPROVED FINAL v1 DESIGN
         Archetype: 01 Insight ("Optical Lens of Insight")
         Approved: 2026-09-12
         Do NOT modify this v1 composition in any future session —
         including "improvement" attempts, dead-space fixes, geometry
         swaps, or art-direction passes — without a SEPARATE, EXPLICIT
         founder re-approval for this specific archetype's v1.
         If asked to "improve all templates" or similar broad instructions
         in a future session, treat this v1 as OUT OF SCOPE by default
         unless the founder names this specific archetype/variant.
         ============================================================ */}
      {/* VARIANT 1: Canonical Center Hero (Restored Original Positioning) */}
      {activeVariant === 'v1' && (
        <div style={{ display: 'flex' }}>
          {/* Top-Right Micro-Badge: Icon + Micro-Label (aligned with BrandLogo at top: 75) */}
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
            <IconLightbulb size={20} color="#007A55" strokeWidth={2} />
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
              INSIGHT
            </span>
          </div>

          {/* Original Approved Content Positioning: Near top at y=225 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 225,
              left: 190,
              width: 700,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: headlineFontSize,
                color: '#0A0A0A',
                lineHeight: 1.24,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                maxWidth: 680,
              }}
            >
              {headline}
            </div>

            <div
              style={{
                display: 'flex',
                marginTop: 24,
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontSize: supportingText.length > 120 ? 22 : 24,
                color: '#0F172A',
                lineHeight: 1.4,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '1.2px',
                maxWidth: 680,
              }}
            >
              {supportingText}
            </div>
          </div>

          {/* Optional Content-Anchored Evidence Marker: positioned cleanly in the negative space between typography and foundation */}
          {data.reference_note && data.reference_note.trim().length > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: 580,
                left: 190,
                width: 700,
                gap: 12,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#007A55',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  width: 80,
                  height: 1,
                  backgroundColor: '#CBD5E1',
                }}
              />
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#64748B',
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                }}
              >
                SOURCE: {data.reference_note.trim()}
              </span>
            </div>
          )}

          {/* Base Visual Foundation: BB-01 Flow Foundation (Recomposed Full-Width Organic Base) */}
          {!bgDataUri && (
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                top: 615,
                left: -130,
                width: 1250,
                height: 380,
                pointerEvents: 'none',
              }}
            >
              <img
                src={getBB01DataUri()}
                alt="DigiXPro Flow Foundation"
                width={1250}
                height={380}
                style={{
                  width: 1250,
                  height: 380,
                  objectFit: 'contain',
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* ============================================================
         LOCKED — FOUNDER-APPROVED FINAL v2 DESIGN
         Approved: 2026-09-12
         Do not modify this v2 composition in any future session without
         separate, explicit founder re-approval for this specific archetype's
         v2.
         ============================================================ */}
      {/* VARIANT 2: Asymmetric Architectural Monograph — Cropped Systems Lens + Grounded Synthesis Panel */}
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
            <IconLightbulb size={20} color="#007A55" strokeWidth={2} />
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
              INSIGHT // 02
            </span>
          </div>

          {/* Upper Left: Authoritative Typographic Hero Block */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 185,
              left: 80,
              width: 550,
            }}
          >
            {/* Architectural Kicker Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: '#E6F4F1',
                border: '1px solid rgba(0, 122, 85, 0.25)',
                borderRadius: 4,
                padding: '5px 12px',
                marginBottom: 18,
                alignSelf: 'flex-start',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: 7,
                  height: 7,
                  borderRadius: 3.5,
                  backgroundColor: '#007A55',
                }}
              />
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#007A55',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                EMPIRICAL OBSERVATION // 02
              </span>
            </div>

            {/* Headline */}
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: headlineFontSize + 2,
                color: '#0A0A0A',
                lineHeight: 1.2,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                maxWidth: 530,
              }}
            >
              {headline}
            </div>

            {/* Architectural Stepped Datum */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                marginTop: 22,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: 140,
                  height: 3,
                  backgroundColor: '#007A55',
                  borderRadius: 1.5,
                }}
              />
              <div
                style={{
                  display: 'flex',
                  width: 70,
                  height: 1.5,
                  backgroundColor: '#007A55',
                  opacity: 0.4,
                }}
              />
            </div>
          </div>

          {/* Upper Right: Cropped Architectural Systems Focal Lens */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 175,
              right: 0,
              width: 400,
              height: 300,
              backgroundColor: 'rgba(0, 122, 85, 0.04)',
              borderTopLeftRadius: 24,
              borderBottomLeftRadius: 24,
              border: '1.5px solid rgba(0, 122, 85, 0.18)',
              borderRight: 'none',
              padding: '18px 20px 16px 28px',
              justifyContent: 'space-between',
            }}
          >
            {/* Lens Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: '#007A55',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                SYSTEM TOPOLOGY // FOCAL PLANE
              </span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10,
                  fontWeight: 600,
                  color: '#64748B',
                  letterSpacing: '1px',
                }}
              >
                SEC-02
              </span>
            </div>

            {/* SVG Precision Focal Lens Vector */}
            <svg
              width="350"
              height="210"
              viewBox="0 0 350 210"
              style={{ display: 'flex' }}
            >
              {/* Concentric Coordinate Lens Arcs */}
              <circle
                cx="240"
                cy="105"
                r="48"
                fill="none"
                stroke="#007A55"
                strokeWidth="1.5"
                strokeOpacity="0.45"
              />
              <circle
                cx="240"
                cy="105"
                r="92"
                fill="none"
                stroke="#007A55"
                strokeWidth="1.5"
                strokeOpacity="0.32"
                strokeDasharray="4 4"
              />
              <circle
                cx="240"
                cy="105"
                r="140"
                fill="none"
                stroke="#007A55"
                strokeWidth="1.2"
                strokeOpacity="0.2"
              />
              <circle
                cx="240"
                cy="105"
                r="190"
                fill="none"
                stroke="#007A55"
                strokeWidth="1"
                strokeOpacity="0.12"
              />

              {/* Crosshair Axes */}
              <line
                x1="30"
                y1="105"
                x2="330"
                y2="105"
                stroke="#007A55"
                strokeWidth="1"
                strokeOpacity="0.3"
                strokeDasharray="3 3"
              />
              <line
                x1="240"
                y1="10"
                x2="240"
                y2="200"
                stroke="#007A55"
                strokeWidth="1"
                strokeOpacity="0.3"
                strokeDasharray="3 3"
              />
              <line
                x1="130"
                y1="15"
                x2="320"
                y2="180"
                stroke="#007A55"
                strokeWidth="1"
                strokeOpacity="0.2"
              />

              {/* Analytical Signal Nodes */}
              {/* Node 1: Focal Center */}
              <circle
                cx="240"
                cy="105"
                r="8"
                fill="none"
                stroke="#007A55"
                strokeWidth="2"
              />
              <circle
                cx="240"
                cy="105"
                r="4"
                fill="#007A55"
              />

              {/* Node 2: Horizontal Satellite (Mint core) */}
              <circle
                cx="148"
                cy="105"
                r="6"
                fill="#86EFAC"
                stroke="#007A55"
                strokeWidth="1.5"
              />

              {/* Node 3: Ray Intersection */}
              <circle
                cx="174"
                cy="52"
                r="4.5"
                fill="#007A55"
              />

              {/* Node 4: Outer Perimeter */}
              <rect
                x="236"
                y="13"
                width="8"
                height="8"
                fill="#007A55"
                rx="1"
              />
            </svg>
          </div>

          {/* Lower Zone: Grounded Executive Synthesis Panel */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 515,
              left: 80,
              width: 920,
              height: 275,
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              border: '1.5px solid #CBD5E1',
              borderLeft: '8px solid #007A55',
              boxShadow: '0 16px 36px rgba(0, 122, 85, 0.05)',
              padding: '28px 36px',
              justifyContent: 'space-between',
            }}
          >
            {/* Panel Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <IconLightbulb size={18} color="#007A55" strokeWidth={2.2} />
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
                  ANALYTICAL INFERENCE // PRODUCTION IMPACT
                </span>
              </div>

              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#64748B',
                  letterSpacing: '1.5px',
                }}
              >
                SYS-SPEC-02
              </span>
            </div>

            {/* Supporting Copy Body */}
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontSize: 22,
                color: '#1E293B',
                lineHeight: 1.45,
                letterSpacing: '0.4px',
                maxWidth: 830,
              }}
            >
              {supportingText}
            </div>

            {/* Panel Footer Datum Row */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  height: 1,
                  backgroundColor: '#E2E8F0',
                  marginBottom: 12,
                }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 10.5,
                    fontWeight: 600,
                    color: '#64748B',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  OBSERVATION VECTOR: DECOUPLED QUEUE SYNCHRONIZATION
                </span>

                {/* Micro rhythmic signature */}
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[55, 30, 80, 45].map((w, idx) => (
                    <div
                      key={`micro-rhythm-${idx}`}
                      style={{
                        display: 'flex',
                        width: w,
                        height: 4,
                        backgroundColor: '#007A55',
                        opacity: 0.28,
                        borderRadius: 1,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CONFIRMED CORRECT EMPTY-ZONE LOCATION — do not re-identify; only the element placed here may change. */}
          {/* Expanded Horizon Arc: Single smooth curved sweep suggesting visionary reach & insight */}
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
              {/* Primary Smooth Horizon Arc */}
              <path
                d="M 160 885 Q 540 835 920 885"
                stroke="#007A55"
                strokeWidth={2.4}
                strokeOpacity={0.32}
                fill="none"
              />
              {/* Secondary Harmonizing Echo Arc */}
              <path
                d="M 260 898 Q 540 858 820 898"
                stroke="#007A55"
                strokeWidth={1.4}
                strokeOpacity={0.18}
                fill="none"
              />
              {/* Minimalist Horizon Focal Apex */}
              <circle cx={540} cy={835} r={3.5} fill="#007A55" fillOpacity={0.65} />
            </svg>
          </div>
        </div>
      )}

      {/* VARIANT 3: Open-Canvas Editorial Insight Matrix (Breaks out of single card) */}
      {activeVariant === 'v3' && (
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
            <IconLightbulb size={20} color="#007A55" strokeWidth={2} />
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
              INSIGHT // MATRIX
            </span>
          </div>

          {/* Upper Zone: Open Headline & Subtitle */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 165,
              left: 80,
              width: 920,
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 11,
                fontWeight: 700,
                color: '#007A55',
                backgroundColor: 'rgba(0, 122, 85, 0.08)',
                padding: '4px 12px',
                borderRadius: 4,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                alignSelf: 'flex-start',
                marginBottom: 14,
              }}
            >
              SYSTEM EVALUATION MATRIX
            </span>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: headlineFontSize,
                color: '#0A0A0A',
                lineHeight: 1.2,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                maxWidth: 880,
              }}
            >
              {headline}
            </div>

            <div
              style={{
                display: 'flex',
                marginTop: 14,
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontSize: 22,
                color: '#475569',
                lineHeight: 1.4,
                maxWidth: 860,
              }}
            >
              {supportingText}
            </div>
          </div>

          {/* Lower Zone: Open 2-Column Analytical Synthesis Matrix (Anchoring y: 440 to y: 915) */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 440,
              left: 80,
              width: 920,
              justifyContent: 'space-between',
            }}
          >
            {/* Left Column: Baseline Deficit */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 442,
                height: 470,
                backgroundColor: '#FFFFFF',
                borderRadius: 18,
                border: '1.5px solid #CBD5E1',
                borderLeft: '6px solid #64748B',
                boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                padding: '28px 26px',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 10.5,
                    fontWeight: 700,
                    color: '#64748B',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    marginBottom: 12,
                  }}
                >
                  CONVENTIONAL DEFICIT // BASELINE
                </span>
                <span
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#0F172A',
                    lineHeight: 1.25,
                    marginBottom: 14,
                  }}
                >
                  Static Calendar Pre-Allocation
                </span>
                <span
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: 18,
                    fontWeight: 500,
                    color: '#475569',
                    lineHeight: 1.4,
                  }}
                >
                  Rigid pre-assigned scheduling blocks create hidden idle intervals when patient arrival patterns desynchronize from practitioner availability.
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 16, borderTop: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#64748B', fontWeight: 600 }}>CAPACITY UTILIZATION</span>
                  <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#64748B', fontWeight: 700 }}>UNRECOVERED IDLE TIME</span>
                </div>
                <div style={{ display: 'flex', width: '100%', height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: '64%', height: '100%', backgroundColor: '#94A3B8', borderRadius: 3 }} />
                </div>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#94A3B8',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  BOTTLENECK: RIGID PRE-ALLOCATION GAPS
                </span>
              </div>
            </div>

            {/* Right Column: Event-Driven Resolution */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 442,
                height: 470,
                backgroundColor: '#FFFFFF',
                borderRadius: 18,
                border: '1.5px solid #007A55',
                borderLeft: '8px solid #007A55',
                boxShadow: '0 14px 38px rgba(0, 122, 85, 0.08)',
                padding: '28px 26px',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 10.5,
                    fontWeight: 700,
                    color: '#007A55',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    marginBottom: 12,
                  }}
                >
                  ARCHITECTURAL TARGET // RESOLUTION
                </span>
                <span
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#064E3B',
                    lineHeight: 1.25,
                    marginBottom: 14,
                  }}
                >
                  Active Queue Reconciliation
                </span>
                <span
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: 18,
                    fontWeight: 500,
                    color: '#0F172A',
                    lineHeight: 1.4,
                  }}
                >
                  Event streams continuously rebalance patient queues against active practitioner readiness, recovering unallocated hours in real-time.
                </span>
              </div>

              {/* VR-01: CONCENTRIC_RESONANCE Visual Motif */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 386, height: 120, marginTop: 2, marginBottom: 2 }}>
                <svg width="380" height="120" viewBox="0 0 380 120">
                  <path d="M 96.00 110.00 A 96 96 0 0 1 284.00 110.00" stroke="#007A55" strokeWidth="2.2" strokeOpacity="0.95" fill="none" />
                  <path d="M 117.00 110.00 A 75 75 0 0 1 263.00 110.00" stroke="#007A55" strokeWidth="1.8" strokeOpacity="0.70" fill="none" />
                  <path d="M 140.00 110.00 A 52 52 0 0 1 240.00 110.00" stroke="#007A55" strokeWidth="1.5" strokeOpacity="0.50" fill="none" />
                  <path d="M 160.00 110.00 A 30 30 0 0 1 220.00 110.00" stroke="#007A55" strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.35" fill="none" />
                  <circle cx="190" cy="110" r="5" fill="#007A55" stroke="#FFFFFF" strokeWidth="2" />
                  <line x1="20" y1="110" x2="360" y2="110" stroke="#CBD5E1" strokeWidth="1.5" />
                </svg>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 16, borderTop: '1px solid rgba(0, 122, 85, 0.15)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#007A55', fontWeight: 600 }}>CAPACITY EFFICIENCY</span>
                  <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#007A55', fontWeight: 700 }}>CONTINUOUSLY SATURATED</span>
                </div>
                <div style={{ display: 'flex', width: '100%', height: 6, backgroundColor: 'rgba(0, 122, 85, 0.12)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#007A55', borderRadius: 3 }} />
                </div>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#007A55',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  CAPACITY RECOVERY: MAXIMUM SATURATION
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VARIANT 4: Quote / Statement Hero with Grounded Architectural Synthesis Chassis */}
      {activeVariant === 'v4' && (
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
            <IconLightbulb size={20} color="#007A55" strokeWidth={2} />
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
              INSIGHT // MONOGRAPH
            </span>
          </div>

          {/* Typographic Statement Body with Vertical Quote Accent Rail */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              position: 'absolute',
              top: 175,
              left: 80,
              width: 920,
              alignItems: 'stretch',
            }}
          >
            {/* Executive Vertical Quote Rail */}
            <div
              style={{
                display: 'flex',
                width: 6,
                backgroundColor: '#007A55',
                borderRadius: 3,
                marginRight: 28,
              }}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: 64,
                  color: '#007A55',
                  lineHeight: 0.8,
                  marginBottom: 10,
                }}
              >
                “
              </div>

              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: headlineFontSize,
                  color: '#0A0A0A',
                  lineHeight: 1.22,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  maxWidth: 850,
                }}
              >
                {headline}
              </div>

              <div
                style={{
                  display: 'flex',
                  marginTop: 18,
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  fontSize: 22,
                  color: '#334155',
                  lineHeight: 1.4,
                  maxWidth: 820,
                }}
              >
                {supportingText}
              </div>
            </div>
          </div>

          {/* Grounded Executive Architectural Synthesis Chassis (Anchoring y: 495 to y: 885) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 495,
              left: 80,
              width: 920,
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              border: '1.5px solid #CBD5E1',
              borderTop: '8px solid #007A55',
              boxShadow: '0 16px 40px rgba(0, 122, 85, 0.07)',
              padding: '28px 32px',
            }}
          >
            {/* Chassis Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 16,
                borderBottom: '1px solid #F1F5F9',
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#007A55',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                ARCHITECTURAL IMPLICATIONS // PRODUCTION TELEMETRY
              </span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10.5,
                  fontWeight: 600,
                  color: '#64748B',
                  letterSpacing: '1px',
                }}
              >
                SYS-SPEC-04
              </span>
            </div>

            {/* 3 Architectural Principles Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#007A55',
                    marginRight: 14,
                    marginTop: 2,
                    backgroundColor: 'rgba(0, 122, 85, 0.08)',
                    padding: '2px 6px',
                    borderRadius: 3,
                  }}
                >
                  01
                </span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 18, color: '#0F172A', marginBottom: 2 }}>
                    Asynchronous Ingress Decoupling
                  </span>
                  <span style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: 16.5, color: '#64748B', lineHeight: 1.4 }}>
                    Incoming booking workloads route into partitioned event topics, preventing client-side blocking during peak surges.
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#007A55',
                    marginRight: 14,
                    marginTop: 2,
                    backgroundColor: 'rgba(0, 122, 85, 0.08)',
                    padding: '2px 6px',
                    borderRadius: 3,
                  }}
                >
                  02
                </span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 18, color: '#0F172A', marginBottom: 2 }}>
                    Atomic State Reconciliation
                  </span>
                  <span style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: 16.5, color: '#64748B', lineHeight: 1.4 }}>
                    Slot assignment logic executes as idempotent transactional mutations, eliminating double-bookings and race conditions.
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#007A55',
                    marginRight: 14,
                    marginTop: 2,
                    backgroundColor: 'rgba(0, 122, 85, 0.08)',
                    padding: '2px 6px',
                    borderRadius: 3,
                  }}
                >
                  03
                </span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 18, color: '#0F172A', marginBottom: 2 }}>
                    Dynamic Idle Capacity Recovery
                  </span>
                  <span style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: 16.5, color: '#64748B', lineHeight: 1.4 }}>
                    Real-time queue drainage matches waiting patients into cancellation gaps instantly, driving clinic operational saturation.
                  </span>
                </div>
              </div>
            </div>

            {/* Baseline Plate */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 16,
                marginTop: 18,
                borderTop: '1px solid #F1F5F9',
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10,
                  fontWeight: 600,
                  color: '#94A3B8',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                ENTERPRISE SPECIFICATION // DIGIXPRO ARCHITECTURAL GOVERNANCE
              </span>

              <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                {[50, 80, 40, 65].map((w, idx) => (
                  <div
                    key={`v4-datum-${idx}`}
                    style={{
                      display: 'flex',
                      width: w,
                      height: 4,
                      backgroundColor: '#007A55',
                      opacity: 0.3,
                      borderRadius: 1,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Bar */}
      {showFooter && <Footer urlText="DigiXPro.in" />}
    </div>
  );
};
