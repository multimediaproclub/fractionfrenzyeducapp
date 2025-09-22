import { UserProfile, GameProgress } from '../types';

// Clear all cached data on app startup
export const clearAllCache = () => {
  try {
    // Clear all FractionMaster related data
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('fractionmaster_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    // Also clear any other potential cache
    sessionStorage.clear();
    
    console.log('Cache cleared on startup');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

// Initialize caching after successful login
export const initializeCaching = (username: string) => {
  try {
    // Set a flag to indicate caching is now active
    localStorage.setItem('fractionmaster_caching_active', 'true');
    localStorage.setItem('fractionmaster_cache_initialized', new Date().toISOString());
    console.log('Caching initialized for user:', username);
  } catch (error) {
    console.error('Error initializing caching:', error);
  }
};

// Check if caching is active
export const isCachingActive = (): boolean => {
  try {
    return localStorage.getItem('fractionmaster_caching_active') === 'true';
  } catch (error) {
    return false;
  }
};

const USER_ACCOUNTS_KEY = 'fractionmaster_accounts';
const CURRENT_USER_KEY = 'fractionmaster_current_user';

interface UserAccount {
  username: string;
  password: string;
  profile: UserProfile;
  progress: GameProgress;
}

export const saveUserAccount = (username: string, password: string, profile: UserProfile, progress: GameProgress) => {
  try {
    // Only save if caching is active
    if (!isCachingActive()) {
      console.log('Caching not active, skipping save');
      return;
    }
    
    const accounts = loadAllAccounts();
    const accountIndex = accounts.findIndex(acc => acc.username === username);
    
    const userAccount: UserAccount = {
      username,
      password,
      profile,
      progress
    };
    
    if (accountIndex >= 0) {
      // Update existing account
      accounts[accountIndex] = userAccount;
    } else {
      // Add new account
      accounts.push(userAccount);
    }
    
    localStorage.setItem(USER_ACCOUNTS_KEY, JSON.stringify(accounts));
    localStorage.setItem(CURRENT_USER_KEY, username);
  } catch (error) {
    console.error('Error saving user account:', error);
  }
};

export const authenticateUser = (username: string, password: string): { profile: UserProfile; progress: GameProgress } | null => {
  try {
    // Always allow authentication, but don't cache until after login
    const accounts = loadAllAccounts();
    const account = accounts.find(acc => acc.username === username && acc.password === password);
    
    if (account) {
      // Initialize caching after successful authentication
      initializeCaching(username);
      localStorage.setItem(CURRENT_USER_KEY, username);
      return {
        profile: account.profile,
        progress: account.progress
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
};

export const updateUserData = (profile: UserProfile, progress: GameProgress) => {
  try {
    // Only update if caching is active
    if (!isCachingActive()) {
      console.log('Caching not active, skipping update');
      return;
    }
    
    const currentUsername = localStorage.getItem(CURRENT_USER_KEY);
    if (!currentUsername) return;
    
    const accounts = loadAllAccounts();
    const accountIndex = accounts.findIndex(acc => acc.username === currentUsername);
    
    if (accountIndex >= 0) {
      accounts[accountIndex].profile = profile;
      accounts[accountIndex].progress = progress;
      localStorage.setItem(USER_ACCOUNTS_KEY, JSON.stringify(accounts));
    }
  } catch (error) {
    console.error('Error updating user data:', error);
  }
};

export const loadCurrentUser = (): { profile: UserProfile | null; progress: GameProgress } => {
  try {
    // Only load if caching is active
    if (!isCachingActive()) {
      console.log('Caching not active, returning default state');
      return { profile: null, progress: getDefaultProgress() };
    }
    
    const currentUsername = localStorage.getItem(CURRENT_USER_KEY);
    if (!currentUsername) {
      console.log('No current username found');
      return { profile: null, progress: getDefaultProgress() };
    }
    
    const accounts = loadAllAccounts();
    const account = accounts.find(acc => acc.username === currentUsername);
    
    if (account) {
      console.log('Found existing user account:', currentUsername);
      return {
        profile: account.profile,
        progress: account.progress
      };
    }
    
    console.log('No account found for username:', currentUsername);
    return { profile: null, progress: getDefaultProgress() };
  } catch (error) {
    console.error('Error loading current user:', error);
    return { profile: null, progress: getDefaultProgress() };
  }
};

export const logoutUser = () => {
  try {
    // Clear caching flag on logout
    localStorage.removeItem('fractionmaster_caching_active');
    localStorage.removeItem('fractionmaster_cache_initialized');
    localStorage.removeItem(CURRENT_USER_KEY);
    console.log('User logged out, caching disabled');
  } catch (error) {
    console.error('Error logging out user:', error);
  }
};

export const userExists = (username: string): boolean => {
  try {
    // Always allow checking if user exists for registration
    const accounts = loadAllAccounts();
    return accounts.some(acc => acc.username === username);
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return false;
  }
};

const loadAllAccounts = (): UserAccount[] => {
  try {
    // Always allow loading accounts for authentication
    const accountsData = localStorage.getItem(USER_ACCOUNTS_KEY);
    return accountsData ? JSON.parse(accountsData) : [];
  } catch (error) {
    console.error('Error loading accounts:', error);
    return [];
  }
};

const getDefaultProgress = (): GameProgress => {
  return {
    levels: {},
    preTestCompleted: false,
    postTestCompleted: false,
    preTestScore: 0,
    postTestScore: 0,
    preTestTrials: 0,
    postTestTrials: 0,
    totalStars: 0
  };
};

// Legacy functions for backward compatibility
export const saveUserData = (profile: UserProfile | null, progress: GameProgress) => {
  if (profile) {
    // Only save if caching is active
    if (!isCachingActive()) {
      console.log('Caching not active, skipping legacy save');
      return;
    }
    updateUserData(profile, progress);
  }
};

export const loadUserData = () => {
  return loadCurrentUser();
};

export const clearUserData = () => {
  // Clear caching flag when clearing user data
  localStorage.removeItem('fractionmaster_caching_active');
  localStorage.removeItem('fractionmaster_cache_initialized');
  logoutUser();
};

export const hasExistingUser = (): boolean => {
  // Only check for existing user if caching is active
  if (!isCachingActive()) {
    return false;
  }
  const currentUsername = localStorage.getItem(CURRENT_USER_KEY);
  return currentUsername !== null;
};