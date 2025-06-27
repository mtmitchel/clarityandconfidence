import React, { useState } from 'react';
import {
  Home,
  Target,
  CheckSquare,
  Scale,
  FileText,
  Clock,
  Calculator,
  PieChart,
  Receipt,
  Users,
  MessageSquare,
  Calendar,
  Heart,
  BookOpen,
  MapPin,
  Shield,
  Briefcase,
  FileSignature,
  Library,
  Landmark,
  PiggyBank,
  Columns,
  Lightbulb,
  Baby,
  HeartHandshake,
  Compass,
} from 'lucide-react';

interface SidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  {
    id: 'find-direction',
    label: 'Get Started',
    icon: Compass,
    children: [
      { id: 'welcome', label: 'Start here', icon: Home },
      { id: 'initial-assessment', label: 'Take assessment', icon: CheckSquare },
      { id: 'ohio-resource-map', label: 'Find local help', icon: MapPin },
    ],
  },
  
  {
    id: 'legal-guidance',
    label: 'Make Legal Decisions',
    icon: Scale,
    children: [
      { id: 'legal-decision-guide', label: 'Choose your path', icon: Lightbulb },
      { id: 'legal-paths', label: 'Compare options', icon: Scale },
      { id: 'resources', label: 'Browse resource library', icon: BookOpen },
      { id: 'legal-fee-estimator', label: 'Estimate costs', icon: Receipt },
    ],
  },
  
  {
    id: 'financial-planning',
    label: 'Plan Your Finances',
    icon: Calculator,
    children: [
      { id: 'understanding-money', label: 'Review finances', icon: PieChart },
      { id: 'child-support-calculator', label: 'Calculate child support', icon: Calculator },
      { id: 'spousal-support-calculator', label: 'Calculate spousal support', icon: Calculator },
      { id: 'asset-division-tool', label: 'Divide assets', icon: PieChart },
      { id: 'settlement-comparison', label: 'Compare settlements', icon: Columns },
      { id: 'post-divorce-budget', label: 'Plan new budget', icon: PiggyBank },
    ],
  },

  {
    id: 'track-progress',
    label: 'Stay Organized',
    icon: Target,
    children: [
      { id: 'dashboard', label: 'View progress', icon: Target },
      { id: 'enhanced-timeline', label: 'Track milestones', icon: Clock },
      { id: 'document-checklist', label: 'Gather documents', icon: FileText },
      { id: 'deadline-calculator', label: 'Track deadlines', icon: Calendar },
      { id: 'communication-log', label: 'Log communications', icon: MessageSquare },
      { id: 'expense-tracker', label: 'Track expenses', icon: Receipt },
      { id: 'life-after-divorce', label: 'Plan your future', icon: Target },
    ],
  },

  {
    id: 'family-relationships',
    label: 'Manage Family Matters',
    icon: Users,
    children: [
      { id: 'children-custody', label: 'Plan parenting time', icon: Baby },
      { id: 'co-parenting-calendar', label: 'Coordinate schedules', icon: Calendar },
      { id: 'communication-templates', label: 'Draft messages', icon: MessageSquare },
    ],
  },

  {
    id: 'emotional-support',
    label: 'Find Support',
    icon: Heart,
    children: [
      { id: 'emotional-toolkit', label: 'Get emotional support', icon: HeartHandshake },
    ],
  },

  {
    id: 'learning-resources',
    label: 'Learn More',
    icon: Library,
    children: [
      { id: 'resources', label: 'Browse resource library', icon: BookOpen },
      { id: 'citations', label: 'View references', icon: Shield },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ currentSection, onSectionChange }) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(['find-direction']) // Only expand "Get Started" by default
  );

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const renderNavItem = (item: any) => {
    const Icon = item.icon;
    const isActive = currentSection === item.id;
    const isExpanded = expandedGroups.has(item.id);
    
    if (item.children) {
      return (
        <li key={item.id}>
          <button
            onClick={() => toggleGroup(item.id)}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
          >
            <div className="flex items-center gap-3">
              <Icon size={20} className="text-neutral-500" />
              <span className="font-medium">{item.label}</span>
            </div>
            <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
              ▶
            </span>
          </button>
          {isExpanded && (
            <ul className="ml-4 mt-2 space-y-1">
              {item.children.map((child: any) => {
                const ChildIcon = child.icon;
                const isChildActive = currentSection === child.id;
                return (
                  <li key={child.id}>
                    <button
                      onClick={() => onSectionChange(child.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-all duration-200 ${
                        isChildActive 
                          ? 'bg-sage-100 border border-sage-200 text-sage-900 shadow-sm' 
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800'
                      }`}
                    >
                      <ChildIcon 
                        size={18} 
                        className={isChildActive ? 'text-sage-600' : 'text-neutral-400'} 
                      />
                      <span className="text-sm font-medium">{child.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      );
    } else {
      return (
        <li key={item.id}>
          <button
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
              isActive 
                ? 'bg-sage-100 border border-sage-200 text-sage-900 shadow-sm' 
                : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
            }`}
          >
            <Icon 
              size={20} 
              className={isActive ? 'text-sage-600' : 'text-neutral-500'} 
            />
            <span className="font-medium">{item.label}</span>
          </button>
        </li>
      );
    }
  };

  return (
    <aside className="w-80 bg-white border-r border-neutral-200 h-full flex flex-col shadow-sm">
      <div className="p-6 border-b border-neutral-200 bg-gradient-to-r from-sage-25 to-neutral-25">
        <h1 className="text-xl font-semibold text-sage-900 leading-tight">
          Clarity and confidence
        </h1>
        <p className="text-sm text-sage-700 mt-2 leading-relaxed">
          Ohio divorce resource hub
        </p>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {navigationItems.map(renderNavItem)}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200 bg-neutral-50">
        <p className="text-xs text-neutral-600 leading-relaxed">
          This tool provides educational information only and does not constitute legal advice.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
