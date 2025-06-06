import React from 'react';
import { MapPin, Phone, Clock, Hospital, Shield, Leaf } from 'lucide-react';

export default function HospitalLocation({openform}) {
  function openGoogleMapsDirections() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        // Replace with your clinic's coordinates or address
        const destination = "Swasthhyam Knee & Spine Specialist+pune";

        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination}&travelmode=driving`;

        window.open(mapsUrl, "_blank");
      }, () => {
        alert("Unable to access your location.");
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }
  return (
    <section id="contact" className="relative py-20 px-4 overflow-hidden">
      {/* Gradient background + floating blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"></div>
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-300 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-300 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-300 rounded-full blur-lg"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header (Always Visible) */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-emerald-200 shadow-sm">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 font-medium">Find Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent mb-4">
            Visit Our Healing Center
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience the perfect blend of ancient Ayurvedic wisdom and modern comfort in our serene wellness sanctuary
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
          {/* Clinic Card (only top info shown on mobile) */}
          <div className="space-y-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Always visible basic info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
                  <Hospital className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Swasthya Ayurveda Clinic</h3>
                  {/* <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">4.9 (127 reviews)</span>
                  </div> */}
                </div>
              </div>

              {/* Hidden on mobile */}
              <div className="hidden md:block">
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Experience authentic Ayurvedic healing in a serene and caring environment. Our expert practitioners provide personalized care for chronic pain, stress management, digestive wellness, and complete holistic health restoration.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    <span className="text-emerald-800 font-medium">Certified Practitioners</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl">
                    <Leaf className="w-5 h-5 text-teal-600" />
                    <span className="text-teal-800 font-medium">Organic Treatments</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                    <div className="p-2 bg-emerald-500 rounded-lg">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Address</p>
                      <p className="text-gray-600">Office no.302,04th Floor, ShreeTower, near Savali Corner, Lohiya Nagar, Laxmi Vihar, Hadapsar, Pune, Maharashtra 411028</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Call Us</p>
                        <p className="text-blue-600 font-medium">+91 9529396371</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                      <div className="p-2 bg-purple-500 rounded-lg">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Hours</p>
                        <p className="text-gray-600">Mon - Sat: 9 AM – 7 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button 
                  onClick={openform}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-emerald-700 hover:to-teal-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl">
                    Book Your Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section (Always Visible) */}
          <div className="flex flex-col h-full">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 flex-grow">
              <div className="mb-6">
                <h4 className="text-xl font-bold text-gray-800 mb-2">Location & Directions</h4>
                <p className="text-gray-600">Easily accessible location with ample parking facilities</p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-inner border-4 border-white h-80 lg:h-96">
                {/* <iframe
                  src="https://maps.app.goo.gl/z1FATigcZPm4dgaW7"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Swasthya Ayurveda Clinic Location"
                  className="grayscale-0 hover:grayscale-0 transition-all duration-300"
                ></iframe> */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d626.8524892764929!2d73.92869027056258!3d18.502759892952902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1e5e97f506f%3A0xc6e423e94cdaf85b!2sSwasthhyam%20Knee%20%26%20Spine%20Specialist!5e0!3m2!1sen!2sin!4v1749201450969!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Swasthya Ayurveda Clinic Location"
                  className="grayscale-0 hover:grayscale-0 transition-all duration-300">
                </iframe>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={openGoogleMapsDirections}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors duration-200 font-medium">
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </button>
                <a href="tel:9529396371" className='w-full'>
                  <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl transition-colors duration-200 font-medium">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </button>
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
