import { useNavigate } from 'react-router-dom';

export default function LandingPage({ onResetMockData }) {
  const navigate = useNavigate();

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
            <button className="btn btn-neutral" onClick={() => navigate('/survey')}>Get started</button>
            <button className="btn btn-outline btn-neutral" onClick={onResetMockData}>Reset mock data</button>
          </div>
        </section>

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Included services</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="rounded-2xl bg-base-200 px-4 py-3">Goal-focused onboarding survey</li>
              <li className="rounded-2xl bg-base-200 px-4 py-3">BMI and wellness-profile review</li>
              <li className="rounded-2xl bg-base-200 px-4 py-3">Food, fitness, and supplement recommendations</li>
              <li className="rounded-2xl bg-base-200 px-4 py-3">Mock navigation to review all results</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
