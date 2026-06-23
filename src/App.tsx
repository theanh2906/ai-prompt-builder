import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Copy, Download, Check, Sparkle, SignOut, FolderOpen, FloppyDisk } from '@phosphor-icons/react';
import { ModeSelector } from '@/components/ModeSelector';
import { LoginDialog } from '@/components/LoginDialog';
import { SavedPromptsDialog } from '@/components/SavedPromptsDialog';
import { SavePromptDialog } from '@/components/SavePromptDialog';
import { DesignOptionsStep } from '@/components/DesignOptionsStep';
import { StepProgress } from '@/components/StepProgress';
import { StepContainer } from '@/components/StepContainer';
import { PlatformStep } from '@/components/steps/PlatformStep';
import { DomainStep } from '@/components/steps/DomainStep';
import { FeaturesStep } from '@/components/steps/FeaturesStep';
import { DesignStep } from '@/components/steps/DesignStep';
import { ThemeStep } from '@/components/steps/ThemeStep';
import { ProjectRequirements, PlatformType, DomainType, DesignStyle, ColorMood, BuilderMode, SavedPrompt, AISuggestion } from '@/lib/types';
import { User, signOutUser, subscribeToAuthChanges } from '@/lib/auth';
import { generateAISuggestions } from '@/lib/aiSuggestions';
import { getThemeById } from '@/lib/themes';
import { generatePrompt } from '@/lib/promptGenerator';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showSavedPrompts, setShowSavedPrompts] = useState(false);
  const [showSavePromptDialog, setShowSavePromptDialog] = useState(false);
  
  const [mode, setMode] = useState<BuilderMode | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPromptDialog, setShowPromptDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [currentPromptId, setCurrentPromptId] = useState<string | null>(null);
  
  const [requirements, setRequirements] = useState<ProjectRequirements>({
    platform: null,
    domain: null,
    features: [],
    designStyle: null,
    colorMood: null,
    themeId: null,
  });

  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion | null>(null);
  const [selectedDesignOption, setSelectedDesignOption] = useState<number | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const [savedPrompts, setSavedPrompts] = useKV<SavedPrompt[]>(`prompts_${user?.id || 'guest'}`, []);

  const totalSteps = mode === 'ai-suggest' ? 3 : 6;

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        setMode(null);
        setCurrentStep(1);
        toast.success('Logged out successfully');
      })
      .catch(() => {
        toast.error('Sign out failed. Please try again.');
      });
  };

  const handleModeSelect = (selectedMode: BuilderMode) => {
    setMode(selectedMode);
  };

  const handleNext = async () => {
    if (mode === 'ai-suggest') {
      if (currentStep === 1 && requirements.platform && requirements.domain) {
        setLoadingAI(true);
        try {
          const suggestions = await generateAISuggestions(requirements.platform, requirements.domain);
          setAiSuggestions(suggestions);
          setRequirements({ ...requirements, features: suggestions.features });
          setCurrentStep(2);
        } catch (error) {
          toast.error('Failed to get AI suggestions');
        } finally {
          setLoadingAI(false);
        }
      } else if (currentStep === 2 && selectedDesignOption !== null && aiSuggestions) {
        const selected = aiSuggestions.designOptions[selectedDesignOption];
        setRequirements({
          ...requirements,
          designStyle: selected.designStyle,
          colorMood: selected.colorMood,
          themeId: selected.themeId,
        });
        setCurrentStep(3);
      }
    } else {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else if (currentStep === 1) {
      setMode(null);
      setRequirements({
        platform: null,
        domain: null,
        features: [],
        designStyle: null,
        colorMood: null,
        themeId: null,
      });
      setAiSuggestions(null);
      setSelectedDesignOption(null);
    }
  };

  const handleGeneratePrompt = () => {
    const prompt = generatePrompt(requirements);
    setGeneratedPrompt(prompt);
    setShowPromptDialog(true);
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

  const handleSavePrompt = (name: string) => {
    const newPrompt: SavedPrompt = {
      id: currentPromptId || `prompt_${Date.now()}`,
      name,
      requirements,
      prompt: generatedPrompt,
      mode: mode!,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setSavedPrompts((current) => {
      const prompts = current || [];
      const existing = prompts.findIndex((p) => p.id === newPrompt.id);
      if (existing >= 0) {
        const updated = [...prompts];
        updated[existing] = newPrompt;
        return updated;
      }
      return [...prompts, newPrompt];
    });

    setCurrentPromptId(newPrompt.id);
    toast.success(`Prompt saved as "${name}"`);
  };

  const handleDeletePrompt = (id: string) => {
    setSavedPrompts((current) => (current || []).filter((p) => p.id !== id));
  };

  const handleLoadPrompt = (prompt: SavedPrompt) => {
    setMode(prompt.mode);
    setRequirements(prompt.requirements);
    setCurrentStep(prompt.mode === 'ai-suggest' ? 3 : 6);
    setGeneratedPrompt(prompt.prompt);
    setCurrentPromptId(prompt.id);
  };

  const handleOpenSave = () => {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }
    setShowSavePromptDialog(true);
  };

  const canProceed = () => {
    if (mode === 'ai-suggest') {
      if (currentStep === 1) return requirements.platform !== null && requirements.domain !== null;
      if (currentStep === 2) return selectedDesignOption !== null;
      return true;
    } else {
      switch (currentStep) {
        case 1: return requirements.platform !== null;
        case 2: return requirements.domain !== null;
        case 3: return requirements.features.length > 0;
        case 4: return requirements.designStyle !== null && requirements.colorMood !== null;
        case 5: return requirements.themeId !== null;
        case 6: return true;
        default: return false;
      }
    }
  };

  if (!mode) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkle size={24} weight="fill" className="text-white" />
              </div>
              <h1 className="text-xl font-bold">AI Prompt Builder</h1>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <Button variant="ghost" size="sm" onClick={() => setShowSavedPrompts(true)}>
                    <FolderOpen className="mr-2" size={18} />
                    My Prompts
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        {user.name}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleLogout}>
                        <SignOut className="mr-2" size={16} />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button variant="default" size="sm" onClick={() => setShowLoginDialog(true)}>
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-background via-primary/5 to-accent/10">
          <ModeSelector onSelectMode={handleModeSelect} />
        </div>

        <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} onLogin={handleLogin} />
        <SavedPromptsDialog
          open={showSavedPrompts}
          onOpenChange={setShowSavedPrompts}
          savedPrompts={savedPrompts || []}
          onDelete={handleDeletePrompt}
          onLoad={handleLoadPrompt}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setMode(null)}>
              ← Back to Mode Selection
            </Button>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => setShowSavedPrompts(true)}>
                  <FolderOpen className="mr-2" size={18} />
                  My Prompts
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      {user.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleLogout}>
                      <SignOut className="mr-2" size={16} />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button variant="default" size="sm" onClick={() => setShowLoginDialog(true)}>
                Sign In
              </Button>
            )}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pb-4">
          <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </header>

      <div className="flex-1 flex items-start justify-center p-6 pb-32 overflow-y-auto">
        <div className="w-full max-w-4xl">
          <StepContainer step={currentStep}>
            {mode === 'ai-suggest' ? (
              <>
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <PlatformStep
                      value={requirements.platform}
                      onChange={(platform: PlatformType) => setRequirements({ ...requirements, platform })}
                    />
                    <DomainStep
                      value={requirements.domain}
                      onChange={(domain: DomainType) => setRequirements({ ...requirements, domain })}
                    />
                  </div>
                )}
                {currentStep === 2 && aiSuggestions && (
                  <DesignOptionsStep
                    designOptions={aiSuggestions.designOptions}
                    selectedIndex={selectedDesignOption}
                    onSelect={setSelectedDesignOption}
                  />
                )}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold tracking-tight">Review & Generate</h2>
                      <p className="text-muted-foreground text-lg">Your AI-suggested prompt is ready</p>
                    </div>
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
                          {requirements.features.slice(0, 6).map((feature, idx) => (
                            <span key={idx} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                              {feature}
                            </span>
                          ))}
                          {requirements.features.length > 6 && (
                            <span className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm">
                              +{requirements.features.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Theme</h3>
                        <p className="text-muted-foreground">{getThemeById(requirements.themeId!)?.name}</p>
                      </div>
                    </div>
                    <Button size="lg" onClick={handleGeneratePrompt} className="w-full text-lg py-6">
                      <Sparkle className="mr-2" size={24} weight="fill" />
                      Generate AI Prompt
                    </Button>
                  </motion.div>
                )}
              </>
            ) : (
              <>
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
                {currentStep === 3 && (
                  <FeaturesStep
                    values={requirements.features}
                    onChange={(features: string[]) => setRequirements({ ...requirements, features })}
                    selectedDomain={requirements.domain}
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
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold tracking-tight">Review & Generate</h2>
                      <p className="text-muted-foreground text-lg">Review your selections and generate the prompt</p>
                    </div>
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
                          {requirements.features.slice(0, 6).map((feature, idx) => (
                            <span key={idx} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                              {feature}
                            </span>
                          ))}
                          {requirements.features.length > 6 && (
                            <span className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm">
                              +{requirements.features.length - 6} more
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
                        <p className="text-muted-foreground">{getThemeById(requirements.themeId!)?.name}</p>
                      </div>
                    </div>
                    <Button size="lg" onClick={handleGeneratePrompt} className="w-full text-lg py-6">
                      <Sparkle className="mr-2" size={24} weight="fill" />
                      Generate AI Prompt
                    </Button>
                  </motion.div>
                )}
              </>
            )}
          </StepContainer>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between gap-4">
          <Button variant="outline" onClick={handleBack} className="min-w-24">
            Back
          </Button>
          {currentStep < totalSteps ? (
            <Button onClick={handleNext} disabled={!canProceed() || loadingAI} className="min-w-24">
              {loadingAI ? 'Getting AI Suggestions...' : 'Continue'}
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleOpenSave}>
                <FloppyDisk className="mr-2" size={18} />
                Save
              </Button>
              <Button onClick={handleGeneratePrompt}>
                <Sparkle className="mr-2" size={18} weight="fill" />
                Generate
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showPromptDialog} onOpenChange={setShowPromptDialog}>
        <DialogContent className="max-w-4xl h-[85vh] flex flex-col gap-0 p-0 overflow-hidden">
          <div className="px-6 pt-6 pb-4 shrink-0 border-b">
            <DialogHeader>
              <DialogTitle className="text-2xl">Your AI Prompt is Ready!</DialogTitle>
              <DialogDescription>
                Copy this prompt and paste it into any AI code generation tool
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <pre className="bg-muted p-6 rounded-lg text-sm font-mono leading-relaxed whitespace-pre-wrap">
              {generatedPrompt}
            </pre>
          </div>
          <div className="flex gap-3 px-6 py-4 border-t shrink-0 bg-background">
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
            <Button onClick={handleDownloadPrompt} variant="outline" className="flex-1">
              <Download className="mr-2" size={18} />
              Download (.md)
            </Button>
            <Button onClick={handleOpenSave} className="flex-1">
              <FloppyDisk className="mr-2" size={18} />
              Save Prompt
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} onLogin={handleLogin} />
      <SavedPromptsDialog
        open={showSavedPrompts}
        onOpenChange={setShowSavedPrompts}
        savedPrompts={savedPrompts || []}
        onDelete={handleDeletePrompt}
        onLoad={handleLoadPrompt}
      />
      <SavePromptDialog
        open={showSavePromptDialog}
        onOpenChange={setShowSavePromptDialog}
        onSave={handleSavePrompt}
      />
    </div>
  );
}

export default App;
