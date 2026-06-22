import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AuthProvider, simulateOAuthLogin, User } from '@/lib/auth';
import { useState } from 'react';
import { toast } from 'sonner';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (user: User) => void;
}

const providers: { id: AuthProvider; name: string; icon: string; color: string }[] = [
  { id: 'google', name: 'Google', icon: '🔵', color: 'bg-blue-500' },
  { id: 'facebook', name: 'Facebook', icon: '🔷', color: 'bg-blue-600' },
  { id: 'linkedin', name: 'LinkedIn', icon: '🟦', color: 'bg-blue-700' },
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Sign in to continue</DialogTitle>
          <DialogDescription>
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
                className="w-full h-12 text-left justify-start gap-3 hover:bg-muted"
                onClick={() => handleLogin(provider.id)}
                disabled={loading !== null}
              >
                <span className="text-2xl">{provider.icon}</span>
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
