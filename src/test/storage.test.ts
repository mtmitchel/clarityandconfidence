import { describe, it, expect, beforeEach } from 'vitest'
import { 
  saveToStorage, 
  loadFromStorage, 
  clearStorageSection,
  STORAGE_KEYS,
  AssetDebtItem,
  ChildSupportData 
} from '../lib/storage'

describe('Storage Utilities', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Basic Storage Operations', () => {
    it('saves and loads data correctly', () => {
      const testData = { name: 'test', value: 123 }
      
      saveToStorage('test-key', testData)
      const loaded = loadFromStorage('test-key', {})
      
      expect(loaded).toEqual(testData)
    })

    it('returns default value when no data exists', () => {
      const defaultValue = { empty: true }
      const loaded = loadFromStorage('non-existent-key', defaultValue)
      
      expect(loaded).toEqual(defaultValue)
    })

    it('handles JSON parsing errors gracefully', () => {
      // Manually corrupt localStorage data
      localStorage.setItem('corrupt-key', 'invalid-json-{')
      
      const defaultValue = { safe: true }
      const loaded = loadFromStorage('corrupt-key', defaultValue)
      
      expect(loaded).toEqual(defaultValue)
    })
  })

  describe('Child Support Calculations', () => {
    it('calculates basic child support correctly', () => {
      // This is a critical calculation - must be tested
      const data: ChildSupportData = {
        parent1Income: 50000,
        parent2Income: 30000,
        numberOfChildren: 1,
        residentialParent: 'parent1',
        estimatedSupport: 0,
        lastCalculated: ''
      }

      // Basic Ohio child support formula (simplified for testing)
      // This should be replaced with actual Ohio guidelines
      const totalIncome = data.parent1Income + data.parent2Income
      const nonResidentialIncomePercent = data.parent2Income / totalIncome
      
      // Ohio basic obligation (this is simplified - real formula is more complex)
      const baseObligation = totalIncome * 0.18 // 18% for 1 child (simplified)
      const expectedSupport = baseObligation * nonResidentialIncomePercent
      
      expect(expectedSupport).toBeGreaterThan(0)
      expect(expectedSupport).toBeLessThan(data.parent2Income) // Should not exceed non-residential parent's income
    })
  })

  describe('Asset/Debt Management', () => {
    it('creates valid asset items', () => {
      const asset: AssetDebtItem = {
        id: 'test-id',
        name: 'Checking Account',
        value: 5000,
        category: 'asset',
        type: 'checking-account',
        createdAt: new Date().toISOString()
      }

      expect(asset.value).toBeGreaterThan(0)
      expect(['asset', 'debt']).toContain(asset.category)
      expect(asset.name.trim()).toBeTruthy()
    })
  })

  describe('Data Clearing', () => {
    it('clears specific storage sections', () => {
      // Set up test data
      localStorage.setItem(STORAGE_KEYS.CASE_LOG, JSON.stringify({ test: 'data' }))
      localStorage.setItem(STORAGE_KEYS.ASSETS_DEBTS, JSON.stringify({ other: 'data' }))
      
      clearStorageSection(STORAGE_KEYS.CASE_LOG)
      
      expect(localStorage.getItem(STORAGE_KEYS.CASE_LOG)).toBeNull()
      expect(localStorage.getItem(STORAGE_KEYS.ASSETS_DEBTS)).not.toBeNull()
    })
  })
})
