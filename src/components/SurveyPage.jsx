import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { steps } from '../data/surveySteps';

export default function SurveyPage({ survey, summaryText, onToggleOption, onFieldChange, onFinishSurvey }) {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];

  const nextStep = () => setStepIndex((index) => Math.min(index + 1, steps.length - 1));
  const previousStep = () => setStepIndex((index) => Math.max(index - 1, 0));

  return (
    <div className="min-h-screen bg-base-200 px-4 pb-4 pt-20 text-base-content sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl rounded-box bg-base-100 p-5 shadow-xl sm:p-6">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Step {stepIndex + 1} of {steps.length}</p>
            <h2 className="text-2xl font-bold">{step.title}</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/')}>Back to landing</button>
        </div>

        <p className="mb-5 text-sm opacity-75">{step.description}</p>

        {step.type === 'multi-select' && (
          <div className="grid gap-3 md:grid-cols-2">
            {step.options.map((option) => {
              const active = (survey[step.key] || []).includes(option);
              return (
                <button
                  key={option}
                  className={`btn justify-start ${active ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => onToggleOption(step.key, option)}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}

        {step.type === 'select' && (
          <div className="grid gap-3 md:grid-cols-2">
            {step.options.map((option) => (
              <button
                key={option}
                className={`btn ${survey[step.key] === option ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => onFieldChange(step.key, option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {step.type === 'form' && (
          <div className="grid gap-4 md:grid-cols-2">
            {step.fields.map((field) => (
              <label key={field.key} className="form-control">
                <span className="label-text mb-2">{field.label}</span>
                <input
                  type={field.type}
                  className="input input-bordered"
                  value={survey[field.key] ?? ''}
                  onChange={(event) => onFieldChange(field.key, field.type === 'number' ? Number(event.target.value) : event.target.value)}
                />
              </label>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button className="btn btn-ghost w-full sm:w-auto" onClick={previousStep} disabled={stepIndex === 0}>Previous</button>

          <div className="flex flex-col gap-3 sm:flex-row">
            {stepIndex < steps.length - 1 ? (
              <button className="btn btn-primary w-full sm:w-auto" onClick={nextStep}>Next</button>
            ) : (
              <button className="btn btn-success w-full sm:w-auto" onClick={onFinishSurvey}>Finish survey</button>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-base-200 p-4 text-sm">
          <p className="font-semibold">Mock profile preview</p>
          <p className="mt-2">{summaryText}</p>
        </div>
      </div>
    </div>
  );
}
