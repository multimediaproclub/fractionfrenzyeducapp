import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, Lightbulb, SkipForward, CheckCircle, XCircle, Star } from 'lucide-react';
import { GameProgress, Question } from '../types';
import { gameLevels } from '../data/gameLevels';
import FractionVisual from './FractionVisual';

interface GameLevelProps {
  gameProgress: GameProgress;
  onProgressUpdate: (progress: GameProgress) => void;
}

const GameLevel: React.FC<GameLevelProps> = ({ gameProgress, onProgressUpdate }) => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [skipsUsed, setSkipsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([]);

  const currentLevel = gameLevels.find(level => level.id === levelId);
  const currentQuestion = currentLevel?.questions[currentQuestionIndex];

  useEffect(() => {
    if (!currentLevel) {
      navigate('/');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1 && !isLevelComplete) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentLevel, isLevelComplete, navigate]);

  const handleTimeUp = () => {
    // Auto-submit current answer or mark as incorrect
    if (selectedAnswer === null) {
      setCorrectAnswers(prev => [...prev, false]);
    } else {
      const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;
      setCorrectAnswers(prev => [...prev, isCorrect]);
      if (isCorrect) setScore(score + 1);
    }
    
    if (currentQuestionIndex === 4) {
      completeLevel();
    } else {
      nextQuestion();
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setCorrectAnswers(prev => [...prev, isCorrect]);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestionIndex === 4) {
        completeLevel();
      } else {
        nextQuestion();
      }
    }, 2000);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHint(false);
  };

  const completeLevel = () => {
    setIsLevelComplete(true);
    
    const stars = calculateStars(score);
    const currentProgress = gameProgress.levels[levelId!] || { 
      completed: false, 
      bestScore: 0, 
      trials: 0, 
      stars: 0 
    };
    
    const newProgress: GameProgress = {
      ...gameProgress,
      levels: {
        ...gameProgress.levels,
        [levelId!]: {
          completed: score >= 4, // 75% mastery (4 out of 5)
          bestScore: Math.max(currentProgress.bestScore, score),
          trials: currentProgress.trials + 1,
          stars: Math.max(currentProgress.stars, stars),
          unlockedAt: currentProgress.completed ? currentProgress.unlockedAt : new Date().toISOString()
        }
      }
    };
    
    onProgressUpdate(newProgress);
  };

  const calculateStars = (finalScore: number): number => {
    if (finalScore === 5) return 3;
    if (finalScore === 4) return 2;
    if (finalScore >= 3) return 1;
    return 0;
  };

  const handleUseHint = () => {
    if (hintsUsed < 3) {
      setHintsUsed(hintsUsed + 1);
      setShowHint(true);
    }
  };

  const handleSkipQuestion = () => {
    if (skipsUsed < 3) {
      setSkipsUsed(skipsUsed + 1);
      setCorrectAnswers(prev => [...prev, false]);
      
      if (currentQuestionIndex === 4) {
        completeLevel();
      } else {
        nextQuestion();
      }
    }
  };

  if (!currentLevel || !currentQuestion) {
    return <div>Loading...</div>;
  }

  if (isLevelComplete) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          {score >= 4 ? (
            <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
          ) : (
            <XCircle className="mx-auto text-red-500 mb-4" size={64} />
          )}
          
          <h2 className="text-3xl font-bold mb-2">
            {score >= 4 ? 'Level Completed!' : 'Level Failed'}
          </h2>
          
          <p className="text-gray-600 mb-4">
            You scored {score} out of 5 questions correctly
          </p>
          
          <div className="flex justify-center items-center space-x-1 mb-6">
            {[...Array(3)].map((_, i) => (
              <Star
                key={i}
                size={24}
                className={i < calculateStars(score) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          
          {score >= 4 && (
            <div className="bg-green-100 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-green-800">🎉 Mastery Achieved!</h3>
              <p className="text-green-600">You've unlocked the next level!</p>
            </div>
          )}
          
          {score < 4 && (
            <div className="bg-blue-100 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-800">Keep Trying!</h3>
              <p className="text-blue-600">You need 4 out of 5 correct to master this level.</p>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Level Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{currentLevel.title}</h1>
            <p className="text-gray-600">{currentLevel.subtitle}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-blue-100 px-3 py-2 rounded-lg">
              <Clock className="text-blue-600" size={20} />
              <span className="font-semibold text-blue-600">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>
            <div className="text-sm font-semibold text-gray-600">
              Question {currentQuestionIndex + 1} of 5
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Game Tools */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <button
              onClick={handleUseHint}
              disabled={hintsUsed >= 3 || showHint}
              className="flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-600 transition-colors"
            >
              <Lightbulb size={16} />
              <span>Hint ({3 - hintsUsed} left)</span>
            </button>
            
            <button
              onClick={handleSkipQuestion}
              disabled={skipsUsed >= 3}
              className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
            >
              <SkipForward size={16} />
              <span>Skip ({3 - skipsUsed} left)</span>
            </button>
          </div>
          
          <div className="text-lg font-semibold text-blue-600">
            Score: {score}/5
          </div>
        </div>
        
        {showHint && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">💡 Hint:</h4>
            <p className="text-yellow-700">{currentQuestion.explanation}</p>
          </div>
        )}
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-6 text-center">{currentQuestion.question}</h2>
        
        {/* Answer Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`p-4 text-lg font-semibold rounded-xl border-2 transition-all duration-200 ${
                showResult
                  ? index === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-100 text-green-800'
                    : selectedAnswer === index
                    ? 'border-red-500 bg-red-100 text-red-800'
                    : 'border-gray-200 bg-gray-50 text-gray-400'
                  : selectedAnswer === index
                  ? 'border-blue-500 bg-blue-100 text-blue-800 transform scale-105'
                  : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        
        {/* Result Display */}
        {showResult && (
          <div className={`p-4 rounded-lg mb-4 ${
            selectedAnswer === currentQuestion.correctAnswer
              ? 'bg-green-100 border border-green-200'
              : 'bg-red-100 border border-red-200'
          }`}>
            <h4 className={`font-semibold mb-2 ${
              selectedAnswer === currentQuestion.correctAnswer ? 'text-green-800' : 'text-red-800'
            }`}>
              {selectedAnswer === currentQuestion.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
            </h4>
            <p className="text-gray-700">{currentQuestion.explanation}</p>
          </div>
        )}
        
        {/* Submit Button */}
        {!showResult && (
          <div className="text-center">
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            >
              Submit Answer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameLevel;