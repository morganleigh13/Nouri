import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'nouri-survey';

const initialState = () => ({
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
  const emptySurvey = initialState();
  if (!value || typeof value !== 'object') {
    return emptySurvey;
  }

  return {
    ...emptySurvey,
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
    return initialState();
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return initialState();
    }

    return normalizeSurvey(JSON.parse(saved));
  } catch {
    return initialState();
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
    updateSurvey: (state, action) => ({ ...state, ...action.payload }),
    resetSurvey: () => initialState(),
  },
});

export const { updateSurvey, resetSurvey } = surveySlice.actions;
export const surveyReducer = surveySlice.reducer;

export const initializeSurveyPersistence = (store) => {
  store.subscribe(() => {
    persistSurvey(store.getState().survey);
  });
};
