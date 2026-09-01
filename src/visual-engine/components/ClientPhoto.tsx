import React from 'react';

export interface ClientPhotoProps {
  imageSrc?: string | null;
  photoSrc?: string | null;
  size?: number;
  sizePx?: number;
  borderRadius?: number | string;
  style?: React.CSSProperties;
}

export const ClientPhoto: React.FC<ClientPhotoProps> = ({
  imageSrc,
  photoSrc,
  size = 120,
  sizePx,
  borderRadius = 9999,
  style,
}) => {
  const resolvedSrc = photoSrc || imageSrc;
  const resolvedSize = sizePx || size;
  if (!resolvedSrc) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: resolvedSize,
        height: resolvedSize,
        borderRadius: borderRadius,
        overflow: 'hidden',
        border: '3px solid #009E73',
        ...style,
      }}
    >
      <img
        src={resolvedSrc}
        alt="Client Photo"
        style={{
          width: resolvedSize,
          height: resolvedSize,
          objectFit: 'cover',
        }}
      />
    </div>
  );
};
