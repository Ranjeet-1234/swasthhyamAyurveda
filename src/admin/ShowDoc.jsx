import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 ,Users, Calendar, Phone, Mail, MapPin, X, Camera, Quote, Facebook, Linkedin, Instagram, Tag, Search, Filter, Award } from 'lucide-react';


export default function DoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        image: '',
        bio: '',
        specialties: [''],
        experience: '',
        patients: '',
        phone: '',
        email: '',
        address: '',
        quote: '',
        socials: { facebook: '', linkedin: '', instagram: '' },
        main: ''
    });

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
        doctor.bio.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddDoctor = () => {
        setShowAddForm(true);
        setEditingDoctor(null);
        setFormData({
            name: '',
            title: '',
            image: '',
            bio: '',
            specialties: [''],
            experience: '',
            patients: '',
            phone: '',
            email: '',
            address: '',
            quote: '',
            socials: { facebook: '', linkedin: '', instagram: '' },
            main: ''
        });
    };

    const handleEditDoctor = (doctor) => {
        setEditingDoctor(doctor);
        setShowAddForm(true);
        setFormData({
            name: doctor.name,
            title: doctor.title,
            image: doctor.image,
            bio: doctor.bio,
            specialties: doctor.specialties,
            experience: doctor.experience,
            patients: doctor.patients,
            phone: doctor.phone,
            email: doctor.email,
            address: doctor.address,
            quote: doctor.quote,
            socials: doctor.socials,
            main: doctor.main
        });
    };

    const handleDeleteDoctor = (doctorId) => {
        if (window.confirm('Are you sure you want to delete this doctor?')) {
            setDoctors(doctors.filter(doc => doc.id !== doctorId));
        }
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.title || !formData.bio || formData.specialties.some(s => !s.trim()) ||
            !formData.experience || !formData.phone || !formData.email || !formData.address) {
            alert('Please fill in all required fields');
            return;
        }

        const token = localStorage.getItem('token'); // assuming token is stored after login

        if (!token) {
            alert('Unauthorized: No token found');
            return;
        }

        try {
            const url = editingDoctor
                ? `https://swasthhyam-backend.onrender.com/api/doctors/update/${editingDoctor._id}`
                : 'https://swasthhyam-backend.onrender.com/api/doctors/add';

            const method = editingDoctor ? 'PUT' : 'POST';
            console.log(formData);
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Request failed');
            }

            const result = await res.json();

            if (editingDoctor) {
                setDoctors(doctors.map(doc => doc._id === result._id ? result : doc));
            } else {
                setDoctors([...doctors, result]);
            }

            setShowAddForm(false);
            setEditingDoctor(null);

        } catch (error) {
            console.error('Error saving doctor:', error);
            alert('An error occurred. Check the console for details.');
        }
    };

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const token = localStorage.getItem('token'); // or however you're storing the JWT
                const res = await fetch('https://swasthhyam-backend.onrender.com/api/doctors', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch doctors');
                }

                const data = await res.json();
                // console.log(data)
                setDoctors(data);
            } catch (err) {
                console.error('Error fetching doctors:', err.message);
            }
        };

        fetchDoctors();
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('socials.')) {
            const socialKey = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                socials: {
                    ...prev.socials,
                    [socialKey]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSpecialtyChange = (index, value) => {
        const newSpecialties = [...formData.specialties];
        newSpecialties[index] = value;
        setFormData(prev => ({
            ...prev,
            specialties: newSpecialties
        }));
    };

    const addSpecialty = () => {
        setFormData(prev => ({
            ...prev,
            specialties: [...prev.specialties, '']
        }));
    };

    const removeSpecialty = (index) => {
        if (formData.specialties.length > 1) {
            const newSpecialties = formData.specialties.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                specialties: newSpecialties
            }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 p-6 space-y-8">
                {/* Hero Header */}
                <div className="text-center space-y-4 py-8">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-white/50">
                        <Award className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm font-medium text-slate-700">Healthcare Excellence</span>
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Doctors Management
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Manage your medical team with precision and care. Build trust through transparency.
                    </p>
                </div>

                {/* Action Bar */}
                <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
                        {/* Search */}
                        <div className="relative flex-1 min-w-80">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search doctors, specializations, or treatments..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 shadow-sm transition-all duration-200 placeholder-slate-400"
                            />
                        </div>

                        {/* Filter Button */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-6 py-4 bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-200 text-slate-700 font-medium"
                        >
                            <Filter className="w-5 h-5" />
                            Filters
                        </button>
                    </div>

                    {/* Add Doctor Button */}
                    <button
                        onClick={handleAddDoctor}
                        className="flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white px-8 py-4 rounded-2xl hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 font-semibold group"
                    >
                        <Plus className="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" />
                        Add New Doctor
                    </button>
                </div>

                {/* Stats Cards */}
                {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
                        <Users className="w-8 h-8 mb-4 relative z-10" />
                        <p className="text-3xl font-bold mb-1">{doctors.length}</p>
                        <p className="text-blue-100">Total Doctors</p>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
                        <Calendar className="w-8 h-8 mb-4 relative z-10" />
                        <p className="text-3xl font-bold mb-1">
                            {doctors.reduce((sum, doc) => sum + parseInt(doc.patients.replace(/[^0-9]/g, '') || 0), 0).toLocaleString()}+
                        </p>
                        <p className="text-emerald-100">Total Patients</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
                        <Star className="w-8 h-8 mb-4 relative z-10" />
                        <p className="text-3xl font-bold mb-1">
                            {(doctors.reduce((sum, doc) => sum + doc.rating, 0) / doctors.length).toFixed(1)}
                        </p>
                        <p className="text-purple-100">Avg Rating</p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
                        <Clock className="w-8 h-8 mb-4 relative z-10" />
                        <p className="text-3xl font-bold mb-1">24/7</p>
                        <p className="text-orange-100">Available</p>
                    </div>
                </div> */}

                {/* Doctors Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredDoctors.map((doctor, index) => (
                        <div
                            key={index}
                            className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-white/50 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Doctor Image with Overlay */}
                            <div className="relative h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 overflow-hidden">
                                <img
                                    src={doctor.image}
                                    loading='lazy'
                                    alt={doctor.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${doctor.name}&background=6366f1&color=fff&size=400`;
                                    }}
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>


                                {/* Social Links */}
                                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {doctor.socials.facebook !== '#' && (
                                        <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-200 cursor-pointer">
                                            <Facebook className="w-4 h-4" />
                                        </div>
                                    )}
                                    {doctor.socials.linkedin !== '#' && (
                                        <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all duration-200 cursor-pointer">
                                            <Linkedin className="w-4 h-4" />
                                        </div>
                                    )}
                                    {doctor.socials.instagram !== '#' && (
                                        <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-200 cursor-pointer">
                                            <Instagram className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>

                                {/* Experience Badge */}
                                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1">
                                    <span className="text-xs font-semibold text-slate-700">{doctor.experience}</span>
                                </div>
                            </div>

                            {/* Doctor Info */}
                            <div className="p-6 space-y-4">
                                {/* Name and Title */}
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                                        {doctor.name}
                                    </h3>
                                    <p className="text-blue-600 font-medium text-sm mb-3">{doctor.title}</p>
                                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{doctor.bio}</p>
                                </div>

                                {/* Specialties */}
                                <div className="flex flex-wrap gap-2">
                                    {doctor.specialties.slice(0, 2).map((specialty, idx) => (
                                        <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
                                            <Tag className="w-3 h-3" />
                                            {specialty}
                                        </span>
                                    ))}
                                    {doctor.specialties.length > 2 && (
                                        <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                                            +{doctor.specialties.length - 2} more
                                        </span>
                                    )}
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-100">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <Users className="w-4 h-4 text-emerald-500" />
                                            <span className="text-sm font-semibold text-slate-800">{doctor.patients}</span>
                                        </div>
                                        <p className="text-xs text-slate-500">Patients Treated</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <Calendar className="w-4 h-4 text-blue-500" />
                                            <span className="text-sm font-semibold text-slate-800">{doctor.experience}</span>
                                        </div>
                                        <p className="text-xs text-slate-500">Experience</p>
                                    </div>
                                </div>

                                {/* Quote */}
                                {doctor.quote && (
                                    <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-4 relative border-l-4 border-blue-400">
                                        <Quote className="w-4 h-4 text-blue-400 absolute top-3 left-3" />
                                        <p className="text-sm text-slate-700 italic pl-6 leading-relaxed">{doctor.quote}</p>
                                    </div>
                                )}

                                {/* Contact Quick Info */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors cursor-pointer">
                                        <Phone className="w-4 h-4" />
                                        <span>{doctor.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors cursor-pointer">
                                        <Mail className="w-4 h-4" />
                                        <span className="truncate">{doctor.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600">
                                        <MapPin className="w-4 h-4" />
                                        <span>{doctor.address}</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={() => handleEditDoctor(doctor)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-200 font-medium"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteDoctor(doctor.id)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-red-500/25 hover:scale-105 transition-all duration-200 font-medium"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredDoctors.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-12 h-12 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-700 mb-2">No doctors found</h3>
                        <p className="text-slate-500 mb-6">Try adjusting your search criteria or add a new doctor.</p>
                        <button
                            onClick={handleAddDoctor}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200"
                        >
                            <Plus className="w-5 h-5" />
                            Add First Doctor
                        </button>
                    </div>
                )}

                {/* Add/Edit Doctor Modal */}
                {showAddForm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between rounded-t-3xl">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">
                                        {editingDoctor ? 'Edit Doctor Profile' : 'Add New Doctor'}
                                    </h2>
                                    <p className="text-slate-600 mt-1">
                                        {editingDoctor ? 'Update doctor information' : 'Create a new doctor profile'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowAddForm(false)}
                                    className="p-3 hover:bg-slate-100 rounded-2xl transition-colors"
                                >
                                    <X className="w-6 h-6 text-slate-500" />
                                </button>
                            </div>

                            {/* Modal Form */}
                            <div className="p-8 space-y-8">
                                {/* Profile Image Section */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                                    <label className="block text-sm font-semibold text-slate-700 mb-4">
                                        Profile Image
                                    </label>
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 rounded-2xl bg-white shadow-sm flex items-center justify-center overflow-hidden border-2 border-white">
                                            {formData.image ? (
                                                <img src={formData.image}  loading='lazy' alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <Camera className="w-8 h-8 text-slate-400" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="url"
                                                name="image"
                                                value={formData.image}
                                                onChange={handleInputChange}
                                                placeholder="https://example.com/image.jpg"
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            />
                                            <p className="text-xs text-slate-500 mt-2">Enter a valid image URL</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Basic Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="Dr. John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Title/Degree *
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="MBBS, MD (Specialty)"
                                        />
                                    </div>
                                </div>

                                {/* Bio */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Biography *
                                    </label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        required
                                        rows="3"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                                        placeholder="Brief description of the doctor's expertise and approach..."
                                    />
                                </div>

                                {/* Specialties */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Specialties *
                                    </label>
                                    <div className="space-y-3">
                                        {formData.specialties.map((specialty, index) => (
                                            <div key={index} className="flex gap-3">
                                                <input
                                                    type="text"
                                                    value={specialty}
                                                    onChange={(e) => handleSpecialtyChange(index, e.target.value)}
                                                    placeholder="Enter specialty"
                                                    className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                />
                                                {formData.specialties.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSpecialty(index)}
                                                        className="px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={addSpecialty}
                                            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors font-medium"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add Specialty
                                        </button>
                                    </div>
                                </div>

                                {/* Experience and Contact */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Experience *
                                        </label>
                                        <input
                                            type="text"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="10+ Years"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="doctor@hospital.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            patients
                                        </label>
                                        <input
                                            type="email"
                                            name="patients"
                                            value={formData.patients}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="1200+"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Address *
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="City, State"
                                        />
                                    </div>
                                </div>

                                {/* Quote */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Professional Quote
                                    </label>
                                    <textarea
                                        name="quote"
                                        value={formData.quote}
                                        onChange={handleInputChange}
                                        rows="2"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                                        placeholder="A meaningful quote that represents the doctor's philosophy..."
                                    />
                                </div>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        name="main"
                                        checked={formData.main}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                main: e.target.checked, // always update based on actual checkbox state
                                            }))
                                        }
                                        className="w-5 h-5 text-blue-600 bg-white border-2 border-slate-300 rounded focus:ring-blue-500 focus:ring-2 transition-all"
                                    />

                                    <label className="text-sm font-medium text-slate-700">
                                        Add doctor to the Main Panel
                                    </label>
                                </div>


                                {/* Social Media */}
                                <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6">
                                    <label className="block text-sm font-semibold text-slate-700 mb-4">
                                        Social Media Links
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Facebook className="w-4 h-4 text-blue-600" />
                                                <span className="text-sm text-slate-600">Facebook</span>
                                            </div>
                                            <input
                                                type="url"
                                                name="socials.facebook"
                                                value={formData.socials.facebook}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                                placeholder="https://facebook.com/profile"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Linkedin className="w-4 h-4 text-blue-700" />
                                                <span className="text-sm text-slate-600">LinkedIn</span>
                                            </div>
                                            <input
                                                type="url"
                                                name="socials.linkedin"
                                                value={formData.socials.linkedin}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                                placeholder="https://linkedin.com/in/profile"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Instagram className="w-4 h-4 text-pink-600" />
                                                <span className="text-sm text-slate-600">Instagram</span>
                                            </div>
                                            <input
                                                type="url"
                                                name="socials.instagram"
                                                value={formData.socials.instagram}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                                placeholder="https://instagram.com/profile"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex gap-4 pt-6 border-t border-slate-200">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="flex-1 px-8 py-4 border-2 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 font-semibold"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white rounded-xl hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 font-semibold"
                                    >
                                        {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}