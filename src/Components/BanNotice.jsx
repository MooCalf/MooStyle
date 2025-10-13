import React from 'react';
import { AlertCircle, Mail, Clock } from 'lucide-react';

export const BanNotice = ({ banReason, bannedAt }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Suspended</h1>
          <p className="text-gray-600">
            Your MooStyle account has been temporarily suspended.
          </p>
        </div>

        {banReason && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-yellow-800 mb-2">Reason for Suspension:</h3>
            <p className="text-sm text-yellow-700 italic">"{banReason}"</p>
          </div>
        )}

        {bannedAt && (
          <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
            <Clock className="w-4 h-4 mr-2" />
            <span>Suspended on {new Date(bannedAt).toLocaleDateString()}</span>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            If you believe this action was taken in error, or if you would like to discuss 
            the possibility of account reinstatement, please contact our support team.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-800 font-medium mb-2">💡 Need Help?</p>
            <p className="text-sm text-blue-700">
              You can access our support page to submit a detailed appeal request with your account information.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={() => window.location.href = '/support'}
              className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Submit Appeal Request
            </button>
            <a
              href="mailto:support@moostyle.com"
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Direct
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            This suspension is temporary and can be reviewed upon request.
          </p>
        </div>
      </div>
    </div>
  );
};
