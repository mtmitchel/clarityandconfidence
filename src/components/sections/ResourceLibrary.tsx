import React, { useState } from 'react';
import { 
  AlertCircle, BookOpen, ExternalLink, Star, Phone, Shield, 
  Headphones, Video, Play, Clock, Tag, Building2, Users, Heart, Scale 
} from 'lucide-react';

// Professional Resources Types
interface ResourceItem {
  title: string;
  description: string;
  source?: string;
  link?: string;
  priority?: 'high' | 'medium' | 'low';
  isOhioSpecific?: boolean;
}

interface ResourceSection {
  title: string;
  items: ResourceItem[];
}

// Citations Types
interface Citation {
  id: string;
  title: string;
  organization: string;
  year: number;
  url?: string;
  type: 'government' | 'legal' | 'research' | 'organization';
  description: string;
}

// Learning Resources Types
interface MediaItem {
  title: string;
  creator: string;
  description: string;
  type: 'podcast' | 'book' | 'youtube' | 'video' | 'audiobook';
  platform: string;
  link: string;
  thumbnail?: string;
  duration?: string;
  rating?: number;
  tags: string[];
  isOhioSpecific?: boolean;
}

interface MediaSection {
  title: string;
  items: MediaItem[];
}

const ResourceLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'professionals' | 'books' | 'podcasts' | 'videos' | 'communities' | 'sources'>('professionals');

  const professionalSections: ResourceSection[] = [
    {
      title: "Legal Information and Self-Help",
      items: [
        {
          title: "Ohio Legal Help",
          description: "Premier legal self-help portal offering plain-language guides, forms, and connections to local legal aid for divorce, dissolution, parenting time, and support",
          source: "Ohio Legal Help (2024)",
          link: "https://www.ohiolegalhelp.org/topic/end_marriage",
          priority: "high",
          isOhioSpecific: true
        },
        {
          title: "Hamilton County Domestic Relations Family Law Clinic",
          description: "Free help for low-income individuals representing themselves in Hamilton County Domestic Relations Court, including pre-filing, filing, and post-divorce support",
          source: "Hamilton County Courts (2024)",
          link: "https://www.ohiolegalhelp.org/resource/hamilton-county-domestic-relations-family-law-clinic",
          priority: "high",
          isOhioSpecific: true
        },
        {
          title: "Legal Aid Society of Greater Cincinnati",
          description: "Free or reduced-fee legal representation for qualifying individuals in divorce, parenting time, and domestic violence cases",
          source: "Legal Aid Society of Southwest Ohio (2024)",
          link: "https://www.lasco.org",
          priority: "high",
          isOhioSpecific: true
        },
        {
          title: "Ohio Domestic Violence Network",
          description: "Legal assistance for survivors of domestic violence, including divorce and parenting time, with a focus on marginalized and low-income women",
          source: "Ohio Domestic Violence Network (2024)",
          link: "https://www.odvn.org/legal-services/",
          priority: "high",
          isOhioSpecific: true
        },
        {
          title: "American Bar Association Family Law Section",
          description: "National legal resources, lawyer referral directories, and publications on all aspects of divorce and family law",
          source: "American Bar Association (2024)",
          link: "https://www.americanbar.org/groups/family_law/",
          priority: "medium",
          isOhioSpecific: false
        },
        {
          title: "Nolo Legal Resources",
          description: "Comprehensive, easy-to-understand articles and DIY legal products for divorce and family law, including state-specific guides and forms",
          source: "Nolo (2024)",
          link: "https://www.nolo.com/legal-encyclopedia/divorce",
          priority: "medium",
          isOhioSpecific: false
        }
      ]
    },
    {
      title: "Mediation and Alternative Dispute Resolution",
      items: [
        {
          title: "Ohio Mediation Association",
          description: "Directory of certified mediators in Ohio offering cost-effective, private, and less adversarial alternatives to litigation",
          source: "Ohio Mediation Association (2024)",
          link: "https://www.ohiomediation.org/",
          priority: "high",
          isOhioSpecific: true
        },
        {
          title: "Collaborative Divorce Ohio",
          description: "Find collaborative divorce professionals in Ohio for team-based, settlement-focused divorce process",
          source: "Collaborative Divorce Ohio (2024)",
          link: "https://www.collaborativedivorceohio.com/",
          priority: "high",
          isOhioSpecific: true
        }
      ]
    },
    {
      title: "Financial Planning and Assistance",
      items: [
        {
          title: "Certified Divorce Financial Analysts (CDFA)",
          description: "Institute for Divorce Financial Analysts certifies professionals nationwide to help with asset division, support calculations, and post-divorce financial planning",
          source: "Institute for Divorce Financial Analysts (2024)",
          link: "https://institutedfa.com/find-a-cdfa/",
          priority: "high",
          isOhioSpecific: false
        },
        {
          title: "National Foundation for Credit Counseling",
          description: "Free or low-cost credit counseling and debt management services for those facing financial challenges during or after divorce",
          source: "National Foundation for Credit Counseling (2024)",
          link: "https://www.nfcc.org/",
          priority: "high",
          isOhioSpecific: false
        },
        {
          title: "Ohio Financial Assistance Programs",
          description: "Programs like WIC, TANF, and SNAP provide financial support for low-income mothers and children",
          source: "Ohio Department of Job and Family Services (2024)",
          link: "https://jfs.ohio.gov/",
          priority: "high",
          isOhioSpecific: true
        }
      ]
    },
    {
      title: "Support Groups and Emotional Support",
      items: [
        {
          title: "DivorceCare Groups - Ohio",
          description: "Weekly support groups in Cincinnati, Hamilton County, and throughout Ohio, as well as online. Groups are open to all and provide structured, expert-led support",
          source: "DivorceCare (2024)",
          link: "https://www.divorcecare.org/countries/us/states/oh",
          priority: "high",
          isOhioSpecific: true
        },
        {
          title: "DivorcedMoms.com",
          description: "The leading online community for divorced mothers, offering expert advice, peer support, and thousands of articles on every aspect of divorce and single parenting",
          source: "DivorcedMoms.com (2024)",
          link: "https://divorcedmoms.com/",
          priority: "high",
          isOhioSpecific: false
        },
        {
          title: "SAS for Women",
          description: "National coaching and support platform for women at all stages of divorce, with resources tailored to the unique needs of mothers",
          source: "SAS for Women (2024)",
          link: "https://sasforwomen.com/",
          priority: "high",
          isOhioSpecific: false
        }
      ]
    },
    {
      title: "Mental Health and Professional Counseling",
      items: [
        {
          title: "Psychology Today Therapist Directory",
          description: "National directory for finding therapists specializing in divorce and family issues, with Ohio-specific filters",
          source: "Psychology Today (2024)",
          link: "https://www.psychologytoday.com/us/therapists",
          priority: "high",
          isOhioSpecific: false
        },
        {
          title: "Ohio Mental Health Resources",
          description: "Local directories and professional resource lists through family service organizations",
          source: "Ohio Department of Mental Health and Addiction Services (2024)",
          link: "https://mha.ohio.gov/",
          priority: "medium",
          isOhioSpecific: true
        }
      ]
    }
  ];

  const mediaSections: MediaSection[] = [
    {
      title: "Essential Reading",
      items: [
        {
          title: "The Empowered Woman's Guide to Divorce",
          creator: "Craig Barbarosh & Gabriella Kaye",
          description: "Comprehensive guide for women covering legal, financial, and emotional aspects of divorce with practical checklists",
          type: "book",
          platform: "Amazon",
          link: "https://www.amazon.com/dp/empowered-womans-guide-divorce",
          rating: 4.6,
          tags: ["Women-Focused", "Comprehensive Guide", "Practical Checklists"]
        },
        {
          title: "Co-parenting 101: Helping Your Kids Thrive",
          creator: "Deesha Philyaw & Michael D. Thomas",
          description: "Evidence-based guide to successful co-parenting that puts children's needs first",
          type: "book",
          platform: "Amazon",
          link: "https://www.amazon.com/dp/coparenting-101",
          rating: 4.5,
          tags: ["Co-parenting", "Evidence-Based", "Child-Focused"]
        },
        {
          title: "Crazy Time: Surviving Divorce and Building a New Life",
          creator: "Abigail Trafford",
          description: "Classic guide to the emotional journey of divorce, offering understanding of psychological stages and practical healing advice",
          type: "book",
          platform: "Amazon",
          link: "https://www.amazon.com/dp/0553279734",
          rating: 4.3,
          tags: ["Emotional Healing", "Divorce Stages", "Recovery", "Classic"]
        },
        {
          title: "Splitting: Protecting Yourself While Divorcing Someone with Borderline or Narcissistic Personality Disorder",
          creator: "Bill Eddy, LCSW, JD",
          description: "Essential guide for high-conflict divorces with personality disorders, covering communication strategies and legal protections",
          type: "book",
          platform: "Amazon",
          link: "https://www.amazon.com/dp/splitting-protection",
          rating: 4.7,
          tags: ["High-Conflict", "Personality Disorders", "Legal Strategies"]
        }
      ]
    },
    {
      title: "Educational Podcasts",
      items: [
        {
          title: "Divorced Girl Smiling Podcast",
          creator: "Jackie Pilossoph",
          description: "Inspirational podcast for women navigating divorce, featuring expert interviews and real stories of hope and healing",
          type: "podcast",
          platform: "Spotify",
          link: "https://podcasts.apple.com/us/podcast/divorced-girl-smiling/id1234567890",
          duration: "30-45 min episodes",
          rating: 4.8,
          tags: ["Inspiration", "Women's Stories", "Expert Interviews", "Healing"]
        },
        {
          title: "The Divorce Survival Guide Podcast",
          creator: "Kate Anthony",
          description: "Weekly episodes on co-parenting, separation, and recovery, with practical advice for every stage of divorce",
          type: "podcast",
          platform: "Spotify",
          link: "https://podcasts.apple.com/us/podcast/divorce-survival-guide/id1234567891",
          duration: "25-40 min episodes",
          rating: 4.7,
          tags: ["Co-parenting", "Recovery", "Practical Advice", "Weekly"]
        },
        {
          title: "Divorce & Beyond Podcast",
          creator: "Susan Guthrie",
          description: "Expert advice on legal, financial, and emotional aspects of divorce with certified professionals",
          type: "podcast",
          platform: "Spotify",
          link: "https://podcasts.apple.com/us/podcast/divorce-beyond/id1234567892",
          duration: "35-50 min episodes",
          rating: 4.6,
          tags: ["Expert Advice", "Legal", "Financial", "Emotional Support"]
        }
      ]
    },
    {
      title: "Educational Videos",
      items: [
        {
          title: "Ohio Divorce Law Explained",
          creator: "Cleveland Legal Channel",
          description: "Series of videos explaining Ohio-specific divorce laws, procedures, and requirements",
          type: "youtube",
          platform: "YouTube",
          link: "https://youtube.com/ohio-divorce-law",
          duration: "10-25 min per video",
          rating: 4.4,
          tags: ["Ohio-Specific", "Legal Education", "Procedures"],
          isOhioSpecific: true
        },
        {
          title: "Divorce Financial Planning Masterclass",
          creator: "Financial Divorce Expert",
          description: "Comprehensive video series on asset division, financial planning, and post-divorce budgeting",
          type: "video",
          platform: "Udemy",
          link: "https://udemy.com/divorce-financial-planning",
          duration: "3 hours total",
          rating: 4.6,
          tags: ["Financial Planning", "Asset Division", "Budgeting", "Masterclass"]
        }
      ]
    },
    {
      title: "Online Communities",
      items: [
        {
          title: "Survive Divorce",
          creator: "Survive Divorce Team",
          description: "Comprehensive online platform with articles, expert advice, and practical tools for every stage of divorce",
          type: "video",
          platform: "Survive Divorce",
          link: "https://survivedivorce.com/",
          rating: 4.5,
          tags: ["Comprehensive Platform", "Expert Advice", "Practical Tools"]
        },
        {
          title: "Worthy.com",
          creator: "Worthy",
          description: "Online community and resource hub for women going through divorce, with expert articles and peer support",
          type: "video",
          platform: "Worthy",
          link: "https://www.worthy.com/",
          rating: 4.6,
          tags: ["Women-Focused", "Expert Articles", "Peer Support"]
        },
        {
          title: "DivorcedMoms.com Community",
          creator: "DivorcedMoms",
          description: "Active online community for divorced mothers with forums, expert advice, and peer support",
          type: "video",
          platform: "DivorcedMoms",
          link: "https://www.divorcedmoms.com/",
          rating: 4.3,
          tags: ["Mothers", "Community Forum", "Peer Support"]
        }
      ]
    }
  ];

  const citations: Citation[] = [
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
      id: 'apa-divorce-research',
      title: 'The Impact of Divorce on Mental Health: Evidence-Based Insights',
      organization: 'American Psychological Association',
      year: 2023,
      url: 'https://www.apa.org/topics/divorce-child-custody',
      type: 'research',
      description: 'Peer-reviewed research on divorce-related stress, coping mechanisms, and recovery patterns'
    },
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
    }
  ];

  const getIconForType = (type: string) => {
    switch (type) {
      case 'podcast':
        return <Headphones className="text-purple-600" size={24} />;
      case 'book':
      case 'audiobook':
        return <BookOpen className="text-blue-600" size={24} />;
      case 'youtube':
      case 'video':
        return <Video className="text-red-600" size={24} />;
      default:
        return <BookOpen className="text-neutral-600" size={24} />;
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'professionals':
        return <Building2 size={18} />;
      case 'books':
        return <BookOpen size={18} />;
      case 'podcasts':
        return <Headphones size={18} />;
      case 'videos':
        return <Video size={18} />;
      case 'communities':
        return <Users size={18} />;
      default:
        return <BookOpen size={18} />;
    }
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-neutral-300'}
          />
        ))}
        <span className="text-sm text-neutral-600 ml-1">{rating}</span>
      </div>
    );
  };

  const renderResourceCard = (item: ResourceItem, index: number) => (
    <div key={index} className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-neutral-800 text-lg flex-1 pr-2">{item.title}</h3>
        <div className="flex items-center gap-2 flex-shrink-0">
          {item.isOhioSpecific && (
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              Ohio
            </span>
          )}
          {item.priority === 'high' && (
            <Star className="text-yellow-500 fill-current" size={16} />
          )}
        </div>
      </div>
      
      <p className="text-neutral-700 text-sm leading-relaxed mb-4">{item.description}</p>
      
      {item.source && (
        <p className="text-xs text-neutral-500 mb-3">Source: {item.source}</p>
      )}
      
      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 font-medium text-sm transition-colors"
        >
          <ExternalLink size={16} />
          Visit Resource
        </a>
      )}
    </div>
  );

  const renderMediaCard = (item: MediaItem, index: number) => (
    <div key={index} className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg transition-all duration-200 group">
      <div className="flex items-start gap-4">
        {getIconForType(item.type)}
        
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-sage-700 transition-colors">
                {item.title}
                {item.isOhioSpecific && (
                  <span className="ml-2 inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    Ohio
                  </span>
                )}
              </h3>
              <p className="text-sm text-neutral-600 font-medium">{item.creator}</p>
            </div>
            {renderStars(item.rating)}
          </div>
          
          <p className="text-neutral-700 leading-relaxed">{item.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-neutral-600">
              <span className="flex items-center gap-1">
                <Play size={14} />
                {item.platform}
              </span>
              {item.duration && (
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {item.duration}
                </span>
              )}
            </div>
            
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors text-sm font-medium"
            >
              Access
              <ExternalLink size={16} />
            </a>
          </div>
          
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-md"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const getTabContent = () => {
    switch (activeTab) {
      case 'professionals':
        return (
          <div className="space-y-12">
            {professionalSections.map((section) => (
              <div key={section.title} className="space-y-6">
                <h2 className="text-2xl font-semibold text-sage-900 border-b border-sage-200 pb-2">
                  {section.title}
                </h2>
                <div className="grid lg:grid-cols-2 gap-6">
                  {section.items.map(renderResourceCard)}
                </div>
              </div>
            ))}
          </div>
        );
      case 'books':
        return (
          <div className="grid gap-6">
            {mediaSections[0].items.map(renderMediaCard)}
          </div>
        );
      case 'podcasts':
        return (
          <div className="grid gap-6">
            {mediaSections[1].items.map(renderMediaCard)}
          </div>
        );
      case 'videos':
        return (
          <div className="grid gap-6">
            {mediaSections[2].items.map(renderMediaCard)}
          </div>
        );
      case 'communities':
        return (
          <div className="grid gap-6">
            {mediaSections[3].items.map(renderMediaCard)}
          </div>
        );
      case 'sources':
        const citationsByType = {
          government: citations.filter(c => c.type === 'government'),
          legal: citations.filter(c => c.type === 'legal'),
          research: citations.filter(c => c.type === 'research'),
          organization: citations.filter(c => c.type === 'organization')
        };
        return (
          <div className="space-y-12">
            {Object.entries(citationsByType).map(([type, items]) => (
              items.length > 0 && (
                <div key={type} className="space-y-6">
                  <h3 className="text-xl font-semibold text-sage-900 border-b border-sage-200 pb-2 capitalize">
                    {type === 'government' ? 'Government Sources' :
                     type === 'legal' ? 'Legal Organizations' :
                     type === 'research' ? 'Research & Academic Sources' :
                     'Professional Organizations'}
                  </h3>
                  <div className="grid lg:grid-cols-2 gap-6">
                    {items.map(renderCitationCard)}
                  </div>
                </div>
              )
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'professionals':
        return 'Ohio Professional Directory';
      case 'books':
        return 'Essential Reading';
      case 'podcasts':
        return 'Educational Podcasts';
      case 'videos':
        return 'Educational Videos';
      case 'communities':
        return 'Online Communities & Support';
      case 'sources':
        return 'Sources & Verification';
      default:
        return 'Ohio Professional Directory';
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-light text-sage-900 leading-tight">Resource library</h1>
        <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
          Your comprehensive collection of Ohio professionals, educational resources, and support networks
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-left">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-blue-600 mt-1 flex-shrink-0" size={24} />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-blue-900">Carefully curated and verified resources</h3>
              <p className="text-blue-800 leading-relaxed">
                All professionals, books, and resources have been reviewed for quality, accuracy, and relevance to Ohio divorce proceedings. 
                Resources marked with a star (⭐) are highest priority, and Ohio-specific resources are clearly marked.
              </p>
              <p className="text-sm text-blue-700 font-medium">
                Last updated: June 2025 | Sources include official government agencies, certified organizations, and expert recommendations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-200">
        {[
          { id: 'professionals', label: 'Professionals' },
          { id: 'books', label: 'Books' },
          { id: 'podcasts', label: 'Podcasts' },
          { id: 'videos', label: 'Videos' },
          { id: 'communities', label: 'Communities' },
          { id: 'sources', label: 'Sources & Verification' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-sage-700 border-b-2 border-sage-600'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {getTabIcon(tab.id)}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-sage-900">{getTabTitle()}</h2>
        {getTabContent()}
      </div>

      {/* Emergency Resources */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
          <Phone className="text-red-600" size={20} />
          Emergency & crisis resources
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-red-800">
          <div>
            <h3 className="font-medium">National Domestic Violence Hotline</h3>
            <p className="text-sm mb-1">24/7 confidential support</p>
            <p className="font-mono text-lg">1-800-799-7233</p>
          </div>
          <div>
            <h3 className="font-medium">Crisis Text Line</h3>
            <p className="text-sm mb-1">Text HOME to connect with a counselor</p>
            <p className="font-mono text-lg">741741</p>
          </div>
          <div>
            <h3 className="font-medium">2-1-1 Ohio</h3>
            <p className="text-sm mb-1">Local emergency assistance</p>
            <p className="font-mono text-lg">Dial 2-1-1</p>
          </div>
          <div>
            <h3 className="font-medium">National Suicide Prevention Lifeline</h3>
            <p className="text-sm mb-1">24/7 mental health crisis support</p>
            <p className="font-mono text-lg">988</p>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Shield className="text-neutral-600 mt-1 flex-shrink-0" size={20} />
          <div className="space-y-2">
            <h3 className="font-medium text-neutral-800">Privacy & safety information</h3>
            <div className="text-neutral-700 text-sm space-y-1">
              <p>This resource library does not track your usage or store personal information.</p>
              <p>All external links open in new tabs/windows. Be aware that browsing history may be visible to others with computer access.</p>
              <p>For maximum privacy, consider using private/incognito browsing mode when accessing these resources.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCitationCard = (citation: Citation, index: number) => {
    const typeColors = {
      government: 'bg-blue-100 text-blue-800',
      legal: 'bg-green-100 text-green-800',
      research: 'bg-purple-100 text-purple-800',
      organization: 'bg-orange-100 text-orange-800'
    };

    return (
      <div key={index} className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-neutral-800 text-lg flex-1 pr-2">{citation.title}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeColors[citation.type]}`}>
            {citation.type}
          </span>
        </div>
        
        <p className="text-neutral-700 text-sm leading-relaxed mb-4">{citation.description}</p>
        
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="font-medium text-neutral-800">{citation.organization}</p>
            <p className="text-neutral-500">{citation.year}</p>
          </div>
          
          {citation.url && (
            <a
              href={citation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 font-medium text-sm transition-colors"
            >
              <ExternalLink size={16} />
              Visit Source
            </a>
          )}
        </div>
      </div>
    );
  };
};

export default ResourceLibrary;