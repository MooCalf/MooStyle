import { 
  ClipboardCheck, 
  Star, 
  ExternalLink,
  TestTube,
  Clock,
  Shield
} from "lucide-react";

export const BetaTestingSection = () => {
  return (
    <section id="beta-testing" className="py-6 sm:py-8 px-3 sm:px-4 relative bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mb-3 sm:mb-4">
            <TestTube className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">
            <span className="text-purple-600">Beta Testing</span> Questionnaire
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Help shape the future of MooStyle! Leave your feedback and comments so we know what you'd love to see!
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
          <div className="p-3 sm:p-4 md:p-6">
            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-3">
                  <Star className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Direct Influence</h3>
                <p className="text-sm text-gray-600">Your feedback directly shapes our product development</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Quick & Easy</h3>
                <p className="text-sm text-gray-600">Takes only 2-3 minutes to complete</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Privacy Protected</h3>
                <p className="text-sm text-gray-600">Completely confidential and secure</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-3 sm:p-4 mb-3 border border-purple-200">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  Ready to Make a Difference?
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3">
                  Take our quick questionnaire to join our beta testing community. 
                  Help us create the best possible experience for all MooStyle users!
                </p>
                
                <a
                  href="https://forms.gle/3WK96XVj8fUKGDuHA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
                >
                  <ClipboardCheck className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="text-center">Beta Testing Questionnaire</span>
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-3 sm:mt-4">
          <p className="text-xs sm:text-sm text-gray-500">
            Questions? Contact us at{" "}
            <a href="mailto:hello@moocalf.com" className="text-purple-600 hover:text-purple-700 font-medium">
              hello@moocalf.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
