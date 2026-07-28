const calculateBmi = (heightInInches, weightInPounds) => {
  if (!heightInInches || !weightInPounds) {
    return 0;
  }

  const heightSquared = heightInInches * heightInInches;
  return (weightInPounds / heightSquared) * 703;
};

const getBmiStatus = (bmi) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Healthy range';
  if (bmi < 30) return 'Overweight';
  return 'Obesity range';
};

export default function OverviewTab({ survey, recommendations }) {
  const selectedGoals = Array.from(new Set([survey.goal, ...(survey.goals || [])].filter(Boolean)));
  const primaryGoal = selectedGoals[0] || 'Set a goal';

  const heightInInches = Number(survey.height) || 0;
  const weightInPounds = Number(survey.weight) || 0;
  const ageValue = Number(survey.age);
  const bmi = calculateBmi(heightInInches, weightInPounds);
  const ageBand = Number.isFinite(ageValue) && ageValue >= 65 ? 'Older adult' : Number.isFinite(ageValue) && ageValue >= 25 ? 'Adult' : 'Younger adult';
  const targetBmiMin = 18.5;
  const targetBmiMax = 24.9;
  const healthyWeightMin = heightInInches ? ((targetBmiMin * heightInInches * heightInInches) / 703).toFixed(1) : 0;
  const healthyWeightMax = heightInInches ? ((targetBmiMax * heightInInches * heightInInches) / 703).toFixed(1) : 0;
  const healthyWeightMinNumber = Number(healthyWeightMin);
  const healthyWeightMaxNumber = Number(healthyWeightMax);
  const weightDelta = weightInPounds < healthyWeightMinNumber
    ? weightInPounds - healthyWeightMinNumber
    : weightInPounds > healthyWeightMaxNumber
      ? weightInPounds - healthyWeightMaxNumber
      : 0;

  const bmiStatus = getBmiStatus(bmi);
  const bmiBarPosition = Math.min(Math.max((bmi / 35) * 100, 5), 100);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="card h-full bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-base-100 p-4">
              <p className="text-xs uppercase tracking-[0.3em] opacity-60">BMI</p>
              <p className="mt-2 text-3xl font-bold text-accent">{bmi.toFixed(1)}</p>
              <p className="text-sm font-semibold text-info">{bmiStatus}</p>
            </div>
            <div className="rounded-2xl bg-base-100 p-4">
              <p className="text-xs uppercase tracking-[0.3em] opacity-60">Age range</p>
              <p className="mt-2 text-lg font-bold text-secondary">{ageBand}</p>
              <p className="text-sm opacity-70">Healthy weight range: {healthyWeightMin}–{healthyWeightMax} lb</p>
            </div>
            <div className="rounded-2xl bg-base-100 p-4 sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.3em] opacity-60">Your selected goals</p>
              <p className="mt-2 text-xl font-bold text-primary">{primaryGoal}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedGoals.map((goal) => (
                  <span key={goal} className="badge badge-accent badge-outline px-3 py-3 text-sm">{goal}</span>
                ))}
              </div>
              <p className="mt-3 text-sm opacity-70">{weightDelta === 0 ? 'Your current weight falls within the healthy range.' : `${Math.abs(weightDelta).toFixed(1)} lb ${weightDelta > 0 ? 'above' : 'below'} the healthy range.`}</p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-base-100 p-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>BMI range</span>
              <span>Healthy: {targetBmiMin}–{targetBmiMax}</span>
            </div>
            <div className="relative h-3 overflow-hidden rounded-full bg-warning/60">
              <div className="absolute left-[53%] h-full w-[18%] bg-success" />
              <div className="absolute left-[71%] h-full w-[29%] bg-error/60" />
              <div className="absolute top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-neutral" style={{ left: `${bmiBarPosition}%` }} aria-label={`Your BMI is ${bmi.toFixed(1)}`} />
            </div>
            <div className="mt-2 flex justify-between text-xs opacity-70">
              <span>Under 18.5</span>
              <span>18.5–24.9</span>
              <span>25+</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card h-full bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-base-100 p-4">
              <p className="text-xs uppercase tracking-[0.3em] opacity-60">Macros</p>
              <ul className="mt-2 space-y-2 text-sm font-semibold">
                <li className="text-primary">Protein: {recommendations.macroTargets.protein}</li>
                <li className="text-secondary">Carbs: {recommendations.macroTargets.carbs}</li>
                <li className="text-accent">Fats: {recommendations.macroTargets.fats}</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-base-100 p-4">
              <p className="text-xs uppercase tracking-[0.3em] opacity-60">Micros</p>
              <ul className="mt-2 space-y-2 text-sm font-semibold">
                {recommendations.micronutrients.map((item) => (
                  <li key={item} className="text-info">• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-base-100 p-4 sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.3em] opacity-60">Recommended water</p>
              <p className="mt-2 text-2xl font-bold text-success">{recommendations.hydrationOunces} / day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
