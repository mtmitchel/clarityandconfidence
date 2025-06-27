import React, { useState } from 'react';
import { Baby, Calendar, Clock, Home, Users, MapPin, Phone, BookOpen, ExternalLink, Calculator } from 'lucide-react';

interface CustodySchedule {
  name: string;
  description: string;
  weeklyPattern: string[];
  holidays: string;
  summer: string;
  pros: string[];
  cons: string[];
  ageRange: string;
  details: {
    pickupDropoff: string;
    schoolNights: string;
    extracurriculars: string;
  };
}

interface CommunicationStrategy {
  scenario: string;
  strategy: string;
  tips: string[];
  example: string;
}

const Children: React.FC = () => {
  const [selectedSchedule, setSelectedSchedule] = useState<string>('alternating-weeks');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('school-age');
  const [showCommunicationTips, setShowCommunicationTips] = useState<string | null>(null);

  const custodySchedules: { [key: string]: CustodySchedule } = {
    'alternating-weeks': {
      name: 'Alternating Weeks',
      description: 'Children spend one full week with each parent, alternating weekly',
      weeklyPattern: ['Week 1: Parent A', 'Week 2: Parent B', 'Repeat pattern'],
      holidays: 'Alternate major holidays yearly or split holiday periods',
      summer: 'Continue weekly alternation or divide into longer blocks',
      pros: [
        'Minimal transitions for children',
        'Each parent gets extended time',
        'Simpler schedule to follow',
        'Good for long-distance arrangements'
      ],
      cons: [
        'Long periods without seeing other parent',
        'May be difficult for younger children',
        'Requires good communication for activities',
        'School/activity consistency challenges'
      ],
      ageRange: 'Best for school-age and older children',
      details: {
        pickupDropoff: 'Sunday evening or Monday morning for school transitions',
        schoolNights: 'All school nights with custodial parent that week',
        extracurriculars: 'Custodial parent handles registration and transportation'
      }
    },
    'alternating-weekends': {
      name: '2-2-3 Schedule',
      description: 'Children alternate between parents on a 2-2-3 day rotation',
      weeklyPattern: [
        'Mon-Tue: Parent A',
        'Wed-Thu: Parent B', 
        'Fri-Sun: Parent A',
        'Next week flips pattern'
      ],
      holidays: 'Holiday schedule takes precedence over regular rotation',
      summer: 'May extend to week-long blocks during school break',
      pros: [
        'More frequent contact with both parents',
        'No more than 3 days away from either parent',
        'Flexible and responsive to child needs',
        'Both parents involved in school week'
      ],
      cons: [
        'More transitions for children',
        'Complex schedule to track',
        'Requires excellent co-parent communication',
        'May be disruptive to routines'
      ],
      ageRange: 'Works well for all ages, especially younger children',
      details: {
        pickupDropoff: 'Usually after school/work or evening',
        schoolNights: 'Shared between both parents',
        extracurriculars: 'Both parents coordinate activities'
      }
    },
    'traditional': {
      name: 'Traditional Schedule',
      description: 'Children live primarily with one parent, visit other parent alternating weekends',
      weeklyPattern: [
        'Mon-Thu: Primary parent',
        'Fri-Sun: Other parent (alternating weekends)',
        'One weeknight dinner visit optional'
      ],
      holidays: 'Split major holidays, some traditions maintained',
      summer: 'Extended visitation periods (2-4 weeks)',
      pros: [
        'Stable primary residence for children',
        'Less disruptive to school routines',
        'Clear structure and expectations',
        'Works when parents live far apart'
      ],
      cons: [
        'Limited time with non-custodial parent',
        'May feel like visiting vs. living',
        'Burden on primary parent',
        'Weekend parent may feel disconnected'
      ],
      ageRange: 'Suitable for all ages, traditional approach',
      details: {
        pickupDropoff: 'Friday after school, Sunday evening return',
        schoolNights: 'Primarily with custodial parent',
        extracurriculars: 'Custodial parent coordinates, other parent informed'
      }
    },
    'nested': {
      name: 'Nesting Arrangement',
      description: 'Children stay in family home, parents rotate in and out',
      weeklyPattern: [
        'Children remain in family home',
        'Parents alternate weeks living there',
        'Each parent maintains separate residence'
      ],
      holidays: 'Parent rotation continues through holidays',
      summer: 'May maintain arrangement or take planned vacations',
      pros: [
        'Maximum stability for children',
        'Children keep same bedroom/environment',
        'No packing/moving belongings',
        'Easier transition initially'
      ],
      cons: [
        'Expensive - maintaining 3 residences',
        'Complex logistics for parents',
        'Potential boundary issues',
        'Usually temporary arrangement'
      ],
      ageRange: 'Beneficial for younger children during initial transition',
      details: {
        pickupDropoff: 'Parents transition, children stay put',
        schoolNights: 'No impact on school routine',
        extracurriculars: 'Resident parent handles activities'
      }
    }
  };

  const ageGroupConsiderations = {
    'toddler': {
      title: 'Ages 2-4: Toddlers',
      considerations: [
        'Need frequent contact with both parents (no more than 2-3 days apart)',
        'Benefit from consistent routines and familiar environments',
        'May struggle with longer separations from primary caregiver',
        'Transitions should be gentle and predictable',
        'Consider shorter, more frequent visits'
      ],
      recommendedSchedules: ['2-2-3 Schedule', 'Modified Traditional with midweek visits']
    },
    'school-age': {
      title: 'Ages 5-12: School Age',
      considerations: [
        'Can handle longer periods with each parent',
        'School schedule provides structure and routine',
        'Benefit from stability in school district',
        'Can participate in planning their schedule',
        'Extracurricular activities become important factor'
      ],
      recommendedSchedules: ['Alternating Weeks', '2-2-3 Schedule', 'Traditional']
    },
    'teenager': {
      title: 'Ages 13+: Teenagers',
      considerations: [
        'Need input into their living arrangements',
        'Social activities and friendships are priorities',
        'May prefer one primary residence',
        'School and extracurricular commitments drive schedule',
        'Flexibility becomes more important than rigid structure'
      ],
      recommendedSchedules: ['Flexible arrangements based on teen input', 'Modified schedules around activities']
    }
  };

  const communicationStrategies: CommunicationStrategy[] = [
    {
      scenario: 'Sharing school information',
      strategy: 'Use shared digital tools and maintain open communication',
      tips: [
        'Both parents on school email lists and emergency contacts',
        'Share school portal login information',
        'Attend school events together when possible',
        'Create shared calendar for school activities'
      ],
      example: 'Use apps like OurFamilyWizard or shared Google Calendar for school events'
    },
    {
      scenario: 'Managing different house rules',
      strategy: 'Agree on core values while allowing some flexibility',
      tips: [
        'Align on major rules (bedtime, homework, screen time)',
        'Allow each parent some autonomy in their home',
        'Communicate rule changes that affect the other household',
        'Focus on consistency in values, not identical rules'
      ],
      example: 'Both homes require homework completion before screen time, but bedtime may vary by 30 minutes'
    },
    {
      scenario: 'Handling medical appointments',
      strategy: 'Establish clear protocol for healthcare decisions',
      tips: [
        'Share access to children\'s medical records',
        'Inform other parent of all appointments and outcomes',
        'Both parents authorized to make emergency medical decisions',
        'Coordinate routine care to avoid duplication'
      ],
      example: 'Annual physicals scheduled during one parent\'s time, both parents informed of results'
    },
    {
      scenario: 'Introducing new partners',
      strategy: 'Take gradual approach with advance communication',
      tips: [
        'Wait until relationship is stable before introduction',
        'Inform other parent before introduction',
        'Start with brief, casual meetings',
        'Respect children\'s timeline for acceptance'
      ],
      example: 'Six-month relationship minimum before introduction, casual group activity for first meeting'
    }
  ];

  const ohioResources = [
    {
      name: 'Ohio Shared Parenting Guidelines',
      description: 'Official guidelines from Ohio Supreme Court for parenting time schedules',
      link: 'https://www.supremecourt.ohio.gov/JCS/CFC/resources/parentingGuide/',
      type: 'legal'
    },
    {
      name: 'Hamilton County Parent Education Program',
      description: 'Required 4-hour program for divorcing parents in Hamilton County',
      link: 'https://www.hamiltoncountyohio.gov/family-court',
      type: 'education'
    },
    {
      name: 'Ohio Child Support Calculator',
      description: 'Calculate child support based on custody arrangement and income',
      link: 'https://jfs.ohio.gov/ocs/ChildSupportCalculator.stm',
      type: 'financial'
    },
    {
      name: 'OurFamilyWizard Communication Tool',
      description: 'Court-approved co-parenting communication platform',
      link: 'https://www.ourfamilywizard.com',
      type: 'tool'
    }
  ];

  const currentSchedule = custodySchedules[selectedSchedule];
  const currentAgeGroup = ageGroupConsiderations[selectedAgeGroup];

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-light text-sage-900">Custody arrangement planner</h1>
        <p className="text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed">
          Interactive tools to explore custody schedules, communication strategies, and 
          age-appropriate arrangements that prioritize your children's wellbeing.
        </p>
      </div>

      {/* Age Group Selector */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-neutral-800 text-center">Your child's age group</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(ageGroupConsiderations).map(([key, ageGroup]) => (
            <button
              key={key}
              onClick={() => setSelectedAgeGroup(key)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedAgeGroup === key
                  ? 'border-sage-300 bg-sage-50 shadow-md'
                  : 'border-neutral-200 bg-white hover:border-sage-200 hover:shadow-sm'
              }`}
            >
              <h3 className="font-semibold text-neutral-800 mb-2">{ageGroup.title}</h3>
            </button>
          ))}
        </div>

        {/* Age Group Considerations */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">{currentAgeGroup.title} Considerations</h3>
          <ul className="space-y-2">
            {currentAgeGroup.considerations.map((consideration, index) => (
              <li key={index} className="flex items-start gap-2 text-blue-800">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                {consideration}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Custody Schedule Selector */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-neutral-800 text-center">Custody schedule options</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(custodySchedules).map(([key, schedule]) => (
            <button
              key={key}
              onClick={() => setSelectedSchedule(key)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedSchedule === key
                  ? 'border-sage-300 bg-sage-50 shadow-md'
                  : 'border-neutral-200 bg-white hover:border-sage-200 hover:shadow-sm'
              }`}
            >
              <h3 className="font-semibold text-neutral-800 mb-2">{schedule.name}</h3>
              <p className="text-sm text-neutral-600">{schedule.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Schedule Details */}
      <div className="bg-sage-50 border border-sage-200 rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-sage-900 mb-4">{currentSchedule.name}</h2>
        <p className="text-lg text-sage-800 mb-6">{currentSchedule.description}</p>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Schedule Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-sage-800 mb-3 flex items-center gap-2">
                <Calendar size={20} />
                Weekly Pattern
              </h3>
              <ul className="space-y-2">
                {currentSchedule.weeklyPattern.map((pattern, index) => (
                  <li key={index} className="text-sage-700 bg-white rounded-lg p-3">
                    {pattern}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-sage-800 mb-3 flex items-center gap-2">
                <Clock size={20} />
                Implementation Details
              </h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3">
                  <strong>Pickup/Dropoff:</strong> {currentSchedule.details.pickupDropoff}
                </div>
                <div className="bg-white rounded-lg p-3">
                  <strong>School Nights:</strong> {currentSchedule.details.schoolNights}
                </div>
                <div className="bg-white rounded-lg p-3">
                  <strong>Activities:</strong> {currentSchedule.details.extracurriculars}
                </div>
              </div>
            </div>
          </div>

          {/* Pros and Cons */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-sage-800 mb-3">Advantages</h3>
              <ul className="space-y-2">
                {currentSchedule.pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-2 text-sage-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="bg-white rounded-lg p-2 flex-1">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-sage-800 mb-3">Considerations</h3>
              <ul className="space-y-2">
                {currentSchedule.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-2 text-sage-700">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="bg-white rounded-lg p-2 flex-1">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-100 rounded-lg">
          <p className="text-blue-900">
            <strong>Age Suitability:</strong> {currentSchedule.ageRange}
          </p>
        </div>
      </div>

      {/* Communication Strategies */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-neutral-800 text-center">Co-parenting communication strategies</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {communicationStrategies.map((strategy, index) => (
            <div key={index} className="bg-white border border-neutral-200 rounded-xl p-6">
              <h3 className="font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                <Phone size={18} />
                {strategy.scenario}
              </h3>
              <p className="text-neutral-700 mb-4">{strategy.strategy}</p>
              
              <button
                onClick={() => setShowCommunicationTips(showCommunicationTips === strategy.scenario ? null : strategy.scenario)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {showCommunicationTips === strategy.scenario ? 'Hide details' : 'View strategy details'}
              </button>

              {showCommunicationTips === strategy.scenario && (
                <div className="mt-4 space-y-3">
                  <div>
                    <h4 className="font-medium text-neutral-800 mb-2">Implementation Tips:</h4>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      {strategy.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2">
                          <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 flex-shrink-0"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <strong className="text-blue-900">Example:</strong>
                    <p className="text-blue-800 text-sm mt-1">{strategy.example}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ohio Resources */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-neutral-800 text-center">Ohio custody resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {ohioResources.map((resource, index) => (
            <div key={index} className="bg-white border border-neutral-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  resource.type === 'legal' ? 'bg-blue-100' :
                  resource.type === 'education' ? 'bg-purple-100' :
                  resource.type === 'financial' ? 'bg-green-100' : 'bg-orange-100'
                }`}>
                  {resource.type === 'legal' && <BookOpen className="text-blue-600" size={20} />}
                  {resource.type === 'education' && <Users className="text-purple-600" size={20} />}
                  {resource.type === 'financial' && <Calculator className="text-green-600" size={20} />}
                  {resource.type === 'tool' && <Phone className="text-orange-600" size={20} />}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-800 mb-2">{resource.name}</h3>
                  <p className="text-neutral-600 mb-3">{resource.description}</p>
                  <a 
                    href={resource.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <ExternalLink size={16} />
                    Access resource {/* updated to sentence case */}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Disclaimer */}
      <div className="text-center p-6 bg-neutral-50 rounded-xl border border-neutral-200">
        <p className="text-neutral-700 leading-relaxed">
          <strong>Professional notice:</strong> Custody arrangements must be approved by Ohio courts and should consider each family's unique circumstances. 
          Consult with family law attorneys and child development professionals for personalized guidance.
        </p>
      </div>
    </div>
  );
};

export default Children;
