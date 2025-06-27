import React, { useState } from 'react';
import { DollarSign, Calculator, TrendingUp, AlertCircle, Scale, Users } from 'lucide-react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';

interface FeeEstimate {
  category: string;
  lowEstimate: number;
  averageEstimate: number;
  highEstimate: number;
  description: string;
}

interface CaseInputs {
  caseType: 'uncontested' | 'contested' | 'high-conflict';
  hasChildren: boolean;
  hasAssets: boolean;
  hasBusinesses: boolean;
  needsValuation: boolean;
  county: string;
  estimatedDuration: '3-6' | '6-12' | '12-24' | '24+';
}

const LegalFeeEstimator: React.FC = () => {
  const [caseInputs, setCaseInputs] = useLocalStorageState<CaseInputs>('legal-fee-inputs', {
    caseType: 'contested',
    hasChildren: false,
    hasAssets: false,
    hasBusinesses: false,
    needsValuation: false,
    county: 'hamilton',
    estimatedDuration: '6-12'
  });

  const [customHourlyRate, setCustomHourlyRate] = useState<number>(350);

  const ohioCountyRates = {
    hamilton: { low: 275, average: 350, high: 500 },
    franklin: { low: 300, average: 375, high: 550 },
    cuyahoga: { low: 325, average: 400, high: 600 },
    montgomery: { low: 250, average: 325, high: 450 },
    summit: { low: 275, average: 350, high: 475 },
    butler: { low: 225, average: 300, high: 425 },
    lucas: { low: 250, average: 325, high: 450 },
    stark: { low: 200, average: 275, high: 400 },
    other: { low: 200, average: 300, high: 500 }
  };

  const calculateFeeEstimate = (): FeeEstimate[] => {
    const countyRates = ohioCountyRates[caseInputs.county as keyof typeof ohioCountyRates] || ohioCountyRates.other;
    const baseEstimates: FeeEstimate[] = [];

    // Attorney Fees
    let attorneyHours = { low: 15, average: 30, high: 60 };
    
    if (caseInputs.caseType === 'uncontested') {
      attorneyHours = { low: 8, average: 15, high: 25 };
    } else if (caseInputs.caseType === 'high-conflict') {
      attorneyHours = { low: 40, average: 80, high: 150 };
    }

    // Adjust for complexity factors
    if (caseInputs.hasChildren) {
      attorneyHours.low += 5;
      attorneyHours.average += 15;
      attorneyHours.high += 30;
    }

    if (caseInputs.hasAssets) {
      attorneyHours.low += 5;
      attorneyHours.average += 10;
      attorneyHours.high += 20;
    }

    if (caseInputs.hasBusinesses) {
      attorneyHours.low += 10;
      attorneyHours.average += 25;
      attorneyHours.high += 50;
    }

    baseEstimates.push({
      category: 'Attorney Fees',
      lowEstimate: attorneyHours.low * countyRates.low,
      averageEstimate: attorneyHours.average * countyRates.average,
      highEstimate: attorneyHours.high * countyRates.high,
      description: `${attorneyHours.low}-${attorneyHours.high} hours at $${countyRates.low}-${countyRates.high}/hour`
    });

    // Court Filing Fees
    const filingFees = {
      hamilton: 350, franklin: 375, cuyahoga: 365, montgomery: 360,
      summit: 340, butler: 325, lucas: 355, stark: 330, other: 350
    };
    
    baseEstimates.push({
      category: 'Court Filing Fees',
      lowEstimate: filingFees[caseInputs.county as keyof typeof filingFees] || 350,
      averageEstimate: filingFees[caseInputs.county as keyof typeof filingFees] || 350,
      highEstimate: filingFees[caseInputs.county as keyof typeof filingFees] || 350,
      description: 'Ohio court filing and service fees'
    });

    // Expert Fees (if applicable)
    if (caseInputs.needsValuation || caseInputs.hasBusinesses) {
      baseEstimates.push({
        category: 'Expert Witness/Valuation',
        lowEstimate: caseInputs.hasBusinesses ? 3000 : 1500,
        averageEstimate: caseInputs.hasBusinesses ? 7500 : 3000,
        highEstimate: caseInputs.hasBusinesses ? 15000 : 6000,
        description: caseInputs.hasBusinesses ? 'Business valuation expert' : 'Asset appraisal'
      });
    }

    // Mediation Fees
    if (caseInputs.caseType !== 'uncontested') {
      baseEstimates.push({
        category: 'Mediation',
        lowEstimate: 800,
        averageEstimate: 1500,
        highEstimate: 3000,
        description: '4-8 hours at $200-375/hour (split between parties)'
      });
    }

    // Miscellaneous Costs
    baseEstimates.push({
      category: 'Miscellaneous Costs',
      lowEstimate: 200,
      averageEstimate: 500,
      highEstimate: 1200,
      description: 'Process server, copies, postage, parking, etc.'
    });

    return baseEstimates;
  };

  const feeEstimates = calculateFeeEstimate();
  const totalLow = feeEstimates.reduce((sum, est) => sum + est.lowEstimate, 0);
  const totalAverage = feeEstimates.reduce((sum, est) => sum + est.averageEstimate, 0);
  const totalHigh = feeEstimates.reduce((sum, est) => sum + est.highEstimate, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-light text-sage-900">Legal Fee Estimator</h1>
        <p className="text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed">
          Calculate estimated legal costs based on your case complexity and Ohio county rates
        </p>
      </div>

      {/* Case Information Input */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-blue-900 mb-6 flex items-center gap-2">
          <Calculator className="text-blue-700" size={28} />
          Case Information
        </h2>
        <p className="text-blue-800 mb-6">
          Provide details about your case to get a personalized cost estimate
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">Case Type</label>
              <select
                value={caseInputs.caseType}
                onChange={(e) => setCaseInputs({...caseInputs, caseType: e.target.value as any})}
                className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500"
              >
                <option value="uncontested">Uncontested (Full Agreement)</option>
                <option value="contested">Contested (Some Disagreements)</option>
                <option value="high-conflict">High-Conflict (Major Disputes)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">Ohio County</label>
              <select
                value={caseInputs.county}
                onChange={(e) => setCaseInputs({...caseInputs, county: e.target.value})}
                className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500"
              >
                <option value="hamilton">Hamilton (Cincinnati)</option>
                <option value="franklin">Franklin (Columbus)</option>
                <option value="cuyahoga">Cuyahoga (Cleveland)</option>
                <option value="montgomery">Montgomery (Dayton)</option>
                <option value="summit">Summit (Akron)</option>
                <option value="butler">Butler</option>
                <option value="lucas">Lucas (Toledo)</option>
                <option value="stark">Stark (Canton)</option>
                <option value="other">Other Ohio County</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">Estimated Duration</label>
              <select
                value={caseInputs.estimatedDuration}
                onChange={(e) => setCaseInputs({...caseInputs, estimatedDuration: e.target.value as any})}
                className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500"
              >
                <option value="3-6">3-6 months</option>
                <option value="6-12">6-12 months</option>
                <option value="12-24">12-24 months</option>
                <option value="24+">24+ months</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-3">Case Complexity Factors</label>
              <div className="space-y-2">
                {[
                  { key: 'hasChildren', label: 'Children involved (custody/support)' },
                  { key: 'hasAssets', label: 'Significant assets to divide' },
                  { key: 'hasBusinesses', label: 'Business ownership' },
                  { key: 'needsValuation', label: 'Property/asset valuation needed' }
                ].map(factor => (
                  <label key={factor.key} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-blue-25 rounded">
                    <input
                      type="checkbox"
                      checked={caseInputs[factor.key as keyof CaseInputs] as boolean}
                      onChange={(e) => setCaseInputs({...caseInputs, [factor.key]: e.target.checked})}
                      className="text-blue-600"
                    />
                    <span className="text-blue-800">{factor.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
        <div className="bg-green-50 px-6 py-4 border-b border-neutral-200">
          <h2 className="text-2xl font-semibold text-green-900 flex items-center gap-2">
            <DollarSign className="text-green-700" size={28} />
            Estimated Cost Breakdown
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Educational Estimate Header */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Educational Cost Estimates</h3>
            <p className="text-blue-800 text-sm">
              These estimates are for planning purposes only. Actual legal costs vary significantly based on case complexity, attorney experience, and unforeseen complications. Always get detailed fee agreements from potential attorneys.
            </p>
          </div>
          
          {/* Total Summary */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm font-medium text-green-800">Low Estimate</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(totalLow)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">Average Estimate</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(totalAverage)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">High Estimate</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(totalHigh)}</p>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-800">Detailed Cost Breakdown</h3>
            
            {feeEstimates.map((estimate, index) => (
              <div key={index} className="border border-neutral-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-neutral-800">{estimate.category}</h4>
                  <div className="text-right">
                    <span className="text-sm text-neutral-600">
                      {formatCurrency(estimate.lowEstimate)} - {formatCurrency(estimate.highEstimate)}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-neutral-600">{estimate.description}</p>
                
                <div className="mt-2 bg-neutral-100 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(estimate.averageEstimate / totalHigh) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Cost-Saving Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
              <TrendingUp className="text-amber-700" size={20} />
              Cost-Saving Strategies
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-medium text-amber-800 mb-2">Before Hiring an Attorney</h4>
                <ul className="space-y-1 text-amber-700">
                  <li>• Organize all financial documents</li>
                  <li>• Create detailed asset and debt lists</li>
                  <li>• Try mediation for uncontested issues</li>
                  <li>• Consider collaborative divorce if appropriate</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-amber-800 mb-2">During the Process</h4>
                <ul className="space-y-1 text-amber-700">
                  <li>• Be organized and prepared for meetings</li>
                  <li>• Communicate efficiently (email vs. phone)</li>
                  <li>• Avoid emotional decisions that increase conflict</li>
                  <li>• Use paralegal services for routine tasks</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-neutral-500 mt-1 flex-shrink-0" size={20} />
              <div className="text-sm text-neutral-700">
                <p className="font-medium mb-2">Important Disclaimers</p>
                <ul className="space-y-1">
                  <li>• These are estimates only - actual costs may vary significantly</li>
                  <li>• Hourly rates vary widely based on attorney experience and reputation</li>
                  <li>• Unexpected complications can increase costs substantially</li>
                  <li>• Consider getting detailed fee agreements from potential attorneys</li>
                  <li>• Ask about payment plans and retainer requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalFeeEstimator;
