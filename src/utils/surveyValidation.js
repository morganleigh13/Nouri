export const hasValue = (value) => {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return Boolean(value);
};

export const sanitizeNumericInput = (value) => {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? String(Math.trunc(value)) : '';
  }

  return String(value).replace(/\D/g, '');
};

export const sanitizeAlphaInput = (value) => {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'number') {
    return '';
  }

  return String(value)
    .replace(/[^A-Za-z\s'-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export const isValidAlphaInput = (value) => {
  if (!hasValue(value)) {
    return false;
  }

  return /^[A-Za-z][A-Za-z\s'-]*$/.test(String(value).trim());
};

export const isValidNumericInput = (value) => {
  if (!hasValue(value)) {
    return false;
  }

  return /^\d+$/.test(String(value).trim());
};

export const sanitizeFieldValue = (field, value) => {
  if (field.type === 'number') {
    return sanitizeNumericInput(value);
  }

  if (field.key === 'name' || field.key === 'gender' || field.key === 'stressLevel') {
    return sanitizeAlphaInput(value);
  }

  if (typeof value === 'string') {
    return value.trim();
  }

  return value ?? '';
};

export const isStepComplete = (step, survey) => {
  if (step.type === 'select') {
    return hasValue(survey[step.key]);
  }

  if (step.type === 'multi-select') {
    const currentValue = survey[step.key] || [];
    return Array.isArray(currentValue) ? currentValue.length > 0 : hasValue(currentValue);
  }

  if (step.type === 'form') {
    return step.fields.every((field) => {
      const value = survey[field.key];

      if (field.key === 'height') {
        return isValidNumericInput(value) && Number(value) >= 36;
      }

      if (field.key === 'weight') {
        return isValidNumericInput(value) && Number(value) >= 65;
      }

      if (field.key === 'age' || field.key === 'sleepHours') {
        return isValidNumericInput(value) && Number(value) > 0;
      }

      if (field.key === 'name' || field.key === 'gender' || field.key === 'stressLevel') {
        return isValidAlphaInput(value);
      }

      return hasValue(value);
    });
  }

  return true;
};
