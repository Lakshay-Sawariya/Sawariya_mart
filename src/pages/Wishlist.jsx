import React, { useState, useEffect } from 'react';
import { FiHeart, FiShoppingCart, FiX, FiStar, FiArrowRight, FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { Link, useNavigate } from 'react-router-dom';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const exchangeRate = 83;
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        let res = await fetch("https://fakestoreapi.com/products");
        let data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        const wishlistIds = new Set(JSON.parse(savedWishlist));
        const wishlistProducts = products.filter(product => wishlistIds.has(product.id));
        setWishlistItems(wishlistProducts);
      } else {
        setWishlistItems([]);
      }
    }
  }, [products]);

  const removeFromWishlist = (id) => {
    const newWishlist = new Set(JSON.parse(localStorage.getItem('wishlist') || '[]'));
    newWishlist.delete(id);
    localStorage.setItem('wishlist', JSON.stringify(Array.from(newWishlist)));
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    window.dispatchEvent(new Event('storage'));
  };

  const moveToCart = (item) => {
    navigate('/cart', { state: { productId: item.id } });
  };

  const clearWishlist = () => {
    localStorage.removeItem('wishlist');
    setWishlistItems([]);
    window.dispatchEvent(new Event('storage'));
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: { 
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-6">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Your Wishlist</h1>
                <p className="text-gray-500 text-sm mt-1">{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}</p>
              </div>
              {wishlistItems.length > 0 && (
                <button
                  onClick={clearWishlist}
                  className="flex items-center px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FiTrash2 className="mr-2" /> Clear All
                </button>
              )}
            </div>
          </div>
          
          {isLoading ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ) : wishlistItems.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 mb-4">
                <FiHeart className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-6">Save your favorite items here for later</p>
              <Link
                to="/"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md inline-flex items-center group"
              >
                <span>Continue Shopping</span>
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {wishlistItems.map(item => {
                  const priceInRupees = (item.price * exchangeRate).toFixed(2);
                  const discountedPrice = (item.price * exchangeRate * 0.8).toFixed(2);
                  const isNew = item.id > 16;
                  
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0 }}
                      variants={itemVariants}
                      whileHover="hover"
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col h-full border border-gray-200 relative"
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {isNew && (
                        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                          NEW
                        </span>
                      )}
                      <button 
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 z-10"
                        aria-label="Remove from wishlist"
                      >
                        <FiX className="h-4 w-4 text-gray-600 hover:text-red-500" />
                      </button>
                      
                      <Link to={`/Details/${item.id}`} className="block flex-grow">
                        <div className="relative h-60 overflow-hidden bg-gray-50">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-contain p-4"
                            initial={{ scale: 1 }}
                            animate={{ 
                              scale: hoveredItem === item.id ? 1.05 : 1,
                              transition: { duration: 0.3 }
                            }}
                            loading="lazy"
                          />
                          {item.rating.rate > 4.5 && (
                            <span className="absolute top-2 left-2 bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded shadow-sm">
                              Best Seller
                            </span>
                          )}
                        </div>
                      </Link>
                      
                      <div className="p-4 flex flex-col flex-grow">
                        <Link to={`/Details/${item.id}`} className="group">
                          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
                            {item.title}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center mb-3">
                          <div className="flex items-center mr-2">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={`w-3.5 h-3.5 ${i < Math.round(item.rating.rate) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">({item.rating.count})</span>
                        </div>
                        
                        <div className="mt-auto">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-lg font-bold text-gray-900">₹{discountedPrice}</p>
                              {item.price > 20 && (
                                <div className="flex items-center">
                                  <p className="text-xs text-gray-500 line-through mr-2">₹{priceInRupees}</p>
                                  <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded shadow-sm">20% OFF</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => moveToCart(item)}
                            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center transition-all duration-300 shadow-sm"
                          >
                            <FiShoppingCart className="mr-2" />
                            Add to Cart
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}