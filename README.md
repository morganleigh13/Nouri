# Nouri

Nouri is a front-end React prototype for exploring personalized wellness guidance. It collects a mock wellness profile and presents mock food, fitness, supplement, BMI, hydration, and resource recommendations.

## Stack

- React + Vite
- React Router
- Redux Toolkit
- Tailwind CSS + DaisyUI
- JavaScript (no TypeScript)

## Run locally

```bash
npm install
npm run dev
```

Use `npm run lint` to check the code and `npm run build` to create a production build.

## Data and safety

The project intentionally has no backend, authentication, database, or API requests. Recommendations and resource listings are curated mock data in `src/data/`, so they are predictable during development and do not claim to be live local results.

The app is educational only. Food, BMI, activity, and supplement content is not medical advice; users should verify ingredients and consult an appropriate clinician for individual medical, dietary, or supplement decisions.
