import { useMemo, useState } from 'react';

const foodSuggestionImages = {
  salmon: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
  yogurt: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
  greens: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
  bowl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
  breakfast: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
  smoothie: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80',
  pasta: 'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?auto=format&fit=crop&w=900&q=80',
  snack: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=900&q=80',
  default: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80',
};

function formatIngredient(ingredient) {
  if (typeof ingredient === 'string') {
    return ingredient;
  }

  if (ingredient && typeof ingredient === 'object') {
    const amount = ingredient.amount || '1 serving';
    const name = ingredient.ingredient || ingredient.name || '';
    return `${amount} ${name}`.trim();
  }

  return '';
}

function getFoodImage(item) {
  const lowerItem = item.toLowerCase();

  if (lowerItem.includes('salmon') || lowerItem.includes('protein') || lowerItem.includes('chicken')) {
    return foodSuggestionImages.salmon;
  }

  if (lowerItem.includes('yogurt') || lowerItem.includes('greek') || lowerItem.includes('smoothie') || lowerItem.includes('breakfast')) {
    return foodSuggestionImages.yogurt;
  }

  if (lowerItem.includes('greens') || lowerItem.includes('salad') || lowerItem.includes('leafy') || lowerItem.includes('vegetables')) {
    return foodSuggestionImages.greens;
  }

  if (lowerItem.includes('bowl') || lowerItem.includes('grain') || lowerItem.includes('rice') || lowerItem.includes('lentils') || lowerItem.includes('chickpeas')) {
    return foodSuggestionImages.bowl;
  }

  if (lowerItem.includes('toast') || lowerItem.includes('egg') || lowerItem.includes('omelet')) {
    return foodSuggestionImages.breakfast;
  }

  if (lowerItem.includes('pasta') || lowerItem.includes('noodle') || lowerItem.includes('penne')) {
    return foodSuggestionImages.pasta;
  }

  if (lowerItem.includes('snack') || lowerItem.includes('berries') || lowerItem.includes('nuts') || lowerItem.includes('fruit')) {
    return foodSuggestionImages.snack;
  }

  return foodSuggestionImages.default;
}

export default function FoodTab({ recommendations }) {
  const [activeDay, setActiveDay] = useState(0);
  const recipeCards = useMemo(() => recommendations.recipeCards || [], [recommendations.recipeCards]);
  const dietaryNeeds = useMemo(() => recommendations.dietaryNeeds || [], [recommendations.dietaryNeeds]);

  const dayPlans = useMemo(() => {
    if (!recipeCards.length) return [];

    const rotations = [
      recipeCards,
      [recipeCards[1], recipeCards[2], recipeCards[0]],
      [recipeCards[2], recipeCards[0], recipeCards[1]],
    ].filter((plan) => plan.every(Boolean));

    return rotations.map((recipes, index) => ({
      id: index + 1,
      label: `Day ${index + 1}`,
      recipes,
    }));
  }, [recipeCards]);

  const activePlan = dayPlans[activeDay] || { label: 'Day 1', recipes: recipeCards };

  return (
    <div className="space-y-4">
      <div className="card h-full bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h3 className="card-title">Recommended recipes</h3>
              <p className="mt-2 text-sm opacity-80">A simple 3-day meal plan you can rotate through.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {dayPlans.map((day, index) => (
                <button
                  key={day.id}
                  className={`btn btn-sm ${activeDay === index ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setActiveDay(index)}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>

          {dietaryNeeds.length > 0 && (
            <div className="alert mt-4 border border-primary/30 bg-primary/10 text-primary-content shadow-sm">
              <div className="w-full">
                <p className="font-semibold text-base-content">Adapted for your needs</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {dietaryNeeds.map((need) => (
                    <span key={need} className="badge badge-primary badge-outline">{need}</span>
                  ))}
                </div>
                <p className="mt-2 text-sm text-base-content/90">These recipes were adjusted to stay aligned with your allergies and restrictions.</p>
              </div>
            </div>
          )}

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {activePlan.recipes.map((recipe) => (
              <article key={`${recipe.meal}-${recipe.title}-${activePlan.label}`} className="flex h-full flex-col overflow-hidden rounded-3xl bg-base-100 shadow-sm">
                <img src={recipe.image} alt={recipe.title} className="h-44 w-full object-cover" />
                <div className="flex h-full flex-col p-5">
                  <div className="mb-4 flex flex-col gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] opacity-60">{recipe.meal}</p>
                      <h4 className="text-xl font-bold">{recipe.title}</h4>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-base-200 p-4">
                    <p className="text-sm font-semibold text-primary">Ingredients</p>
                    <ul className="mt-2 space-y-2 text-sm font-semibold">
                      {recipe.ingredients.map((ingredient) => (
                        <li key={`${recipe.title}-${formatIngredient(ingredient)}`}>{formatIngredient(ingredient)}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 rounded-2xl bg-base-200 p-4">
                    <p className="text-sm font-semibold text-secondary">Instructions</p>
                    <ol className="mt-2 space-y-2 text-sm font-semibold">
                      {recipe.instructions.map((step, index) => (
                        <li key={`${recipe.title}-${step}`}>{index + 1}. {step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-4 rounded-2xl bg-base-200 p-4">
                    <p className="text-sm font-semibold text-accent">Notes</p>
                    <ul className="mt-2 space-y-2 text-sm font-semibold">
                      {recipe.notes.map((note) => (
                        <li key={`${recipe.title}-${note}`}>{note}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 rounded-2xl bg-success/10 p-4 text-sm">
                    <p className="font-semibold text-success">Nutrition</p>
                    <p className="mt-1 font-semibold">{recipe.nutrition}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-base-100 p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-primary">Food suggestions</h3>
          <span className="text-sm opacity-70">Curated ideas</span>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {(recommendations.foodRecommendations || []).slice(0, 3).map((item) => {
            const image = getFoodImage(item);

            return (
              <div key={item} className="overflow-hidden rounded-3xl bg-base-200 shadow-sm">
                <img src={image} alt={item} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <p className="text-sm font-semibold text-base-content">{item}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
