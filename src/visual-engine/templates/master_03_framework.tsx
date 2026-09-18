import React from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { Footer } from '../components/Footer';
import { Background } from '../components/Background';
import { BackgroundFamilyVariant, Master03Payload } from '../renderer/types';
import { IconCheckCircle } from '../components/Icons';
import { GeometryStepConnector, GeometryCornerBracket } from '../components/Geometries';

export interface Master03Props {
  data: Master03Payload;
  backgroundVariant?: BackgroundFamilyVariant;
  bgDataUri?: string;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export const Master03Framework: React.FC<Master03Props> = ({
  data,
  backgroundVariant = 'base_light',
  bgDataUri,
  variant = 'v1',
}) => {
  const activeVariant = data.variant || variant;

  const headlineLen = data.framework_headline.length;
  const headlineFontSize = headlineLen > 60 ? 38 : headlineLen > 35 ? 44 : 48;

  const steps = [
    { num: '01', title: data.framework_step_1, desc: data.framework_description_1 },
    { num: '02', title: data.framework_step_2, desc: data.framework_description_2 },
    { num: '03', title: data.framework_step_3, desc: data.framework_description_3 },
  ];

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
         Archetype: 03 Framework (Sequential Methodology + Corner Brackets G2)
         Approved: 2026-09-12
         Do NOT modify this v1 composition in any future session —
         including "improvement" attempts, dead-space fixes, geometry
         swaps, or art-direction passes — without a SEPARATE, EXPLICIT
         founder re-approval for this specific archetype's v1.
         If asked to "improve all templates" or similar broad instructions
         in a future session, treat this v1 as OUT OF SCOPE by default
         unless the founder names this specific archetype/variant.
         ============================================================ */}
      {/* VARIANT 1: Canonical Sequential Methodology Cards with Step Connectors */}
      {activeVariant === 'v1' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Progressive Step Connectors linking the 3 sequential cards horizontally */}
          <GeometryStepConnector color="#007A55" opacity={0.65} />

<div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 195,
              left: 100,
              width: 880,
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
                maxWidth: 860,
              }}
            >
              {data.framework_headline}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 400,
              left: 80,
              width: 920,
              justifyContent: 'space-between',
            }}
          >
            {steps.map((s, idx) => (
              <div
                key={`step-card-${idx}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 285,
                  height: 365,
                  backgroundColor: '#007A55',
                  borderRadius: 16,
                  padding: '26px 22px',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  border: '1.5px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: '0 12px 32px rgba(0, 122, 85, 0.22)',
                }}
              >
                {/* Stage index & semantic icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginBottom: 16,
                    paddingLeft: 4,
                    paddingRight: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#86EFAC',
                      backgroundColor: 'rgba(134, 239, 172, 0.15)',
                      border: '1px solid rgba(134, 239, 172, 0.3)',
                      padding: '3px 8px',
                      borderRadius: 4,
                      letterSpacing: '1px',
                    }}
                  >
                    0{idx + 1} / 03
                  </span>
                  <IconCheckCircle size={22} color="#86EFAC" strokeWidth={2.2} />
                </div>

                <div
                  style={{
                    display: 'flex',
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    fontSize: 22,
                    color: '#ffffff',
                    lineHeight: 1.3,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    minHeight: 52,
                  }}
                >
                  {s.title}
                </div>
                <div
                  style={{
                    display: 'flex',
                    marginTop: 16,
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    fontSize: 20,
                    color: '#ffffff',
                    lineHeight: 1.4,
                    textAlign: 'center',
                  }}
                >
                  {s.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Progressive Sequence Track below cards */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 790,
              left: 80,
              width: 920,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Horizontal progression rail */}
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                top: 10,
                left: 0,
                width: 920,
                height: 1.5,
                backgroundColor: '#CBD5E1',
                opacity: 0.8,
              }}
            />

            {/* Stage Milestone 1 */}
            <div style={{ display: 'flex', width: 285, justifyContent: 'center', zIndex: 2 }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: '#007A55',
                  backgroundColor: '#F5F7F7',
                  padding: '2px 8px',
                  borderRadius: 4,
                  letterSpacing: '1.5px',
                }}
              >
                STAGE 01 // INITIATE
              </span>
            </div>

            {/* Stage Milestone 2 */}
            <div style={{ display: 'flex', width: 285, justifyContent: 'center', zIndex: 2 }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: '#007A55',
                  backgroundColor: '#F5F7F7',
                  padding: '2px 8px',
                  borderRadius: 4,
                  letterSpacing: '1.5px',
                }}
              >
                STAGE 02 // DECOUPLE
              </span>
            </div>

            {/* Stage Milestone 3 */}
            <div style={{ display: 'flex', width: 285, justifyContent: 'center', zIndex: 2 }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: '#007A55',
                  backgroundColor: '#F5F7F7',
                  padding: '2px 8px',
                  borderRadius: 4,
                  letterSpacing: '1.5px',
                }}
              >
                STAGE 03 // OBSERVE
              </span>
            </div>
          </div>

          {/* Framework Methodology Outcome Card */}
          {data.framework_summary && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: 830,
                left: 80,
                width: 920,
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                border: '1px solid #E2E8F0',
                padding: '16px 36px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#007A55',
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}
              >
                METHODOLOGY SPECIFICATION
              </span>
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  fontSize: 20,
                  color: '#0F172A',
                  textAlign: 'center',
                  lineHeight: 1.4,
                  maxWidth: 820,
                }}
              >
                {data.framework_summary}
              </div>
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
      {/* VARIANT 2: Editorial Asymmetric Progressive Bars (Vertical Flow with Step Connectors) */}
      {activeVariant === 'v2' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Architectural Frame Corner Brackets (G2) */}
          <GeometryCornerBracket color="#007A55" armLength={50} opacity={0.30} position="all" />
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
            <IconCheckCircle size={20} color="#007A55" strokeWidth={2.2} />
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
              FRAMEWORK // 02
            </span>
          </div>

          {/* Headline with Monospace Eyebrow */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 175,
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
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              SYSTEMATIC EXECUTION SEQUENCE
            </span>
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: headlineFontSize,
                color: '#0A0A0A',
                lineHeight: 1.22,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                maxWidth: 880,
              }}
            >
              {data.framework_headline}
            </div>
          </div>

          {/* Vertical Step Progression Connectors */}
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
              {/* Connector 1 -> 2 (gap between Card 1 bottom 442 and Card 2 top 472) */}
              <line x1="138" y1="442" x2="138" y2="462" stroke="#007A55" strokeWidth="2" strokeOpacity="0.65" />
              <polygon points="138,469 133,460 143,460" fill="#007A55" fillOpacity="0.85" />

              {/* Connector 2 -> 3 (gap between Card 2 bottom 584 and Card 3 top 614) */}
              <line x1="138" y1="584" x2="138" y2="604" stroke="#007A55" strokeWidth="2" strokeOpacity="0.65" />
              <polygon points="138,611 133,602 143,602" fill="#007A55" fillOpacity="0.85" />
            </svg>
          </div>

          {/* 3 Vertically Stacked Cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 330,
              left: 80,
              width: 920,
              gap: 30,
            }}
          >
            {steps.map((s, idx) => {
              const phaseLabels = ['PHASE 01 // DISCOVERY', 'PHASE 02 // DECOUPLING', 'PHASE 03 // TELEMETRY'];
              return (
                <div
                  key={`step-v2-${idx}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    height: 112,
                    paddingLeft: 24,
                    paddingRight: 28,
                    border: '1px solid #E2E8F0',
                    borderLeft: '8px solid #007A55',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.03)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Number Circle Badge */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: '#007A55',
                        color: '#FFFFFF',
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: 21,
                        marginRight: 22,
                        flexShrink: 0,
                      }}
                    >
                      {s.num}
                    </div>

                    {/* Step Title & Description */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div
                        style={{
                          display: 'flex',
                          fontFamily: 'Poppins',
                          fontWeight: 700,
                          fontSize: 22,
                          color: '#0F172A',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {s.title}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          fontFamily: 'Poppins',
                          fontWeight: 500,
                          fontSize: 20,
                          color: '#64748B',
                          lineHeight: 1.4,
                          marginTop: 4,
                          maxWidth: 560,
                        }}
                      >
                        {s.desc}
                      </div>
                    </div>
                  </div>

                  {/* Phase Milestone Pill */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#ECFDF5',
                      padding: '4px 12px',
                      borderRadius: 4,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 10.5,
                        fontWeight: 700,
                        color: '#007A55',
                        letterSpacing: '1.5px',
                      }}
                    >
                      {phaseLabels[idx]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Methodology Specification Outcome Card */}
          {data.framework_summary && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: 775,
                left: 80,
                width: 920,
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                border: '1px solid #E2E8F0',
                padding: '16px 32px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: '#007A55',
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}
              >
                METHODOLOGY SPECIFICATION
              </span>
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  fontSize: 20,
                  color: '#0F172A',
                  textAlign: 'center',
                  lineHeight: 1.4,
                  maxWidth: 820,
                }}
              >
                {data.framework_summary}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VARIANT 3: High-Contrast White Cards with Emerald Connectors */}
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
            <IconCheckCircle size={20} color="#007A55" strokeWidth={2.2} />
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
              FRAMEWORK // 03
            </span>
          </div>

          {/* Horizontal Step Connectors */}
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
              {[381, 698].map((gx, idx) => (
                <g key={`step-connector-v3-${idx}`}>
                  <line
                    x1={gx - 14}
                    y1={575}
                    x2={gx + 10}
                    y2={575}
                    stroke="#007A55"
                    strokeWidth={2.5}
                    strokeOpacity={0.85}
                  />
                  <polygon
                    points={`${gx + 16},575 ${gx + 9},571 ${gx + 9},579`}
                    fill="#007A55"
                    fillOpacity={0.95}
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Headline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute',
              top: 175,
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
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              SYSTEMATIC EXECUTION SEQUENCE
            </span>
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
              {data.framework_headline}
            </div>
          </div>

          {/* 3 Side-by-Side White Cards */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 395,
              left: 80,
              width: 920,
              justifyContent: 'space-between',
            }}
          >
            {steps.map((s, idx) => (
              <div
                key={`step-v3-${idx}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 285,
                  height: 360,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  padding: '28px 22px',
                  alignItems: 'center',
                  border: '1.5px solid #CBD5E1',
                  borderTop: '8px solid #007A55',
                  boxShadow: '0 10px 28px rgba(0, 122, 85, 0.07)',
                }}
              >
                {/* Header with index and semantic icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginBottom: 16,
                    paddingLeft: 4,
                    paddingRight: 4,
                  }}
                >
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
                    0{idx + 1} / 03
                  </span>
                  <IconCheckCircle size={20} color="#007A55" strokeWidth={2.2} />
                </div>

                <div
                  style={{
                    display: 'flex',
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    fontSize: 22,
                    color: '#0A0A0A',
                    lineHeight: 1.3,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    minHeight: 50,
                  }}
                >
                  {s.title}
                </div>
                <div
                  style={{
                    display: 'flex',
                    marginTop: 14,
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    fontSize: 20,
                    color: '#475569',
                    lineHeight: 1.4,
                    textAlign: 'center',
                  }}
                >
                  {s.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Sequence Track below cards */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 780,
              left: 80,
              width: 920,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                top: 10,
                left: 0,
                width: 920,
                height: 1.5,
                backgroundColor: '#CBD5E1',
                opacity: 0.8,
              }}
            />
            {['STAGE 01 // DISCOVERY', 'STAGE 02 // DECOUPLING', 'STAGE 03 // TELEMETRY'].map((lbl, idx) => (
              <div key={`milestone-v3-${idx}`} style={{ display: 'flex', width: 285, justifyContent: 'center', zIndex: 2 }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 10.5,
                    fontWeight: 700,
                    color: '#007A55',
                    backgroundColor: '#F5F7F7',
                    padding: '2px 8px',
                    borderRadius: 4,
                    letterSpacing: '1.5px',
                  }}
                >
                  {lbl}
                </span>
              </div>
            ))}
          </div>

          {/* Methodology Specification Outcome Card */}
          {data.framework_summary && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: 825,
                left: 80,
                width: 920,
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                border: '1px solid #E2E8F0',
                padding: '14px 32px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: '#007A55',
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}
              >
                METHODOLOGY SPECIFICATION
              </span>
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  fontSize: 20,
                  color: '#0F172A',
                  textAlign: 'center',
                  lineHeight: 1.4,
                  maxWidth: 820,
                }}
              >
                {data.framework_summary}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VARIANT 4: Dark Charcoal Technical Cards with High-Contrast Emerald Connectors */}
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
            <IconCheckCircle size={20} color="#007A55" strokeWidth={2.2} />
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
              FRAMEWORK // 04
            </span>
          </div>

          {/* High-Contrast Horizontal Step Connectors */}
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
              {[381, 698].map((gx, idx) => (
                <g key={`step-connector-v4-${idx}`}>
                  <line
                    x1={gx - 14}
                    y1={575}
                    x2={gx + 10}
                    y2={575}
                    stroke="#007A55"
                    strokeWidth={2.2}
                    strokeOpacity={0.75}
                  />
                  <polygon
                    points={`${gx + 16},575 ${gx + 9},571 ${gx + 9},579`}
                    fill="#007A55"
                    fillOpacity={0.9}
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Top Headline */}
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
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 11,
                fontWeight: 700,
                color: '#007A55',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              TECHNICAL DECOUPLING BLUEPRINT
            </span>
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: headlineFontSize > 42 ? 42 : headlineFontSize,
                color: '#0A0A0A',
                lineHeight: 1.22,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                maxWidth: 880,
              }}
            >
              {data.framework_headline}
            </div>
          </div>

          {/* 3 Deep Dark Technical Stage Columns (y: 265 to y: 745, 470px tall) */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 265,
              left: 80,
              width: 920,
              justifyContent: 'space-between',
            }}
          >
            {steps.map((s, idx) => (
              <div
                key={`step-v4-${idx}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 290,
                  height: 470,
                  backgroundColor: '#0F172A',
                  borderRadius: 18,
                  padding: '24px 20px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1.5px solid #334155',
                  boxShadow: '0 12px 32px rgba(15, 23, 42, 0.2)',
                }}
              >
                {/* Header with index and emerald outline icon */}
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      marginBottom: 16,
                      paddingLeft: 4,
                      paddingRight: 4,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#86EFAC',
                        backgroundColor: 'rgba(134, 239, 172, 0.15)',
                        border: '1px solid rgba(134, 239, 172, 0.3)',
                        padding: '3px 8px',
                        borderRadius: 4,
                        letterSpacing: '1px',
                      }}
                    >
                      0{idx + 1} / 03
                    </span>
                    <IconCheckCircle size={20} color="#86EFAC" strokeWidth={2.2} />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      fontFamily: 'Poppins',
                      fontWeight: 700,
                      fontSize: 22,
                      color: '#FFFFFF',
                      lineHeight: 1.25,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      minHeight: 50,
                    }}
                  >
                    {s.title}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      marginTop: 14,
                      fontFamily: 'Poppins',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      fontSize: 20,
                      color: '#94A3B8',
                      lineHeight: 1.4,
                      textAlign: 'center',
                    }}
                  >
                    {s.desc}
                  </div>
                </div>

                {/* Sub-stage Progress Gauge */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    paddingTop: 14,
                    borderTop: '1px solid #1E293B',
                    gap: 6,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#86EFAC', fontWeight: 700 }}>
                      STAGE 0{idx + 1}
                    </span>
                    <span style={{ fontFamily: 'monospace', fontSize: 9.5, color: '#94A3B8', fontWeight: 600 }}>
                      {idx === 0 ? 'DISCOVERY' : idx === 1 ? 'DECOUPLING' : 'TELEMETRY'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', width: '100%', height: 4, backgroundColor: '#1E293B', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${(idx + 1) * 33.3}%`, height: '100%', backgroundColor: '#86EFAC', borderRadius: 2 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full-Width Dark Methodology Foundation Plane (Anchoring y: 760 to y: 920, 160px tall) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 760,
              left: 80,
              width: 920,
              height: 160,
              backgroundColor: '#0F172A',
              borderRadius: 18,
              border: '1.5px solid #334155',
              borderTop: '5px solid #86EFAC',
              padding: '16px 24px',
              justifyContent: 'space-between',
              boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 8,
                borderBottom: '1px solid #1E293B',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#86EFAC' }} />
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
                  METHODOLOGY SPECIFICATION // CONTINUOUS PRODUCTION DEPLOYMENT
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10,
                  fontWeight: 600,
                  color: '#94A3B8',
                  letterSpacing: '1px',
                }}
              >
                SYS-PROTOCOL
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontSize: 20,
                color: '#FFFFFF',
                textAlign: 'center',
                justifyContent: 'center',
                lineHeight: 1.4,
                maxWidth: 870,
                margin: 'auto',
              }}
            >
              {data.framework_summary || 'Multi-stage deterministic architectural transition guaranteeing zero operational regression.'}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 8,
                borderTop: '1px solid #1E293B',
              }}
            >
              <div style={{ display: 'flex', gap: 20 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#94A3B8' }}>
                  STAGE 01: <strong style={{ color: '#FFFFFF' }}>DISCOVERY</strong>
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#94A3B8' }}>
                  STAGE 02: <strong style={{ color: '#86EFAC' }}>DECOUPLING</strong>
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#94A3B8' }}>
                  STAGE 03: <strong style={{ color: '#86EFAC' }}>TELEMETRY</strong>
                </span>
              </div>

              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {[50, 30, 75, 40].map((w, idx) => (
                  <div
                    key={`fw-v4-datum-${idx}`}
                    style={{
                      display: 'flex',
                      width: w,
                      height: 4,
                      backgroundColor: '#86EFAC',
                      opacity: 0.35,
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
      <Footer urlText="DigiXPro.in" />
    </div>
  );
};
