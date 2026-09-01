import React from 'react';
import { Master01Payload, BackgroundFamilyVariant } from '../renderer/types';
import { BrandLogo } from '../components/BrandLogo';
import { CategoryBadge } from '../components/CategoryBadge';
import { Footer } from '../components/Footer';
import { Background } from '../components/Background';

export interface Master01Props {
  data: Master01Payload;
  backgroundVariant?: BackgroundFamilyVariant;
  bgDataUri?: string;
}

export const Master01Insight: React.FC<Master01Props> = ({
  data,
  backgroundVariant = 'editorial_desk_code',
  bgDataUri,
}) => {
  const headline = data.insight_headline;
  const supportingText = data.supporting_text;
  const badgeText = data.category_badge_text || 'INSIGHT';

  let headlineFontSize = 46;
  if (headline.length > 80) {
    headlineFontSize = 35;
  } else if (headline.length > 45) {
    headlineFontSize = 41;
  }

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
      {/* 1. Code-Defined Unified DigiXPro Background System */}
      <Background
        variant={backgroundVariant}
        imageSrc={bgDataUri}
        width={1080}
        height={1080}
      />

      {/* 2. Top Header Row */}
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

      {/* 3. Center Text Zone */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 230,
          left: 160,
          width: 760,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: headlineFontSize,
            color: '#000000',
            lineHeight: 1.24,
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            maxWidth: 740,
          }}
        >
          {headline}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: 20,
            color: '#1e293b',
            lineHeight: 1.4,
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1.2px',
            maxWidth: 700,
          }}
        >
          {supportingText}
        </div>
      </div>

      {/* 4. Footer Bar */}
      <Footer urlText="DigiXPro.in" />
    </div>
  );
};
