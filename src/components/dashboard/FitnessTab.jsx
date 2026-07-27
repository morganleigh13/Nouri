import { Link } from 'react-router-dom';
import { fitnessResourceCards } from '../../data/fitnessResources';

const walkingImage = 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=900&q=80';

const categoryImages = {
  walking: walkingImage,
  running: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
  yoga: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
  strength: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80',
  cycling: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=900&q=80',
  dance: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
  pilates: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
  hiit: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=900&q=80',
  default: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
};

const getFitnessImage = (plan) => {
  const title = (plan.title || '').toLowerCase();
  const category = (plan.category || '').toLowerCase();

  if (category === 'walking' || title.includes('walk')) {
    return categoryImages.walking;
  }

  if (category === 'running' || title.includes('run')) {
    return categoryImages.running;
  }

  if (category === 'yoga' || title.includes('mobility') || title.includes('recovery')) {
    return categoryImages.yoga;
  }

  if (category === 'strength' || title.includes('strength') || title.includes('resistance')) {
    return categoryImages.strength;
  }

  if (category === 'cycling' || title.includes('cycle')) {
    return categoryImages.cycling;
  }

  if (category === 'dance' || title.includes('dance')) {
    return categoryImages.dance;
  }

  if (category === 'pilates' || title.includes('pilates')) {
    return categoryImages.pilates;
  }

  if (category === 'hiit' || title.includes('hiit')) {
    return categoryImages.hiit;
  }

  return categoryImages.default;
};

const fallbackCard = (plan) => ({
  title: plan.title,
  description: plan.description,
  technique: ['Start with 5 minutes of easy movement.', 'Choose an effort that lets you keep good form.', 'Increase time or difficulty gradually, week to week.'],
  examples: ['Try 20 minutes at a comfortable pace', 'Schedule 2–3 sessions each week'],
  classes: ['Community recreation classes', 'Beginner-friendly studio sessions'],
  image: getFitnessImage(plan),
});

export default function FitnessTab({ recommendations }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        {recommendations.fitnessPlans.map((plan) => {
          const category = plan.category;
          const card = fitnessResourceCards[category]?.[0] || fallbackCard(plan);

          return (
            <article key={category} className="card h-full overflow-hidden bg-base-200 shadow-xl">
              {card.image && <img src={card.image} alt={card.title} className="h-56 w-full object-cover" />}
              <div className="card-body">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="card-title text-xl text-primary">{card.title}</h3>
                  <span className="badge badge-accent">{category}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-base-content">{card.description}</p>
                <p className="mt-3 text-sm font-semibold text-secondary">How to do it</p>
                <ul className="mt-2 space-y-1 text-sm font-semibold">
                  {card.technique.map((step) => (
                    <li key={step}>• {step}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-semibold text-accent">Examples</p>
                <ul className="mt-2 space-y-1 text-sm font-semibold">
                  {card.examples.map((example) => (
                    <li key={example}>• {example}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-semibold text-info">Popular classes</p>
                <ul className="mt-2 space-y-1 text-sm font-semibold">
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
