import React, { useState } from 'react';
import { BookOpen, Headphones, Youtube, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

interface ResourceItem {
  title: string;
  description: string;
  author?: string;
  details?: string;
  link?: string;
}

const Resources: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const podcasts: ResourceItem[] = [
    {
      title: 'Divorce and Your Money',
      author: 'Shawn Leamon',
      description: 'Practical financial advice for navigating divorce, including property division, alimony, and rebuilding your financial life.',
      details: 'Episodes cover topics like understanding your rights, working with financial advisors during divorce, and planning for your post-divorce financial future.'
    },
    {
      title: 'The Divorce Survival Guide Podcast',
      author: 'Kate Anthony',
      description: 'Supportive guidance through the emotional and practical aspects of divorce, with expert interviews and real-life stories.',
      details: 'Features therapists, attorneys, financial experts, and others who share practical advice for healing and moving forward.'
    },
    {
      title: 'Co-Parenting with Confidence',
      author: 'Mikki Gardner',
      description: 'Focuses specifically on successful co-parenting strategies, communication techniques, and putting children first.',
      details: 'Offers practical tools for reducing conflict, improving communication, and creating stability for children after separation.'
    },
    {
      title: 'On Divorce',
      author: 'Susan Guthrie',
      description: 'Interviews with divorce professionals including attorneys, mediators, therapists, and financial planners.',
      details: 'Provides insights into different aspects of the divorce process and various professionals who can help.'
    },
    {
      title: 'The Conscious Divorce',
      author: 'Vanessa Griffith',
      description: 'Focuses on mindful approaches to divorce, emotional healing, and creating positive outcomes for families.',
      details: 'Emphasizes emotional wellness, self-care, and conscious communication during the divorce process.'
    }
  ];

  const books: { [category: string]: ResourceItem[] } = {
    'Emotional Support and Healing': [
      {
        title: 'Mom\'s House, Dad\'s House',
        author: 'Isolina Ricci',
        description: 'A classic guide for creating successful co-parenting arrangements that work for children.',
        details: 'Provides practical advice for developing parenting plans, handling logistics, and maintaining positive relationships.'
      },
      {
        title: 'Crazy Time: Surviving Divorce and Building a New Life',
        author: 'Abigail Trafford',
        description: 'Honest exploration of the emotional journey through divorce and rebuilding your life.',
        details: 'Helps normalize the difficult emotions of divorce and provides hope for healing and growth.'
      },
      {
        title: 'The Good Divorce',
        author: 'Constance Ahrons',
        description: 'Research-based approach to divorce that prioritizes children\'s wellbeing and family relationships.',
        details: 'Shows how families can divorce respectfully while maintaining important connections.'
      }
    ],
    'Co-Parenting and Children': [
      {
        title: 'Two Homes, One Childhood',
        author: 'Robert Emery',
        description: 'A psychologist\'s guide to helping children adjust to divorce and thrive in two homes.',
        details: 'Evidence-based strategies for supporting children\'s emotional health during and after divorce.'
      },
      {
        title: 'The Co-Parents\' Handbook',
        author: 'Karen Bonnell and Kristin Little',
        description: 'Practical guide for successful co-parenting communication and collaboration.',
        details: 'Includes scripts for difficult conversations, boundary-setting techniques, and conflict resolution strategies.'
      },
      {
        title: 'Helping Children Cope with Divorce',
        author: 'Edward Teyber',
        description: 'Professional guidance for parents on supporting children through the divorce process.',
        details: 'Age-specific advice for talking to children about divorce and helping them adjust.'
      }
    ],
    'Financial Planning': [
      {
        title: 'Financial Recovery After Divorce',
        author: 'Ginita Wall',
        description: 'Comprehensive guide to understanding finances during and after divorce.',
        details: 'Covers property division, budgeting as a single person, retirement planning, and rebuilding credit.'
      },
      {
        title: 'Smart Money Moves for Women After Divorce',
        author: 'Michelle Burger',
        description: 'Financial empowerment guide specifically addressing women\'s unique financial challenges after divorce.',
        details: 'Practical steps for financial independence, investing, and long-term financial security.'
      },
      {
        title: 'The Divorce Financial Planner',
        author: 'CDFAs (Certified Divorce Financial Analysts)',
        description: 'Professional financial guidance for making informed decisions during divorce.',
        details: 'Helps understand the financial implications of different settlement options.'
      }
    ],
    'Legal Understanding': [
      {
        title: 'Nolo\'s Essential Guide to Divorce',
        author: 'Emily Doskow',
        description: 'Clear, accessible explanation of divorce law and process.',
        details: 'Helps you understand your rights, the legal process, and how to work effectively with attorneys.'
      },
      {
        title: 'Collaborative Divorce: The Revolutionary New Way to Restructure Your Family',
        author: 'Pauline Tesler and Peggy Thompson',
        description: 'Introduction to collaborative divorce as an alternative to traditional litigation.',
        details: 'Explains how collaborative divorce works and when it might be a good option.'
      }
    ]
  };

  const youtubeSearches: ResourceItem[] = [
    {
      title: 'Ohio divorce process',
      description: 'Search for videos explaining the specific steps and requirements for divorce in Ohio.',
      details: 'Look for content from Ohio attorneys or legal aid organizations for state-specific information.'
    },
    {
      title: 'Co-parenting communication tips',
      description: 'Find practical advice for communicating effectively with your co-parent.',
      details: 'Many family therapists and parenting experts share communication strategies on YouTube.'
    },
    {
      title: 'Divorce financial planning',
      description: 'Educational content about managing finances during and after divorce.',
      details: 'Financial planners often create content about budgeting, asset division, and financial recovery.'
    },
    {
      title: 'Helping children cope with divorce',
      description: 'Guidance from child psychologists and family therapists on supporting children.',
      details: 'Look for age-specific advice and professional recommendations for children\'s emotional support.'
    },
    {
      title: 'Mediation vs litigation divorce',
      description: 'Comparisons of different divorce processes to help you understand your options.',
      details: 'Many attorneys create educational content comparing different approaches to divorce.'
    },
    {
      title: 'Self-care during divorce',
      description: 'Mental health and wellness content focused on taking care of yourself during this difficult time.',
      details: 'Therapists, coaches, and wellness experts share strategies for emotional wellbeing.'
    },
    {
      title: 'Divorce recovery and moving forward',
      description: 'Inspirational and practical content about healing and rebuilding life after divorce.',
      details: 'Personal stories, expert advice, and practical steps for creating a positive future.'
    }
  ];

  const ResourceSection = ({ 
    id, 
    title, 
    icon: Icon, 
    children 
  }: { 
    id: string;
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
  }) => {
    const isExpanded = expandedSections.includes(id);
    
    return (
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors duration-200"
        >
          <div className="flex items-center gap-3">
            <Icon className="text-calm-600" size={24} />
            <h2 className="text-xl font-medium text-slate-800">{title}</h2>
          </div>
          {isExpanded ? (
            <ChevronDown className="text-slate-400" size={20} />
          ) : (
            <ChevronRight className="text-slate-400" size={20} />
          )}
        </button>
        
        {isExpanded && (
          <div className="border-t border-slate-200 bg-slate-50">
            {children}
          </div>
        )}
      </div>
    );
  };

  const ResourceItem = ({ item }: { item: ResourceItem }) => (
    <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-2">
      <div className="flex items-start justify-between">
        <h4 className="font-medium text-slate-800">{item.title}</h4>
        {item.link && (
          <a 
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-calm-600 hover:text-calm-800"
          >
            <ExternalLink size={16} />
          </a>
        )}
      </div>
      {item.author && (
        <p className="text-sm text-slate-600 font-medium">by {item.author}</p>
      )}
      <p className="text-sm text-slate-700">{item.description}</p>
      {item.details && (
        <div className="pt-2 border-t border-slate-200">
          <p className="text-xs text-slate-600">{item.details}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <BookOpen className="text-calm-600" size={32} />
          <h1 className="text-3xl font-semibold text-calm-800">Helpful resources</h1>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          Learning from others who have walked this path can provide comfort, practical advice, 
          and hope. These resources offer different perspectives and tools to support you 
          through your journey.
        </p>
      </div>

      {/* Important Note */}
      <div className="bg-calm-50 border border-calm-200 rounded-lg p-6">
        <h3 className="font-medium text-calm-800 mb-2">A gentle reminder</h3>
        <p className="text-calm-700 text-sm leading-relaxed">
          While these resources can be incredibly helpful, remember that every situation is unique. 
          What works for one person may not work for another. Take what serves you and leave the rest. 
          If you're struggling emotionally, please consider reaching out to a professional counselor 
          who can provide personalized support.
        </p>
      </div>

      {/* Resource Sections */}
      <div className="space-y-4">
        {/* Podcasts */}
        <ResourceSection id="podcasts" title="Recommended podcasts" icon={Headphones}>
          <div className="p-6 space-y-4">
            <p className="text-slate-700 text-sm mb-4">
              Podcasts offer the convenience of learning while commuting, exercising, or doing daily tasks. 
              These shows provide expert advice, personal stories, and practical guidance.
            </p>
            <div className="space-y-4">
              {podcasts.map((podcast, index) => (
                <ResourceItem key={index} item={podcast} />
              ))}
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
              <strong>Tip:</strong> Most podcast apps allow you to search for these titles. 
              Episodes are usually free and you can listen at your own pace.
            </div>
          </div>
        </ResourceSection>

        {/* Books */}
        <ResourceSection id="books" title="Book recommendations by category" icon={BookOpen}>
          <div className="p-6 space-y-6">
            <p className="text-slate-700 text-sm">
              Books provide in-depth guidance and can be referenced again and again. 
              Many are available at libraries, as audiobooks, or in digital formats.
            </p>
            
            {Object.entries(books).map(([category, bookList]) => (
              <div key={category} className="space-y-3">
                <h3 className="font-medium text-slate-800 text-lg border-b border-slate-200 pb-1">
                  {category}
                </h3>
                <div className="space-y-3">
                  {bookList.map((book, index) => (
                    <ResourceItem key={index} item={book} />
                  ))}
                </div>
              </div>
            ))}
            
            <div className="mt-4 p-3 bg-sage-50 border border-sage-200 rounded text-sm text-sage-800">
              <strong>Library tip:</strong> Most public libraries have physical and digital copies of these books. 
              You can often place holds online and many offer free access to audiobook services.
            </div>
          </div>
        </ResourceSection>

        {/* YouTube */}
        <ResourceSection id="youtube" title="Helpful YouTube search terms" icon={Youtube}>
          <div className="p-6 space-y-4">
            <p className="text-slate-700 text-sm mb-4">
              YouTube offers free educational content from professionals and people sharing their experiences. 
              Here are some search terms to help you find relevant videos.
            </p>
            <div className="space-y-4">
              {youtubeSearches.map((search, index) => (
                <ResourceItem key={index} item={search} />
              ))}
            </div>
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
              <strong>Important:</strong> While YouTube has valuable content, always verify important information 
              with qualified professionals. Look for content from licensed attorneys, therapists, or certified financial planners.
            </div>
          </div>
        </ResourceSection>
      </div>

      {/* Additional Tips */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h3 className="font-medium text-slate-800 mb-3">Making the most of these resources</h3>
        <div className="space-y-2 text-sm text-slate-700">
          <p>• <strong>Start small:</strong> Pick one resource that speaks to you rather than trying to consume everything at once.</p>
          <p>• <strong>Take notes:</strong> Keep a journal or notes app for insights that resonate with your situation.</p>
          <p>• <strong>Share selectively:</strong> Some resources might be helpful to share with your co-parent, but use your judgment.</p>
          <p>• <strong>Check dates:</strong> Laws and best practices evolve, so prioritize more recent content when possible.</p>
          <p>• <strong>Trust your instincts:</strong> If something doesn't feel right for your situation, that's okay. Move on to something else.</p>
          <p>• <strong>Apply gradually:</strong> Try implementing one or two new strategies at a time rather than overwhelming yourself.</p>
        </div>
      </div>

      {/* Encouragement */}
      <div className="text-center pt-6">
        <p className="text-slate-600 leading-relaxed">
          Remember: you're not alone in this journey. Millions of people have navigated separation 
          and divorce and found happiness on the other side. These resources represent the wisdom 
          and experience of many who want to help you through this challenging time.
        </p>
      </div>
    </div>
  );
};

export default Resources;
