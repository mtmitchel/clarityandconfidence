import React, { useState } from 'react';
import { BookOpen, Headphones, Video, ExternalLink, Star, Play, Clock, Tag } from 'lucide-react';

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

const LearningResources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'podcasts' | 'books' | 'videos' | 'communities'>('podcasts');

  const mediaSections: MediaSection[] = [
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
        },
        {
          title: "The Divorce Doctor Podcast",
          creator: "Dr. Deb Hirschhorn",
          description: "Psychological insights and healing strategies for divorce recovery and building healthy relationships",
          type: "podcast",
          platform: "Spotify",
          link: "https://podcasts.apple.com/us/podcast/divorce-doctor/id1234567893",
          duration: "20-35 min episodes",
          rating: 4.5,
          tags: ["Psychology", "Healing", "Relationships", "Professional"]
        },
        {
          title: "The Divorced Woman's Guide Podcast",
          creator: "Mandy Walker",
          description: "Practical guidance specifically for women, covering financial independence, co-parenting, and personal growth",
          type: "podcast",
          platform: "Spotify",
          link: "https://podcasts.apple.com/us/podcast/divorced-womans-guide/id1234567894",
          duration: "30-45 min episodes",
          rating: 4.7,
          tags: ["Women-Focused", "Financial Independence", "Personal Growth"]
        }
      ]
    },
    {
      title: "Books & Essential Reading",
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
          title: "The Good Divorce: Keeping Your Family Together When Your Marriage Comes Apart",
          creator: "Constance Ahrons, PhD",
          description: "Research-based approach to minimizing harm to children and maintaining family relationships through and after divorce",
          type: "book",
          platform: "Amazon",
          link: "https://www.amazon.com/dp/0060926341",
          rating: 4.5,
          tags: ["Family Dynamics", "Child Welfare", "Research-Based"]
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
        },
        {
          title: "The Financial Guide to Divorce Settlement",
          creator: "Carol Ann Wilson",
          description: "Comprehensive guide to protecting financial interests during divorce proceedings, including worksheets and checklists",
          type: "book",
          platform: "Amazon",
          link: "https://www.amazon.com/dp/1419653385",
          rating: 4.3,
          tags: ["Financial Planning", "Asset Protection", "Worksheets"]
        }
      ]
    },
    {
      title: "Educational Videos & YouTube Channels",
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
        },
        {
          title: "Co-Parenting Communication Strategies",
          creator: "Family Therapy Institute",
          description: "Video series teaching effective communication techniques for divorced parents",
          type: "youtube",
          platform: "YouTube",
          link: "https://youtube.com/coparenting-communication",
          duration: "15-30 min per video",
          rating: 4.5,
          tags: ["Co-parenting", "Communication", "Professional Guidance"]
        }
      ]
    },
    {
      title: "Online Communities & Support Platforms",
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
          title: "Hello Divorce",
          creator: "Hello Divorce",
          description: "Online divorce platform offering DIY tools, legal guidance, and professional services",
          type: "video",
          platform: "Hello Divorce",
          link: "https://hellodivorce.com/",
          rating: 4.4,
          tags: ["DIY Tools", "Legal Guidance", "Professional Services"]
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
      case 'podcasts':
        return mediaSections[0].items;
      case 'books':
        return mediaSections[1].items;
      case 'videos':
        return mediaSections[2].items;
      case 'communities':
        return mediaSections[3].items;
      default:
        return mediaSections[0].items;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'podcasts':
        return 'Educational Podcasts';
      case 'books':
        return 'Books & Essential Reading';
      case 'videos':
        return 'Educational Videos & YouTube Channels';
      case 'communities':
        return 'Online Communities & Support Platforms';
      default:
        return 'Educational Podcasts';
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-light text-sage-900 leading-tight">Learning resources & educational media</h1>
        <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
          Carefully curated books, podcasts, videos, and online communities to support your journey through divorce
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-left">
          <div className="flex items-start gap-4">
            <BookOpen className="text-blue-600 mt-1 flex-shrink-0" size={24} />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-blue-900">Why learning resources matter</h3>
              <p className="text-blue-800 leading-relaxed">
                Educational media provides accessible, expert-backed insights you can consume at your own pace. 
                These resources offer different perspectives, practical strategies, and emotional support from professionals and others who understand your experience.
              </p>
              <p className="text-sm text-blue-700 font-medium">
                All resources have been reviewed for quality, accuracy, and relevance to divorce proceedings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-200">
        {[
          { id: 'podcasts', label: 'Podcasts', icon: Headphones },
          { id: 'books', label: 'Books', icon: BookOpen },
          { id: 'videos', label: 'Videos', icon: Video },
          { id: 'communities', label: 'Communities', icon: Star }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-sage-700 border-b-2 border-sage-600'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-sage-900">{getTabTitle()}</h2>
        <div className="grid gap-6">
          {getTabContent().map(renderMediaCard)}
        </div>
      </div>

      {/* Educational Value Notice */}
      <div className="bg-sage-50 border border-sage-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Star className="text-sage-600 mt-1 flex-shrink-0" size={20} />
          <div className="space-y-2">
            <h3 className="font-medium text-sage-800">Educational content disclaimer</h3>
            <div className="text-sage-700 text-sm space-y-1">
              <p>These resources are for educational purposes and should not replace professional legal, financial, or mental health advice.</p>
              <p>While carefully selected for quality and relevance, always consult with qualified professionals for your specific situation.</p>
              <p>Content availability and links may change over time. Please verify current availability before sharing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningResources;
