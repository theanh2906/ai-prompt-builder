import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

  onSelectMode: (mode: BuilderMode) => voi

interface ModeSelectorProps {
  onSelectMode: (mode: BuilderMode) => void;
}

export function ModeSelector({ onSelectMode }: ModeSelectorProps) {
          
        >
        </motion.div>
          Choose Your Building Mode
        <p className="text-xl text-muted-fore
     

        <motion.div
          animate={{ opacity: 1, x: 0 }}
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
              <div className=
                  Get started →
              </div>
          <

          initial={{ opacity: 0, x: 20 }}
          transition={{ delay: 0.4 }}
          <Button
            onClick={(
          >
              <div className="flex items-center gap-4">
                  <Sliders size={28} weight="fill" className="text-white" />
                <div c
                  <p

              <p className="text-muted-foreground break-words leading-relaxed overflow-wrap-anywhere">
              </p>
              <div

                  </div>
                </div>
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5"
                  </div>
                </div>
                  <div className="w-6 h-6 rounded-full bg-primary/20 fl
                  </di
                </div>

                <div className="inline-flex items-center gap-2 text-sm font-
                </div>
            </div>
        </motion.div>
    </motion.div>
}






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
