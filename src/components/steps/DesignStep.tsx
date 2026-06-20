import { SelectionCard } from '@/components/SelectionCard';
import { DESIGN_STYLES, COLOR_MOODS } from '@/lib/form-config';
import { DesignStyle, ColorMood } from '@/lib/types';
import { Palette, Sparkle, Briefcase, FlowerLotus, LineSegments } from '@phosphor-icons/react';

interface DesignStepProps {
  designStyle: DesignStyle | null;
  colorMood: ColorMood | null;
  onChangeDesignStyle: (value: DesignStyle) => void;
  onChangeColorMood: (value: ColorMood) => void;
}

const designIcons: Record<DesignStyle, React.ReactElement> = {
  modern: <Sparkle />,
  classic: <FlowerLotus />,
  playful: <Palette />,
  corporate: <Briefcase />,
  minimal: <LineSegments />,
};

const colorIcons: Record<ColorMood, React.ReactElement> = {
  vibrant: <Sparkle />,
  calm: <FlowerLotus />,
  professional: <Briefcase />,
  dark: <LineSegments />,
  colorful: <Palette />,
};

export function DesignStep({
  designStyle,
  colorMood,
  onChangeDesignStyle,
  onChangeColorMood,
}: DesignStepProps) {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold">Design Preferences</h2>
        <p className="text-lg text-muted-foreground">
          Help us understand your design vision
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Design Style</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DESIGN_STYLES.map((style) => (
              <SelectionCard
                key={style.value}
                selected={designStyle === style.value}
                onClick={() => onChangeDesignStyle(style.value)}
                icon={designIcons[style.value]}
                label={style.label}
                description={style.description}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Color Mood</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLOR_MOODS.map((mood) => (
              <SelectionCard
                key={mood.value}
                selected={colorMood === mood.value}
                onClick={() => onChangeColorMood(mood.value)}
                icon={colorIcons[mood.value]}
                label={mood.label}
                description={mood.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
