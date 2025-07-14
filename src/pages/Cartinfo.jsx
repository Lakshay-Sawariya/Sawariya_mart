import React, { useState, useEffect } from 'react';
import { FiTrash2, FiHeart, FiShoppingCart, FiChevronDown } from 'react-icons/fi';
import { BsCheckCircleFill, BsShieldFillCheck } from 'react-icons/bs';
import { RiCoupon2Line } from 'react-icons/ri';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { Link, useLocation } from 'react-router-dom';

export default function CartInfo() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedItems, setSavedItems] = useState([]);
  const [clickedSaveButton, setClickedSaveButton] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function fetchCartItems() {
      try {
        // Get product ID from URL or location state
        const productId = new URLSearchParams(location.search).get('id') || 
                          (location.state && location.state.productId);
        
        if (!productId) {
          setLoading(false);
          return;
        }

        // Fetch only the specific product
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json();
        
        // Enhance the single item with cart-specific properties
        const enhancedItem = {
          ...data,
          quantity: 1, // Default quantity to 1
          originalPrice: Math.round(data.price * 1.2),
          delivery: 'Delivery by Tomorrow, Free',
          seller: 'SuperCom Retail',
          sellerRating: 4.2
        };
        
        setCartItems([enhancedItem]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      }
    }

    fetchCartItems();
  }, [location]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const saveForLater = (id) => {
    const itemToSave = cartItems.find(item => item.id === id);
    setSavedItems([...savedItems, itemToSave]);
    removeItem(id);
    setClickedSaveButton(id);
    setTimeout(() => setClickedSaveButton(null), 1000); // Reset after animation
  };

  const moveToCart = (id) => {
    const itemToMove = savedItems.find(item => item.id === id);
    setCartItems([...cartItems, { ...itemToMove, quantity: 1 }]);
    setSavedItems(savedItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDiscount = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const deliveryFee = subtotal > 499 ? 0 : 40;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow">
        <div className="container mx-auto p-4 md:p-8">
          <h1 className="text-2xl font-bold mb-6">
            My Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </h1>
          
          {loading ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
                <div className="h-64 bg-gray-100 rounded mt-6"></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Section - Cart Items */}
              <div className="lg:w-2/3">
                {/* Cart Items */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-10">
                      <FiShoppingCart className="mx-auto text-4xl text-gray-300 mb-3" />
                      <p className="text-lg">Your cart is empty!</p>
                      <Link to="../Main">
                        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                          Shop Now
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <>
                      {cartItems.map(item => (
                        <div key={item.id} className="flex flex-col sm:flex-row border-b py-4 last:border-b-0">
                          <div className="sm:w-1/4 flex justify-center">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="h-32 object-contain"
                            />
                          </div>
                          <div className="sm:w-3/4 mt-4 sm:mt-0 sm:pl-4">
                            <h3 className="font-medium text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">Seller: {item.seller}</p>
                            <div className="flex items-center mt-2">
                              <span className="text-lg font-bold">₹{(item.price * 80).toLocaleString()}</span>
                              <span className="text-sm text-gray-500 line-through ml-2">₹{(item.originalPrice * 80).toLocaleString()}</span>
                              <span className="text-xs text-green-600 ml-2">{Math.round((item.originalPrice - item.price)/item.originalPrice*100)}% off</span>
                            </div>
                            <p className="text-xs text-green-600 mt-1">{item.delivery}</p>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border rounded-md">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-3 py-1 text-lg"
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="px-3">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-3 py-1 text-lg"
                                >
                                  +
                                </button>
                              </div>
                              
                              <div className="flex space-x-4">
                                <button 
                                  onClick={() => removeItem(item.id)}
                                  className="flex items-center text-sm text-gray-500 hover:text-red-500"
                                >
                                  <FiTrash2 className="mr-1" /> Remove
                                </button>
                                <button 
                                  onClick={() => saveForLater(item.id)}
                                  className={`flex items-center text-sm text-gray-500 hover:text-blue-500 transition-all duration-300 ${
                                    clickedSaveButton === item.id ? 'transform scale-110 text-blue-600' : ''
                                  }`}
                                >
                                  <FiHeart 
                                    className={`mr-1 transition-all duration-300 ${
                                      clickedSaveButton === item.id ? 'fill-current text-blue-600' : ''
                                    }`}
                                  /> 
                                  Save for later
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {/* Saved Items Section */}
                {savedItems.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-medium text-gray-900 mb-4">
                      Saved For Later ({savedItems.length} {savedItems.length === 1 ? 'item' : 'items'})
                    </h3>
                    {savedItems.map(item => (
                      <div key={item.id} className="flex flex-col sm:flex-row border-b py-4 last:border-b-0">
                        <div className="sm:w-1/4 flex justify-center">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="h-32 object-contain"
                          />
                        </div>
                        <div className="sm:w-3/4 mt-4 sm:mt-0 sm:pl-4">
                          <h3 className="font-medium text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">Seller: {item.seller}</p>
                          <div className="flex items-center mt-2">
                            <span className="text-lg font-bold">₹{(item.price * 80).toLocaleString()}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">₹{(item.originalPrice * 80).toLocaleString()}</span>
                            <span className="text-xs text-green-600 ml-2">{Math.round((item.originalPrice - item.price)/item.originalPrice*100)}% off</span>
                          </div>
                          
                          <div className="flex space-x-4 mt-4">
                            <button 
                              onClick={() => moveToCart(item.id)}
                              className="flex items-center text-sm text-blue-500 hover:text-blue-700"
                            >
                              <FiShoppingCart className="mr-1" /> Move to cart
                            </button>
                            <button 
                              onClick={() => setSavedItems(savedItems.filter(i => i.id !== item.id))}
                              className="flex items-center text-sm text-gray-500 hover:text-red-500"
                            >
                              <FiTrash2 className="mr-1" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Section - Price Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
                  <h3 className="font-medium text-gray-900 mb-4">PRICE DETAILS</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Price ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
                      <span>₹{(subtotal * 80).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span className="text-green-600">-₹{(totalDiscount * 80).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Charges</span>
                      <span>{deliveryFee === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}</span>
                    </div>
                    
                    <div className="border-t pt-3 mt-2 flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span>₹{((subtotal*80 + deliveryFee-totalDiscount*80)).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <button 
                    className={`w-full mt-6 py-3 rounded-md font-medium ${cartItems.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500'}`}
                    disabled={cartItems.length === 0}
                  >
                    PLACE ORDER
                  </button>
                  
                  <div className="mt-4 flex items-center justify-center">
                    <BsShieldFillCheck className="text-blue-600 mr-2" size={20} />
                    <span className="text-xs text-gray-500">Safe and Secure Payments</span>
                  </div>
                </div>
                
                {/* Coupon Section */}
                <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Available Offers</span>
                    <FiChevronDown className="text-gray-500" />
                  </div>
                  <div className="mt-3 space-y-3">
                    <div className="flex">
                      <RiCoupon2Line className="text-green-600 mt-1 mr-2" />
                      <div className="text-sm">
                        <span className="font-medium">Bank Offer</span> 5% Cashback on Axis Bank Card
                      </div>
                    </div>
                    <div className="flex">
                      <RiCoupon2Line className="text-green-600 mt-1 mr-2" />
                      <div className="text-sm">
                        <span className="font-medium">Special Offer</span> Get extra ₹100 off
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}