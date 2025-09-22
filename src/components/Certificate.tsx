import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Share, Star, Award } from 'lucide-react';
import html2canvas from 'html2canvas';
import { UserProfile } from '../types';

interface CertificateProps {
  userProfile: UserProfile;
}

const Certificate: React.FC<CertificateProps> = ({ userProfile }) => {
  const { type } = useParams<{ type: string }>();
  const certificateRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const getCertificateTitle = () => {
    switch (type) {
      case 'pre-test':
        return 'Pre-Test Completion Certificate';
      case 'post-test':
        return 'Post-Test Achievement Certificate';
      case 'level':
        return 'Level Mastery Certificate';
      default:
        return 'FractionMaster Certificate';
    }
  };

  const getCertificateDescription = () => {
    switch (type) {
      case 'pre-test':
        return 'for successfully completing the Pre-Test Assessment and demonstrating readiness to learn fraction operations';
      case 'post-test':
        return 'for successfully completing the Post-Test Assessment and demonstrating mastery of fraction operations';
      case 'level':
        return 'for demonstrating excellence in fraction operations through comprehensive learning and practice';
      default:
        return 'for outstanding achievement in fraction mathematics';
    }
  };

  const downloadCertificate = async () => {
    try {
      if (certificateRef.current) {
        const canvas = await html2canvas(certificateRef.current, {
          backgroundColor: '#ffffff',
          scale: 2,
          logging: false,
          useCORS: true
        });
        
        // Convert to JPG and download
        canvas.toBlob((blob) => {
          if (blob) {
            const link = document.createElement('a');
            link.download = `${getCertificateTitle().replace(/[^a-zA-Z0-9]/g, '_')}_${userProfile.name.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`;
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
          }
        }, 'image/jpeg', 0.95);
      }
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Unable to download certificate. Please try again.');
    }
  };

  const shareCertificate = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${userProfile.name} - FractionMaster Certificate`,
          text: `I've earned a ${getCertificateTitle()} from FractionMaster!`,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or permission denied - fallback to clipboard
        navigator.clipboard.writeText(`Check out my FractionMaster certificate! ${window.location.href}`);
        alert('Certificate link copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(`Check out my FractionMaster certificate! ${window.location.href}`);
      alert('Certificate link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Certificate of Achievement</h1>
        <p className="text-gray-600">Congratulations on your success!</p>
      </div>

      {/* Certificate */}
      <div 
        ref={certificateRef}
        className="bg-gradient-to-br from-blue-50 to-white border-4 border-blue-500 rounded-2xl p-12 shadow-2xl"
        style={{ aspectRatio: '4/3' }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Award className="text-white" size={40} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-blue-900 mb-2">FractionMaster</h1>
          <h2 className="text-2xl font-semibold text-gray-700">{getCertificateTitle()}</h2>
        </div>

        {/* Certificate Body */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 mb-4">This certifies that</p>
          <h3 className="text-4xl font-bold text-blue-900 mb-4">{userProfile.name}</h3>
          <p className="text-lg text-gray-700 mb-4">
            {getCertificateDescription()}
          </p>
          <div className="flex justify-center items-center space-x-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-400 fill-current" size={24} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end">
          <div className="text-center">
            <div className="border-t-2 border-gray-400 pt-2">
              <p className="text-sm font-semibold text-gray-600">Date</p>
              <p className="text-gray-800">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">🎓</span>
            </div>
            <p className="text-sm text-gray-600">Excellence in Mathematics</p>
          </div>
          <div className="text-center">
            <div className="border-t-2 border-gray-400 pt-2">
              <p className="text-sm font-semibold text-gray-600">Grade</p>
              <p className="text-gray-800">{userProfile.gradeLevel}</p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 left-4 w-8 h-8 border-4 border-blue-300 rounded-full opacity-50"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-4 border-blue-300 rounded-full opacity-50"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-4 border-blue-300 rounded-full opacity-50"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-4 border-blue-300 rounded-full opacity-50"></div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={downloadCertificate}
          className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          <Download size={20} />
          <span>Download Certificate</span>
        </button>
        
        <button
          onClick={shareCertificate}
          className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
        >
          <Share size={20} />
          <span>Share Achievement</span>
        </button>
        
        <button
          onClick={() => navigate('/certificates')}
          className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
        >
          <Award size={20} />
          <span>View All Certificates</span>
        </button>
      </div>

      {/* Additional Info */}
      <div className="mt-8 text-center text-gray-600">
        <p className="mb-2">🎉 You've demonstrated excellent progress in fraction mathematics!</p>
        <p>Continue practicing to maintain and improve your skills.</p>
      </div>
    </div>
  );
};

export default Certificate;