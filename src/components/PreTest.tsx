import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { preTestQuestions } from '../data/testQuestions';
import FractionVisual from './FractionVisual';

interface PreTestProps {
  onTestComplete: (score: number) => void;
}

const PreTest: React.FC<PreTestProps> = ({ onTestComplete }) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(20).fill(null));
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (isComplete) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isComplete]);

  const handleTimeUp = () => {
    calculateScore();
    setIsComplete(true);
    setShowResults(true);
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const calculateScore = () => {
    let correctCount = 0;
    preTestQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    onTestComplete(correctCount);
  };

  const handleSubmitTest = () => {
    calculateScore();
    setIsComplete(true);
    setShowResults(true);
  };

  const currentQuestion = preTestQuestions[currentQuestionIndex];
  const answeredCount = selectedAnswers.filter(answer => answer !== null).length;

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center mb-6">
          <div className="mb-6">
            {score >= 15 ? (
              <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
            ) : (
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
            )}
            
            <h2 className="text-3xl font-bold mb-2">Pre-Test Complete!</h2>
            <p className="text-gray-600 mb-4">
              You scored {score} out of 20 questions correctly ({Math.round((score/20)*100)}%)
            </p>
            
            {score >= 15 && (
              <div className="bg-green-100 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-green-800">🎉 Excellent Start!</h3>
                <p className="text-green-600">You have a strong foundation in fractions!</p>
              </div>
            )}
            
            {score < 15 && (
              <div className="bg-blue-100 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-blue-800">📚 Ready to Learn!</h3>
                <p className="text-blue-600">This test helps us understand where to focus your learning.</p>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Continue to Learning Levels
            </button>
            
            <Link
              to="/certificates"
              className="block w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors text-center"
            >
              View Your Certificates
            </Link>
          </div>
        </div>

        {/* Answer Review */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Answer Review</h3>
          <div className="space-y-4">
            {preTestQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={index} className={`p-4 rounded-lg border ${
                  isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">Question {index + 1}: {question.question}</h4>
                    {isCorrect ? (
                      <CheckCircle className="text-green-500" size={20} />
                    ) : (
                      <XCircle className="text-red-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Your answer: {userAnswer !== null ? question.options[userAnswer] : 'No answer'}</p>
                    <p>Correct answer: {question.options[question.correctAnswer]}</p>
                    <p className="mt-2 text-gray-700">{question.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Test Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Pre-Test Assessment</h1>
            <p className="text-gray-600">Test your current knowledge of fractions</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-blue-100 px-3 py-2 rounded-lg">
              <Clock className="text-blue-600" size={20} />
              <span className="font-semibold text-blue-600">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div className="text-sm font-semibold text-gray-600">
              {answeredCount}/20 answered
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / 20) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {preTestQuestions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                index === currentQuestionIndex
                  ? 'bg-blue-500 text-white'
                  : selectedAnswers[index] !== null
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Current Question */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-6">
          Question {currentQuestionIndex + 1}: {currentQuestion.question}
        </h2>
        
        {/* Answer Options */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
              className={`p-4 text-lg font-semibold rounded-xl border-2 transition-all duration-200 ${
                selectedAnswers[currentQuestionIndex] === index
                  ? 'border-blue-500 bg-blue-100 text-blue-800'
                  : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            Previous
          </button>

          <div className="flex space-x-4">
            {currentQuestionIndex < 19 ? (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                disabled={answeredCount < 20}
                className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Test
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreTest;