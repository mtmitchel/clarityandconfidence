/**
 * Ohio Spousal Support (Alimony) Calculator
 * 
 * IMPORTANT LEGAL DISCLAIMER:
 * This is a simplified estimation tool for educational purposes only. Ohio law (O.R.C. 3105.18) does
 * not use a rigid formula for spousal support. Courts consider 14 different factors, and the final
 * award can vary significantly based on the specific circumstances of the case and the discretion of the judge.
 * 
 * This calculator uses a common but unofficial method sometimes used as a starting point, but it is NOT a substitute
 * for legal advice from a qualified Ohio family law attorney.
 * 
 * Factors NOT fully included in this simplified calculation:
 * - Earning abilities of the parties
 * - Ages and physical, mental, and emotional conditions
 * - Retirement benefits
 * - Duration of the marriage (used for duration estimate only)
 * - Standard of living established during the marriage
 * - Assets and liabilities of the parties
 * - Contribution of each party to the education or earning ability of the other
 * - Tax consequences
 * - And many other statutory factors.
 */

export interface SpousalSupportInputs {
  marriageDurationYears: number;
  payorGrossAnnualIncome: number;
  payeeGrossAnnualIncome: number;
}

export interface SpousalSupportResult {
  isEligible: boolean;
  estimatedAnnualSupport: number;
  estimatedMonthlySupport: number;
  estimatedDurationYears: { min: number; max: number; };
  explanation: string;
  warnings: string[];
}

// This is a simplified model and not a legal standard.
const DURATION_TIERS = [
  { maxYears: 5, minMultiplier: 0, maxMultiplier: 0.3 },      // Short-term marriage
  { maxYears: 10, minMultiplier: 0.2, maxMultiplier: 0.4 },   // Medium-term
  { maxYears: 20, minMultiplier: 0.3, maxMultiplier: 0.5 },   // Long-term
  { maxYears: Infinity, minMultiplier: 0.4, maxMultiplier: 1 } // Very long-term (potential for indefinite)
];

// A common (but not official) calculation method sometimes used as a starting point.
const INCOME_DIFFERENTIAL_FACTOR = 0.30; // 30% of payor's income
const PAYEE_INCOME_OFFSET_FACTOR = 0.20; // minus 20% of payee's income

export function calculateSpousalSupport(inputs: SpousalSupportInputs): SpousalSupportResult {
  const { marriageDurationYears, payorGrossAnnualIncome, payeeGrossAnnualIncome } = inputs;
  const warnings: string[] = [
    "This is a preliminary estimate only. The court has wide discretion.",
    "Tax implications are not included and can significantly impact the net result.",
    "Consult an attorney and a Certified Divorce Financial Analyst (CDFA) for an accurate assessment."
  ];
  
  if (payorGrossAnnualIncome <= payeeGrossAnnualIncome) {
    return {
      isEligible: false,
      estimatedAnnualSupport: 0,
      estimatedMonthlySupport: 0,
      estimatedDurationYears: { min: 0, max: 0 },
      explanation: "Spousal support is unlikely as the higher-earning spouse cannot be the recipient.",
      warnings: []
    };
  }

  // 1. Calculate estimated annual support amount
  const payorContribution = payorGrossAnnualIncome * INCOME_DIFFERENTIAL_FACTOR;
  const payeeOffset = payeeGrossAnnualIncome * PAYEE_INCOME_OFFSET_FACTOR;
  const estimatedAnnualSupport = Math.max(0, payorContribution - payeeOffset);
  const estimatedMonthlySupport = Math.round(estimatedAnnualSupport / 12);

  // 2. Estimate duration
  const tier = DURATION_TIERS.find(t => marriageDurationYears <= t.maxYears)!;
  const minDuration = Math.round(marriageDurationYears * tier.minMultiplier);
  const maxDuration = Math.round(marriageDurationYears * tier.maxMultiplier);

  let explanation = `Based on a ${marriageDurationYears}-year marriage, a common starting point for support duration is between ${minDuration} and ${maxDuration} years.`;
  if (marriageDurationYears > 25) {
      explanation += " For very long-term marriages, the court may consider indefinite support."
      warnings.push("Due to the long duration of the marriage, the court may award support for an indefinite period.")
  }

  return {
    isEligible: true,
    estimatedAnnualSupport,
    estimatedMonthlySupport,
    estimatedDurationYears: { min: minDuration, max: maxDuration },
    explanation,
    warnings
  };
}
