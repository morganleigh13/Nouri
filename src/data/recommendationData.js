export const foodRecommendations = {
  'Lose weight': [
    'Lean into salmon, leafy greens, and lighter portions of rice to keep meals satisfying but balanced.',
    'Add a bean-based side or a high-fiber salad to support fullness and steady energy.',
    'Choose yogurt or fruit as a small snack when hunger hits between meals.',
  ],
  'Gain muscle': [
    'Use salmon as the center of meals and add extra rice, beans, or oats for recovery fuel.',
    'Shift snack choices toward yogurt, fruit, and smoothies with protein powder if helpful.',
    'Pair familiar foods with a bit more frequent protein and calorie-dense add-ons such as avocado or nuts.',
  ],
  'Tone up': [
    'Build meals around salmon plus vegetables and a moderate amount of rice.',
    'Use avocado, olive oil, or yogurt as simple ways to keep meals flavorful and nourishing.',
    'Keep high-protein foods in breakfast and lunch so your routine stays consistent.',
  ],
  'Improve energy': [
    'Start the day with a protein-focused breakfast built around Greek yogurt, fruit, or oats.',
    'Add a leafy green or fruit item to lunch and dinner so your plate feels brighter and more complete.',
    'Use a hydration-focused routine with water and a light electrolyte option on active days.',
  ],
  'Eat healthier': [
    'Turn your favorite foods into balanced plates by adding produce, a lean protein, and a grain or starch.',
    'Try a salmon-rice bowl, a Greek yogurt parfait, or a bean-and-avocado wrap using ingredients you already enjoy.',
    'Keep habits simple and repeatable so your meals feel realistic.',
  ],
  'Improve sleep': [
    'Keep dinner lighter and more calming with salmon, vegetables, and a small starch.',
    'Avoid heavy late-night meals and use a steady wind-down routine around sleep.',
    'Choose magnesium-rich or gentle foods at night if they fit your preferences and restrictions.',
  ],
};

export const fitnessRecommendations = {
  'Lose weight': ['Daily 10-minute walks after meals', 'Strength training 2x weekly', '2–3 cardio sessions per week'],
  'Gain muscle': ['Progressive strength training 3x weekly', 'Walking or cycling on recovery days', 'Prioritize sleep and protein timing'],
  'Tone up': ['Yoga or Pilates 2x weekly', 'Moderate resistance sessions 3x weekly', 'Short movement breaks each day'],
  'Improve energy': ['Morning mobility 5 minutes', 'Daily brisk walking', 'Light stretching after meals'],
  'Eat healthier': ['Walk after lunch', 'Gentle resistance training twice weekly', 'Consistency over intensity'],
  'Improve sleep': ['Stretching before bed', 'Light walking during the day', 'Avoid intense activity close to bedtime'],
};

export const supplementRecommendations = {
  'Lose weight': [
    {
      name: 'Protein powder',
      bestFor: ['Best for weight loss'],
      image: 'https://media.istockphoto.com/id/2224995358/photo/protein-powder-in-scoop-and-plastic-jar-on-blue-background.jpg?s=612x612&w=0&k=20&c=Djxw7SKkqh1G5lF2lxP_RAXDet-RVhOgs260wK8ozvo=',
      description: 'A convenient way to keep protein intake higher when appetite is low or meals are rushed.',
      whyItMayHelp: 'Protein helps protect lean tissue and can improve fullness, which often makes it easier to stay on track with a calorie-conscious plan.',
      benefits: ['Helps support muscle retention', 'Useful as a breakfast or snack option', 'Easy to pair with fruit or oats'],
    },
    {
      name: 'Collagen peptides',
      bestFor: ['Best for sleep'],
      image: 'https://media.istockphoto.com/id/1330176410/photo/hand-pours-collagen-protein-powder-in-a-glass-of-water-on-a-beige-background-a-natural.jpg?s=612x612&w=0&k=20&c=kSg6NblHu73JEgX72AV8ZVcKFjnYrClEHrh18fZVwWI=',
      description: 'A lighter, less common add-on that can support connective tissue recovery and daily protein intake.',
      whyItMayHelp: 'This option is often used to support recovery-focused routines and can help simplify daily protein intake without adding much complexity.',
      benefits: ['Pairs well with coffee or smoothies', 'Useful for people who prefer a simple protein source', 'Can fit into a convenience-first routine'],
    },
    {
      name: 'Green tea extract',
      bestFor: ['Best for weight loss'],
      image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80',
      description: 'A less common focus-support option for people who want a small thermogenic boost alongside diet and activity habits.',
      whyItMayHelp: 'It may complement a routine that already includes movement, hydration, and consistent meals, which is where results tend to come from overall.',
      benefits: ['May complement a steady routine', 'Useful alongside walking and hydration', 'Best paired with realistic meal consistency'],
    },
  ],
  'Gain muscle': [
    {
      name: 'Creatine monohydrate',
      bestFor: ['Best for muscle gain'],
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80',
      description: 'One of the most researched supplements for strength and training performance support.',
      whyItMayHelp: 'Creatine is widely used to support training quality, recovery between sessions, and total strength output over time.',
      benefits: ['May help improve power output', 'Pairs well with resistance training', 'Easy to use daily with a consistent hydration habit'],
    },
    {
      name: 'Protein powder',
      bestFor: ['Best for muscle gain'],
      image: 'https://media.istockphoto.com/id/2224995358/photo/protein-powder-in-scoop-and-plastic-jar-on-blue-background.jpg?s=612x612&w=0&k=20&c=Djxw7SKkqh1G5lF2lxP_RAXDet-RVhOgs260wK8ozvo=',
      description: 'Helpful when you need a quick protein hit after training or on busy days.',
      whyItMayHelp: 'A simple protein delivery method can help you hit daily targets more consistently, which is often a major factor in muscle-support plans.',
      benefits: ['Supports recovery and satiety', 'Easy to blend into shakes', 'Helpful for consistent protein timing'],
    },
    {
      name: 'Vitamin D3',
      bestFor: ['Best for muscle gain'],
      image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=80',
      description: 'A simple foundational option if indoor time is high or your food intake tends to be low in vitamin D sources.',
      whyItMayHelp: 'It can be a helpful baseline support when your routine is otherwise solid but your intake is not always consistent.',
      benefits: ['Supports healthy routines', 'Works well alongside a balanced diet', 'Useful if you are not getting much sun'],
    },
  ],
  'Tone up': [
    {
      name: 'Protein powder',
      bestFor: ['Best for muscle gain'],
      image: 'https://media.istockphoto.com/id/2224995358/photo/protein-powder-in-scoop-and-plastic-jar-on-blue-background.jpg?s=612x612&w=0&k=20&c=Djxw7SKkqh1G5lF2lxP_RAXDet-RVhOgs260wK8ozvo=',
      description: 'Useful when you want to keep lean protein intake consistent and effortless.',
      whyItMayHelp: 'Tone-up goals usually benefit from dependable protein intake, especially when meals are busy or when you need quick options between training sessions.',
      benefits: ['Helps support daily protein goals', 'Simple to use in breakfast or snack routines', 'Pairs well with fruit and oats'],
    },
    {
      name: 'Magnesium glycinate',
      bestFor: ['Best for sleep'],
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
      description: 'A more targeted, less common magnesium option that fits a recovery-forward routine.',
      whyItMayHelp: 'Magnesium is often used to support a calmer evening rhythm and a smoother recovery process after exercise and daily stress.',
      benefits: ['Supportive for rest and recovery', 'Often gentler on digestion than other forms', 'Useful when stress and training volume are both high'],
    },
    {
      name: 'Omega-3',
      bestFor: ['Best for sleep'],
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
      description: 'Helpful for people who do not eat fish regularly and want a simple wellness backup.',
      whyItMayHelp: 'A general wellness foundation can help support your routine when the goal is to feel more balanced and recover well across the week.',
      benefits: ['Supports overall routine consistency', 'Works well alongside whole-food meals', 'A practical option when fish is inconsistent'],
    },
  ],
  'Improve energy': [
    {
      name: 'Vitamin B12',
      bestFor: ['Best for weight loss'],
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80',
      description: 'A common choice when your diet is restrictive or plant-forward and your intake may be low.',
      whyItMayHelp: 'If your eating pattern is limited or inconsistent, supporting your basics can make a steadier day-to-day energy plan easier to maintain.',
      benefits: ['Helpful for supporting routine energy', 'Works well if your food variety is limited', 'Best used carefully and with guidance'],
    },
    {
      name: 'Iron',
      bestFor: ['Best for weight loss'],
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
      description: 'A more targeted option that should only be used when it is clinically appropriate for your needs.',
      whyItMayHelp: 'This is a need-based support step, so it can be helpful when your food routine is not giving you enough support for energy and recovery.',
      benefits: ['Useful if low iron is a concern', 'Better used with clinician input', 'Supports a tailored nutrition plan'],
    },
    {
      name: 'Rhodiola',
      bestFor: ['Best for sleep'],
      image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80',
      description: 'A less common adaptogen-style choice often used for stress support and a more balanced daily rhythm.',
      whyItMayHelp: 'This type of option may be more useful when your routine needs a calmer, steadier recovery approach rather than a more dramatic push.',
      benefits: ['Can fit a fatigue-focused routine', 'Works best alongside sleep and meals', 'A more niche but interesting add-on'],
    },
  ],
  'Eat healthier': [
    {
      name: 'Vitamin D3',
      bestFor: ['Best for weight loss'],
      image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=80',
      description: 'A simple daily supplement when overall dietary variety is inconsistent.',
      whyItMayHelp: 'For a wellness-first plan, foundational support can make it easier to stay consistent when food options are not always ideal.',
      benefits: ['Supports basic routine wellness', 'Useful with a balanced checklist', 'Easy to slot into long-term habits'],
    },
    {
      name: 'Omega-3',
      bestFor: ['Best for sleep'],
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
      description: 'A practical support if seafood intake is low and you want an easy nutritional backup.',
      whyItMayHelp: 'A steady wellness foundation is often one of the simplest ways to support a plan that aims for better recovery and routine balance.',
      benefits: ['A dependable wellness foundation', 'Pairs well with routine meals', 'Helpful if fish is not a daily choice'],
    },
    {
      name: 'Probiotic',
      bestFor: ['Best for sleep'],
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
      description: 'A less common but popular option for digestive rhythm and daily gut support.',
      whyItMayHelp: 'Digestive comfort can influence how sustainable and enjoyable a routine feels, which makes gut support a practical option for long-term adherence.',
      benefits: ['Can complement meal consistency', 'Helpful for routine digestive balance', 'A nice add-on for a wellness-first plan'],
    },
  ],
  'Improve sleep': [
    {
      name: 'Magnesium glycinate',
      bestFor: ['Best for sleep'],
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
      description: 'A calming supplement option that often fits nighttime recovery routines well.',
      whyItMayHelp: 'A wind-down support product can be useful when your evenings feel too active and your recovery rhythm needs a little more structure.',
      benefits: ['Supports recovery and wind-down', 'Works nicely before bed', 'Better for routine sleep quality support'],
    },
    {
      name: 'L-theanine',
      bestFor: ['Best for sleep'],
      image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80',
      description: 'A less common calming add-on that can help a more restful evening routine.',
      whyItMayHelp: 'This is often used to support a calmer transition into rest, especially when stress and screen time are part of the evening routine.',
      benefits: ['Useful for a calm wind-down', 'Pairs well with a light evening ritual', 'Good for a more mindful recovery approach'],
    },
    {
      name: 'Omega-3',
      bestFor: ['Best for sleep'],
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
      description: 'A gentle baseline support that can pair with a nighttime recovery routine.',
      whyItMayHelp: 'A simple baseline supplement can help keep your wellness routine feeling complete, especially when the goal is better recovery and consistency.',
      benefits: ['Supports overall wellness', 'Helpful when meal variety is limited', 'Fits a simple, sustainable routine'],
    },
  ],
};

export const supplementExtraRecommendations = {
  'Lose weight': [
    { title: 'Hydration check', description: 'Aim for water first, and use electrolytes only when activity or sweat is high.' },
    { title: 'Fiber target', description: 'Add a fiber-forward snack or beverage if hunger is creeping up in the afternoon.' },
  ],
  'Gain muscle': [
    { title: 'Protein timing', description: 'Try to get a protein-forward meal or shake around training to improve consistency.' },
    { title: 'Sleep quality', description: 'Recovery is just as important as the workout plan, so protect your sleep window.' },
  ],
  'Tone up': [
    { title: 'Balanced breakfast', description: 'Keep breakfast protein-forward so the rest of the day feels more predictable.' },
    { title: 'Movement breaks', description: 'Short walking breaks help keep your routine active even on a busy day.' },
  ],
  'Improve energy': [
    { title: 'Morning light', description: 'A small amount of morning sun or bright light can help the body feel more awake.' },
    { title: 'Meal spacing', description: 'Avoid long gaps between eating so energy stays steadier and your routine feels easier.' },
  ],
  'Eat healthier': [
    { title: 'Food variety', description: 'Try one new produce item or protein each week so your meals stay interesting and sustainable.' },
    { title: 'Simple systems', description: 'Use repeatable breakfast and lunch templates to keep healthy habits realistic.' },
  ],
  'Improve sleep': [
    { title: 'Evening wind-down', description: 'Keep the last hour before bed low stimulation and choose calming foods or drinks when possible.' },
    { title: 'Consistency', description: 'Aim for the same sleep and wake times most nights to stabilize your energy rhythm.' },
  ],
};

export const micronutrientTargets = [
  'Vitamin D',
  'Omega-3 fats',
  'Calcium',
  'Fiber',
  'Potassium',
  'Iron (if your plan is low in red meat or plant-based protein)',
];
