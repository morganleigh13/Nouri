import { resourceCatalog } from '../../data/resourceCatalog';

export default function ResourcesTab({ recommendations }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="card bg-base-200 shadow">
        <div className="card-body">
          <h3 className="card-title">Resource topics</h3>
          <div className="mt-4 grid gap-2">
            {Object.keys(resourceCatalog).map((resourceKey) => (
              <button key={resourceKey} className="btn btn-outline justify-start">
                {resourceCatalog[resourceKey].title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-base-200 shadow">
        <div className="card-body">
          <h3 className="card-title">Food resources</h3>
          <p className="mt-2 text-sm">{resourceCatalog.food.details}</p>
          <div className="mt-4 rounded-2xl bg-base-100 p-4 text-sm">
            <p className="font-semibold">Recipe ideas</p>
            <ul className="mt-2 space-y-2">
              {recommendations.recipeCards.slice(0, 3).map((recipe) => (
                <li key={recipe.title} className="rounded-xl bg-base-200 p-3">{recipe.title} — {recipe.ingredients.join(', ')}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
