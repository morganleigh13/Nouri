import {
  foodRecommendations as foodCopy,
  fitnessRecommendations as fitnessCopy,
  supplementRecommendations as supplementCopy,
  supplementExtraRecommendations as supplementExtraCopy,
  micronutrientTargets,
} from '../data/recommendationData';

export function buildRecommendations(survey) {
  const preferredFoods = survey.enjoyedFoods || [];
  const allergies = survey.allergies || [];
  const restrictions = survey.restrictions || [];
  const goal = survey.goal || 'Eat healthier';

  const safeFoodOptions = preferredFoods.filter((food) => !allergies.some((item) => item.toLowerCase() === food.toLowerCase()));
  const baseProtein = safeFoodOptions[0] || 'Salmon';
  const baseProduce = safeFoodOptions.find((food) => food.toLowerCase().includes('avocado') || food.toLowerCase().includes('fruit') || food.toLowerCase().includes('leafy')) || 'Leafy greens';
  const baseCarb = safeFoodOptions.find((food) => food.toLowerCase().includes('rice') || food.toLowerCase().includes('beans')) || 'Rice';

  const addWithFallback = (list, item) => {
    if (!list.some((entry) => entry.title === item.title)) {
      list.push(item);
    }
  };

  const recipeCards = [
    {
      meal: 'Breakfast',
      title: 'Greek Yogurt Power Parfait',
      image: '🥣',
      ingredients: ['1 cup Greek yogurt', '1/2 cup fruit', '1/3 cup oats', '1 tbsp chia seeds'],
      instructions: ['Layer yogurt, fruit, oats, and chia seeds in a bowl or jar.', 'Repeat the layers once more.', 'Serve immediately or chill until ready to eat.'],
      notes: ['Useful for breakfast or a balanced snack.'],
      nutrition: 'Calories: 320kcal | Carbohydrates: 29g | Protein: 22g | Fat: 10g | Fiber: 5g',
    },
    {
      meal: 'Lunch',
      title: `${baseProduce} Wrap with ${baseProtein}`,
      image: '🌯',
      ingredients: ['1 whole grain wrap', `4 oz ${baseProtein}`, `1/2 cup ${baseProduce}`, '1/4 cup chopped herbs', '1 tbsp yogurt or hummus'],
      instructions: ['Warm the wrap lightly if desired.', 'Layer protein, produce, herbs, and dressing inside the wrap.', 'Roll tightly and slice in half for serving.'],
      notes: ['Easy to prep and flexible for lunch or dinner.'],
      nutrition: 'Calories: 390kcal | Carbohydrates: 33g | Protein: 24g | Fat: 14g | Fiber: 7g',
    },
    {
      meal: 'Dinner',
      title: `${baseProtein} + ${baseProduce} Bowl`,
      image: '🥗',
      ingredients: [`1 serving ${baseProtein}`, `1 cup ${baseProduce}`, `1 cup ${baseCarb}`, '2 cups leafy greens', '1 tbsp olive oil or yogurt dressing'],
      instructions: ['Cook the protein and grain and portion them into a bowl.', 'Add chopped vegetables and leafy greens on top.', 'Finish with a light dressing, yogurt drizzle, or herbs.'],
      notes: [`A simple meal that uses your preferred foods while supporting your ${goal.toLowerCase()} goal.`],
      nutrition: 'Calories: 420kcal | Carbohydrates: 38g | Protein: 26g | Fat: 18g | Fiber: 8g',
    },
  ];

  if (restrictions.includes('Vegan')) {
    addWithFallback(recipeCards, {
      meal: 'Dinner',
      title: 'Tofu Veggie Stir-Fry',
      image: '🍲',
      ingredients: ['6 oz tofu', '1 cup broccoli', '1 cup carrots', '1 cup rice'],
      instructions: ['Sauté tofu and vegetables in a hot pan.', 'Add rice and season lightly.', 'Serve warm with herbs or soy-free sauce.'],
      notes: ['A plant-forward option that fits your restrictions.'],
      nutrition: 'Calories: 410kcal | Carbohydrates: 42g | Protein: 20g | Fat: 15g | Fiber: 7g',
    });
  }

  if (restrictions.includes('Vegetarian')) {
    addWithFallback(recipeCards, {
      meal: 'Lunch',
      title: 'Chickpea Avocado Salad',
      image: '🥗',
      ingredients: ['1 cup chickpeas', '1/2 avocado', '1 cup cucumber', '1 tbsp lemon dressing'],
      instructions: ['Combine chickpeas, avocado, and cucumber.', 'Dress lightly with lemon and herbs.', 'Enjoy as a hearty lunch or side.'],
      notes: ['A quick high-fiber option that works well for balanced meals.'],
      nutrition: 'Calories: 360kcal | Carbohydrates: 28g | Protein: 14g | Fat: 18g | Fiber: 9g',
    });
  }

  if (allergies.includes('Dairy') || restrictions.includes('Vegan')) {
    addWithFallback(recipeCards, {
      meal: 'Breakfast',
      title: 'Dairy-Free Smoothie Bowl',
      image: '🥤',
      ingredients: ['1 banana', '1/2 cup oats', '1 cup nut-free milk', '1/2 cup berries'],
      instructions: ['Blend the banana, oats, and milk until smooth.', 'Top with berries and serve chilled.'],
      notes: ['A dairy-free option made with familiar ingredients.'],
      nutrition: 'Calories: 280kcal | Carbohydrates: 35g | Protein: 9g | Fat: 8g | Fiber: 6g',
    });
  }

  const weightInKilograms = (Number(survey.weight) || 0) / 2.20462;
  const proteinTarget = Math.round((goal === 'Gain muscle' ? 1.8 : goal === 'Lose weight' ? 1.4 : 1.6) * weightInKilograms);
  const carbTarget = Math.round((goal === 'Lose weight' ? 2.5 : goal === 'Gain muscle' ? 4 : 3.2) * weightInKilograms);
  const fatTarget = Math.round((goal === 'Lose weight' ? 0.8 : goal === 'Gain muscle' ? 0.9 : 0.8) * weightInKilograms);
  const hydrationOunces = Math.round((Number(survey.weight) || 0) * 0.67 + (survey.activityLevel === 'Very active' ? 16 : survey.activityLevel === 'Moderately active' ? 10 : 6));

  return {
    foodRecommendations: foodCopy[goal] || foodCopy['Eat healthier'],
    fitnessRecommendations: fitnessCopy[goal] || fitnessCopy['Eat healthier'],
    supplementRecommendations: supplementCopy[goal] || supplementCopy['Eat healthier'],
    supplementExtraRecommendations: supplementExtraCopy[goal] || supplementExtraCopy['Eat healthier'],
    recipeCards,
    preferredFoods: safeFoodOptions,
    macroTargets: {
      protein: `${proteinTarget} g`,
      carbs: `${carbTarget} g`,
      fats: `${fatTarget} g`,
    },
    hydrationOunces: `${hydrationOunces} oz`,
    micronutrients: micronutrientTargets,
  };
}
