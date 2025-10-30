import React from 'react';
import { Link } from 'react-router-dom';
import { Play, BookOpen, Award, TrendingUp, Lock, Trophy, Star } from 'lucide-react';
import { UserProfile, GameProgress } from '../types';
import { gameLevels } from '../data/gameLevels';

interface DashboardProps {
  userProfile: UserProfile;
  gameProgress: GameProgress;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile, gameProgress }) => {
  const completedLevels = Object.values(gameProgress.levels).filter(level => level.completed).length;
  const totalStars = Object.values(gameProgress.levels).reduce((total, level) => total + level.stars, 0);
  
  const isLevelUnlocked = (levelIndex: number) => {
    if (levelIndex === 0) return true; // First level always unlocked
    const previousLevel = gameLevels[levelIndex - 1];
    const previousProgress = gameProgress.levels[previousLevel.id];
    return previousProgress?.completed || false;
  };

  const getLevelProgress = (levelId: string) => {
    return gameProgress.levels[levelId] || {
      completed: false,
      bestScore: 0,
      trials: 0,
      stars: 0
    };
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userProfile.name}!</h1>
            <p className="text-blue-100 text-lg">Grade {userProfile.gradeLevel} • Section {userProfile.section}</p>
            <div className="mt-4 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Trophy className="text-yellow-300" size={20} />
                <span className="font-semibold">{completedLevels}/9 Levels</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="text-yellow-300" size={20} />
                <span className="font-semibold">{totalStars} Stars</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-6xl">📚</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/pretest"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-green-500"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Pretest</h3>
              <p className="text-gray-600 text-sm">Test your current knowledge</p>
              {gameProgress.preTestCompleted && (
                <p className="text-green-600 text-sm font-semibold">Score: {gameProgress.preTestScore}/20</p>
              )}
            </div>
          </div>
        </Link>

        <Link
          to="/progress"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-blue-500"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Progress Stats</h3>
              <p className="text-gray-600 text-sm">Track your improvement</p>
              <p className="text-blue-600 text-sm font-semibold">{Math.round((completedLevels/9)*100)}% Complete</p>
            </div>
          </div>
        </Link>

        <Link
          to="/certificates"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-yellow-500"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Award className="text-yellow-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">My Certificates</h3>
              <p className="text-gray-600 text-sm">View earned achievements</p>
              <p className="text-yellow-600 text-sm font-semibold">
                {Object.values(gameProgress.levels).filter(l => l.completed).length + 
                 (gameProgress.preTestCompleted ? 1 : 0) + 
                 (gameProgress.postTestCompleted ? 1 : 0)} Earned
              </p>
            </div>
          </div>
        </Link>
        <Link
          to="/posttest"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-purple-500"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Posttest</h3>
              <p className="text-gray-600 text-sm">Show what you've learned</p>
              {gameProgress.postTestCompleted && (
                <p className="text-purple-600 text-sm font-semibold">Score: {gameProgress.postTestScore}/20</p>
              )}
            </div>
          </div>
        </Link>
      </div>

      {/* Game Levels */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Learning Levels</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameLevels.map((level, index) => {
            const isUnlocked = isLevelUnlocked(index);
            const progress = getLevelProgress(level.id);
            
            return (
              <div
                key={level.id}
                className={`relative bg-white rounded-xl shadow-lg transition-all duration-300 ${
                  isUnlocked ? 'hover:shadow-xl transform hover:scale-105' : 'opacity-60'
                } border-l-4 ${
                  progress.completed ? 'border-green-500' : isUnlocked ? 'border-blue-500' : 'border-gray-300'
                }`}
              >
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-gray-100 bg-opacity-75 rounded-xl flex items-center justify-center z-10">
                    <Lock className="text-gray-400" size={32} />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        progress.completed ? 'bg-green-100' : isUnlocked ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {progress.completed ? (
                          <Trophy className="text-green-600" size={20} />
                        ) : (
                          <Play className={isUnlocked ? 'text-blue-600' : 'text-gray-400'} size={20} />
                        )}
                      </div>
                      <span className="text-sm font-semibold text-gray-500">Level {index + 1}</span>
                    </div>
                    {progress.stars > 0 && (
                      <div className="flex items-center space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < progress.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-gray-800 mb-2">{level.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{level.subtitle}</p>
                  
                  {progress.trials > 0 && (
                    <div className="text-sm text-gray-500 mb-4">
                      <p>Best Score: {progress.bestScore}/5</p>
                      <p>Attempts: {progress.trials}</p>
                    </div>
                  )}
                  
                  {progress.completed && (
                    <div className="mb-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Trophy size={12} className="mr-1" />
                        Completed!
                      </span>
                    </div>
                  )}
                  
                  {isUnlocked ? (
                    <Link
                      to={`/game/${level.id}`}
                      className={`block text-center py-2 px-4 rounded-lg font-semibold transition-colors ${
                        progress.completed
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {progress.completed ? 'Play Again' : 'Start Level'}
                    </Link>
                  ) : (
                    <div className="text-center py-2 px-4 rounded-lg bg-gray-100 text-gray-500 font-semibold">
                      Complete Previous Level
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;