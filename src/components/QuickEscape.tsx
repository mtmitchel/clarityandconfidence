import React from 'react';
import { AlertTriangle } from 'lucide-react';

const QuickEscape: React.FC = () => {
  const handleQuickEscape = () => {
    // Clear any local storage data and redirect to Google
    window.location.href = 'https://www.google.com';
  };

  return (
    <button
      onClick={handleQuickEscape}
      className="fixed top-4 right-4 z-50 bg-escape hover:bg-escape-hover text-white px-4 py-2 rounded-lg font-medium shadow-lg transition-colors duration-200 flex items-center gap-2"
      aria-label="Quick escape - leaves this site immediately"
    >
      <AlertTriangle size={18} />
      Quick Escape
    </button>
  );
};

export default QuickEscape;
