import { resourceCatalog } from '../../data/resourceCatalog';
import { fitnessLocationGuides } from '../../data/fitnessResources';

const fitnessCategories = [
  { key: 'running', label: 'Running' },
  { key: 'strength', label: 'Strength' },
];

export default function ResourcesTab({ recommendations }) {
  const location = 'New York, NY';

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

          <div className="mt-6">
            <h3 className="card-title">Fitness resources</h3>
            <p className="mt-2 text-sm">Choose a workout style to see local places to train near {location}.</p>
            <div className="mt-4 grid gap-3">
              {fitnessCategories.map((category) => (
                <div key={category.key} className="rounded-2xl bg-base-100 p-4">
                  <p className="font-semibold">{category.label}</p>
                  <div className="mt-3 space-y-3">
                    {(fitnessLocationGuides[category.key][location] || fitnessLocationGuides[category.key].default).map((place) => (
                      <div key={place.name} className="rounded-xl bg-base-200 p-3">
                        <p className="font-semibold">{place.name}</p>
                        <p className="mt-1 text-sm opacity-75">{place.type}</p>
                        <p className="mt-1 text-sm opacity-70">Location: {place.address}</p>
                        <p className="mt-1 text-sm opacity-70">Hours: {place.hours}</p>
                        <a className="link link-primary mt-2 inline-block text-sm" href={place.website} target="_blank" rel="noreferrer">
                          Visit website
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
