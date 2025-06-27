import React from 'react';
import { 
  Home, 
  Heart, 
  DollarSign, 
  Scale, 
  Baby, 
  Users, 
  BookOpen, 
  Shield,
  BarChart3,
  Calendar
} from 'lucide-react';

interface SidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: 'welcome', label: 'Welcome', icon: Home },
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'checking-in', label: 'Checking in', icon: Heart },
  { id: 'understanding-money', label: 'Understanding your money', icon: DollarSign },
  { id: 'legal-paths', label: 'Exploring legal paths', icon: Scale },
  { id: 'children', label: 'Focusing on the children', icon: Baby },
  { id: 'timeline', label: 'Timeline & Planning', icon: Calendar },
  { id: 'local-support', label: 'Finding local support', icon: Users },
  { id: 'resources', label: 'Helpful resources', icon: BookOpen },
  { id: 'resilience', label: 'Building resilience', icon: Shield },
];

const Sidebar: React.FC<SidebarProps> = ({ currentSection, onSectionChange }) => {
  return (
    <aside className="w-80 bg-calm-50 border-r border-calm-200 h-full flex flex-col">
      <div className="p-6 border-b border-calm-200">
        <h1 className="text-xl font-semibold text-calm-800 leading-tight">
          Your Clarity & Confidence Guide
        </h1>
        <p className="text-sm text-calm-600 mt-2">
          Personal resources for your journey forward
        </p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200
                    ${isActive 
                      ? 'bg-calm-100 text-calm-800 border-l-4 border-calm-600' 
                      : 'text-calm-700 hover:bg-calm-75 hover:text-calm-800'
                    }
                  `}
                >
                  <Icon size={20} className={isActive ? 'text-calm-600' : 'text-calm-500'} />
                  <span className="text-sm font-medium leading-tight">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-calm-200">
        <div className="bg-sage-50 border border-sage-200 rounded-lg p-4">
          <p className="text-xs text-sage-700 leading-relaxed">
            <strong>Privacy Notice:</strong> All information you enter stays on your device only. 
            Nothing is shared or stored on external servers.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
