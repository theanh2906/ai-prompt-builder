import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AuthProvider, simulateOAuthLogin, User } from '@/lib/auth';
import { useState } from 'react';
import { toast } from 'sonner';
import { Sparkle } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (user: User) => void;
}

const providers: {
  id: AuthProvider;
  name: string;
  renderIcon: () => React.ReactNode;
  className: string;
}[] = [
  {
    id: 'google',
    name: 'Google',
    renderIcon: () => (
      <div className="w-8 h-8 flex items-center justify-center shrink-0">
        <div className="w-[22px] h-[22px] rounded-full bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 shadow-xs shadow-blue-500/20" />
      </div>
    ),
    className: 'bg-violet-500/5 border-violet-400 dark:border-violet-500/50 dark:bg-violet-950/15 focus-visible:ring-violet-400/80 hover:bg-violet-500/10 hover:border-violet-500/80 focus-visible:border-violet-500/80',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    renderIcon: () => (
      <div className="w-8 h-8 flex items-center justify-center shrink-0">
        <div className="w-[17px] h-[17px] bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 rotate-45 shadow-xs shadow-blue-500/20" />
      </div>
    ),
    className: 'bg-muted/40 border-border/60 dark:border-border/40 focus-visible:ring-primary/40 hover:bg-muted/60 hover:border-border',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    renderIcon: () => (
      <div className="w-8 h-8 flex items-center justify-center shrink-0">
        <div className="w-[21px] h-[21px] rounded-[5px] bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 shadow-xs shadow-blue-500/20" />
      </div>
    ),
    className: 'bg-muted/40 border-border/60 dark:border-border/40 focus-visible:ring-primary/40 hover:bg-muted/60 hover:border-border',
  },
];

export function LoginDialog({ open, onOpenChange, onLogin }: LoginDialogProps) {
  const [loading, setLoading] = useState<AuthProvider | null>(null);

  const handleLogin = async (provider: AuthProvider) => {
    setLoading(provider);
    try {
      const user = await simulateOAuthLogin(provider);
      onLogin(user);
      onOpenChange(false);
      toast.success(`Welcome, ${user.name}!`);
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md pt-12 pb-6 px-6 overflow-visible">
        {/* Overlapping top logo */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border-4 border-background shadow-lg z-50">
          <Sparkle size={38} weight="fill" className="text-white animate-pulse" />
        </div>

        <DialogHeader className="flex flex-col items-center text-center space-y-1">
          <DialogTitle className="text-[26px] font-bold tracking-tight text-foreground">Sign in to continue</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm max-w-[280px] sm:max-w-none">
            Choose a provider to sign in and save your prompts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 pt-4">
          {providers.map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                className={cn(
                  "w-full h-14 text-left justify-start gap-3 px-5 text-sm font-semibold rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none",
                  provider.className
                )}
                onClick={() => handleLogin(provider.id)}
                disabled={loading !== null}
              >
                {provider.renderIcon()}
                <span className="flex-1">
                  {loading === provider.id ? 'Signing in...' : `Continue with ${provider.name}`}
                </span>
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center pt-4">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </DialogContent>
    </Dialog>
  );
}
