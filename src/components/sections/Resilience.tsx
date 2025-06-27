import React, { useState } from 'react';
import { Shield, Heart, Users, MessageCircle, ChevronDown, ChevronRight, CheckCircle } from 'lucide-react';

interface Strategy {
  title: string;
  description: string;
  actionSteps: string[];
  tips?: string[];
}

const Resilience: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const conflictReductionStrategies: Strategy[] = [
    {
      title: 'Keep children out of adult conflicts',
      description: 'Children should never be messengers, witnesses to arguments, or burdened with adult problems.',
      actionSteps: [
        'Have difficult conversations when children are not around',
        'Use neutral locations for exchanges when possible',
        'Avoid discussing adult issues in front of children',
        'Never ask children to carry messages between parents'
      ],
      tips: [
        'If tensions are high, consider using a communication app designed for co-parents',
        'Practice deep breathing or count to ten before responding to frustrating messages'
      ]
    },
    {
      title: 'Communicate respectfully about your co-parent',
      description: 'How you speak about your child\'s other parent directly affects your child\'s wellbeing.',
      actionSteps: [
        'Avoid negative comments about your co-parent in front of children',
        'Redirect conversations when children criticize their other parent',
        'Focus on your child\'s positive relationship with their other parent',
        'Save your own processing for conversations with friends, family, or a therapist'
      ],
      tips: [
        'Remember: your child is half of each parent - criticism of their other parent can feel like criticism of them',
        'If you\'re struggling with this, consider talking to a counselor for support'
      ]
    },
    {
      title: 'Develop business-like communication',
      description: 'Treat communication with your co-parent like professional correspondence - polite, brief, and focused on children.',
      actionSteps: [
        'Stick to facts about schedules, school, health, and activities',
        'Use a neutral, respectful tone in all communications',
        'Respond to messages within a reasonable timeframe',
        'Keep messages brief and focused on the children'
      ],
      tips: [
        'Consider using co-parenting apps that help you stay organized and professional',
        'Save drafts and review them before sending to ensure a respectful tone'
      ]
    }
  ];

  const relationshipStrategies: Strategy[] = [
    {
      title: 'Create special one-on-one time',
      description: 'Regular, focused time with each child helps maintain strong bonds and provides emotional security.',
      actionSteps: [
        'Schedule regular one-on-one activities with each child',
        'Put away phones and give children your full attention',
        'Let children choose activities they enjoy',
        'Create new traditions and rituals in your home'
      ],
      tips: [
        'Even 15-20 minutes of focused attention can make a big difference',
        'Simple activities like cooking together or bedtime stories can be very meaningful'
      ]
    },
    {
      title: 'Listen actively and validate feelings',
      description: 'Children need to feel heard and understood, especially during times of family change.',
      actionSteps: [
        'Ask open-ended questions about their feelings and experiences',
        'Reflect back what you hear: "It sounds like you\'re feeling..."',
        'Avoid rushing to fix or minimize their feelings',
        'Share age-appropriate information when they ask questions'
      ],
      tips: [
        'Sometimes children just need to be heard, not to have their problems solved',
        'Validate feelings even when you can\'t change the situation'
      ]
    },
    {
      title: 'Maintain consistent routines and expectations',
      description: 'Predictability helps children feel secure when so much else in their lives is changing.',
      actionSteps: [
        'Keep regular bedtimes, meal times, and daily routines',
        'Maintain consistent rules and expectations in your home',
        'Communicate with your co-parent about major rules and routines',
        'Be flexible when needed, but maintain general structure'
      ],
      tips: [
        'Children often feel more secure when they know what to expect',
        'Some differences between homes are normal and okay'
      ]
    }
  ];

  const coParentingStrategies: Strategy[] = [
    {
      title: 'Support your children\'s relationship with their other parent',
      description: 'Children benefit when they feel loved and supported by both parents.',
      actionSteps: [
        'Encourage your children to enjoy their time with their other parent',
        'Help children prepare for transitions between homes',
        'Share positive information about what children did at the other home',
        'Be flexible when reasonable adjustments are needed'
      ],
      tips: [
        'Your children\'s happiness at their other home is a good thing, not a threat',
        'Supporting this relationship is one of the greatest gifts you can give your children'
      ]
    },
    {
      title: 'Coordinate important information',
      description: 'Keeping both parents informed helps children feel supported and avoids confusion.',
      actionSteps: [
        'Share information about school events, medical appointments, and activities',
        'Communicate about any behavioral or emotional concerns',
        'Discuss major decisions that affect the children',
        'Keep each other informed about changes in schedules or routines'
      ],
      tips: [
        'Consider using a shared calendar for important events and appointments',
        'Brief, factual updates work better than detailed explanations'
      ]
    },
    {
      title: 'Present a united front on important matters',
      description: 'When possible, coordinate on major rules, consequences, and decisions.',
      actionSteps: [
        'Discuss and agree on major household rules when possible',
        'Support each other\'s reasonable parenting decisions',
        'Avoid undermining the other parent\'s authority',
        'Work together on discipline for serious behavioral issues'
      ],
      tips: [
        'You don\'t need to agree on everything, but try to align on the big things',
        'If you disagree with a decision, discuss it privately with your co-parent, not with the children'
      ]
    }
  ];

  const StrategySection = ({ 
    id, 
    title, 
    icon: Icon, 
    strategies,
    description 
  }: { 
    id: string;
    title: string;
    icon: React.ElementType;
    strategies: Strategy[];
    description: string;
  }) => {
    const isExpanded = expandedSections.includes(id);
    
    return (
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors duration-200"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-sage-100 rounded-lg">
              <Icon className="text-sage-600" size={24} />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-medium text-slate-800">{title}</h3>
              <p className="text-sm text-slate-600 mt-1">{description}</p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronDown className="text-slate-400" size={20} />
          ) : (
            <ChevronRight className="text-slate-400" size={20} />
          )}
        </button>
        
        {isExpanded && (
          <div className="border-t border-slate-200 bg-slate-50 p-6">
            <div className="space-y-6">
              {strategies.map((strategy, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-lg p-6">
                  <h4 className="font-medium text-slate-800 mb-3">{strategy.title}</h4>
                  <p className="text-slate-700 text-sm mb-4">{strategy.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-slate-800 text-sm mb-2">Action steps:</h5>
                      <ul className="space-y-1">
                        {strategy.actionSteps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle size={16} className="text-sage-500 mt-0.5 flex-shrink-0" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {strategy.tips && (
                      <div>
                        <h5 className="font-medium text-slate-800 text-sm mb-2">Helpful tips:</h5>
                        <ul className="space-y-1">
                          {strategy.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="text-sm text-slate-600 italic flex items-start gap-2">
                              <span className="text-sage-500 mt-1">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Shield className="text-sage-600" size={32} />
          <h1 className="text-3xl font-semibold text-sage-800">Building resilience</h1>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          Research shows that children can thrive after their parents separate when certain protective 
          factors are in place. These strategies help create stability, security, and positive outcomes 
          for your family during and after this transition.
        </p>
      </div>

      {/* Introduction to Protective Factors */}
      <div className="bg-sage-50 border border-sage-200 rounded-lg p-6">
        <h2 className="text-xl font-medium text-sage-800 mb-4">Three key protective factors for children</h2>
        <div className="space-y-3 text-sage-700">
          <p className="flex items-start gap-2">
            <MessageCircle size={16} className="text-sage-600 mt-1 flex-shrink-0" />
            <span><strong>Reducing parental conflict:</strong> Keeping children away from adult disagreements and maintaining respectful communication.</span>
          </p>
          <p className="flex items-start gap-2">
            <Heart size={16} className="text-sage-600 mt-1 flex-shrink-0" />
            <span><strong>Maintaining strong parent-child relationships:</strong> Ensuring children feel loved, supported, and connected to both parents.</span>
          </p>
          <p className="flex items-start gap-2">
            <Users size={16} className="text-sage-600 mt-1 flex-shrink-0" />
            <span><strong>Practicing effective co-parenting:</strong> Working together as parents to support your children\'s wellbeing and development.</span>
          </p>
        </div>
        <div className="mt-4 p-3 bg-white border border-sage-300 rounded text-sm text-sage-800">
          <strong>Good news:</strong> Research consistently shows that when these factors are present, 
          children of separated parents do just as well as children from intact families. You have the power 
          to create these conditions for your children.
        </div>
      </div>

      {/* Strategy Sections */}
      <div className="space-y-4">
        <StrategySection
          id="conflict-reduction"
          title="Reducing parental conflict"
          icon={MessageCircle}
          description="Protecting children from adult conflicts and maintaining respectful interactions"
          strategies={conflictReductionStrategies}
        />

        <StrategySection
          id="parent-child-relationships"
          title="Maintaining strong parent-child relationships"
          icon={Heart}
          description="Nurturing your connection with your children and supporting their emotional needs"
          strategies={relationshipStrategies}
        />

        <StrategySection
          id="effective-coparenting"
          title="Practicing effective co-parenting"
          icon={Users}
          description="Working together as parents to support your children's wellbeing and development"
          strategies={coParentingStrategies}
        />
      </div>

      {/* Building Your Support System */}
      <div className="bg-calm-50 border border-calm-200 rounded-lg p-6">
        <h3 className="font-medium text-calm-800 mb-4">Building your own support system</h3>
        <p className="text-calm-700 mb-4 text-sm">
          Taking care of yourself is essential for being able to support your children effectively.
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="font-medium text-calm-800">Emotional support:</h4>
            <ul className="space-y-1 text-calm-700">
              <li>• Talk to a counselor or therapist</li>
              <li>• Join a support group for separated parents</li>
              <li>• Maintain friendships and family connections</li>
              <li>• Consider online communities for additional support</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-calm-800">Practical support:</h4>
            <ul className="space-y-1 text-calm-700">
              <li>• Build a network for childcare and emergencies</li>
              <li>• Connect with other single parents</li>
              <li>• Explore community resources and programs</li>
              <li>• Consider hiring help when possible and needed</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Self-Care Reminders */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-medium text-yellow-800 mb-3">Important reminders</h3>
        <div className="space-y-2 text-sm text-yellow-800">
          <p>• <strong>Progress, not perfection:</strong> You don't need to be perfect. Small improvements make a big difference.</p>
          <p>• <strong>It takes time:</strong> Healing and adjustment happen gradually. Be patient with yourself and your children.</p>
          <p>• <strong>Focus on what you can control:</strong> You can control your own actions and responses, but not your co-parent's.</p>
          <p>• <strong>Celebrate small wins:</strong> Acknowledge when you handle difficult situations well or when your children show resilience.</p>
          <p>• <strong>Ask for help:</strong> Seeking support is a sign of strength, not weakness.</p>
          <p>• <strong>Your wellbeing matters:</strong> Taking care of yourself isn't selfish - it's necessary for taking care of your children.</p>
        </div>
      </div>

      {/* Looking Forward */}
      <div className="text-center pt-6 space-y-4">
        <h3 className="text-xl font-medium text-slate-800">Moving forward</h3>
        <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto">
          While this transition is challenging, it's also an opportunity to create a new kind of family - 
          one that may look different but can be just as loving, supportive, and strong. Many families 
          find that with time, intention, and effort, they build even stronger relationships and greater 
          resilience than they had before.
        </p>
        <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto">
          Taking time to learn about effective co-parenting and seeking guidance when needed 
          will benefit your children both now and in the future.
        </p>
      </div>
    </div>
  );
};

export default Resilience;
