import { motion } from "framer-motion";
import { Download, Star, Sparkles, ArrowRight, Heart, Zap, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllProducts } from "@/lib/shoppingData";

export const Pitch = () => {
  // Get actual product count
  const totalMods = getAllProducts().length;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const features = [
    {
      icon: Download,
      title: "Free Downloads",
      description: "Quality mods, zero cost"
    },
    {
      icon: Star,
      title: "Curated Excellence",
      description: "Hand-picked and tested"
    },
    {
      icon: Sparkles,
      title: "Regular Updates",
      description: "Fresh content regularly"
    }
  ];

  return (
    <section className="section-luxury relative overflow-hidden">
      {/* Decorative floating elements */}
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-teal-200/30 to-teal-300/30 rounded-full opacity-40 blur-3xl"
      />
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5 }}
        className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-teal-100/30 to-cyan-200/30 rounded-full opacity-40 blur-3xl"
      />
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 1 }}
        className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-cyan-200/20 to-teal-200/20 rounded-full opacity-40 blur-2xl"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto max-w-6xl"
      >
        {/* Main Heading */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block mb-6"
          >
            <span className="luxury-subheading px-6 py-3 bg-gradient-to-r from-teal-50/80 via-cyan-50/80 to-teal-100/80 backdrop-blur-sm text-teal-700 rounded-full inline-flex items-center gap-2 border border-teal-200/50 shadow-lg">
              <Zap className="w-4 h-4" />
              Welcome to MOOSTYLE
            </span>
          </motion.div>
          <h2 className="luxury-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-gray-900">
            Premium{" "}
            <span className="gradient-text-luxury">
              InZOI Mods
            </span>
          </h2>
          <p className="luxury-body text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Curated mods crafted with passion. Everything you need to elevate your InZOI experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.95 }}
              className="group cursor-pointer rounded-3xl"
            >
              <div className="glass-card glass-card-hover rounded-3xl p-8 inner-shadow-luxury border-2 border-teal-200/30 relative overflow-hidden" style={{ borderRadius: '1.5rem' }}>
                <div className="shimmer-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 inline-block mb-6 p-4 feature-badge-luxury"
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="relative z-10 text-xl font-bold text-gray-900 mb-3 luxury-heading">
                  {feature.title}
                </h3>
                <p className="relative z-10 text-gray-600 luxury-body">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/brands"
                className="magnetic-button group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-700 to-teal-800 text-white font-bold rounded-full overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-300 text-lg"
              >
                <span className="relative z-10">Explore Mods</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="https://www.patreon.com/MOOSTYLES"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-white/80 backdrop-blur-sm border-2 border-teal-700 text-teal-800 font-bold rounded-full hover:bg-teal-50/80 transition-all duration-300 shadow-luxury hover:shadow-luxury-hover text-lg"
              >
                <Heart className="w-6 h-6 group-hover:fill-current transition-all duration-300" />
                <span>Support Creator</span>
              </a>
            </motion.div>
          </div>

          <motion.p
            variants={itemVariants}
            className="mt-10 text-gray-500 luxury-body"
          >
            Quality mods for <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">Quality</span> players!
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="mt-24 grid grid-cols-3 gap-12 max-w-3xl mx-auto"
        >
          {[
            { number: totalMods, label: totalMods === 1 ? "Mod Available" : "Mods Available", icon: Download },
            { number: "Free", label: "Access", icon: Shield },
            { number: "24/7", label: "Support", icon: Users }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="text-center hover-lift"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-teal-100 via-cyan-100 to-teal-200 rounded-2xl shadow-luxury"
              >
                <stat.icon className="w-8 h-8 text-teal-700" />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                className="text-4xl md:text-5xl font-bold gradient-text-luxury mb-3 luxury-heading"
              >
                {stat.number}
              </motion.div>
              <div className="text-sm text-gray-600 luxury-subheading">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
