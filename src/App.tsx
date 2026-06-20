import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sparkle, Copy, Download, Check } from '@phosphor-icons/react';
import { StepProgress } from '@/components/StepProgress';
import { StepContainer } from '@/components/StepContainer';
import { PlatformStep } from '@/components/steps/PlatformStep';
import { DomainStep } from '@/components/steps/DomainStep';
import { FeaturesStep } from '@/components/steps/FeaturesStep';
import { DesignStep } from '@/components/steps/DesignStep';
import { SummaryStep } from '@/components/steps/SummaryStep';
import { ProjectRequirements, PlatformType, DomainType, DesignStyle, ColorMood } from '@/lib/types';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

function App() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showJson, setShowJson] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [requirements, setRequirements] = useState<ProjectRequirements>({
    platform: null,
    domains: [],
    features: [],
    designStyle: null,
    colorMood: null,
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStart = () => {
    setStarted(true);
  };

  const handleGenerateJSON = () => {
    setShowJson(true);
  };

  const handleCopyJSON = () => {
    const json = JSON.stringify(requirements, null, 2);
    navigator.clipboard.writeText(json);
    setCopied(true);
    toast.success('JSON copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const json = JSON.stringify(requirements, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project-requirements.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('JSON downloaded!');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return requirements.platform !== null;
      case 2:
        return requirements.domains.length > 0;
      case 3:
        return requirements.features.length > 0;
      case 4:
        return requirements.designStyle !== null && requirements.colorMood !== null;
      case 5:
        return true;
      default:
        return false;
    }
  };

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full text-center space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground"
            >
              <Sparkle size={40} weight="fill" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              AI Product Builder
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto">
              Tell us what you need, and our AI agents will design and build your product
            </p>
          </div>

          <div className="bg-card border-2 border-border rounded-2xl p-8 space-y-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  1
                </div>
                <h3 className="font-semibold">BA Agent</h3>
                <p className="text-sm text-muted-foreground">Analyzes your requirements</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  2
                </div>
                <h3 className="font-semibold">Designer Agent</h3>
                <p className="text-sm text-muted-foreground">Creates UI/UX designs</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  3
                </div>
                <h3 className="font-semibold">Lead Agent</h3>
                <p className="text-sm text-muted-foreground">Breaks down tasks</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  4
                </div>
                <h3 className="font-semibold">Dev Agent</h3>
                <p className="text-sm text-muted-foreground">Implements your product</p>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleStart}
            className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Start New Project
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center p-6 pb-32 overflow-y-auto">
        <div className="w-full max-w-4xl">
          <StepContainer step={currentStep}>
            {currentStep === 1 && (
              <PlatformStep
                value={requirements.platform}
                onChange={(platform: PlatformType) => setRequirements({ ...requirements, platform })}
              />
            )}
            {currentStep === 2 && (
              <DomainStep
                values={requirements.domains}
                onChange={(domains: DomainType[]) => setRequirements({ ...requirements, domains })}
              />
            )}
            {currentStep === 3 && (
              <FeaturesStep
                values={requirements.features}
                onChange={(features: string[]) => setRequirements({ ...requirements, features })}
              />
            )}
            {currentStep === 4 && (
              <DesignStep
                designStyle={requirements.designStyle}
                colorMood={requirements.colorMood}
                onChangeDesignStyle={(designStyle: DesignStyle) =>
                  setRequirements({ ...requirements, designStyle })
                }
                onChangeColorMood={(colorMood: ColorMood) =>
                  setRequirements({ ...requirements, colorMood })
                }
              />
            )}
            {currentStep === 5 && (
              <SummaryStep
                requirements={requirements}
                onEdit={(step: number) => setCurrentStep(step)}
                onGenerate={handleGenerateJSON}
              />
            )}
          </StepContainer>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="min-w-24"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed() || currentStep === totalSteps}
            className="min-w-24"
          >
            Continue
          </Button>
        </div>
      </div>

      <Dialog open={showJson} onOpenChange={setShowJson}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl">Project Requirements JSON</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
              {JSON.stringify(requirements, null, 2)}
            </pre>
          </div>
          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={handleCopyJSON} variant="outline" className="flex-1">
              {copied ? (
                <>
                  <Check className="mr-2" size={18} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2" size={18} />
                  Copy JSON
                </>
              )}
            </Button>
            <Button onClick={handleDownloadJSON} className="flex-1">
              <Download className="mr-2" size={18} />
              Download JSON
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
