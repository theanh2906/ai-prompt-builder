import { motion } from 'framer-motion';
import { Check } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { AISuggestion } from '@/lib/types';
import { getThemeById } from '@/lib/themes';

interface DesignOptionsStepProps {
  designOptions: AISuggestion['designOptions'];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export function DesignOptionsStep({ designOptions, selectedIndex, onSelect }: DesignOptionsStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Choose Your Design</h2>
        <p className="text-muted-foreground text-lg">
          AI has suggested 3 design combinations. Select the one that best fits your vision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {designOptions.map((option, index) => {
          const theme = getThemeById(option.themeId);
          if (!theme) return null;

          const isSelected = selectedIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                className={`w-full h-auto p-0 hover:shadow-lg transition-all whitespace-normal ${
                  isSelected ? 'border-2 border-accent shadow-lg' : ''
                }`}
                onClick={() => onSelect(index)}
              >
                <div className="w-full p-6 space-y-4 text-left relative">
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <Check size={20} weight="bold" className="text-white" />
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold mb-1 capitalize">{theme.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {option.designStyle} • {option.colorMood}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div
                        className="w-12 h-12 rounded-lg border-2"
                        style={{ backgroundColor: theme.colors.primary }}
                        title="Primary"
                      />
                      <div
                        className="w-12 h-12 rounded-lg border-2"
                        style={{ backgroundColor: theme.colors.secondary }}
                        title="Secondary"
                      />
                      <div
                        className="w-12 h-12 rounded-lg border-2"
                        style={{ backgroundColor: theme.colors.accent }}
                        title="Accent"
                      />
                    </div>

                    <div className="space-y-2">
                      <div
                        className="h-10 rounded-md border flex items-center justify-center text-sm font-semibold"
                        style={{
                          backgroundColor: theme.colors.primary,
                          color: theme.colors.background,
                        }}
                      >
                        Primary Button
                      </div>
                      <div
                        className="h-10 rounded-md border flex items-center px-3 text-sm"
                        style={{
                          backgroundColor: theme.colors.card,
                          borderColor: theme.colors.border,
                          color: theme.colors.foreground,
                        }}
                      >
                        Input Field
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground pt-2 border-t">
                    {theme.description}
                  </p>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
