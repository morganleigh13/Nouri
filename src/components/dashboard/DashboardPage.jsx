import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { key: 'overview', label: 'Overview' },
  { key: 'food', label: 'Food' },
  { key: 'fitness', label: 'Fitness' },
  { key: 'supplements', label: 'Supplements' },
  { key: 'resources', label: 'Resources' },
];

export default function DashboardPage({ onBackToLanding, survey }) {
  const displayName = survey?.name?.trim() || 'your';
  const headingText = displayName === 'your'
    ? 'Your personalized wellness profile'
    : `${displayName}'s personalized wellness profile`;

  return (
    <div className="min-h-screen bg-base-200 px-4 pb-4 pt-20 text-base-content sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl rounded-box bg-base-100 p-5 shadow-xl sm:p-6">
        <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Nouri dashboard</p>
            <h2 className="text-2xl font-bold">{headingText}</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onBackToLanding}>Back to landing</button>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={`/dashboard/${item.key}`}
              className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-outline'}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <Outlet />
      </div>
    </div>
  );
}
