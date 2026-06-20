import { SelectionCard } from '@/components/SelectionCard';
import { PLATFORMS } from '@/lib/form-config';
import { PlatformType } from '@/lib/types';
import { DeviceMobile, Desktop, Devices } from '@phosphor-icons/react';

interface PlatformStepProps {
  value: PlatformType | null;
  onChange: (value: PlatformType) => void;
}

const platformIcons = {
  web: <Desktop />,
  'mobile-ios': <DeviceMobile />,
  'mobile-android': <DeviceMobile />,
  both: <Devices />,
};

export function PlatformStep({ value, onChange }: PlatformStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold">Choose Your Platform</h2>
        <p className="text-lg text-muted-foreground">
          Select the platform where your product will live
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {PLATFORMS.map((platform) => (
          <SelectionCard
            key={platform.value}
            selected={value === platform.value}
            onClick={() => onChange(platform.value)}
            icon={platformIcons[platform.value]}
            label={platform.label}
            description={platform.description}
          />
        ))}
      </div>
    </div>
  );
}
