// Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  FiSearch,
  FiX,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiChevronDown,
  FiChevronRight
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  
  const searchRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const categories = [
    { 
      name: "Electronics", 
      subcategories: ["Phones", "Laptops", "Cameras", "Accessories"], 
      color: "text-purple-600",
      hoverColor: "hover:text-purple-700",
      bgColor: "bg-purple-50",
      hoverBgColor: "hover:bg-purple-100",
      icon: "📱"
    },
    { 
      name: "Fashion", 
      subcategories: ["Men", "Women", "Kids", "Accessories"], 
      color: "text-pink-600",
      hoverColor: "hover:text-pink-700",
      bgColor: "bg-pink-50",
      hoverBgColor: "hover:bg-pink-100",
      icon: "👕"
    },
    { 
      name: "Home & Kitchen", 
      subcategories: ["Furniture", "Appliances", "Cookware"], 
      color: "text-blue-600",
      hoverColor: "hover:text-blue-700",
      bgColor: "bg-blue-50",
      hoverBgColor: "hover:bg-blue-100",
      icon: "🏠"
    },
    { 
      name: "Beauty", 
      subcategories: ["Skincare", "Makeup", "Haircare"], 
      color: "text-rose-600",
      hoverColor: "hover:text-rose-700",
      bgColor: "bg-rose-50",
      hoverBgColor: "hover:bg-rose-100",
      icon: "💄"
    },
    { 
      name: "Sports", 
      subcategories: ["Fitness", "Outdoor", "Team Sports"], 
      color: "text-green-600",
      hoverColor: "hover:text-green-700",
      bgColor: "bg-green-50",
      hoverBgColor: "hover:bg-green-100",
      icon: "⚽"
    },
    { 
      name: "Books", 
      subcategories: ["Fiction", "Non-Fiction", "Educational"], 
      color: "text-orange-600",
      hoverColor: "hover:text-orange-700",
      bgColor: "bg-orange-50",
      hoverBgColor: "hover:bg-orange-100",
      icon: "📚"
    }
  ];

  const popularSearches = [
    "iPhone 15 Pro", "MacBook Air M2",
    "Wireless Earbuds", "Smart Watch",
    "4K TV", "Yoga Mat", "Air Fryer"
  ];

  // Enhanced icon hover effects
  const iconHoverEffects = {
    cart: {
      base: "from-purple-50 to-indigo-50",
      hover: "from-purple-100 to-indigo-100",
      scale: "group-hover:scale-110"
    },
    user: {
      base: "from-purple-50 to-indigo-50",
      hover: "from-purple-100 to-indigo-100",
      scale: "group-hover:scale-110"
    },
    heart: {
      base: "from-purple-50 to-indigo-50",
      hover: "from-purple-100 to-indigo-100",
      scale: "group-hover:scale-110"
    },
    search: {
      base: "from-indigo-600 to-purple-600",
      hover: "from-indigo-700 to-purple-700",
      scale: "hover:scale-105"
    }
  };

  // Load cart and wishlist counts from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        const count = JSON.parse(savedCart).length;
        setCartItemsCount(count);
        if (count > cartItemsCount) {
          setCartUpdated(true);
          setTimeout(() => setCartUpdated(false), 1000);
        }
      }
    };

    const updateWishlistCount = () => {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist).length);
      }
    };

    updateCartCount();
    updateWishlistCount();

    window.addEventListener('storage', updateCartCount);
    window.addEventListener('storage', updateWishlistCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('storage', updateWishlistCount);
    };
  }, [cartItemsCount]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchFocused(false);
      setSearchQuery('');
    }
  };

  const handlePopularSearchClick = (query) => {
    setSearchQuery(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsSearchFocused(false);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (!isMobileSearchOpen) {
      setTimeout(() => {
        document.querySelector('.mobile-search-input')?.focus();
      }, 100);
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg bg-white/95 backdrop-blur-sm' : 'bg-white'}`}>
      {/* Top Announcement Bar with animation */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm py-2 px-4 text-center animate-pulse">
        <div className="container mx-auto">
          🎉 Summer Sale: Up to 50% off • Free shipping on orders over ₹4000 •
          <Link 
            to="/deals" 
            className="ml-2 font-semibold underline hover:text-yellow-300 transition-colors duration-300 hover:scale-105 inline-block"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Mobile Menu Button and Logo with enhanced hover */}
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden text-gray-700 p-2 rounded-md hover:bg-purple-100 transition-all duration-300 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <FiMenu size={24} />
            </button>

            <Link 
              to="/" 
              className="flex items-center space-x-2 group transition-transform duration-300 hover:scale-105"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center group-hover:rotate-12 transition-all duration-500 shadow-md hover:shadow-lg">
                <FiShoppingCart size={20} className="text-white transition-transform group-hover:scale-110" />
              </div>
              <span className="text-2xl font-bold text-gray-800 hidden sm:block transition-all duration-300 group-hover:text-purple-600">
                Sawariya<span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Mart</span>
              </span>
            </Link>
          </div>

          {/* Desktop Search with enhanced focus effects */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-6 relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative w-full group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search for products, brands..."
                className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 pr-12 shadow-sm hover:border-purple-300 focus:shadow-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-all duration-300 hover:scale-110"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <FiX size={18} />
                </button>
              )}
              <button
                type="submit"
                className={`absolute right-0 top-0 h-full bg-gradient-to-r ${iconHoverEffects.search.base} text-white px-5 rounded-r-xl hover:opacity-90 transition-all duration-300 ${iconHoverEffects.search.scale} flex items-center shadow-md hover:shadow-lg`}
                aria-label="Search"
                onMouseEnter={() => setHoveredIcon('search')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <FiSearch 
                  size={18} 
                  className={`transition-transform ${hoveredIcon === 'search' ? 'animate-pulse' : ''}`} 
                />
              </button>
            </form>

            {/* Search Suggestions with enhanced animations */}
            {(searchQuery && isSearchFocused) && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-2xl rounded-xl z-50 border border-gray-200 animate-fadeInDown overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs mr-2 animate-pulse">Trending</span>
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 rounded-lg text-sm transition-all duration-300 shadow-sm border border-purple-100 hover:shadow-md hover:-translate-y-0.5"
                        onClick={() => handlePopularSearchClick(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs mr-2 animate-pulse">Categories</span>
                    Shop by Department
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`px-3 py-2 bg-gradient-to-r from-gray-50 to-blue-50 hover:from-gray-100 hover:to-blue-100 rounded-lg text-sm text-left transition-all duration-300 shadow-sm border border-blue-100 flex items-center hover:shadow-md ${category.color} hover:${category.hoverColor} hover:-translate-y-0.5`}
                        onClick={() => handlePopularSearchClick(category.name)}
                      >
                        <span className="font-medium">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Icons with enhanced hover effects */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Mobile Search Toggle */}
            <button 
              className="md:hidden text-gray-700 p-2 rounded-md hover:bg-purple-100 transition-all duration-300 hover:scale-110"
              onClick={toggleMobileSearch}
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>

            <Link 
              to="/account" 
              className="hidden md:flex items-center text-gray-700 hover:text-purple-600 transition-all duration-300 group"
              onMouseEnter={() => setHoveredIcon('user')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div className={`p-2 bg-gradient-to-r ${iconHoverEffects.user.base} rounded-full ${iconHoverEffects.user.hover} ${iconHoverEffects.user.scale} transition-all duration-300 mr-2 shadow-sm`}>
                <FiUser 
                  size={20} 
                  className={`transition-transform ${hoveredIcon === 'user' ? 'animate-bounce' : ''}`} 
                />
              </div>
              <span className="text-sm font-medium group-hover:underline">Account</span>
            </Link>
            
            <Link 
              to="/wishlist" 
              className="flex items-center text-gray-700 hover:text-pink-600 transition-all duration-300 group relative"
              onMouseEnter={() => setHoveredIcon('heart')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div className={`p-2 bg-gradient-to-r ${iconHoverEffects.heart.base} rounded-full ${iconHoverEffects.heart.hover} ${iconHoverEffects.heart.scale} transition-all duration-300 mr-2 shadow-sm`}>
                <FiHeart 
                  size={20} 
                  className={`transition-transform ${hoveredIcon === 'heart' ? 'animate-pulse' : ''}`} 
                />
              </div>
              {wishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-in">
                  {wishlistItems}
                </span>
              )}
              <span className="text-sm font-medium hidden md:block group-hover:underline">Wishlist</span>
            </Link>
            
            <Link 
              to="/cart" 
              className="flex items-center text-gray-700 hover:text-purple-600 transition-all duration-300 group relative"
              onMouseEnter={() => setHoveredIcon('cart')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div className={`p-2 bg-gradient-to-r ${iconHoverEffects.cart.base} rounded-full ${iconHoverEffects.cart.hover} ${iconHoverEffects.cart.scale} transition-all duration-300 mr-2 shadow-sm`}>
                <FiShoppingCart 
                  size={20} 
                  className={`transition-transform ${hoveredIcon === 'cart' ? 'animate-wiggle' : ''}`} 
                />
              </div>
              {cartItemsCount > 0 && (
                <span className={`absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${
                  cartUpdated ? 'animate-bounce' : 'animate-ping-once'
                }`}>
                  {cartItemsCount}
                </span>
              )}
              <span className="text-sm font-medium hidden md:block group-hover:underline">Cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search with animation */}
        {isMobileSearchOpen && (
          <div className={`md:hidden mb-4 ${isMobileSearchOpen ? 'animate-fadeInDown' : 'animate-fadeOutUp'}`}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="mobile-search-input w-full py-3 px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 pr-12 shadow-sm focus:shadow-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-all duration-300 hover:scale-110"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <FiX size={18} />
                </button>
              )}
              <button
                type="submit"
                className={`absolute right-0 top-0 h-full bg-gradient-to-r ${iconHoverEffects.search.base} text-white px-5 rounded-r-xl hover:opacity-90 transition-all duration-300 ${iconHoverEffects.search.scale} flex items-center shadow-md hover:shadow-lg`}
                aria-label="Search"
              >
                <FiSearch size={18} />
              </button>
            </form>
          </div>
        )}

        {/* Desktop Navigation with enhanced hover */}
        <nav className="hidden md:flex items-center justify-between py-3 border-t border-gray-100">
          <div className="flex space-x-6">
            {categories.map((category, index) => (
              <div key={index} className="relative group">
                <button
                  className={`flex items-center py-2 font-medium transition-all duration-300 ${activeCategory === index ? category.color : 'text-gray-700'} ${category.hoverColor} group-hover:translate-y-[-2px]`}
                  onClick={() => setActiveCategory(activeCategory === index ? null : index)}
                  onMouseEnter={() => setActiveCategory(index)}
                >
                  <span className="mr-1 group-hover:scale-110 transition-transform">{category.icon}</span>
                  {category.name}
                  <FiChevronDown 
                    size={18} 
                    className={`ml-1 transition-transform duration-300 ${activeCategory === index ? 'rotate-180' : ''}`} 
                  />
                </button>

                {activeCategory === index && (
                  <div 
                    className="absolute left-0 top-full mt-1 w-48 bg-white shadow-xl rounded-lg z-50 border border-gray-200 animate-fadeInDown origin-top"
                    onMouseLeave={() => setActiveCategory(null)}
                  >
                    {category.subcategories.map((subcat, subIndex) => (
                      <Link
                        key={subIndex}
                        to={`/category/${category.name.toLowerCase()}/${subcat.toLowerCase()}`}
                        className={`block px-4 py-3 ${category.bgColor} ${category.hoverBgColor} transition-all duration-300 border-b border-gray-100 last:border-b-0 ${category.color} hover:${category.hoverColor} hover:pl-6`}
                        onClick={() => setActiveCategory(null)}
                      >
                        <div className="flex items-center">
                          <FiChevronRight size={14} className="mr-2 transition-transform group-hover:translate-x-1" />
                          {subcat}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex space-x-4">
            <Link 
              to="/deals" 
              className="text-red-600 font-medium hover:text-red-700 transition-all duration-300 hover:underline hover:scale-105"
            >
              Today's Deals
            </Link>
            <Link 
              to="/new-arrivals" 
              className="text-green-600 font-medium hover:text-green-700 transition-all duration-300 hover:underline hover:scale-105"
            >
              New Arrivals
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Menu with enhanced animations */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 pt-16 animate-fadeIn">
          <div 
            ref={menuRef} 
            className="bg-white h-full overflow-y-auto shadow-xl animate-slideInRight"
          >
            <div className="p-4 border-b">
              <div className="flex items-center space-x-4 mb-4">
                <FiUser size={20} className="text-gray-600 animate-pulse" />
                <span className="font-medium">Hello, Sign In</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/account"
                  className="px-4 py-2 bg-gray-100 rounded-lg text-center font-medium text-gray-700 hover:bg-purple-100 transition-all duration-300 hover:scale-105 hover:shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
                <Link
                  to="/orders"
                  className="px-4 py-2 bg-gray-100 rounded-lg text-center font-medium text-gray-700 hover:bg-purple-100 transition-all duration-300 hover:scale-105 hover:shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </Link>
              </div>
            </div>

            <div className="p-4 border-b">
              <h3 className="font-bold text-lg mb-3 animate-fadeIn">Shop by Department</h3>
              {categories.map((category, index) => (
                <div key={index} className="mb-2">
                  <button
                    className={`flex items-center justify-between w-full py-3 px-2 ${activeCategory === index ? 'bg-purple-50' : 'bg-white'} rounded-lg transition-all duration-300 hover:bg-purple-100`}
                    onClick={() => setActiveCategory(activeCategory === index ? null : index)}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <FiChevronDown 
                      size={18} 
                      className={`transition-transform duration-300 ${activeCategory === index ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  {activeCategory === index && (
                    <div className="pl-10 mt-1 space-y-2 animate-fadeInDown">
                      {category.subcategories.map((subcat, subIndex) => (
                        <Link
                          key={subIndex}
                          to={`/category/${category.name.toLowerCase()}/${subcat.toLowerCase()}`}
                          className="block py-2 px-3 hover:bg-purple-50 rounded-lg transition-all duration-300 hover:pl-5 hover:font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subcat}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg mb-3 animate-fadeIn">Help & Settings</h3>
              <Link
                to="/contact"
                className="block py-2 px-2 hover:bg-purple-50 rounded-lg transition-all duration-300 hover:pl-4 hover:font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Customer Service
              </Link>
              <Link
                to="/about"
                className="block py-2 px-2 hover:bg-purple-50 rounded-lg transition-all duration-300 hover:pl-4 hover:font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Add these animations to your global CSS */}
     <style jsx="true" global="true">{`
  @keyframes wiggle {
    0%, 100% { transform: rotate(-3deg); }
    50% { transform: rotate(3deg); }
  }
  @keyframes bounce-in {
    0% { transform: scale(0.5); opacity: 0; }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes ping-once {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.3); opacity: 0.7; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .animate-wiggle { animation: wiggle 0.5s ease-in-out; }
  .animate-bounce-in { animation: bounce-in 0.3s ease-out; }
  .animate-ping-once { animation: ping-once 0.5s ease-out; }
  .animate-fadeInDown { animation: fadeInDown 0.3s ease-out; }
  .animate-slideInRight { animation: slideInRight 0.3s ease-out; }
`}</style>
    </header>
  );
};

export default Header;