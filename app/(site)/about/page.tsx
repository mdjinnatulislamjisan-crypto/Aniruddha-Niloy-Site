import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import PageHeading from '@/components/PageHeading';

export const metadata: Metadata = {
  title: 'About the Author',
  description: `About ${SITE.name}, author of Bengali and English poems, stories, novels and original mythological fiction.`,
  alternates: { canonical: '/about' },
};

/* EDIT THIS PAGE: replace the placeholder biography below with your own words. */
export default function AboutPage() {
  return (
    <div className="container-page pb-4">
      <PageHeading title="About the Author" subtitle="লেখক পরিচিতি" />
      <div className="grid gap-12 lg:grid-cols-[1fr_18rem]">
        <div className="reading max-w-reading">
          <p className="text-[#E8E4DC]">
            <strong>{SITE.name}</strong> ({SITE.nameBn}) is a Bengali writer and poet whose literary interests extend across poetry, short stories, novels, philosophical reflections, and original mythological fiction. His writing explores the intricate relationship between human emotions, personal experiences, society, and the mysteries of existence. Fascinated by the thoughts people conceal, the memories they struggle to forget, and the questions they rarely dare to ask, he seeks to transform these elements of human life into meaningful literary expressions. His creative imagination moves between reality and fiction, allowing ordinary experiences to inspire extraordinary questions and familiar situations to reveal unfamiliar truths. Through his work, he hopes to create a literary world where readers can discover not only the author's thoughts but also reflections of their own experiences, emotions, doubts, and dreams.
          </p>
          <p className="text-[#E8E4DC]">
            Love, heartbreak, solitude, silence, nostalgia, and the contradictions of human nature occupy an important place in his literary imagination. He is particularly interested in the difference between what people reveal to the world and what they quietly carry within themselves. Behind every smile, he believes, there may be an untold story; behind every decision, a complicated history; and behind every human character, a collection of experiences that cannot be understood through appearances alone. His philosophical interests lead him to question familiar ideas about morality, happiness, suffering, freedom, and the meaning of existence. Rather than presenting human beings as entirely good or entirely evil, he prefers to explore the complicated circumstances that influence their choices. His writing attempts to examine these contradictions with curiosity and imagination, creating characters and situations that encourage readers to look beyond the surface and consider the deeper realities of human life.
          </p>
          <p className="text-[#E8E4DC]">
            For Aniruddha Niloy, writing is more than the arrangement of words; it is a means of exploring the human mind, questioning established beliefs, and expressing thoughts that ordinary conversations often fail to capture. A poem may begin with an emotion that has remained unnamed for years, while a story may emerge from a simple observation about human behaviour or an unanswered question about life. He is drawn to mysterious narratives, psychologically complex characters, unexpected revelations, and imaginative worlds where reality may not always be what it appears to be. His creative interests include both emotionally driven literature and stories that incorporate mystery, symbolism, philosophical ideas, and mythological elements. He values originality and seeks to develop a distinctive literary voice through continuous observation, reflection, and experimentation. For him, every story offers an opportunity to explore a different perspective, every character presents a new question about human nature, and every piece of writing creates the possibility of discovering something that might otherwise remain unnoticed.
          </p>
          <p className="text-[#E8E4DC]">
            বাংলা ভাষা ও সাহিত্যের প্রতি অনুরাগ, মানুষের মনস্তত্ত্ব সম্পর্কে কৌতূহল এবং জীবনকে গভীরভাবে উপলব্ধি করার আকাঙ্ক্ষা অনিরুদ্ধ নিলয়ের সাহিত্যিক ভাবনাকে প্রভাবিত করে। তিনি এমন বিষয় নিয়ে লিখতে আগ্রহী, যেগুলো মানুষের দৈনন্দিন জীবনের সঙ্গে গভীরভাবে জড়িয়ে থাকলেও সচরাচর আলোচনার কেন্দ্রে আসে না। মানুষের মনের দ্বন্দ্ব, সম্পর্কের জটিলতা, স্মৃতির প্রভাব, সময়ের পরিবর্তন এবং পরিস্থিতির চাপে বদলে যাওয়া ব্যক্তিত্ব তাঁর চিন্তার জগতে বিশেষ স্থান অধিকার করে। তাঁর কাছে প্রতিটি মানুষ যেন একটি অসমাপ্ত গল্প, যার দৃশ্যমান অংশের আড়ালে লুকিয়ে থাকে অসংখ্য অজানা অধ্যায়। সেই অজানা অধ্যায়গুলোর সন্ধান করতে গিয়েই তিনি কখনো কবিতার আশ্রয় নেন, কখনো গল্পের চরিত্র নির্মাণ করেন, আবার কখনো দর্শন ও কল্পনার সাহায্যে জীবনের পরিচিত বাস্তবতাকে নতুনভাবে দেখার চেষ্টা করেন।
          </p>
          <p className="text-[#E8E4DC]">
            প্রেম, বিরহ, নিঃসঙ্গতা, নৈঃশব্দ্য, স্মৃতিকাতরতা এবং মানবচরিত্রের বিচিত্র বৈপরীত্য তাঁর লেখালেখির অন্যতম অনুষঙ্গ। মানুষের বাহ্যিক আচরণ আর অন্তর্গত অনুভূতির মধ্যকার ব্যবধান তাঁকে বিশেষভাবে ভাবায়। যে মানুষটিকে বাইরে থেকে সহজে বোঝা যায়, তার মনেও হয়তো জমে থাকে বহু অপ্রকাশিত কথা, অপূর্ণ আকাঙ্ক্ষা এবং অতীতের এমন কিছু অভিজ্ঞতা, যেগুলো তার বর্তমানকে নীরবে নিয়ন্ত্রণ করে। অনিরুদ্ধ নিলয় সেই অনুভূতিগুলোকে সাহিত্যের ভাষায় প্রকাশ করতে চান, যেগুলো মানুষ প্রায়ই অনুভব করে, অথচ যথাযথ শব্দের অভাবে প্রকাশ করতে পারে না। তাঁর কাছে বিরহ শুধু বিচ্ছেদের বেদনা নয়, কখনো তা আত্মোপলব্ধির পথ; নিঃসঙ্গতা কেবল একাকিত্ব নয়, কখনো তা নিজের সঙ্গে পরিচিত হওয়ার সুযোগ; আর নীরবতা সব সময় শূন্যতা নয়, কখনো তার ভেতরেই লুকিয়ে থাকে সবচেয়ে গভীর কথাগুলো।
          </p>
          <p className="text-[#E8E4DC]">
            দর্শন ও মনস্তত্ত্বের প্রতি আগ্রহ থেকে তিনি জীবন, অস্তিত্ব, নৈতিকতা, স্বাধীনতা, সুখ, দুঃখ এবং মানুষের সিদ্ধান্ত গ্রহণের জটিল প্রক্রিয়া নিয়ে ভাবতে ভালোবাসেন। তাঁর দৃষ্টিতে পৃথিবীকে কেবল সাদা ও কালোর সরল বিভাজনে ব্যাখ্যা করা যায় না; মানুষের জীবন ও চরিত্রের অধিকাংশ সত্যই অবস্থান করে এই দুইয়ের মাঝখানের বিস্তৃত, জটিল অঞ্চলে। পরিস্থিতি, অভিজ্ঞতা, ভয়, আকাঙ্ক্ষা এবং ব্যক্তিগত বিশ্বাস কীভাবে একজন মানুষকে গড়ে তোলে, কীভাবে একই ঘটনা ভিন্ন মানুষের কাছে ভিন্ন অর্থ বহন করে এবং কীভাবে সময়ের সঙ্গে মানুষের দৃষ্টিভঙ্গি বদলে যায়—এসব প্রশ্ন তাঁর সৃজনশীল চিন্তাকে অনুপ্রাণিত করে। তিনি এমন সাহিত্য নির্মাণে আগ্রহী, যা পাঠককে শুধু আবেগপ্রবণ করে না, বরং নিজের বিশ্বাস, সিদ্ধান্ত এবং চারপাশের পৃথিবী সম্পর্কে নতুন করে ভাবতেও উৎসাহিত করে।
          </p>
          <p className="text-[#E8E4DC]">
            কল্পনা ও রহস্যের জগৎও অনিরুদ্ধ নিলয়ের সৃজনশীল আগ্রহের একটি গুরুত্বপূর্ণ অংশ। বাস্তবতার পরিচিত সীমা অতিক্রম করে নতুন জগৎ নির্মাণ, অদ্ভুত পরিস্থিতির মধ্যে মানুষের প্রতিক্রিয়া অনুসন্ধান, রহস্যময় চরিত্রের অন্তর্গত উদ্দেশ্য উন্মোচন এবং ঘটনার আড়ালে লুকিয়ে থাকা সত্যকে ধীরে ধীরে প্রকাশ করার মধ্যে তিনি বিশেষ আনন্দ খুঁজে পান। পৌরাণিক উপাদান, প্রতীকী ভাবনা, মনস্তাত্ত্বিক দ্বন্দ্ব এবং অপ্রত্যাশিত ঘটনাপ্রবাহের মাধ্যমে তিনি এমন সব কাহিনি নির্মাণ করতে চান, যেখানে পাঠক কেবল গল্পের পরিণতি জানার জন্য নয়, বরং প্রতিটি ঘটনার অর্থ বুঝতে এবং চরিত্রগুলোর অন্তর্জগৎ আবিষ্কার করতেও আগ্রহী হয়ে ওঠেন। তাঁর কাছে একটি ভালো রহস্যের সার্থকতা শুধু চমকপ্রদ সমাপ্তিতে নয়; বরং এমন একটি অভিজ্ঞতা তৈরি করায়, যেখানে সমাপ্তির পরেও পাঠকের মনে নতুন প্রশ্ন জন্ম নিতে থাকে।
          </p>
          <p className="text-[#E8E4DC]">
            অনিরুদ্ধ নিলয়ের কাছে সাহিত্য মানে সব প্রশ্নের উত্তর দেওয়া কিংবা প্রতিটি ঘটনার চূড়ান্ত ব্যাখ্যা হাজির করা নয়। কখনো একটি কবিতা পাঠকের বহুদিনের চাপা অনুভূতিকে ভাষা দেয়, কখনো একটি গল্প পরিচিত কোনো মানুষকে নতুন দৃষ্টিতে দেখতে শেখায়, আবার কখনো একটি উপন্যাস এমন প্রশ্নের মুখোমুখি দাঁড় করায়, যার উত্তর খুঁজতে গিয়ে পাঠক নিজের জীবন ও বিশ্বাসকে নতুনভাবে বিচার করেন। তিনি বিশ্বাস করেন, একটি লেখার প্রকৃত প্রভাব অনেক সময় তা পড়ার মুহূর্তে সম্পূর্ণভাবে বোঝা যায় না; বরং কোনো একটি বাক্য, চরিত্র কিংবা দৃশ্য দীর্ঘদিন পরেও স্মৃতিতে ফিরে এসে নতুন অর্থ তৈরি করতে পারে। যে সাহিত্য পাঠকের মনে চিন্তার জন্ম দেয়, অনুভূতিকে নাড়া দেয় এবং পড়া শেষ হওয়ার পরও নিজের উপস্থিতি অনুভব করায়, তার মূল্য কেবল শব্দের সৌন্দর্যে সীমাবদ্ধ থাকে না। এই ভাবনা থেকেই তিনি নিজের সাহিত্যিক পরিচয় ও সৃজনশীল কাজকে একটি স্বতন্ত্র পরিসরে গড়ে তুলতে আগ্রহী।
          </p>
          <p className="text-[#E8E4DC]">
            এই ওয়েবসাইট অনিরুদ্ধ নিলয়ের নিজস্ব সাহিত্যভুবন—একটি সৃজনশীল পরিসর, যেখানে ধীরে ধীরে সংরক্ষিত হবে তাঁর মৌলিক কবিতা, গল্প, উপন্যাস, চিন্তাশীল গদ্য এবং কল্পনাপ্রসূত অন্যান্য রচনা। এটি শুধু প্রকাশিত লেখার সংগ্রহ নয়, বরং তাঁর সাহিত্যিক যাত্রার বিভিন্ন পর্যায়, ভাবনার বিবর্তন এবং সৃজনশীল অনুসন্ধানের একটি ধারাবাহিক নথি হয়ে ওঠার প্রত্যাশা রাখে। এখানে পাঠক কখনো খুঁজে পেতে পারেন পরিচিত কোনো অনুভূতির নতুন প্রকাশ, কখনো আবিষ্কার করতে পারেন অচেনা কোনো চরিত্রের জটিল মনোজগৎ, আবার কখনো এমন একটি ভাবনার মুখোমুখি হতে পারেন, যা তাঁকে নিজের জীবন সম্পর্কে নতুন করে চিন্তা করতে উৎসাহিত করবে। প্রতিটি রচনার মধ্য দিয়ে একটি স্বতন্ত্র সাহিত্যিক জগৎ নির্মাণ করাই তাঁর লক্ষ্য—যে জগতে আবেগ ও যুক্তি, বাস্তবতা ও কল্পনা, প্রশ্ন ও উপলব্ধি পাশাপাশি অবস্থান করতে পারে।
          </p>
          <p className="text-[#E8E4DC]">
            New work appears here as it is finished. Each poem, story, and creative piece is part of an ongoing literary journey shaped by observation, imagination, and a desire to understand the many dimensions of human experience. Readers are invited to explore the collection at their own pace, discover the works that speak to them, and interpret each piece through their own perspectives and experiences. If a particular line creates an emotional connection, a story inspires a new thought, or a piece of writing stays in the mind long after it has been read, sharing that experience with others is one of the most meaningful ways to support an independent writer.
          </p>
          <p>
            <Link href="/stories">Read the stories</Link>, <Link href="/poetry">wander through the poetry</Link>, or{' '}
            <Link href="/search">search the whole archive</Link>.
          </p>
        </div>

        <aside className="h-fit border border-charcoal-line bg-charcoal p-6">
          <h2 className="font-display text-2xl text-ivory">Find me elsewhere</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a className="text-gold-bright hover:underline" href={SITE.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a className="text-gold-bright hover:underline" href={SITE.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}