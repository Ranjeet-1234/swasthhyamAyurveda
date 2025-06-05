import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Search} from 'lucide-react';

const AdminServicesPage = () => {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        duration: '',
        category: ''
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Mock initial data
    // import { useEffect, useState } from 'react';
    // import axios from 'axios'; // Or use fetch

    // const YourComponent = () => {
    //   const [services, setServices] = useState([]);
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('https://swasthhyam-backend.onrender.com/api/services/'); // Replace with your actual API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch services');
                }
                const data = await response.json();
                // console.log(data)
                setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);
    const categories = [
        { value: 'all', label: 'All Services' },
        { value: 'therapy', label: 'Therapy' },
        { value: 'massage', label: 'Massage' },
        { value: 'consultation', label: 'Consultation' },
        { value: 'treatment', label: 'Treatment' }
    ];

    const filteredServices = services.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleSubmit = async () => {
        if (!formData.name.trim() || !formData.description.trim()) return;
        const token = localStorage.getItem('token');
        try {
            const response = editingIndex !== null
                ? await fetch(`https://swasthhyam-backend.onrender.com/api/services/${formData._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData),
                })
                : await fetch('https://swasthhyam-backend.onrender.com/api/services/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData),
                });

            if (!response.ok) throw new Error('Failed to save service');

            const savedService = await response.json();

            if (editingIndex !== null) {
                const updated = [...services];
                updated[editingIndex] = savedService;
                setServices(updated);
            } else {
                setServices([...services, savedService]);
            }

            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', price: '', duration: '', category: 'therapy' });
        setEditingIndex(null);
        setShowForm(false);
    };

    const handleEdit = (index) => {
        setFormData(services[index]);
        setEditingIndex(index);
        setShowForm(true);
    };

    const handleDelete = async (index) => {
        const serviceToDelete = services[index];
        const token = localStorage.getItem('token');
        if (!serviceToDelete._id) return;
    
        try {
            const response = await fetch(`https://your-backend-url.com/api/services/${serviceToDelete._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
    
            if (!response.ok) throw new Error('Failed to delete service');
    
            // Remove from UI
            const updatedServices = services.filter((_, i) => i !== index);
            setServices(updatedServices);
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };
    
    const getCategoryColor = (category) => {
        const colors = {
            therapy: 'bg-emerald-100 text-emerald-800',
            massage: 'bg-blue-100 text-blue-800',
            consultation: 'bg-purple-100 text-purple-800',
            treatment: 'bg-orange-100 text-orange-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800 mb-2">Service Management</h1>
                            <p className="text-slate-600">Manage your Ayurvedic services and treatments</p>
                        </div>
                        <button
                            onClick={() => {
                                resetForm();
                                setShowForm(true);
                            }}
                            className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <Plus className="w-5 h-5" /> Add New Service
                        </button>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search services..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                            {categories.map(cat => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Statistics Cards */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{services.length}</p>
                <p className="text-slate-600 text-sm">Total Services</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{filteredServices.length}</p>
                <p className="text-slate-600 text-sm">Filtered Results</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{services.filter(s => s.category === 'therapy').length}</p>
                <p className="text-slate-600 text-sm">Therapies</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{services.filter(s => s.category === 'massage').length}</p>
                <p className="text-slate-600 text-sm">Massages</p>
              </div>
            </div>
          </div>
        </div> */}

                {/* Services Grid */}
                <div className="grid gap-6">
                    {filteredServices.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">No services found</h3>
                            <p className="text-slate-600">Try adjusting your search or filter criteria</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-slate-600 border mt-4 rounded-xl overflow-hidden">
                                <thead className="bg-slate-100 text-slate-700 text-xs uppercase">
                                    <tr>
                                        <th className="px-6 py-4">#</th>
                                        <th className="px-6 py-4">Image</th>
                                        <th className="px-6 py-4">Service</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Description</th>
                                        <th className="px-6 py-4">More</th>
                                        <th className="px-6 py-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {filteredServices.map((service, index) => {
                                        // console.log(service)
                                        const originalIndex = services.findIndex(s => s === service);
                                        return (
                                            <tr key={originalIndex} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-slate-900">{index + 1}</td>
                                                <td className="px-6 py-4">
                                                    {service.img ? (
                                                        <img
                                                            src={service.img}
                                                             loading='lazy'
                                                            alt={service.name}
                                                            className="w-14 h-14 object-cover rounded-md border"
                                                        />
                                                    ) : (
                                                        <div className="w-14 h-14 flex items-center justify-center bg-slate-100 text-slate-400 rounded-md border text-xs">
                                                            No Image
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-slate-800">{service.name}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
                                                        {service.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 max-w-sm">{service.description}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    {service.url ? (
                                                        <a
                                                            href={service.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition"
                                                        >
                                                            Learn More
                                                        </a>
                                                    ) : (
                                                        <span className="text-slate-400 italic">—</span>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <button
                                                            onClick={() => handleEdit(originalIndex)}
                                                            className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition"
                                                            title="Edit service"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(originalIndex)}
                                                            className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition"
                                                            title="Delete service"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>


                    )}
                </div>

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-slate-200 px-8 py-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-slate-800">
                                        {editingIndex !== null ? 'Edit Service' : 'Add New Service'}
                                    </h2>
                                    <button
                                        onClick={resetForm}
                                        className="hover:bg-slate-100 p-2 rounded-xl transition-colors"
                                        title="Close"
                                    >
                                        <X className="w-6 h-6 text-slate-500" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Service Name *</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="Enter service name"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
                                            <input
                                                type="text"
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="Enter category (e.g. 'Skin Disorders')"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Description *</label>
                                        <textarea
                                            rows={4}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                            placeholder="Describe the service and its benefits"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Icon Name (Lucide) *</label>
                                            <input
                                                type="text"
                                                value={formData.icon}
                                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="E.g., 'Heart', 'Bone', 'Leaf'"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Image URL *</label>
                                            <input
                                                type="url"
                                                value={formData.img}
                                                onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="Enter image URL"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">More Info URL *</label>
                                        <input
                                            type="url"
                                            value={formData.url}
                                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            placeholder="E.g., https://en.wikipedia.org/wiki/Osteoarthritis"
                                            required
                                        />
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="flex-1 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        >
                                            {editingIndex !== null ? 'Update Service' : 'Add Service'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminServicesPage;