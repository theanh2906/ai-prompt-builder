import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProjectRequirements } from '@/lib/types';
import { PLATFORMS, DOMAINS, FEATURES, DESIGN_STYLES, COLOR_MOODS } from '@/lib/form-config';
import { Pencil, FileCode } from '@phosphor-icons/react';

interface SummaryStepProps {
  requirements: ProjectRequirements;
  onEdit: (step: number) => void;
  onGenerate: () => void;
}

export function SummaryStep({ requirements, onEdit, onGenerate }: SummaryStepProps) {
  const platformLabel = PLATFORMS.find((p) => p.value === requirements.platform)?.label;
  const domainLabel = requirements.domain ? DOMAINS.find((domain) => domain.value === requirements.domain)?.label : '';
  const featureLabels = requirements.features;
  const designStyleLabel = DESIGN_STYLES.find(
    (s) => s.value === requirements.designStyle
  )?.label;
  const colorMoodLabel = COLOR_MOODS.find((c) => c.value === requirements.colorMood)?.label;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold">Review Your Requirements</h2>
        <p className="text-lg text-muted-foreground">
          Check everything looks good before generating the JSON
        </p>
      </div>

      <div className="space-y-4 mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Platform</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onEdit(1)}>
              <Pencil size={16} className="mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="text-base px-4 py-2">
              {platformLabel}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Domain</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onEdit(2)}>
              <Pencil size={16} className="mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="text-base px-4 py-2">
              {domainLabel}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Features ({featureLabels.length})</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onEdit(3)}>
              <Pencil size={16} className="mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {featureLabels.slice(0, 10).map((label, idx) => (
                <Badge key={idx} variant="outline" className="text-sm px-3 py-1">
                  {label}
                </Badge>
              ))}
              {featureLabels.length > 10 && (
                <Badge variant="outline" className="text-sm px-3 py-1">
                  +{featureLabels.length - 10} more
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Design</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onEdit(4)}>
              <Pencil size={16} className="mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Style:</span>
                <Badge variant="secondary" className="text-base px-4 py-2">
                  {designStyleLabel}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Mood:</span>
                <Badge variant="secondary" className="text-base px-4 py-2">
                  {colorMoodLabel}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button
        size="lg"
        className="w-full text-lg py-6 mt-8"
        onClick={onGenerate}
      >
        <FileCode size={24} className="mr-2" />
        Generate JSON
      </Button>
    </div>
  );
}
