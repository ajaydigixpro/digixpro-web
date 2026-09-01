import React from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { CategoryBadge } from '../components/CategoryBadge';
import { Footer } from '../components/Footer';
import { BackgroundFamilyVariant, Master07Payload } from '../renderer/types';

export interface Master07Props {
  data: Master07Payload;
  backgroundVariant?: BackgroundFamilyVariant;
  bgDataUri?: string;
}

export const Master07Comparison: React.FC<Master07Props> = ({ data }) => {
  const badgeText = data.category_badge_text || 'COMPARISON';
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
        backgroundColor: '#e2e8f0',
      }}
    >
      <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0, width: 540, height: 1080, backgroundColor: '#d4d4d8' }} />
      <div style={{ display: 'flex', position: 'absolute', top: 0, left: 540, width: 540, height: 1080, backgroundColor: '#a1a1aa' }} />

      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 75,
          left: 80,
          right: 80,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <BrandLogo theme="dark" />
        <CategoryBadge text={badgeText} />
      </div>

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
            fontSize: 44,
            color: '#000000',
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
              fontSize: 19,
              color: '#0f172a',
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
          top: 375,
          left: 80,
          width: 920,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 410,
            justifyContent: 'center',
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: 32,
            color: '#007953',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          {beforeHeading}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            borderRadius: 9999,
            backgroundColor: '#0f172a',
            color: '#ffffff',
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: '1px',
          }}
        >
          vs
        </div>

        <div
          style={{
            display: 'flex',
            width: 410,
            justifyContent: 'center',
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: 32,
            color: '#007953',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          {afterHeading}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: 480,
          left: 80,
          width: 920,
          gap: 28,
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
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: 410,
                height: 1.5,
                backgroundColor: '#94a3b8',
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
                fontSize: 21,
                color: '#0f172a',
                textAlign: 'center',
                lineHeight: 1.3,
                paddingBottom: 10,
              }}
            >
              {row.before}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 52,
                height: 52,
                borderRadius: 9999,
                backgroundColor: '#007953',
              }}
            />

            <div
              style={{
                display: 'flex',
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 410,
                height: 1.5,
                backgroundColor: '#cbd5e1',
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
                fontSize: 21,
                color: '#ffffff',
                textAlign: 'center',
                lineHeight: 1.3,
                paddingBottom: 10,
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
          top: 865,
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
            fontSize: 21,
            color: '#0f172a',
            textAlign: 'center',
            letterSpacing: '1.2px',
            maxWidth: 820,
          }}
        >
          {data.comparison_summary}
        </div>
      </div>

      <Footer urlText="DigiXPro.in" />
    </div>
  );
};
