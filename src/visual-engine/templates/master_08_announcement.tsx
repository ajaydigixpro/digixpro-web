import React from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { CategoryBadge } from '../components/CategoryBadge';
import { Footer } from '../components/Footer';
import { Background } from '../components/Background';
import { LogoFit } from '../components/LogoFit';
import { BackgroundFamilyVariant, Master08Payload } from '../renderer/types';

export interface Master08Props {
  data: Master08Payload;
  backgroundVariant?: BackgroundFamilyVariant;
  bgDataUri?: string;
  partnerLogoUri?: string;
}

export const Master08Announcement: React.FC<Master08Props> = ({
  data,
  backgroundVariant = 'announcement_subtle',
  bgDataUri,
  partnerLogoUri,
}) => {
  const badgeText = data.category_badge_text || 'ANNOUNCEMENT';

  const headlineLen = data.announcement_headline.length;
  const headlineFontSize = headlineLen > 50 ? 42 : headlineLen > 30 ? 46 : 50;

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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 210,
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
              fontSize: 22,
              color: '#0f172a',
              letterSpacing: '2.5px',
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
          top: 480,
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
            fontSize: 26,
            color: '#0f172a',
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
              marginTop: 22,
              fontFamily: 'Poppins',
              fontWeight: 500,
              fontStyle: 'italic',
              fontSize: 21,
              color: '#475569',
              lineHeight: 1.35,
              textAlign: 'center',
              maxWidth: 760,
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
            position: 'absolute',
            bottom: 110,
            left: 80,
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: 20,
            color: '#0f172a',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          {data.announcement_date_context}
        </div>
      )}

      <Footer urlText="DigiXPro.in" />
    </div>
  );
};
