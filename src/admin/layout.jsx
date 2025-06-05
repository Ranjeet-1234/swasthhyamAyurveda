import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Users, CalendarCheck, LogOut, Menu, X,  User,NotebookTabs ,Handshake} from 'lucide-react';
import ShowDoc from "./ShowDoc"
import AdminServicesPage from "./showService"
import FeatureProduct from "./showProduct"
import ActivityPage from "./showActivity"
import TestimonialPage from "./showTestimonial"
import AllAppointments from "./showAppointment"
import DoctorManagement from "./showDashboard"

const navItems = [
  { name: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '#', active: true },
  { name: 'Doctors', icon: <Users className="w-5 h-5" />, path: '#', active: false },
  { name: 'Appointments', icon: <CalendarCheck className="w-5 h-5" />, path: '#', active: false },
  { name: 'Services', icon: <Handshake className="w-5 h-5" />, path: '#', active: false },
  { name: 'Products', icon: <NotebookTabs className="w-5 h-5" />, path: '#', active: false },
  { name: 'Activity', icon: <Handshake className="w-5 h-5" />, path: '#', active: false },
  { name: 'Testimonial', icon: <Handshake className="w-5 h-5" />, path: '#', active: false },
];

export default function AdminPanelLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const navigate = useNavigate();

  const handleNavClick = (itemName) => {
    setActiveItem(itemName);
    // console.log(itemName)
    setSidebarOpen(false);
  };
  const logout =()=>{
    localStorage.clear('token');
    navigate('/login')
  }
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (!token){
      navigate('/login');
      }  
  
  })

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl
        lg:translate-x-0 lg:static lg:inset-0
        transition-transform duration-300 ease-in-out
        border-r border-slate-200
      `}>
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h2 className="text-xl font-bold text-slate-800">Admin Panel</h2>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md hover:bg-slate-100"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.name)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
                  transition-all duration-200 group
                  ${activeItem === item.name 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }
                `}
              >
                <div className={`
                  ${activeItem === item.name ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}
                  transition-colors duration-200
                `}>
                  {item.icon}
                </div>
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">Admin User</p>
                <p className="text-xs text-slate-500 truncate">admin@example.com</p>
              </div>
            </div>
            <button 
            onClick={logout} 
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200">
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-slate-100"
              >
                <Menu className="w-5 h-5 text-slate-600" />
              </button>
              <div className="hidden sm:block">
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Welcome Back, Admin
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Manage your healthcare platform
                </p>
              </div>
            </div>

            {/* <div className="flex items-center gap-3">
              
              <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-xl px-4 py-2">
                <Search className="w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent border-none outline-none text-sm text-slate-600 w-32 lg:w-48"
                />
              </div>
              
          
              <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

           
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer">
                <User className="w-4 h-4 text-white" />
              </div>
            </div> */}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-8 overflow-auto">
          {/* Mobile Header */}
          <div className="sm:hidden mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage your platform
            </p>
          </div>

          {/* Demo Content */}
          <div className="space-y-6">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">Total Doctors</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">24</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">Appointments</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">142</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <CalendarCheck className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">Active Users</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">1,284</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Home className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div> */}

            {/* Content Area */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              {/* <h3 className="text-lg font-semibold text-slate-800 mb-4">
                {activeItem} Content
              </h3>
              <p className="text-slate-600">
                Your {activeItem.toLowerCase()} content will appear here. This is a placeholder for your actual page content.
              </p>
              {children} */}
              {activeItem === "Doctors" && <ShowDoc />}
              {activeItem === "Dashboard" && <DoctorManagement />}
              {activeItem === "Services" && <AdminServicesPage/>}
              {activeItem === "Appointments" && <AllAppointments/>}
              {activeItem === "Products" && <FeatureProduct/>}
              {activeItem === "Activity" && <ActivityPage/>}
              {activeItem === "Testimonial" && <TestimonialPage/>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}