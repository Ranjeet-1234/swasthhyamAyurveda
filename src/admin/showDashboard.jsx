import React, { useState, useEffect } from "react";
import { Trash2, Plus, Users, Mail, Calendar, Search } from "lucide-react";

export default function DoctorManagement() {
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({email: "", password: "", role: 'doctor'});
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Get token from localStorage (Note: In production, consider more secure storage)
    const getToken = () => {
        if (typeof window !== 'undefined') {
            return window.localStorage?.getItem('token') || '';
        }
        return '';
    };

    // Fetch all doctors
    const fetchDoctors = async () => {
        setLoading(true);
        setError("");
        try {
            const token = getToken();
            const response = await fetch("https://swasthhyam-backend.onrender.com/api/auth", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // console.log(response)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // console.log("Fetched doctors:", data);
            setDoctors(Array.isArray(data) ? data : []);
        } catch (error) {
            // console.error("Error fetching doctors:", error);
            setError("Failed to fetch doctors. Please try again.");
            setDoctors([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setFormData({email: "", password: "", role: "doctor"});
        setEditingId(null);
        setShowForm(false);
    };

    const handleSubmit = async () => {
        if (!formData.email || (!formData.password && !editingId)) {
            setError("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        setError("");
        
        try {
            const token = getToken();
            const response = await fetch("https://swasthhyam-backend.onrender.com/api/auth/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            // console.log("Doctor created:", result);
            
            // Refresh the doctors list
            await fetchDoctors();
            resetForm();
            setError("");
        } catch (error) {
            // console.error("Error creating doctor:", error);
            setError(error.message || "Failed to create doctor. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this doctor?")) {
            return;
        }

        setLoading(true);
        setError("");
        
        try {
            const token = getToken();
            const response = await fetch(`https://swasthhyam-backend.onrender.com/api/auth/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            // console.log("Doctor deleted successfully");
            
            // Refresh the doctors list
            await fetchDoctors();
        } catch (error) {
            // console.error("Error deleting doctor:", error);
            setError(error.message || "Failed to delete doctor. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const filteredDoctors = doctors.filter(doctor =>
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                                Doctor Login Management
                            </h1>
                            <p className="text-gray-600">Manage doctor accounts and permissions</p>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
                            <Users size={16} />
                            <span>{doctors.length} Total Doctors</span>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search doctors by email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <button
                        aria-label="Add Doctor"
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                        <Plus size={20} />
                        <span className="font-medium">Add Doctor</span>
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">{error}</p>
                            </div>
                            <div className="ml-auto pl-3">
                                <button
                                aria-label="View Error"
                                    onClick={() => setError("")}
                                    className="inline-flex text-red-400 hover:text-red-600"
                                >
                                    <span className="sr-only">Dismiss</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Doctor Form */}
                {showForm && (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                            <h3 className="text-xl font-semibold text-white">
                                {editingId ? "Update Doctor" : "Add New Doctor"}
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="doctor@hospital.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder={editingId ? "Leave blank to keep current password" : "Enter password"}
                                        value={formData.password}
                                        onChange={handleChange}
                                        required={!editingId}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                >
                                    {loading ? "Processing..." : (editingId ? "Update Doctor" : "Add Doctor")}
                                </button>
                                <button
                                aria-label="Cancel"
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 sm:flex-none bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-all font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Doctors List */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900">Registered Doctors</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            {filteredDoctors.length} of {doctors.length} doctors shown
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="ml-3 text-gray-600">Loading doctors...</span>
                        </div>
                    ) : filteredDoctors.length === 0 ? (
                        <div className="text-center py-12">
                            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <h4 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h4>
                            <p className="text-gray-600">
                                {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first doctor"}
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Email</th>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Role</th>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Created</th>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredDoctors.map((doc, index) => (
                                            <tr key={doc._id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                                                            {doc.email.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="text-gray-900 font-medium">{doc.email}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                                                        {doc.role || "doctor"}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <Calendar size={14} className="mr-2" />
                                                        {new Date(doc.createdAt).toLocaleDateString('en-US', { 
                                                            year: 'numeric', 
                                                            month: 'short', 
                                                            day: 'numeric' 
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <button
                                                    aria-label="Delete"
                                                        onClick={() => handleDelete(doc._id)}
                                                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all"
                                                        title="Delete doctor"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden divide-y divide-gray-100">
                                {filteredDoctors.map((doc) => (
                                    <div key={doc._id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center flex-1">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                                                    {doc.email.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{doc.email}</p>
                                                    <div className="flex items-center mt-1">
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize mr-3">
                                                            {doc.role || "doctor"}
                                                        </span>
                                                        <div className="flex items-center text-xs text-gray-500">
                                                            <Calendar size={12} className="mr-1" />
                                                            {new Date(doc.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                            aria-label="Delete"
                                                onClick={() => handleDelete(doc._id)}
                                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all ml-2"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}