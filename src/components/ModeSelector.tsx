import { motion } from 'framer-motion';
import { BuilderMode } from '@/lib/types';

  onSelectMode: (mode: BuilderMode) => void;

interface ModeSelectorProps {
  onSelectMode: (mode: BuilderMode) => void;
}

export function ModeSelector({ onSelectMode }: ModeSelectorProps) {
          
        >
        </motion.div>
          Choose Your Building Mode
        <p className="text-xl text-muted-foreground m
     

        <motion.div
          animate={{ opacity: 1,
        >
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
                <div classNam
            className="w-full h-auto p-0 hover:border-accent hover:shadow-lg hover:bg-accent/5 transition-all group"
                  </div>
          >
            <div className="w-full p-8 space-y-6 text-left">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                  <Sparkle size={28} weight="fill" className="text-white" />
                    <s
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold">AI Suggest Mode</h3>
                  <p className="text-muted-foreground">Fast & intelligent</p>
                </div>
              </div>

              <p className="text-muted-foreground break-words leading-relaxed overflow-wrap-anywhere">
                Let AI do the heavy lifting. Just pick your platform and domain, and get instant feature suggestions plus 3 design options.
              </p>

              <div className="space-y-3">
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
































































