import { auth } from '@/config/firebase';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';

export type AuthProvider = 'google' | 'facebook';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: AuthProvider;
}

function mapFirebaseUser(firebaseUser: FirebaseUser, provider: AuthProvider): User {
  const displayName = firebaseUser.displayName || firebaseUser.email || 'User';
  return {
    id: firebaseUser.uid,
    name: displayName,
    email: firebaseUser.email || '',
    avatar:
      firebaseUser.photoURL ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`,
    provider,
  };
}

export async function signInWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return mapFirebaseUser(result.user, 'google');
}

export async function signInWithFacebook(): Promise<User> {
  const provider = new FacebookAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return mapFirebaseUser(result.user, 'facebook');
}

export async function signOutUser(): Promise<void> {
  return signOut(auth);
}

export function subscribeToAuthChanges(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, (firebaseUser) => {
    if (!firebaseUser) {
      callback(null);
      return;
    }
    const providerData = firebaseUser.providerData;
    if (!providerData.length) {
      callback(null);
      return;
    }
    const supportedProviders: Record<string, AuthProvider> = {
      'google.com': 'google',
      'facebook.com': 'facebook',
    };
    const matchedEntry = providerData
      .map((pd) => supportedProviders[pd.providerId])
      .find((p): p is AuthProvider => p !== undefined);
    if (!matchedEntry) {
      // No supported provider found — treat session as signed out
      callback(null);
      return;
    }
    callback(mapFirebaseUser(firebaseUser, matchedEntry));
  });
}
