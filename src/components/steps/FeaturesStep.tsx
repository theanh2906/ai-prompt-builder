import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FEATURES, FEATURE_CATEGORIES } from '@/lib/form-config';

interface FeaturesStepProps {
  values: string[];
  onChange: (values: string[]) => void;
}

export function FeaturesStep({ values, onChange }: FeaturesStepProps) {
  const handleToggle = (featureId: string) => {
    if (values.includes(featureId)) {
      onChange(values.filter((v) => v !== featureId));
    } else {
      onChange([...values, featureId]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold">Select Features</h2>
        <p className="text-lg text-muted-foreground">
          Choose the features you'd like in your product
        </p>
      </div>

      <Accordion type="multiple" className="space-y-4 mt-8" defaultValue={FEATURE_CATEGORIES.map(c => c.id)}>
        {FEATURE_CATEGORIES.map((category) => {
          const categoryFeatures = FEATURES.filter((f) => f.category === category.id);
          const selectedCount = categoryFeatures.filter((f) => values.includes(f.id)).length;

          return (
            <AccordionItem
              key={category.id}
              value={category.id}
              className="border border-border rounded-lg px-6 bg-card"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="font-semibold text-lg">{category.label}</span>
                  {selectedCount > 0 && (
                    <span className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded-full">
                      {selectedCount} selected
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4 pt-2">
                  {categoryFeatures.map((feature) => (
                    <div key={feature.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={feature.id}
                        checked={values.includes(feature.id)}
                        onCheckedChange={() => handleToggle(feature.id)}
                      />
                      <Label
                        htmlFor={feature.id}
                        className="text-base cursor-pointer flex-1"
                      >
                        {feature.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
