import {
  Instagram,
  Mail,
  Twitch,
  Youtube,
  UserSearch,
  Twitter,
  Shield,
  MessageCircle,
  Globe,
} from "lucide-react";

const ContactInfoItem = ({ icon: Icon, title, content, href, description }) => (
  <div className="flex items-start space-x-4">
    <div className="p-3 rounded-full bg-teal-100">
      <Icon className="h-6 w-6 text-teal-600" />
    </div>
    <div>
      <h4 className="font-medium text-gray-900">{title}</h4>
      {href ? (
        <a href={href} className="text-gray-600 hover:text-teal-600 transition-colors" target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <span className="text-gray-600">{content}</span>
      )}
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
  </div>
);

const SocialLink = ({ icon: Icon, href, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label={label} 
    className="p-3 rounded-full bg-gray-100 hover:bg-teal-100 transition-colors border border-teal-200 hover:border-teal-400"
  >
    <Icon size={20} className="text-gray-600 hover:text-teal-600" />
  </a>
);

export const ContactSection = () => {
  const socialLinks = [
    { icon: Youtube, href: "https://www.youtube.com/@MooCalf", label: "Youtube" },
    { icon: Twitch, href: "https://www.twitch.tv/moocalf_", label: "Twitch" },
    { icon: Instagram, href: "https://www.instagram.com/cypher._01", label: "Instagram" },
    { icon: Twitter, href: "https://x.com/MooCalf_", label: "Twitter/X" },
  ];

  const contactInfoItems = [
    {
      icon: Mail,
      title: "General Inquiries:",
      content: "hello@moocalf.com",
      href: "mailto:hello@moocalf.com",
      description: "For general questions, mod requests, or community discussions"
    },
    {
      icon: UserSearch,
      title: "Business & Collaborations:",
      content: "hello@moocalf.com",
      href: "mailto:hello@moocalf.com",
      description: "Partnerships, sponsorships, and business opportunities"
    },
    {
      icon: MessageCircle,
      title: "Discord Community:",
      content: "@MooCalf",
      href: "https://discord.gg/moocalf",
      description: "Join our Discord server for real-time discussions and support"
    },
    {
      icon: Globe,
      title: "Personal Website:",
      content: "moocalf.com",
      href: "https://moocalf.com",
      description: "Visit my personal portfolio and learn more about my work"
    }
  ];

  const businessInfo = [
    {
      icon: Shield,
      title: "Privacy & Security",
      content: "Your data is safe",
      description: "All communications are kept confidential and secure"
    }
  ];

  return (
    <section id="contact" className="contact-section py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">
          Get In <span className="text-teal-600">Touch</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Have questions about mods, want to collaborate, or need support? I'm here to help! 
          Reach out through any of the channels below for the fastest response.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Contact Information</h3>
            <div className="space-y-6">
              {contactInfoItems.map((item, index) => (
                <ContactInfoItem key={index} {...item} />
              ))}
            </div>
            <div className="pt-8">
              <h4 className="font-medium mb-4 text-gray-900">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((socialLink) => (
                  <SocialLink key={socialLink.label} {...socialLink} />
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Business Information</h3>
            <div className="space-y-6">
              {businessInfo.map((item, index) => (
                <ContactInfoItem key={index} {...item} />
              ))}
            </div>
            
            <div className="bg-teal-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">What I'm Looking For</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>Modding collaborations and partnerships</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>Content creation opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>Community building and engagement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>Technical consulting and tutorials</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Best Ways to Reach Me</h4>
              <div className="space-y-3 text-gray-600">
                <p><strong>Email:</strong> Most reliable for business inquiries and detailed discussions</p>
                <p><strong>Discord:</strong> Best for quick questions and community interaction</p>
                <p><strong>Social Media:</strong> Great for updates, announcements, and casual conversations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};