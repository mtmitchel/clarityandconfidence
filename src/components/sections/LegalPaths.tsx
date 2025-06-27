import React, { useState, useEffect } from 'react';
import { Scale, CheckCircle, XCircle, AlertCircle, Trash2 } from 'lucide-react';
import { 
  saveLegalPathData, 
  loadLegalPathData, 
  clearStorageSection,
  STORAGE_KEYS,
  LegalPathData 
} from '../../lib/storage';

const LegalPaths: React.FC = () => {
  const [data, setData] = useState<LegalPathData>({
    hasChildren: null,
    agreesOnTerms: null,
    conflictLevel: null,
    recommendation: null,
    lastUpdated: '',
  });

  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    setData(loadLegalPathData());
  }, []);

  // Save data when it changes
  useEffect(() => {
    if (data.hasChildren !== null || data.agreesOnTerms !== null || data.conflictLevel !== null) {
      const updatedData = {
        ...data,
        lastUpdated: new Date().toISOString(),
      };
      setData(updatedData);
      saveLegalPathData(updatedData);
    }
  }, [data.hasChildren, data.agreesOnTerms, data.conflictLevel]);

  // Calculate recommendation based on answers
  useEffect(() => {
    if (data.hasChildren !== null && data.agreesOnTerms !== null && data.conflictLevel !== null) {
      let recommendation: 'dissolution' | 'divorce';
      
      // Logic for recommendation
      if (data.agreesOnTerms && !data.conflictLevel) {
        recommendation = 'dissolution';
      } else {
        recommendation = 'divorce';
      }
      
      setData(prev => ({ ...prev, recommendation }));
    }
  }, [data.hasChildren, data.agreesOnTerms, data.conflictLevel]);

  const handleAnswer = (question: keyof LegalPathData, answer: boolean) => {
    setData(prev => ({ ...prev, [question]: answer }));
  };

  const clearSection = () => {
    if (showClearConfirm) {
      clearStorageSection(STORAGE_KEYS.LEGAL_PATH);
      setData({
        hasChildren: null,
        agreesOnTerms: null,
        conflictLevel: null,
        recommendation: null,
        lastUpdated: '',
      });
      setShowClearConfirm(false);
    } else {
      setShowClearConfirm(true);
    }
  };

  const QuestionCard = ({ 
    question, 
    description, 
    questionKey, 
    value 
  }: { 
    question: string;
    description: string;
    questionKey: keyof LegalPathData;
    value: boolean | null;
  }) => (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h3 className="font-medium text-slate-800 mb-2">{question}</h3>
      <p className="text-slate-600 text-sm mb-4">{description}</p>
      <div className="flex gap-3">
        <button
          onClick={() => handleAnswer(questionKey, true)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-colors
            ${value === true 
              ? 'bg-sage-100 border-sage-300 text-sage-800' 
              : 'border-slate-300 text-slate-700 hover:bg-slate-50'
            }
          `}
        >
          <CheckCircle size={16} />
          Yes
        </button>
        <button
          onClick={() => handleAnswer(questionKey, false)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-colors
            ${value === false 
              ? 'bg-red-100 border-red-300 text-red-800' 
              : 'border-slate-300 text-slate-700 hover:bg-slate-50'
            }
          `}
        >
          <XCircle size={16} />
          No
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Scale className="text-calm-600" size={32} />
          <h1 className="text-3xl font-semibold text-calm-800">Exploring legal paths</h1>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          In Ohio, there are two main ways to end a marriage: dissolution and divorce. 
          This tool will help you understand which path might be more suitable for your situation.
        </p>
      </div>

      {/* Education Section */}
      <div className="bg-calm-50 border border-calm-200 rounded-lg p-6">
        <h2 className="text-xl font-medium text-calm-800 mb-4">Understanding your options</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-medium text-sage-800">Dissolution</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• Both parties agree on all terms</li>
              <li>• Faster and typically less expensive</li>
              <li>• More private process</li>
              <li>• Requires cooperation and communication</li>
              <li>• Usually completed in 30-90 days</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-red-800">Divorce</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• Court decides disputed issues</li>
              <li>• Necessary when parties disagree</li>
              <li>• More formal legal process</li>
              <li>• Can take several months to years</li>
              <li>• Higher costs and more court involvement</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Decision Questions */}
      <div className="space-y-6">
        <h2 className="text-xl font-medium text-slate-800">Answer these questions to get a recommendation</h2>
        
        <QuestionCard
          question="Do you and your spouse have children together?"
          description="This includes minor children and adult children with special needs who require ongoing support."
          questionKey="hasChildren"
          value={data.hasChildren}
        />

        <QuestionCard
          question="Do you and your spouse generally agree on how to divide property, debts, and handle parenting arrangements?"
          description="This means you can have productive conversations and reach agreements, even if some negotiation is needed."
          questionKey="agreesOnTerms"
          value={data.agreesOnTerms}
        />

        <QuestionCard
          question="Is there high conflict, abuse, or do you feel unsafe communicating directly with your spouse?"
          description="This includes emotional, physical, or financial abuse, or situations where direct communication feels threatening or impossible."
          questionKey="conflictLevel"
          value={data.conflictLevel}
        />
      </div>

      {/* Recommendation */}
      {data.recommendation && (
        <div className={`
          rounded-lg p-6 border-2
          ${data.recommendation === 'dissolution' 
            ? 'bg-sage-50 border-sage-300' 
            : 'bg-yellow-50 border-yellow-300'
          }
        `}>
          <div className="flex items-start gap-3">
            <AlertCircle className={`
              mt-1 flex-shrink-0
              ${data.recommendation === 'dissolution' ? 'text-sage-600' : 'text-yellow-600'}
            `} size={24} />
            <div className="space-y-3">
              <h3 className={`
                text-xl font-medium
                ${data.recommendation === 'dissolution' ? 'text-sage-800' : 'text-yellow-800'}
              `}>
                Based on your answers, {data.recommendation} might be the better path for you
              </h3>
              
              {data.recommendation === 'dissolution' ? (
                <div className="space-y-2 text-sage-700">
                  <p>
                    Since you and your spouse can communicate and generally agree on terms, 
                    dissolution could be a faster, less expensive, and more private option.
                  </p>
                  <p className="font-medium">Next steps for dissolution:</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Consider working with a mediator to finalize agreements</li>
                    <li>• Consult with an attorney to review your dissolution agreement</li>
                    <li>• Gather financial documents and asset information</li>
                    <li>• File jointly with the court once all terms are agreed upon</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-2 text-yellow-800">
                  <p>
                    Given the disagreements or conflict in your situation, 
                    divorce through the court system may be necessary to protect your interests.
                  </p>
                  <p className="font-medium">Next steps for divorce:</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Consult with a qualified divorce attorney</li>
                    <li>• Gather all financial documents and records</li>
                    <li>• Consider safety planning if there are abuse concerns</li>
                    <li>• Explore mediation or collaborative divorce options</li>
                    <li>• Understand temporary orders for support and custody</li>
                  </ul>
                </div>
              )}

              <div className="mt-4 p-3 bg-white/70 rounded border">
                <p className="text-sm text-slate-700">
                  <strong>Remember:</strong> This is general guidance only. Every situation is unique, 
                  and you should consult with a qualified Ohio attorney to understand your specific options 
                  and rights. Many attorneys offer free consultations to discuss your situation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Information */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h3 className="font-medium text-slate-800 mb-3">Important considerations for both paths</h3>
        <div className="space-y-2 text-sm text-slate-700">
          <p>• <strong>Legal representation:</strong> Even in dissolution, it's wise to have an attorney review your agreement.</p>
          <p>• <strong>Financial disclosure:</strong> Both parties must provide complete financial information.</p>
          <p>• <strong>Children's interests:</strong> The court must approve any arrangements involving minor children.</p>
          <p>• <strong>Waiting periods:</strong> Ohio has waiting periods that vary by county and circumstances.</p>
          <p>• <strong>Mediation:</strong> Can be helpful in both processes to resolve disagreements.</p>
        </div>
      </div>

      {/* Clear Section */}
      <div className="border-t border-slate-200 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-slate-800">Clear this section</h3>
            <p className="text-sm text-slate-600">This will reset all your answers and recommendations.</p>
          </div>
          <button
            onClick={clearSection}
            className={`
              px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2
              ${showClearConfirm 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
              }
            `}
          >
            <Trash2 size={16} />
            {showClearConfirm ? 'Confirm: Clear everything' : 'Clear this section'}
          </button>
        </div>
        {showClearConfirm && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">
              Are you sure? This will reset all your answers. 
              <button
                onClick={() => setShowClearConfirm(false)}
                className="ml-2 underline hover:no-underline"
              >
                Cancel
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalPaths;
