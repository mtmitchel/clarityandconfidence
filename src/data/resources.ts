export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'legal' | 'financial' | 'emotional' | 'support' | 'crisis';
  tags: string[];
  priority: 'high' | 'medium' | 'low';
  source: string;
  phone?: string;
}

export const resources: Resource[] = [
  // Legal Resources
  {
    id: 'ohio-legal-help',
    title: 'Ohio Legal Help',
    description: 'Premier legal self-help portal offering plain-language guides, forms, and connections to local legal aid for divorce, dissolution, custody, and support',
    url: 'https://www.ohiolegalhelp.org/topic/end_marriage',
    type: 'legal',
    tags: ['official', 'free', 'self-help'],
    priority: 'high',
    source: 'Ohio Legal Help (2024)'
  },
  {
    id: 'hamilton-county-clinic',
    title: 'Hamilton County Domestic Relations Family Law Clinic',
    description: 'Free help for low-income individuals representing themselves in Hamilton County Domestic Relations Court, including pre-filing, filing, and post-divorce support',
    url: 'https://www.ohiolegalhelp.org/resource/hamilton-county-domestic-relations-family-law-clinic',
    type: 'legal',
    tags: ['free', 'local', 'clinic'],
    priority: 'high',
    source: 'Hamilton County Courts (2024)'
  },
  {
    id: 'legal-aid-society',
    title: 'Legal Aid Society of Greater Cincinnati',
    description: 'Free or reduced-fee legal representation for qualifying individuals in divorce, custody, and domestic violence cases',
    url: 'https://www.lasco.org',
    type: 'legal',
    tags: ['free', 'low-income', 'representation'],
    priority: 'high',
    source: 'Legal Aid Society of Southwest Ohio (2024)'
  },
  
  // Financial Resources
  {
    id: 'divorce-financial-analysts',
    title: 'Certified Divorce Financial Analysts (CDFA)',
    description: 'Institute for Divorce Financial Analysts certifies professionals nationwide to help with asset division, support calculations, and post-divorce financial planning',
    url: 'https://institutedfa.com/find-a-cdfa/',
    type: 'financial',
    tags: ['professional', 'certified', 'planning'],
    priority: 'high',
    source: 'Institute for Divorce Financial Analysts (2024)'
  },
  {
    id: 'credit-counseling',
    title: 'National Foundation for Credit Counseling',
    description: 'Free or low-cost credit counseling and debt management services for those facing financial challenges during or after divorce',
    url: 'https://www.nfcc.org/',
    type: 'financial',
    tags: ['free', 'counseling', 'debt'],
    priority: 'high',
    source: 'National Foundation for Credit Counseling (2024)'
  },
  
  // Emotional Support
  {
    id: 'divorcecare',
    title: 'DivorceCare Support Groups - Ohio',
    description: 'Faith-based divorce recovery support groups with locations throughout Ohio',
    url: 'https://www.divorcecare.org/findagroup',
    type: 'emotional',
    tags: ['support-group', 'faith-based', 'local'],
    priority: 'high',
    source: 'DivorceCare (2024)'
  },
  {
    id: 'psychology-today',
    title: 'Psychology Today Therapist Directory',
    description: 'National directory for finding therapists specializing in divorce and family issues, with Ohio-specific filters',
    url: 'https://www.psychologytoday.com/us/therapists',
    type: 'emotional',
    tags: ['professional', 'therapy', 'directory'],
    priority: 'high',
    source: 'Psychology Today (2024)'
  },
  
  // Crisis Support
  {
    id: 'suicide-prevention',
    title: 'National Suicide Prevention Lifeline',
    description: '24/7 crisis support and suicide prevention hotline',
    url: 'https://suicidepreventionlifeline.org/',
    phone: '988',
    type: 'crisis',
    tags: ['24/7', 'crisis', 'hotline'],
    priority: 'high',
    source: 'SAMHSA (2024)'
  },
  {
    id: 'united-way-211',
    title: 'United Way 2-1-1',
    description: 'National information line connecting families to local emergency assistance for rent, utilities, and other needs',
    url: 'https://www.211.org/',
    phone: '211',
    type: 'support',
    tags: ['emergency', 'assistance', 'local'],
    priority: 'high',
    source: 'United Way Worldwide (2024)'
  }
];

export const getResourcesByType = (type: Resource['type']) => {
  return resources.filter(resource => resource.type === type);
};

export const getResourcesByTag = (tag: string) => {
  return resources.filter(resource => resource.tags.includes(tag));
};

export const getHighPriorityResources = () => {
  return resources.filter(resource => resource.priority === 'high');
};
