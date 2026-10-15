import type { Metadata, Viewport } from 'next';
import { SITE, isRealLink } from '@/lib/site';
import { READER_BOOT_SCRIPT } from '@/lib/reader-prefs';
import JsonLd from '@/components/JsonLd';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} (${SITE.nameBn}) | Poems, stories and myths`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    locale: 'en_GB',
    alternateLocale: ['bn_BD'],
  },
  twitter: { card: 'summary_large_image', title: SITE.name, description: SITE.description },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
};

// Fonts are loaded with a <link> tag (more reliable than build-time download on some hosts).
const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Noto+Serif+Bengali:wght@400;500;700&display=swap';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const sameAs = [SITE.facebook, SITE.instagram].filter(isRealLink);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS_URL} />
        <script dangerouslySetInnerHTML={{ __html: READER_BOOT_SCRIPT }} />
      </head>
      <body>
        {children}
        <JsonLd
          data={[
            {
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: SITE.name,
              alternateName: SITE.nameBn,
              url: SITE.url,
              jobTitle: 'Author',
              ...(sameAs.length ? { sameAs } : {}),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: SITE.name,
              alternateName: SITE.nameBn,
              url: SITE.url,
              inLanguage: ['en', 'bn'],
              potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE.url}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            },
          ]}
        />
      </body>
    </html>
  );
}
