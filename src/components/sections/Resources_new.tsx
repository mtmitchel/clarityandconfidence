import React from 'react';
import { AlertCircle, BookOpen, ExternalLink, Star, Phone, Shield } from 'lucide-react';

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

const Resources: React.FC = () => {
  const resourceSections: ResourceSection[] = [
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
          description: "Free or reduced-fee legal representation for qualifying individuals in divorce, custody, and domestic violence cases",
          source: "Legal Aid Society of Southwest Ohio (2024)",
          link: "https://www.lasco.org",
          priority: "high",
          isOhioSpecific: true
        },
        {
          title: "Ohio Domestic Violence Network",
          description: "Legal assistance for survivors of domestic violence, including divorce and custody, with a focus on marginalized and low-income women",
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
        },
        {
          title: "DivorceNet",
          description: "National platform with articles, checklists, and connections to local divorce attorneys and mediators",
          source: "DivorceNet (2024)",
          link: "https://www.divorcenet.com/",
          priority: "medium",
          isOhioSpecific: false
        }
      ]
    },
    {
      title: "Mediation, Collaborative Divorce, and Alternative Dispute Resolution",
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
        },
        {
          title: "Association for Conflict Resolution",
          description: "National organization providing mediator directories and mediation guides",
          source: "Association for Conflict Resolution (2024)",
          link: "https://acrnet.org/",
          priority: "medium",
          isOhioSpecific: false
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
        },
        {
          title: "IRS Publication 504 - Divorced or Separated Individuals",
          description: "Official tax guidance for divorced individuals",
          source: "Internal Revenue Service (2024)",
          link: "https://www.irs.gov/publications/p504",
          priority: "high",
          isOhioSpecific: false
        },
        {
          title: "Social Security Benefits After Divorce",
          description: "Understanding your rights to ex-spouse Social Security benefits",
          source: "Social Security Administration (2024)",
          link: "https://www.ssa.gov/benefits/retirement/planner/applying7.html",
          priority: "medium",
          isOhioSpecific: false
        }
      ]
    },
    {
      title: "Parenting, Co-Parenting, and Children's Resources",
      items: [
        {
          title: "Children in Between Online - Ohio",
          description: "Court-ordered parenting class accepted statewide to fulfill divorce education requirements for parents",
          source: "Children in Between (2024)",
          link: "https://divorce-education.com/oh/",
          priority: "high",
          isOhioSpecific: true
        },
        {
          title: "OurFamilyWizard",
          description: "Court-approved co-parenting app used in all 50 states, including Ohio, for communication, scheduling, and expense tracking",
          source: "OurFamilyWizard (2024)",
          link: "https://www.ourfamilywizard.com/",
          priority: "high",
          isOhioSpecific: false
        },
        {
          title: "Kids First Law Center",
          description: "Nationally recognized resources for parents and children, including guides, books, and workshops to help children cope with divorce",
          source: "Kids First Center (2024)",
          link: "https://www.kidsfirstcenter.org/",
          priority: "high",
          isOhioSpecific: false
        },
        {
          title: "Sesame Workshop Divorce Resources",
          description: "Free, research-based videos, printables, and activities to help families and children understand and adjust to divorce",
          source: "Sesame Workshop (2024)",
          link: "https://sesameworkshop.org/resources/dealing-with-divorce/",
          priority: "high",
          isOhioSpecific: false
        },
        {
          title: "Talking Parents",
          description: "Secure, court-admissible communication platform for co-parents",
          source: "Talking Parents (2024)",
          link: "https://www.talkingparents.com/",
          priority: "medium",
          isOhioSpecific: false
        },
        {
          title: "DivorceCare for Kids (DC4K)",
          description: "Program for children grades 1-5, available in Ohio and nationwide, often running in tandem with adult DivorceCare groups",
          source: "DivorceCare (2024)",
          link: "https://www.dc4k.org/",
          priority: "medium",
          isOhioSpecific: false
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
        },
        {
          title: "CoAbode Friend Circle",
          description: "Nationwide support network for single mothers, offering friendship, resource sharing, and practical help like childcare and carpooling",
          source: "CoAbode (2024)",
          link: "https://www.coabode.org/programs/program/2",
          priority: "high",
          isOhioSpecific: false
        },
        {
          title: "Solo Parent Society",
          description: "Christian-based national support group for single parents, with daily online meetings and extensive resources",
          source: "Solo Parent Society (2024)",
          link: "https://soloparentsociety.com/",
          priority: "medium",
          isOhioSpecific: false
        },
        {
          title: "Circles Divorce Support Groups",
          description: "Online, low-cost support groups for divorce, including women-only and LGBTQIA+ groups",
          source: "Circles (2024)",
          link: "https://circlesup.com/",
          priority: "medium",
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
          title: "BetterHelp Online Therapy",
          description: "Online counseling platform with divorce and relationship specialists available nationwide",
          source: "BetterHelp (2024)",
          link: "https://www.betterhelp.com/",
          priority: "medium",
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
    },
    {
      title: "Practical and Emergency Support",
      items: [
        {
          title: "United Way 2-1-1",
          description: "National information line connecting families to local emergency assistance for rent, utilities, and other needs",
          source: "United Way Worldwide (2024)",
          link: "https://www.211.org/",
          priority: "high",
          isOhioSpecific: false
        },
        {
          title: "National Domestic Violence Hotline",
          description: "24/7 crisis support and safety planning for those facing violence during divorce",
          source: "National Domestic Violence Hotline (2024)",
          link: "https://www.thehotline.org/",
          priority: "high",
          isOhioSpecific: false
        },
        {
          title: "Ohio Domestic Violence Network",
          description: "State-specific domestic violence resources and local shelter information",
          source: "Ohio Domestic Violence Network (2024)",
          link: "https://www.odvn.org/",
          priority: "high",
          isOhioSpecific: true
        }
      ]
    }
  ];

  const renderResourceCard = (item: ResourceItem) => (
    <div key={item.title} className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition-shadow">
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

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-light text-sage-900 leading-tight">Ohio professional directory</h1>
        <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
          Authoritative directory of Ohio divorce professionals, services, and support organizations
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-left">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-blue-600 mt-1 flex-shrink-0" size={24} />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-blue-900">Professional directory verification</h3>
              <p className="text-blue-800 leading-relaxed">
                All professionals and organizations listed below have been verified for credibility and Ohio licensing where applicable. 
                Resources marked with a star (⭐) are highest priority. Ohio-specific resources are clearly marked to help you focus on local requirements.
              </p>
              <p className="text-sm text-blue-700 font-medium">
                Last updated: June 2025 | Sources include official government agencies, certified legal organizations, and established support networks
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Sections */}
      <div className="space-y-12">
        {resourceSections.map((section) => (
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

      {/* Educational Resources Promotion */}
      <div className="bg-sage-50 border border-sage-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <BookOpen className="text-sage-600 mt-1 flex-shrink-0" size={24} />
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-sage-800">Looking for books, podcasts, and educational media?</h3>
            <p className="text-sage-700 leading-relaxed">
              We've created a dedicated Learning Resources section with carefully curated books, podcasts, videos, and online communities 
              to support your journey through divorce.
            </p>
            <div className="text-sm text-sage-600">
              <p>Find expert-backed insights, practical strategies, and emotional support from professionals and others who understand your experience.</p>
            </div>
          </div>
        </div>
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
              <p>This resource hub does not track your usage or store personal information.</p>
              <p>All external links open in new tabs/windows. Be aware that browsing history may be visible to others with computer access.</p>
              <p>For maximum privacy, consider using private/incognito browsing mode when accessing these resources.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
