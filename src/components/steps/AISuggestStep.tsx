import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ThemePreview } from '@/components/ThemePreview';
import { AISuggestion, DomainType, PlatformType } from '@/lib/types';
import { getThemeById, themes } from '@/lib/themes';
import { Sparkle, CircleNotch } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface AISuggestStepProps {
  platform: PlatformType | null;
  domain: DomainType | null;
  selectedFeatures: string[];
  selectedDesignIndex: number | null;
  onFeaturesChange: (features: string[]) => void;
  onDesignSelect: (index: number) => void;
}

export function AISuggestStep({
  platform,
  domain,
  selectedFeatures,
  selectedDesignIndex,
  onFeaturesChange,
  onDesignSelect,
}: AISuggestStepProps) {
  const [suggestions, setSuggestions] = useState<AISuggestion | null>(null);
  const [loading, setLoading] = useState(false);

  const generateSuggestions = async () => {
    if (!platform || !domain) {
      toast.error('Please select platform and domain first');
      return;
    }

    setLoading(true);
    try {
      const prompt = window.spark.llmPrompt`You are an expert product designer. Based on the following platform and domain, suggest:
1. A list of exactly 8-12 essential features for this application
2. Three different design style combinations (designStyle + colorMood + themeId)

Platform: ${platform}
Domain: ${domain}

Available design styles: modern, classic, playful, corporate, minimal
Available color moods: vibrant, calm, professional, dark, colorful
Available theme IDs: ${themes.slice(0, 15).map(t => t.id).join(', ')}

Return ONLY valid JSON in this exact format:
{
  "features": ["Feature 1", "Feature 2", ...],
  "designOptions": [
    {"designStyle": "modern", "colorMood": "vibrant", "themeId": "aurora-borealis"},
    {"designStyle": "minimal", "colorMood": "calm", "themeId": "minimalist"},
    {"designStyle": "corporate", "colorMood": "professional", "themeId": "neon-noir"}
  ]
}`;

      const result = await window.spark.llm(prompt, 'gemini-3.5-flash', true);
      const parsed = JSON.parse(result);
      
      setSuggestions(parsed);
      onFeaturesChange(parsed.features || []);
      toast.success('AI suggestions generated!');
    } catch (error) {
      toast.error('Failed to generate suggestions');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!suggestions) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">AI Suggestions</h2>
          <p className="text-muted-foreground text-lg">
            Let AI analyze your requirements and suggest features and design options
          </p>
        </div>

        <Card className="p-8 space-y-6 bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-dashed">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
              <Sparkle size={40} weight="fill" className="text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Ready to Generate</h3>
              <p className="text-muted-foreground">
                Platform: <span className="font-medium text-foreground capitalize">{platform}</span>
                {' • '}
                Domain: <span className="font-medium text-foreground capitalize">{domain}</span>
              </p>
            </div>
            <Button
              size="lg"
              onClick={generateSuggestions}
              disabled={loading || !platform || !domain}
              className="text-lg px-8"
            >
              {loading ? (
                <>
                  <CircleNotch size={24} className="mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkle size={24} weight="fill" className="mr-2" />
                  Generate AI Suggestions
                </>
              )}
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Review AI Suggestions</h2>
        <p className="text-muted-foreground text-lg">
          Customize the features and select your preferred design
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Suggested Features</h3>
          <Card className="p-6">
            <div className="grid md:grid-cols-2 gap-3">
              {suggestions.features.map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <Checkbox
                    id={`feature-${idx}`}
                    checked={selectedFeatures.includes(feature)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onFeaturesChange([...selectedFeatures, feature]);
                      } else {
                        onFeaturesChange(selectedFeatures.filter(f => f !== feature));
                      }
                    }}
                  />
                  <label
                    htmlFor={`feature-${idx}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {feature}
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Design Options</h3>
          <div className="grid lg:grid-cols-3 gap-6">
            {suggestions.designOptions.map((option, idx) => {
              const theme = getThemeById(option.themeId);
              if (!theme) return null;

              return (
                <Card
                  key={idx}
                  className={`p-6 cursor-pointer transition-all ${
                    selectedDesignIndex === idx
                      ? 'border-accent border-2 shadow-lg'
                      : 'hover:border-primary hover:shadow-md'
                  }`}
                  onClick={() => onDesignSelect(idx)}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">Option {idx + 1}</h4>
                      {selectedDesignIndex === idx && (
                        <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                          <span className="text-accent-foreground text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Style:</span>{' '}
                        <span className="font-medium capitalize">{option.designStyle}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Mood:</span>{' '}
                        <span className="font-medium capitalize">{option.colorMood}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Theme:</span>{' '}
                        <span className="font-medium">{theme.name}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <ThemePreview theme={theme} compact />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={generateSuggestions}
            disabled={loading}
          >
            <Sparkle size={18} className="mr-2" />
            Regenerate
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
