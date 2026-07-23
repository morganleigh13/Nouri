import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetSurvey, updateSurvey } from './store/store';
import { resourceCatalog } from './data/resourceCatalog';
import { steps } from './data/surveySteps';
import { foodRecommendations, fitnessRecommendations, supplementRecommendations, micronutrientTargets } from './data/recommendationData';
import './App.css';

function App() {
  const survey = useSelector((state) => state.survey);
  const dispatch = useDispatch();
  const [screen, setScreen] = useState('landing');
  const [stepIndex, setStepIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedResource, setSelectedResource] = useState('food');

  const step = steps[stepIndex];

  const summaryText = useMemo(() => {
    return [
      `Goal: ${survey.goal}`,
      `Fitness: ${survey.fitnessPreferences.join(', ')}`,
      `Activity: ${survey.activityLevel}`,
      `Allergies: ${survey.allergies.join(', ')}`,
      `Foods enjoyed: ${survey.enjoyedFoods.join(', ')}`,
      `Restrictions: ${survey.restrictions.join(', ')}`,
      `Supplements: ${survey.supplements.join(', ')}`,
      `Goals: ${survey.goals.join(', ')}`,
    ].join(' • ');
  }, [survey]);

  const bmi = useMemo(() => {
    const heightInMeters = Number(survey.height) / 100;
    const weightInPounds = Number(survey.weight);
    const weightInKilograms = weightInPounds / 2.20462;

    if (!heightInMeters || !weightInPounds) {
      return 0;
    }

    return weightInKilograms / (heightInMeters * heightInMeters);
  }, [survey.height, survey.weight]);

  const ageBand = survey.age >= 50 ? 'Older adult' : survey.age >= 25 ? 'Adult' : 'Younger adult';
  const targetBmiMin = 18.5;
  const targetBmiMax = 24.9;
  const currentWeight = Number(survey.weight) || 0;
  const heightMeters = Number(survey.height) ? Number(survey.height) / 100 : 0;
  const targetWeight = heightMeters ? (targetBmiMax * heightMeters * heightMeters * 2.20462).toFixed(1) : 0;
  const weightDelta = Number((currentWeight - Number(targetWeight)).toFixed(1));
  const bmiStatus = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Healthy range' : bmi < 30 ? 'Overweight' : 'Obesity range';
  const bmiBarPosition = Math.min(Math.max((bmi / 35) * 100, 5), 100);

  const recommendations = useMemo(() => {
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
        ingredients: [
          '1 cup Greek yogurt',
          '1/2 cup fruit',
          '1/3 cup oats',
          '1 tbsp chia seeds',
        ],
        instructions: [
          'Layer yogurt, fruit, oats, and chia seeds in a bowl or jar.',
          'Repeat the layers once more.',
          'Serve immediately or chill until ready to eat.',
        ],
        notes: ['Useful for breakfast or a balanced snack.'],
        nutrition: 'Calories: 320kcal | Carbohydrates: 29g | Protein: 22g | Fat: 10g | Fiber: 5g',
      },
      {
        meal: 'Lunch',
        title: `${baseProduce} Wrap with ${baseProtein}`,
        image: '🌯',
        ingredients: [
          '1 whole grain wrap',
          `4 oz ${baseProtein}`,
          `1/2 cup ${baseProduce}`,
          '1/4 cup chopped herbs',
          '1 tbsp yogurt or hummus',
        ],
        instructions: [
          'Warm the wrap lightly if desired.',
          'Layer protein, produce, herbs, and dressing inside the wrap.',
          'Roll tightly and slice in half for serving.',
        ],
        notes: ['Easy to prep and flexible for lunch or dinner.'],
        nutrition: 'Calories: 390kcal | Carbohydrates: 33g | Protein: 24g | Fat: 14g | Fiber: 7g',
      },
      {
        meal: 'Dinner',
        title: `${baseProtein} + ${baseProduce} Bowl`,
        image: '🥗',
        ingredients: [
          `1 serving ${baseProtein}`,
          `1 cup ${baseProduce}`,
          `1 cup ${baseCarb}`,
          '2 cups leafy greens',
          '1 tbsp olive oil or yogurt dressing',
        ],
        instructions: [
          'Cook the protein and grain and portion them into a bowl.',
          'Add chopped vegetables and leafy greens on top.',
          'Finish with a light dressing, yogurt drizzle, or herbs.',
        ],
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

    if (allergies.includes('Dairy')) {
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
      foodRecommendations: foodRecommendations[goal] || foodRecommendations['Eat healthier'],
      fitnessRecommendations: fitnessRecommendations[goal] || fitnessRecommendations['Eat healthier'],
      supplementRecommendations: supplementRecommendations[goal] || supplementRecommendations['Eat healthier'],
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
  }, [survey]);

  const toggleOption = (key, option) => {
    const current = survey[key] || [];
    const next = current.includes(option)
      ? current.filter((item) => item !== option)
      : [...current, option];

    dispatch(updateSurvey({ [key]: next }));
  };

  const handleFieldChange = (key, value) => {
    dispatch(updateSurvey({ [key]: value }));
  };

  const nextStep = () => {
    setStepIndex((index) => Math.min(index + 1, steps.length - 1));
  };

  const previousStep = () => {
    setStepIndex((index) => Math.max(index - 1, 0));
  };

  const startSurvey = () => {
    setScreen('survey');
    setStepIndex(0);
  };

  const finishSurvey = () => {
    setScreen('dashboard');
    setStepIndex(0);
    setActiveTab('overview');
  };

  const resetFlow = () => {
    dispatch(resetSurvey());
    setScreen('dashboard');
    setStepIndex(0);
    setActiveTab('overview');
    setSelectedResource('food');
  };

  if (screen === 'landing') {
    return (
      <div className="min-h-screen bg-base-200 text-base-content">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <section className="rounded-3xl bg-linear-to-br from-primary to-secondary p-8 text-primary-content shadow-xl">
            <p className="text-sm uppercase tracking-[0.35em] opacity-80">Nouri</p>
            <h1 className="mt-3 text-4xl font-bold lg:text-5xl">Healthy living guidance, built around your preferences.</h1>
            <p className="mt-4 max-w-xl text-base opacity-90">
              Nouri helps people explore healthier routines with a mock onboarding flow for fitness, nutrition,
              allergies, restrictions, habits, and health goals.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btn btn-neutral" onClick={startSurvey}>Get started</button>
              <button className="btn btn-outline btn-neutral" onClick={resetFlow}>Reset mock data</button>
            </div>
          </section>

          <section className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Included services</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="rounded-2xl bg-base-200 px-4 py-3">Goal-focused onboarding survey</li>
                <li className="rounded-2xl bg-base-200 px-4 py-3">BMI and age-aware profile review</li>
                <li className="rounded-2xl bg-base-200 px-4 py-3">Food, fitness, and supplement recommendations</li>
                <li className="rounded-2xl bg-base-200 px-4 py-3">Mock navigation to review all results</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (screen === 'survey') {
    return (
      <div className="min-h-screen bg-base-200 p-4 text-base-content lg:p-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-base-100 p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Step {stepIndex + 1} of {steps.length}</p>
              <h2 className="text-2xl font-bold">{step.title}</h2>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setScreen('landing')}>Back to landing</button>
          </div>

          <p className="mb-5 text-sm opacity-75">{step.description}</p>

          {step.type === 'multi-select' && (
            <div className="grid gap-3 md:grid-cols-2">
              {step.options.map((option) => {
                const active = (survey[step.key] || []).includes(option);
                return (
                  <button
                    key={option}
                    className={`btn justify-start ${active ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => toggleOption(step.key, option)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          )}

          {step.type === 'select' && (
            <div className="grid gap-3 md:grid-cols-2">
              {step.options.map((option) => (
                <button
                  key={option}
                  className={`btn ${survey[step.key] === option ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handleFieldChange(step.key, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {step.type === 'form' && (
            <div className="grid gap-4 md:grid-cols-2">
              {step.fields.map((field) => (
                <label key={field.key} className="form-control">
                  <span className="label-text mb-2">{field.label}</span>
                  <input
                    type={field.type}
                    className="input input-bordered"
                    value={survey[field.key] ?? ''}
                    onChange={(event) => handleFieldChange(field.key, field.type === 'number' ? Number(event.target.value) : event.target.value)}
                  />
                </label>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap justify-between gap-3">
            <button className="btn btn-ghost" onClick={previousStep} disabled={stepIndex === 0}>Previous</button>

            <div className="flex gap-3">
              {stepIndex < steps.length - 1 ? (
                <button className="btn btn-primary" onClick={nextStep}>Next</button>
              ) : (
                <button className="btn btn-success" onClick={finishSurvey}>Finish survey</button>
              )}
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-base-200 p-4 text-sm">
            <p className="font-semibold">Mock profile preview</p>
            <p className="mt-2">{summaryText}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 text-base-content lg:p-8">
      <div className="mx-auto max-w-6xl rounded-3xl bg-base-100 p-6 shadow-xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Nouri dashboard</p>
            <h2 className="text-2xl font-bold">Your personalized mock wellness profile</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => setScreen('landing')}>Back to landing</button>
        </div>

        <div className="grid gap-3 md:grid-cols-5 mb-6">
          {['overview', 'food', 'fitness', 'supplements', 'resources'].map((tab) => (
            <button
              key={tab}
              className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab[0].toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h3 className="card-title">Profile snapshot</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-base-100 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] opacity-60">BMI</p>
                    <p className="mt-2 text-3xl font-bold">{bmi.toFixed(1)}</p>
                    <p className="text-sm opacity-70">{bmiStatus}</p>
                  </div>
                  <div className="rounded-2xl bg-base-100 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] opacity-60">Age range</p>
                    <p className="mt-2 text-lg font-bold">{ageBand}</p>
                    <p className="text-sm opacity-70">Age-informed weight target: {targetWeight} lb</p>
                  </div>
                  <div className="rounded-2xl bg-base-100 p-4 sm:col-span-2">
                    <p className="text-xs uppercase tracking-[0.3em] opacity-60">Current goal</p>
                    <p className="mt-2 text-lg font-bold">{survey.goal}</p>
                    <p className="text-sm opacity-70">Weight delta from target: {Math.abs(weightDelta).toFixed(1)} lb {weightDelta > 0 ? 'above' : 'below'} your age-aware target</p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-base-100 p-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>BMI range</span>
                    <span>Healthy: {targetBmiMin}–{targetBmiMax}</span>
                  </div>
                  <div className="h-3 rounded-full bg-base-300 overflow-hidden">
                    <div className="h-full rounded-full bg-success" style={{ width: `${Math.max(12, bmiBarPosition)}%` }} />
                  </div>
                  <div className="mt-2 flex justify-between text-xs opacity-70">
                    <span>Under 18.5</span>
                    <span>18.5–24.9</span>
                    <span>25+</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h3 className="card-title">Daily targets</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-base-100 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] opacity-60">Macros</p>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li>Protein: {recommendations.macroTargets.protein}</li>
                      <li>Carbs: {recommendations.macroTargets.carbs}</li>
                      <li>Fats: {recommendations.macroTargets.fats}</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-base-100 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] opacity-60">Micros</p>
                    <ul className="mt-2 space-y-2 text-sm">
                      {recommendations.micronutrients.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-base-100 p-4 sm:col-span-2">
                    <p className="text-xs uppercase tracking-[0.3em] opacity-60">Recommended water</p>
                    <p className="mt-2 text-lg font-bold">{recommendations.hydrationOunces} / day</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'food' && (
          <div className="space-y-4">
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h3 className="card-title">Recommended recipes</h3>
                <div className="mt-4 grid gap-4 lg:grid-cols-3">
                  {recommendations.recipeCards.map((recipe) => (
                    <article key={`${recipe.meal}-${recipe.title}`} className="rounded-3xl bg-base-100 p-5 shadow-sm">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] opacity-60">{recipe.meal}</p>
                          <h4 className="text-xl font-bold">{recipe.title}</h4>
                        </div>
                        <div className="text-4xl" aria-hidden="true">{recipe.image}</div>
                      </div>

                      <div className="rounded-2xl bg-base-200 p-4">
                        <p className="text-sm font-semibold">Ingredients</p>
                        <ul className="mt-2 space-y-1 text-sm">
                          {recipe.ingredients.map((ingredient) => (
                            <li key={ingredient}>• {ingredient}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 rounded-2xl bg-base-200 p-4">
                        <p className="text-sm font-semibold">Instructions</p>
                        <ol className="mt-2 space-y-1 text-sm">
                          {recipe.instructions.map((step, index) => (
                            <li key={step}> {index + 1}. {step}</li>
                          ))}
                        </ol>
                      </div>

                      <div className="mt-4 rounded-2xl bg-base-200 p-4">
                        <p className="text-sm font-semibold">Notes</p>
                        <ul className="mt-2 space-y-1 text-sm">
                          {recipe.notes.map((note) => (
                            <li key={note}>• {note}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 rounded-2xl bg-success/10 p-4 text-sm">
                        <p className="font-semibold">Nutrition</p>
                        <p className="mt-1">{recipe.nutrition}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {recommendations.foodRecommendations.map((item) => (
                <div key={item} className="card bg-base-200 shadow">
                  <div className="card-body">
                    <h3 className="card-title">Food suggestion</h3>
                    <p className="mt-2 text-sm">{item}</p>
                    <button className="btn btn-outline btn-sm mt-4" onClick={() => { setSelectedResource('food'); setActiveTab('resources'); }}>
                      View resources
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'fitness' && (
          <div className="grid gap-4 md:grid-cols-2">
            {recommendations.fitnessRecommendations.map((item) => (
              <div key={item} className="card bg-base-200 shadow">
                <div className="card-body">
                  <h3 className="card-title">Fitness suggestion</h3>
                  <p className="mt-2 text-sm">{item}</p>
                  <button className="btn btn-outline btn-sm mt-4" onClick={() => { setSelectedResource('fitness'); setActiveTab('resources'); }}>
                    View resources
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'supplements' && (
          <div className="grid gap-4 md:grid-cols-2">
            {recommendations.supplementRecommendations.map((item) => (
              <div key={item} className="card bg-base-200 shadow">
                <div className="card-body">
                  <h3 className="card-title">Supplement suggestion</h3>
                  <p className="mt-2 text-sm">{item}</p>
                  <button className="btn btn-outline btn-sm mt-4" onClick={() => { setSelectedResource('supplements'); setActiveTab('resources'); }}>
                    View resources
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h3 className="card-title">Resource topics</h3>
                <div className="mt-4 grid gap-2">
                  {Object.keys(resourceCatalog).map((resourceKey) => (
                    <button
                      key={resourceKey}
                      className={`btn justify-start ${selectedResource === resourceKey ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => setSelectedResource(resourceKey)}
                    >
                      {resourceCatalog[resourceKey].title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h3 className="card-title">{resourceCatalog[selectedResource].title}</h3>
                <p className="mt-2 text-sm">{resourceCatalog[selectedResource].details}</p>

                {selectedResource === 'food' && (
                  <div className="mt-4 rounded-2xl bg-base-100 p-4 text-sm">
                    <p className="font-semibold">Recipe ideas</p>
                    <ul className="mt-2 space-y-2">
                      {recommendations.recipeCards.slice(0, 3).map((recipe) => (
                        <li key={recipe.title} className="rounded-xl bg-base-200 p-3">{recipe.title} — {recipe.ingredients.join(', ')}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedResource === 'fitness' && (
                  <div className="mt-4 rounded-2xl bg-base-100 p-4 text-sm">
                    <p className="font-semibold">Movement suggestions</p>
                    <ul className="mt-2 space-y-2">
                      {recommendations.fitnessRecommendations.map((item) => (
                        <li key={item} className="rounded-xl bg-base-200 p-3">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedResource === 'supplements' && (
                  <div className="mt-4 rounded-2xl bg-base-100 p-4 text-sm">
                    <p className="font-semibold">Supplement suggestions</p>
                    <ul className="mt-2 space-y-2">
                      {recommendations.supplementRecommendations.map((item) => (
                        <li key={item} className="rounded-xl bg-base-200 p-3">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 rounded-2xl bg-base-200 p-4 text-sm">
          <p className="font-semibold">Mock profile preview</p>
          <p className="mt-2">{summaryText}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
