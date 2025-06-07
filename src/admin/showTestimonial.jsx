import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Search, Clock, MapPin, User } from 'lucide-react';

const TestimonialPage = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [formData, setFormData] = useState({
        videoId: '',
        name: '',
        age: '',
        location: '',
        treatment: '',
        comment: '',
        recovery: ''
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTreatment, setSelectedTreatment] = useState('all');

    // Fetch testimonials from backend
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch('https://swasthhyam-backend.onrender.com/api/testimonials/'); // Replace with your actual API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch testimonials');
                }
                const data = await response.json();
                setTestimonials(data);
            } catch (error) {
                // console.error('Error fetching testimonials:', error);
            }
        };

        fetchTestimonials();
    }, []);

    // Extract unique treatments for filter dropdown
    const treatments = [
        { value: 'all', label: 'All Treatments' },
        ...Array.from(new Set(testimonials.map(t => t.treatment)))
            .map(treatment => ({ value: treatment, label: treatment }))
    ];

    const filteredTestimonials = testimonials.filter(testimonial => {
        const matchesSearch = testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            testimonial.treatment.toLowerCase().includes(searchQuery.toLowerCase()) ||
            testimonial.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            testimonial.comment.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTreatment = selectedTreatment === 'all' || testimonial.treatment === selectedTreatment;
        return matchesSearch && matchesTreatment;
    });

    const handleSubmit = async () => {
        if (!formData.name.trim() || !formData.comment.trim()) return;
        const token = localStorage.getItem('token');
        try {
            const response = editingIndex !== null
                ? await fetch(`https://swasthhyam-backend.onrender.com/api/testimonials/${formData._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData),
                })
                : await fetch('https://swasthhyam-backend.onrender.com/api/testimonials/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData),
                });

            if (!response.ok) throw new Error('Failed to save testimonial');

            const savedTestimonial = await response.json();

            if (editingIndex !== null) {
                const updated = [...testimonials];
                updated[editingIndex] = savedTestimonial;
                setTestimonials(updated);
            } else {
                setTestimonials([...testimonials, savedTestimonial]);
            }

            resetForm();
        } catch (error) {
            // console.error('Error submitting form:', error);
        }
    };

    const resetForm = () => {
        setFormData({ videoId: '', name: '', age: '', location: '', treatment: '', comment: '', recovery: '' });
        setEditingIndex(null);
        setShowForm(false);
    };

    const handleEdit = (index) => {
        setFormData(testimonials[index]);
        setEditingIndex(index);
        setShowForm(true);
    };

    const handleDelete = async (index) => {
        const testimonialToDelete = testimonials[index];
        const token = localStorage.getItem('token');
        if (!testimonialToDelete._id) return;
    
        try {
            const response = await fetch(`https://swasthhyam-backend.onrender.com/api/testimonials/${testimonialToDelete._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
    
            if (!response.ok) throw new Error('Failed to delete testimonial');
    
            // Remove from UI
            const updatedTestimonials = testimonials.filter((_, i) => i !== index);
            setTestimonials(updatedTestimonials);
        } catch (error) {
            // console.error('Error deleting testimonial:', error);
        }
    };

    const getTreatmentColor = (treatment) => {
        const colors = {
            'Physiotherapy & Pain Management': 'bg-emerald-100 text-emerald-800',
            'Ayurvedic Treatment': 'bg-blue-100 text-blue-800',
            'Panchakarma': 'bg-purple-100 text-purple-800',
            'Herbal Medicine': 'bg-orange-100 text-orange-800',
            'Yoga Therapy': 'bg-indigo-100 text-indigo-800'
        };
        return colors[treatment] || 'bg-gray-100 text-gray-800';
    };

    const getYouTubeVideoThumbnail = (videoId) => {
        return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800 mb-2">Testimonial Management</h1>
                            <p className="text-slate-600">Manage patient testimonials and success stories</p>
                        </div>
                        <button
                        aria-label="Add New Testimonial"
                            onClick={() => {
                                resetForm();
                                setShowForm(true);
                            }}
                            className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <Plus className="w-5 h-5" /> Add New Testimonial
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
                                placeholder="Search testimonials..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <select
                            value={selectedTreatment}
                            onChange={(e) => setSelectedTreatment(e.target.value)}
                            className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                            {treatments.map(treatment => (
                                <option key={treatment.value} value={treatment.value}>{treatment.label}</option>
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
                                <p className="text-2xl font-bold text-slate-800">{testimonials.length}</p>
                                <p className="text-slate-600 text-sm">Total Testimonials</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Eye className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">{filteredTestimonials.length}</p>
                                <p className="text-slate-600 text-sm">Filtered Results</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Heart className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">{testimonials.filter(t => t.videoId).length}</p>
                                <p className="text-slate-600 text-sm">Video Testimonials</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <Clock className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">{new Set(testimonials.map(t => t.treatment)).size}</p>
                                <p className="text-slate-600 text-sm">Treatment Types</p>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Testimonials Table */}
                <div className="grid gap-6">
                    {filteredTestimonials.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">No testimonials found</h3>
                            <p className="text-slate-600">Try adjusting your search or filter criteria</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-slate-600 border mt-4 rounded-xl overflow-hidden">
                                <thead className="bg-slate-100 text-slate-700 text-xs uppercase">
                                    <tr>
                                        <th className="px-6 py-4">SR No.</th>
                                        <th className="px-6 py-4">Video</th>
                                        <th className="px-6 py-4">Patient</th>
                                        <th className="px-6 py-4">Treatment</th>
                                        <th className="px-6 py-4">Recovery Time</th>
                                        <th className="px-6 py-4">Comment</th>
                                        <th className="px-6 py-4">Date Added</th>
                                        <th className="px-6 py-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {filteredTestimonials.map((testimonial, index) => {
                                        const originalIndex = testimonials.findIndex(t => t === testimonial);
                                        return (
                                            <tr key={testimonial._id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-slate-900">{index + 1}</td>
                                                <td className="px-6 py-4">
                                                    {testimonial.videoId ? (
                                                        <div className="flex flex-col items-center">
                                                            <img
                                                                src={getYouTubeVideoThumbnail(testimonial.videoId)}
                                                                 loading='lazy'
                                                                alt="Video thumbnail"
                                                                className="w-20 h-14 object-cover rounded-md border mb-2"
                                                            />
                                                            <a
                                                                href={`https://www.youtube.com/watch?v=${testimonial.videoId}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-xs text-blue-600 hover:text-blue-700 underline"
                                                            >
                                                                Watch Video
                                                            </a>
                                                        </div>
                                                    ) : (
                                                        <div className="w-20 h-14 flex items-center justify-center bg-slate-100 text-slate-400 rounded-md border text-xs">
                                                            No Video
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                                            <User className="w-5 h-5 text-emerald-600" />
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-slate-800">{testimonial.name}</div>
                                                            <div className="text-xs text-slate-500 flex items-center gap-1">
                                                                <span>Age {testimonial.age}</span>
                                                                <span>•</span>
                                                                <MapPin className="w-3 h-3" />
                                                                <span>{testimonial.location}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTreatmentColor(testimonial.treatment)}`}>
                                                        {testimonial.treatment}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1 text-sm">
                                                        <Clock className="w-4 h-4 text-slate-400" />
                                                        <span className="font-medium text-slate-700">{testimonial.recovery}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 max-w-xs">
                                                    <div className="text-sm text-slate-600 line-clamp-3">
                                                        "{testimonial.comment}"
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-500">
                                                    {formatDate(testimonial.createdAt)}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <button
                                                        aria-label="Edit"
                                                            onClick={() => handleEdit(originalIndex)}
                                                            className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition"
                                                            title="Edit testimonial"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                        aria-label="Delete"
                                                            onClick={() => handleDelete(originalIndex)}
                                                            className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition"
                                                            title="Delete testimonial"
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
                        <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-slate-200 px-8 py-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-slate-800">
                                        {editingIndex !== null ? 'Edit Testimonial' : 'Add New Testimonial'}
                                    </h2>
                                    <button
                                    aria-label="Close"
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
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Patient Name *</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="Enter patient name"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Age *</label>
                                            <input
                                                type="number"
                                                min="1"
                                                max="120"
                                                value={formData.age}
                                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="Enter age"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Location *</label>
                                            <input
                                                type="text"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="Enter location (e.g., Mumbai)"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Treatment *</label>
                                            <input
                                                type="text"
                                                value={formData.treatment}
                                                onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="Enter treatment type"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Recovery Time *</label>
                                            <input
                                                type="text"
                                                value={formData.recovery}
                                                onChange={(e) => setFormData({ ...formData, recovery: e.target.value })}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="E.g., 3 months, 6 weeks"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">YouTube Video ID</label>
                                            <input
                                                type="text"
                                                value={formData.videoId}
                                                onChange={(e) => setFormData({ ...formData, videoId: e.target.value })}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="E.g., LHVLrZJHJHk (optional)"
                                            />
                                            <p className="text-xs text-slate-500 mt-1">Extract the video ID from YouTube URL after 'v='</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Testimonial Comment *</label>
                                        <textarea
                                            rows={5}
                                            value={formData.comment}
                                            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                            placeholder="Enter the patient's testimonial or success story..."
                                            required
                                        />
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button
                                        aria-label="Cancel"
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
                                            {editingIndex !== null ? 'Update Testimonial' : 'Add Testimonial'}
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

export default TestimonialPage;