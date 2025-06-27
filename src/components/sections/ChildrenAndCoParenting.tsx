import React, { useState } from 'react';
import { Baby, Calendar, Clock, Home, Users, MapPin, Phone, BookOpen, ExternalLink, Calculator } from 'lucide-react';

interface ParentingSchedule {
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

const ChildrenAndCoParenting: React.FC = () => {
  const [selectedSchedule, setSelectedSchedule] = useState<string>('alternating-weeks');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('school-age');
  const [showCommunicationTips, setShowCommunicationTips] = useState<string | null>(null);

  const parentingSchedules: { [key: string]: ParentingSchedule } = {
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
        schoolNights: 'All school nights with residential parent that week',
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
        'Limited time with non-residential parent',
        'May feel like visiting vs. living',
        'Burden on primary parent',
        'Weekend parent may feel disconnected'
      ],
      ageRange: 'Suitable for all ages, traditional approach',
      details: {
        pickupDropoff: 'Friday after school, Sunday evening return',
        schoolNights: 'Primarily with residential parent',
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
        'Accept that minor differences are okay',
        'Focus on consistency for important issues',
        'Present a united front to children'
      ],
      example: '"In both houses, we finish homework before video games."' 
    },
    {
      scenario: 'Handling disagreements',
      strategy: 'Communicate away from children and focus on the issue',
      tips: [
        'Never argue in front of the children',
        'Use email or text for non-urgent issues',
        'Schedule regular co-parenting check-ins',
        'Focus on finding solutions, not placing blame'
      ],
      example: '"Let\'s set aside time to talk on Tuesday evening about summer camp options."' 
    }
  ];

  const currentSchedule = parentingSchedules[selectedSchedule];
  const currentAgeGroup = ageGroupConsiderations[selectedAgeGroup];

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-light text-sage-900">Children & Co-Parenting</h1>
        <p className="text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed">
          Guidance for creating stable, supportive environments for your children and fostering effective co-parenting relationships.
        </p>
      </div>

      {/* Section 1: Age-Appropriate Communication */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-6">How to Talk to Your Children About Divorce</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Toddlers */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold text-blue-800 mb-3">Toddlers (Ages 2-4)</h3>
            <ul className="list-disc list-inside space-y-2 text-blue-900">
              <li>Keep explanations simple and reassuring.</li>
              <li>Emphasize that both parents will always love them.</li>
              <li>Maintain routines as much as possible.</li>
              <li>Use picture books to help explain changes.</li>
            </ul>
          </div>
          {/* School-Age */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-bold text-green-800 mb-3">School-Age (Ages 5-12)</h3>
            <ul className="list-disc list-inside space-y-2 text-green-900">
              <li>Provide clear, honest, and age-appropriate information.</li>
              <li>Reassure them that the divorce is not their fault.</li>
              <li>Encourage them to express their feelings openly.</li>
              <li>Be prepared for a wide range of emotional reactions.</li>
            </ul>
          </div>
          {/* Teenagers */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-bold text-purple-800 mb-3">Teenagers (Ages 13+)</h3>
            <ul className="list-disc list-inside space-y-2 text-purple-900">
              <li>Be direct and honest, avoiding unnecessary details.</li>
              <li>Acknowledge the impact on their lives and social circles.</li>
              <li>Involve them in decisions that affect them (like schedules).</li>
              <li>Respect their need for space and privacy.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 2: Custody Schedule Comparison */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-6">Comparing Co-Parenting Schedules</h2>
        <div className="flex gap-4 mb-6 border-b pb-4">
          {Object.keys(parentingSchedules).map(key => (
            <button 
              key={key} 
              onClick={() => setSelectedSchedule(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSchedule === key ? 'bg-sage-600 text-white shadow' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}>
              {parentingSchedules[key].name}
            </button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-sage-800 mb-4">{currentSchedule.name}</h3>
            <p className="text-neutral-600 mb-6">{currentSchedule.description}</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-700 mb-2">Weekly Pattern</h4>
                <div className="flex gap-2">
                  {currentSchedule.weeklyPattern.map((item, index) => (
                    <span key={index} className="bg-neutral-100 text-neutral-800 px-3 py-1 rounded-md text-xs">{item}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-700 mb-2">Best For</h4>
                <p className="text-neutral-600 text-sm">{currentSchedule.ageRange}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-700 mb-3">Advantages</h4>
              <ul className="list-disc list-inside space-y-2 text-neutral-600 text-sm">
                {currentSchedule.pros.map((pro, index) => <li key={index}>{pro}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-700 mb-3">Considerations</h4>
              <ul className="list-disc list-inside space-y-2 text-neutral-600 text-sm">
                {currentSchedule.cons.map((con, index) => <li key={index}>{con}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Co-Parenting Communication Strategies */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-6">Co-Parenting Communication Strategies</h2>
        <div className="space-y-4">
          {communicationStrategies.map(strategy => (
            <div key={strategy.scenario} className="border border-neutral-200 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-700 mb-2">{strategy.scenario}</h3>
              <p className="text-sm text-neutral-600 mb-3"><strong>Strategy:</strong> {strategy.strategy}</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600 mb-3">
                {strategy.tips.map((tip, index) => <li key={index}>{tip}</li>)}
              </ul>
              <p className="text-sm text-neutral-500 bg-neutral-50 p-2 rounded-md"><em>Example: {strategy.example}</em></p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ChildrenAndCoParenting;
