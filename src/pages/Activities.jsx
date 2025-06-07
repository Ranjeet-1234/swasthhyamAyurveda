import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Users, Award, Heart, Activity, MapPin, ExternalLink, Loader2 } from 'lucide-react';

export default function RecentActivityCarousel() {
    const scrollRef = useRef(null);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://swasthhyam-backend.onrender.com/api/activities/');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch activities');
                }
                
                const data = await response.json();
                setActivities(data);
                setError(null);
            } catch (error) {
                // // console.error('Error fetching activities:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || activities.length === 0) return;

        const isMobile = window.innerWidth < 768;
        const speed = isMobile ? 0.30 : 0.65;

        const scrollWidth = scrollContainer.scrollWidth;
        const containerWidth = scrollContainer.clientWidth;
        let scrollPosition = 0;

        const scroll = () => {
            scrollPosition += speed;
            if (scrollPosition >= scrollWidth - containerWidth) {
                scrollPosition = 0;
            }
            scrollContainer.scrollLeft = scrollPosition;
        };

        let interval = setInterval(scroll, 16);

        const handleMouseEnter = () => clearInterval(interval);
        const handleMouseLeave = () => {
            interval = setInterval(scroll, 16);
        };

        scrollContainer.addEventListener('mouseenter', handleMouseEnter);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearInterval(interval);
            scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
            scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [activities]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getCategoryIcon = (title, description) => {
        const titleLower = title.toLowerCase();
        const descLower = description.toLowerCase();
        
        if (titleLower.includes('camp') || descLower.includes('consultation')) {
            return <Heart className="w-5 h-5" />;
        } else if (titleLower.includes('workshop') || titleLower.includes('training')) {
            return <Users className="w-5 h-5" />;
        } else if (titleLower.includes('award') || titleLower.includes('achievement')) {
            return <Award className="w-5 h-5" />;
        } else {
            return <Activity className="w-5 h-5" />;
        }
    };

    const getCategoryName = (title, description) => {
        const titleLower = title.toLowerCase();
        const descLower = description.toLowerCase();
        
        if (titleLower.includes('camp') || descLower.includes('consultation')) {
            return 'Community Service';
        } else if (titleLower.includes('workshop') || titleLower.includes('training')) {
            return 'Professional Training';
        } else if (titleLower.includes('awareness') || titleLower.includes('health')) {
            return 'Health Campaign';
        } else if (titleLower.includes('celebration') || titleLower.includes('day')) {
            return 'Educational Event';
        } else {
            return 'General Activity';
        }
    };

    const handleReadMore = (activity) => {
        if (activity.url) {
            window.open(activity.url, '_blank', 'noopener,noreferrer');
        }
    };

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                            <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Loading Activities...
                        </h1>
                        <p className="text-lg text-gray-600">
                            Please wait while we fetch the latest activities
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (error && activities.length === 0) {
        return (
            <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                            <Activity className="w-8 h-8 text-red-600" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Unable to Load Activities
                        </h1>
                        <p className="text-lg text-red-600 mb-4">
                            {error}
                        </p>
                        <button 
                            aria-label='click here to load the activities'
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id='about' className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <Calendar className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Recent Activities
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Stay updated with our latest initiatives, community programs, and healthcare achievements
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mt-6 rounded-full"></div>
                    
                    {error && (
                        <div className="mt-4 p-3 bg-amber-100 border border-amber-300 rounded-lg max-w-md mx-auto">
                            <p className="text-amber-800 text-sm">
                                ⚠️ Using cached data - some content may be outdated
                            </p>
                        </div>
                    )}
                </div>

                {activities.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <Activity className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Activities Found</h3>
                        <p className="text-gray-600">Check back later for updates on our latest activities</p>
                    </div>
                ) : (
                    <>
                        {/* Carousel */}
                        <div className="relative overflow-hidden rounded-2xl bg-white/30 backdrop-blur-sm p-6 shadow-xl">
                            <div
                                ref={scrollRef}
                                className="flex gap-6 overflow-x-hidden"
                                style={{
                                    scrollBehavior: 'auto',
                                    maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                                }}
                            >
                                {[...activities].map((item, index) => (
                                    <div
                                        key={`${item._id}-${index}`}
                                        className="w-[85%] md:w-[50%] bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex-shrink-0 group"
                                    >
                                        {/* Image */}
                                        <div className="relative overflow-hidden rounded-t-xl">
                                            <img
                                                loading='lazy'
                                                src={item.image}
                                                alt={item.title}
                                                className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop';
                                                }}
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                                    {getCategoryName(item.title, item.description)}
                                                </span>
                                            </div>
                                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5">
                                                <div className="text-green-600">
                                                    {getCategoryIcon(item.title, item.description)}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4">
                                            <h2 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors mb-2 line-clamp-1">
                                                {item.title}
                                            </h2>
                                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                <span>{formatDate(item.date)}</span>
                                            </div>
                                            <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
                                                {item.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                                    <Users className="w-3 h-3 mr-1" />
                                                    <span>{item.participants}</span>
                                                </div>
                                                {item.url ? (
                                                    <button 
                                                        aria-label='know more about the our recent activity'
                                                        onClick={() => handleReadMore(item)}
                                                        className="text-green-600 hover:text-green-700 font-semibold text-xs flex items-center group-hover:translate-x-1 transition-transform"
                                                    >
                                                        click here
                                                        <ExternalLink className="w-3 h-3 ml-1" />
                                                    </button>
                                                ) : (
                                                    <div className="text-gray-400 text-xs">
                                                        <MapPin className="w-3 h-3" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-8">
                            <p className="text-gray-500 text-sm">
                                🏥 Committed to community health and wellness • Hover over cards to pause scrolling
                            </p>
                            <p className="text-gray-400 text-xs mt-2">
                                Showing {activities.length} recent activities • Last updated: {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}