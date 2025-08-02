import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
  Clock,
  Heart,
  Shield,
  Award,
  ChevronRight
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(20, 184, 166, 0.3) 0%, transparent 50%)'
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col leading-tight">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                    Asthyaaayu
                  </h3>
                  <h3 className="text-l font-medium text-teal-100">
                    Swasthyam Ayurveda Pvt Ltd
                  </h3>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Reviving ancient healing with modern care. Experience holistic wellness through trusted Ayurvedic practices that nurture mind, body, and spirit.
              </p>
              <div className="flex gap-4 mb-6">
                <div className="flex items-center gap-2 bg-emerald-800/30 px-3 py-2 rounded-full">
                  <Award className="w-4 h-4 text-emerald-300" />
                  <span className="text-xs text-emerald-200">Certified</span>
                </div>
                <div className="flex items-center gap-2 bg-teal-800/30 px-3 py-2 rounded-full">
                  <Shield className="w-4 h-4 text-teal-300" />
                  <span className="text-xs text-teal-200">Safe Care</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-emerald-200 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {['home', 'about', 'doctors', 'services', 'products', 'testimonials', 'contact'].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link}`}
                      aria-label={`Go to ${link} section`}
                      className="text-gray-300 hover:text-emerald-300 transition-colors duration-300 text-sm flex items-center gap-2 group capitalize"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>

            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-emerald-200 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Get In Touch
              </h4>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-emerald-800/30 rounded-lg flex items-center justify-center group-hover:bg-emerald-700/50 transition-colors duration-300">
                    <Phone className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Call Us</p>
                    <p className="text-white font-medium">+91 91469 57655</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-teal-800/30 rounded-lg flex items-center justify-center group-hover:bg-teal-700/50 transition-colors duration-300">
                    <Mail className="w-4 h-4 text-teal-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email Us</p>
                    <p className="text-white font-medium">asthyaaayu@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-emerald-800/30 rounded-lg flex items-center justify-center group-hover:bg-emerald-700/50 transition-colors duration-300">
                    <MapPin className="w-10 h-4 text-emerald-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Visit Us</p>
                    <p className="text-white font-medium">Office no.302,04th Floor, ShreeTower, near Savali Corner, Lohiya Nagar, Laxmi Vihar, Hadapsar, Pune, Maharashtra 411028</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-teal-800/30 rounded-lg flex items-center justify-center group-hover:bg-teal-700/50 transition-colors duration-300">
                    <Clock className="w-4 h-4 text-teal-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Hours</p>
                    <p className="text-white font-medium">Mon–Sun: 10AM–7PM</p>

                  </div>
                </div>
              </div>

              {/* Socials */}
              <div>
                <p className="text-sm text-gray-400 mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, bg: 'bg-blue-600', hover: 'hover:bg-blue-500', label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61576353255566' },
                    { icon: Instagram, bg: 'bg-pink-600', hover: 'hover:bg-pink-500', label: 'Instagram', url: 'https://www.instagram.com/accounts/login/?next=%2Fswasthhyam_knee_spine_expert%2F&source=omni_redirect' },
                    { icon: Youtube, bg: 'bg-red-700', hover: 'hover:bg-red-600', label: 'YouTube', url: 'https://www.youtube.com/@SwasthhyamKSRTspecialist' }
                  ].map(({ icon: Icon, bg, hover, label, url }, i) => (
                    <a
                      key={i}
                      href={url}
                      aria-label={label}
                      className={`w-10 h-10 ${bg} ${hover} rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-emerald-800/30">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-lg font-semibold text-emerald-200 mb-2">Stay Updated</h4>
                <p className="text-gray-400 text-sm">Subscribe to our newsletter for health tips and updates</p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                <button aria-label="Subscrible for more updates" className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-800/30 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} AyurSanjeevani. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-emerald-300 transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="hover:text-emerald-300 transition-colors duration-300">Terms of Service</a>
                <a href="#" className="hover:text-emerald-300 transition-colors duration-300">Disclaimer</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
