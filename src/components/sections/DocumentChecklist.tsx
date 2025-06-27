import React, { useState } from 'react';
import { CheckSquare, FileText, Download, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface DocumentCategory {
  category: string;
  required: boolean;
  documents: {
    name: string;
    required: boolean;
    condition?: string;
    tips?: string;
    completed?: boolean;
  }[];
}

const DocumentChecklist: React.FC = () => {
  const [userProfile, setUserProfile] = useState({
    hasChildren: null as boolean | null,
    isSelfEmployed: false,
    hasRetirement: false,
    ownsProperty: false,
    hasBusinesses: false,
    isHighAssetCase: false
  });

  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const handleCheckboxChange = (documentName: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(documentName)) {
        newSet.delete(documentName);
      } else {
        newSet.add(documentName);
      }
      return newSet;
    });
  };

  const generateDocumentList = (): DocumentCategory[] => {
    const categories: DocumentCategory[] = [
      {
        category: "Court Filing Documents",
        required: true,
        documents: [
          {
            name: "Complaint for Divorce",
            required: true,
            tips: "Filed in the county where either spouse has lived for at least 90 days"
          },
          {
            name: "Summons",
            required: true,
            tips: "Must be properly served on your spouse"
          },
          {
            name: "Case Information Sheet",
            required: true,
            tips: "Required in all Ohio domestic relations cases"
          }
        ]
      },
      {
        category: "Financial Documentation",
        required: true,
        documents: [
          {
            name: "Last 3 years of tax returns",
            required: true,
            tips: "Both personal and business returns if applicable"
          },
          {
            name: "Last 6 months of pay stubs",
            required: true,
            condition: userProfile.isSelfEmployed ? "or profit/loss statements if self-employed" : undefined
          },
          {
            name: "Bank statements (all accounts, last 12 months)",
            required: true,
            tips: "Checking, savings, money market, CDs"
          },
          {
            name: "Credit card statements (last 12 months)",
            required: true,
            tips: "All cards, including business cards used personally"
          },
          {
            name: "Investment account statements",
            required: false,
            tips: "Stocks, bonds, mutual funds, brokerage accounts"
          },
          {
            name: "Retirement account statements",
            required: userProfile.hasRetirement,
            condition: "if you have 401k, IRA, pension, or other retirement accounts",
            tips: "Include most recent annual statements and quarterly statements"
          }
        ]
      },
      {
        category: "Property and Asset Documentation",
        required: true,
        documents: [
          {
            name: "Real estate deeds",
            required: userProfile.ownsProperty,
            condition: "if you own property",
            tips: "For primary residence and any rental or investment properties"
          },
          {
            name: "Property appraisals or recent tax assessments",
            required: userProfile.ownsProperty,
            condition: "if you own property"
          },
          {
            name: "Mortgage statements",
            required: userProfile.ownsProperty,
            condition: "if you have a mortgage"
          },
          {
            name: "Vehicle titles and registration",
            required: true,
            tips: "Cars, trucks, motorcycles, boats, RVs"
          },
          {
            name: "Insurance policies",
            required: true,
            tips: "Life, health, auto, homeowner's/renter's, disability"
          }
        ]
      }
    ];

    // Add children-specific documents
    if (userProfile.hasChildren) {
      categories.push({
        category: "Child-Related Documents",
        required: true,
        documents: [
          {
            name: "Birth certificates for all children",
            required: true,
            tips: "Certified copies from the state vital records office"
          },
          {
            name: "School records",
            required: true,
            tips: "Current enrollment, grades, special needs documentation"
          },
          {
            name: "Medical records and insurance information",
            required: true,
            tips: "Pediatrician records, specialists, current medications"
          },
          {
            name: "Childcare expense documentation",
            required: false,
            tips: "Daycare, after-school care, summer camps"
          },
          {
            name: "Parenting class completion certificate",
            required: true,
            tips: "Required by Ohio courts when children are involved"
          }
        ]
      });
    }

    // Add business documentation if applicable
    if (userProfile.hasBusinesses) {
      categories.push({
        category: "Business Documentation",
        required: true,
        documents: [
          {
            name: "Business tax returns (3 years)",
            required: true,
            tips: "All business entities you own or have interest in"
          },
          {
            name: "Business financial statements",
            required: true,
            tips: "Profit & loss, balance sheet, cash flow statements"
          },
          {
            name: "Business valuation",
            required: false,
            tips: "Professional appraisal may be needed for division purposes"
          },
          {
            name: "Partnership/corporate agreements",
            required: true,
            tips: "Operating agreements, shareholder agreements, etc."
          }
        ]
      });
    }

    return categories;
  };

  const documentList = generateDocumentList();

  const totalDocuments = documentList.reduce((acc, category) => acc + category.documents.length, 0);
  const completedDocuments = checkedItems.size;
  const progress = totalDocuments > 0 ? (completedDocuments / totalDocuments) * 100 : 0;

  const renderQuestionnaire = () => (
    <div className="bg-neutral-100 p-6 rounded-lg border border-neutral-200 mb-8">
      <h3 className="text-lg font-semibold text-sage-900 mb-4">Personalize Your Checklist</h3>
      <div className="space-y-4">
        <div>
          <Label className="font-semibold">Do you have minor children from this marriage?</Label>
          <RadioGroup
            value={userProfile.hasChildren === null ? 'null' : String(userProfile.hasChildren)}
            onValueChange={(value) => setUserProfile(p => ({ ...p, hasChildren: value === 'null' ? null : value === 'true' }))}
            className="flex items-center gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="children-yes" />
              <Label htmlFor="children-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="children-no" />
              <Label htmlFor="children-no">No</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="self-employed-switch" className="font-semibold">Are you or your spouse self-employed?</Label>
          <Switch id="self-employed-switch" checked={userProfile.isSelfEmployed} onCheckedChange={(checked) => setUserProfile(p => ({ ...p, isSelfEmployed: checked }))} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="retirement-switch" className="font-semibold">Do you or your spouse have retirement accounts (401k, IRA, Pension)?</Label>
          <Switch id="retirement-switch" checked={userProfile.hasRetirement} onCheckedChange={(checked) => setUserProfile(p => ({ ...p, hasRetirement: checked }))} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="property-switch" className="font-semibold">Do you or your spouse own real estate?</Label>
          <Switch id="property-switch" checked={userProfile.ownsProperty} onCheckedChange={(checked) => setUserProfile(p => ({ ...p, ownsProperty: checked }))} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="business-switch" className="font-semibold">Do you or your spouse have ownership in a business?</Label>
          <Switch id="business-switch" checked={userProfile.hasBusinesses} onCheckedChange={(checked) => setUserProfile(p => ({ ...p, hasBusinesses: checked }))} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-4">
        <FileText className="w-8 h-8 text-sage-600" />
        <div>
          <h2 className="text-2xl font-bold text-sage-900">Personalized Document Checklist</h2>
          <p className="text-neutral-600">A tailored list of documents you'll likely need for your Ohio divorce case.</p>
        </div>
      </div>

      {renderQuestionnaire()}

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-sage-800">Checklist Progress</span>
          <span className="text-sm font-bold text-sage-900">{completedDocuments} / {totalDocuments} items</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      <div className="space-y-8">
        {documentList.map((category) => (
          <div key={category.category}>
            <h3 className="text-xl font-semibold text-sage-800 border-b-2 border-sage-200 pb-2 mb-4">{category.category}</h3>
            <ul className="space-y-4">
              {category.documents.map((doc) => (
                <li key={doc.name} className="flex items-start p-4 rounded-lg bg-neutral-50 border border-neutral-200 transition-colors hover:bg-neutral-100">
                  <input
                    type="checkbox"
                    id={doc.name}
                    checked={checkedItems.has(doc.name)}
                    onChange={() => handleCheckboxChange(doc.name)}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-sage-600 focus:ring-sage-500 cursor-pointer"
                  />
                  <div className="ml-4 flex-1">
                    <label htmlFor={doc.name} className="font-semibold text-neutral-800 cursor-pointer">{doc.name}</label>
                    {doc.condition && <p className="text-sm text-neutral-500 italic">{doc.condition}</p>}
                    {doc.tips && <p className="text-sm text-sage-700 mt-1"><strong>Tip:</strong> {doc.tips}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentChecklist;
