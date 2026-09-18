import React from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { Footer } from '../components/Footer';
import { Background } from '../components/Background';
import { BackgroundFamilyVariant, Master06Payload } from '../renderer/types';
import { IconAlertTriangle, IconRefreshCw, IconCheckCircle } from '../components/Icons';
import { GeometryCornerBracket } from '../components/Geometries';

export interface Master06Props {
  data: Master06Payload;
  backgroundVariant?: BackgroundFamilyVariant;
  bgDataUri?: string;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export const Master06CaseStudy: React.FC<Master06Props> = ({
  data,
  backgroundVariant = 'base_light',
  bgDataUri,
  variant = 'v1',
}) => {
  const activeVariant = data.variant || variant;

  const headline = data.case_study_headline;
  const headlineLen = headline.length;
  const headlineFontSize = headlineLen > 65 ? 38 : headlineLen > 40 ? 44 : 48;

  const cards = [
    {
      label: 'THE CHALLENGE',
      content: data.short_challenge,
      bg: '#0F172A',
      textColor: '#ffffff',
      labelColor: '#94A3B8',
      icon: IconAlertTriangle,
      iconColor: '#CBD5E1',
    },
    {
      label: 'THE CHANGE',
      content: data.what_digixpro_changed,
      bg: '#007A55',
      textColor: '#ffffff',
      labelColor: '#86EFAC',
      icon: IconRefreshCw,
      iconColor: '#86EFAC',
    },
    {
      label: 'THE RESULT',
      content: data.verified_result_outcome,
      bg: '#064E3B',
      textColor: '#ffffff',
      labelColor: '#6EE7B7',
      icon: IconCheckCircle,
      iconColor: '#6EE7B7',
    },
  ];

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

      {/* Top Header - No Category Badge per Phase 1 Task 6 */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 70,
          left: 80,
          alignItems: 'center',
        }}
      >
        <BrandLogo theme="dark" />
      </div>

      {/* ============================================================
         LOCKED — FOUNDER-APPROVED FINAL v1 DESIGN
         Archetype: 06 Case Study (3-Stage Evidence Progression + Corner Brackets G2)
         Approved: 2026-09-12
         Do NOT modify this v1 composition in any future session —
         including "improvement" attempts, dead-space fixes, geometry
         swaps, or art-direction passes — without a SEPARATE, EXPLICIT
         founder re-approval for this specific archetype's v1.
         If asked to "improve all templates" or similar broad instructions
         in a future session, treat this v1 as OUT OF SCOPE by default
         unless the founder names this specific archetype/variant.
         ============================================================ */}
      {/* VARIANT 1: Canonical 3-Stage Evidence Progression (Challenge -> Change -> Result) */}
      {activeVariant === 'v1' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Architectural Frame Corner Bracket (Bottom-Right only, armLength 70px, opacity 0.30) */}
          <GeometryCornerBracket color="#007A55" armLength={70} opacity={0.30} position="bottom-right" />

          {/* Top-Right Case Study Archetype Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              position: 'absolute',
              top: 75,
              right: 80,
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 11,
                fontWeight: 700,
                color: '#007A55',
                backgroundColor: 'rgba(0, 122, 85, 0.08)',
                padding: '4px 10px',
                borderRadius: 4,
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              CASE STUDY // IMPACT
            </span>
          </div>

{/* Headline & Subhead */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 155,
              left: 80,
              width: 920,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: headlineFontSize,
                color: '#0A0A0A',
                lineHeight: 1.22,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                maxWidth: 880,
              }}
            >
              {headline}
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: 18,
                color: '#007A55',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginTop: 10,
              }}
            >
              {data.client_project_type}
            </div>
          </div>

          {/* 3 Connected Evidence Cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 310,
              left: 100,
              width: 880,
              alignItems: 'center',
            }}
          >
            {cards.map((c, idx) => {
              const IconComp = c.icon;
              return (
                <div key={`case-flow-${idx}`} style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: c.bg,
                      borderRadius: 18,
                      width: '100%',
                      height: 118,
                      paddingLeft: 40,
                      paddingRight: 40,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        marginBottom: 6,
                      }}
                    >
                      <IconComp size={18} color={c.iconColor} strokeWidth={2.2} />
                      <div
                        style={{
                          display: 'flex',
                          fontFamily: 'Poppins',
                          fontWeight: 700,
                          fontSize: 16,
                          color: c.labelColor,
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {c.label}
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        fontFamily: 'Poppins',
                        fontWeight: 500,
                        fontSize: 20,
                        color: c.textColor,
                        textAlign: 'center',
                        lineHeight: 1.4,
                        maxWidth: 800,
                      }}
                    >
                      {c.content}
                    </div>
                  </div>

                  {/* Flow Connector Arrow between cards */}
                  {idx < cards.length - 1 && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 24,
                        width: '100%',
                      }}
                    >
                      <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
                        <line x1="9" y1="0" x2="9" y2="16" stroke="#007A55" strokeWidth="2" strokeOpacity="0.55" />
                        <polygon points="9,22 5,15 13,15" fill="#007A55" fillOpacity="0.75" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Case Study Summary */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 775,
              left: 80,
              width: 920,
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontStyle: 'italic',
                fontSize: 22,
                color: '#334155',
                textAlign: 'center',
                letterSpacing: '0.3px',
                maxWidth: 840,
                lineHeight: 1.4,
              }}
            >
              "{data.case_study_summary}"
            </span>
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
      {/* VARIANT 2: Asymmetric Case Monograph (Left Headline & Summary -> Right 3-Tier Stepped Cards) */}
      {activeVariant === 'v2' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* G2 Framing: Architectural Corner Brackets */}
          <GeometryCornerBracket color="#007A55" armLength={65} opacity={0.30} position="all" />

          {/* Top-Right Badge */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 75,
              right: 80,
              alignItems: 'center',
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
              CASE STUDY // 02
            </span>
          </div>

          {/* Left Column: Headline, Type & Summary Plate */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 165,
              left: 80,
              width: 420,
              height: 690,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#007A55',
                  backgroundColor: '#E6F4F1',
                  border: '1px solid rgba(0, 122, 85, 0.25)',
                  padding: '5px 12px',
                  borderRadius: 4,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  alignSelf: 'flex-start',
                  marginBottom: 14,
                }}
              >
                {data.client_project_type}
              </span>

              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: headlineFontSize > 38 ? 38 : headlineFontSize,
                  color: '#0A0A0A',
                  lineHeight: 1.2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  maxWidth: 410,
                }}
              >
                {headline}
              </div>
            </div>

            {/* CONFIRMED CORRECT EMPTY-ZONE LOCATION — do not re-identify; only the element placed here may change. */}
            {/* Ascending Evidence Progression Steps: 3 clean rising horizontal tiers expressing challenge -> transformation -> verified outcome */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: 150,
                position: 'relative',
                margin: '10px 0',
              }}
            >
              <svg width="420" height="150" viewBox="0 0 420 150" fill="none">
                {/* Rising Trajectory Hairline linking step endpoints */}
                <path
                  d="M 160 30 L 260 64 L 380 104"
                  stroke="#007A55"
                  strokeWidth="1.2"
                  strokeOpacity="0.30"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <circle cx="380" cy="104" r="3.5" fill="#007A55" fillOpacity="0.65" />

                {/* Step 1: Baseline Context */}
                <rect
                  x="20"
                  y="24"
                  width="140"
                  height="12"
                  rx="6"
                  fill="#007A55"
                  fillOpacity="0.12"
                  stroke="#007A55"
                  strokeWidth="1"
                  strokeOpacity="0.25"
                />

                {/* Step 2: Implementation Transformation */}
                <rect
                  x="20"
                  y="56"
                  width="240"
                  height="16"
                  rx="8"
                  fill="#007A55"
                  fillOpacity="0.22"
                  stroke="#007A55"
                  strokeWidth="1.2"
                  strokeOpacity="0.35"
                />

                {/* Step 3: Verified Commercial Result */}
                <rect
                  x="20"
                  y="94"
                  width="360"
                  height="20"
                  rx="10"
                  fill="#007A55"
                  fillOpacity="0.35"
                  stroke="#007A55"
                  strokeWidth="1.5"
                  strokeOpacity="0.55"
                />
              </svg>
            </div>

            {/* Executive Case Summary Plate */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 420,
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                border: '1.5px solid #CBD5E1',
                borderLeft: '8px solid #007A55',
                padding: '24px 26px',
                boxShadow: '0 8px 24px rgba(0, 122, 85, 0.05)',
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: '#007A55',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                ENGAGEMENT SYNTHESIS
              </span>
              <span
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  fontSize: 21,
                  color: '#1E293B',
                  lineHeight: 1.4,
                }}
              >
                "{data.case_study_summary}"
              </span>
              <div style={{ display: 'flex', width: '100%', height: 1, backgroundColor: '#E2E8F0', margin: '14px 0 8px 0' }} />
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#64748B', letterSpacing: '1px' }}>
                VERIFIED ENTERPRISE ENGAGEMENT
              </span>
            </div>
          </div>

          {/* Right Column: 3-Tier Stepped Evidence Cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 165,
              left: 530,
              width: 470,
              gap: 16,
            }}
          >
            {cards.map((c, idx) => (
              <div
                key={`case-v2-card-${idx}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 14,
                  border: '1.5px solid #E2E8F0',
                  borderTop: `5px solid ${idx === 0 ? '#EF4444' : idx === 1 ? '#007A55' : '#059669'}`,
                  padding: '18px 22px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 11,
                      fontWeight: 700,
                      color: idx === 0 ? '#B91C1C' : idx === 1 ? '#007A55' : '#059669',
                      backgroundColor: idx === 0 ? 'rgba(239, 68, 68, 0.08)' : idx === 1 ? 'rgba(0, 122, 85, 0.08)' : 'rgba(5, 150, 105, 0.08)',
                      border: idx === 0 ? '1px solid rgba(239, 68, 68, 0.25)' : idx === 1 ? '1px solid rgba(0, 122, 85, 0.25)' : '1px solid rgba(5, 150, 105, 0.25)',
                      padding: '3px 8px',
                      borderRadius: 4,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      alignSelf: 'flex-start',
                    }}
                  >
                    0{idx + 1} // {c.label}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontFamily: 'Poppins',
                    fontWeight: 500,
                    fontSize: 20,
                    color: '#1E293B',
                    lineHeight: 1.4,
                  }}
                >
                  {c.content}
                </div>
              </div>
            ))}
          </div>

          {/* Solid Geometric Accent: Prominent solid triangle in bottom-right corner */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 820,
              left: 860,
              width: 108,
              height: 96,
            }}
          >
            <svg width="108" height="96" viewBox="0 0 108 96" fill="none">
              <path d="M 54 0 L 108 96 L 0 96 Z" fill="#6EE7B7" fillOpacity={0.65} />
            </svg>
          </div>
        </div>
      )}

      {/* VARIANT 3: Side-by-Side Transformation (Left: Challenge vs Right: Engineering & Result) */}
      {activeVariant === 'v3' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute',
              top: 155,
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
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              TRANSFORMATION EVIDENCE // {data.client_project_type}
            </span>
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: headlineFontSize > 38 ? 38 : headlineFontSize,
                color: '#0A0A0A',
                lineHeight: 1.2,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                maxWidth: 880,
              }}
            >
              {headline}
            </div>
          </div>

          {/* Dual Side-by-Side Cards */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 275,
              left: 80,
              width: 920,
              justifyContent: 'space-between',
            }}
          >
            {/* Left Card: Operational Challenge */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 440,
                height: 590,
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                border: '1.5px solid #E2E8F0',
                borderTop: '8px solid #EF4444',
                padding: '32px 30px',
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
                    backgroundColor: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    padding: '3px 8px',
                    borderRadius: 4,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    alignSelf: 'flex-start',
                    marginBottom: 12,
                  }}
                >
                  PHASE 01 // THE CHALLENGE
                </span>
                <div style={{ display: 'flex', fontFamily: 'Poppins', fontWeight: 500, fontSize: 20, color: '#1E293B', lineHeight: 1.4 }}>
                  {data.short_challenge}
                </div>

                {data.case_study_summary && (
                  <div style={{ display: 'flex', flexDirection: 'column', marginTop: 18 }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 10.5, fontWeight: 700, color: '#64748B', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>
                      VERIFIED IMPACT BENCHMARK
                    </span>
                    <div style={{ display: 'flex', fontFamily: 'Poppins', fontWeight: 500, fontSize: 20, color: '#475569', lineHeight: 1.4, backgroundColor: '#F8FAFC', padding: '12px 14px', borderRadius: 10, border: '1px solid #E2E8F0' }}>
                      &ldquo;{data.case_study_summary}&rdquo;
                    </div>
                  </div>
                )}
              </div>

              {/* VR-03: SIGNAL_FIELD Visual Motif (Legacy Diagnostic Telemetry) */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 380, height: 110, margin: '2px 0' }}>
                <svg width="340" height="110" viewBox="0 0 340 110">
                  <line x1="30" y1="10" x2="30" y2="100" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="2 2" />
                  <line x1="30" y1="20" x2="220" y2="20" stroke="#007A55" strokeWidth="1.8" strokeOpacity="0.45" />
                  <circle cx="220" cy="20" r="2" fill="#007A55" fillOpacity="0.45" />
                  <line x1="30" y1="35" x2="300" y2="35" stroke="#007A55" strokeWidth="2.2" strokeOpacity="0.85" />
                  <circle cx="300" cy="35" r="2" fill="#007A55" fillOpacity="0.85" />
                  <line x1="30" y1="50" x2="190" y2="50" stroke="#007A55" strokeWidth="1.8" strokeOpacity="0.40" />
                  <circle cx="190" cy="50" r="2" fill="#007A55" fillOpacity="0.40" />
                  <line x1="30" y1="65" x2="310" y2="65" stroke="#007A55" strokeWidth="2.4" strokeOpacity="0.95" />
                  <circle cx="310" cy="65" r="2" fill="#007A55" fillOpacity="0.95" />
                  <line x1="30" y1="80" x2="240" y2="80" stroke="#007A55" strokeWidth="2.0" strokeOpacity="0.55" />
                  <circle cx="240" cy="80" r="2" fill="#007A55" fillOpacity="0.55" />
                  <line x1="30" y1="95" x2="260" y2="95" stroke="#007A55" strokeWidth="1.8" strokeOpacity="0.50" />
                  <circle cx="260" cy="95" r="2" fill="#007A55" fillOpacity="0.50" />
                </svg>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', height: 1, backgroundColor: '#E2E8F0', marginBottom: 10 }} />
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#94A3B8', letterSpacing: '1px' }}>
                  STATUS: INITIAL PRODUCTION STATE
                </span>
              </div>
            </div>

            {/* Central Connector Vector Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: 270,
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

            {/* Right Card: The Intervention & Outcome */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 440,
                height: 590,
                backgroundColor: '#064E3B',
                borderRadius: 16,
                borderTop: '8px solid #86EFAC',
                padding: '32px 30px',
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
                    backgroundColor: 'rgba(134, 239, 172, 0.12)',
                    border: '1px solid rgba(134, 239, 172, 0.25)',
                    padding: '3px 8px',
                    borderRadius: 4,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    alignSelf: 'flex-start',
                    marginBottom: 12,
                  }}
                >
                  PHASE 02 // ARCHITECTURAL CHANGE
                </span>
                <div style={{ display: 'flex', fontFamily: 'Poppins', fontWeight: 500, fontSize: 20, color: '#D1FAE5', lineHeight: 1.4, marginBottom: 18 }}>
                  {data.what_digixpro_changed}
                </div>

                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#86EFAC',
                    backgroundColor: 'rgba(134, 239, 172, 0.12)',
                    border: '1px solid rgba(134, 239, 172, 0.25)',
                    padding: '3px 8px',
                    borderRadius: 4,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    alignSelf: 'flex-start',
                    marginBottom: 10,
                  }}
                >
                  PHASE 03 // VERIFIED RESULT
                </span>
                <div style={{ display: 'flex', fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#FFFFFF', lineHeight: 1.4 }}>
                  {data.verified_result_outcome}
                </div>
              </div>

              {/* VR-02: ARCHITECTURE_STACK Visual Motif (Target Decoupled Architecture) */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 380, height: 110, margin: '2px 0' }}>
                <svg width="340" height="110" viewBox="0 0 340 110">
                  <rect x="50" y="10" width="240" height="24" rx="4" fill="#064E3B" stroke="#86EFAC" strokeWidth="1.5" />
                  <rect x="50" y="10" width="8" height="24" rx="2" fill="#86EFAC" />
                  <circle cx="170" cy="22" r="3" fill="#86EFAC" />
                  <rect x="50" y="42" width="240" height="24" rx="4" fill="#064E3B" stroke="#86EFAC" strokeWidth="1.5" strokeOpacity="0.8" />
                  <rect x="50" y="42" width="8" height="24" rx="2" fill="#86EFAC" fillOpacity="0.8" />
                  <circle cx="170" cy="54" r="3" fill="#86EFAC" fillOpacity="0.8" />
                  <rect x="50" y="74" width="240" height="24" rx="4" fill="#064E3B" stroke="#86EFAC" strokeWidth="1.5" strokeOpacity="0.6" />
                  <rect x="50" y="74" width="8" height="24" rx="2" fill="#86EFAC" fillOpacity="0.6" />
                  <circle cx="170" cy="86" r="3" fill="#86EFAC" fillOpacity="0.6" />
                </svg>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', height: 1, backgroundColor: 'rgba(255, 255, 255, 0.15)', marginBottom: 10 }} />
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#86EFAC', letterSpacing: '1px' }}>
                  OUTCOME: ARCHITECTURE VALIDATED
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VARIANT 4: 3-Column Horizon (Structured Horizontal Process) */}
      {activeVariant === 'v4' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Top Headline Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute',
              top: 155,
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
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              HORIZONTAL EVIDENCE BLUEPRINT // {data.client_project_type}
            </span>
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: headlineFontSize > 38 ? 38 : headlineFontSize,
                color: '#0A0A0A',
                lineHeight: 1.2,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                maxWidth: 880,
              }}
            >
              {headline}
            </div>
          </div>

          {/* 3 Horizontal Columns */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 275,
              left: 80,
              width: 920,
              justifyContent: 'space-between',
            }}
          >
            {cards.map((c, idx) => (
              <div
                key={`case-col-v4-${idx}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 285,
                  height: 480,
                  backgroundColor: idx === 2 ? '#064E3B' : '#FFFFFF',
                  borderRadius: 14,
                  border: idx === 2 ? '1.5px solid #047857' : '1.5px solid #CBD5E1',
                  borderTop: `7px solid ${idx === 0 ? '#EF4444' : idx === 1 ? '#007A55' : '#86EFAC'}`,
                  padding: '24px 20px',
                  boxShadow: idx === 2 ? '0 12px 30px rgba(6, 78, 59, 0.20)' : '0 8px 24px rgba(0, 0, 0, 0.06)',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 11,
                      fontWeight: 700,
                      color: idx === 2 ? '#86EFAC' : idx === 0 ? '#B91C1C' : '#007A55',
                      backgroundColor: idx === 2 ? 'rgba(134, 239, 172, 0.15)' : idx === 0 ? 'rgba(239, 68, 68, 0.08)' : 'rgba(0, 122, 85, 0.08)',
                      border: idx === 2 ? '1px solid rgba(134, 239, 172, 0.3)' : idx === 0 ? '1px solid rgba(239, 68, 68, 0.25)' : '1px solid rgba(0, 122, 85, 0.25)',
                      padding: '3px 8px',
                      borderRadius: 4,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      alignSelf: 'flex-start',
                      marginBottom: 12,
                    }}
                  >
                    0{idx + 1} // {c.label}
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      fontFamily: 'Poppins',
                      fontWeight: idx === 2 ? 600 : 500,
                      fontSize: 20,
                      color: idx === 2 ? '#FFFFFF' : '#1E293B',
                      lineHeight: 1.4,
                    }}
                  >
                    {c.content}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: '100%', height: 1, backgroundColor: idx === 2 ? 'rgba(255,255,255,0.15)' : '#E2E8F0', marginBottom: 8 }} />
                  <span style={{ fontFamily: 'monospace', fontSize: 9.5, color: idx === 2 ? '#86EFAC' : '#94A3B8', letterSpacing: '1px' }}>
                    {idx === 0 ? 'STARTING STATE' : idx === 1 ? 'TRANSFORMATION' : 'MEASURED RESULT'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Summary Bar */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 785,
              left: 80,
              width: 920,
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: 20,
                padding: '6px 22px',
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#007A55' }} />
              <span
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  fontSize: 20,
                  color: '#334155',
                  lineHeight: 1.4,
                }}
              >
                "{data.case_study_summary}"
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Footer Bar */}
      <Footer urlText="DigiXPro.in" />
    </div>
  );
};
