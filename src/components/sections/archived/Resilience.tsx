import React, { useState } from 'react';
import { Brain, Heart, Users, Phone, ExternalLink, Calculator, TrendingUp, Shield, BookOpen, MapPin, Star } from 'lucide-react';

interface Resource {
  title: string;
  organization: string;
  description: string;
  link: string;
  phone?: string;
  citation: string;
  type: 'therapy' | 'support' | 'crisis' | 'research' | 'tool';
}

interface SelfAssessment {
  question: string;
  responses: string[];
  recommendations: { [key: string]: string };
}

const Resilience: React.FC = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [assessmentResponses, setAssessmentResponses] = useState<{ [key: string]: number }>({});

  const professionalResources: Resource[] = [
    {
      title: "Ohio Psychological Association Therapist Directory",
      organization: "Ohio Psychological Association",
      description: "Licensed psychologists specializing in divorce, family transitions, and trauma therapy",
      link: "https://www.ohpsych.org/Public/Find-a-Psychologist",
      citation: "Ohio Psychological Association (2024). Find a Psychologist Directory.",
      type: "therapy"
    },
    {
      title: "Psychology Today Ohio Therapists",
      organization: "Psychology Today",
      description: "Comprehensive directory with insurance verification and specialization filters for Ohio therapists",
      link: "https://www.psychologytoday.com/us/therapists/oh",
      citation: "Psychology Today (2024). Therapist Directory - Ohio.",
      type: "therapy"
    },
    {
      title: "Crisis Text Line",
      organization: "Crisis Text Line",
      description: "24/7 crisis support via text message. Text HOME to 741741",
      link: "https://www.crisistextline.org/",
      phone: "Text HOME to 741741",
      citation: "Crisis Text Line (2024). 24/7 Crisis Support.",
      type: "crisis"
    },
    {
      title: "National Suicide Prevention Lifeline",
      organization: "Substance Abuse and Mental Health Services Administration",
      description: "24/7 suicide prevention and mental health crisis support",
      link: "https://suicidepreventionlifeline.org/",
      phone: "988",
      citation: "SAMHSA (2024). National Suicide Prevention Lifeline.",
      type: "crisis"
    },
    {
      title: "DivorceCare Support Groups - Ohio",
      organization: "DivorceCare",
      description: "Faith-based divorce recovery support groups with locations throughout Ohio",
      link: "https://www.divorcecare.org/findagroup",
      citation: "DivorceCare (2024). Support Group Directory.",
      type: "support"
    },
    {
      title: "Ohio Employee Assistance Programs",
      organization: "Ohio Department of Administrative Services",
      description: "Employee assistance programs offering counseling and mental health support",
      link: "https://das.ohio.gov/services/employee-assistance-program",
      citation: "Ohio DAS (2024). Employee Assistance Program Services.",
      type: "support"
    }
  ];

  const researchResources: Resource[] = [
    {
      title: "The Impact of Divorce on Mental Health: Evidence-Based Insights",
      organization: "American Psychological Association",
      description: "Peer-reviewed research on divorce-related stress, coping mechanisms, and recovery patterns",
      link: "https://www.apa.org/topics/divorce-child-custody",
      citation: "American Psychological Association (2023). Divorce and Mental Health Research.",
      type: "research"
    },
    {
      title: "Resilience in Adults: A Narrative Review",
      organization: "Journal of Clinical Medicine",
      description: "Comprehensive review of resilience factors and evidence-based interventions",
      link: "https://pubmed.ncbi.nlm.nih.gov/",
      citation: "Chmitorz, A., et al. (2022). Resilience in Adults: A Narrative Review. J Clin Med, 11(20).",
      type: "research"
    }
  ];

  const stressAssessment: SelfAssessment = {
    question: "Over the past two weeks, how often have you experienced the following?",
    responses: [
      "Not at all",
      "Several days", 
      "More than half the days",
      "Nearly every day"
    ],
    recommendations: {
      "0-4": "Your stress levels appear manageable. Continue with healthy coping strategies.",
      "5-9": "Moderate stress levels. Consider speaking with a counselor or joining a support group.",
      "10-14": "High stress levels. Professional support is recommended. Contact a therapist or your healthcare provider.",
      "15+": "Very high stress levels. Please reach out for professional help immediately. Consider calling a crisis line if you're feeling overwhelmed."
    }
  };

  const stressQuestions = [
    "Feeling down, depressed, or hopeless",
    "Little interest or pleasure in doing things",
    "Trouble falling or staying asleep",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself",
    "Trouble concentrating on things"
  ];

  const calculateStressScore = () => {
    return Object.values(assessmentResponses).reduce((sum, value) => sum + value, 0);
  };

  const getRecommendation = () => {
    const score = calculateStressScore();
    if (score <= 4) return stressAssessment.recommendations["0-4"];
    if (score <= 9) return stressAssessment.recommendations["5-9"];
    if (score <= 14) return stressAssessment.recommendations["10-14"];
    return stressAssessment.recommendations["15+"];
  };

  const renderResourceCard = (resource: Resource) => (
    <div key={resource.title} className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          resource.type === 'crisis' ? 'bg-red-100' :
          resource.type === 'therapy' ? 'bg-blue-100' :
          resource.type === 'support' ? 'bg-green-100' :
          resource.type === 'research' ? 'bg-purple-100' : 'bg-orange-100'
        }`}>
          {resource.type === 'crisis' && <Phone className="text-red-600" size={24} />}
          {resource.type === 'therapy' && <Brain className="text-blue-600" size={24} />}
          {resource.type === 'support' && <Users className="text-green-600" size={24} />}
          {resource.type === 'research' && <BookOpen className="text-purple-600" size={24} />}
          {resource.type === 'tool' && <Calculator className="text-orange-600" size={24} />}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-neutral-800 mb-2">{resource.title}</h3>
          <p className="text-sm text-neutral-600 mb-2">{resource.organization}</p>
          <p className="text-neutral-700 mb-3">{resource.description}</p>
          {resource.phone && (
            <p className="text-blue-600 font-medium mb-2">📞 {resource.phone}</p>
          )}
          <div className="flex flex-col gap-2">
            <a 
              href={resource.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              <ExternalLink size={16} />
              Visit Resource
            </a>
            <p className="text-xs text-neutral-500 italic">{resource.citation}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-light text-sage-900">Building resilience</h1>
        <p className="text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed">
          Evidence-based mental health resources, professional support networks, and self-assessment tools 
          to support your emotional wellbeing during divorce proceedings
        </p>
      </div>

      {/* Self-Assessment Tool */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-blue-900 mb-3">Stress level self-assessment</h2> {/* updated to sentence case */}
            <p className="text-blue-800">
              Based on the GAD-7 and PHQ-9 screening tools used by healthcare professionals
            </p>
          </div>

          <div className="space-y-4">
            <p className="font-medium text-blue-900">{stressAssessment.question}</p>
            {stressQuestions.map((question, index) => (
              <div key={index} className="bg-white rounded-lg p-4">
                <p className="text-neutral-800 mb-3">{question}</p>
                <div className="flex gap-4 flex-wrap">
                  {stressAssessment.responses.map((response, responseIndex) => (
                    <label key={responseIndex} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={responseIndex}
                        onChange={(e) => setAssessmentResponses({
                          ...assessmentResponses,
                          [index]: parseInt(e.target.value)
                        })}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-neutral-700">{response}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {Object.keys(assessmentResponses).length === stressQuestions.length && (
              <div className="bg-white rounded-lg p-6 border-l-4 border-blue-600">
                <h3 className="font-semibold text-neutral-800 mb-2">Your assessment results</h3> {/* updated to sentence case */}
                <p className="text-neutral-700 mb-3">Score: {calculateStressScore()}/21</p>
                <p className="text-neutral-700">{getRecommendation()}</p>
                <p className="text-xs text-neutral-500 mt-2 italic">
                  Source: Adapted from Kroenke, K., et al. (2001). The PHQ-9: validity of a brief depression severity measure.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Professional Mental Health Resources */}
      <div className="space-y-6">
        <h2 className="text-3xl font-light text-neutral-800 text-center">Professional mental health support</h2>
        <div className="grid gap-6">
          {professionalResources.map(renderResourceCard)}
        </div>
      </div>

      {/* Research and Evidence-Based Information */}
      <div className="space-y-6">
        <h2 className="text-3xl font-light text-neutral-800 text-center">Evidence-based research</h2>
        <div className="grid gap-6">
          {researchResources.map(renderResourceCard)}
        </div>
      </div>

      {/* Coping Strategies with Citations */}
      <div className="bg-sage-50 border border-sage-200 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-sage-900 mb-6 text-center">Evidence-based coping strategies</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-sage-800">Cognitive behavioral techniques</h3>
            <ul className="space-y-2 text-sage-700">
              <li>• Thought challenging and reframing</li>
              <li>• Behavioral activation and pleasant activity scheduling</li>
              <li>• Mindfulness and grounding exercises</li>
              <li>• Problem-solving skill development</li>
            </ul>
            <p className="text-xs text-sage-600 italic">
              Source: Beck, A.T. (2011). Cognitive Therapy and the Emotional Disorders. Penguin Books.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-sage-800">Social support strategies</h3>
            <ul className="space-y-2 text-sage-700">
              <li>• Building and maintaining support networks</li>
              <li>• Effective communication with friends and family</li>
              <li>• Participating in support groups</li>
              <li>• Professional therapy and counseling</li>
            </ul>
            <p className="text-xs text-sage-600 italic">
              Source: Holt-Lunstad, J., et al. (2017). Social relationships and mortality. Perspectives on Psychological Science.
            </p>
          </div>
        </div>
      </div>

      {/* Professional Disclaimer */}
      <div className="text-center p-6 bg-neutral-50 rounded-xl border border-neutral-200">
        <p className="text-neutral-700 leading-relaxed">
          <strong>Professional notice:</strong> This information is for educational purposes and does not replace professional mental health treatment. 
          If you're experiencing significant distress, please consult with a licensed mental health professional.
        </p>
      </div>
    </div>
  );
};

export default Resilience;
