import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Download, Share, Calendar, Trophy, Star, TrendingUp, Target } from 'lucide-react';
import { UserProfile, GameProgress } from '../types';
import { gameLevels } from '../data/gameLevels';
import html2canvas from 'html2canvas';

interface CertificateMenuProps {
  userProfile: UserProfile;
  gameProgress: GameProgress;
}

interface CertificateData {
  id: string;
  title: string;
  type: 'pre-test' | 'post-test' | 'level' | 'completion';
  earnedDate: string;
  description: string;
  icon: React.ReactNode;
  stats?: {
    score?: number;
    totalQuestions?: number;
    improvement?: number;
    stars?: number;
    trials?: number;
  };
}

const CertificateMenu: React.FC<CertificateMenuProps> = ({ userProfile, gameProgress }) => {
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateData | null>(null);

  const getEarnedCertificates = (): CertificateData[] => {
    const certificates: CertificateData[] = [];

    // Pre-Test Certificate
    if (gameProgress.preTestCompleted) {
      certificates.push({
        id: 'pre-test',
        title: 'Pre-Test Assessment Certificate',
        type: 'pre-test',
        earnedDate: new Date().toISOString(), // In real app, this would be stored
        description: 'Successfully completed the initial assessment',
        icon: <Award className="text-blue-500" size={24} />,
        stats: {
          score: gameProgress.preTestScore,
          totalQuestions: 20,
          trials: gameProgress.preTestTrials
        }
      });
    }

    // Level Certificates
    Object.entries(gameProgress.levels).forEach(([levelId, progress]) => {
      if (progress.completed) {
        const level = gameLevels.find(l => l.id === levelId);
        if (level) {
          certificates.push({
            id: `level-${levelId}`,
            title: `${level.title} Mastery Certificate`,
            type: 'level',
            earnedDate: progress.unlockedAt || new Date().toISOString(),
            description: `Mastered ${level.title} with ${progress.stars} stars`,
            icon: <Trophy className="text-yellow-500" size={24} />,
            stats: {
              score: progress.bestScore,
              totalQuestions: 5,
              stars: progress.stars
            }
          });
        }
      }
    });

    // Post-Test Certificate
    if (gameProgress.postTestCompleted) {
      const improvement = gameProgress.preTestCompleted 
        ? gameProgress.postTestScore - gameProgress.preTestScore 
        : 0;
      
      certificates.push({
        id: 'post-test',
        title: 'Post-Test Achievement Certificate',
        type: 'post-test',
        earnedDate: new Date().toISOString(),
        description: 'Demonstrated mastery of fraction operations',
        icon: <Star className="text-green-500" size={24} />,
        stats: {
          score: gameProgress.postTestScore,
          totalQuestions: 20,
          improvement: improvement,
          trials: gameProgress.postTestTrials
        }
      });
    }

    // Course Completion Certificate
    const completedLevels = Object.values(gameProgress.levels).filter(l => l.completed).length;
    if (completedLevels === 9 && gameProgress.postTestCompleted) {
      certificates.push({
        id: 'completion',
        title: 'FractionMaster Course Completion Certificate',
        type: 'completion',
        earnedDate: new Date().toISOString(),
        description: 'Successfully completed the entire FractionMaster course',
        icon: <Target className="text-purple-500" size={24} />,
        stats: {
          score: gameProgress.postTestScore,
          totalQuestions: 20,
          improvement: gameProgress.preTestCompleted ? gameProgress.postTestScore - gameProgress.preTestScore : 0,
          stars: Object.values(gameProgress.levels).reduce((total, level) => total + level.stars, 0),
          trials: gameProgress.postTestTrials
        }
      });
    }

    return certificates.sort((a, b) => new Date(b.earnedDate).getTime() - new Date(a.earnedDate).getTime());
  };

  const earnedCertificates = getEarnedCertificates();

  const downloadCertificate = async (certificate: CertificateData) => {
    try {
      // If we have a selected certificate modal open, capture that
      if (selectedCertificate && selectedCertificate.id === certificate.id) {
        const certificateElement = document.querySelector('.certificate-preview') as HTMLElement;
        if (certificateElement) {
          const canvas = await html2canvas(certificateElement, {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false,
            useCORS: true
          });
          
          canvas.toBlob((blob) => {
            if (blob) {
              const link = document.createElement('a');
              link.download = `${certificate.title.replace(/[^a-zA-Z0-9]/g, '_')}_${userProfile.name.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`;
              link.href = URL.createObjectURL(blob);
              link.click();
              URL.revokeObjectURL(link.href);
            }
          }, 'image/jpeg', 0.95);
          return;
        }
      }
      
      // Otherwise, open the certificate modal first
      setSelectedCertificate(certificate);
      
      // Wait a moment for the modal to render, then capture
      setTimeout(async () => {
        const certificateElement = document.querySelector('.certificate-preview') as HTMLElement;
        if (certificateElement) {
          const canvas = await html2canvas(certificateElement, {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false,
            useCORS: true
          });
          
          canvas.toBlob((blob) => {
            if (blob) {
              const link = document.createElement('a');
              link.download = `${certificate.title.replace(/[^a-zA-Z0-9]/g, '_')}_${userProfile.name.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`;
              link.href = URL.createObjectURL(blob);
              link.click();
              URL.revokeObjectURL(link.href);
            }
          }, 'image/jpeg', 0.95);
        }
      }, 500);
      
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Unable to download certificate. Please try again.');
    }
  };

  const shareCertificate = async (certificate: CertificateData) => {
    const shareText = `I've earned a ${certificate.title} from FractionMaster! 🎉`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: certificate.title,
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or permission denied - fallback to clipboard
        navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
        alert('Certificate link copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      alert('Certificate link copied to clipboard!');
    }
  };

  if (earnedCertificates.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <Award className="mx-auto text-gray-400 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">No Certificates Yet</h2>
          <p className="text-gray-500 mb-6">
            Complete assessments and game levels to earn certificates!
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            <Trophy size={20} />
            <span>Start Learning</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Certificates</h1>
        <p className="text-gray-600">View and download your earned achievements</p>
      </div>

      {/* Certificate Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {earnedCertificates.map((certificate) => (
          <div
            key={certificate.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-blue-500"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                {certificate.icon}
                <span className="text-xs text-gray-500">
                  {new Date(certificate.earnedDate).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{certificate.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{certificate.description}</p>
              
              {certificate.stats && (
                <div className="space-y-2 mb-4">
                  {certificate.stats.score !== undefined && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Score:</span>
                      <span className="font-semibold">
                        {certificate.stats.score}/{certificate.stats.totalQuestions} 
                        ({Math.round((certificate.stats.score / certificate.stats.totalQuestions!) * 100)}%)
                      </span>
                    </div>
                  )}
                  
                  {certificate.stats.improvement !== undefined && certificate.stats.improvement > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Improvement:</span>
                      <span className="font-semibold text-green-600">+{certificate.stats.improvement} points</span>
                    </div>
                  )}
                  
                  {certificate.stats.stars !== undefined && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Stars:</span>
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold">{certificate.stats.stars}</span>
                        <Star className="text-yellow-400 fill-current" size={12} />
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedCertificate(certificate)}
                  className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
                >
                  View
                </button>
                <button
                  onClick={() => downloadCertificate(certificate)}
                  className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <Download size={16} />
                </button>
                <button
                  onClick={() => shareCertificate(certificate)}
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Share size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Certificate Preview</h2>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              {/* Certificate Display */}
              <div className="certificate-preview bg-gradient-to-br from-blue-50 to-white border-4 border-blue-500 rounded-2xl p-8 mb-6">
                <div className="text-center">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-blue-900 mb-2">FractionMaster</h1>
                    <h2 className="text-xl font-semibold text-gray-700">{selectedCertificate.title}</h2>
                  </div>

                  {/* Student Info */}
                  <div className="mb-6">
                    <p className="text-lg text-gray-600 mb-2">This certifies that</p>
                    <h3 className="text-3xl font-bold text-blue-900 mb-2">{userProfile.name}</h3>
                    <p className="text-gray-700 mb-4">{selectedCertificate.description}</p>
                  </div>

                  {/* Results Section */}
                  {selectedCertificate.stats && (
                    <div className="bg-white bg-opacity-50 rounded-lg p-4 mb-6">
                      <h4 className="font-bold text-gray-800 mb-3">Achievement Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {selectedCertificate.stats.score !== undefined && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {selectedCertificate.stats.score}/{selectedCertificate.stats.totalQuestions}
                            </div>
                            <div className="text-gray-600">Final Score</div>
                          </div>
                        )}
                        
                        {selectedCertificate.stats.improvement !== undefined && selectedCertificate.stats.improvement > 0 && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              +{selectedCertificate.stats.improvement}
                            </div>
                            <div className="text-gray-600">Improvement</div>
                          </div>
                        )}
                        
                        {selectedCertificate.stats.stars !== undefined && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">
                              {selectedCertificate.stats.stars}
                            </div>
                            <div className="text-gray-600">Stars Earned</div>
                          </div>
                        )}
                        
                        {selectedCertificate.stats.trials !== undefined && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {selectedCertificate.stats.trials}
                            </div>
                            <div className="text-gray-600">Attempts</div>
                          </div>
                        )}
                        
                        {selectedCertificate.type === 'completion' && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">100%</div>
                            <div className="text-gray-600">Course Complete</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex justify-between items-center text-sm">
                    <div className="text-center">
                      <div className="border-t-2 border-gray-400 pt-2">
                        <p className="font-semibold text-gray-600">Date Earned</p>
                        <p className="text-gray-800">{new Date(selectedCertificate.earnedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-xl">🎓</span>
                      </div>
                      <p className="text-gray-600">Excellence in Mathematics</p>
                    </div>
                    <div className="text-center">
                      <div className="border-t-2 border-gray-400 pt-2">
                        <p className="font-semibold text-gray-600">Grade Level</p>
                        <p className="text-gray-800">{userProfile.gradeLevel}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => downloadCertificate(selectedCertificate)}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  <Download size={20} />
                  <span>Download</span>
                </button>
                
                <button
                  onClick={() => shareCertificate(selectedCertificate)}
                  className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  <Share size={20} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateMenu;