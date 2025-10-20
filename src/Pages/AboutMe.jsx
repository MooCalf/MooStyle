import React from 'react';
import { ArrowLeft, User, Heart, Globe, Award, Mail, Instagram, Twitter, Facebook, Youtube, Download, Code, Twitch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutMe = () => {
  const achievements = [
    {
      icon: Download,
      title: "1000+ Free Mods",
      description: "Creating and sharing high-quality InZoi mods for the community"
    },
    {
      icon: Heart,
      title: "Active Community",
      description: "Building a passionate community of InZoi modding enthusiasts"
    },
    {
      icon: Code,
      title: "Open Source",
      description: "Contributing to the modding community with open-source tools and resources"
    }
  ];

  const values = [
    {
      title: "Free Access",
      description: "All our mods are completely free to download and use. We believe in making quality mods accessible to everyone."
    },
    {
      title: "Quality",
      description: "Every mod is carefully crafted and tested to ensure compatibility and enhance your InZoi gaming experience."
    },
    {
      title: "Community",
      description: "We believe in building a supportive community where modders and players can share, learn, and grow together."
    },
    {
      title: "Innovation",
      description: "We stay ahead of trends and game updates to bring you the latest and most innovative mods for InZoi."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div 
        className="bg-white border-b border-gray-200"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link 
              to="/home" 
              className="back-button-simple"
            >
              <ArrowLeft size={24} />
            </Link>
            <div className="flex items-center space-x-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <img
                  src="/projects/Brand Medias/Logos/MOOSTYLES LOGO - TEAL COLOR.png"
                  alt="MOOSTYLE Logo"
                  className="h-8 w-8 object-contain"
                />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">About MOOSTYLE</h1>
                <p className="text-gray-600 mt-1">Learn more about MOOSTYLE and our modding mission</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-br from-teal-50 to-teal-100 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div 
              className="mx-auto w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <img
                src="/projects/Brand Medias/Logos/MOOSTYLES LOGO - TEAL COLOR.png"
                alt="MOOSTYLE Logo"
                className="w-24 h-24 object-contain"
              />
            </motion.div>
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Welcome to MOOSTYLE
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Your premier destination for high-quality InZoi mods. We're passionate about creating and sharing 
              amazing mods that enhance your InZoi gaming experience, completely free of charge.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Story Section */}
      <motion.div 
        className="py-16 bg-white"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">My Story</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Hi! I'm the creator behind MOOSTYLE, and I'm passionate about InZoi modding. 
                  What started as a personal hobby of creating mods for my own gameplay has 
                  evolved into a mission to share amazing mods with the entire InZoi community.
                </p>
                <p>
                  You can learn more about me and my other projects by visiting 
                  <a href="https://moocalf.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 font-medium"> Moocalf.com</a>, 
                  where I share my journey, tutorials, and connect with fellow modders and gamers.
                </p>
                <p>
                  MOOSTYLE was created with one simple goal: to make high-quality InZoi mods 
                  accessible to everyone, completely free. I believe that modding should be 
                  about creativity, community, and enhancing the gaming experience for all players.
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl p-8"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">My Mission</h4>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To create and share amazing InZoi mods that enhance gameplay, 
                  foster creativity, and build a supportive modding community where 
                  everyone can enjoy the game to its fullest potential.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Achievements Section */}
      <motion.div 
        className="py-16 bg-gray-50"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">My Achievements</h3>
            <p className="text-gray-600 text-lg">Milestones I'm proud of</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.4 + index * 0.1 }}
                  >
                    <IconComponent className="text-teal-600" size={32} />
                  </motion.div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{achievement.title}</h4>
                  <p className="text-gray-600">{achievement.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div 
        className="py-16 bg-white"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.7 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">My Values</h3>
            <p className="text-gray-600 text-lg">What drives me every day</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-50 rounded-lg p-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div 
        className="py-16 bg-gradient-to-r from-teal-600 to-teal-700"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h3 
            className="text-3xl font-bold text-white mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 2.3 }}
          >
            Let's Connect
          </motion.h3>
          <motion.p 
            className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.4 }}
          >
            Have questions about mods or want to share your MOOSTYLE experience? 
            I'd love to hear from you! Follow me on social media for updates and mod releases.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.5 }}
          >
            <motion.a
              href="mailto:hello@moocalf.com"
              className="inline-flex items-center px-6 py-3 bg-white text-teal-600 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} className="mr-2" />
              Email Me
            </motion.a>
            <motion.a
              href="https://moocalf.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-teal-600 transition-colors duration-200 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe size={20} className="mr-2" />
              Visit Moocalf.com
            </motion.a>
            <motion.a
              href="https://www.patreon.com/MOOSTYLES"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors duration-200 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart size={20} className="mr-2" />
              Support on Patreon
            </motion.a>
          </motion.div>
          <motion.div 
            className="flex justify-center space-x-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.6 }}
          >
            {[
              { href: "https://www.instagram.com/cypher._01", icon: Instagram, label: "Instagram" },
              { href: "https://x.com/MooCalf_", icon: Twitter, label: "Twitter/X" },
              { href: "https://www.youtube.com/@MooCalf", icon: Youtube, label: "YouTube" },
              { href: "https://www.twitch.tv/moocalf_", icon: Twitch, label: "Twitch" },
              { href: "https://www.patreon.com/MOOSTYLES", icon: Heart, label: "Support on Patreon" }
            ].map((social, index) => {
              const IconComponent = social.icon;
              return (
                <motion.a 
                  key={index}
                  href={social.href} 
                  className="text-teal-100 hover:text-white transition-colors" 
                  aria-label={social.label}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 2.7 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconComponent size={24} />
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutMe;
