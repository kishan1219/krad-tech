import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KRAD Technology',
    short_name: 'KRAD',
    description: 'Engineering Digital Experiences. Building What\'s Next.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050814',
    theme_color: '#050814',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
