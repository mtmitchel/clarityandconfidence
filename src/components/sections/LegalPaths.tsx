import React from 'react';
import { Scale, Users, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { complexityFactors, calculateComplexity, getRecommendation } from '../../data/legalPaths';

const LegalPaths: React.FC = () => {
  const [hasChildren, setHasChildren] = useLocalStorageState<boolean | null>('legal-paths-hasChildren', null);
  const [agreeOnTerms, setAgreeOnTerms] = useLocalStorageState<boolean | null>('legal-paths-agreeOnTerms', null);
  const [selectedComplexityFactors, setSelectedComplexityFactors] = useLocalStorageState<string[]>('legal-paths-complexity-factors', []);

  const toggleComplexityFactor = (factorId: string) => {
    setSelectedComplexityFactors(prev =>
      prev.includes(factorId)
        ? prev.filter(id => id !== factorId)
        : [...prev, factorId]
    );
  };

  const complexityScore = calculateComplexity(selectedComplexityFactors);
  const recommendation = getRecommendation(hasChildren, agreeOnTerms, complexityScore, selectedComplexityFactors);
  const isComplete = hasChildren !== null && agreeOnTerms !== null;

  const renderRecommendation = () => {
    if (!isComplete) return null;

    const { title, description, pros, cons, citation, link } = recommendation;
    const isDissolution = title === 'Dissolution';

    return (
      <div className={`mt-12 bg-white rounded-2xl border-2 ${isDissolution ? 'border-blue-300' : 'border-amber-300'} shadow-lg`}>
        <div className={`px-8 py-6 rounded-t-xl ${isDissolution ? 'bg-blue-50' : 'bg-amber-50'}`}>
          <h3 className={`text-2xl font-semibold ${isDissolution ? 'text-blue-900' : 'text-amber-900'}`}>
            Recommended Path: {title}
          </h3>
          <p className={`mt-2 ${isDissolution ? 'text-blue-800' : 'text-amber-800'}`}>
            {description}
          </p>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-700 mb-2">Pros</h4>
              <ul className="space-y-2">
                {pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={16} />
                    <span className="text-neutral-700">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-700 mb-2">Cons</h4>
              <ul className="space-y-2">
                {cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertTriangle className="text-red-500 mt-1 flex-shrink-0" size={16} />
                    <span className="text-neutral-700">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-4 border-t border-neutral-200">
            <p className="text-sm text-neutral-600 italic">
              This recommendation is based on the information you provided. It is not legal advice.
            </p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium mt-2"
            >
              <ExternalLink size={14} />
              {citation}
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <Scale className="mx-auto text-sage-500" size={40} />
        <h1 className="text-4xl font-light text-sage-900">Divorce or Dissolution?</h1>
        <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
          In Ohio, you can end a marriage through a <span className="font-semibold text-blue-700">Dissolution</span> or a <span className="font-semibold text-amber-700">Divorce</span>.
          Answer the questions below to understand which path might be right for your situation.
        </p>
      </div>

      <div className="space-y-10">
        {/* Step 1: Agreement */}
        <div className="p-8 bg-white rounded-2xl border border-neutral-200 shadow-sm">
          <div className="flex items-start gap-6">
            <div className="text-3xl font-bold text-sage-300">1</div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-800">Level of Agreement</h2>
              <p className="text-neutral-600 mt-1 mb-4">Can you and your spouse agree on all major terms (property, debts, and if applicable, parenting)?</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setAgreeOnTerms(true)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${agreeOnTerms === true ? 'border-blue-500 bg-blue-50' : 'border-neutral-200 hover:border-blue-300'}`}
                >
                  <h3 className="font-semibold text-neutral-800">Yes, we agree on everything.</h3>
                  <p className="text-sm text-neutral-600">We have a full agreement and can sign all documents together.</p>
                </button>
                <button
                  onClick={() => setAgreeOnTerms(false)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${agreeOnTerms === false ? 'border-amber-500 bg-amber-50' : 'border-neutral-200 hover:border-amber-300'}`}
                >
                  <h3 className="font-semibold text-neutral-800">No, we have disagreements.</h3>
                  <p className="text-sm text-neutral-600">We need a judge to decide one or more issues for us.</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Children */}
        <div className="p-8 bg-white rounded-2xl border border-neutral-200 shadow-sm">
          <div className="flex items-start gap-6">
            <div className="text-3xl font-bold text-sage-300">2</div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-800">Children</h2>
              <p className="text-neutral-600 mt-1 mb-4">Do you and your spouse have minor children together?</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setHasChildren(true)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${hasChildren === true ? 'border-gray-400 bg-gray-100' : 'border-neutral-200 hover:border-gray-300'}`}
                >
                  <h3 className="font-semibold text-neutral-800">Yes, we have minor children.</h3>
                </button>
                <button
                  onClick={() => setHasChildren(false)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${hasChildren === false ? 'border-gray-400 bg-gray-100' : 'border-neutral-200 hover:border-gray-300'}`}
                >
                  <h3 className="font-semibold text-neutral-800">No, we do not.</h3>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Complexity */}
        <div className="p-8 bg-white rounded-2xl border border-neutral-200 shadow-sm">
          <div className="flex items-start gap-6">
            <div className="text-3xl font-bold text-sage-300">3</div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-800">Financial Complexity</h2>
              <p className="text-neutral-600 mt-1 mb-4">Check any of the following factors that apply to your situation. This helps gauge how complex your case might be.</p>
              <div className="grid md:grid-cols-2 gap-3">
                {complexityFactors.map(factor => (
                  <label key={factor.id} className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedComplexityFactors.includes(factor.id)}
                      onChange={() => toggleComplexityFactor(factor.id)}
                      className="text-blue-600 mt-1 focus:ring-blue-500"
                    />
                    <div>
                      <span className="font-medium text-neutral-800">{factor.question}</span>
                      <p className="text-xs text-neutral-500 mt-1">{factor.description}</p>
                    </div>
                  </label>
                ))}
              </div>
              {selectedComplexityFactors.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 font-medium">
                    Complexity Score: {complexityScore} / 10
                    <span className="ml-2 font-normal">
                      ({complexityScore <= 3 ? 'Low' : complexityScore <= 6 ? 'Moderate' : 'High'})
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Section */}
      {renderRecommendation()}

    </div>
  );
};

export default LegalPaths;