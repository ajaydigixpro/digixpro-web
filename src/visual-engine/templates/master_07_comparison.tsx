import React from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { Footer } from '../components/Footer';
import { BackgroundFamilyVariant, Master07Payload } from '../renderer/types';
import { IconArrowRightLeft } from '../components/Icons';
import { GeometryPrecisionGrid, GeometrySplitAxis } from '../components/Geometries';

export interface Master07Props {
  data: Master07Payload;
  backgroundVariant?: BackgroundFamilyVariant;
  bgDataUri?: string;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export const Master07Comparison: React.FC<Master07Props> = ({ data, variant = 'v1' }) => {
  const activeVariant = data.variant || variant;
  const beforeHeading = data.before_heading || 'BEFORE';
  const afterHeading = data.after_heading || 'AFTER';

  const rows = [
    { before: data.before_point_1, after: data.after_point_1 },
    { before: data.before_point_2, after: data.after_point_2 },
    { before: data.before_point_3, after: data.after_point_3 },
  ];

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
      {/* Background Split for V1 (Locked Light Canvas) */}
      {activeVariant === 'v1' && (
        <>
          <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0, width: 540, height: 1080, backgroundColor: '#F5F7F7' }} />
          <div style={{ display: 'flex', position: 'absolute', top: 0, left: 540, width: 540, height: 1080, backgroundColor: '#ECEFEF' }} />
        </>
      )}

      {/* Background Split for V4 (Dual-Tone Field) */}
      {activeVariant === 'v4' && (
        <>
          <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0, width: 540, height: 1080, backgroundColor: '#0F172A' }} />
          <div style={{ display: 'flex', position: 'absolute', top: 0, left: 540, width: 540, height: 1080, backgroundColor: '#FFFFFF' }} />
        </>
      )}

      {/* Background for V2 and V3 */}
      {(activeVariant === 'v2' || activeVariant === 'v3') && (
        <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0, width: 1080, height: 1080, backgroundColor: activeVariant === 'v2' ? '#F5F7F7' : '#F8FAFC' }} />
      )}

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
        <BrandLogo theme={activeVariant === 'v4' ? 'light' : 'dark'} />
      </div>

      {/* ============================================================
         LOCKED — FOUNDER-APPROVED FINAL v1 DESIGN
         Archetype: 07 Comparison (Split Axis + Directional Connectors + G1 Precision Grid)
         Approved: 2026-09-12
         Do NOT modify this v1 composition in any future session —
         including "improvement" attempts, dead-space fixes, geometry
         swaps, or art-direction passes — without a SEPARATE, EXPLICIT
         founder re-approval for this specific archetype's v1.
         If asked to "improve all templates" or similar broad instructions
         in a future session, treat this v1 as OUT OF SCOPE by default
         unless the founder names this specific archetype/variant.
         ============================================================ */}
      {/* VARIANT 1: Canonical Split Half-and-Half (Visual System 2.0: G1 Precision Grid + IconArrowRightLeft) */}
      {activeVariant === 'v1' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Central Split-Axis: structural vertical line with directional before->after transformation arrows */}
          <GeometrySplitAxis color="#007A55" opacity={0.35} />

<div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 175,
              left: 80,
              width: 920,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: 42,
                color: '#0A0A0A',
                lineHeight: 1.2,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                maxWidth: 860,
              }}
            >
              {data.comparison_headline}
            </div>
            {data.client_project_type && (
              <div
                style={{
                  display: 'flex',
                  marginTop: 10,
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#007A55',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                {data.client_project_type}
              </div>
            )}
          </div>


          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 350,
              left: 80,
              width: 920,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Symmetrical Left Column Header Container */}
            <div
              style={{
                display: 'flex',
                width: 410,
                height: 72,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F1F5F9',
                borderRadius: 14,
                border: '1px solid #CBD5E1',
                padding: '8px 20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: 22,
                  color: '#475569',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}
              >
                {beforeHeading}
              </div>
            </div>

            {/* 1 semantic icon at the divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 54,
                height: 54,
                borderRadius: 27,
                backgroundColor: '#007A55',
                color: '#ffffff',
                boxShadow: '0 4px 14px rgba(0, 122, 85, 0.2)',
              }}
            >
              <IconArrowRightLeft size={22} color="#ffffff" strokeWidth={2.2} />
            </div>

            {/* Symmetrical Right Column Header Container */}
            <div
              style={{
                display: 'flex',
                width: 410,
                height: 72,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 122, 85, 0.08)',
                borderRadius: 14,
                border: '1.5px solid #007A55',
                padding: '8px 20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: 22,
                  color: '#007A55',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}
              >
                {afterHeading}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 460,
              left: 80,
              width: 920,
              gap: 24,
            }}
          >
            {rows.map((row, idx) => (
              <div
                key={`comp-row-${idx}`}
                style={{
                  display: 'flex',
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: 75,
                }}
              >
                {/* Symmetrical Left Row Separator */}
                <div
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 410,
                    height: 1.5,
                    backgroundColor: '#E2E8F0',
                  }}
                />

                <div
                  style={{
                    display: 'flex',
                    width: 410,
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: 'Poppins',
                    fontWeight: 500,
                    fontSize: 21,
                    color: '#0F172A',
                    textAlign: 'center',
                    lineHeight: 1.35,
                    paddingBottom: 8,
                  }}
                >
                  {row.before}
                </div>

                <div
                  style={{
                    display: 'flex',
                    width: 60,
                    height: 10,
                  }}
                />

                {/* Symmetrical Right Row Separator */}
                <div
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 410,
                    height: 1.5,
                    backgroundColor: '#E2E8F0',
                  }}
                />

                <div
                  style={{
                    display: 'flex',
                    width: 410,
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                    fontSize: 22,
                    color: '#064E3B',
                    textAlign: 'center',
                    lineHeight: 1.35,
                    paddingBottom: 8,
                  }}
                >
                  {row.after}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 110,
              left: 80,
              width: 920,
            }}
          >
            <span
              style={{
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontStyle: 'italic',
                fontSize: 22,
                color: '#0f172a',
                textAlign: 'center',
                letterSpacing: '0.8px',
                maxWidth: 860,
              }}
            >
              {data.comparison_summary}
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
      {/* VARIANT 2: Asymmetric Stepped Columns (Hierarchy & Architectural Shift) */}
      {activeVariant === 'v2' && (
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
              SYSTEM TRANSITION // SPEC 07
            </span>
          </div>

          {/* Headline & Project Context */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
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
                fontSize: 38,
                color: '#0A0A0A',
                lineHeight: 1.2,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                maxWidth: 840,
              }}
            >
              {data.comparison_headline}
            </div>
            {data.client_project_type && (
              <div
                style={{
                  display: 'flex',
                  marginTop: 8,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  fontSize: 13,
                  color: '#007A55',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                {`[ ${data.client_project_type} ]`}
              </div>
            )}
          </div>

          {/* Editorial Two-Column Comparison Surface */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 265,
              left: 80,
              width: 920,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            {/* Left Column: Feature-Led State (Restrained neutral tone) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 435,
                height: 545,
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                padding: '28px 24px',
                border: '1.5px solid #E2E8F0',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                position: 'relative',
              }}
            >
              {/* Top Accent Strip */}
              <div
                style={{
                  display: 'flex',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 432,
                  height: 6,
                  backgroundColor: '#94A3B8',
                  borderTopLeftRadius: 18,
                  borderTopRightRadius: 18,
                }}
              />

              {/* Column Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 18,
                  borderBottom: '1px solid #E2E8F0',
                  marginBottom: 20,
                  marginTop: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    fontSize: 17,
                    color: '#64748B',
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                  }}
                >
                  {beforeHeading}
                </span>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#94A3B8',
                    backgroundColor: '#F1F5F9',
                    border: '1px solid #E2E8F0',
                    padding: '4px 8px',
                    borderRadius: 4,
                    letterSpacing: '1px',
                  }}
                >
                  PREVIOUS
                </span>
              </div>

              {/* 3 Comparison Rows (Aligned Cards) */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                {rows.map((r, i) => (
                  <div
                    key={`v2-before-${i}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#F8FAFC',
                      borderRadius: 12,
                      padding: '18px 20px',
                      border: '1px solid #EEF2F6',
                      minHeight: 110,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        fontSize: 18,
                        color: '#94A3B8',
                        marginRight: 14,
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                    >
                      —
                    </span>
                    <span
                      style={{
                        fontFamily: 'Poppins',
                        fontWeight: 500,
                        fontSize: 19,
                        color: '#475569',
                        lineHeight: 1.4,
                      }}
                    >
                      {r.before}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Problem-Led State (Elevated recommendation surface, DigiXPro emerald accent) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 455,
                height: 545,
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                padding: '28px 24px',
                border: '1.5px solid #007A55',
                boxShadow: '0 8px 30px rgba(0, 122, 85, 0.08)',
                position: 'relative',
              }}
            >
              {/* Top Accent Strip */}
              <div
                style={{
                  display: 'flex',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 452,
                  height: 6,
                  backgroundColor: '#007A55',
                  borderTopLeftRadius: 18,
                  borderTopRightRadius: 18,
                }}
              />

              {/* Column Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 18,
                  borderBottom: '1px solid rgba(0, 122, 85, 0.15)',
                  marginBottom: 20,
                  marginTop: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    fontSize: 17,
                    color: '#007A55',
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                  }}
                >
                  {afterHeading}
                </span>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#007A55',
                    backgroundColor: 'rgba(0, 122, 85, 0.08)',
                    border: '1px solid rgba(0, 122, 85, 0.25)',
                    padding: '4px 8px',
                    borderRadius: 4,
                    letterSpacing: '1px',
                  }}
                >
                  RECOMMENDED
                </span>
              </div>

              {/* 3 Comparison Rows (Aligned Cards) */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                {rows.map((r, i) => (
                  <div
                    key={`v2-after-${i}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#F0FDF4',
                      borderRadius: 12,
                      padding: '18px 20px',
                      border: '1px solid rgba(0, 122, 85, 0.20)',
                      borderLeft: '5px solid #007A55',
                      minHeight: 110,
                      boxShadow: '0 2px 8px rgba(0, 122, 85, 0.03)',
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#007A55"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginRight: 14, flexShrink: 0 }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span
                      style={{
                        fontFamily: 'Poppins',
                        fontWeight: 600,
                        fontSize: 19,
                        color: '#0F172A',
                        lineHeight: 1.4,
                      }}
                    >
                      {r.after}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Editorial Synthesis / Comparison Summary Bar */}
          {data.comparison_summary && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: 835,
                left: 80,
                width: 920,
                minHeight: 76,
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                border: '1.5px solid #CBD5E1',
                padding: '18px 32px 18px 36px',
                boxShadow: '0 4px 16px rgba(0, 122, 85, 0.04)',
              }}
            >
              {/* Left Accent Bar */}
              <div
                style={{
                  display: 'flex',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 6,
                  height: 76,
                  backgroundColor: '#007A55',
                  borderTopLeftRadius: 13,
                  borderBottomLeftRadius: 13,
                }}
              />
              <span
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  fontSize: 20,
                  color: '#1E293B',
                  textAlign: 'center',
                  lineHeight: 1.4,
                }}
              >
                "{data.comparison_summary}"
              </span>
            </div>
          )}
        </div>
      )}

      {/* VARIANT 3: Stepped Modular Matrix (3 Horizontal Row Cards) */}
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
              MODULAR MATRIX // DXP-07
            </span>
          </div>

          {/* Headline */}
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
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: 38,
                color: '#0A0A0A',
                lineHeight: 1.2,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                maxWidth: 860,
              }}
            >
              {data.comparison_headline}
            </div>
          </div>

          {/* Matrix Column Titles */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              position: 'absolute',
              top: 245,
              left: 80,
              width: 920,
              padding: '0 20px',
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontWeight: 700,
                fontSize: 13,
                color: '#64748B',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {`[ ${beforeHeading} ]`}
            </span>
            <span
              style={{
                fontFamily: 'monospace',
                fontWeight: 700,
                fontSize: 13,
                color: '#007A55',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {`[ ${afterHeading} ]`}
            </span>
          </div>

          {/* 3 Horizontal Modular Cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 280,
              left: 80,
              width: 920,
              gap: 20,
            }}
          >
            {rows.map((row, idx) => (
              <div
                key={`matrix-row-${idx}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  height: 125,
                  padding: '20px 28px',
                  border: '1px solid #E2E8F0',
                  borderLeft: '6px solid #007A55',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  justifyContent: 'space-between',
                }}
              >
                {/* Left Legacy Zone */}
                <div style={{ display: 'flex', flexDirection: 'column', width: 380 }}>
                  <span
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 500,
                      fontSize: 19.5,
                      color: '#475569',
                      lineHeight: 1.4,
                    }}
                  >
                    {row.before}
                  </span>
                </div>

                {/* Center Transition Pill */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 38,
                    height: 38,
                    borderRadius: 19,
                    backgroundColor: 'rgba(0, 122, 85, 0.08)',
                    border: '1.5px solid #007A55',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007A55" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>

                {/* Right Target Zone */}
                <div style={{ display: 'flex', flexDirection: 'column', width: 380 }}>
                  <span
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 600,
                      fontSize: 20,
                      color: '#064E3B',
                      lineHeight: 1.4,
                    }}
                  >
                    {row.after}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Summary Plate */}
          {data.comparison_summary && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 735,
                left: 80,
                width: 920,
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: 14,
                padding: '16px 24px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              }}
            >
              <span
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  fontSize: 20,
                  color: '#334155',
                  textAlign: 'center',
                }}
              >
                {data.comparison_summary}
              </span>
            </div>
          )}
        </div>
      )}

      {/* VARIANT 4: Technical Dual-Tone Field (Dark Left / Light Right Split) */}
      {activeVariant === 'v4' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Central Vertical Datum Divider */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 0,
              left: 539,
              width: 2,
              height: 1008,
              backgroundColor: '#334155',
            }}
          />

          {/* Right Monospace Archetype Pill */}
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
              DUAL-PLANE SPEC // SPEC 07
            </span>
          </div>

          {/* Dual-Tone Headline Container */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 155,
              left: 80,
              width: 920,
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: 38,
                color: '#FFFFFF',
                lineHeight: 1.2,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                width: 430,
              }}
            >
              {data.comparison_headline}
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: 430,
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  fontSize: 12,
                  color: '#007A55',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: 4,
                }}
              >
                BENCHMARK EVALUATION
              </span>
              <span
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  fontSize: 19,
                  color: '#0F172A',
                  lineHeight: 1.35,
                }}
              >
                Architectural differential between legacy limitations and engineered target state.
              </span>
            </div>
          </div>

          {/* Column Headers */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 285,
              left: 80,
              width: 920,
              justifyContent: 'space-between',
            }}
          >
            {/* Dark Left Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 420,
                paddingBottom: 10,
                borderBottom: '1.5px solid #334155',
              }}
            >
              <span
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#94A3B8',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                {beforeHeading}
              </span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#F87171',
                  backgroundColor: 'rgba(248, 113, 113, 0.12)',
                  padding: '3px 8px',
                  borderRadius: 4,
                  letterSpacing: '1px',
                }}
              >
                DEFICIT
              </span>
            </div>

            {/* Light Right Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 420,
                paddingBottom: 10,
                borderBottom: '1.5px solid #007A55',
              }}
            >
              <span
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#007A55',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                {afterHeading}
              </span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#007A55',
                  backgroundColor: 'rgba(0, 122, 85, 0.08)',
                  padding: '3px 8px',
                  borderRadius: 4,
                  letterSpacing: '1px',
                }}
              >
                CAPACITY
              </span>
            </div>
          </div>

          {/* 3 Comparison Rows */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 345,
              left: 80,
              width: 920,
              gap: 20,
            }}
          >
            {rows.map((r, i) => (
              <div
                key={`v4-row-${i}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                {/* Left Card (Slate Charcoal) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    width: 420,
                    height: 110,
                    backgroundColor: '#1E293B',
                    borderRadius: 14,
                    padding: '20px 22px',
                    border: '1px solid #334155',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      fontSize: 16,
                      color: '#F87171',
                      marginRight: 10,
                      lineHeight: 1.2,
                    }}
                  >
                    —
                  </span>
                  <span
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 500,
                      fontSize: 20,
                      color: '#CBD5E1',
                      lineHeight: 1.4,
                    }}
                  >
                    {r.before}
                  </span>
                </div>

                {/* Center Vector Icon Badge bridging the datum */}
                <div
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    left: 440,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#007A55',
                    border: '3px solid #0F172A',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>

                {/* Right Card (Elevated White Surface) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    width: 420,
                    height: 110,
                    backgroundColor: '#F8FAFC',
                    borderRadius: 14,
                    padding: '20px 22px',
                    border: '1.5px solid #007A55',
                    borderLeft: '6px solid #007A55',
                    boxShadow: '0 4px 16px rgba(0, 122, 85, 0.06)',
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: '#007A55',
                      marginRight: 10,
                      lineHeight: 1.2,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 600,
                      fontSize: 20,
                      color: '#064E3B',
                      lineHeight: 1.4,
                    }}
                  >
                    {r.after}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Summary Bar */}
          {data.comparison_summary && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 110,
                left: 80,
                width: 920,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: 12,
                  padding: '14px 28px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                    fontStyle: 'italic',
                    fontSize: 20,
                    color: '#86EFAC',
                    textAlign: 'center',
                  }}
                >
                  {data.comparison_summary}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer Bar */}
      <Footer urlText="DigiXPro.in" />
    </div>
  );
};
