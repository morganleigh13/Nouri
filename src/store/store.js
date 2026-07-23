import { configureStore, createSlice } from '@reduxjs/toolkit';
import { mockSurveyProfile } from '../data/mockData';

const cloneMockSurvey = () => ({
  ...mockSurveyProfile,
  fitnessPreferences: [...mockSurveyProfile.fitnessPreferences],
  allergies: [...mockSurveyProfile.allergies],
  enjoyedFoods: [...mockSurveyProfile.enjoyedFoods],
  restrictions: [...mockSurveyProfile.restrictions],
  supplements: [...mockSurveyProfile.supplements],
  goals: [...mockSurveyProfile.goals],
});

const surveySlice = createSlice({
  name: 'survey',
  initialState: cloneMockSurvey(),
  reducers: {
    updateSurvey: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetSurvey: () => cloneMockSurvey(),
  },
});

export const { updateSurvey, resetSurvey } = surveySlice.actions;

export const store = configureStore({
  reducer: {
    survey: surveySlice.reducer,
  },
});
