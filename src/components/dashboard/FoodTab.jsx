const foodSuggestionImages = {
  salmon: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
  yogurt: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
  greens: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
  default: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80',
};

export default function FoodTab({ recommendations }) {
  return (
    <div className="space-y-4">
      <div className="card bg-base-200 shadow">
        <div className="card-body">
          <h3 className="card-title">Recommended recipes</h3>
          {recommendations.recipeCards[0] && (
            <div className="mt-4 overflow-hidden rounded-3xl">
              <img src={recommendations.recipeCards[0].image} alt={recommendations.recipeCards[0].title} className="h-52 w-full object-cover" />
            </div>
          )}
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {recommendations.recipeCards.map((recipe) => (
              <article key={`${recipe.meal}-${recipe.title}`} className="rounded-3xl bg-base-100 p-5 shadow-sm">
                <div className="mb-4 flex flex-col gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] opacity-60">{recipe.meal}</p>
                    <h4 className="text-xl font-bold">{recipe.title}</h4>
                  </div>
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
        {recommendations.foodRecommendations.map((item) => {
          const lowerItem = item.toLowerCase();
          const image = lowerItem.includes('salmon')
            ? foodSuggestionImages.salmon
            : lowerItem.includes('yogurt') || lowerItem.includes('greek')
              ? foodSuggestionImages.yogurt
              : lowerItem.includes('greens') || lowerItem.includes('salad') || lowerItem.includes('leafy')
                ? foodSuggestionImages.greens
                : foodSuggestionImages.default;

          return (
            <div key={item} className="card bg-base-200 shadow">
              <div className="card-body">
                <h3 className="card-title">Food suggestion</h3>
                <p className="mt-2 text-sm">{item}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
