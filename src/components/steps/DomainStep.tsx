import { SelectionCard } from '@/components/SelectionCard';
import { DOMAINS } from '@/lib/form-config';
import { DomainType } from '@/lib/types';
import {
  CurrencyDollar,
  Heart,
  ShoppingCart,
  GraduationCap,
  ChartBar,
  Users,
  GameController,
  ListChecks,
  Airplane,
  ForkKnife,
} from '@phosphor-icons/react';

interface DomainStepProps {
  values: DomainType[];
  onChange: (values: DomainType[]) => void;
}

const domainIcons: Record<DomainType, React.ReactElement> = {
  finance: <CurrencyDollar />,
  healthcare: <Heart />,
  ecommerce: <ShoppingCart />,
  education: <GraduationCap />,
  management: <ChartBar />,
  social: <Users />,
  entertainment: <GameController />,
  productivity: <ListChecks />,
  travel: <Airplane />,
  food: <ForkKnife />,
};

export function DomainStep({ values, onChange }: DomainStepProps) {
  const handleToggle = (domain: DomainType) => {
    if (values.includes(domain)) {
      onChange(values.filter((v) => v !== domain));
    } else {
      onChange([...values, domain]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold">Select Your Domain</h2>
        <p className="text-lg text-muted-foreground">
          Choose one or more industries for your product
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {DOMAINS.map((domain) => (
          <SelectionCard
            key={domain.value}
            selected={values.includes(domain.value)}
            onClick={() => handleToggle(domain.value)}
            icon={domainIcons[domain.value]}
            label={domain.label}
            description={domain.description}
          />
        ))}
      </div>
    </div>
  );
}
