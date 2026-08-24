import { Artist, GalleryItem, ServiceCategory, ServiceItem } from '../types';

export const SALON_INFO = {
  name: 'AURAÉ MAISON',
  tagline: 'Beauty, Refined.',
  subline: 'A modern beauty atelier in Mumbai.',
  motto: 'Arrive. Unwind. Become.',
  introHeading: 'YOUR BEAUTY, YOUR SIGNATURE.',
  introText: 'Personalised hair, skin and beauty experiences created around you.',
  atelierHeading: 'A SPACE TO EXHALE.',
  atelierText: 'Designed for beauty, comfort and quiet moments.',
  finalCtaHeading: 'READY FOR YOUR SIGNATURE?',
  testimonial: {
    quote: 'It feels less like an appointment and more like something created just for you.',
    author: 'Aditi M.',
    location: 'Bandra, Mumbai',
  },
  locations: [
    {
      id: 'bandra',
      name: 'Pali Hill Atelier',
      address: 'Villa 14, Nargis Dutt Road, Pali Hill, Bandra West, Mumbai 400050',
      phone: '+91 98200 45890',
      hours: 'Tue – Sun: 10:00 AM – 8:00 PM',
      mapsUrl: 'https://maps.google.com/?q=Pali+Hill+Bandra+West+Mumbai',
    },
    {
      id: 'colaba',
      name: 'Colaba Heritage Suite',
      address: 'Floor 2, Hampton House, Mereweather Road, Colaba, Mumbai 400001',
      phone: '+91 98200 45891',
      hours: 'Tue – Sun: 10:00 AM – 8:00 PM',
      mapsUrl: 'https://maps.google.com/?q=Colaba+Mumbai',
    },
  ],
  socials: {
    instagram: 'https://instagram.com/auraemaison',
    instagramHandle: '@auraemaison',
    phone: '+91 98200 45890',
    email: 'concierge@auraemaison.com',
  },
};

export const CATEGORY_PANELS: Array<{
  category: ServiceCategory;
  title: string;
  tagline: string;
  image: string;
  serviceCount: string;
}> = [
  {
    category: 'HAIR',
    title: 'HAIR',
    tagline: 'Precision cuts, French balayage & restorative alchemy.',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=85',
    serviceCount: '8 Signature Rituals',
  },
  {
    category: 'SKIN',
    title: 'SKIN',
    tagline: 'Dermal sculpting, oxygen infusions & bespoke glow.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
    serviceCount: '6 Bespoke Treatments',
  },
  {
    category: 'BEAUTY',
    title: 'BEAUTY',
    tagline: 'Editorial bridal, brow architecture & silk lash design.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85',
    serviceCount: '7 Haute Services',
  },
  {
    category: 'NAILS',
    title: 'NAILS',
    tagline: 'Couture Japanese gel, botanical petal baths & nail art.',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=85',
    serviceCount: '5 Nail Experiences',
  },
];

export const ALL_SERVICES: ServiceItem[] = [
  // HAIR
  {
    id: 'hair-1',
    category: 'HAIR',
    name: 'SIGNATURE SCULPT & BLOWOUT',
    duration: '60 min',
    price: '₹4,200',
    description: 'Personalised consultation, botanical wash, tailored architectural cut, and signature silk blowout.',
    tag: 'Signature',
  },
  {
    id: 'hair-2',
    category: 'HAIR',
    name: 'FRENCH BALAYAGE & GLOSS',
    duration: '150 min',
    price: '₹12,500',
    description: 'Freehand bespoke lightening customized to skin tone, followed by caviar peptide gloss infusion.',
    tag: 'Couture',
  },
  {
    id: 'hair-3',
    category: 'HAIR',
    name: 'BOTANICAL SCALP & FIBER SPA',
    duration: '75 min',
    price: '₹5,800',
    description: 'Micro-exfoliation scalp treatment, steam infusion, and deep biomimetic lipid repair therapy.',
  },
  {
    id: 'hair-4',
    category: 'HAIR',
    name: 'SILK KERATIN INFUSION',
    duration: '180 min',
    price: '₹14,000',
    description: 'Formaldehyde-free smoothing ritual for weightless, glass-like shine and humidity resistance.',
  },
  {
    id: 'hair-5',
    category: 'HAIR',
    name: 'EDITORIAL STYLING & UPDO',
    duration: '60 min',
    price: '₹4,500',
    description: 'Effortless red carpet waves, textured chignon, or sleek editorial styling.',
  },

  // SKIN
  {
    id: 'skin-1',
    category: 'SKIN',
    name: 'BESPOKE OXYGEN RADIANCE',
    duration: '75 min',
    price: '₹7,500',
    description: 'Hyperbaric oxygen infusion loaded with hyaluronic serums and botanical antioxidants for instant glow.',
    tag: 'Signature',
  },
  {
    id: 'skin-2',
    category: 'SKIN',
    name: 'SCULPTING FACIAL & LYMPHATIC',
    duration: '90 min',
    price: '₹9,200',
    description: 'Intra-oral buccal massage, microcurrent contouring, and cold-pressed rose quartz drainage.',
    tag: 'Cult Favourite',
  },
  {
    id: 'skin-3',
    category: 'SKIN',
    name: 'CRYO GLOW RENEWAL',
    duration: '60 min',
    price: '₹6,800',
    description: 'Sub-zero cryo therapy to tighten pore structure, calm inflammation, and restore microcirculation.',
  },
  {
    id: 'skin-4',
    category: 'SKIN',
    name: 'MARINE COLLAGEN PEEL & INFUSE',
    duration: '75 min',
    price: '₹8,400',
    description: 'Gentle fruit enzyme resurfacing followed by bioactive marine collagen sheet immersion.',
  },

  // BEAUTY
  {
    id: 'beauty-1',
    category: 'BEAUTY',
    name: 'ATELIER MAKEUP SIGNATURE',
    duration: '90 min',
    price: '₹8,500',
    description: 'Skin-first, luminous editorial makeup tailored to your personal aesthetic and evening lighting.',
    tag: 'Signature',
  },
  {
    id: 'beauty-2',
    category: 'BEAUTY',
    name: 'EDITORIAL BROW LAMINATION & TINT',
    duration: '45 min',
    price: '₹3,600',
    description: 'Feathered architectural brow sculpting, conditioning keratin glaze, and custom tinting.',
  },
  {
    id: 'beauty-3',
    category: 'BEAUTY',
    name: 'SILK LASH ARCHITECTURE',
    duration: '90 min',
    price: '₹5,500',
    description: 'Weightless Japanese silk extensions individually placed for an organic, fluttery elongation.',
  },
  {
    id: 'beauty-4',
    category: 'BEAUTY',
    name: 'HAUTE BRIDAL PREVIEW & CONSULT',
    duration: '120 min',
    price: '₹14,000',
    description: 'Comprehensive aesthetic vision mapping, skin prep trial, and bespoke look development.',
    tag: 'Bespoke',
  },

  // NAILS
  {
    id: 'nails-1',
    category: 'NAILS',
    name: 'HAUTE COUTURE MANICURE',
    duration: '50 min',
    price: '₹2,800',
    description: 'Cuticle restoration, gentle scrub, warm rosehip oil massage, and breathable Japanese polish.',
    tag: 'Signature',
  },
  {
    id: 'nails-2',
    category: 'NAILS',
    name: 'PETAL BATH PEDICURE RITUAL',
    duration: '60 min',
    price: '₹3,600',
    description: 'Himalayan salt soak with fresh rose petals, volcanic pumice smoothing, and acupressure massage.',
  },
  {
    id: 'nails-3',
    category: 'NAILS',
    name: 'JAPANESE APEX GEL SCULPTING',
    duration: '90 min',
    price: '₹5,200',
    description: 'Zero-damage non-toxic structured gel overlay providing natural strength and diamond shine.',
  },
  {
    id: 'nails-4',
    category: 'NAILS',
    name: 'MINIMALIST LINEAR NAIL ART',
    duration: '30 min',
    price: '₹1,800',
    description: 'Negative space accents, micro French tips, and subtle chrome highlights.',
  },
];

export const ARTISTS: Artist[] = [
  {
    id: 'maya',
    name: 'MAYA SHAH',
    role: 'Creative Hair Director',
    specialty: 'Bespoke Balayage & French Silhouette Cutting',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
    bio: '14 years honing precision techniques across London and Mumbai. Known for creating weightless, natural movement.',
  },
  {
    id: 'riya',
    name: 'RIYA MEHTA',
    role: 'Skin Specialist',
    specialty: 'Dermal Sculpting & Oxygen Infusion Therapy',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85',
    bio: 'Trained in Paris and Tokyo, Riya specializes in holistic facial contouring and deep cellular radiance.',
  },
  {
    id: 'anaya',
    name: 'ANAYA KAPOOR',
    role: 'Beauty Artist',
    specialty: 'Editorial Makeup & Brow Architecture',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85',
    bio: 'Lead artist for premier fashion campaigns. Champion of luminous, skin-focused minimalist beauty.',
  },
];

export const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: 'gal-hair',
    number: '01',
    category: 'HAIR',
    title: 'Signature Styling',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'gal-colour',
    number: '02',
    category: 'HAIR COLOUR',
    title: 'Dimensional Balayage & Gloss',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'gal-cut',
    number: '03',
    category: 'SIGNATURE CUT',
    title: 'Architectural Cut & Shape',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'gal-skin',
    number: '04',
    category: 'SKIN',
    title: 'Luminous Dermal Glow',
    image: 'https://images.unsplash.com/photo-1512290900672-1f5be669d066?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'gal-nails',
    number: '05',
    category: 'NAILS',
    title: 'Couture Nude Manicure',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'gal-beauty',
    number: '06',
    category: 'BEAUTY',
    title: 'Editorial Makeup Finish',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'gal-atelier',
    number: '07',
    category: 'THE ATELIER',
    title: 'Sanctuary Suite',
    image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[4/3]',
    span: 'sm:col-span-2 lg:col-span-2',
  },
  {
    id: 'gal-detail',
    number: '08',
    category: 'DETAIL',
    title: 'Artisan Ritual & Care',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[4/3]',
    span: 'sm:col-span-2 lg:col-span-1',
  },
];

export const EXPERIENCE_STEPS = [
  {
    step: '01',
    title: 'Auraé Consultation',
    text: 'A quiet, unhurried dialogue over our signature white peach infusion to understand your hair texture, facial harmony, and lifestyle rhythm.',
  },
  {
    step: '02',
    title: 'Sensory Preparation',
    text: 'A warm botanical towel ritual and pressure point relaxation to clear the mind before your service commences.',
  },
  {
    step: '03',
    title: 'Artisan Execution',
    text: 'Meticulous, quiet craftsmanship performed by our senior directors using pure organic botanicals and calibrated tools.',
  },
  {
    step: '04',
    title: 'Signature Finish',
    text: 'Personalised home care recommendations and a final styling moment designed to leave you feeling effortlessly elevated.',
  },
];
