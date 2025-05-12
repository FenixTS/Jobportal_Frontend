// Convert monthly salary to LPA format
export const convertToLPA = (monthlySalary) => {
  if (!monthlySalary || isNaN(monthlySalary)) {
    return '0 LPA';
  }
  
  // Convert monthly to annual (multiply by 12)
  const annualSalary = monthlySalary * 12;
  // Convert to lakhs (divide by 100000)
  const lpa = annualSalary / 100000;
  // Round to 2 decimal places and add LPA suffix
  return `${lpa.toFixed(2)} LPA`;
};

// Convert LPA to monthly salary
export const convertToMonthly = (lpaString) => {
  if (!lpaString) return 0;
  
  // Remove 'LPA' and convert to number
  const lpa = parseFloat(lpaString.replace('LPA', ''));
  // Convert to monthly (multiply by 100000 and divide by 12)
  return (lpa * 100000) / 12;
};

// Format salary range for display
export const formatSalaryRange = (minSalary, maxSalary) => {
  if (!minSalary || !maxSalary) return '0 LPA';
  
  const minLPA = convertToLPA(minSalary);
  const maxLPA = convertToLPA(maxSalary);
  
  return `${minLPA} - ${maxLPA}`;
}; 