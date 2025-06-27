import React, { useState, useEffect } from 'react';
import { Calendar, Plus, CheckCircle2, Clock, AlertTriangle, Trash2, Edit3 } from 'lucide-react';
import { 
  saveTimelineItems, 
  loadTimelineItems, 
  clearStorageSection,
  STORAGE_KEYS,
  TimelineItem 
} from '../../lib/storage';

const Timeline: React.FC = () => {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: 'personal' as TimelineItem['category'],
    priority: 'medium' as TimelineItem['priority'],
  });

  // Default timeline items for first-time users
  const defaultTimelineItems: Omit<TimelineItem, 'id' | 'createdAt'>[] = [
    {
      title: 'Initial consultation with attorney',
      description: 'Schedule and attend first meeting to understand your legal options',
      category: 'legal',
      priority: 'high',
      completed: false,
    },
    {
      title: 'Gather financial documents',
      description: 'Collect bank statements, tax returns, investment accounts, debt information',
      category: 'financial',
      priority: 'high',
      completed: false,
    },
    {
      title: 'Complete asset and debt inventory',
      description: 'Use the financial section to list all assets and debts',
      category: 'financial',
      priority: 'medium',
      completed: false,
    },
    {
      title: 'Consider counseling or therapy',
      description: 'Individual or family counseling to help process emotions and decisions',
      category: 'personal',
      priority: 'medium',
      completed: false,
    },
    {
      title: 'Research childcare and custody options',
      description: 'If applicable, explore parenting plans and custody arrangements',
      category: 'children',
      priority: 'high',
      completed: false,
    },
    {
      title: 'Open separate bank account',
      description: 'Establish financial independence with your own checking account',
      category: 'financial',
      priority: 'medium',
      completed: false,
    },
    {
      title: 'Update important documents',
      description: 'Review beneficiaries, emergency contacts, and legal documents',
      category: 'legal',
      priority: 'low',
      completed: false,
    },
  ];

  useEffect(() => {
    const savedItems = loadTimelineItems();
    if (savedItems.length === 0) {
      // Initialize with default items
      const initialItems: TimelineItem[] = defaultTimelineItems.map((item, index) => ({
        id: `default-${index}`,
        ...item,
        createdAt: new Date().toISOString(),
      }));
      setTimelineItems(initialItems);
      saveTimelineItems(initialItems);
    } else {
      setTimelineItems(savedItems);
    }
  }, []);

  const addTimelineItem = () => {
    if (newItem.title.trim()) {
      const item: TimelineItem = {
        id: Date.now().toString(),
        title: newItem.title,
        description: newItem.description,
        dueDate: newItem.dueDate || undefined,
        category: newItem.category,
        priority: newItem.priority,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      
      const updatedItems = [...timelineItems, item];
      setTimelineItems(updatedItems);
      saveTimelineItems(updatedItems);
      
      setNewItem({
        title: '',
        description: '',
        dueDate: '',
        category: 'personal',
        priority: 'medium',
      });
      setShowAddForm(false);
    }
  };

  const toggleItemCompletion = (id: string) => {
    const updatedItems = timelineItems.map(item =>
      item.id === id 
        ? { 
            ...item, 
            completed: !item.completed,
            completedAt: !item.completed ? new Date().toISOString() : undefined
          } 
        : item
    );
    setTimelineItems(updatedItems);
    saveTimelineItems(updatedItems);
  };

  const removeTimelineItem = (id: string) => {
    const updatedItems = timelineItems.filter(item => item.id !== id);
    setTimelineItems(updatedItems);
    saveTimelineItems(updatedItems);
  };

  const clearSection = () => {
    if (showClearConfirm) {
      clearStorageSection(STORAGE_KEYS.TIMELINE_DATA);
      const initialItems: TimelineItem[] = defaultTimelineItems.map((item, index) => ({
        id: `default-${index}`,
        ...item,
        createdAt: new Date().toISOString(),
      }));
      setTimelineItems(initialItems);
      saveTimelineItems(initialItems);
      setShowClearConfirm(false);
    } else {
      setShowClearConfirm(true);
    }
  };

  const getCategoryColor = (category: TimelineItem['category']) => {
    switch (category) {
      case 'legal': return 'bg-blue-100 text-blue-800';
      case 'financial': return 'bg-green-100 text-green-800';
      case 'children': return 'bg-purple-100 text-purple-800';
      case 'personal': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: TimelineItem['priority']) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="text-red-500" size={16} />;
      case 'medium': return <Clock className="text-yellow-500" size={16} />;
      case 'low': return <Clock className="text-green-500" size={16} />;
    }
  };

  const isOverdue = (item: TimelineItem) => {
    if (!item.dueDate || item.completed) return false;
    return new Date(item.dueDate) < new Date();
  };

  const isUpcoming = (item: TimelineItem) => {
    if (!item.dueDate || item.completed) return false;
    const dueDate = new Date(item.dueDate);
    const now = new Date();
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  // Sort items: incomplete first, then by priority, then by due date
  const sortedItems = [...timelineItems].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;
    
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  const stats = {
    total: timelineItems.length,
    completed: timelineItems.filter(item => item.completed).length,
    overdue: timelineItems.filter(isOverdue).length,
    upcoming: timelineItems.filter(isUpcoming).length,
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Calendar className="text-calm-600" size={32} />
          <h1 className="text-3xl font-semibold text-calm-800">Timeline & Planning</h1>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          Organize your tasks, track deadlines, and plan your path forward with personalized milestones.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold text-slate-700">{stats.total}</div>
          <div className="text-sm text-slate-600">Total Tasks</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold text-green-700">{stats.completed}</div>
          <div className="text-sm text-green-600">Completed</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold text-red-700">{stats.overdue}</div>
          <div className="text-sm text-red-600">Overdue</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold text-blue-700">{stats.upcoming}</div>
          <div className="text-sm text-blue-600">This Week</div>
        </div>
      </div>

      {/* Add New Item Form */}
      {showAddForm && (
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="font-medium text-slate-800 mb-4">Add New Task</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input
                type="text"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-calm-500"
                placeholder="Enter task title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-calm-500"
                rows={3}
                placeholder="Enter task description"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={newItem.dueDate}
                  onChange={(e) => setNewItem({ ...newItem, dueDate: e.target.value })}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-calm-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value as TimelineItem['category'] })}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-calm-500"
                >
                  <option value="personal">Personal</option>
                  <option value="legal">Legal</option>
                  <option value="financial">Financial</option>
                  <option value="children">Children</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                <select
                  value={newItem.priority}
                  onChange={(e) => setNewItem({ ...newItem, priority: e.target.value as TimelineItem['priority'] })}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-calm-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={addTimelineItem}
                className="px-4 py-2 bg-calm-500 text-white rounded-lg hover:bg-calm-600"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-calm-500 text-white rounded-lg hover:bg-calm-600"
        >
          <Plus size={16} />
          Add Task
        </button>
        <button
          onClick={clearSection}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            showClearConfirm 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'border border-red-300 text-red-700 hover:bg-red-50'
          }`}
        >
          <Trash2 size={16} />
          {showClearConfirm ? 'Confirm Reset' : 'Reset Timeline'}
        </button>
      </div>

      {/* Timeline Items */}
      <div className="space-y-4">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            className={`border rounded-lg p-6 transition-all ${
              item.completed 
                ? 'bg-gray-50 border-gray-200' 
                : isOverdue(item)
                ? 'bg-red-50 border-red-200'
                : isUpcoming(item)
                ? 'bg-blue-50 border-blue-200'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() => toggleItemCompletion(item.id)}
                className={`mt-1 flex-shrink-0 w-6 h-6 border-2 rounded-full flex items-center justify-center transition-colors ${
                  item.completed 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : 'border-slate-300 hover:border-calm-500'
                }`}
              >
                {item.completed && <CheckCircle2 size={16} />}
              </button>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className={`font-medium ${item.completed ? 'text-gray-600 line-through' : 'text-slate-800'}`}>
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {getPriorityIcon(item.priority)}
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <button
                      onClick={() => removeTimelineItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                
                {item.description && (
                  <p className={`text-sm ${item.completed ? 'text-gray-500' : 'text-slate-600'}`}>
                    {item.description}
                  </p>
                )}
                
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  {item.dueDate && (
                    <span className={
                      isOverdue(item) ? 'text-red-600 font-medium' :
                      isUpcoming(item) ? 'text-blue-600 font-medium' :
                      'text-slate-500'
                    }>
                      Due: {new Date(item.dueDate).toLocaleDateString()}
                    </span>
                  )}
                  {item.completedAt && (
                    <span className="text-green-600">
                      Completed: {new Date(item.completedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {sortedItems.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <Calendar size={48} className="mx-auto mb-4 text-slate-300" />
            <p>No tasks yet. Add your first task to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
