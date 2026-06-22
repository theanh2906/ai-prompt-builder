import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Trash, Copy, Clock, Sparkle, MagnifyingGlass } from '@phosphor-icons/react';
import { SavedPrompt } from '@/lib/types';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface SavedPromptsProps {
  prompts: SavedPrompt[];
  onLoad: (prompt: SavedPrompt) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export function SavedPrompts({ prompts, onLoad, onDelete, onClose }: SavedPromptsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<SavedPrompt | null>(null);

  const filteredPrompts = prompts.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success('Prompt copied to clipboard!');
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl h-[85vh] flex flex-col gap-0 p-0">
          <div className="px-6 pt-6 pb-4 shrink-0 border-b">
            <DialogHeader>
              <DialogTitle className="text-2xl">Saved Prompts</DialogTitle>
              <DialogDescription>
                Load your previously created prompts
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <ScrollArea className="flex-1 px-6 py-4">
            {filteredPrompts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Sparkle size={32} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  {searchQuery ? 'No prompts found' : 'No saved prompts yet'}
                </p>
              </div>
            ) : (
              <div className="grid gap-3">
                {filteredPrompts.map((prompt, idx) => (
                  <motion.div
                    key={prompt.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card className="p-4 hover:border-primary transition-colors cursor-pointer" onClick={() => setSelectedPrompt(prompt)}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg mb-1 truncate">{prompt.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock size={16} />
                              {formatDate(prompt.createdAt)}
                            </div>
                            <span className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-md text-xs">
                              {prompt.mode === 'ai-suggest' ? '✨ AI Suggest' : '🎯 Expert'}
                            </span>
                            <span className="capitalize">{prompt.requirements.platform}</span>
                            <span className="capitalize">{prompt.requirements.domain}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyPrompt(prompt.prompt);
                            }}
                          >
                            <Copy size={16} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm('Delete this prompt?')) {
                                onDelete(prompt.id);
                              }
                            }}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </ScrollArea>

          <div className="px-6 py-4 border-t shrink-0">
            <Button onClick={onClose} variant="outline" className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {selectedPrompt && (
        <Dialog open={true} onOpenChange={() => setSelectedPrompt(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedPrompt.name}</DialogTitle>
              <DialogDescription>
                Created {formatDate(selectedPrompt.createdAt)}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-semibold">Platform:</span> {selectedPrompt.requirements.platform}
                </div>
                <div>
                  <span className="font-semibold">Domain:</span> {selectedPrompt.requirements.domain}
                </div>
                <div>
                  <span className="font-semibold">Features:</span> {selectedPrompt.requirements.features.length}
                </div>
                <div>
                  <span className="font-semibold">Mode:</span> {selectedPrompt.mode === 'ai-suggest' ? 'AI Suggest' : 'Expert'}
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setSelectedPrompt(null)}>
                Cancel
              </Button>
              <Button onClick={() => {
                onLoad(selectedPrompt);
                setSelectedPrompt(null);
                onClose();
              }}>
                Load This Prompt
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
