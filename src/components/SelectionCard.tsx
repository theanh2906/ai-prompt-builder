import { Card, CardContent } from '@/components/ui/card';
import { Check } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SelectionCardProps {
  selected: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
  description: string;
  disabled?: boolean;
}

export function SelectionCard({
  selected,
  onClick,
  icon,
  label,
  description,
  disabled = false,
}: SelectionCardProps) {
  return (
    <Card
      className={cn(
        'relative cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg',
        'border-2 min-h-[120px]',
        selected
          ? 'border-primary bg-primary/5 shadow-md'
          : 'border-border hover:border-primary/50',
        disabled && 'opacity-50 cursor-not-allowed hover:scale-100'
      )}
      onClick={disabled ? undefined : onClick}
    >
      <CardContent className="p-6 flex flex-col items-start gap-3">
        {selected && (
          <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Check weight="bold" className="text-primary-foreground" size={16} />
          </div>
        )}
        <div className="text-primary text-3xl">{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1 font-heading">{label}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
