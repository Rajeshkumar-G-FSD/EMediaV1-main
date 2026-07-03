import { Customer, Service, Product, BlogPost, ShowcaseContent } from './types.ts';

export const EVENT_IMAGES = {
  heroDecor: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=80',
  welcomeDecor: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
  birthdayDecor: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
  weddingDecor: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
  officeAnniversaryDecor: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
  ceremonyDecor: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
  corporateDecor: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
  floralArch: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
  banquetDecor: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
  tableDecor: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
  lightingDecor: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=80',
  planningDecor: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  preWeddingShoot: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1200&q=80',
  shopOpening: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
  balloonDecor: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80',
  familyGather: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
  flexBanner: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=80',
};

export const CUSTOMERS_DATA: Customer[] = [
  {
    id: 'c1',
    title: 'Birthday balloon decoration',
    category: 'Birthday decor',
    date: '24/05/2026',
    description: 'A bright birthday setup with balloon clusters, dessert-table styling, and a photo-ready backdrop for family celebrations.',
    image: '/images/birtthday_decorations.png'
  },
  {
    id: 'c4',
    title: 'Traditional ceremony decoration',
    category: 'Ceremony decor',
    date: '08/11/2026',
    description: 'A graceful ceremony design with decorative tables, floral accents, and a welcoming layout for formal family moments.',
    image: '/images/baby_ceremony_decorations.png'
  },
  {
    id: 'c5',
    title: 'Corporate gala decoration',
    category: 'Event decor',
    date: '12/12/2026',
    description: 'A high-energy event environment with lighting, stage presence, and guest-flow details for launches and company celebrations.',
    image: '/images/cooking_event_decoration.png'
  },
  {
    id: 'c6',
    title: 'Corporate anniversary decoration',
    category: 'Corporate event',
    date: '18/03/2026',
    description: 'A professionally styled corporate anniversary stage with brand-aligned backdrops, ambient lighting, and a polished celebration setup.',
    image: '/images/cooking_event_stage_decor.png'
  },
  {
    id: 'c7',
    title: 'Wedding decoration',
    category: 'Wedding decor',
    date: '22/06/2026',
    description: 'An elegant wedding decoration with layered florals, a grand stage backdrop, and warm lighting crafted for a timeless celebration.',
    image: '/images/wedding_decoration.png'
  },
  {
    id: 'c8',
    title: 'Flex banner',
    category: 'Flex decor',
    date: '05/07/2026',
    description: 'A vibrant flex banner setup with sharp branding, durable printing, and eye-catching placement for events and promotions.',
    image: '/images/emedia_flex.png'
  }
];

// Detail-page SEO content and gallery images shown when a Decoration 3D Showcase
// card is opened. Some gallery entries are EMedia's own event photos; the rest
// are sample/inspiration images used as placeholder style references.
export const SHOWCASE_CONTENT: Record<string, ShowcaseContent> = {
  c1: {
    tagline: 'Erode’s Favourite Balloon Decorators',
    heroSubtitle: 'Birthday Balloon Decoration in Erode',
    intro: [
      'EMedia Event & Promotions is one of the most sought-after names for birthday balloon decoration in Erode, known for colourful balloon arches, personalised name and age banners, and photo-ready backdrops that turn any birthday into a celebration to remember.',
      'From kids’ theme parties to milestone birthdays and surprise celebrations, our Erode-based team designs balloon columns, ceiling clusters, and table centrepieces using premium latex and foil balloons — set up on time and matched to the colours and theme you choose.',
    ],
    highlights: [
      'Custom name & age balloon backdrops',
      'Balloon arches, columns and ceiling clusters',
      'Theme-based colour palettes for kids & adults',
      'Same-day setup available across Erode',
      'Add-ons: table skirting, LED lighting, photo props',
    ],
    gallery: [
      '/images/birtthday_decorations.png',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=60',
    ],
  },
  c4: {
    tagline: 'Traditional Ceremony Decoration, Erode',
    heroSubtitle: 'Naming Ceremony, Baptism & Family Function Decor',
    intro: [
      'EMedia designs graceful traditional ceremony decorations across Erode for naming ceremonies, baptisms, puberty functions, and other family milestones — blending floral welcome arches, elegant drapery, and warm ambient lighting.',
      'Every ceremony setup is planned around your family’s traditions and the venue layout, with comfortable seating, a well-lit stage for photos, and coordinated styling from entrance to backdrop.',
    ],
    highlights: [
      'Floral welcome arches & ring/cradle decor',
      'Traditional drape backdrops with fairy lighting',
      'Stage & mandapam styling for family functions',
      'Photo-friendly layout for guests and priests',
      'On-site coordination on the day of the event',
    ],
    gallery: [
      '/images/baby_ceremony_decorations.png',
      '/images/Emediaevnt_stage_ring_decoration.png',
      '/images/Emediaevnt_stage_wedding_decorations.png',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=60',
    ],
  },
  c5: {
    tagline: 'Corporate Gala & Launch Event Decoration',
    heroSubtitle: 'Brand Activations, Launches & Gala Stages in Erode',
    intro: [
      'EMedia builds high-energy corporate gala environments in Erode — branded stage backdrops, guest-flow layouts, and lighting designed for product launches, TV/media shoots, and company celebrations.',
      'We work closely with brand and event teams to translate sponsor logos, colour palettes, and campaign themes into a polished, photograph-ready stage that holds up for a full day of filming or guest activity.',
    ],
    highlights: [
      'Branded stage backdrops for launches & shoots',
      'Sponsor-wall and step-and-repeat styling',
      'Ambient and accent stage lighting',
      'Guest-flow layout for large-scale events',
      'On-ground coordination with brand teams',
    ],
    gallery: [
      '/images/cooking_event_decoration.png',
      '/images/Emediaevnt_cooking_decoration.png',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=60',
    ],
  },
  c6: {
    tagline: 'Corporate Anniversary Stage Decoration',
    heroSubtitle: 'Company Anniversary & Milestone Celebrations in Erode',
    intro: [
      'For company anniversaries and milestone celebrations, EMedia designs a polished corporate stage with brand-aligned backdrops, ambient lighting, and a clean, professional finish for speeches, awards, and group photos.',
      'Our Erode team handles everything from stage backdrop and seating layout to lighting and finishing touches, so your team can focus on the celebration.',
    ],
    highlights: [
      'Brand-aligned stage backdrops',
      'Ambient and spotlight stage lighting',
      'Award-ceremony and speech-ready staging',
      'Seating and guest layout planning',
      'Coordinated setup and breakdown',
    ],
    gallery: [
      '/images/cooking_event_stage_decor.png',
      '/images/Emediaevnt_stag_decoration.png',
      'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=60',
    ],
  },
  c7: {
    tagline: 'Erode’s Trusted Wedding Decorators',
    heroSubtitle: 'Wedding Stage, Mandap & Reception Decoration in Erode',
    intro: [
      'EMedia Event & Promotions is one of Erode’s most sought-after wedding decoration teams, crafting layered floral stages, grand entrance backdrops, and reception styling designed around your wedding colours and venue.',
      'From the welcome arch to the mandap and reception tables, every element is planned to photograph beautifully and hold up through a full day of ceremonies and celebration.',
    ],
    highlights: [
      'Floral mandap & stage backdrop design',
      'Grand entrance and welcome arch styling',
      'Reception table and centrepiece decor',
      'Colour-matched drapery and ambient lighting',
      'Full-day on-site setup and coordination',
    ],
    gallery: [
      '/images/wedding_decoration.png',
      '/images/Emediaevnt_stage_wedding_decoration.png',
      '/images/Emediaevnt_stage_wedding_decorations.png',
      '/images/Emediaevnt_wedding_decoration.png',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=60',
    ],
  },
  c8: {
    tagline: 'Flex Banner Printing & Installation, Erode',
    heroSubtitle: 'Durable Flex Banners for Shops, Events & Promotions',
    intro: [
      'EMedia offers fast, high-resolution flex banner printing and installation across Erode — for shop openings, event branding, roadside promotions, and vehicle-mounted campaign banners.',
      'Every banner is printed on weatherproof vinyl with sharp, fade-resistant colour and can be sized and installed to match your storefront, stage backdrop, or promotional vehicle.',
    ],
    highlights: [
      'High-resolution, fade-resistant printing',
      'Weatherproof vinyl for indoor & outdoor use',
      'Custom sizing for shops, stages & vehicles',
      'Quick turnaround for time-sensitive promotions',
      'Installation support across Erode',
    ],
    gallery: [
      '/images/emedia_flex.png',
      'https://images.unsplash.com/photo-1557804483-ef3ae78eca57?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60',
    ],
  },
};

export const SERVICES_DATA: Service[] = [
  {
    id: 's1',
    title: 'Ancestral ceremony decor',
    description: 'Decor for the family altar and living area. Flexible color palettes and refined styling create a sacred and radiant atmosphere for engagement and wedding traditions.',
    detailedDescription: 'Như Ý’s premium ancestral ceremony decor brings warmth and sophistication to the moment both families come together. Packages range from traditional to modern and include floral entrances, ceremonial backdrops, detailed dragon-phoenix altar styling, artistic gift trays, and elegant seating for both families.',
    priceRange: '8.000.000 - 25.000.000 VNĐ',
    image: EVENT_IMAGES.ceremonyDecor
  },
  {
    id: 's2',
    title: 'Wedding reception decor',
    description: 'Design and production for reception halls, floral aisles, gallery tables, and the main stage. We shape your venue into a romantic space that reflects your story.',
    detailedDescription: 'Creative wedding venue styling tailored to each couple’s theme. Full-service packages include a standout stage backdrop, a romantic flower-lined aisle, a charming gallery table for memories, and refined table florals. Như Ý turns your vision into a real setting.',
    priceRange: '15.000.000 - 60.000.000 VNĐ',
    image: EVENT_IMAGES.weddingDecor
  },
  {
    id: 's3',
    title: 'Outdoor event setup',
    description: 'Consulting and setup for tented, beach, and garden events. Fresh flowers and warm string lights create a polished evening atmosphere.',
    detailedDescription: 'We specialize in styling and coordinating outdoor weddings at beaches and romantic gardens. Our complete solution includes professional sound and lighting, weather-ready structures, artful flower combinations, and thoughtful event flow planning.',
    priceRange: '20.000.000 - 80.000.000 VNĐ',
    image: EVENT_IMAGES.banquetDecor
  },
  {
    id: 's4',
    title: 'Birthday party decoration',
    description: 'Balloon walls, themed tables, lighting accents, and playful stage styling for birthdays and family celebrations.',
    detailedDescription: 'Our birthday decoration packages include balloon styling, dessert table setup, theme props, backdrop design, entry decor, and photo-ready lighting so every celebration feels bright and personal.',
    priceRange: '7.000.000 - 18.000.000 VNĐ',
    image: EVENT_IMAGES.birthdayDecor
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'p1',
    name: 'Silk tent frame in fresh green',
    category: 'Canopies',
    description: 'A refined canopy made with soft white and fresh green silk that creates a cool, elegant shelter for outdoor weddings and receptions.',
    detailedDescription: 'A premium modular tent system from Như Ý. The white and fresh green silk fabric creates a light, airy feel while the steel frame keeps the structure safe and sturdy.',
    price: '4.500.000 VNĐ / Bộ',
    image: EVENT_IMAGES.banquetDecor
  },
  {
    id: 'p2',
    name: 'Red and white chiffon floral arch',
    category: 'Floral arches',
    description: 'A graceful arched entrance combining red chiffon drapery with French roses and white peonies for a striking guest welcome.',
    detailedDescription: 'An artistic wedding arch that pairs romantic red chiffon with rich rose and peony arrangements. Ideal for formal guest entrances at homes, halls, or restaurants.',
    price: '3.200.000 VNĐ / Chiếc',
    image: EVENT_IMAGES.floralArch
  },
  {
    id: 'p3',
    name: 'Artisan dragon-phoenix tray set',
    category: 'Ceremonial trays',
    description: 'A classic pair of dragon and phoenix forms handcrafted from fragrant leaves, fresh areca fruit, and marigolds to symbolize harmony.',
    detailedDescription: 'A traditional handcrafted set shaped into intricate dragon and phoenix symbols using fragrant leaves, chili peppers, areca fruit, and fresh marigolds. It represents lasting harmony and a respectful Vietnamese wedding tradition.',
    price: '6.000.000 VNĐ / Bộ hai linh vật',
    image: EVENT_IMAGES.ceremonyDecor
  },
  {
    id: 'p4',
    name: 'Dragon-phoenix gift tray set',
    category: 'Ceremonial trays',
    description: 'An engagement tray set with ornate dragon and phoenix details, designed to present offerings to the ancestors with elegance.',
    detailedDescription: 'A premium handcrafted tray set from Như Ý. Each dragon and phoenix form is assembled from uniform areca fruit, red chilies, sculpted young coconut leaves, and fresh imported fruit.',
    price: '4.800.000 VNĐ / Bộ',
    image: EVENT_IMAGES.tableDecor
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'How to get a beautiful wedding album on a smart budget',
    summary: 'A practical guide for estimating costs, choosing the right photo package, and avoiding unnecessary extras.',
    content: `Creating a beautiful wedding album without breaking the budget is always a challenge for couples. EMedia recommends focusing on three key points:

1. CHOOSE THE RIGHT PACKAGE: Do not get distracted by packages with too many impractical gifts. Focus on edited photo quality and the album size you really want to display at home.

2. PREPARE THE LOOK AND CONCEPT IN ADVANCE: Discuss your story with the creative team so the concept fits your personalities. Self-prepared outfits can often feel more natural than heavily styled rentals.

3. BOOKING TIMING: Reserve at least 2-3 months in advance to secure early offers and avoid peak wedding-season overload that can affect quality.`,
    image: EVENT_IMAGES.planningDecor,
    category: 'Wedding',
    subcategory: 'Photography',
  },
  {
    id: 'b2',
    title: 'How to simplify wedding planning and save money',
    summary: 'Tips for streamlining your to-do list and focusing the budget on what matters most.',
    content: 'Simplifying a wedding does not mean doing less carelessly. It means cutting unnecessary steps and investing in the essentials such as food, ceremony decor, and guest hospitality. EMedia helps handle the planning burden so your family can enjoy the day comfortably.',
    image: EVENT_IMAGES.weddingDecor,
    category: 'Wedding',
    subcategory: 'Decorations',
  },
  {
    id: 'b3',
    title: 'How rural and city weddings differ in preparation',
    summary: 'A closer look at guest count, tent setup, and traditional service flow compared with urban banquet halls.',
    content: 'Weddings in rural areas usually involve larger family networks and bigger guest counts, requiring broad tented spaces and traditional food service. City weddings, by contrast, often focus on polished, compact experiences in professional banquet halls. EMedia offers flexible decor packages that work beautifully across both cultures.',
    image: EVENT_IMAGES.banquetDecor,
    category: 'Wedding',
    subcategory: 'Decorations',
  },
  {
    id: 'b4',
    title: '3 tips for building a smart wedding guest list',
    summary: 'A practical method for balancing table counts and preparing for no-shows.',
    content: 'Guests are the people who bring warmth to your wedding day. Golden rules for building the list: \n1. Prioritize close family and friends you have stayed in touch with over the past year.\n2. Reserve seating clearly for both parents and for the two of you.\n3. Always plan for about 10% of guests not attending so table arrangements stay balanced.',
    image: EVENT_IMAGES.birthdayDecor,
    category: 'Wedding',
  },
  {
    id: 'b5',
    title: 'Useful tips when booking a wedding venue',
    summary: 'Key things to check during a venue tour, including hidden fees and add-on perks.',
    content: 'When touring and choosing a wedding venue, couples should review the contract carefully for service fees, drink policies, outside decor access, and extras such as smoke effects, glass towers, or an MC.',
    image: EVENT_IMAGES.lightingDecor,
    category: 'Wedding',
  },
  {
    id: 'b6',
    title: 'Pre-wedding shoot: how to make every frame count',
    summary: 'Locations, outfits, and timing tips for a memorable pre-wedding photography session.',
    content: `A pre-wedding shoot is your chance to capture the chemistry and story before the big day. Here's how to make it unforgettable:

1. PICK THE RIGHT LOCATION: Choose a spot that means something to both of you — the place you first met, a scenic garden, or a rustic heritage site. Natural light before sunset gives the warmest tones.

2. WARDROBE PLANNING: Carry two outfit changes — one traditional and one casual. Coordinate colors with each other and the backdrop without matching too exactly.

3. RELAX AND HAVE FUN: The best pre-wedding shots come from genuine smiles. Talk, laugh, and let the photographer capture candid moments between the posed ones.

EMedia works closely with trusted photographers to plan pre-wedding sessions that complement your decoration theme perfectly.`,
    image: EVENT_IMAGES.preWeddingShoot,
    category: 'Wedding',
    subcategory: 'Pre Wedding Shoot',
  },
  {
    id: 'b7',
    title: 'Grand shop opening decoration: make a lasting first impression',
    summary: 'How to create a festive, brand-aligned decoration setup for your shop or showroom launch.',
    content: `A shop opening is a once-in-a-business milestone. The decoration sets the tone for your brand identity from day one.

Key elements EMedia covers for shop openings:
• Entrance arch with balloons, flowers, or branded flex banners
• Red ribbon ceremony setup with a professional backdrop
• Interior ambiance lighting and product highlight displays
• Welcome signage and branded photo zones for social media coverage

A well-decorated shop opening draws attention from passersby, creates shareable moments, and gives your new venture the visibility it deserves. Contact EMedia for a customized package.`,
    image: EVENT_IMAGES.shopOpening,
    category: 'Promotions',
    subcategory: 'Shop Opening',
  },
  {
    id: 'b8',
    title: 'Birthday balloon decoration ideas that wow every age',
    summary: 'Creative balloon arrangements for kids, teens, and adult birthdays that transform any space.',
    content: `Balloons are the heartbeat of a birthday celebration. From simple clusters to elaborate sculpted arches, the right balloon setup turns any venue into a party.

EMedia's birthday balloon packages include:
• Balloon bouquets and centerpieces matching the party theme
• Balloon arches and entrance frames for dramatic first impressions
• Ceiling clusters with fairy lights for an ambient nighttime look
• Custom balloon columns with personalized number balloons for milestones

Whether it is a first birthday or a 50th, EMedia designs setups that feel personal, vibrant, and camera-ready.`,
    image: EVENT_IMAGES.birthdayDecor,
    category: 'Balloon Decorations',
    subcategory: 'Birthday',
  },
  {
    id: 'b9',
    title: 'Balloon decoration for shop opening ceremonies',
    summary: 'Balloon arches, entrance clusters, and brand-themed setups that attract crowds on your opening day.',
    content: `Balloons at a shop opening do more than decorate — they signal excitement and draw foot traffic. A colorful balloon arch at the entrance immediately communicates celebration.

EMedia specializes in:
• Grand entrance arches in brand colors
• Ribbon-cutting ceremony balloon backdrops
• Floating balloon clusters for interior and storefront
• Outdoor balloon columns that stay sturdy through the event

We coordinate timing so balloons are fresh and full of air when your guests arrive, and we handle clean-up so you can focus entirely on your launch.`,
    image: EVENT_IMAGES.balloonDecor,
    category: 'Balloon Decorations',
    subcategory: 'Shop Opening Ceremony',
  },
  {
    id: 'b10',
    title: 'Balloon decorations for every other occasion',
    summary: 'Anniversaries, baby showers, engagements, and more — balloons work for any celebration.',
    content: `Beyond birthdays and shop openings, balloons add warmth and festivity to almost any event. EMedia creates custom balloon setups for:

• Baby showers with pastel organic balloon garlands
• Engagement parties with heart and ring-shaped balloon clusters
• Anniversary celebrations with gold and white themed arches
• Farewell parties with personalized balloon backdrops
• School and college events with vibrant multi-color arrangements

Every occasion is unique, and EMedia tailors the design, color palette, and size of the setup to match the mood of your event perfectly.`,
    image: EVENT_IMAGES.ceremonyDecor,
    category: 'Balloon Decorations',
    subcategory: 'Others',
  },
  {
    id: 'b11',
    title: 'Corporate event decoration that impresses clients and employees',
    summary: 'Professional, brand-aligned decor for product launches, award nights, and company celebrations.',
    content: `Corporate events demand a balance of professionalism and celebration. The decoration should reinforce your brand identity while creating an engaging atmosphere.

EMedia's corporate event services include:
• Stage and podium backdrops with company branding
• Table centerpieces in corporate color palettes
• Award ceremony and gala dinner styling
• Product launch display setups with lighting accents
• Conference and seminar entrance decoration

Every detail is planned to reflect your company's values and leave a strong impression on attendees. EMedia handles the full setup and breakdown so your team stays focused on the event itself.`,
    image: EVENT_IMAGES.corporateDecor,
    category: 'Corporate Events',
  },
  {
    id: 'b12',
    title: 'Family get-together decoration: creating warmth and togetherness',
    summary: 'Cozy, welcoming decoration ideas for reunions, festivals, and family milestone celebrations.',
    content: `Family gatherings deserve a setting that feels warm, inclusive, and full of life. Whether it is a holiday reunion or a milestone anniversary, the right decoration makes the atmosphere feel special.

EMedia creates family event setups that include:
• Welcome entrance arches with floral or balloon styling
• Warm string light canopies for outdoor evening gatherings
• Themed table arrangements for festival and cultural events
• Personalized photo display walls to celebrate memories
• Kids' corner decoration for multi-generational events

The goal is to create a space where every generation feels comfortable, celebrated, and present in the moment.`,
    image: EVENT_IMAGES.familyGather,
    category: 'Family Get-together',
  },
  {
    id: 'b13',
    title: 'Flex banner design tips for maximum visibility and impact',
    summary: 'How to design, print, and install flex banners that stand out for your event or business.',
    content: `A well-designed flex banner is one of the most cost-effective ways to promote an event, shop, or brand. But poorly designed banners get ignored.

EMedia's tips for high-impact flex banners:
1. KEEP TEXT MINIMAL: Use no more than 3-5 lines. Your audience reads while walking — keep it scannable.
2. HIGH CONTRAST COLORS: Dark text on light backgrounds (or vice versa) is always more readable from a distance.
3. INCLUDE A CLEAR CALL TO ACTION: Phone number, website, or QR code should always be visible.
4. CHOOSE THE RIGHT SIZE: Entrance banners need to be at least 4×6 feet to be seen from the road.
5. QUALITY PRINTING MATTERS: EMedia uses UV-resistant inks and heavy-duty PVC material for banners that stay vibrant through rain and sun.

Contact EMedia for full-service flex banner design, printing, and installation.`,
    image: EVENT_IMAGES.flexBanner,
    category: 'Flex Banner',
  },
];

// Shared between the Quick Quote Tool and the admin dashboard so both read from one source of truth.
export const EVENT_TYPES = [
  { id: 'birthday', label: 'Birthday Events', price: 15000 },
  { id: 'balloon-decoration', label: 'Balloon Decoration', price: 6000 },
  { id: 'wedding-decoration', label: 'Wedding Decoration', price: 45000 },
  { id: 'corporate', label: 'Corporate Events', price: 35000 },
  { id: 'wedding-shoot', label: 'Wedding Shoot', price: 20000 },
  { id: 'kids-photography', label: 'Kids Photography', price: 8000 },
  { id: 'traditional-ceremony', label: 'Traditional Ceremony Events', price: 18000 },
];

export const ADDONS = [
  { id: 'photography', label: 'Photography', price: 8000 },
  { id: 'decoration', label: 'Decoration', price: 15000 },
  { id: 'balloon-decoration', label: 'Balloon Decoration', price: 5000 },
  { id: 'catering', label: 'Catering', price: 20000 },
  { id: 'stage-decoration', label: 'Stage Decoration', price: 12000 },
  { id: 'pre-wedding-shoot', label: 'Pre Wedding Shoot', price: 10000 },
  { id: 'baby-ceremony', label: 'Baby Ceremony', price: 8000 },
  { id: 'kids-photography', label: 'Kids Photography', price: 6000 },
  { id: 'couple-photography', label: 'Couple Photography', price: 7000 },
];
