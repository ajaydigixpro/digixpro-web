import React from 'react';
import { BackgroundFamilyVariant } from '../renderer/types';

export interface BackgroundProps {
  variant?: BackgroundFamilyVariant;
  imageSrc?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

/**
 * DigiXPro Unified Background System (BackgroundFamily):
 * 100% Deterministic Code-Defined Primitives
 */
export const Background: React.FC<BackgroundProps> = ({
  variant = 'base_light',
  imageSrc,
  width = 1080,
  height = 1080,
  style,
}) => {
  if (imageSrc) {
    return (
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height,
          backgroundColor: '#f8fafc',
          ...style,
        }}
      >
        <img
          src={imageSrc}
          alt="Background"
          style={{ width, height, objectFit: 'cover' }}
        />
      </div>
    );
  }

  // Variant 1: base_light
  if (variant === 'base_light') {
    return (
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height,
          backgroundColor: '#f8fafc',
          backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 55%, #f1f5f9 100%)',
          ...style,
        }}
      >
        <svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" style={{ position: 'absolute', top: 0, left: 0 }}>
          <line x1="80" y1="150" x2="1000" y2="150" stroke="#e2e8f0" strokeWidth="1.2" strokeOpacity="0.9" />
          <line x1="80" y1="950" x2="1000" y2="950" stroke="#e2e8f0" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
      </div>
    );
  }

  // Variant 2: radial_focus
  if (variant === 'radial_focus') {
    return (
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height,
          backgroundColor: '#f8fafc',
          backgroundImage: 'radial-gradient(circle at 50% 38%, #ffffff 0%, #f8fafc 55%, #eef2f6 100%)',
          ...style,
        }}
      >
        <svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" style={{ position: 'absolute', top: 0, left: 0 }}>
          <circle cx="540" cy="400" r="320" stroke="#009E73" strokeWidth="1" strokeOpacity="0.07" />
          <circle cx="540" cy="400" r="450" stroke="#009E73" strokeWidth="1" strokeOpacity="0.04" />
          <line x1="80" y1="150" x2="1000" y2="150" stroke="#e2e8f0" strokeWidth="1.2" strokeOpacity="0.9" />
        </svg>
      </div>
    );
  }

  // Variant 3: geometric_subtle
  if (variant === 'geometric_subtle') {
    return (
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height,
          backgroundColor: '#f8fafc',
          backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 60%, #f1f5f9 100%)',
          ...style,
        }}
      >
        <svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" style={{ position: 'absolute', top: 0, left: 0 }}>
          <line x1="80" y1="150" x2="1000" y2="150" stroke="#e2e8f0" strokeWidth="1.2" strokeOpacity="0.9" />
          <line x1="80" y1="950" x2="1000" y2="950" stroke="#e2e8f0" strokeWidth="1" strokeOpacity="0.6" />
          <circle cx="80" cy="150" r="3" fill="#009E73" />
          <circle cx="1000" cy="150" r="3" fill="#009E73" />
          <circle cx="80" cy="950" r="2.5" fill="#94a3b8" />
          <circle cx="1000" cy="950" r="2.5" fill="#94a3b8" />
        </svg>
      </div>
    );
  }

  // Variant 4: pattern_subtle
  if (variant === 'pattern_subtle') {
    return (
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height,
          backgroundColor: '#f8fafc',
          backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 60%, #f1f5f9 100%)',
          ...style,
        }}
      >
        <svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" style={{ position: 'absolute', top: 0, left: 0 }}>
          <line x1="80" y1="150" x2="1000" y2="150" stroke="#e2e8f0" strokeWidth="1.2" strokeOpacity="0.9" />
          <circle cx="540" cy="150" r="3" fill="#009E73" fillOpacity="0.5" />
          <line x1="80" y1="950" x2="1000" y2="950" stroke="#e2e8f0" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
      </div>
    );
  }

  // Variant 5: editorial_desk_code
  if (variant === 'editorial_desk_code') {
    return (
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height,
          backgroundColor: '#f8fafc',
          backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 55%, #f1f5f9 100%)',
          ...style,
        }}
      >
        <svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" style={{ position: 'absolute', top: 0, left: 0 }}>
          <line x1="80" y1="150" x2="1000" y2="150" stroke="#e2e8f0" strokeWidth="1.2" strokeOpacity="0.9" />
          <g transform="translate(930, 145) scale(0.55)" stroke="#64748b" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 50 15 C 32 15 20 28 20 45 C 20 58 30 68 35 78 L 35 90 L 65 90 L 65 78 C 70 68 80 58 80 45 C 80 28 68 15 50 15 Z" />
            <path d="M 38 98 L 62 98" />
            <path d="M 42 106 L 58 106" />
            <path d="M 50 5 L 50 0" />
            <path d="M 22 18 L 16 12" />
            <path d="M 78 18 L 84 12" />
            <path d="M 10 45 L 3 45" />
            <path d="M 90 45 L 97 45" />
          </g>
          <line x1="80" y1="950" x2="1000" y2="950" stroke="#e2e8f0" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
      </div>
    );
  }

  // Variant 6: signal_subtle (Data / Signal)
  if (variant === 'signal_subtle') {
    return (
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height,
          backgroundColor: '#f8fafc',
          backgroundImage: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 45%, #ffffff 100%)',
          ...style,
        }}
      >
        <svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" style={{ position: 'absolute', top: 0, left: 0 }}>
          <circle cx="540" cy="450" r="380" stroke="#009E73" strokeWidth="1" strokeOpacity="0.08" />
          <line x1="80" y1="150" x2="1000" y2="150" stroke="#e2e8f0" strokeWidth="1.2" strokeOpacity="0.9" />
          <circle cx="130" cy="780" r="26" stroke="#007953" strokeWidth="2" strokeOpacity="0.4" fill="none" />
        </svg>
      </div>
    );
  }

  // Variant 7: announcement_subtle (Announcement)
  if (variant === 'announcement_subtle') {
    return (
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height,
          backgroundColor: '#f8fafc',
          backgroundImage: 'radial-gradient(circle at 75% 65%, #f1f5f9 0%, #f8fafc 60%, #ffffff 100%)',
          ...style,
        }}
      >
        <svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" style={{ position: 'absolute', top: 0, left: 0 }}>
          <circle cx="540" cy="400" r="320" stroke="#009E73" strokeWidth="1" strokeOpacity="0.07" />
          <line x1="80" y1="150" x2="1000" y2="150" stroke="#e2e8f0" strokeWidth="1.2" strokeOpacity="0.9" />
          <line x1="80" y1="950" x2="1000" y2="950" stroke="#e2e8f0" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
      </div>
    );
  }

  return null;
};
