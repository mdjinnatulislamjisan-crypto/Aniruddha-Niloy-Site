import type { Metadata } from 'next';
import BookmarksView from '@/components/BookmarksView';
import PageHeading from '@/components/PageHeading';

export const metadata: Metadata = {
  title: 'Saved writings',
  description: 'Writings you have saved on this device.',
  robots: { index: false, follow: true },
};

export default function BookmarksPage() {
  return (
    <div className="container-page pb-4">
      <PageHeading
        title="Saved"
        subtitle="সংরক্ষিত"
        intro="Pieces you have bookmarked. They live in this browser only, so there is nothing to sign up for."
      />
      <BookmarksView />
    </div>
  );
}
