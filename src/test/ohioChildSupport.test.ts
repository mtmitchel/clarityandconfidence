import { describe, it, expect } from 'vitest'
import { calculateOhioChildSupport, OhioChildSupportInputs } from '../lib/ohioChildSupport'

describe('Ohio Child Support Calculator', () => {
  it('calculates basic support for 1 child correctly', () => {
    const inputs: OhioChildSupportInputs = {
      parent1GrossAnnualIncome: 50000,
      parent2GrossAnnualIncome: 30000,
      numberOfChildren: 1,
      overnightsWithParent1: 280,
      overnightsWithParent2: 85
    }
    
    const result = calculateOhioChildSupport(inputs)
    
    // Combined income: $80,000
    // 14.2% for 1 child = $11,360/year
    // Parent 2 income percentage: 30k/80k = 37.5%
    // Parent 2 support: $11,360 × 37.5% = $4,260/year = $355/month
    expect(result.basicSupport).toBe(355)
    expect(result.payingParent).toBe('parent2')
    expect(result.totalSupport).toBe(355)
  })

  it('applies shared parenting adjustment', () => {
    const inputs: OhioChildSupportInputs = {
      parent1GrossAnnualIncome: 50000,
      parent2GrossAnnualIncome: 30000,
      numberOfChildren: 1,
      overnightsWithParent1: 183,
      overnightsWithParent2: 182
    }
    
    const result = calculateOhioChildSupport(inputs)
    
    // Should have shared parenting adjustment since parent2 has >90 overnights
    expect(result.warnings.some(w => w.includes('Shared parenting'))).toBe(true)
    expect(result.totalSupport).toBeLessThan(355) // Should be less than standard calculation
  })

  it('validates input data', () => {
    const invalidInputs: OhioChildSupportInputs = {
      parent1GrossAnnualIncome: -1000,
      parent2GrossAnnualIncome: 30000,
      numberOfChildren: 1,
      overnightsWithParent1: 280,
      overnightsWithParent2: 85
    }
    
    expect(() => calculateOhioChildSupport(invalidInputs)).toThrow('Both parent incomes must be greater than zero')
  })

  it('includes health insurance costs', () => {
    const inputs: OhioChildSupportInputs = {
      parent1GrossAnnualIncome: 50000,
      parent2GrossAnnualIncome: 30000,
      numberOfChildren: 1,
      overnightsWithParent1: 280,
      overnightsWithParent2: 85,
      healthInsuranceCost: 1200 // Annual
    }
    
    const result = calculateOhioChildSupport(inputs)
    
    // Should include proportional share of health insurance (37.5% of $1200/year = $37.50/month)
    expect(result.totalSupport).toBeGreaterThan(result.basicSupport)
  })

  it('handles multiple children correctly', () => {
    const inputs: OhioChildSupportInputs = {
      parent1GrossAnnualIncome: 50000,
      parent2GrossAnnualIncome: 30000,
      numberOfChildren: 2,
      overnightsWithParent1: 280,
      overnightsWithParent2: 85
    }
    
    const result = calculateOhioChildSupport(inputs)
    
    // 20.6% for 2 children should result in higher support than 1 child
    expect(result.basicSupport).toBeGreaterThan(355)
  })

  it('warns about extreme incomes', () => {
    const lowIncomeInputs: OhioChildSupportInputs = {
      parent1GrossAnnualIncome: 8000,
      parent2GrossAnnualIncome: 6000,
      numberOfChildren: 1,
      overnightsWithParent1: 280,
      overnightsWithParent2: 85
    }
    
    const result = calculateOhioChildSupport(lowIncomeInputs)
    
    expect(result.warnings.some(w => w.includes('below typical'))).toBe(true)
  })
})
