import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CheckCircle2, ArrowRight, Users, Scale, Calculator, Heart, FileText, ShieldCheck, Phone, AlertTriangle } from 'lucide-react';

interface AssessmentQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    value: string;
    description?: string;
  }[];
}

interface AssessmentResult {
  primaryRecommendation: {
    title: string;
    description: string;
    section: string;
    color: string;
  };
  secondaryRecommendations: {
    title: string;
    section: string;
  }[];
  explanation: string;
}

interface InitialAssessmentProps {
  onComplete?: (recommendations: AssessmentResult) => void; // This might be removable if results are self-contained
  onNavigate: (section: string) => void;
}

const InitialAssessment: React.FC<InitialAssessmentProps> = ({ onComplete, onNavigate }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);

  // Using a stable, memoized version of questions
  const questions: AssessmentQuestion[] = React.useMemo(() => [
    {
      id: 'status',
      question: 'Where are you in your journey?',
      options: [
        { text: 'Just exploring options', value: 'considering', description: 'You\'re gathering information but haven\'t made firm decisions.' },
        { text: 'Preparing for separation', value: 'decided', description: 'You\'ve decided to move forward and need to know what to do next.' },
        { text: 'In an unsafe situation', value: 'safety', description: 'Your immediate safety is the primary concern.' },
        { text: 'Already divorced', value: 'divorced', description: 'You\'re looking for help with post-divorce life.' },
      ],
    },
    {
      id: 'priority',
      question: 'What\'s most on your mind right now?',
      options: [
        { text: 'My children and co-parenting', value: 'children' },
        { text: 'Financial stability and assets', value: 'financial' },
        { text: 'The legal process itself', value: 'legal' },
        { text: 'Emotional well-being', value: 'emotional' },
        { text: 'Getting organized', value: 'organization' },
      ],
    },
    {
      id: 'communication',
      question: 'How is communication with your spouse?',
      options: [
        { text: 'Productive and respectful', value: 'safe' },
        { text: 'Tense but manageable', value: 'neutral' },
        { text: 'Difficult and high-conflict', value: 'somewhat-unsafe' },
        { text: 'I feel unsafe communicating', value: 'unsafe' },
      ],
    },
  ], []);

  const calculateRecommendations = useCallback((): AssessmentResult => {
    const status = answers.status;
    const priority = answers.priority;
    const communication = answers.communication;

    // Safety first
    if (status === 'safety' || communication === 'unsafe') {
      return {
        primaryRecommendation: {
          title: 'Your Safety Is the Only Priority Right Now',
          description: "If you're in immediate danger, call 911. Use the Quick Escape button (top right) to leave this site instantly. All other planning can wait until you're safe.",
          section: 'emotional-toolkit',
          color: 'red'
        },
        secondaryRecommendations: [
          { title: 'Find Legal Aid & DV Support', section: 'resources' },
          { title: 'Understand Protective Orders', section: 'legal-paths' }
        ],
        explanation: "Your safety is paramount. Every other resource in this app is secondary to getting you to a safe place with professional support."
      };
    }

    // Legal guidance for those just starting to consider options
    if (status === 'considering' || priority === 'legal') {
      return {
        primaryRecommendation: {
          title: 'Understand Your Legal Options',
          description: 'Compare the different paths for ending a marriage in Ohio (Divorce vs. Dissolution) to see which might be right for you.',
          section: 'legal-paths',
          color: 'blue'
        },
        secondaryRecommendations: [
          { title: 'See a Financial Snapshot', section: 'understanding-money' },
          { title: 'Review the Document Checklist', section: 'document-checklist' }
        ],
        explanation: 'Understanding your legal options is a powerful first step. It provides the framework for all other decisions.'
      };
    }

    // Financial focus
    if (priority === 'financial') {
      return {
        primaryRecommendation: {
          title: 'Build Financial Clarity',
          description: 'Use these tools to estimate support, divide assets, and plan your post-divorce budget. Get a clear view of your finances.',
          section: 'understanding-money',
          color: 'green'
        },
        secondaryRecommendations: [
          { title: 'Plan for Asset Division', section: 'asset-division-tool' },
          { title: 'Estimate Spousal & Child Support', section: 'child-support-calculator' }
        ],
        explanation: 'A clear financial picture reduces conflict and empowers you to negotiate effectively for your future.'
      };
    }

    // Emotional support
    if (priority === 'emotional') {
      return {
        primaryRecommendation: {
          title: 'Prioritize Emotional Well-being',
          description: 'This is a stressful process. Find professional support, coping strategies, and resources to manage the emotional impact.',
          section: 'emotional-toolkit',
          color: 'orange'
        },
        secondaryRecommendations: [
          { title: 'Find Therapists and Support Groups', section: 'resources' },
          { title: 'Practice Resilience Strategies', section: 'resilience' }
        ],
        explanation: 'Taking care of your emotional well-being is essential. It provides the stability needed to navigate every other challenge.'
      };
    }

    // Organization focus
    if (priority === 'organization' || status === 'decided') {
      return {
        primaryRecommendation: {
          title: 'Get Organized for the Path Ahead',
          description: "Stay on top of deadlines, documents, and tasks. A clear system reduces stress and ensures you don\'t miss anything important.",
          section: 'document-checklist',
          color: 'purple'
        },
        secondaryRecommendations: [
          { title: 'Create a Separation Timeline', section: 'timeline' },
          { title: 'Use Communication Templates', section: 'communication-templates' }
        ],
        explanation: "Feeling organized builds confidence and helps you manage the complexities of the legal process."
      };
    }

    // Children/co-parenting focus
    if (priority === 'children') {
      return {
        primaryRecommendation: {
          title: 'Center the Children\'s Needs',
          description: 'Explore parenting time arrangements, create a parenting plan, and use communication strategies that prioritize your children’s well-being.',
          section: 'children',
          color: 'teal'
        },
        secondaryRecommendations: [
          { title: 'Calculate Child Support', section: 'child-support-calculator' },
          { title: 'Build a Co-Parenting Calendar', section: 'co-parenting-calendar' }
        ],
        explanation: 'A thoughtful, child-focused parenting plan can create stability for your children and reduce future conflict.'
      };
    }

    // Default recommendation
    return {
      primaryRecommendation: {
        title: 'Explore Your Dashboard',
        description: "Get an overview of all available tools and track your progress across different areas.",
        section: 'dashboard',
        color: 'neutral'
      },
      secondaryRecommendations: [
        { title: 'Understand Legal Paths', section: 'legal-paths' },
        { title: 'Build Financial Clarity', section: 'understanding-money' }
      ],
      explanation: "Not sure where to start? The dashboard gives you a bird's-eye view of all the resources available to you."
    };
  }, [answers]);

  // This useEffect handles the completion event. 
  // It's kept in case a parent component needs to react to the assessment finishing.
  useEffect(() => {
    if (showResults && onComplete) {
      const results = calculateRecommendations();
      onComplete(results);
    }
  }, [showResults, onComplete, calculateRecommendations]);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  // This is a stable, memoized version of the results, preventing recalculation on every render.
  const results = useMemo(() => {
    if (!showResults) return null;
    return calculateRecommendations();
  }, [showResults, calculateRecommendations]);

  if (showResults && results) {
    // Special safety-focused results layout
    if (results.primaryRecommendation.title === 'Your Safety Is the Only Priority Right Now') {
      return (
        <div className="max-w-4xl mx-auto p-8 space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <ShieldCheck className="text-red-600 mx-auto mb-4" size={56} />
            <h1 className="text-4xl font-bold text-red-900">{results.primaryRecommendation.title}</h1>
            <p className="text-xl text-red-800 font-medium">{results.primaryRecommendation.description}</p>
          </div>

          {/* Immediate Crisis Information */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-red-900 text-center mb-6">Immediate Help</h2>
            
            {/* Emergency Numbers */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-red-200 rounded-lg p-6 text-center">
                <Phone className="text-red-600 mx-auto mb-3" size={32} />
                <h3 className="font-bold text-red-900 mb-2">National DV Hotline</h3>
                <a href="tel:1-800-799-7233" className="text-2xl font-bold text-red-600 hover:text-red-800 transition-colors">
                  1-800-799-7233
                </a>
                <p className="text-sm text-red-700 mt-2">24/7 • Free • Confidential</p>
              </div>
              
              <div className="bg-white border border-red-200 rounded-lg p-6 text-center">
                <Phone className="text-red-600 mx-auto mb-3" size={32} />
                <h3 className="font-bold text-red-900 mb-2">Ohio DV Network</h3>
                <a href="tel:1-800-934-9840" className="text-2xl font-bold text-red-600 hover:text-red-800 transition-colors">
                  1-800-934-9840
                </a>
                <p className="text-sm text-red-700 mt-2">Ohio-specific resources</p>
              </div>
            </div>

            {/* Quick Escape Reminder */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <AlertTriangle className="text-yellow-600 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-yellow-900 mb-2">Quick Escape Available</h3>
              <p className="text-yellow-800">See the "Quick escape" button in the top-right corner? Click it to instantly leave this site and clear your browsing history.</p>
            </div>

            {/* Additional Safety Resources */}
            <div className="pt-6 border-t border-red-200">
              <h3 className="font-bold text-red-900 mb-4 text-center">When You're Ready</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {results.secondaryRecommendations.map((rec) => (
                  <button 
                    key={rec.section} 
                    onClick={() => onNavigate(rec.section)}
                    className="p-4 bg-white border border-red-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition-colors text-left"
                  >
                    <p className="font-medium text-red-800">{rec.title}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 pt-6">
            <button
              onClick={resetAssessment}
              className="px-6 py-2 border border-red-300 rounded-lg hover:bg-red-100 transition-colors font-medium text-red-700"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      );
    }

    // TailwindCSS: Map colors to full class names to prevent purging in production
    const colorMap = {
      red: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        iconBg: 'bg-red-100',
        iconText: 'text-red-600',
        titleText: 'text-red-900',
        descriptionText: 'text-red-800',
        button: 'bg-red-600',
        buttonHover: 'hover:bg-red-700',
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        iconBg: 'bg-blue-100',
        iconText: 'text-blue-600',
        titleText: 'text-blue-900',
        descriptionText: 'text-blue-800',
        button: 'bg-blue-600',
        buttonHover: 'hover:bg-blue-700',
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        iconBg: 'bg-green-100',
        iconText: 'text-green-600',
        titleText: 'text-green-900',
        descriptionText: 'text-green-800',
        button: 'bg-green-600',
        buttonHover: 'hover:bg-green-700',
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        iconBg: 'bg-purple-100',
        iconText: 'text-purple-600',
        titleText: 'text-purple-900',
        descriptionText: 'text-purple-800',
        button: 'bg-purple-600',
        buttonHover: 'hover:bg-purple-700',
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        iconBg: 'bg-orange-100',
        iconText: 'text-orange-600',
        titleText: 'text-orange-900',
        descriptionText: 'text-orange-800',
        button: 'bg-orange-600',
        buttonHover: 'hover:bg-orange-700',
      },
      teal: {
        bg: 'bg-teal-50',
        border: 'border-teal-200',
        iconBg: 'bg-teal-100',
        iconText: 'text-teal-600',
        titleText: 'text-teal-900',
        descriptionText: 'text-teal-800',
        button: 'bg-teal-600',
        buttonHover: 'hover:bg-teal-700',
      },
      neutral: {
        bg: 'bg-neutral-50',
        border: 'border-neutral-200',
        iconBg: 'bg-neutral-100',
        iconText: 'text-neutral-600',
        titleText: 'text-neutral-900',
        descriptionText: 'text-neutral-800',
        button: 'bg-neutral-600',
        buttonHover: 'hover:bg-neutral-700',
      }
    };
    const theme = colorMap[results.primaryRecommendation.color as keyof typeof colorMap] || colorMap.neutral;

    return (
      <div className="max-w-4xl mx-auto p-8 space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <CheckCircle2 className="text-green-600 mx-auto mb-4" size={48} />
          <h1 className="text-3xl font-semibold text-neutral-800">Your Custom Roadmap</h1>
          <p className="text-neutral-600">Based on your responses, here is a recommended starting point for clarity and confidence:</p>
        </div>

        {/* Primary recommendation */}
        <div className={`${theme.bg} border ${theme.border} rounded-xl p-8`}>
          <div className="flex items-start gap-6">
            <div className={`w-16 h-16 ${theme.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              {(() => {
                const title = results.primaryRecommendation.title;
                let IconComponent = CheckCircle2; // Default
                if (title.includes('Safety')) IconComponent = ShieldCheck;
                else if (title.includes('Legal')) IconComponent = Scale;
                else if (title.includes('Financial') || title.includes('Money')) IconComponent = Calculator;
                else if (title.includes('Emotional') || title.includes('Well-being')) IconComponent = Heart;
                else if (title.includes('Organized') || title.includes('Document')) IconComponent = FileText;
                else if (title.includes('Children') || title.includes('Co-parenting')) IconComponent = Users;
                else if (title.includes('Dashboard')) IconComponent = CheckCircle2;
                return <IconComponent className={`${theme.iconText}`} size={32} />;
              })()}
            </div>
            <div className="space-y-4">
              <h2 className={`text-2xl font-semibold ${theme.titleText}`}>
                {results.primaryRecommendation.title}
              </h2>
              <p className={`${theme.descriptionText} leading-relaxed`}>
                {results.primaryRecommendation.description}
              </p>
              <button 
                onClick={() => onNavigate(results.primaryRecommendation.section)}
                className={`${theme.button} text-white px-6 py-3 rounded-lg ${theme.buttonHover} transition-colors font-semibold inline-flex items-center gap-2 shadow-sm`}
              >
                Go to Section
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
          <h3 className="font-semibold text-neutral-800 mb-2">Why this recommendation?</h3>
          <p className="text-neutral-700 leading-relaxed">{results.explanation}</p>
        </div>

        {/* Secondary recommendations */}
        <div className="space-y-4">
          <h3 className="font-semibold text-neutral-800">Other helpful next steps:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {results.secondaryRecommendations.map((rec) => (
              <button 
                key={rec.section} 
                onClick={() => onNavigate(rec.section)}
                className="p-4 bg-white border border-neutral-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer text-left group"
              >
                <p className="font-medium text-blue-800 group-hover:text-blue-900">{rec.title}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 pt-6">
          <button
            onClick={resetAssessment}
            className="px-6 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors font-medium text-neutral-700"
          >
            Retake Assessment
          </button>
          <button 
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Explore All Tools
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-semibold text-neutral-800">Create Your Roadmap</h1>
        <p className="text-lg text-neutral-600">Answer 3 questions to get a personalized starting point.</p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-center space-x-2">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index <= currentQuestion ? 'bg-blue-600' : 'bg-neutral-300'
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-neutral-800 mb-6 text-center">
          {currentQ.question}
        </h2>
        
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value)}
              className="w-full p-5 text-left border-2 border-neutral-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-all duration-150 ease-in-out"
            >
              <div>
                <p className="font-semibold text-neutral-800 text-lg">{option.text}</p>
                {option.description && (
                  <p className="text-sm text-neutral-600 mt-1">{option.description}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="px-6 py-2 border border-neutral-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
        >
          Previous
        </button>
        
        <p className="text-sm text-neutral-500">
          Question {currentQuestion + 1} of {questions.length}
        </p>
        
        <div className="w-24"></div>
      </div>
    </div>
  );
};

export default InitialAssessment;
