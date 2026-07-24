import { Link } from 'react-router-dom';
import { fitnessResourceCards } from '../../data/fitnessResources';

const getFitnessCategory = (item) => {
  if (item.toLowerCase().includes('walk') || item.toLowerCase().includes('running') || item.toLowerCase().includes('cardio')) {
    return 'running';
  }

  return 'strength';
};

export default function FitnessTab({ recommendations }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        {recommendations.fitnessRecommendations.map((item) => {
          const category = getFitnessCategory(item);
          const card = fitnessResourceCards[category][0];

          return (
            <article key={item} className="card bg-base-200 shadow overflow-hidden">
              <img src={card.image} alt={card.title} className="h-52 w-full object-cover" />
              <div className="card-body">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="card-title">{card.title}</h3>
                  <span className="badge badge-primary">{category}</span>
                </div>
                <p className="mt-2 text-sm">{card.description}</p>
                <p className="mt-3 text-sm font-semibold">How to do it</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {card.technique.map((step) => (
                    <li key={step}>• {step}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-semibold">Examples</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {card.examples.map((example) => (
                    <li key={example}>• {example}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-semibold">Popular classes</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {card.classes.map((className) => (
                    <li key={className}>• {className}</li>
                  ))}
                </ul>
                <Link to="/dashboard/resources" className="btn btn-outline btn-sm mt-4">
                  See {category} resources
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
