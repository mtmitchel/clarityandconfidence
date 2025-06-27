import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import QuickEscape from '../components/QuickEscape'
import { STORAGE_KEYS } from '../lib/storage'

// Mock window.location
const mockLocation = {
  href: '',
  replaceState: vi.fn()
}
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
})

// Mock window.history
Object.defineProperty(window, 'history', {
  value: {
    replaceState: vi.fn()
  },
  writable: true,
})

describe('QuickEscape', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    mockLocation.href = ''
    vi.clearAllMocks()
  })

  it('renders the quick escape button', () => {
    render(<QuickEscape />)
    
    const button = screen.getByRole('button', { name: /quick escape/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Quick Escape')
  })

  it('clears all application data when clicked', () => {
    // Set up some test data in localStorage
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.setItem(key, 'test-data')
    })
    
    // Verify data exists
    expect(localStorage.getItem(STORAGE_KEYS.CASE_LOG)).toBe('test-data')
    
    render(<QuickEscape />)
    const button = screen.getByRole('button', { name: /quick escape/i })
    
    fireEvent.click(button)
    
    // Verify all data is cleared
    Object.values(STORAGE_KEYS).forEach(key => {
      expect(localStorage.getItem(key)).toBeNull()
    })
  })

  it('redirects to Google when clicked', () => {
    render(<QuickEscape />)
    const button = screen.getByRole('button', { name: /quick escape/i })
    
    fireEvent.click(button)
    
    expect(mockLocation.href).toBe('https://www.google.com')
  })

  it('clears browser history when clicked', () => {
    render(<QuickEscape />)
    const button = screen.getByRole('button', { name: /quick escape/i })
    
    fireEvent.click(button)
    
    expect(window.history.replaceState).toHaveBeenCalledWith(
      null, 
      '', 
      'https://www.google.com'
    )
  })
})
