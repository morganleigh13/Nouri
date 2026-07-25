import { useNavigate } from 'react-router-dom';

export default function LandingPage({ onResetMockData }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center bg-base-200 px-4 py-20 text-base-content sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-2">
        <section className="flex min-h-[28rem] flex-col justify-center rounded-box bg-linear-to-br from-primary to-secondary p-8 text-primary-content shadow-2xl sm:p-12 lg:min-h-[34rem] lg:p-14">
          <p className="text-sm uppercase tracking-[0.35em] opacity-80">Nouri</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Healthy living guidance, built around your preferences.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 opacity-90 sm:text-lg">
            Nouri helps people explore healthier routines with a mock onboarding flow for fitness, nutrition,
            allergies, restrictions, habits, and health goals.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="btn btn-neutral w-full sm:w-auto" onClick={() => navigate('/survey')}>Get started</button>
            <button className="btn btn-outline btn-neutral w-full sm:w-auto" onClick={onResetMockData}>Reset mock data</button>
          </div>
        </section>

        <section className="card min-h-[28rem] bg-base-100 shadow-2xl lg:min-h-[34rem]">
          <div className="card-body justify-center p-8 sm:p-12 lg:p-14">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Your wellness toolkit</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Included services</h2>
            <ul className="mt-8 space-y-4 text-base sm:text-lg">
              <li className="rounded-2xl bg-base-200 px-5 py-4">Goal-focused onboarding survey</li>
              <li className="rounded-2xl bg-base-200 px-5 py-4">BMI and wellness-profile review</li>
              <li className="rounded-2xl bg-base-200 px-5 py-4">Food, fitness, and supplement recommendations</li>
              <li className="rounded-2xl bg-base-200 px-5 py-4">Mock navigation to review all results</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
