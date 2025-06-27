import React, { useState } from 'react';
import { MapPin, Phone, ExternalLink, Clock, DollarSign, Users, Scale, Heart, Calendar } from 'lucide-react';

interface ResourceLocation {
  id: string;
  name: string;
  type: 'courthouse' | 'legal-aid' | 'mediation' | 'support-group' | 'parenting-class';
  address: string;
  city: string;
  county: string;
  phone: string;
  website?: string;
  hours?: string;
  services: string[];
  cost?: string;
  notes?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const OhioResourceMap: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCounty, setSelectedCounty] = useState<string>('all');

  const resourceLocations: ResourceLocation[] = [
    // Major County Courthouses
    {
      id: 'hamilton-courthouse',
      name: 'Hamilton County Domestic Relations Court',
      type: 'courthouse',
      address: '1000 Main St',
      city: 'Cincinnati',
      county: 'Hamilton',
      phone: '(513) 946-5600',
      website: 'https://www.hamiltoncountyohio.gov/government/courts/domestic_relations',
      hours: 'Mon-Fri 8:00 AM - 4:30 PM',
      services: ['Divorce filing', 'Custody hearings', 'Support modification', 'Mediation services'],
      cost: 'Filing fees: $350-$375',
      coordinates: { lat: 39.1031, lng: -84.5120 }
    },
    {
      id: 'franklin-courthouse',
      name: 'Franklin County Domestic Relations Court',
      type: 'courthouse',
      address: '373 S High St',
      city: 'Columbus',
      county: 'Franklin',
      phone: '(614) 525-3922',
      website: 'https://drcommonpleas.franklincountyohio.gov/',
      hours: 'Mon-Fri 8:00 AM - 4:30 PM',
      services: ['Divorce proceedings', 'Child custody', 'Adoption', 'Domestic violence'],
      cost: 'Filing fees: $375-$400',
      coordinates: { lat: 39.9612, lng: -82.9988 }
    },
    {
      id: 'cuyahoga-courthouse',
      name: 'Cuyahoga County Domestic Relations Court',
      type: 'courthouse',
      address: '1200 Ontario St',
      city: 'Cleveland',
      county: 'Cuyahoga',
      phone: '(216) 443-8400',
      website: 'https://domestic.cuyahogacounty.us/',
      hours: 'Mon-Fri 8:30 AM - 4:30 PM',
      services: ['Family law', 'Divorce', 'Child support', 'Custody'],
      cost: 'Filing fees: $365-$385',
      coordinates: { lat: 41.4993, lng: -81.6944 }
    },

    // Legal Aid Organizations
    {
      id: 'legal-aid-southwest',
      name: 'Legal Aid Society of Southwest Ohio',
      type: 'legal-aid',
      address: '215 E 9th St',
      city: 'Cincinnati',
      county: 'Hamilton',
      phone: '(513) 241-9400',
      website: 'https://www.lascinti.org/',
      hours: 'Mon-Fri 9:00 AM - 5:00 PM',
      services: ['Free legal assistance', 'Divorce help', 'Custody assistance', 'Domestic violence'],
      cost: 'Free for qualifying income',
      notes: 'Must meet income guidelines',
      coordinates: { lat: 39.1031, lng: -84.5120 }
    },
    {
      id: 'legal-aid-cleveland',
      name: 'Legal Aid Society of Cleveland',
      type: 'legal-aid',
      address: '1223 W 6th St',
      city: 'Cleveland',
      county: 'Cuyahoga',
      phone: '(216) 687-1900',
      website: 'https://lasclev.org/',
      hours: 'Mon-Fri 8:30 AM - 4:30 PM',
      services: ['Family law', 'Housing', 'Public benefits', 'Consumer issues'],
      cost: 'Free for eligible clients',
      coordinates: { lat: 41.4993, lng: -81.6944 }
    },
    {
      id: 'legal-aid-columbus',
      name: 'Legal Aid Society of Columbus',
      type: 'legal-aid',
      address: '1108 City Park Ave',
      city: 'Columbus',
      county: 'Franklin',
      phone: '(614) 241-2001',
      website: 'https://www.columbuslegalaid.org/',
      hours: 'Mon-Fri 9:00 AM - 5:00 PM',
      services: ['Family law', 'Divorce', 'Child custody', 'Domestic relations'],
      cost: 'Free for qualifying households',
      coordinates: { lat: 39.9612, lng: -82.9988 }
    },

    // Mediation Centers
    {
      id: 'mediation-cincinnati',
      name: 'Community Mediation Services',
      type: 'mediation',
      address: '1501 Madison Rd',
      city: 'Cincinnati',
      county: 'Hamilton',
      phone: '(513) 281-9777',
      website: 'https://www.cincinnatimediations.org/',
      hours: 'Mon-Fri 9:00 AM - 5:00 PM, evening appointments available',
      services: ['Divorce mediation', 'Co-parenting plans', 'Financial mediation', 'Child custody'],
      cost: '$100-$300 per session',
      coordinates: { lat: 39.1031, lng: -84.5120 }
    },
    {
      id: 'mediation-columbus',
      name: 'Franklin County Municipal Court Mediation',
      type: 'mediation',
      address: '375 S High St',
      city: 'Columbus',
      county: 'Franklin',
      phone: '(614) 645-7877',
      hours: 'Mon-Fri 8:00 AM - 4:00 PM',
      services: ['Court-connected mediation', 'Family disputes', 'Custody mediation'],
      cost: '$50-$150 sliding scale',
      coordinates: { lat: 39.9612, lng: -82.9988 }
    },

    // Support Groups
    {
      id: 'support-group-cincinnati',
      name: 'DivorceCare - Cincinnati',
      type: 'support-group',
      address: '11885 Mosteller Rd',
      city: 'Cincinnati',
      county: 'Hamilton',
      phone: '(513) 771-1100',
      website: 'https://www.divorcecare.org/',
      hours: 'Weekly meetings - varies by location',
      services: ['Divorce support groups', 'Single parent support', 'Children programs'],
      cost: 'Free or donation-based',
      coordinates: { lat: 39.1031, lng: -84.5120 }
    },
    {
      id: 'support-group-columbus',
      name: 'New Beginnings Support Group',
      type: 'support-group',
      address: '1445 E Dublin Granville Rd',
      city: 'Columbus',
      county: 'Franklin',
      phone: '(614) 885-3055',
      hours: 'Thursdays 7:00 PM - 8:30 PM',
      services: ['Divorce recovery', 'Co-parenting support', 'Emotional healing'],
      cost: 'Free',
      coordinates: { lat: 39.9612, lng: -82.9988 }
    },

    // Parenting Classes
    {
      id: 'parenting-class-cincinnati',
      name: 'Children First Parenting Classes',
      type: 'parenting-class',
      address: '2400 Reading Rd',
      city: 'Cincinnati',
      county: 'Hamilton',
      phone: '(513) 241-4111',
      website: 'https://www.fcsohio.org/',
      hours: 'Various weekend and evening times',
      services: ['Court-mandated parenting classes', 'Co-parenting education', 'Child development'],
      cost: '$40-$60 per person',
      notes: 'Required for divorce with children in Ohio',
      coordinates: { lat: 39.1031, lng: -84.5120 }
    },
    {
      id: 'parenting-class-columbus',
      name: 'Focus on Children Program',
      type: 'parenting-class',
      address: '1721 Kenny Rd',
      city: 'Columbus',
      county: 'Franklin',
      phone: '(614) 224-4344',
      hours: 'Saturdays 9:00 AM - 12:00 PM',
      services: ['Divorce education', 'Child-focused parenting', 'Communication skills'],
      cost: '$45 per person',
      coordinates: { lat: 39.9612, lng: -82.9988 }
    }
  ];

  const resourceTypes = [
    { value: 'all', label: 'All Resources', icon: MapPin },
    { value: 'courthouse', label: 'Courthouses', icon: Scale },
    { value: 'legal-aid', label: 'Legal Aid', icon: Users },
    { value: 'mediation', label: 'Mediation Centers', icon: Heart },
    { value: 'support-group', label: 'Support Groups', icon: Heart },
    { value: 'parenting-class', label: 'Parenting Classes', icon: Calendar }
  ];

  const counties = ['all', 'Hamilton', 'Franklin', 'Cuyahoga', 'Summit', 'Butler', 'Lucas', 'Montgomery'];

  const filteredResources = resourceLocations.filter(resource => {
    const typeMatch = selectedType === 'all' || resource.type === selectedType;
    const countyMatch = selectedCounty === 'all' || resource.county === selectedCounty;
    return typeMatch && countyMatch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'courthouse': return Scale;
      case 'legal-aid': return Users;
      case 'mediation': return Heart;
      case 'support-group': return Heart;
      case 'parenting-class': return Calendar;
      default: return MapPin;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'courthouse': return 'blue';
      case 'legal-aid': return 'green';
      case 'mediation': return 'purple';
      case 'support-group': return 'orange';
      case 'parenting-class': return 'teal';
      default: return 'neutral';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-light text-sage-900">Ohio divorce resources map</h1>
        <p className="text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed">
          Find courthouses, legal aid, mediation centers, support groups, and parenting classes across Ohio
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Resource Type</label>
            <div className="grid grid-cols-2 gap-2">
              {resourceTypes.map(type => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedType === type.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    <Icon size={16} />
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">County</label>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {counties.map(county => (
                <option key={county} value={county}>
                  {county === 'all' ? 'All Counties' : `${county} County`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => {
          const Icon = getTypeIcon(resource.type);
          const color = getTypeColor(resource.type);
          
          return (
            <div key={resource.id} className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  color === 'blue' ? 'bg-blue-100' :
                  color === 'green' ? 'bg-green-100' :
                  color === 'purple' ? 'bg-purple-100' :
                  color === 'orange' ? 'bg-orange-100' :
                  color === 'teal' ? 'bg-teal-100' : 'bg-neutral-100'
                }`}>
                  <Icon className={`${
                    color === 'blue' ? 'text-blue-600' :
                    color === 'green' ? 'text-green-600' :
                    color === 'purple' ? 'text-purple-600' :
                    color === 'orange' ? 'text-orange-600' :
                    color === 'teal' ? 'text-teal-600' : 'text-neutral-600'
                  }`} size={24} />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-800 mb-2">{resource.name}</h3>
                  <div className="space-y-2 text-sm text-neutral-600">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>{resource.address}, {resource.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} />
                      <span>{resource.phone}</span>
                    </div>
                    {resource.hours && (
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>{resource.hours}</span>
                      </div>
                    )}
                    {resource.cost && (
                      <div className="flex items-center gap-2">
                        <DollarSign size={14} />
                        <span>{resource.cost}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-neutral-700 mb-1">Services:</h4>
                    <div className="flex flex-wrap gap-1">
                      {resource.services.slice(0, 3).map((service, index) => (
                        <span key={index} className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-xs">
                          {service}
                        </span>
                      ))}
                      {resource.services.length > 3 && (
                        <span className="text-xs text-neutral-500">+{resource.services.length - 3} more</span>
                      )}
                    </div>
                  </div>
                  
                  {resource.notes && (
                    <div className="mt-3 p-2 bg-amber-50 rounded text-xs text-amber-700">
                      <strong>Note:</strong> {resource.notes}
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-4">
                    {resource.website && (
                      <a
                        href={resource.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <ExternalLink size={14} />
                        Website
                      </a>
                    )}
                    <a
                      href={`https://maps.google.com?q=${encodeURIComponent(resource.address + ', ' + resource.city + ', OH')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-green-600 hover:text-green-800 text-sm font-medium"
                    >
                      <MapPin size={14} />
                      Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="mx-auto text-neutral-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-neutral-600 mb-2">No resources found</h3>
          <p className="text-neutral-500">Try adjusting your filters to see more resources.</p>
        </div>
      )}

      {/* Quick Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-medium text-blue-800 mb-4">Using Ohio divorce resources</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
          <ul className="space-y-2">
            <li>• Call ahead to confirm hours and availability</li>
            <li>• Bring required documents and identification</li>
            <li>• Ask about sliding scale fees if cost is a concern</li>
            <li>• Many services require appointments - don't walk in</li>
          </ul>
          <ul className="space-y-2">
            <li>• Legal aid has income requirements - check eligibility first</li>
            <li>• Parenting classes are mandatory for divorce with children</li>
            <li>• Support groups offer ongoing help throughout the process</li>
            <li>• Mediation can save time and money compared to litigation</li>
          </ul>
        </div>
      </div>

      {/* Emergency Resources */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="font-medium text-red-800 mb-4">Emergency resources</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-red-700 mb-2">Domestic Violence</h4>
            <p className="text-red-600">National Hotline: 1-800-799-7233</p>
            <p className="text-red-600">Ohio Domestic Violence Network: 1-800-934-9840</p>
          </div>
          <div>
            <h4 className="font-medium text-red-700 mb-2">Crisis Support</h4>
            <p className="text-red-600">Crisis Text Line: Text HOME to 741741</p>
            <p className="text-red-600">National Suicide Prevention: 988</p>
          </div>
          <div>
            <h4 className="font-medium text-red-700 mb-2">Legal Emergency</h4>
            <p className="text-red-600">Ohio Legal Aid: 1-866-LAW-OHIO</p>
            <p className="text-red-600">After-hours emergency protection orders available through local courts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OhioResourceMap;
