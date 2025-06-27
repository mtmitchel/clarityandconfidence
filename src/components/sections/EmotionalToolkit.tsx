import React, { useState } from 'react';
import { Heart, Baby, Brain, Users, CheckCircle2, Circle, Calendar, BookOpen, Shield, Target, Plus, ExternalLink } from 'lucide-react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: 'personal' | 'parenting';
  priority: 'high' | 'medium' | 'low';
}

interface JournalEntry {
  id: string;
  date: string;
  prompt: string;
  response: string;
  mood: 1 | 2 | 3 | 4 | 5;
}

interface ParentingScheduleOption {
  id: string;
  name: string;
  description: string;
  timeWithParent1: string;
  timeWithParent2: string;
  pros: string[];
  cons: string[];
}

const EmotionalToolkit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resilience' | 'parenting' | 'journal' | 'resources'>('resilience');
  const [checklist, setChecklist] = useLocalStorageState<ChecklistItem[]>('emotional-checklist', []);
  const [journalEntries, setJournalEntries] = useLocalStorageState<JournalEntry[]>('journal-entries', []);
  const [selectedSchedule, setSelectedSchedule] = useLocalStorageState<string>('parenting-schedule', '');

  const resilienceItems: Omit<ChecklistItem, 'completed'>[] = [
    {
      id: 'res-1',
      category: 'personal',
      title: 'Find a therapist or counselor',
      description: 'Professional support for emotional processing and coping strategies',
      priority: 'high'
    },
    {
      id: 'res-2', 
      category: 'personal',
      title: 'Build a support network',
      description: 'Connect with friends, family, or support groups who understand your situation',
      priority: 'high'
    },
    {
      id: 'res-3',
      category: 'personal', 
      title: 'Establish self-care routines',
      description: 'Regular exercise, healthy eating, adequate sleep, and stress management',
      priority: 'medium'
    },
    {
      id: 'res-4',
      category: 'personal',
      title: 'Practice mindfulness or meditation',
      description: 'Develop coping techniques for anxiety and emotional regulation',
      priority: 'medium'
    }
  ];

  const parentingItems: Omit<ChecklistItem, 'completed'>[] = [
    {
      id: 'par-1',
      category: 'parenting',
      title: 'Create consistent routines',
      description: 'Establish predictable schedules and rules across both homes',
      priority: 'high'
    },
    {
      id: 'par-2',
      category: 'parenting', 
      title: 'Develop communication strategies',
      description: 'Learn age-appropriate ways to discuss the divorce with your children',
      priority: 'high'
    },
    {
      id: 'par-3',
      category: 'parenting',
      title: 'Coordinate with co-parent',
      description: 'Establish business-like communication focused on children\'s needs',
      priority: 'high'
    },
    {
      id: 'par-4',
      category: 'parenting',
      title: 'Monitor children\'s emotional health',
      description: 'Watch for signs of distress and consider counseling if needed',
      priority: 'medium'
    }
  ];

  const allItems = [...resilienceItems, ...parentingItems];

  // Professional Resources (consolidated from Resilience.tsx)
  const professionalResources = [
    {
      title: "Ohio Psychological Association Therapist Directory",
      organization: "Ohio Psychological Association", 
      description: "Licensed psychologists specializing in divorce, family transitions, and trauma therapy",
      link: "https://www.ohpsych.org/Public/Find-a-Psychologist",
      type: "therapy"
    },
    {
      title: "Psychology Today Ohio Therapists",
      organization: "Psychology Today",
      description: "Comprehensive directory with insurance verification and specialization filters for Ohio therapists", 
      link: "https://www.psychologytoday.com/us/therapists/oh",
      type: "therapy"
    },
    {
      title: "Crisis Text Line",
      organization: "Crisis Text Line",
      description: "24/7 crisis support via text message. Text HOME to 741741",
      link: "https://www.crisistextline.org/",
      phone: "Text HOME to 741741",
      type: "crisis"
    },
    {
      title: "National Suicide Prevention Lifeline", 
      organization: "SAMHSA",
      description: "24/7 suicide prevention and mental health crisis support",
      link: "https://suicidepreventionlifeline.org/",
      phone: "988",
      type: "crisis"
    },
    {
      title: "DivorceCare Support Groups - Ohio",
      organization: "DivorceCare",
      description: "Faith-based divorce recovery support groups with locations throughout Ohio",
      link: "https://www.divorcecare.org/findagroup", 
      type: "support"
    },
    {
      title: "Ohio Employee Assistance Programs",
      organization: "Ohio Department of Administrative Services",
      description: "Employee assistance programs offering counseling and mental health support",
      link: "https://das.ohio.gov/services/employee-assistance-program",
      type: "support"
    }
  ];

  // Initialize checklist if empty
  React.useEffect(() => {
    if (checklist.length === 0) {
      setChecklist(allItems.map(item => ({ ...item, completed: false })));
    }
  }, []);

  const parentingSchedules: ParentingScheduleOption[] = [
    {
      id: 'every-other-weekend',
      name: 'Every other weekend',
      description: 'Standard visitation schedule',
      timeWithParent1: '70%',
      timeWithParent2: '30%',
      pros: ['Predictable routine', 'Good for school-age children', 'Minimal transitions'],
      cons: ['Limited time with non-custodial parent', 'May feel rushed']
    },
    {
      id: '2-2-3',
      name: '2-2-3 schedule',
      description: 'Alternating 2 and 3-day periods',
      timeWithParent1: '50%',
      timeWithParent2: '50%',
      pros: ['Equal time', 'Frequent contact with both parents', 'Good for younger children'],
      cons: ['Many transitions', 'Complex logistics']
    },
    {
      id: 'week-on-week-off',
      name: 'Week on, week off',
      description: 'Alternating full weeks',
      timeWithParent1: '50%',
      timeWithParent2: '50%',
      pros: ['Equal time', 'Fewer transitions', 'Allows for routine building'],
      cons: ['Long periods without seeing other parent', 'May be difficult for younger children']
    }
  ];

  const journalPrompts = [
    "How are you feeling about your progress today?",
    "What is one thing you're grateful for right now?",
    "What challenge are you facing, and how might you address it?",
    "How are your children adapting to the changes?",
    "What support do you need most right now?",
    "What positive change have you noticed in yourself lately?",
    "What would you tell someone else going through a similar experience?"
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
      mood: 3
    };
    setJournalEntries(prev => [newEntry, ...prev]);
  };

  const updateJournalEntry = (entryId: string, updates: Partial<JournalEntry>) => {
    setJournalEntries(prev => prev.map(entry => 
      entry.id === entryId ? { ...entry, ...updates } : entry
    ));
  };

  const deleteJournalEntry = (entryId: string) => {
    setJournalEntries(prev => prev.filter(entry => entry.id !== entryId));
  };

  const personalProgress = checklist.filter(item => item.category === 'personal' && item.completed).length;
  const parentingProgress = checklist.filter(item => item.category === 'parenting' && item.completed).length;
  const personalTotal = checklist.filter(item => item.category === 'personal').length;
  const parentingTotal = checklist.filter(item => item.category === 'parenting').length;

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-light text-sage-900">Emotional support & resources</h1>
        <p className="text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed">
          Comprehensive support for your emotional well-being, with professional resources and coping strategies
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Personal resilience</h3> {/* updated to sentence case */}
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-blue-700">{personalProgress}/{personalTotal}</div>
            <div className="flex-1">
              <div className="w-full bg-white rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(personalProgress / personalTotal) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl p-6">
          <h3 className="font-semibold text-green-900 mb-3">Co-parenting strategies</h3> {/* updated to sentence case */}
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-green-700">{parentingProgress}/{parentingTotal}</div>
            <div className="flex-1">
              <div className="w-full bg-white rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(parentingProgress / parentingTotal) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="bg-neutral-100 rounded-xl p-1 flex">
          {[
            { id: 'resilience', label: 'Personal resilience', icon: Shield }, // updated to sentence case
            { id: 'parenting', label: 'Co-parenting strategies', icon: Baby }, // updated to sentence case
            { id: 'journal', label: 'Private journal', icon: BookOpen }, // updated to sentence case
            { id: 'resources', label: 'Professional resources', icon: Users } // new resources tab
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-white text-sage-900 shadow-sm' 
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Personal Resilience Tab */}
      {activeTab === 'resilience' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-neutral-800">Building your emotional strength</h2> {/* updated to sentence case */}
          
          <div className="space-y-4">
            {checklist.filter(item => item.category === 'personal').map(item => (
              <div
                key={item.id}
                className="bg-white border border-blue-200 rounded-xl p-6 transition-all hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="mt-1 flex-shrink-0"
                  >
                    {item.completed ? (
                      <CheckCircle2 className="text-green-600" size={24} />
                    ) : (
                      <Circle className="text-neutral-400" size={24} />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className={`font-semibold ${item.completed ? 'line-through text-neutral-500' : 'text-neutral-800'}`}>
                        {item.title}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.priority === 'high' ? 'bg-red-100 text-red-700' :
                        item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {item.priority} priority
                      </span>
                    </div>
                    <p className={`text-sm ${item.completed ? 'text-neutral-500' : 'text-neutral-600'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Professional Resources */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-4">Professional support resources</h3> {/* updated to sentence case */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Therapy & counseling</h4> {/* updated to sentence case */}
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• Psychology Today therapist directory</li>
                  <li>• Ohio Psychological Association</li>
                  <li>• Employee assistance programs</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Crisis support</h4> {/* updated to sentence case */}
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• Crisis Text Line: Text HOME to 741741</li>
                  <li>• National Suicide Prevention: 988</li>
                  <li>• Domestic Violence Hotline: 1-800-799-7233</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Co-parenting Tab */}
      {activeTab === 'parenting' && (
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-neutral-800">Co-parenting success strategies</h2> {/* updated to sentence case */}
          
          {/* Action Items */}
          <div className="space-y-4">
            {checklist.filter(item => item.category === 'parenting').map(item => (
              <div
                key={item.id}
                className="bg-white border border-green-200 rounded-xl p-6 transition-all hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="mt-1 flex-shrink-0"
                  >
                    {item.completed ? (
                      <CheckCircle2 className="text-green-600" size={24} />
                    ) : (
                      <Circle className="text-neutral-400" size={24} />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className={`font-semibold ${item.completed ? 'line-through text-neutral-500' : 'text-neutral-800'}`}>
                        {item.title}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.priority === 'high' ? 'bg-red-100 text-red-700' :
                        item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {item.priority} priority
                      </span>
                    </div>
                    <p className={`text-sm ${item.completed ? 'text-neutral-500' : 'text-neutral-600'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custody Schedule Selector */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-neutral-800">Custody schedule options</h3> {/* updated to sentence case */}
            <div className="grid gap-4">
              {parentingSchedules.map(schedule => (
                <div
                  key={schedule.id}
                  onClick={() => setSelectedSchedule(schedule.id)}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedSchedule === schedule.id
                      ? 'border-green-300 bg-green-50 shadow-md'
                      : 'border-neutral-200 bg-white hover:border-green-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-2">{schedule.name}</h4>
                      <p className="text-neutral-600 text-sm">{schedule.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-neutral-600">Time split</div>
                      <div className="font-semibold text-neutral-800">
                        {schedule.timeWithParent1} / {schedule.timeWithParent2}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-green-800 mb-2">Pros</h5>
                      <ul className="space-y-1">
                        {schedule.pros.map((pro, index) => (
                          <li key={index} className="text-sm text-green-700">• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-red-800 mb-2">Cons</h5>
                      <ul className="space-y-1">
                        {schedule.cons.map((con, index) => (
                          <li key={index} className="text-sm text-red-700">• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Communication Tools */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-semibold text-green-900 mb-4">Communication tools</h3> {/* updated to sentence case */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-green-800 mb-2">Co-parenting apps</h4> {/* updated to sentence case */}
                <ul className="space-y-1 text-sm text-green-700">
                  <li>• OurFamilyWizard - comprehensive platform</li>
                  <li>• Talking Parents - secure messaging</li>
                  <li>• Cozi - shared calendar and lists</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-800 mb-2">Support resources</h4> {/* updated to sentence case */}
                <ul className="space-y-1 text-sm text-green-700">
                  <li>• Children in Between classes</li>
                  <li>• DivorceCare for Kids programs</li>
                  <li>• Family counseling services</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Journal Tab */}
      {activeTab === 'journal' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-neutral-800">Your private journal</h2> {/* updated to sentence case */}
            <button
              onClick={addJournalEntry}
              className="flex items-center gap-2 px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
            >
              <Plus size={20} />
              New entry {/* updated to sentence case */}
            </button>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Shield className="text-amber-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">Privacy notice</h3> {/* updated to sentence case */}
                <p className="text-amber-800 text-sm">
                  Your journal entries are stored locally in your browser only. They never leave your device 
                  and are completely private to you.
                </p>
              </div>
            </div>
          </div>

          {journalEntries.length === 0 ? (
            <div className="text-center py-12 bg-neutral-50 rounded-xl">
              <BookOpen className="mx-auto text-neutral-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-neutral-600 mb-2">Start your journal</h3> {/* updated to sentence case */}
              <p className="text-neutral-500">Reflect on your journey and track your emotional progress</p>
            </div>
          ) : (
            <div className="space-y-6">
              {journalEntries.map(entry => (
                <div key={entry.id} className="bg-white border border-neutral-200 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-neutral-600">{new Date(entry.date).toLocaleDateString()}</div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(mood => (
                          <button
                            key={mood}
                            onClick={() => updateJournalEntry(entry.id, { mood: mood as any })}
                            className={`w-6 h-6 rounded-full ${
                              mood <= entry.mood ? 'bg-yellow-400' : 'bg-neutral-200'
                            }`}
                          >
                            😊
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteJournalEntry(entry.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-neutral-800 mb-2">Prompt</h4>
                      <p className="text-neutral-600 italic">{entry.prompt}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-neutral-800 mb-2">Your reflection</h4> {/* updated to sentence case */}
                      <textarea
                        value={entry.response}
                        onChange={(e) => updateJournalEntry(entry.id, { response: e.target.value })}
                        className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                        rows={4}
                        placeholder="Write your thoughts here..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Crisis Intervention Resources */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-red-900 mb-4 flex items-center gap-2">
          <Shield className="text-red-700" size={24} />
          Crisis Intervention Resources
        </h3>
        <p className="text-red-800 mb-4">
          Immediate help for mental health emergencies and dangerous situations
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 border border-red-200">
            <h4 className="font-medium text-red-900 mb-3">🚨 Emergency Contacts</h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-red-100 rounded">
                <p className="font-bold text-red-800">Emergency: 911</p>
                <p className="text-red-700">For immediate danger or medical emergencies</p>
              </div>
              <div className="p-3 bg-blue-100 rounded">
                <p className="font-bold text-blue-800">National Suicide Prevention Lifeline</p>
                <p className="text-blue-700">988 - 24/7 Crisis Support</p>
              </div>
              <div className="p-3 bg-purple-100 rounded">
                <p className="font-bold text-purple-800">Crisis Text Line</p>
                <p className="text-purple-700">Text HOME to 741741</p>
              </div>
              <div className="p-3 bg-green-100 rounded">
                <p className="font-bold text-green-800">Ohio Domestic Violence Hotline</p>
                <p className="text-green-700">1-800-934-9840</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-red-200">
            <h4 className="font-medium text-red-900 mb-3">⚠️ Warning Signs</h4>
            <p className="text-sm text-red-700 mb-3">Seek immediate help if experiencing:</p>
            <ul className="space-y-1 text-sm text-red-700">
              <li>• Thoughts of self-harm or suicide</li>
              <li>• Substance abuse escalation</li>
              <li>• Domestic violence or threats</li>
              <li>• Complete inability to function</li>
              <li>• Severe depression lasting weeks</li>
              <li>• Panic attacks interfering with daily life</li>
            </ul>
            <div className="mt-3 p-2 bg-red-100 rounded">
              <p className="text-xs font-medium text-red-800">
                Don't wait - early intervention prevents escalation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Guided Meditation & Breathing Exercises */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <Brain className="text-blue-700" size={24} />
          Guided Meditation & Breathing Exercises
        </h3>
        <p className="text-blue-800 mb-4">
          Evidence-based relaxation techniques for stress management and emotional regulation
        </p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-3">🫁 4-7-8 Breathing</h4>
            <p className="text-sm text-blue-700 mb-3">For immediate anxiety relief</p>
            <ol className="text-xs text-blue-600 space-y-1 mb-3">
              <li>1. Exhale completely</li>
              <li>2. Inhale through nose for 4 counts</li>
              <li>3. Hold breath for 7 counts</li>
              <li>4. Exhale through mouth for 8 counts</li>
              <li>5. Repeat 3-4 times</li>
            </ol>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm">
              Start 5-Minute Session
            </button>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-3">🧘 Body Scan Meditation</h4>
            <p className="text-sm text-blue-700 mb-3">For tension release and grounding</p>
            <ul className="text-xs text-blue-600 space-y-1 mb-3">
              <li>• Progressive muscle relaxation</li>
              <li>• Mental stress mapping</li>
              <li>• Physical awareness building</li>
              <li>• 10-20 minute sessions</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm">
              Start Body Scan
            </button>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-3">💭 Loving-Kindness Meditation</h4>
            <p className="text-sm text-blue-700 mb-3">For processing anger and resentment</p>
            <ul className="text-xs text-blue-600 space-y-1 mb-3">
              <li>• Self-compassion building</li>
              <li>• Forgiveness preparation</li>
              <li>• Emotional healing</li>
              <li>• 15-25 minute sessions</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm">
              Start Meditation
            </button>
          </div>
        </div>
        
        <div className="mt-4 bg-white rounded-lg p-4 border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">📱 Recommended Apps</h4>
          <div className="grid md:grid-cols-4 gap-3 text-sm">
            <div className="text-center">
              <p className="font-medium text-blue-800">Headspace</p>
              <p className="text-xs text-blue-600">Beginner-friendly</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-blue-800">Calm</p>
              <p className="text-xs text-blue-600">Sleep & anxiety</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-blue-800">Insight Timer</p>
              <p className="text-xs text-blue-600">Free content</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-blue-800">Ten Percent Happier</p>
              <p className="text-xs text-blue-600">Skeptic-friendly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grief Stage Assessment */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Heart className="text-gray-700" size={24} />
          Grief Stage Assessment
        </h3>
        <p className="text-gray-800 mb-4">
          Understand where you are in the divorce grief process and get targeted support
        </p>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border">
            <h4 className="font-medium text-gray-900 mb-3">Current Emotional State Assessment</h4>
            <p className="text-sm text-gray-700 mb-3">Which statement best describes your current experience?</p>
            <div className="space-y-2">
              {[
                {
                  stage: 'denial',
                  text: 'This feels surreal - I keep thinking things will go back to normal',
                  color: 'bg-red-100 border-red-200'
                },
                {
                  stage: 'anger',
                  text: 'I feel intense anger, resentment, or desire for revenge',
                  color: 'bg-orange-100 border-orange-200'
                },
                {
                  stage: 'bargaining',
                  text: 'I find myself trying to negotiate or make deals to save the marriage',
                  color: 'bg-yellow-100 border-yellow-200'
                },
                {
                  stage: 'depression',
                  text: 'I feel deeply sad, hopeless, or overwhelmed most days',
                  color: 'bg-blue-100 border-blue-200'
                },
                {
                  stage: 'acceptance',
                  text: 'I am beginning to accept the reality and look toward the future',
                  color: 'bg-green-100 border-green-200'
                }
              ].map((option, index) => (
                <label key={index} className={`flex items-center p-3 rounded border cursor-pointer hover:shadow-sm ${option.color}`}>
                  <input type="radio" name="grief-stage" className="mr-3" />
                  <span className="text-sm">{option.text}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border">
            <h4 className="font-medium text-gray-900 mb-3">Targeted Resources by Stage</h4>
            <div className="grid md:grid-cols-5 gap-3 text-xs">
              <div className="p-2 bg-red-50 rounded">
                <p className="font-medium text-red-800">Denial</p>
                <p className="text-red-600">Reality acceptance exercises, legal education</p>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <p className="font-medium text-orange-800">Anger</p>
                <p className="text-orange-600">Anger management, physical exercise, therapy</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded">
                <p className="font-medium text-yellow-800">Bargaining</p>
                <p className="text-yellow-600">Counseling, boundaries, realistic planning</p>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <p className="font-medium text-blue-800">Depression</p>
                <p className="text-blue-600">Professional therapy, medical evaluation, support groups</p>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <p className="font-medium text-green-800">Acceptance</p>
                <p className="text-green-600">Future planning, new goals, relationship building</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Resources Tab */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-800">Professional resources & support</h2>
            <p className="text-neutral-600 max-w-3xl mx-auto">
              Connect with qualified professionals and support services to help navigate the emotional challenges of divorce.
            </p>
          </div>

          {/* Crisis Resources */}
          <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
              <Shield className="text-red-600" size={20} />
              Crisis support
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {professionalResources.filter(r => r.type === 'crisis').map((resource, index) => (
                <div key={index} className="bg-white border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">{resource.title}</h4>
                  <p className="text-red-700 text-sm mb-3">{resource.description}</p>
                  {resource.phone && (
                    <p className="text-red-800 font-medium mb-2">Call: {resource.phone}</p>
                  )}
                  <a 
                    href={resource.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 font-medium text-sm"
                  >
                    <ExternalLink size={16} />
                    Access resource
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Therapy Resources */}
          <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
              <Users className="text-blue-600" size={20} />
              Professional therapy
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {professionalResources.filter(r => r.type === 'therapy').map((resource, index) => (
                <div key={index} className="bg-white border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">{resource.title}</h4>
                  <p className="text-blue-700 text-sm mb-3">{resource.description}</p>
                  <a 
                    href={resource.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    <ExternalLink size={16} />
                    Find therapists
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Support Groups */}
          <div className="bg-green-50 border-l-4 border-green-400 rounded-r-xl p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
              <Heart className="text-green-600" size={20} />
              Support groups & programs
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {professionalResources.filter(r => r.type === 'support').map((resource, index) => (
                <div key={index} className="bg-white border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">{resource.title}</h4>
                  <p className="text-green-700 text-sm mb-3">{resource.description}</p>
                  <a 
                    href={resource.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 font-medium text-sm"
                  >
                    <ExternalLink size={16} />
                    Find support
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Notice */}
          <div className="text-center p-6 bg-neutral-50 rounded-xl border border-neutral-200">
            <p className="text-neutral-700 leading-relaxed">
              <strong>Professional guidance:</strong> These resources provide professional support during difficult transitions. 
              Don't hesitate to reach out – seeking help is a sign of strength, not weakness.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionalToolkit;
