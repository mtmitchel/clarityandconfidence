import React from 'react';
import { 
  Home, 
  DollarSign, 
  Scale, 
  Baby, 
  BookOpen, 
  Shield,
  Calendar
} from 'lucide-react';

interface SidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: 'welcome', label: 'Welcome', icon: Home },
  { id: 'understanding-money', label: 'Financial scenarios', icon: DollarSign },
  { id: 'legal-paths', label: 'Legal decision tools', icon: Scale },
  { id: 'children', label: 'Custody planning', icon: Baby },
  { id: 'timeline', label: 'Process timeline', icon: Calendar },
  { id: 'resources', label: 'Resources', icon: BookOpen },
  { id: 'resilience', label: 'Building resilience', icon: Shield },
];

const Sidebar: React.FC<SidebarProps> = ({ currentSection, onSectionChange }) => {
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
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group
                    ${isActive 
                      ? 'bg-sage-100 text-sage-900 border border-sage-200 shadow-sm' 
                      : 'text-neutral-700 hover:bg-sage-50 hover:text-sage-800 hover:shadow-sm'
                    }
                  `}
                >
                  <Icon size={20} className={`transition-colors ${isActive ? 'text-sage-600' : 'text-neutral-500 group-hover:text-sage-600'}`} />
                  <span className="text-sm font-medium leading-tight">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-neutral-200 bg-gradient-to-r from-sage-25 to-neutral-25">
        <div className="bg-sage-50 border border-sage-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-sage-800 leading-relaxed">
            <strong>Privacy notice:</strong> All information you enter stays on your device only. 
            Nothing is shared or stored on external servers.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
