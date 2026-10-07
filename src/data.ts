import { MemoryLaneEvent } from './types';

// Product galleries are generated from the PaperThreads Google Drive "Products"
// folder by scripts/gen-products.mjs. Re-exported here so existing imports
// from './data' keep working.
export {
  ARTWORKS,
  CRAFTWORKS,
  ART_COLLECTIONS,
  CRAFT_COLLECTIONS,
} from './products.generated';

export const ME_AND_MYSELF_GALLERY = [
  {
    id: 'mem-1',
    title: 'The Spark of Creation',
    description: 'Captured in the quiet early mornings, draft-sketching the initial contours of single-line silhouettes.',
    image: 'https://i.imgur.com/Dbolgew.jpeg'
  },
  {
    id: 'mem-2',
    title: 'Meticulous Threading',
    description: 'Weaving pink and purple threads into geometric alignment, an exercise of absolute patience.',
    image: 'https://i.imgur.com/l3BRTv5.jpeg'
  },
  {
    id: 'mem-3',
    title: 'Artisan Pride',
    description: 'Casing the newly completed layered paper shadowbox, ready to be dispatched to a cozy home.',
    image: 'https://i.imgur.com/SEHPEB3.jpeg'
  }
];

export interface CraftCategoryTagline {
  category: string;
  tagline: string;
}

export const CRAFT_CATEGORIES_WITH_TAGLINES: CraftCategoryTagline[] = [
  {
    category: "Greeting and occasion cards",
    tagline: "We've got cards for all your occasions. Well that's cos we design them write on them paint on them.. welll everyday is an ocassion. the present is a gift that's why they call it the present !"
  },
  {
    category: "Birthday",
    tagline: "Blow candles and double the celebration with our personalized thread-stitched celebration scrolls."
  },
  {
    category: "Anniversary",
    tagline: "Preserve years of combined love with deep-set layered anniversary frames."
  },
  {
    category: "Wedding",
    tagline: "Premium custom laser-feel quilling suites for a truly majestic invitation experience."
  },
  {
    category: "Baby Shower",
    tagline: "Soft pastel hues and three-dimensional cradles crafted with infinite care."
  },
  {
    category: "Congratulations",
    tagline: "Celebrate life's monumental achievements with magnificent, customized keepsake cards."
  },
  {
    category: "Graduation",
    tagline: "Honor dedication and diploma achievements with layered tassel layouts and custom colors."
  },
  {
    category: "Thank You",
    tagline: "A humble paper thread of appreciation says far more than any email ever could."
  },
  {
    category: "Get Well Soon",
    tagline: "Warm, uplifting floral cards designed to send peace and speedy recoveries."
  },
  {
    category: "Seasonal & Festive",
    tagline: "Seasonal colors woven elegantly to celebrate festive warmth and holiday joy."
  },
  {
    category: "Custom / Personalized Cards - Birthversary / Wedding",
    tagline: "We've got them all - customize your greeting card to give it the YOU touch!"
  },
  {
    category: "Cards/ Gift packs - Corporate and domestic",
    tagline: "Custom bulk packages tailored elegantly for office events and family circles alike."
  },
  {
    category: "Popup cards",
    tagline: "Interactive multi-dimensional paper kinematics that pop up into physical architecture."
  },
  {
    category: "Souvenirs",
    tagline: "Miniature handmade mementos encapsulating key historical and emotional motifs."
  },
  {
    category: "Memorabilia",
    tagline: "Delicate visual artifacts designed to preserve the physical footprint of sweet nostalgic memories."
  }
];

export const MEMORY_LANE_EVENTS: MemoryLaneEvent[] = [
  {
    id: 'event-1',
    title: 'Sri Lanka Handmade Craft Market 2024',
    date: 'February 14, 2024',
    description: 'PaperThreads featured a premium booth exhibiting customized pop-up shadowboxes, receiving high admiration and customized order bookings.',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop',
    tag: 'Craft Exhibition'
  },
  {
    id: 'event-2',
    title: 'Royal Wedding Pop-up Invitation Suite',
    date: 'December 2023',
    description: 'Designed and crafted 250 luxurious, custom-layered quilling invitation cards with delicate paper threads for a high-profile wedding celebration.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop',
    tag: 'Wedding Commission'
  },
  {
    id: 'event-3',
    title: 'Handmade Anniversary Milestones Workshop',
    date: 'August 12, 2023',
    description: 'Kavindi hosted an exclusive workshop at the PaperThreads Studio, teaching 20 students the master artisan basics of paper quilling and pop-ups.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop',
    tag: 'Workshop Event'
  }
];

// ---------------------------------------------------------------------------
// ABOUT ME / MY STORY — Kavindi's own words.
// Inline **bold** is rendered by the RichText helper in App.tsx.
// ---------------------------------------------------------------------------

export interface StoryChapter {
  id: string;
  marker: string;
  title: string;
  paragraphs: string[];
}

export const STORY_INTRO: string[] = [
  "Hi, I'm Kavindi — the girl behind **PaperThreads**. ❤️",
  'PaperThreads started with something very simple: **my love for creating things with my hands, especially with paper.**',
  "I've always loved making handmade cards and little gifts for the people around me. There was something incredibly special about creating something with my own hands and seeing someone smile because of it. That feeling became the beginning of a journey I never expected to take.",
  'One day, after seeing a card I had made, my friend **Malee** suggested that I start an Instagram page and share my creations. At the time, I had no idea where that one small suggestion would lead me.',
  "**That's how PaperThreads began.**",
];

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'chapter-beginning',
    marker: '2019',
    title: 'From a Small Idea to Something More',
    paragraphs: [
      "I started PaperThreads in **2019**, but back then, it wasn't my main focus.",
      'I was studying for my **Software Engineering degree**, and most of my days were filled with assignments, projects, exams, and university life.',
      'Whenever I had some free time, I would find myself scrolling through Pinterest, looking for new ideas and inspiration. I also started sharing my creations on WhatsApp Status, Facebook, and other social media platforms.',
      'Slowly, people began noticing my work. Then came the first orders.',
      'Before I knew it, I was balancing two very different worlds — **university life and PaperThreads.** And somehow, I loved both.',
    ],
  },
  {
    id: 'chapter-covid',
    marker: '2020',
    title: 'Then Came COVID',
    paragraphs: [
      'Like so many people around the world, COVID changed my life in ways I never expected. But in the middle of all that uncertainty, it also gave me something I hadn\u2019t had before: **Time.**',
      'For the first time, I had the opportunity to slow down and explore something completely new. I picked up a pen and started drawing.',
      'I had never studied art professionally. I was simply curious.',
      'That curiosity eventually introduced me to **mandala art**, and before long, I fell completely in love with it. What began as something I tried during my free time slowly became another creative journey.',
      "Looking back, I'm grateful for that chapter of my life because it helped me discover a part of myself I didn't even know existed.",
    ],
  },
  {
    id: 'chapter-fulltime',
    marker: 'The Leap',
    title: 'From Software Engineering to Creating Full-Time',
    paragraphs: [
      'After graduating, I stepped into the IT industry and began working full-time. But even with a career in IT, I never stopped creating. PaperThreads continued to grow alongside me.',
      'And somewhere along the way, I realised something important. Deep down, I wanted to spend more of my time doing what I truly loved.',
      'Eventually, I made the decision to leave my job and focus on PaperThreads full-time.',
      "It wasn't an easy decision. But it was one of the **best decisions I've ever made.**",
    ],
  },
  {
    id: 'chapter-more',
    marker: 'Today',
    title: 'More Than Just a Business',
    paragraphs: [
      'PaperThreads has become much more than a business to me. It has helped me find confidence in myself. It has allowed me to discover my creativity.',
      'And, most importantly, it has shown me that something can grow from the simplest of ideas when you combine **passion, patience, and a willingness to keep going.**',
    ],
  },
];

export const STORY_BRANDS = [
  {
    id: 'brand-crafts',
    name: 'PaperThreads',
    tagline: 'The handmade side',
    description:
      'Where I create handmade crafts, cards, gifts, and other paper creations.',
    tab: 'crafts' as const,
  },
  {
    id: 'brand-arts',
    name: 'PaperThreads_Arts',
    tagline: 'The drawing side',
    description:
      'A space to explore my love for hand-drawn art, mandalas, colours, shapes, lines, and everything else that inspires me.',
    tab: 'arts' as const,
  },
];

export const STORY_GRATITUDE: string[] = [
  "Of course, I didn't get here alone.",
  'From the very beginning, my friend **Malee** was one of the people who encouraged me to take that first step.',
  'And behind every creation I make are people who quietly support me every day. The people who understand the long hours. The busy days. The moments when I doubt myself. The dreams I keep chasing.',
  'Their love, patience, encouragement, and understanding have given me the freedom to continue doing what I truly love.',
];

export const STORY_PLATFORMS: string[] = [
  'Instagram',
  'Facebook',
  'TikTok',
  'YouTube',
  'Art Exhibitions',
  'Custom Creations',
  'Art Workshops',
];

export const STORY_TODAY: string[] = [
  'Today, my creative journey has grown far beyond that first Instagram page. I share my work through **Instagram, Facebook, TikTok, and YouTube**, take part in art exhibitions, accept custom creations, and conduct art workshops.',
  'Every platform, every exhibition, every workshop, every order, and every new creation is another little step forward.',
  'But whenever I think about where it all started, I still find it amazing that this entire journey began with **one handmade birthday card.**',
];

export const STORY_CLOSING: string[] = [
  "I don't know exactly where PaperThreads will take me next. But that's one of the things I love about this journey.",
  'There is always something new to learn. Something new to create. A new colour to explore. A new shape or line to draw. A new idea waiting to become something real.',
  'So, to everyone who has supported my work, placed an order, liked a post, shared my creations, attended a workshop, visited an exhibition, or simply followed my journey from somewhere behind a screen — **thank you.** Your support means more to me than you\u2019ll ever know. ❤️',
  "And if you're new here, welcome to my little creative world. I'm Kavindi, and this is **PaperThreads**.",
];
