import React, { useState, useEffect } from 'react';
import { Trash2, Save } from 'lucide-react';
import { saveJournalEntry, loadJournalEntry, clearStorageSection, STORAGE_KEYS } from '../../lib/storage';

const CheckingIn: React.FC = () => {
  const [journalContent, setJournalContent] = useState('');
  const [lastSaved, setLastSaved] = useState<string>('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Load saved journal entry on component mount
  useEffect(() => {
    const savedEntry = loadJournalEntry();
    setJournalContent(savedEntry.content);
    setLastSaved(savedEntry.lastUpdated);
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (journalContent.trim()) {
      const timer = setTimeout(() => {
        saveJournalEntry(journalContent);
        setLastSaved(new Date().toISOString());
      }, 1000); // Save after 1 second of no typing

      return () => clearTimeout(timer);
    }
  }, [journalContent]);

  const handleClearSection = () => {
    if (showClearConfirm) {
      clearStorageSection(STORAGE_KEYS.JOURNAL_ENTRY);
      setJournalContent('');
      setLastSaved('');
      setShowClearConfirm(false);
    } else {
      setShowClearConfirm(true);
    }
  };

  const formatLastSaved = (timestamp: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-calm-800">Checking in with yourself</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Take a moment to reflect on how you're feeling and what's on your mind. 
          This private space is just for you to process your thoughts and emotions.
        </p>
      </div>

      {/* Gentle Prompts */}
      <div className="bg-sage-50 border border-sage-200 rounded-lg p-6">
        <h2 className="text-xl font-medium text-sage-800 mb-4">Some gentle prompts to consider</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sage-700">
          <div className="space-y-2">
            <p className="font-medium">How are you feeling today?</p>
            <p className="font-medium">What emotions are coming up for you?</p>
            <p className="font-medium">What feels most overwhelming right now?</p>
            <p className="font-medium">What are you hoping for in this process?</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">What support do you need?</p>
            <p className="font-medium">What are you grateful for today?</p>
            <p className="font-medium">What small step can you take today?</p>
            <p className="font-medium">How can you be kind to yourself right now?</p>
          </div>
        </div>
        <p className="text-sm text-sage-600 mt-4 italic">
          You don't need to answer all of these - just write whatever feels right for you.
        </p>
      </div>

      {/* Journal Area */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-slate-800">Your private reflection space</h2>
          {lastSaved && (
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <Save size={14} />
              Last saved: {formatLastSaved(lastSaved)}
            </div>
          )}
        </div>

        <div className="relative">
          <textarea
            value={journalContent}
            onChange={(e) => setJournalContent(e.target.value)}
            placeholder="Take your time... there's no right or wrong way to do this. Write whatever comes to mind."
            className="w-full min-h-[400px] p-6 border border-slate-300 rounded-lg resize-vertical focus:ring-2 focus:ring-calm-500 focus:border-calm-500 text-slate-700 leading-relaxed"
            style={{ fontFamily: 'inherit' }}
          />
        </div>

        <div className="text-sm text-slate-500 bg-slate-50 p-4 rounded-lg">
          <p className="mb-2">
            <strong>Privacy reminder:</strong> Everything you write here stays on your device only. 
            Nothing is sent to any server or shared with anyone.
          </p>
          <p>Your writing is automatically saved as you type.</p>
        </div>
      </div>

      {/* Clear Section */}
      <div className="border-t border-slate-200 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-slate-800">Clear this section</h3>
            <p className="text-sm text-slate-600">This will permanently delete your journal entry.</p>
          </div>
          <button
            onClick={handleClearSection}
            className={`
              px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2
              ${showClearConfirm 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
              }
            `}
          >
            <Trash2 size={16} />
            {showClearConfirm ? 'Confirm: Clear everything' : 'Clear this section'}
          </button>
        </div>
        {showClearConfirm && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">
              Are you sure? This will permanently delete your journal entry. 
              <button
                onClick={() => setShowClearConfirm(false)}
                className="ml-2 underline hover:no-underline"
              >
                Cancel
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckingIn;
