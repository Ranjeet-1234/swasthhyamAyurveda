import React, { useEffect, useState } from 'react';
import { Edit3, Trash2, Plus, X, Save, Image } from 'lucide-react';

export default function FeatureProductTable() {
    const [products, setProducts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [form, setForm] = useState({ name: '', image: '', reference: '' });

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const res = await fetch('https://swasthhyam-backend.onrender.com/api/products');
            const data = await res.json();
            setProducts(data);
          } catch (err) {
            console.error('Error fetching products:', err);
          }
        };
      
        fetchProducts();
      }, []);
      
    const openModal = (product = null) => {
        setEditData(product);
        setForm(product || { name: '', image: '', reference: '' });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditData(null);
        setForm({ name: '', image: '', reference: '' });
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        const method = editData ? 'PUT' : 'POST';
        const url = editData ? `https://swasthhyam-backend.onrender.com/api/products/${editData._id}` : 'https://swasthhyam-backend.onrender.com/api/products/add';
        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(form),
        });

        if (!res.ok) {
            // console.log(res)
            const data = await res.json();
            throw new Error(data.message || 'Request failed');
        } 

        const result = await res.json();

        if (editData) {
            setProducts(products.map(doc => doc._id === result._id ? result : doc));
            closeModal();
        } else {
            setProducts([...products, result]);
            closeModal();
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this product?');
        if (!confirmed) return;

        const res = await fetch(`https://swasthhyam-backend.onrender.com/api/products/${id}`, { method: 'DELETE' });

        if (res.ok) {
            setProducts(products.filter(p => p._id !== id));
        } else {
            console.error('Delete failed');
        }
    };

    const handleInputChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                Featured Products
                            </h1>
                            <p className="text-gray-600 mt-1">Manage your product catalog</p>
                        </div>
                        <button 
                            onClick={() => openModal()} 
                            className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 font-medium"
                        >
                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                            Add Product
                        </button>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm border-b border-gray-200/50">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 tracking-wider">
                                        Product Image
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 tracking-wider">
                                        Product Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/50">
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-4">
                                                    <Image className="w-8 h-8 text-blue-600" />
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                                                <p className="text-gray-500 mb-4">Get started by adding your first product.</p>
                                                <button 
                                                    onClick={() => openModal()} 
                                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
                                                >
                                                    Add Product
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    products.map(product => (
                                        <tr key={product._id} className="hover:bg-blue-50/30 transition-colors duration-200 group">
                                            <td className="px-6 py-4">
                                                <div className="relative group/image">
                                                    <a href={product.url} target="_blank" rel="noopener noreferrer" className="block">
                                                        {product.img ? (
                                                            <img 
                                                                src={product.img} 
                                                                 loading='lazy'
                                                                alt={product.name} 
                                                                className="w-16 h-16 object-cover rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border-2 border-white group-hover/image:scale-110" 
                                                            />
                                                        ) : (
                                                            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-md">
                                                                <Image className="w-6 h-6 text-gray-400" />
                                                            </div>
                                                        )}
                                                        {/* <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                                            <ExternalLink className="w-4 h-4 text-white" />
                                                        </div> */}
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                                                    {product.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <button 
                                                        onClick={() => openModal(product)} 
                                                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group/edit"
                                                        title="Edit product"
                                                    >
                                                        <Edit3 className="w-5 h-5 group-hover/edit:scale-110 transition-transform duration-200" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(product._id)} 
                                                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 group/delete"
                                                        title="Delete product"
                                                    >
                                                        <Trash2 className="w-5 h-5 group-hover/delete:scale-110 transition-transform duration-200" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100 border border-white/20">
                        <div className="relative p-6 border-b border-gray-100">
                            <button 
                                onClick={closeModal} 
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-2xl font-bold text-gray-900 pr-12">
                                {editData ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <p className="text-gray-600 mt-1">
                                {editData ? 'Update product information' : 'Fill in the product details'}
                            </p>
                        </div>
                        
                        <div className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter product name"
                                    value={form.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    value={form.img}
                                    onChange={(e) => handleInputChange('image', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Reference URL</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/product"
                                    value={form.url}
                                    onChange={(e) => handleInputChange('reference', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                />
                            </div>
                        </div>
                        
                        <div className="p-6 bg-gray-50/50 rounded-b-3xl">
                            <button
                                onClick={handleSave}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                            >
                                <Save className="w-5 h-5" />
                                {editData ? 'Update' : 'Save'} Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}