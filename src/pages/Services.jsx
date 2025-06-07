import React, { useState, useEffect, useRef } from "react";
import {
    Activity,
    Bone,
    Weight,
    Zap,
    Droplets,
    Users,
    Heart,
    Shield,
    Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
// import img from "../media/360_F_712216471_KNvAkMSirFqVYC044LkrMEFL15AyAGXr.jpg";

const iconMap = {
    Activity,
    Bone,
    Weight,
    Zap,
    Droplets,
    Users,
    Heart,
    Shield,
    Sparkles
};

const categoryIcons = {
    "Knee Disorders": Bone,
    "Spine Disorders": Shield,
    "Weight Management": Weight,
    "Thyroid Regulation": Zap,
    "Diabetes Reversal": Droplets,
};

const cardVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: "easeOut",
        }
    })
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

const Services = ({ openform }) => {
    const [services, setServices] = useState({});
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const isMobile = useIsMobile();
    const cardRef = useRef();


    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch("https://swasthhyam-backend.onrender.com/api/services/"); // replace with actual URL
                const data = await res.json();

                // Group by category
                const grouped = {};
                data.forEach(item => {
                    const { id, name, icon, category, img, description, url } = item;
                    if (!grouped[category]) grouped[category] = [];
                    grouped[category].push({
                        id, name, img, description, url,
                        icon: iconMap[icon] || Activity, // fallback icon
                    });
                });
                // console.log(grouped)
                setServices(grouped);
            } catch (err) {
                // console.error("Failed to fetch services:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const categories = Object.keys(services);
    const activeTab = categories[activeIndex] || "";
    useEffect(() => {
        if (categories.length === 0) return;

        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % categories.length);
        }, 20000);

        return () => clearInterval(interval);
    }, [categories]);

    // Guard against empty categories
    if (loading) return <div>Loading services...</div>;
    if (!categories.length) return <div>No services found</div>;

    const items = services[activeTab] || [];
    const rows = [];
    for (let i = 0; i < items.length; i += 2) {
        rows.push(items.slice(i, i + 2));
    }
    return (
        <section id="services" className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 rounded-full mb-3">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm text-emerald-700 font-medium">Specialized Care</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 bg-clip-text text-transparent">
                        Our Ayurvedic Services
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Discover healing solutions rooted in ancient wisdom, tailored for modern health challenges.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map((category, index) => {
                        const Icon = categoryIcons[category];
                        return (
                            <button
                                aria-label="Show more Categories"
                                key={category}
                                onClick={() => setActiveIndex(index)}
                                className={`group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105 ${activeTab === category
                                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-xl"
                                    : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200 shadow"
                                    }`}
                            >
                                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === category ? "text-white" : "text-gray-500 group-hover:text-emerald-600"}`} />
                                {category}
                            </button>
                        );
                    })}
                </div>

                {/* Services */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {services[activeTab].map((item, index) => {
                        // const Icon = item.icon;
                        const items = services[activeTab];

                        // Group cards into rows of 2 (for mobile)
                        const rows = [];
                        for (let i = 0; i < items.length; i += 2) {
                            rows.push(items.slice(i, i + 2));
                        }
                        return (
                            <motion.div
                                key={index}
                                custom={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0 }}
                                variants={cardVariants}
                                className="group relative flex flex-col items-center transition-transform duration-500 transform hover:scale-[1.05]"
                            >
                                {/* Card */}
                                {/* <div className="relative w-full h-[320px] overflow-hidden rounded-2xl shadow-lg border border-gray-200 transition-all duration-500" ref={cardRef}>
                                    <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-[65%] object-cover" /> */}

                                {/* Card Content: Slide on Hover (desktop), Slide on Scroll (mobile) */}
                                {isMobile ? (
                                    <>
                                        <div className="relative w-full h-[320px] overflow-hidden rounded-2xl shadow-lg border border-gray-200 transition-all duration-500" ref={cardRef}>
                                            <img src={item.img} loading='lazy' alt={item.name} className="absolute inset-0 w-full h-[65%] object-cover" />
                                            <div className="absolute inset-0 flex justify-end items-center pointer-events-none">
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/90 via-white/70 to-transparent p-4 transition-all duration-500 group-hover:backdrop-blur-lg">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="p-2 bg-emerald-100 rounded-xl">
                                                        <item.icon className="w-5 h-5 text-emerald-600" />
                                                    </div>
                                                    <h3 className="text-sm font-semibold text-gray-800">{item.name}</h3>
                                                </div>
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-600 to-green-500 text-white font-medium py-2 px-4 rounded-lg text-sm transition-all duration-300 hover:scale-105">
                                                    learn more
                                                </a>
                                            </div>
                                        </div>
                                    </>

                                ) : (
                                    <>
                                        <div className="relative w-full h-[320px] overflow-hidden rounded-2xl shadow-lg border border-gray-200 transition-all duration-500" ref={cardRef}>
                                            <img src={item.img} loading='lazy' alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                                            <div className="absolute inset-0 flex justify-end items-center pointer-events-none">
                                                <div className="w-0 group-hover:w-[70%] h-full opacity-0 group-hover:opacity-100 backdrop-blur-xl bg-white/80 transition-all duration-500 ease-in-out rounded-l-2xl shadow-lg p-6 flex flex-col justify-center pointer-events-auto">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="p-3 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl">
                                                            <item.icon className="w-6 h-6 text-emerald-600" />
                                                        </div>
                                                        <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                                                    </div>
                                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.description}</p>
                                                    <a
                                                        href={item.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-600 to-green-500 text-white font-medium py-2 px-4 rounded-lg text-sm transition-all duration-300 hover:scale-105">
                                                        learn more
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-center text-gray-800 font-semibold text-md transition-all duration-500 transform group-hover:translate-y-2 group-hover:opacity-0">
                                            {item.name}
                                        </p>
                                    </>
                                )}

                            </motion.div>

                        );
                    })}
                </div>

                {/* CTA */}
                <div className="mt-14 sm:mt-20 text-center">
                    <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl p-6 sm:p-10 shadow-2xl">
                        <Users className="w-10 h-10 sm:w-14 sm:h-14 text-white mx-auto mb-4" />
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Ready to Begin Your Healing Journey?</h3>
                        <p className="text-emerald-100 text-base sm:text-lg mb-6 leading-relaxed">
                            Our experienced Ayurvedic practitioners are here to create a personalized treatment plan just for you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                aria-label="Confirm appointment booking"
                                onClick={openform}
                                className="bg-white text-emerald-600 hover:bg-emerald-50 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow">
                                Book Consultation
                            </button>
                            <a href="tel:+919529396371" className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 border-2 border-emerald-500 text-center">
                                Call Us Now
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;