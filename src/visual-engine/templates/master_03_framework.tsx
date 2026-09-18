import React from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { CategoryBadge } from '../components/CategoryBadge';
import { Footer } from '../components/Footer';
import { Background } from '../components/Background';
import { BackgroundFamilyVariant, Master03Payload } from '../renderer/types';

export interface Master03Props {
  data: Master03Payload;
  backgroundVariant?: BackgroundFamilyVariant;
  bgDataUri?: string;
}

export const Master03Framework: React.FC<Master03Props> = ({
  data,
  backgroundVariant = 'base_light',
  bgDataUri,
}) => {
  const badgeText = data.category_badge_text || 'FRAMEWORK';

  const headlineLen = data.framework_headline.length;
  const headlineFontSize = headlineLen > 60 ? 38 : headlineLen > 35 ? 44 : 48;

  const steps = [
    { title: data.framework_step_1, desc: data.framework_description_1 },
    { title: data.framework_step_2, desc: data.framework_description_2 },
    { title: data.framework_step_3, desc: data.framework_description_3 },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 1080,
        height: 1080,
        position: 'relative',
        backgroundColor: '#f8fafc',
      }}
    >
      <Background variant={backgroundVariant} imageSrc={bgDataUri} width={1080} height={1080} />

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
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 200,
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
            color: '#000000',
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
          top: 420,
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
              width: 280,
              height: 340,
              backgroundColor: '#007953',
              borderRadius: 4,
              padding: '36px 22px',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: 21,
                color: '#ffffff',
                lineHeight: 1.3,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                minHeight: 56,
              }}
            >
              {s.title}
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 22,
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: 18,
                color: '#ffffff',
                lineHeight: 1.45,
                textAlign: 'center',
              }}
            >
              {s.desc}
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
          top: 840,
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
          {data.framework_summary}
        </div>
      </div>

      <Footer urlText="DigiXPro.in" />
    </div>
  );
};
