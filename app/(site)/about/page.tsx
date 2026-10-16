```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import PageHeading from '@/components/PageHeading';

export const metadata: Metadata = {
  title: 'About the Author | লেখক পরিচিতি',
  description:
    'Discover Aniruddha Niloy, a Bengali writer and poet exploring human emotions, philosophy, solitude, love, and the hidden depths of human existence. অনিরুদ্ধ নিলয়ের সাহিত্যজগৎ ও লেখক পরিচিতি।',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="container-page pb-4">
      <PageHeading
        title="About the Author"
        subtitle="লেখক পরিচিতি · Beyond the Words"
      />

      <div className="grid gap-12 lg:grid-cols-[1fr_18rem]">
        <div className="reading max-w-reading">

          {/* English Biography */}

          <section lang="en">
            <h2 className="font-display text-2xl text-ivory">
              The Writer Behind the Words
            </h2>

            <p>
              <strong>{SITE.name}</strong> is a Bengali writer and poet
              whose literary interests revolve around human emotions,
              philosophy, psychology, and the intricate realities of
              existence. Through poetry, short stories, novels, and
              reflective prose, his work explores the unspoken thoughts
              and hidden feelings that often remain buried beneath
              the surface of everyday life.
            </p>

            <p>
              Love and loss, silence and solitude, memory and longing,
              hope and despair are recurring themes in his creative
              world. He is drawn to the contradictions within human
              nature, the distance between what people feel and what
              they reveal, and the quiet struggles that shape their
              lives.
            </p>

            <p>
              For Aniruddha Niloy, writing is more than the arrangement
              of words. It is a way of questioning familiar truths,
              examining the human condition, and giving expression
              to thoughts that are difficult to articulate. A poem
              may hold an entire lifetime of sorrow, while a story
              may reveal a truth that its characters cannot bring
              themselves to acknowledge.
            </p>

            <p>
              Inspired by the richness of Bengali literary tradition
              and an enduring interest in philosophical thought,
              his creative vision seeks to bring together emotional
              depth, imagination, and a distinctive literary voice.
              His writing moves between tenderness and darkness,
              reality and imagination, and the beauty of what remains
              and the ache of what has been lost.
            </p>

            <p>
              He believes literature does not always need to provide
              answers. Sometimes, its greatest purpose is to leave
              behind a question that continues to echo in the reader's
              mind long after the final sentence. A meaningful work
              of literature does not merely tell a story; it invites
              the reader to look inward.
            </p>

            <p>
              This website is the literary home of Aniruddha Niloy,
              a growing collection of original poems, stories, novels,
              and reflections. Each work opens a window into a world
              shaped by imagination, observation, and the endlessly
              complicated nature of being human.
            </p>

            <p>
              Words may disappear from a page, but their meaning can
              remain within a person for years. Through his writing,
              Aniruddha Niloy seeks to create works that linger in
              the mind, awaken forgotten feelings, and offer readers
              a moment of recognition within the experiences of
              others.
            </p>
          </section>

          {/* Bengali Biography */}

          <section lang="bn" className="mt-12">
            <h2 className="font-display text-2xl text-ivory">
              শব্দের আড়ালে যে লেখক
            </h2>

            <p>
              <strong>{SITE.nameBn}</strong> একজন বাংলা ভাষার
              লেখক ও কবি। তাঁর সাহিত্যিক ভাবনার কেন্দ্রবিন্দুতে
              রয়েছে মানুষের অনুভূতি, মনস্তত্ত্ব, দর্শন এবং
              অস্তিত্বের বহুমাত্রিক বাস্তবতা। কবিতা, গল্প,
              উপন্যাস ও চিন্তাশীল গদ্যের মধ্য দিয়ে তিনি
              অনুসন্ধান করেন মানুষের মনের সেইসব অলিগলি,
              যেখানে প্রতিনিয়ত জন্ম নেয় অসংখ্য অব্যক্ত কথা,
              অপ্রকাশিত অনুভূতি ও অমীমাংসিত প্রশ্ন।
            </p>

            <p>
              প্রেম ও বিরহ, স্মৃতি ও বিস্মৃতি, নৈঃশব্দ্য ও
              নিঃসঙ্গতা, আশা ও হতাশা তাঁর সাহিত্যিক জগতের
              অন্যতম অনুষঙ্গ। মানুষের অন্তর্লীন দ্বন্দ্ব,
              অনুভূতি ও প্রকাশের মধ্যকার দূরত্ব এবং জীবনের
              নেপথ্যে চলতে থাকা নীরব সংগ্রাম তাঁর
              সৃষ্টিশীল ভাবনাকে গভীরভাবে প্রভাবিত করে।
            </p>

            <p>
              অনিরুদ্ধ নিলয়ের কাছে লেখালেখি কেবল শব্দকে
              বাক্যে সাজিয়ে তোলার নাম নয়। এটি প্রচলিত
              সত্যকে প্রশ্ন করার, মানবজীবনকে নতুন করে
              উপলব্ধি করার এবং অব্যক্ত চিন্তাকে ভাষা
              দেওয়ার একটি মাধ্যম। কখনো একটি কবিতার
              কয়েকটি পঙ্‌ক্তিতে জমা হয় দীর্ঘ জীবনের
              বিষাদ, আবার কখনো একটি গল্পের আড়ালে
              প্রকাশ পায় এমন কোনো সত্য, যার মুখোমুখি
              হতে চরিত্রগুলো নিজেরাই দ্বিধাগ্রস্ত।
            </p>

            <p>
              বাংলা সাহিত্যের সমৃদ্ধ ঐতিহ্য এবং
              দর্শনচিন্তার প্রতি অনুরাগ তাঁর সাহিত্যিক
              দৃষ্টিভঙ্গির গুরুত্বপূর্ণ অংশ। আবেগের
              গভীরতা, কল্পনার বিস্তার ও স্বতন্ত্র
              প্রকাশভঙ্গির সমন্বয়ে তিনি গড়ে তুলতে
              চান নিজস্ব এক সাহিত্যভুবন। তাঁর ভাবনায়
              পাশাপাশি অবস্থান করে কোমলতা ও অন্ধকার,
              বাস্তবতা ও কল্পনা, প্রাপ্তির সৌন্দর্য
              এবং হারিয়ে ফেলার বেদনা।
            </p>

            <p>
              তিনি বিশ্বাস করেন, সাহিত্যের কাজ
              সব প্রশ্নের উত্তর দিয়ে দেওয়া নয়।
              কখনো একটি প্রশ্নকে পাঠকের মনে
              দীর্ঘকাল জীবিত রাখাই সাহিত্যের
              সবচেয়ে বড় সার্থকতা। যে সাহিত্য
              পাঠককে নিজের অন্তর্জগতের দিকে
              তাকাতে শেখায়, তার আবেদন শেষ
              পৃষ্ঠাতেই ফুরিয়ে যায় না।
            </p>

            <p>
              এই ওয়েবসাইট অনিরুদ্ধ নিলয়ের নিজস্ব
              সাহিত্যভুবন, যেখানে ধীরে ধীরে স্থান
              পাবে তাঁর মৌলিক কবিতা, গল্প, উপন্যাস
              ও চিন্তাশীল রচনা। প্রতিটি সৃষ্টি
              কল্পনা, পর্যবেক্ষণ এবং মানবমনের
              জটিলতা থেকে নির্মিত একেকটি
              আলাদা জগতে প্রবেশের সুযোগ।
            </p>

            <p>
              কোনো কোনো শব্দ পৃষ্ঠা থেকে মুছে
              যায়, অথচ তার অর্থ মানুষের মনে
              বেঁচে থাকে বছরের পর বছর। অনিরুদ্ধ
              নিলয়ের লেখালেখির আকাঙ্ক্ষা এমন
              কিছু সৃষ্টি করা, যা পাঠকের মনে
              অনুরণন তুলবে, বিস্মৃত অনুভূতিকে
              জাগিয়ে দেবে এবং অন্যের অভিজ্ঞতার
              ভেতর নিজের জীবনের কোনো
              প্রতিচ্ছবি খুঁজে পেতে সাহায্য করবে।
            </p>
          </section>

          {/* Literary Archive Links */}

          <div className="mt-10 border-t border-charcoal-line pt-6">
            <p>
              <Link href="/stories">Read the stories</Link>
              {' · '}
              <Link href="/poetry">Explore the poetry</Link>
              {' · '}
              <Link href="/search">Search the literary archive</Link>
            </p>

            <p className="mt-2 text-sm">
              <Link href="/stories">গল্প পড়ুন</Link>
              {' · '}
              <Link href="/poetry">কবিতা পড়ুন</Link>
              {' · '}
              <Link href="/search">সাহিত্যভান্ডারে খুঁজুন</Link>
            </p>
          </div>
        </div>

        {/* Social Links */}

        <aside className="h-fit border border-charcoal-line bg-charcoal p-6">
          <h2 className="font-display text-2xl text-ivory">
            Connect With the Writer
          </h2>

          <p className="mt-3 text-sm leading-7 text-ivory/70">
            Follow Aniruddha Niloy for literary updates, original
            writing, poems, and new creative works.
          </p>

          <p className="mt-3 text-sm leading-7 text-ivory/70">
            নতুন লেখা, কবিতা ও সাহিত্যিক প্রকাশনার খবর পেতে
            অনিরুদ্ধ নিলয়ের সঙ্গে যুক্ত থাকুন।
          </p>

          <ul className="mt-4 space-y-3">
            <li>
              <a
                className="text-gold-bright hover:underline"
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook · ফেসবুক
              </a>
            </li>

            <li>
              <a
                className="text-gold-bright hover:underline"
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram · ইনস্টাগ্রাম
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
```
