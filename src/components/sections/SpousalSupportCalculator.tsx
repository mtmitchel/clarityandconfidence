import React, { useState, useMemo } from 'react';
import { calculateSpousalSupport, SpousalSupportInputs, SpousalSupportResult } from '../../data/spousalSupport';
import { Info, Calculator, DollarSign, AlertTriangle, Calendar, HandCoins } from 'lucide-react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const SpousalSupportCalculator: React.FC = () => {
  const [inputs, setInputs] = useLocalStorageState<SpousalSupportInputs>('spousal-support-inputs', {
    marriageDurationYears: 10,
    payorGrossAnnualIncome: 100000,
    payeeGrossAnnualIncome: 40000,
  });

  const handleInputChange = (field: keyof SpousalSupportInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };

  const result = useMemo((): SpousalSupportResult | null => {
    if (inputs.marriageDurationYears <= 0 || inputs.payorGrossAnnualIncome < 0 || inputs.payeeGrossAnnualIncome < 0) {
      return null;
    }
    return calculateSpousalSupport(inputs);
  }, [inputs]);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-light text-sage-900">Spousal Support Estimator</h1>
        <p className="text-lg sm:text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
          Understand potential spousal support outcomes with this educational tool based on common Ohio calculation methods.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* Left Side: Inputs */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm">
          <h2 className="text-xl font-semibold text-neutral-800">Enter Your Information</h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="duration" className="flex items-center gap-2"><Calendar className="text-blue-600" size={18}/>Marriage Duration (in years)</Label>
              <Input id="duration" type="number" value={inputs.marriageDurationYears} onChange={e => handleInputChange('marriageDurationYears', e.target.value)} placeholder="e.g., 10" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="payor-income" className="flex items-center gap-2"><HandCoins className="text-green-600" size={18}/>Higher Earner's Gross Annual Income</Label>
              <Input id="payor-income" type="number" value={inputs.payorGrossAnnualIncome} onChange={e => handleInputChange('payorGrossAnnualIncome', e.target.value)} placeholder="e.g., 100000" />
              <p className="text-xs text-neutral-500">Enter the income of the person likely to pay support.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payee-income" className="flex items-center gap-2"><HandCoins className="text-green-600" size={18}/>Lower Earner's Gross Annual Income</Label>
              <Input id="payee-income" type="number" value={inputs.payeeGrossAnnualIncome} onChange={e => handleInputChange('payeeGrossAnnualIncome', e.target.value)} placeholder="e.g., 40000" />
              <p className="text-xs text-neutral-500">Enter the income of the person likely to receive support.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-sage-50 border-2 border-dashed border-sage-200 rounded-2xl p-6 sticky top-8">
            <h3 className="text-xl font-semibold text-sage-900 mb-4 text-center">Estimated Results</h3>
            {result && result.isEligible ? (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-green-700">Monthly Support Estimate</p>
                  <p className="text-4xl sm:text-5xl font-bold text-green-800 py-2">
                    ${result.estimatedMonthlySupport.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-blue-700">Support Duration Estimate</p>
                  <p className="text-3xl sm:text-4xl font-bold text-blue-800 py-1">
                    {result.estimatedDurationYears.min} - {result.estimatedDurationYears.max} years
                  </p>
                </div>
                <details className="text-xs text-sage-700 mt-4 text-left bg-sage-100 p-3 rounded-lg">
                  <summary className="cursor-pointer font-medium">How is this calculated?</summary>
                  <p className="mt-2 whitespace-pre-wrap break-words text-sage-800">{result.explanation}</p>
                </details>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-neutral-600">{result?.explanation || 'Enter valid information to see an estimate.'}</p>
              </div>
            )}
          </div>

          {result && result.warnings && result.warnings.length > 0 && (
            <Alert variant="destructive" className="bg-amber-50 border-amber-200 text-amber-900">
              <AlertTriangle className="h-4 w-4 !text-amber-600" />
              <AlertTitle className="font-semibold">Important Considerations</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 space-y-1 mt-2 text-amber-800">
                  {result.warnings.map((warning, i) => <li key={i}>{warning}</li>)}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <Alert className="bg-neutral-50 border-neutral-200">
        <Info className="h-4 w-4" />
        <AlertTitle className="font-semibold">This is an Educational Estimate</AlertTitle>
        <AlertDescription>
          Ohio law (O.R.C. 3105.18) does not use a rigid formula. Courts consider 14 statutory factors, and the final award can vary significantly. This tool provides a common starting point for discussion, not a prediction or legal advice. Always consult a qualified Ohio attorney.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SpousalSupportCalculator;
