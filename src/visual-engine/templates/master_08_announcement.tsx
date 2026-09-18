import React from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { Footer } from '../components/Footer';
import { Background } from '../components/Background';
import { LogoFit } from '../components/LogoFit';
import { BackgroundFamilyVariant, Master08Payload } from '../renderer/types';
import { IconMegaphone } from '../components/Icons';
import { GeometryNodeNetwork } from '../components/Geometries';

export interface Master08Props {
  data: Master08Payload;
  backgroundVariant?: BackgroundFamilyVariant;
  bgDataUri?: string;
  partnerLogoUri?: string;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export const Master08Announcement: React.FC<Master08Props> = ({
  data,
  backgroundVariant = 'announcement_subtle',
  bgDataUri,
  partnerLogoUri,
  variant = 'v1',
}) => {
  const activeVariant = data.variant || variant;

  const headlineLen = data.announcement_headline.length;
  const headlineFontSize = headlineLen > 50 ? 38 : headlineLen > 30 ? 44 : 50;

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
          top: 75,
          left: 80,
          alignItems: 'center',
        }}
      >
        <BrandLogo theme={activeVariant === 'v4' ? 'light' : 'dark'} />
      </div>

      {/* ============================================================
         LOCKED — FOUNDER-APPROVED FINAL v1 DESIGN
         Archetype: 08 Announcement (Ecosystem Topology + 7-Node Network)
         Approved: 2026-09-12
         Do NOT modify this v1 composition in any future session —
         including "improvement" attempts, dead-space fixes, geometry
         swaps, or art-direction passes — without a SEPARATE, EXPLICIT
         founder re-approval for this specific archetype's v1.
         If asked to "improve all templates" or similar broad instructions
         in a future session, treat this v1 as OUT OF SCOPE by default
         unless the founder names this specific archetype/variant.
         ============================================================ */}
      {/* VARIANT 1: Canonical Centered Announcement with Ecosystem Topology */}
      {activeVariant === 'v1' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Top-Right Announcement Archetype Badge */}
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
              ANNOUNCEMENT // ADVISORY
            </span>
          </div>

          {/* Scaled-up 7-Node Network vertically centered in safe gap (X: 360–980 [620px span], Y: 690–940 [250px span], Opacity 0.35, Stroke 2.5px) */}
          <GeometryNodeNetwork
            color="#007A55"
            opacity={0.35}
            strokeWidth={2.5}
            nodes={[
              { x: 360, y: 890, r: 8.5 },
              { x: 480, y: 750, r: 9 },
              { x: 610, y: 910, r: 8.5 },
              { x: 690, y: 690, r: 9.5 },
              { x: 820, y: 830, r: 9 },
              { x: 900, y: 710, r: 8.5 },
              { x: 980, y: 940, r: 10 },
            ]}
            connections={[
              [0, 1],
              [1, 2],
              [1, 3],
              [2, 3],
              [2, 4],
              [3, 4],
              [3, 5],
              [4, 5],
              [4, 6],
              [5, 6],
              [0, 2],
            ]}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 175,
              left: 100,
              width: 880,
            }}
          >
            {/* 1 semantic icon in header badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: 'rgba(0, 122, 85, 0.08)',
                marginBottom: 16,
              }}
            >
              <IconMegaphone size={26} color="#007A55" strokeWidth={2} />
            </div>

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
                maxWidth: 840,
              }}
            >
              {data.announcement_headline}
            </div>
            {data.announcement_subtitle && (
              <div
                style={{
                  display: 'flex',
                  marginTop: 12,
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: 20,
                  color: '#007A55',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}
              >
                {data.announcement_subtitle}
              </div>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 460,
              left: 100,
              width: 880,
            }}
          >
            {partnerLogoUri && (
              <div style={{ display: 'flex', marginBottom: 24 }}>
                <LogoFit
                  logoSrc={partnerLogoUri}
                  maxWidth={360}
                  maxHeight={110}
                  aspectRatio={2.5}
                />
              </div>
            )}

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontSize: 28,
                color: '#0F172A',
                lineHeight: 1.35,
                textAlign: 'center',
                maxWidth: 820,
              }}
            >
              {data.announcement_message}
            </div>

            {data.announcement_supporting_detail && (
              <div
                style={{
                  display: 'flex',
                  marginTop: 20,
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  fontSize: 24,
                  color: '#475569',
                  lineHeight: 1.4,
                  textAlign: 'center',
                  maxWidth: 780,
                }}
              >
                {data.announcement_supporting_detail}
              </div>
            )}
          </div>



          {data.announcement_date_context && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                top: 855,
                left: 80,
                gap: 6,
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
                }}
              >
                INITIATIVE RELEASE
              </span>
              <span
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#0F172A',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                {data.announcement_date_context}
              </span>
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
      {/* VARIANT 2: Asymmetric Executive Signal (Left Headline Anchor + Right Focal Container) */}
      {activeVariant === 'v2' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Top-Right Monospace Pill */}
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
              EXECUTIVE SIGNAL // SPEC 08
            </span>
          </div>

          {/* Left Column: Headline Anchor & Release Date */}
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
              [ OFFICIAL DISPATCH ]
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: headlineFontSize > 44 ? 42 : headlineFontSize,
                color: '#0A0A0A',
                lineHeight: 1.18,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {data.announcement_headline}
            </div>

            {data.announcement_subtitle && (
              <div
                style={{
                  display: 'flex',
                  marginTop: 14,
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: 20,
                  color: '#007A55',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                {data.announcement_subtitle}
              </div>
            )}

            {/* Stepped Accent Divider */}
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

            {data.announcement_date_context && (
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
                  RELEASE CONTEXT
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
                  {data.announcement_date_context}
                </span>
              </div>
            )}
          </div>

          {/* Lower-Left Advisory Node Network (G8 Announcement Family) */}
          <GeometryNodeNetwork
            nodes={[
              { x: 130, y: 830, r: 8 },
              { x: 230, y: 680, r: 8.5 },
              { x: 350, y: 810, r: 8 },
              { x: 440, y: 670, r: 9 },
            ]}
            connections={[
              [0, 1],
              [1, 2],
              [1, 3],
              [2, 3],
              [0, 2],
            ]}
            opacity={0.32}
            strokeWidth={2.2}
            color="#007A55"
          />

          {/* Right Column: Elevated Executive Message Panel */}
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
            {partnerLogoUri && (
              <div style={{ display: 'flex', marginBottom: 20 }}>
                <LogoFit
                  logoSrc={partnerLogoUri}
                  maxWidth={280}
                  maxHeight={80}
                  aspectRatio={2.5}
                />
              </div>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 16,
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
                EXECUTIVE BRIEFING
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontSize: 24,
                color: '#0F172A',
                lineHeight: 1.4,
              }}
            >
              {data.announcement_message}
            </div>

            {data.announcement_supporting_detail && (
              <div
                style={{
                  display: 'flex',
                  marginTop: 22,
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  fontSize: 20,
                  color: '#475569',
                  lineHeight: 1.4,
                }}
              >
                {data.announcement_supporting_detail}
              </div>
            )}

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
                STATUS: VERIFIED
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VARIANT 3: Institutional Dossier Card */}
      {activeVariant === 'v3' && (
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
              INSTITUTIONAL DOSSIER // DXP-08
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
              padding: '34px 48px 24px 48px',
              border: '1.5px solid #CBD5E1',
              borderTop: '8px solid #007A55',
              boxShadow: '0 16px 48px rgba(0,0,0,0.06)',
              justifyContent: 'space-between',
            }}
          >
            {/* Dossier Header Rail */}
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
                  OFFICIAL INITIATIVE ADVISORY
                </span>
              </div>
              {data.announcement_date_context && (
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
                  {data.announcement_date_context}
                </span>
              )}
            </div>

            {partnerLogoUri && (
              <div style={{ display: 'flex', margin: '4px 0' }}>
                <LogoFit
                  logoSrc={partnerLogoUri}
                  maxWidth={280}
                  maxHeight={75}
                  aspectRatio={2.5}
                />
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: headlineFontSize > 42 ? 40 : headlineFontSize,
                  color: '#0A0A0A',
                  lineHeight: 1.2,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  maxWidth: 820,
                }}
              >
                {data.announcement_headline}
              </div>

              {data.announcement_subtitle && (
                <div
                  style={{
                    display: 'flex',
                    marginTop: 8,
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    fontSize: 20,
                    color: '#007A55',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                  }}
                >
                  {data.announcement_subtitle}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  fontSize: 23,
                  color: '#0F172A',
                  lineHeight: 1.35,
                  textAlign: 'center',
                  maxWidth: 800,
                }}
              >
                {data.announcement_message}
              </div>

              {data.announcement_supporting_detail && (
                <div
                  style={{
                    display: 'flex',
                    marginTop: 10,
                    fontFamily: 'Poppins',
                    fontWeight: 500,
                    fontStyle: 'italic',
                    fontSize: 20,
                    color: '#475569',
                    lineHeight: 1.4,
                    textAlign: 'center',
                    maxWidth: 760,
                  }}
                >
                  {data.announcement_supporting_detail}
                </div>
              )}
            </div>

            {/* Advisory Scope & Execution Metadata Matrix (Eliminates interior emptiness) */}
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
                  ADVISORY DIRECTIVE SPECIFICATION
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 9.5, color: '#64748B', fontWeight: 600 }}>
                  CONFIDENTIAL / ENTERPRISE
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#007A55' }} />
                  <span style={{ fontFamily: 'monospace', fontSize: 9.5, color: '#334155', fontWeight: 600 }}>
                    SCOPE: ADVISORY CHARTER
                  </span>
                </div>
                <div style={{ display: 'flex', width: 1, height: 12, backgroundColor: '#CBD5E1' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#007A55' }} />
                  <span style={{ fontFamily: 'monospace', fontSize: 9.5, color: '#334155', fontWeight: 600 }}>
                    DEPLOYMENT: PHASED ROLLOUT
                  </span>
                </div>
                <div style={{ display: 'flex', width: 1, height: 12, backgroundColor: '#CBD5E1' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#007A55' }} />
                  <span style={{ fontFamily: 'monospace', fontSize: 9.5, color: '#007A55', fontWeight: 700 }}>
                    STATUS: RATIFIED
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
                VERIFIED ARCHITECTURAL PUBLICATION // DIGIXPRO ENTERPRISE
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
                RECORD #DXP-2026
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VARIANT 4: Midnight Dispatch (Deep Slate Technical Poster) */}
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
              MIDNIGHT DISPATCH // SPEC 08
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
                OFFICIAL SYSTEM BROADCAST
              </span>
              {data.announcement_date_context && (
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
                  {data.announcement_date_context}
                </span>
              )}
            </div>

            {partnerLogoUri && (
              <div style={{ display: 'flex', marginBottom: 20 }}>
                <LogoFit
                  logoSrc={partnerLogoUri}
                  maxWidth={280}
                  maxHeight={75}
                  aspectRatio={2.5}
                />
              </div>
            )}

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 800,
                fontSize: headlineFontSize,
                color: '#FFFFFF',
                lineHeight: 1.18,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                maxWidth: 820,
              }}
            >
              {data.announcement_headline}
            </div>

            {data.announcement_subtitle && (
              <div
                style={{
                  display: 'flex',
                  marginTop: 12,
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: 20,
                  color: '#86EFAC',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                {data.announcement_subtitle}
              </div>
            )}

            <div
              style={{
                display: 'flex',
                width: 240,
                height: 2,
                backgroundColor: '#334155',
                marginTop: 24,
                marginBottom: 24,
              }}
            />

            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontSize: 24,
                color: '#F8FAFC',
                lineHeight: 1.4,
                maxWidth: 780,
              }}
            >
              {data.announcement_message}
            </div>

            {data.announcement_supporting_detail && (
              <div
                style={{
                  display: 'flex',
                  marginTop: 18,
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  fontSize: 20,
                  color: '#94A3B8',
                  lineHeight: 1.4,
                  maxWidth: 760,
                }}
              >
                {data.announcement_supporting_detail}
              </div>
            )}

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
                SECURITY CLEARANCE: PUBLIC RELEASE
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
