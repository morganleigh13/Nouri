import {
  foodRecommendations as foodCopy,
  fitnessRecommendations as fitnessCopy,
  supplementRecommendations as supplementCopy,
  supplementExtraRecommendations as supplementExtraCopy,
  micronutrientTargets,
} from '../data/recommendationData';

const normalized = (value) => value.toLowerCase().replace(/[^a-z]/g, '');

const foodConflicts = {
  Dairy: ['yogurt', 'milk', 'cheese', 'whey'],
  Gluten: ['wrap', 'oats'],
  Soy: ['tofu', 'soy'],
  Eggs: ['egg'],
  Shellfish: ['shrimp', 'shellfish'],
  Peanuts: ['peanut'],
  'Tree nuts': ['almond', 'cashew', 'walnut', 'nut'],
  Sesame: ['sesame'],
};

const restrictionConflicts = {
  Vegan: ['salmon', 'chicken', 'yogurt', 'honey'],
  Vegetarian: ['salmon', 'chicken'],
  Pescatarian: ['chicken'],
  Halal: ['pork'],
  Kosher: ['pork', 'shellfish'],
  'Low-carb': ['rice', 'oats', 'wrap'],
};

const fitnessDetails = {
  Walking: { category: 'walking', title: 'Brisk walking', description: 'An accessible way to build consistency and cardiovascular fitness.' },
  Running: { category: 'running', title: 'Run / walk intervals', description: 'Alternating effort and recovery helps make running approachable.' },
  Yoga: { category: 'yoga', title: 'Yoga and mobility', description: 'Low-impact strength, balance, and recovery work.' },
  'Strength training': { category: 'strength', title: 'Full-body strength', description: 'Progressive resistance training that supports strength and function.' },
  Cycling: { category: 'cycling', title: 'Steady cycling', description: 'Joint-friendly cardio that can scale to your current fitness level.' },
  Dance: { category: 'dance', title: 'Dance cardio', description: 'An enjoyable, rhythmic way to add moderate movement.' },
  Pilates: { category: 'pilates', title: 'Pilates foundations', description: 'Core strength, control, mobility, and posture-focused movement.' },
  HIIT: { category: 'hiit', title: 'Low-impact HIIT', description: 'Short, structured intervals with recovery built in.' },
};

const mealTemplates = [
  {
    meal: 'Breakfast',
    title: 'Protein breakfast bowl',
    ingredients: ['Greek yogurt', 'berries', 'oats', 'chia seeds'],
    alternatives: { Dairy: 'coconut yogurt', Vegan: 'coconut yogurt', Gluten: 'certified gluten-free oats', 'Low-carb': 'berries and chia seeds' },
    instructions: ['Combine the base, fruit, and oats in a bowl.', 'Top with chia seeds and serve.'],
    nutrition: 'Approx. 320 kcal · 22 g protein · 5 g fiber',
  },
  {
    meal: 'Lunch',
    title: 'Protein and produce wrap',
    ingredients: ['chicken', 'leafy greens', 'avocado', 'whole-grain wrap', 'hummus'],
    alternatives: { Vegan: 'chickpeas', Vegetarian: 'chickpeas', Pescatarian: 'salmon', Gluten: 'lettuce cups', Sesame: 'white-bean spread', 'Low-carb': 'lettuce cups' },
    instructions: ['Layer the protein, vegetables, and spread in the wrap.', 'Roll tightly and serve with fruit or vegetables.'],
    nutrition: 'Approx. 390 kcal · 24 g protein · 7 g fiber',
  },
  {
    meal: 'Dinner',
    title: 'Balanced grain bowl',
    ingredients: ['salmon', 'rice', 'leafy greens', 'avocado', 'lemon-herb dressing'],
    alternatives: { Vegan: 'lentils', Vegetarian: 'lentils', 'Low-carb': 'cauliflower rice' },
    instructions: ['Cook the protein and grain.', 'Assemble with greens and vegetables, then add dressing.'],
    nutrition: 'Approx. 420 kcal · 26 g protein · 8 g fiber',
  },
];

function conflictsWithPlan(text, allergies, restrictions) {
  const ingredient = normalized(text);
  return [...allergies, ...restrictions].some((rule) =>
    (foodConflicts[rule] || restrictionConflicts[rule] || []).some((term) => ingredient.includes(normalized(term))),
  );
}

const recipeImageMap = {
  Breakfast: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
  Lunch: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
  Dinner: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
};

function makeRecipe(template, allergies, restrictions, goal) {
  const replacements = Object.entries(template.alternatives || {})
    .filter(([rule]) => allergies.includes(rule) || restrictions.includes(rule))
    .map(([, replacement]) => replacement);
  const safeIngredients = template.ingredients
    .map((ingredient) => (conflictsWithPlan(ingredient, allergies, restrictions) ? replacements.shift() : ingredient))
    .filter(Boolean);

  return {
    ...template,
    image: recipeImageMap[template.meal] || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80',
    ingredients: safeIngredients,
    notes: [`Built as a mock recipe for your ${goal.toLowerCase()} goal. Confirm packaged ingredients and portions for your own needs.`],
  };
}

function adaptFoodSuggestions(suggestions, allergies, restrictions) {
  const protein = restrictions.includes('Vegan') || restrictions.includes('Vegetarian')
    ? 'lentils or chickpeas'
    : restrictions.includes('Pescatarian') ? 'salmon' : 'chicken or salmon';
  const yogurt = allergies.includes('Dairy') || restrictions.includes('Vegan') ? 'dairy-free yogurt' : 'Greek yogurt';
  const nutSwap = allergies.includes('Tree nuts') || allergies.includes('Peanuts') ? 'seeds' : 'nuts';

  return suggestions.map((suggestion) => suggestion
    .replace(/Greek yogurt/gi, '__YOGURT__')
    .replace(/salmon/gi, protein)
    .replace(/yogurt/gi, yogurt)
    .replace(/__YOGURT__/g, yogurt)
    .replace(/nuts/gi, nutSwap));
}

export function buildRecommendations(survey) {
  const allergies = survey.allergies || [];
  const restrictions = (survey.restrictions || []).filter((item) => item !== 'None');
  const goal = survey.goal || 'Eat healthier';
  const weight = Number(survey.weight) || 0;
  const weightInKilograms = weight / 2.20462;
  const proteinTarget = Math.round((goal === 'Gain muscle' ? 1.8 : goal === 'Lose weight' ? 1.4 : 1.6) * weightInKilograms);
  const carbTarget = Math.round((goal === 'Lose weight' ? 2.5 : goal === 'Gain muscle' ? 4 : 3.2) * weightInKilograms);
  const fatTarget = Math.round((goal === 'Lose weight' ? 0.8 : goal === 'Gain muscle' ? 0.9 : 0.8) * weightInKilograms);
  const hydrationOunces = Math.round(weight * 0.67 + (survey.activityLevel === 'Very active' ? 16 : survey.activityLevel === 'Moderately active' ? 10 : 6));
  const preferredFitness = (survey.fitnessPreferences || []).map((preference) => fitnessDetails[preference]).filter(Boolean);

  return {
    foodRecommendations: adaptFoodSuggestions(foodCopy[goal] || foodCopy['Eat healthier'], allergies, restrictions),
    fitnessRecommendations: fitnessCopy[goal] || fitnessCopy['Eat healthier'],
    fitnessPlans: preferredFitness.length ? preferredFitness : [fitnessDetails.Walking, fitnessDetails['Strength training']],
    supplementRecommendations: supplementCopy[goal] || supplementCopy['Eat healthier'],
    supplementExtraRecommendations: supplementExtraCopy[goal] || supplementExtraCopy['Eat healthier'],
    recipeCards: mealTemplates.map((template) => makeRecipe(template, allergies, restrictions, goal)),
    dietaryNeeds: [...allergies, ...restrictions],
    macroTargets: { protein: `${proteinTarget} g`, carbs: `${carbTarget} g`, fats: `${fatTarget} g` },
    hydrationOunces: `${hydrationOunces} oz`,
    micronutrients: micronutrientTargets,
  };
}
