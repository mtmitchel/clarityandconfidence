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
