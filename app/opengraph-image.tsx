import { ImageResponse } from 'next/og';

export const alt = 'Aniruddha Niloy - poems, stories, novels and myths';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Default social-sharing image. It uses Latin text only (the default image font has no Bengali glyphs).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#050505',
          color: '#ece4d2',
          border: '2px solid #7d6740',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, color: '#b8975a', letterSpacing: 6 }}>
          POEMS - STORIES - NOVELS - MYTHS
        </div>
        <div style={{ display: 'flex', fontSize: 120, marginTop: 24, lineHeight: 1.05 }}>Aniruddha Niloy</div>
        <div style={{ display: 'flex', width: 160, height: 2, background: '#b8975a', marginTop: 40 }} />
        <div style={{ display: 'flex', fontSize: 34, marginTop: 36, color: '#bbb3a1' }}>
          Bengali and English literature
        </div>
      </div>
    ),
    { ...size }
  );
}
