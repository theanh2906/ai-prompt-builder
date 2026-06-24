import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AuthProvider, signInWithGoogle, signInWithFacebook, User } from '@/lib/auth';
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
        <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            fill="#EA4335"
          />
        </svg>
      </div>
    ),
    className: 'bg-violet-500/5 border-violet-400 dark:border-violet-500/50 dark:bg-violet-950/15 focus-visible:ring-violet-400/80 hover:bg-violet-500/10 hover:border-violet-500/80 focus-visible:border-violet-500/80',
  },
];

export function LoginDialog({ open, onOpenChange, onLogin }: LoginDialogProps) {
  const [loading, setLoading] = useState<AuthProvider | null>(null);

  const handleLogin = async (provider: AuthProvider) => {
    setLoading(provider);
    try {
      let user: User;
      if (provider === 'google') {
        user = await signInWithGoogle();
      } else {
        throw new Error(`Unsupported provider: ${provider}`);
      }
      onLogin(user);
      onOpenChange(false);
      toast.success(`Welcome, ${user.name}!`);
    } catch (error: unknown) {
      const code = (error as { code?: string })?.code;
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        // User dismissed the popup – no error toast needed
      } else {
        toast.error('Login failed. Please try again.');
      }
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
