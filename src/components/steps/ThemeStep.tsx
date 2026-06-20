import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MagnifyingGlass, Check } from '@phosphor-icons/react';
import { themes, Theme, getThemeById } from '@/lib/themes';
import { motion } from 'framer-motion';

interface ThemeStepProps {
  value: string | null;
  onChange: (themeId: string) => void;
}

export function ThemeStep({ value, onChange }: ThemeStepProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredThemes = themes.filter((theme) =>
    theme.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Select a theme</h2>
        <p className="text-muted-foreground text-lg">
          Choose a color palette for your application
        </p>
      </div>

      <div className="relative">
        <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <Input
          placeholder="Filter themes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <ScrollArea className="h-[500px] pr-4">
        {filteredThemes.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No themes found</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-primary hover:underline mt-2"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredThemes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                selected={value === theme.id}
                onClick={() => onChange(theme.id)}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </motion.div>
  );
}

interface ThemeCardProps {
  theme: Theme;
  selected: boolean;
  onClick: () => void;
}

function ThemeCard({ theme, selected, onClick }: ThemeCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="text-left relative"
    >
      <Card
        className={`p-4 space-y-3 transition-all ${
          selected
            ? 'ring-2 ring-accent shadow-lg'
            : 'hover:shadow-md hover:border-accent/50'
        }`}
      >
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full p-1.5"
          >
            <Check size={16} weight="bold" />
          </motion.div>
        )}

        <div className="flex gap-1.5">
          <div
            className="w-6 h-6 rounded-md border shadow-sm"
            style={{ backgroundColor: theme.colors.primary }}
          />
          <div
            className="w-6 h-6 rounded-md border shadow-sm"
            style={{ backgroundColor: theme.colors.secondary }}
          />
          <div
            className="w-6 h-6 rounded-md border shadow-sm"
            style={{ backgroundColor: theme.colors.accent }}
          />
          <div
            className="w-6 h-6 rounded-md border shadow-sm"
            style={{ backgroundColor: theme.colors.background }}
          />
        </div>

        <div>
          <h3 className="font-semibold">{theme.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {theme.description}
          </p>
        </div>
      </Card>
    </motion.button>
  );
}
