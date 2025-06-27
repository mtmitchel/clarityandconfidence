// Local storage utilities for The Clarity and Confidence Tool
// All data stays on the user's device only

export const STORAGE_KEYS = {
  JOURNAL_ENTRY: 'clarity_tool_journal',
  ASSETS_DEBTS: 'clarity_tool_assets_debts',
  CHILD_SUPPORT: 'clarity_tool_child_support',
  LEGAL_PATH: 'clarity_tool_legal_path',
  PARENTING_CHECKLIST: 'clarity_tool_parenting_checklist',
  USER_PREFERENCES: 'clarity_tool_preferences',
  MOOD_TRACKING: 'clarity_tool_mood_tracking',
  DASHBOARD_DATA: 'clarity_tool_dashboard',
  TIMELINE_DATA: 'clarity_tool_timeline',
  FINANCIAL_GOALS: 'clarity_tool_financial_goals',
} as const;

export interface JournalEntry {
  content: string;
  lastUpdated: string;
}

export interface AssetDebtItem {
  id: string;
  name: string;
  value: number;
  category: 'asset' | 'debt';
  type: string;
  createdAt: string;
}

export interface ChildSupportData {
  parent1Income: number;
  parent2Income: number;
  numberOfChildren: number;
  residentialParent: 'parent1' | 'parent2';
  estimatedSupport: number;
  lastCalculated: string;
}

export interface LegalPathData {
  hasChildren: boolean | null;
  agreesOnTerms: boolean | null;
  conflictLevel: boolean | null;
  recommendation: 'dissolution' | 'divorce' | null;
  lastUpdated: string;
}

export interface ParentingChecklistItem {
  id: string;
  category: string;
  item: string;
  completed: boolean;
  notes?: string;
}

// New interfaces for enhanced features
export interface MoodEntry {
  id: string;
  date: string;
  mood: number; // 1-10 scale
  notes?: string;
  energy: number; // 1-10 scale
  stress: number; // 1-10 scale
  activities?: string[];
}

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  completed: boolean;
  category: 'legal' | 'financial' | 'personal' | 'children';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  completedAt?: string;
}

export interface DashboardData {
  lastUpdated: string;
  sectionsCompleted: string[];
  totalProgress: number;
  weeklyMoodAverage?: number;
  urgentTasks: number;
  upcomingDeadlines: number;
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string;
  category: 'emergency-fund' | 'moving-costs' | 'legal-fees' | 'debt-reduction' | 'other';
  createdAt: string;
}

// Generic storage functions
export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored === null) return defaultValue;
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

export const clearStorageSection = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

export const clearAllStorage = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing all localStorage:', error);
  }
};

// Data export functionality for backup
export const exportAllData = (): string => {
  try {
    const allData: Record<string, any> = {};
    Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
      const data = localStorage.getItem(key);
      if (data) {
        allData[name] = JSON.parse(data);
      }
    });
    
    return JSON.stringify({
      exported: new Date().toISOString(),
      data: allData
    }, null, 2);
  } catch (error) {
    console.error('Error exporting data:', error);
    return '';
  }
};

export const importAllData = (jsonData: string): boolean => {
  try {
    const parsed = JSON.parse(jsonData);
    if (parsed.data) {
      Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
        if (parsed.data[name]) {
          localStorage.setItem(key, JSON.stringify(parsed.data[name]));
        }
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

// Specific storage functions
export const saveJournalEntry = (content: string): void => {
  const entry: JournalEntry = {
    content,
    lastUpdated: new Date().toISOString(),
  };
  saveToStorage(STORAGE_KEYS.JOURNAL_ENTRY, entry);
};

export const loadJournalEntry = (): JournalEntry => {
  return loadFromStorage(STORAGE_KEYS.JOURNAL_ENTRY, {
    content: '',
    lastUpdated: '',
  });
};

export const saveAssetDebtList = (items: AssetDebtItem[]): void => {
  saveToStorage(STORAGE_KEYS.ASSETS_DEBTS, items);
};

export const loadAssetDebtList = (): AssetDebtItem[] => {
  return loadFromStorage(STORAGE_KEYS.ASSETS_DEBTS, []);
};

export const saveChildSupportData = (data: ChildSupportData): void => {
  saveToStorage(STORAGE_KEYS.CHILD_SUPPORT, data);
};

export const loadChildSupportData = (): ChildSupportData => {
  return loadFromStorage(STORAGE_KEYS.CHILD_SUPPORT, {
    parent1Income: 0,
    parent2Income: 0,
    numberOfChildren: 1,
    residentialParent: 'parent1',
    estimatedSupport: 0,
    lastCalculated: '',
  });
};

export const saveLegalPathData = (data: LegalPathData): void => {
  saveToStorage(STORAGE_KEYS.LEGAL_PATH, data);
};

export const loadLegalPathData = (): LegalPathData => {
  return loadFromStorage(STORAGE_KEYS.LEGAL_PATH, {
    hasChildren: null,
    agreesOnTerms: null,
    conflictLevel: null,
    recommendation: null,
    lastUpdated: '',
  });
};

export const saveParentingChecklist = (items: ParentingChecklistItem[]): void => {
  saveToStorage(STORAGE_KEYS.PARENTING_CHECKLIST, items);
};

export const loadParentingChecklist = (): ParentingChecklistItem[] => {
  return loadFromStorage(STORAGE_KEYS.PARENTING_CHECKLIST, []);
};

// New storage functions for enhanced features
export const saveMoodEntries = (entries: MoodEntry[]): void => {
  saveToStorage(STORAGE_KEYS.MOOD_TRACKING, entries);
};

export const loadMoodEntries = (): MoodEntry[] => {
  return loadFromStorage(STORAGE_KEYS.MOOD_TRACKING, []);
};

export const saveTimelineItems = (items: TimelineItem[]): void => {
  saveToStorage(STORAGE_KEYS.TIMELINE_DATA, items);
};

export const loadTimelineItems = (): TimelineItem[] => {
  return loadFromStorage(STORAGE_KEYS.TIMELINE_DATA, []);
};

export const saveDashboardData = (data: DashboardData): void => {
  saveToStorage(STORAGE_KEYS.DASHBOARD_DATA, data);
};

export const loadDashboardData = (): DashboardData => {
  return loadFromStorage(STORAGE_KEYS.DASHBOARD_DATA, {
    lastUpdated: '',
    sectionsCompleted: [],
    totalProgress: 0,
    urgentTasks: 0,
    upcomingDeadlines: 0,
  });
};

export const saveFinancialGoals = (goals: FinancialGoal[]): void => {
  saveToStorage(STORAGE_KEYS.FINANCIAL_GOALS, goals);
};

export const loadFinancialGoals = (): FinancialGoal[] => {
  return loadFromStorage(STORAGE_KEYS.FINANCIAL_GOALS, []);
};
