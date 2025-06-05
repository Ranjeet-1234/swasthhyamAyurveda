import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Search, Calendar, Users, ExternalLink} from 'lucide-react';

const ActivityPage = () => {
    const [activities, setActivities] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        date: '',
        participants: '',
        url: ''
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDateFilter, setSelectedDateFilter] = useState('all');

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('https://swasthhyam-backend.onrender.com/api/activities/');
                if (!response.ok) {
                    throw new Error('Failed to fetch activities');
                }
                const data = await response.json();
                setActivities(data);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, []);

    const dateFilters = [
        { value: 'all', label: 'All Activities' },
        { value: 'today', label: 'Today' },
        { value: 'week', label: 'This Week' },
        { value: 'month', label: 'This Month' },
        { value: 'past', label: 'Past Activities' }
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const isDateInRange = (dateString, filter) => {
        const activityDate = new Date(dateString);
        const today = new Date();
        const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

        switch (filter) {
            case 'today':
                return activityDate.toDateString() === today.toDateString();
            case 'week':
                return activityDate >= weekStart && activityDate <= today;
            case 'month':
                return activityDate >= monthStart && activityDate <= today;
            case 'past':
                return activityDate < today;
            default:
                return true;
        }
    };

    const filteredActivities = activities.filter(activity => {
        const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.participants.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDate = selectedDateFilter === 'all' || isDateInRange(activity.date, selectedDateFilter);
        return matchesSearch && matchesDate;
    });

    const handleSubmit = async () => {
        if (!formData.title.trim() || !formData.description.trim()) return;
        const token = localStorage.getItem('token');
        try {
            const response = editingIndex !== null
                ? await fetch(`https://swasthhyam-backend.onrender.com/api/activities/${formData._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData),
                })
                : await fetch('https://swasthhyam-backend.onrender.com/api/activities/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData),
                });

            if (!response.ok) throw new Error('Failed to save activity');

            const savedActivity = await response.json();

            if (editingIndex !== null) {
                const updated = [...activities];
                updated[editingIndex] = savedActivity;
                setActivities(updated);
            } else {
                setActivities([...activities, savedActivity]);
            }

            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const resetForm = () => {
        setFormData({ 
            title: '', 
            description: '', 
            image: '', 
            date: '', 
            participants: '', 
            url: '' 
        });
        setEditingIndex(null);
        setShowForm(false);
    };

    const handleEdit = (index) => {
        const activity = activities[index];
        setFormData({
            ...activity,
            date: activity.date ? new Date(activity.date).toISOString().split('T')[0] : ''
        });
        setEditingIndex(index);
        setShowForm(true);
    };

    const handleDelete = async (index) => {
        const activityToDelete = activities[index];
        const token = localStorage.getItem('token');
        if (!activityToDelete._id) return;
    
        try {
            const response = await fetch(`https://swasthhyam-backend.onrender.com/api/activities/${activityToDelete._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
    
            if (!response.ok) throw new Error('Failed to delete activity');
    
            const updatedActivities = activities.filter((_, i) => i !== index);
            setActivities(updatedActivities);
        } catch (error) {
            console.error('Error deleting activity:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800 mb-2">Activity Management</h1>
                            <p className="text-slate-600">Manage outreach activities, camps, and community events</p>
                        </div>
                        <button
                            onClick={() => {
                                resetForm();
                                setShowForm(true);
                            }}
                            className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <Plus className="w-5 h-5" /> Add New Activity
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
                                placeholder="Search activities..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <select
                            value={selectedDateFilter}
                            onChange={(e) => setSelectedDateFilter(e.target.value)}
                            className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                            {dateFilters.map(filter => (
                                <option key={filter.value} value={filter.value}>{filter.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Activities Grid */}
                <div className="grid gap-6">
                    {filteredActivities.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">No activities found</h3>
                            <p className="text-slate-600">Try adjusting your search or filter criteria</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-slate-600 border mt-4 rounded-xl overflow-hidden">
                                <thead className="bg-slate-100 text-slate-700 text-xs uppercase">
                                    <tr>
                                        <th className="px-6 py-4">#</th>
                                        <th className="px-6 py-4">Image</th>
                                        <th className="px-6 py-4">Activity</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Participants</th>
                                        <th className="px-6 py-4">Description</th>
                                        <th className="px-6 py-4">Link</th>
                                        <th className="px-6 py-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {filteredActivities.map((activity, index) => {
                                        const originalIndex = activities.findIndex(a => a === activity);
                                        return (
                                            <tr key={originalIndex} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-slate-900">{index + 1}</td>
                                                <td className="px-6 py-4">
                                                    {activity.image ? (
                                                        <img
                                                            src={activity.image}
                                                            loading='lazy'
                                                            alt={activity.title}
                                                            className="w-16 h-12 object-cover rounded-md border"
                                                        />
                                                    ) : (
                                                        <div className="w-16 h-12 flex items-center justify-center bg-slate-100 text-slate-400 rounded-md border text-xs">
                                                            No Image
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-slate-800">{activity.title}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-slate-600">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(activity.date)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-slate-600">
                                                        <Users className="w-4 h-4" />
                                                        {activity.participants}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 max-w-xs">
                                                    <div className="truncate" title={activity.description}>
                                                        {activity.description}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {activity.url ? (
                                                        <a
                                                            href={activity.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition"
                                                        >
                                                            <ExternalLink className="w-3 h-3" />
                                                            View
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
                                                            title="Edit activity"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(originalIndex)}
                                                            className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition"
                                                            title="Delete activity"
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
                                        {editingIndex !== null ? 'Edit Activity' : 'Add New Activity'}
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
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Activity Title *</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            placeholder="Enter activity title"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Description *</label>
                                        <textarea
                                            rows={4}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                            placeholder="Describe the activity and its impact"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Date *</label>
                                            <input
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Participants *</label>
                                            <input
                                                type="text"
                                                value={formData.participants}
                                                onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="e.g., '200+ Patients' or '50 Students'"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Image URL *</label>
                                        <input
                                            type="url"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            placeholder="Enter image URL"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Activity URL</label>
                                        <input
                                            type="url"
                                            value={formData.url}
                                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            placeholder="Link to detailed information about the activity"
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
                                            {editingIndex !== null ? 'Update Activity' : 'Add Activity'}
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

export default ActivityPage;