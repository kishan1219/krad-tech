import React from 'react';

interface TechIconProps {
  className?: string;
}

export const TechBrandIcons: Record<string, React.FC<TechIconProps>> = {
  // React
  'React.js': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none" stroke="currentColor">
      <circle cx="0" cy="0" r="2.05" fill="currentColor" stroke="none" />
      <g strokeWidth="1">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),

  // Next.js
  'Next.js 15': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 180 180" className={className} fill="currentColor">
      <mask height="180" id="next-mask" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}>
        <circle cx="90" cy="90" fill="black" r="90" />
      </mask>
      <g mask="url(#next-mask)">
        <circle cx="90" cy="90" data-circle="true" fill="currentColor" r="90" />
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
        <rect fill="white" height="72" width="12" x="115" y="54" />
      </g>
    </svg>
  ),

  // TypeScript
  TypeScript: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 128 128" className={className} fill="currentColor">
      <path d="M1.5 0h125c.8 0 1.5.7 1.5 1.5v125c0 .8-.7 1.5-1.5 1.5H1.5c-.8 0-1.5-.7-1.5-1.5V1.5C0 .7.7 0 1.5 0z" fill="#3178C6" />
      <path d="M68.5 76.5c1.6 2.6 3.8 4.7 6.6 6.2 2.8 1.5 6.1 2.3 9.9 2.3 3.3 0 6.1-.6 8.4-1.8 2.3-1.2 4-2.8 5.1-4.9 1.1-2.1 1.7-4.5 1.7-7.1 0-2.6-.6-4.9-1.8-6.8-1.2-1.9-3-3.6-5.4-4.9-2.4-1.3-5.8-2.6-10.2-3.8-5.3-1.5-9.3-3-12-4.5-2.7-1.5-4.8-3.5-6.2-5.9-1.4-2.4-2.1-5.4-2.1-9 0-4.3 1.2-8 3.5-11.2 2.3-3.2 5.6-5.7 9.8-7.5 4.2-1.8 9.2-2.7 14.8-2.7 5.7 0 10.7 1 15 3 4.3 2 7.7 4.9 10.2 8.6l-10.4 8.7c-3-3.9-7.4-5.9-13.3-5.9-4.2 0-7.4.9-9.6 2.6-2.2 1.7-3.3 4-3.3 6.8 0 2.2.6 4.1 1.9 5.5 1.3 1.4 3.1 2.6 5.5 3.6 2.4 1 5.9 2.2 10.5 3.5 5.5 1.6 9.8 3.2 12.8 5 3 1.7 5.3 3.9 6.9 6.5 1.6 2.6 2.4 5.9 2.4 9.9 0 4.6-1.3 8.7-3.8 12.2-2.5 3.5-6.1 6.3-10.7 8.3-4.6 2-10 3-16.2 3-8 0-14.7-1.7-20.1-5.1-5.4-3.4-9.3-8.2-11.6-14.4l11.6-6.1zM58.3 37.6v63.1H44.1V37.6H21.5V26.2h59.4v11.4H58.3z" fill="#FFF" />
    </svg>
  ),

  // Tailwind CSS
  'Tailwind CSS': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
  ),

  // Vue.js
  'Vue.js': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 261.76 226.69" className={className} fill="none">
      <path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41B883" />
      <path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495E" />
    </svg>
  ),

  // Angular
  Angular: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 250 250" className={className} fill="currentColor">
      <polygon points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2" fill="#DD0031" />
      <polygon points="125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 203.9,186.3 218.1,63.2" fill="#C3002F" />
      <path d="M125,52.1L66.8,182.6h0h21.7h0l11.7-29.2h49.4l11.7,29.2h21.7h0L125,52.1L125,52.1z M142,135h-34l17-40.9L142,135z" fill="#FFFFFF" />
    </svg>
  ),

  // Node.js
  'Node.js': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 256 289" className={className} fill="#5FA04E">
      <path d="M128 0L0 74v141l128 74 128-74V74L128 0zm97 200l-97 56-97-56V89l97-56 97 56v111z" />
    </svg>
  ),

  // NestJS
  NestJS: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#E0234E">
      <path d="M11.99 0C5.37 0 0 5.37 0 11.99c0 6.63 5.37 12.01 11.99 12.01 6.63 0 12.01-5.38 12.01-12.01C24 5.37 18.62 0 11.99 0zm0 3.27c4.82 0 8.73 3.91 8.73 8.72 0 4.82-3.91 8.73-8.73 8.73-4.81 0-8.72-3.91-8.72-8.73 0-4.81 3.91-8.72 8.72-8.72zm-2.18 4.36v8.72h2.18V7.63h-2.18zm4.36 0v8.72h2.18V7.63h-2.18z" />
    </svg>
  ),

  // Python / FastAPI
  'Python / FastAPI': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#059669">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm1.2 4.8l-1.2 6h3.6l-4.8 8.4 1.2-6H8.4l4.8-8.4z" />
    </svg>
  ),

  // Django / DRF
  'Django / DRF': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#0C4B33">
      <path d="M11.146 0h3.333v15.424c-1.503.208-2.585.313-3.333.313-3.793 0-5.753-1.666-5.753-4.896 0-3.187 1.94-4.896 5.753-4.896V0zm0 8.646c-2.021 0-2.896.854-2.896 2.292 0 1.417.875 2.27 2.896 2.27v-4.562zM20 7.875h3.333V24H20v-3.75c-1.125 2.5-3.083 3.75-5.833 3.75-4.104 0-6.146-2.5-6.146-7.5V11.25h3.333v5.25c0 3.333 1.25 5 3.75 5 2.5 0 4.146-1.5 4.896-4.5V7.875z" />
    </svg>
  ),

  // Laravel
  Laravel: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#FF2D20">
      <path d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm0 2.2l8.5 4.8-3.7 2.1-4.8-2.7-4.8 2.7-3.7-2.1L12 2.2zm-9 5.8l7.5 4.2v8.5L3 16.5V8zm18 8.5l-7.5 4.2v-8.5l7.5-4.2v8.5z" />
    </svg>
  ),

  // Spring Boot
  'Spring Boot': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#6DB33F">
      <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm6.8 15.6c-.6 2-2.3 3.4-4.5 3.4a4.9 4.9 0 0 1-4.9-4.9 4.7 4.7 0 0 1 1.4-3.4l2.8-2.8 1.4 1.4-2.8 2.8a2.8 2.8 0 0 0 2.1 4.9c1.3 0 2.3-.9 2.7-2.1l1.8.7z" />
    </svg>
  ),

  // .NET 8 Core
  '.NET 8 Core': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#512BD4">
      <path d="M2.4 18.6l3.8-13.2h3.4L5.8 18.6H2.4zm10.5 0l3.8-13.2h3.4l-3.8 13.2h-3.4zM7.2 12h9.6v2.4H7.2V12z" />
    </svg>
  ),

  // PostgreSQL
  PostgreSQL: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#336791">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm0-4h-2V7h2v7z" />
    </svg>
  ),

  // Supabase
  Supabase: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#3ECF8E">
      <path d="M13.2 0L1.2 14.4h9.6L9.6 24l13.2-14.4h-9.6L13.2 0z" />
    </svg>
  ),

  // Redis
  Redis: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#DC382D">
      <path d="M12 0L2 5.5v13L12 24l10-5.5v-13L12 0zm0 2.3l7.8 4.3L12 11 4.2 6.6 12 2.3zM3.8 8.1l7.2 4v8.6l-7.2-4V8.1zm9.2 12.6V12.1l7.2-4v8.6l-7.2 4z" />
    </svg>
  ),

  // MongoDB
  MongoDB: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#47A248">
      <path d="M12 0C11.6 0 10 3.2 10 7.8c0 5.4 2 9.2 2 16.2 0-7 2-10.8 2-16.2C14 3.2 12.4 0 12 0z" />
    </svg>
  ),

  // MySQL
  MySQL: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#4479A1">
      <path d="M12 3c-4.97 0-9 2.01-9 4.5S7.03 12 12 12s9-2.01 9-4.5S16.97 3 12 3zm0 6c-3.87 0-7-1.34-7-3s3.13-3 7-3 7 1.34 7 3-3.13 3-7 3zm0 3c-4.97 0-9 2.01-9 4.5S7.03 21 12 21s9-2.01 9-4.5-4.03-4.5-9-4.5z" />
    </svg>
  ),

  // Pinecone
  Pinecone: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#00D2FE">
      <path d="M12 1L4 7v10l8 6 8-6V7l-8-6zm0 2.4l6 4.5v7.2l-6 4.5-6-4.5V7.9l6-4.5zM12 8l-3 3 3 3 3-3-3-3z" />
    </svg>
  ),

  // Flutter (Dart)
  'Flutter (Dart)': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#02569B">
      <path d="M14.3 0L3.5 10.8l3.3 3.3L17.6 3.3 14.3 0zm0 14.7l-4.5 4.5 4.5 4.8h6.2l-7.6-7.8 7.6-7.8h-6.2l-4.5 4.5 4.5 4.8v-3z" />
    </svg>
  ),

  // React Native
  'React Native': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none" stroke="#61DAFB">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" stroke="none" />
      <g strokeWidth="1">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),

  // Swift / SwiftUI
  'Swift / SwiftUI': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#F05138">
      <path d="M22.2 16.5c-.3-.4-1.2-1.3-1.8-1.5 2.1 2.8 1.2 5.5 1.2 5.5s-2.7-1.3-4.5-3.3c-2.4 2.1-5.6 2.5-5.6 2.5s2.4-1.6 3.6-3.3c-4.2 1.3-7.5-1.5-7.5-1.5s4.2.1 6.5-1.5c-4.5-.6-7.5-4.2-7.5-4.2s3.6 1.8 6.6.9C8.4 8.7 6.6 4.8 6.6 4.8s3.9 3 6.9 3.3c-.9-1.5-1.2-3.3-1.2-3.3s3.3 2.1 5.1 4.5c3.3-1.2 4.8-3.6 4.8-3.6s-1.2 3.9-3.9 6c3 1.5 3.9 4.8 3.9 4.8z" />
    </svg>
  ),

  // Kotlin / Compose
  'Kotlin / Compose': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#7F52FF">
      <path d="M24 24H0V0h24L12 12Z" />
    </svg>
  ),

  // WhatsApp Business API
  'WhatsApp Business API': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#25D366">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.05 20.15Z" />
    </svg>
  ),

  // LangChain & LlamaIndex
  'LangChain & LlamaIndex': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#1C3C3C">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#00D2FE" strokeWidth="2" fill="none" />
    </svg>
  ),

  // OpenAI GPT-4o
  'OpenAI GPT-4o': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22.28 9.38a5.95 5.95 0 0 0-.52-4.91 6.04 6.04 0 0 0-6.51-2.9A6.06 6.06 0 0 0 10.5.3a6.04 6.04 0 0 0-5.76 4.19 6 6 0 0 0-3.92 2.85 6.04 6.04 0 0 0 .75 7.12 5.98 5.98 0 0 0 .51 4.9 6.05 6.05 0 0 0 6.52 2.9A6.07 6.07 0 0 0 13.5 23.7a6.04 6.04 0 0 0 5.76-4.19 6 6 0 0 0 3.92-2.85 6.03 6.03 0 0 0-.9-7.28z" />
    </svg>
  ),

  // Google Gemini 2.0
  'Google Gemini 2.0': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#4285F4">
      <path d="M12 0C12 6.63 6.63 12 0 12c6.63 0 12 5.37 12 12 0-6.63 5.37-12 12-12-6.63 0-12-5.37-12-12z" />
    </svg>
  ),

  // Anthropic Claude 3.5
  'Anthropic Claude 3.5': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#D97706">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5h-2v-5h2zm0-7h-2V7h2z" />
    </svg>
  ),

  // n8n & Automations
  'n8n & Automations': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#EA4B71">
      <path d="M12 2a4 4 0 0 0-4 4c0 .7.2 1.4.5 2L4 12.5a4 4 0 1 0 2.8 2.8L11.3 11c.2.1.4.1.7.1a4 4 0 1 0 0-8z" />
    </svg>
  ),

  // Amazon Web Services (AWS)
  'Amazon Web Services (AWS)': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#FF9900">
      <path d="M6.2 11.2c0-1.8 1.1-3 2.9-3 1.2 0 2.1.6 2.6 1.4V8.4h1.7v7.2h-1.7v-1.2c-.5.8-1.4 1.4-2.6 1.4-1.8 0-2.9-1.3-2.9-3.1zm1.7.9c0 1.2.7 1.8 1.7 1.8 1.1 0 1.8-.7 1.8-1.8 0-1.2-.7-1.8-1.8-1.8-1 0-1.7.6-1.7 1.8zm14.3 6.1C18.3 20 13.9 21 8.8 21c-3.7 0-7.1-.7-9.8-2 .4-.4.8-.8 1.3-1.1 2.3 1.1 5.3 1.6 8.5 1.6 4.6 0 8.6-.8 11.7-2.4l1.7 1.1z" />
    </svg>
  ),

  // Google Cloud Platform
  'Google Cloud Platform': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#4285F4">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
    </svg>
  ),

  // Microsoft Azure
  'Microsoft Azure': ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#0089D6">
      <path d="M13.2 2L5 15.8h5.8L4 22l14.8-8.2h-6.2L18.4 2h-5.2z" />
    </svg>
  ),

  // Docker
  Docker: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#2496ED">
      <path d="M13.98 11.08h1.8v1.8h-1.8zm-2.4 0h1.8v1.8h-1.8zm-2.4 0h1.8v1.8H9.18zm7.2 0h1.8v1.8h-1.8zm-9.6 0h1.8v1.8h-1.8zm2.4-2.4h1.8v1.8h-1.8zm2.4 0h1.8v1.8h-1.8zm2.4 0h1.8v1.8h-1.8zm-2.4-2.4h1.8v1.8h-1.8zM23.98 12.6c-.3-.2-1.3-.8-2.6-.6-.4-1.3-1.6-2.1-2.9-2.1-.2 0-.4 0-.6.1-.5-2.1-2.4-3.7-4.6-3.7H3.5c-.8 0-1.5.7-1.5 1.5v7.2c0 3.5 2.8 6.3 6.3 6.3h8.4c4 0 7.2-3.2 7.2-7.2 0-.5 0-1-.1-1.5z" />
    </svg>
  ),

  // Kubernetes
  Kubernetes: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="#326CE5">
      <path d="M12 0L2 5.8v12.4L12 24l10-5.8V5.8L12 0zm0 2.3l8 4.6v9.8l-8 4.6-8-4.6V6.9l8-4.6zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
    </svg>
  ),

  // Vercel
  Vercel: ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 1L24 22H0L12 1Z" />
    </svg>
  ),
};
