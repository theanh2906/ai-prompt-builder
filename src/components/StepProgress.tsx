import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground font-medium">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-primary font-semibold">{Math.round(progress)}%</span>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Progress value={progress} className="h-2" />
      </motion.div>
    </div>
  );
}
