import React from 'react';
import { MessageSquare, Shield, Users, Copy } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

interface Template {
  id: string;
  title: string;
  description: string;
  template: string;
  category: 'Co-Parenting' | 'Financial' | 'Legal';
}

const templates: Template[] = [
  {
    id: 'coparent-schedule-change',
    title: 'Requesting a Schedule Change',
    description: 'A neutral, child-focused way to ask for a one-time change to the parenting schedule.',
    category: 'Co-Parenting',
    template: `Hi [Co-parent's Name],\n\nI hope you're doing well.\n\nI'm writing to ask if we could adjust the parenting schedule for the week of [Date]. I have [Reason for request, e.g., a work trip, a family event] and was hoping we could swap weekends/days. Specifically, I was thinking I could take the kids on [Proposed new dates] in exchange for your time on [Original dates].\n\nPlease let me know if that works for you or if you have another suggestion. I'm happy to discuss.\n\nThanks,\n[Your Name]`,
  },
  {
    id: 'coparent-expense-reimbursement',
    title: 'Request for Expense Reimbursement',
    description: 'A clear and concise request for a shared expense, like medical bills or extracurriculars.',
    category: 'Co-Parenting',
    template: `Hi [Co-parent's Name],\n\nI'm attaching the receipt for [Child's Name]'s recent [Expense, e.g., doctor's visit, soccer registration]. The total was [Total Amount].\n\nAs per our agreement, your share is [Their Share Amount]. Could you please send that over via [Preferred Method, e.g., Venmo, Zelle] when you have a moment?\n\nLet me know if you have any questions.\n\nThanks,\n[Your Name]`,
  },
  {
    id: 'financial-document-request',
    title: 'Request for Financial Document',
    description: 'A formal but neutral request for necessary financial documents during the discovery process.',
    category: 'Financial',
    template: `Hi [Spouse's Name],\n\nFor the financial disclosure part of our divorce process, I need a copy of the [Specific Document, e.g., 2023 W-2, latest 401(k) statement]. My attorney has requested this by [Date].\n\nPlease send it over to me or my attorney at your earliest convenience.\n\nThank you,\n[Your Name]`,
  },
  {
    id: 'legal-communication-boundary',
    title: 'Setting Communication Boundaries',
    description: 'A firm but polite script to redirect all legal or contentious talk to attorneys.',
    category: 'Legal',
    template: `Hi [Spouse's Name],\n\nI understand you have strong feelings about [Topic], but I'd prefer we keep our direct communication focused on [Acceptable topics, e.g., urgent child needs].\n\nFor any discussions about the legal case or financial settlements, please have your attorney contact mine. This will ensure everything is handled correctly and reduce conflict between us.\n\nThank you for understanding,\n[Your Name]`,
  },
];

const CommunicationTemplates: React.FC = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to Clipboard',
      description: 'You can now paste the template text.',
    });
  };

  const getCategoryIcon = (category: Template['category']) => {
    switch (category) {
      case 'Co-Parenting':
        return <Users className="text-blue-500" />;
      case 'Financial':
        return <MessageSquare className="text-green-500" />;
      case 'Legal':
        return <Shield className="text-red-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center space-y-4 mb-12">
        <MessageSquare className="mx-auto text-sage-500" size={40} />
        <h1 className="text-4xl font-light text-sage-900">Communication Templates</h1>
        <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
          Use these templates to communicate clearly and effectively during your divorce. They are designed to be neutral, factual, and focused on resolving issues.
        </p>
      </div>

      <div className="space-y-8">
        {templates.map(template => (
          <div key={template.id} className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                {getCategoryIcon(template.category)}
                <div>
                  <h2 className="text-xl font-semibold text-neutral-800">{template.title}</h2>
                  <p className="text-neutral-600 mt-1">{template.description}</p>
                </div>
              </div>
            </div>
            <div className="bg-neutral-50 p-6">
              <pre className="whitespace-pre-wrap font-sans text-sm text-neutral-700 bg-white p-4 rounded-lg border border-neutral-200">
                {template.template}
              </pre>
              <button
                onClick={() => copyToClipboard(template.template)}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Copy size={16} />
                Copy Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunicationTemplates;
