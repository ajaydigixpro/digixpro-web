import React from 'react';

export interface FooterProps {
  urlText?: string;
  style?: React.CSSProperties;
}

export const Footer: React.FC<FooterProps> = ({ urlText = 'DigiXPro.in', style }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 1080,
        height: 72,
        backgroundColor: '#000000',
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: 'Poppins',
          fontWeight: 600,
          fontSize: 26,
          color: '#ffffff',
          letterSpacing: '0.5px',
        }}
      >
        {urlText}
      </span>
    </div>
  );
};
