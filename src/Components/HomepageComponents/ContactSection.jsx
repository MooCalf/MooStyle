import {
  Mail,
  UserSearch,
  Shield,
  MessageCircle,
  Globe,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";

const ContactInfoItem = ({ icon: Icon, title, content, href, description, index }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="flex items-start space-x-4 group"
  >
    <motion.div 
      whileHover={{ scale: 1.1, rotate: 360 }}
      transition={{ duration: 0.6 }}
      className="p-4 rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-100 shadow-luxury group-hover:shadow-luxury-hover transition-all duration-300"
    >
      <Icon className="h-6 w-6 text-teal-700" />
    </motion.div>
    <div className="flex-1">
      <h4 className="font-bold text-gray-900 luxury-heading mb-1">{title}</h4>
      {href ? (
        <a href={href} className="text-teal-700 hover:text-teal-800 transition-colors font-semibold luxury-body block" target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <span className="text-gray-700 font-semibold">{content}</span>
      )}
      {description && (
        <p className="text-sm text-gray-500 mt-1 luxury-body">{description}</p>
      )}
    </div>
  </motion.div>
);

const SocialLink = ({ icon: Icon, href, label }) => (
  <motion.a 
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label={label} 
    className="p-4 rounded-2xl glass-card glass-card-hover shadow-luxury hover-lift border-2 border-transparent hover:border-teal-300"
  >
    <Icon size={24} className="text-teal-700" />
  </motion.a>
);

export const ContactSection = () => {
  const socialLinks = [
    { icon: Heart, href: "https://www.patreon.com/MOOSTYLES", label: "Support on Patreon" },
  ];

  const contactInfoItems = [
    {
      icon: Mail,
      title: "General Inquiries",
      content: "hello@moocalf.com",
      href: "mailto:hello@moocalf.com",
      description: "Questions, requests, community"
    },
    {
      icon: UserSearch,
      title: "Business & Partnerships",
      content: "business@moocalf.com",
      href: "mailto:business@moocalf.com",
      description: "Collaborations, sponsorships"
    },
    {
      icon: Shield,
      title: "Technical Support",
      content: "support@moocalf.com",
      href: "mailto:support@moocalf.com",
      description: "Installation, troubleshooting"
    }
  ];

  const businessInfo = [
    {
      icon: Shield,
      title: "Privacy & Security",
      content: "Encrypted & confidential",
      description: ""
    },
    {
      icon: Globe,
      title: "Response Time",
      content: "24-48 hours",
      description: ""
    }
  ];

  return (
    <section id="contact" className="section-luxury relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="luxury-heading text-4xl md:text-5xl font-bold mb-6 text-center text-gray-900">
            Get In <span className="gradient-text-luxury">Touch</span>
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-xl mx-auto luxury-body text-lg">
            Questions, collaborations, or support — reach out anytime.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h3 className="luxury-heading text-3xl font-bold mb-8 text-gray-900">Contact Information</h3>
            <div className="space-y-6">
              {contactInfoItems.map((item, index) => (
                <ContactInfoItem key={index} {...item} index={index} />
              ))}
            </div>
            <div className="pt-8">
              <h4 className="luxury-subheading font-bold mb-6 text-gray-900">Connect</h4>
              <div className="flex space-x-4">
                {socialLinks.map((socialLink) => (
                  <SocialLink key={socialLink.label} {...socialLink} />
                ))}
              </div>
            </div>
            
            {/* Patreon Support Section */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="pt-8"
            >
              <div className="glass-card rounded-3xl p-8 border-2 border-orange-200/50 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 relative overflow-hidden">
                <div className="shimmer-effect absolute inset-0 opacity-50" />
                <h4 className="luxury-heading font-bold text-gray-900 mb-4 flex items-center relative z-10">
                  <Heart className="h-6 w-6 text-orange-500 mr-3" />
                  Support My Work
                </h4>
                <p className="text-gray-600 mb-6 luxury-body relative z-10">
                  Support exclusive content and early releases.
                </p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.patreon.com/MOOSTYLES"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 magnetic-button inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-bold shadow-luxury"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Support on Patreon
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h3 className="luxury-heading text-3xl font-bold mb-8 text-gray-900">Business Information</h3>
            <div className="space-y-6">
              {businessInfo.map((item, index) => (
                <ContactInfoItem key={index} {...item} index={index + 3} />
              ))}
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-3xl p-8 border-2 border-teal-200/50 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 relative overflow-hidden corner-accent"
            >
              <div className="shimmer-effect absolute inset-0 opacity-30" />
              <h4 className="luxury-heading font-bold text-gray-900 mb-6 relative z-10">Opportunities</h4>
              <ul className="space-y-4 text-gray-600 relative z-10">
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-center luxury-body"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 mr-3" />
                  <span>Modding collaborations</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-center luxury-body"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 mr-3" />
                  <span>Content creation</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-center luxury-body"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 mr-3" />
                  <span>Brand partnerships</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-center luxury-body"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 mr-3" />
                  <span>Community projects</span>
                </motion.li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};