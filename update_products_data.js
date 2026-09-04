const fs = require('fs');
const path = require('path');

const productsData = `/**
 * GLOWISTIC - Official Verified Product Catalog
 * Brand: Glowistic (www.glowisticpk.com)
 * All packaging details, labels, colors, and ingredients preserved exactly as manufactured.
 */

export const CATEGORIES = [
  { id: 'all', name: 'All Products', count: 9 },
  { id: 'skincare', name: 'Skincare', count: 2 },
  { id: 'haircare', name: 'Hair Care', count: 3 },
  { id: 'personalcare', name: 'Personal Care', count: 1 },
  { id: 'bodycare', name: 'Body Care', count: 1 },
  { id: 'wellness', name: 'Wellness', count: 2 },
  { id: 'supplements', name: 'Supplements', count: 3 }
];

export const PRODUCTS = [
  {
    id: 'oclear-acne-serum',
    name: "O'Clear Acne Clear Serum",
    subtitle: "Tea Tree Oil & Salicylic Acid",
    tagline: "Clear Skin. Boost Confidence.",
    category: 'skincare',
    categoryName: 'Skincare',
    price: 1450,
    originalPrice: 1750,
    salePrice: 1450,
    onSale: true,
    rating: 4.9,
    reviewCount: 128,
    image: 'assets/products/oclear-serum.jpg',
    gallery: ['assets/products/oclear-serum.jpg'],
    badge: 'Bestseller',
    badgeType: 'gold',
    volume: '30 ml e',
    inStock: true,
    stockCount: 45,
    sku: 'GLW-SKN-001',
    shortDesc: 'A powerful purifying blend that targets acne, calms redness, and gently exfoliates for a clear, healthy glow.',
    description: "O'Clear Acne Clear Serum is an advanced, targeted dermatological formula blending natural Tea Tree Oil with clinically proven Salicylic Acid. Designed for all skin types—especially acne-prone and sensitive skin—it gently unclogs pores, soothes inflammation, and restores your natural healthy barrier.",
    features: [
      'Fights Acne: Helps reduce active breakouts and prevents future clogged pores.',
      'Soothes & Calms: Botanical Tea Tree Oil calms redness and irritation.',
      'Clearer, Healthier Skin: Salicylic Acid gently exfoliates and refines skin texture.',
      'Dermatologically Tested, Paraben-Free, Sulfate-Free & Cruelty-Free.',
      'For All Skin Types, especially acne-prone skin.'
    ],
    ingredients: 'Aqua, Butylene Glycol, Salicylic Acid, Niacinamide, Betaine, Melaleuca Alternifolia (Tea Tree) Leaf Oil, Cellulose, Panthenol, Glycerin, Allantoin, Boswellia Serrata Resin Extract, Vitamin E, Sodium Hyaluronate.',
    howToUse: 'Cleanse face thoroughly (ideally with Glowistic Neem Face Wash). Apply 3-4 drops of O\\'Clear Serum directly onto face and neck. Gently pat into skin until fully absorbed. Use daily, morning and night, followed by your favorite moisturizer.',
    idealFor: 'Acne-prone skin, blemishes, blackheads, excess sebum, and uneven skin texture.',
    importantNotes: 'For external cosmetic use only. Avoid direct contact with eyes. Patch test on a small area of the jawline prior to first application. Store in a cool, dry place below 25°C away from direct sunlight.',
    faqs: [
      {
        q: "Can I use O'Clear Serum both morning and evening?",
        a: "Yes, you can apply 3-4 drops after cleansing in the morning and evening, followed by your regular moisturizer and sunscreen during daytime."
      },
      {
        q: "Is this serum suitable for sensitive or acne-prone skin?",
        a: "Yes, it is dermatologically formulated for all skin types and specifically optimized for acne-prone and sensitive skin."
      },
      {
        q: "How does Cash on Delivery work for this order?",
        a: "You can place your order online without advance payment and pay the courier cash upon delivery anywhere in Pakistan."
      }
    ]
  },
  {
    id: 'neem-face-wash',
    name: 'Neem Face Wash',
    subtitle: 'Purifying Cleanser for Clear, Acne-Free Skin',
    tagline: 'Purifies & Deep Cleanses Everyday.',
    category: 'skincare',
    categoryName: 'Skincare',
    price: 650,
    originalPrice: 750,
    salePrice: 650,
    onSale: true,
    rating: 4.8,
    reviewCount: 94,
    image: 'assets/products/neem-facewash.jpg',
    gallery: ['assets/products/neem-facewash.jpg'],
    badge: 'Clean Routine',
    badgeType: 'green',
    volume: '60 ml e',
    inStock: true,
    stockCount: 80,
    sku: 'GLW-SKN-002',
    shortDesc: 'Purifying gentle cleanser infused with organic neem extracts to eliminate impurities and balance oils.',
    description: 'Glowistic Neem Face Wash is a gentle yet potent everyday cleanser that deeply purifies your pores without stripping essential moisture. Neem is legendary for its natural antibacterial properties, washing away daily pollutants, environmental impurities, and excess oil.',
    features: [
      'Purifies & Deep Cleanses: Lifts away deep-seated dirt, pollution, and oil.',
      'Fights Acne & Blemishes: Natural antibacterial neem helps keep skin clear.',
      'Gentle & Non-Drying: Leaves skin refreshed, balanced, and soft.',
      'Everyday essential suitable for all family members.'
    ],
    ingredients: 'Pure Neem Extract, Aqua, Decyl Glucoside, Glycerin, Aloe Vera Leaf Juice, Tea Tree Essential Oil, Vitamin E, Citric Acid.',
    howToUse: 'Moisten face and neck. Apply a small quantity of Neem Face Wash and gently work up a lather using a circular motion. Wash off and pat dry. Use twice daily.',
    idealFor: 'Daily facial cleansing, oily to normal skin, teenagers and adults fighting everyday blemishes.',
    importantNotes: 'For external facial cleansing only. If irritation occurs, rinse thoroughly with fresh water and discontinue use. Store at room temperature away from direct sunlight.',
    faqs: [
      {
        q: "How many times a day should I use Neem Face Wash?",
        a: "For best results, use twice daily — once in the morning and once before bedtime."
      },
      {
        q: "Does it strip or dry out the skin?",
        a: "No, its gentle non-drying formula with pure neem extract and aloe vera cleanses deeply while preserving natural moisture."
      },
      {
        q: "Is Cash on Delivery available?",
        a: "Yes, Cash on Delivery is available across all cities and towns in Pakistan."
      }
    ]
  },
  {
    id: 'reroot-onion-rosemary-shampoo',
    name: 'reroot® Onion + Rosemary Anti-Hairfall Shampoo',
    subtitle: 'Strengthening & Thickening Botanical Cleanse',
    tagline: 'Fortify Your Roots Naturally.',
    category: 'haircare',
    categoryName: 'Hair Care',
    price: 1250,
    originalPrice: 1500,
    salePrice: 1250,
    onSale: true,
    rating: 4.9,
    reviewCount: 156,
    image: 'assets/products/reroot-shampoo.jpg',
    gallery: ['assets/products/reroot-shampoo.jpg'],
    badge: 'Trending',
    badgeType: 'burgundy',
    volume: '250 ml',
    inStock: true,
    stockCount: 60,
    sku: 'GLW-HAR-001',
    shortDesc: '0% Parabens, Sulphates, Silicones. Powered by pure red onion & rosemary extracts for dense, thick hair.',
    description: 'reroot® Onion + Rosemary Anti-Hairfall Shampoo is an intensive botanical formulation crafted to reduce hair shedding, strengthen weak follicles, and stimulate natural root vitality. Free from harsh sulphates and silicones, it gently cleanses the scalp while delivering essential nutrients.',
    features: [
      '0% Parabens, Sulphates, Silicones: Pure, non-stripping scalp care.',
      'Strengthening & Thickening: Red Onion extract rich in sulphur promotes collagen production.',
      'Rosemary Essential Oil: Known to stimulate scalp circulation and awaken dormant follicles.',
      'For All Hair Types: Safe for color-treated, chemically processed, and sensitive scalps.'
    ],
    ingredients: 'Red Onion Seed Oil Extract, Rosemary Leaf Extract, Biotin, Plant Keratin, Aqua, Sodium Lauroyl Sarcosinate, Cocamidopropyl Betaine, Vitamin B5, Argan Oil.',
    howToUse: 'Wet hair thoroughly with warm water. Take an adequate amount of shampoo and massage gently into scalp and hair strands for 2-3 minutes. Rinse thoroughly with cool water.',
    idealFor: 'Excessive hair fall, thinning hair, weak roots, and brittle strands.',
    importantNotes: 'Free from parabens, sulphates, and silicones. Avoid direct contact with eyes; rinse immediately with clean water if contact occurs. Store in a cool, dry place.',
    faqs: [
      {
        q: "Is this shampoo safe for daily use and colored hair?",
        a: "Yes, the 0% sulphate and paraben formula is gentle enough for daily cleansing and safe for color-treated hair."
      },
      {
        q: "How should I apply it for best results?",
        a: "Massage into wet scalp and hair strands for 2-3 minutes to allow botanical actives to penetrate, then rinse with cool water."
      },
      {
        q: "What are the delivery charges?",
        a: "Orders of Rs. 2,500 or more receive FREE Delivery; otherwise standard nationwide COD delivery is Rs. 200."
      }
    ]
  },
  {
    id: 'reroot-hair-growth-pack',
    name: 'reroot® Hair Growth Spray & Tablets Pack',
    subtitle: 'One-Month Hair Strengthening Course',
    tagline: 'Complete Dual-Action Follicle Regrowth System.',
    category: 'haircare',
    categoryName: 'Hair Care',
    price: 2850,
    originalPrice: 3400,
    salePrice: 2850,
    onSale: true,
    rating: 5.0,
    reviewCount: 88,
    image: 'assets/products/reroot-growth-pack.jpg',
    gallery: ['assets/products/reroot-growth-pack.jpg'],
    badge: 'Complete Course',
    badgeType: 'gold',
    volume: '1x 60ml Spray + 2x 60 Tablets',
    inStock: true,
    stockCount: 35,
    sku: 'GLW-HAR-002',
    shortDesc: 'Comprehensive inside-out hair therapy combining targeted topical spray with rich nutraceutical tablets.',
    description: 'The reroot® Hair Growth Pack is a powerful, synergistic 1-month treatment combining external topical nourishment and internal cellular nutrition. The active herbal spray stimulates follicles directly at the scalp surface, while the nutraceutical tablets replenish key micronutrients.',
    features: [
      'Dual-Action Therapy: 1x 60ml intensive scalp spray + 2x 60 nutraceutical tablets.',
      'One-Month Hair Strengthening Course: Formulated for visible density improvements.',
      'Nourishes Roots Internally: Fortified with Biotin, Zinc, Iron, and Vitamin Complex.',
      'Stimulates Growth Externally: Herbal peptide spray activates dormant hair follicles.'
    ],
    ingredients: 'Spray: Rosemary Hydrosol, Redensyl, Procapil, Onion Extract, Caffeine, Aqua. Tablets: Biotin 5000mcg, Zinc Sulphate, Folic Acid, Vitamin E, Keratin Hydrolysate, Iron, Marine Collagen.',
    howToUse: 'Spray: Apply 4-5 sprays directly onto dry scalp twice daily, gently massaging with fingertips. Tablets: Take 1 tablet twice daily with meals or as advised by your healthcare specialist.',
    idealFor: 'Moderate to severe hair thinning, post-stress hair shedding, receding hairlines, and slow hair growth.',
    importantNotes: 'Spray is for topical scalp use only. Tablets are dietary nutraceuticals to be taken with meals. Do not exceed the advised daily dosage. Consult your physician if pregnant, nursing, or taking other medications.',
    faqs: [
      {
        q: "What is included in the reroot® 1-Month Pack?",
        a: "You receive 1x 60ml intensive scalp spray plus 2 bottles of 60 nutraceutical tablets (120 tablets total)."
      },
      {
        q: "How do I take the tablets and spray together?",
        a: "Apply 4-5 sprays onto dry scalp twice daily, and take 1 tablet twice daily with meals."
      },
      {
        q: "Is this eligible for Free Delivery?",
        a: "Yes! At Rs. 2,850, this pack automatically qualifies for FREE Delivery across Pakistan."
      }
    ]
  },
  {
    id: 'hair-n-scalp-shampoo-arnica',
    name: 'Hair N Scalp Shampoo With Arnica',
    subtitle: 'Nourishing & Strengthening Hair Therapy',
    tagline: 'Silky, Shiny, Strong, Long & Beautiful Hair.',
    category: 'haircare',
    categoryName: 'Hair Care',
    price: 850,
    originalPrice: 950,
    salePrice: 850,
    onSale: true,
    rating: 4.7,
    reviewCount: 72,
    image: 'assets/products/arnica-shampoo.jpg',
    gallery: ['assets/products/arnica-shampoo.jpg'],
    badge: 'Herbal Care',
    badgeType: 'green',
    volume: '200 mL',
    inStock: true,
    stockCount: 50,
    sku: 'GLW-HAR-003',
    shortDesc: 'Free from parabens. Enriched with natural Arnica flower extracts to nourish scalp, prevent dandruff, and add silky shine.',
    description: 'Hair N Scalp Shampoo With Arnica combines the healing properties of Arnica Montana flower extract with gentle conditioning agents. It soothes irritated, dry scalps, prevents flaky buildup, and leaves your hair with a luminous, silky softness.',
    features: [
      'With Natural Arnica: Promotes healthy scalp environment and soothes itching.',
      'Free from Parabens: Gentle, family-safe cleansing formula.',
      'Silky, Shiny & Strong: Improves hair elasticity and manageable natural bounce.',
      'Ideal for everyday family use across all seasons.'
    ],
    ingredients: 'Arnica Montana Extract, Sunflower Seed Oil, Aqua, Sodium Laureth Sulfate, Cocamide DEA, Polyquaternium-7, Citric Acid, Fragrance.',
    howToUse: 'Apply to wet hair, gently lather into scalp for 1-2 minutes, then rinse thoroughly. Safe for daily use.',
    idealFor: 'Dull hair, dry scalp, minor flaking, and everyday gentle conditioning.',
    importantNotes: 'Paraben-free formula. For external scalp and hair use only. Store away from excessive heat and direct sunlight.',
    faqs: [
      {
        q: "What benefits does Arnica provide for hair?",
        a: "Natural Arnica extract helps soothe scalp dryness, prevent flaky buildup, and leaves hair silky and manageable."
      },
      {
        q: "Can children and the whole family use it?",
        a: "Yes, it is designed as a gentle family-safe shampoo for everyday routine use."
      },
      {
        q: "How fast is delivery?",
        a: "Parcels are delivered within 2 to 4 business days via registered couriers with Cash on Delivery."
      }
    ]
  },
  {
    id: 'hema-lin-oral-liquid',
    name: 'Hema-Lin Oral Liquid',
    subtitle: 'Premium Iron Supplement Drinking Ampoules',
    tagline: 'Nourish. Replenish. Thrive.',
    category: 'wellness',
    categoryName: 'Wellness & Supplements',
    price: 1850,
    originalPrice: 2200,
    salePrice: 1850,
    onSale: true,
    rating: 4.9,
    reviewCount: 110,
    image: 'assets/products/hema-lin.jpg',
    gallery: ['assets/products/hema-lin.jpg'],
    badge: 'Doctor Recommended',
    badgeType: 'burgundy',
    volume: '10 Drinking Ampoules x 10 ml each',
    inStock: true,
    stockCount: 40,
    sku: 'GLW-WEL-001',
    shortDesc: 'A powerful formula to support blood health, restore iron stores, and maintain everyday energy & vitality.',
    description: 'Hema-Lin Oral Liquid is a premium, pleasant-tasting liquid iron supplement presented in convenient ready-to-drink 10ml ampoules. Formulated for superior gastrointestinal tolerance and rapid absorption, it helps combat fatigue, restore low haemoglobin levels, and support optimal cellular energy.',
    features: [
      'Healthy Haemoglobin Count: Supports optimal red blood cell formation.',
      'Healthy Iron Stores: High-bioavailability iron gentle on the stomach.',
      'Optimum Health & Vitality: Helps reduce tiredness, exhaustion, and daily fatigue.',
      'Easy To Drink: Ready-to-use liquid ampoules with delicious natural berry taste.',
      'Gentle & Effective: Non-constipating iron complex.'
    ],
    ingredients: 'Iron (as Ferric Hydroxide Polymaltose Complex), Folic Acid, Vitamin B12, Vitamin C, Purified Water, Sorbitol, Natural Berry Essence.',
    howToUse: 'Take 1 drinking ampoule daily during or immediately after meals, or as directed by a healthcare physician. Can be consumed directly or diluted in water/fruit juice.',
    idealFor: 'Women, pregnant/lactating mothers, individuals with low energy, iron deficiency anemia, and busy professionals.',
    importantNotes: 'Dietary supplement. Keep out of reach of children. Store in a cool, dry place below 25°C. Consult a healthcare professional if pregnant or under medical supervision.',
    faqs: [
      {
        q: "How do I take Hema-Lin Drinking Ampoules?",
        a: "Consume 1 ampoule daily during or immediately after meals. You can drink directly or mix with water or juice."
      },
      {
        q: "Does this formula cause stomach upset?",
        a: "Hema-Lin uses a gentle iron complex formulated for high bioavailability and superior digestive tolerance."
      },
      {
        q: "Is Cash on Delivery supported?",
        a: "Yes, nationwide Cash on Delivery is available across Pakistan."
      }
    ]
  },
  {
    id: 'super-ton-chocolate-granules',
    name: 'SUPER TON Chocolate Granules',
    subtitle: 'Holistic Nutritional Formula for the Whole Family',
    tagline: 'Supports Growth, Nutrition & Optimal Body Weight.',
    category: 'supplements',
    categoryName: 'Supplements',
    price: 1650,
    originalPrice: 1950,
    salePrice: 1650,
    onSale: true,
    rating: 4.9,
    reviewCount: 145,
    image: 'assets/products/super-ton.jpg',
    gallery: ['assets/products/super-ton.jpg'],
    badge: 'Family Favorite',
    badgeType: 'gold',
    volume: 'Granules Jar (400g)',
    inStock: true,
    stockCount: 55,
    sku: 'GLW-SUP-001',
    shortDesc: 'Rich, delicious chocolate granules packed with vital proteins, calcium, and vitamins to boost stamina and healthy weight.',
    description: 'SUPER TON Chocolate Granules is a comprehensive, holistic dietary tonic designed for children, teens, and adults. Blending rich cocoa with essential amino acids, digestive botanicals, and micronutrients, it enhances appetite, promotes healthy weight gain, and provides sustained vitality.',
    features: [
      'Supports Growth and Nutrition: Supplies essential building blocks for developing bodies.',
      'Promotes Optimal Body Weight: Naturally supports healthy appetite and muscle nourishment.',
      'A Holistic Formula for the Whole Family: Loved by kids and adults alike.',
      'Delicious Chocolate Flavor: Easily mixes with warm milk or smoothies.'
    ],
    ingredients: 'Whey Protein Concentrate, Maltodextrin, Cocoa Powder, Withania Somnifera (Ashwagandha), Asparagus Racemosus (Shatavari), Calcium, Vitamin D3, Vitamin B-Complex, Natural Sweeteners.',
    howToUse: 'Add 2 rounded tablespoons of SUPER TON granules to a glass of warm milk. Stir vigorously until completely dissolved. Drink twice daily morning and evening.',
    idealFor: 'Underweight individuals, growing children, convalescents, athletes, and anyone needing extra daily nutrition.',
    importantNotes: 'Dietary nutritional formula. Keep container tightly closed in a cool, dry place. Best consumed mixed in warm milk or smoothies.',
    faqs: [
      {
        q: "Who can take SUPER TON Chocolate Granules?",
        a: "It is formulated for the whole family, including children, teenagers, and adults looking to support everyday stamina and healthy nutrition."
      },
      {
        q: "How do I prepare a serving?",
        a: "Mix 2 rounded tablespoons into a glass of warm milk or smoothie, stirring until completely dissolved. Enjoy twice daily."
      },
      {
        q: "How long does a 400g jar last?",
        a: "Depending on usage (1-2 servings daily), a 400g jar provides approximately 2 to 3 weeks of daily nourishment."
      }
    ]
  },
  {
    id: 'lavender-chamomile-lotion',
    name: 'Lavender Chamomile Lotion',
    subtitle: 'Calms & Soothes Hands & Body',
    tagline: 'Velvety Softness With A Calming Botanical Aroma.',
    category: 'bodycare',
    categoryName: 'Body & Personal Care',
    price: 950,
    originalPrice: 1150,
    salePrice: 950,
    onSale: true,
    rating: 4.8,
    reviewCount: 67,
    image: 'assets/products/lavender-lotion.jpg',
    gallery: ['assets/products/lavender-lotion.jpg'],
    badge: 'Relaxing Care',
    badgeType: 'purple',
    volume: '150 ml',
    inStock: true,
    stockCount: 70,
    sku: 'GLW-BDY-001',
    shortDesc: 'Lightweight soothing moisturizer infused with French lavender and chamomile to relieve dryness and calm the senses.',
    description: 'Glowistic Lavender Chamomile Lotion delivers 24-hour hydration with a velvety, non-greasy finish. The calming aromatic blend of Lavender and Chamomile eases daily tension while nourishing dry, rough patches on hands, arms, and body.',
    features: [
      'Calms & Soothes Hands & Body: Instantly relieves tight, dry, and irritated skin.',
      'Fast-Absorbing & Non-Greasy: Silky texture sinks in immediately.',
      'Aromatherapeutic Glow: Natural floral aroma relaxes mind and body.',
      'Enriched with Vitamin E and Shea Butter for lasting moisture.'
    ],
    ingredients: 'Aqua, Lavender Flower Water, Chamomile Flower Extract, Shea Butter, Sweet Almond Oil, Glycerin, Cetearyl Alcohol, Tocopheryl Acetate (Vitamin E), Stearic Acid, Essential Oil Blend.',
    howToUse: 'Smooth generously over hands and body following a bath or shower, or whenever skin feels dry. Massage gently until absorbed.',
    idealFor: 'Dry, sensitive skin, everyday full-body hydration, and bedtime relaxation.',
    importantNotes: 'For external body and hand use only. Do not apply on broken or irritated skin. Store in a cool, dry place away from direct sunlight.',
    faqs: [
      {
        q: "Is this lotion non-greasy?",
        a: "Yes, it has a lightweight, fast-absorbing texture that moisturizes deeply without leaving a sticky or heavy residue."
      },
      {
        q: "When should I apply it?",
        a: "Apply generously after bathing or whenever skin feels dry. Its soothing aroma makes it ideal for evening bedtime routines."
      },
      {
        q: "Can I use it on both hands and body?",
        a: "Yes, it is specifically formulated as a dual hand and body moisturizer."
      }
    ]
  },
  {
    id: 'wegro-ideal-growth',
    name: 'WeGro Ideal Growth',
    subtitle: 'One-Month Homoeopathy Course for Kids & Teens',
    tagline: 'Grow Tall. Grow Strong. Grow Happy.',
    category: 'supplements',
    categoryName: 'Supplements',
    price: 750,
    originalPrice: 850,
    salePrice: 750,
    onSale: false,
    rating: 4.8,
    reviewCount: 83,
    image: 'assets/products/wegro.jpg',
    gallery: ['assets/products/wegro.jpg'],
    badge: 'Kids & Teens',
    badgeType: 'orange',
    volume: '1-Month Pack (BH.002)',
    inStock: true,
    stockCount: 65,
    sku: 'GLW-SUP-002',
    shortDesc: 'Rs. 750 (Incl. Taxes). Targeted 1-month homeopathic course formulated to support height, bone density, and vitality in growing youth.',
    description: 'WeGro Ideal Growth is a time-tested, gentle homeopathic formulation tailored for children and teenagers during crucial growth phases. It optimizes calcium assimilation, supports bone elongation, and balances physical development without harsh chemicals.',
    features: [
      'Grow Tall. Grow Strong. Grow Happy: Tailored for kids and adolescents.',
      'One-Month Homoeopathy Course: Complete 1-2-3 phased daily course.',
      'Natural & Safe: Gentle homeopathic active ingredients with zero side effects.',
      'Affordable Family Healthcare: Transparent MRP Rs. 750.00 (Incl. Taxes).'
    ],
    ingredients: 'Baryta Carbonica 30C, Calcarea Phosphorica 6X, Silicea 12X, Thuja Occidentalis 30C, Excipients q.s.',
    howToUse: 'For children aged 5-12: Take 1-2 tablets twice daily dissolved on tongue. For teens 13+: Take 2 tablets three times daily before meals or as directed by a homoeopathic physician.',
    idealFor: 'Growing children, teenagers facing growth delays, bone weakness, and sluggish metabolism.',
    importantNotes: 'Homeopathic preparation. Store in a cool, dry place away from strong odors and direct sunlight. Keep bottle closed tightly after use.',
    faqs: [
      {
        q: "What is the recommended age group for WeGro?",
        a: "It is formulated for children aged 5-12 and teenagers aged 13+ to support physical development and bone strength."
      },
      {
        q: "How should the tablets be taken?",
        a: "For kids 5-12, take 1-2 tablets twice daily dissolved on tongue; for teens 13+, take 2 tablets three times daily before meals."
      },
      {
        q: "What is the exact MRP price?",
        a: "Rs. 750.00 (Inclusive of all taxes)."
      }
    ]
  }
];

export function getAllProducts() {
  return PRODUCTS;
}

export function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

export function getProductsByCategory(category) {
  if (!category || category === 'all') return PRODUCTS;
  if (category === 'skincare') {
    return PRODUCTS.filter(p => p.category === 'skincare');
  }
  if (category === 'haircare') {
    return PRODUCTS.filter(p => p.category === 'haircare');
  }
  if (category === 'personalcare') {
    return PRODUCTS.filter(p => p.category === 'personalcare' || p.category === 'bodycare' || p.id === 'neem-face-wash' || p.id === 'hair-n-scalp-shampoo-arnica' || p.id === 'lavender-chamomile-lotion');
  }
  if (category === 'bodycare') {
    return PRODUCTS.filter(p => p.category === 'bodycare' || p.id === 'lavender-chamomile-lotion');
  }
  if (category === 'wellness') {
    return PRODUCTS.filter(p => p.category === 'wellness' || p.id === 'hema-lin-oral-liquid' || p.id === 'super-ton-chocolate-granules');
  }
  if (category === 'supplements') {
    return PRODUCTS.filter(p => p.category === 'supplements' || p.id === 'super-ton-chocolate-granules' || p.id === 'hema-lin-oral-liquid' || p.id === 'wegro-ideal-growth' || p.id === 'reroot-hair-growth-pack');
  }
  return PRODUCTS.filter(p => p.category === category);
}

export function getFeaturedProducts() {
  return PRODUCTS.slice(0, 4);
}

export function searchProducts(query) {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  return PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.subtitle.toLowerCase().includes(q) ||
    p.categoryName.toLowerCase().includes(q) ||
    p.shortDesc.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.ingredients.toLowerCase().includes(q) ||
    (p.features && p.features.some(f => f.toLowerCase().includes(q)))
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'js', 'data', 'products.js'), productsData, 'utf8');
console.log('Successfully updated js/data/products.js');
