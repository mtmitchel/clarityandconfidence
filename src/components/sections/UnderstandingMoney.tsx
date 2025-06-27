import React, { useState, useEffect } from 'react';
import { Plus, Trash2, DollarSign, Calculator } from 'lucide-react';
import { 
  saveAssetDebtList, 
  loadAssetDebtList, 
  saveChildSupportData, 
  loadChildSupportData,
  clearStorageSection,
  STORAGE_KEYS,
  AssetDebtItem,
  ChildSupportData 
} from '../../lib/storage';

const UnderstandingMoney: React.FC = () => {
  // Assets and Debts State
  const [assetDebtItems, setAssetDebtItems] = useState<AssetDebtItem[]>([]);
  const [newItem, setNewItem] = useState({
    name: '',
    value: '',
    category: 'asset' as 'asset' | 'debt',
    type: 'checking-account'
  });

  // Child Support State
  const [childSupportData, setChildSupportData] = useState<ChildSupportData>({
    parent1Income: 0,
    parent2Income: 0,
    numberOfChildren: 1,
    residentialParent: 'parent1',
    estimatedSupport: 0,
    lastCalculated: '',
  });

  const [showClearAssets, setShowClearAssets] = useState(false);
  const [showClearSupport, setShowClearSupport] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    setAssetDebtItems(loadAssetDebtList());
    setChildSupportData(loadChildSupportData());
  }, []);

  // Asset/Debt Management
  const assetTypes = [
    'checking-account', 'savings-account', 'retirement-401k', 'retirement-ira', 
    'home', 'vehicle', 'investment-account', 'business', 'other'
  ];

  const debtTypes = [
    'credit-card', 'mortgage', 'car-loan', 'student-loan', 'personal-loan', 
    'medical-debt', 'business-debt', 'other'
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(amount);
  };

  const addAssetDebtItem = () => {
    if (newItem.name && newItem.value) {
      const item: AssetDebtItem = {
        id: Date.now().toString(),
        name: newItem.name,
        value: parseFloat(newItem.value),
        category: newItem.category,
        type: newItem.type,
        createdAt: new Date().toISOString(),
      };
      
      const updatedItems = [...assetDebtItems, item];
      setAssetDebtItems(updatedItems);
      saveAssetDebtList(updatedItems);
      
      setNewItem({ name: '', value: '', category: 'asset', type: 'checking-account' });
    }
  };

  const removeAssetDebtItem = (id: string) => {
    const updatedItems = assetDebtItems.filter(item => item.id !== id);
    setAssetDebtItems(updatedItems);
    saveAssetDebtList(updatedItems);
  };

  const getTotalAssets = () => {
    return assetDebtItems
      .filter(item => item.category === 'asset')
      .reduce((sum, item) => sum + item.value, 0);
  };

  const getTotalDebts = () => {
    return assetDebtItems
      .filter(item => item.category === 'debt')
      .reduce((sum, item) => sum + item.value, 0);
  };

  const getNetWorth = () => getTotalAssets() - getTotalDebts();

  // Child Support Calculator (Ohio Guidelines)
  const calculateChildSupport = () => {
    const { parent1Income, parent2Income, numberOfChildren, residentialParent } = childSupportData;
    
    if (parent1Income <= 0 || parent2Income <= 0) return 0;

    const totalIncome = parent1Income + parent2Income;
    const nonResidentialIncome = residentialParent === 'parent1' ? parent2Income : parent1Income;
    const nonResidentialPercentage = nonResidentialIncome / totalIncome;

    // Simplified Ohio child support calculation
    // These are approximate percentages based on Ohio guidelines
    const supportPercentages = [0, 0.14, 0.20, 0.25, 0.27, 0.29, 0.31];
    const basePercentage = supportPercentages[Math.min(numberOfChildren, 6)];
    
    const estimatedSupport = Math.round(nonResidentialIncome * basePercentage / 12);
    
    const updatedData = {
      ...childSupportData,
      estimatedSupport,
      lastCalculated: new Date().toISOString(),
    };
    
    setChildSupportData(updatedData);
    saveChildSupportData(updatedData);
    
    return estimatedSupport;
  };

  const clearAssetsSection = () => {
    if (showClearAssets) {
      clearStorageSection(STORAGE_KEYS.ASSETS_DEBTS);
      setAssetDebtItems([]);
      setShowClearAssets(false);
    } else {
      setShowClearAssets(true);
    }
  };

  const clearSupportSection = () => {
    if (showClearSupport) {
      clearStorageSection(STORAGE_KEYS.CHILD_SUPPORT);
      setChildSupportData({
        parent1Income: 0,
        parent2Income: 0,
        numberOfChildren: 1,
        residentialParent: 'parent1',
        estimatedSupport: 0,
        lastCalculated: '',
      });
      setShowClearSupport(false);
    } else {
      setShowClearSupport(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-calm-800">Understanding your money</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Getting a clear picture of your financial situation helps you make informed decisions. 
          Take your time with this - you can always come back and update information.
        </p>
      </div>

      {/* Assets and Debts Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <DollarSign className="text-calm-600" size={28} />
          <h2 className="text-2xl font-medium text-calm-800">Assets and debts inventory</h2>
        </div>

        {/* Add New Item */}
        <div className="bg-calm-50 border border-calm-200 rounded-lg p-6">
          <h3 className="font-medium text-calm-800 mb-4">Add an asset or debt</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Item name</label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="e.g., Main checking account"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-calm-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Value</label>
              <input
                type="number"
                value={newItem.value}
                onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
                placeholder="0"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-calm-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ 
                  ...newItem, 
                  category: e.target.value as 'asset' | 'debt',
                  type: e.target.value === 'asset' ? 'checking-account' : 'credit-card'
                })}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-calm-500"
              >
                <option value="asset">Asset</option>
                <option value="debt">Debt</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
              <select
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-calm-500"
              >
                {(newItem.category === 'asset' ? assetTypes : debtTypes).map(type => (
                  <option key={type} value={type}>
                    {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={addAssetDebtItem}
            disabled={!newItem.name || !newItem.value}
            className="mt-4 px-4 py-2 bg-calm-600 text-white rounded-lg hover:bg-calm-700 disabled:bg-slate-400 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Item
          </button>
        </div>

        {/* Summary */}
        {assetDebtItems.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-sage-50 border border-sage-200 rounded-lg p-4">
              <h4 className="font-medium text-sage-800">Total Assets</h4>
              <p className="text-2xl font-semibold text-sage-600">{formatCurrency(getTotalAssets())}</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-800">Total Debts</h4>
              <p className="text-2xl font-semibold text-red-600">{formatCurrency(getTotalDebts())}</p>
            </div>
            <div className="bg-calm-50 border border-calm-200 rounded-lg p-4">
              <h4 className="font-medium text-calm-800">Net Worth</h4>
              <p className={`text-2xl font-semibold ${getNetWorth() >= 0 ? 'text-sage-600' : 'text-red-600'}`}>
                {formatCurrency(getNetWorth())}
              </p>
            </div>
          </div>
        )}

        {/* Items List */}
        {assetDebtItems.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium text-slate-800">Your items</h3>
            <div className="space-y-2">
              {assetDebtItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-slate-800">{item.name}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.category === 'asset' 
                          ? 'bg-sage-100 text-sage-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {item.category}
                      </span>
                      <span className="text-sm text-slate-500 capitalize">
                        {item.type.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-slate-800">{formatCurrency(item.value)}</span>
                    <button
                      onClick={() => removeAssetDebtItem(item.id)}
                      className="p-1 text-slate-400 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clear Assets Section */}
        <div className="border-t border-slate-200 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-slate-800">Clear assets and debts</h3>
              <p className="text-sm text-slate-600">This will permanently delete all your financial items.</p>
            </div>
            <button
              onClick={clearAssetsSection}
              className={`
                px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2
                ${showClearAssets 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                }
              `}
            >
              <Trash2 size={16} />
              {showClearAssets ? 'Confirm: Clear everything' : 'Clear this section'}
            </button>
          </div>
        </div>
      </section>

      {/* Child Support Calculator Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Calculator className="text-sage-600" size={28} />
          <h2 className="text-2xl font-medium text-sage-800">Ohio child support estimator</h2>
        </div>

        <div className="bg-sage-50 border border-sage-200 rounded-lg p-6">
          <p className="text-sage-700 mb-6">
            This calculator provides an estimate based on Ohio child support guidelines. 
            Actual amounts may vary based on additional factors like health insurance, daycare costs, and custody arrangements.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Parent 1 annual gross income
                </label>
                <input
                  type="number"
                  value={childSupportData.parent1Income || ''}
                  onChange={(e) => setChildSupportData({
                    ...childSupportData,
                    parent1Income: parseFloat(e.target.value) || 0
                  })}
                  placeholder="0"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sage-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Parent 2 annual gross income
                </label>
                <input
                  type="number"
                  value={childSupportData.parent2Income || ''}
                  onChange={(e) => setChildSupportData({
                    ...childSupportData,
                    parent2Income: parseFloat(e.target.value) || 0
                  })}
                  placeholder="0"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sage-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Number of children
                </label>
                <select
                  value={childSupportData.numberOfChildren}
                  onChange={(e) => setChildSupportData({
                    ...childSupportData,
                    numberOfChildren: parseInt(e.target.value)
                  })}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sage-500"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Residential parent (children live primarily with)
                </label>
                <select
                  value={childSupportData.residentialParent}
                  onChange={(e) => setChildSupportData({
                    ...childSupportData,
                    residentialParent: e.target.value as 'parent1' | 'parent2'
                  })}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sage-500"
                >
                  <option value="parent1">Parent 1</option>
                  <option value="parent2">Parent 2</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={calculateChildSupport}
              disabled={childSupportData.parent1Income <= 0 || childSupportData.parent2Income <= 0}
              className="px-6 py-3 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:bg-slate-400 font-medium"
            >
              Calculate Support
            </button>

            {childSupportData.estimatedSupport > 0 && (
              <div className="bg-white border border-sage-300 rounded-lg p-4">
                <p className="text-sm text-sage-700">Estimated monthly support:</p>
                <p className="text-2xl font-semibold text-sage-800">
                  {formatCurrency(childSupportData.estimatedSupport)}
                </p>
                {childSupportData.lastCalculated && (
                  <p className="text-xs text-slate-500 mt-1">
                    Last calculated: {new Date(childSupportData.lastCalculated).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> This is an estimate only. Actual child support amounts are determined by the court 
              and may include additional factors such as health insurance premiums, daycare costs, extraordinary medical expenses, 
              and the specific parenting time arrangement.
            </p>
          </div>
        </div>

        {/* Clear Support Section */}
        <div className="border-t border-slate-200 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-slate-800">Clear child support data</h3>
              <p className="text-sm text-slate-600">This will reset all your child support calculations.</p>
            </div>
            <button
              onClick={clearSupportSection}
              className={`
                px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2
                ${showClearSupport 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                }
              `}
            >
              <Trash2 size={16} />
              {showClearSupport ? 'Confirm: Clear everything' : 'Clear this section'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UnderstandingMoney;
