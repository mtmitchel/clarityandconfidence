import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import QuickEscape from './components/QuickEscape';

// Import all section components
import Welcome from './components/sections/Welcome';
import Dashboard from './components/sections/Dashboard';
import InitialAssessment from './components/sections/InitialAssessment';
import ChildSupportCalculator from './components/sections/ChildSupportCalculator';
import DocumentChecklist from './components/sections/DocumentChecklist';
import DeadlineCalculator from './components/sections/DeadlineCalculator';
import UnderstandingMoney from './components/sections/UnderstandingMoney';
import LegalPaths from './components/sections/LegalPaths';
import EnhancedTimeline from './components/sections/EnhancedTimeline';
import CommunicationLog from './components/sections/CommunicationLog';
import ExpenseTracker from './components/sections/ExpenseTracker';
import Resilience from './components/sections/Resilience';
import LifeAfterDivorce from './components/sections/LifeAfterDivorce';
import ResourceLibrary from './components/sections/ResourceLibrary';
import SpousalSupportCalculator from './components/sections/SpousalSupportCalculator';
import AssetDivisionTool from './components/sections/AssetDivisionTool';
import SettlementComparison from './components/sections/SettlementComparison';
import PostDivorceBudget from './components/sections/PostDivorceBudget';
import LegalFeeEstimator from './components/sections/LegalFeeEstimator';
import Children from './components/sections/Children';
import EmotionalToolkit from './components/sections/EmotionalToolkit';
import CoParentingCalendar from './components/sections/CoParentingCalendar';
import OhioResourceMap from './components/sections/OhioResourceMap';
import CommunicationTemplates from './components/sections/CommunicationTemplates';
import LegalDecisionGuide from './components/sections/LegalDecisionGuide';

function App() {
  const [currentSection, setCurrentSection] = useState('welcome');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle responsive sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'welcome':
        return <Welcome onStartAssessment={() => setCurrentSection('initial-assessment')} onNavigate={(section) => setCurrentSection(section)} />;
      case 'dashboard':
        return <Dashboard onNavigate={(section) => setCurrentSection(section)} />;
      case 'initial-assessment':
        return <InitialAssessment 
          onComplete={(recommendations) => {
            // Store recommendations for use on the dashboard and other sections
            localStorage.setItem('assessment-recommendations', JSON.stringify(recommendations));
            // We no longer navigate away automatically. The component will show its own results.
          }}
          onNavigate={(section) => setCurrentSection(section)}
        />;
      case 'legal-paths':
        return <LegalPaths />;
      case 'legal-decision-guide':
        return <LegalDecisionGuide />;
      case 'understanding-money':
        return <UnderstandingMoney />;
      case 'child-support-calculator':
        return <ChildSupportCalculator />;
      case 'spousal-support-calculator':
        return <SpousalSupportCalculator />;
      case 'asset-division-tool':
        return <AssetDivisionTool />;
      case 'settlement-comparison':
        return <SettlementComparison />;
      case 'post-divorce-budget':
        return <PostDivorceBudget />;
      case 'enhanced-timeline':
        return <EnhancedTimeline />;
      case 'document-checklist':
        return <DocumentChecklist />;
      case 'deadline-calculator':
        return <DeadlineCalculator />;
      case 'communication-log':
        return <CommunicationLog />;
      case 'expense-tracker':
        return <ExpenseTracker />;
      case 'legal-fee-estimator':
        return <LegalFeeEstimator />;
      case 'children-custody':
        return <Children />;
      case 'co-parenting-calendar':
        return <CoParentingCalendar />;
      case 'communication-templates':
        return <CommunicationTemplates />;
      case 'emotional-toolkit':
        return <EmotionalToolkit />;
      case 'life-after-divorce':
        return <LifeAfterDivorce />;
      case 'resources':
        return <ResourceLibrary />;
      case 'ohio-resource-map':
        return <OhioResourceMap />;
      case 'learning-resources':
        return <ResourceLibrary />;
      case 'citations':
        return <ResourceLibrary />;
      default:
        return <Welcome onStartAssessment={() => setCurrentSection('initial-assessment')} onNavigate={(section) => setCurrentSection(section)} />;
    }
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    setIsMobileMenuOpen(false); // Close mobile menu when section changes
    window.scrollTo(0, 0); // Ensure view is at the top
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Quick Escape Button - Always visible */}
      <QuickEscape />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-sage-600 text-white rounded-lg shadow-lg hover:bg-sage-700 transition-colors"
        aria-label="Toggle navigation menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-40 w-80 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar 
          currentSection={currentSection} 
          onSectionChange={handleSectionChange}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-0 overflow-auto">
        <div className="min-h-screen">
          {/* Add padding on mobile to account for menu button */}
          <div className="lg:pt-0 pt-16">
            {renderCurrentSection()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
