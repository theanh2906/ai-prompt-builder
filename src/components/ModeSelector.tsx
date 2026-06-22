import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkle, Sliders } from '@phosphor-icons/react';

type BuilderMode = 'ai-suggest' | 'expert';

interface ModeSelectorProps {
  onSelectMode: (mode: BuilderMode) => void;
}

export function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto space-y-12"
    >
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground"
        >
          <Sparkle size={40} weight="fill" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Choose Your Building Mode
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select how you want to create your AI prompt
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            onClick={() => onSelectMode('ai-suggest')}
            className="w-full h-auto p-0 hover:border-accent hover:shadow-lg hover:bg-accent/5 transition-all group"
          >
            <div className="w-full p-8 space-y-6 text-left">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                  <Sparkle size={28} weight="fill" className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold">AI Suggest</h3>
                  <p className="text-muted-foreground">Quick & easy</p>
                </div>
              </div>

              <p className="text-muted-foreground break-words leading-relaxed overflow-wrap-anywhere">
                Let AI do the heavy lifting. Just pick your platform and domain, and we'll suggest features and design options tailored for you.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-accent text-sm font-bold">1</span>
                  </div>
                  <p className="text-sm">Pick platform and domain</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-accent text-sm font-bold">2</span>
                  </div>
                  <p className="text-sm">AI suggests features & design</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-accent text-sm font-bold">3</span>
                  </div>
                  <p className="text-sm">Review and generate prompt</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                  Get started →
                </div>
              </div>
            </div>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="outline"
            onClick={() => onSelectMode('expert')}
            className="w-full h-auto p-0 hover:border-primary hover:shadow-lg hover:bg-primary/5 transition-all group"
          >
            <div className="w-full p-8 space-y-6 text-left">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <Sliders size={28} weight="fill" className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold">Expert Mode</h3>
                  <p className="text-muted-foreground">Full control</p>
                </div>
              </div>

              <p className="text-muted-foreground break-words leading-relaxed overflow-wrap-anywhere">
                Take the reins and customize every detail. Step through platform, domain, features, design style, and theme selections.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">1</span>
                  </div>
                  <p className="text-sm">Choose platform</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">2</span>
                  </div>
                  <p className="text-sm">Select domain and features</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">3</span>
                  </div>
                  <p className="text-sm">Pick design style and theme</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Get started →
                </div>
              </div>
            </div>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
