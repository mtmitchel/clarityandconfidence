/**
 * Data Export Utilities
 * Formats user data for various professional use cases
 */

import { STORAGE_KEYS } from './storage';

export interface ExportData {
  caseLog?: any[];
  assets?: any[];
  childSupport?: any;
  timeline?: any[];
  exportDate: string;
  exportType: string;
}

export type ExportFormat = 'attorney-pdf' | 'mediation-csv' | 'personal-json' | 'court-summary';

/**
 * Exports data in JSON format for personal backup
 */
export function exportPersonalData(): ExportData {
  const data: ExportData = {
    exportDate: new Date().toISOString(),
    exportType: 'personal-backup'
  };

  // Collect all stored data
  Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        switch (key) {
          case 'CASE_LOG':
            data.caseLog = parsed;
            break;
          case 'ASSETS_DEBTS':
            data.assets = parsed;
            break;
          case 'CHILD_SUPPORT':
            data.childSupport = parsed;
            break;
          case 'TIMELINE_DATA':
            data.timeline = parsed;
            break;
        }
      } catch (error) {
        console.warn(`Failed to parse ${storageKey}:`, error);
      }
    }
  });

  return data;
}

/**
 * Formats case log data for attorney review
 */
export function formatForAttorney(data: ExportData): string {
  let output = `CASE DOCUMENTATION SUMMARY\n`;
  output += `Generated: ${new Date(data.exportDate).toLocaleDateString()}\n\n`;
  
  output += `IMPORTANT: This document contains factual case documentation only.\n`;
  output += `All entries are user-generated and should be verified independently.\n\n`;

  if (data.caseLog && data.caseLog.length > 0) {
    output += `CASE LOG ENTRIES (${data.caseLog.length} total)\n`;
    output += `${'='.repeat(50)}\n\n`;
    
    data.caseLog.forEach((entry, index) => {
      output += `Entry ${index + 1}\n`;
      output += `Date: ${entry.date}\n`;
      output += `Type: ${entry.type}\n`;
      output += `Topic: ${entry.topic}\n`;
      if (entry.keyDecisions) output += `Key Decisions: ${entry.keyDecisions}\n`;
      if (entry.actionItems) output += `Action Items: ${entry.actionItems}\n`;
      if (entry.nextSteps) output += `Next Steps: ${entry.nextSteps}\n`;
      output += '\n';
    });
  }

  if (data.assets && data.assets.length > 0) {
    output += `ASSET AND DEBT SUMMARY\n`;
    output += `${'='.repeat(50)}\n\n`;
    
    const assets = data.assets.filter((item: any) => item.category === 'asset');
    const debts = data.assets.filter((item: any) => item.category === 'debt');
    
    if (assets.length > 0) {
      output += `ASSETS:\n`;
      assets.forEach((asset: any) => {
        output += `- ${asset.name}: $${asset.value.toLocaleString()} (${asset.type})\n`;
      });
      output += '\n';
    }
    
    if (debts.length > 0) {
      output += `DEBTS:\n`;
      debts.forEach((debt: any) => {
        output += `- ${debt.name}: $${debt.value.toLocaleString()} (${debt.type})\n`;
      });
      output += '\n';
    }
  }

  if (data.childSupport) {
    output += `CHILD SUPPORT DATA\n`;
    output += `${'='.repeat(50)}\n`;
    output += `Parent 1 Income: $${data.childSupport.parent1Income?.toLocaleString() || 'Not provided'}\n`;
    output += `Parent 2 Income: $${data.childSupport.parent2Income?.toLocaleString() || 'Not provided'}\n`;
    output += `Number of Children: ${data.childSupport.numberOfChildren || 'Not provided'}\n`;
    output += `Last Calculated: ${data.childSupport.lastCalculated || 'Never'}\n`;
    output += `Estimated Support: $${data.childSupport.estimatedSupport?.toLocaleString() || 'Not calculated'}/month\n\n`;
    output += `NOTE: This is an estimate only. Official calculations must be performed by the court.\n\n`;
  }

  return output;
}

/**
 * Downloads data as a file
 */
export function downloadData(content: string, filename: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

/**
 * Main export function
 */
export function exportData(format: ExportFormat) {
  const data = exportPersonalData();
  const timestamp = new Date().toISOString().slice(0, 10);
  
  switch (format) {
    case 'attorney-pdf': {
      const attorneyContent = formatForAttorney(data);
      downloadData(attorneyContent, `case-summary-${timestamp}.txt`, 'text/plain');
      break;
    }
      
    case 'mediation-csv': {
      // Simple CSV for now - could be enhanced
      const csvContent = formatAsCSV(data);
      downloadData(csvContent, `mediation-data-${timestamp}.csv`, 'text/csv');
      break;
    }
      
    case 'personal-json': {
      const jsonContent = JSON.stringify(data, null, 2);
      downloadData(jsonContent, `backup-${timestamp}.json`, 'application/json');
      break;
    }
      
    case 'court-summary': {
      const courtContent = formatForCourt(data);
      downloadData(courtContent, `court-summary-${timestamp}.txt`, 'text/plain');
      break;
    }
  }
}

function formatAsCSV(data: ExportData): string {
  let csv = 'Type,Date,Description,Value,Notes\n';
  
  if (data.caseLog) {
    data.caseLog.forEach(entry => {
      const row = [
        'Case Log',
        entry.date,
        `"${entry.topic}"`,
        '',
        `"${[entry.keyDecisions, entry.actionItems, entry.nextSteps].filter(Boolean).join('; ')}"`
      ];
      csv += row.join(',') + '\n';
    });
  }
  
  if (data.assets) {
    data.assets.forEach(item => {
      const row = [
        item.category === 'asset' ? 'Asset' : 'Debt',
        item.createdAt?.slice(0, 10) || '',
        `"${item.name}"`,
        item.value,
        `"${item.type}"`
      ];
      csv += row.join(',') + '\n';
    });
  }
  
  return csv;
}

function formatForCourt(data: ExportData): string {
  let output = `CASE INFORMATION SUMMARY\n`;
  output += `Prepared: ${new Date().toLocaleDateString()}\n\n`;
  
  output += `DISCLAIMER: This summary is prepared by the party for informational purposes only.\n`;
  output += `All information should be verified through official documentation.\n\n`;
  
  // Similar to attorney format but more formal
  return formatForAttorney(data);
}

export interface ComponentExportData {
  componentName: string;
  timestamp: string;
  data: any;
  userNotes?: string;
}

export const generatePDF = async (data: ComponentExportData): Promise<void> => {
  // For now, we'll create a comprehensive text-based export
  // In a production app, this would use a library like jsPDF or Puppeteer
  
  const content = generateExportContent(data);
  
  // Create a blob with the content
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  // Create a download link
  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.componentName.replace(/\s+/g, '-')}-${formatExportDate(new Date())}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const generateExportContent = (data: ComponentExportData): string => {
  const lines = [
    '═══════════════════════════════════════════════════',
    `    CLARITY AND CONFIDENCE - ${data.componentName.toUpperCase()}`,
    '           Ohio Divorce Resource Hub',
    '═══════════════════════════════════════════════════',
    '',
    `Generated: ${data.timestamp}`,
    `Component: ${data.componentName}`,
    '',
    '───────────────────────────────────────────────────',
    '                     DATA EXPORT',
    '───────────────────────────────────────────────────',
    ''
  ];

  // Add component-specific content based on component name
  switch (data.componentName) {
    case 'Settlement Comparison':
      lines.push(...formatSettlementComparison(data.data));
      break;
    case 'Post-Divorce Budget':
      lines.push(...formatBudgetData(data.data));
      break;
    case 'Asset Division':
      lines.push(...formatAssetDivision(data.data));
      break;
    case 'Child Support Calculator':
      lines.push(...formatChildSupport(data.data));
      break;
    case 'Timeline Progress':
      lines.push(...formatTimelineProgress(data.data));
      break;
    case 'Communication Log':
      lines.push(...formatCommunicationLog(data.data));
      break;
    case 'Expense Tracker':
      lines.push(...formatExpenseTracker(data.data));
      break;
    default:
      lines.push(JSON.stringify(data.data, null, 2));
  }

  if (data.userNotes) {
    lines.push('');
    lines.push('───────────────────────────────────────────────────');
    lines.push('                    NOTES');
    lines.push('───────────────────────────────────────────────────');
    lines.push('');
    lines.push(data.userNotes);
  }

  lines.push('');
  lines.push('───────────────────────────────────────────────────');
  lines.push('                   DISCLAIMER');
  lines.push('───────────────────────────────────────────────────');
  lines.push('');
  lines.push('This document contains estimates and calculations based on');
  lines.push('the information you provided. It is for educational purposes');
  lines.push('only and does not constitute legal or financial advice.');
  lines.push('');
  lines.push('Always consult with qualified professionals before making');
  lines.push('important legal or financial decisions.');
  lines.push('');
  lines.push('Generated by Clarity and Confidence - Ohio Divorce Resource Hub');
  lines.push('');

  return lines.join('\n');
};

const formatSettlementComparison = (data: any): string[] => {
  const lines = ['SETTLEMENT PROPOSAL COMPARISON', ''];
  
  if (data.proposals && Array.isArray(data.proposals)) {
    data.proposals.forEach((proposal: any, index: number) => {
      lines.push(`${proposal.name || `Proposal ${index + 1}`}:`);
      lines.push('  Assets:');
      if (proposal.assets) {
        Object.entries(proposal.assets).forEach(([key, value]) => {
          lines.push(`    ${key}: $${(value as number).toLocaleString()}`);
        });
      }
      lines.push('  Debts:');
      if (proposal.debts) {
        Object.entries(proposal.debts).forEach(([key, value]) => {
          lines.push(`    ${key}: $${(value as number).toLocaleString()}`);
        });
      }
      lines.push('  Monthly Payments:');
      if (proposal.monthlyPayments) {
        lines.push(`    Child Support: $${proposal.monthlyPayments.childSupport?.toLocaleString() || '0'}`);
        lines.push(`    Spousal Support: $${proposal.monthlyPayments.spousalSupport?.toLocaleString() || '0'}`);
        lines.push(`    Duration: ${proposal.monthlyPayments.duration || '0'} months`);
      }
      lines.push('');
    });
  }
  
  return lines;
};

const formatBudgetData = (data: any): string[] => {
  const lines = ['POST-DIVORCE BUDGET TRACKER', ''];
  
  if (data.income && Array.isArray(data.income)) {
    lines.push('MONTHLY INCOME:');
    data.income.forEach((income: any) => {
      lines.push(`  ${income.source}: $${income.monthlyAmount?.toLocaleString() || '0'} ${income.isGuaranteed ? '(Guaranteed)' : '(Variable)'}`);
    });
    lines.push('');
  }
  
  if (data.expenses && Array.isArray(data.expenses)) {
    lines.push('MONTHLY EXPENSES:');
    data.expenses.forEach((category: any) => {
      lines.push(`  ${category.name}:`);
      if (category.subcategories) {
        category.subcategories.forEach((sub: any) => {
          lines.push(`    ${sub.name}: $${sub.monthlyAmount?.toLocaleString() || '0'} ${sub.isEssential ? '(Essential)' : ''}`);
        });
      }
      lines.push('');
    });
  }
  
  if (data.totals) {
    lines.push('BUDGET SUMMARY:');
    lines.push(`  Total Income: $${data.totals.income?.toLocaleString() || '0'}`);
    lines.push(`  Total Expenses: $${data.totals.expenses?.toLocaleString() || '0'}`);
    lines.push(`  Monthly Balance: $${data.totals.balance?.toLocaleString() || '0'}`);
    lines.push('');
  }
  
  return lines;
};

const formatAssetDivision = (data: any): string[] => {
  const lines = ['ASSET DIVISION ANALYSIS', ''];
  
  if (data.assets && Array.isArray(data.assets)) {
    lines.push('ASSETS:');
    data.assets.forEach((asset: any) => {
      lines.push(`  ${asset.name}: $${asset.value?.toLocaleString() || '0'}`);
      lines.push(`    Your Share: ${asset.yourPercentage || 0}% ($${((asset.value || 0) * (asset.yourPercentage || 0) / 100).toLocaleString()})`);
      lines.push(`    Spouse Share: ${asset.spousePercentage || 0}% ($${((asset.value || 0) * (asset.spousePercentage || 0) / 100).toLocaleString()})`);
      lines.push('');
    });
  }
  
  if (data.debts && Array.isArray(data.debts)) {
    lines.push('DEBTS:');
    data.debts.forEach((debt: any) => {
      lines.push(`  ${debt.name}: $${debt.amount?.toLocaleString() || '0'}`);
      lines.push(`    Your Responsibility: ${debt.yourPercentage || 0}% ($${((debt.amount || 0) * (debt.yourPercentage || 0) / 100).toLocaleString()})`);
      lines.push(`    Spouse Responsibility: ${debt.spousePercentage || 0}% ($${((debt.amount || 0) * (debt.spousePercentage || 0) / 100).toLocaleString()})`);
      lines.push('');
    });
  }
  
  return lines;
};

const formatChildSupport = (data: any): string[] => {
  const lines = ['CHILD SUPPORT CALCULATION', ''];
  
  lines.push('PARENTS:');
  lines.push(`  Parent A Income: $${data.parentAIncome?.toLocaleString() || '0'}`);
  lines.push(`  Parent B Income: $${data.parentBIncome?.toLocaleString() || '0'}`);
  lines.push(`  Combined Income: $${data.combinedIncome?.toLocaleString() || '0'}`);
  lines.push('');
  
  lines.push('CHILDREN:');
  lines.push(`  Number of Children: ${data.numberOfChildren || 0}`);
  lines.push('');
  
  lines.push('ADDITIONAL EXPENSES:');
  lines.push(`  Healthcare: $${data.healthcareCosts?.toLocaleString() || '0'}`);
  lines.push(`  Childcare: $${data.childcareCosts?.toLocaleString() || '0'}`);
  lines.push(`  Educational: $${data.educationalCosts?.toLocaleString() || '0'}`);
  lines.push('');
  
  lines.push('CALCULATION RESULT:');
  lines.push(`  Monthly Child Support: $${data.monthlySupport?.toLocaleString() || '0'}`);
  lines.push(`  Annual Child Support: $${((data.monthlySupport || 0) * 12).toLocaleString()}`);
  lines.push('');
  
  return lines;
};

const formatTimelineProgress = (data: any): string[] => {
  const lines = ['DIVORCE TIMELINE PROGRESS', ''];
  
  lines.push(`Scenario: ${data.scenarioType || 'Unknown'}`);
  lines.push(`Start Date: ${data.startDate || 'Not set'}`);
  lines.push(`Completion: ${data.completionPercentage || 0}%`);
  lines.push('');
  
  if (data.completedPhases && Array.isArray(data.completedPhases)) {
    lines.push('COMPLETED PHASES:');
    data.completedPhases.forEach((phase: string) => {
      lines.push(`  ✓ ${phase}`);
    });
    lines.push('');
  }
  
  if (data.upcomingDeadlines && Array.isArray(data.upcomingDeadlines)) {
    lines.push('UPCOMING DEADLINES:');
    data.upcomingDeadlines.forEach((deadline: any) => {
      lines.push(`  ${deadline.date}: ${deadline.task}`);
    });
    lines.push('');
  }
  
  return lines;
};

const formatCommunicationLog = (data: any): string[] => {
  const lines = ['COMMUNICATION LOG', ''];
  
  if (data.entries && Array.isArray(data.entries)) {
    data.entries.forEach((entry: any) => {
      lines.push(`Date: ${entry.date}`);
      lines.push(`Type: ${entry.type}`);
      lines.push(`With: ${entry.contact}`);
      lines.push(`Subject: ${entry.subject}`);
      lines.push(`Summary: ${entry.summary}`);
      if (entry.followUp) {
        lines.push(`Follow-up: ${entry.followUp}`);
      }
      lines.push('─'.repeat(50));
      lines.push('');
    });
  }
  
  return lines;
};

const formatExpenseTracker = (data: any): string[] => {
  const lines = ['EXPENSE TRACKER', ''];
  
  if (data.expenses && Array.isArray(data.expenses)) {
    let total = 0;
    lines.push('EXPENSES:');
    data.expenses.forEach((expense: any) => {
      lines.push(`  ${expense.date}: ${expense.description} - $${expense.amount?.toLocaleString() || '0'} (${expense.category})`);
      total += expense.amount || 0;
    });
    lines.push('');
    lines.push(`TOTAL EXPENSES: $${total.toLocaleString()}`);
    lines.push('');
  }
  
  return lines;
};

const formatExportDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const exportComponentToJSON = (data: ComponentExportData): void => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.componentName.replace(/\s+/g, '-')}-${formatExportDate(new Date())}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const createBackupReminder = (): void => {
  const lastBackup = localStorage.getItem('lastBackupReminder');
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  if (!lastBackup || new Date(lastBackup) < oneWeekAgo) {
    // This would trigger a notification or modal in a real app
    console.log('Reminder: Consider backing up your divorce planning data');
    localStorage.setItem('lastBackupReminder', now.toISOString());
  }
};

// Existing export functionality...
