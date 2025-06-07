import React, { useEffect, useState } from 'react';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://swasthhyam-backend.onrender.com/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        // console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section id='products' className="relative py-20 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
        <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-teal-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-300/25 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4 animate-fade-in">
            ✨ Handpicked for You
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-700 via-teal-600 to-green-600 bg-clip-text text-transparent mb-6 leading-tight">
            Featured Ayurvedic
            <br />
            <span className="text-4xl lg:text-5xl">Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our premium collection of authentic herbal supplements,
            carefully crafted for your holistic wellness journey
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <a
              key={product._id}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
            >
              <img src={product.img} loading='lazy' alt={product.name} className="w-full h-56 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-emerald-800">{product.name}</h3>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4 w-max">
            {products.map((product) => (
              <a
                key={product._id}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[240px] bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                <img src={product.img} loading='lazy' alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-3 text-center">
                  <h3 className="text-base font-semibold text-emerald-800">{product.name}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
