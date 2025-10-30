import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Lightbulb } from 'lucide-react';
import { lessons } from '../data/lessons';
import FractionVisual from './FractionVisual';

const LessonView: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();

  const lesson = lessons.find(l => l.id === topicId);

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="text-blue-600" size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{lesson.title}</h1>
              <p className="text-gray-600 capitalize">{lesson.operation} Operations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Lightbulb className="text-yellow-500 mr-2" size={24} />
          Introduction
        </h2>
        <p className="text-gray-700 leading-relaxed">{lesson.content.introduction}</p>
      </div>

      {/* Steps */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Step-by-Step Process</h2>
        <div className="space-y-4">
          {lesson.content.steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <p className="text-gray-700 pt-1">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Examples */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Examples</h2>
        <div className="space-y-6">
          {lesson.content.examples.map((example, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Example {index + 1}</h3>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-lg font-semibold text-blue-800">{example.problem}</p>
              </div>
              
              {/* Visual representation for first example */}
              {index === 0 && lesson.operation === 'addition' && (
                <div className="flex justify-center space-x-8 mb-4">
                  <FractionVisual numerator={1} denominator={4} size={80} />
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-600">+</span>
                  </div>
                  <FractionVisual numerator={2} denominator={4} size={80} />
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-600">=</span>
                  </div>
                  <FractionVisual numerator={3} denominator={4} size={80} />
                </div>
              )}
              
              <div className="bg-green-50 p-4 rounded-lg mb-2">
                <p className="font-semibold text-green-800">Solution: {example.solution}</p>
              </div>
              <p className="text-gray-700 text-sm">{example.explanation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">💡 Helpful Tips</h2>
        <div className="space-y-3">
          {lesson.content.tips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonView;