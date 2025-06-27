import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, Download, Search, Filter, Calendar, Phone, Mail, MessageCircle, AlertTriangle, CheckCircle2, Scale, Sheet } from 'lucide-react';

interface CommunicationEntry {
  id: string;
  date: Date;
  type: 'phone' | 'email' | 'text' | 'in-person' | 'attorney' | 'court';
  participants: string[];
  subject: string;
  summary: string;
  outcome?: string;
  followUpNeeded?: boolean;
  followUpDate?: Date;
  tags: string[];
  attachments?: string[];
  urgent?: boolean;
}

const CommunicationLog: React.FC = () => {
  const [entries, setEntries] = useState<CommunicationEntry[]>([]);
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [newEntry, setNewEntry] = useState<Partial<CommunicationEntry>>({
    date: new Date(),
    type: 'email',
    participants: [''],
    subject: '',
    summary: '',
    outcome: '',
    followUpNeeded: false,
    tags: [],
    urgent: false
  });

  // Load entries from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('divorce-communication-log');
    if (saved) {
      const parsed = JSON.parse(saved);
      setEntries(parsed.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date),
        followUpDate: entry.followUpDate ? new Date(entry.followUpDate) : undefined
      })));
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('divorce-communication-log', JSON.stringify(entries));
  }, [entries]);

  const exportLog = () => {
    const headers = ['Date', 'Type', 'Participants', 'Subject', 'Summary', 'Outcome', 'Follow-up Needed', 'Tags', 'Urgent'];
    const rows = filteredEntries.map(entry => {
      const escapeCSV = (str: string | undefined) => {
        if (!str) return '';
        // Escape quotes and wrap in quotes if it contains commas, quotes, or newlines
        if (str.includes('"') || str.includes(',') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };

      return [
        entry.date.toISOString(),
        entry.type,
        entry.participants.join('; '),
        escapeCSV(entry.subject),
        escapeCSV(entry.summary),
        escapeCSV(entry.outcome),
        entry.followUpNeeded ? 'Yes' : 'No',
        entry.tags.join('; '),
        entry.urgent ? 'Yes' : 'No'
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "communication_log.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const addEntry = () => {
    if (!newEntry.subject || !newEntry.summary) return;

    const entry: CommunicationEntry = {
      id: Date.now().toString(),
      date: newEntry.date || new Date(),
      type: newEntry.type || 'email',
      participants: newEntry.participants?.filter(p => p.trim()) || [],
      subject: newEntry.subject,
      summary: newEntry.summary,
      outcome: newEntry.outcome,
      followUpNeeded: newEntry.followUpNeeded || false,
      followUpDate: newEntry.followUpDate,
      tags: newEntry.tags || [],
      urgent: newEntry.urgent || false
    };

    setEntries([entry, ...entries]);
    setNewEntry({
      date: new Date(),
      type: 'email',
      participants: [''],
      subject: '',
      summary: '',
      outcome: '',
      followUpNeeded: false,
      tags: [],
      urgent: false
    });
    setIsAddingEntry(false);
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const markFollowUpComplete = (id: string) => {
    setEntries(entries.map(entry =>
      entry.id === id ? { ...entry, followUpNeeded: false } : entry
    ));
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = 
      entry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.participants.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterType === 'all' || entry.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'phone': return <Phone size={16} />;
      case 'email': return <Mail size={16} />;
      case 'text': return <MessageCircle size={16} />;
      case 'in-person': return <MessageSquare size={16} />;
      case 'attorney': return <Scale size={16} />;
      case 'court': return <Calendar size={16} />;
      default: return <MessageSquare size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'phone': return 'bg-blue-100 text-blue-800';
      case 'email': return 'bg-green-100 text-green-800';
      case 'text': return 'bg-purple-100 text-purple-800';
      case 'in-person': return 'bg-orange-100 text-orange-800';
      case 'attorney': return 'bg-indigo-100 text-indigo-800';
      case 'court': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingFollowUps = entries.filter(entry => entry.followUpNeeded).length;
  const urgentItems = entries.filter(entry => entry.urgent).length;

  const commonTags = ['parenting time', 'support', 'assets', 'mediation', 'scheduling', 'legal', 'financial', 'children', 'settlement'];

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-light text-sage-900">Your private communication record</h1>
        <p className="text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed">
          The most secure and effective way to document your records is by keeping a log on your own computer. Use the templates below to get started.
        </p>
      </div>

      {/* Template Hub - Primary Call to Action */}
      <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-900 mb-3">Your private log template</h2>
        <p className="text-blue-800 mb-6 leading-relaxed">
          For maximum privacy and your own records, we strongly recommend keeping a detailed log on your personal computer. Download the universal CSV template to use with any spreadsheet software (like Excel or Numbers), or create a private copy in your own Google Drive.
        </p>
        
        <div className="flex flex-wrap items-start gap-4">
          <a 
            href="/communication-log-template.csv" 
            download
            className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <Download size={20} />
            Download Log Template (CSV)
          </a>
          <a
            href="https://docs.google.com/spreadsheets/create/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            <Sheet size={20} />
            Create a Private Google Sheet
          </a>
        </div>
        <p className="text-sm text-blue-700 mt-4">First, download the template. Then, in Google Sheets, go to File &gt; Import to upload and use the CSV.</p>
      </div>

      {/* Best Practices Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <CheckCircle2 className="text-blue-600 mt-1 flex-shrink-0" size={20} />
          <div className="space-y-2">
            <h3 className="font-semibold text-blue-900">Best practices for factual logging</h3>
            <div className="text-blue-800 text-sm space-y-1">
              <p>• <strong>Be factual, not emotional</strong> - Record what was said and done, not how you felt</p>
              <p>• <strong>Quote directly when possible</strong> - Use exact words for important statements</p>
              <p>• <strong>Always record basics</strong> - Date, time, participants, and communication method</p>
              <p>• <strong>State outcomes clearly</strong> - What was decided? What are the next steps?</p>
              <p>• <strong>Note follow-up items</strong> - Track what needs to happen and by when</p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex flex-wrap items-start gap-4">
          <a 
            href="/communication-log-template.csv" 
            download
            className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <Download size={20} />
            Download CSV Template
          </a>
          <a
            href="https://docs.google.com/spreadsheets/create/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            <Sheet size={20} />
            Open in Google Sheets
          </a>
        </div>
        <p className="text-sm text-neutral-500 mt-4">First, download the template. Then, in Google Sheets, go to File &gt; Import to upload and use the CSV.</p>
      </div>

      {/* In-App Tool - Reframed as Demo */}
      <div className="border-t border-neutral-200 pt-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-neutral-800">See how it works: A quick entry tool</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto mt-2">Want to see how the log works before downloading the template? You can add a few example entries here to try it out. Remember, this tool is for illustrative purposes only and your entries are stored only in this browser.</p>
        </div>

        {/* Alert Summary */}
        {(pendingFollowUps > 0 || urgentItems > 0) && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-amber-600" size={24} />
              <h3 className="text-xl font-semibold text-amber-900">Action required</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {pendingFollowUps > 0 && (
                <div className="bg-amber-100 rounded-lg p-4">
                  <p className="text-amber-800 font-medium">{pendingFollowUps} pending follow-up{pendingFollowUps !== 1 ? 's' : ''}</p>
                  <p className="text-amber-700 text-sm">Communication requiring your response</p>
                </div>
              )}
              {urgentItems > 0 && (
                <div className="bg-red-100 rounded-lg p-4">
                  <p className="text-red-800 font-medium">{urgentItems} urgent item{urgentItems !== 1 ? 's' : ''}</p>
                  <p className="text-red-700 text-sm">High priority communications</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 items-center flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder="Search communications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage-500"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-neutral-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage-500"
              >
                <option value="all">All types</option>
                <option value="phone">Phone calls</option>
                <option value="email">Emails</option>
                <option value="text">Text messages</option>
                <option value="in-person">In-person</option>
                <option value="attorney">Attorney</option>
                <option value="court">Court related</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsAddingEntry(true)}
              className="flex items-center gap-2 bg-sage-600 text-white px-6 py-3 rounded-lg hover:bg-sage-700 transition-colors"
            >
              <Plus size={20} />
              Add Example Communication
            </button>
            <button 
              onClick={exportLog}
              className="flex items-center gap-2 bg-white text-sage-600 border border-sage-300 px-6 py-3 rounded-lg hover:bg-sage-50 transition-colors">
              <Download size={20} />
              Export Entries
            </button>
          </div>
        </div>

        {/* Add Entry Form */}
        {isAddingEntry && (
          <div className="bg-white border border-neutral-200 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-neutral-800 mb-6">Add communication entry</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Date & Time</label>
                  <input
                    type="datetime-local"
                    value={newEntry.date?.toISOString().slice(0, 16)}
                    onChange={(e) => setNewEntry({...newEntry, date: new Date(e.target.value)})}
                    className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Communication type</label>
                  <select
                    value={newEntry.type}
                    onChange={(e) => setNewEntry({...newEntry, type: e.target.value as any})}
                    className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage-500"
                  >
                    <option value="phone">Phone call</option>
                    <option value="email">Email</option>
                    <option value="text">Text message</option>
                    <option value="in-person">In-person</option>
                    <option value="attorney">Attorney communication</option>
                    <option value="court">Court related</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Participants</label>
                  <input
                    type="text"
                    placeholder="Names of other people involved"
                    value={newEntry.participants?.join(', ')}
                    onChange={(e) => setNewEntry({...newEntry, participants: e.target.value.split(',').map(s => s.trim())})}
                    className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage-500"
                  />
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newEntry.urgent}
                      onChange={(e) => setNewEntry({...newEntry, urgent: e.target.checked})}
                      className="text-red-600"
                    />
                    <span className="text-sm text-neutral-700">Urgent/High priority</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newEntry.followUpNeeded}
                      onChange={(e) => setNewEntry({...newEntry, followUpNeeded: e.target.checked})}
                      className="text-sage-600"
                    />
                    <span className="text-sm text-neutral-700">Follow-up needed</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Subject/Topic</label>
                  <input
                    type="text"
                    placeholder="Brief description of what was discussed"
                    value={newEntry.subject}
                    onChange={(e) => setNewEntry({...newEntry, subject: e.target.value})}
                    className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Detailed summary</label>
                  <textarea
                    rows={4}
                    placeholder="Detailed notes about the communication..."
                    value={newEntry.summary}
                    onChange={(e) => setNewEntry({...newEntry, summary: e.target.value})}
                    className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Outcome/Next steps</label>
                  <textarea
                    rows={2}
                    placeholder="What was decided or what happens next..."
                    value={newEntry.outcome}
                    onChange={(e) => setNewEntry({...newEntry, outcome: e.target.value})}
                    className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {commonTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => {
                          const currentTags = newEntry.tags || [];
                          if (currentTags.includes(tag)) {
                            setNewEntry({...newEntry, tags: currentTags.filter(t => t !== tag)});
                          } else {
                            setNewEntry({...newEntry, tags: [...currentTags, tag]});
                          }
                        }}
                        className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                          newEntry.tags?.includes(tag)
                            ? 'bg-sage-100 border-sage-300 text-sage-800'
                            : 'bg-white border-neutral-300 text-neutral-600 hover:border-sage-300'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={addEntry}
                disabled={!newEntry.subject || !newEntry.summary}
                className="flex items-center gap-2 bg-sage-600 text-white px-6 py-3 rounded-lg hover:bg-sage-700 transition-colors disabled:bg-neutral-300"
              >
                <CheckCircle2 size={20} />
                Save entry
              </button>
              <button
                onClick={() => setIsAddingEntry(false)}
                className="px-6 py-3 text-neutral-600 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Entries List */}
        <div className="space-y-6">
          {filteredEntries.length > 0 ? (
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <div key={entry.id} className={`bg-white border rounded-xl p-6 ${
                  entry.urgent ? 'border-red-300 shadow-lg' : 'border-neutral-200'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(entry.type)}`}>
                        {getTypeIcon(entry.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-800">{entry.subject}</h3>
                        <div className="flex items-center gap-4 text-sm text-neutral-600">
                          <span>{entry.date.toLocaleDateString()}</span>
                          <span>{entry.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          {entry.participants.length > 0 && (
                            <span>with {entry.participants.join(', ')}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {entry.urgent && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Urgent</span>
                      )}
                      {entry.followUpNeeded && (
                        <button
                          onClick={() => markFollowUpComplete(entry.id)}
                          className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full hover:bg-amber-200 transition-colors"
                        >
                          Follow-up needed
                        </button>
                      )}
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-neutral-700">{entry.summary}</p>
                    
                    {entry.outcome && (
                      <div className="bg-neutral-50 rounded-lg p-3">
                        <p className="text-sm text-neutral-600">
                          <strong>Outcome:</strong> {entry.outcome}
                        </p>
                      </div>
                    )}

                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag, index) => (
                          <span key={index} className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto text-neutral-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-neutral-600 mb-2">No example entries yet</h3>
              <p className="text-neutral-500 mb-4">Use the button above to add an entry and see how the log works.</p>
              <button
                onClick={() => setIsAddingEntry(true)}
                className="bg-sage-600 text-white px-6 py-3 rounded-lg hover:bg-sage-700 transition-colors"
              >
                Add Your First Example
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunicationLog;
