import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Stethoscope, Shield, Mail, Lock } from 'lucide-react';
// import { io } from "socket.io-client";
// const socket = io("https://swasthhyam-backend.onrender.com");
export default function DoctorLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const res = await fetch('https://swasthhyam-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      // Save token

      // console.log(data)
      // Navigate based on role
      if (data.user.role === 'admin') {
        localStorage.setItem('token', data.token);
        navigate('/admin');
      } else if (data.user.role === 'doctor') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('doctorId', data.user.id);
        // socket.emit("join", data.user.id);
        navigate('/doctor');
      } else {
        throw new Error('Unknown user role');
      }
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-6 shadow-2xl">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Medical Portal
            </h1>
            <p className="text-blue-200 text-lg">
              Secure Doctor Access
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6">
            {/* Trust Badge */}
            <div className="flex items-center justify-center space-x-2 text-blue-200 text-sm">
              <Shield className="w-4 h-4" />
              <span>HIPAA Compliant & Secure</span>
            </div>

            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-white font-medium text-sm">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="doctor@hospital.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-white font-medium text-sm">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-blue-200">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-400" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-blue-300 hover:text-white transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In to Dashboard'
                )}
              </button>
            </div>

            {/* Additional Links */}
            <div className="pt-6 border-t border-white/20">
              <div className="text-center space-y-3">
                <p className="text-blue-200 text-sm">
                  Need help accessing your account?
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
                  <a href="#" className="text-blue-300 hover:text-white transition-colors">
                    Contact IT Support
                  </a>
                  <span className="hidden sm:block text-blue-300">•</span>
                  <a href="#" className="text-blue-300 hover:text-white transition-colors">
                    System Status
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-blue-300 text-sm">
            <p>© 2025 Medical Portal. All rights reserved.</p>
            <p className="mt-1">Powered by secure healthcare technology</p>
          </div>
        </div>
      </div>
    </div>
  );
}