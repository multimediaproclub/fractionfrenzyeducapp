import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Star, Target, TrendingUp, Award, Calendar, Share, Camera } from 'lucide-react';
import html2canvas from 'html2canvas';
import { UserProfile, GameProgress } from '../types';
import { gameLevels } from '../data/gameLevels';

interface ProgressStatsProps {
  userProfile: UserProfile;
  gameProgress: GameProgress;
}

const ProgressStats: React.FC<ProgressStatsProps> = ({ userProfile, gameProgress }) => {
  const completedLevels = Object.values(gameProgress.levels).filter(level => level.completed).length;
  const totalStars = Object.values(gameProgress.levels).reduce((total, level) => total + level.stars, 0);
  const totalTrials = Object.values(gameProgress.levels).reduce((total, level) => total + level.trials, 0);
  const averageScore = totalTrials > 0 ? 
    Object.values(gameProgress.levels).reduce((total, level) => total + level.bestScore, 0) / Object.keys(gameProgress.levels).length 
    : 0;

  const getProgressPercentage = () => (completedLevels / 9) * 100;
  
  const getPerformanceLevel = () => {
    const percentage = getProgressPercentage();
    if (percentage >= 80) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 60) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (percentage >= 40) return { level: 'Progressing', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Getting Started', color: 'text-gray-600', bg: 'bg-gray-100' };
  };

  const performance = getPerformanceLevel();

  const shareProgress = async () => {
    const shareText = `I'm ${Math.round(getProgressPercentage())}% through FractionMaster with ${totalStars} stars earned! 🌟`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My FractionMaster Progress',
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or permission denied - fallback to clipboard
        navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
        alert('Progress shared! Link copied to clipboard.');
      }
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      alert('Progress shared! Link copied to clipboard.');
    }
  };

  const takeScreenshot = async () => {
    try {
      const element = document.querySelector('.progress-stats-container') as HTMLElement;
      if (element) {
        const canvas = await html2canvas(element, {
          backgroundColor: '#ffffff',
          scale: 2,
          logging: false,
          useCORS: true
        });
        
        // Create download link
        const link = document.createElement('a');
        link.download = `FractionMaster_Progress_${userProfile.name.replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    } catch (error) {
      console.error('Error taking screenshot:', error);
      alert('Unable to take screenshot. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 progress-stats-container">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Progress Statistics</h1>
        <p className="text-gray-600 mb-4">Track your fraction learning journey</p>
        
        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={shareProgress}
            className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            <Share size={18} />
            <span>Share Progress</span>
          </button>
          
          <button
            onClick={takeScreenshot}
            className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
          >
            <Camera size={18} />
            <span>Screenshot</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-blue-500">
          <Trophy className="mx-auto text-blue-500 mb-3" size={32} />
          <h3 className="text-2xl font-bold text-gray-800">{completedLevels}/9</h3>
          <p className="text-gray-600">Levels Completed</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-yellow-500">
          <Star className="mx-auto text-yellow-500 mb-3" size={32} />
          <h3 className="text-2xl font-bold text-gray-800">{totalStars}</h3>
          <p className="text-gray-600">Stars Earned</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-green-500">
          <Target className="mx-auto text-green-500 mb-3" size={32} />
          <h3 className="text-2xl font-bold text-gray-800">{Math.round(getProgressPercentage())}%</h3>
          <p className="text-gray-600">Course Progress</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-purple-500">
          <TrendingUp className="mx-auto text-purple-500 mb-3" size={32} />
          <h3 className="text-2xl font-bold text-gray-800">{averageScore.toFixed(1)}</h3>
          <p className="text-gray-600">Average Score</p>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Overall Performance</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Course Completion</span>
              <span className="font-semibold">{Math.round(getProgressPercentage())}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${performance.bg} ${performance.color}`}>
                {performance.level}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Attempts:</span>
                <span className="font-semibold">{totalTrials}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since:</span>
                <span className="font-semibold">{new Date(userProfile.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Pre-Test Results</h3>
              <p className="text-blue-600">
                {gameProgress.preTestCompleted 
                  ? `Score: ${gameProgress.preTestScore}/20 (${Math.round((gameProgress.preTestScore/20)*100)}%)`
                  : 'Not completed yet'
                }
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Post-Test Results</h3>
              <p className="text-green-600">
                {gameProgress.postTestCompleted 
                  ? `Score: ${gameProgress.postTestScore}/20 (${Math.round((gameProgress.postTestScore/20)*100)}%)`
                  : 'Not completed yet'
                }
              </p>
            </div>

            {gameProgress.preTestCompleted && gameProgress.postTestCompleted && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Improvement</h3>
                <p className="text-purple-600">
                  +{gameProgress.postTestScore - gameProgress.preTestScore} points 
                  ({Math.round(((gameProgress.postTestScore - gameProgress.preTestScore)/20)*100)}% improvement)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Level Progress</h2>
        
        <div className="space-y-4">
          {gameLevels.map((level, index) => {
            const progress = gameProgress.levels[level.id];
            
            return (
              <div key={level.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    progress?.completed ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {progress?.completed ? (
                      <Trophy className="text-green-600" size={20} />
                    ) : (
                      <span className="font-bold text-gray-600">{index + 1}</span>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800">{level.title}</h3>
                    <p className="text-sm text-gray-600">{level.subtitle}</p>
                  </div>
                </div>

                <div className="text-right">
                  {progress ? (
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < progress.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">
                        Best: {progress.bestScore}/5 ({progress.trials} tries)
                      </p>
                      {progress.completed && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">Not attempted</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Award className="text-yellow-500 mr-2" size={24} />
          Achievements
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg border-2 ${gameProgress.preTestCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
            <h3 className={`font-semibold ${gameProgress.preTestCompleted ? 'text-green-800' : 'text-gray-600'}`}>
              Pretest Warrior
            </h3>
            <p className={`text-sm ${gameProgress.preTestCompleted ? 'text-green-600' : 'text-gray-500'}`}>
              Complete the pretest assessment
            </p>
          </div>

          <div className={`p-4 rounded-lg border-2 ${completedLevels >= 3 ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>
            <h3 className={`font-semibold ${completedLevels >= 3 ? 'text-blue-800' : 'text-gray-600'}`}>
              Level Explorer
            </h3>
            <p className={`text-sm ${completedLevels >= 3 ? 'text-blue-600' : 'text-gray-500'}`}>
              Complete 3 game levels
            </p>
          </div>

          <div className={`p-4 rounded-lg border-2 ${totalStars >= 15 ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-gray-50'}`}>
            <h3 className={`font-semibold ${totalStars >= 15 ? 'text-yellow-800' : 'text-gray-600'}`}>
              Star Collector
            </h3>
            <p className={`text-sm ${totalStars >= 15 ? 'text-yellow-600' : 'text-gray-500'}`}>
              Earn 15 stars
            </p>
          </div>

          <div className={`p-4 rounded-lg border-2 ${completedLevels === 9 ? 'border-purple-300 bg-purple-50' : 'border-gray-200 bg-gray-50'}`}>
            <h3 className={`font-semibold ${completedLevels === 9 ? 'text-purple-800' : 'text-gray-600'}`}>
              Fraction Master
            </h3>
            <p className={`text-sm ${completedLevels === 9 ? 'text-purple-600' : 'text-gray-500'}`}>
              Complete all 9 levels
            </p>
          </div>

          <div className={`p-4 rounded-lg border-2 ${gameProgress.postTestCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
            <h3 className={`font-semibold ${gameProgress.postTestCompleted ? 'text-green-800' : 'text-gray-600'}`}>
              Posttest Champion
            </h3>
            <p className={`text-sm ${gameProgress.postTestCompleted ? 'text-green-600' : 'text-gray-500'}`}>
              Complete the posttest assessment
            </p>
          </div>

          <div className={`p-4 rounded-lg border-2 ${totalStars === 27 ? 'border-gold-300 bg-gold-50' : 'border-gray-200 bg-gray-50'}`}>
            <h3 className={`font-semibold ${totalStars === 27 ? 'text-yellow-800' : 'text-gray-600'}`}>
              Perfect Score
            </h3>
            <p className={`text-sm ${totalStars === 27 ? 'text-yellow-600' : 'text-gray-500'}`}>
              Earn all 27 stars (3 per level)
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Continue Your Journey</h2>
        <div className="space-y-4">
          {!gameProgress.preTestCompleted && (
            <Link to="/pre-test" className="block bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-blue-800">Take the Pre-Test</h3>
              <p className="text-blue-600 text-sm">Assess your current fraction knowledge</p>
            </Link>
          )}
          
          {completedLevels < 9 && (
            <Link to="/" className="block bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-blue-800">Continue Learning</h3>
              <p className="text-blue-600 text-sm">Progress through the game levels</p>
            </Link>
          )}
          
          {completedLevels === 9 && !gameProgress.postTestCompleted && (
            <Link to="/post-test" className="block bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-blue-800">Take the Post-Test</h3>
              <p className="text-blue-600 text-sm">Show off your fraction mastery</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;