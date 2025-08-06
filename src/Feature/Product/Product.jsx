import { useState, useEffect, useMemo, useCallback } from 'react';
import {
    FiShoppingCart,
    FiHeart,
    FiStar,
    FiFilter,
    FiChevronDown,
    FiChevronUp,
    FiSearch,
    FiX,
    FiWifiOff
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Product() {
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState(new Set());
    const [sortOption, setSortOption] = useState('');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [ratingFilter, setRatingFilter] = useState(0);
    const [categoryFilter, setCategoryFilter] = useState(new Set());
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const exchangeRate = 83;
    const navigate = useNavigate();

    // Load wishlist from localStorage
    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            setFavorites(new Set(JSON.parse(savedWishlist)));
        }
    }, []);

    // Check internet connection
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Fetch products
    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
                if (!isOnline) {
                    setFetchError('No internet connection. Please check your network.');
                    setIsLoading(false);
                    return;
                }
                
                setFetchError(null);
                let res = await fetch("https://fakestoreapi.com/products");
                
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                
                let data = await res.json();
                // Add more products for demo
                const additionalProducts = [
                    {
                        id: 21,
                        title: "Premium Wireless Headphones",
                        price: 199.99,
                        description: "Noise cancelling wireless headphones with 30hr battery life",
                        category: "electronics",
                        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                        rating: { rate: 4.8, count: 120 }
                    },
                    {
                        id: 22,
                        title: "Smart Watch Pro",
                        price: 249.99,
                        description: "Advanced smartwatch with health monitoring features",
                        category: "electronics",
                        image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
                        rating: { rate: 4.6, count: 89 }
                    },
                    {
                        id: 23,
                        title: "Wireless Charging Pad",
                        price: 29.99,
                        description: "Fast charging pad compatible with all Qi-enabled devices",
                        category: "electronics",
                        image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
                        rating: { rate: 4.3, count: 45 }
                    }
                ];
                
                setProducts([...data, ...additionalProducts]);
            } catch (error) {
                console.error("Error fetching products:", error);
                setFetchError(error.message || 'Failed to load products. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }
        getData();
    }, [isOnline]);

    // Filter and sort products with memoization
    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
        }

        // Apply price range filter
        filtered = filtered.filter(product => {
            const price = product.price * exchangeRate;
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // Apply rating filter
        if (ratingFilter > 0) {
            filtered = filtered.filter(product => product.rating.rate >= ratingFilter);
        }

        // Apply category filter
        if (categoryFilter.size > 0) {
            filtered = filtered.filter(product => categoryFilter.has(product.category));
        }

        // Apply sorting
        switch (sortOption) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating.rate - a.rating.rate);
                break;
            case 'newest':
                filtered.sort((a, b) => b.id - a.id);
                break;
            default:
                filtered.sort((a, b) => a.id - b.id);
        }

        return filtered;
    }, [products, sortOption, priceRange, ratingFilter, categoryFilter, searchQuery]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredProducts]);

    // Add/remove from wishlist with useCallback
    const toggleFavorite = useCallback((productId) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(productId)) {
            newFavorites.delete(productId);
            toast.info('Product removed from wishlist');
        } else {
            newFavorites.add(productId);
            toast.success('Product added to wishlist');
        }
        setFavorites(newFavorites);
        localStorage.setItem('wishlist', JSON.stringify(Array.from(newFavorites)));
    }, [favorites]);

    // Toggle category filter
    const toggleCategory = useCallback((category) => {
        const newCategories = new Set(categoryFilter);
        if (newCategories.has(category)) {
            newCategories.delete(category);
        } else {
            newCategories.add(category);
        }
        setCategoryFilter(newCategories);
    }, [categoryFilter]);

    // Clear all filters
    const clearFilters = useCallback(() => {
        setSortOption('');
        setPriceRange([0, 10000]);
        setRatingFilter(0);
        setCategoryFilter(new Set());
        setSearchQuery('');
        toast.success('All filters cleared');
    }, []);

    // Add product to cart
    const handleAddToCart = useCallback((productId) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            toast.success(`${product.title} added to cart!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            navigate('/Cart', { state: { productId } });
        }
    }, [products, navigate]);

    // Get unique categories
    const categories = useMemo(() => [...new Set(products.map(product => product.category))], [products]);

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Memoized Product Card Component
    const ProductCard = useCallback(({ product }) => {
        const priceInRupees = (product.price * exchangeRate).toFixed(2);
        const discountedPrice = (product.price * exchangeRate * 0.8).toFixed(2);
        const isFavorite = favorites.has(product.id);
        const isNew = product.id > 20;

        return (
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group flex flex-col h-full border border-gray-200 relative">
                {isNew && (
                    <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                        NEW
                    </span>
                )}
                <Link to={`/Details/${product.id}`} className="block flex-grow">
                    <div className="relative h-60 overflow-hidden bg-gray-50 flex items-center justify-center">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/300x300?text=Product+Image";
                            }}
                        />
                        {product.rating.rate > 4.5 && (
                            <span className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded shadow-sm">
                                Best Seller
                            </span>
                        )}
                    </div>
                </Link>
                <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <FiStar
                                    key={i}
                                    className={`w-3.5 h-3.5 ${i < Math.round(product.rating.rate) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
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
                            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                            <FiHeart
                                className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'}`}
                            />
                        </button>
                    </div>
                    <Link to={`/Details/${product.id}`} className="group">
                        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {product.title}
                        </h3>
                    </Link>
                    <div className="mt-auto">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-lg font-bold text-gray-900">₹{discountedPrice}</p>
                                {product.price > 20 && (
                                    <div className="flex items-center">
                                        <p className="text-xs text-gray-500 line-through mr-2">₹{priceInRupees}</p>
                                        <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded shadow-sm">20% OFF</span>
                                    </div>
                                )}
                            </div>
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center transition-colors shadow-sm"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleAddToCart(product.id);
                                }}
                            >
                                <FiShoppingCart className="mr-1" />
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [favorites, toggleFavorite, handleAddToCart]);

    // Skeleton loader component
    const SkeletonLoader = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(itemsPerPage)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden h-full border border-gray-200 animate-pulse">
                    <div className="h-60 bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Show loading state */}
                {isLoading && <SkeletonLoader />}
                
                {/* Show error message */}
                {fetchError && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <FiWifiOff className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">
                                    {fetchError}
                                    {!isOnline && (
                                        <button 
                                            onClick={() => window.location.reload()} 
                                            className="ml-2 text-red-600 font-medium hover:text-red-800 underline"
                                        >
                                            Retry
                                        </button>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Search and filter controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    {/* Search bar */}
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 hover:shadow-md"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            disabled={isLoading}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 rounded-full p-1 transition-colors"
                            >
                                <FiX className="text-gray-400 hover:text-gray-600" />
                            </button>
                        )}
                    </div>

                    {/* Filter and sort controls */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        {/* Filter button */}
                        <div className="relative w-full">
                            <button
                                className="w-full flex items-center justify-between gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200 shadow-sm"
                                onClick={() => setShowFilters(!showFilters)}
                                disabled={isLoading}
                            >
                                <div className="flex items-center gap-2">
                                    <FiFilter className="text-gray-500 group-hover:text-gray-700" />
                                    <span className="font-medium text-gray-700">Filters</span>
                                    {(categoryFilter.size > 0 || ratingFilter > 0 || priceRange[1] < 10000) && (
                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                                            {[categoryFilter.size, ratingFilter > 0 ? 1 : 0, priceRange[1] < 10000 ? 1 : 0].reduce((a, b) => a + b, 0)}
                                        </span>
                                    )}
                                </div>
                                {showFilters ? (
                                    <FiChevronUp className="text-gray-500" />
                                ) : (
                                    <FiChevronDown className="text-gray-500" />
                                )}
                            </button>
                        </div>

                        {/* Sort dropdown */}
                        <div className="relative w-full min-w-[200px] max-w-md group">
                            <select
                                className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200 cursor-pointer hover:border-gray-300 hover:shadow-md font-medium text-gray-700"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                disabled={isLoading}
                            >
                                <option value="">Sort by: Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                                <option value="newest">Newest Arrivals</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 group-hover:text-gray-700 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters panel */}
                {showFilters && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-lg text-gray-900">Filters</h3>
                            <button
                                onClick={clearFilters}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                Clear all
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Price range filter */}
                            <div>
                                <h4 className="font-medium text-gray-800 mb-4">Price Range (₹)</h4>
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="flex-1">
                                        <label className="block text-xs text-gray-500 mb-1">Min</label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg p-2 text-sm shadow-sm"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                            min="0"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-xs text-gray-500 mb-1">Max</label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg p-2 text-sm shadow-sm"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                            min={priceRange[0]}
                                        />
                                    </div>
                                </div>
                                <div className="px-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="10000"
                                        step="100"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Rating filter */}
                            <div>
                                <h4 className="font-medium text-gray-800 mb-4">Customer Rating</h4>
                                <div className="flex flex-wrap gap-2">
                                    {[4, 3, 2, 1].map((stars) => (
                                        <button
                                            key={stars}
                                            className={`flex items-center px-3 py-2 rounded-lg border ${ratingFilter === stars ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'} shadow-sm`}
                                            onClick={() => setRatingFilter(ratingFilter === stars ? 0 : stars)}
                                        >
                                            <div className="flex mr-1">
                                                {[...Array(stars)].map((_, i) => (
                                                    <FiStar
                                                        key={i}
                                                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                                                    />
                                                ))}
                                                {stars < 5 && [...Array(5 - stars)].map((_, i) => (
                                                    <FiStar
                                                        key={i + stars}
                                                        className="w-4 h-4 text-gray-300"
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-700">& Up</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Category filter */}
                            <div>
                                <h4 className="font-medium text-gray-800 mb-4">Categories</h4>
                                <div className="space-y-2">
                                    {categories.map(category => (
                                        <div key={category} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`category-${category}`}
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                checked={categoryFilter.has(category)}
                                                onChange={() => toggleCategory(category)}
                                            />
                                            <label
                                                htmlFor={`category-${category}`}
                                                className="ml-2 text-sm text-gray-700 capitalize"
                                            >
                                                {category.split(' ').map(word =>
                                                    word.charAt(0).toUpperCase() + word.slice(1)
                                                ).join(' ')}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Products grid */}
                {!isLoading && filteredProducts.length === 0 && products.length > 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                            <FiSearch className="h-6 w-6 text-gray-500" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">No products found</h3>
                        <p className="text-gray-500 mb-6">Try adjusting your search or filters to find what you're looking for</p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    !isLoading && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {currentItems.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-12">
                                    <nav className="flex items-center gap-1">
                                        <button
                                            onClick={() => paginate(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-sm transition-colors"
                                        >
                                            Previous
                                        </button>

                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (currentPage <= 3) {
                                                pageNum = i + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = currentPage - 2 + i;
                                            }

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => paginate(pageNum)}
                                                    className={`px-3 py-1.5 rounded-md border ${currentPage === pageNum ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} shadow-sm`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}

                                        {totalPages > 5 && currentPage < totalPages - 2 && (
                                            <span className="px-2 text-gray-500">...</span>
                                        )}

                                        {totalPages > 5 && currentPage < totalPages - 2 && (
                                            <button
                                                onClick={() => paginate(totalPages)}
                                                className={`px-3 py-1.5 rounded-md border ${currentPage === totalPages ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} shadow-sm`}
                                            >
                                                {totalPages}
                                            </button>
                                        )}

                                        <button
                                            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-sm transition-colors"
                                        >
                                            Next
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </>
                    )
                )}
            </div>
        </div>
    );
}