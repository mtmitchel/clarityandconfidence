import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import QuickEscape from './components/QuickEscape';

// Import all section components
import Welcome from './components/sections/Welcome';
import UnderstandingMoney from './components/sections/UnderstandingMoney';
import LegalPaths from './components/sections/LegalPaths';
import Children from './components/sections/Children';
import Resilience from './components/sections/Resilience';
import Timeline from './components/sections/Timeline';

// Import Resources separately to avoid potential import issues
import Resources from './components/sections/Resources';

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
        return <Welcome />;
      case 'understanding-money':
        return <UnderstandingMoney />;
      case 'legal-paths':
        return <LegalPaths />;
      case 'children':
        return <Children />;
      case 'timeline':
        return <Timeline />;
      case 'resources':
        return <Resources />;
      case 'resilience':
        return <Resilience />;
      default:
        return <Welcome />;
    }
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    setIsMobileMenuOpen(false); // Close mobile menu when section changes
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
