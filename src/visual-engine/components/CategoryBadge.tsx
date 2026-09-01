import React from 'react';

export interface CategoryBadgeProps {
  text: string;
  style?: React.CSSProperties;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ text, style }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007953',
        borderRadius: 9999,
        paddingLeft: 34,
        paddingRight: 34,
        paddingTop: 10,
        paddingBottom: 10,
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: 'Poppins',
          fontWeight: 700,
          fontSize: 22,
          color: '#ffffff',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
        }}
      >
        {text}
      </span>
    </div>
  );
};
