import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  LogOut,
  CalendarCheck,
  User,
  Clock,
  Search,
  Check,
  X,
  Bell,
  Settings,
} from 'lucide-react';
// mongodb+srv://rewatkarranjeet123:HtOShUjfiFUoZh1j@swasthhyam.wxtddxq.mongodb.net/

export default function DoctorDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const prevCountRef = useRef(0);
  const [loadingId, setLoadingId] = useState(null);

  const navigate = useNavigate();


  const handleAccept = async (id) => {
    const token = localStorage.getItem('token');
    setLoadingId(id);
    try {
      await fetch(`https://swasthhyam-backend.onrender.com/api/appointments/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'confirmed' })
      });

      // const data = await res.json(); // await needed here
      // console.log(data); // correctly log the response

      setAppointments(prev =>
        prev.map(appt => appt.id === id ? { ...appt, status: 'Accepted' } : appt)
      );
    } catch (error) {
      // console.error('Failed to accept:', error);
    }

  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const doctorId = localStorage.getItem('doctorId');

      if (!token || !doctorId) {
        navigate('/login');
      }
      try {
        const res = await fetch(`https://swasthhyam-backend.onrender.com/api/appointments/${doctorId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        // console.log(data[0].doctor.name)
        if (data.length > prevCountRef.current) {
          toast.info("📅 New appointment booked!");
        }
        prevCountRef.current = data.length;
        setAppointments(data.map(appt => ({
          id: appt._id,
          patient: appt.patientName,
          age: appt.patientAge,
          symptoms: appt.PatientService,
          status: appt.status,
          time: appt.time,
          phone: appt.patientPhone,
          date: new Date(appt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        })));


        setDoctor(data[0].doctor.name); // assuming your API sends back doctor details too

      } catch (error) {
        // console.error('Failed to fetch appointments:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60 * 60 * 1000); // every 1 hour
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const handleReject = async (id) => {
    setLoadingId(id); // Start loading
    const token = localStorage.getItem('token');

    try {
      await fetch(`https://swasthhyam-backend.onrender.com/api/appointments/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'cancelled' })
      });

      setAppointments(prev =>
        prev.map(appt => appt.id === id ? { ...appt, status: 'Cancelled' } : appt)
      );
    } catch (error) {
      // console.error('Failed to reject:', error);
    } finally {
      setLoadingId(null); // Stop loading
    }
  };

  const filteredAppointments = appointments.filter(appt => {
    const matchesSearch = appt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.symptoms.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || appt.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const logout = () => {
    localStorage.clear('token');
    localStorage.clear('doctorId')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Doctor info */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex">
                  <h1 className="text-xl font-bold text-gray-900">{doctor|| 'Doctor'}</h1>
                  {/* <p className="text-sm text-gray-500">Cardiologist</p> */}
                </div>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Appointments Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <CalendarCheck className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Today's Appointments</h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {filteredAppointments.length}
                </span>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Accepted</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Concern</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {appt.patient.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{appt.patient}</div>
                          <div className="text-sm text-gray-500">Age: {appt.age}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        {appt.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{appt.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{appt.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {appt.symptoms}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${appt.status === 'Accepted'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {appt.status === 'pending' ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleAccept(appt.id)}
                            disabled={loadingId === appt.id}
                            className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out transform
                                  ${loadingId === appt.id
                                ? 'bg-green-300 cursor-not-allowed scale-95 shadow-inner'
                                : 'bg-green-600 hover:bg-green-700 hover:scale-105 hover:shadow-lg text-white active:scale-95'
                              }
                                `}
                          >
                            {/* Loading overlay with pulse effect */}
                            {loadingId === appt.id && (
                              <div className="absolute inset-0 bg-green-400 rounded-lg animate-pulse opacity-50" />
                            )}

                            {/* Content container */}
                            <div className={`relative flex items-center transition-all duration-300 ${loadingId === appt.id ? 'text-green-800' : 'text-white'}`}>
                              {loadingId === appt.id ? (
                                <>
                                  {/* Enhanced spinner with multiple rings */}
                                  <div className="relative mr-2 w-4 h-4">
                                    {/* Outer ring */}
                                    <div className="absolute inset-0 border-2 border-green-200 rounded-full animate-spin border-t-green-600" />
                                    {/* Inner ring - counter rotation */}
                                    <div className="absolute inset-1 border-2 border-transparent rounded-full animate-spin border-b-green-700"
                                      style={{ animationDirection: 'reverse', animationDuration: '0.6s' }} />
                                  </div>

                                  {/* Animated dots */}
                                  <span className="flex items-center">
                                    Processing
                                    <span className="ml-1 flex space-x-0.5">
                                      <span className="w-1 h-1 bg-green-700 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                      <span className="w-1 h-1 bg-green-700 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                      <span className="w-1 h-1 bg-green-700 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </span>
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Check className="w-4 h-4 mr-1 transition-transform duration-200 group-hover:scale-110" />
                                  Accept
                                </>
                              )}
                            </div>

                            {/* Success ripple effect (optional - add when action completes) */}
                            {/* You can trigger this with additional state when the action succeeds */}
                            {/* <div className="absolute inset-0 bg-green-400 rounded-lg animate-ping opacity-75" /> */}
                          </button>

                          <button
                            onClick={() => handleReject(appt.id)}
                            disabled={loadingId === appt.id}
                            className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out transform
                                  ${loadingId === appt.id
                                ? 'bg-red-300 cursor-not-allowed scale-95 shadow-inner'
                                : 'bg-red-600 hover:bg-red-700 hover:scale-105 hover:shadow-lg text-white active:scale-95'
                              }
                                `}
                          >
                            {/* Loading overlay with pulse effect */}
                            {loadingId === appt.id && (
                              <div className="absolute inset-0 bg-red-400 rounded-lg animate-pulse opacity-50" />
                            )}

                            {/* Content container */}
                            <div className={`relative flex items-center transition-all duration-300 ${loadingId === appt.id ? 'text-red-800' : 'text-white'}`}>
                              {loadingId === appt.id ? (
                                <>
                                  {/* Enhanced spinner with multiple rings */}
                                  <div className="relative mr-2 w-4 h-4">
                                    {/* Outer ring */}
                                    <div className="absolute inset-0 border-2 border-red-200 rounded-full animate-spin border-t-red-600" />
                                    {/* Inner ring - counter rotation */}
                                    <div className="absolute inset-1 border-2 border-transparent rounded-full animate-spin border-b-red-700"
                                      style={{ animationDirection: 'reverse', animationDuration: '0.6s' }} />
                                  </div>

                                  {/* Animated dots */}
                                  <span className="flex items-center">
                                    Processing
                                    <span className="ml-1 flex space-x-0.5">
                                      <span className="w-1 h-1 bg-red-700 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                      <span className="w-1 h-1 bg-red-700 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                      <span className="w-1 h-1 bg-red-700 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </span>
                                  </span>
                                </>
                              ) : (
                                <>
                                  <X className="w-4 h-4 mr-1 transition-transform duration-200 group-hover:scale-110" />
                                  Cancelled
                                </>
                              )}
                            </div>

                            {/* Success ripple effect (optional - add when action completes) */}
                            {/* You can trigger this with additional state when the action succeeds */}
                            {/* <div className="absolute inset-0 bg-green-400 rounded-lg animate-ping opacity-75" /> */}
                          </button>
                        </div>
                      ) : (
                        <span className="text-green-600 font-medium text-sm">Confirmed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden">
            <div className="space-y-3">
              {filteredAppointments.map((appt) => (
                <div key={appt.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {appt.patient.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{appt.patient}</h3>
                        <p className="text-xs text-gray-500">Age: {appt.age}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${appt.status === 'confirmed'
                      ? 'bg-green-100 text-green-700'
                      : appt.status === 'cancelled'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </span>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <p className="font-medium">{appt.date}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Time:</span>
                      <p className="font-medium">{appt.time}</p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="mb-3 text-sm">
                    <span className="text-gray-500">Contact:</span>
                    <p className="font-medium">{appt.phone}</p>
                  </div>

                  {/* Symptoms */}
                  <div className="mb-4 p-3 bg-gray-50 rounded text-sm">
                    <span className="text-gray-600 font-medium">Concern:  {appt.symptoms}</span>
                  </div>

                  {/* Actions */}
                  {appt.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAccept(appt.id)}
                        disabled={loadingId === appt.id}
                        className={`flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded transition-colors ${loadingId === appt.id
                          ? 'bg-green-200 text-green-700 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                      >
                        {loadingId === appt.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-green-700 border-t-transparent rounded-full animate-spin mr-2" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4 mr-1" />
                            Accept
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleReject(appt.id)}
                        disabled={loadingId === appt.id}
                        className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out transform
                                  ${loadingId === appt.id
                            ? 'bg-red-300 cursor-not-allowed scale-95 shadow-inner'
                            : 'bg-red-600 hover:bg-red-700 hover:scale-105 hover:shadow-lg text-white active:scale-95'
                          }
                                `}
                      >
                        {/* Loading overlay with pulse effect */}
                        {loadingId === appt.id && (
                          <div className="absolute inset-0 bg-red-400 rounded-lg animate-pulse opacity-50" />
                        )}

                        {/* Content container */}
                        <div className={`relative flex items-center transition-all duration-300 ${loadingId === appt.id ? 'text-red-800' : 'text-white'}`}>
                          {loadingId === appt.id ? (
                            <>
                              {/* Enhanced spinner with multiple rings */}
                              <div className="relative mr-2 w-4 h-4">
                                {/* Outer ring */}
                                <div className="absolute inset-0 border-2 border-red-200 rounded-full animate-spin border-t-red-600" />
                                {/* Inner ring - counter rotation */}
                                <div className="absolute inset-1 border-2 border-transparent rounded-full animate-spin border-b-red-700"
                                  style={{ animationDirection: 'reverse', animationDuration: '0.6s' }} />
                              </div>

                              {/* Animated dots */}
                              <span className="flex items-center">
                                Processing
                                <span className="ml-1 flex space-x-0.5">
                                  <span className="w-1 h-1 bg-red-700 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                  <span className="w-1 h-1 bg-red-700 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                  <span className="w-1 h-1 bg-red-700 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </span>
                              </span>
                            </>
                          ) : (
                            <>
                              <X className="w-4 h-4 mr-1 transition-transform duration-200 group-hover:scale-110" />
                              Cancelled
                            </>
                          )}
                        </div>

                        {/* Success ripple effect (optional - add when action completes) */}
                        {/* You can trigger this with additional state when the action succeeds */}
                        {/* <div className="absolute inset-0 bg-green-400 rounded-lg animate-ping opacity-75" /> */}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Empty state */}
          {filteredAppointments.length === 0 && (
            <div className="text-center py-12">
              <CalendarCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}