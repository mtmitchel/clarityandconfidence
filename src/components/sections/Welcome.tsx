import React from 'react';
import { Shield, Calculator, Users, Scale, Heart, BookOpen, Info, CheckCircle2, Download, ArrowRight, Target, TrendingUp } from 'lucide-react';

const Welcome: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-8">
        <h1 className="text-5xl font-light text-sage-900 leading-tight tracking-tight">
          Clarity and confidence
        </h1>
        <p className="text-2xl text-sage-700 font-light max-w-3xl mx-auto leading-relaxed">
          Ohio divorce resource hub
        </p>
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-neutral-700 leading-relaxed">
            Interactive tools, scenario modeling, and trusted legal resources 
            for Ohio residents navigating divorce proceedings. Everything stays private on your device.
          </p>
        </div>
                
        <div className="flex justify-center pt-4">
          <div className="inline-flex items-center gap-3 bg-sage-100 text-sage-800 px-6 py-3 rounded-full border border-sage-200">
            <Shield size={20} className="text-sage-600" />
            <span className="font-medium">Complete privacy • No accounts • No tracking</span>
          </div>
        </div>
      </div>

      {/* Core Value Proposition */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center space-y-4 p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Target className="text-blue-600" size={28} />
          </div>
          <h3 className="text-xl font-semibold text-neutral-800">Interactive scenario modeling</h3>
          <p className="text-neutral-600 leading-relaxed">
            Explore different divorce paths, custody arrangements, and financial outcomes 
            with evidence-based modeling tools.
          </p>
        </div>
        <div className="text-center space-y-4 p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Calculator className="text-green-600" size={28} />
          </div>
          <h3 className="text-xl font-semibold text-neutral-800">Ohio child support calculator</h3>
          <p className="text-neutral-600 leading-relaxed">
            Calculate estimates using official Ohio guidelines.
            Organize financial information for mediation and court filings.
          </p>
        </div>
        <div className="text-center space-y-4 p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
            <Scale className="text-purple-600" size={28} />
          </div>
          <h3 className="text-xl font-semibold text-neutral-800">Verified Ohio resources</h3>
          <p className="text-neutral-600 leading-relaxed">
            Direct links to Ohio Supreme Court forms, Legal Aid societies,
            and verified professional services in your area.
          </p>
        </div>
      </div>

      {/* Available Tools */}
      <div className="space-y-6">
        <h2 className="text-3xl font-light text-neutral-800 text-center">Tools available to you</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-neutral-200 hover:shadow-md transition-shadow">
            <TrendingUp className="text-blue-600 mt-1 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">Progress tracker</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Track your journey with actionable insights and milestone achievements.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-neutral-200 hover:shadow-md transition-shadow">
            <Calculator className="text-green-600 mt-1 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">Financial scenario modeling</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Ohio child support calculator, asset division planning, and tax implications.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-neutral-200 hover:shadow-md transition-shadow">
            <Scale className="text-purple-600 mt-1 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">Legal path decision tool</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Interactive tool for divorce vs. dissolution decisions and jurisdiction guidance.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-neutral-200 hover:shadow-md transition-shadow">
            <Users className="text-orange-600 mt-1 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">Custody arrangement planner</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Age-appropriate schedules, communication strategies, and Ohio resources.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-neutral-200 hover:shadow-md transition-shadow">
            <Target className="text-indigo-600 mt-1 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">Divorce process timeline</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Interactive timeline modeling for different divorce scenarios and outcomes.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-neutral-200 hover:shadow-md transition-shadow">
            <BookOpen className="text-teal-600 mt-1 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">Trusted resources</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Evidence-based resources, support communities, and professional services.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-sage-50 to-blue-50 rounded-2xl p-8">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-light text-neutral-800">Ready to get started?</h2>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
            Most people begin with the legal path decision tool or financial scenario modeling.
            Choose any section from the sidebar to start exploring your options.
          </p>
                    
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-neutral-200 shadow-sm">
              <CheckCircle2 size={20} className="text-green-600" />
              <span className="text-neutral-700 font-medium">Start with any section</span>
            </div>
            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-neutral-200 shadow-sm">
              <Download size={20} className="text-blue-600" />
              <span className="text-neutral-700 font-medium">Export your insights anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Privacy - Contextual placement */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Info className="text-blue-600 mt-1 flex-shrink-0" size={24} />
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-blue-900">About your data</h3>
            <div className="space-y-2 text-blue-800">
              <p>
                Your information is stored locally in this browser only. It never leaves your device 
                and isn't shared with any external services.
              </p>
              <p className="text-blue-700">
                <strong>Important:</strong> Use regular browsing mode (not private/incognito) and export 
                your insights regularly using the download buttons in each section to prevent loss.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Notice - Professional but not alarming */}
      <div className="text-center p-6 bg-neutral-50 rounded-xl border border-neutral-200">
        <p className="text-neutral-700 leading-relaxed">
          <strong>Legal notice:</strong> This application provides educational information and organizational tools only. 
          It does not constitute legal advice. Always consult with a qualified Ohio family law attorney 
          for advice specific to your situation.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
