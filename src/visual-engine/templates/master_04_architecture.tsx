import React from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { Footer } from '../components/Footer';
import { Background } from '../components/Background';
import { BackgroundFamilyVariant, Master04Payload } from '../renderer/types';
import { IconLayers } from '../components/Icons';
import { GeometryCornerBracket } from '../components/Geometries';

export interface Master04Props {
  data: Master04Payload;
  backgroundVariant?: BackgroundFamilyVariant;
  bgDataUri?: string;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export const Master04Architecture: React.FC<Master04Props> = ({
  data,
  backgroundVariant = 'base_light',
  bgDataUri,
  variant = 'v1',
}) => {
  const activeVariant = data.variant || variant;

  const headline = data.architecture_headline;
  const headlineLen = headline.length;
  const headlineFontSize = headlineLen > 65 ? 38 : headlineLen > 40 ? 44 : 48;

  const steps = [
    {
      num: '1',
      title: data.architecture_step_1,
      detail: data.architecture_detail_1,
      bg: '#0F172A',
      textColor: '#ffffff',
      numBg: '#007A55',
      numColor: '#ffffff',
    },
    {
      num: '2',
      title: data.architecture_step_2,
      detail: data.architecture_detail_2,
      bg: '#007A55',
      textColor: '#ffffff',
      numBg: '#86EFAC',
      numColor: '#0F172A',
    },
    {
      num: '3',
      title: data.architecture_step_3,
      detail: data.architecture_detail_3,
      bg: '#064E3B',
      textColor: '#ffffff',
      numBg: '#6EE7B7',
      numColor: '#0F172A',
    },
    {
      num: '4',
      title: data.architecture_step_4,
      detail: data.architecture_detail_4,
      bg: '#059669',
      textColor: '#ffffff',
      numBg: '#0F172A',
      numColor: '#ffffff',
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
         Archetype: 04 Architecture (Horizontal Pipeline + Corner Brackets G2)
         Approved: 2026-09-12
         Do NOT modify this v1 composition in any future session —
         including "improvement" attempts, dead-space fixes, geometry
         swaps, or art-direction passes — without a SEPARATE, EXPLICIT
         founder re-approval for this specific archetype's v1.
         If asked to "improve all templates" or similar broad instructions
         in a future session, treat this v1 as OUT OF SCOPE by default
         unless the founder names this specific archetype/variant.
         ============================================================ */}
      {/* VARIANT 1: True Horizontal Architectural Systems Pipeline */}
      {activeVariant === 'v1' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Top-Right Architecture Archetype Badge */}
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
              SYS ARCHITECTURE // PIPELINE
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 150,
              left: 70,
              width: 940,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: headlineFontSize > 40 ? 40 : headlineFontSize,
                color: '#0A0A0A',
                lineHeight: 1.22,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                maxWidth: 900,
              }}
            >
              {headline}
            </div>
          </div>

          {/* Unified Architectural Pipeline Chassis */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 260,
              left: 70,
              width: 940,
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              border: '1.5px solid #CBD5E1',
              padding: '24px 22px 20px 22px',
              boxShadow: '0 12px 36px rgba(0, 122, 85, 0.06)',
            }}
          >
            {/* Top Pipeline Diagnostic Metadata Rail */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 14,
                borderBottom: '1px solid #CBD5E1',
                marginBottom: 18,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#007A55' }} />
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
                  PIPELINE ARCHITECTURE SPECIFICATION // 4-TIER FLOW
                </span>
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#64748B', letterSpacing: '1px' }}>
                STATUS: DECOUPLED
              </span>
            </div>

            {/* 4 Connected Pipeline Stages */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              {/* STAGE 01 */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: 196,
                  height: 350,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  border: '1.5px solid #CBD5E1',
                  borderTop: '5px solid #0F172A',
                  padding: '18px 14px 16px 14px',
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.05)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#0F172A',
                      backgroundColor: '#F1F5F9',
                      border: '1px solid #CBD5E1',
                      padding: '3px 8px',
                      borderRadius: 4,
                      letterSpacing: '1px',
                      alignSelf: 'flex-start',
                    }}
                  >
                    STAGE 01
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      fontFamily: 'Poppins',
                      fontWeight: 700,
                      fontSize: 19,
                      color: '#0F172A',
                      lineHeight: 1.25,
                      textTransform: 'uppercase',
                      letterSpacing: '0.4px',
                      marginTop: 12,
                      minHeight: 40,
                    }}
                  >
                    {data.architecture_step_1}
                  </div>
                  <div style={{ display: 'flex', width: 28, height: 2, backgroundColor: '#0F172A', opacity: 0.3, margin: '12px 0' }} />
                  <span
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 500,
                      fontSize: 17,
                      color: '#475569',
                      lineHeight: 1.4,
                    }}
                  >
                    {data.architecture_detail_1}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    fontFamily: 'monospace',
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: '#0F172A',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    padding: '3px 7px',
                    borderRadius: 4,
                    letterSpacing: '1px',
                  }}
                >
                  GATEWAY
                </div>
              </div>

              {/* FLOW CONNECTOR 1 -> 2 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36 }}>
                <svg width="36" height="20" viewBox="0 0 36 20" fill="none">
                  <line x1="0" y1="10" x2="24" y2="10" stroke="#007A55" strokeWidth="2.5" strokeOpacity="0.9" />
                  <polygon points="36,10 23,4 23,16" fill="#007A55" fillOpacity="1" />
                </svg>
              </div>

              {/* STAGE 02 */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: 196,
                  height: 350,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  border: '1.5px solid #CBD5E1',
                  borderTop: '5px solid #007A55',
                  padding: '18px 14px 16px 14px',
                  boxShadow: '0 4px 14px rgba(0, 122, 85, 0.05)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#007A55',
                      backgroundColor: 'rgba(0, 122, 85, 0.1)',
                      border: '1px solid rgba(0, 122, 85, 0.25)',
                      padding: '3px 8px',
                      borderRadius: 4,
                      letterSpacing: '1px',
                      alignSelf: 'flex-start',
                    }}
                  >
                    STAGE 02
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      fontFamily: 'Poppins',
                      fontWeight: 700,
                      fontSize: 19,
                      color: '#0F172A',
                      lineHeight: 1.25,
                      textTransform: 'uppercase',
                      letterSpacing: '0.4px',
                      marginTop: 12,
                      minHeight: 40,
                    }}
                  >
                    {data.architecture_step_2}
                  </div>
                  <div style={{ display: 'flex', width: 28, height: 2, backgroundColor: '#007A55', opacity: 0.5, margin: '12px 0' }} />
                  <span
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 500,
                      fontSize: 17,
                      color: '#475569',
                      lineHeight: 1.4,
                    }}
                  >
                    {data.architecture_detail_2}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    fontFamily: 'monospace',
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: '#007A55',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid rgba(0, 122, 85, 0.35)',
                    padding: '3px 7px',
                    borderRadius: 4,
                    letterSpacing: '1px',
                  }}
                >
                  EVENT BUS
                </div>
              </div>

              {/* FLOW CONNECTOR 2 -> 3 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36 }}>
                <svg width="36" height="20" viewBox="0 0 36 20" fill="none">
                  <line x1="0" y1="10" x2="24" y2="10" stroke="#007A55" strokeWidth="2.5" strokeOpacity="0.9" />
                  <polygon points="36,10 23,4 23,16" fill="#007A55" fillOpacity="1" />
                </svg>
              </div>

              {/* STAGE 03 */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: 196,
                  height: 350,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  border: '1.5px solid #CBD5E1',
                  borderTop: '5px solid #064E3B',
                  padding: '18px 14px 16px 14px',
                  boxShadow: '0 4px 14px rgba(6, 78, 59, 0.05)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#064E3B',
                      backgroundColor: 'rgba(6, 78, 59, 0.1)',
                      border: '1px solid rgba(6, 78, 59, 0.25)',
                      padding: '3px 8px',
                      borderRadius: 4,
                      letterSpacing: '1px',
                      alignSelf: 'flex-start',
                    }}
                  >
                    STAGE 03
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      fontFamily: 'Poppins',
                      fontWeight: 700,
                      fontSize: 19,
                      color: '#0F172A',
                      lineHeight: 1.25,
                      textTransform: 'uppercase',
                      letterSpacing: '0.4px',
                      marginTop: 12,
                      minHeight: 40,
                    }}
                  >
                    {data.architecture_step_3}
                  </div>
                  <div style={{ display: 'flex', width: 28, height: 2, backgroundColor: '#064E3B', opacity: 0.5, margin: '12px 0' }} />
                  <span
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 500,
                      fontSize: 17,
                      color: '#475569',
                      lineHeight: 1.4,
                    }}
                  >
                    {data.architecture_detail_3}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    fontFamily: 'monospace',
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: '#064E3B',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid rgba(6, 78, 59, 0.35)',
                    padding: '3px 7px',
                    borderRadius: 4,
                    letterSpacing: '1px',
                  }}
                >
                  PERSISTENCE
                </div>
              </div>

              {/* FLOW CONNECTOR 3 -> 4 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36 }}>
                <svg width="36" height="20" viewBox="0 0 36 20" fill="none">
                  <line x1="0" y1="10" x2="24" y2="10" stroke="#007A55" strokeWidth="2.5" strokeOpacity="0.9" />
                  <polygon points="36,10 23,4 23,16" fill="#007A55" fillOpacity="1" />
                </svg>
              </div>

              {/* STAGE 04 */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: 196,
                  height: 350,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  border: '1.5px solid #CBD5E1',
                  borderTop: '5px solid #059669',
                  padding: '18px 14px 16px 14px',
                  boxShadow: '0 4px 14px rgba(5, 150, 105, 0.05)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#059669',
                      backgroundColor: 'rgba(5, 150, 105, 0.1)',
                      border: '1px solid rgba(5, 150, 105, 0.25)',
                      padding: '3px 8px',
                      borderRadius: 4,
                      letterSpacing: '1px',
                      alignSelf: 'flex-start',
                    }}
                  >
                    STAGE 04
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      fontFamily: 'Poppins',
                      fontWeight: 700,
                      fontSize: 19,
                      color: '#0F172A',
                      lineHeight: 1.25,
                      textTransform: 'uppercase',
                      letterSpacing: '0.4px',
                      marginTop: 12,
                      minHeight: 40,
                    }}
                  >
                    {data.architecture_step_4}
                  </div>
                  <div style={{ display: 'flex', width: 28, height: 2, backgroundColor: '#059669', opacity: 0.5, margin: '12px 0' }} />
                  <span
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 500,
                      fontSize: 17,
                      color: '#475569',
                      lineHeight: 1.4,
                    }}
                  >
                    {data.architecture_detail_4}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    fontFamily: 'monospace',
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: '#059669',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid rgba(5, 150, 105, 0.35)',
                    padding: '3px 7px',
                    borderRadius: 4,
                    letterSpacing: '1px',
                  }}
                >
                  TELEMETRY
                </div>
              </div>
            </div>
          </div>

          {/* Flow Connector from Architecture Chassis to Specification */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 705,
              left: 70,
              width: 940,
              height: 30,
            }}
          >
            <svg width="18" height="30" viewBox="0 0 18 30" fill="none">
              <line x1="9" y1="0" x2="9" y2="20" stroke="#007A55" strokeWidth="2" strokeOpacity="0.5" />
              <polygon points="9,28 4,20 14,20" fill="#007A55" fillOpacity="0.8" />
            </svg>
          </div>

          {/* Integrated Architecture Specification Plate */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 735,
              left: 70,
              width: 940,
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              border: '1.5px solid #007A55',
              padding: '16px 32px',
              alignItems: 'center',
              boxShadow: '0 4px 16px rgba(0, 122, 85, 0.06)',
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
                marginBottom: 4,
              }}
            >
              ARCHITECTURAL PRINCIPLE // SYSTEM SPECIFICATION
            </span>
            <span
              style={{
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontStyle: 'italic',
                fontSize: 20,
                color: '#1E293B',
                textAlign: 'center',
                letterSpacing: '0.3px',
                lineHeight: 1.4,
              }}
            >
              "{data.architecture_summary}"
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
      {/* VARIANT 2: Asymmetric Systems Monograph (Left Summary & Headline -> Right 4-Tier Blueprint Stack) */}
      {activeVariant === 'v2' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* G2 Framing: Thin Architectural Corner Brackets */}
          <GeometryCornerBracket color="#007A55" armLength={60} opacity={0.32} position="all" />

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
              ARCHITECTURE // 02
            </span>
          </div>

          {/* Left Column: Headline & Architecture Summary Plate */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 175,
              left: 80,
              width: 420,
              justifyContent: 'space-between',
              height: 680,
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
                SYSTEM TOPOLOGY
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
            {/* Layered Architectural Planes: 3 stacked offset planes suggesting decoupled system tiers */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: 170,
                position: 'relative',
                margin: '12px 0',
              }}
            >
              <svg width="420" height="170" viewBox="0 0 420 170" fill="none">
                {/* Vertical Interconnecting Data Pins */}
                <line x1="85" y1="46" x2="85" y2="64" stroke="#007A55" strokeWidth="1.8" strokeOpacity="0.45" strokeDasharray="3 3" />
                <line x1="280" y1="96" x2="280" y2="114" stroke="#007A55" strokeWidth="1.8" strokeOpacity="0.45" strokeDasharray="3 3" />

                {/* Layer 1: Ingress / Presentation Plane */}
                <rect
                  x="20"
                  y="14"
                  width="330"
                  height="34"
                  rx="6"
                  fill="#007A55"
                  fillOpacity="0.04"
                  stroke="#007A55"
                  strokeWidth="1.4"
                  strokeOpacity="0.28"
                />
                <line x1="38" y1="31" x2="75" y2="31" stroke="#007A55" strokeWidth="2" strokeOpacity="0.50" strokeLinecap="round" />

                {/* Layer 2: Core Domain / Event Plane (Offset) */}
                <rect
                  x="48"
                  y="64"
                  width="330"
                  height="34"
                  rx="6"
                  fill="#007A55"
                  fillOpacity="0.06"
                  stroke="#007A55"
                  strokeWidth="1.5"
                  strokeOpacity="0.36"
                />
                <line x1="66" y1="81" x2="115" y2="81" stroke="#007A55" strokeWidth="2" strokeOpacity="0.60" strokeLinecap="round" />

                {/* Layer 3: Persistence / Telemetry Plane (Offset) */}
                <rect
                  x="76"
                  y="114"
                  width="330"
                  height="34"
                  rx="6"
                  fill="#007A55"
                  fillOpacity="0.08"
                  stroke="#007A55"
                  strokeWidth="1.6"
                  strokeOpacity="0.45"
                />
                <line x1="94" y1="131" x2="150" y2="131" stroke="#007A55" strokeWidth="2" strokeOpacity="0.70" strokeLinecap="round" />
              </svg>
            </div>

            {/* Architecture Summary Plate */}
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
                justifyContent: 'space-between',
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
                ARCHITECTURAL PRINCIPLE
              </span>
              <span
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  fontSize: 20,
                  color: '#1E293B',
                  lineHeight: 1.4,
                }}
              >
                "{data.architecture_summary}"
              </span>
              <div style={{ display: 'flex', width: '100%', height: 1, backgroundColor: '#E2E8F0', margin: '14px 0 8px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#64748B', letterSpacing: '1px' }}>
                  SPEC: DECOUPLED TOPOLOGY
                </span>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[45, 25, 60].map((w, idx) => (
                    <div key={`arch-tick-${idx}`} style={{ width: w, height: 3, backgroundColor: '#007A55', opacity: 0.35, borderRadius: 1 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Tier Vertical Blueprint Stack */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 175,
              left: 530,
              width: 470,
              gap: 12,
            }}
          >
            {steps.map((step, idx) => (
              <div
                key={`arch-v2-tier-${idx}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  border: '1.5px solid #E2E8F0',
                  borderTop: `4px solid ${step.bg === '#0F172A' ? '#007A55' : step.bg}`,
                  padding: '14px 20px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: '#007A55',
                      letterSpacing: '1.5px',
                    }}
                  >
                    STAGE 0{step.num} // {idx === 0 ? 'INGRESS' : idx === 1 ? 'EVENT BUS' : idx === 2 ? 'PERSISTENCE' : 'OBSERVABILITY'}
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      backgroundColor: '#F1F5F9',
                      color: '#007A55',
                      fontFamily: 'monospace',
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    0{step.num}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    fontSize: 20,
                    color: '#0F172A',
                    textTransform: 'uppercase',
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontFamily: 'Poppins',
                    fontWeight: 500,
                    fontSize: 17,
                    color: '#64748B',
                    lineHeight: 1.4,
                    marginTop: 4,
                  }}
                >
                  {step.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VARIANT 3: 2x2 Technical Grid Blueprint */}
      {activeVariant === 'v3' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Top Headline Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute',
              top: 130,
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
                marginBottom: 8,
              }}
            >
              2x2 TECHNICAL SUBSYSTEM BLUEPRINT
            </span>
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: headlineFontSize > 34 ? 34 : headlineFontSize,
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

          {/* 2x2 Grid of 4 Modular Cards */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              position: 'absolute',
              top: 285,
              left: 80,
              width: 920,
              gap: 20,
            }}
          >
            {steps.map((step, idx) => (
              <div
                key={`arch-grid-v3-${idx}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 450,
                  height: 235,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 14,
                  border: '1.5px solid #CBD5E1',
                  borderTop: '6px solid #007A55',
                  padding: '20px 24px',
                  boxShadow: '0 8px 24px rgba(0, 122, 85, 0.06)',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#007A55',
                        backgroundColor: 'rgba(0, 122, 85, 0.08)',
                        border: '1px solid rgba(0, 122, 85, 0.25)',
                        padding: '3px 8px',
                        borderRadius: 4,
                        letterSpacing: '1px',
                      }}
                    >
                      SUBSYSTEM 0{step.num}
                    </span>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 10,
                        fontWeight: 600,
                        color: '#64748B',
                        backgroundColor: '#F8FAFC',
                        padding: '2px 6px',
                        borderRadius: 4,
                      }}
                    >
                      {idx === 0 ? 'GATEWAY' : idx === 1 ? 'EVENT BUS' : idx === 2 ? 'DATA STORE' : 'OBSERVABILITY'}
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      fontFamily: 'Poppins',
                      fontWeight: 700,
                      fontSize: 20,
                      color: '#0F172A',
                      textTransform: 'uppercase',
                      lineHeight: 1.25,
                      marginBottom: 6,
                    }}
                  >
                    {step.title}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      fontFamily: 'Poppins',
                      fontWeight: 500,
                      fontSize: 18,
                      color: '#64748B',
                      lineHeight: 1.4,
                    }}
                  >
                    {step.detail}
                  </div>
                </div>

                <div style={{ display: 'flex', width: '100%', height: 1, backgroundColor: '#E2E8F0', marginTop: 4 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 9.5, color: '#94A3B8', letterSpacing: '1px' }}>
                    LINK: INTERCONNECT BUS
                  </span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="4" fill="#007A55" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Specification Bar */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 795,
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
                padding: '6px 20px',
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
                "{data.architecture_summary}"
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VARIANT 4: Central Core / Charcoal Topology Chassis */}
      {activeVariant === 'v4' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Central Deep Charcoal Canvas Chassis */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 155,
              left: 80,
              width: 920,
              height: 720,
              backgroundColor: '#0F172A',
              borderRadius: 18,
              border: '1.5px solid #1E293B',
              padding: '28px 32px',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.2)',
              justifyContent: 'space-between',
            }}
          >
            {/* Dark Chassis Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <IconLayers size={18} color="#86EFAC" strokeWidth={2.2} />
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
                  EVENT-DRIVEN TOPOLOGY // MESH-04
                </span>
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: 10.5, color: '#64748B', letterSpacing: '1px' }}>
                ARCHITECTURE MATRIX
              </span>
            </div>

            {/* Headline on Dark Canvas */}
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: headlineFontSize > 36 ? 36 : headlineFontSize,
                color: '#FFFFFF',
                lineHeight: 1.2,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                maxWidth: 850,
              }}
            >
              {headline}
            </div>

            {/* 4 Charcoal Subsystem Modules Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                margin: '12px 0',
              }}
            >
              {steps.map((step, idx) => (
                <div
                  key={`arch-dark-mod-${idx}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 200,
                    height: 280,
                    backgroundColor: '#1E293B',
                    borderRadius: 12,
                    border: '1px solid #334155',
                    borderTop: '4px solid #86EFAC',
                    padding: '16px 14px',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 10,
                        fontWeight: 700,
                        color: '#86EFAC',
                        letterSpacing: '1.5px',
                      }}
                    >
                      NODE 0{step.num}
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: 19,
                        color: '#FFFFFF',
                        textTransform: 'uppercase',
                        lineHeight: 1.2,
                        marginTop: 8,
                        minHeight: 36,
                      }}
                    >
                      {step.title}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: 17,
                        color: '#94A3B8',
                        lineHeight: 1.4,
                        marginTop: 6,
                      }}
                    >
                      {step.detail}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 122, 85, 0.25)',
                      borderRadius: 4,
                      padding: '4px 8px',
                    }}
                  >
                    <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#86EFAC', letterSpacing: '1px' }}>
                      ACTIVE
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Dark Chassis Footer Specification Plate */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                borderTop: '1px solid #334155',
                paddingTop: 12,
              }}
            >
              <span
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  fontSize: 20,
                  color: '#CBD5E1',
                  lineHeight: 1.4,
                  maxWidth: 700,
                }}
              >
                "{data.architecture_summary}"
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: 9.5, color: '#86EFAC', letterSpacing: '1.5px' }}>
                STATUS: VALIDATED
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
