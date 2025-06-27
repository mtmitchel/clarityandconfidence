import React from 'react';
import { Heart, Shield, Lock, Info } from 'lucide-react';

const Welcome: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-semibold text-calm-800 leading-tight">
          Your Personal Divorce Planning Resource
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          This tool was created specifically to help you navigate this transition 
          with greater clarity and confidence. Take your time, work at your own pace, 
          and remember that you have support.
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
            <h2 className="text-xl font-medium text-calm-800">Support and guidance</h2>
          </div>
          <div className="space-y-3 text-calm-700">
            <p>Navigating separation involves many complex decisions. This tool provides structured guidance to help you work through important considerations.</p>
            <p>Work through sections in whatever order makes sense for your situation.</p>
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
            <h3 className="font-medium text-slate-800 mb-2">Work at your own pace</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Use the sidebar to move between sections. Complete them in whatever order 
              makes sense for your situation.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="font-medium text-slate-800 mb-2">Your information is saved</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Information you enter is automatically saved to your device so you can 
              return to it later.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="font-medium text-slate-800 mb-2">Take breaks as needed</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              You can step away and return anytime. Your progress will be saved.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="font-medium text-slate-800 mb-2">Professional support</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              The "Finding local support" section includes counselors, mediators, and legal aid 
              resources available in Hamilton County.
            </p>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="text-center pt-6">
        <p className="text-slate-600 mb-4">
          Choose a section from the sidebar to begin.
        </p>
        <p className="text-sm text-slate-500">
          Many people start with "Checking in" to assess their current situation.
        </p>
      </div>

      {/* Personal Privacy Reminder */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
        <div className="flex items-start gap-3">
          <Shield className="text-blue-600 mt-1 flex-shrink-0" size={20} />
          <div className="space-y-2">
            <h3 className="font-medium text-blue-800">Your Personal Space</h3>
            <p className="text-blue-700 leading-relaxed text-sm">
              This tool was created specifically for you. All your information stays completely 
              private on your device. You can bookmark this page and return anytime. 
              Consider using a private/incognito browser if you're on a shared computer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
