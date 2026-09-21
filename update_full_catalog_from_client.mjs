import fs from 'fs';
import path from 'path';

const projectDir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const productsDir = path.join(projectDir, 'assets', 'products');
const zipRoot = path.join(projectDir, 'tmp', 'new_glowistic_zip', 'Glowistic');
const remainingRoot = path.join(zipRoot, 'Remaining Items');

const folderMap = {
  'reroot-box': path.join(remainingRoot, 'Reroot Box'),
  'reroot-hair-spray': path.join(remainingRoot, 'Reroot spray'),
  'lavender-chamomile-lotion': path.join(remainingRoot, 'lavendr chamomile'),
  'arnica-shampoo': path.join(remainingRoot, 'Arnica shampoo'),
  'o-love-soap': path.join(remainingRoot, 'O love Soap'),
  'neem-face-wash': path.join(remainingRoot, 'Neem face wash'),
  'vitamin-c-syrup': path.join(remainingRoot, 'vITAMIN c'),
  'whitening-cream': path.join(remainingRoot, 'Whiteng cream'),
  'breastone-formula': path.join(remainingRoot, 'Breastone'),
  'd-fit': path.join(remainingRoot, 'D FIT'),
  'hemalin-oral-liquid': path.join(remainingRoot, 'hama'),
  'super-ton-chocolate-granules': path.join(remainingRoot, 'Super Ton'),
  'alfalfa-tonic': path.join(remainingRoot, 'Alfala Tonic'),
  'ideal-growth': path.join(remainingRoot, 'Ideal Growth'),
  'addistop-21-day-slimming-plan': path.join(zipRoot, 'Addistop'),
  'aloe-vera-calendula-multipurpose-lotion': path.join(zipRoot, 'Aleovera calendola lotion'),
  'reroot-argan-shea-intense-repair-shampoo': path.join(zipRoot, 'Argan retroot'),
  'arnica-medicated-oil': path.join(zipRoot, 'arnica medicated oil'),
  'arnica-medicated-shampoo': path.join(zipRoot, 'arnica medicated shampo'),
  'calciwin-granules': path.join(zipRoot, 'Calciwin'),
  'calendula-marigold-skin-lotion': path.join(zipRoot, 'Calendola marigold skin lotion'),
  'international-beauty-care-cream': path.join(zipRoot, 'Cream'),
  'aloe-vera-cucumber-lotion': path.join(zipRoot, 'cucumber ltion product'),
  'herbal-freckle-cream-combo': path.join(zipRoot, 'Freckle cream'),
  'ginkgovit-oral-liquid': path.join(zipRoot, 'Ginkovet'),
  'ginxeng-oral-liquid-plus': path.join(zipRoot, 'Ginxeng'),
  'nourishing-herbal-hair-oil': path.join(zipRoot, 'Hair Oil Doucmen'),
  'hair-scalp-serum': path.join(zipRoot, 'HAir Serum'),
  'hydration-serum': path.join(zipRoot, 'Hyderation Serum'),
  'maco-joints-care-ampoules': path.join(zipRoot, 'Moovo'),
  'anti-dandruff-shampoo': path.join(zipRoot, 'SHampo Douchmen'),
  'oclear-acne-clear-serum': path.join(zipRoot, 'Thumnail'),
  'wellvita-multivitamin-capsules': path.join(zipRoot, 'Welvita'),
  'charcoal-face-wash': path.join(remainingRoot, 'Charcol face wash'),
  'acne-care-face-wash': path.join(remainingRoot, 'Acne face wash'),
  'whitening-face-wash': path.join(remainingRoot, 'Whitening Face wash'),
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

function imageSize(assetPath) {
  const filePath = path.join(projectDir, assetPath.replace(/\//g, path.sep));
  const buffer = fs.readFileSync(filePath);
  if (buffer.length > 24 && buffer.toString('ascii', 1, 4) === 'PNG') {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height, ratio: width / height };
  }
  return { width: 0, height: 1, ratio: 0 };
}

function copyImages(id) {
  const sourceDir = folderMap[id];
  if (!sourceDir || !fs.existsSync(sourceDir)) {
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
  if (!files.length) throw new Error(`No product images found for ${id}`);

  return files.map((file, index) => {
    const ext = path.extname(file).toLowerCase() || '.png';
    const destName = `${id}${index === 0 ? '' : `-${index + 1}`}${ext}`;
    fs.copyFileSync(path.join(sourceDir, file), path.join(productsDir, destName));
    return `assets/products/${destName}`;
  });
}

function makeProduct(base, index) {
  const galleryRaw = copyImages(base.id);
  const cover = [...galleryRaw].sort((a, b) => imageSize(b).ratio - imageSize(a).ratio)[0];
  const gallery = [cover, ...galleryRaw.filter((item) => item !== cover)];
  const discountProducts = new Set([
    'reroot-box',
    'reroot-hair-spray',
    'addistop-21-day-slimming-plan',
    'hydration-serum',
    'hair-scalp-serum',
    'oclear-acne-clear-serum',
  ]);
  const onSale = discountProducts.has(base.id);
  const originalPrice = onSale ? Math.ceil(base.price * 1.18 / 10) * 10 : base.price;
  return {
    id: base.id,
    name: base.name,
    subtitle: base.subtitle,
    tagline: base.tagline,
    category: base.category,
    categoryName: titleCaseCategory(base.category),
    price: base.price,
    originalPrice,
    salePrice: base.price,
    onSale,
    rating: [4.9, 4.8, 4.7, 4.8, 4.9][index % 5],
    reviewCount: 45 + ((index * 11) % 130),
    image: cover,
    gallery,
    badge: base.badge,
    badgeType: index % 3 === 0 ? 'gold' : index % 3 === 1 ? 'green' : 'burgundy',
    volume: base.volume,
    inStock: true,
    stockCount: 25 + ((index * 7) % 70),
    sku: `GLW-${String(index + 1).padStart(3, '0')}`,
    shortDesc: base.shortDescription,
    description: base.description || base.shortDescription,
    features: base.features,
    ingredients: base.ingredients,
    howToUse: base.howToUse || 'Use as directed on the product packaging or as advised by a qualified professional.',
    idealFor: base.idealFor,
    importantNotes: 'For best results, read the product label before use. Store in a cool, dry place away from direct sunlight. Keep out of reach of children.',
    faqs: [
      { q: `Is ${base.name} available for Cash on Delivery?`, a: 'Yes, Cash on Delivery is available nationwide across Pakistan.' },
      { q: 'How long does delivery take?', a: 'Most orders are dispatched quickly and delivered through registered courier service.' },
      { q: 'Can I order on WhatsApp?', a: 'Yes, you can place your order or ask product questions through the Glowistic WhatsApp support number.' },
    ],
    slug: base.id,
    shortDescription: base.shortDescription,
    benefits: base.features,
    availability: 'In Stock',
    featured: ['reroot-box', 'addistop-21-day-slimming-plan', 'hydration-serum', 'oclear-acne-clear-serum'].includes(base.id),
    tags: [
      base.category,
      titleCaseCategory(base.category),
      ...base.name.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean).slice(0, 6),
    ],
  };
}

const baseProducts = [
  {
    id: 'reroot-box',
    name: 'Reroot Box',
    subtitle: 'Complete Hair Growth Support Box',
    tagline: 'Complete root-strengthening routine.',
    category: 'haircare',
    price: 3000,
    badge: 'Complete Kit',
    volume: 'Box Set',
    shortDescription: 'A complete Reroot hair care box designed to support stronger roots, healthier scalp, and fuller-looking hair.',
    features: ['Complete Hair Routine: Curated box format for daily hair support.', 'Root Support: Helps maintain stronger-looking hair roots.', 'Scalp Care: Supports a healthier scalp care routine.', 'Premium Set: Ideal for customers who want the full Reroot experience.'],
    ingredients: 'Reroot hair support formulation.',
    idealFor: 'Hair fall, weak roots, thinning hair, and full-course hair care routines.',
  },
  {
    id: 'reroot-hair-spray',
    name: 'Reroot Spray',
    subtitle: 'Targeted Hair & Scalp Support Spray',
    tagline: 'Direct scalp care in a spray format.',
    category: 'haircare',
    price: 1400,
    badge: 'Hair Spray',
    volume: 'Spray',
    shortDescription: 'Targeted Reroot spray for daily scalp application and hair root support.',
    features: ['Targeted Spray: Easy direct application on scalp areas.', 'Root Care: Supports weak roots and hair density routines.', 'Lightweight Use: Designed for daily hair care.', 'Reroot System: Pairs well with Reroot box and shampoo products.'],
    ingredients: 'Reroot scalp support blend.',
    idealFor: 'Hair thinning, weak roots, scalp care, and daily hair support.',
  },
  {
    id: 'lavender-chamomile-lotion',
    name: 'Lavender Chamomile Lotion',
    subtitle: 'Calming Hand & Body Lotion',
    tagline: 'Soft, soothing everyday moisture.',
    category: 'bodycare',
    price: 400,
    badge: 'Calming Care',
    volume: 'Lotion',
    shortDescription: 'A calming lavender and chamomile lotion for soft, soothed, moisturized hands and body.',
    features: ['Calming Blend: Lavender and chamomile comfort dry skin.', 'Daily Moisture: Helps skin feel soft and smooth.', 'Hand & Body Care: Suitable for everyday use.', 'Gentle Feel: Lightweight lotion texture for regular routines.'],
    ingredients: 'Lavender, Chamomile.',
    idealFor: 'Dry hands, body moisturising, soothing care, and daily hydration.',
  },
  {
    id: 'arnica-shampoo',
    name: 'Arnica Shampoo',
    subtitle: 'Herbal Nourishing Shampoo',
    tagline: 'Gentle herbal hair cleansing.',
    category: 'haircare',
    price: 400,
    badge: 'Herbal Care',
    volume: 'Shampoo',
    shortDescription: 'Arnica-based shampoo for gentle cleansing, scalp comfort, and healthier-looking hair.',
    features: ['Arnica Care: Helps comfort scalp and hair roots.', 'Gentle Cleansing: Removes buildup without a harsh feel.', 'Hair Strength Support: Helps maintain smoother, stronger-looking hair.', 'Everyday Routine: Suitable for regular hair care.'],
    ingredients: 'Arnica extract.',
    idealFor: 'Scalp care, gentle cleansing, dull hair, and everyday hair support.',
  },
  {
    id: 'o-love-soap',
    name: 'O Love Soap',
    subtitle: 'Gentle Beauty Cleansing Bar',
    tagline: 'Soft daily cleansing.',
    category: 'bodycare',
    price: 350,
    badge: 'Beauty Soap',
    volume: 'Soap Bar',
    shortDescription: 'Gentle cleansing soap bar for everyday freshness and soft-feeling skin.',
    features: ['Daily Cleansing: Helps remove impurities and refresh skin.', 'Gentle Feel: Suitable for routine bathing.', 'Soft Skin Finish: Leaves skin feeling clean and smooth.', 'Easy Routine: Simple bar format for daily personal care.'],
    ingredients: 'Beauty cleansing base.',
    idealFor: 'Daily cleansing, personal care, and soft skin feel.',
  },
  {
    id: 'neem-face-wash',
    name: 'Neem Face Wash',
    subtitle: 'Purifying Cleanser for Clear, Acne-Free Skin',
    tagline: 'Purifies and deep cleanses.',
    category: 'skincare',
    price: 300,
    badge: 'Purifying',
    volume: 'Face Wash',
    shortDescription: 'Neem face wash designed to cleanse oil, impurities, and blemish-prone skin.',
    features: ['Purifies Skin: Helps lift dirt, oil, and daily impurities.', 'Blemish Support: Neem care for acne-prone routines.', 'Fresh Finish: Leaves skin feeling clean and balanced.', 'Daily Cleanser: Suitable for regular facial cleansing.'],
    ingredients: 'Neem extract.',
    idealFor: 'Oily skin, acne-prone skin, daily cleansing, and blemish support.',
  },
  {
    id: 'vitamin-c-syrup',
    name: 'Vitamin C Syrup',
    subtitle: 'Daily Immunity & Wellness Support',
    tagline: 'Everyday vitamin support.',
    category: 'wellness',
    price: 720,
    badge: 'Vitamin C',
    volume: 'Syrup',
    shortDescription: 'Vitamin C syrup formulated for daily wellness, immunity support, and family health routines.',
    features: ['Vitamin C Support: Helps support daily immunity.', 'Liquid Format: Easy syrup routine.', 'Family Wellness: Simple daily nutritional support.', 'Daily Vitality: Supports overall wellness routines.'],
    ingredients: 'Vitamin C formulation.',
    idealFor: 'Daily immunity support, wellness, and family nutrition routines.',
  },
  {
    id: 'whitening-cream',
    name: 'Whitening Cream',
    subtitle: 'Complexion Brightening Cream',
    tagline: 'Bright, even-looking skin care.',
    category: 'skincare',
    price: 370,
    badge: 'Brightening',
    volume: 'Cream',
    shortDescription: 'Brightening skincare cream for complexion care and more even-looking skin tone.',
    features: ['Brightening Care: Supports a brighter-looking complexion.', 'Tone Support: Helps improve the look of uneven tone.', 'Cream Texture: Easy daily application.', 'Skincare Routine: Suitable for face care routines.'],
    ingredients: 'Complexion care formulation.',
    idealFor: 'Dull skin, uneven tone, complexion support, and brightening routines.',
  },
  {
    id: 'breastone-formula',
    name: 'Breastone Formula',
    subtitle: 'Women’s Wellness Formula',
    tagline: 'Women’s wellness support.',
    category: 'wellness',
    price: 1050,
    badge: 'Women’s Wellness',
    volume: 'Formula',
    shortDescription: 'Women’s wellness formula designed for supportive daily care routines.',
    features: ['Women’s Support: Formulated for women’s wellness routines.', 'Daily Formula: Easy to add to routine use.', 'Wellness Care: Supports overall confidence and care.', 'Focused Support: Product-specific women’s care formula.'],
    ingredients: 'Women’s wellness formulation.',
    idealFor: 'Women’s wellness support and daily care routines.',
  },
  {
    id: 'd-fit',
    name: 'D Fit',
    subtitle: 'Daily Fitness & Wellness Support',
    tagline: 'Support your active routine.',
    category: 'wellness',
    price: 950,
    badge: 'Fitness Support',
    volume: 'Supplement',
    shortDescription: 'D Fit wellness supplement for active lifestyle, fitness, and daily vitality support.',
    features: ['Fitness Support: Made for active daily routines.', 'Daily Wellness: Supports energy and vitality.', 'Convenient Use: Easy to add to lifestyle care.', 'Balanced Support: Wellness-focused daily formula.'],
    ingredients: 'D Fit wellness formulation.',
    idealFor: 'Fitness support, daily vitality, and wellness routines.',
  },
  {
    id: 'hemalin-oral-liquid',
    name: 'Hemalin Oral Liquid',
    subtitle: 'Iron & Blood Health Support Ampoules',
    tagline: 'Nourish, replenish, thrive.',
    category: 'wellness',
    price: 850,
    badge: 'Iron Support',
    volume: 'Oral Liquid',
    shortDescription: 'Hemalin oral liquid ampoules for iron support, blood health, and everyday vitality.',
    features: ['Iron Support: Helps support healthy iron stores.', 'Vitality Care: Supports everyday energy routines.', 'Oral Liquid: Easy liquid ampoule format.', 'Daily Wellness: Designed for nutritional support.'],
    ingredients: 'Iron support formulation.',
    idealFor: 'Iron support, blood health, low energy, and daily vitality.',
  },
  {
    id: 'super-ton-chocolate-granules',
    name: 'Super Ton Chocolate Granules',
    subtitle: 'Family Nutrition & Weight Support Granules',
    tagline: 'Rich chocolate family nutrition.',
    category: 'supplements',
    price: 750,
    badge: 'Family Nutrition',
    volume: 'Granules',
    shortDescription: 'Chocolate granules for family nutrition, healthy weight support, and daily energy routines.',
    features: ['Family Formula: Suitable nutrition support for the whole family.', 'Chocolate Taste: Easy and enjoyable routine.', 'Weight Support: Helps support healthy weight goals.', 'Daily Energy: Supports stamina and nourishment.'],
    ingredients: 'Chocolate nutritional granules.',
    idealFor: 'Family nutrition, healthy weight, stamina, and daily nourishment.',
  },
  {
    id: 'alfalfa-tonic',
    name: 'Alfalfa Tonic',
    subtitle: 'General Health & Appetite Support',
    tagline: 'Daily tonic for family wellness.',
    category: 'wellness',
    price: 700,
    badge: 'Health Tonic',
    volume: 'Tonic',
    shortDescription: 'Alfalfa tonic for general wellness, appetite support, and daily health routines.',
    features: ['General Tonic: Supports daily health routines.', 'Appetite Support: Helps support nourishment and appetite.', 'Family Wellness: Simple tonic format.', 'Daily Vitality: Supports overall strength and wellness.'],
    ingredients: 'Alfalfa tonic formulation.',
    idealFor: 'Appetite support, general wellness, family health, and vitality.',
  },
  {
    id: 'ideal-growth',
    name: 'Ideal Growth',
    subtitle: 'Growth Support for Kids & Teens',
    tagline: 'Grow tall, strong, and happy.',
    category: 'supplements',
    price: 800,
    badge: 'Kids & Teens',
    volume: 'Growth Support',
    shortDescription: 'Growth support formula for children and teens, made for daily nutritional wellness routines.',
    features: ['Growth Support: Designed for growing children and teens.', 'Bone Health Routine: Supports healthy development routines.', 'Daily Supplement: Easy routine support.', 'Family Care: Made for kids and teen wellness needs.'],
    ingredients: 'Growth support formulation.',
    idealFor: 'Children, teens, growth support, and family wellness routines.',
  },
  {
    id: 'addistop-21-day-slimming-plan',
    name: 'Addistop 21-Days Slimming Plan',
    subtitle: 'Natural Homoeopathic Weight Management Formula',
    tagline: 'Structured 21-day wellness support.',
    category: 'wellness',
    price: 750,
    badge: '21-Day Plan',
    volume: '21 Days',
    shortDescription: 'A structured homoeopathic slimming course designed to support healthier daily weight management and overall vitality.',
    features: ['21-Day Guided Plan: Structured slimming course for a healthier active lifestyle.', 'Homoeopathic Preparation: Gentle wellness-focused formula.', 'Smart Support: Helps promote fitness and weight management goals.', 'Daily Routine: Accessible plan for weight management and healthy living.'],
    ingredients: 'Homoeopathic preparation.',
    idealFor: 'Slimming support, wellness, fitness enhancement, and daily weight management routines.',
  },
  {
    id: 'aloe-vera-calendula-multipurpose-lotion',
    name: 'Alovera Candle Lotion',
    subtitle: 'Aloe Vera Calendula Hand & Body Lotion',
    tagline: 'Hydrating everyday care for hands and body.',
    category: 'bodycare',
    price: 325,
    badge: 'Soothing Care',
    volume: '150 ml',
    shortDescription: 'A soothing multipurpose lotion combining Aloe Vera and Calendula for dry, irritated skin and daily hydration.',
    features: ['Dual Botanical Power: Aloe Vera hydration with Calendula calming benefits.', 'Soothing Moisture: Helps comfort dry, irritated skin.', 'Multipurpose Formula: Suitable for hands, arms, legs, and body.', 'Gentle Skincare: Mild, non-greasy daily nourishment.'],
    ingredients: 'Aloe Vera, Calendula Extract.',
    idealFor: 'Body and hand moisturising, soothing dryness, and gentle everyday skincare.',
  },
  {
    id: 'reroot-argan-shea-intense-repair-shampoo',
    name: 'Reroot Argan Oil + Shea Butter Shampoo',
    subtitle: 'Smoothing & Restoring Hydrating Haircare',
    tagline: 'Smooth, restore, and hydrate dry hair.',
    category: 'haircare',
    price: 500,
    badge: 'Toxin-Free',
    volume: 'Shampoo',
    shortDescription: 'Hydrating shampoo with Argan Oil and Shea Butter to smooth frizz, strengthen strands, and restore shine.',
    features: ['Nourishing Blend: Argan Oil and Shea Butter hydrate dry hair.', 'Repair Action: Helps strengthen strands and manage frizz.', 'Clean Formula: 0% parabens, sulphates, and silicones.', 'Universal Haircare: Suitable for all hair types.'],
    ingredients: 'Argan Oil, Shea Butter.',
    idealFor: 'Dry hair, frizz control, smoothing, restoring, and hydrating haircare.',
  },
  {
    id: 'arnica-medicated-oil',
    name: 'Arnica Medicated Oil',
    subtitle: '120ml | Soothing Herbal Hair & Body Oil',
    tagline: 'Herbal nourishment for hair, scalp, and massage.',
    category: 'haircare',
    price: 400,
    badge: 'Herbal Oil',
    volume: '120 ml',
    shortDescription: 'Arnica-infused medicated oil for gentle hair, scalp, massage, and localized soothing care.',
    features: ['Natural Arnica: Herbal soothing and restorative support.', 'Multipurpose Care: Hair, scalp, massage, and localized application.', 'Nourishing Base: Helps condition and hydrate.', 'Complete Pack: Bottle with branded display box.'],
    ingredients: 'Arnica Montana / Arnica Extract.',
    idealFor: 'Soothing care, conditioning, massage, and restorative wellness routines.',
  },
  {
    id: 'arnica-medicated-shampoo',
    name: 'Arnica Medicated Shampoo',
    subtitle: '120ml | Herbal Scalp Care & Hair Strengthening Formula',
    tagline: 'Gentle cleansing with Arnica scalp support.',
    category: 'haircare',
    price: 400,
    badge: 'Scalp Care',
    volume: '120 ml',
    shortDescription: 'Arnica shampoo formulated to soothe the scalp, support roots, and gently cleanse buildup.',
    features: ['Enriched with Arnica: Helps soothe scalp and support roots.', 'Therapeutic Cleansing: Removes dirt, excess oil, and buildup.', 'Root Nourishment: Supports weak strands and balanced scalp.', 'Complete Pack: Bottle with branded outer box.'],
    ingredients: 'Arnica Extract.',
    idealFor: 'Scalp soothing, root strengthening, and gentle cleansing.',
  },
  {
    id: 'calciwin-granules',
    name: 'Calciwin Granules',
    subtitle: 'Complete Family Tonic for Calcium & Nutrients Deficiency',
    tagline: 'Family calcium and nutrient support.',
    category: 'supplements',
    price: 350,
    badge: 'Family Tonic',
    volume: '10 Sachets',
    shortDescription: 'Convenient soluble granules formulated to support calcium and essential nutrient deficiencies.',
    features: ['Nutritional Support: Helps address calcium and nutrient deficiencies.', 'Family Tonic: Supports bone health and vitality.', 'Sachet Format: Single-serve foil sachets.', 'Homoeopathic Formula: Gentle everyday health supplement.'],
    ingredients: 'Homoeopathic soluble granules.',
    idealFor: 'Calcium and nutrients deficiency, bone support, and family wellness.',
  },
  {
    id: 'calendula-marigold-skin-lotion',
    name: 'Calendula Lotion',
    subtitle: '100ml | Gentle Soothing & Moisturizing Body Lotion',
    tagline: 'Calendula care for dry and sensitive skin.',
    category: 'bodycare',
    price: 250,
    badge: 'Calendula',
    volume: '100 ml',
    shortDescription: 'A gentle Calendula lotion for soothing, hydrating, repairing, and protecting dry or sensitive skin.',
    features: ['Natural Calendula: Calms dry, irritated, or sensitive skin.', 'Deep Hydration: Keeps skin soft and supple.', 'Gentle Formula: Light quick-absorbing texture.', 'External Care: Created for body care and localized skin restoration.'],
    ingredients: 'Calendula (Marigold Extract).',
    idealFor: 'Soothing, hydrating, skin repair, and protection.',
  },
  {
    id: 'international-beauty-care-cream',
    name: 'Care Cream',
    subtitle: 'Homoeopathic Complexion & Blemish Formula',
    tagline: 'Complexion support for blemish-prone skin.',
    category: 'skincare',
    price: 400,
    badge: 'Complexion Care',
    volume: 'Cream',
    shortDescription: 'Homoeopathic skincare cream for pimples, acne marks, blackheads, whiteheads, and blemishes.',
    features: ['Clear Complexion: Targets pimples, acne marks, blackheads, and whiteheads.', 'Homoeopathic Preparation: Gentle non-irritating formula.', 'All Skin Types: Suitable for sensitive, oily, and dry skin.', 'Tube & Box Set: Hygienic daily application.'],
    ingredients: 'Homoeopathic skincare cream.',
    idealFor: 'Pimples, acne, blackheads, whiteheads, blemishes, and all skin types.',
  },
  {
    id: 'aloe-vera-cucumber-lotion',
    name: 'Alovera Cucumber Lotion',
    subtitle: '150ml | Refreshing & Hydrating Hand & Body Lotion',
    tagline: 'Cool, refresh, and hydrate daily.',
    category: 'bodycare',
    price: 400,
    badge: 'Refreshing',
    volume: '150 ml',
    shortDescription: 'A lightweight hand and body lotion with Aloe Vera and Cucumber for refreshing daily hydration.',
    features: ['Cooling Blend: Aloe vera and cucumber soothe and refresh.', 'Daily Hydration: Locks in moisture without greasy residue.', 'Hand & Body Use: Made for full body care.', 'Lightweight Formula: Absorbs quickly for smooth texture.'],
    ingredients: 'Aloe Vera, Cucumber Extract.',
    idealFor: 'Refreshing, hydrating, and softening hands and body.',
  },
  {
    id: 'herbal-freckle-cream-combo',
    name: 'Herbal Freckle Cream',
    subtitle: '2-in-1 Cream & Serum Set for Dark Spots',
    tagline: 'Dual care for spots and uneven tone.',
    category: 'skincare',
    price: 420,
    badge: '2-in-1 Set',
    volume: 'Cream + Serum',
    shortDescription: 'A herbal cream and serum set made to support freckle reduction, spot fading, and brighter-looking skin.',
    features: ['2-in-1 Action: Cream and serum work together against pigmentation.', 'Spot Support: Helps reduce freckles, blemishes, and dark spots.', 'Herbal Formula: Botanical care without harsh irritation.', 'Radiance Support: Helps improve texture and glow.'],
    ingredients: 'Herbal / Botanical Blend.',
    idealFor: 'Freckles, dark spots, blemishes, tone correction, and skin brightening.',
  },
  {
    id: 'ginkgovit-oral-liquid',
    name: 'Gingovit Oral Liquid',
    subtitle: 'Ginkgo Biloba, Bacopa & Ashwagandha Drops',
    tagline: 'Daily cognitive and vitality support.',
    category: 'wellness',
    price: 850,
    badge: 'Magic Drops',
    volume: '10 x 10 ml',
    shortDescription: 'Oral liquid combining Ginkgo Biloba, Bacopa, and Ashwagandha for focus, circulation, and energy support.',
    features: ['Herbal Synergy: Ginkgo, Bacopa, and Ashwagandha support focus.', 'Cognitive Support: Supports brain circulation and alertness.', 'Oral Liquid: Quick absorption format.', 'Single-Serve Vials: Amber vials protect freshness.'],
    ingredients: 'Ginkgo biloba, Bacopa, Ashwagandha.',
    idealFor: 'Brain circulation, mental alertness, vitality, and overall organ support.',
  },
  {
    id: 'ginxeng-oral-liquid-plus',
    name: 'Ginseng Oral Liquid Plus',
    subtitle: 'Premium Ginseng Energy & Vitality Tonic',
    tagline: 'Revitalize, restore, and recover.',
    category: 'wellness',
    price: 950,
    badge: 'Energy Tonic',
    volume: '10 x 10 ml',
    shortDescription: 'Premium ginseng oral liquid ampoules for daily energy, stamina, recovery, and vitality support.',
    features: ['Triple Action: Revitalize, restore, and recover energy.', 'Ginseng Formula: Helps combat fatigue and weakness.', 'Liquid Ampoules: Quick nutrient delivery.', 'Premium Pack: Amber vials with presentation box.'],
    ingredients: 'Ginseng Root Extract.',
    idealFor: 'Energy boost, physical recovery, stamina improvement, and vitality support.',
  },
  {
    id: 'nourishing-herbal-hair-oil',
    name: 'Nourishing Hair Oil',
    subtitle: 'Daily Hair Care & Scalp Health',
    tagline: 'Daily botanical nourishment.',
    category: 'haircare',
    price: 450,
    badge: 'Hair Oil',
    volume: 'Value Pack',
    shortDescription: 'Herbal hair oil formulated to nourish roots, condition the scalp, manage frizz, and enhance shine.',
    features: ['Botanical Blend: Nourishes roots and manages frizz.', 'Daily Care: Keeps strands smooth and protected.', 'Scalp Conditioning: Supports balanced scalp hydration.', 'Value Pack: Designed for regular care routines.'],
    ingredients: 'Botanical herbal extracts.',
    idealFor: 'Daily hair nourishing, shine enhancement, scalp conditioning, and all hair types.',
  },
  {
    id: 'hair-scalp-serum',
    name: 'Hair & Scalp Serum',
    subtitle: '50ml | Ginseng + Procapil Root Care',
    tagline: 'Advanced dropper care for stronger roots.',
    category: 'haircare',
    price: 1100,
    badge: 'Root Care',
    volume: '50 ml',
    shortDescription: 'Ginseng and Procapil scalp serum for root fortification, follicle revitalization, and denser-looking hair.',
    features: ['Active Blend: Ginseng and Procapil support roots.', 'Precision Dropper: Direct application to scalp.', 'Root Nourishment: Supports healthier-looking growth.', 'Amber Bottle: Protective 50ml packaging.'],
    ingredients: 'Ginseng Extract, Procapil Complex.',
    idealFor: 'Hair growth support, root fortification, follicle revitalization, and scalp nourishment.',
  },
  {
    id: 'hydration-serum',
    name: 'Hydration Serum',
    subtitle: '1% Hyaluronic Acid & Cucumber Facial Serum',
    tagline: 'Dewy hydration for all skin types.',
    category: 'skincare',
    price: 1050,
    badge: 'Hydration',
    volume: 'Facial Serum',
    shortDescription: 'Lightweight serum with 1% Hyaluronic Acid and Cucumber to hydrate, soothe, and plump skin.',
    features: ['Hyaluronic Acid: Hydrates and plumps skin.', 'Cucumber Care: Soothes tired skin.', 'Fast-Absorbing: Non-greasy texture.', 'Pump Bottle: Hygienic daily application.'],
    ingredients: '1% Hyaluronic Acid, Cucumber Extract.',
    idealFor: 'Deep hydration, skin soothing, plumping, moisture lock, dry and sensitive skin.',
  },
  {
    id: 'maco-joints-care-ampoules',
    name: 'Maco Joints Care Oral Ampoules',
    subtitle: 'Joint Function, Mobility & Flexibility Supplement',
    tagline: 'Daily support for joint mobility.',
    category: 'wellness',
    price: 950,
    badge: 'Joint Care',
    volume: '10 x 10 ml',
    shortDescription: 'Oral ampoules formulated to support joint function, daily mobility, and flexibility.',
    features: ['Joint Care: Supports healthy joint function.', 'Mobility Support: Promotes movement and flexibility.', 'Liquid Formula: Drinking ampoule format.', 'Single-Serve Vials: Individual 10ml bottles.'],
    ingredients: 'Joint function oral supplement.',
    idealFor: 'Healthy joint function, daily mobility, and improved flexibility.',
  },
  {
    id: 'anti-dandruff-shampoo',
    name: 'Anti-Dandruff Shampoo',
    subtitle: 'Hair & Scalp Care for Men & Women',
    tagline: 'Flake control and deep scalp cleansing.',
    category: 'haircare',
    price: 450,
    badge: 'Anti-Dandruff',
    volume: 'Shampoo',
    shortDescription: 'Unisex anti-dandruff shampoo for flake control, scalp cleansing, and stronger-looking hair.',
    features: ['Flake Control: Helps clear flakes and itchiness.', 'Deep Cleansing: Removes dirt, oil, and buildup.', 'Vitamins & Minerals: Nourishes scalp and hair.', 'Unisex Formula: Suitable for men and women.'],
    ingredients: 'Essential vitamins, minerals, and nutrients.',
    idealFor: 'Dandruff reduction, deep scalp cleansing, damaged hair repair, strength, and thickness.',
  },
  {
    id: 'oclear-acne-clear-serum',
    name: "O'Clear Acne Clear Serum",
    subtitle: 'Tea Tree Oil & Salicylic Acid Anti-Acne Formula',
    tagline: 'Clearer skin with targeted acne care.',
    category: 'skincare',
    price: 1050,
    badge: 'Anti-Acne',
    volume: 'Serum',
    shortDescription: 'Tea Tree Oil and Salicylic Acid serum for acne, excess oil, blemishes, and clearer-looking skin.',
    features: ['Fights Acne: Salicylic Acid helps unclog pores.', 'Oil Control: Tea Tree Oil helps reduce shine.', 'Blemish Support: Supports skin renewal.', 'Gentle Care: Fast-absorbing anti-acne support.'],
    ingredients: 'Tea Tree Oil, Salicylic Acid.',
    idealFor: 'Acne-prone, oily, and combination skin; acne, oil control, blemishes, and radiance.',
  },
  {
    id: 'wellvita-multivitamin-capsules',
    name: 'Wellvita Multivitamin Capsules',
    subtitle: 'Plant-Powered Vitamins & Minerals',
    tagline: 'Daily plant-powered multivitamin support.',
    category: 'supplements',
    price: 600,
    badge: 'Multivitamin',
    volume: '30 Capsules',
    shortDescription: 'Plant-powered daily multivitamin capsules with essential vitamins and minerals for energy, immunity, and overall health.',
    features: ['Plant-Powered Nutrition: Daily vitamin and mineral support.', 'Micronutrient Blend: Includes key vitamins and minerals.', 'Daily Wellness: Helps fill dietary gaps.', 'Capsule Format: Easy-to-swallow daily routine.'],
    ingredients: 'Vitamin A, B1, B2, B3, C, D, Zinc, Magnesium.',
    idealFor: 'Overall health support, energy, immunity, and essential micronutrient replenishment.',
  },
  {
    id: 'charcoal-face-wash',
    name: 'Charcoal Face Wash',
    subtitle: 'Deep Cleansing Oil & Dirt Control',
    tagline: 'Deep clean for fresh skin.',
    category: 'skincare',
    price: 400,
    badge: 'Deep Clean',
    volume: 'Face Wash',
    shortDescription: 'Charcoal face wash formulated to deeply cleanse pores, oil, and daily impurities.',
    features: ['Charcoal Cleanse: Helps draw out dirt and impurities.', 'Oil Control: Supports fresh, balanced skin.', 'Deep Pore Care: Cleanses buildup from daily exposure.', 'Daily Wash: Easy facial care routine.'],
    ingredients: 'Activated charcoal cleansing blend.',
    idealFor: 'Oily skin, clogged pores, daily cleansing, and deep clean routines.',
  },
  {
    id: 'acne-care-face-wash',
    name: 'Acne Care Face Wash',
    subtitle: 'Blemish & Breakout Cleansing Support',
    tagline: 'Cleanse acne-prone skin daily.',
    category: 'skincare',
    price: 400,
    badge: 'Acne Care',
    volume: 'Face Wash',
    shortDescription: 'Acne care face wash for blemish-prone skin, daily cleansing, and clearer-looking complexion.',
    features: ['Acne Support: Helps cleanse acne-prone skin.', 'Blemish Care: Supports a clearer-looking complexion.', 'Daily Cleansing: Removes dirt and excess oil.', 'Gentle Routine: Suitable for regular face wash use.'],
    ingredients: 'Acne care cleansing blend.',
    idealFor: 'Acne-prone skin, blemishes, oil control, and daily cleansing.',
  },
  {
    id: 'whitening-face-wash',
    name: 'Whitening Face Wash',
    subtitle: 'Brightening Daily Facial Cleanser',
    tagline: 'Fresh brightening cleanse.',
    category: 'skincare',
    price: 400,
    badge: 'Brightening',
    volume: 'Face Wash',
    shortDescription: 'Whitening face wash for daily brightening cleanse and fresh, even-looking skin.',
    features: ['Brightening Cleanse: Supports fresh, brighter-looking skin.', 'Daily Wash: Easy facial cleanser routine.', 'Tone Support: Helps improve the appearance of dullness.', 'Clean Finish: Leaves skin feeling refreshed.'],
    ingredients: 'Brightening cleansing blend.',
    idealFor: 'Dull skin, daily cleansing, brightening care, and fresh complexion routines.',
  },
];

fs.mkdirSync(productsDir, { recursive: true });
const products = baseProducts.map(makeProduct);
const categoryCounts = products.reduce((acc, product) => {
  acc[product.category] = (acc[product.category] || 0) + 1;
  return acc;
}, {});

const categories = [
  { id: 'all', name: 'All Products', count: products.length },
  { id: 'skincare', name: 'Skincare', count: categoryCounts.skincare || 0 },
  { id: 'haircare', name: 'Hair Care', count: categoryCounts.haircare || 0 },
  { id: 'personalcare', name: 'Personal Care', count: (categoryCounts.bodycare || 0) + (categoryCounts.skincare || 0) },
  { id: 'bodycare', name: 'Body Care', count: categoryCounts.bodycare || 0 },
  { id: 'wellness', name: 'Wellness', count: categoryCounts.wellness || 0 },
  { id: 'supplements', name: 'Supplements', count: categoryCounts.supplements || 0 },
];

const content = `/**
 * GLOWISTIC - Client Verified Product Catalog
 * Updated from the supplied product image ZIP and client price list.
 */

export const CATEGORIES = ${JSON.stringify(categories, null, 2)};

export const PRODUCTS = ${JSON.stringify(products, null, 2)};

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

fs.writeFileSync(path.join(projectDir, 'js', 'data', 'products.js'), content, 'utf8');
console.log(`Updated catalog: ${products.length} products`);
for (const product of products) console.log(`${product.name} | Rs. ${product.price} | ${product.image}`);
