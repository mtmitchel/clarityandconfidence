import React from 'react';
import { Heart, Shield, Lock, Info } from 'lucide-react';

const Welcome: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-semibold text-calm-800 leading-tight">
          Welcome to your clarity and confidence tool
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          You're taking an important step by being here. This tool is designed to support you 
          as you navigate separation with greater clarity and confidence.
        </p>
      </div>

      {/* Main Content Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Privacy & Safety Card */}
        <div className="bg-sage-50 border border-sage-200 rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sage-100 rounded-lg">
              <Lock className="text-sage-600" size={24} />
            </div>
            <h2 className="text-xl font-medium text-sage-800">Your privacy matters</h2>
          </div>
          <div className="space-y-3 text-sage-700">
            <p>Everything you enter here stays on your device only. We don't collect, store, or share any of your personal information.</p>
            <p>You can clear any section at any time using the "Clear this section" buttons throughout the tool.</p>
            <p className="flex items-start gap-2">
              <Shield size={16} className="mt-1 text-sage-600 flex-shrink-0" />
              <span className="text-sm">The red "Quick Escape" button in the top-right corner will instantly take you to Google if you need to leave quickly.</span>
            </p>
          </div>
        </div>

        {/* Support & Guidance Card */}
        <div className="bg-calm-50 border border-calm-200 rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-calm-100 rounded-lg">
              <Heart className="text-calm-600" size={24} />
            </div>
            <h2 className="text-xl font-medium text-calm-800">You're not alone</h2>
          </div>
          <div className="space-y-3 text-calm-700">
            <p>Navigating separation is challenging, and it's normal to feel overwhelmed. This tool provides gentle guidance for your unique situation.</p>
            <p>Take your time. You can work through sections in any order that feels right for you.</p>
            <p>Remember: this tool provides general information and is not a substitute for legal advice from a qualified attorney.</p>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Info className="text-slate-600 mt-1 flex-shrink-0" size={20} />
          <div className="space-y-2">
            <h3 className="font-medium text-slate-800">Important legal notice</h3>
            <p className="text-slate-700 leading-relaxed">
              This tool provides general educational information about separation and divorce in Ohio. 
              It is not legal advice and should not replace consultation with a qualified attorney. 
              Every situation is unique, and laws can change. For specific legal guidance about your 
              circumstances, please consult with a licensed attorney in Ohio.
            </p>
          </div>
        </div>
      </div>

      {/* How to Use This Tool */}
      <div className="space-y-4">
        <h2 className="text-2xl font-medium text-slate-800">How to use this tool</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="font-medium text-slate-800 mb-2">Navigate at your own pace</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Use the sidebar to move between sections. You don't need to complete them in order - 
              focus on what feels most important to you right now.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="font-medium text-slate-800 mb-2">Your information is saved</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              As you fill out forms and calculators, your information is automatically saved to your 
              device so you can come back to it later.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="font-medium text-slate-800 mb-2">Take breaks when needed</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              This is a lot to process. It's perfectly okay to step away and return when you're ready. 
              Your progress will be waiting for you.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="font-medium text-slate-800 mb-2">Get professional support</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Check the "Finding local support" section for counselors, mediators, and legal aid 
              resources specifically available in Hamilton County.
            </p>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="text-center pt-6">
        <p className="text-slate-600 mb-4">
          When you're ready, choose a section from the sidebar to begin.
        </p>
        <p className="text-sm text-slate-500">
          Many people find it helpful to start with "Checking in" to reflect on where they are right now.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
