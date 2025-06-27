import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Calendar, AlertCircle, Heart, CheckCircle2, Target } from 'lucide-react';
import { 
  loadDashboardData, 
  saveDashboardData, 
  loadMoodEntries, 
  loadTimelineItems,
  loadAssetDebtList,
  loadParentingChecklist,
  loadJournalEntry,
  loadLegalPathData,
  DashboardData,
  MoodEntry,
  TimelineItem
} from '../../lib/storage';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    lastUpdated: '',
    sectionsCompleted: [],
    totalProgress: 0,
    urgentTasks: 0,
    upcomingDeadlines: 0,
  });
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);

  useEffect(() => {
    calculateDashboardData();
  }, []);

  const calculateDashboardData = () => {
    // Load all data
    const mood = loadMoodEntries();
    const timeline = loadTimelineItems();
    const assets = loadAssetDebtList();
    const parenting = loadParentingChecklist();
    const journal = loadJournalEntry();
    const legalPath = loadLegalPathData();

    setMoodEntries(mood);
    setTimelineItems(timeline);

    // Calculate section completion
    const sectionsCompleted: string[] = [];
    let totalSections = 6; // Total sections to track

    if (journal.content.trim()) sectionsCompleted.push('checking-in');
    if (assets.length > 0) sectionsCompleted.push('understanding-money');
    if (legalPath.recommendation) sectionsCompleted.push('legal-paths');
    if (parenting.some(item => item.completed)) sectionsCompleted.push('children');
    if (timeline.length > 0) sectionsCompleted.push('timeline');
    if (mood.length > 0) sectionsCompleted.push('mood-tracking');

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

    // Calculate weekly mood average
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const recentMoods = mood.filter(entry => new Date(entry.date) >= weekAgo);
    const weeklyMoodAverage = recentMoods.length > 0 
      ? Math.round(recentMoods.reduce((sum, entry) => sum + entry.mood, 0) / recentMoods.length)
      : undefined;

    const newDashboardData: DashboardData = {
      lastUpdated: new Date().toISOString(),
      sectionsCompleted,
      totalProgress,
      weeklyMoodAverage,
      urgentTasks,
      upcomingDeadlines,
    };

    setDashboardData(newDashboardData);
    saveDashboardData(newDashboardData);
  };

  const getMoodTrend = () => {
    if (moodEntries.length < 2) return null;
    const recent = moodEntries.slice(-7); // Last 7 entries
    const firstHalf = recent.slice(0, Math.floor(recent.length / 2));
    const secondHalf = recent.slice(Math.floor(recent.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, entry) => sum + entry.mood, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, entry) => sum + entry.mood, 0) / secondHalf.length;
    
    return secondAvg > firstAvg ? 'improving' : secondAvg < firstAvg ? 'declining' : 'stable';
  };

  const getNextActions = () => {
    const actions: string[] = [];
    
    if (!dashboardData.sectionsCompleted.includes('checking-in')) {
      actions.push('Start with a personal check-in to reflect on your current situation');
    }
    
    if (!dashboardData.sectionsCompleted.includes('understanding-money')) {
      actions.push('Begin tracking your assets and debts for financial clarity');
    }
    
    if (dashboardData.urgentTasks > 0) {
      actions.push(`Complete ${dashboardData.urgentTasks} high-priority task${dashboardData.urgentTasks > 1 ? 's' : ''}`);
    }
    
    if (dashboardData.upcomingDeadlines > 0) {
      actions.push(`Review ${dashboardData.upcomingDeadlines} upcoming deadline${dashboardData.upcomingDeadlines > 1 ? 's' : ''}`);
    }
    
    if (!dashboardData.weeklyMoodAverage) {
      actions.push('Start tracking your daily mood and wellbeing');
    }
    
    return actions.slice(0, 3); // Show max 3 actions
  };

  const moodTrend = getMoodTrend();
  const nextActions = getNextActions();

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-calm-600" size={32} />
          <h1 className="text-3xl font-semibold text-calm-800">Your Dashboard</h1>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          Track your progress, monitor your wellbeing, and see your next steps at a glance.
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              {dashboardData.sectionsCompleted.length} of 6 sections started
            </p>
          </div>
        </div>

        {/* Weekly Mood */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-slate-800">Weekly Mood</h3>
            <Heart className="text-rose-500" size={20} />
          </div>
          <div className="space-y-2">
            {dashboardData.weeklyMoodAverage ? (
              <>
                <div className="text-3xl font-semibold text-slate-700">
                  {dashboardData.weeklyMoodAverage}/10
                </div>
                {moodTrend && (
                  <div className={`text-sm ${
                    moodTrend === 'improving' ? 'text-green-600' : 
                    moodTrend === 'declining' ? 'text-red-600' : 'text-slate-600'
                  }`}>
                    {moodTrend === 'improving' ? '↗ Improving' : 
                     moodTrend === 'declining' ? '↘ Needs attention' : '→ Stable'}
                  </div>
                )}
              </>
            ) : (
              <div className="text-sm text-slate-500">Start tracking to see trends</div>
            )}
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
      <div className="grid md:grid-cols-2 gap-6">
        {/* Completed Sections */}
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

        {/* Recent Mood Entries */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="font-medium text-slate-800 mb-4">Recent Mood Check-ins</h3>
          <div className="space-y-2">
            {moodEntries.slice(-3).reverse().map((entry) => (
              <div key={entry.id} className="flex items-center justify-between">
                <span className="text-sm text-slate-600">
                  {new Date(entry.date).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-700">{entry.mood}/10</span>
                  <div className={`w-3 h-3 rounded-full ${
                    entry.mood >= 7 ? 'bg-green-400' :
                    entry.mood >= 4 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}></div>
                </div>
              </div>
            ))}
            {moodEntries.length === 0 && (
              <p className="text-slate-500 text-sm">Start tracking your mood to see patterns</p>
            )}
          </div>
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
