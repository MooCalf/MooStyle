import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const TermsOfService = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Terms of Service - MOOSTYLES</title>
        <meta name="description" content="Terms of Service for MOOSTYLES - Legal terms and conditions for using our services." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <button
              onClick={handleBackClick}
              className="flex items-center gap-2 text-white hover:text-purple-200 transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Back to Homepage</span>
            </button>
            
            {/* Title */}
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
              <p className="text-lg opacity-90">Legal terms and conditions</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Last updated:</strong> October 17, 2025
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">AGREEMENT TO OUR LEGAL TERMS</h2>
              
              <p className="mb-6">
                We are <strong>MOOSTYLES</strong> ("Company," "we," "us," "our"), a company registered in Jamaica. We operate the website <a href="https://moostyles.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline">https://moostyles.com</a> (the "Site"), as well as any other related products and services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").
              </p>
              
              <p className="mb-6">
                You can contact us by email at <a href="mailto:hello@moostyles.com" className="text-purple-600 hover:text-purple-700 underline">hello@moostyles.com</a>.
              </p>
              
              <p className="mb-6">
                These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and MOOSTYLES, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
              </p>
              
              <p className="mb-6">
                Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms from time to time. We will alert you about any changes by updating the "Last updated" date of these Legal Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Legal Terms by your continued use of the Services after the date such revised Legal Terms are posted.
              </p>
              
              <p className="mb-6">
                The Services are intended for users who are at least 13 years of age. All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Services. If you are a minor, you must have your parent or guardian read and agree to these Legal Terms prior to you using the Services.
              </p>
              
              <p className="mb-8">We recommend that you print a copy of these Legal Terms for your records.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">TABLE OF CONTENTS</h2>
              
              <ul className="list-disc pl-6 mb-6 space-y-1">
                <li><a href="#services" className="text-purple-600 hover:text-purple-700 underline">1. OUR SERVICES</a></li>
                <li><a href="#ip" className="text-purple-600 hover:text-purple-700 underline">2. INTELLECTUAL PROPERTY RIGHTS</a></li>
                <li><a href="#userreps" className="text-purple-600 hover:text-purple-700 underline">3. USER REPRESENTATIONS</a></li>
                <li><a href="#products" className="text-purple-600 hover:text-purple-700 underline">4. PRODUCTS</a></li>
                <li><a href="#purchases" className="text-purple-600 hover:text-purple-700 underline">5. DONATIONS AND PAYMENT</a></li>
                <li><a href="#returnno" className="text-purple-600 hover:text-purple-700 underline">6. REFUNDS POLICY</a></li>
                <li><a href="#partnerships" className="text-purple-600 hover:text-purple-700 underline">7. PARTNERSHIPS AND MOD SUBMISSIONS</a></li>
                <li><a href="#software" className="text-purple-600 hover:text-purple-700 underline">8. SOFTWARE</a></li>
                <li><a href="#advertising" className="text-purple-600 hover:text-purple-700 underline">9. ADVERTISING AND THIRD-PARTY SERVICES</a></li>
                <li><a href="#prohibited" className="text-purple-600 hover:text-purple-700 underline">10. PROHIBITED ACTIVITIES</a></li>
                <li><a href="#ugc" className="text-purple-600 hover:text-purple-700 underline">11. USER GENERATED CONTRIBUTIONS</a></li>
                <li><a href="#license" className="text-purple-600 hover:text-purple-700 underline">12. CONTRIBUTION LICENSE</a></li>
                <li><a href="#thirdparty" className="text-purple-600 hover:text-purple-700 underline">13. THIRD-PARTY WEBSITES AND CONTENT</a></li>
                <li><a href="#advertisers" className="text-purple-600 hover:text-purple-700 underline">14. ADVERTISERS</a></li>
                <li><a href="#sitemanage" className="text-purple-600 hover:text-purple-700 underline">15. SERVICES MANAGEMENT</a></li>
                <li><a href="#ppyes" className="text-purple-600 hover:text-purple-700 underline">16. PRIVACY POLICY</a></li>
                <li><a href="#terms" className="text-purple-600 hover:text-purple-700 underline">17. TERM AND TERMINATION</a></li>
                <li><a href="#modifications" className="text-purple-600 hover:text-purple-700 underline">18. MODIFICATIONS AND INTERRUPTIONS</a></li>
                <li><a href="#law" className="text-purple-600 hover:text-purple-700 underline">19. GOVERNING LAW</a></li>
                <li><a href="#disputes" className="text-purple-600 hover:text-purple-700 underline">20. DISPUTE RESOLUTION</a></li>
                <li><a href="#corrections" className="text-purple-600 hover:text-purple-700 underline">21. CORRECTIONS</a></li>
                <li><a href="#disclaimer" className="text-purple-600 hover:text-purple-700 underline">22. DISCLAIMER</a></li>
                <li><a href="#liability" className="text-purple-600 hover:text-purple-700 underline">23. LIMITATIONS OF LIABILITY</a></li>
                <li><a href="#indemnification" className="text-purple-600 hover:text-purple-700 underline">24. INDEMNIFICATION</a></li>
                <li><a href="#userdata" className="text-purple-600 hover:text-purple-700 underline">25. USER DATA</a></li>
                <li><a href="#electronic" className="text-purple-600 hover:text-purple-700 underline">26. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</a></li>
                <li><a href="#california" className="text-purple-600 hover:text-purple-700 underline">27. CALIFORNIA USERS AND RESIDENTS</a></li>
                <li><a href="#misc" className="text-purple-600 hover:text-purple-700 underline">28. MISCELLANEOUS</a></li>
                <li><a href="#contact" className="text-purple-600 hover:text-purple-700 underline">29. CONTACT US</a></li>
              </ul>

              <h2 id="services" className="text-2xl font-bold text-gray-900 mb-4">1. OUR SERVICES</h2>
              <p className="mb-6">
                The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
              </p>
              <p className="mb-6">
                The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).
              </p>

              <h2 id="ip" className="text-2xl font-bold text-gray-900 mb-4">2. INTELLECTUAL PROPERTY RIGHTS</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Our intellectual property</h3>
              <p className="mb-4">
                We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").
              </p>
              <p className="mb-4">
                Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.
              </p>
              <p className="mb-6">
                The Content and Marks are provided in or through the Services "AS IS" for your personal, non-commercial use only.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Your use of our Services</h3>
              <p className="mb-4">
                Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES" section below, we grant you a non-exclusive, non-transferable, revocable license to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>access the Services; and</li>
                <li>download or print a copy of any portion of the Content to which you have properly gained access,</li>
              </ul>
              <p className="mb-4">solely for your personal, non-commercial use.</p>
              <p className="mb-4">
                Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
              </p>
              <p className="mb-6">
                If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to: <a href="mailto:hello@moostyles.com" className="text-purple-600 hover:text-purple-700 underline">hello@moostyles.com</a>. If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content.
              </p>
              
              <p className="mb-6">
                We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.
              </p>
              <p className="mb-6">
                Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.
              </p>

              <h2 id="userreps" className="text-2xl font-bold text-gray-900 mb-4">3. USER REPRESENTATIONS</h2>
              <p className="mb-4">By using the Services, you represent and warrant that:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>(1) you have the legal capacity and you agree to comply with these Legal Terms;</li>
                <li>(2) you are not under the age of 13;</li>
                <li>(3) you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Services;</li>
                <li>(4) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise;</li>
                <li>(5) you will not use the Services for any illegal or unauthorized purpose; and</li>
                <li>(6) your use of the Services will not violate any applicable law or regulation.</li>
              </ul>
              <p className="mb-6">
                If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).
              </p>

              <h2 id="products" className="text-2xl font-bold text-gray-900 mb-4">4. PRODUCTS</h2>
              <p className="mb-6">
                All products are subject to availability. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.
              </p>

              <h2 id="purchases" className="text-2xl font-bold text-gray-900 mb-4">5. DONATIONS AND PAYMENT</h2>
              <p className="mb-4">We accept donations through the following platforms:</p>
              <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Patreon</li>
                <li>PayPal</li>
                <li>Stripe (future implementation)</li>
                <li>Other payment processors as we may add</li>
              </ul>
              <p className="mb-4">
                <strong>Donation Terms:</strong> All donations are voluntary and non-refundable unless there is a technical error on our part. Donations help support the development and maintenance of our modding platform and community. You agree to provide current, complete, and accurate payment information for all donations made via the Services.
              </p>
              <p className="mb-4">
                <strong>Payment Processing:</strong> All donations are processed through third-party payment processors. We do not store your payment information directly. Payment processing fees may apply and are handled by the respective payment processors. All donations are processed in US dollars unless otherwise specified.
              </p>
              <p className="mb-4">
                <strong>Donation Recognition:</strong> Donors may be recognized on our platform unless they choose to remain anonymous. We reserve the right to refuse any donation for any legitimate business reason, including but not limited to suspected fraud or violation of our terms.
              </p>
              <p className="mb-6">
                <strong>Future Payment Features:</strong> We may implement additional payment features in the future, including subscription services, premium mod access, or partnership revenue sharing. These features will be subject to additional terms and conditions that will be communicated to users before implementation.
              </p>

              <h2 id="returnno" className="text-2xl font-bold text-gray-900 mb-4">6. REFUNDS POLICY</h2>
              <p className="mb-4">
                <strong>Donations:</strong> All donations are voluntary and non-refundable unless there is a technical error on our part. If you experience a technical issue with your donation, please contact us within 30 days of the transaction.
              </p>
              <p className="mb-4">
                <strong>Future Paid Services:</strong> For any future paid services we may offer, refunds will be handled on a case-by-case basis. We reserve the right to refuse refunds for services that have been delivered or accessed.
              </p>
              <p className="mb-6">
                <strong>Dispute Resolution:</strong> If you have concerns about a transaction, please contact us at <a href="mailto:hello@moostyles.com" className="text-purple-600 hover:text-purple-700 underline">hello@moostyles.com</a> to discuss the matter before initiating any chargeback or dispute with your payment provider.
              </p>

              <h2 id="partnerships" className="text-2xl font-bold text-gray-900 mb-4">7. PARTNERSHIPS AND MOD SUBMISSIONS</h2>
              <p className="mb-4">
                <strong>Partnership Program:</strong> We welcome partnerships with mod creators who wish to list their mods on our platform. Partnership applications are subject to review and approval at our sole discretion.
              </p>
              <p className="mb-4">
                <strong>Mod Submission Guidelines:</strong> All submitted mods must:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Be original work or properly licensed</li>
                <li>Comply with the target game's terms of service</li>
                <li>Not contain malicious code or inappropriate content</li>
                <li>Include proper documentation and installation instructions</li>
                <li>Be compatible with current game versions</li>
              </ul>
              <p className="mb-4">
                <strong>Content Ownership:</strong> Partners retain ownership of their mod content. By submitting mods to our platform, partners grant us a non-exclusive license to host, distribute, and promote their mods through our Services.
              </p>
              <p className="mb-4">
                <strong>Revenue Sharing:</strong> Any revenue sharing arrangements will be detailed in separate partnership agreements. We reserve the right to implement revenue sharing models for partnerships in the future.
              </p>
              <p className="mb-6">
                <strong>Partnership Termination:</strong> Either party may terminate a partnership agreement with 30 days written notice. We reserve the right to remove mods from our platform for violations of these terms or other legitimate business reasons.
              </p>

              <h2 id="software" className="text-2xl font-bold text-gray-900 mb-4">8. SOFTWARE</h2>
              <p className="mb-6">
                We may include software for use in connection with our Services. If such software is accompanied by an end user license agreement ("EULA"), the terms of the EULA will govern your use of the software. If such software is not accompanied by a EULA, then we grant to you a non-exclusive, revocable, personal, and non-transferable license to use such software solely in connection with our services and in accordance with these Legal Terms. Any software and any related documentation is provided "AS IS" without warranty of any kind, either express or implied, including, without limitation, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. You accept any and all risk arising out of use or performance of any software. You may not reproduce or redistribute any software except in accordance with the EULA or these Legal Terms.
              </p>

              <h2 id="advertising" className="text-2xl font-bold text-gray-900 mb-4">9. ADVERTISING AND THIRD-PARTY SERVICES</h2>
              <p className="mb-4">
                <strong>Google AdSense:</strong> Our Services may display advertisements through Google AdSense and other advertising networks. These advertisements are provided by third parties and we do not control their content or targeting.
              </p>
              <p className="mb-4">
                <strong>Ad Interaction:</strong> By interacting with advertisements on our platform, you may be redirected to third-party websites. We are not responsible for the content, privacy practices, or terms of service of these third-party sites.
              </p>
              <p className="mb-4">
                <strong>Ad Personalization:</strong> Advertisements may be personalized based on your browsing behavior and interests. You can manage your ad preferences through your browser settings or Google's Ad Settings.
              </p>
              <p className="mb-6">
                <strong>Revenue from Advertising:</strong> We may receive revenue from advertising displayed on our platform. This revenue helps support the maintenance and development of our Services.
              </p>

              <h2 id="prohibited" className="text-2xl font-bold text-gray-900 mb-4">10. PROHIBITED ACTIVITIES</h2>
              <p className="mb-4">
                You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
              </p>
              <p className="mb-4">As a user of the Services, you agree not to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                <li>Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.</li>
                <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
                <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
                <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
                <li>Engage in unauthorized framing of or linking to the Services.</li>
                <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party's uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services.</li>
                <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
                <li>Delete the copyright or other proprietary rights notice from any Content.</li>
                <li>Attempt to impersonate another user or person or use the username of another user.</li>
                <li>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats ("gifs"), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as "spyware" or "passive collection mechanisms" or "pcms").</li>
                <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.</li>
                <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.</li>
                <li>Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.</li>
                <li>Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
                <li>Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.</li>
                <li>Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorized script or other software.</li>
                <li>Use a buying agent or purchasing agent to make purchases on the Services.</li>
                <li>Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
                <li>Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
              </ul>

              <h2 id="ugc" className="text-2xl font-bold text-gray-900 mb-4">11. USER GENERATED CONTRIBUTIONS</h2>
              <p className="mb-4">
                The Services does not offer users to submit or post content. We may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Contributions may be viewable by other users of the Services and through third-party websites. As such, any Contributions you transmit may be treated in accordance with the Services' Privacy Policy. When you create or make available any Contributions, you thereby represent and warrant that:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.</li>
                <li>You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Services, and other users of the Services to use your Contributions in any manner contemplated by the Services and these Legal Terms.</li>
                <li>You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Services and these Legal Terms.</li>
                <li>Your Contributions are not false, inaccurate, or misleading.</li>
                <li>Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.</li>
                <li>Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).</li>
                <li>Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.</li>
                <li>Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people.</li>
                <li>Your Contributions do not violate any applicable law, regulation, or rule.</li>
                <li>Your Contributions do not violate the privacy or publicity rights of any third party.</li>
                <li>Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.</li>
                <li>Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.</li>
                <li>Your Contributions do not otherwise violate, or link to material that violates, any provision of these Legal Terms, or any applicable law or regulation.</li>
              </ul>
              <p className="mb-6">
                Any use of the Services in violation of the foregoing violates these Legal Terms and may result in, among other things, termination or suspension of your rights to use the Services.
              </p>

              <h2 id="license" className="text-2xl font-bold text-gray-900 mb-4">12. CONTRIBUTION LICENSE</h2>
              <p className="mb-4">
                You and Services agree that we may access, store, process, and use any information and personal data that you provide following the terms of the Privacy Policy and your choices (including settings).
              </p>
              <p className="mb-4">
                By submitting suggestions or other feedback regarding the Services, you agree that we can use and share such feedback for any purpose without compensation to you.
              </p>
              <p className="mb-6">
                We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Services. You are solely responsible for your Contributions to the Services and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.
              </p>

              <h2 id="thirdparty" className="text-2xl font-bold text-gray-900 mb-4">13. THIRD-PARTY WEBSITES AND CONTENT</h2>
              <p className="mb-6">
                The Services may contain (or you may be sent via the Site) links to other websites ("Third-Party Websites") as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ("Third-Party Content"). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Services or any Third-Party Content posted on, available through, or installed from the Services, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content. Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us. If you decide to leave the Services and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Legal Terms no longer govern. You should review the applicable terms and policies, including privacy and data gathering practices, of any website to which you navigate from the Services or relating to any applications you use or install from the Services. Any purchases you make through Third-Party Websites will be through other websites and from other companies, and we take no responsibility whatsoever in relation to such purchases which are exclusively between you and the applicable third party. You agree and acknowledge that we do not endorse the products or services offered on Third-Party Websites and you shall hold us blameless from any harm caused by your purchase of such products or services. Additionally, you shall hold us blameless from any losses sustained by you or harm caused to you relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Websites.
              </p>

              <h2 id="advertisers" className="text-2xl font-bold text-gray-900 mb-4">14. ADVERTISERS</h2>
              <p className="mb-6">
                We allow advertisers to display their advertisements and other information in certain areas of the Services, such as sidebar advertisements or banner advertisements. We simply provide the space to place such advertisements, and we have no other relationship with advertisers.
              </p>

              <h2 id="sitemanage" className="text-2xl font-bold text-gray-900 mb-4">15. SERVICES MANAGEMENT</h2>
              <p className="mb-6">
                We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.
              </p>

              <h2 id="ppyes" className="text-2xl font-bold text-gray-900 mb-4">16. PRIVACY POLICY</h2>
              <p className="mb-6">
                We care about data privacy and security. Please review our Privacy Policy: <a href="https://moostyles.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline">https://moostyles.com/privacy-policy</a>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in the United States. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the United States, then through your continued use of the Services, you are transferring your data to the United States, and you expressly consent to have your data transferred to and processed in the United States.
              </p>
              <p className="mb-6">
                Further, we do not knowingly accept, request, or solicit information from children or knowingly market to children. Therefore, in accordance with the U.S. Children's Online Privacy Protection Act, if we receive actual knowledge that anyone under the age of 13 has provided personal information to us without the requisite and verifiable parental consent, we will delete that information from the Services as quickly as is reasonably practical.
              </p>

              <h2 id="terms" className="text-2xl font-bold text-gray-900 mb-4">17. TERM AND TERMINATION</h2>
              <p className="mb-4">
                These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
              </p>
              <p className="mb-6">
                If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
              </p>

              <h2 id="modifications" className="text-2xl font-bold text-gray-900 mb-4">18. MODIFICATIONS AND INTERRUPTIONS</h2>
              <p className="mb-4">
                We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We also reserve the right to modify or discontinue all or part of the Services without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.
              </p>
              <p className="mb-6">
                We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to supply any corrections, updates, or releases in connection therewith.
              </p>

              <h2 id="law" className="text-2xl font-bold text-gray-900 mb-4">19. GOVERNING LAW</h2>
              <p className="mb-6">
                These Legal Terms shall be governed by and defined following the laws of Jamaica. MOOSTYLES and yourself irrevocably consent that the courts of Jamaica shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.
              </p>

              <h2 id="disputes" className="text-2xl font-bold text-gray-900 mb-4">20. DISPUTE RESOLUTION</h2>
              <p className="mb-6">
                You agree to irrevocably submit all disputes related to these Legal Terms or the legal relationship established by these Legal Terms to the jurisdiction of the Jamaica courts. MOOSTYLES shall also maintain the right to bring proceedings as to the substance of the matter in the courts of the country where you reside or, if these Legal Terms are entered into in the course of your trade or profession, the state of your principal place of business.
              </p>

              <h2 id="corrections" className="text-2xl font-bold text-gray-900 mb-4">21. CORRECTIONS</h2>
              <p className="mb-6">
                There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
              </p>

              <h2 id="disclaimer" className="text-2xl font-bold text-gray-900 mb-4">22. DISCLAIMER</h2>
              <p className="mb-6">
                THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
              </p>

              <h2 id="liability" className="text-2xl font-bold text-gray-900 mb-4">23. LIMITATIONS OF LIABILITY</h2>
              <p className="mb-4">
                IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p className="mb-6">
                NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO $5.00 USD. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
              </p>

              <h2 id="indemnification" className="text-2xl font-bold text-gray-900 mb-4">24. INDEMNIFICATION</h2>
              <p className="mb-6">
                You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of: (1) use of the Services; (2) breach of these Legal Terms; (3) any breach of your representations and warranties set forth in these Legal Terms; (4) your violation of the rights of a third party, including but not limited to intellectual property rights; or (5) any overt harmful act toward any other user of the Services with whom you connected via the Services. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.
              </p>

              <h2 id="userdata" className="text-2xl font-bold text-gray-900 mb-4">25. USER DATA</h2>
              <p className="mb-6">
                We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
              </p>

              <h2 id="electronic" className="text-2xl font-bold text-gray-900 mb-4">26. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</h2>
              <p className="mb-6">
                Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.
              </p>

              <h2 id="california" className="text-2xl font-bold text-gray-900 mb-4">27. CALIFORNIA USERS AND RESIDENTS</h2>
              <p className="mb-6">
                If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
              </p>

              <h2 id="misc" className="text-2xl font-bold text-gray-900 mb-4">28. MISCELLANEOUS</h2>
              <p className="mb-6">
                These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms.
              </p>

              <h2 id="contact" className="text-2xl font-bold text-gray-900 mb-4">29. CONTACT US</h2>
              <p className="mb-4">In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:</p>
              <p className="mb-6">
                <strong>MOOSTYLES</strong><br />
                <a href="mailto:hello@moostyles.com" className="text-purple-600 hover:text-purple-700 underline">hello@moostyles.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
