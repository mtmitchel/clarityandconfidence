import React, { useState, useEffect } from 'react';
import { Receipt, Plus, Download, TrendingUp, DollarSign, Calendar, Search, Filter, AlertCircle, PieChart, BarChart3, Sheet } from 'lucide-react';

interface Expense {
  id: string;
  date: Date;
  category: string;
  subcategory?: string;
  description: string;
  amount: number;
  paymentMethod: string;
  isRecurring: boolean;
  isReimbursable: boolean;
  isDeductible: boolean;
  attachments?: string[];
  tags: string[];
}

interface ExpenseCategory {
  name: string;
  subcategories: string[];
  color: string;
}

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'summary'>('list');
  const [dateRange, setDateRange] = useState<'month' | 'quarter' | 'year' | 'all'>('month');
  
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    date: new Date(),
    category: '',
    description: '',
    amount: 0,
    paymentMethod: 'cash',
    isRecurring: false,
    isReimbursable: false,
    isDeductible: false,
    tags: []
  });

  const expenseCategories: ExpenseCategory[] = [
    {
      name: 'Legal Fees',
      subcategories: ['Attorney fees', 'Court filing fees', 'Mediation', 'Expert witnesses', 'Process server', 'Court reporter'],
      color: 'bg-red-100 text-red-800'
    },
    {
      name: 'Living Expenses',
      subcategories: ['Rent/Mortgage', 'Utilities', 'Groceries', 'Transportation', 'Insurance', 'Phone/Internet'],
      color: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'Child Care',
      subcategories: ['Daycare', 'Babysitting', 'After-school care', 'Summer camps', 'School supplies', 'Extracurriculars'],
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'Medical',
      subcategories: ['Doctor visits', 'Prescriptions', 'Therapy/Counseling', 'Dental', 'Vision', 'Emergency'],
      color: 'bg-purple-100 text-purple-800'
    },
    {
      name: 'Professional Services',
      subcategories: ['Financial advisor', 'Accountant', 'Appraiser', 'Real estate agent', 'Business valuation'],
      color: 'bg-indigo-100 text-indigo-800'
    },
    {
      name: 'Moving/Housing',
      subcategories: ['Moving company', 'Storage', 'Deposits', 'New furniture', 'Home repairs', 'Cleaning'],
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      name: 'Other',
      subcategories: ['Personal care', 'Entertainment', 'Travel', 'Gifts', 'Education', 'Miscellaneous'],
      color: 'bg-gray-100 text-gray-800'
    }
  ];

  // Load expenses from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('divorce-expense-tracker');
    if (saved) {
      const parsed = JSON.parse(saved);
      setExpenses(parsed.map((expense: any) => ({
        ...expense,
        date: new Date(expense.date)
      })));
    }
  }, []);

  // Save expenses to localStorage
  useEffect(() => {
    localStorage.setItem('divorce-expense-tracker', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (!newExpense.category || !newExpense.description || !newExpense.amount) return;

    const expense: Expense = {
      id: Date.now().toString(),
      date: newExpense.date || new Date(),
      category: newExpense.category,
      subcategory: newExpense.subcategory,
      description: newExpense.description,
      amount: newExpense.amount,
      paymentMethod: newExpense.paymentMethod || 'cash',
      isRecurring: newExpense.isRecurring || false,
      isReimbursable: newExpense.isReimbursable || false,
      isDeductible: newExpense.isDeductible || false,
      tags: newExpense.tags || []
    };

    setExpenses([expense, ...expenses]);
    setNewExpense({
      date: new Date(),
      category: '',
      description: '',
      amount: 0,
      paymentMethod: 'cash',
      isRecurring: false,
      isReimbursable: false,
      isDeductible: false,
      tags: []
    });
    setIsAddingExpense(false);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const getFilteredExpenses = () => {
    let filtered = expenses;

    // Date range filter
    if (dateRange !== 'all') {
      const now = new Date();
      const startDate = new Date();
      
      switch (dateRange) {
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          startDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(expense => expense.date >= startDate);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(expense =>
        expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.subcategory?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(expense => expense.category === filterCategory);
    }

    return filtered;
  };

  const filteredExpenses = getFilteredExpenses();

  const calculateSummary = () => {
    const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const legal = filteredExpenses.filter(e => e.category === 'Legal Fees').reduce((sum, e) => sum + e.amount, 0);
    const reimbursable = filteredExpenses.filter(e => e.isReimbursable).reduce((sum, e) => sum + e.amount, 0);
    const deductible = filteredExpenses.filter(e => e.isDeductible).reduce((sum, e) => sum + e.amount, 0);

    const categoryTotals = expenseCategories.map(category => ({
      name: category.name,
      amount: filteredExpenses.filter(e => e.category === category.name).reduce((sum, e) => sum + e.amount, 0),
      color: category.color
    })).filter(cat => cat.amount > 0);

    return { total, legal, reimbursable, deductible, categoryTotals };
  };

  const summary = calculateSummary();

  const exportExpenses = () => {
    const headers = ['Date', 'Category', 'Subcategory', 'Description', 'Amount', 'Payment Method', 'Is Recurring', 'Is Reimbursable', 'Is Deductible'];
    const rows = filteredExpenses.map(expense => {
      const escapeCSV = (str: string | undefined) => {
        if (!str) return '';
        if (str.includes('"') || str.includes(',') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };

      return [
        expense.date.toISOString(),
        expense.category,
        expense.subcategory || '',
        escapeCSV(expense.description),
        expense.amount,
        expense.paymentMethod,
        expense.isRecurring ? 'Yes' : 'No',
        expense.isReimbursable ? 'Yes' : 'No',
        expense.isDeductible ? 'Yes' : 'No'
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "expense_log.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryColor = (categoryName: string) => {
    return expenseCategories.find(cat => cat.name === categoryName)?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-light text-sage-900">Your Expense Record</h1>
        <p className="text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed">
          Tracking expenses is crucial for a clear financial picture. Use the templates below to maintain your own private log, or use the quick entry tool on this page for illustrative purposes.
        </p>
      </div>

      {/* Best Practices Alert */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Receipt className="text-green-600 mt-1 flex-shrink-0" size={20} />
          <div className="space-y-2">
            <h3 className="font-semibold text-green-900">Best practices for expense tracking</h3>
            <div className="text-green-800 text-sm space-y-1">
              <p>• <strong>Keep all receipts</strong> - Physical or digital copies for every expense</p>
              <p>• <strong>Record immediately</strong> - Track expenses as they happen to avoid forgetting</p>
              <p>• <strong>Categorize consistently</strong> - Use the same categories every time for clear patterns</p>
              <p>• <strong>Note tax implications</strong> - Mark which expenses may be deductible</p>
              <p>• <strong>Include context</strong> - Brief descriptions help explain expenses later</p>
              <p>• <strong>Separate personal vs. divorce-related</strong> - Keep clear boundaries for court purposes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Template & Export Hub */}
      <div className="bg-white border-2 border-blue-200 rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-blue-900 mb-3">Your Private Expense Log Template</h2>
        <p className="text-neutral-600 mb-6">For your privacy and control, we recommend keeping your detailed expense log on your own computer. Download this universal CSV template to get started.</p>
        
        <div className="flex flex-wrap items-start gap-4">
          <a 
            href="/expense-tracker-template.csv" 
            download
            className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <Download size={20} />
            Download CSV Template
          </a>
          <a
            href="https://docs.google.com/spreadsheets/create/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            <Sheet size={20} />
            Open in Google Sheets
          </a>
        </div>
        <p className="text-sm text-neutral-500 mt-4">First, download the template. Then, in Google Sheets, go to File &gt; Import to upload and use the CSV.</p>
      </div>

      {/* In-App Tool - Reframed as Demo */}
      <div className="border-t border-neutral-200 pt-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-neutral-800">See how it works: A quick entry tool</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto mt-2">Want to see how the expense tracker works before downloading the template? You can add a few example expenses here to try it out. Remember, this tool is for illustrative purposes only and your entries are stored only in this browser.</p>
        </div>

        {/* Educational Estimate Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Educational Expense Tracking</h3>
          <p className="text-blue-800 text-sm">
            This tool provides example expense tracking for educational purposes. For your official record, use the downloadable CSV template and maintain detailed receipts for all divorce-related expenses.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="text-sage-600" size={24} />
              <h3 className="font-semibold text-neutral-800">Total Expenses</h3>
            </div>
            <div className="text-2xl font-bold text-sage-600">${summary.total.toLocaleString()}</div>
            <div className="text-sm text-neutral-600 mt-1">{dateRange === 'all' ? 'All time' : `Last ${dateRange}`}</div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Receipt className="text-red-600" size={24} />
              <h3 className="font-semibold text-neutral-800">Legal Fees</h3>
            </div>
            <div className="text-2xl font-bold text-red-600">${summary.legal.toLocaleString()}</div>
            <div className="text-sm text-neutral-600 mt-1">{summary.total > 0 ? Math.round((summary.legal / summary.total) * 100) : 0}% of total</div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-green-600" size={24} />
              <h3 className="font-semibold text-neutral-800">Reimbursable</h3>
            </div>
            <div className="text-2xl font-bold text-green-600">${summary.reimbursable.toLocaleString()}</div>
            <div className="text-sm text-neutral-600 mt-1">From spouse/other party</div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <PieChart className="text-blue-600" size={24} />
              <h3 className="font-semibold text-neutral-800">Tax Deductible</h3>
            </div>
            <div className="text-2xl font-bold text-blue-600">${summary.deductible.toLocaleString()}</div>
            <div className="text-sm text-neutral-600 mt-1">Potential tax savings</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 items-center flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage-500"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-neutral-500" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage-500"
              >
                <option value="all">All categories</option>
                {expenseCategories.map(category => (
                  <option key={category.name} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage-500"
            >
              <option value="month">Last month</option>
              <option value="quarter">Last 3 months</option>
              <option value="year">Last year</option>
              <option value="all">All time</option>
            </select>
          </div>

          <div className="flex gap-3">
            <div className="bg-neutral-100 rounded-lg p-1 flex">
              {[
                { value: 'list', label: 'List', icon: Receipt },
                { value: 'summary', label: 'Summary', icon: BarChart3 }
              ].map(mode => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.value}
                    onClick={() => setViewMode(mode.value as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      viewMode === mode.value 
                        ? 'bg-white text-sage-900 shadow-sm' 
                        : 'text-neutral-600 hover:text-neutral-800'
                    }`}
                  >
                    <Icon size={16} />
                    {mode.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIsAddingExpense(true)}
              className="flex items-center gap-2 bg-sage-600 text-white px-6 py-3 rounded-lg hover:bg-sage-700 transition-colors"
            >
              <Plus size={20} />
              Add Example Expense
            </button>
            
            <button 
              onClick={exportExpenses}
              className="flex items-center gap-2 bg-white text-sage-600 border border-sage-300 px-6 py-3 rounded-lg hover:bg-sage-50 transition-colors">
              <Download size={20} />
              Export Entries
            </button>
          </div>
        </div>

        {/* Add Expense Form */}
        {isAddingExpense && (
          <div className="bg-white border border-neutral-200 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-neutral-800 mb-6">Add new expense</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newExpense.date?.toISOString().split('T')[0]}
                    onChange={(e) => setNewExpense({...newExpense, date: new Date(e.target.value)})}
                    className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({...newExpense, category: e.target.value, subcategory: ''})}
                    className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage-500"
                  >
                    <option value="">Select category</option>
                    {expenseCategories.map(category => (
                      <option key={category.name} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                </div>

                {newExpense.category && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Subcategory</label>
                    <select
                      value={newExpense.subcategory || ''}
                      onChange={(e) => setNewExpense({...newExpense, subcategory: e.target.value})}
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage-500"
                    >
                      <option value="">Select subcategory</option>
                      {expenseCategories.find(cat => cat.name === newExpense.category)?.subcategories.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Payment method</label>
                  <select
                    value={newExpense.paymentMethod}
                    onChange={(e) => setNewExpense({...newExpense, paymentMethod: e.target.value})}
                    className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage-500"
                  >
                    <option value="cash">Cash</option>
                    <option value="credit">Credit card</option>
                    <option value="debit">Debit card</option>
                    <option value="check">Check</option>
                    <option value="bank">Bank transfer</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
                  <input
                    type="text"
                    placeholder="Brief description of the expense"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Amount ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={newExpense.amount || ''}
                    onChange={(e) => setNewExpense({...newExpense, amount: parseFloat(e.target.value) || 0})}
                    className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage-500"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newExpense.isRecurring}
                      onChange={(e) => setNewExpense({...newExpense, isRecurring: e.target.checked})}
                      className="text-sage-600"
                    />
                    <span className="text-sm text-neutral-700">Recurring expense</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newExpense.isReimbursable}
                      onChange={(e) => setNewExpense({...newExpense, isReimbursable: e.target.checked})}
                      className="text-green-600"
                    />
                    <span className="text-sm text-neutral-700">Reimbursable by spouse/other party</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newExpense.isDeductible}
                      onChange={(e) => setNewExpense({...newExpense, isDeductible: e.target.checked})}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-neutral-700">Tax deductible</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Additional notes</label>
                  <textarea
                    rows={4}
                    placeholder="Any additional details about this expense..."
                    className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage-500"
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={addExpense}
                    disabled={!newExpense.category || !newExpense.description || !newExpense.amount}
                    className="flex-1 bg-sage-600 text-white px-6 py-3 rounded-lg hover:bg-sage-700 transition-colors disabled:bg-neutral-300"
                  >
                    Save expense
                  </button>
                  <button
                    onClick={() => setIsAddingExpense(false)}
                    className="px-6 py-3 text-neutral-600 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Summary View */}
        {viewMode === 'summary' && (
          <div className="bg-white border border-neutral-200 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-neutral-800 mb-6">Expense breakdown by category</h3>
            <div className="space-y-4">
              {summary.categoryTotals.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${category.color}`}>
                      {category.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-neutral-800">${category.amount.toLocaleString()}</div>
                    <div className="text-sm text-neutral-600">
                      {summary.total > 0 ? Math.round((category.amount / summary.total) * 100) : 0}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expenses List */}
        {viewMode === 'list' && (
          <div className="space-y-6">
            {filteredExpenses.length > 0 ? (
              <div className="space-y-4">
                {filteredExpenses.map((expense) => (
                  <div key={expense.id} className="bg-white border border-neutral-200 rounded-xl p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(expense.category)}`}>
                            {expense.category}
                          </span>
                          {expense.subcategory && (
                            <span className="text-sm text-neutral-600">• {expense.subcategory}</span>
                          )}
                          <span className="text-sm text-neutral-500">
                            {expense.date.toLocaleDateString()}
                          </span>
                        </div>
                        
                        <h3 className="font-semibold text-neutral-800 mb-2">{expense.description}</h3>
                        
                        <div className="flex items-center gap-4 text-sm text-neutral-600">
                          <span>Paid by {expense.paymentMethod}</span>
                          {expense.isReimbursable && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Reimbursable</span>
                          )}
                          {expense.isDeductible && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Tax deductible</span>
                          )}
                          {expense.isRecurring && (
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Recurring</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-sage-600">${expense.amount.toLocaleString()}</div>
                        <button
                          onClick={() => deleteExpense(expense.id)}
                          className="text-neutral-400 hover:text-red-600 transition-colors mt-2"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Receipt className="mx-auto text-neutral-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-neutral-600 mb-2">No example expenses recorded</h3>
                <p className="text-neutral-500 mb-4">Start tracking your divorce-related expenses</p>
                <button
                  onClick={() => setIsAddingExpense(true)}
                  className="bg-sage-600 text-white px-6 py-3 rounded-lg hover:bg-sage-700 transition-colors"
                >
                  Add Your First Example
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tax Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-blue-600 mt-1 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Tax considerations</h3>
              <div className="text-blue-800 space-y-2 text-sm">
                <p>• Legal fees for divorce proceedings may be tax deductible in certain circumstances</p>
                <p>• Keep detailed records and receipts for all divorce-related expenses</p>
                <p>• Consult with a tax professional about which expenses qualify for deductions</p>
                <p>• Alimony payments may be deductible for the payer and taxable for the recipient</p>
                <p>• Child support payments are neither deductible nor taxable income</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
