import React, { useState } from 'react';
import { Calculator, Plus, Minus, DollarSign, TrendingUp, AlertCircle, CheckCircle2, Download } from 'lucide-react';
import { generatePDF, ComponentExportData } from '../../lib/dataExport';

interface SettlementProposal {
  name: string;
  assets: {
    house: number;
    retirement: number;
    savings: number;
    vehicles: number;
    other: number;
  };
  debts: {
    mortgage: number;
    creditCards: number;
    loans: number;
    other: number;
  };
  monthlyPayments: {
    childSupport: number;
    spousalSupport: number;
    duration: number; // months
  };
}

const SettlementComparison: React.FC = () => {
  const [proposals, setProposals] = useState<SettlementProposal[]>([
    {
      name: "Proposal A",
      assets: { house: 200000, retirement: 50000, savings: 10000, vehicles: 15000, other: 5000 },
      debts: { mortgage: 150000, creditCards: 5000, loans: 10000, other: 2000 },
      monthlyPayments: { childSupport: 800, spousalSupport: 500, duration: 60 }
    },
    {
      name: "Proposal B", 
      assets: { house: 0, retirement: 80000, savings: 130000, vehicles: 15000, other: 8000 },
      debts: { mortgage: 0, creditCards: 3000, loans: 7000, other: 1000 },
      monthlyPayments: { childSupport: 800, spousalSupport: 300, duration: 36 }
    }
  ]);

  const [selectedTimeframe, setSelectedTimeframe] = useState<1 | 3 | 5 | 10>(5);

  const calculateNetWorth = (proposal: SettlementProposal) => {
    const totalAssets = Object.values(proposal.assets).reduce((sum, val) => sum + val, 0);
    const totalDebts = Object.values(proposal.debts).reduce((sum, val) => sum + val, 0);
    return totalAssets - totalDebts;
  };

  const calculateLongTermValue = (proposal: SettlementProposal, years: number) => {
    const currentNetWorth = calculateNetWorth(proposal);
    const totalPayments = (proposal.monthlyPayments.childSupport + proposal.monthlyPayments.spousalSupport) * 
                         Math.min(years * 12, proposal.monthlyPayments.duration);
    
    // Assume 3% annual growth on investments, 2% home appreciation
    const appreciatedAssets = proposal.assets.house * Math.pow(1.02, years) + 
                             proposal.assets.retirement * Math.pow(1.06, years) +
                             proposal.assets.savings * Math.pow(1.03, years) +
                             proposal.assets.vehicles * Math.pow(0.95, years) + // depreciation
                             proposal.assets.other * Math.pow(1.02, years);
    
    return appreciatedAssets - Object.values(proposal.debts).reduce((sum, val) => sum + val, 0) - totalPayments;
  };

  const updateProposal = (index: number, field: keyof SettlementProposal, subfield: string, value: number) => {
    setProposals(prev => prev.map((proposal, i) => {
      if (i !== index) return proposal;
      
      const updatedField = { ...proposal[field] as any, [subfield]: value };
      
      return {
        ...proposal,
        [field]: updatedField
      };
    }));
  };

  const addProposal = () => {
    setProposals(prev => [...prev, {
      name: `Proposal ${String.fromCharCode(65 + prev.length)}`,
      assets: { house: 0, retirement: 0, savings: 0, vehicles: 0, other: 0 },
      debts: { mortgage: 0, creditCards: 0, loans: 0, other: 0 },
      monthlyPayments: { childSupport: 0, spousalSupport: 0, duration: 0 }
    }]);
  };

  const removeProposal = (index: number) => {
    if (proposals.length > 1) {
      setProposals(prev => prev.filter((_, i) => i !== index));
    }
  };

  const exportData = () => {
    const totalIncome = calculateTotalIncome();
    const totalExpenses = calculateTotalExpenses();
    const exportData: ComponentExportData = {
      componentName: 'Settlement Comparison',
      timestamp: new Date().toISOString(),
      data: {
        proposals,
        timeframe: selectedTimeframe,
        totals: {
          income: totalIncome,
          expenses: totalExpenses,
          balance: totalIncome - totalExpenses
        }
      }
    };
    generatePDF(exportData);
  };

  const calculateTotalIncome = () => proposals.reduce((sum, p) => sum + calculateNetWorth(p), 0);
  const calculateTotalExpenses = () => proposals.reduce((sum, p) => sum + (p.monthlyPayments.childSupport + p.monthlyPayments.spousalSupport), 0);

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-light text-sage-900">Settlement comparison tool</h1>
        <p className="text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed">
          Compare different settlement proposals with long-term financial projections to make informed decisions
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Educational Financial Projections</h3>
          <p className="text-blue-800 text-sm">
            These projections are estimates based on simplified assumptions. Investment returns, inflation, and life changes will affect actual outcomes. Consult with a financial advisor for personalized analysis.
          </p>
        </div>
      </div>

      {/* Timeframe Selection */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Projection timeframe</h3>
        <div className="flex gap-4">
          {[1, 3, 5, 10].map(years => (
            <button
              key={years}
              onClick={() => setSelectedTimeframe(years as 1 | 3 | 5 | 10)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTimeframe === years
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {years} year{years > 1 ? 's' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Proposals Grid */}
      <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${proposals.length}, 1fr)` }}>
        {proposals.map((proposal, index) => (
          <div key={index} className="bg-white rounded-xl border border-neutral-200 p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={proposal.name}
                onChange={(e) => setProposals(prev => prev.map((p, i) => 
                  i === index ? { ...p, name: e.target.value } : p
                ))}
                className="text-xl font-semibold text-neutral-800 bg-transparent border-none outline-none"
              />
              {proposals.length > 1 && (
                <button
                  onClick={() => removeProposal(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Minus size={20} />
                </button>
              )}
            </div>

            {/* Assets */}
            <div>
              <h4 className="font-medium text-green-800 mb-3">Assets</h4>
              <div className="space-y-2">
                {Object.entries(proposal.assets).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <label className="text-sm capitalize text-neutral-700">
                      {key === 'house' ? 'Primary residence' : key}:
                    </label>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">$</span>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => updateProposal(index, 'assets', key, Number(e.target.value))}
                        className="w-24 text-sm text-right border border-neutral-200 rounded px-2 py-1"
                      />
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-neutral-200">
                  <div className="flex justify-between font-medium">
                    <span>Total Assets:</span>
                    <span className="text-green-600">
                      ${Object.values(proposal.assets).reduce((sum, val) => sum + val, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Debts */}
            <div>
              <h4 className="font-medium text-red-800 mb-3">Debts</h4>
              <div className="space-y-2">
                {Object.entries(proposal.debts).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <label className="text-sm capitalize text-neutral-700">
                      {key === 'creditCards' ? 'Credit cards' : key}:
                    </label>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">$</span>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => updateProposal(index, 'debts', key, Number(e.target.value))}
                        className="w-24 text-sm text-right border border-neutral-200 rounded px-2 py-1"
                      />
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-neutral-200">
                  <div className="flex justify-between font-medium">
                    <span>Total Debts:</span>
                    <span className="text-red-600">
                      ${Object.values(proposal.debts).reduce((sum, val) => sum + val, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Payments */}
            <div>
              <h4 className="font-medium text-purple-800 mb-3">Monthly Payments</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-neutral-700">Child support:</label>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">$</span>
                    <input
                      type="number"
                      value={proposal.monthlyPayments.childSupport}
                      onChange={(e) => updateProposal(index, 'monthlyPayments', 'childSupport', Number(e.target.value))}
                      className="w-24 text-sm text-right border border-neutral-200 rounded px-2 py-1"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm text-neutral-700">Spousal support:</label>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">$</span>
                    <input
                      type="number"
                      value={proposal.monthlyPayments.spousalSupport}
                      onChange={(e) => updateProposal(index, 'monthlyPayments', 'spousalSupport', Number(e.target.value))}
                      className="w-24 text-sm text-right border border-neutral-200 rounded px-2 py-1"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm text-neutral-700">Duration (months):</label>
                  <input
                    type="number"
                    value={proposal.monthlyPayments.duration}
                    onChange={(e) => updateProposal(index, 'monthlyPayments', 'duration', Number(e.target.value))}
                    className="w-24 text-sm text-right border border-neutral-200 rounded px-2 py-1"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-neutral-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Current Net Worth:</span>
                <span className={`font-bold ${calculateNetWorth(proposal) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${calculateNetWorth(proposal).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{selectedTimeframe}-Year Value:</span>
                <span className={`font-bold ${calculateLongTermValue(proposal, selectedTimeframe) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${calculateLongTermValue(proposal, selectedTimeframe).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Proposal Button */}
      <div className="flex justify-center gap-4">
        <button
          onClick={addProposal}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Another Proposal
        </button>
        <button
          onClick={exportData}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download size={20} />
          Export Report
        </button>
      </div>

      {/* Comparison Summary */}
      <div className="bg-white rounded-xl border border-neutral-200 p-8">
        <h3 className="text-xl font-semibold text-neutral-800 mb-6">Comparison summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left pb-3 font-medium text-neutral-700">Proposal</th>
                <th className="text-right pb-3 font-medium text-neutral-700">Current Net Worth</th>
                <th className="text-right pb-3 font-medium text-neutral-700">{selectedTimeframe}-Year Value</th>
                <th className="text-right pb-3 font-medium text-neutral-700">Monthly Payments</th>
                <th className="text-right pb-3 font-medium text-neutral-700">Total Payments</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((proposal, index) => {
                const monthlyTotal = proposal.monthlyPayments.childSupport + proposal.monthlyPayments.spousalSupport;
                const totalPayments = monthlyTotal * proposal.monthlyPayments.duration;
                
                return (
                  <tr key={index} className="border-b border-neutral-100">
                    <td className="py-3 font-medium">{proposal.name}</td>
                    <td className={`py-3 text-right ${calculateNetWorth(proposal) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${calculateNetWorth(proposal).toLocaleString()}
                    </td>
                    <td className={`py-3 text-right ${calculateLongTermValue(proposal, selectedTimeframe) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${calculateLongTermValue(proposal, selectedTimeframe).toLocaleString()}
                    </td>
                    <td className="py-3 text-right">
                      ${monthlyTotal.toLocaleString()}/mo
                    </td>
                    <td className="py-3 text-right">
                      ${totalPayments.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-amber-600 mt-1 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-medium text-amber-800 mb-2">Important considerations</h3>
            <ul className="text-amber-700 text-sm space-y-1">
              <li>• This tool provides estimates only and should not replace professional financial advice</li>
              <li>• Tax implications are not included in these calculations</li>
              <li>• Investment returns are estimated and may vary significantly</li>
              <li>• Consider consulting with a Certified Divorce Financial Analyst (CDFA)</li>
              <li>• Factor in inflation, changing income, and life circumstances</li>
              <li>• Review and update projections as negotiations progress</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettlementComparison;
