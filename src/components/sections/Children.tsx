import React, { useState, useEffect } from 'react';
import { Baby, Check, Trash2, MessageCircle } from 'lucide-react';
import { 
  saveParentingChecklist, 
  loadParentingChecklist, 
  clearStorageSection,
  STORAGE_KEYS,
  ParentingChecklistItem 
} from '../../lib/storage';

const Children: React.FC = () => {
  const [checklistItems, setChecklistItems] = useState<ParentingChecklistItem[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [expandedNotes, setExpandedNotes] = useState<string | null>(null);

  // Default checklist items organized by category
  const defaultChecklist: Omit<ParentingChecklistItem, 'id' | 'completed' | 'notes'>[] = [
    // Decision-Making Authority
    { category: 'Decision-Making Authority', item: 'Educational decisions and school choice' },
    { category: 'Decision-Making Authority', item: 'Medical and healthcare decisions' },
    { category: 'Decision-Making Authority', item: 'Religious upbringing and activities' },
    { category: 'Decision-Making Authority', item: 'Extracurricular activities and sports' },
    { category: 'Decision-Making Authority', item: 'Mental health and counseling' },
    { category: 'Decision-Making Authority', item: 'Travel and passport decisions' },

    // Parenting Schedule
    { category: 'Parenting Schedule', item: 'Regular weekly schedule' },
    { category: 'Parenting Schedule', item: 'Holiday and vacation schedule' },
    { category: 'Parenting Schedule', item: 'Summer break arrangements' },
    { category: 'Parenting Schedule', item: 'School breaks and teacher workdays' },
    { category: 'Parenting Schedule', item: 'Birthday and special occasion arrangements' },
    { category: 'Parenting Schedule', item: 'Transportation arrangements' },
    { category: 'Parenting Schedule', item: 'Makeup time for missed visits' },

    // Communication
    { category: 'Communication', item: 'How parents will communicate with each other' },
    { category: 'Communication', item: 'How children will contact the other parent' },
    { category: 'Communication', item: 'Sharing important information about children' },
    { category: 'Communication', item: 'Attending school events and activities' },
    { category: 'Communication', item: 'Emergency communication procedures' },

    // Daily Care and Rules
    { category: 'Daily Care and Rules', item: 'Bedtimes and daily routines' },
    { category: 'Daily Care and Rules', item: 'Discipline and house rules' },
    { category: 'Daily Care and Rules', item: 'Screen time and technology use' },
    { category: 'Daily Care and Rules', item: 'Homework and study expectations' },
    { category: 'Daily Care and Rules', item: 'Chores and responsibilities' },

    // Special Considerations
    { category: 'Special Considerations', item: 'Introduction of new romantic partners' },
    { category: 'Special Considerations', item: 'Childcare and babysitting arrangements' },
    { category: 'Special Considerations', item: 'Moving or relocation procedures' },
    { category: 'Special Considerations', item: 'Handling disagreements or disputes' },
    { category: 'Special Considerations', item: 'Review and modification process' },
  ];

  // Load saved data or initialize with default checklist
  useEffect(() => {
    const savedItems = loadParentingChecklist();
    if (savedItems.length === 0) {
      // Initialize with default checklist
      const initialItems: ParentingChecklistItem[] = defaultChecklist.map((item, index) => ({
        id: `default-${index}`,
        ...item,
        completed: false,
        notes: '',
      }));
      setChecklistItems(initialItems);
      saveParentingChecklist(initialItems);
    } else {
      setChecklistItems(savedItems);
    }
  }, []);

  const toggleItemCompletion = (id: string) => {
    const updatedItems = checklistItems.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setChecklistItems(updatedItems);
    saveParentingChecklist(updatedItems);
  };

  const updateItemNotes = (id: string, notes: string) => {
    const updatedItems = checklistItems.map(item =>
      item.id === id ? { ...item, notes } : item
    );
    setChecklistItems(updatedItems);
    saveParentingChecklist(updatedItems);
  };

  const clearSection = () => {
    if (showClearConfirm) {
      clearStorageSection(STORAGE_KEYS.PARENTING_CHECKLIST);
      // Reset to default checklist
      const initialItems: ParentingChecklistItem[] = defaultChecklist.map((item, index) => ({
        id: `default-${index}`,
        ...item,
        completed: false,
        notes: '',
      }));
      setChecklistItems(initialItems);
      saveParentingChecklist(initialItems);
      setShowClearConfirm(false);
      setExpandedNotes(null);
    } else {
      setShowClearConfirm(true);
    }
  };

  // Group items by category
  const groupedItems = checklistItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ParentingChecklistItem[]>);

  const getCompletionStats = () => {
    const completed = checklistItems.filter(item => item.completed).length;
    const total = checklistItems.length;
    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  const stats = getCompletionStats();

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Baby className="text-sage-600" size={32} />
          <h1 className="text-3xl font-semibold text-sage-800">Focusing on the children</h1>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          When parents separate, thoughtful planning helps children feel secure and loved. 
          This checklist covers important topics to discuss and decide together, 
          always keeping your children's best interests at heart.
        </p>
      </div>

      {/* Progress Summary */}
      <div className="bg-sage-50 border border-sage-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium text-sage-800">Co-parenting planning progress</h2>
          <div className="text-sage-600">
            <span className="text-2xl font-semibold">{stats.completed}</span>
            <span className="text-lg">/{stats.total}</span>
          </div>
        </div>
        <div className="w-full bg-sage-200 rounded-full h-3 mb-2">
          <div 
            className="bg-sage-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${stats.percentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-sage-700">
          {stats.percentage}% complete - You're making great progress thinking through these important decisions.
        </p>
      </div>

      {/* Gentle Guidance */}
      <div className="bg-calm-50 border border-calm-200 rounded-lg p-6">
        <h3 className="font-medium text-calm-800 mb-3">Remember as you work through this</h3>
        <div className="space-y-2 text-sm text-calm-700">
          <p>• <strong>Children's needs come first:</strong> Focus on what will help your children feel secure and loved.</p>
          <p>• <strong>Flexibility is important:</strong> As children grow, arrangements may need to change.</p>
          <p>• <strong>Quality over quantity:</strong> Meaningful time together matters more than hours on a schedule.</p>
          <p>• <strong>Consistency helps:</strong> Children thrive with predictable routines and clear expectations.</p>
          <p>• <strong>Communication matters:</strong> How you talk to and about each other affects your children.</p>
        </div>
      </div>

      {/* Checklist by Category */}
      <div className="space-y-8">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="space-y-4">
            <h2 className="text-xl font-medium text-slate-800 border-b border-slate-200 pb-2">
              {category}
            </h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleItemCompletion(item.id)}
                      className={`
                        mt-1 p-1 rounded border-2 transition-colors duration-200
                        ${item.completed 
                          ? 'bg-sage-500 border-sage-500 text-white' 
                          : 'border-slate-300 hover:border-sage-400'
                        }
                      `}
                    >
                      {item.completed && <Check size={14} />}
                    </button>
                    
                    <div className="flex-1">
                      <h3 className={`
                        font-medium transition-colors duration-200
                        ${item.completed 
                          ? 'text-sage-700 line-through' 
                          : 'text-slate-800'
                        }
                      `}>
                        {item.item}
                      </h3>
                      
                      {/* Notes Section */}
                      <div className="mt-2">
                        <button
                          onClick={() => setExpandedNotes(
                            expandedNotes === item.id ? null : item.id
                          )}
                          className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-800"
                        >
                          <MessageCircle size={14} />
                          {item.notes ? 'Edit notes' : 'Add notes'}
                        </button>
                        
                        {expandedNotes === item.id && (
                          <div className="mt-2">
                            <textarea
                              value={item.notes || ''}
                              onChange={(e) => updateItemNotes(item.id, e.target.value)}
                              placeholder="Add your thoughts, agreements, or questions about this topic..."
                              className="w-full p-3 border border-slate-300 rounded text-sm resize-vertical min-h-[80px] focus:ring-2 focus:ring-sage-500"
                            />
                          </div>
                        )}
                        
                        {item.notes && expandedNotes !== item.id && (
                          <div className="mt-1 p-2 bg-slate-50 border border-slate-200 rounded text-sm text-slate-700">
                            {item.notes.length > 100 
                              ? `${item.notes.substring(0, 100)}...` 
                              : item.notes
                            }
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Supporting Resources */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h3 className="font-medium text-slate-800 mb-3">Additional support for co-parenting</h3>
        <div className="space-y-2 text-sm text-slate-700">
          <p>• <strong>Parenting classes:</strong> Many courts offer or require co-parenting education programs.</p>
          <p>• <strong>Family counseling:</strong> A therapist can help you and your children navigate this transition.</p>
          <p>• <strong>Mediation:</strong> Professional mediators can help you work through disagreements.</p>
          <p>• <strong>Legal guidance:</strong> An attorney can ensure your parenting plan meets Ohio legal requirements.</p>
          <p>• <strong>Support groups:</strong> Connecting with other parents in similar situations can be helpful.</p>
        </div>
      </div>

      {/* Clear Section */}
      <div className="border-t border-slate-200 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-slate-800">Reset checklist</h3>
            <p className="text-sm text-slate-600">This will clear all your progress and notes, starting fresh with the full checklist.</p>
          </div>
          <button
            onClick={clearSection}
            className={`
              px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2
              ${showClearConfirm 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
              }
            `}
          >
            <Trash2 size={16} />
            {showClearConfirm ? 'Confirm: Reset checklist' : 'Reset checklist'}
          </button>
        </div>
        {showClearConfirm && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">
              Are you sure? This will clear all your progress and notes. 
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

export default Children;
