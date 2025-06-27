import React, { useState, useEffect } from 'react';
import { Trash2, Save, Heart, TrendingUp, Calendar } from 'lucide-react';
import { 
  saveJournalEntry, 
  loadJournalEntry, 
  clearStorageSection, 
  STORAGE_KEYS,
  saveMoodEntries,
  loadMoodEntries,
  MoodEntry
} from '../../lib/storage';

const CheckingIn: React.FC = () => {
  const [journalContent, setJournalContent] = useState('');
  const [lastSaved, setLastSaved] = useState<string>('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Mood tracking state
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [todaysMood, setTodaysMood] = useState({
    mood: 5,
    energy: 5,
    stress: 5,
    notes: '',
  });
  const [showMoodForm, setShowMoodForm] = useState(false);

  // Load saved journal entry on component mount
  useEffect(() => {
    const savedEntry = loadJournalEntry();
    setJournalContent(savedEntry.content);
    setLastSaved(savedEntry.lastUpdated);

    // Load mood entries
    const savedMoods = loadMoodEntries();
    setMoodEntries(savedMoods);

    // Check if there's already a mood entry for today
    const today = new Date().toDateString();
    const todaysEntry = savedMoods.find(entry => new Date(entry.date).toDateString() === today);
    if (todaysEntry) {
      setTodaysMood({
        mood: todaysEntry.mood,
        energy: todaysEntry.energy,
        stress: todaysEntry.stress,
        notes: todaysEntry.notes || '',
      });
    }
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

  const saveMoodEntry = () => {
    const today = new Date().toDateString();
    const existingIndex = moodEntries.findIndex(entry => new Date(entry.date).toDateString() === today);
    
    const newEntry: MoodEntry = {
      id: existingIndex >= 0 ? moodEntries[existingIndex].id : Date.now().toString(),
      date: new Date().toISOString(),
      mood: todaysMood.mood,
      energy: todaysMood.energy,
      stress: todaysMood.stress,
      notes: todaysMood.notes,
    };

    let updatedEntries;
    if (existingIndex >= 0) {
      // Update existing entry
      updatedEntries = [...moodEntries];
      updatedEntries[existingIndex] = newEntry;
    } else {
      // Add new entry
      updatedEntries = [...moodEntries, newEntry];
    }

    setMoodEntries(updatedEntries);
    saveMoodEntries(updatedEntries);
    setShowMoodForm(false);
  };

  const getMoodTrend = () => {
    if (moodEntries.length < 2) return null;
    const recent = moodEntries.slice(-7); // Last 7 entries
    const firstHalf = recent.slice(0, Math.floor(recent.length / 2));
    const secondHalf = recent.slice(Math.floor(recent.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, entry) => sum + entry.mood, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, entry) => sum + entry.mood, 0) / secondHalf.length;
    
    if (secondAvg > firstAvg + 0.5) return 'improving';
    if (secondAvg < firstAvg - 0.5) return 'declining';
    return 'stable';
  };

  const getTodaysEntry = () => {
    const today = new Date().toDateString();
    return moodEntries.find(entry => new Date(entry.date).toDateString() === today);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-calm-800">Checking in with yourself</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Use this space to reflect on your current situation, thoughts, and concerns. 
          This private area is for organizing your thoughts as you work through this process.
        </p>
      </div>

      {/* Mood Tracking Section */}
      <div className="bg-rose-50 border border-rose-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Heart className="text-rose-600" size={24} />
            <h2 className="text-xl font-medium text-rose-800">Daily Mood Check-in</h2>
          </div>
          {!getTodaysEntry() && (
            <button
              onClick={() => setShowMoodForm(true)}
              className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 text-sm"
            >
              Check In Today
            </button>
          )}
        </div>

        {/* Today's Mood Entry */}
        {getTodaysEntry() ? (
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-slate-800">Today's Check-in</h3>
              <button
                onClick={() => setShowMoodForm(true)}
                className="text-sm text-rose-600 hover:text-rose-700"
              >
                Update
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-semibold text-slate-700">{getTodaysEntry()?.mood}/10</div>
                <div className="text-sm text-slate-600">Mood</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-slate-700">{getTodaysEntry()?.energy}/10</div>
                <div className="text-sm text-slate-600">Energy</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-slate-700">{getTodaysEntry()?.stress}/10</div>
                <div className="text-sm text-slate-600">Stress</div>
              </div>
            </div>
            {getTodaysEntry()?.notes && (
              <p className="mt-3 text-sm text-slate-700">{getTodaysEntry()?.notes}</p>
            )}
          </div>
        ) : (
          <p className="text-rose-700">Track your daily mood to see patterns and trends over time.</p>
        )}

        {/* Mood Form */}
        {showMoodForm && (
          <div className="bg-white rounded-lg p-6 space-y-4">
            <h3 className="font-medium text-slate-800">How are you feeling today?</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700">Mood</label>
                  <span className="text-sm text-slate-600">{todaysMood.mood}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={todaysMood.mood}
                  onChange={(e) => setTodaysMood({ ...todaysMood, mood: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Very Low</span>
                  <span>Excellent</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700">Energy Level</label>
                  <span className="text-sm text-slate-600">{todaysMood.energy}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={todaysMood.energy}
                  onChange={(e) => setTodaysMood({ ...todaysMood, energy: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Exhausted</span>
                  <span>Energized</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700">Stress Level</label>
                  <span className="text-sm text-slate-600">{todaysMood.stress}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={todaysMood.stress}
                  onChange={(e) => setTodaysMood({ ...todaysMood, stress: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Very Calm</span>
                  <span>Very Stressed</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Notes (optional)</label>
                <textarea
                  value={todaysMood.notes}
                  onChange={(e) => setTodaysMood({ ...todaysMood, notes: e.target.value })}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                  rows={2}
                  placeholder="What's affecting your mood today?"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={saveMoodEntry}
                className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
              >
                Save Check-in
              </button>
              <button
                onClick={() => setShowMoodForm(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Mood Trend */}
        {moodEntries.length >= 3 && (
          <div className="mt-4 p-4 bg-white rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} />
              <span className="text-sm font-medium text-slate-700">Recent Trend:</span>
              <span className={`text-sm ${
                getMoodTrend() === 'improving' ? 'text-green-600' :
                getMoodTrend() === 'declining' ? 'text-red-600' : 'text-slate-600'
              }`}>
                {getMoodTrend() === 'improving' ? '↗ Improving' :
                 getMoodTrend() === 'declining' ? '↘ Needs attention' : '→ Stable'}
              </span>
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Based on your last {Math.min(moodEntries.length, 7)} entries
            </div>
          </div>
        )}
      </div>

      {/* Reflection prompts */}
      <div className="bg-sage-50 border border-sage-200 rounded-lg p-6">
        <h2 className="text-xl font-medium text-sage-800 mb-4">Reflection prompts</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sage-700">
          <div className="space-y-2">
            <p className="font-medium">How are you feeling today?</p>
            <p className="font-medium">What emotions are you experiencing?</p>
            <p className="font-medium">What feels most challenging right now?</p>
            <p className="font-medium">What are your goals for this process?</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">What support do you need?</p>
            <p className="font-medium">What are you grateful for today?</p>
            <p className="font-medium">What's one small step you can take?</p>
            <p className="font-medium">What would help you feel more prepared?</p>
          </div>
        </div>
        <p className="text-sm text-sage-600 mt-4 italic">
          These are suggestions - write about whatever is relevant to your situation.
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
            placeholder="Use this space to write about your thoughts, concerns, goals, or anything else that's relevant to your situation."
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
