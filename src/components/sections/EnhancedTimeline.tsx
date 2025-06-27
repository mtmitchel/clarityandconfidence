import React, { useState } from 'react';
import { Calendar, Clock, DollarSign, FileText, Scale, Users, CheckCircle2, AlertCircle, Plus, Target } from 'lucide-react';
import { divorceScenarios, calculateProjectedDates, TimelineProgress, DivorceScenario } from '../../data/timeline';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';

const EnhancedTimeline: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>('uncontested');
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [progress, setProgress] = useLocalStorageState<TimelineProgress>('timeline-progress', {
    scenarioType: 'uncontested',
    completedPhases: [],
    completedTasks: []
  });
  const [startDate, setStartDate] = useLocalStorageState<string>('timeline-start-date', '');

  const currentScenario = divorceScenarios.find(s => s.type === selectedScenario) as DivorceScenario;
  const projectedDates = startDate && currentScenario ? calculateProjectedDates(startDate, currentScenario) : {};

  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = progress.completedTasks.includes(taskId)
      ? progress.completedTasks.filter(id => id !== taskId)
      : [...progress.completedTasks, taskId];
    
    setProgress({
      ...progress,
      completedTasks: updatedTasks
    });
  };

  const togglePhaseCompletion = (phaseId: string) => {
    const updatedPhases = progress.completedPhases.includes(phaseId)
      ? progress.completedPhases.filter(id => id !== phaseId)
      : [...progress.completedPhases, phaseId];
    
    setProgress({
      ...progress,
      completedPhases: updatedPhases
    });
  };

  const getTotalCostRange = (scenario: DivorceScenario) => {
    const low = scenario.phases.reduce((sum, phase) => sum + phase.estimatedCosts.low, 0);
    const average = scenario.phases.reduce((sum, phase) => sum + phase.estimatedCosts.average, 0);
    const high = scenario.phases.reduce((sum, phase) => sum + phase.estimatedCosts.high, 0);
    return { low, average, high };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const totalCosts = getTotalCostRange(currentScenario);
  const completionPercentage = currentScenario ? 
    Math.round((progress.completedPhases.length / currentScenario.phases.length) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-light text-sage-900">Your Divorce Timeline</h1>
        <p className="text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed">
          Track your progress and model different divorce scenarios with personalized timelines and cost estimates
        </p>
      </div>

      {/* Progress Overview */}
      {startDate && (
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-neutral-800">Your Progress</h2>
            <div className="flex items-center gap-2">
              <Target className="text-green-600" size={20} />
              <span className="text-2xl font-bold text-green-600">{completionPercentage}%</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-neutral-600">Start date:</span> {/* updated to sentence case */}
              <p className="font-medium">{new Date(startDate).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-neutral-600">Scenario:</span>
              <p className="font-medium">{currentScenario.title}</p>
            </div>
            <div>
              <span className="text-neutral-600">Phases completed:</span> {/* updated to sentence case */}
              <p className="font-medium">{progress.completedPhases.length} of {currentScenario.phases.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* Start Date Input */}
      {!startDate && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <Calendar className="text-amber-600 mt-1 flex-shrink-0" size={24} />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Set your timeline</h3> {/* updated to sentence case */}
              <p className="text-amber-800 mb-4">
                Enter your divorce start date (filing date or expected filing date) to see projected timelines and deadlines.
              </p>
              <div className="flex gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">
                    Filing date (or expected date) {/* updated to sentence case */}
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <button
                  onClick={() => setStartDate(new Date().toISOString().split('T')[0])}
                  className="px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Use Today
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scenario Selection */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-800">Choose Your Scenario</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {divorceScenarios.map((scenario, index) => {
            const costs = getTotalCostRange(scenario);
            return (
              <button
                key={scenario.type}
                onClick={() => {
                  setSelectedScenario(scenario.type);
                  setProgress(prev => ({ ...prev, scenarioType: scenario.type }));
                }}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  selectedScenario === scenario.type
                    ? 'border-sage-300 bg-sage-50 shadow-md'
                    : 'border-neutral-200 bg-white hover:border-sage-200 hover:shadow-sm'
                }`}
              >
                <h3 className="font-semibold text-neutral-800 mb-2">{scenario.title}</h3>
                <p className="text-sm text-neutral-600 mb-3">{scenario.description}</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Duration:</span>
                    <span className="font-medium">{scenario.totalDuration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Est. Cost:</span>
                    <span className="font-medium">{formatCurrency(costs.low)} - {formatCurrency(costs.high)}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline Phases */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-neutral-800">Timeline Phases</h2>
        <div className="space-y-4">
          {currentScenario.phases.map((phase, index) => {
            const isCompleted = progress.completedPhases.includes(phase.id);
            const projectedPhase = projectedDates[phase.id];
            
            return (
              <div
                key={phase.id}
                className={`border rounded-xl transition-all ${
                  isCompleted ? 'border-green-300 bg-green-50' : 'border-neutral-200 bg-white'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => togglePhaseCompletion(phase.id)}
                        className={`mt-1 rounded-full p-1 transition-colors ${
                          isCompleted ? 'text-green-600 bg-green-100' : 'text-neutral-400 hover:text-green-600'
                        }`}
                      >
                        <CheckCircle2 size={24} />
                      </button>
                      <div>
                        <h3 className="text-xl font-semibold text-neutral-800">{phase.phase}</h3>
                        <p className="text-neutral-600">{phase.description}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="flex items-center gap-2 text-neutral-500">
                        <Clock size={16} />
                        <span>{phase.duration}</span>
                      </div>
                      {projectedPhase && (
                        <div className="mt-1 text-blue-600">
                          {formatDate(projectedPhase.start)} - {formatDate(projectedPhase.end)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Key Tasks */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-neutral-700">Key Tasks:</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {phase.keyTasks.map((task, taskIndex) => {
                        const taskId = `${phase.id}-task-${taskIndex}`;
                        const isTaskCompleted = progress.completedTasks.includes(taskId);
                        
                        return (
                          <label
                            key={taskIndex}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={isTaskCompleted}
                              onChange={() => toggleTaskCompletion(taskId)}
                              className="mt-0.5"
                            />
                            <span className={`text-sm ${isTaskCompleted ? 'line-through text-neutral-500' : 'text-neutral-700'}`}>
                              {task}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Cost and Critical Decisions */}
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-medium text-neutral-700 mb-2">Estimated Costs:</h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Low:</span>
                          <span>{formatCurrency(phase.estimatedCosts.low)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average:</span>
                          <span className="font-medium">{formatCurrency(phase.estimatedCosts.average)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>High:</span>
                          <span>{formatCurrency(phase.estimatedCosts.high)}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-700 mb-2">Critical Decisions:</h4>
                      <ul className="text-sm space-y-1">
                        {phase.criticalDecisions.map((decision, decisionIndex) => (
                          <li key={decisionIndex} className="flex items-start gap-2">
                            <span className="text-amber-500 mt-1">•</span>
                            <span>{decision}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scenario Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="font-semibold text-green-900 mb-4">Advantages</h3>
          <ul className="space-y-2">
            {currentScenario.pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-2 text-green-800">
                <CheckCircle2 size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-semibold text-amber-900 mb-4">Considerations</h3>
          <ul className="space-y-2">
            {currentScenario.cons.map((con, index) => (
              <li key={index} className="flex items-start gap-2 text-amber-800">
                <AlertCircle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Total Cost Summary */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Total Estimated Costs</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalCosts.low)}</div>
            <div className="text-sm text-neutral-600">Minimum</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalCosts.average)}</div>
            <div className="text-sm text-neutral-600">Average</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalCosts.high)}</div>
            <div className="text-sm text-neutral-600">Maximum</div>
          </div>
        </div>
        <p className="text-xs text-neutral-500 mt-4 text-center">
          Costs are estimates based on typical Ohio cases. Actual costs may vary significantly based on complexity and legal representation.
        </p>
      </div>

      {/* Legal Deadline Tracker */}
      {startDate && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-red-900 mb-4 flex items-center gap-2">
            <AlertCircle size={24} />
            Critical Legal Deadlines
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-red-800">Ohio Required Deadlines</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-white rounded border">
                  <span>Response to divorce petition</span>
                  <span className="font-medium text-red-600">
                    {new Date(new Date(startDate).getTime() + 28 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded border">
                  <span>Financial disclosure due</span>
                  <span className="font-medium text-red-600">
                    {new Date(new Date(startDate).getTime() + 42 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded border">
                  <span>Parenting class completion</span>
                  <span className="font-medium text-red-600">
                    {new Date(new Date(startDate).getTime() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-red-800">Court Deadlines</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-white rounded border">
                  <span>Discovery requests due</span>
                  <span className="font-medium text-red-600">
                    {new Date(new Date(startDate).getTime() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded border">
                  <span>Mediation deadline</span>
                  <span className="font-medium text-red-600">
                    {new Date(new Date(startDate).getTime() + 120 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded border">
                  <span>Estimated trial date</span>
                  <span className="font-medium text-red-600">
                    {new Date(new Date(startDate).getTime() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white rounded border-l-4 border-red-500">
            <p className="text-sm text-red-700">
              <strong>Important:</strong> Missing court deadlines can result in default judgments or case dismissal. 
              Set calendar reminders for all dates above and consult your attorney immediately if any deadline is at risk.
            </p>
          </div>
        </div>
      )}

      {/* Legal Disclaimer */}
      <div className="text-center p-6 bg-neutral-50 rounded-xl border border-neutral-200">
        <p className="text-neutral-700 leading-relaxed">
          <strong>Legal notice:</strong> This timeline provides general information only and does not constitute legal advice. 
          Actual timelines and costs vary significantly based on individual circumstances, court schedules, and case complexity. 
          Always consult with a qualified Ohio family law attorney for advice specific to your situation.
        </p>
      </div>
    </div>
  );
};

export default EnhancedTimeline;
