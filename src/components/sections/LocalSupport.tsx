import React from 'react';
import { Users, Phone, MapPin, ExternalLink, Heart, Scale, MessageCircle, UserCheck } from 'lucide-react';

interface SupportResource {
  name: string;
  category: string;
  description: string;
  contact: {
    phone?: string;
    website?: string;
    address?: string;
    email?: string;
  };
  services: string[];
  icon: React.ElementType;
  eligibility?: string;
}

const LocalSupport: React.FC = () => {
  const supportResources: SupportResource[] = [
    {
      name: 'Legal Aid Society of Southwest Ohio',
      category: 'Legal Assistance',
      description: 'Provides free legal services to low-income residents of Hamilton County in family law matters including divorce, custody, and domestic relations.',
      contact: {
        phone: '(513) 241-9400',
        website: 'https://www.lasolaw.org',
        address: '215 E 9th St, Cincinnati, OH 45202'
      },
      services: [
        'Free divorce representation for eligible clients',
        'Child custody and support assistance',
        'Domestic violence legal protection',
        'Self-help legal clinics',
        'Court form assistance'
      ],
      icon: Scale,
      eligibility: 'Income guidelines apply - generally 125% of federal poverty level'
    },
    {
      name: 'Cincinnati Bar Association Legal Aid',
      category: 'Legal Assistance',
      description: 'Offers reduced-fee legal services and lawyer referrals for individuals who need legal assistance but may not qualify for free services.',
      contact: {
        phone: '(513) 381-8213',
        website: 'https://www.cincybar.org',
        address: '1225 Elm St, Cincinnati, OH 45202'
      },
      services: [
        'Lawyer referral service',
        'Reduced-fee legal consultations',
        'Legal self-help resources',
        'Pro bono opportunities matching'
      ],
      icon: Scale,
    },
    {
      name: 'Hamilton County Family Court Mediation',
      category: 'Mediation Services',
      description: 'Court-connected mediation services to help parents reach agreements about custody, parenting time, and other family matters without going to trial.',
      contact: {
        phone: '(513) 946-5600',
        website: 'https://www.hamiltonswi.org/family-court',
        address: '800 Broadway, Cincinnati, OH 45202'
      },
      services: [
        'Child custody mediation',
        'Parenting time mediation',
        'Co-parenting plan development',
        'Modification mediation'
      ],
      icon: MessageCircle,
    },
    {
      name: 'Family Service of the Cincinnati Area',
      category: 'Counseling and Support',
      description: 'Provides counseling and support services for individuals and families going through separation and divorce.',
      contact: {
        phone: '(513) 651-3400',
        website: 'https://www.fsca.net',
        address: 'Multiple locations throughout Hamilton County'
      },
      services: [
        'Individual counseling',
        'Family therapy',
        'Children\'s adjustment counseling',
        'Support groups',
        'Co-parenting classes'
      ],
      icon: Heart,
    },
    {
      name: 'YWCA Cincinnati Domestic Violence Services',
      category: 'Domestic Violence Support',
      description: 'Comprehensive services for individuals experiencing domestic violence, including legal advocacy and safety planning.',
      contact: {
        phone: '(513) 872-3333 (24-hour hotline)',
        website: 'https://www.ywcacin.org',
        address: '898 Walnut St, Cincinnati, OH 45202'
      },
      services: [
        '24-hour crisis hotline',
        'Safety planning',
        'Legal advocacy',
        'Temporary protection order assistance',
        'Counseling services',
        'Emergency shelter'
      ],
      icon: Heart,
    },
    {
      name: 'DivorceCare Support Groups',
      category: 'Support Groups',
      description: 'Faith-based support groups meeting throughout Hamilton County to help people heal from separation and divorce.',
      contact: {
        website: 'https://www.divorcecare.org',
        phone: 'See website for local group contacts'
      },
      services: [
        'Weekly support group meetings',
        'Divorce recovery seminars',
        'Online resources',
        'Children\'s programs (DivorceCare for Kids)',
        'Workbooks and resources'
      ],
      icon: Users,
    },
    {
      name: 'Psychology Today Therapist Directory',
      category: 'Mental Health',
      description: 'Online directory to find licensed therapists in Hamilton County who specialize in divorce, separation, and family issues.',
      contact: {
        website: 'https://www.psychologytoday.com/us/therapists/oh/cincinnati',
      },
      services: [
        'Therapist search by specialty',
        'Insurance verification',
        'Online therapy options',
        'Couples counseling',
        'Child and adolescent therapy',
        'Family therapy'
      ],
      icon: UserCheck,
    },
    {
      name: 'Children\'s Law Center',
      category: 'Children\'s Advocacy',
      description: 'Provides legal representation and advocacy specifically for children in family court proceedings.',
      contact: {
        phone: '(513) 381-2259',
        website: 'https://www.childrenslawcenter.org',
        address: '1002 Russell St, Cincinnati, OH 45206'
      },
      services: [
        'Guardian ad litem services',
        'Child advocacy',
        'Court representation for children',
        'Best interest evaluations'
      ],
      icon: Heart,
    }
  ];

  const categories = [...new Set(supportResources.map(resource => resource.category))];

  const ResourceCard = ({ resource }: { resource: SupportResource }) => {
    const Icon = resource.icon;
    
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-calm-100 rounded-lg flex-shrink-0">
            <Icon className="text-calm-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-slate-800">{resource.name}</h3>
            <p className="text-sm text-slate-600 mt-1">{resource.description}</p>
            {resource.eligibility && (
              <div className="mt-2 px-3 py-1 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                <strong>Eligibility:</strong> {resource.eligibility}
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-2">
          {resource.contact.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone size={14} className="text-slate-500" />
              <a 
                href={`tel:${resource.contact.phone}`}
                className="text-calm-600 hover:text-calm-800 font-medium"
              >
                {resource.contact.phone}
              </a>
            </div>
          )}
          
          {resource.contact.website && (
            <div className="flex items-center gap-2 text-sm">
              <ExternalLink size={14} className="text-slate-500" />
              <a 
                href={resource.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-calm-600 hover:text-calm-800 font-medium"
              >
                Visit website
              </a>
            </div>
          )}
          
          {resource.contact.address && (
            <div className="flex items-start gap-2 text-sm">
              <MapPin size={14} className="text-slate-500 mt-0.5" />
              <span className="text-slate-700">{resource.contact.address}</span>
            </div>
          )}

          {resource.contact.email && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-500">@</span>
              <a 
                href={`mailto:${resource.contact.email}`}
                className="text-calm-600 hover:text-calm-800 font-medium"
              >
                {resource.contact.email}
              </a>
            </div>
          )}
        </div>

        {/* Services */}
        <div>
          <h4 className="font-medium text-slate-800 mb-2">Services offered</h4>
          <ul className="space-y-1">
            {resource.services.map((service, index) => (
              <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                <span className="text-sage-500 mt-1">•</span>
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Users className="text-calm-600" size={32} />
          <h1 className="text-3xl font-semibold text-calm-800">Finding local support in Hamilton County</h1>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          You don't have to navigate this process alone. Hamilton County offers many resources 
          to support you through separation and divorce. These services can provide legal help, 
          emotional support, and practical guidance.
        </p>
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h2 className="font-medium text-yellow-800 mb-2">Important reminders</h2>
        <div className="space-y-2 text-sm text-yellow-800">
          <p>• Always verify current contact information and services, as these can change</p>
          <p>• Many services have eligibility requirements or waiting lists</p>
          <p>• Some organizations offer sliding scale fees based on income</p>
          <p>• Don't hesitate to ask about payment options or financial assistance</p>
        </div>
      </div>

      {/* Resources by Category */}
      <div className="space-y-12">
        {categories.map(category => (
          <div key={category} className="space-y-6">
            <h2 className="text-2xl font-medium text-slate-800 border-b border-slate-200 pb-2">
              {category}
            </h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {supportResources
                .filter(resource => resource.category === category)
                .map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))
              }
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Resources */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="font-medium text-red-800 mb-4 flex items-center gap-2">
          <Heart className="text-red-600" size={20} />
          Emergency and crisis resources
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-red-800">Domestic Violence Crisis Line</p>
            <p className="text-red-700">YWCA Cincinnati: (513) 872-3333 (24/7)</p>
          </div>
          <div>
            <p className="font-medium text-red-800">National Suicide Prevention Lifeline</p>
            <p className="text-red-700">988 (24/7)</p>
          </div>
          <div>
            <p className="font-medium text-red-800">Crisis Text Line</p>
            <p className="text-red-700">Text HOME to 741741</p>
          </div>
          <div>
            <p className="font-medium text-red-800">Emergency Services</p>
            <p className="text-red-700">911 for immediate danger</p>
          </div>
        </div>
      </div>

      {/* Additional Tips */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h3 className="font-medium text-slate-800 mb-3">Tips for reaching out</h3>
        <div className="space-y-2 text-sm text-slate-700">
          <p>• <strong>Start with a phone call:</strong> Most organizations are happy to explain their services and help you understand if they're a good fit.</p>
          <p>• <strong>Ask about wait times:</strong> Some services have waiting lists, so it's helpful to get on the list early.</p>
          <p>• <strong>Bring questions:</strong> Write down what you want to know before calling or visiting.</p>
          <p>• <strong>Consider multiple resources:</strong> You might benefit from both legal help and counseling support.</p>
          <p>• <strong>Ask about costs upfront:</strong> Many organizations offer sliding scale fees or payment plans.</p>
          <p>• <strong>Don't give up:</strong> If one resource isn't available or doesn't feel like the right fit, try another.</p>
        </div>
      </div>

      {/* Footer Message */}
      <div className="text-center pt-6">
        <p className="text-slate-600 leading-relaxed">
          These resources exist to help people navigate challenging transitions. Don't hesitate to reach out when you need support.
        </p>
      </div>
    </div>
  );
};

export default LocalSupport;
