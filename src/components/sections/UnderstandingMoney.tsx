import React, { useState } from 'react';
import { Calculator, ExternalLink, Info, AlertTriangle, TrendingUp, DollarSign, PieChart, FileText, Phone, Shield, Plus } from 'lucide-react';
import { Asset, createDefaultAssets, calculateNetWorth, validateEquitableDistribution } from '../../data/assets';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';

interface ChildSupportInputs {
  yourIncome: number;
  otherParentIncome: number;
  numChildren: number;
  overnightStays: number;
  healthInsuranceCost: number;
  childcareCost: number;
  extraordinaryExpenses: number;
  yourEducation: string;
  otherParentEducation: string;
}

interface AssetInputs {
  homeValue: number;
  mortgageBalance: number;
  retirement401k: number;
  retirementIRA: number;
  savings: number;
  investments: number;
  debts: number;
  vehicles: number;
}

interface BudgetCategory {
  id: string;
  name: string;
  current: number;
  postDivorce: number;
  otherPartyEstimate: number;
}

interface SpousalSupportInputs {
  yourIncome: number;
  otherPartyIncome: number;
  marriageDuration: number;
  yourAge: number;
  spouseAge: number;
  hasChildren: boolean;
  yourEducation: string;
  spouseEducation: string;
  healthIssues: boolean;
}

interface TaxCalculation {
  filingStatus: 'single' | 'head-of-household' | 'married-filing-jointly' | 'married-filing-separately';
  income: number;
  deductions: number;
  childTaxCredit: number;
  estimatedTax: number;
  effectiveRate: number;
}

const UnderstandingMoney: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<'child-support' | 'asset-division' | 'budget' | 'spousal-support' | null>(null);
  const [childSupportData, setChildSupportData] = useLocalStorageState<ChildSupportInputs>('child-support-data', {
    yourIncome: 0,
    otherParentIncome: 0,
    numChildren: 1,
    overnightStays: 182,
    healthInsuranceCost: 0,
    childcareCost: 0,
    extraordinaryExpenses: 0,
    yourEducation: '',
    otherParentEducation: ''
  });

  const [assets, setAssets] = useLocalStorageState<Asset[]>('asset-division-data', createDefaultAssets());
  const [spouse1Name, setSpouse1Name] = useLocalStorageState<string>('spouse1-name', 'You');
  const [spouse2Name, setSpouse2Name] = useLocalStorageState<string>('spouse2-name', 'Other parent');
  
  const [budgetCategories, setBudgetCategories] = useLocalStorageState<BudgetCategory[]>('budget-categories', [
    { id: 'housing', name: 'Housing (rent/mortgage)', current: 0, postDivorce: 0, spouseEstimate: 0 },
    { id: 'utilities', name: 'Utilities', current: 0, postDivorce: 0, spouseEstimate: 0 },
    { id: 'food', name: 'Food & groceries', current: 0, postDivorce: 0, spouseEstimate: 0 },
    { id: 'childcare', name: 'Childcare', current: 0, postDivorce: 0, spouseEstimate: 0 },
    { id: 'healthcare', name: 'Healthcare', current: 0, postDivorce: 0, spouseEstimate: 0 },
    { id: 'transportation', name: 'Transportation', current: 0, postDivorce: 0, spouseEstimate: 0 },
    { id: 'insurance', name: 'Insurance', current: 0, postDivorce: 0, spouseEstimate: 0 },
    { id: 'other', name: 'Other expenses', current: 0, postDivorce: 0, spouseEstimate: 0 }
  ]);

  const updateAsset = (assetId: string, field: keyof Asset, value: any) => {
    setAssets(prev => prev.map(asset => 
      asset.id === assetId ? { ...asset, [field]: value } : asset
    ));
  };

  const addCustomAsset = () => {
    const newAsset: Asset = {
      id: `custom-${Date.now()}`,
      name: 'Custom Asset',
      value: 0,
      type: 'personal',
      propertyType: 'marital',
      assignedTo: 'unassigned'
    };
    setAssets(prev => [...prev, newAsset]);
  };

  const removeAsset = (assetId: string) => {
    setAssets(prev => prev.filter(asset => asset.id !== assetId));
  };

  const spouse1NetWorth = calculateNetWorth(assets, 'spouse1');
  const spouse2NetWorth = calculateNetWorth(assets, 'spouse2');
  const validation = validateEquitableDistribution(assets);

  const calculateChildSupport = () => {
    const { yourIncome, otherParentIncome, numChildren, overnightStays } = childSupportData;
    const totalIncome = yourIncome + otherParentIncome;
    const yourPercentage = yourIncome / totalIncome;
    
    // Simplified Ohio calculation (actual calculation is more complex)
    const basicSupport = totalIncome * 0.25 * numChildren * 0.01;
    const adjustedForParentingTime = basicSupport * (365 - overnightStays) / 365;
    const yourObligationPercentage = yourPercentage;
    
    return Math.max(0, adjustedForParentingTime * (1 - yourObligationPercentage));
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-light text-sage-900 leading-tight">Understanding your money</h1> {/* updated to sentence case */}
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            Interactive financial planning tools and authoritative resources for Ohio divorce proceedings
          </p>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-amber-600 mt-1 flex-shrink-0" size={24} />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-amber-900">Important financial disclaimer</h3>
              <p className="text-amber-800 leading-relaxed">
                These calculators provide estimates only and do not constitute financial or legal advice. 
                Ohio divorce law includes complex factors not captured in simplified calculations. 
                Always consult with certified professionals for precise calculations and personalized guidance.
              </p>
              <p className="text-sm text-amber-700 font-medium">
                Sources: Ohio Department of Job and Family Services, Institute for Divorce Financial Analysts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Calculators */}
      <div className="grid md:grid-cols-3 gap-6">
        <button
          onClick={() => setActiveCalculator('child-support')}
          className={`p-6 rounded-lg border-2 transition-all duration-200 text-left ${
            activeCalculator === 'child-support' 
              ? 'border-blue-300 bg-blue-50' 
              : 'border-slate-200 bg-white hover:border-blue-300'
          }`}
        >
          <Calculator className="text-blue-600 mb-4" size={32} />
          <h3 className="font-semibold text-slate-800 mb-2">Ohio child support calculator</h3> {/* updated to sentence case */}
          <p className="text-slate-600 text-sm">Estimate monthly child support obligations using Ohio guidelines</p>
        </button>

        <button
          onClick={() => setActiveCalculator('asset-division')}
          className={`p-6 rounded-lg border-2 transition-all duration-200 text-left ${
            activeCalculator === 'asset-division' 
              ? 'border-green-300 bg-green-50' 
              : 'border-slate-200 bg-white hover:border-green-300'
          }`}
        >
          <PieChart className="text-green-600 mb-4" size={32} />
          <h3 className="font-semibold text-slate-800 mb-2">Asset division estimator</h3> {/* updated to sentence case */}
          <p className="text-slate-600 text-sm">Model potential asset and debt division scenarios</p>
        </button>

        <button
          onClick={() => setActiveCalculator('budget')}
          className={`p-6 rounded-lg border-2 transition-all duration-200 text-left ${
            activeCalculator === 'budget' 
              ? 'border-purple-300 bg-purple-50' 
              : 'border-slate-200 bg-white hover:border-purple-300'
          }`}
        >
          <TrendingUp className="text-purple-600 mb-4" size={32} />
          <h3 className="font-semibold text-slate-800 mb-2">Post-divorce budget planner</h3> {/* updated to sentence case */}
          <p className="text-slate-600 text-sm">Plan your financial future as a single parent</p>
        </button>

        <button
          onClick={() => setActiveCalculator('spousal-support')}
          className={`p-6 rounded-lg border-2 transition-all duration-200 text-left ${
            activeCalculator === 'spousal-support' 
              ? 'border-red-300 bg-red-50' 
              : 'border-slate-200 bg-white hover:border-red-300'
          }`}
        >
          <DollarSign className="text-red-600 mb-4" size={32} />
          <h3 className="font-semibold text-slate-800 mb-2">Spousal support estimator</h3> {/* updated to sentence case */}
          <p className="text-slate-600 text-sm">Estimate potential spousal support obligations</p>
        </button>
      </div>

      {/* Calculator Interfaces */}
      {activeCalculator === 'child-support' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-slate-800">Ohio child support calculator</h3> {/* updated to sentence case */}
            <a 
              href="https://jfs.ohio.gov/ocs/childSupportGuidelineCalculator.stm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm"
            >
              <ExternalLink size={16} />
              Use Official Calculator
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Annual Gross Income</label>
                <input
                  type="number"
                  value={childSupportData.yourIncome || ''}
                  onChange={(e) => setChildSupportData({...childSupportData, yourIncome: Number(e.target.value)})}
                  placeholder="$50,000"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Other Parent's Annual Gross Income</label>
                <input
                  type="number"
                  value={childSupportData.otherParentIncome || ''}
                  onChange={(e) => setChildSupportData({...childSupportData, otherParentIncome: Number(e.target.value)})}
                  placeholder="$60,000"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Number of Children</label>
                <select
                  value={childSupportData.numChildren}
                  onChange={(e) => setChildSupportData({...childSupportData, numChildren: Number(e.target.value)})}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>1 child</option>
                  <option value={2}>2 children</option>
                  <option value={3}>3 children</option>
                  <option value={4}>4 children</option>
                  <option value={5}>5+ children</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Overnight Stays per Year</label>
                <input
                  type="number"
                  value={childSupportData.overnightStays || ''}
                  onChange={(e) => setChildSupportData({...childSupportData, overnightStays: Number(e.target.value)})}
                  placeholder="182"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-slate-500 mt-1">Standard parenting time is typically 182-183 days</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Health Insurance Cost</label>
                <input
                  type="number"
                  value={childSupportData.healthInsuranceCost || ''}
                  onChange={(e) => setChildSupportData({...childSupportData, healthInsuranceCost: Number(e.target.value)})}
                  placeholder="$0"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Childcare Cost</label>
                <input
                  type="number"
                  value={childSupportData.childcareCost || ''}
                  onChange={(e) => setChildSupportData({...childSupportData, childcareCost: Number(e.target.value)})}
                  placeholder="$0"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Extraordinary Expenses</label>
                <input
                  type="number"
                  value={childSupportData.extraordinaryExpenses || ''}
                  onChange={(e) => setChildSupportData({...childSupportData, extraordinaryExpenses: Number(e.target.value)})}
                  placeholder="$0"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-3">Estimated Monthly Support</h4>
              <div className="text-3xl font-bold text-blue-800 mb-2">
                ${childSupportData.yourIncome && childSupportData.otherParentIncome ? Math.round(calculateChildSupport()) : '---'}
              </div>
              <p className="text-sm text-blue-700 mb-4">
                This is a simplified estimate. Actual calculations include health insurance, childcare, and other factors.
              </p>
              <div className="text-xs text-blue-600 space-y-1">
                <p><strong>Combined Income:</strong> ${(childSupportData.yourIncome + childSupportData.otherParentIncome).toLocaleString()}</p>
                <p><strong>Your Income Share:</strong> {childSupportData.yourIncome && childSupportData.otherParentIncome ? Math.round((childSupportData.yourIncome / (childSupportData.yourIncome + childSupportData.otherParentIncome)) * 100) : 0}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeCalculator === 'asset-division' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-slate-800">Interactive asset modeler</h3> {/* updated to sentence case */}
            <div className="flex gap-4 text-sm">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Your name</label>
                <input
                  type="text"
                  value={spouse1Name}
                  onChange={(e) => setSpouse1Name(e.target.value)}
                  className="w-20 p-1 border border-slate-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Other parent's name</label>
                <input
                  type="text"
                  value={spouse2Name}
                  onChange={(e) => setSpouse2Name(e.target.value)}
                  className="w-20 p-1 border border-slate-300 rounded text-sm"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Asset List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-slate-700">Assets & Debts</h4>
                <button
                  onClick={addCustomAsset}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  <Plus size={16} />
                  Add asset
                </button>
              </div>
              
              {assets.map((asset) => (
                <div key={asset.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div>
                      <input
                        type="text"
                        value={asset.name}
                        onChange={(e) => updateAsset(asset.id, 'name', e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="Asset name"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={asset.value || ''}
                        onChange={(e) => updateAsset(asset.id, 'value', Number(e.target.value))}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="Value"
                      />
                    </div>
                    <div>
                      <select
                        value={asset.type}
                        onChange={(e) => updateAsset(asset.id, 'type', e.target.value as Asset['type'])}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                      >
                        <option value="marital">Marital</option>
                        <option value="separate">Separate</option>
                        <option value="debt">Debt</option>
                        <option value="personal">Personal</option>
                      </select>
                    </div>
                    <div>
                      <select
                        value={asset.assignedTo}
                        onChange={(e) => updateAsset(asset.id, 'assignedTo', e.target.value as Asset['assignedTo'])}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                      >
                        <option value="unassigned">Unassigned</option>
                        <option value="spouse1">{spouse1Name}</option>
                        <option value="spouse2">{spouse2Name}</option>
                        <option value="shared">Shared</option>
                      </select>
                    </div>
                    <div className="flex justify-end">
                      {!asset.id.startsWith('default-') && (
                        <button
                          onClick={() => removeAsset(asset.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Distribution Summary */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3">{spouse1Name}</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-blue-700">Net Worth</p>
                    <p className="text-xl font-bold text-blue-800">${spouse1NetWorth.toLocaleString()}</p>
                  </div>
                  <div className="text-xs text-blue-600 space-y-1">
                    <p>Assets: ${assets.filter(a => a.assignedTo === 'spouse1' && a.type !== 'debt').reduce((sum, a) => sum + a.value, 0).toLocaleString()}</p>
                    <p>Debts: ${assets.filter(a => a.assignedTo === 'spouse1' && a.type === 'debt').reduce((sum, a) => sum + a.value, 0).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-3">{spouse2Name}</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-green-700">Net Worth</p>
                    <p className="text-xl font-bold text-green-800">${spouse2NetWorth.toLocaleString()}</p>
                  </div>
                  <div className="text-xs text-green-600 space-y-1">
                    <p>Assets: ${assets.filter(a => a.assignedTo === 'spouse2' && a.type !== 'debt').reduce((sum, a) => sum + a.value, 0).toLocaleString()}</p>
                    <p>Debts: ${assets.filter(a => a.assignedTo === 'spouse2' && a.type === 'debt').reduce((sum, a) => sum + a.value, 0).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className={`border rounded-lg p-4 ${validation.isBalanced ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                <h4 className={`font-semibold mb-3 ${validation.isBalanced ? 'text-green-900' : 'text-amber-900'}`}>
                  Distribution Status
                </h4>
                <div className="space-y-2">
                  <div>
                    <p className={`text-sm ${validation.isBalanced ? 'text-green-700' : 'text-amber-700'}`}>
                      Difference
                    </p>
                    <p className={`text-xl font-bold ${validation.isBalanced ? 'text-green-800' : 'text-amber-800'}`}>
                      ${Math.abs(validation.difference).toLocaleString()}
                    </p>
                  </div>
                  <p className={`text-xs ${validation.isBalanced ? 'text-green-600' : 'text-amber-600'}`}>
                    {validation.isBalanced ? 'Distribution is reasonably equitable' : 'Consider rebalancing assets'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeCalculator === 'budget' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Comparative budget planner</h3> {/* updated to sentence case */}
          
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">Budget Comparison Tool</h4>
              <p className="text-sm text-purple-700">
                Compare your current budget with post-divorce projections and estimate your spouse's budget for negotiation planning.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-300 p-3 text-left">Category</th>
                    <th className="border border-slate-300 p-3 text-center">Current Budget</th>
                    <th className="border border-slate-300 p-3 text-center">Your Post-Divorce</th>
                    <th className="border border-slate-300 p-3 text-center">Spouse Estimate</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetCategories.map((category) => (
                    <tr key={category.id}>
                      <td className="border border-slate-300 p-3 font-medium">{category.name}</td>
                      <td className="border border-slate-300 p-2">
                        <input
                          type="number"
                          value={category.current || ''}
                          onChange={(e) => {
                            const updated = budgetCategories.map(c => 
                              c.id === category.id ? { ...c, current: Number(e.target.value) } : c
                            );
                            setBudgetCategories(updated);
                          }}
                          className="w-full p-2 border border-slate-300 rounded text-sm"
                          placeholder="$0"
                        />
                      </td>
                      <td className="border border-slate-300 p-2">
                        <input
                          type="number"
                          value={category.postDivorce || ''}
                          onChange={(e) => {
                            const updated = budgetCategories.map(c => 
                              c.id === category.id ? { ...c, postDivorce: Number(e.target.value) } : c
                            );
                            setBudgetCategories(updated);
                          }}
                          className="w-full p-2 border border-slate-300 rounded text-sm"
                          placeholder="$0"
                        />
                      </td>
                      <td className="border border-slate-300 p-2">
                        <input
                          type="number"
                          value={category.spouseEstimate || ''}
                          onChange={(e) => {
                            const updated = budgetCategories.map(c => 
                              c.id === category.id ? { ...c, spouseEstimate: Number(e.target.value) } : c
                            );
                            setBudgetCategories(updated);
                          }}
                          className="w-full p-2 border border-slate-300 rounded text-sm"
                          placeholder="$0"
                        />
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-100 font-bold">
                    <td className="border border-slate-300 p-3">Total Monthly</td>
                    <td className="border border-slate-300 p-3 text-center">
                      ${budgetCategories.reduce((sum, c) => sum + c.current, 0).toLocaleString()}
                    </td>
                    <td className="border border-slate-300 p-3 text-center">
                      ${budgetCategories.reduce((sum, c) => sum + c.postDivorce, 0).toLocaleString()}
                    </td>
                    <td className="border border-slate-300 p-3 text-center">
                      ${budgetCategories.reduce((sum, c) => sum + c.spouseEstimate, 0).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Budget Change</h4>
                <div className="text-2xl font-bold text-blue-800">
                  {(() => {
                    const currentTotal = budgetCategories.reduce((sum, c) => sum + c.current, 0);
                    const postTotal = budgetCategories.reduce((sum, c) => sum + c.postDivorce, 0);
                    const change = postTotal - currentTotal;
                    return change >= 0 ? `+$${change.toLocaleString()}` : `-$${Math.abs(change).toLocaleString()}`;
                  })()}
                </div>
                <p className="text-xs text-blue-600 mt-1">Monthly difference</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Combined Budgets</h4>
                <div className="text-2xl font-bold text-green-800">
                  ${(budgetCategories.reduce((sum, c) => sum + c.postDivorce, 0) + 
                     budgetCategories.reduce((sum, c) => sum + c.spouseEstimate, 0)).toLocaleString()}
                </div>
                <p className="text-xs text-green-600 mt-1">Total monthly needs</p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2">Annual Impact</h4>
                <div className="text-2xl font-bold text-purple-800">
                  {(() => {
                    const currentTotal = budgetCategories.reduce((sum, c) => sum + c.current, 0);
                    const postTotal = budgetCategories.reduce((sum, c) => sum + c.postDivorce, 0);
                    const annualChange = (postTotal - currentTotal) * 12;
                    return annualChange >= 0 ? `+$${annualChange.toLocaleString()}` : `-$${Math.abs(annualChange).toLocaleString()}`;
                  })()}
                </div>
                <p className="text-xs text-purple-600 mt-1">Yearly difference</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeCalculator === 'spousal-support' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-slate-800">Spousal support estimator</h3> {/* updated to sentence case */}
            <a 
              href="https://www.ohio.gov/wps/portal/gov/site/home/resources/divorce-and-annulment/spousal-support-calculator" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm"
            >
              <ExternalLink size={16} />
              Use Official Calculator
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Annual Gross Income</label>
                <input
                  type="number"
                  value={childSupportData.yourIncome || ''}
                  onChange={(e) => setChildSupportData({...childSupportData, yourIncome: Number(e.target.value)})}
                  placeholder="$50,000"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Spouse's Annual Gross Income</label>
                <input
                  type="number"
                  value={childSupportData.otherParentIncome || ''}
                  onChange={(e) => setChildSupportData({...childSupportData, otherParentIncome: Number(e.target.value)})}
                  placeholder="$60,000"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Marriage Duration (years)</label>
                <input
                  type="number"
                  value={childSupportData.numChildren || ''}
                  onChange={(e) => setChildSupportData({...childSupportData, numChildren: Number(e.target.value)})}
                  placeholder="10"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Age</label>
                <input
                  type="number"
                  value={childSupportData.overnightStays || ''}
                  onChange={(e) => setChildSupportData({...childSupportData, overnightStays: Number(e.target.value)})}
                  placeholder="40"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Spouse's Age</label>
                <input
                  type="number"
                  value={childSupportData.healthInsuranceCost || ''}
                  onChange={(e) => setChildSupportData({...childSupportData, healthInsuranceCost: Number(e.target.value)})}
                  placeholder="38"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Children Involved?</label>
                <select
                  value={childSupportData.numChildren ? 'yes' : 'no'}
                  onChange={(e) => setChildSupportData({...childSupportData, numChildren: e.target.value === 'yes' ? 1 : 0})}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Education Level</label>
                <input
                  type="text"
                  value={childSupportData.yourEducation || ''}
                  onChange={(e) => setChildSupportData({...childSupportData, yourEducation: e.target.value})}
                  placeholder="Bachelor's Degree"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Other parent's education level</label>
                <input
                  type="text"
                  value={childSupportData.otherParentEducation || ''}
                  onChange={(e) => setChildSupportData({...childSupportData, otherParentEducation: e.target.value})}
                  placeholder="High School Diploma"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Health Issues?</label>
                <select
                  value={childSupportData.healthInsuranceCost ? 'yes' : 'no'}
                  onChange={(e) => setChildSupportData({...childSupportData, healthInsuranceCost: e.target.value === 'yes' ? 1 : 0})}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-3">Estimated Monthly Support</h4>
              <div className="text-3xl font-bold text-red-800 mb-2">
                ${childSupportData.yourIncome && childSupportData.otherParentIncome ? Math.round(calculateChildSupport()) : '---'}
              </div>
              <p className="text-sm text-red-700 mb-4">
                This is a simplified estimate. Actual calculations consider many factors including duration of marriage, income disparity, and standard of living.
              </p>
              <div className="text-xs text-red-600 space-y-1">
                <p><strong>Combined Income:</strong> ${(childSupportData.yourIncome + childSupportData.otherParentIncome).toLocaleString()}</p>
                <p><strong>Your Income Share:</strong> {childSupportData.yourIncome && childSupportData.otherParentIncome ? Math.round((childSupportData.yourIncome / (childSupportData.yourIncome + childSupportData.otherParentIncome)) * 100) : 0}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Professional Financial Resources */}
      <div className="bg-sage-50 border border-sage-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-sage-800 mb-4">Professional financial resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4 text-sage-700">
            <div className="flex items-start gap-2">
              <ExternalLink size={16} className="mt-1 text-sage-600" />
              <div>
                <a href="https://institutedfa.com/find-a-cdfa/" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                  Find a Certified Divorce Financial Analyst (CDFA)
                </a>
                <p className="text-sm text-sage-600">Nationwide directory of certified divorce financial analysts</p>
                <p className="text-xs text-sage-500">Source: Institute for Divorce Financial Analysts (2024)</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ExternalLink size={16} className="mt-1 text-sage-600" />
              <div>
                <a href="https://www.nfcc.org/" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                  National Foundation for Credit Counseling
                </a>
                <p className="text-sm text-sage-600">Free and low-cost credit counseling and debt management</p>
                <p className="text-xs text-sage-500">Source: National Foundation for Credit Counseling (2024)</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ExternalLink size={16} className="mt-1 text-sage-600" />
              <div>
                <a href="https://jfs.ohio.gov/ocs/" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                  Ohio Child Support Services
                </a>
                <p className="text-sm text-sage-600">Official child support calculator and guidelines</p>
                <p className="text-xs text-sage-500">Source: Ohio Department of Job and Family Services (2024)</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 text-sage-700">
            <div className="flex items-start gap-2">
              <ExternalLink size={16} className="mt-1 text-sage-600" />
              <div>
                <a href="https://www.irs.gov/publications/p504" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                  IRS Publication 504 - Divorced or Separated Individuals
                </a>
                <p className="text-sm text-sage-600">Official tax guidance for divorced individuals</p>
                <p className="text-xs text-sage-500">Source: Internal Revenue Service (2024)</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ExternalLink size={16} className="mt-1 text-sage-600" />
              <div>
                <a href="https://www.ssa.gov/benefits/retirement/planner/applying7.html" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                  Social Security Benefits After Divorce
                </a>
                <p className="text-sm text-sage-600">Understanding ex-spouse Social Security benefits</p>
                <p className="text-xs text-sage-500">Source: Social Security Administration (2024)</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone size={16} className="mt-1 text-sage-600" />
              <div>
                <span className="font-medium">2-1-1 Ohio</span>
                <p className="text-sm text-sage-600">Emergency financial assistance hotline</p>
                <p className="text-xs text-sage-500">Dial 2-1-1 for local resources</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Assistance Programs */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-blue-800 mb-4">Ohio financial assistance programs</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">TANF (Cash Assistance)</h3>
            <p className="text-sm text-blue-700 mb-2">Temporary cash assistance for families with children</p>
            <a href="https://jfs.ohio.gov/cash/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
              Learn more → {/* updated to sentence case */}
            </a>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">SNAP (Food Assistance)</h3>
            <p className="text-sm text-blue-700 mb-2">Monthly food benefits for qualifying families</p>
            <a href="https://jfs.ohio.gov/foodstamps/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
              Apply Online →
            </a>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">WIC Program</h3>
            <p className="text-sm text-blue-700 mb-2">Nutrition assistance for women, infants, and children</p>
            <a href="https://odh.ohio.gov/know-our-programs/wic/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
              Find WIC Office →
            </a>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Shield className="text-neutral-600 mt-1 flex-shrink-0" size={20} />
          <div className="space-y-2">
            <h3 className="font-medium text-neutral-800">Privacy & calculation information</h3>
            <div className="text-neutral-700 text-sm space-y-1">
              <p>Your financial information is stored locally in this browser and never transmitted to any servers.</p>
              <p>These calculators provide educational estimates only. For precise calculations required by Ohio courts, use official tools and consult certified professionals.</p>
              <p>All financial decisions should be made in consultation with qualified financial advisors and attorneys.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderstandingMoney;
