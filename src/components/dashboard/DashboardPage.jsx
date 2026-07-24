import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import OverviewTab from './OverviewTab';
import FoodTab from './FoodTab';
import FitnessTab from './FitnessTab';
import SupplementsTab from './SupplementsTab';
import ResourcesTab from './ResourcesTab';

const navItems = [
  { key: 'overview', label: 'Overview' },
  { key: 'food', label: 'Food' },
  { key: 'fitness', label: 'Fitness' },
  { key: 'supplements', label: 'Supplements' },
  { key: 'resources', label: 'Resources' },
];

export default function DashboardPage({ survey, recommendations, summaryText, onBackToLanding }) {
  return (
    <div className="min-h-screen bg-base-200 p-4 text-base-content lg:p-8">
      <div className="mx-auto max-w-6xl rounded-3xl bg-base-100 p-6 shadow-xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Nouri dashboard</p>
            <h2 className="text-2xl font-bold">Your personalized mock wellness profile</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onBackToLanding}>Back to landing</button>
        </div>

        <div className="grid gap-3 md:grid-cols-5 mb-6">
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

        <Routes>
          <Route path="/" element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<OverviewTab survey={survey} recommendations={recommendations} />} />
          <Route path="food" element={<FoodTab recommendations={recommendations} />} />
          <Route path="fitness" element={<FitnessTab recommendations={recommendations} />} />
          <Route path="supplements" element={<SupplementsTab recommendations={recommendations} />} />
          <Route path="resources" element={<ResourcesTab recommendations={recommendations} />} />
        </Routes>

        <div className="mt-8 rounded-2xl bg-base-200 p-4 text-sm">
          <p className="font-semibold">Mock profile preview</p>
          <p className="mt-2">{summaryText}</p>
        </div>
      </div>
    </div>
  );
}
