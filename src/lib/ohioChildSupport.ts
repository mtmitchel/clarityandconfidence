/**
 * Ohio Child Support Calculator
 * Based on Ohio Revised Code §3119.04 and JFS 07767 Basic Child Support Schedule (2024)
 * 
 * IMPORTANT LEGAL DISCLAIMER:
 * This is a simplified approximation for educational purposes only.
 * Actual Ohio child support calculations include many factors not included here:
 * - Deviations based on special circumstances
 * - Health insurance costs
 * - Day care costs
 * - Other children from different relationships
 * - Shared parenting adjustments
 * - Income withholding orders
 * 
 * ALWAYS consult with a qualified Ohio family law attorney for accurate calculations.
 */

export interface OhioChildSupportInputs {
  parent1GrossAnnualIncome: number;
  parent2GrossAnnualIncome: number;
  numberOfChildren: number;
  overnightsWithParent1: number; // Annual number of overnights
  overnightsWithParent2: number;
  healthInsuranceCost?: number;
  childCareCost?: number;
  educationalExpenses?: number; // Annual extraordinary educational expenses
}

export interface OhioChildSupportResult {
  basicSupport: number;
  totalSupport: number;
  payingParent: 'parent1' | 'parent2';
  formula: string;
  warnings: string[];
  isEstimate: boolean;
}

/**
 * Basic Child Support Schedule percentages based on Ohio JFS 07767
 * These are approximate percentages of combined gross income
 */
const OHIO_BASIC_SUPPORT_PERCENTAGES = {
  1: 0.142, // 14.2% for 1 child
  2: 0.206, // 20.6% for 2 children  
  3: 0.257, // 25.7% for 3 children
  4: 0.289, // 28.9% for 4 children
  5: 0.315, // 31.5% for 5 children
  6: 0.333  // 33.3% for 6+ children
};

export function calculateOhioChildSupport(inputs: OhioChildSupportInputs): OhioChildSupportResult {
  const warnings: string[] = [];
  
  // Input validation
  if (inputs.parent1GrossAnnualIncome <= 0 || inputs.parent2GrossAnnualIncome <= 0) {
    throw new Error('Both parent incomes must be greater than zero');
  }
  
  if (inputs.numberOfChildren < 1 || inputs.numberOfChildren > 10) {
    throw new Error('Number of children must be between 1 and 10');
  }
  
  if (inputs.overnightsWithParent1 + inputs.overnightsWithParent2 !== 365) {
    warnings.push('Overnight totals should equal 365. Please verify custody arrangement.');
  }
  
  // Calculate combined gross income
  const combinedGrossIncome = inputs.parent1GrossAnnualIncome + inputs.parent2GrossAnnualIncome;
  
  // Determine primary residential parent (parent with more overnights)
  const isParent1Residential = inputs.overnightsWithParent1 > inputs.overnightsWithParent2;
  const residentialParent = isParent1Residential ? 'parent1' : 'parent2';
  const nonResidentialParent = isParent1Residential ? 'parent2' : 'parent1';
  
  const nonResidentialIncome = isParent1Residential 
    ? inputs.parent2GrossAnnualIncome 
    : inputs.parent1GrossAnnualIncome;
  
  // Check for very low or very high incomes
  if (combinedGrossIncome < 16800) {
    warnings.push('Combined income is below typical Ohio guidelines minimum. Special considerations may apply.');
  }
  
  if (combinedGrossIncome > 300000) {
    warnings.push('Combined income exceeds typical guidelines maximum. Court may deviate from standard calculations.');
  }

  warnings.push('This calculator does not include all possible deviation factors a court may consider (e.g., special needs of a child, extraordinary travel costs for parenting time).');
  
  // Get base support percentage
  const childCount = Math.min(inputs.numberOfChildren, 6);
  const basePercentage = OHIO_BASIC_SUPPORT_PERCENTAGES[childCount as keyof typeof OHIO_BASIC_SUPPORT_PERCENTAGES];
  
  // Calculate basic annual support obligation
  const annualBasicObligation = combinedGrossIncome * basePercentage;
  
  // Determine each parent's share based on income percentage
  const nonResidentialIncomePercent = nonResidentialIncome / combinedGrossIncome;
  const basicSupportAnnual = annualBasicObligation * nonResidentialIncomePercent;
  
  // Convert to monthly
  const basicSupportMonthly = Math.round(basicSupportAnnual / 12);
  
  // Factor in shared parenting adjustment if applicable
  let adjustedSupport = basicSupportMonthly;
  const nonResidentialOvernights = isParent1Residential 
    ? inputs.overnightsWithParent2 
    : inputs.overnightsWithParent1;
    
  if (nonResidentialOvernights >= 90) {
    // Shared parenting adjustment (simplified)
    const overnightPercent = nonResidentialOvernights / 365;
    const adjustment = basicSupportMonthly * overnightPercent * 0.5; // Simplified shared parenting formula
    adjustedSupport = Math.round(basicSupportMonthly - adjustment);
    warnings.push('Shared parenting adjustment applied. Actual calculation may vary based on additional factors.');
  }
  
  // Add additional costs (simplified)
  let totalSupport = adjustedSupport;
  if (inputs.healthInsuranceCost) {
    totalSupport += Math.round((inputs.healthInsuranceCost * nonResidentialIncomePercent) / 12);
  }
  if (inputs.childCareCost) {
    totalSupport += Math.round((inputs.childCareCost * nonResidentialIncomePercent) / 12);
  }
  if (inputs.educationalExpenses) {
    totalSupport += Math.round((inputs.educationalExpenses * nonResidentialIncomePercent) / 12);
  }
  
  // Ensure minimum support
  if (totalSupport < 50 && nonResidentialIncome > 6000) {
    totalSupport = 50;
    warnings.push('Minimum support amount applied.');
  }
  
  const formula = `Combined Income: $${combinedGrossIncome.toLocaleString()}/year × ${(basePercentage * 100).toFixed(1)}% ÷ 12 months × ${(nonResidentialIncomePercent * 100).toFixed(1)}% = $${basicSupportMonthly}/month`;
  
  return {
    basicSupport: basicSupportMonthly,
    totalSupport: Math.max(0, totalSupport),
    payingParent: nonResidentialParent,
    formula,
    warnings,
    isEstimate: true
  };
}
