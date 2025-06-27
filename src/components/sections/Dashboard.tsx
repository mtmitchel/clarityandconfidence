import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, AlertCircle, CheckCircle2, Target } from 'lucide-react';
import { 
  loadDashboardData, 
  saveDashboardData, 
  loadTimelineItems,
  loadAssetDebtList,
  loadParentingChecklist,
  loadLegalPathData,
  DashboardData,
  TimelineItem
} from '../../lib/storage';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<Omit<DashboardData, 'weeklyMoodAverage'>>({
    lastUpdated: '',
    sectionsCompleted: [],
    totalProgress: 0,
    urgentTasks: 0,
    upcomingDeadlines: 0,
  });
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);

  useEffect(() => {
    calculateDashboardData();
  }, []);

  const calculateDashboardData = () => {
    // Load all data
    const timeline = loadTimelineItems();
    const assets = loadAssetDebtList();
    const parenting = loadParentingChecklist();
    const legalPath = loadLegalPathData();

    setTimelineItems(timeline);

    // Calculate section completion
    const sectionsCompleted: string[] = [];
    const totalSections = 4; // Total sections to track

    if (assets.length > 0) sectionsCompleted.push('understanding-money');
    if (legalPath.recommendation) sectionsCompleted.push('legal-paths');
    if (parenting.some(item => item.completed)) sectionsCompleted.push('children');
    if (timeline.length > 0) sectionsCompleted.push('timeline');

    const totalProgress = Math.round((sectionsCompleted.length / totalSections) * 100);

    // Calculate urgent tasks and deadlines
    const now = new Date();
    const urgentTasks = timeline.filter(item => 
      !item.completed && 
      item.priority === 'high'
    ).length;

    const upcomingDeadlines = timeline.filter(item => {
      if (!item.dueDate || item.completed) return false;
      const dueDate = new Date(item.dueDate);
      const diffTime = dueDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays >= 0;
    }).length;

    const newDashboardData: Omit<DashboardData, 'weeklyMoodAverage'> = {
      lastUpdated: new Date().toISOString(),
      sectionsCompleted,
      totalProgress,
      urgentTasks,
      upcomingDeadlines,
    };

    setDashboardData(newDashboardData);
    saveDashboardData({ ...newDashboardData, weeklyMoodAverage: undefined });
  };

  const getNextActions = () => {
    const actions: string[] = [];
    
    if (!dashboardData.sectionsCompleted.includes('understanding-money')) {
      actions.push('Begin tracking your assets and debts for financial clarity');
    }
    
    if (dashboardData.urgentTasks > 0) {
      actions.push(`Complete ${dashboardData.urgentTasks} high-priority task${dashboardData.urgentTasks > 1 ? 's' : ''}`);
    }
    
    if (dashboardData.upcomingDeadlines > 0) {
      actions.push(`Review ${dashboardData.upcomingDeadlines} upcoming deadline${dashboardData.upcomingDeadlines > 1 ? 's' : ''}`);
    }
    
    if (!dashboardData.sectionsCompleted.includes('legal-paths')) {
      actions.push('Explore your legal path options to understand next steps');
    }

    return actions.slice(0, 3); // Show max 3 actions
  };

  const nextActions = getNextActions();

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold text-calm-800">Your Dashboard</h1>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          Track your progress and see your next steps at a glance.
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Overall Progress */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-slate-800">Overall Progress</h3>
            <TrendingUp className="text-calm-600" size={20} />
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-semibold text-calm-700">{dashboardData.totalProgress}%</div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-calm-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${dashboardData.totalProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-slate-600">
              {dashboardData.sectionsCompleted.length} of 4 sections started
            </p>
          </div>
        </div>

        {/* Urgent Tasks */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-slate-800">Urgent Tasks</h3>
            <AlertCircle className="text-amber-500" size={20} />
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-semibold text-slate-700">{dashboardData.urgentTasks}</div>
            <p className="text-sm text-slate-600">High priority items</p>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-slate-800">This Week</h3>
            <Calendar className="text-blue-500" size={20} />
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-semibold text-slate-700">{dashboardData.upcomingDeadlines}</div>
            <p className="text-sm text-slate-600">Upcoming deadlines</p>
          </div>
        </div>
      </div>

      {/* Next Actions */}
      <div className="bg-sage-50 border border-sage-200 rounded-lg p-6">
        <h2 className="text-xl font-medium text-sage-800 mb-4">Recommended Next Steps</h2>
        {nextActions.length > 0 ? (
          <div className="space-y-3">
            {nextActions.map((action, index) => (
              <div key={index} className="flex items-start gap-3">
                <Target className="text-sage-600 mt-1 flex-shrink-0" size={16} />
                <p className="text-sage-700">{action}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sage-700">
            <CheckCircle2 size={20} />
            <span>Great progress! You're staying on top of your important tasks.</span>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="font-medium text-slate-800 mb-4">Sections In Progress</h3>
        <div className="space-y-2">
          {dashboardData.sectionsCompleted.length > 0 ? (
            dashboardData.sectionsCompleted.map((section) => (
              <div key={section} className="flex items-center gap-2">
                <CheckCircle2 className="text-green-500" size={16} />
                <span className="text-slate-700 capitalize">
                  {section.replace('-', ' ')}
                </span>
              </div>
            ))
          ) : (
            <p className="text-slate-500 text-sm">Start exploring the sections to track your progress</p>
          )}
        </div>
      </div>

      {/* Refresh Data */}
      <div className="text-center">
        <button
          onClick={calculateDashboardData}
          className="px-4 py-2 bg-calm-500 text-white rounded-lg hover:bg-calm-600 transition-colors"
        >
          Refresh Dashboard
        </button>
        <p className="text-sm text-slate-500 mt-2">
          Last updated: {dashboardData.lastUpdated ? 
            new Date(dashboardData.lastUpdated).toLocaleString() : 'Never'}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
