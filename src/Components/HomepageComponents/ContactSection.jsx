import {
  Mail,
  UserSearch,
  Shield,
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

export const ContactSection = () => {
  const contactInfoItems = [
    {
      icon: Mail,
      title: "General Inquiries",
      content: "hello@moostyles.com",
      href: "mailto:hello@moostyles.com",
      description: "Questions, requests, community"
    },
    {
      icon: UserSearch,
      title: "Business & Partnerships",
      content: "business@moostyles.com",
      href: "mailto:business@moostyles.com",
      description: "Collaborations, sponsorships"
    },
    {
      icon: Shield,
      title: "Technical Support",
      content: "support@moostyles.com",
      href: "mailto:support@moostyles.com",
      description: "Installation, troubleshooting"
    }
  ];

  return (
    <section id="contact" className="section-luxury section-home-contact relative">
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
            Questions, collaborations, or support, feel free to reach out to us anytime!
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
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-3xl p-8 border-2 border-teal-200/50 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 relative overflow-hidden corner-accent"
            >
              <div className="shimmer-effect absolute inset-0 opacity-30" />
              <h4 className="luxury-heading font-bold text-gray-900 mb-6 relative z-10">Opportunities</h4>
              <p className="text-gray-600 mb-6 luxury-body relative z-10">
                We are looking to partner with talented individuals such as:
              </p>
              <ul className="space-y-4 text-gray-600 relative z-10">
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-center luxury-body"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 mr-3" />
                  <span>Creators</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-center luxury-body"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 mr-3" />
                  <span>3D Modelers</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-center luxury-body"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 mr-3" />
                  <span>Graphic Designers</span>
                </motion.li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};