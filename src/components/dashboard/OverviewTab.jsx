export default function OverviewTab({ survey, recommendations }) {
  const bmi = (() => {
    const heightInMeters = Number(survey.height) / 100;
    const weightInPounds = Number(survey.weight);
    const weightInKilograms = weightInPounds / 2.20462;

    if (!heightInMeters || !weightInPounds) {
      return 0;
    }

    return weightInKilograms / (heightInMeters * heightInMeters);
  })();

  const ageBand = survey.age >= 50 ? 'Older adult' : survey.age >= 25 ? 'Adult' : 'Younger adult';
  const targetBmiMin = 18.5;
  const targetBmiMax = 24.9;
  const currentWeight = Number(survey.weight) || 0;
  const heightMeters = Number(survey.height) ? Number(survey.height) / 100 : 0;
  const targetWeight = heightMeters ? (targetBmiMax * heightMeters * heightMeters * 2.20462).toFixed(1) : 0;
  const weightDelta = Number((currentWeight - Number(targetWeight)).toFixed(1));
  const bmiStatus = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Healthy range' : bmi < 30 ? 'Overweight' : 'Obesity range';
  const bmiBarPosition = Math.min(Math.max((bmi / 35) * 100, 5), 100);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="card bg-base-200 shadow">
        <div className="card-body">
          <h3 className="card-title">Profile snapshot</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-base-100 p-4">
              <p className="text-xs uppercase tracking-[0.3em] opacity-60">BMI</p>
              <p className="mt-2 text-3xl font-bold">{bmi.toFixed(1)}</p>
              <p className="text-sm opacity-70">{bmiStatus}</p>
            </div>
            <div className="rounded-2xl bg-base-100 p-4">
              <p className="text-xs uppercase tracking-[0.3em] opacity-60">Age range</p>
              <p className="mt-2 text-lg font-bold">{ageBand}</p>
              <p className="text-sm opacity-70">Age-informed weight target: {targetWeight} lb</p>
            </div>
            <div className="rounded-2xl bg-base-100 p-4 sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.3em] opacity-60">Current goal</p>
              <p className="mt-2 text-lg font-bold">{survey.goal}</p>
              <p className="text-sm opacity-70">Weight delta from target: {Math.abs(weightDelta).toFixed(1)} lb {weightDelta > 0 ? 'above' : 'below'} your age-aware target</p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-base-100 p-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>BMI range</span>
              <span>Healthy: {targetBmiMin}–{targetBmiMax}</span>
            </div>
            <div className="h-3 rounded-full bg-base-300 overflow-hidden">
              <div className="h-full rounded-full bg-success" style={{ width: `${Math.max(12, bmiBarPosition)}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-xs opacity-70">
              <span>Under 18.5</span>
              <span>18.5–24.9</span>
              <span>25+</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 shadow">
        <div className="card-body">
          <h3 className="card-title">Daily targets</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-base-100 p-4">
              <p className="text-xs uppercase tracking-[0.3em] opacity-60">Macros</p>
              <ul className="mt-2 space-y-2 text-sm">
                <li>Protein: {recommendations.macroTargets.protein}</li>
                <li>Carbs: {recommendations.macroTargets.carbs}</li>
                <li>Fats: {recommendations.macroTargets.fats}</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-base-100 p-4">
              <p className="text-xs uppercase tracking-[0.3em] opacity-60">Micros</p>
              <ul className="mt-2 space-y-2 text-sm">
                {recommendations.micronutrients.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-base-100 p-4 sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.3em] opacity-60">Recommended water</p>
              <p className="mt-2 text-lg font-bold">{recommendations.hydrationOunces} / day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
