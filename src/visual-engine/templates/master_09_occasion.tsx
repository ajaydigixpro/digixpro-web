import React from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { Footer } from '../components/Footer';
import { Background } from '../components/Background';
import { BackgroundFamilyVariant, Master09Payload } from '../renderer/types';
import { GeometryArchitecturalGrid, GeometryOrbit } from '../components/Geometries';

export interface Master09Props {
  data: Master09Payload;
  backgroundVariant?: BackgroundFamilyVariant;
  bgDataUri?: string;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export const Master09Occasion: React.FC<Master09Props> = ({
  data,
  backgroundVariant = 'base_light',
  bgDataUri,
  variant = 'v1',
}) => {
  const activeVariant = data.variant || variant;

  const occasion = data.occasion_name;
  const occasionLen = occasion.length;
  const occasionFontSize = occasionLen > 30 ? 44 : occasionLen > 18 ? 52 : 60;

  const greeting = data.greeting_headline;
  const greetingLen = greeting.length;
  const greetingFontSize = greetingLen > 40 ? 24 : 28;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 1080,
        height: 1080,
        position: 'relative',
        backgroundColor: activeVariant === 'v4' ? '#0F172A' : activeVariant === 'v1' ? '#F5F7F7' : '#F8FAFC',
      }}
    >
      {activeVariant !== 'v4' && (
        <Background
          variant={activeVariant === 'v1' ? 'base_light' : backgroundVariant}
          imageSrc={bgDataUri}
          width={1080}
          height={1080}
        />
      )}

      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 70,
          left: 80,
          alignItems: 'center',
        }}
      >
        <BrandLogo theme={activeVariant === 'v4' ? 'light' : 'dark'} />
      </div>

      {/* ============================================================
         LOCKED — FOUNDER-APPROVED FINAL v1 DESIGN
         Archetype: 09 Occasion (Editorial Architectural Poster + Micro-Mark)
         Approved: 2026-09-12
         Do NOT modify this v1 composition in any future session —
         including "improvement" attempts, dead-space fixes, geometry
         swaps, or art-direction passes — without a SEPARATE, EXPLICIT
         founder re-approval for this specific archetype's v1.
         If asked to "improve all templates" or similar broad instructions
         in a future session, treat this v1 as OUT OF SCOPE by default
         unless the founder names this specific archetype/variant.
         ============================================================ */}
      {/* VARIANT 1: Editorial Architectural Poster */}
      {activeVariant === 'v1' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Top-Right Architectural Monograph Badge */}
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
              OCCASION // DXP-09
            </span>
          </div>

          {/* Museum-Grade Architectural Construction Grid & Elevation Hairlines */}
          <GeometryArchitecturalGrid color="#007A55" opacity={0.22} />

          {/* Concentric Orbit Rings in bottom-left corner: radii [100, 200], opacity 0.18 */}
          <GeometryOrbit color="#007A55" cx={0} cy={1008} radii={[100, 200]} opacity={0.18} strokeWidth={2.2} />

          {/* Zone 1: Top Monograph & Occasion Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute',
              top: 225,
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
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              SPECIAL COMMEMORATION
            </span>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 800,
                fontSize: occasionFontSize > 52 ? 52 : occasionFontSize,
                color: '#0A0A0A',
                lineHeight: 1.15,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                maxWidth: 880,
              }}
            >
              {occasion}
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: 22,
                color: '#007A55',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '2.5px',
                marginTop: 12,
                maxWidth: 840,
              }}
            >
              {greeting}
            </div>
          </div>

          {/* Zone 2: Central Architectural Structural Manifesto */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute',
              top: 450,
              left: 80,
              width: 920,
            }}
          >
            {/* Central Architectural Structural Divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 460,
                gap: 16,
                marginBottom: 32,
              }}
            >
              <div style={{ display: 'flex', flex: 1, height: 1.2, backgroundColor: '#CBD5E1' }} />
              <div
                style={{
                  display: 'flex',
                  width: 8,
                  height: 8,
                  transform: 'rotate(45deg)',
                  backgroundColor: '#007A55',
                }}
              />
              <div style={{ display: 'flex', flex: 1, height: 1.2, backgroundColor: '#CBD5E1' }} />
            </div>

            {/* Relevant Message */}
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: 26,
                color: '#0F172A',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                maxWidth: 800,
                lineHeight: 1.35,
              }}
            >
              {data.relevant_message}
            </div>

            {/* Line Message */}
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontStyle: 'italic',
                fontSize: 22,
                color: '#475569',
                textAlign: 'center',
                lineHeight: 1.45,
                marginTop: 18,
                maxWidth: 740,
              }}
            >
              {data.line_message}
            </div>
          </div>

          {/* Zone 3: Bottom Foundation & Date Datum */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute',
              top: 800,
              left: 80,
              width: 920,
            }}
          >
            {/* Architectural Discipline Datum Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '7px 20px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: 20,
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
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
                DIGIXPRO // OFFICIAL COMMEMORATION
              </span>
            </div>

            {/* Date / Context */}
            {data.date_context && (
              <div
                style={{
                  display: 'flex',
                  marginTop: 18,
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    fontSize: 17,
                    color: '#0F172A',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                  }}
                >
                  {data.date_context}
                </span>
              </div>
            )}
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
      {/* VARIANT 2: Asymmetric Commemorative Monograph (Left Anchor + Right Focal Card) */}
      {activeVariant === 'v2' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Top-Right Badge */}
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
              COMMEMORATIVE MONOGRAPH // SPEC 09
            </span>
          </div>

          {/* Left Column: Occasion Title Anchor */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 170,
              left: 80,
              width: 460,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontFamily: 'monospace',
                fontSize: 11,
                fontWeight: 700,
                color: '#007A55',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              [ SPECIAL COMMEMORATION ]
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 800,
                fontSize: occasionFontSize > 44 ? 42 : occasionFontSize,
                color: '#0A0A0A',
                lineHeight: 1.15,
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              {occasion}
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: greetingFontSize,
                color: '#007A55',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginTop: 14,
              }}
            >
              {greeting}
            </div>

            {/* Stepped Emerald Accent Spine */}
            <div
              style={{
                display: 'flex',
                width: 120,
                height: 4,
                backgroundColor: '#007A55',
                marginTop: 28,
                marginBottom: 28,
              }}
            />

            {data.date_context && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#64748B',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}
                >
                  OFFICIAL RECORD
                </span>
                <span
                  style={{
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    fontSize: 18,
                    color: '#0F172A',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  {data.date_context}
                </span>
              </div>
            )}
          </div>

          {/* CONFIRMED CORRECT EMPTY-ZONE LOCATION — do not re-identify; only the element placed here may change. */}
          {/* Solid Emerald Accent Circle: Modernist monolithic geometric focal mark */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 640,
              left: 240,
              width: 64,
              height: 64,
              pointerEvents: 'none',
            }}
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="32" fill="#007A55" />
            </svg>
          </div>

          {/* Right Column: Elevated Commemorative Message Panel */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 170,
              left: 570,
              width: 430,
              height: 680,
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              padding: '36px 30px',
              border: '1.5px solid #E2E8F0',
              borderLeft: '8px solid #007A55',
              boxShadow: '0 12px 36px rgba(0, 122, 85, 0.07)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#007A55',
                  backgroundColor: 'rgba(0, 122, 85, 0.08)',
                  padding: '3px 8px',
                  borderRadius: 4,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                DIGIXPRO TRIBUTE
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: 24,
                color: '#0F172A',
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                lineHeight: 1.35,
              }}
            >
              {data.relevant_message}
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontStyle: 'italic',
                fontSize: 20,
                color: '#475569',
                lineHeight: 1.4,
                marginTop: 22,
              }}
            >
              {data.line_message}
            </div>

            <div
              style={{
                display: 'flex',
                position: 'absolute',
                bottom: 28,
                left: 30,
                right: 30,
                paddingTop: 16,
                borderTop: '1px solid #F1F5F9',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#94A3B8',
                  letterSpacing: '1px',
                }}
              >
                GOVERNANCE: DIGIXPRO
              </span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#007A55',
                  letterSpacing: '1px',
                }}
              >
                STATUS: HONORED
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VARIANT 3: Precision Commemorative Dossier */}
      {activeVariant === 'v3' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Top-Right Monospace Badge */}
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
              COMMEMORATIVE DOSSIER // DXP-09
            </span>
          </div>

          {/* Centered Elevated Dossier Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute',
              top: 160,
              left: 80,
              width: 920,
              height: 760,
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              padding: '32px 46px 20px 46px',
              border: '1.5px solid #CBD5E1',
              borderTop: '8px solid #007A55',
              boxShadow: '0 16px 48px rgba(0,0,0,0.06)',
              justifyContent: 'space-between',
            }}
          >
            {/* Top Dossier Header Rail */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                borderBottom: '1px solid #E2E8F0',
                paddingBottom: 14,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#007A55' }} />
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: 11,
                    color: '#007A55',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}
                >
                  OFFICIAL COMMEMORATION ARCHIVE
                </span>
              </div>
              {data.date_context && (
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: 11.5,
                    color: '#64748B',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  {data.date_context}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 800,
                  fontSize: occasionFontSize > 46 ? 46 : occasionFontSize,
                  color: '#0A0A0A',
                  lineHeight: 1.15,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  maxWidth: 840,
                }}
              >
                {occasion}
              </div>

              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: greetingFontSize,
                  color: '#007A55',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginTop: 10,
                }}
              >
                {greeting}
              </div>
            </div>

            {/* Subtle Divider with Center Diamond */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 360,
                gap: 14,
                margin: '8px 0',
              }}
            >
              <div style={{ display: 'flex', flex: 1, height: 1.2, backgroundColor: '#CBD5E1' }} />
              <div
                style={{
                  display: 'flex',
                  width: 8,
                  height: 8,
                  transform: 'rotate(45deg)',
                  backgroundColor: '#007A55',
                }}
              />
              <div style={{ display: 'flex', flex: 1, height: 1.2, backgroundColor: '#CBD5E1' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: 24,
                  color: '#0F172A',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  maxWidth: 800,
                  lineHeight: 1.35,
                }}
              >
                {data.relevant_message}
              </div>

              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  fontSize: 20,
                  color: '#475569',
                  textAlign: 'center',
                  lineHeight: 1.4,
                  marginTop: 12,
                  maxWidth: 760,
                }}
              >
                {data.line_message}
              </div>
            </div>

            {/* Commemorative Foundation Specification Rail (Eliminates interior and lower vacuum) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                backgroundColor: '#F8FAFC',
                borderRadius: 12,
                border: '1px solid #E2E8F0',
                padding: '12px 20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 700, color: '#007A55', letterSpacing: '1px' }}>
                  COMMEMORATIVE FOUNDATION PILLARS
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 9.5, color: '#64748B', fontWeight: 600 }}>
                  FOUNDATION CHARTER
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#007A55' }} />
                  <span style={{ fontFamily: 'monospace', fontSize: 9.5, color: '#334155', fontWeight: 600 }}>
                    DISCIPLINE: ARCHITECTURAL RIGOR
                  </span>
                </div>
                <div style={{ display: 'flex', width: 1, height: 12, backgroundColor: '#CBD5E1' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#007A55' }} />
                  <span style={{ fontFamily: 'monospace', fontSize: 9.5, color: '#334155', fontWeight: 600 }}>
                    SCALE: DETERMINISTIC RESILIENCE
                  </span>
                </div>
                <div style={{ display: 'flex', width: 1, height: 12, backgroundColor: '#CBD5E1' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#007A55' }} />
                  <span style={{ fontFamily: 'monospace', fontSize: 9.5, color: '#007A55', fontWeight: 700 }}>
                    STATUS: PERPETUAL
                  </span>
                </div>
              </div>
            </div>

            {/* Dossier Bottom Rail */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                borderTop: '1px solid #E2E8F0',
                paddingTop: 12,
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#94A3B8',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                AUTHENTICATED COMMEMORATIVE PUBLICATION // DIGIXPRO ENTERPRISE
              </span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#007A55',
                  letterSpacing: '1px',
                }}
              >
                RECORD #DXP-09
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VARIANT 4: Midnight Commemorative (Deep Slate High-Contrast Tribute) */}
      {activeVariant === 'v4' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Top-Right Badge */}
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
                color: '#86EFAC',
                backgroundColor: 'rgba(134, 239, 172, 0.12)',
                padding: '4px 10px',
                borderRadius: 4,
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              MIDNIGHT TRIBUTE // SPEC 09
            </span>
          </div>

          {/* High-Contrast Technical Slate Frame */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 160,
              left: 80,
              width: 920,
              height: 720,
              backgroundColor: '#1E293B',
              borderRadius: 24,
              padding: '44px 50px',
              border: '1.5px solid #334155',
              borderTop: '8px solid #007A55',
              boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
            }}
          >
            {/* Top Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                borderBottom: '1px solid #334155',
                paddingBottom: 16,
                marginBottom: 28,
              }}
            >
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
                OFFICIAL COMMEMORATIVE TRIBUTE
              </span>
              {data.date_context && (
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#94A3B8',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  {data.date_context}
                </span>
              )}
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 800,
                fontSize: occasionFontSize > 44 ? 44 : occasionFontSize,
                color: '#FFFFFF',
                lineHeight: 1.15,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                maxWidth: 820,
              }}
            >
              {occasion}
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: greetingFontSize,
                color: '#86EFAC',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginTop: 14,
              }}
            >
              {greeting}
            </div>

            <div
              style={{
                display: 'flex',
                width: 240,
                height: 2,
                backgroundColor: '#334155',
                marginTop: 26,
                marginBottom: 26,
              }}
            />

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: 24,
                color: '#F8FAFC',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                maxWidth: 780,
                lineHeight: 1.35,
              }}
            >
              {data.relevant_message}
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontStyle: 'italic',
                fontSize: 20,
                color: '#94A3B8',
                textAlign: 'center',
                lineHeight: 1.4,
                marginTop: 18,
                maxWidth: 740,
              }}
            >
              {data.line_message}
            </div>

            <div
              style={{
                display: 'flex',
                position: 'absolute',
                bottom: 24,
                left: 50,
                right: 50,
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #334155',
                paddingTop: 14,
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#64748B',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                ARCHIVED RECORD: PUBLIC RELEASE
              </span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#86EFAC',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                DIGIXPRO.IN
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
