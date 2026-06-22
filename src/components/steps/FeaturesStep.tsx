import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckSquare, Square, Sparkle, WarningCircle } from '@phosphor-icons/react';
import { DomainType } from '@/lib/types';
import { DOMAINS } from '@/lib/form-config';

interface FeaturesStepProps {
  values: string[];
  onChange: (values: string[]) => void;
  selectedDomain: DomainType | null;
}

interface GeneratedFeature {
  id: string;
  label: string;
}

export function FeaturesStep({ values, onChange, selectedDomain }: FeaturesStepProps) {
  const [features, setFeatures] = useState<GeneratedFeature[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDomain) {
      generateFeatures(selectedDomain);
    }
  }, [selectedDomain]);

  const generateFeatures = async (domain: DomainType) => {
    setIsLoading(true);
    setError(null);

    try {
      const domainInfo = DOMAINS.find(d => d.value === domain);
      const domainLabel = domainInfo?.label || domain;

      const promptText = `You are a product requirements expert. Generate a comprehensive list of exactly 30 common features for a ${domainLabel} application (${domain} domain).

Return the result as a valid JSON object with a single property called "features" that contains an array of feature objects.

Each feature object must have:
- id: a unique kebab-case identifier (e.g., "user-authentication")
- label: a clear, descriptive feature name (e.g., "User Authentication & Login")

Focus on features that are:
1. Specific to the ${domainLabel} industry
2. Commonly requested in modern applications
3. Ranging from essential to advanced functionality
4. Practical and implementable

Return the result as JSON in the following format:
{
  "features": [
    {"id": "unique-feature-id", "label": "Feature Name"},
    ...more features
  ]
}`;

      const result = await window.spark.llm(promptText, "gemini-3.5-flash", true);
      const parsedResult = JSON.parse(result);

      if (parsedResult.features && Array.isArray(parsedResult.features)) {
        setFeatures(parsedResult.features);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error generating features:', err);
      setError('Failed to generate features. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = (featureId: string) => {
    if (values.includes(featureId)) {
      onChange(values.filter((v) => v !== featureId));
    } else {
      onChange([...values, featureId]);
    }
  };

  const handleSelectAll = () => {
    const allFeatureIds = features.map((f) => f.id);
    const allSelected = allFeatureIds.every((id) => values.includes(id));

    if (allSelected) {
      onChange([]);
    } else {
      onChange(allFeatureIds);
    }
  };

  const selectedCount = values.length;
  const totalFeatures = features.length;
  const allSelected = totalFeatures > 0 && selectedCount === totalFeatures;

  if (!selectedDomain) {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold">Select Features</h2>
          <p className="text-lg text-muted-foreground">
            Choose the features you'd like in your product
          </p>
        </div>
        <Alert>
          <WarningCircle className="h-5 w-5" />
          <AlertDescription className="ml-2">
            Please select a domain first to see relevant features
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold">Select Features</h2>
          <p className="text-lg text-muted-foreground">
            Choose the features you'd like in your product
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <Sparkle size={48} className="text-primary animate-pulse" weight="fill" />
          <p className="text-lg font-medium">Generating features with AI...</p>
          <p className="text-sm text-muted-foreground">This will take just a moment</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold">Select Features</h2>
          <p className="text-lg text-muted-foreground">
            Choose the features you'd like in your product
          </p>
        </div>
        <Alert variant="destructive">
          <WarningCircle className="h-5 w-5" />
          <AlertDescription className="ml-2">
            {error}
          </AlertDescription>
        </Alert>
        <Button onClick={() => generateFeatures(selectedDomain)} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold">Select Features</h2>
        <p className="text-lg text-muted-foreground">
          AI-generated features for {DOMAINS.find(d => d.value === selectedDomain)?.label}
        </p>
      </div>

      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border-2 border-primary/20">
        <div className="space-y-1">
          <div className="font-semibold text-lg">
            {selectedCount} of {totalFeatures} features selected
          </div>
          <div className="text-sm text-muted-foreground">
            {allSelected ? 'All features are selected' : 'Select features you need for your project'}
          </div>
        </div>
        <Button
          onClick={handleSelectAll}
          size="lg"
          variant={allSelected ? 'outline' : 'default'}
          className="h-12 px-6 text-base font-semibold"
        >
          {allSelected ? (
            <>
              <Square className="mr-2" size={20} />
              Deselect All
            </>
          ) : (
            <>
              <CheckSquare className="mr-2" size={20} />
              Select All
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex items-start space-x-3 p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors"
          >
            <Checkbox
              id={feature.id}
              checked={values.includes(feature.id)}
              onCheckedChange={() => handleToggle(feature.id)}
              className="mt-0.5"
            />
            <Label
              htmlFor={feature.id}
              className="text-base cursor-pointer flex-1 leading-relaxed"
            >
              {feature.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
