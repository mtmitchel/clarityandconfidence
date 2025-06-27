import React from 'react';
import { Shield, Compass, Scale, MessageSquare, Calculator, AlertTriangle, ArrowRight } from 'lucide-react';

interface WelcomeProps {
  onStartAssessment?: () => void;
  onNavigate?: (section: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStartAssessment, onNavigate }) => {
  const handleNavigate = (section: string) => {
    window.scrollTo(0, 0);
    if (onNavigate) {
      onNavigate(section);
    }
  };

  const handleStartAssessment = () => {
    window.scrollTo(0, 0);
    if (onStartAssessment) {
      onStartAssessment();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-8 py-8">
        <h1 className="text-4xl font-light text-sage-900 leading-tight tracking-tight">
          A private space to find your footing
        </h1>
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-xl text-neutral-700 leading-relaxed">
            Going through a divorce is disorienting. This workspace is designed to help you
            untangle the complexities, understand your options, and move forward with clarity—one step at a time.
          </p>
          <p className="text-lg text-neutral-600">
            Everything here stays on your device. No accounts, no judgment, no pressure.
          </p>
        </div>
        
        {/* Primary CTA - Assessment */}
        <div className="pt-8">
          <button 
            onClick={handleStartAssessment}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg inline-flex items-center gap-3"
          >
            <Compass size={24} />
            Get your personalized roadmap
            <ArrowRight size={20} />
          </button>
          <p className="text-sm text-neutral-500 mt-2">3 questions • Takes 2 minutes</p>
        </div>
        
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 bg-sage-100 text-sage-800 px-6 py-3 rounded-full border border-sage-200">
            <Shield size={20} className="text-sage-600" />
            <span className="font-medium">Private • Secure • Always under your control</span>
          </div>
        </div>
      </div>

      {/* Alternative Starting Paths */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-light text-neutral-800">Or jump to a specific tool</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            If you know exactly what you need help with right now, you can go directly to these tools.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Path 2: Legal Paths */}
          <div 
            className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8 text-left flex flex-col hover:border-sage-400 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => handleNavigate('legal-paths')}
          >
            <div className="flex-grow space-y-3">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                <Scale className="text-sage-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800">Compare Legal Paths</h3>
              <p className="text-neutral-600 leading-relaxed">
                Understand the key differences between Divorce and Dissolution in Ohio.
              </p>
            </div>
            <div className="mt-6">
              <span className="inline-flex items-center gap-2 text-sage-700 font-semibold">
                See Comparison <ArrowRight size={18} />
              </span>
            </div>
          </div>

          {/* Path 3: Communication Templates */}
          <div 
            className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8 text-left flex flex-col hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => handleNavigate('communication-templates')}
          >
            <div className="flex-grow space-y-3">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <MessageSquare className="text-amber-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800">Draft a Difficult Message</h3>
              <p className="text-neutral-600 leading-relaxed">
                Use neutral templates for communicating with your spouse about key topics.
              </p>
            </div>
            <div className="mt-6">
              <span className="inline-flex items-center gap-2 text-amber-700 font-semibold">
                Find a Template <ArrowRight size={18} />
              </span>
            </div>
          </div>

          {/* Path 4: Calculators */}
          <div 
            className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8 text-left flex flex-col hover:border-green-400 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => handleNavigate('child-support-calculator')}
          >
            <div className="flex-grow space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Calculator className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800">Estimate Support</h3>
              <p className="text-neutral-600 leading-relaxed">
                Run Ohio-specific calculations for child and spousal support.
              </p>
            </div>
            <div className="mt-6">
              <span className="inline-flex items-center gap-2 text-green-700 font-semibold">
                Run the Numbers <ArrowRight size={18} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Safety First */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <AlertTriangle className="text-amber-600" size={20} />
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-amber-900">Your safety comes first</h3>
            <div className="space-y-2 text-amber-800">
              <p>
                If you are in immediate danger, call 911. For support, contact the National Domestic Violence Hotline at 1-800-799-7233.
              </p>
              <p className="text-sm">
                Use the red "Quick Escape" button in the top corner to instantly leave this site if needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
