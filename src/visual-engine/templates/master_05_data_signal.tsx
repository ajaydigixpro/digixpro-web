import React from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { Footer } from '../components/Footer';
import { Background } from '../components/Background';
import { BackgroundFamilyVariant, Master05Payload } from '../renderer/types';
import { GeometryPrecisionGrid, GeometryMetricScale } from '../components/Geometries';
import { TriangleMotif } from '../components/TriangleMotif';

export interface Master05Props {
  data: Master05Payload;
  backgroundVariant?: BackgroundFamilyVariant;
  bgDataUri?: string;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export const Master05DataSignal: React.FC<Master05Props> = ({
  data,
  backgroundVariant = 'signal_subtle',
  bgDataUri,
  variant = 'v1',
}) => {
  const activeVariant = data.variant || variant;

  const headlineLen = data.data_headline.length;
  const headlineFontSize = headlineLen > 55 ? 38 : headlineLen > 30 ? 44 : 48;

  const metricLen = data.metric.length;
  const metricFontSize = metricLen > 10 ? 80 : metricLen > 6 ? 96 : 112;

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

      {/* ============================================================
         LOCKED — FOUNDER-APPROVED FINAL v1 DESIGN
         Archetype: 05 Data Signal (Bracketed Metric + Dot-Grid G1 + Measurement Marks)
         Approved: 2026-09-12
         Do NOT modify this v1 composition in any future session —
         including "improvement" attempts, dead-space fixes, geometry
         swaps, or art-direction passes — without a SEPARATE, EXPLICIT
         founder re-approval for this specific archetype's v1.
         If asked to "improve all templates" or similar broad instructions
         in a future session, treat this v1 as OUT OF SCOPE by default
         unless the founder names this specific archetype/variant.
         ============================================================ */}
      {/* VARIANT 1: Canonical Centered Bracketed Metric (Visual System 2.0: G1 Precision Grid, static divider rule, zero fabricated chart) */}
      {activeVariant === 'v1' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* G1: Precision Grid in Top-Right Corner (clearly visible at 25% opacity, 2.8px dots) */}
          <GeometryPrecisionGrid top={75} right={80} cols={6} rows={6} spacing={18} dotRadius={2.8} color="#007A55" opacity={0.25} />

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
                maxWidth: 840,
              }}
            >
              {data.data_headline}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 360,
              left: 140,
              width: 800,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: metricFontSize * 1.1,
                  color: '#007A55',
                  marginRight: 18,
                }}
              >
                [
              </div>
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: metricFontSize,
                  color: '#007A55',
                  letterSpacing: '-1px',
                  textAlign: 'center',
                }}
              >
                {data.metric}
              </div>
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: metricFontSize * 1.1,
                  color: '#007A55',
                  marginLeft: 18,
                }}
              >
                ]
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                marginTop: 10,
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: 22,
                color: '#0F172A',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              {data.metric_label}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 670,
              left: 100,
              width: 880,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontStyle: 'italic',
                fontSize: 22,
                color: '#064E3B',
                textAlign: 'center',
                lineHeight: 1.35,
                maxWidth: 780,
              }}
            >
              {data.short_context}
            </div>
          </div>

          {data.source_period_context && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 810,
                left: 100,
                width: 880,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  fontSize: 20,
                  color: '#64748b',
                  letterSpacing: '1.5px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                {'[ ' + data.source_period_context + ' ]'}
              </div>
            </div>
          )}

          {/* Full-Width Precision Dot-Grid: 32 cols x 5 rows, dotRadius 3.2px, opacity 0.30 */}
          <GeometryPrecisionGrid
            top={878}
            left={193}
            cols={32}
            rows={5}
            spacing={22}
            dotRadius={3.2}
            opacity={0.30}
            color="#007A55"
          />
        </div>
      )}

      {/* ============================================================
         LOCKED — FOUNDER-APPROVED FINAL v2 DESIGN
         Approved: 2026-09-12
         Do not modify this v2 composition in any future session without
         separate, explicit founder re-approval for this specific archetype's
         v2.
         ============================================================ */}
      {/* VARIANT 2: Asymmetric Editorial Monograph (Left Massive Typographic Metric -> Right Elevated Evidence Card) */}
      {activeVariant === 'v2' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
              DATA SIGNAL // 02
            </span>
          </div>

          {/* Left Column: Massive Metric Anchor */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 185,
              left: 80,
              width: 440,
              height: 680,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: 'rgba(0, 122, 85, 0.08)',
                  border: '1px solid rgba(0, 122, 85, 0.25)',
                  borderRadius: 4,
                  padding: '4px 10px',
                  marginBottom: 20,
                  alignSelf: 'flex-start',
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#007A55' }} />
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
                  EMPIRICAL METRIC // 02
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: metricFontSize > 96 ? 96 : metricFontSize,
                  color: '#007A55',
                  letterSpacing: '-2px',
                  lineHeight: 1,
                }}
              >
                {data.metric}
              </div>

              <div
                style={{
                  display: 'flex',
                  marginTop: 14,
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: 22,
                  color: '#0F172A',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                {data.metric_label}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 24 }}>
                <div style={{ width: 140, height: 3, backgroundColor: '#007A55', borderRadius: 1.5 }} />
                <div style={{ width: 70, height: 1.5, backgroundColor: '#007A55', opacity: 0.4 }} />
              </div>

              {/* Metric Calibration Scale (G1 Telemetry Family) */}
              <div style={{ display: 'flex', marginTop: 12 }}>
                <GeometryMetricScale width={240} opacity={0.35} color="#007A55" />
              </div>
            </div>

            {/* Empirical Data Signal Precision Grid (G1) */}
            <div
              style={{
                display: 'flex',
                position: 'relative',
                width: 380,
                height: 140,
                margin: '16px 0',
              }}
            >
              <GeometryPrecisionGrid
                top={0}
                left={0}
                cols={16}
                rows={6}
                spacing={24}
                dotRadius={2.5}
                opacity={0.22}
                color="#007A55"
              />
            </div>

            {data.source_period_context && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'monospace', fontSize: 10.5, color: '#64748B', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  MEASUREMENT AUDIT
                </span>
                <span style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 16, color: '#0F172A', marginTop: 4 }}>
                  {data.source_period_context}
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Elevated Analytical Evidence Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 185,
              left: 540,
              width: 460,
              height: 680,
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              border: '1.5px solid #CBD5E1',
              borderLeft: '8px solid #007A55',
              padding: '34px 36px',
              boxShadow: '0 16px 36px rgba(0, 122, 85, 0.06)',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#007A55',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}
              >
                ANALYTICAL INTERPRETATION
              </span>

              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: headlineFontSize > 38 ? 38 : headlineFontSize,
                  color: '#0F172A',
                  lineHeight: 1.25,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  marginBottom: 18,
                }}
              >
                {data.data_headline}
              </div>

              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontSize: 22,
                  color: '#334155',
                  lineHeight: 1.45,
                }}
              >
                {data.short_context}
              </div>
            </div>

            {/* Analytical Visual Anchor: Imported DigiXPro Triangle Motif SVG Asset */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                margin: '20px 0',
              }}
            >
              <TriangleMotif color="#6EE7B7" width={120} height={81} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <div style={{ width: '100%', height: 1, backgroundColor: '#E2E8F0', marginBottom: 12 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#64748B', letterSpacing: '1px' }}>
                  TELEMETRY: VERIFIED
                </span>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[40, 70, 30].map((w, idx) => (
                    <div key={`data-tick-${idx}`} style={{ width: w, height: 3.5, backgroundColor: '#007A55', opacity: 0.3, borderRadius: 1 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VARIANT 3: Technical Dossier Card with Precision Measurement Scale */}
      {activeVariant === 'v3' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Centered Precision Dossier Box */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute',
              top: 170,
              left: 80,
              width: 920,
              height: 750,
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              border: '1.5px solid #E2E8F0',
              borderTop: '8px solid #007A55',
              padding: '30px 40px 24px 40px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
              justifyContent: 'space-between',
            }}
          >
            {/* Header Stamp */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#007A55' }} />
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
                  VERIFIED TELEMETRY RECORD // DXP-SPEC-05
                </span>
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: 10.5, color: '#64748B', letterSpacing: '1.5px' }}>
                SIGNAL // 03
              </span>
            </div>

            {/* Headline */}
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: headlineFontSize > 38 ? 38 : headlineFontSize,
                color: '#0A0A0A',
                lineHeight: 1.22,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                maxWidth: 840,
              }}
            >
              {data.data_headline}
            </div>

            {/* Dedicated Telemetry Hero Band */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: metricFontSize + 6,
                  color: '#007A55',
                  letterSpacing: '-2px',
                  lineHeight: 1,
                }}
              >
                {data.metric}
              </div>
              <div
                style={{
                  display: 'flex',
                  marginTop: 10,
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: 20,
                  color: '#0F172A',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                {data.metric_label}
              </div>
              <div style={{ display: 'flex', marginTop: 10 }}>
                <GeometryMetricScale color="#007A55" width={240} opacity={0.5} />
              </div>
            </div>

            {/* Short Context */}
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontStyle: 'italic',
                fontSize: 22,
                color: '#334155',
                textAlign: 'center',
                lineHeight: 1.4,
                maxWidth: 800,
              }}
            >
              "{data.short_context}"
            </div>

            {/* Technical Calibration Plane (Eliminates interior and lower vacuum) */}
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
                <span style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 700, color: '#0F172A', letterSpacing: '1px' }}>
                  INSTRUMENT CALIBRATION SPECTRUM
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 9.5, color: '#007A55', fontWeight: 600 }}>
                  CONFIDENCE INTERVAL: 99.8%
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {['01 BASELINE', '02 SAMPLING', '03 MEDIAN', '04 DELTA', '05 ENFORCED'].map((stage, idx) => (
                  <div key={`calib-stage-${idx}`} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: idx === 4 ? '#007A55' : '#94A3B8' }} />
                    <span style={{ fontFamily: 'monospace', fontSize: 9.5, color: idx === 4 ? '#007A55' : '#64748B', fontWeight: idx === 4 ? 700 : 500 }}>
                      {stage}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Datum Row */}
            <div style={{ display: 'flex', width: '100%', height: 1, backgroundColor: '#E2E8F0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span style={{ fontFamily: 'monospace', fontSize: 10.5, color: '#64748B', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                {data.source_period_context ? `SOURCE: ${data.source_period_context}` : 'VERIFIED PRODUCTION TELEMETRY'}
              </span>
              <div style={{ display: 'flex', gap: 4 }}>
                {[50, 80, 40].map((w, idx) => (
                  <div key={`dossier-bar-${idx}`} style={{ width: w, height: 3.5, backgroundColor: '#007A55', opacity: 0.28, borderRadius: 1 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VARIANT 4: Midnight Data Signal (Deep Slate Technical Canvas) */}
      {activeVariant === 'v4' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Deep Slate Canvas Chassis */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 160,
              left: 80,
              width: 920,
              height: 755,
              backgroundColor: '#0F172A',
              borderRadius: 20,
              border: '1.5px solid #1E293B',
              padding: '32px 42px 24px 42px',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.2)',
              justifyContent: 'space-between',
            }}
          >
            {/* Header Stamp */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
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
                  PRODUCTION DATA SIGNAL // MESH-05
                </span>
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: 10.5, color: '#64748B', letterSpacing: '1.5px' }}>
                STATUS: ACTIVE
              </span>
            </div>

            {/* Headline */}
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: headlineFontSize > 38 ? 38 : headlineFontSize,
                color: '#FFFFFF',
                lineHeight: 1.22,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                maxWidth: 820,
              }}
            >
              {data.data_headline}
            </div>

            {/* Luminous Metric Display */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: metricFontSize + 12,
                  color: '#86EFAC',
                  letterSpacing: '-2px',
                  lineHeight: 1,
                }}
              >
                {data.metric}
              </div>
              <div
                style={{
                  display: 'flex',
                  marginTop: 10,
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: 22,
                  color: '#FFFFFF',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                {data.metric_label}
              </div>
            </div>

            {/* Short Context */}
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontStyle: 'italic',
                fontSize: 22,
                color: '#CBD5E1',
                lineHeight: 1.45,
                maxWidth: 800,
              }}
            >
              "{data.short_context}"
            </div>

            {/* Structured Telemetry Multi-Channel Bus (Eliminates bottom vacuum) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 12,
                border: '1px solid #1E293B',
                padding: '12px 20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#86EFAC' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#64748B', letterSpacing: '1px' }}>
                    CHANNEL 01
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: 10.5, color: '#F1F5F9', fontWeight: 600 }}>
                    STREAM AUDIT
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', width: 1, height: 24, backgroundColor: '#1E293B' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#007A55' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#64748B', letterSpacing: '1px' }}>
                    CHANNEL 02
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: 10.5, color: '#F1F5F9', fontWeight: 600 }}>
                    99.8% CONFIDENCE
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', width: 1, height: 24, backgroundColor: '#1E293B' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#86EFAC' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#64748B', letterSpacing: '1px' }}>
                    CHANNEL 03
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: 10.5, color: '#86EFAC', fontWeight: 600 }}>
                    ACTIVE PIPELINE
                  </span>
                </div>
              </div>
            </div>

            {/* Dark Datum Footer */}
            <div style={{ display: 'flex', width: '100%', height: 1, backgroundColor: '#1E293B' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#64748B', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                {data.source_period_context ? `VERIFIED AUDIT: ${data.source_period_context}` : 'EMPIRICAL BENCHMARK SPEC'}
              </span>
              <div style={{ display: 'flex', gap: 4 }}>
                {[60, 30, 90].map((w, idx) => (
                  <div key={`dark-bar-${idx}`} style={{ width: w, height: 3, backgroundColor: '#007A55', opacity: 0.5, borderRadius: 1 }} />
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
