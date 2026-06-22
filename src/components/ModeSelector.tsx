import { motion } from 'framer-motion';
import { Sparkle, UserCircle } from '@phosphor-icons/react';
import { BuilderMode } from '@/lib/types';
import { BuilderMode } from '@/lib/types';

  return (
      initial={{ opacity: 0, y: 20 }}
 

          initial={{ scale: 0 }}
          
        >
        </motion.div>
          Choose Your Building Mode
        <p className="text-xl text-muted-fore
     

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
            classNam

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

              <div className="pt-4 border-t">
                <span className="text-sm font-semibold text-accent">✨ Quick & Smart</span>
              </div>
            </div>
                  <
        </motion.div>

        <motion.div

          animate={{ opacity: 1, x: 0 }}
              </div>
        >
        </motion.
            variant="outline"
            className="w-full h-auto p-0 hover:border-primary hover:shadow-lg hover:bg-primary/5 transition-all group"
            onClick={() => onSelectMode('expert')}

            <div className="w-full p-8 space-y-6 text-left">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <UserCircle size={28} weight="fill" className="text-white" />
                </div>

                  <h3 className="text-2xl font-bold">Expert Mode</h3>
                  <p className="text-muted-foreground">Full control</p>
                </div>


              <p className="text-muted-foreground break-words leading-relaxed">
                Take complete control over every detail. Manually select all features, design styles, and themes through a guided wizard.



                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">1</span>
                  </div>
                  <p className="text-sm">Platform, domain, and features</p>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">2</span>

                  <p className="text-sm">Design style and color mood</p>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">3</span>

                  <p className="text-sm">Choose from 20 curated themes</p>

              </div>

              <div className="pt-4 border-t">

              </div>

          </Button>

      </div>

  );

