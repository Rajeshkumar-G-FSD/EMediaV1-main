import { Customer, Service, Product, BlogPost } from './types.ts';

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
};

export const CUSTOMERS_DATA: Customer[] = [
  {
    id: 'c1',
    title: 'Birthday balloon decoration',
    category: 'Birthday decor',
    date: '24/05/2026',
    description: 'A bright birthday setup with balloon clusters, dessert-table styling, and a photo-ready backdrop for family celebrations.',
    image: EVENT_IMAGES.birthdayDecor
  },
  {
    id: 'c2',
    title: 'Wedding stage decoration',
    category: 'Wedding decor',
    date: '30/04/2026',
    description: 'A romantic wedding stage with layered florals, soft aisle styling, and warm lighting built for a polished reception atmosphere.',
    image: EVENT_IMAGES.weddingDecor
  },
  {
    id: 'c3',
    title: 'Office anniversary decoration',
    category: 'Office event',
    date: '15/01/2026',
    description: 'A clean corporate anniversary setup with brand-friendly table styling, ambient lighting, and a central celebration stage.',
    image: EVENT_IMAGES.officeAnniversaryDecor
  },
  {
    id: 'c4',
    title: 'Traditional ceremony decoration',
    category: 'Ceremony decor',
    date: '08/11/2026',
    description: 'A graceful ceremony design with decorative tables, floral accents, and a welcoming layout for formal family moments.',
    image: EVENT_IMAGES.ceremonyDecor
  },
  {
    id: 'c5',
    title: 'Corporate gala decoration',
    category: 'Event decor',
    date: '12/12/2026',
    description: 'A high-energy event environment with lighting, stage presence, and guest-flow details for launches and company celebrations.',
    image: EVENT_IMAGES.corporateDecor
  }
];

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
    content: `Creating a beautiful wedding album without breaking the budget is always a challenge for couples. Như Ý recommends focusing on three key points:

1. CHOOSE THE RIGHT PACKAGE: Do not get distracted by packages with too many impractical gifts. Focus on edited photo quality and the album size you really want to display at home.

2. PREPARE THE LOOK AND CONCEPT IN ADVANCE: Discuss your story with the creative team so the concept fits your personalities. Self-prepared outfits can often feel more natural than heavily styled rentals.

3. BOOKING TIMING: Reserve at least 2-3 months in advance to secure early offers and avoid peak wedding-season overload that can affect quality.`,
    image: EVENT_IMAGES.planningDecor
  },
  {
    id: 'b2',
    title: 'How to simplify wedding planning and save money',
    summary: 'Tips for streamlining your to-do list and focusing the budget on what matters most.',
    content: 'Simplifying a wedding does not mean doing less carelessly. It means cutting unnecessary steps and investing in the essentials such as food, ceremony decor, and guest hospitality. Như Ý helps handle the planning burden so your family can enjoy the day comfortably.',
    image: EVENT_IMAGES.weddingDecor
  },
  {
    id: 'b3',
    title: 'How rural and city weddings differ in preparation',
    summary: 'A closer look at guest count, tent setup, and traditional service flow compared with urban banquet halls.',
    content: 'Weddings in rural areas usually involve larger family networks and bigger guest counts, requiring broad tented spaces and traditional food service. City weddings, by contrast, often focus on polished, compact experiences in professional banquet halls. Như Ý offers flexible decor packages that work beautifully across both cultures.',
    image: EVENT_IMAGES.banquetDecor
  },
  {
    id: 'b4',
    title: '3 tips for building a smart wedding guest list',
    summary: 'A practical method for balancing table counts and preparing for no-shows.',
    content: 'Guests are the people who bring warmth to your wedding day. Golden rules for building the list: \n1. Prioritize close family and friends you have stayed in touch with over the past year.\n2. Reserve seating clearly for both parents and for the two of you.\n3. Always plan for about 10% of guests not attending so table arrangements stay balanced.',
    image: EVENT_IMAGES.birthdayDecor
  },
  {
    id: 'b5',
    title: 'Useful tips when booking a wedding venue',
    summary: 'Key things to check during a venue tour, including hidden fees and add-on perks.',
    content: 'When touring and choosing a wedding venue, couples should review the contract carefully for service fees, drink policies, outside decor access, and extras such as smoke effects, glass towers, or an MC.',
    image: EVENT_IMAGES.lightingDecor
  }
];
