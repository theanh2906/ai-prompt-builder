export type AuthProvider = 'google' | 'facebook' | 'linkedin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: AuthProvider;
}

export async function simulateOAuthLogin(provider: AuthProvider): Promise<User> {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const mockUsers: Record<AuthProvider, User> = {
    google: {
      id: `google_${Date.now()}`,
      name: 'Google User',
      email: 'user@gmail.com',
      avatar: `https://ui-avatars.com/api/?name=Google+User&background=4285F4&color=fff`,
      provider: 'google',
    },
    facebook: {
      id: `facebook_${Date.now()}`,
      name: 'Facebook User',
      email: 'user@facebook.com',
      avatar: `https://ui-avatars.com/api/?name=Facebook+User&background=1877F2&color=fff`,
      provider: 'facebook',
    },
    linkedin: {
      id: `linkedin_${Date.now()}`,
      name: 'LinkedIn User',
      email: 'user@linkedin.com',
      avatar: `https://ui-avatars.com/api/?name=LinkedIn+User&background=0A66C2&color=fff`,
      provider: 'linkedin',
    },
  };
  
  return mockUsers[provider];
}
