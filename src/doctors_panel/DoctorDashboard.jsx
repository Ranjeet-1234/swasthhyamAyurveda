import React, { useEffect,useRef, useState } from 'react';
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

// const appointments = [
//   { id: 1, patient: 'Anjali Verma', age: 28, date: '2025-06-01', time: '10:00 AM', symptoms: 'Headache, Nausea', status: 'Pending', priority: 'Medium', phone: '+91 98765 43210' },
//   { id: 2, patient: 'Ravi Sharma', age: 45, date: '2025-06-01', time: '11:00 AM', symptoms: 'Back pain', status: 'Pending', priority: 'High', phone: '+91 98765 43211' },
//   { id: 3, patient: 'Sonal Gupta', age: 32, date: '2025-06-01', time: '01:30 PM', symptoms: 'Fatigue', status: 'Accepted', priority: 'Low', phone: '+91 98765 43212' },
//   { id: 4, patient: 'Arjun Reddy', age: 35, date: '2025-06-01', time: '02:30 PM', symptoms: 'Chest pain', status: 'Pending', priority: 'High', phone: '+91 98765 43213' },
//   { id: 5, patient: 'Priya Singh', age: 29, date: '2025-06-01', time: '03:30 PM', symptoms: 'Skin rash', status: 'Accepted', priority: 'Medium', phone: '+91 98765 43214' },
// ];

// const stats = [
//   { title: 'Total Appointments', value: '24', change: '+12%', icon: CalendarCheck, color: 'blue' },
//   { title: 'Completed Today', value: '8', change: '+5%', icon: UserCheck, color: 'green' },
//   { title: 'Pending', value: '5', change: '-2%', icon: Clock, color: 'orange' },
//   { title: 'Patients This Week', value: '156', change: '+8%', icon: Activity, color: 'purple' },
// ];
// [
//   {
//     "_id": "683bfb7ad048e02c6f9d4a93",
//     "patientName": "Ranjeet Rewatkar",
//     "PatientEmail": "rewatkarranjeet123@gmail.com",
//     "patientPhone": 9322797220,
//     "patientAge": 20,
//     "PatientGender": "male",
//     "PatientService": "Arthritis",
//     "PatientAddress": "T1 floar, shivdatta palace, MSEB Road, near walchand college of engineering, vishrambag, sangli\nShivdatta palace",
//     "date": "2025-06-03T00:00:00.000Z",
//     "time": "9:00 AM - 1:00 PM",
//     "doctor": {
//       "_id": "683b0dc92da74df778771eae",
//       "name": "Dr. Rohit Sharma",
//       "email": "rohit@gmail.com"
//     },
//     "status": "pending",
//     "createdAt": "2025-06-01T07:04:26.185Z",
//     "updatedAt": "2025-06-01T07:04:26.185Z",
//     "__v": 0
//   }
// ]
export default function DoctorDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  // const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const prevCountRef = useRef(0);

  const navigate = useNavigate();


  const handleAccept = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`https://swasthhyam-backend.onrender.com/api/appointments/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'confirmed' })
      });
      setAppointments(prev =>
        prev.map(appt => appt.id === id ? { ...appt, status: 'Accepted' } : appt)
      );
    } catch (error) {
      console.error('Failed to accept:', error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const doctorId = localStorage.getItem('doctorId');
  
      if (!token || !doctorId){
      navigate('/login');
      }  
  
      try {
        const res = await fetch(`https://swasthhyam-backend.onrender.com/api/appointments/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        const data = await res.json();
        console.log(data)
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
        })));
        
        setDoctor(data[0].doctor || null); // assuming your API sends back doctor details too
  
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };
  
    fetchData();
    const interval = setInterval(fetchData, 60 * 60 * 1000); // every 1 hour
    return () => clearInterval(interval); // cleanup on unmount
  }, []);
  
  const handleReject = (id) => {
    console.log('Rejecting appointment:', id);
  };

  const filteredAppointments = appointments.filter(appt => {
    const matchesSearch = appt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appt.symptoms.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || appt.status === filterStatus;
    return matchesSearch && matchesFilter;
  });
  
  const logout =()=>{
    localStorage.clear('token');
    localStorage.clear('doctorId')
    navigate('/login')
  }

  // const getPriorityColor = (priority) => {
  //   switch (priority) {
  //     case 'High': return 'text-red-600 bg-red-50 border-red-200';
  //     case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  //     case 'Low': return 'text-green-600 bg-green-50 border-green-200';
  //     default: return 'text-gray-600 bg-gray-50 border-gray-200';
  //   }
  // };

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
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900">{doctor?.name || 'Doctor'}</h1>
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
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
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
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {appt.symptoms}
                    </td>
                    {/* <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(appt.priority)}`}>
                        {appt.priority}
                      </span>
                    </td> */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        appt.status === 'Accepted' 
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
                            className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(appt.id)}
                            className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Reject
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
            <div className="divide-y divide-gray-200">
              {filteredAppointments.map((appt) => (
                <div key={appt.id} className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                        {appt.patient.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{appt.patient}</h3>
                        <p className="text-sm text-gray-500">Age: {appt.age}</p>
                      </div>
                    </div>
                    {/* <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(appt.priority)}`}>
                      {appt.priority}
                    </span> */}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {appt.time}
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        appt.status === 'Accepted' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appt.status}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Symptoms:</span> {appt.symptoms}
                    </p>
                  </div>
                  
                  {appt.status === 'Pending' && (
                    <div className="flex space-x-3 pt-2">
                      <button
                        onClick={() => handleAccept(appt.id)}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(appt.id)}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Reject
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