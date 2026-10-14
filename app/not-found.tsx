import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container-page py-32 text-center">
        <p className="font-display text-8xl text-gold-dim">404</p>
        <h1 className="mt-4 font-display text-4xl text-ivory">This page has wandered off</h1>
        <p className="mt-3 text-ivory-dim">The link may be old, or the piece may not be published.</p>
        <Link href="/" className="btn btn-gold mt-8">Return home</Link>
      </main>
      <Footer />
    </>
  );
}
