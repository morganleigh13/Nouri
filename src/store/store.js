import { configureStore } from '@reduxjs/toolkit';
import { initializeSurveyPersistence, resetSurvey, surveyReducer, updateSurvey } from './surveySlice';

export const store = configureStore({
  reducer: {
    survey: surveyReducer,
  },
});

initializeSurveyPersistence(store);

export { resetSurvey, updateSurvey };
