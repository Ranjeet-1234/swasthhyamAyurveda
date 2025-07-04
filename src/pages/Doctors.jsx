import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import {
  FaGraduationCap,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaStar,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const Doctors = ({ openform }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mainDoctors, setMainDoctors] = useState([]);
  const [carouselDoctors, setCarouselDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => goToSlide(currentSlide + 1),
    onSwipedRight: () => goToSlide(currentSlide - 1),
    trackMouse: true,
  });

  // Fetch doctors data from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);

        // Replace 'https://swasthhyam-backend.onrender.com/api/doctors' with your actual backend URL
        const response = await fetch('https://swasthhyam-backend.onrender.com/api/doctors', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any authentication headers if needed
            // 'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch doctors: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Handle different response formats
        let doctors = [];
        if (Array.isArray(data)) {
          doctors = data;
        } else if (data.doctors && Array.isArray(data.doctors)) {
          doctors = data.doctors;
        } else if (data.data && Array.isArray(data.data)) {
          doctors = data.data;
        } else {
          throw new Error('Invalid response format: Expected array of doctors');
        }

        // console.log('Fetched doctors:', doctors); // For debugging

        // Separate doctors based on 'main' property
        const mainDocs = doctors.filter(doc => doc.main === true);
        const carouselDocs = doctors.filter(doc => doc.main !== true);

        // console.log('Main doctors:', mainDocs); // For debugging
        // console.log('Carousel doctors:', carouselDocs); // For debugging

        setMainDoctors(mainDocs);
        setCarouselDoctors(carouselDocs);

      } catch (err) {
        // // console.error('Error fetching doctors:', err);
        setError(`Failed to load doctors: ${err.message}`);

        // Optional: Set some dummy data for development/testing
        // setMainDoctors([]);
        // setCarouselDoctors([]);

      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || carouselDoctors.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselDoctors.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselDoctors.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselDoctors.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselDoctors.length) % carouselDoctors.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
      const update = () => setIsMobile(window.innerWidth <= 768);
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }, []);
    return isMobile;
  };

  const isMobile = useIsMobile();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <p className="text-xl text-red-600 mb-4">{error}</p>
          <button
            aria-label="Retry the booking appointment"
            onClick={() => window.location.reload()}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id='doctors' className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 py-10 px-4 sm:px-6 lg:px-15">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FaGraduationCap className="w-4 h-4" />
            Expert Ayurvedic Practitioners
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
            Meet Our Doctors
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience authentic healing with our renowned Ayurvedic specialists
          </p>
        </div>

        {/* Main Doctors Section */}
        {mainDoctors.length > 0 && (
          <div className="space-y-20 mb-24">
            {mainDoctors.map((doc, index) => (
              <div
                key={doc._id}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:items-center md:justify-between bg-white/80  shadow-xl rounded-3xl overflow-hidden border border-white/50 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]`}
              >
                {/* Info Section */}
                <div className="w-full md:w-1/2 p-8 sm:p-12">
                  <div className="max-w-xl">
                    {isMobile && (
                      <div className="w-full flex justify-center items-center mb-6">
                        <div className="relative group">
                          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl ring-4 ring-white">
                            <img
                              src={doc.image}
                              loading='lazy'
                              alt={doc.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/150x150?text=Doctor';
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <h3 className="text-3xl font-bold text-gray-900 mb-3 hover:text-emerald-700 transition-colors duration-300">
                      {doc.name}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      <p className="text-emerald-600 font-semibold text-base md:text-lg">{doc.title}</p>
                      {isMobile && (
                        <div className="flex gap-3">
                          <a href={doc.socials?.facebook || '#'} className="text-emerald-600 hover:text-emerald-800">
                            <FaFacebookF className="w-5 h-5" />
                          </a>
                          <a href={doc.socials?.linkedin || '#'} className="text-emerald-600 hover:text-emerald-800">
                            <FaLinkedinIn className="w-5 h-5" />
                          </a>
                          <a href={doc.socials?.instagram || '#'} className="text-emerald-600 hover:text-emerald-800">
                            <FaInstagram className="w-5 h-5" />
                          </a>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed text-lg">{doc.bio}</p>

                    {/* Quote - only show on desktop */}
                    {!isMobile && doc.quote && (
                      <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-2xl mb-6 border-l-4 border-emerald-500">
                        <p className="italic text-gray-700 text-sm leading-relaxed">"{doc.quote}"</p>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6 p-2 bg-gray-50 rounded-2xl">
                      <div className="text-center">
                        <div className="font-bold text-lg text-gray-900">{doc.experience}</div>
                        <div className="text-xs text-gray-600 uppercase tracking-wide">Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg text-gray-900">{doc.patients}</div>
                        <div className="text-xs text-gray-600 uppercase tracking-wide">Patients</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <FaStar className="text-yellow-400 w-4 h-4" />
                          <span className="font-bold text-lg text-gray-900">{doc.rating || '4.9'}</span>
                        </div>
                        <div className="text-xs text-gray-600 uppercase tracking-wide">Rating</div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {doc.specialties.map((specialty, i) => (
                          <span
                            key={i}
                            className="bg-emerald-100 text-emerald-700 px-4 py-2 text-sm font-medium rounded-full border border-emerald-200 hover:bg-emerald-200 transition-colors duration-300"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Social Links & CTA */}
                    <div className="flex items-center justify-between">
                      {!isMobile && (
                        <div className="flex gap-3">
                          <a
                            href={doc.socials?.facebook || '#'}
                            aria-label={`Visit ${doc.name || 'doctor'}'s Facebook profile`}
                            className="w-12 h-12 bg-emerald-50 hover:bg-emerald-100 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                          >
                            <FaFacebookF className="text-emerald-600 group-hover:text-emerald-700 w-5 h-5" />
                          </a>

                          <a
                            href={doc.socials?.linkedin || '#'}
                            aria-label={`Visit ${doc.name || 'doctor'}'s LinkedIn profile`}
                            className="w-12 h-12 bg-emerald-50 hover:bg-emerald-100 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                          >
                            <FaLinkedinIn className="text-emerald-600 group-hover:text-emerald-700 w-5 h-5" />
                          </a>

                          <a
                            href={doc.socials?.instagram || '#'}
                            aria-label={`Visit ${doc.name || 'doctor'}'s Instagram profile`}
                            className="w-12 h-12 bg-emerald-50 hover:bg-emerald-100 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                          >
                            <FaInstagram className="text-emerald-600 group-hover:text-emerald-700 w-5 h-5" />
                          </a>

                        </div>
                      )}

                      <button
                        aria-label="Confirm Consultation booking"

                        onClick={openform}
                        className={`${isMobile ? 'w-full' : ''} mt-4 md:mt-0 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl`}
                      >
                        Book Consultation
                      </button>
                    </div>
                  </div>
                </div>

                {/* Image Section - only show on desktop */}
                {!isMobile && (
                  <div className="w-full md:w-1/2 flex justify-center items-center p-8">
                    <div className="relative group">
                      <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500 hover:scale-105">
                        <img
                          src={doc.image}
                          loading='lazy'
                          alt={doc.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x300?text=Doctor';
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-4 -left-4 bg-emerald-600 text-white rounded-full px-4 py-2 text-sm font-semibold shadow-lg">
                        {doc.experience}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Carousel Section */}
        {carouselDoctors.length > 0 && (
          <div className="bg-white/60 rounded-3xl p-8 md:p-12 border border-white/50 shadow-xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">More Expert Practitioners</h3>
              <p className="text-gray-600 text-lg">Discover our complete team of Ayurvedic specialists</p>
            </div>

            <div
              {...(isMobile ? handlers : {})}
              className="relative overflow-hidden rounded-2xl"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {carouselDoctors.map((doc) => (
                  <div key={doc._id} className="w-full flex-shrink-0">
                    <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-white to-emerald-50 p-8 md:p-12 rounded-2xl">
                      <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
                        <h4 className="text-2xl font-bold text-gray-900 mb-2">{doc.name}</h4>
                        <p className="text-emerald-600 font-semibold mb-4">{doc.title}</p>
                        <p className="text-gray-700 mb-4 leading-relaxed">{doc.bio}</p>

                        {doc.quote && (
                          <div className="bg-emerald-50 p-4 rounded-xl mb-6 border-l-4 border-emerald-400">
                            <p className="italic text-gray-700 text-sm">"{doc.quote}"</p>
                          </div>
                        )}

                        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                          <div>
                            <div className="font-bold text-gray-900">{doc.experience}</div>
                            <div className="text-xs text-gray-600 uppercase">Experience</div>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{doc.patients}</div>
                            <div className="text-xs text-gray-600 uppercase">Patients</div>
                          </div>
                          <div>
                            <div className="flex items-center justify-center gap-1">
                              <FaStar className="text-yellow-400 w-4 h-4" />
                              <span className="font-bold text-gray-900">{doc.rating || '4.9'}</span>
                            </div>
                            <div className="text-xs text-gray-600 uppercase">Rating</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {doc.specialties.map((specialty, i) => (
                            <span key={i} className="bg-emerald-100 text-emerald-700 px-3 py-1 text-sm rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          {isMobile ? (
                            <button
                              aria-label='Confirm consultation Booking'
                              onClick={openform}
                              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                              Book Consultation
                            </button>
                          ) : (
                            <>
                              <div className="flex gap-3">
                                {Object.entries(doc.socials || {}).map(([platform, url]) => (
                                  <a
                                    aria-label={`View ${platform} profile`}
                                    key={platform}
                                    href={url || '#'}
                                    className="w-10 h-10 bg-emerald-50 hover:bg-emerald-100 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                  >
                                    {platform === 'facebook' && <FaFacebookF className="text-emerald-600 w-4 h-4" />}
                                    {platform === 'linkedin' && <FaLinkedinIn className="text-emerald-600 w-4 h-4" />}
                                    {platform === 'instagram' && <FaInstagram className="text-emerald-600 w-4 h-4" />}
                                  </a>
                                ))}
                              </div>
                              <button
                                aria-label='Open and Appointment booking form '
                                onClick={openform}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                              >
                                Book Now
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="w-full md:w-1/2 flex justify-center">
                        <div className="relative">
                          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-xl">
                            <img
                              loading='lazy'
                              src={doc.image}
                              alt={doc.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/200x200?text=Doctor';
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows - Desktop only */}
              {!isMobile && carouselDoctors.length > 1 && (
                <>
                  <button
                    aria-label="Click here to see Previous slide"
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-emerald-600 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  >
                    <FaChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    aria-label="click here to see next slide"
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-emerald-600 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  >
                    <FaChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Carousel Indicators */}
            {carouselDoctors.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {carouselDoctors.map((_, index) => (
                  <button
                    aria-label="click here to see the doctor slide"
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                      ? 'bg-emerald-600 scale-125'
                      : 'bg-emerald-200 hover:bg-emerald-300'
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {mainDoctors.length === 0 && carouselDoctors.length === 0 && !loading && (
          <div className="text-center py-20">
            <FaGraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Doctors Found</h3>
            <p className="text-gray-600">Please check back later for our expert practitioners.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;