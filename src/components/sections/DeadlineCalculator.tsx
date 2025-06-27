import React, { useState, useEffect } from 'react';
import { Clock, Calendar, AlertTriangle, CheckCircle2, FileText, Scale, Download } from 'lucide-react';
import { createEvents } from 'ics';

interface Deadline {
  id: string;
  name: string;
  dueDate: Date;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'filing' | 'discovery' | 'court' | 'other';
  completed?: boolean;
  ohioSpecific?: boolean;
}

const DeadlineCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [caseType, setCaseType] = useState<'divorce' | 'dissolution' | ''>('');
  const [hasChildren, setHasChildren] = useState<boolean | null>(null);
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [completedDeadlines, setCompletedDeadlines] = useState<Set<string>>(new Set());

  const calculateDeadlines = () => {
    if (!startDate || !caseType) return [];

    const start = new Date(startDate);
    const calculatedDeadlines: Deadline[] = [];

    // Common Ohio divorce deadlines
    if (caseType === 'divorce') {
      // Response deadline
      const responseDate = new Date(start);
      responseDate.setDate(responseDate.getDate() + 28);
      calculatedDeadlines.push({
        id: 'response',
        name: 'Spouse Response Deadline',
        dueDate: responseDate,
        description: 'Your spouse must file their response (answer) to the divorce complaint',
        priority: 'high',
        category: 'filing',
        ohioSpecific: true
      });

      // Financial disclosure
      const disclosureDate = new Date(start);
      disclosureDate.setDate(disclosureDate.getDate() + 42);
      calculatedDeadlines.push({
        id: 'financial-disclosure',
        name: 'Financial Disclosure Due',
        dueDate: disclosureDate,
        description: 'Exchange of financial information and asset/debt documentation',
        priority: 'high',
        category: 'discovery',
        ohioSpecific: true
      });

      // Temporary orders hearing (if requested)
      const tempOrdersDate = new Date(start);
      tempOrdersDate.setDate(tempOrdersDate.getDate() + 21);
      calculatedDeadlines.push({
        id: 'temp-orders',
        name: 'Temporary Orders Hearing',
        dueDate: tempOrdersDate,
        description: 'Hearing for temporary support, custody, or possession orders (if requested)',
        priority: 'medium',
        category: 'court'
      });

      // Discovery completion
      const discoveryDate = new Date(start);
      discoveryDate.setDate(discoveryDate.getDate() + 90);
      calculatedDeadlines.push({
        id: 'discovery-complete',
        name: 'Discovery Completion',
        dueDate: discoveryDate,
        description: 'All discovery requests and depositions should be completed',
        priority: 'medium',
        category: 'discovery'
      });

      // Final hearing (estimated)
      const finalHearingDate = new Date(start);
      if (hasChildren) {
        finalHearingDate.setDate(finalHearingDate.getDate() + 180); // 6 months minimum with children
      } else {
        finalHearingDate.setDate(finalHearingDate.getDate() + 120); // 4 months without children
      }
      calculatedDeadlines.push({
        id: 'final-hearing',
        name: 'Estimated Final Hearing',
        dueDate: finalHearingDate,
        description: hasChildren ? 
          'Final divorce hearing (6+ months required waiting period with children)' :
          'Final divorce hearing (4+ months typical without children)',
        priority: 'high',
        category: 'court',
        ohioSpecific: true
      });
    }

    if (caseType === 'dissolution') {
      // Joint petition filing
      const jointPetitionDate = new Date(start);
      jointPetitionDate.setDate(jointPetitionDate.getDate() + 30);
      calculatedDeadlines.push({
        id: 'joint-petition',
        name: 'Joint Petition Filing',
        dueDate: jointPetitionDate,
        description: 'Both spouses must sign and file the joint petition with separation agreement',
        priority: 'high',
        category: 'filing',
        ohioSpecific: true
      });

      // Waiting period ends
      const waitingPeriodDate = new Date(start);
      waitingPeriodDate.setDate(waitingPeriodDate.getDate() + 30);
      calculatedDeadlines.push({
        id: 'waiting-period',
        name: 'Waiting Period Ends',
        dueDate: waitingPeriodDate,
        description: 'Minimum 30-day waiting period before dissolution can be granted',
        priority: 'medium',
        category: 'court',
        ohioSpecific: true
      });

      // Final hearing
      const dissolutionHearingDate = new Date(start);
      dissolutionHearingDate.setDate(dissolutionHearingDate.getDate() + 45);
      calculatedDeadlines.push({
        id: 'dissolution-hearing',
        name: 'Dissolution Hearing',
        dueDate: dissolutionHearingDate,
        description: 'Court hearing to finalize the dissolution (typically 30-60 days after filing)',
        priority: 'high',
        category: 'court'
      });
    }

    // Children-specific deadlines
    if (hasChildren) {
      const parentingClassDate = new Date(start);
      parentingClassDate.setDate(parentingClassDate.getDate() + 60);
      calculatedDeadlines.push({
        id: 'parenting-class',
        name: 'Parenting Class Completion',
        dueDate: parentingClassDate,
        description: 'Complete court-approved parenting education program (required in Ohio)',
        priority: 'high',
        category: 'other',
        ohioSpecific: true
      });

      const custodyInvestigationDate = new Date(start);
      custodyInvestigationDate.setDate(custodyInvestigationDate.getDate() + 75);
      calculatedDeadlines.push({
        id: 'custody-investigation',
        name: 'Custody Investigation',
        dueDate: custodyInvestigationDate,
        description: 'Guardian ad litem or custody evaluator investigation (if ordered by court)',
        priority: 'medium',
        category: 'other'
      });
    }

    // Sort by due date
    return calculatedDeadlines.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  };

  useEffect(() => {
    setDeadlines(calculateDeadlines());
  }, [startDate, caseType, hasChildren]);

  const toggleDeadlineComplete = (id: string) => {
    const newCompleted = new Set(completedDeadlines);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedDeadlines(newCompleted);
  };

  const getTimeUntilDeadline = (deadline: Date): { text: string; urgency: 'overdue' | 'urgent' | 'upcoming' | 'future' } => {
    const now = new Date();
    const timeDiff = deadline.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) {
      return { text: `Overdue by ${Math.abs(daysDiff)} days`, urgency: 'overdue' };
    } else if (daysDiff <= 7) {
      return { text: `${daysDiff} days remaining`, urgency: 'urgent' };
    } else if (daysDiff <= 30) {
      return { text: `${daysDiff} days remaining`, urgency: 'upcoming' };
    } else {
      return { text: `${daysDiff} days remaining`, urgency: 'future' };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-300 bg-red-50';
      case 'medium': return 'border-amber-300 bg-amber-50';
      case 'low': return 'border-green-300 bg-green-50';
      default: return 'border-neutral-300 bg-neutral-50';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'overdue': return 'text-red-700 bg-red-100';
      case 'urgent': return 'text-orange-700 bg-orange-100';
      case 'upcoming': return 'text-amber-700 bg-amber-100';
      case 'future': return 'text-green-700 bg-green-100';
      default: return 'text-neutral-700 bg-neutral-100';
    }
  };

  const overdueCount = deadlines.filter(d => {
    const { urgency } = getTimeUntilDeadline(d.dueDate);
    return urgency === 'overdue' && !completedDeadlines.has(d.id);
  }).length;

  const urgentCount = deadlines.filter(d => {
    const { urgency } = getTimeUntilDeadline(d.dueDate);
    return urgency === 'urgent' && !completedDeadlines.has(d.id);
  }).length;

  const handleExport = () => {
    const events = deadlines.map(d => ({
      title: d.name,
      start: [d.dueDate.getFullYear(), d.dueDate.getMonth() + 1, d.dueDate.getDate()],
      duration: { hours: 1 },
      description: d.description,
      categories: [d.category],
      status: completedDeadlines.has(d.id) ? 'CONFIRMED' : 'TENTATIVE',
      alarms: [
        { action: 'display', description: 'Reminder', trigger: { hours: 24, before: true } },
        { action: 'display', description: 'Reminder', trigger: { hours: 2, before: true } }
      ]
    }));

    createEvents(events, (error, value) => {
      if (error) {
        console.error(error);
        return;
      }
      const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'divorce-deadlines.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-light text-sage-900">Deadline calculator & tracker</h1>
        <p className="text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed">
          Calculate critical deadlines for your Ohio divorce or dissolution case. 
          Never miss an important filing deadline or court date.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Educational Deadline Estimates</h3>
          <p className="text-blue-800 text-sm">
            These deadlines are calculated based on Ohio court rules and typical timelines. Your specific court may have local rules that modify these dates. Always confirm deadlines with your attorney or court clerk.
          </p>
        </div>
      </div>

      {/* Case Setup */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-blue-900 mb-6">Case information</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">Case start date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-blue-700 mt-1">Date you filed or plan to file</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">Case type</label>
            <select
              value={caseType}
              onChange={(e) => setCaseType(e.target.value as any)}
              className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select type</option>
              <option value="divorce">Divorce (contested)</option>
              <option value="dissolution">Dissolution (uncontested)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-3">Children involved?</label>
            <div className="flex gap-4">
              {[
                { value: true, label: 'Yes' },
                { value: false, label: 'No' }
              ].map(option => (
                <label key={option.label} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="hasChildren"
                    checked={hasChildren === option.value}
                    onChange={() => setHasChildren(option.value)}
                    className="text-blue-600"
                  />
                  <span className="text-blue-800">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alert Summary */}
      {deadlines.length > 0 && (overdueCount > 0 || urgentCount > 0) && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-red-600" size={24} />
            <h3 className="text-xl font-semibold text-red-900">Attention required</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {overdueCount > 0 && (
              <div className="bg-red-100 rounded-lg p-4">
                <p className="text-red-800 font-medium">{overdueCount} overdue deadline{overdueCount !== 1 ? 's' : ''}</p>
                <p className="text-red-700 text-sm">Immediate action required</p>
              </div>
            )}
            {urgentCount > 0 && (
              <div className="bg-orange-100 rounded-lg p-4">
                <p className="text-orange-800 font-medium">{urgentCount} urgent deadline{urgentCount !== 1 ? 's' : ''}</p>
                <p className="text-orange-700 text-sm">Due within 7 days</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Deadlines List */}
      {deadlines.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-neutral-800">Your deadlines</h2>
            <button onClick={handleExport} className="flex items-center gap-2 bg-sage-600 text-white px-4 py-2 rounded-lg hover:bg-sage-700 transition-colors">
              <Download size={20} />
              Export calendar
            </button>
          </div>

          <div className="space-y-4">
            {deadlines.map((deadline) => {
              const timeInfo = getTimeUntilDeadline(deadline.dueDate);
              const isCompleted = completedDeadlines.has(deadline.id);
              
              return (
                <div 
                  key={deadline.id} 
                  className={`border-l-4 rounded-lg p-6 transition-all ${
                    isCompleted ? 'border-green-400 bg-green-50 opacity-75' : getPriorityColor(deadline.priority)
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <button
                        onClick={() => toggleDeadlineComplete(deadline.id)}
                        className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isCompleted 
                            ? 'bg-green-600 border-green-600 text-white' 
                            : 'border-neutral-300 hover:border-sage-400'
                        }`}
                      >
                        {isCompleted && <CheckCircle2 size={16} />}
                      </button>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`text-lg font-semibold ${isCompleted ? 'text-green-800 line-through' : 'text-neutral-800'}`}>
                            {deadline.name}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(deadline.priority)} capitalize`}>
                            {deadline.priority}
                          </span>
                          {deadline.ohioSpecific && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              Ohio specific
                            </span>
                          )}
                        </div>
                        
                        <p className={`mb-3 ${isCompleted ? 'text-green-700' : 'text-neutral-600'}`}>
                          {deadline.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-neutral-500" />
                            <span className="text-neutral-700">
                              {deadline.dueDate.toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                          
                          {!isCompleted && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(timeInfo.urgency)}`}>
                              {timeInfo.text}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* No deadlines state */}
      {deadlines.length === 0 && (
        <div className="text-center py-12">
          <Clock className="mx-auto text-neutral-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-neutral-600 mb-2">Set up your case details</h3>
          <p className="text-neutral-500">Enter your case information above to generate personalized deadlines</p>
        </div>
      )}

      {/* Important Notes */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Scale className="text-amber-600 mt-1 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">Important reminders</h3>
            <ul className="text-amber-800 space-y-2 text-sm">
              <li>• Deadlines are calculated based on Ohio court rules and typical timelines</li>
              <li>• Your specific court may have local rules that modify these deadlines</li>
              <li>• Always confirm deadlines with your attorney or the court clerk</li>
              <li>• File documents early when possible to avoid last-minute issues</li>
              <li>• Court holidays and weekends can affect actual filing deadlines</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeadlineCalculator;
