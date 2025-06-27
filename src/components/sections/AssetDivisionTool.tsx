import React, { useState, useMemo, useRef, useEffect } from 'react';
import { DollarSign, PieChart, Users, Plus, Trash2, ArrowLeftRight, Home, Car, Landmark, Briefcase, Gift, CreditCard, Scale, Info, AlertTriangle } from 'lucide-react';
import { Asset, createDefaultAssets, calculateNetWorth, validateEquitableDistribution, migrateAsset } from '../../data/assets';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const AssetIcon = ({ type }: { type: Asset['type'] }) => {
  const iconMap = {
    home: <Home className="text-blue-500" />,
    vehicle: <Car className="text-green-500" />,
    retirement: <Landmark className="text-purple-500" />,
    bank: <DollarSign className="text-yellow-500" />,
    investment: <PieChart className="text-indigo-500" />,
    business: <Briefcase className="text-pink-500" />,
    personal: <Gift className="text-red-500" />,
    debt: <CreditCard className="text-orange-500" />,
  };
  return iconMap[type] || <DollarSign />;
};

const AssetDivisionTool: React.FC = () => {
  const [rawAssets, setRawAssets] = useLocalStorageState<Asset[]>('asset-division-data', createDefaultAssets());
  // Migrate existing assets to include propertyType
  const assets = rawAssets.map(migrateAsset);
  const setAssets = (assets: Asset[] | ((prev: Asset[]) => Asset[])) => {
    if (typeof assets === 'function') {
      setRawAssets(prev => assets(prev.map(migrateAsset)));
    } else {
      setRawAssets(assets);
    }
  };
  const [spouse1Name, setSpouse1Name] = useLocalStorageState<string>('spouse1-name', 'You');
  const [spouse2Name, setSpouse2Name] = useLocalStorageState<string>('spouse2-name', 'Other Party');
  const [newlyAddedId, setNewlyAddedId] = useState<string | null>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  useEffect(() => {
    if (newlyAddedId) {
      const ref = itemRefs.current.get(newlyAddedId);
      if (ref) {
        setTimeout(() => {
          ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100); // A small delay ensures the element is fully rendered
      }
      const timer = setTimeout(() => setNewlyAddedId(null), 2000); // Highlight for 2 seconds
      return () => clearTimeout(timer);
    }
  }, [newlyAddedId]);

  const updateAsset = (assetId: string, field: keyof Asset, value: any) => {
    setAssets(prev => prev.map(asset => 
      asset.id === assetId ? { ...asset, [field]: value } : asset
    ));
  };

  const addCustomAsset = () => {
    const newAsset: Asset = {
      id: `custom-${Date.now()}`,
      name: 'New Item',
      value: 0,
      type: 'personal',
      propertyType: 'marital',
      description: 'e.g., Jewelry, Art, Electronics',
      assignedTo: 'unassigned'
    };
    setAssets(prev => [...prev, newAsset]);
    setNewlyAddedId(newAsset.id);
  };

  const removeAsset = (assetId: string) => {
    setAssets(prev => prev.filter(asset => asset.id !== assetId));
  };

  const validation = useMemo(() => validateEquitableDistribution(assets), [assets]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-light text-sage-900">Asset & debt division tool</h1>
        <p className="text-lg sm:text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
          List your marital assets and debts to explore different scenarios for an equitable distribution under Ohio law.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

        {/* Left Column: Asset List */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Your assets & debts</CardTitle>
              <Button onClick={addCustomAsset} size="sm"><Plus size={16} className="mr-2"/>Add Item</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {assets.map((asset) => (
                <div 
                  key={asset.id} 
                  ref={el => itemRefs.current.set(asset.id, el)}
                  className={`bg-white border rounded-xl p-4 space-y-4 transition-all duration-500 ${newlyAddedId === asset.id ? 'border-blue-400 ring-2 ring-blue-200 shadow-lg' : 'border-slate-200'}`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    {/* Name & Type */}
                    <div className="space-y-2">
                      <Label>Item Name</Label>
                      <div className="flex items-center gap-3">
                        <span className="flex-shrink-0"><AssetIcon type={asset.type} /></span>
                        <Input
                          type="text"
                          value={asset.name}
                          onChange={(e) => updateAsset(asset.id, 'name', e.target.value)}
                          className="font-semibold text-base" />
                      </div>
                    </div>
                    {/* Value */}
                    <div className="space-y-2">
                      <Label htmlFor={`value-${asset.id}`} className="flex items-center gap-2">
                        {asset.type === 'debt' ? 'Amount Owed' : 'Estimated Value'}
                        {asset.type !== 'debt' && (
                          <div className="group relative">
                            <Info className="text-blue-500 cursor-help" size={16} />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                              {asset.type === 'home' && 'Use recent appraisal, online estimates (Zillow, Realtor.com), or tax assessment'}
                              {asset.type === 'vehicle' && 'Check Kelley Blue Book, Edmunds, or similar valuation sites'}
                              {asset.type === 'retirement' && 'Use current account statements or contact plan administrator'}
                              {asset.type === 'bank' && 'Use most recent account statements'}
                              {asset.type === 'investment' && 'Use current market value from brokerage statements'}
                              {asset.type === 'business' && 'Consider professional business valuation'}
                              {asset.type === 'personal' && 'Use fair market value or replacement cost'}
                            </div>
                          </div>
                        )}
                      </Label>
                      <Input
                        id={`value-${asset.id}`}
                        type="number"
                        value={asset.value || ''}
                        onChange={(e) => updateAsset(asset.id, 'value', Number(e.target.value))}
                        placeholder="$0"
                      />
                    </div>
                    {/* Property Type */}
                    <div className="space-y-2">
                      <Label>Property Type</Label>
                      <Select value={asset.propertyType} onValueChange={(value) => updateAsset(asset.id, 'propertyType', value)}>
                        <SelectTrigger className="text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marital">Marital</SelectItem>
                          <SelectItem value="spouse1-separate">Your separate</SelectItem>
                          <SelectItem value="spouse2-separate">Spouse's separate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Assignment Buttons - Only for marital property */}
                  {asset.propertyType === 'marital' ? (
                    <div className="space-y-2">
                       <Label>Assign To</Label>
                       <div className="flex flex-wrap gap-2">
                          <Button 
                            variant={asset.assignedTo === 'spouse1' ? 'default' : 'outline'}
                            onClick={() => updateAsset(asset.id, 'assignedTo', 'spouse1')}
                            className="flex-1"
                          >
                            {spouse1Name}
                          </Button>
                          <Button 
                            variant={asset.assignedTo === 'spouse2' ? 'default' : 'outline'}
                            onClick={() => updateAsset(asset.id, 'assignedTo', 'spouse2')}
                            className="flex-1"
                          >
                            {spouse2Name}
                          </Button>
                          <Button 
                            variant={asset.assignedTo === 'split' ? 'default' : 'outline'}
                            onClick={() => updateAsset(asset.id, 'assignedTo', 'split')}
                            className="flex-1"
                          >
                            Split 50/50
                          </Button>
                       </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                      <p className="text-sm text-neutral-600">
                        {asset.propertyType === 'spouse1-separate' ? `This belongs to ${spouse1Name} (separate property)` : 
                         asset.propertyType === 'spouse2-separate' ? `This belongs to ${spouse2Name} (separate property)` : 
                         'Separate property is not subject to division'}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <Select value={asset.type} onValueChange={(value) => updateAsset(asset.id, 'type', value)}>
                      <SelectTrigger className="w-[150px] text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="vehicle">Vehicle</SelectItem>
                        <SelectItem value="retirement">Retirement</SelectItem>
                        <SelectItem value="bank">Bank Account</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="personal">Personal Property</SelectItem>
                        <SelectItem value="debt">Debt</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="sm" onClick={() => removeAsset(asset.id)} className="text-red-500 hover:text-red-600">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Summary & Settings */}
        <div className="lg:col-span-2 space-y-6 sticky top-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><PieChart size={20}/>Distribution summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Educational Estimate Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="text-sm font-semibold text-blue-900 mb-1">Educational Estimates</h4>
                <p className="text-blue-800 text-xs">
                  These division scenarios are for planning purposes only. Actual asset division requires professional legal and financial guidance.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-800">{formatCurrency(validation.spouse1NetWorth)}</div>
                  <Label className="text-sm text-blue-700">{spouse1Name}'s Net Worth</Label>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-800">{formatCurrency(validation.spouse2NetWorth)}</div>
                  <Label className="text-sm text-green-700">{spouse2Name}'s Net Worth</Label>
                </div>
              </div>
              <div className="text-center p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <div className="text-2xl font-bold text-neutral-800">{formatCurrency(validation.totalNetWorth)}</div>
                <Label className="text-sm text-neutral-700">Total Net Worth</Label>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="text-2xl font-bold text-amber-800">{formatCurrency(validation.maritalNetWorth)}</div>
                <Label className="text-sm text-amber-700">Marital Property Net Worth</Label>
                <p className="text-xs text-amber-600 mt-1">Only marital property is subject to division</p>
              </div>

              {/* Balance Indicator */}
              {validation.totalNetWorth !== 0 && (
                <div className={`mt-4 p-4 rounded-lg border ${validation.isBalanced ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold text-lg ${validation.isBalanced ? 'text-green-800' : 'text-amber-800'}`}>
                      {validation.isBalanced ? 'Balanced Distribution' : 'Uneven Distribution'}
                    </span>
                    <span className={`text-sm font-medium ${validation.isBalanced ? 'text-green-700' : 'text-amber-700'}`}>
                      {validation.percentageDiff.toFixed(1)}% Difference
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className={`h-2.5 rounded-full ${validation.isBalanced ? 'bg-green-500' : 'bg-amber-500'}`}
                      style={{ width: `${50 - (validation.percentageDiff / 2)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><Users size={20}/>Participant names</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="spouse1-name">Your Name</Label>
                <Input id="spouse1-name" type="text" value={spouse1Name} onChange={(e) => setSpouse1Name(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="spouse2-name">Other Party's Name</Label>
                <Input id="spouse2-name" type="text" value={spouse2Name} onChange={(e) => setSpouse2Name(e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Property Type Help */}
      <Alert className="bg-blue-50 border-blue-200 mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle className="font-semibold">Understanding property types</AlertTitle>
        <AlertDescription>
          <div className="space-y-2 mt-2">
            <p><strong>Marital Property:</strong> Assets and debts acquired during the marriage (subject to division)</p>
            <p><strong>Your Separate:</strong> Assets you owned before marriage, inheritances, or gifts to you alone</p>
            <p><strong>Spouse's Separate:</strong> Assets your spouse owned before marriage, inheritances, or gifts to them alone</p>
            <p className="text-sm text-blue-700 mt-3"><strong>Note:</strong> For estimated values, consider recent appraisals for homes, Kelley Blue Book for vehicles, and current account statements for financial assets.</p>
          </div>
        </AlertDescription>
      </Alert>

      {/* Legal Guidance Alert */}
      <Alert className="bg-neutral-50 border-neutral-200">
        <Scale className="h-4 w-4" />
        <AlertTitle className="font-semibold">Ohio is an equitable distribution state</AlertTitle>
        <AlertDescription>
          <p>This means marital property is divided fairly and equitably, but not always 50/50. Courts consider factors like marriage duration, each person's assets, and contributions to the marriage. Only marital property is subject to division - separate property typically remains with its original owner.</p>
          <p className="mt-2 text-sm font-medium">This tool helps you model potential scenarios but is not a substitute for legal advice.</p>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AssetDivisionTool;
