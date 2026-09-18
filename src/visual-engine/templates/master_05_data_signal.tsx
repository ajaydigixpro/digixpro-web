import React from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { CategoryBadge } from '../components/CategoryBadge';
import { Footer } from '../components/Footer';
import { Background } from '../components/Background';
import { BackgroundFamilyVariant, Master05Payload } from '../renderer/types';

export interface Master05Props {
  data: Master05Payload;
  backgroundVariant?: BackgroundFamilyVariant;
  bgDataUri?: string;
}

export const Master05DataSignal: React.FC<Master05Props> = ({
  data,
  backgroundVariant = 'signal_subtle',
  bgDataUri,
}) => {
  const badgeText = data.category_badge_text || 'DATA / SIGNAL';

  const headlineLen = data.data_headline.length;
  const headlineFontSize = headlineLen > 55 ? 40 : headlineLen > 30 ? 44 : 48;

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
          top: 380,
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
              color: '#007953',
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
              color: '#007953',
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
              color: '#007953',
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
            color: '#000000',
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
          top: 680,
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
            color: '#1e293b',
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
            top: 840,
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

      <Footer urlText="DigiXPro.in" />
    </div>
  );
};
