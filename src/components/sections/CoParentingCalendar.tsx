import React, { useState } from 'react';
import { Calendar, Clock, Users, Download, Settings, CheckCircle2 } from 'lucide-react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';

interface ScheduleTemplate {
  id: string;
  name: string;
  description: string;
  pattern: string;
  weekendPattern: string;
  holidayPreference: 'alternating' | 'split' | 'fixed';
  ohioCompliant: boolean;
}

interface Holiday {
  name: string;
  date: string;
  isOhioSpecific: boolean;
  assignedParent: 'parent1' | 'parent2' | 'split';
}

const CoParentingCalendar: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useLocalStorageState<string>('coparenting-template', '');
  const [customHolidays, setCustomHolidays] = useLocalStorageState<Holiday[]>('custom-holidays', []);
  const [activeTab, setActiveTab] = useState<'templates' | 'holidays' | 'calendar'>('templates');

  const scheduleTemplates: ScheduleTemplate[] = [
    {
      id: 'every-other-weekend',
      name: 'Every Other Weekend',
      description: 'Standard Ohio schedule: alternating weekends Friday evening to Sunday evening',
      pattern: 'Friday 6pm - Sunday 6pm (alternating weeks)',
      weekendPattern: 'Every other weekend + one weeknight',
      holidayPreference: 'alternating',
      ohioCompliant: true
    },
    {
      id: 'week-on-week-off',
      name: 'Week On, Week Off',
      description: 'Equal parenting time with weekly exchanges',
      pattern: 'Sunday 6pm - Sunday 6pm (alternating weeks)',
      weekendPattern: 'Included in weekly schedule',
      holidayPreference: 'alternating',
      ohioCompliant: true
    },
    {
      id: '2-2-3',
      name: '2-2-3 Schedule',
      description: 'Popular for young children: 2 days, 2 days, 3 days rotation',
      pattern: 'Mon-Tue (Parent A), Wed-Thu (Parent B), Fri-Sun alternating',
      weekendPattern: 'Alternating long weekends',
      holidayPreference: 'split',
      ohioCompliant: true
    },
    {
      id: 'summer-variation',
      name: 'School Year + Extended Summer',
      description: 'Traditional school year schedule with extended summer parenting time',
      pattern: 'Every other weekend + extended summer blocks',
      weekendPattern: 'Standard during school year',
      holidayPreference: 'fixed',
      ohioCompliant: true
    }
  ];

  const ohioHolidays: Holiday[] = [
    { name: 'New Year\'s Day', date: '2025-01-01', isOhioSpecific: false, assignedParent: 'parent1' },
    { name: 'Martin Luther King Jr. Day', date: '2025-01-20', isOhioSpecific: false, assignedParent: 'parent2' },
    { name: 'Presidents\' Day', date: '2025-02-17', isOhioSpecific: false, assignedParent: 'parent1' },
    { name: 'Memorial Day', date: '2025-05-26', isOhioSpecific: false, assignedParent: 'parent2' },
    { name: 'Independence Day', date: '2025-07-04', isOhioSpecific: false, assignedParent: 'parent1' },
    { name: 'Labor Day', date: '2025-09-01', isOhioSpecific: false, assignedParent: 'parent2' },
    { name: 'Columbus Day', date: '2025-10-13', isOhioSpecific: true, assignedParent: 'parent1' },
    { name: 'Halloween', date: '2025-10-31', isOhioSpecific: false, assignedParent: 'split' },
    { name: 'Thanksgiving', date: '2025-11-27', isOhioSpecific: false, assignedParent: 'parent1' },
    { name: 'Christmas Eve', date: '2025-12-24', isOhioSpecific: false, assignedParent: 'parent2' },
    { name: 'Christmas Day', date: '2025-12-25', isOhioSpecific: false, assignedParent: 'parent1' },
    { name: 'New Year\'s Eve', date: '2025-12-31', isOhioSpecific: false, assignedParent: 'parent2' }
  ];

  const selectedTemplateData = scheduleTemplates.find(t => t.id === selectedTemplate);

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-light text-sage-900">Co-Parenting Calendar</h1>
        <p className="text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed">
          Ohio-specific parenting time templates and holiday schedules designed for successful co-parenting
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="bg-neutral-100 rounded-xl p-1 flex">
          {[
            { id: 'templates', label: 'Schedule Templates', icon: Calendar },
            { id: 'holidays', label: 'Ohio Holidays', icon: Clock },
            { id: 'calendar', label: 'Preview Calendar', icon: Users }
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

      {/* Schedule Templates */}
      {activeTab === 'templates' && (
        <div className="space-y-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">Ohio-Compliant Parenting Schedules</h2>
            <p className="text-blue-800 mb-6">
              Pre-designed schedules that meet Ohio's shared parenting guidelines and promote healthy co-parenting
            </p>

            <div className="grid gap-6">
              {scheduleTemplates.map(template => (
                <div 
                  key={template.id}
                  className={`bg-white rounded-lg border p-6 cursor-pointer transition-all hover:shadow-md ${
                    selectedTemplate === template.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-neutral-200'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-neutral-800">{template.name}</h3>
                        {template.ohioCompliant && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Ohio Compliant
                          </span>
                        )}
                      </div>
                      
                      <p className="text-neutral-700 mb-4">{template.description}</p>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-neutral-600">Pattern:</span>
                          <p className="text-neutral-700">{template.pattern}</p>
                        </div>
                        <div>
                          <span className="font-medium text-neutral-600">Weekends:</span>
                          <p className="text-neutral-700">{template.weekendPattern}</p>
                        </div>
                        <div>
                          <span className="font-medium text-neutral-600">Holidays:</span>
                          <p className="text-neutral-700 capitalize">{template.holidayPreference}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      {selectedTemplate === template.id ? (
                        <CheckCircle2 className="text-blue-600" size={24} />
                      ) : (
                        <div className="w-6 h-6 border-2 border-neutral-300 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedTemplateData && (
              <div className="mt-8 bg-white rounded-lg p-6 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-4">Selected Schedule Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">Typical Week Structure</h4>
                    <p className="text-sm text-blue-700 mb-4">{selectedTemplateData.pattern}</p>
                    
                    <h4 className="font-medium text-blue-800 mb-2">Ohio Considerations</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Complies with Ohio shared parenting standards</li>
                      <li>• Allows for meaningful relationships with both parents</li>
                      <li>• Considers school schedule and extracurricular activities</li>
                      <li>• Flexible for special circumstances</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">Communication Guidelines</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Exchange locations should be neutral and convenient</li>
                      <li>• Use OurFamilyWizard or similar for documentation</li>
                      <li>• Allow 48-hour notice for schedule changes</li>
                      <li>• Keep children's activities and friendships consistent</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ohio Holidays */}
      {activeTab === 'holidays' && (
        <div className="space-y-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-green-900 mb-6">Ohio Holiday Schedule Planner</h2>
            <p className="text-green-800 mb-6">
              Pre-populated with Ohio holidays and common arrangements for divorced parents
            </p>

            <div className="grid gap-6">
              {ohioHolidays.map((holiday, index) => (
                <div key={index} className="bg-white rounded-lg border border-green-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Calendar className="text-green-600" size={20} />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-green-900">{holiday.name}</h3>
                          {holiday.isOhioSpecific && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                              Ohio Specific
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-green-700">{holiday.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-800">Assigned to:</span>
                      <select 
                        className="px-3 py-1 border border-green-300 rounded text-sm"
                        defaultValue={holiday.assignedParent}
                      >
                        <option value="parent1">Parent 1</option>
                        <option value="parent2">Parent 2</option>
                        <option value="split">Split Day</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white rounded-lg p-6 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-4">Holiday Planning Tips</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-green-700">
                <div>
                  <h4 className="font-medium text-green-800 mb-2">Best Practices</h4>
                  <ul className="space-y-1">
                    <li>• Plan holidays at least 60 days in advance</li>
                    <li>• Consider alternating major holidays annually</li>
                    <li>• Allow flexibility for special family events</li>
                    <li>• Include extended family in planning when possible</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-green-800 mb-2">Ohio Considerations</h4>
                  <ul className="space-y-1">
                    <li>• School holidays follow local district calendars</li>
                    <li>• Consider Ohio State University game days for families</li>
                    <li>• Weather may affect travel plans - have backup options</li>
                    <li>• Document all holiday agreements in writing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Preview */}
      {activeTab === 'calendar' && (
        <div className="space-y-8">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-purple-900 mb-6">Calendar Preview & Export</h2>
            <p className="text-purple-800 mb-6">
              Visualize your parenting schedule and export to digital calendars
            </p>

            <div className="bg-white rounded-lg p-6 border border-purple-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-purple-900">June 2025 Preview</h3>
                <div className="flex gap-2">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-2">
                    <Download size={16} />
                    Export to Google Calendar
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
                    <Download size={16} />
                    Export to Outlook
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="font-medium text-purple-800 p-2 bg-purple-100 rounded">
                    {day}
                  </div>
                ))}
                
                {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                  <div key={day} className={`p-2 rounded text-sm ${
                    day % 2 === 0 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    <div className="font-medium">{day}</div>
                    <div className="text-xs">
                      {day % 2 === 0 ? 'Parent 1' : 'Parent 2'}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-100 rounded"></div>
                  <span className="text-neutral-700">Parent 1 Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 rounded"></div>
                  <span className="text-neutral-700">Parent 2 Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-100 rounded"></div>
                  <span className="text-neutral-700">Transition Day</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoParentingCalendar;
