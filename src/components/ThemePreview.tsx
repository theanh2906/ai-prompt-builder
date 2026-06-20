import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Theme } from '@/lib/themes';
import { motion } from 'framer-motion';

interface ThemePreviewProps {
  theme: Theme | null;
}

export function ThemePreview({ theme }: ThemePreviewProps) {
  if (!theme) {
    return (
      <Card className="p-8 h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p>Select a theme to see a preview</p>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      key={theme.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-1">{theme.name}</h3>
          <p className="text-sm text-muted-foreground">{theme.description}</p>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Button States
            </p>
            <div className="flex flex-wrap gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  className="px-4 py-2 rounded-md font-medium text-sm transition-all shadow-sm"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.background,
                  }}
                >
                  Primary
                </button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  className="px-4 py-2 rounded-md font-medium text-sm transition-all shadow-sm"
                  style={{
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.foreground,
                  }}
                >
                  Secondary
                </button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  className="px-4 py-2 rounded-md font-medium text-sm transition-all shadow-sm"
                  style={{
                    backgroundColor: theme.colors.accent,
                    color: theme.colors.background,
                  }}
                >
                  Accent
                </button>
              </motion.div>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Input Field
            </p>
            <input
              type="text"
              placeholder="Enter your text..."
              readOnly
              className="w-full px-3 py-2 rounded-md text-sm"
              style={{
                backgroundColor: theme.colors.background,
                color: theme.colors.foreground,
                border: `1px solid ${theme.colors.border}`,
              }}
            />
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Card</p>
            <div
              className="p-4 rounded-md shadow-sm"
              style={{
                backgroundColor: theme.colors.card,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <p
                className="font-medium text-sm mb-1"
                style={{ color: theme.colors.foreground }}
              >
                Card Title
              </p>
              <p
                className="text-xs"
                style={{ color: theme.colors.foreground, opacity: 0.7 }}
              >
                This is a sample card component
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Badges
            </p>
            <div className="flex flex-wrap gap-2">
              <span
                className="px-2 py-1 rounded-md text-xs font-medium"
                style={{
                  backgroundColor: theme.colors.muted,
                  color: theme.colors.foreground,
                }}
              >
                Default
              </span>
              <span
                className="px-2 py-1 rounded-md text-xs font-medium"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.background,
                }}
              >
                Primary
              </span>
              <span
                className="px-2 py-1 rounded-md text-xs font-medium"
                style={{
                  backgroundColor: theme.colors.accent,
                  color: theme.colors.background,
                }}
              >
                Accent
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Color Values
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <div
                  className="w-full h-8 rounded border mb-1"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <p className="text-[10px] text-muted-foreground truncate">
                  Primary
                </p>
              </div>
              <div>
                <div
                  className="w-full h-8 rounded border mb-1"
                  style={{ backgroundColor: theme.colors.secondary }}
                />
                <p className="text-[10px] text-muted-foreground truncate">
                  Secondary
                </p>
              </div>
              <div>
                <div
                  className="w-full h-8 rounded border mb-1"
                  style={{ backgroundColor: theme.colors.accent }}
                />
                <p className="text-[10px] text-muted-foreground truncate">
                  Accent
                </p>
              </div>
              <div>
                <div
                  className="w-full h-8 rounded border mb-1"
                  style={{ backgroundColor: theme.colors.muted }}
                />
                <p className="text-[10px] text-muted-foreground truncate">
                  Muted
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
