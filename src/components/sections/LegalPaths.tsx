import React, { useState } from 'react';
import { Scale, MapPin, Clock, DollarSign, Users, ExternalLink, Calculator, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

interface JurisdictionInputs {
  currentResidence: 'ohio' | 'kentucky' | 'other' | '';
  workLocation: 'ohio' | 'kentucky' | 'other' | '';
  monthsInOhio: number;
  monthsInCounty: number;
  spouseLocation: 'ohio' | 'kentucky' | 'other' | '';
  childrenLocation: 'ohio' | 'kentucky' | 'other' | '';
  planToMove: boolean;
  moveLocation: 'ohio' | 'kentucky' | 'other' | '';
}

interface ProcessInputs {
  hasChildren: boolean | null;
  agreeOnTerms: boolean | null;
  complexity: 'simple' | 'moderate' | 'complex' | '';
  hasAssets: boolean | null;
  needsMediation: boolean | null;
}

interface LegalResource {
  title: string;
  organization: string;
  description: string;
  link: string;
  citation: string;
  type: 'court' | 'legal-aid' | 'attorney' | 'forms';
}

const LegalPaths: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jurisdiction' | 'process' | 'resources'>('jurisdiction');
  const [jurisdictionData, setJurisdictionData] = useState<JurisdictionInputs>({
    currentResidence: '',
    workLocation: '',
    monthsInOhio: 0,
    monthsInCounty: 0,
    spouseLocation: '',
    childrenLocation: '',
    planToMove: false,
    moveLocation: ''
  });

  const [processData, setProcessData] = useState<ProcessInputs>({
    hasChildren: null,
    agreeOnTerms: null,
    complexity: '',
    hasAssets: null,
    needsMediation: null
  });

  const legalResources: LegalResource[] = [
    {
      title: "Ohio Supreme Court Divorce Forms",
      organization: "Supreme Court of Ohio",
      description: "Official forms for divorce with children, including parenting plans and financial disclosures",
      link: "https://www.supremecourt.ohio.gov/courts/services-to-courts/children-families/dom-rel-juvenile-forms/divorce-with-children/",
      citation: "Supreme Court of Ohio (2024). Divorce with Children Forms.",
      type: "forms"
    },
    {
      title: "Hamilton County Domestic Relations Court",
      organization: "Hamilton County Courts",
      description: "Local court procedures, filing requirements, and case management for Hamilton County residents",
      link: "https://www.hamiltoncountyohio.gov/government/courts/domestic_relations",
      citation: "Hamilton County Courts (2024). Domestic Relations Court Information.",
      type: "court"
    },
    {
      title: "Ohio Legal Aid Society",
      organization: "Legal Aid Society of Southwest Ohio",
      description: "Free legal assistance for qualifying low-income residents in divorce and family law matters",
      link: "https://www.lascinti.org/",
      citation: "Legal Aid Society of Southwest Ohio (2024). Family Law Services.",
      type: "legal-aid"
    },
    {
      title: "Ohio State Bar Association - Find a Lawyer",
      organization: "Ohio State Bar Association",
      description: "Directory of licensed attorneys specializing in family law and divorce in Ohio",
      link: "https://www.ohiofindalawyer.com/",
      citation: "Ohio State Bar Association (2024). Attorney Directory.",
      type: "attorney"
    },
    {
      title: "Kentucky Circuit Court Family Division",
      organization: "Kentucky Court of Justice",
      description: "Kentucky family court procedures and forms for cross-jurisdictional cases",
      link: "https://kycourts.gov/",
      citation: "Kentucky Court of Justice (2024). Family Court Information.",
      type: "court"
    }
  ];

  const getJurisdictionRecommendation = () => {
    const { currentResidence, monthsInOhio, monthsInCounty, childrenLocation } = jurisdictionData;
    
    if (currentResidence === 'ohio' && monthsInOhio >= 6 && monthsInCounty >= 3) {
      return {
        canFile: 'ohio',
        reason: 'You meet Ohio residency requirements (6 months in state, 3 months in county)',
        timeline: 'You can file immediately',
        considerations: childrenLocation === 'ohio' ? 
          'Ohio courts will handle both divorce and custody matters' :
          'Ohio will handle divorce; custody jurisdiction may be complex if children live elsewhere',
        citation: "Ohio Rev. Code § 3105.03 (2024). Residency requirements for divorce."
      };
    } else if (currentResidence === 'kentucky') {
      return {
        canFile: 'kentucky',
        reason: 'You would need to meet Kentucky residency requirements (180 days)',
        timeline: 'Can file after 6 months of Kentucky residency',
        considerations: 'If spouse or children remain in Ohio, jurisdiction may be complex',
        citation: "Kentucky Rev. Stat. § 403.140 (2024). Residency requirements."
      };
    } else {
      return {
        canFile: 'unclear',
        reason: 'Residency requirements not met in either state',
        timeline: `Need ${6 - monthsInOhio} more months in Ohio or move to establish residency`,
        considerations: 'Consider consulting with attorneys in both states',
        citation: "Interstate jurisdiction requires careful legal analysis."
      };
    }
  };

  const getProcessRecommendation = () => {
    const { hasChildren, agreeOnTerms, complexity } = processData;
    
    if (agreeOnTerms && complexity === 'simple' && !hasChildren) {
      return {
        recommended: 'dissolution',
        timeline: '4-6 months',
        cost: '$500-$1,500',
        process: 'Joint petition, no court hearing required if uncontested',
        citation: "Ohio Rev. Code § 3105.61 (2024). Dissolution of marriage."
      };
    } else if (hasChildren || !agreeOnTerms || complexity === 'complex') {
      return {
        recommended: 'divorce',
        timeline: '6 months - 2 years',
        cost: '$2,000-$15,000+',
        process: 'Individual filing, potential court hearings, discovery process',
        citation: "Ohio Rev. Code § 3105.01 (2024). Divorce proceedings."
      };
    } else {
      return {
        recommended: 'consult-attorney',
        timeline: 'Varies',
        cost: 'Consult for estimate',
        process: 'Professional evaluation needed for complex situation',
        citation: "Complex cases require individual legal analysis."
      };
    }
  };

  const renderResourceCard = (resource: LegalResource) => (
    <div key={resource.title} className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          resource.type === 'court' ? 'bg-blue-100' :
          resource.type === 'legal-aid' ? 'bg-green-100' :
          resource.type === 'attorney' ? 'bg-purple-100' : 'bg-orange-100'
        }`}>
          {resource.type === 'court' && <Scale className="text-blue-600" size={24} />}
          {resource.type === 'legal-aid' && <Users className="text-green-600" size={24} />}
          {resource.type === 'attorney' && <FileText className="text-purple-600" size={24} />}
          {resource.type === 'forms' && <Calculator className="text-orange-600" size={24} />}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-neutral-800 mb-2">{resource.title}</h3>
          <p className="text-sm text-neutral-600 mb-2">{resource.organization}</p>
          <p className="text-neutral-700 mb-3">{resource.description}</p>
          <div className="flex flex-col gap-2">
            <a 
              href={resource.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              <ExternalLink size={16} />
              Visit Resource
            </a>
            <p className="text-xs text-neutral-500 italic">{resource.citation}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const isJurisdictionComplete = jurisdictionData.currentResidence && jurisdictionData.monthsInOhio >= 0;
  const isProcessComplete = processData.hasChildren !== null && processData.agreeOnTerms !== null;

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-light text-sage-900">Legal paths</h1>
        <p className="text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed">
          Interactive tools to explore jurisdiction, process options, and legal requirements for Ohio and Kentucky residents
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="bg-neutral-100 rounded-xl p-1 flex">
          {[
            { id: 'jurisdiction', label: 'Where to file', icon: MapPin },
            { id: 'process', label: 'Process options', icon: Scale },
            { id: 'resources', label: 'Legal resources', icon: FileText }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-white text-sage-900 shadow-sm' 
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Jurisdiction Analysis */}
      {activeTab === 'jurisdiction' && (
        <div className="space-y-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">Jurisdiction analyzer</h2>
            <p className="text-blue-800 mb-6">
              Determine where you can file based on residency requirements and family circumstances
            </p>

            <div className="grid md:grid-cols-2 gap-6 space-y-0">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">Current residence</label>
                  <select
                    value={jurisdictionData.currentResidence}
                    onChange={(e) => setJurisdictionData({...jurisdictionData, currentResidence: e.target.value as any})}
                    className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select state</option>
                    <option value="ohio">Ohio</option>
                    <option value="kentucky">Kentucky</option>
                    <option value="other">Other state</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">Work location</label>
                  <select
                    value={jurisdictionData.workLocation}
                    onChange={(e) => setJurisdictionData({...jurisdictionData, workLocation: e.target.value as any})}
                    className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select state</option>
                    <option value="ohio">Ohio</option>
                    <option value="kentucky">Kentucky</option>
                    <option value="other">Other state</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">Months living in Ohio</label>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={jurisdictionData.monthsInOhio}
                    onChange={(e) => setJurisdictionData({...jurisdictionData, monthsInOhio: parseInt(e.target.value) || 0})}
                    className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">Months in current Ohio county</label>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={jurisdictionData.monthsInCounty}
                    onChange={(e) => setJurisdictionData({...jurisdictionData, monthsInCounty: parseInt(e.target.value) || 0})}
                    className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">Children's primary residence</label>
                  <select
                    value={jurisdictionData.childrenLocation}
                    onChange={(e) => setJurisdictionData({...jurisdictionData, childrenLocation: e.target.value as any})}
                    className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select or N/A</option>
                    <option value="ohio">Ohio</option>
                    <option value="kentucky">Kentucky</option>
                    <option value="other">Other state</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">Spouse's residence</label>
                  <select
                    value={jurisdictionData.spouseLocation}
                    onChange={(e) => setJurisdictionData({...jurisdictionData, spouseLocation: e.target.value as any})}
                    className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select state</option>
                    <option value="ohio">Ohio</option>
                    <option value="kentucky">Kentucky</option>
                    <option value="other">Other state</option>
                  </select>
                </div>
              </div>
            </div>

            {isJurisdictionComplete && (
              <div className="mt-8 bg-white rounded-lg p-6 border-l-4 border-blue-600">
                <h3 className="font-semibold text-neutral-800 mb-4">Jurisdiction Analysis Results</h3>
                {(() => {
                  const rec = getJurisdictionRecommendation();
                  return (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`${rec.canFile === 'ohio' ? 'text-green-600' : 'text-orange-600'}`} size={20} />
                        <span className="font-medium">{rec.reason}</span>
                      </div>
                      <p><strong>Timeline:</strong> {rec.timeline}</p>
                      <p><strong>Considerations:</strong> {rec.considerations}</p>
                      <p className="text-xs text-neutral-500 italic mt-2">{rec.citation}</p>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Process Options */}
      {activeTab === 'process' && (
        <div className="space-y-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-green-900 mb-6">Process options: Divorce vs. dissolution</h2>
            <p className="text-green-800 mb-6">
              Explore different legal paths based on your situation and level of agreement
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-green-900 mb-3">Do you have children together?</h3>
                <div className="flex gap-4">
                  {[
                    { value: true, label: 'Yes' },
                    { value: false, label: 'No' }
                  ].map(option => (
                    <label key={option.label} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasChildren"
                        checked={processData.hasChildren === option.value}
                        onChange={() => setProcessData({...processData, hasChildren: option.value})}
                        className="text-green-600"
                      />
                      <span className="text-green-800">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-green-900 mb-3">Do you agree on all major terms?</h3>
                <div className="flex gap-4">
                  {[
                    { value: true, label: 'Yes, we agree on everything' },
                    { value: false, label: 'No, we have disagreements' }
                  ].map(option => (
                    <label key={option.label} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="agreeOnTerms"
                        checked={processData.agreeOnTerms === option.value}
                        onChange={() => setProcessData({...processData, agreeOnTerms: option.value})}
                        className="text-green-600"
                      />
                      <span className="text-green-800">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-green-900 mb-3">How complex is your situation?</h3>
                <div className="space-y-2">
                  {[
                    { value: 'simple', label: 'Simple (minimal assets, no business, short marriage)' },
                    { value: 'moderate', label: 'Moderate (some assets, retirement accounts, longer marriage)' },
                    { value: 'complex', label: 'Complex (business ownership, substantial assets, custody disputes)' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="complexity"
                        checked={processData.complexity === option.value}
                        onChange={() => setProcessData({...processData, complexity: option.value as any})}
                        className="text-green-600"
                      />
                      <span className="text-green-800">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {isProcessComplete && (
                <div className="bg-white rounded-lg p-6 border-l-4 border-green-600">
                  <h3 className="font-semibold text-neutral-800 mb-4">Recommended Process</h3>
                  {(() => {
                    const rec = getProcessRecommendation();
                    return (
                      <div className="space-y-3">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <span className="text-sm font-medium text-neutral-600">Recommended:</span>
                            <p className="font-semibold capitalize">{rec.recommended.replace('-', ' ')}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-neutral-600">Timeline:</span>
                            <p className="font-semibold">{rec.timeline}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-neutral-600">Estimated Cost:</span>
                            <p className="font-semibold">{rec.cost}</p>
                          </div>
                        </div>
                        <p><strong>Process:</strong> {rec.process}</p>
                        <p className="text-xs text-neutral-500 italic mt-2">{rec.citation}</p>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Process Comparison Table */}
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-800">Process comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-neutral-600">Factor</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-neutral-600">Dissolution</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-neutral-600">Divorce</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-neutral-800">Agreement Required</td>
                    <td className="px-6 py-4 text-sm text-neutral-700">Yes, on all terms</td>
                    <td className="px-6 py-4 text-sm text-neutral-700">No, court can decide</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-neutral-800">Timeline</td>
                    <td className="px-6 py-4 text-sm text-neutral-700">4-6 months minimum</td>
                    <td className="px-6 py-4 text-sm text-neutral-700">6+ months if children</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-neutral-800">Court Hearings</td>
                    <td className="px-6 py-4 text-sm text-neutral-700">Minimal (if uncontested)</td>
                    <td className="px-6 py-4 text-sm text-neutral-700">Likely multiple hearings</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-neutral-800">Cost</td>
                    <td className="px-6 py-4 text-sm text-neutral-700">$500-$1,500</td>
                    <td className="px-6 py-4 text-sm text-neutral-700">$2,000-$15,000+</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
              <p className="text-xs text-neutral-500 italic">
                Sources: Ohio Rev. Code § 3105.61 (Dissolution); Ohio Rev. Code § 3105.01 (Divorce)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Resources */}
      {activeTab === 'resources' && (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-light text-neutral-800 mb-4">Legal resources</h2>
            <p className="text-xl text-neutral-700">
              Official courts, legal aid, and professional services for Ohio and Kentucky residents
            </p>
          </div>

          <div className="grid gap-6">
            {legalResources.map(renderResourceCard)}
          </div>

          {/* Quick Reference */}
          <div className="bg-sage-50 border border-sage-200 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-sage-900 mb-6">Quick reference: Key requirements</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-sage-800">Ohio Requirements</h4>
                <ul className="space-y-2 text-sage-700 text-sm">
                  <li>• 6 months Ohio residency</li>
                  <li>• 90 days county residency</li>
                  <li>• 42-day waiting period (divorce)</li>
                  <li>• 30-day waiting period (dissolution)</li>
                  <li>• Parenting class if children involved</li>
                </ul>
                <p className="text-xs text-sage-600 italic">Source: Ohio Rev. Code § 3105.03, § 3105.61</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-sage-800">Kentucky Requirements</h4>
                <ul className="space-y-2 text-sage-700 text-sm">
                  <li>• 180 days Kentucky residency</li>
                  <li>• 60-day waiting period</li>
                  <li>• "Irretrievably broken" standard</li>
                  <li>• Parenting plan required if children</li>
                  <li>• Mediation encouraged</li>
                </ul>
                <p className="text-xs text-sage-600 italic">Source: Kentucky Rev. Stat. § 403.140, § 403.170</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Information for Immediate Help */}
      <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-amber-600 mt-1 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-medium text-neutral-800 mb-2">Need immediate legal guidance?</h3>
            <p className="text-neutral-700 text-sm mb-3">
              Complex jurisdictional questions often require professional legal analysis. Consider consulting with:
            </p>
            <div className="flex gap-4 text-sm">
              <span>📞 Ohio Legal Aid: 1-866-529-6446</span>
              <span>📞 Kentucky Legal Aid: 1-800-247-2510</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPaths;