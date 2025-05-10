
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  return new Date(date).toLocaleDateString(undefined, mergedOptions);
};


export const formatTemperature = (temp, unit = 'C') => {
  const temperature = Math.round(temp);
  return `${temperature}°${unit}`;
};


export const validateDateRange = (fromDate, toDate) => {
  if (!fromDate || !toDate) return true;
  
  const from = new Date(fromDate);
  const to = new Date(toDate);
  
  // Check if from date is before to date
  if (from > to) return false;
  
  // Check if the date range is within 30 days
  const diffTime = Math.abs(to - from);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays <= 30;
};