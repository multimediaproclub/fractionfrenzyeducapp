import React, { useState } from 'react';
import { BookOpen, ChevronRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const LearningHub: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['addition']);

  const topics = [
    // Addition Topics
    {
      id: 'addition-similar',
      title: 'Similar Fractions',
      description: 'Learn to add fractions with the same denominator',
      operation: 'addition',
      category: 'similar'
    },
    {
      id: 'addition-dissimilar',
      title: 'Dissimilar Fractions',
      description: 'Master adding fractions with different denominators',
      operation: 'addition',
      category: 'dissimilar'
    },
    {
      id: 'addition-mixed',
      title: 'With Mixed Numbers',
      description: 'Add whole numbers combined with fractions',
      operation: 'addition',
      category: 'mixed'
    },

    // Subtraction Topics
    {
      id: 'subtraction-similar',
      title: 'Similar Fractions',
      description: 'Subtract fractions with the same denominator',
      operation: 'subtraction',
      category: 'similar'
    },
    {
      id: 'subtraction-dissimilar',
      title: 'Dissimilar Fractions',
      description: 'Subtract fractions with different denominators',
      operation: 'subtraction',
      category: 'dissimilar'
    },
    {
      id: 'subtraction-mixed',
      title: 'With Mixed Numbers',
      description: 'Subtract mixed numbers and handle borrowing',
      operation: 'subtraction',
      category: 'mixed'
    },

    // Multiplication Topics
    {
      id: 'multiplication-proper',
      title: 'Proper and Improper Fractions',
      description: 'Multiply fractions by multiplying across',
      operation: 'multiplication',
      category: 'proper'
    },
    {
      id: 'multiplication-mixed',
      title: 'With Whole Numbers and Mixed Numbers',
      description: 'Multiply fractions with whole and mixed numbers',
      operation: 'multiplication',
      category: 'mixed'
    },

    // Division Topics
    {
      id: 'division-proper',
      title: 'Proper and Improper Fractions',
      description: 'Divide fractions using the reciprocal method',
      operation: 'division',
      category: 'proper'
    },
    {
      id: 'division-mixed',
      title: 'With Whole Numbers and Mixed Numbers',
      description: 'Divide fractions involving whole and mixed numbers',
      operation: 'division',
      category: 'mixed'
    }
  ];

  const operations = [
    { key: 'addition', title: 'Addition', color: 'blue', icon: '➕' },
    { key: 'subtraction', title: 'Subtraction', color: 'red', icon: '➖' },
    { key: 'multiplication', title: 'Multiplication', color: 'green', icon: '✖️' },
    { key: 'division', title: 'Division', color: 'purple', icon: '➗' }
  ];

  const toggleSection = (operation: string) => {
    setExpandedSections(prev => 
      prev.includes(operation) 
        ? prev.filter(op => op !== operation)
        : [...prev, operation]
    );
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', accent: 'bg-blue-500' },
      red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', accent: 'bg-red-500' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', accent: 'bg-green-500' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', accent: 'bg-purple-500' }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Learning Hub</h1>
        <p className="text-gray-600">Explore interactive lessons for all fraction operations</p>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {operations.map((operation) => {
          const isExpanded = expandedSections.includes(operation.key);
          const operationTopics = topics.filter(topic => topic.operation === operation.key);
          const colors = getColorClasses(operation.color);

          return (
            <div key={operation.key} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(operation.key)}
                className={`w-full p-6 ${colors.bg} ${colors.border} border-b-2 flex items-center justify-between hover:opacity-80 transition-opacity`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${colors.accent} rounded-lg flex items-center justify-center text-white text-xl`}>
                    {operation.icon}
                  </div>
                  <div className="text-left">
                    <h2 className={`text-xl font-bold ${colors.text}`}>{operation.title}</h2>
                    <p className="text-gray-600">
                      {operationTopics.length} topics available
                    </p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className={colors.text} size={24} />
                ) : (
                  <ChevronRight className={colors.text} size={24} />
                )}
              </button>

              {/* Section Content */}
              {isExpanded && (
                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {operationTopics.map((topic) => (
                      <div key={topic.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-gray-800 mb-2">{topic.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                        
                        <div className="space-y-2">
                          <Link
                            to={`/lesson/${topic.id}`}
                            className={`block w-full ${colors.accent} text-white py-2 px-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity text-center`}
                          >
                            Start Lesson
                          </Link>
                          <Link
                            to={`/game/${topic.id}`}
                            className="block w-full bg-gray-500 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-gray-600 transition-colors text-center"
                          >
                            Practice Game
                          </Link>
                        </div>
                        
                        {/* Example Diagram */}
                        {topic.id === 'addition-similar' && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <h4 className="text-xs font-semibold text-gray-700 mb-2">Example: 1/4 + 2/4</h4>
                            <div className="flex items-center justify-center space-x-2 text-xs">
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 border-2 border-blue-300 rounded-full relative">
                                  <div className="absolute top-0 left-0 w-4 h-8 bg-blue-400 rounded-l-full"></div>
                                </div>
                                <span className="mt-1 text-blue-600 font-semibold">1/4</span>
                              </div>
                              <span className="text-gray-600">+</span>
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 border-2 border-blue-300 rounded-full relative">
                                  <div className="absolute top-0 left-0 w-4 h-8 bg-blue-400 rounded-l-full"></div>
                                  <div className="absolute top-0 right-0 w-4 h-8 bg-blue-400 rounded-r-full"></div>
                                </div>
                                <span className="mt-1 text-blue-600 font-semibold">2/4</span>
                              </div>
                              <span className="text-gray-600">=</span>
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 border-2 border-green-300 rounded-full relative">
                                  <div className="absolute top-0 left-0 w-6 h-8 bg-green-400 rounded-l-full"></div>
                                </div>
                                <span className="mt-1 text-green-600 font-semibold">3/4</span>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {topic.id === 'addition-dissimilar' && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <h4 className="text-xs font-semibold text-gray-700 mb-2">Example: 1/2 + 1/4</h4>
                            <div className="flex items-center justify-center space-x-2 text-xs">
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 border-2 border-blue-300 rounded-full relative">
                                  <div className="absolute top-0 left-0 w-4 h-8 bg-blue-400 rounded-l-full"></div>
                                </div>
                                <span className="mt-1 text-blue-600 font-semibold">1/2</span>
                              </div>
                              <span className="text-gray-600">+</span>
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 border-2 border-blue-300 rounded-full relative">
                                  <div className="absolute top-0 left-0 w-2 h-8 bg-blue-400" style={{clipPath: 'polygon(0 0, 100% 0, 50% 100%, 0 100%)'}}></div>
                                </div>
                                <span className="mt-1 text-blue-600 font-semibold">1/4</span>
                              </div>
                              <span className="text-gray-600">=</span>
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 border-2 border-green-300 rounded-full relative">
                                  <div className="absolute top-0 left-0 w-6 h-8 bg-green-400" style={{clipPath: 'polygon(0 0, 100% 0, 75% 100%, 0 100%)'}}></div>
                                </div>
                                <span className="mt-1 text-green-600 font-semibold">3/4</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 mt-2">Convert 1/2 to 2/4, then add: 2/4 + 1/4 = 3/4</p>
                          </div>
                        )}
                        
                        {topic.id === 'subtraction-similar' && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <h4 className="text-xs font-semibold text-gray-700 mb-2">Example: 3/4 - 1/4</h4>
                            <div className="flex items-center justify-center space-x-2 text-xs">
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 border-2 border-red-300 rounded-full relative">
                                  <div className="absolute top-0 left-0 w-6 h-8 bg-red-400" style={{clipPath: 'polygon(0 0, 100% 0, 75% 100%, 0 100%)'}}></div>
                                </div>
                                <span className="mt-1 text-red-600 font-semibold">3/4</span>
                              </div>
                              <span className="text-gray-600">-</span>
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 border-2 border-red-300 rounded-full relative">
                                  <div className="absolute top-0 left-0 w-2 h-8 bg-red-400" style={{clipPath: 'polygon(0 0, 100% 0, 50% 100%, 0 100%)'}}></div>
                                </div>
                                <span className="mt-1 text-red-600 font-semibold">1/4</span>
                              </div>
                              <span className="text-gray-600">=</span>
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 border-2 border-green-300 rounded-full relative">
                                  <div className="absolute top-0 left-0 w-4 h-8 bg-green-400 rounded-l-full"></div>
                                </div>
                                <span className="mt-1 text-green-600 font-semibold">2/4 = 1/2</span>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {topic.id === 'multiplication-proper' && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <h4 className="text-xs font-semibold text-gray-700 mb-2">Example: 1/2 × 1/3</h4>
                            <div className="text-center text-xs">
                              <div className="mb-2">
                                <span className="text-purple-600 font-semibold">1 × 1 = 1</span>
                                <span className="text-gray-600 mx-2">(multiply numerators)</span>
                              </div>
                              <div className="mb-2">
                                <span className="text-purple-600 font-semibold">2 × 3 = 6</span>
                                <span className="text-gray-600 mx-2">(multiply denominators)</span>
                              </div>
                              <div className="text-green-600 font-semibold">Result: 1/6</div>
                            </div>
                          </div>
                        )}
                        
                        {topic.id === 'division-fractions' && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <h4 className="text-xs font-semibold text-gray-700 mb-2">Example: 1/2 ÷ 1/4</h4>
                            <div className="text-center text-xs">
                              <div className="mb-2">
                                <span className="text-orange-600 font-semibold">1/2 × 4/1</span>
                                <span className="text-gray-600 mx-2">(multiply by reciprocal)</span>
                              </div>
                              <div className="mb-2">
                                <span className="text-orange-600 font-semibold">1 × 4 = 4</span>
                              </div>
                              <div className="mb-2">
                                <span className="text-orange-600 font-semibold">2 × 1 = 2</span>
                              </div>
                              <div className="text-green-600 font-semibold">Result: 4/2 = 2</div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">💡 Learning Tips</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-blue-800">For Lessons:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Read through examples carefully</li>
              <li>• Practice with the visual aids</li>
              <li>• Take notes on key concepts</li>
              <li>• Try the practice games after each lesson</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-purple-800">For Practice Games:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Complete lessons before attempting games</li>
              <li>• Use hints wisely (limited to 3 per level)</li>
              <li>• Aim for 4 out of 5 correct to unlock next level</li>
              <li>• Review explanations for incorrect answers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningHub;