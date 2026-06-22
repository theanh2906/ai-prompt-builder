import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SavedPrompt } from '@/lib/types';
import { Trash, Eye, Clock } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface SavedPromptsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  savedPrompts: SavedPrompt[];
  onDelete: (id: string) => void;
  onLoad: (prompt: SavedPrompt) => void;
}

export function SavedPromptsDialog({
  open,
  onOpenChange,
  savedPrompts,
  onDelete,
  onLoad,
}: SavedPromptsDialogProps) {
  const [search, setSearch] = useState('');
  const [viewingPrompt, setViewingPrompt] = useState<SavedPrompt | null>(null);

  const filteredPrompts = savedPrompts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete "${name}"?`)) {
      onDelete(id);
      toast.success('Prompt deleted');
    }
  };

  const handleLoad = (prompt: SavedPrompt) => {
    onLoad(prompt);
    onOpenChange(false);
    toast.success(`Loaded "${prompt.name}"`);
  };

  if (viewingPrompt) {
    return (
      <Dialog open={open} onOpenChange={() => { setViewingPrompt(null); onOpenChange(false); }}>
        <DialogContent className="max-w-4xl h-[85vh] flex flex-col gap-0 p-0">
          <div className="px-6 pt-6 pb-4 shrink-0 border-b">
            <DialogHeader>
              <DialogTitle className="text-2xl">{viewingPrompt.name}</DialogTitle>
              <DialogDescription>
                Created {formatDate(viewingPrompt.createdAt)}
              </DialogDescription>
            </DialogHeader>
          </div>
          <ScrollArea className="flex-1 px-6 py-4">
            <pre className="bg-muted p-6 rounded-lg text-sm font-mono leading-relaxed whitespace-pre-wrap">
              {viewingPrompt.prompt}
            </pre>
          </ScrollArea>
          <div className="flex gap-3 px-6 py-4 border-t shrink-0">
            <Button variant="outline" onClick={() => setViewingPrompt(null)} className="flex-1">
              Back to List
            </Button>
            <Button onClick={() => handleLoad(viewingPrompt)} className="flex-1">
              Load This Prompt
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[85vh] flex flex-col gap-0 p-0">
        <div className="px-6 pt-6 pb-4 shrink-0 border-b">
          <DialogHeader>
            <DialogTitle className="text-2xl">My Saved Prompts</DialogTitle>
            <DialogDescription>
              View and manage your saved prompts ({savedPrompts.length} total)
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Input
              placeholder="Search prompts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 px-6 py-4">
          {filteredPrompts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {search ? 'No prompts match your search' : 'No saved prompts yet'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPrompts.map((prompt, index) => (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="border rounded-lg p-4 hover:border-primary transition-colors group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-2">{prompt.name}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary" className="capitalize">
                            {prompt.mode === 'ai-suggest' ? 'AI Suggest' : 'Expert Mode'}
                          </Badge>
                          {prompt.requirements.platform && (
                            <Badge variant="outline" className="capitalize">
                              {prompt.requirements.platform}
                            </Badge>
                          )}
                          {prompt.requirements.domain && (
                            <Badge variant="outline" className="capitalize">
                              {prompt.requirements.domain}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock size={14} />
                          <span>{formatDate(prompt.createdAt)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setViewingPrompt(prompt)}
                        >
                          <Eye size={16} className="mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(prompt.id, prompt.name)}
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="flex gap-3 px-6 py-4 border-t shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
