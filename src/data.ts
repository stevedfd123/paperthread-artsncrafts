import { Artwork, Craftwork, MemoryLaneEvent } from './types';

export const ARTWORKS: Artwork[] = [
  {
    id: 'art-1',
    title: 'The Silent Silhouette',
    category: 'line',
    description: 'An elegant black and white minimalistic single-line hand-drawn capturing the graceful contours of human connection.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop', // Unsplash high quality minimalist art
    size: '12" x 16" (Hardwood Frame)',
    priceEstimate: '$85 / LKR 25,000'
  },
  {
    id: 'art-2',
    title: 'Warm Botanical Harmony',
    category: 'line',
    description: 'A delicate foliage composition highlighting organic flow, Pinterest-inspired botanical curves and beautiful golden accents.',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop',
    size: '8" x 10" (Minimal Matte Board)',
    priceEstimate: '$55 / LKR 16,500'
  },
  {
    id: 'art-3',
    title: 'Vibrant Magenta Solitude',
    category: 'abstract',
    description: 'Textured heavy acrylic strokes on canvas conveying rich feelings of peaceful retreat. Features lovely deep magenta and violet gradients.',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop',
    size: '20" x 24" (Premium Wrapped Canvas)',
    priceEstimate: '$180 / LKR 54,000'
  },
  {
    id: 'art-4',
    title: 'Ethereal Orchid Echoes',
    category: 'abstract',
    description: 'A dreamy, colorful fluid art piece blending magenta swirls with glistening gold pigment flakes.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
    size: '16" x 16" (Circular Satin Frame)',
    priceEstimate: '$140 / LKR 42,000'
  },
  {
    id: 'art-5',
    title: '3D Layered Paper Silhouette',
    category: 'fusion',
    description: 'A spectacular mix-media creation combining precise, multi-depth paper carving with acrylic sunset backdrops.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop',
    size: '12" x 12" (Glass Shadow Box)',
    priceEstimate: '$210 / LKR 63,000'
  },
  {
    id: 'art-6',
    title: 'Quilled Thread & Watercolor Bloom',
    category: 'fusion',
    description: 'Extremely intricate paper quilled floral trails intertwined with a soft watercolor paper thread layout.',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop',
    size: '10" x 10" (Deep-Set Satin White Frame)',
    priceEstimate: '$150 / LKR 45,000'
  },
];

export const CRAFTWORKS: Craftwork[] = [
  {
    id: 'craft-1',
    title: 'Deluxe Multi-Layered Shadowbox',
    category: 'handicraft',
    description: 'A 3D quilling shadowbox incorporating hundreds of tiny coiled paper threads. Beautiful pink orchid and gold gradients.',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop',
    timeToMake: '5-7 Days crafted with patience',
    priceEstimate: '$120 / LKR 36,000'
  },
  {
    id: 'craft-2',
    title: 'Woven Thread Geometric Decor',
    category: 'handicraft',
    description: 'A meticulous thread-weaving creation with symmetrical geometric designs pulling magenta, purple, and copper threads.',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=600&auto=format&fit=crop',
    timeToMake: '4 Days',
    priceEstimate: '$75 / LKR 22,500'
  },
  {
    id: 'craft-3',
    title: '3D Carousel Pop-Up Birthday Special',
    category: 'card',
    description: 'An interactive greeting card that opens up into an exquisite 3D fairy carousel. Perfect keepsake.',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=600&auto=format&fit=crop',
    timeToMake: '2-3 Days',
    priceEstimate: '$24 / LKR 7,200'
  },
  {
    id: 'craft-4',
    title: 'Infinite Exploding Birthday Keepsake Box',
    category: 'card',
    description: 'A multi-tier exploding paper box with custom photographic pockets, handmade greeting cards, and rolling threads.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
    timeToMake: '4-5 Days',
    priceEstimate: '$45 / LKR 13,500'
  },
  {
    id: 'craft-img-1',
    title: 'Flora Quilled Greeting Bloom',
    category: 'card',
    description: 'An exquisite greeting card with precision quilled pastel rose buds and gold leaf details.',
    image: 'https://i.imgur.com/t71x1u0.jpeg',
    timeToMake: '2 Days',
    priceEstimate: '$18 / LKR 5,400'
  },
  {
    id: 'craft-img-2',
    title: '3D Wedding Keepsake Gate',
    category: 'card',
    description: 'A multi-layered popup design depicting an intricate archway, custom handcraft tailored.',
    image: 'https://i.imgur.com/Bdq8zSq.jpeg',
    timeToMake: '3 Days',
    priceEstimate: '$25 / LKR 7,500'
  },
  {
    id: 'craft-img-3',
    title: 'Royal Lavender Quilling Shadowbox',
    category: 'handicraft',
    description: 'Delicate lavender-toned paper ribbons coiled meticulously into a framed keepsake box.',
    image: 'https://i.imgur.com/JRLSheK.jpeg',
    timeToMake: '5 Days',
    priceEstimate: '$85 / LKR 25,500'
  },
  {
    id: 'craft-img-4',
    title: 'Stitched Ribbon Birthday Special',
    category: 'card',
    description: 'A delightful birthday card blending hand-stitched threads and geometric paper cuts.',
    image: 'https://i.imgur.com/sHfdFZw.jpeg',
    timeToMake: '2 Days',
    priceEstimate: '$16 / LKR 4,800'
  },
  {
    id: 'craft-img-5',
    title: 'Ethereal Butterfly Popup',
    category: 'card',
    description: 'Stunning three-dimensional butterflies that spread their wings majestically when flat folds open.',
    image: 'https://i.imgur.com/LH5FwuK.jpeg',
    timeToMake: '3 Days',
    priceEstimate: '$22 / LKR 6,600'
  },
  {
    id: 'craft-img-6',
    title: 'Geometric Paper-Thread Symphony',
    category: 'handicraft',
    description: 'Woven copper threads forming a symmetrical galaxy of patterns across an obsidian frame.',
    image: 'https://i.imgur.com/WozEPnt.jpeg',
    timeToMake: '4 Days',
    priceEstimate: '$70 / LKR 21,000'
  },
  {
    id: 'craft-img-7',
    title: 'Baby Cradles Anniversary Delight',
    category: 'card',
    description: 'Intricately carved baby showers card emphasizing cozy paper-craft pastel shapes.',
    image: 'https://i.imgur.com/MQADWz9.jpeg',
    timeToMake: '2 Days',
    priceEstimate: '$15 / LKR 4,500'
  },
  {
    id: 'craft-img-8',
    title: 'Golden Festive Ornaments Card',
    category: 'card',
    description: 'A custom card highlighting glowing golden orbits and deep magenta background papers.',
    image: 'https://i.imgur.com/RCzwtT2.jpeg',
    timeToMake: '2.5 Days',
    priceEstimate: '$20 / LKR 6,000'
  },
  {
    id: 'craft-img-9',
    title: 'Corporate Luxury Pop-Up Suite',
    category: 'card',
    description: 'Bulk craft designed for branding and gift-giving, carrying elegant dark violet accents.',
    image: 'https://i.imgur.com/nRsJr6o.jpeg',
    timeToMake: '3 Days',
    priceEstimate: '$28 / LKR 8,400'
  },
  {
    id: 'craft-img-10',
    title: 'Romantic Garden Arch Silhouette',
    category: 'handicraft',
    description: 'A deep hollow box featuring continuous paper cuts of birds, branches, and lanterns with custom light layers.',
    image: 'https://i.imgur.com/mQWW3NK.jpeg',
    timeToMake: '6 Days',
    priceEstimate: '$95 / LKR 28,500'
  }
];

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
