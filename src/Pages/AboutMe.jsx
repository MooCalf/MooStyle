import React from 'react';
import { ArrowLeft, User, Heart, Globe, Award, Mail, Instagram, Twitter, Facebook, Youtube, Github, Download, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="p-2 text-gray-600 hover:text-teal-600 transition-colors duration-200"
            >
              <ArrowLeft size={24} />
            </Link>
            <div className="flex items-center space-x-3">
              <User className="text-teal-600" size={32} />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">About Me</h1>
                <p className="text-gray-600 mt-1">Learn more about MooStyle and our modding mission</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-50 to-teal-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center mb-8">
              <img
                src="/projects/MooCalf_Main Logo.png"
                alt="MooStyle Logo"
                className="w-24 h-24 rounded-full"
              />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Welcome to MooStyle</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your premier destination for high-quality InZoi mods. We're passionate about creating and sharing 
              amazing mods that enhance your InZoi gaming experience, completely free of charge.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">My Story</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Hi! I'm the creator behind MooStyle, and I'm passionate about InZoi modding. 
                  What started as a personal hobby of creating mods for my own gameplay has 
                  evolved into a mission to share amazing mods with the entire InZoi community.
                </p>
                <p>
                  You can learn more about me and my other projects by visiting 
                  <a href="https://moocalf.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 font-medium"> Moocalf.com</a>, 
                  where I share my journey, tutorials, and connect with fellow modders and gamers.
                </p>
                <p>
                  MooStyle was created with one simple goal: to make high-quality InZoi mods 
                  accessible to everyone, completely free. I believe that modding should be 
                  about creativity, community, and enhancing the gaming experience for all players.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl p-8">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">My Mission</h4>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To create and share amazing InZoi mods that enhance gameplay, 
                  foster creativity, and build a supportive modding community where 
                  everyone can enjoy the game to its fullest potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">My Achievements</h3>
            <p className="text-gray-600 text-lg">Milestones I'm proud of</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="text-teal-600" size={32} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{achievement.title}</h4>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">My Values</h3>
            <p className="text-gray-600 text-lg">What drives me every day</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">Let's Connect</h3>
          <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">
            Have questions about mods or want to share your MooStyle experience? 
            I'd love to hear from you! Follow me on social media for updates and mod releases.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="mailto:hello@moocalf.com"
              className="inline-flex items-center px-6 py-3 bg-white text-teal-600 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              <Mail size={20} className="mr-2" />
              Email Me
            </a>
            <a
              href="https://moocalf.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-teal-600 transition-colors duration-200 font-medium"
            >
              <Globe size={20} className="mr-2" />
              Visit Moocalf.com
            </a>
          </div>
          <div className="flex justify-center space-x-6">
            <a href="https://www.instagram.com/cypher._01" className="text-teal-100 hover:text-white transition-colors" aria-label="Instagram">
              <Instagram size={24} />
            </a>
            <a href="https://x.com/MooCalf_" className="text-teal-100 hover:text-white transition-colors" aria-label="Twitter/X">
              <Twitter size={24} />
            </a>
            <a href="https://www.youtube.com/@MooCalf" className="text-teal-100 hover:text-white transition-colors" aria-label="YouTube">
              <Youtube size={24} />
            </a>
            <a href="https://www.twitch.tv/moocalf_" className="text-teal-100 hover:text-white transition-colors" aria-label="Twitch">
              <Github size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
