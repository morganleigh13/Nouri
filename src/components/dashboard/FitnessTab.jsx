import { Link } from 'react-router-dom';
import { fitnessResourceCards } from '../../data/fitnessResources';

const fallbackCard = (plan) => ({
  title: plan.title,
  description: plan.description,
  technique: ['Start with 5 minutes of easy movement.', 'Choose an effort that lets you keep good form.', 'Increase time or difficulty gradually, week to week.'],
  examples: ['Try 20 minutes at a comfortable pace', 'Schedule 2–3 sessions each week'],
  classes: ['Community recreation classes', 'Beginner-friendly studio sessions'],
});

export default function FitnessTab({ recommendations }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        {recommendations.fitnessPlans.map((plan) => {
          const category = plan.category;
          const card = fitnessResourceCards[category]?.[0] || fallbackCard(plan);

          return (
            <article key={category} className="card bg-base-200 shadow overflow-hidden">
              {card.image && <img src={card.image} alt={card.title} className="h-52 w-full object-cover" />}
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
                <Link to={`/dashboard/resources?activity=${category}`} className="btn btn-outline btn-sm mt-4">
                  See local activity resources
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
