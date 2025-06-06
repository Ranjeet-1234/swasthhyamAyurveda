import React, { useState } from 'react';
import { Star, Heart, Send, CheckCircle, User, Mail, MessageSquare, Sparkles } from 'lucide-react';

export default function PatientFeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.feedback) {
      alert('Please fill in all required fields');
      return;
    }
  
    const form = { ...formData, rating };
  
    try {
      const res = await fetch("https://swasthhyam-backend.onrender.com/api/feedback/add", {
        method: 'POST', // ✅ fixed: removed extra space
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Request failed');
      }
  
      setSubmitted(true);
  
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', feedback: '' });
        setRating(0);
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Feedback submission error:", error.message);
      alert("Submission failed: " + error.message);
    }
  };
  

  if (submitted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-bounce" />
        <div className="absolute bottom-32 right-16 w-56 h-56 bg-gradient-to-r from-pink-400/15 to-blue-400/15 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-r from-purple-400/25 to-pink-400/25 rounded-full animate-ping" />

        <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center max-w-md mx-auto border border-white/20">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Thank You!
            </h2>
            <p className="text-gray-600 text-lg">Your feedback has been submitted successfully</p>
          </div>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3].map((i) => (
              <Heart key={i} className="w-6 h-6 text-pink-400 fill-pink-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-bounce" />
      <div className="absolute bottom-32 right-16 w-56 h-56 bg-gradient-to-r from-pink-400/15 to-blue-400/15 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-r from-purple-400/25 to-pink-400/25 rounded-full animate-ping" />
      <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full animate-pulse delay-700" />

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Feedback
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your experience matters to us. Share your thoughts and help us improve our healthcare services.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
          <div className="space-y-8">
            {/* Name Field */}
            <div className="relative">
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <User className="w-4 h-4 mr-2 text-blue-500" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm text-lg"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-purple-500" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-purple-500 transition-all duration-300 bg-white/70 backdrop-blur-sm text-lg"
                placeholder="Enter your email address"
              />
            </div>

            {/* Category Selection */}
            {/* <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Feedback Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-pink-500 transition-all duration-300 bg-white/70 backdrop-blur-sm text-lg"
              >
                <option value="general">General Experience</option>
                <option value="staff">Staff Service</option>
                <option value="facilities">Facilities</option>
                <option value="appointment">Appointment Process</option>
                <option value="treatment">Treatment Quality</option>
                <option value="other">Other</option>
              </select>
            </div> */}

            {/* Rating */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Rate Your Experience
              </label>
              <div className="flex justify-center space-x-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-10 h-10 cursor-pointer transition-all duration-200 transform hover:scale-110 ${(hover || rating) >= star
                        ? 'text-yellow-400 fill-yellow-400 drop-shadow-lg'
                        : 'text-gray-300 hover:text-yellow-200'
                      }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  />
                ))}
              </div>
              <div className="text-center text-sm text-gray-500">
                {rating === 0 && "Click to rate your experience"}
                {rating === 1 && "Poor - We'll work to improve"}
                {rating === 2 && "Fair - There's room for improvement"}
                {rating === 3 && "Good - We're on the right track"}
                {rating === 4 && "Very Good - Almost perfect!"}
                {rating === 5 && "Excellent - We're thrilled!"}
              </div>
            </div>

            {/* Feedback Text */}
            <div className="relative">
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-emerald-500" />
                Your Feedback
              </label>
              <textarea
                name="feedback"
                required
                rows="5"
                value={formData.feedback}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-emerald-500 transition-all duration-300 resize-none bg-white/70 backdrop-blur-sm text-lg"
                placeholder="Share your detailed feedback, suggestions, or concerns..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Submit Feedback</span>
            </button>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8">
          <p className="text-gray-600 flex items-center justify-center space-x-2">
            <Heart className="w-4 h-4 text-pink-500" />
            <span>Your feedback helps us provide better healthcare for everyone</span>
            <Heart className="w-4 h-4 text-pink-500" />
          </p>
        </div>
      </div>
    </section>
  );
}