import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  provider: 'firebase' | 'local' | 'demo';
}

// Check for env vars
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

// Initialize Firebase if configured
let auth: ReturnType<typeof getAuth> | null = null;
if (isFirebaseConfigured) {
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
  } catch (err) {
    console.warn('Firebase initialization skipped or failed:', err);
  }
}

const LOCAL_STORAGE_USER_KEY = 'nicheradar_auth_user';

export const authService = {
  isFirebaseAvailable(): boolean {
    return Boolean(auth);
  },

  getCurrentUser(): UserProfile | null {
    if (auth && auth.currentUser) {
      return {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        displayName: auth.currentUser.displayName || auth.currentUser.email?.split('@')[0] || 'User',
        photoURL: auth.currentUser.photoURL,
        provider: 'firebase',
      };
    }
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse local auth user:', e);
    }
    return null;
  },

  async signInWithGoogle(): Promise<UserProfile> {
    if (auth) {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Founder',
        photoURL: user.photoURL,
        provider: 'firebase',
      };
    }

    // Demo / Local Fallback if Firebase environment variables are not set
    const demoUser: UserProfile = {
      uid: 'google_user_' + Date.now(),
      email: 'founder.google@nicheradar.com',
      displayName: 'Google Founder',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      provider: 'demo',
    };
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(demoUser));
    return demoUser;
  },

  async signInWithEmail(email: string, pass: string): Promise<UserProfile> {
    if (auth) {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      const user = result.user;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email?.split('@')[0] || 'Founder',
        photoURL: user.photoURL,
        provider: 'firebase',
      };
    }

    // Fallback local auth
    const user: UserProfile = {
      uid: 'local_user_' + btoa(email).slice(0, 10),
      email: email,
      displayName: email.split('@')[0],
      photoURL: null,
      provider: 'local',
    };
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    return user;
  },

  async signUpWithEmail(email: string, pass: string, name?: string): Promise<UserProfile> {
    if (auth) {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      const user = result.user;
      return {
        uid: user.uid,
        email: user.email,
        displayName: name || user.email?.split('@')[0] || 'Founder',
        photoURL: user.photoURL,
        provider: 'firebase',
      };
    }

    const user: UserProfile = {
      uid: 'local_user_' + btoa(email).slice(0, 10),
      email: email,
      displayName: name || email.split('@')[0],
      photoURL: null,
      provider: 'local',
    };
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    return user;
  },

  async signInAsDemo(): Promise<UserProfile> {
    const demoUser: UserProfile = {
      uid: 'demo_founder_88',
      email: 'alex.founder@nicheradar.com',
      displayName: 'Alex Rivers',
      photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      provider: 'demo',
    };
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(demoUser));
    return demoUser;
  },

  async logout(): Promise<void> {
    if (auth) {
      await firebaseSignOut(auth);
    }
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  },

  subscribeToAuthChanges(callback: (user: UserProfile | null) => void): () => void {
    if (auth) {
      const unsubscribe = firebaseOnAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          callback({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            photoURL: firebaseUser.photoURL,
            provider: 'firebase',
          });
        } else {
          // Check local fallback
          const localUser = this.getCurrentUser();
          callback(localUser);
        }
      });
      return unsubscribe;
    }

    // Fallback polling/listener for local state
    const handler = () => {
      callback(this.getCurrentUser());
    };
    window.addEventListener('storage', handler);
    // Initial emission
    handler();

    return () => {
      window.removeEventListener('storage', handler);
    };
  },
};
