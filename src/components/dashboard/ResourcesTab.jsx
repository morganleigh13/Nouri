import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { resourceCatalog } from '../../data/resourceCatalog';
import { fitnessLocationGuides, supplementLocationGuides, foodServiceGuides, stateCityOptions } from '../../data/fitnessResources';

const fitnessCategories = [
  { key: 'walking', label: 'Walking' },
  { key: 'running', label: 'Running' },
  { key: 'yoga', label: 'Yoga' },
  { key: 'strength', label: 'Strength' },
  { key: 'cycling', label: 'Cycling' },
  { key: 'dance', label: 'Dance' },
  { key: 'pilates', label: 'Pilates' },
  { key: 'hiit', label: 'HIIT' },
];

const distanceOptions = [5, 10, 20, 50];
const foodServiceOptions = [
  { key: 'delivery', label: 'Meal delivery' },
  { key: 'chefs', label: 'Personal chefs' },
];

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

export default function ResourcesTab({ recommendations }) {
  const [searchParams] = useSearchParams();
  const requestedActivity = searchParams.get('activity');
  const [selectedState, setSelectedState] = useState('New York');
  const [selectedCity, setSelectedCity] = useState('New York, NY');
  const [selectedDistance, setSelectedDistance] = useState(20);
  const [selectedCategory, setSelectedCategory] = useState(
    requestedActivity && fitnessCategories.some((category) => category.key === requestedActivity)
      ? requestedActivity
      : 'running',
  );
  const [selectedFoodService, setSelectedFoodService] = useState('delivery');

  const categoryGuide = fitnessLocationGuides[selectedCategory] || fitnessLocationGuides.running;
  const resourceList = categoryGuide[selectedCity] || categoryGuide.default;
  const supplementList = supplementLocationGuides[selectedCity] || supplementLocationGuides.default;
  const filteredResourceList = resourceList.filter((place) => place.distanceMiles <= selectedDistance);
  const filteredFoodServices = (foodServiceGuides[selectedFoodService] || []).filter((place) => place.distanceMiles <= selectedDistance);

  const handleTopicClick = (resourceKey) => {
    document.getElementById(resourceKey)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleStateChange = (nextState) => {
    setSelectedState(nextState);
    setSelectedCity(stateCityOptions[nextState][0]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="card bg-base-200 shadow">
        <div className="card-body">
          <h3 className="card-title">Resource topics</h3>
          <div className="mt-4 grid gap-2">
            {Object.keys(resourceCatalog).map((resourceKey) => (
              <button
                key={resourceKey}
                className="btn btn-outline justify-start"
                onClick={() => handleTopicClick(resourceKey)}
              >
                {resourceCatalog[resourceKey].title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div id="food" className="card bg-base-200 shadow">
        <div className="card-body">
          <h3 className="card-title">Food resources</h3>
          <p className="mt-2 text-sm">{resourceCatalog.food.details}</p>

          {recommendations.dietaryNeeds.length > 0 && (
            <p className="mt-3 rounded-xl bg-warning/10 p-3 text-sm">
              Plan filters: {recommendations.dietaryNeeds.join(', ')}. Always confirm ingredients and service availability directly with the provider.
            </p>
          )}

          <div className="mt-4 rounded-2xl bg-base-100 p-4 text-sm">
            <p className="font-semibold">Recipe ideas</p>
            <ul className="mt-2 space-y-2">
              {recommendations.recipeCards.slice(0, 3).map((recipe) => (
                <li key={recipe.title} className="rounded-xl bg-base-200 p-3">
                  <p className="font-semibold">{recipe.title}</p>
                  <p className="mt-1 text-sm opacity-80">
                    {recipe.ingredients.map(formatIngredient).join(', ')}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl bg-base-100 p-4">
            <p className="font-semibold">Meal delivery and personal chefs</p>
            <p className="mt-2 text-sm">Static listings for the prototype. Choose a service type and distance to explore the interface.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {foodServiceOptions.map((service) => (
                <button
                  key={service.key}
                  className={`btn btn-sm ${selectedFoodService === service.key ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setSelectedFoodService(service.key)}
                >
                  {service.label}
                </button>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              {filteredFoodServices.map((place) => (
                <div key={place.name} className="rounded-xl bg-base-200 p-3">
                  <p className="font-semibold">{place.name}</p>
                  <p className="mt-1 text-sm opacity-75">{place.type}</p>
                  <p className="mt-1 text-sm opacity-70">Serves: {place.serves}</p>
                  <p className="mt-1 text-sm opacity-70">Distance from {selectedCity}: {place.distanceMiles} miles</p>
                  <a className="link link-primary mt-2 inline-block text-sm" href={place.website} target="_blank" rel="noreferrer">
                    Visit website
                  </a>
                </div>
              ))}
              {filteredFoodServices.length === 0 && <p className="text-sm opacity-70">No services match that distance. Try a wider radius.</p>}
            </div>
          </div>

          <div id="fitness" className="mt-6">
            <h3 className="card-title">Fitness resources</h3>
            <p className="mt-2 text-sm">Pick a city and a workout type to see places to train locally.</p>

            <div className="mt-4 flex flex-col gap-3 md:flex-row">
              <label className="form-control flex-1">
                <span className="label-text mb-2">State</span>
                <select
                  className="select select-bordered"
                  value={selectedState}
                  onChange={(event) => handleStateChange(event.target.value)}
                >
                  {Object.keys(stateCityOptions).map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </label>

              <label className="form-control flex-1">
                <span className="label-text mb-2">Major city</span>
                <select
                  className="select select-bordered"
                  value={selectedCity}
                  onChange={(event) => setSelectedCity(event.target.value)}
                >
                  {stateCityOptions[selectedState].map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </label>

              <label className="form-control flex-1">
                <span className="label-text mb-2">Within (miles)</span>
                <select
                  className="select select-bordered"
                  value={selectedDistance}
                  onChange={(event) => setSelectedDistance(Number(event.target.value))}
                >
                  {distanceOptions.map((distance) => (
                    <option key={distance} value={distance}>{distance} miles</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {fitnessCategories.map((category) => (
                <button
                  key={category.key}
                  className={`btn btn-sm ${selectedCategory === category.key ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setSelectedCategory(category.key)}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-base-100 p-4">
              <p className="font-semibold">{selectedCategory[0].toUpperCase() + selectedCategory.slice(1)} resources near {selectedCity} within {selectedDistance} miles</p>
              <div className="mt-3 space-y-3">
                {filteredResourceList.map((place) => (
                  <div key={place.name} className="rounded-xl bg-base-200 p-3">
                    <p className="font-semibold">{place.name}</p>
                    <p className="mt-1 text-sm opacity-75">{place.type}</p>
                    <p className="mt-1 text-sm opacity-70">Location: {place.address}</p>
                    <p className="mt-1 text-sm opacity-70">Hours: {place.hours}</p>
                    <p className="mt-1 text-sm opacity-70">Distance: {place.distanceMiles} miles</p>
                    <a className="link link-primary mt-2 inline-block text-sm" href={place.website} target="_blank" rel="noreferrer">
                      Visit website
                    </a>
                  </div>
                ))}
                {filteredResourceList.length === 0 && <p className="text-sm opacity-70">No locations match that distance. Try a wider radius or another city.</p>}
              </div>
            </div>

            <div id="supplements" className="mt-6 rounded-2xl bg-base-100 p-4">
              <h4 className="font-semibold">Supplement shopping spots</h4>
              <p className="mt-2 text-sm">Browse local places to pick up protein, vitamins, recovery supplements, and everyday wellness basics.</p>
              <div className="mt-3 space-y-3">
                {supplementList.map((place) => (
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
          </div>
        </div>
      </div>

      <div id="recipes" className="card bg-base-200 shadow">
        <div className="card-body">
          <h3 className="card-title">Recipe ideas</h3>
          <p className="mt-2 text-sm">{resourceCatalog.recipes.details}</p>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="btn btn-circle btn-primary fixed bottom-6 right-6 z-50 shadow-lg animate-pulse"
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
}
