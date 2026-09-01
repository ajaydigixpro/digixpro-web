import React from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { CategoryBadge } from '../components/CategoryBadge';
import { Footer } from '../components/Footer';
import { Background } from '../components/Background';
import { LogoFit } from '../components/LogoFit';
import { ClientPhoto } from '../components/ClientPhoto';
import { BackgroundFamilyVariant, Master10Payload } from '../renderer/types';

export interface Master10Props {
  data: Master10Payload;
  backgroundVariant?: BackgroundFamilyVariant;
  bgDataUri?: string;
  clientPhotoUri?: string;
  clientLogoUri?: string;
}

export const Master10Testimonial: React.FC<Master10Props> = ({
  data,
  backgroundVariant = 'radial_focus',
  bgDataUri,
  clientPhotoUri,
  clientLogoUri,
}) => {
  const badgeText = data.category_badge_text || 'TESTIMONIAL';

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
          top: 205,
          left: 100,
          width: 880,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: 44,
            color: '#000000',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          TESTIMONIAL
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: 300,
          left: 170,
          width: 740,
          height: 490,
          borderRadius: 16,
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          border: '1.5px solid #d1fae5',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div
          style={{
            display: 'flex',
            height: 140,
            backgroundColor: '#007953',
            padding: '24px 32px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {clientPhotoUri && (
              <div style={{ display: 'flex', marginRight: 20 }}>
                <ClientPhoto
                  photoSrc={clientPhotoUri}
                  sizePx={82}
                  style={{ border: '2.5px solid #ffffff', borderRadius: 9999 }}
                />
              </div>
            )}
            {clientLogoUri && (
              <div style={{ display: 'flex', marginRight: 20, backgroundColor: '#ffffff', padding: '6px 12px', borderRadius: 8 }}>
                <LogoFit
                  logoSrc={clientLogoUri}
                  maxWidth={140}
                  maxHeight={65}
                  aspectRatio={2.1}
                />
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: 24,
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {data.client_name}
              </div>
              <div
                style={{
                  display: 'flex',
                  marginTop: 4,
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  fontSize: 17,
                  color: '#a7f3d0',
                  textTransform: 'uppercase',
                }}
              >
                {data.company_role}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              fontFamily: 'Poppins',
              fontWeight: 700,
              fontSize: 54,
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: 1,
            }}
          >
            "
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flex: 1,
            backgroundColor: '#f8fafc',
            padding: '36px 44px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: 'Poppins',
              fontWeight: 500,
              fontSize: 22,
              color: '#1e293b',
              lineHeight: 1.45,
              textAlign: 'center',
            }}
          >
            {'"' + data.quote + '"'}
          </div>
        </div>
      </div>

      {data.optional_context && (
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
              color: '#475569',
              textAlign: 'center',
              letterSpacing: '1px',
            }}
          >
            {data.optional_context}
          </div>
        </div>
      )}

      <Footer urlText="DigiXPro.in" />
    </div>
  );
};
