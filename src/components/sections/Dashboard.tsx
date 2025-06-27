import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, AlertCircle, CheckCircle2, Target, DollarSign, Heart, Scale, BookOpen, PieChart, ArrowRight, Compass, Users, Calculator, FileText, ShieldCheck } from 'lucide-react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';

interface DashboardSummary {
  totalAssets: number;
  totalDebts: number;
  netWorth: number;
  completedTimelineItems: number;
  totalTimelineItems: number;
  emotionalChecklistProgress: number;
  savedResources: number;
}

interface DashboardProps {
  onNavigate?: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  // Load data from localStorage using the same keys as other components
  const [assets] = useLocalStorageState<any[]>('asset-division-data', []);
  const [timelineProgress] = useLocalStorageState<any[]>('timeline-progress', []);
  const [emotionalChecklist] = useLocalStorageState<any[]>('emotional-checklist', []);
  const [budgetCategories] = useLocalStorageState<any[]>('budget-categories', []);
  const [childSupportData] = useLocalStorageState<any>('child-support-data', {});
  const [complexityFactors] = useLocalStorageState<string[]>('complexity-factors', []);
  const [journalEntries] = useLocalStorageState<any[]>('journal-entries', []);
  const [pinnedResources] = useLocalStorageState<string[]>('pinned-resources', []);
  
  // Load assessment recommendations
  const [assessmentRecommendations] = useLocalStorageState<any>('assessment-recommendations', null);
  
  // Load data for action items
  const [communicationEntries] = useLocalStorageState<any[]>('divorce-communication-log', []);
  const [expenseEntries] = useLocalStorageState<any[]>('divorce-expense-tracker', []);
  const [deadlineData] = useLocalStorageState<any>('deadline-data', {});

  const calculateSummary = (): DashboardSummary => {
    // Calculate financial summary
    const totalAssets = assets
      .filter(a => a.type !== 'debt')
      .reduce((sum, asset) => sum + (asset.value || 0), 0);
    
    const totalDebts = assets
      .filter(a => a.type === 'debt')
      .reduce((sum, debt) => sum + (debt.value || 0), 0);
    
    const netWorth = totalAssets - totalDebts;

    // Calculate timeline progress - ensure timelineProgress is an array
    const timelineArray = Array.isArray(timelineProgress) ? timelineProgress : [];
    const completedTimelineItems = timelineArray.filter(item => item.completed).length;
    const totalTimelineItems = Math.max(timelineArray.length, 1);

    // Calculate emotional toolkit progress - ensure emotionalChecklist is an array
    const emotionalArray = Array.isArray(emotionalChecklist) ? emotionalChecklist : [];
    const completedEmotionalItems = emotionalArray.filter(item => item.completed).length;
    const emotionalChecklistProgress = emotionalArray.length > 0 
      ? Math.round((completedEmotionalItems / emotionalArray.length) * 100)
      : 0;

    return {
      totalAssets,
      totalDebts,
      netWorth,
      completedTimelineItems,
      totalTimelineItems,
      emotionalChecklistProgress,
      savedResources: Array.isArray(pinnedResources) ? pinnedResources.length : 0
    };
  };

  const summary = calculateSummary();

  const getActionItems = () => {
    const actionItems = [];
    
    // Communication follow-ups
    const pendingFollowUps = communicationEntries.filter(entry => entry.followUpNeeded && !entry.completed).length;
    if (pendingFollowUps > 0) {
      actionItems.push({
        type: 'communication',
        text: `You have ${pendingFollowUps} item${pendingFollowUps !== 1 ? 's' : ''} marked for follow-up in your Communication Log.`,
        action: 'Review Communications',
        section: 'communication-log',
        priority: 'high'
      });
    }
    
    // Upcoming deadlines (mock data for now)
    const today = new Date();
    const nextDeadline = new Date(today);
    nextDeadline.setDate(today.getDate() + 14); // 14 days from now
    actionItems.push({
      type: 'deadline',
      text: `Your next deadline, 'Financial Disclosure Due,' is in 14 days.`,
      action: 'View Deadlines',
      section: 'deadline-calculator',
      priority: 'medium'
    });
    
    // Reimbursable expenses
    const currentMonth = new Date();
    currentMonth.setDate(1); // First day of current month
    const reimbursableExpenses = expenseEntries
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        return expense.isReimbursable && expenseDate >= currentMonth;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    if (reimbursableExpenses > 0) {
      actionItems.push({
        type: 'expense',
        text: `You've tracked $${reimbursableExpenses.toFixed(0)} in reimbursable expenses this month.`,
        action: 'Review Expenses',
        section: 'expense-tracker',
        priority: 'low'
      });
    }
    
    // Document checklist progress
    const documentsNeeded = 8; // Mock data
    const documentsCompleted = 3; // Mock data
    if (documentsCompleted < documentsNeeded) {
      actionItems.push({
        type: 'documents',
        text: `${documentsNeeded - documentsCompleted} required documents still need to be gathered.`,
        action: 'View Checklist',
        section: 'document-checklist',
        priority: 'medium'
      });
    }
    
    return actionItems.slice(0, 3); // Show max 3 action items
  };

  const getNextSteps = () => {
    const steps: { title: string; description: string; action: string; priority: 'high' | 'medium' | 'low' }[] = [];

    // Financial next steps
    if (summary.totalAssets === 0) {
      steps.push({
        title: 'Start asset tracking',
        description: 'Begin documenting your assets and debts for accurate division planning',
        action: 'Go to Financial scenarios →',
        priority: 'high'
      });
    }

    // Timeline next steps
    if (summary.completedTimelineItems === 0) {
      steps.push({
        title: 'Review timeline',
        description: 'Set your divorce start date and begin tracking critical deadlines',
        action: 'Go to Interactive timeline →',
        priority: 'high'
      });
    }

    // Legal complexity assessment
    const complexityArray = Array.isArray(complexityFactors) ? complexityFactors : [];
    if (complexityArray.length === 0) {
      steps.push({
        title: 'Assess legal complexity',
        description: 'Complete the complexity assessment to understand your legal path options',
        action: 'Go to Legal decision tools →',
        priority: 'medium'
      });
    }

    // Emotional toolkit
    if (summary.emotionalChecklistProgress < 25) {
      steps.push({
        title: 'Build emotional resilience',
        description: 'Start working through personal resilience and co-parenting strategies',
        action: 'Go to Emotional toolkit →',
        priority: 'medium'
      });
    }

    // Budget planning
    const budgetArray = Array.isArray(budgetCategories) ? budgetCategories : [];
    const totalBudget = budgetArray.reduce((sum, cat) => sum + (cat.current || 0), 0);
    if (totalBudget === 0) {
      steps.push({
        title: 'Plan post-divorce budget',
        description: 'Create a comparative budget to understand your financial future',
        action: 'Go to Financial scenarios → Budget planner',
        priority: 'medium'
      });
    }

    return steps.slice(0, 4); // Show max 4 next steps
  };

  const nextSteps = getNextSteps();
  const actionItems = getActionItems();

  const handleNavigate = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
  };

  const getRecommendationIcon = (title: string) => {
    // Map recommendation titles to appropriate icons
    if (title.includes('Safety')) return ShieldCheck;
    if (title.includes('Legal')) return Scale;
    if (title.includes('Financial') || title.includes('Money')) return Calculator;
    if (title.includes('Emotional') || title.includes('Well-being')) return Heart;
    if (title.includes('Organized') || title.includes('Document')) return FileText;
    if (title.includes('Children') || title.includes('Co-parenting')) return Users;
    if (title.includes('Dashboard')) return Target;
    return Compass; // Default fallback
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      {/* Dynamic Header based on Assessment */}
      {assessmentRecommendations ? (
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-light text-sage-900">Your personalized roadmap</h1>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            Based on your assessment, here's your recommended path forward
          </p>
          
          {/* Primary Recommendation */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              {(() => {
                const IconComponent = getRecommendationIcon(assessmentRecommendations.primaryRecommendation.title);
                return <IconComponent className="text-blue-600" size={32} />;
              })()}
              <h2 className="text-2xl font-semibold text-blue-900">
                {assessmentRecommendations.primaryRecommendation.title}
              </h2>
            </div>
            <p className="text-blue-800 mb-6 leading-relaxed">
              {assessmentRecommendations.primaryRecommendation.description}
            </p>
            <button 
              onClick={() => handleNavigate(assessmentRecommendations.primaryRecommendation.section)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Start Here
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-light text-sage-900">Welcome to your dashboard</h1>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            Get a personalized roadmap to focus on what matters most
          </p>
          
          {/* Assessment CTA */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Compass className="text-blue-600" size={32} />
              <h2 className="text-2xl font-semibold text-blue-900">Get your personalized roadmap</h2>
            </div>
            <p className="text-blue-800 mb-6 leading-relaxed">
              Answer 3 quick questions to get tailored recommendations for your specific situation
            </p>
            <button 
              onClick={() => handleNavigate('initial-assessment')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Take Assessment
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Progress at a glance - Simplified */}
      <div className="bg-white border border-neutral-200 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-6">Your progress at a glance</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <DollarSign className="text-blue-600" size={28} />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-800">
                ${Math.abs(summary.netWorth).toLocaleString()}
              </p>
              <p className="text-sm text-neutral-600">
                {summary.netWorth >= 0 ? 'Net worth' : 'Net debt'}
              </p>
            </div>
          </div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Calendar className="text-green-600" size={28} />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-800">
                {summary.totalTimelineItems > 0 ? Math.round((summary.completedTimelineItems / summary.totalTimelineItems) * 100) : 0}%
              </p>
              <p className="text-sm text-neutral-600">Tasks completed</p>
            </div>
          </div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Heart className="text-purple-600" size={28} />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-800">
                {summary.emotionalChecklistProgress}%
              </p>
              <p className="text-sm text-neutral-600">Wellness progress</p>
            </div>
          </div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="text-orange-600" size={28} />
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-800">
                {summary.savedResources}
              </p>
              <p className="text-sm text-neutral-600">Saved resources</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Items Widget */}
      {actionItems.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="text-amber-600" size={28} />
            <h2 className="text-2xl font-semibold text-amber-900">Action items</h2>
          </div>
          <p className="text-amber-800 mb-6">Tasks that need your attention based on your recent activity</p>
          <div className="space-y-4">
            {actionItems.map((item, index) => {
              const priorityColors = {
                high: 'bg-red-100 border-red-300 text-red-800',
                medium: 'bg-amber-100 border-amber-300 text-amber-800',
                low: 'bg-blue-100 border-blue-300 text-blue-800'
              };
              return (
                <div key={index} className="flex items-start justify-between p-4 bg-white border border-amber-200 rounded-lg">
                  <div className="flex-1">
                    <p className="text-neutral-800 font-medium mb-1">{item.text}</p>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${priorityColors[item.priority as keyof typeof priorityColors]}`}>
                      {item.priority} priority
                    </span>
                  </div>
                  <button 
                    onClick={() => handleNavigate(item.section)}
                    className="ml-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
                  >
                    {item.action}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Secondary Recommendations (if assessment completed) */}
      {assessmentRecommendations && assessmentRecommendations.secondaryRecommendations && (
        <div className="bg-white border border-neutral-200 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-6">Other helpful next steps</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {assessmentRecommendations.secondaryRecommendations.map((rec: any, index: number) => (
              <button 
                key={index}
                onClick={() => handleNavigate(rec.section)}
                className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left group"
              >
                <p className="font-medium text-blue-800 group-hover:text-blue-900">{rec.title}</p>
                <ArrowRight className="text-blue-600 group-hover:text-blue-700 mt-2" size={16} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Next Steps */}
      <div className="bg-white border border-neutral-200 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-6">
          {assessmentRecommendations ? 'Continue your progress' : 'Your next steps'}
        </h2>
        
        {nextSteps.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {nextSteps.map((step, index) => (
              <div 
                key={index}
                className={`p-6 rounded-lg border-l-4 cursor-pointer hover:shadow-md transition-shadow ${
                  step.priority === 'high' 
                    ? 'border-red-500 bg-red-50 hover:bg-red-100' 
                    : step.priority === 'medium'
                    ? 'border-amber-500 bg-amber-50 hover:bg-amber-100'
                    : 'border-green-500 bg-green-50 hover:bg-green-100'
                }`}
                onClick={() => {
                  // Extract section from action text or map to appropriate section
                  const sectionMap: { [key: string]: string } = {
                    'Financial scenarios': 'understanding-money',
                    'Interactive timeline': 'enhanced-timeline',
                    'Legal decision tools': 'legal-decision-guide',
                    'Emotional toolkit': 'emotional-toolkit'
                  };
                  const section = Object.keys(sectionMap).find(key => step.action.includes(key));
                  if (section) {
                    handleNavigate(sectionMap[section]);
                  }
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      step.priority === 'high' ? 'bg-red-500' : 
                      step.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                    }`} />
                    <h3 className="font-semibold text-neutral-800">{step.title}</h3>
                  </div>
                  <ArrowRight className="text-neutral-400" size={16} />
                </div>
                <p className="text-neutral-600 text-sm mb-3">{step.description}</p>
                <p className="text-neutral-800 font-medium text-sm">{step.action}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 className="text-green-600 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">Great progress!</h3>
            <p className="text-neutral-600">You've completed the initial setup steps. Continue working through each section at your own pace.</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <details className="bg-neutral-50 border border-neutral-200 rounded-xl">
        <summary className="p-6 cursor-pointer hover:bg-neutral-100 transition-colors">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-neutral-800">View detailed breakdown</h3>
            <span className="text-neutral-500 text-sm">Click to expand ▼</span>
          </div>
        </summary>
        
        <div className="px-6 pb-6 border-t border-neutral-200">
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-neutral-800">Financial details</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Total assets</span>
                  <span className="font-medium">${summary.totalAssets.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Total debts</span>
                  <span className="font-medium">${summary.totalDebts.toLocaleString()}</span>
                </div>
                {childSupportData.yourIncome > 0 && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Your income</span>
                    <span className="font-medium">${childSupportData.yourIncome?.toLocaleString() || 0}</span>
                  </div>
                )}
                {budgetCategories.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Monthly budget</span>
                    <span className="font-medium">
                      ${budgetCategories.reduce((sum, cat) => sum + (cat.current || 0), 0).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-neutral-800">Legal progress</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Complexity factors</span>
                  <span className="font-medium">{complexityFactors.length}/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Timeline tasks</span>
                  <span className="font-medium">{summary.completedTimelineItems}/{summary.totalTimelineItems}</span>
                </div>
                {assets.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Assets tracked</span>
                    <span className="font-medium">{assets.length}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-neutral-800">Personal wellness</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Journal entries</span>
                  <span className="font-medium">{journalEntries.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Wellness checklist</span>
                  <span className="font-medium">{summary.emotionalChecklistProgress}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Saved resources</span>
                  <span className="font-medium">{summary.savedResources}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </details>

      {/* Privacy Notice */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <CheckCircle2 className="text-green-600 mt-1 flex-shrink-0" size={20} />
          <div className="space-y-2">
            <h3 className="font-medium text-neutral-800">Your data stays private</h3>
            <p className="text-neutral-700 text-sm">
              All information on this dashboard is stored locally in your browser and never transmitted to any servers. 
              You maintain complete control over your personal data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
