import React, { useState } from 'react';
import { Calendar, Clock, DollarSign, FileText, Scale, Users, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import { divorceScenarios, calculateProjectedDates, TimelineProgress } from '../../data/timeline';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';

interface TimelinePhase {
  phase: string;
  duration: string;
  description: string;
  keyTasks: string[];
  estimatedCosts: {
    low: number;
    average: number;
    high: number;
  };
  criticalDecisions: string[];
}

interface DivorceScenario {
  type: 'uncontested' | 'contested' | 'collaborative';
  title: string;
  description: string;
  totalDuration: string;
  phases: TimelinePhase[];
  pros: string[];
  cons: string[];
}

const Timeline: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>('uncontested');
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [progress, setProgress] = useLocalStorageState<TimelineProgress>('timeline-progress', {
    scenarioType: 'uncontested',
    completedPhases: [],
    completedTasks: []
  });
  const [startDate, setStartDate] = useLocalStorageState<string>('timeline-start-date', '');

  const currentScenario = divorceScenarios.find(s => s.type === selectedScenario);
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

  const divorceScenarios: DivorceScenario[] = [
    {
      type: 'uncontested',
      title: 'Uncontested Divorce',
      description: 'Both parties agree on all major issues including property division, custody, and support',
      totalDuration: '3-6 months',
      phases: [
        {
          phase: 'Initial Filing',
          duration: '1-2 weeks',
          description: 'File petition for dissolution and serve papers',
          keyTasks: [
            'Complete Ohio dissolution forms',
            'File with Hamilton County court',
            'Serve papers to spouse',
            'Pay filing fees'
          ],
          estimatedCosts: { low: 200, average: 350, high: 500 },
          criticalDecisions: [
            'Choose dissolution vs. divorce process',
            'Determine if legal representation needed'
          ]
        },
        {
          phase: 'Waiting Period',
          duration: '30 days minimum',
          description: 'Ohio requires 30-day waiting period after filing',
          keyTasks: [
            'Prepare separation agreement',
            'Complete financial disclosures',
            'Finalize parenting plan (if applicable)',
            'Divide assets and debts'
          ],
          estimatedCosts: { low: 0, average: 200, high: 800 },
          criticalDecisions: [
            'Asset and debt division agreements',
            'Child custody and support arrangements',
            'Spousal support determination'
          ]
        },
        {
          phase: 'Final Hearing',
          duration: '1 day',
          description: 'Court review and final decree',
          keyTasks: [
            'Attend final hearing',
            'Present separation agreement to judge',
            'Receive final divorce decree',
            'File any necessary transfers'
          ],
          estimatedCosts: { low: 50, average: 150, high: 300 },
          criticalDecisions: [
            'Ensure all agreements are legally sound',
            'Confirm understanding of final terms'
          ]
        }
      ],
      pros: [
        'Faster resolution (3-6 months)',
        'Lower costs ($250-$1,600 total)',
        'Less stress and conflict',
        'Greater privacy and control'
      ],
      cons: [
        'Requires full agreement between parties',
        'Limited court oversight',
        'May not be suitable for complex financial situations'
      ]
    },
    {
      type: 'contested',
      title: 'Contested Divorce',
      description: 'Parties disagree on major issues requiring court intervention and litigation',
      totalDuration: '12-24 months',
      phases: [
        {
          phase: 'Initial Filing & Discovery',
          duration: '2-4 months',
          description: 'File petition, serve papers, and begin formal discovery process',
          keyTasks: [
            'File divorce petition',
            'Serve papers and receive response',
            'Hire attorneys',
            'Begin discovery process',
            'Temporary orders hearing (if needed)'
          ],
          estimatedCosts: { low: 2000, average: 5000, high: 10000 },
          criticalDecisions: [
            'Choose legal representation',
            'Determine need for temporary support/custody',
            'Strategy for contested issues'
          ]
        },
        {
          phase: 'Discovery & Negotiation',
          duration: '6-12 months',
          description: 'Gather evidence, valuate assets, and attempt settlement',
          keyTasks: [
            'Complete financial discovery',
            'Asset valuation and appraisals',
            'Depositions and interrogatories',
            'Settlement negotiations',
            'Mediation attempts'
          ],
          estimatedCosts: { low: 5000, average: 15000, high: 30000 },
          criticalDecisions: [
            'Business and asset valuation methods',
            'Child custody evaluation needs',
            'Settlement vs. trial strategy'
          ]
        },
        {
          phase: 'Trial & Final Decree',
          duration: '2-6 months',
          description: 'Court trial, judge decision, and final decree entry',
          keyTasks: [
            'Pre-trial motions and preparation',
            'Trial proceedings',
            'Judge\'s decision and decree',
            'Post-decree implementation',
            'Appeals (if necessary)'
          ],
          estimatedCosts: { low: 3000, average: 8000, high: 20000 },
          criticalDecisions: [
            'Trial strategy and witness selection',
            'Acceptance of court decisions',
            'Post-decree compliance planning'
          ]
        }
      ],
      pros: [
        'Court oversight ensures fairness',
        'Thorough discovery process',
        'Legal protection for complex situations',
        'Binding court orders'
      ],
      cons: [
        'Significantly higher costs ($10,000-$60,000+)',
        'Longer duration (12-24 months)',
        'Higher stress and conflict',
        'Public court proceedings'
      ]
    },
    {
      type: 'collaborative',
      title: 'Collaborative Divorce',
      description: 'Team approach with specially trained attorneys, coaches, and financial neutrals',
      totalDuration: '6-12 months',
      phases: [
        {
          phase: 'Team Assembly',
          duration: '2-4 weeks',
          description: 'Hire collaborative professionals and sign participation agreement',
          keyTasks: [
            'Hire collaborative attorneys',
            'Sign participation agreement',
            'Engage coaches and financial neutral',
            'Initial team meeting',
            'Set ground rules and goals'
          ],
          estimatedCosts: { low: 1500, average: 3000, high: 5000 },
          criticalDecisions: [
            'Team member selection',
            'Process commitment and rules',
            'Communication protocols'
          ]
        },
        {
          phase: 'Information Gathering',
          duration: '2-4 months',
          description: 'Collaborative discovery and asset evaluation',
          keyTasks: [
            'Voluntary financial disclosure',
            'Asset valuation with neutral expert',
            'Develop parenting plan with coach',
            'Regular team meetings',
            'Interest-based negotiation'
          ],
          estimatedCosts: { low: 3000, average: 8000, high: 15000 },
          criticalDecisions: [
            'Asset division approaches',
            'Parenting arrangement preferences',
            'Support calculation methods'
          ]
        },
        {
          phase: 'Agreement & Finalization',
          duration: '1-3 months',
          description: 'Finalize agreements and complete legal process',
          keyTasks: [
            'Draft final settlement agreement',
            'Review with all team members',
            'File final paperwork with court',
            'Attend final hearing',
            'Implement agreements'
          ],
          estimatedCosts: { low: 1000, average: 2500, high: 5000 },
          criticalDecisions: [
            'Final agreement terms',
            'Implementation timeline',
            'Ongoing communication plans'
          ]
        }
      ],
      pros: [
        'Interest-based problem solving',
        'Professional team support',
        'Creative solutions possible',
        'Confidential process',
        'Focus on family preservation'
      ],
      cons: [
        'Higher upfront costs ($5,500-$25,000)',
        'Requires both parties\' commitment',
        'May need traditional litigation if process fails',
        'Limited availability of trained professionals'
      ]
    }
  ];

  const selectedScenarioData = divorceScenarios.find(s => s.type === selectedScenario)!;

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

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-light text-sage-900">Divorce process timeline</h1>
        <p className="text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed">
          Interactive timeline modeling for different divorce paths in Ohio. Compare costs, 
          duration, and decision points to understand your options.
        </p>
      </div>

      {/* Scenario Selection */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-neutral-800 text-center">Choose your scenario</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {divorceScenarios.map((scenario) => {
            const costRange = getTotalCostRange(scenario);
            return (
              <div
                key={scenario.type}
                onClick={() => setSelectedScenario(scenario.type)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedScenario === scenario.type
                    ? 'border-sage-300 bg-sage-50 shadow-md'
                    : 'border-neutral-200 bg-white hover:border-sage-200 hover:shadow-sm'
                }`}
              >
                <h3 className="text-xl font-semibold text-neutral-800 mb-3">{scenario.title}</h3>
                <p className="text-neutral-600 mb-4 text-sm leading-relaxed">{scenario.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-blue-600" />
                    <span className="font-medium text-blue-800">{scenario.totalDuration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign size={16} className="text-green-600" />
                    <span className="font-medium text-green-800">
                      {formatCurrency(costRange.low)} - {formatCurrency(costRange.high)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Scenario Details */}
      <div className="space-y-8">
        <div className="bg-sage-50 border border-sage-200 rounded-xl p-8">
          <h2 className="text-3xl font-semibold text-sage-900 mb-4">{selectedScenarioData.title}</h2>
          <p className="text-lg text-sage-800 mb-6 leading-relaxed">{selectedScenarioData.description}</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-sage-800 mb-3">Advantages</h3>
              <ul className="space-y-2">
                {selectedScenarioData.pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-2 text-sage-700">
                    <CheckCircle2 size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sage-800 mb-3">Considerations</h3>
              <ul className="space-y-2">
                {selectedScenarioData.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-2 text-sage-700">
                    <AlertCircle size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Phases */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-neutral-800 text-center">Process timeline</h2>
          <div className="space-y-4">
            {selectedScenarioData.phases.map((phase, index) => (
              <div
                key={index}
                className="bg-white border border-neutral-200 rounded-xl overflow-hidden"
              >
                <div
                  onClick={() => setSelectedPhase(selectedPhase === index ? null : index)}
                  className="p-6 cursor-pointer hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-sage-100 text-sage-800 rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-800">{phase.phase}</h3>
                        <p className="text-sm text-neutral-600">{phase.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-blue-800">{phase.duration}</div>
                      <div className="text-sm text-green-700">
                        {formatCurrency(phase.estimatedCosts.low)} - {formatCurrency(phase.estimatedCosts.high)}
                      </div>
                    </div>
                  </div>
                </div>

                {selectedPhase === index && (
                  <div className="border-t border-neutral-200 p-6 bg-neutral-50">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                          <FileText size={16} />
                          Key Tasks
                        </h4>
                        <ul className="space-y-2">
                          {phase.keyTasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="text-sm text-neutral-700 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-sage-600 rounded-full mt-2 flex-shrink-0"></span>
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                          <Scale size={16} />
                          Critical Decisions
                        </h4>
                        <ul className="space-y-2">
                          {phase.criticalDecisions.map((decision, decisionIndex) => (
                            <li key={decisionIndex} className="text-sm text-neutral-700 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                              {decision}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Cost Breakdown</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-blue-700">Low: </span>
                          <span className="font-medium">{formatCurrency(phase.estimatedCosts.low)}</span>
                        </div>
                        <div>
                          <span className="text-blue-700">Average: </span>
                          <span className="font-medium">{formatCurrency(phase.estimatedCosts.average)}</span>
                        </div>
                        <div>
                          <span className="text-blue-700">High: </span>
                          <span className="font-medium">{formatCurrency(phase.estimatedCosts.high)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Total Cost Summary */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-green-900 mb-4">Total Estimated Costs</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-800">
                {formatCurrency(getTotalCostRange(selectedScenarioData).low)}
              </div>
              <div className="text-sm text-green-700">Minimum</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-800">
                {formatCurrency(getTotalCostRange(selectedScenarioData).average)}
              </div>
              <div className="text-sm text-green-700">Average</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-800">
                {formatCurrency(getTotalCostRange(selectedScenarioData).high)}
              </div>
              <div className="text-sm text-green-700">Maximum</div>
            </div>
          </div>
          <p className="text-sm text-green-800 mt-4 italic">
            * Costs vary based on complexity, attorney rates, and specific circumstances. 
            Consult with Ohio family law attorneys for personalized estimates.
          </p>
        </div>
      </div>

      {/* Professional Disclaimer */}
      <div className="text-center p-6 bg-neutral-50 rounded-xl border border-neutral-200">
        <p className="text-neutral-700 leading-relaxed">
          <strong>Professional notice:</strong> Timeline and cost estimates are based on typical Ohio divorce proceedings and may vary significantly based on individual circumstances. 
          Consult with licensed Ohio family law attorneys for advice specific to your situation.
        </p>
      </div>
    </div>
  );
};

export default Timeline;
