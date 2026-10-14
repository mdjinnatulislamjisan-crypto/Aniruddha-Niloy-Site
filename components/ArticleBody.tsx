import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import type { ArticleType, Language } from '@/lib/types';

/** Renders author-written Markdown. Raw HTML is NOT rendered (safe by default). */
export default function ArticleBody({
  content,
  type,
  language,
}: {
  content: string;
  type: ArticleType;
  language: Language;
}) {
  const isPoem = type === 'poem';
  const cls = isPoem ? 'reading reading-poem' : 'reading reading-dropcap';
  return (
    <div className={cls} lang={language}>
      <ReactMarkdown remarkPlugins={isPoem ? [remarkGfm, remarkBreaks] : [remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
