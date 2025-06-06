import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import banner1 from '../media/banner1.webp'
import banner2 from '../media/banner2.webp'
import banner3 from '../media/banner3.webp'
import banner4 from '../media/banner4.webp'
import banner5 from '../media/banner5.webp'
import logo from '../media/newLogo.webp'

const HeaderBanner = ({ openform }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundImages = [banner1, banner2, banner3, banner4, banner5];

  // Auto-rotate background images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % backgroundImages.length
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <header id="home" className="relative min-h-screen overflow-hidden">
      {/* Background with gradient overlay and image rotation */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            style={{
              backgroundImage: `url('${image}')`,
            }}
          />
        ))}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-teal-800/70 to-green-900/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen text-white">
        {/* Navigation */}
        <nav className="w-full px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-1">
              <div className="w-20 h-20  rounded-full flex items-center justify-center overflow-hidden">
                <img src={logo} loading="lazy" alt="logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                Swasthhyam
              </span>
            </div>


            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="/" className="text-white/90 hover:text-white transition-colors duration-300 text-lg font-medium">
                Home
              </a>
              <a href="#about" className="text-white/90 hover:text-white transition-colors duration-300 text-lg font-medium">
                About
              </a>
              <a href="#services" className="text-white/90 hover:text-white transition-colors duration-300 text-lg font-medium">
                Services
              </a>
              <a href="#products" className="text-white/90 hover:text-white transition-colors duration-300 text-lg font-medium">
                Products
              </a>
              <a href="#contact" className="text-white/90 hover:text-white transition-colors duration-300 text-lg font-medium">
                Contact
              </a>
              <a href="/book-appointment">
                <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Book Now
                </button>
              </a>
              <a href="/login" className="text-white/90 hover:text-white transition-colors duration-300 text-lg font-medium py-2">
                Login
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-white/10 transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-98 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="mt-4 px-4 py-6 bg-black/30 backdrop-blur-sm rounded-xl">
              <div className="flex flex-col space-y-4">
                <a href="/" className="text-white/90 hover:text-white transition-colors duration-300 text-lg font-medium py-2">
                  Home
                </a>
                <a href="#about" className="text-white/90 hover:text-white transition-colors duration-300 text-lg font-medium py-2">
                  About
                </a>
                <a href="#services" className="text-white/90 hover:text-white transition-colors duration-300 text-lg font-medium py-2">
                  Services
                </a>
                <a href="#products" className="text-white/90 hover:text-white transition-colors duration-300 text-lg font-medium">
                  Products
                </a>
                <a href="#contact" className="text-white/90 hover:text-white transition-colors duration-300 text-lg font-medium py-2">
                  Contact
                </a>
                <a className="mt-4">
                  <button
                    onClick={openform}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-lg">
                    Book Now
                  </button>
                </a>
                <a href="/login" className="text-white/90 hover:text-white transition-colors duration-300 text-lg font-medium py-2">
                  Login
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 lg:mb-8">
              <span className="text-green-300 text-sm lg:text-base font-medium">
                ✨ Ancient Wisdom • Modern Care
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 lg:mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent">
                Natural Healing
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-200 via-green-100 to-white bg-clip-text text-transparent">
                With Ancient Wisdom
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-8 lg:mb-12 leading-relaxed">
              Discover the transformative power of Ayurveda. Trusted holistic care to rejuvenate your body, mind, and spirit through time-tested natural remedies.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6">
              <a>
                <button
                  onClick={openform}
                  className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-8 py-4 text-lg lg:text-xl font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                  Book Appointment
                </button>
              </a>
              <a href="#services">
                <button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 hover:border-white/50 px-8 py-4 text-lg lg:text-xl font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
                  Our Services
                </button>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 lg:mt-16 flex flex-wrap items-center justify-center gap-6 lg:gap-8 text-white/70">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm lg:text-base">1000+ Happy Patients</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm lg:text-base">15+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm lg:text-base">100% Natural</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBanner;