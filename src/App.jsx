import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetSurvey, updateSurvey } from './store/store';
import LandingPage from './components/LandingPage';
import SurveyPage from './components/SurveyPage';
import DashboardPage from './components/dashboard/DashboardPage';
import OverviewTab from './components/dashboard/OverviewTab';
import FoodTab from './components/dashboard/FoodTab';
import FitnessTab from './components/dashboard/FitnessTab';
import SupplementsTab from './components/dashboard/SupplementsTab';
import ResourcesTab from './components/dashboard/ResourcesTab';
import ThemePicker from './components/ThemePicker';
import { buildRecommendations } from './utils/recommendationEngine';
import './App.css';

function App() {
  const survey = useSelector((state) => state.survey);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const summaryText = useMemo(() => {
    const normalizeText = (value) => {
      if (Array.isArray(value)) {
        return value.filter(Boolean).join(', ') || 'None';
      }

      if (typeof value === 'string') {
        return value.trim() || 'None';
      }

      return 'None';
    };

    return [
      `Goal: ${normalizeText(survey.goal)}`,
      `Fitness: ${normalizeText(survey.fitnessPreferences)}`,
      `Activity: ${normalizeText(survey.activityLevel)}`,
      `Allergies: ${normalizeText(survey.allergies)}`,
      `Foods enjoyed: ${normalizeText(survey.enjoyedFoods)}`,
      `Restrictions: ${normalizeText(survey.restrictions)}`,
      `Supplements: ${normalizeText(survey.supplements)}`,
      `Goals: ${normalizeText(survey.goals)}`,
    ].join(' • ');
  }, [survey]);

  const recommendations = useMemo(() => buildRecommendations(survey), [survey]);

  const toggleOption = (key, option) => {
    const current = survey[key] || [];
    const next = current.includes(option)
      ? current.filter((item) => item !== option)
      : [...current, option];

    dispatch(updateSurvey({ [key]: next }));
  };

  const handleFieldChange = (key, value) => {
    dispatch(updateSurvey({ [key]: value }));
  };

  const finishSurvey = () => {
    navigate('/dashboard/overview');
  };

  const resetFlow = () => {
    dispatch(resetSurvey());
    navigate('/dashboard/overview');
  };

  return (
    <>
      <ThemePicker />
      <Routes>
        <Route path="/" element={<LandingPage onResetData={resetFlow} />} />
        <Route
          path="/survey"
          element={
            <SurveyPage
              survey={survey}
              summaryText={summaryText}
              onToggleOption={toggleOption}
              onFieldChange={handleFieldChange}
              onFinishSurvey={finishSurvey}
            />
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <DashboardPage
              survey={survey}
              onBackToLanding={() => navigate('/')}
            />
          }
        >
          <Route path="overview" element={<OverviewTab survey={survey} recommendations={recommendations} />} />
          <Route path="food" element={<FoodTab recommendations={recommendations} />} />
          <Route path="fitness" element={<FitnessTab recommendations={recommendations} />} />
          <Route path="supplements" element={<SupplementsTab recommendations={recommendations} />} />
          <Route path="resources" element={<ResourcesTab recommendations={recommendations} />} />
          <Route index element={<Navigate to="overview" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
