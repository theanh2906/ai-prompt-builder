import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FEATURES, FEATURE_CATEGORIES } from '@/lib/form-config';
import { CheckSquare, Square } from '@phosphor-icons/react';

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

  const handleSelectAllCategory = (categoryId: string) => {
    const categoryFeatures = FEATURES.filter((f) => f.category === categoryId);
    const categoryFeatureIds = categoryFeatures.map((f) => f.id);
    const allSelected = categoryFeatureIds.every((id) => values.includes(id));

    if (allSelected) {
      onChange(values.filter((v) => !categoryFeatureIds.includes(v)));
    } else {
      const newValues = [...values];
      categoryFeatureIds.forEach((id) => {
        if (!newValues.includes(id)) {
          newValues.push(id);
        }
      });
      onChange(newValues);
    }
  };

  const handleSelectAll = () => {
    const allFeatureIds = FEATURES.map((f) => f.id);
    const allSelected = allFeatureIds.every((id) => values.includes(id));

    if (allSelected) {
      onChange([]);
    } else {
      onChange(allFeatureIds);
    }
  };

  const totalFeatures = FEATURES.length;
  const selectedCount = values.length;
  const allSelected = totalFeatures > 0 && selectedCount === totalFeatures;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold">Select Features</h2>
        <p className="text-lg text-muted-foreground">
          Choose the features you'd like in your product
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

      <Accordion type="multiple" className="space-y-4" defaultValue={FEATURE_CATEGORIES.map(c => c.id)}>
        {FEATURE_CATEGORIES.map((category) => {
          const categoryFeatures = FEATURES.filter((f) => f.category === category.id);
          const selectedCount = categoryFeatures.filter((f) => values.includes(f.id)).length;
          const allSelected = categoryFeatures.length > 0 && selectedCount === categoryFeatures.length;

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
                  <div className="flex items-center justify-between pb-3 border-b">
                    <span className="text-sm text-muted-foreground">
                      {selectedCount} of {categoryFeatures.length} selected
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSelectAllCategory(category.id)}
                      className="h-8 text-sm"
                    >
                      {allSelected ? (
                        <>
                          <Square className="mr-2" size={16} />
                          Deselect All
                        </>
                      ) : (
                        <>
                          <CheckSquare className="mr-2" size={16} />
                          Select All
                        </>
                      )}
                    </Button>
                  </div>
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
