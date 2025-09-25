import { UserProfile, GameProgress } from '../types';

const USER_ACCOUNTS_KEY = 'fractionmaster_accounts';
const CURRENT_USER_KEY = 'fractionmaster_current_user';
const CACHE_STATUS_KEY = 'fractionmaster_cache_status';
const CACHE_TIMESTAMP_KEY = 'fractionmaster_cache_timestamp';

interface UserAccount {
  username: string;
  password: string;
  profile: UserProfile;
  progress: GameProgress;
}

interface CacheStatus {
  active: boolean;
  timestamp: string;
}

// Cache management functions
export const clearAllCache = () => {
  try {
    // Clear all FractionMaster related localStorage data
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('fractionmaster_')) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    // Clear sessionStorage completely
    sessionStorage.clear();
    
    console.log('Cache cleared successfully');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

export const initializeCaching = () => {
  try {
    const cacheStatus: CacheStatus = {
      active: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(CACHE_STATUS_KEY, JSON.stringify(cacheStatus));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, new Date().toISOString());
    console.log('Caching initialized');
  } catch (error) {
    console.error('Error initializing caching:', error);
  }
};

export const isCachingActive = (): boolean => {
  try {
    const cacheStatusData = localStorage.getItem(CACHE_STATUS_KEY);
    if (!cacheStatusData) return false;
    
    const cacheStatus: CacheStatus = JSON.parse(cacheStatusData);
    return cacheStatus.active;
  } catch (error) {
    console.error('Error checking cache status:', error);
    return false;
  }
};

export const disableCaching = () => {
  try {
    localStorage.removeItem(CACHE_STATUS_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
    console.log('Caching disabled');
  } catch (error) {
    console.error('Error disabling caching:', error);
  }
};

export const saveUserAccount = (username: string, password: string, profile: UserProfile, progress: GameProgress) => {
  if (!isCachingActive()) {
    console.log('Caching not active, skipping save');
    return;
  }
  
  try {
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
    const accounts = loadAllAccounts();
    const account = accounts.find(acc => acc.username === username && acc.password === password);
    
    if (account) {
      // Initialize caching after successful authentication
      initializeCaching();
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
  if (!isCachingActive()) {
    console.log('Caching not active, skipping update');
    return;
  }
  
  try {
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
  if (!isCachingActive()) {
    console.log('Caching not active, returning default state');
    return { profile: null, progress: getDefaultProgress() };
  }
  
  try {
    const currentUsername = localStorage.getItem(CURRENT_USER_KEY);
    if (!currentUsername) {
      return { profile: null, progress: getDefaultProgress() };
    }
    
    const accounts = loadAllAccounts();
    const account = accounts.find(acc => acc.username === currentUsername);
    
    if (account) {
      return {
        profile: account.profile,
        progress: account.progress
      };
    }
    
    return { profile: null, progress: getDefaultProgress() };
  } catch (error) {
    console.error('Error loading current user:', error);
    return { profile: null, progress: getDefaultProgress() };
  }
};

export const logoutUser = () => {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
    disableCaching();
  } catch (error) {
    console.error('Error logging out user:', error);
  }
};

export const userExists = (username: string): boolean => {
  try {
    const accounts = loadAllAccounts();
    return accounts.some(acc => acc.username === username);
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return false;
  }
};

const loadAllAccounts = (): UserAccount[] => {
  try {
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
    updateUserData(profile, progress);
  }
};

export const loadUserData = () => {
  return loadCurrentUser();
};

export const clearUserData = () => {
  logoutUser();
};

export const hasExistingUser = (): boolean => {
  if (!isCachingActive()) return false;
  const currentUsername = localStorage.getItem(CURRENT_USER_KEY);
  return currentUsername !== null;
};