import React, { useState } from "react";
import { Calendar, Clock, User, Mail, Phone, MapPin, Stethoscope, Heart } from "lucide-react";

const services = [
  { name: "Skin Care", icon: "✨", color: "from-pink-400 to-rose-500" },
  { name: "Arthritis", icon: "🦴", color: "from-blue-400 to-indigo-500" },
  { name: "Diabetes Management", icon: "🩺", color: "from-red-400 to-pink-500" },
  { name: "Weight Loss", icon: "⚖️", color: "from-yellow-400 to-amber-500" },
  { name: "Women's Health", icon: "👩‍⚕️", color: "from-rose-400 to-pink-500" },
  { name: "Chronic Pain", icon: "💊", color: "from-teal-400 to-cyan-500" },
];

const doctorAssignments = {
  "Skin Care": "Dr. Meenakshi Chauhan",
  "Arthritis": "Dr. Rohit Sharma",
  "Diabetes Management": "Dr. Rohit Sharma",
  "Weight Loss": "Dr. Meenakshi Chauhan",
  "Women's Health": "Dr. Meenakshi Chauhan",
  "Chronic Pain": "Dr. Rohit Sharma",
};


const timeSlots = [
  "9:00 AM - 1:00 PM",
  "3:00 PM - 7:00 PM",
];

const BookAppointmentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    age: '',
    gender: '',
    service: '',
    date: '',
    address: '',
    timeSlot: '',
    doctor: '',
  });

  const [focusedField, setFocusedField] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    // console.log(doctorAssignments[formData.service])
    formData.doctor = doctorAssignments[formData.service]
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call


    try {
      // console.log(formData)
      const response = await fetch('https://swasthhyam-backend.onrender.com/api/appointments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // console.log('Login successful', data);
        // TODO: Save token / navigate to dashboard
        alert('Appointment booked successfully!');
      } else {
        // // console.error('Login failed:', data.message);
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      // console.log('Error during login:', error);
      alert('Something went wrong. Please try again.');
    }


    setIsSubmitting(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-2 px-1">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <Heart className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Book Your Appointment
          </h1>
          <p className="text-gray-600 text-lg">Schedule your consultation with our expert doctors</p>
        </div>

        {/* Form */}
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                Personal Information
              </h3>

              <div className="space-y-4">
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm
                      ${focusedField === 'fullName'
                        ? 'border-blue-400 shadow-lg shadow-blue-100 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                      } focus:outline-none`}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm
                        ${focusedField === 'email'
                          ? 'border-blue-400 shadow-lg shadow-blue-100 scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                        } focus:outline-none`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Whatsapp Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      onFocus={() => setFocusedField('mobile')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm
                        ${focusedField === 'mobile'
                          ? 'border-blue-400 shadow-lg shadow-blue-100 scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                        } focus:outline-none`}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      min="0"
                      max="120"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      onFocus={() => setFocusedField('age')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm
                        ${focusedField === 'age'
                          ? 'border-blue-400 shadow-lg shadow-blue-100 scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                        } focus:outline-none`}
                      placeholder="25"
                    />
                  </div>

                  <div className="relative group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      onFocus={() => setFocusedField('gender')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm
                        ${focusedField === 'gender'
                          ? 'border-blue-400 shadow-lg shadow-blue-100 scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                        } focus:outline-none`}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      onFocus={() => setFocusedField('address')}
                      onBlur={() => setFocusedField('')}
                      rows="3"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none
                        ${focusedField === 'address'
                          ? 'border-blue-400 shadow-lg shadow-blue-100 scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                        } focus:outline-none`}
                      placeholder="Enter your complete address"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-purple-500" />
                Appointment Details
              </h3>

              <div className="space-y-4">
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service/Concern *</label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    onFocus={() => setFocusedField('service')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm
                      ${focusedField === 'service'
                        ? 'border-blue-400 shadow-lg shadow-blue-100 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                      } focus:outline-none`}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.name} value={service.name}>
                        {service.icon} {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      onFocus={() => setFocusedField('date')}
                      onBlur={() => setFocusedField('')}
                      min={new Date().toISOString().split('T')[0]}
                      max={
                        new Date(new Date().setDate(new Date().getDate() + 3))
                          .toISOString()
                          .split('T')[0]
                      }
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm
                        ${focusedField === 'date'
                          ? 'border-blue-400 shadow-lg shadow-blue-100 scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                        } focus:outline-none`}
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot *</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      required
                      value={formData.timeSlot}
                      onChange={(e) => handleInputChange('timeSlot', e.target.value)}
                      onFocus={() => setFocusedField('timeSlot')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm
                        ${focusedField === 'timeSlot'
                          ? 'border-blue-400 shadow-lg shadow-blue-100 scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                        } focus:outline-none`}
                    >
                      <option value="">Select time slot</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Service Preview */}
                {formData.service && (
                  <div className="animate-fade-in">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${services.find(s => s.name === formData.service)?.color} text-white shadow-lg`}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{services.find(s => s.name === formData.service)?.icon}</span>
                        <div>
                          <h4 className="font-semibold">Selected Service</h4>
                          <p className="text-sm opacity-90">{formData.service}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
             aria-label="Confirm appointment booking"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${isSubmitting ? 'animate-pulse' : ''
                }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  <Heart className="w-5 h-5 group-hover:animate-pulse" />
                  Confirm Appointment
                </span>
              )}
            </button>
            <p className="text-sm text-gray-500 mt-3">
              You'll receive a confirmation email shortly after booking
            </p>
          </div>
        </div>

        {/* Footer Note */}
        {/* <div className="text-center mt-8 p-4 bg-white/30 backdrop-blur-sm rounded-xl">
          <p className="text-gray-600 text-sm">
            🏥 Available 24/7 for emergency appointments • 📞 Call us at +91-1234567890
          </p>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BookAppointmentForm;