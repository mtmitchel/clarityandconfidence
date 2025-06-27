export interface TimelinePhase {
  id: string;
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

export interface DivorceScenario {
  type: 'uncontested' | 'contested' | 'collaborative';
  title: string;
  description: string;
  totalDuration: string;
  phases: TimelinePhase[];
  pros: string[];
  cons: string[];
}

export interface TimelineProgress {
  scenarioType: string;
  startDate?: string;
  completedPhases: string[];
  completedTasks: string[];
}

export const divorceScenarios: DivorceScenario[] = [
  {
    type: 'uncontested',
    title: 'Uncontested Divorce',
    description: 'Both parties agree on all major issues including property division, custody, and support',
    totalDuration: '3-6 months',
    phases: [
      {
        id: 'uncontested-initial',
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
        id: 'uncontested-waiting',
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
          'Child parenting time and support arrangements',
          'Spousal support determination'
        ]
      },
      {
        id: 'uncontested-final',
        phase: 'Final Hearing',
        duration: '1 day',
        description: 'Court review and final decree',
        keyTasks: [
          'Attend final hearing',
          'Present separation agreement to judge',
          'Receive final divorce decree',
          'Update legal documents and accounts'
        ],
        estimatedCosts: { low: 0, average: 100, high: 300 },
        criticalDecisions: [
          'Final review of all agreements',
          'Implementation timeline'
        ]
      }
    ],
    pros: [
      'Faster process',
      'Lower costs',
      'Less stress',
      'Privacy maintained',
      'Control over outcomes'
    ],
    cons: [
      'Requires full agreement',
      'May miss important issues',
      'Limited court oversight',
      'Potential for future disputes'
    ]
  },
  {
    type: 'contested',
    title: 'Contested Divorce',
    description: 'Parties disagree on major issues requiring court intervention',
    totalDuration: '6 months - 2 years',
    phases: [
      {
        id: 'contested-initial',
        phase: 'Initial Filing & Response',
        duration: '4-8 weeks',
        description: 'File petition, serve papers, and receive response',
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
        id: 'contested-discovery',
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
        id: 'contested-trial',
        phase: 'Trial & Final Orders',
        duration: '2-6 months',
        description: 'Court trial and final judgment',
        keyTasks: [
          'Pre-trial motions and preparation',
          'Trial presentation',
          'Final judgment entry',
          'Appeals period',
          'Implementation of orders'
        ],
        estimatedCosts: { low: 8000, average: 20000, high: 50000 },
        criticalDecisions: [
          'Trial strategy and evidence',
          'Settlement opportunities during trial',
          'Post-judgment modifications'
        ]
      }
    ],
    pros: [
      'Court protection and oversight',
      'Thorough asset discovery',
      'Professional representation',
      'Binding court orders'
    ],
    cons: [
      'High financial costs',
      'Extended timeline',
      'Emotional stress',
      'Public court records',
      'Unpredictable outcomes'
    ]
  },
  {
    type: 'collaborative',
    title: 'Collaborative Divorce',
    description: 'Team approach with attorneys, coaches, and financial professionals',
    totalDuration: '6-18 months',
    phases: [
      {
        id: 'collaborative-team',
        phase: 'Team Assembly',
        duration: '2-4 weeks',
        description: 'Assemble collaborative team and sign agreements',
        keyTasks: [
          'Select collaborative attorneys',
          'Choose divorce coach',
          'Select financial neutral',
          'Sign participation agreement',
          'Initial team meeting'
        ],
        estimatedCosts: { low: 1500, average: 3000, high: 5000 },
        criticalDecisions: [
          'Team member selection',
          'Process commitment',
          'Communication protocols'
        ]
      },
      {
        id: 'collaborative-negotiation',
        phase: 'Collaborative Negotiation',
        duration: '4-12 months',
        description: 'Interest-based problem solving with team support',
        keyTasks: [
          'Information gathering and sharing',
          'Interest-based discussions',
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
        id: 'collaborative-final',
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
      'Maintained relationships',
      'Privacy protection'
    ],
    cons: [
      'Higher upfront costs',
      'Process commitment required',
      'May not work if power imbalances exist',
      'No guaranteed outcome'
    ]
  }
];

export const calculateProjectedDates = (startDate: string, scenario: DivorceScenario) => {
  const start = new Date(startDate);
  const projectedDates: { [phaseId: string]: { start: Date; end: Date } } = {};
  
  let currentDate = new Date(start);
  
  scenario.phases.forEach(phase => {
    const phaseStart = new Date(currentDate);
    
    // Parse duration to estimate phase length
    let weeks = 4; // default
    if (phase.duration.includes('1-2 weeks')) weeks = 1.5;
    else if (phase.duration.includes('4-8 weeks')) weeks = 6;
    else if (phase.duration.includes('6-12 months')) weeks = 36;
    else if (phase.duration.includes('2-6 months')) weeks = 16;
    else if (phase.duration.includes('30 days')) weeks = 4.3;
    else if (phase.duration.includes('1 day')) weeks = 0.1;
    else if (phase.duration.includes('2-4 weeks')) weeks = 3;
    else if (phase.duration.includes('4-12 months')) weeks = 32;
    else if (phase.duration.includes('1-3 months')) weeks = 8;
    
    const phaseEnd = new Date(currentDate);
    phaseEnd.setDate(phaseEnd.getDate() + (weeks * 7));
    
    projectedDates[phase.id] = {
      start: phaseStart,
      end: phaseEnd
    };
    
    currentDate = new Date(phaseEnd);
  });
  
  return projectedDates;
};
