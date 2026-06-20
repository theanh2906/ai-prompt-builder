import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkle, Copy, Download, Check } from '@phosphor-icons/react';
import { StepProgress } from '@/components/StepProgress';
import { StepContainer } from '@/components/StepContainer';
import { PlatformStep } from '@/components/steps/PlatformStep';
import { DomainStep } from '@/components/steps/DomainStep';
import { FeaturesStep } from '@/components/steps/FeaturesStep';
import { DesignStep } from '@/components/steps/DesignStep';
import { ThemeStep } from '@/components/steps/ThemeStep';
import { ThemePreview } from '@/components/ThemePreview';
import { ProjectRequirements, PlatformType, DomainType, DesignStyle, ColorMood } from '@/lib/types';
import { getThemeById } from '@/lib/themes';
import { generatePrompt } from '@/lib/promptGenerator';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

function App() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  
  const [requirements, setRequirements] = useState<ProjectRequirements>({
    platform: null,
    domains: [],
    features: [],
    designStyle: null,
    colorMood: null,
    themeId: null,
  });

  const totalSteps = 6;

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

  const handleGeneratePrompt = () => {
    const prompt = generatePrompt(requirements);
    setGeneratedPrompt(prompt);
    setShowPrompt(true);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    toast.success('Prompt copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPrompt = () => {
    const blob = new Blob([generatedPrompt], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-prompt.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Prompt downloaded!');
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
        return requirements.themeId !== null;
      case 6:
        return true;
      default:
        return false;
    }
  };

  const selectedTheme = requirements.themeId ? getThemeById(requirements.themeId) : null;

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
              AI Prompt Builder
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto">
              Create comprehensive prompts that generate accurate code with any AI agent - achieve 70%+ accuracy
            </p>
          </div>

          <div className="bg-card border-2 border-border rounded-2xl p-8 space-y-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  1
                </div>
                <h3 className="font-semibold">Choose Platform</h3>
                <p className="text-sm text-muted-foreground">Select your target platform</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  2
                </div>
                <h3 className="font-semibold">Define Domain</h3>
                <p className="text-sm text-muted-foreground">Pick your app category</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  3
                </div>
                <h3 className="font-semibold">Select Features</h3>
                <p className="text-sm text-muted-foreground">Choose core functionality</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  4
                </div>
                <h3 className="font-semibold">Pick Theme</h3>
                <p className="text-sm text-muted-foreground">Select color palette & preview</p>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleStart}
            className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Start Building Prompt
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center p-6 pb-32 overflow-y-auto">
        <div className="w-full max-w-7xl">
          <div className={currentStep === 5 ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : ""}>
            <div className={currentStep === 5 ? "" : "max-w-4xl mx-auto w-full"}>
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
                  <ThemeStep
                    value={requirements.themeId}
                    onChange={(themeId: string) => setRequirements({ ...requirements, themeId })}
                  />
                )}
                {currentStep === 6 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold tracking-tight">Review & Generate</h2>
                      <p className="text-muted-foreground text-lg">
                        Review your selections and generate the AI prompt
                      </p>
                    </div>

                    <div className="grid gap-4">
                      <div className="bg-card p-6 rounded-lg border space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">Platform</h3>
                          <p className="text-muted-foreground capitalize">{requirements.platform}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Domains</h3>
                          <div className="flex flex-wrap gap-2">
                            {requirements.domains.map((domain) => (
                              <span key={domain} className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm">
                                {domain}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Features ({requirements.features.length})</h3>
                          <div className="flex flex-wrap gap-2">
                            {requirements.features.slice(0, 5).map((feature, idx) => (
                              <span key={idx} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                                {feature}
                              </span>
                            ))}
                            {requirements.features.length > 5 && (
                              <span className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm">
                                +{requirements.features.length - 5} more
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Design Style</h3>
                          <p className="text-muted-foreground capitalize">{requirements.designStyle} / {requirements.colorMood}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Theme</h3>
                          <p className="text-muted-foreground">{selectedTheme?.name || 'None selected'}</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      onClick={handleGeneratePrompt}
                      className="w-full text-lg py-6"
                    >
                      <Sparkle className="mr-2" size={24} weight="fill" />
                      Generate AI Prompt
                    </Button>
                  </motion.div>
                )}
              </StepContainer>
            </div>

            {currentStep === 5 && (
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <ThemePreview theme={selectedTheme || null} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between gap-4">
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

      <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
        <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col gap-0 p-0">
          <div className="px-6 pt-6">
            <DialogHeader>
              <DialogTitle className="text-2xl">Your AI Prompt is Ready!</DialogTitle>
              <DialogDescription>
                Copy this prompt and paste it into any AI code generation tool for best results
              </DialogDescription>
            </DialogHeader>
          </div>
          <ScrollArea className="flex-1 px-6 py-4">
            <pre className="bg-muted p-6 rounded-lg text-sm font-mono leading-relaxed whitespace-pre-wrap">
              {generatedPrompt}
            </pre>
          </ScrollArea>
          <div className="flex gap-3 px-6 pb-6 pt-4 border-t">
            <Button onClick={handleCopyPrompt} variant="outline" className="flex-1">
              {copied ? (
                <>
                  <Check className="mr-2" size={18} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2" size={18} />
                  Copy All
                </>
              )}
            </Button>
            <Button onClick={handleDownloadPrompt} className="flex-1">
              <Download className="mr-2" size={18} />
              Download (.md)
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
