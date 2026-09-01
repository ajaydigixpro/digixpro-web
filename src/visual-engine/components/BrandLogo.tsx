import React from 'react';

export interface BrandLogoProps {
  style?: React.CSSProperties;
  theme?: 'dark' | 'light';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ style, theme = 'dark' }) => {
  const textColor = theme === 'light' ? '#ffffff' : '#000000';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        ...style,
      }}
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 100 100"
        fill="none"
        style={{ marginRight: 12 }}
      >
        <circle cx="50" cy="50" r="42" stroke="#009E73" strokeWidth="6" />
        <circle cx="35" cy="50" r="22" stroke="#22c55e" strokeWidth="5" />
        <circle cx="65" cy="50" r="22" stroke="#22c55e" strokeWidth="5" />
        <circle cx="50" cy="50" r="8" fill="#009E73" />
      </svg>
      <div
        style={{
          display: 'flex',
          fontFamily: 'Poppins',
          fontWeight: 700,
          fontSize: 38,
          color: textColor,
          letterSpacing: '-0.5px',
        }}
      >
        DigiXPro<span style={{ color: '#009E73' }}>.</span>
      </div>
    </div>
  );
};
