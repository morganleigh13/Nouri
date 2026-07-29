import { useNavigate } from 'react-router';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-shell flex min-h-screen items-center px-4 py-20 text-base-content sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-2">
        <section className="landing-panel hero-panel relative flex min-h-112 flex-col justify-center overflow-hidden rounded-[2rem] p-8 text-primary-content sm:p-12 lg:min-h-[34rem] lg:p-14">
          <div className="hero-decoration hero-decoration-left" aria-hidden="true" />
          <div className="hero-decoration hero-decoration-right" aria-hidden="true" />
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/80">Welcome to</p>
          <h1 className="brand-mark mt-3 inline-flex w-fit items-center self-start rounded-full bg-white/12 px-4 py-2 text-3xl font-black tracking-[0.2em] text-white shadow-[0_8px_24px_rgba(0,0,0,0.16)] sm:text-4xl lg:text-5xl">
            NOURI
          </h1>
          <h2 className="mt-5 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            A calmer, more intentional path to everyday wellness.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/90 sm:text-lg">
            Discover a thoughtful starting point for healthier routines with gentle guidance for fitness,
            nutrition, habits, and goals.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="btn btn-neutral w-full sm:w-auto" onClick={() => navigate('/survey')}>
              Get started
            </button>
          </div>
        </section>

        <section className="landing-panel service-panel min-h-112 overflow-hidden rounded-[2rem] lg:min-h-[34rem]">
          <div className="card-body justify-center p-8 sm:p-12 lg:p-14">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Your wellness toolkit</p>
            <h2 className="service-heading mt-3 text-3xl font-bold text-base-content sm:text-4xl">Included services</h2>
            <ul className="service-list mt-8 text-base sm:text-lg">
              <li>Goal-focused onboarding survey</li>
              <li>BMI and wellness-profile review</li>
              <li>Food, fitness, and supplement recommendations</li>
              <li>Navigation to review all results</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
