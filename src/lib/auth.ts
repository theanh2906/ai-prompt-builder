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
  return {
    id: firebaseUser.uid,
    name: firebaseUser.displayName || firebaseUser.email || 'User',
    email: firebaseUser.email || '',
    avatar:
      firebaseUser.photoURL ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(firebaseUser.displayName || 'User')}&background=random`,
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
    const providerId = firebaseUser.providerData[0]?.providerId;
    let provider: AuthProvider;
    if (providerId === 'google.com') {
      provider = 'google';
    } else if (providerId === 'facebook.com') {
      provider = 'facebook';
    } else {
      // Unsupported provider — treat session as signed out
      callback(null);
      return;
    }
    callback(mapFirebaseUser(firebaseUser, provider));
  });
}
