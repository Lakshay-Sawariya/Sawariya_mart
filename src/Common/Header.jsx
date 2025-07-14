// Header.jsx
import React, { useState, useEffect } from 'react';
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

const ShopEaseHeader = () => {
  const [cartItems, setCartItems] = useState(5);
  const [wishlistItems, setWishlistItems] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories = [
    { name: "Electronics", subcategories: ["Phones", "Laptops", "Cameras", "Accessories"], color: "text-purple-600" },
    { name: "Fashion", subcategories: ["Men", "Women", "Kids", "Accessories"], color: "text-purple-600" },
    { name: "Home & Kitchen", subcategories: ["Furniture", "Appliances", "Cookware"], color: "text-purple-600" },
    { name: "Beauty", subcategories: ["Skincare", "Makeup", "Haircare"], color: "text-purple-600" },
    { name: "Sports", subcategories: ["Fitness", "Outdoor", "Team Sports"], color: "text-purple-600" },
    { name: "Books", subcategories: ["Fiction", "Non-Fiction", "Educational"], color: "text-purple-600" }
  ];

  const popularSearches = [
    "iPhone 15 Pro", "MacBook Air M2",
    "Wireless Earbuds", "Smart Watch",
    "4K TV", "Yoga Mat", "Air Fryer"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg bg-white/95 backdrop-blur-sm' : 'bg-white'}`}>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm py-2 px-4 text-center">
        <div className="container mx-auto">
          🎉 Summer Sale: Up to 50% off • Free shipping on orders over ₹4000 •
          <a href="#" className="ml-2 font-semibold underline hover:text-yellow-300 transition-colors">Shop Now</a>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              className="text-gray-700 p-2 rounded-md hover:bg-purple-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <FiMenu size={24} />
            </button>
          </div>

          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform shadow-md">
              <FiShoppingCart size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800 hidden sm:block">
              Sawariya<span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Mart</span>
            </span>
          </a>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-6 relative">
            <div className="relative w-full group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Search for products, brands..."
                className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12 shadow-sm hover:border-purple-300"
              />
              {searchQuery && (
                <button
                  className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <FiX size={18} />
                </button>
              )}
              <button
                className="absolute right-0 top-0 h-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 rounded-r-xl hover:opacity-90 transition-opacity flex items-center shadow-md"
                aria-label="Search"
              >
                <FiSearch size={18} />
              </button>
            </div>

            {/* Search Suggestions */}
            {(searchQuery && isSearchFocused) && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-2xl rounded-xl z-50 border border-gray-200 animate-fadeIn overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs mr-2">Trending</span>
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((item, index) => (
                      <button
                        key={index}
                        className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 rounded-lg text-sm transition-all shadow-sm border border-purple-100"
                        onClick={() => setSearchQuery(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs mr-2">Categories</span>
                    Shop by Department
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        className={`px-3 py-2 bg-gradient-to-r from-gray-50 to-blue-50 hover:from-gray-100 hover:to-blue-100 rounded-lg text-sm text-left transition-all shadow-sm border border-blue-100 flex items-center ${category.color}`}
                        onClick={() => setSearchQuery(category.name)}
                      >
                        <span className="font-medium">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-6">
            <button className="hidden md:flex items-center text-gray-700 hover:text-purple-600 transition-colors group">
              <div className="p-2 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-full group-hover:from-purple-100 group-hover:to-indigo-100 transition-all mr-2">
                <FiUser size={20} />
              </div>
              <span className="text-sm font-medium">Account</span>
            </button>

            <button className="hidden md:flex items-center text-gray-700 hover:text-pink-600 transition-colors group relative">
              <div className="p-2 bg-gradient-to-r from-pink-50 to-rose-50 rounded-full group-hover:from-pink-100 group-hover:to-rose-100 transition-all mr-2">
                <FiHeart size={20} />
              </div>
              <span className="text-sm font-medium">Wishlist</span>
              {wishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                  {wishlistItems}
                </span>
              )}
            </button>

            <button className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors group relative">
              <div className="p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full group-hover:from-blue-100 group-hover:to-indigo-100 transition-all mr-2">
                <FiShoppingCart size={20} />
              </div>
              <span className="text-sm font-medium hidden md:inline">Cart</span>
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                  {cartItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mb-3 relative">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full py-2.5 px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12 shadow-sm hover:border-purple-300"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 p-2 bg-purple-50 rounded-full">
              <FiSearch size={18} />
            </button>
          </div>
        </div>

        {/* Desktop Categories */}
        <nav className="hidden md:flex justify-center space-x-1 py-2">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setActiveCategory(index)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <button className={`px-4 py-3 ${category.color} hover:text-white font-medium text-sm flex items-center transition-all group-hover:bg-gradient-to-r ${ 'from-indigo-600 to-purple-600'} rounded-lg shadow-sm group-hover:shadow-md`}>
                {category.name}
                <FiChevronDown size={16} className="ml-1 opacity-70 group-hover:rotate-180 transition-transform group-hover:text-white" />
              </button>

              {activeCategory === index && (
                <div className="absolute left-0 w-56 bg-white shadow-2xl rounded-b-lg z-50 animate-fadeIn border border-gray-200 overflow-hidden">
                  <div className="py-2">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 transition-colors"
                    >
                      All {category.name}
                    </a>
                    {category.subcategories.map((sub, i) => (
                      <a
                        key={i}
                        href="#"
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors flex items-center justify-between border-b border-gray-100 last:border-0"
                      >
                        {sub}
                        <FiChevronRight size={14} className="text-gray-400 group-hover:text-purple-600" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white py-2 border-t animate-slideDown mobile-menu-container ${!isMenuOpen ? 'hidden' : ''} shadow-xl rounded-b-xl`}>
          <nav className="flex flex-col">
            <div className="px-4 py-3 border-b bg-gradient-to-r from-indigo-600 to-purple-600">
              <a href="#" className="py-2 text-white font-medium flex items-center">
                <FiUser size={18} className="mr-3" /> My Account
              </a>
            </div>

            {categories.map((category, index) => (
              <div key={index} className="border-b">
                <button
                  className={`w-full px-4 py-3 ${category.color} hover:bg-purple-50 flex justify-between items-center font-medium`}
                  onClick={() => setActiveCategory(activeCategory === index ? null : index)}
                >
                  {category.name}
                  <FiChevronDown
                    size={18}
                    className={`transition-transform ${activeCategory === index ? 'rotate-180' : ''}`}
                  />
                </button>

                {activeCategory === index && (
                  <div className="pl-6 pb-2 bg-gradient-to-r from-purple-50 to-indigo-50">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm font-medium text-purple-800"
                    >
                      All {category.name}
                    </a>
                    {category.subcategories.map((sub, i) => (
                      <a
                        key={i}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-purple-600 hover:font-medium"
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="px-4 py-3 border-t bg-gray-50 flex justify-between">
              <a href="#" className="text-pink-600 font-medium flex items-center">
                <FiHeart size={18} className="mr-2" /> Wishlist
                {wishlistItems > 0 && (
                  <span className="ml-2 bg-pink-600 text-white text-xs rounded-full px-2 py-0.5 shadow-sm">
                    {wishlistItems}
                  </span>
                )}
              </a>
              <a href="#" className="text-indigo-600 font-medium flex items-center">
                <FiShoppingCart size={18} className="mr-2" /> Cart
                {cartItems > 0 && (
                  <span className="ml-2 bg-indigo-600 text-white text-xs rounded-full px-2 py-0.5 shadow-sm">
                    {cartItems}
                  </span>
                )}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default ShopEaseHeader;