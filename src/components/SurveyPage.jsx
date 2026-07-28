import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { steps } from '../data/surveySteps';
import { hasValue, isStepComplete, sanitizeFieldValue } from '../utils/surveyValidation';

export default function SurveyPage({ survey, summaryText, onToggleOption, onFieldChange, onFinishSurvey }) {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];

  const getValidationMessage = () => (
    step?.type === 'form'
      ? 'Please complete every personal detail before continuing.'
      : 'Please select at least one option before continuing.'
  );

  useEffect(() => {
    if (step?.key === 'bio') {
      if (!hasValue(survey.weight)) {
        onFieldChange('weight', '140');
      }

      if (!hasValue(survey.height)) {
        onFieldChange('height', '60');
      }
    }
  }, [step?.key, survey.height, survey.weight, onFieldChange]);

  const handleAdvance = () => {
    if (!isStepComplete(step, survey)) {
      toast.error(getValidationMessage());
      return;
    }

    if (stepIndex < steps.length - 1) {
      setStepIndex((index) => Math.min(index + 1, steps.length - 1));
      return;
    }

    onFinishSurvey();
  };

  const previousStep = () => setStepIndex((index) => Math.max(index - 1, 0));

  const handleMultiSelectOption = (option) => {
    if (step.key === 'allergies' || step.key === 'restrictions') {
      const current = survey[step.key] || [];

      if (option === 'None') {
        const next = current.includes('None') ? [] : ['None'];
        onFieldChange(step.key, next);
        return;
      }

      const withoutNone = current.filter((item) => item !== 'None');
      const next = withoutNone.includes(option)
        ? withoutNone.filter((item) => item !== option)
        : [...withoutNone, option];

      onFieldChange(step.key, next);
      return;
    }

    onToggleOption(step.key, option);
  };

  const handleFormChange = (field, event) => {
    const sanitized = sanitizeFieldValue(field, event.target.value);
    onFieldChange(field.key, sanitized);
  };

  const handleFieldBlur = (field) => {
    const rawValue = survey[field.key];

    if (field.key === 'height' && hasValue(rawValue) && Number(rawValue) < 36) {
      onFieldChange(field.key, '36');
    }

    if (field.key === 'weight' && hasValue(rawValue) && Number(rawValue) < 65) {
      onFieldChange(field.key, '65');
    }
  };

  const canAdvance = isStepComplete(step, survey);

  return (
    <div className="relative min-h-screen overflow-hidden bg-base-200 px-4 pb-4 pt-20 text-base-content sm:p-6 lg:p-8">
      <div className="survey-vines" aria-hidden="true" />
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-4xl items-center justify-center">
        <Toaster position="top-center" toastOptions={{ duration: 3000, style: { background: '#1f2937', color: '#fff' } }} />
        <div className="w-full rounded-box bg-base-100 p-5 shadow-xl sm:p-6">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Step {stepIndex + 1} of {steps.length}</p>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl mt-1 -mb-4">{step.title}</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/')}>Back to landing</button>
        </div>

        <p className="mt-0 mb-3 text-sm opacity-75">{step.description}</p>

        {step.type === 'multi-select' && (
          <div className="grid gap-3 md:grid-cols-2">
            {step.options.map((option) => {
              const active = (survey[step.key] || []).includes(option);
              return (
                <button
                  key={option}
                  className={`btn justify-start ${active ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handleMultiSelectOption(option)}
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
              <label key={field.key} className="form-control gap-3 sm:gap-4">
                <span className="label-text text-primary font-semibold">{field.label}</span>
                <input
                  type={field.type}
                  className="input input-bordered"
                  min={field.key === 'height' ? 36 : field.key === 'weight' ? 65 : undefined}
                  step="1"
                  inputMode="numeric"
                  value={survey[field.key] ?? ''}
                  onChange={(event) => handleFormChange(field, event)}
                  onBlur={() => handleFieldBlur(field)}
                />
              </label>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button className="btn btn-ghost w-full sm:w-auto" onClick={previousStep} disabled={stepIndex === 0}>Previous</button>

          <div className="flex flex-col gap-3 sm:flex-row">
            {stepIndex < steps.length - 1 ? (
              <button className="btn btn-primary w-full sm:w-auto" onClick={handleAdvance}>
                Next
              </button>
            ) : (
              <button className="btn btn-success w-full sm:w-auto" onClick={handleAdvance}>
                Finish survey
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-base-200 p-4 text-sm">
          <p className="font-semibold">Profile preview</p>
          <p className="mt-2">{summaryText}</p>
          {!canAdvance && (
            <p className="mt-3 text-sm font-medium text-warning">
              {step.type === 'form'
                ? 'Please complete every personal detail before continuing.'
                : 'Please select at least one option before continuing.'}
            </p>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
