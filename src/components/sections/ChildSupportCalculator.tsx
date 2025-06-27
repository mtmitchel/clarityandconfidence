import React, { useState, useMemo } from 'react';
import { Calculator, ExternalLink, Info, AlertTriangle, User, Users, HandCoins, GraduationCap, Heart, School } from 'lucide-react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { calculateOhioChildSupport, OhioChildSupportInputs, OhioChildSupportResult } from '../../lib/ohioChildSupport';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';

// Component-specific state that is slightly different from the library function's input
interface CalculatorState {
  parent1GrossAnnualIncome: number;
  parent2GrossAnnualIncome: number;
  numberOfChildren: number;
  overnightsWithParent1: number; // User only sets their overnights
  healthInsuranceCost: number; // Annual cost
  childCareCost: number; // Annual cost
  educationalExpenses: number; // Annual cost
}

const ChildSupportCalculator: React.FC = () => {
  const [inputs, setInputs] = useLocalStorageState<CalculatorState>('child-support-calculator-inputs', {
    parent1GrossAnnualIncome: 50000,
    parent2GrossAnnualIncome: 60000,
    numberOfChildren: 1,
    overnightsWithParent1: 182, // Default to near 50/50
    healthInsuranceCost: 0,
    childCareCost: 0,
    educationalExpenses: 0,
  });

  const handleInputChange = (field: keyof CalculatorState, value: string | number) => {
    setInputs(prev => ({ ...prev, [field]: Number(value) }));
  };

  const handleSelectChange = (field: keyof CalculatorState, value: string) => {
    setInputs(prev => ({ ...prev, [field]: Number(value) }));
  };

  // This useMemo hook calculates results whenever inputs change.
  const calculationResult = useMemo((): OhioChildSupportResult | null => {
    const { parent1GrossAnnualIncome, parent2GrossAnnualIncome, numberOfChildren, overnightsWithParent1 } = inputs;

    if (!parent1GrossAnnualIncome || !parent2GrossAnnualIncome || !numberOfChildren) {
      return null;
    }

    const overnightsWithParent2 = 365 - overnightsWithParent1;

    const calculatorInputs: OhioChildSupportInputs = {
      ...inputs,
      overnightsWithParent2,
    };

    try {
      return calculateOhioChildSupport(calculatorInputs);
    } catch (error) {
      console.error("Calculation Error:", error);
      return null;
    }
  }, [inputs]);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-light text-sage-900">Ohio child support estimator</h1>
        <p className="text-lg sm:text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
          Get a high-level estimate of monthly child support based on Ohio's guidelines. For educational purposes only.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-blue-600 pt-2">
          <ExternalLink size={16} />
          <a 
            href="https://jfs.ohio.gov/ocs/childSupportGuidelineCalculator.stm" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline font-medium"
          >
            Use the official Ohio JFS Calculator for court filings
          </a>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Side: Inputs */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm">
          
          {/* Section 1: Income */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-neutral-800 flex items-center gap-3"><HandCoins className="text-green-600"/>Income</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="p1-income">Your Annual Gross Income</Label>
                <Input id="p1-income" type="number" value={inputs.parent1GrossAnnualIncome || ''} onChange={e => handleInputChange('parent1GrossAnnualIncome', e.target.value)} placeholder="e.g., 50000" />
                <p className="text-xs text-neutral-500">Your income before taxes or deductions.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="p2-income">Other Parent's Annual Gross Income</Label>
                <Input id="p2-income" type="number" value={inputs.parent2GrossAnnualIncome || ''} onChange={e => handleInputChange('parent2GrossAnnualIncome', e.target.value)} placeholder="e.g., 60000" />
                 <p className="text-xs text-neutral-500">Estimate if you are unsure.</p>
              </div>
            </div>
          </div>

          {/* Section 2: Children & Parenting */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-neutral-800 flex items-center gap-3"><Users className="text-blue-600"/>Children & Parenting</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="num-children">Number of Children</Label>
                <Select value={String(inputs.numberOfChildren)} onValueChange={value => handleSelectChange('numberOfChildren', value)}>
                  <SelectTrigger id="num-children"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map(n => <SelectItem key={n} value={String(n)}>{n} Child{n > 1 ? 'ren' : ''}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="p1-overnights">Your Overnight Stays Per Year</Label>
                <Input id="p1-overnights" type="number" value={inputs.overnightsWithParent1 || ''} onChange={e => handleInputChange('overnightsWithParent1', e.target.value)} max={365} />
                <p className="text-xs text-neutral-500">A 50/50 plan is ~182 overnights. The other parent is assumed to have the rest (365 - your nights).</p>
              </div>
            </div>
          </div>

          {/* Section 3: Additional Costs */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-neutral-800 flex items-center gap-3"><GraduationCap className="text-purple-600"/>Annual Shared Costs (Optional)</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="health-cost">Health Insurance</Label>
                <Input id="health-cost" type="number" value={inputs.healthInsuranceCost || ''} onChange={e => handleInputChange('healthInsuranceCost', e.target.value)} placeholder="e.g., 3000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="childcare-cost">Work-Related Childcare</Label>
                <Input id="childcare-cost" type="number" value={inputs.childCareCost || ''} onChange={e => handleInputChange('childCareCost', e.target.value)} placeholder="e.g., 5000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edu-cost">Extraordinary Expenses</Label>
                <Input id="edu-cost" type="number" value={inputs.educationalExpenses || ''} onChange={e => handleInputChange('educationalExpenses', e.target.value)} placeholder="e.g., 1000" />
              </div>
            </div>
             <p className="text-xs text-neutral-500">Include total annual costs for things like private school tuition or special needs expenses.</p>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl p-6 text-center sticky top-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Estimated Monthly Child Support</h3>
            {calculationResult ? (
              <>
                <div className="text-5xl font-bold text-blue-800 my-4">
                  ${Math.round(calculationResult.totalSupport).toLocaleString()}
                </div>
                <p className="font-semibold text-blue-800">
                  Paid by {calculationResult.payingParent === 'parent1' ? 'the other parent' : 'you'} to {calculationResult.payingParent === 'parent1' ? 'you' : 'the other parent'}.
                </p>
                <details className="text-xs text-blue-700 mt-4 text-left bg-blue-100 p-3 rounded-lg">
                  <summary className="cursor-pointer font-medium">Show formula breakdown</summary>
                  <p className="mt-2 whitespace-pre-wrap break-words">{calculationResult.formula}</p>
                </details>
              </>
            ) : (
              <div className="text-center py-10">
                <p className="text-neutral-600">Enter incomes to see an estimate.</p>
              </div>
            )}
          </div>

          {calculationResult && calculationResult.warnings.length > 0 && (
            <Alert variant="destructive" className="bg-amber-50 border-amber-200 text-amber-900">
              <AlertTriangle className="h-4 w-4 !text-amber-600" />
              <AlertTitle className="font-semibold">Important Considerations</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 space-y-1 mt-2 text-amber-800">
                  {calculationResult.warnings.map((warning, i) => <li key={i}>{warning}</li>)}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <Alert className="bg-neutral-50 border-neutral-200">
            <Info className="h-4 w-4" />
            <AlertTitle className="font-semibold">This is an Educational Estimate</AlertTitle>
            <AlertDescription>
              Actual child support orders can be affected by many factors not included in this simplified tool. Always consult a qualified Ohio attorney for legal advice.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default ChildSupportCalculator;
