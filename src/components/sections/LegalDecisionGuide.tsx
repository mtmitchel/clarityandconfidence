import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, Scale } from 'lucide-react';

interface DecisionPath {
  id: string;
  question: string;
  options: {
    text: string;
    leads_to: string;
    explanation?: string;
  }[];
  result?: {
    recommendation: string;
    description: string;
    next_steps: string[];
    estimated_cost: string;
    estimated_time: string;
  };
}

const LegalDecisionGuide: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('start');
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const decisionPaths: { [key: string]: DecisionPath } = {
    start: {
      id: 'start',
      question: 'How would you describe your current situation?',
      options: [
        {
          text: 'We agree on most major issues (assets, custody, support)',
          leads_to: 'agreement_level',
          explanation: 'You both want similar outcomes for the divorce'
        },
        {
          text: 'We disagree on some important issues',
          leads_to: 'conflict_level',
          explanation: 'There are significant decisions you cannot agree on'
        },
        {
          text: 'We cannot communicate or agree on anything',
          leads_to: 'high_conflict',
          explanation: 'Every discussion becomes an argument or standoff'
        },
        {
          text: 'I am concerned about my safety or my children\'s safety',
          leads_to: 'safety_concern',
          explanation: 'There has been or could be domestic violence or threats'
        }
      ]
    },
    
    agreement_level: {
      id: 'agreement_level',
      question: 'How comfortable are you with legal paperwork and procedures?',
      options: [
        {
          text: 'Very comfortable - I can handle forms and research requirements',
          leads_to: 'diy_divorce'
        },
        {
          text: 'Somewhat comfortable - I want guidance but can do some work myself',
          leads_to: 'mediated_divorce'
        },
        {
          text: 'Not comfortable - I want professionals to handle everything',
          leads_to: 'attorney_uncontested'
        }
      ]
    },

    diy_divorce: {
      id: 'diy_divorce',
      question: '',
      options: [],
      result: {
        recommendation: 'Self-Represented (Pro Se) Divorce',
        description: 'You can file for divorce without attorneys since you agree on major issues and are comfortable with paperwork.',
        next_steps: [
          'Download Ohio divorce forms from your county court website',
          'Complete required parent education class (if you have children)',
          'File petition and pay court fees',
          'Serve papers to your spouse',
          'Attend final hearing'
        ],
        estimated_cost: '$200 - $500',
        estimated_time: '3-6 months'
      }
    },

    mediated_divorce: {
      id: 'mediated_divorce',
      question: '',
      options: [],
      result: {
        recommendation: 'Mediated Divorce',
        description: 'Work with a neutral mediator to resolve remaining issues and prepare legal documents.',
        next_steps: [
          'Find a qualified divorce mediator in Ohio',
          'Attend 2-4 mediation sessions',
          'Review final agreement with consulting attorneys',
          'File agreed paperwork with court',
          'Attend final hearing'
        ],
        estimated_cost: '$1,500 - $5,000',
        estimated_time: '4-8 months'
      }
    },

    safety_concern: {
      id: 'safety_concern',
      question: '',
      options: [],
      result: {
        recommendation: 'Immediate Safety Planning + Legal Protection',
        description: 'Your safety is the top priority. Consider protective orders and work with specialized attorneys.',
        next_steps: [
          'Contact National Domestic Violence Hotline: 1-800-799-7233',
          'Apply for temporary protection order',
          'Find attorney experienced in domestic violence cases',
          'Document any incidents or threats',
          'Create safety plan for you and children'
        ],
        estimated_cost: 'Legal aid may be available',
        estimated_time: 'Immediate protection, 6-18 months for divorce'
      }
    }
  };

  const currentPathData = decisionPaths[currentPath];

  const handleAnswer = (option: any) => {
    setAnswers({ ...answers, [currentPath]: option.text });
    setCurrentPath(option.leads_to);
  };

  const resetGuide = () => {
    setCurrentPath('start');
    setAnswers({});
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-light text-sage-900">Legal path finder</h1>
        <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
          Answer a few questions to understand your divorce options in Ohio
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-center space-x-2">
        {Object.keys(answers).map((_, index) => (
          <div key={index} className="w-3 h-3 bg-blue-600 rounded-full" />
        ))}
        <div className="w-3 h-3 bg-neutral-300 rounded-full" />
      </div>

      {/* Question or Result */}
      <div className="bg-white border border-neutral-200 rounded-xl p-8">
        {currentPathData.result ? (
          // Show result
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle2 className="text-green-600 mx-auto mb-4" size={48} />
              <h2 className="text-3xl font-semibold text-neutral-800 mb-4">
                {currentPathData.result.recommendation}
              </h2>
              <p className="text-lg text-neutral-700 leading-relaxed">
                {currentPathData.result.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">Estimated Cost</h3>
                <p className="text-2xl font-bold text-blue-800">{currentPathData.result.estimated_cost}</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-3">Estimated Time</h3>
                <p className="text-2xl font-bold text-green-800">{currentPathData.result.estimated_time}</p>
              </div>
            </div>

            <div className="bg-sage-50 border border-sage-200 rounded-lg p-6">
              <h3 className="font-semibold text-sage-900 mb-4">Your next steps</h3>
              <ol className="space-y-2">
                {currentPathData.result.next_steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="bg-sage-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-sage-800">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="text-center">
              <button
                onClick={resetGuide}
                className="px-6 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50"
              >
                Start over
              </button>
            </div>
          </div>
        ) : (
          // Show question
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-800 text-center">
              {currentPathData.question}
            </h2>
            
            <div className="space-y-4">
              {currentPathData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full p-6 text-left border-2 border-neutral-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-neutral-800 mb-1">{option.text}</p>
                      {option.explanation && (
                        <p className="text-sm text-neutral-600">{option.explanation}</p>
                      )}
                    </div>
                    <ArrowRight className="text-neutral-400" size={20} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="text-amber-600 mt-1 flex-shrink-0" size={24} />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-amber-900">Important note</h3>
            <p className="text-amber-800 leading-relaxed">
              This guide provides general information only. Every situation is unique. 
              Consider consulting with a qualified Ohio family law attorney to understand 
              your specific options and rights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDecisionGuide;
