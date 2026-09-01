import React from 'react';

export interface LogoFitProps {
  imageSrc?: string | null;
  logoSrc?: string | null;
  naturalWidth?: number;
  naturalHeight?: number;
  aspectRatio?: number;
  maxWidth: number;
  maxHeight: number;
  altText?: string;
  style?: React.CSSProperties;
}

export const LogoFit: React.FC<LogoFitProps> = ({
  imageSrc,
  logoSrc,
  naturalWidth = 1920,
  naturalHeight = 1080,
  maxWidth,
  maxHeight,
  altText = 'Partner Logo',
  style,
}) => {
  const resolvedSrc = imageSrc || logoSrc;
  if (!resolvedSrc) {
    return null;
  }

  const ratio = naturalWidth / naturalHeight;
  let targetWidth = maxWidth;
  let targetHeight = maxWidth / ratio;

  if (targetHeight > maxHeight) {
    targetHeight = maxHeight;
    targetWidth = maxHeight * ratio;
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: maxWidth,
        height: maxHeight,
        ...style,
      }}
    >
      <img
        src={resolvedSrc}
        alt={altText}
        style={{
          width: Math.round(targetWidth),
          height: Math.round(targetHeight),
          objectFit: 'contain',
        }}
      />
    </div>
  );
};
