export interface Asset {
  id: string;
  name: string;
  value: number;
  type: 'home' | 'vehicle' | 'retirement' | 'investment' | 'bank' | 'business' | 'personal' | 'debt';
  propertyType: 'marital' | 'spouse1-separate' | 'spouse2-separate';
  description?: string;
  assignedTo: 'spouse1' | 'spouse2' | 'split' | 'unassigned';
}

export interface AssetDivisionScenario {
  id: string;
  name: string;
  assets: Asset[];
  spouse1Name: string;
  spouse2Name: string;
}

// Helper function to migrate old assets without propertyType
export const migrateAsset = (asset: any): Asset => {
  if (!asset.propertyType) {
    return { ...asset, propertyType: 'marital' };
  }
  return asset;
};

export const createDefaultAssets = (): Asset[] => [
  {
    id: 'home-equity',
    name: 'Home Equity',
    value: 350000,
    type: 'home',
    propertyType: 'marital',
    description: 'Market value of home minus outstanding mortgage',
    assignedTo: 'unassigned'
  },
  {
    id: 'your-retirement',
    name: 'Your Retirement Account(s)',
    value: 150000,
    type: 'retirement',
    propertyType: 'marital',
    description: 'e.g., 401(k), IRA',
    assignedTo: 'spouse1'
  },
  {
    id: 'spouse-retirement',
    name: "Spouse's Retirement Account(s)",
    value: 120000,
    type: 'retirement',
    propertyType: 'marital',
    description: 'e.g., 401(k), IRA',
    assignedTo: 'spouse2'
  },
  {
    id: 'joint-savings',
    name: 'Joint Bank Accounts',
    value: 50000,
    type: 'bank',
    propertyType: 'marital',
    description: 'Savings, checking, etc.',
    assignedTo: 'unassigned'
  },
  {
    id: 'vehicle-1',
    name: 'Primary Vehicle',
    value: 25000,
    type: 'vehicle',
    propertyType: 'marital',
    description: 'e.g., Honda CR-V',
    assignedTo: 'unassigned'
  },
  {
    id: 'credit-card-debt',
    name: 'Credit Card Debt',
    value: 15000,
    type: 'debt',
    propertyType: 'marital',
    description: 'Total outstanding balance',
    assignedTo: 'split'
  }
];

export const calculateNetWorth = (assets: Asset[], assignedTo: 'spouse1' | 'spouse2') => {
  let totalValue = 0;

  assets.forEach(asset => {
    const value = asset.type === 'debt' ? -asset.value : asset.value;

    // Handle separate property first
    if (asset.propertyType === 'spouse1-separate' && assignedTo === 'spouse1') {
      totalValue += value;
      return;
    }
    if (asset.propertyType === 'spouse2-separate' && assignedTo === 'spouse2') {
      totalValue += value;
      return;
    }
    
    // Only divide marital property based on assignment
    if (asset.propertyType === 'marital') {
      if (asset.assignedTo === assignedTo) {
        totalValue += value;
      } else if (asset.assignedTo === 'split') {
        totalValue += value / 2;
      }
    }
  });

  return totalValue;
};

export const getAssetsByType = (assets: Asset[], type: Asset['type']) => {
  return assets.filter(asset => asset.type === type);
};

export const validateEquitableDistribution = (assets: Asset[]) => {
  const spouse1NetWorth = calculateNetWorth(assets, 'spouse1');
  const spouse2NetWorth = calculateNetWorth(assets, 'spouse2');
  const totalNetWorth = spouse1NetWorth + spouse2NetWorth;
  
  // Calculate marital net worth for percentage calculations (excluding separate property)
  const maritalAssets = assets.filter(a => a.propertyType === 'marital');
  const maritalNetWorth = maritalAssets.reduce((sum, asset) => {
    const value = asset.type === 'debt' ? -asset.value : asset.value;
    return sum + value;
  }, 0);
  
  if (totalNetWorth === 0) return { 
    isBalanced: true, 
    difference: 0, 
    percentageDiff: 0, 
    spouse1NetWorth, 
    spouse2NetWorth, 
    totalNetWorth,
    maritalNetWorth 
  };
  
  const difference = Math.abs(spouse1NetWorth - spouse2NetWorth);
  // Use total marital assets for percentage calculation
  const totalMaritalAssetsValue = maritalAssets.filter(a => a.type !== 'debt').reduce((sum, a) => sum + a.value, 0);

  const percentageDiff = totalMaritalAssetsValue > 0 ? (difference / totalMaritalAssetsValue) * 100 : 0;
  
  return {
    isBalanced: percentageDiff <= 10, // Within 10% is a stricter, better goal
    difference,
    percentageDiff,
    spouse1NetWorth,
    spouse2NetWorth,
    totalNetWorth,
    maritalNetWorth
  };
};
