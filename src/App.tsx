import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LearningHub from './components/LearningHub';
import ProfileSetup from './components/ProfileSetup';
import GameLevel from './components/GameLevel';
import LessonView from './components/LessonView';
import PreTest from './components/PreTest';
import PostTest from './components/PostTest';
import Certificate from './components/Certificate';
import CertificateMenu from './components/CertificateMenu';
import ProgressStats from './components/ProgressStats';
import { UserProfile, GameProgress } from './types';
import { loadCurrentUser, saveUserAccount, authenticateUser, updateUserData, logoutUser, userExists } from './utils/storage';

type AuthState = 'login' | 'register' | 'authenticated';

function App() {
  const [authState, setAuthState] = useState<AuthState>('login');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [gameProgress, setGameProgress] = useState<GameProgress>({
    levels: {},
    preTestCompleted: false,
    postTestCompleted: false,
    preTestScore: 0,
    postTestScore: 0,
    preTestTrials: 0,
    postTestTrials: 0,
    totalStars: 0
  });

  useEffect(() => {
    const data = loadCurrentUser();
    if (data.profile) {
      setUserProfile(data.profile);
      setAuthState('authenticated');
    }
    if (data.progress) {
      setGameProgress(data.progress);
    }
  }, []);

  const updateProgress = (newProgress: GameProgress) => {
    setGameProgress(newProgress);
    if (userProfile) {
      updateUserData(userProfile, newProgress);
    }
  };

  const handleProfileCreate = (username: string, password: string, profile: UserProfile) => {
    if (userExists(username)) {
      alert('Username already exists. Please choose a different username.');
      return;
    }
    
    saveUserAccount(username, password, profile, gameProgress);
    setUserProfile(profile);
    setAuthState('authenticated');
  };

  const handleLogin = (username: string, password: string): boolean => {
    const userData = authenticateUser(username, password);
    
    if (userData) {
      setUserProfile(userData.profile);
      setGameProgress(userData.progress);
      setAuthState('authenticated');
      return true;
    }
    
    return false;
  };

  const handleLogout = () => {
    logoutUser();
    setUserProfile(null);
    setGameProgress({
      levels: {},
      preTestCompleted: false,
      postTestCompleted: false,
      preTestScore: 0,
      postTestScore: 0,
      preTestTrials: 0,
      postTestTrials: 0,
      totalStars: 0
    });
    setAuthState('login');
  };

  // Show login screen
  if (authState === 'login') {
    return (
      <Login 
        onLogin={handleLogin}
        onSwitchToRegister={() => setAuthState('register')}
      />
    );
  }

  // Show registration screen
  if (authState === 'register' || !userProfile) {
    return (
      <ProfileSetup 
        onProfileCreate={handleProfileCreate}
        onSwitchToLogin={() => setAuthState('login')}
      />
    );
  }

  // Show main app (authenticated)
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Header userProfile={userProfile} onLogout={handleLogout} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  userProfile={userProfile} 
                  gameProgress={gameProgress}
                />
              } 
            />
            <Route 
              path="/learning" 
              element={<LearningHub />} 
            />
            <Route 
              path="/game/:levelId" 
              element={
                <GameLevel 
                  gameProgress={gameProgress}
                  onProgressUpdate={updateProgress}
                />
              } 
            />
            <Route 
              path="/lesson/:topicId" 
              element={<LessonView />} 
            />
            <Route 
              path="/pre-test" 
              element={
                <PreTest 
                  onTestComplete={(score) =>
                    updateProgress({
                      ...gameProgress,
                      preTestCompleted: true,
                      preTestScore: score,
                      preTestTrials: gameProgress.preTestTrials + 1
                    })
                  }
                />
              } 
            />
            <Route 
              path="/post-test" 
              element={
                <PostTest 
                  onTestComplete={(score) =>
                    updateProgress({
                      ...gameProgress,
                      postTestCompleted: true,
                      postTestScore: score,
                      postTestTrials: gameProgress.postTestTrials + 1
                    })
                  }
                />
              } 
            />
            <Route 
              path="/certificate/:type" 
              element={<Certificate userProfile={userProfile} />} 
            />
            <Route 
              path="/certificates" 
              element={
                <CertificateMenu 
                  userProfile={userProfile}
                  gameProgress={gameProgress}
                />
              } 
            />
            <Route 
              path="/progress" 
              element={
                <ProgressStats 
                  userProfile={userProfile}
                  gameProgress={gameProgress}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;