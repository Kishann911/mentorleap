import React from 'react';

export function Input({ className = '', ...props }: any) {
  return (
    <input
      className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all ${className}`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: 'white',
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = '#00e5ff';
        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
      }}
      {...props}
    />
  );
}

export function Textarea({ className = '', ...props }: any) {
  return (
    <textarea
      className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all ${className}`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: 'white',
        minHeight: '120px'
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = '#00e5ff';
        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
      }}
      {...props}
    />
  )
}
