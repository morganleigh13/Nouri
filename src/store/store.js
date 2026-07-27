import { configureStore, createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'nouri-survey';

const createEmptySurvey = () => ({
  name: '',
  goal: '',
  fitnessPreferences: [],
  activityLevel: '',
  allergies: [],
  enjoyedFoods: [],
  restrictions: [],
  supplements: [],
  age: '',
  gender: '',
  weight: '',
  height: '',
  sleepHours: '',
  stressLevel: '',
  goals: [],
});

const normalizeSurvey = (value) => {
  const base = createEmptySurvey();
  if (!value || typeof value !== 'object') {
    return base;
  }

  return {
    ...base,
    ...value,
    fitnessPreferences: Array.isArray(value.fitnessPreferences) ? [...value.fitnessPreferences] : [],
    allergies: Array.isArray(value.allergies) ? [...value.allergies] : [],
    enjoyedFoods: Array.isArray(value.enjoyedFoods) ? [...value.enjoyedFoods] : [],
    restrictions: Array.isArray(value.restrictions) ? [...value.restrictions] : [],
    supplements: Array.isArray(value.supplements) ? [...value.supplements] : [],
    goals: Array.isArray(value.goals) ? [...value.goals] : [],
  };
};

const loadPersistedSurvey = () => {
  if (typeof window === 'undefined') {
    return createEmptySurvey();
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return createEmptySurvey();
    }

    return normalizeSurvey(JSON.parse(saved));
  } catch {
    return createEmptySurvey();
  }
};

const persistSurvey = (survey) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(survey));
  } catch {
    // Ignore persistence failures silently.
  }
};

const surveySlice = createSlice({
  name: 'survey',
  initialState: loadPersistedSurvey(),
  reducers: {
    updateSurvey: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetSurvey: () => createEmptySurvey(),
  },
});

export const { updateSurvey, resetSurvey } = surveySlice.actions;

export const store = configureStore({
  reducer: {
    survey: surveySlice.reducer,
  },
});

store.subscribe(() => {
  persistSurvey(store.getState().survey);
});
