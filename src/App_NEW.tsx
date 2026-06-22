import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Sparkle, Copy, Download, Check, FloppyDisk, FolderOpen, ArrowLeft } from '@phosphor-icons/react';
import { StepProgress } from '@/components/StepProgress';
import { StepContainer } from '@/components/StepContainer';
import { PlatformStep } from '@/components/steps/PlatformStep';
import { DomainStep } from '@/components/steps/DomainStep';
import { FeaturesStep } from '@/components/steps/FeaturesStep';
import { DesignStep } from '@/components/steps/DesignStep';
import { ThemeStep } from '@/components/steps/ThemeStep';
import { ModeSelector } from '@/components/ModeSelector';
import { SavedPrompts } from '@/components/SavedPrompts';
import { ThemePreview } from '@/components/ThemePreview';
import { ProjectRequirements, PlatformType, DomainType, DesignStyle, ColorMood, BuilderMode, SavedPrompt } from '@/lib/types';
import { getThemeById } from '@/lib/themes';
import { generatePrompt } from '@/lib/promptGenerator';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

function App() {
  const [mode, setMode] = useState<BuilderMode | null>(null);
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showSavedPrompts, setShowSavedPrompts] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [promptName, setPromptName] = useState('');
  const [copied, setCopied] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [user, setUser] = useState<any>(null);
  
  const [savedPrompts, setSavedPrompts] = useKV<SavedPrompt[]>('saved-prompts', []);

  const prompts = savedPrompts || [];
  
  const [requirements, setRequirements] = useState<ProjectRequirements>({
    platform: null,
    domain: null,
    features: [],
    designStyle: null,
    colorMood: null,
    themeId: null,
  });

  useEffect(() => {
    window.spark.user().then(setUser).catch(() => {});
  }, []);

  const totalSteps = mode === 'ai-suggest' ? 4 : 6;

  const handleSelectMode = (selectedMode: BuilderMode) => {
    setMode(selectedMode);
    setStarted(true);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      setMode(null);
      setStarted(false);
      setCurrentStep(1);
      setRequirements({
        platform: null,
        domain: null,
        features: [],
        designStyle: null,
        colorMood: null,
        themeId: null,
      });
    }
  };

  const handleGeneratePrompt = () => {
    const prompt = generatePrompt(requirements);
    setGeneratedPrompt(prompt);
    setShowPrompt(true);
  };

  const handleSavePrompt = () => {
    if (!promptName.trim()) {
      toast.error('Please enter a prompt name');
      return;
    }

    const newPrompt: SavedPrompt = {
      id: Date.now().toString(),
      name: promptName,
      requirements,
      prompt: generatedPrompt,
      mode: mode!,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setSavedPrompts((current) => [newPrompt, ...(current || [])]);
    toast.success('Prompt saved!');
    setShowSaveDialog(false);
    setPromptName('');
  };

  const handleLoadPrompt = (prompt: SavedPrompt) => {
    setRequirements(prompt.requirements);
    setMode(prompt.mode);
    setStarted(true);
    setCurrentStep(1);
    toast.success('Prompt loaded!');
  };

  const handleDeletePrompt = (id: string) => {
    setSavedPrompts((current) => (current || []).filter((p) => p.id !== id));
    toast.success('Prompt deleted');
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
    if (mode === 'ai-suggest') {
      switch (currentStep) {
        case 1:
          return requirements.platform !== null;
        case 2:
          return requirements.domain !== null;
        case 3:
          return requirements.features.length > 0 && requirements.designStyle !== null;
        case 4:
          return true;
        default:
          return false;
      }
    } else {
      switch (currentStep) {
        case 1:
          return requirements.platform !== null;
        case 2:
          return requirements.domain !== null;
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
    }
  };

  const selectedTheme = requirements.themeId ? getThemeById(requirements.themeId) : null;

  if (!mode) {
    return (
      <div className="relative">
        <div className="absolute top-6 right-6 z-10">
          <Button
            variant="outline"
            onClick={() => setShowSavedPrompts(true)}
            className="gap-2"
          >
            <FolderOpen size={18} />
            Saved Prompts {prompts.length > 0 && `(${prompts.length})`}
          </Button>
        </div>
        <ModeSelector onSelectMode={handleSelectMode} />
        {showSavedPrompts && (
          <SavedPrompts
            prompts={savedPrompts}
            onLoad={handleLoadPrompt}
            onDelete={handleDeletePrompt}
            onClose={() => setShowSavedPrompts(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft size={18} className="mr-2" />
                Back to Mode Selection
              </Button>
              <div className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-sm">
                {mode === 'ai-suggest' ? '✨ AI Suggest Mode' : '🎯 Expert Mode'}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSavedPrompts(true)}
              className="gap-2"
            >
              <FolderOpen size={16} />
              Saved ({prompts.length})
            </Button>
          </div>
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
                    value={requirements.domain}
                    onChange={(domain: DomainType) => setRequirements({ ...requirements, domain })}
                  />
                )}
                {currentStep === 3 && mode === 'expert' && (
                  <FeaturesStep
                    values={requirements.features}
                    onChange={(features: string[]) => setRequirements({ ...requirements, features })}
                    selectedDomain={requirements.domain}
                  />
                )}
                {currentStep === 3 && mode === 'ai-suggest' && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold tracking-tight">AI Suggestions</h2>
                      <p className="text-muted-foreground text-lg">
                        AI will suggest features and design based on your platform and domain
                      </p>
                    </div>
                    <div className="bg-card p-6 rounded-lg border">
                      <p className="text-muted-foreground">
                        Note: Full AI integration coming soon. For now, proceed to manual selection.
                      </p>
                    </div>
                  </div>
                )}
                {currentStep === 4 && mode === 'expert' && (
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
                {currentStep === 4 && mode === 'ai-suggest' && (
                  <FeaturesStep
                    values={requirements.features}
                    onChange={(features: string[]) => setRequirements({ ...requirements, features })}
                    selectedDomain={requirements.domain}
                  />
                )}
                {currentStep === 5 && mode === 'expert' && (
                  <ThemeStep
                    value={requirements.themeId}
                    onChange={(themeId: string) => setRequirements({ ...requirements, themeId })}
                  />
                )}
                {((currentStep === 6 && mode === 'expert') || (currentStep === 4 && mode === 'ai-suggest')) && (
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
                          <h3 className="font-semibold mb-2">Domain</h3>
                          <p className="text-muted-foreground capitalize">{requirements.domain}</p>
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
                        {requirements.designStyle && (
                          <div>
                            <h3 className="font-semibold mb-2">Design Style</h3>
                            <p className="text-muted-foreground capitalize">{requirements.designStyle} {requirements.colorMood && `/ ${requirements.colorMood}`}</p>
                          </div>
                        )}
                        {requirements.themeId && (
                          <div>
                            <h3 className="font-semibold mb-2">Theme</h3>
                            <p className="text-muted-foreground">{selectedTheme?.name || 'None selected'}</p>
                          </div>
                        )}
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

            {currentStep === 5 && mode === 'expert' && (
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
        <DialogContent className="max-w-4xl h-[85vh] flex flex-col gap-0 p-0 overflow-hidden">
          <div className="px-6 pt-6 pb-4 shrink-0 border-b">
            <DialogHeader>
              <DialogTitle className="text-2xl">Your AI Prompt is Ready!</DialogTitle>
              <DialogDescription>
                Copy this prompt and paste it into any AI code generation tool for best results
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <pre className="bg-muted p-6 rounded-lg text-sm font-mono leading-relaxed whitespace-pre-wrap">
              {generatedPrompt}
            </pre>
          </div>
          <div className="flex gap-3 px-6 py-4 border-t shrink-0 bg-background">
            <Button onClick={() => setShowSaveDialog(true)} variant="outline" className="flex-1">
              <FloppyDisk className="mr-2" size={18} />
              Save Prompt
            </Button>
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

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Prompt</DialogTitle>
            <DialogDescription>
              Give your prompt a name to save it for later
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Enter prompt name..."
              value={promptName}
              onChange={(e) => setPromptName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSavePrompt()}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePrompt}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {showSavedPrompts && (
        <SavedPrompts
          prompts={prompts}
          onLoad={handleLoadPrompt}
          onDelete={handleDeletePrompt}
          onClose={() => setShowSavedPrompts(false)}
        />
      )}
    </div>
  );
}

export default App;
