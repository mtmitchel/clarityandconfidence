import React, { useState } from 'react';
import { Calculator, ExternalLink, Info, AlertTriangle, TrendingUp, DollarSign, PieChart, FileText, Phone, Shield } from 'lucide-react';

interface ChildSupportInputs {
  yourIncome: number;
  otherParentIncome: number;
  numChildren: number;
  overnightStays: number;
  healthInsuranceCost: number;
  childcareCost: number;
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

const UnderstandingMoney: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<'child-support' | 'asset-division' | 'budget' | null>(null);
  const [childSupportData, setChildSupportData] = useState<ChildSupportInputs>({
    yourIncome: 0,
    otherParentIncome: 0,
    numChildren: 1,
    overnightStays: 182,
    healthInsuranceCost: 0,
    childcareCost: 0
  });

  const [assetData, setAssetData] = useState<AssetInputs>({
    homeValue: 0,
    mortgageBalance: 0,
    retirement401k: 0,
    retirementIRA: 0,
    savings: 0,
    investments: 0,
    debts: 0,
    vehicles: 0
  });

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

  const calculateAssetDivision = () => {
    const { homeValue, mortgageBalance, retirement401k, retirementIRA, savings, investments, debts, vehicles } = assetData;
    const homeEquity = Math.max(0, homeValue - mortgageBalance);
    const totalAssets = homeEquity + retirement401k + retirementIRA + savings + investments + vehicles;
    const netWorth = totalAssets - debts;
    const estimatedShare = netWorth * 0.5; // Assuming equal division
    
    return {
      totalAssets,
      netWorth,
      estimatedShare,
      homeEquity
    };
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-light text-sage-900 leading-tight">Understanding Your Money</h1>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            Interactive financial planning tools and authoritative resources for Ohio divorce proceedings
          </p>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-amber-600 mt-1 flex-shrink-0" size={24} />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-amber-900">Important Financial Disclaimer</h3>
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
          <h3 className="font-semibold text-slate-800 mb-2">Ohio Child Support Calculator</h3>
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
          <h3 className="font-semibold text-slate-800 mb-2">Asset Division Estimator</h3>
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
          <h3 className="font-semibold text-slate-800 mb-2">Post-Divorce Budget Planner</h3>
          <p className="text-slate-600 text-sm">Plan your financial future as a single parent</p>
        </button>
      </div>

      {/* Calculator Interfaces */}
      {activeCalculator === 'child-support' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-slate-800">Ohio Child Support Calculator</h3>
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
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Asset Division Estimator</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-slate-700">Assets</h4>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Home Value</label>
                <input
                  type="number"
                  value={assetData.homeValue || ''}
                  onChange={(e) => setAssetData({...assetData, homeValue: Number(e.target.value)})}
                  placeholder="$300,000"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mortgage Balance</label>
                <input
                  type="number"
                  value={assetData.mortgageBalance || ''}
                  onChange={(e) => setAssetData({...assetData, mortgageBalance: Number(e.target.value)})}
                  placeholder="$200,000"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">401(k) Retirement Accounts</label>
                <input
                  type="number"
                  value={assetData.retirement401k || ''}
                  onChange={(e) => setAssetData({...assetData, retirement401k: Number(e.target.value)})}
                  placeholder="$150,000"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Savings & Checking</label>
                <input
                  type="number"
                  value={assetData.savings || ''}
                  onChange={(e) => setAssetData({...assetData, savings: Number(e.target.value)})}
                  placeholder="$25,000"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Other Debts</label>
                <input
                  type="number"
                  value={assetData.debts || ''}
                  onChange={(e) => setAssetData({...assetData, debts: Number(e.target.value)})}
                  placeholder="$15,000"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-3">Estimated Division</h4>
              {(() => {
                const division = calculateAssetDivision();
                return (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-green-700">Total Marital Assets</p>
                      <p className="text-2xl font-bold text-green-800">${division.totalAssets.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Net Worth (Assets - Debts)</p>
                      <p className="text-xl font-semibold text-green-800">${division.netWorth.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Your Estimated Share (50%)</p>
                      <p className="text-xl font-semibold text-green-800">${division.estimatedShare.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Home Equity</p>
                      <p className="text-lg text-green-800">${division.homeEquity.toLocaleString()}</p>
                    </div>
                  </div>
                );
              })()}
              <p className="text-xs text-green-600 mt-4">
                Ohio follows equitable distribution. Actual division depends on multiple factors including marriage length, contributions, and future needs.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Professional Financial Resources */}
      <div className="bg-sage-50 border border-sage-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-sage-800 mb-4">Professional Financial Resources</h2>
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
        <h2 className="text-lg font-medium text-blue-800 mb-4">Ohio Financial Assistance Programs</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">TANF (Cash Assistance)</h3>
            <p className="text-sm text-blue-700 mb-2">Temporary cash assistance for families with children</p>
            <a href="https://jfs.ohio.gov/cash/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
              Learn More →
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
            <h3 className="font-medium text-neutral-800">Privacy & Calculation Information</h3>
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
