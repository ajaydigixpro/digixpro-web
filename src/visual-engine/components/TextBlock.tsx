import React from 'react';

export interface TextBlockProps {
  text: string;
  fontSize?: number;
  fontWeight?: 400 | 500 | 600 | 700;
  color?: string;
  lineHeight?: number;
  letterSpacing?: string | number;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  textAlign?: 'left' | 'center' | 'right';
  maxWidth?: number;
  style?: React.CSSProperties;
}

export const TextBlock: React.FC<TextBlockProps> = ({
  text,
  fontSize = 32,
  fontWeight = 600,
  color = '#000000',
  lineHeight = 1.3,
  letterSpacing = 'normal',
  textTransform = 'none',
  textAlign = 'center',
  maxWidth,
  style,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        fontFamily: 'Poppins',
        fontSize,
        fontWeight,
        color,
        lineHeight,
        letterSpacing,
        textTransform,
        textAlign,
        maxWidth,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
