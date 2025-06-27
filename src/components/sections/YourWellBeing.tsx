import React, { useState } from 'react';
import { Heart, Users, CheckCircle2, Circle, BookOpen, Shield, Target, Plus, ExternalLink, MessageSquare, Phone } from 'lucide-react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: 'self-care' | 'support-system';
}

interface JournalEntry {
  id: string;
  date: string;
  prompt: string;
  response: string;
}

const YourWellBeing: React.FC = () => {
  const [checklist, setChecklist] = useLocalStorageState<ChecklistItem[]>('wellbeing-checklist', []);
  const [journalEntries, setJournalEntries] = useLocalStorageState<JournalEntry[]>('wellbeing-journal', []);

  const selfCareItems: Omit<ChecklistItem, 'completed'>[] = [
    {
      id: 'sc-1',
      category: 'self-care',
      title: 'Schedule time for yourself',
      description: 'Block out non-negotiable time in your calendar for an activity you enjoy, even if it\'s just 15 minutes.',
    },
    {
      id: 'sc-2',
      category: 'self-care',
      title: 'Move your body gently',
      description: 'Go for a walk, stretch, or do some light yoga. The goal is to connect with your body, not to train for a marathon.',
    },
    {
      id: 'sc-3',
      category: 'self-care',
      title: 'Nourish your body',
      description: 'Focus on one small, healthy meal or snack today. Hydration is also key.',
    },
    {
      id: 'sc-4',
      category: 'self-care',
      title: 'Practice a mindfulness exercise',
      description: 'Try a 5-minute guided meditation or simply focus on your breath. Apps like Calm or Headspace can help.',
    },
  ];

  const supportSystemItems: Omit<ChecklistItem, 'completed'>[] = [
    {
      id: 'ss-1',
      category: 'support-system',
      title: 'Identify your core support people',
      description: 'List 2-3 people you can talk to without judgment. It could be a friend, family member, or therapist.',
    },
    {
      id: 'ss-2',
      category: 'support-system',
      title: 'Reach out to one person today',
      description: 'Send a simple text or make a quick call. It doesn\'t have to be a deep conversation.',
    },
    {
      id: 'ss-3',
      category: 'support-system',
      title: 'Consider professional support',
      description: 'Research one therapist or counselor who specializes in divorce or life transitions. Psychology Today is a good resource.',
    },
    {
      id: 'ss-4',
      category: 'support-system',
      title: 'Explore a support group',
      description: 'Look for online or local groups for people going through divorce. Shared experience can be very powerful.',
    },
  ];

  const allItems = [...selfCareItems, ...supportSystemItems];

  React.useEffect(() => {
    if (checklist.length === 0) {
      setChecklist(allItems.map(item => ({ ...item, completed: false })));
    }
  }, []);

  const journalPrompts = [
    "What is one small thing I can do for myself today?",
    "What emotion is most present for me right now, and where do I feel it in my body?",
    "If I could give myself one piece of advice, what would it be?",
    "What is a boundary I need to set or reinforce this week?",
    "What is one thing I\'m learning about myself through this process?",
    "Who in my support system can I connect with this week?",
  ];

  const toggleItem = (itemId: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === itemId ? { ...item, completed: !item.completed } : item
    ));
  };

  const addJournalEntry = () => {
    const randomPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
    const newEntry: JournalEntry = {
      id: `entry-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      prompt: randomPrompt,
      response: '',
    };
    setJournalEntries(prev => [newEntry, ...prev]);
  };

  const updateJournalResponse = (entryId: string, response: string) => {
    setJournalEntries(prev => prev.map(entry => 
      entry.id === entryId ? { ...entry, response } : entry
    ));
  };

  const deleteJournalEntry = (entryId: string) => {
    setJournalEntries(prev => prev.filter(entry => entry.id !== entryId));
  };

  const renderChecklist = (category: 'self-care' | 'support-system', title: string) => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-neutral-800 mb-4">{title}</h3>
      <ul className="space-y-4">
        {checklist.filter(item => item.category === category).map(item => (
          <li key={item.id} className="flex items-start gap-3">
            <button onClick={() => toggleItem(item.id)} className="mt-1 flex-shrink-0">
              {item.completed ? 
                <CheckCircle2 size={20} className="text-green-500" /> : 
                <Circle size={20} className="text-neutral-300" />
              }
            </button>
            <div>
              <label htmlFor={`item-${item.id}`} className={`font-medium ${item.completed ? 'text-neutral-500 line-through' : 'text-neutral-700'}`}>
                {item.title}
              </label>
              <p className="text-sm text-neutral-500 mt-1">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-light text-sage-900">Your Well-being</h1>
        <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
          A dedicated space to focus on your own emotional health and resilience. You cannot pour from an empty cup.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {renderChecklist('self-care', 'Actionable Self-Care')}
        {renderChecklist('support-system', 'Building Your Support System')}
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-2">Private Journal</h2>
        <p className="text-neutral-600 mb-6">Use this space to process your thoughts and feelings without judgment. Your entries are saved locally and are not shared with anyone.</p>
        <button onClick={addJournalEntry} className="flex items-center gap-2 bg-sage-600 text-white px-4 py-2 rounded-lg hover:bg-sage-700 transition-colors">
          <Plus size={18} />
          Add New Journal Entry
        </button>

        <div className="mt-6 space-y-6">
          {journalEntries.map(entry => (
            <div key={entry.id} className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold text-neutral-700">{entry.prompt}</p>
                  <p className="text-sm text-neutral-500">{new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <button onClick={() => deleteJournalEntry(entry.id)} className="text-neutral-400 hover:text-red-500">
                  &times;
                </button>
              </div>
              <textarea
                value={entry.response}
                onChange={(e) => updateJournalResponse(entry.id, e.target.value)}
                placeholder="Write your thoughts here..."
                className="w-full p-2 border border-neutral-300 rounded-md mt-2 h-24"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-md">
        <h3 className="text-xl font-bold text-red-800 mb-3">Crisis Support & Immediate Help</h3>
        <p className="text-red-700 mb-4">If you are in crisis or need immediate support, please reach out to these resources. Your safety is the first priority.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="tel:988" className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:bg-neutral-50 transition-colors border border-red-200">
            <Phone size={24} className="text-red-600" />
            <div>
              <p className="font-bold text-red-800">988 Suicide & Crisis Lifeline</p>
              <p className="text-sm text-red-700">24/7 free, confidential support</p>
            </div>
          </a>
          <a href="https://www.thehotline.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:bg-neutral-50 transition-colors border border-red-200">
            <Shield size={24} className="text-red-600" />
            <div>
              <p className="font-bold text-red-800">National Domestic Violence Hotline</p>
              <p className="text-sm text-red-700">Advocacy and support</p>
            </div>
          </a>
        </div>
      </div>

    </div>
  );
};

export default YourWellBeing;
