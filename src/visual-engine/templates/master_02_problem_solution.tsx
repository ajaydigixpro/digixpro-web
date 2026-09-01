import React from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { CategoryBadge } from '../components/CategoryBadge';
import { Footer } from '../components/Footer';
import { Background } from '../components/Background';
import { BackgroundFamilyVariant, Master02Payload } from '../renderer/types';

export interface Master02Props {
  data: Master02Payload;
  backgroundVariant?: BackgroundFamilyVariant;
  bgDataUri?: string;
}

export const Master02ProblemSolution: React.FC<Master02Props> = ({
  data,
  backgroundVariant = 'radial_focus',
  bgDataUri,
}) => {
  const badgeText = data.category_badge_text || 'AUTOMATION';

  const probLen = data.problem_headline.length;
  const solLen = data.solution_headline.length;
  const probFontSize = probLen > 65 ? 36 : probLen > 40 ? 42 : 46;
  const solFontSize = solLen > 65 ? 36 : solLen > 40 ? 42 : 46;

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
          top: 230,
          left: 100,
          width: 880,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: 22,
            color: '#0f172a',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          THE PROBLEM
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: probFontSize,
            color: '#000000',
            lineHeight: 1.22,
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            maxWidth: 840,
          }}
        >
          {data.problem_headline}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 14,
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: 20,
            color: '#475569',
            lineHeight: 1.35,
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            maxWidth: 780,
          }}
        >
          {data.problem_supporting_text}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 570,
          left: 100,
          width: 880,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: 22,
            color: '#0f172a',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          THE SOLUTION
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: solFontSize,
            color: '#000000',
            lineHeight: 1.22,
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            maxWidth: 840,
          }}
        >
          {data.solution_headline}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 14,
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: 20,
            color: '#475569',
            lineHeight: 1.35,
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            maxWidth: 780,
          }}
        >
          {data.solution_supporting_text}
        </div>
      </div>

      <Footer urlText="DigiXPro.in" />
    </div>
  );
};
