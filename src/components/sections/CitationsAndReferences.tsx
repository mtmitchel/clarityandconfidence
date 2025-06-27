import React from 'react';
import { BookOpen, ExternalLink, Calendar } from 'lucide-react';

interface Citation {
  id: string;
  title: string;
  organization: string;
  year: number;
  url?: string;
  type: 'government' | 'legal' | 'research' | 'organization';
  description: string;
}

const CitationsAndReferences: React.FC = () => {
  const citations: Citation[] = [
    // Government Sources
    {
      id: 'ohio-supreme-court',
      title: 'Ohio Supreme Court Family Law Forms and Resources',
      organization: 'Supreme Court of Ohio',
      year: 2024,
      url: 'https://www.supremecourt.ohio.gov/courts/services-to-courts/children-families/',
      type: 'government',
      description: 'Official forms for divorce with children, dissolution, and domestic relations proceedings in Ohio'
    },
    {
      id: 'hamilton-county-courts',
      title: 'Hamilton County Domestic Relations Court Information',
      organization: 'Hamilton County Courts',
      year: 2024,
      url: 'https://www.hamiltoncountyohio.gov/government/courts/domestic_relations',
      type: 'government',
      description: 'Local court procedures, filing requirements, and case management for Hamilton County residents'
    },
    {
      id: 'ohio-child-support',
      title: 'Ohio Child Support Guidelines and Calculator',
      organization: 'Ohio Department of Job and Family Services',
      year: 2024,
      url: 'https://jfs.ohio.gov/ocs/calculator.stm',
      type: 'government',
      description: 'Official Ohio child support calculation guidelines and online calculator'
    },
    {
      id: 'ohio-legal-aid',
      title: 'Ohio Legal Aid Directory and Self-Help Resources',
      organization: 'Ohio Legal Help',
      year: 2024,
      url: 'https://www.ohiolegalhelp.org/',
      type: 'government',
      description: 'Statewide legal aid directory and self-help resources for low-income residents'
    },

    // Legal Organizations
    {
      id: 'legal-aid-cincinnati',
      title: 'Legal Aid Society of Greater Cincinnati Services',
      organization: 'Legal Aid Society of Southwest Ohio',
      year: 2024,
      url: 'https://www.lasco.org/',
      type: 'legal',
      description: 'Free and reduced-fee legal representation for qualifying individuals in family law matters'
    },
    {
      id: 'ohio-state-bar',
      title: 'Ohio State Bar Association Lawyer Referral Service',
      organization: 'Ohio State Bar Association',
      year: 2024,
      url: 'https://www.ohiobar.org/public-resources/find-a-lawyer/',
      type: 'legal',
      description: 'Professional lawyer referral service and directory for Ohio attorneys'
    },
    {
      id: 'collaborative-divorce-ohio',
      title: 'Collaborative Divorce Professionals Directory',
      organization: 'Collaborative Divorce Ohio',
      year: 2024,
      url: 'https://www.collaborativedivorceohio.com/',
      type: 'legal',
      description: 'Directory of collaborative divorce professionals and team-based divorce processes'
    },

    // Research and Academic Sources
    {
      id: 'apa-divorce-research',
      title: 'The Impact of Divorce on Mental Health: Evidence-Based Insights',
      organization: 'American Psychological Association',
      year: 2023,
      url: 'https://www.apa.org/topics/divorce-child-custody',
      type: 'research',
      description: 'Peer-reviewed research on divorce-related stress, coping mechanisms, and recovery patterns'
    },
    {
      id: 'resilience-research',
      title: 'Resilience in Adults: A Narrative Review',
      organization: 'Journal of Clinical Medicine',
      year: 2022,
      type: 'research',
      description: 'Comprehensive review of resilience factors and evidence-based interventions for adults'
    },
    {
      id: 'phq-9-source',
      title: 'The PHQ-9: Validity of a Brief Depression Severity Measure',
      organization: 'Journal of General Internal Medicine',
      year: 2001,
      type: 'research',
      description: 'Source for depression screening tool adapted in the self-assessment section'
    },

    // Professional Organizations
    {
      id: 'ohio-mediation-association',
      title: 'Ohio Mediation Association Directory',
      organization: 'Ohio Mediation Association',
      year: 2024,
      url: 'https://www.ohiomediation.org/',
      type: 'organization',
      description: 'Directory of certified mediators offering alternative dispute resolution services'
    },
    {
      id: 'psychology-today',
      title: 'Psychology Today Therapist Directory - Ohio',
      organization: 'Psychology Today',
      year: 2024,
      url: 'https://www.psychologytoday.com/us/therapists/oh',
      type: 'organization',
      description: 'Comprehensive directory of mental health professionals with insurance verification'
    },
    {
      id: 'divorcecare',
      title: 'DivorceCare Support Group Directory',
      organization: 'DivorceCare',
      year: 2024,
      url: 'https://www.divorcecare.org/',
      type: 'organization',
      description: 'Faith-based divorce recovery support groups with locations throughout Ohio'
    },
    {
      id: 'nfcc',
      title: 'National Foundation for Credit Counseling Services',
      organization: 'National Foundation for Credit Counseling',
      year: 2024,
      url: 'https://www.nfcc.org/',
      type: 'organization',
      description: 'Free and low-cost credit counseling and debt management services'
    },
    {
      id: 'crisis-text-line',
      title: '24/7 Crisis Support Services',
      organization: 'Crisis Text Line',
      year: 2024,
      url: 'https://www.crisistextline.org/',
      type: 'organization',
      description: '24/7 crisis support via text message for mental health emergencies'
    }
  ];

  const getCitationIcon = (type: Citation['type']) => {
    switch (type) {
      case 'government':
        return '🏛️';
      case 'legal':
        return '⚖️';
      case 'research':
        return '📊';
      case 'organization':
        return '🏢';
    }
  };

  const getCitationColor = (type: Citation['type']) => {
    switch (type) {
      case 'government':
        return 'bg-blue-50 border-blue-200';
      case 'legal':
        return 'bg-green-50 border-green-200';
      case 'research':
        return 'bg-purple-50 border-purple-200';
      case 'organization':
        return 'bg-orange-50 border-orange-200';
    }
  };

  const groupedCitations = {
    government: citations.filter(c => c.type === 'government'),
    legal: citations.filter(c => c.type === 'legal'),
    research: citations.filter(c => c.type === 'research'),
    organization: citations.filter(c => c.type === 'organization')
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-light text-sage-900">References & citations</h1> {/* updated to sentence case */}
        <p className="text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed">
          All sources, citations, and references used throughout this application, 
          organized by category for transparency and verification
        </p>
      </div>

      {/* Last Updated Notice */}
      <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Calendar className="text-neutral-600" size={20} />
          <h3 className="font-semibold text-neutral-800">Content verification</h3> {/* updated to sentence case */}
        </div>
        <p className="text-neutral-700 leading-relaxed">
          All sources and links were last verified in June 2025. This application prioritizes 
          official government sources, peer-reviewed research, and established legal organizations 
          to ensure accuracy and reliability.
        </p>
      </div>

      {/* Government Sources */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-900 border-b border-blue-200 pb-2">
          Government sources {/* updated to sentence case */}
        </h2>
        <div className="grid gap-6">
          {groupedCitations.government.map(citation => (
            <div 
              key={citation.id} 
              className={`border rounded-xl p-6 ${getCitationColor(citation.type)}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{getCitationIcon(citation.type)}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-neutral-800 mb-1">{citation.title}</h3>
                      <p className="text-sm text-neutral-600">
                        {citation.organization} ({citation.year})
                      </p>
                    </div>
                    {citation.url && (
                      <a
                        href={citation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <ExternalLink size={16} />
                        <span className="text-sm">Visit source</span>
                      </a>
                    )}
                  </div>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    {citation.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legal Organizations */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-900 border-b border-green-200 pb-2">
          Legal organizations {/* updated to sentence case */}
        </h2>
        <div className="grid gap-6">
          {groupedCitations.legal.map(citation => (
            <div 
              key={citation.id} 
              className={`border rounded-xl p-6 ${getCitationColor(citation.type)}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{getCitationIcon(citation.type)}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-neutral-800 mb-1">{citation.title}</h3>
                      <p className="text-sm text-neutral-600">
                        {citation.organization} ({citation.year})
                      </p>
                    </div>
                    {citation.url && (
                      <a
                        href={citation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <ExternalLink size={16} />
                        <span className="text-sm">Visit source</span>
                      </a>
                    )}
                  </div>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    {citation.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Research Sources */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-purple-900 border-b border-purple-200 pb-2">
          Research & academic sources {/* updated to sentence case */}
        </h2>
        <div className="grid gap-6">
          {groupedCitations.research.map(citation => (
            <div 
              key={citation.id} 
              className={`border rounded-xl p-6 ${getCitationColor(citation.type)}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{getCitationIcon(citation.type)}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-neutral-800 mb-1">{citation.title}</h3>
                      <p className="text-sm text-neutral-600">
                        {citation.organization} ({citation.year})
                      </p>
                    </div>
                    {citation.url && (
                      <a
                        href={citation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <ExternalLink size={16} />
                        <span className="text-sm">Visit source</span>
                      </a>
                    )}
                  </div>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    {citation.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Organizations */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-orange-900 border-b border-orange-200 pb-2">
          Professional organizations {/* updated to sentence case */}
        </h2>
        <div className="grid gap-6">
          {groupedCitations.organization.map(citation => (
            <div 
              key={citation.id} 
              className={`border rounded-xl p-6 ${getCitationColor(citation.type)}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{getCitationIcon(citation.type)}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-neutral-800 mb-1">{citation.title}</h3>
                      <p className="text-sm text-neutral-600">
                        {citation.organization} ({citation.year})
                      </p>
                    </div>
                    {citation.url && (
                      <a
                        href={citation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <ExternalLink size={16} />
                        <span className="text-sm">Visit source</span>
                      </a>
                    )}
                  </div>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    {citation.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Notice */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <BookOpen className="text-neutral-600 mt-1 flex-shrink-0" size={20} />
          <div className="space-y-2">
            <h3 className="font-medium text-neutral-800">How to use these references</h3> {/* updated to sentence case */}
            <div className="text-neutral-700 text-sm space-y-1">
              <p>These sources are provided for verification and further research. When consulting with legal professionals, you can reference these sources to demonstrate the research behind your preparation.</p>
              <p>All external links open in new tabs. Link availability and content may change over time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitationsAndReferences;
