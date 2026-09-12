const fs = require('fs');
const path = require('path');

const root = __dirname;
const zipRoot = path.join(root, 'tmp', 'glowistic_zip', 'Glowistic');
const productsDir = path.join(root, 'assets', 'products');

const sourceImages = {
  'addistop-21-day-slimming-plan': 'Addistop',
  'aloe-vera-calendula-multipurpose-lotion': 'Aleovera calendola lotion',
  'reroot-argan-shea-intense-repair-shampoo': 'Argan retroot',
  'arnica-medicated-oil': 'arnica medicated oil',
  'arnica-medicated-shampoo': 'arnica medicated shampo',
  'calciwin-granules': 'Calciwin',
  'calendula-marigold-skin-lotion': 'Calendola marigold skin lotion',
  'international-beauty-care-cream': 'Cream',
  'aloe-vera-cucumber-lotion': 'cucumber ltion product',
  'herbal-freckle-cream-combo': 'Freckle cream',
  'ginkgovit-oral-liquid': 'Ginkovet',
  'ginxeng-oral-liquid-plus': 'Ginxeng',
  'nourishing-herbal-hair-oil': 'Hair Oil Doucmen',
  'hair-scalp-serum': 'HAir Serum',
  'hydration-serum': 'Hyderation Serum',
  'aloe-vera-calendula-lotion': 'Lotion',
  'moovo-joints-care-ampoules': 'Moovo',
  'pcos-care-granules': 'pcos care',
  'anti-dandruff-shampoo': 'SHampo Douchmen',
  'oclear-acne-clear-serum': 'Thumnail',
  'wellvita-multivitamin-capsules': 'Welvita',
};

function titleCaseCategory(category) {
  return {
    skincare: 'Skincare',
    haircare: 'Hair Care',
    bodycare: 'Body Care',
    wellness: 'Wellness',
    supplements: 'Supplements',
  }[category] || category;
}

function copyProductImages(id) {
  const folder = sourceImages[id];
  const sourceDir = path.join(zipRoot, folder);
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Missing image folder for ${id}: ${sourceDir}`);
  }

  const files = fs.readdirSync(sourceDir)
    .filter((file) => /\.(png|jpe?g|webp)$/i.test(file))
    .sort((a, b) => {
      const at = /thumb/i.test(a) ? -1 : 0;
      const bt = /thumb/i.test(b) ? -1 : 0;
      if (at !== bt) return at - bt;
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });

  if (!files.length) throw new Error(`No images found for ${id}`);

  return files.map((file, index) => {
    const ext = path.extname(file).toLowerCase() || '.png';
    const suffix = index === 0 ? '' : `-${index + 1}`;
    const destName = `${id}${suffix}${ext}`;
    const destPath = path.join(productsDir, destName);
    fs.copyFileSync(path.join(sourceDir, file), destPath);
    return `assets/products/${destName}`;
  });
}

const products = [
  {
    id: 'addistop-21-day-slimming-plan',
    name: 'Addistop 21-Days Slimming Plan',
    subtitle: 'Natural Homoeopathic Weight Management Formula',
    tagline: 'Structured 21-day wellness support.',
    category: 'wellness',
    price: 799,
    badge: '21-Day Plan',
    volume: '21 Days',
    shortDescription: 'A structured homoeopathic slimming course designed to support healthier daily weight management and overall vitality.',
    features: [
      '21-Day Guided Plan: Formulated as a structured slimming course designed to support a healthier, active lifestyle.',
      'Homoeopathic Preparation: Made with a gentle homoeopathic formula focused on wellness and balance.',
      'Smart & Healthy Support: Helps promote fitness goals, weight management, and overall vitality without harsh additives.',
      'Safe & Effective: Crafted to offer an accessible daily routine for weight management and healthy living goals.',
    ],
    ingredients: 'Homoeopathic preparation.',
    idealFor: 'Slimming support, wellness, fitness enhancement, and daily weight management routines.',
  },
  {
    id: 'aloe-vera-calendula-multipurpose-lotion',
    name: 'Aloe Vera Calendula Multipurpose Hand & Body Lotion',
    subtitle: '150ml | Moisturizing & Soothing Gentle Skincare',
    tagline: 'Hydrating everyday care for hands and body.',
    category: 'bodycare',
    price: 405,
    badge: 'Soothing Care',
    volume: '150 ml',
    shortDescription: 'A soothing multipurpose lotion combining Aloe Vera and Calendula for dry, irritated skin and daily hydration.',
    features: [
      'Dual Botanical Power: Combines Aloe Vera hydration with the natural calming benefits of Calendula extract.',
      'Deeply Moisturizing & Soothing: Helps relieve dry, irritated skin while providing long-lasting hydration.',
      'Multipurpose Formula: Suitable for daily application on hands, arms, legs, and body.',
      'Gentle Skincare: Mild, non-greasy composition designed for smooth absorption across all skin types.',
    ],
    ingredients: 'Aloe Vera, Calendula Extract.',
    idealFor: 'Body and hand moisturising, soothing dryness, and gentle everyday skincare.',
  },
  {
    id: 'reroot-argan-shea-intense-repair-shampoo',
    name: 'reroot Argan Oil + Shea Butter Intense Repair Shampoo',
    subtitle: 'Smoothing & Restoring Hydrating Haircare',
    tagline: 'Smooth, restore, and hydrate dry hair.',
    category: 'haircare',
    price: 585,
    badge: 'Toxin-Free',
    volume: 'Shampoo',
    shortDescription: 'Hydrating shampoo with Argan Oil and Shea Butter to smooth frizz, strengthen strands, and restore shine.',
    features: [
      'Nourishing Active Blend: Rich Argan Oil and moisturizing Shea Butter deeply hydrate dry or damaged hair.',
      'Intense Repair Action: Helps strengthen strands, manage frizz, and restore natural shine and elasticity.',
      'Toxin-Free Clean Formula: Contains 0% parabens, sulphates, and silicones.',
      'Universal Haircare: Suitable for all hair types, including color-treated and chemically processed hair.',
    ],
    ingredients: 'Argan Oil, Shea Butter.',
    idealFor: 'Dry hair, frizz control, smoothing, restoring, and hydrating haircare.',
  },
  {
    id: 'arnica-medicated-oil',
    name: 'ARNICA Medicated Oil',
    subtitle: '120ml | Soothing Herbal & Therapeutic Hair & Body Oil',
    tagline: 'Herbal nourishment for hair, scalp, and body massage.',
    category: 'haircare',
    price: 400,
    badge: 'Herbal Oil',
    volume: '120 ml',
    shortDescription: 'Arnica-infused medicated oil for gentle hair, scalp, massage, and localized soothing care.',
    features: [
      'Enriched with Natural Arnica: Infused with Arnica extract known for herbal soothing and restorative properties.',
      'Multipurpose Care: Suitable for hair and scalp nourishment, relaxing massage, and comforting localized application.',
      'Deeply Nourishing Base: Helps condition, hydrate, and maintain skin and hair vitality without a heavy finish.',
      'Complete Packaging Set: Comes in an amber bottle with official branded display box.',
    ],
    ingredients: 'Arnica Montana / Arnica Extract.',
    idealFor: 'Soothing care, conditioning, massage, and restorative wellness routines.',
  },
  {
    id: 'arnica-medicated-shampoo',
    name: 'ARNICA Medicated Shampoo',
    subtitle: '120ml | Herbal Scalp Care & Hair Strengthening Formula',
    tagline: 'Gentle cleansing with Arnica scalp support.',
    category: 'haircare',
    price: 450,
    badge: 'Scalp Care',
    volume: '120 ml',
    shortDescription: 'Arnica shampoo formulated to soothe the scalp, support roots, and gently cleanse buildup.',
    features: [
      'Enriched with Arnica: Formulated with natural Arnica extract to soothe the scalp and promote healthy roots.',
      'Therapeutic Cleansing: Gently cleanses dirt, excess oil, and product buildup without stripping moisture.',
      'Scalp & Root Nourishment: Helps revitalize weak strands and maintain a balanced scalp environment.',
      'Complete Packaging Set: Comes in a protected bottle paired with branded outer box.',
    ],
    ingredients: 'Arnica Extract.',
    idealFor: 'Scalp soothing, root strengthening, and gentle cleansing.',
  },
  {
    id: 'calciwin-granules',
    name: 'Calciwin Granules',
    subtitle: 'Complete Family Tonic for Calcium & Nutrients Deficiency (10 Sachets)',
    tagline: 'Family calcium and nutrient support.',
    category: 'supplements',
    price: 400,
    badge: 'Family Tonic',
    volume: '10 Sachets',
    shortDescription: 'Convenient soluble granules formulated to support calcium and essential nutrient deficiencies.',
    features: [
      'Targeted Nutritional Support: Helps address calcium and essential nutrient deficiencies in everyday diets.',
      'Complete Family Tonic: Supports bone health, strength, and vitality for the family.',
      'Convenient Sachet Format: Single-serve foil sachets for freshness, portability, and precise dosage.',
      'Homoeopathic Formula: Gentle health supplement crafted using traditional homoeopathic principles.',
    ],
    ingredients: 'Homoeopathic soluble granules.',
    idealFor: 'Calcium and nutrients deficiency, bone support, and family wellness.',
  },
  {
    id: 'calendula-marigold-skin-lotion',
    name: 'Calendula Marigold Skin Lotion',
    subtitle: '100ml | Gentle Soothing & Moisturizing Body Lotion',
    tagline: 'Calendula care for dry and sensitive skin.',
    category: 'bodycare',
    price: 250,
    badge: 'Calendula',
    volume: '100 ml',
    shortDescription: 'A gentle Calendula lotion for soothing, hydrating, repairing, and protecting dry or sensitive skin.',
    features: [
      'Natural Calendula Extract: Uses marigold to calm dry, irritated, or sensitive skin.',
      'Deep Hydration: Provides daily moisture to keep skin soft, smooth, and supple.',
      'Gentle Daily Formula: Light, quick-absorbing texture designed for everyday use.',
      'Safe External Application: Created for external body care and localized skin restoration.',
    ],
    ingredients: 'Calendula (Marigold Extract).',
    idealFor: 'Soothing, hydrating, skin repair, and protection.',
  },
  {
    id: 'international-beauty-care-cream',
    name: 'International Beauty Care Cream',
    subtitle: 'Homoeopathic Complexion & Blemish Formula',
    tagline: 'Complexion support for blemish-prone skin.',
    category: 'skincare',
    price: 400,
    badge: 'Complexion Care',
    volume: 'Cream',
    shortDescription: 'Homoeopathic skincare cream for pimples, acne marks, blackheads, whiteheads, and blemishes.',
    features: [
      'Clear Complexion Action: Targets pimples, acne marks, blackheads, and whiteheads for clearer skin.',
      'Homoeopathic Preparation: Gentle, non-irritating formula designed to support skin healing and tone.',
      'Universal Application: Suitable for all skin types, including sensitive, oily, and dry skin.',
      'Complete Tube & Box Set: Includes squeeze tube and outer box for hygienic daily application.',
    ],
    ingredients: 'Homoeopathic skincare cream.',
    idealFor: 'Pimples, acne, blackheads, whiteheads, blemishes, and all skin types.',
  },
  {
    id: 'aloe-vera-cucumber-lotion',
    name: 'Aloe Vera Cucumber Lotion',
    subtitle: '150ml | Refreshing & Hydrating Hand & Body Lotion',
    tagline: 'Cool, refresh, and hydrate daily.',
    category: 'bodycare',
    price: 450,
    badge: 'Refreshing',
    volume: '150 ml',
    shortDescription: 'A lightweight hand and body lotion with Aloe Vera and Cucumber for refreshing daily hydration.',
    features: [
      'Cooling & Refreshing Blend: Aloe vera and cucumber extracts soothe, cool, and revitalize dull or dry skin.',
      'Deep Daily Hydration: Locks in moisture without a greasy or sticky residue.',
      'Hand & Body Application: Crafted for hands, arms, legs, and overall body care.',
      'Lightweight Formula: Absorbs quickly for a refreshing feeling and smooth texture.',
    ],
    ingredients: 'Aloe Vera, Cucumber Extract.',
    idealFor: 'Refreshing, hydrating, and softening hands and body.',
  },
  {
    id: 'herbal-freckle-cream-combo',
    name: 'Herbal Freckle Cream 2-in-1 Combo Pack',
    subtitle: 'Cream & Serum Set for Anti-Pigmentation & Dark Spots',
    tagline: 'Dual care for spots and uneven tone.',
    category: 'skincare',
    price: 450,
    badge: '2-in-1 Set',
    volume: 'Cream + Serum',
    shortDescription: 'A herbal cream and serum set made to support freckle reduction, spot fading, and brighter-looking skin.',
    features: [
      '2-in-1 Dual Action: Cream and serum work together against spots and hyperpigmentation.',
      'Fades Freckles & Dark Spots: Helps reduce freckles, blemishes, dark spots, and uneven pigmentation.',
      'Herbal Formula: Natural extracts gently soothe, nourish, and revitalize skin.',
      'Anti-Aging & Radiance Support: Helps reduce dullness while improving skin texture and glow.',
    ],
    ingredients: 'Herbal / Botanical Blend.',
    idealFor: 'Freckles, dark spots, blemishes, tone correction, and skin brightening.',
  },
  {
    id: 'ginkgovit-oral-liquid',
    name: 'Ginkgovit Oral Liquid',
    subtitle: 'Homoeopathic Magic Drops with Ginkgo Biloba, Bacopa & Ashwagandha (10 Vials x 10ml)',
    tagline: 'Daily cognitive and vitality support.',
    category: 'wellness',
    price: 1650,
    badge: 'Magic Drops',
    volume: '10 x 10 ml',
    shortDescription: 'Homoeopathic oral liquid combining Ginkgo Biloba, Bacopa, and Ashwagandha for focus, circulation, and energy support.',
    features: [
      'Powerful Herbal Synergy: Combines Ginkgo Biloba, Bacopa, and Ashwagandha to support brain function, focus, and energy.',
      'Circulatory & Cognitive Support: Helps support blood flow to the brain, heart, and vital organs.',
      'Premium Oral Liquid: Liquid drops formula designed for quick absorption and convenient daily usage.',
      'Hygienic Single-Serve Vials: Amber glass vials protect potency and freshness.',
    ],
    ingredients: 'Ginkgo biloba, Bacopa, Ashwagandha.',
    idealFor: 'Brain circulation, mental alertness, vitality, and overall organ support.',
  },
  {
    id: 'ginxeng-oral-liquid-plus',
    name: 'GINXENG Oral Liquid PLUS',
    subtitle: 'Premium Ginseng Energy & Vitality Tonic (10 Vials x 10ml)',
    tagline: 'Revitalize, restore, and recover.',
    category: 'wellness',
    price: 1650,
    badge: 'Energy Tonic',
    volume: '10 x 10 ml',
    shortDescription: 'Premium ginseng oral liquid ampoules for daily energy, stamina, recovery, and vitality support.',
    features: [
      'Triple Action Benefits: Formulated to revitalize, restore, and recover body energy and stamina.',
      'Concentrated Ginseng Formula: Uses ginseng root extract to help combat daily fatigue and weakness.',
      'Fast-Absorbing Oral Liquid: Liquid ampoules for quick nutrient delivery.',
      'Premium Gift Packaging: Amber glass vials with gold caps inside a red presentation display box.',
    ],
    ingredients: 'Ginseng Root Extract.',
    idealFor: 'Energy boost, physical recovery, stamina improvement, and vitality support.',
  },
  {
    id: 'nourishing-herbal-hair-oil',
    name: 'Nourishing Herbal Hair Oil',
    subtitle: 'Daily Hair Care & Scalp Health (25% Extra Free Value Pack)',
    tagline: 'Daily botanical nourishment with 25% extra free.',
    category: 'haircare',
    price: 450,
    badge: '25% Extra',
    volume: 'Value Pack',
    shortDescription: 'Herbal hair oil formulated to nourish roots, condition the scalp, manage frizz, and enhance shine.',
    features: [
      'Botanical Herbal Blend: Rich botanical extracts nourish roots, manage frizz, and maintain natural luster.',
      'Daily Hair Care Routine: Designed for regular use to keep strands smooth and protected.',
      'Scalp & Root Conditioning: Promotes balanced scalp hydration and hair manageability.',
      '25% Extra Free Pack: Promotional packaging offers 25% extra oil free.',
    ],
    ingredients: 'Botanical herbal extracts.',
    idealFor: 'Daily hair nourishing, shine enhancement, scalp conditioning, and all hair types.',
  },
  {
    id: 'hair-scalp-serum',
    name: 'Hair & Scalp Serum',
    subtitle: '50ml | Ginseng + Procapil Advanced Root & Scalp Care',
    tagline: 'Advanced dropper care for stronger roots.',
    category: 'haircare',
    price: 1755,
    badge: 'Advanced Root Care',
    volume: '50 ml',
    shortDescription: 'Ginseng and Procapil scalp serum for root fortification, follicle revitalization, and denser-looking hair.',
    features: [
      'Advanced Active Blend: Ginseng extract and Procapil help strengthen roots and combat hair thinning.',
      'Precision Dropper Dispenser: Targeted dropper enables clean direct application to the scalp.',
      'Scalp & Root Nourishment: Supports scalp circulation and healthier-looking hair growth.',
      'Amber Glass Protection: 50ml amber glass bottle paired with official display box.',
    ],
    ingredients: 'Ginseng Extract, Procapil Complex.',
    idealFor: 'Hair growth support, root fortification, follicle revitalization, and scalp nourishment.',
  },
  {
    id: 'hydration-serum',
    name: 'Hydration Serum',
    subtitle: '1% Hyaluronic Acid & Cucumber Infused Facial Serum',
    tagline: 'Dewy hydration for all skin types.',
    category: 'skincare',
    price: 855,
    badge: 'Hydration',
    volume: 'Facial Serum',
    shortDescription: 'Lightweight serum with 1% Hyaluronic Acid and Cucumber to hydrate, soothe, and plump skin.',
    features: [
      '1% Hyaluronic Acid Power: Intensely hydrates and plumps skin by binding moisture.',
      'Cucumber-Infused Care: Soothes tired skin for a refreshed, dewy finish.',
      'Lightweight & Fast-Absorbing: Non-greasy texture absorbs quickly without clogging pores.',
      'Hygienic Pump Dispenser: Frosted bottle with protective cap and pump top.',
    ],
    ingredients: '1% Hyaluronic Acid, Cucumber Extract.',
    idealFor: 'Deep hydration, skin soothing, plumping, moisture lock, dry and sensitive skin.',
  },
  {
    id: 'aloe-vera-calendula-lotion',
    name: 'Aloe Vera Calendula Lotion',
    subtitle: '150ml | Deeply Nourishing Hand & Body Lotion',
    tagline: 'Deep nourishment for hands and body.',
    category: 'bodycare',
    price: 450,
    badge: 'Deep Nourishment',
    volume: '150 ml',
    shortDescription: 'Aloe Vera and Calendula hand and body lotion for deep nourishment, soothing care, and moisture protection.',
    features: [
      'Aloe Vera & Calendula Fusion: Soothes and helps repair dry, sensitive skin.',
      'Deep Nourishment: Delivers long-lasting moisture to hands and body.',
      'Quick-Absorbing Texture: Non-greasy formula leaves skin soft and comfortable.',
      'Everyday Body Care: Ideal after showers to protect and restore the skin barrier.',
    ],
    ingredients: 'Aloe Vera Extract, Calendula Flower Extract.',
    idealFor: 'Deep nourishment, skin soothing, moisture protection, hands and body care.',
  },
  {
    id: 'moovo-joints-care-ampoules',
    name: 'Moovo Joints Care Oral Ampoules',
    subtitle: 'Advanced Joint Function, Mobility & Flexibility Supplement (10 Vials x 10ml)',
    tagline: 'Daily support for joint mobility.',
    category: 'wellness',
    price: 1650,
    badge: 'Joint Care',
    volume: '10 x 10 ml',
    shortDescription: 'Oral ampoules formulated to support joint function, daily mobility, and flexibility.',
    features: [
      'Joint Care Support: Formulated to maintain healthy joint function and target stiffness.',
      'Enhanced Mobility & Flexibility: Supports smooth movement and ease of motion.',
      'Fast-Acting Liquid Formula: Drinking ampoule format for quick absorption.',
      'Hygienic Single-Serve Vials: Individual 10ml amber glass bottles for freshness and precise dosing.',
    ],
    ingredients: 'Joint function oral supplement.',
    idealFor: 'Healthy joint function, daily mobility, and improved flexibility.',
  },
  {
    id: 'pcos-care-granules',
    name: 'PCOS-care Granules',
    subtitle: 'Hormonal Balance & PCOS Support Supplement (10 Sachets x 5g)',
    tagline: 'Women’s wellness in convenient sachets.',
    category: 'supplements',
    price: 550,
    badge: 'Women’s Wellness',
    volume: '10 Sachets x 5g',
    shortDescription: 'Soluble granules formulated to support hormonal balance and PCOS wellness routines.',
    features: [
      'Hormonal Balance Support: Formulated to promote natural hormonal balance and PCOS management support.',
      'Targeted Women’s Wellness: Supports reproductive health, cycle regularity, and ovarian function.',
      'Convenient Daily Sachets: Pre-measured 5g foil sachets for freshness and portability.',
      'Soluble Granule Formula: Easily dissolves in water or beverage of choice.',
    ],
    ingredients: 'Soluble granule formula.',
    idealFor: 'Hormonal balance, PCOS support, reproductive wellness, and cycle support.',
  },
  {
    id: 'anti-dandruff-shampoo',
    name: 'Anti-Dandruff Shampoo',
    subtitle: 'Hair & Scalp Care for Men & Women',
    tagline: 'Flake control and deep scalp cleansing.',
    category: 'haircare',
    price: 650,
    badge: 'Anti-Dandruff',
    volume: 'Shampoo',
    shortDescription: 'Unisex anti-dandruff shampoo for flake control, scalp cleansing, and stronger-looking hair.',
    features: [
      'Targeted Flake Control: Helps clear flakes, relieve itchiness, and prevent dandruff recurrence.',
      'Deep Scalp Cleansing: Removes dirt, excess oil, and buildup without stripping moisture.',
      'Enriched with Vitamins & Minerals: Nourishes scalp and supports thicker, longer-looking hair.',
      'Unisex Formula: Balanced for daily hair and scalp care for men and women.',
    ],
    ingredients: 'Essential vitamins, minerals, and nutrients.',
    idealFor: 'Dandruff reduction, deep scalp cleansing, damaged hair repair, strength, and thickness.',
  },
  {
    id: 'oclear-acne-clear-serum',
    name: "O'Clear Acne Clear Serum",
    subtitle: 'Tea Tree Oil & Salicylic Acid Anti-Acne Formula',
    tagline: 'Clearer skin with targeted acne care.',
    category: 'skincare',
    price: 855,
    badge: 'Anti-Acne',
    volume: 'Serum',
    shortDescription: 'Tea Tree Oil and Salicylic Acid serum for acne, excess oil, blemishes, and clearer-looking skin.',
    features: [
      'Fights Acne & Breakouts: Salicylic Acid helps unclog pores and target active pimples.',
      'Controls Excess Oil: Tea Tree Oil helps regulate sebum and reduce shine.',
      'Clears Blemishes & Spot Marks: Gently exfoliates and supports skin renewal.',
      'Gentle & Safe Care: Mild, fast-absorbing formula designed for effective anti-acne support.',
    ],
    ingredients: 'Tea Tree Oil, Salicylic Acid.',
    idealFor: 'Acne-prone, oily, and combination skin; acne, oil control, blemishes, and radiance.',
  },
  {
    id: 'wellvita-multivitamin-capsules',
    name: 'Wellvita Multivitamin Capsules',
    subtitle: 'Plant-Powered Essential Vitamins & Minerals (30 Capsules)',
    tagline: 'Daily plant-powered multivitamin support.',
    category: 'supplements',
    price: 550,
    badge: 'Multivitamin',
    volume: '30 Capsules',
    shortDescription: 'Plant-powered daily multivitamin capsules with essential vitamins and minerals for energy, immunity, and overall health.',
    features: [
      'Plant-Powered Nutrition: Plant-derived vitamins and essential minerals support daily health and immunity.',
      'Complete Micronutrient Blend: Includes Vitamin A, B-Complex, Vitamin C, Vitamin D, Zinc, and Magnesium.',
      'Daily Wellness Support: Helps fill dietary gaps and support vitality.',
      'Vibrant Capsule Format: Easy-to-swallow capsules in a dark green bottle with outer display box.',
    ],
    ingredients: 'Vitamin A, B1, B2, B3, C, D, Zinc, Magnesium.',
    idealFor: 'Overall health support, energy, immunity, and essential micronutrient replenishment.',
  },
];

fs.mkdirSync(productsDir, { recursive: true });

const enriched = products.map((product, index) => {
  const gallery = copyProductImages(product.id);
  const originalPrice = Math.ceil(product.price * 1.18 / 10) * 10;
  return {
    ...product,
    categoryName: titleCaseCategory(product.category),
    originalPrice,
    salePrice: product.price,
    onSale: originalPrice > product.price,
    rating: [4.9, 4.8, 4.7, 4.8, 4.9][index % 5],
    reviewCount: 40 + ((index * 13) % 120),
    image: gallery[0],
    gallery,
    badgeType: index % 3 === 0 ? 'gold' : index % 3 === 1 ? 'green' : 'burgundy',
    inStock: true,
    stockCount: 25 + ((index * 7) % 70),
    sku: `GLW-${String(index + 1).padStart(3, '0')}`,
    description: product.shortDescription,
    shortDesc: product.shortDescription,
    benefits: product.features,
    availability: 'In Stock',
    featured: ['addistop-21-day-slimming-plan', 'reroot-argan-shea-intense-repair-shampoo', 'hydration-serum', 'moovo-joints-care-ampoules'].includes(product.id),
    tags: [
      product.category,
      product.categoryName || titleCaseCategory(product.category),
      ...product.name.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean).slice(0, 5),
    ],
    slug: product.id,
    howToUse: 'Use as directed on the product packaging or as advised by a qualified healthcare or skincare professional.',
    importantNotes: 'For best results, read the product label before use. Store in a cool, dry place away from direct sunlight. Keep out of reach of children.',
    faqs: [
      {
        q: `Is ${product.name} available for Cash on Delivery?`,
        a: 'Yes, Cash on Delivery is available nationwide across Pakistan.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Most orders are dispatched quickly and delivered through registered courier service.',
      },
      {
        q: 'Can I order on WhatsApp?',
        a: 'Yes, you can place your order or ask product questions through the Glowistic WhatsApp support number.',
      },
    ],
  };
});

const categoryCounts = enriched.reduce((acc, product) => {
  acc[product.category] = (acc[product.category] || 0) + 1;
  return acc;
}, {});

const categories = [
  { id: 'all', name: 'All Products', count: enriched.length },
  { id: 'skincare', name: 'Skincare', count: categoryCounts.skincare || 0 },
  { id: 'haircare', name: 'Hair Care', count: categoryCounts.haircare || 0 },
  { id: 'personalcare', name: 'Personal Care', count: (categoryCounts.bodycare || 0) + (categoryCounts.skincare || 0) },
  { id: 'bodycare', name: 'Body Care', count: categoryCounts.bodycare || 0 },
  { id: 'wellness', name: 'Wellness', count: categoryCounts.wellness || 0 },
  { id: 'supplements', name: 'Supplements', count: categoryCounts.supplements || 0 },
];

const content = `/**
 * GLOWISTIC - Product Catalog
 * Synced from the supplied product detail PDF and product image ZIP.
 */

export const CATEGORIES = ${JSON.stringify(categories, null, 2)};

export const PRODUCTS = ${JSON.stringify(enriched, null, 2)};

export function getAllProducts() {
  return PRODUCTS;
}

export function getProductById(id) {
  if (!id) return null;
  const clean = String(id).toLowerCase().trim();
  return PRODUCTS.find(p => p.id.toLowerCase() === clean || p.slug.toLowerCase() === clean);
}

export function getProductBySlug(slug) {
  if (!slug) return null;
  const clean = String(slug).toLowerCase().trim();
  return PRODUCTS.find(p =>
    p.slug.toLowerCase() === clean ||
    p.id.toLowerCase() === clean ||
    p.slug.replace(/-/g, '') === clean.replace(/-/g, '') ||
    p.id.replace(/-/g, '') === clean.replace(/-/g, '')
  );
}

export function getProductsByCategory(category) {
  if (!category || category === 'all') return PRODUCTS;
  const c = category.toLowerCase().replace(/[-_]/g, '');
  if (c === 'skincare') return PRODUCTS.filter(p => p.category === 'skincare');
  if (c === 'haircare') return PRODUCTS.filter(p => p.category === 'haircare');
  if (c === 'personalcare') return PRODUCTS.filter(p => p.category === 'personalcare' || p.category === 'bodycare' || p.category === 'skincare');
  if (c === 'bodycare') return PRODUCTS.filter(p => p.category === 'bodycare');
  if (c === 'wellness' || c === 'wellnesshealth') return PRODUCTS.filter(p => p.category === 'wellness');
  if (c === 'supplements') return PRODUCTS.filter(p => p.category === 'supplements');
  return PRODUCTS.filter(p => p.category === category || (p.tags && p.tags.includes(category)));
}

export function getFeaturedProducts(count = 4) {
  const feat = PRODUCTS.filter(p => p.featured);
  return feat.length >= count ? feat.slice(0, count) : PRODUCTS.slice(0, count);
}

export function searchProducts(query) {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
    (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
    (p.shortDesc && p.shortDesc.toLowerCase().includes(q)) ||
    (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
    (p.description && p.description.toLowerCase().includes(q)) ||
    (p.ingredients && p.ingredients.toLowerCase().includes(q)) ||
    (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
    (p.features && p.features.some(f => f.toLowerCase().includes(q))) ||
    (p.benefits && p.benefits.some(b => b.toLowerCase().includes(q)))
  );
}
`;

fs.writeFileSync(path.join(root, 'js', 'data', 'products.js'), content, 'utf8');
console.log(`Synced ${enriched.length} products and copied product images.`);
