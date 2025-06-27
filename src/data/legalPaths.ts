export interface ComplexityFactor {
  id: string;
  question: string;
  description: string;
  weight: number;
}

export const complexityFactors: ComplexityFactor[] = [
  {
    id: 'business-ownership',
    question: 'Do you or your spouse own a business?',
    description: 'Business valuation and division can be highly complex',
    weight: 3
  },
  {
    id: 'multiple-retirement',
    question: 'Are there multiple retirement accounts (401k, pension, IRA)?',
    description: 'Different retirement accounts have varying division rules',
    weight: 2
  },
  {
    id: 'income-disparity',
    question: 'Is there significant income disparity between spouses?',
    description: 'Large income differences may require spousal support analysis',
    weight: 2
  },
  {
    id: 'property-valuation',
    question: 'Do you anticipate disagreement on property values?',
    description: 'Contested valuations may require professional appraisals',
    weight: 2
  },
  {
    id: 'parenting-dispute',
    question: 'Are there potential parenting time disputes?',
    description: 'Contested parenting arrangements increase complexity significantly',
    weight: 3
  },
  {
    id: 'domestic-violence',
    question: 'Are there domestic violence concerns?',
    description: 'Safety issues require specialized legal approach',
    weight: 3
  },
  {
    id: 'hidden-assets',
    question: 'Do you suspect hidden assets or financial misconduct?',
    description: 'Asset discovery and forensic accounting may be needed',
    weight: 3
  },
  {
    id: 'international-elements',
    question: 'Are there international assets or considerations?',
    description: 'Cross-border issues add legal and practical complexity',
    weight: 2
  }
];

export interface LegalRecommendation {
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  citation: string;
  link: string;
}

const dissolutionRecommendation: LegalRecommendation = {
  title: 'Dissolution',
  description: 'A dissolution is a no-fault, cooperative process where both parties agree on all terms before filing. It is generally faster, cheaper, and less stressful than a divorce.',
  pros: [
    'Faster and more streamlined process.',
    'Lower legal fees and court costs.',
    'More private, with less information in the public record.',
    'Cooperative nature can preserve a better co-parenting relationship.',
    'You control the outcome, not a judge.',
  ],
  cons: [
    'Requires 100% agreement on ALL issues beforehand.',
    'If agreement breaks down, you may have to start over with a divorce.',
    'May not be suitable if there is a power imbalance or history of abuse.',
    'Less formal discovery; may be risky if you suspect hidden assets.',
  ],
  citation: 'Ohio Rev. Code § 3105.61 et seq.',
  link: 'http://codes.ohio.gov/orc/3105.61',
};

const divorceRecommendation: LegalRecommendation = {
  title: 'Divorce',
  description: 'A divorce is a legal action where one spouse sues the other to end the marriage. It is necessary when you cannot agree on all terms and need a court to decide for you.',
  pros: [
    'Can resolve disputes when you cannot agree.',
    'Formal discovery process can uncover hidden assets or information.',
    'Court orders can provide protection and enforce temporary arrangements.',
    'Provides a clear path forward even with high conflict.',
  ],
  cons: [
    'Can be lengthy, expensive, and emotionally draining.',
    'Adversarial nature can damage relationships further.',
    'The outcome is decided by a judge, not by you.',
    'More information becomes part of the public record.',
  ],
  citation: 'Ohio Rev. Code § 3105.01 et seq.',
  link: 'http://codes.ohio.gov/orc/3105.01',
};

const consultAttorneyRecommendation: LegalRecommendation = {
    title: 'Consult an Attorney Immediately',
    description: 'Your situation involves factors that require immediate, personalized legal advice. A contested, high-conflict, or high-asset divorce is a complex legal proceeding where self-representation carries significant risk.',
    pros: [
        'An attorney will protect your rights and interests.',
        'They can navigate complex legal procedures and rules of evidence.',
        'Provides a buffer in high-conflict or domestic violence situations.',
        'Crucial for handling complex assets like businesses or hidden funds.'
    ],
    cons: [
        'Hiring an attorney requires a financial investment.'
    ],
    citation: 'Find a qualified attorney through your local bar association.',
    link: 'https://www.ohiobar.org/for-the-public/find-a-lawyer/',
};

export const calculateComplexity = (selectedFactors: string[]): number => {
  return selectedFactors.reduce((total, factorId) => {
    const factor = complexityFactors.find(f => f.id === factorId);
    return total + (factor ? factor.weight : 0);
  }, 0);
};

export const getRecommendation = (
  hasChildren: boolean | null,
  agreeOnTerms: boolean | null,
  complexityScore: number,
  selectedFactors: string[]
): LegalRecommendation => {
  if (agreeOnTerms === null || hasChildren === null) {
    // Fallback for incomplete form
    return {
        title: 'Complete the questions',
        description: 'Please answer all questions to receive a recommendation.',
        pros: [],
        cons: [],
        citation: '',
        link: '#',
    };
  }

  // Override for high-complexity or safety issues
  if (complexityScore >= 5 || selectedFactors.includes('domestic-violence') || selectedFactors.includes('hidden-assets')) {
      return consultAttorneyRecommendation;
  }

  if (agreeOnTerms) {
    return dissolutionRecommendation;
  } else {
    return divorceRecommendation;
  }
};
