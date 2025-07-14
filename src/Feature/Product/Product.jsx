import { useState, useEffect } from 'react';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState(new Set());
    const exchangeRate = 83; // 1 USD = 83 INR (adjust as needed)

    useEffect(() => {
        async function getData() {
            try {
                let res = await fetch("https://fakestoreapi.com/products");
                let data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);

    const toggleFavorite = (productId) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(productId)) {
            newFavorites.delete(productId);
        } else {
            newFavorites.add(productId);
        }
        setFavorites(newFavorites);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
                    <div className="flex space-x-4">
                        <select className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Sort by</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Rating</option>
                        </select>
                        <button className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm flex items-center">
                            <span>Filter</span>
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => {
                        const priceInRupees = (product.price * exchangeRate).toFixed(2);
                        const discountedPrice = (priceInRupees * 0.8).toFixed(2); // 20% discount
                        const isFavorite = favorites.has(product.id);

                        return (
                            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group flex flex-col h-full border border-gray-100">
                                <Link to={`/Details/${product.id}`} className="block flex-grow">
                                    <div className="relative h-64 overflow-hidden bg-gray-50">
                                        <img 
                                            src={product.image} 
                                            alt={product.title} 
                                            className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                </Link>
                                <div className="p-4 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <FiStar
                                                    key={i}
                                                    className={`w-4 h-4 ${i < Math.round(product.rating.rate) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                                />
                                            ))}
                                            <span className="text-xs text-gray-500 ml-1">({product.rating.count})</span>
                                        </div>
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleFavorite(product.id);
                                            }}
                                            className="p-1 -mt-1 -mr-1 rounded-full hover:bg-gray-100 transition-colors"
                                        >
                                            <FiHeart 
                                                className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'}`}
                                            />
                                        </button>
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                                        {product.title}
                                    </h3>
                                    {product.rating.rate > 4.5 && (
                                        <div className="mb-2">
                                            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                                                Best Seller
                                            </span>
                                        </div>
                                    )}
                                    <div className="mt-auto">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-lg font-bold text-blue-600">₹{discountedPrice}</p>
                                                {product.price > 20 && (
                                                    <div className="flex items-center">
                                                        <p className="text-xs text-gray-500 line-through mr-2">₹{priceInRupees}</p>
                                                        <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">20% OFF</span>
                                                    </div>
                                                )}
                                            </div>
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm flex items-center transition-colors shadow-sm hover:shadow-md">
                                                <FiShoppingCart className="mr-1" />
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center mt-12">
                    <nav className="flex items-center space-x-2">
                        <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-blue-600 hover:text-white transition-colors">
                            Previous
                        </button>
                        <button className="px-3 py-1 rounded-md bg-blue-600 text-white">
                            1
                        </button>
                        <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                            2
                        </button>
                        <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                            3
                        </button>
                        <span className="px-2 text-gray-500">...</span>
                        <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                            10
                        </button>
                        <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-blue-600 hover:text-white transition-colors">
                            Next
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
} 