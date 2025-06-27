import React, { useState } from 'react';
import { DollarSign, Plus, Minus, TrendingUp, TrendingDown, Calculator, AlertTriangle, CheckCircle2, Calendar, Download } from 'lucide-react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { generatePDF, ComponentExportData } from '../../lib/dataExport';

interface BudgetCategory {
  id: string;
  name: string;
  subcategories: {
    id: string;
    name: string;
    monthlyAmount: number;
    isEssential: boolean;
    notes?: string;
  }[];
}

interface Income {
  id: string;
  source: string;
  monthlyAmount: number;
  isGuaranteed: boolean;
}

const PostDivorceBudget: React.FC = () => {
  const [incomes, setIncomes] = useLocalStorageState<Income[]>('post-divorce-income', [
    { id: '1', source: 'Primary job', monthlyAmount: 0, isGuaranteed: true },
    { id: '2', source: 'Child support', monthlyAmount: 0, isGuaranteed: true },
    { id: '3', source: 'Spousal support', monthlyAmount: 0, isGuaranteed: true }
  ]);

  const [budgetCategories, setBudgetCategories] = useLocalStorageState<BudgetCategory[]>('post-divorce-budget', [
    {
      id: 'housing',
      name: 'Housing',
      subcategories: [
        { id: 'rent-mortgage', name: 'Rent/Mortgage', monthlyAmount: 0, isEssential: true },
        { id: 'utilities', name: 'Utilities', monthlyAmount: 0, isEssential: true },
        { id: 'property-tax', name: 'Property tax', monthlyAmount: 0, isEssential: true },
        { id: 'home-insurance', name: 'Home insurance', monthlyAmount: 0, isEssential: true },
        { id: 'maintenance', name: 'Maintenance/repairs', monthlyAmount: 0, isEssential: false }
      ]
    },
    {
      id: 'transportation',
      name: 'Transportation',
      subcategories: [
        { id: 'car-payment', name: 'Car payment', monthlyAmount: 0, isEssential: true },
        { id: 'car-insurance', name: 'Car insurance', monthlyAmount: 0, isEssential: true },
        { id: 'gas', name: 'Gas', monthlyAmount: 0, isEssential: true },
        { id: 'maintenance-car', name: 'Car maintenance', monthlyAmount: 0, isEssential: true }
      ]
    },
    {
      id: 'children',
      name: 'Children (if applicable)',
      subcategories: [
        { id: 'childcare', name: 'Childcare/daycare', monthlyAmount: 0, isEssential: true },
        { id: 'school-supplies', name: 'School supplies', monthlyAmount: 0, isEssential: true },
        { id: 'extracurricular', name: 'Extracurricular activities', monthlyAmount: 0, isEssential: false },
        { id: 'child-medical', name: 'Medical expenses', monthlyAmount: 0, isEssential: true }
      ]
    },
    {
      id: 'health',
      name: 'Health & Insurance',
      subcategories: [
        { id: 'health-insurance', name: 'Health insurance', monthlyAmount: 0, isEssential: true },
        { id: 'medical-copays', name: 'Medical copays/deductibles', monthlyAmount: 0, isEssential: true },
        { id: 'prescriptions', name: 'Prescriptions', monthlyAmount: 0, isEssential: true },
        { id: 'dental-vision', name: 'Dental/vision', monthlyAmount: 0, isEssential: true }
      ]
    },
    {
      id: 'food',
      name: 'Food & Groceries',
      subcategories: [
        { id: 'groceries', name: 'Groceries', monthlyAmount: 0, isEssential: true },
        { id: 'dining-out', name: 'Dining out', monthlyAmount: 0, isEssential: false }
      ]
    },
    {
      id: 'debt',
      name: 'Debt Payments',
      subcategories: [
        { id: 'credit-cards', name: 'Credit cards', monthlyAmount: 0, isEssential: true },
        { id: 'student-loans', name: 'Student loans', monthlyAmount: 0, isEssential: true },
        { id: 'personal-loans', name: 'Personal loans', monthlyAmount: 0, isEssential: true }
      ]
    },
    {
      id: 'personal',
      name: 'Personal & Lifestyle',
      subcategories: [
        { id: 'clothing', name: 'Clothing', monthlyAmount: 0, isEssential: false },
        { id: 'entertainment', name: 'Entertainment', monthlyAmount: 0, isEssential: false },
        { id: 'gym', name: 'Gym/fitness', monthlyAmount: 0, isEssential: false },
        { id: 'personal-care', name: 'Personal care', monthlyAmount: 0, isEssential: false }
      ]
    }
  ]);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const updateIncome = (id: string, field: keyof Income, value: any) => {
    setIncomes(prev => prev.map(income => 
      income.id === id ? { ...income, [field]: value } : income
    ));
  };

  const updateBudgetItem = (categoryId: string, subcategoryId: string, amount: number) => {
    setBudgetCategories(prev => prev.map(category => 
      category.id === categoryId 
        ? {
            ...category,
            subcategories: category.subcategories.map(sub => 
              sub.id === subcategoryId ? { ...sub, monthlyAmount: amount } : sub
            )
          }
        : category
    ));
  };

  const addIncome = () => {
    const newIncome: Income = {
      id: Date.now().toString(),
      source: 'New income source',
      monthlyAmount: 0,
      isGuaranteed: false
    };
    setIncomes(prev => [...prev, newIncome]);
  };

  const removeIncome = (id: string) => {
    setIncomes(prev => prev.filter(income => income.id !== id));
  };

  const calculateTotalIncome = () => {
    return incomes.reduce((total, income) => total + income.monthlyAmount, 0);
  };

  const calculateTotalExpenses = () => {
    return budgetCategories.reduce((total, category) => 
      total + category.subcategories.reduce((catTotal, sub) => catTotal + sub.monthlyAmount, 0), 0
    );
  };

  const calculateEssentialExpenses = () => {
    return budgetCategories.reduce((total, category) => 
      total + category.subcategories
        .filter(sub => sub.isEssential)
        .reduce((catTotal, sub) => catTotal + sub.monthlyAmount, 0), 0
    );
  };

  const totalIncome = calculateTotalIncome();
  const totalExpenses = calculateTotalExpenses();
  const essentialExpenses = calculateEssentialExpenses();
  const monthlyBalance = totalIncome - totalExpenses;
  const survivalBudget = totalIncome - essentialExpenses;

  const exportBudgetData = () => {
    const exportData: ComponentExportData = {
      componentName: 'Post-Divorce Budget',
      timestamp: new Date().toISOString(),
      data: {
        income: incomes,
        expenses: budgetCategories,
        totals: {
          income: totalIncome,
          expenses: totalExpenses,
          balance: monthlyBalance,
          essentialExpenses,
          survivalBudget
        }
      }
    };
    generatePDF(exportData);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-light text-sage-900">Post-divorce budget tracker</h1>
        <p className="text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed">
          Plan and track your financial reality in the first year after divorce with month-by-month budgeting
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Educational Budget Estimates</h3>
          <p className="text-blue-800 text-sm">
            This budget tracker provides planning estimates based on your inputs. Actual post-divorce expenses may vary significantly. Consider tracking real expenses for 3-6 months to refine these projections.
          </p>
        </div>
        <button
          onClick={exportBudgetData}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download size={20} />
          Export Budget Report
        </button>
      </div>

      {/* Budget Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <TrendingUp className="mx-auto text-green-600 mb-2" size={24} />
          <h3 className="font-semibold text-green-800">Monthly Income</h3>
          <p className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <TrendingDown className="mx-auto text-red-600 mb-2" size={24} />
          <h3 className="font-semibold text-red-800">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
          <AlertTriangle className="mx-auto text-orange-600 mb-2" size={24} />
          <h3 className="font-semibold text-orange-800">Essential Only</h3>
          <p className="text-2xl font-bold text-orange-600">${essentialExpenses.toLocaleString()}</p>
        </div>
        <div className={`${monthlyBalance >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'} border rounded-xl p-6 text-center`}>
          <Calculator className={`mx-auto ${monthlyBalance >= 0 ? 'text-blue-600' : 'text-red-600'} mb-2`} size={24} />
          <h3 className={`font-semibold ${monthlyBalance >= 0 ? 'text-blue-800' : 'text-red-800'}`}>Monthly Balance</h3>
          <p className={`text-2xl font-bold ${monthlyBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            ${monthlyBalance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Financial Health Indicators */}
      <div className="bg-white rounded-xl border border-neutral-200 p-8">
        <h3 className="text-xl font-semibold text-neutral-800 mb-6">Financial health check</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-neutral-700">Budget Balance</h4>
            <div className="flex items-center gap-2">
              {monthlyBalance >= 0 ? (
                <>
                  <CheckCircle2 className="text-green-600" size={20} />
                  <span className="text-green-600 font-medium">Positive balance</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="text-red-600" size={20} />
                  <span className="text-red-600 font-medium">Budget deficit</span>
                </>
              )}
            </div>
            <p className="text-sm text-neutral-600">
              {monthlyBalance >= 0 
                ? 'You have money left over each month for savings and emergencies.'
                : 'You are spending more than you earn. Consider reducing non-essential expenses.'
              }
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-neutral-700">Essential Expenses Ratio</h4>
            <div className="flex items-center gap-2">
              {(essentialExpenses / totalIncome) <= 0.7 ? (
                <>
                  <CheckCircle2 className="text-green-600" size={20} />
                  <span className="text-green-600 font-medium">Healthy ratio</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="text-orange-600" size={20} />
                  <span className="text-orange-600 font-medium">High ratio</span>
                </>
              )}
            </div>
            <p className="text-sm text-neutral-600">
              Essential expenses are {Math.round((essentialExpenses / totalIncome) * 100)}% of income.
              {(essentialExpenses / totalIncome) <= 0.7 
                ? ' This gives you flexibility for unexpected expenses.'
                : ' Consider ways to reduce essential costs or increase income.'
              }
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-neutral-700">Survival Budget</h4>
            <div className="flex items-center gap-2">
              {survivalBudget >= 0 ? (
                <>
                  <CheckCircle2 className="text-green-600" size={20} />
                  <span className="text-green-600 font-medium">Sustainable</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="text-red-600" size={20} />
                  <span className="text-red-600 font-medium">Unsustainable</span>
                </>
              )}
            </div>
            <p className="text-sm text-neutral-600">
              {survivalBudget >= 0 
                ? 'You can cover essential expenses with current income.'
                : 'Essential expenses exceed income. Immediate action needed.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Income Section */}
      <div className="bg-white rounded-xl border border-neutral-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-neutral-800">Monthly Income Sources</h3>
          <button
            onClick={addIncome}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus size={16} />
            Add Income
          </button>
        </div>
        <div className="space-y-4">
          {incomes.map(income => (
            <div key={income.id} className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg">
              <input
                type="text"
                value={income.source}
                onChange={(e) => updateIncome(income.id, 'source', e.target.value)}
                className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg"
                placeholder="Income source"
              />
              <div className="flex items-center gap-2">
                <span className="text-sm">$</span>
                <input
                  type="number"
                  value={income.monthlyAmount}
                  onChange={(e) => updateIncome(income.id, 'monthlyAmount', Number(e.target.value))}
                  className="w-32 px-3 py-2 border border-neutral-200 rounded-lg text-right"
                  placeholder="0"
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={income.isGuaranteed}
                  onChange={(e) => updateIncome(income.id, 'isGuaranteed', e.target.checked)}
                  className="text-green-600"
                />
                <span className="text-sm">Guaranteed</span>
              </label>
              <button
                onClick={() => removeIncome(income.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Minus size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Expense Categories */}
      <div className="space-y-6">
        {budgetCategories.map(category => (
          <div key={category.id} className="bg-white rounded-xl border border-neutral-200 p-8">
            <h3 className="text-xl font-semibold text-neutral-800 mb-6">{category.name}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {category.subcategories.map(subcategory => (
                <div key={subcategory.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-700">{subcategory.name}</span>
                    {subcategory.isEssential && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Essential</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">$</span>
                    <input
                      type="number"
                      value={subcategory.monthlyAmount}
                      onChange={(e) => updateBudgetItem(category.id, subcategory.id, Number(e.target.value))}
                      className="w-24 px-2 py-1 border border-neutral-200 rounded text-right text-sm"
                      placeholder="0"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-200">
              <div className="flex justify-between font-medium">
                <span>Category Total:</span>
                <span>${category.subcategories.reduce((sum, sub) => sum + sub.monthlyAmount, 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Budget Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-medium text-blue-800 mb-4">Post-divorce budgeting tips</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
          <ul className="space-y-2">
            <li>• Track actual spending for the first 3 months to adjust estimates</li>
            <li>• Build an emergency fund equal to 3-6 months of essential expenses</li>
            <li>• Consider the tax implications of spousal support payments</li>
            <li>• Review and update your budget quarterly as life changes</li>
          </ul>
          <ul className="space-y-2">
            <li>• Factor in forgotten expenses: car registration, annual insurance, etc.</li>
            <li>• Plan for child-related expenses that may fluctuate seasonally</li>
            <li>• Consider the cost of establishing new credit if needed</li>
            <li>• Budget for legal fees if modifications become necessary</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostDivorceBudget;
