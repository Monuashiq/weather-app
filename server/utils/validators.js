
const validateDateRange = (fromDate, toDate) => {
  if (!fromDate || !toDate) {
    return { isValid: true };
  }

  const from = new Date(fromDate);
  const to = new Date(toDate);
  
  // Check if dates are valid
  if (isNaN(from.getTime()) || isNaN(to.getTime())) {
    return {
      isValid: false,
      message: 'Invalid date format'
    };
  }
  
  // Check if from date is before to date
  if (from > to) {
    return {
      isValid: false,
      message: 'From date must be before To date'
    };
  }
  
  // Check if the date range is within 30 days
  const diffTime = Math.abs(to - from);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 30) {
    return {
      isValid: false,
      message: 'Date range cannot exceed 30 days'
    };
  }
  
  return { isValid: true };
};



const validateLocation = (location) => {
  if (!location) {
    return { isValid: true };
  }
  
  const allowedLocations = ['Delhi', 'Moscow', 'Paris', 'New York', 'Sydney', 'Riyadh'];
  
  if (!allowedLocations.includes(location)) {
    return {
      isValid: false,
      message: 'Invalid location. Please select one of the available locations.'
    };
  }
  
  return { isValid: true };
};

module.exports = {
  validateDateRange,
  validateLocation
};

