import { useState } from 'react';
import { resourceCatalog } from '../../data/resourceCatalog';
import { fitnessLocationGuides, supplementLocationGuides } from '../../data/fitnessResources';

const fitnessCategories = [
  { key: 'running', label: 'Running' },
  { key: 'strength', label: 'Strength' },
];

const locationOptions = ['New York, NY', 'Brooklyn, NY', 'default'];

export default function ResourcesTab({ recommendations }) {
  const [selectedLocation, setSelectedLocation] = useState('New York, NY');
  const [selectedCategory, setSelectedCategory] = useState('running');

  const resourceList = fitnessLocationGuides[selectedCategory][selectedLocation] || fitnessLocationGuides[selectedCategory].default;
  const supplementList = supplementLocationGuides[selectedLocation] || supplementLocationGuides.default;

  const handleTopicClick = (resourceKey) => {
    document.getElementById(resourceKey)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
          <div className="mt-4 rounded-2xl bg-base-100 p-4 text-sm">
            <p className="font-semibold">Recipe ideas</p>
            <ul className="mt-2 space-y-2">
              {recommendations.recipeCards.slice(0, 3).map((recipe) => (
                <li key={recipe.title} className="rounded-xl bg-base-200 p-3">{recipe.title} — {recipe.ingredients.join(', ')}</li>
              ))}
            </ul>
          </div>

          <div id="fitness" className="mt-6">
            <h3 className="card-title">Fitness resources</h3>
            <p className="mt-2 text-sm">Pick a city and a workout type to see places to train locally.</p>

            <div className="mt-4 flex flex-col gap-3 md:flex-row">
              <label className="form-control flex-1">
                <span className="label-text mb-2">City</span>
                <select
                  className="select select-bordered"
                  value={selectedLocation}
                  onChange={(event) => setSelectedLocation(event.target.value)}
                >
                  {locationOptions.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </label>

              <div className="flex-1">
                <span className="label-text mb-2 block">Workout type</span>
                <div className="flex flex-wrap gap-2">
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
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-base-100 p-4">
              <p className="font-semibold">{selectedCategory[0].toUpperCase() + selectedCategory.slice(1)} resources in {selectedLocation}</p>
              <div className="mt-3 space-y-3">
                {resourceList.map((place) => (
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
    </div>
  );
}
