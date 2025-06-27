import React from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface FormErrorProps {
  message: string;
  type?: 'error' | 'warning' | 'info' | 'success';
}

interface FormFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'email' | 'tel';
  placeholder?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  min?: number;
  max?: number;
}

export const FormError: React.FC<FormErrorProps> = ({ message, type = 'error' }) => {
  const styles = {
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800'
  };

  const icons = {
    error: <AlertCircle size={20} className="text-red-600" />,
    warning: <AlertCircle size={20} className="text-amber-600" />,
    info: <Info size={20} className="text-blue-600" />,
    success: <CheckCircle2 size={20} className="text-green-600" />
  };

  return (
    <div className={`flex items-start gap-3 p-4 border rounded-lg ${styles[type]}`}>
      {icons[type]}
      <p className="text-sm leading-relaxed">{message}</p>
    </div>
  );
};

export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  error,
  helpText,
  min,
  max
}) => {
  const hasError = Boolean(error);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          hasError 
            ? 'border-red-300 bg-red-50' 
            : 'border-slate-300'
        }`}
      />
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p className="text-sm text-slate-500">{helpText}</p>
      )}
    </div>
  );
};

// Validation utilities
export const validateIncome = (income: number): string | null => {
  if (income < 0) return 'Income cannot be negative';
  if (income > 1000000) return 'Please enter a realistic income amount';
  return null;
};

export const validateOvernights = (nights: number): string | null => {
  if (nights < 0) return 'Overnight stays cannot be negative';
  if (nights > 365) return 'Cannot exceed 365 nights per year';
  return null;
};

export const validateChildrenCount = (count: number): string | null => {
  if (count < 1) return 'Must have at least 1 child';
  if (count > 10) return 'Please contact a professional for complex situations';
  return null;
};
