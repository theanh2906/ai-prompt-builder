import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Sparkle, User } from '@phosphor-icons/react';
import { BuilderMode } from '@/lib/types';

interface ModeSelectorProps {
  onSelectMode: (mode: BuilderMode) => void;
}

export function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl w-full space-y-8"
      >
        <div className="text-center space-y-4">
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
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your preferred workflow to create comprehensive prompts that generate accurate code
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card
              className="p-8 space-y-6 cursor-pointer hover:border-accent hover:shadow-lg transition-all group"
              onClick={() => onSelectMode('ai-suggest')}
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <Sparkle size={32} weight="fill" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">AI Suggest</h2>
                <p className="text-muted-foreground text-lg">
                  Let AI recommend features and design options based on your platform and domain
                </p>
              </div>
              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-accent text-sm font-bold">1</span>
                  </div>
                  <p className="text-sm">Select platform and domain</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-accent text-sm font-bold">2</span>
                  </div>
                  <p className="text-sm">AI suggests features and 3 design options</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-accent text-sm font-bold">3</span>
                  </div>
                  <p className="text-sm">Choose your preferred design</p>
                </div>
              </div>
              <div className="pt-4">
                <div className="px-4 py-2 bg-accent/5 border border-accent/20 rounded-lg text-sm text-center">
                  ✨ Quick & Smart
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card
              className="p-8 space-y-6 cursor-pointer hover:border-primary hover:shadow-lg transition-all group"
              onClick={() => onSelectMode('expert')}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <User size={32} weight="fill" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">Expert Mode</h2>
                <p className="text-muted-foreground text-lg">
                  Full control over every aspect - manually configure all features and design details
                </p>
              </div>
              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">1</span>
                  </div>
                  <p className="text-sm">Choose platform and domain</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">2</span>
                  </div>
                  <p className="text-sm">Manually select all features</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">3</span>
                  </div>
                  <p className="text-sm">Configure design style and theme</p>
                </div>
              </div>
              <div className="pt-4">
                <div className="px-4 py-2 bg-primary/5 border border-primary/20 rounded-lg text-sm text-center">
                  🎯 Precise Control
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
