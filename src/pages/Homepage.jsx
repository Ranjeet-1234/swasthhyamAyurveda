import React, { useState, lazy, Suspense, useCallback, useMemo, useEffect } from "react";
import { MessagesSquare, CalendarCheck, PhoneCall } from "lucide-react";
import loading from '../media/loading.gif'
// Lazy loaded components
const HeaderBanner = lazy(() => import("./HeaderBanner"));
const Doctors = lazy(() => import("./Doctors"));
const RecentActivityCarousel = lazy(() => import("./Activities"));
const TestimonialSection = lazy(() => import("./Testimonials"));
const HospitalLocation = lazy(() => import("./Location"));
const FeaturedProducts = lazy(() => import("./Product"));
const PatientFeedbackForm = lazy(() => import("./Feedback"));
const Footer = lazy(() => import("./Footer"));
const Services = lazy(() => import("./Services"));
const BookAppointmentModal = lazy(() => import("./BookAppointmentModal"));

// Simple Loading Component with GIF
const LoadingSpinner = React.memo(({ variant = "default", className = "" }) => {
  const sizes = useMemo(() => ({
    small: { container: "w-32 h-32", text: "text-sm" },
    default: { container: "w-40 h-40", text: "text-base" },
    large: { container: "w-48 h-48", text: "text-lg" },
    section: { container: "w-36 h-36", text: "text-base" }
  }), []);

  const size = sizes[variant];

  return (
    <div className={`flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 ${className}`}>
      <div className="flex flex-col items-center space-y-8">
        
        {/* Loading GIF Container */}
        <div className={`${size.container} relative flex items-center justify-center`}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
            <img 
              src={loading}
              alt="Loading..."
              className="w-full h-full object-contain rounded-lg"
              style={{ maxWidth: '200px', maxHeight: '200px' }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className={`text-slate-600 font-semibold tracking-wide ${size.text}`}>
              Healthcare Loading
            </span>
          </div>
          
          {/* Simple Progress Bar */}
          <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 rounded-full animate-pulse"></div>
          </div>
          
          {/* Subtitle */}
          <p className="text-slate-500 text-sm font-medium">
            Connecting you to quality care
          </p>
        </div>
      </div>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

// Simple Suspense wrapper
const SuspenseWrapper = React.memo(({ children, fallback, className = "" }) => {
  return (
    <Suspense
      fallback={
        <div className={`transition-opacity duration-300 ${className}`}>
          {fallback}
        </div>
      }
    >
      <div className="opacity-100">
        {children}
      </div>
    </Suspense>
  );
});

SuspenseWrapper.displayName = 'SuspenseWrapper';

const Home = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [book, setBook] = useState(false);
  useEffect(()=>{
    setTimeout(()=>{
      setBook(true);
    },20000)
  },[])

  // Memoized navigation items to prevent recreation
  const navItems = useMemo(() => [
    {
      id: 'chat',
      label: 'WhatsApp',
      icon: MessagesSquare,
      href: 'https://wa.me/9529396371',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'book',
      label: 'Book',
      icon: CalendarCheck,
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'call',
      label: 'Call',
      icon: PhoneCall,
      href: 'tel:+911234567890',
      gradient: 'from-orange-500 to-orange-600'
    }
  ], []);

  // Memoized handlers to prevent recreation
  const handleNavClick = useCallback((itemId) => {
    setActiveItem(itemId);
    if (itemId === 'book') {
      setBook(true);
    }
  }, []);

  const openBookingModal = useCallback(() => {
    setBook(true);
  }, []);

  const closeBookingModal = useCallback(() => {
    setBook(false);
  }, []);

  return (
    <>
      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-50 md:hidden" role="navigation" aria-label="Quick actions">
        <div className="bg-white/90 backdrop-blur-lg rounded-full px-4 py-2 shadow-xl border border-white/20">
          <div className="flex items-center space-x-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const Component = item.href ? 'a' : 'button';
              const isActive = activeItem === item.id;

              return (
                <Component
                  key={item.id}
                  {...(item.href ? {
                    href: item.href,
                    target: item.href.startsWith('http') ? '_blank' : undefined,
                    rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined
                  } : {})}
                  onClick={() => handleNavClick(item.id)}
                  className="relative group transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300 rounded-full"
                  aria-label={item.label}
                >
                  <div className={`
                    relative p-2.5 rounded-full transition-all duration-200 transform
                    bg-gradient-to-r ${item.gradient}
                    group-hover:scale-110 group-active:scale-95 group-focus:scale-105
                    ${isActive ? 'scale-105 shadow-lg' : 'shadow-md'}
                  `}>
                    <Icon
                      size={18}
                      className="text-white transition-transform duration-200 group-hover:scale-110"
                      aria-hidden="true"
                    />
                  </div>
                  <div className={`
                    absolute -top-8 left-1/2 transform -translate-x-1/2 
                    px-2 py-1 bg-gray-800 text-white text-xs rounded-md
                    opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-200
                    pointer-events-none whitespace-nowrap z-10
                  `}>
                    {item.label}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800"></div>
                  </div>
                </Component>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="relative min-h-screen overflow-hidden">
        {/* Header Banner */}
        <SuspenseWrapper fallback={<LoadingSpinner variant="large" />}>
          <HeaderBanner openform={openBookingModal} />
        </SuspenseWrapper>

        {/* Services Section */}
        <SuspenseWrapper fallback={<LoadingSpinner variant="section" />}>
          <Services openform={openBookingModal} />
        </SuspenseWrapper>

        {/* Doctors Section */}
        <SuspenseWrapper fallback={<LoadingSpinner variant="section" />}>
          <Doctors openform={openBookingModal} />
        </SuspenseWrapper>

        {/* Book Appointment Modal */}
        {book && (
          <div className="text-center my-8">
            <SuspenseWrapper fallback={<LoadingSpinner variant="large" />}>
              <BookAppointmentModal closeform={closeBookingModal} />
            </SuspenseWrapper>
          </div>
        )}

        {/* Featured Products */}
        <SuspenseWrapper fallback={<LoadingSpinner variant="section" />}>
          <FeaturedProducts />
        </SuspenseWrapper>

        {/* Recent Activity Carousel */}
        <SuspenseWrapper fallback={<LoadingSpinner variant="default" />}>
          <RecentActivityCarousel />
        </SuspenseWrapper>

        {/* Testimonials */}
        <SuspenseWrapper fallback={<LoadingSpinner variant="section" />}>
          <TestimonialSection />
        </SuspenseWrapper>

        {/* Hospital Location */}
        <SuspenseWrapper fallback={<LoadingSpinner variant="default" />}>
          <HospitalLocation openform={openBookingModal}/>
        </SuspenseWrapper>

        {/* Patient Feedback Form */}
        <SuspenseWrapper fallback={<LoadingSpinner variant="section" />}>
          <PatientFeedbackForm />
        </SuspenseWrapper>

        {/* Footer */}
        <SuspenseWrapper fallback={<LoadingSpinner variant="section" />}>
          <Footer />
        </SuspenseWrapper>
      </main>
    </>
  );
};

export default Home;