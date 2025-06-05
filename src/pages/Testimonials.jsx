import React, { useState,useEffect } from 'react';
import { MessageCircle, Play, Quote, Heart, CheckCircle } from 'lucide-react';

export default function PatientTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [playingVideo, setPlayingVideo] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('https://swasthhyam-backend.onrender.com/api/testimonials');
        const data = await res.json();
        const enriched = data.map(t => ({
          ...t,
          thumbnail: `https://img.youtube.com/vi/${t.videoId}/maxresdefault.jpg`,
          rating: 5 // You can customize this if rating is stored in DB
        }));
        setTestimonials(enriched);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      }
    };

    fetchTestimonials();
  }, []);

  const handleVideoPlay = (index) => {
    setPlayingVideo(index);
  };

  return (
    <section id='testimonials' className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-200 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-teal-200 rounded-full blur-xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>

          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              Real Stories, Real Results
            </span>
            <h2 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
              Patient <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover how our personalized treatments have transformed lives and restored hope for hundreds of patients
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
              ))}
            </div>
            <span className="text-gray-600 ml-3">Join 500+ satisfied patients</span>
          </div>

          <div className="w-32 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 mx-auto rounded-full shadow-sm"></div>
        </div>

        {/* Stats Section */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-green-100 shadow-sm">
            <div className="flex items-center gap-12">
              <div className="text-center">
                <Heart className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-800 mb-1">500+</div>
                <div className="text-gray-600 text-sm">Patients Treated</div>
              </div>
              <div className="w-px h-16 bg-gray-200"></div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-800 mb-1">95%</div>
                <div className="text-gray-600 text-sm">Recovery Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden border border-green-100 hover:shadow-2xl transition-all duration-500 hover:bg-white/90 hover:-translate-y-1">
                {/* Video Container */}
                <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
                  {playingVideo === index ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${testimonial.videoId}?autoplay=1&rel=0`}
                      title={`Testimonial by ${testimonial.name}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  ) : (
                    <div
                      className="relative w-full h-full cursor-pointer group/video"
                      onClick={() => handleVideoPlay(index)}
                    >
                      <img
                        loading='lazy'
                        src={testimonial.thumbnail}
                        alt={`${testimonial.name} testimonial`}
                        className="w-full h-full object-cover"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover/video:bg-black/30 transition-all duration-300">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover/video:scale-110 transition-transform duration-300">
                          <Play className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 ml-1" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-8">
                  {/* Patient Info */}
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div>
                      <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1">{testimonial.name}</h3>
                      <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-2">
                        <span>Age {testimonial.age}</span>
                        <span>•</span>
                        <span>{testimonial.location}</span>
                      </div>
                      <div className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {testimonial.treatment}
                      </div>
                    </div>
                  </div>

                  {/* Comment - Hidden on Mobile */}
                  <div className="relative mb-4 sm:mb-6 hidden sm:block">
                    <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-green-300 mb-2" />
                    <p className="text-gray-700 leading-relaxed text-base italic">
                      "{testimonial.comment}"
                    </p>
                  </div>

                  {/* Recovery Info */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-100 gap-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Recovery Time: <span className="font-semibold text-green-600">{testimonial.recovery}</span></span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span>Verified Patient</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Call to Action */}
        {/* <div className="text-center mt-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-green-100 shadow-sm max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Start Your Healing Journey?</h3>
            <p className="text-gray-600 mb-6">Join hundreds of patients who have transformed their lives with our personalized care</p>
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Book Your Consultation
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}