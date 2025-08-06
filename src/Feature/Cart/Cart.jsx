import React, { useState, useEffect } from 'react';
import { FiTrash2, FiHeart, FiShoppingCart, FiChevronDown } from 'react-icons/fi';
import { BsCheckCircleFill, BsShieldFillCheck, BsArrowLeft } from 'react-icons/bs';
import { RiCoupon2Line } from 'react-icons/ri';
import Header from '../../Common/Header';
import Footer from '../../Common/Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Helper functions for localStorage
const getLocalStorageCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : { cartItems: [], savedItems: [] };
};

const setLocalStorageCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export default function Cart() {
  const [cartData, setCartData] = useState(getLocalStorageCart());
  const [loading, setLoading] = useState(true);
  const [clickedSaveButton, setClickedSaveButton] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems, savedItems } = cartData;

  useEffect(() => {
    // Initialize with sample data if cart is empty (for demo purposes)
    if (cartItems.length === 0 && savedItems.length === 0) {
      if (location.state?.productId) {
        addToCart(location.state.productId);
      } else {
        fetchSampleCartItems();
      }
    } else {
      setLoading(false);
    }
  }, []);

  // Update localStorage whenever cartData changes
  useEffect(() => {
    setLocalStorageCart(cartData);
  }, [cartData]);

  async function fetchSampleCartItems() {
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=3');
      const data = await response.json();
      
      const enhancedItems = data.map(item => ({
        ...item,
        quantity: 1,
        originalPrice: Math.round(item.price * 1.2),
        delivery: 'Delivery by Tomorrow, Free',
        seller: 'SuperCom Retail',
        sellerRating: 4.2,
        selectedSize: 'M',
        selectedColor: 'Black'
      }));
      
      setCartData(prev => ({
        ...prev,
        cartItems: enhancedItems
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sample cart items:", error);
      setLoading(false);
    }
  }

  async function addToCart(productId) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const product = await response.json();
      
      const existingItem = cartItems.find(item => item.id === product.id);
      
      if (existingItem) {
        setCartData(prev => ({
          ...prev,
          cartItems: prev.cartItems.map(item => 
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        }));
        toast.info(`${product.title} quantity increased in cart!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        const enhancedItem = {
          ...product,
          quantity: 1,
          originalPrice: Math.round(product.price * 1.2),
          delivery: 'Delivery by Tomorrow, Free',
          seller: 'SuperCom Retail',
          sellerRating: 4.2,
          selectedSize: 'M',
          selectedColor: 'Black'
        };
        
        setCartData(prev => ({
          ...prev,
          cartItems: [...prev.cartItems, enhancedItem]
        }));
        toast.success(`${product.title} added to cart!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setLoading(false);
      toast.error("Failed to add product to cart");
    }
  }

  const removeItem = (id) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    setCartData(prev => ({
      ...prev,
      cartItems: prev.cartItems.filter(item => item.id !== id)
    }));
    toast.error(`${itemToRemove.title} removed from cart`);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartData(prev => ({
      ...prev,
      cartItems: prev.cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    }));
  };

  const saveForLater = (id) => {
    const itemToSave = cartItems.find(item => item.id === id);
    setCartData(prev => ({
      cartItems: prev.cartItems.filter(item => item.id !== id),
      savedItems: [...prev.savedItems, itemToSave]
    }));
    setClickedSaveButton(id);
    setTimeout(() => setClickedSaveButton(null), 1000);
    toast.info(`${itemToSave.title} saved for later`);
  };

  const moveToCart = (id) => {
    const itemToMove = savedItems.find(item => item.id === id);
    setCartData(prev => ({
      cartItems: [...prev.cartItems, { ...itemToMove, quantity: 1 }],
      savedItems: prev.savedItems.filter(item => item.id !== id)
    }));
    toast.success(`${itemToMove.title} moved to cart`);
  };

  const removeSavedItem = (id) => {
    const itemToRemove = savedItems.find(item => item.id === id);
    setCartData(prev => ({
      ...prev,
      savedItems: prev.savedItems.filter(item => item.id !== id)
    }));
    toast.error(`${itemToRemove.title} removed from saved items`);
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) return;
    
    // Simulate coupon validation
    const validCoupons = {
      'WELCOME10': { discount: 0.1, name: '10% off' },
      'FREESHIP': { discount: 0, name: 'Free Shipping', freeShipping: true },
      'SUMMER20': { discount: 0.2, name: 'Summer Special 20% off' }
    };
    
    if (validCoupons[couponCode.toUpperCase()]) {
      setAppliedCoupon(validCoupons[couponCode.toUpperCase()]);
      toast.success(`Coupon applied successfully!`);
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast.info('Coupon removed');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const productDiscount = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const couponDiscount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;
  const totalDiscount = productDiscount + couponDiscount;
  const deliveryFee = (subtotal > 499 || (appliedCoupon && appliedCoupon.freeShipping)) ? 0 : 40;
  const totalAmount = (subtotal - couponDiscount) * 80 + deliveryFee;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <ToastContainer />
      
      <div className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-6">
          {/* Breadcrumb and Title */}
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
            >
              <BsArrowLeft className="mr-1" /> Back
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              My Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
            </h1>
          </div>
          
          {loading ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
                <div className="h-64 bg-gray-100 rounded-lg"></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Section - Cart Items */}
              <div className="lg:w-2/3 space-y-6">
                {/* Cart Items */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <FiShoppingCart className="mx-auto text-5xl text-gray-300 mb-4" />
                      <p className="text-lg text-gray-600 mb-2">Your cart is empty!</p>
                      <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
                      <Link to="/">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                          Continue Shopping
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="p-4 border-b">
                        <h2 className="font-semibold text-gray-800">Cart Items</h2>
                      </div>
                      {cartItems.map(item => (
                        <div key={item.id} className="flex flex-col sm:flex-row p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-150">
                          <div className="sm:w-1/4 flex justify-center p-2">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="h-40 w-full object-contain"
                            />
                          </div>
                          <div className="sm:w-3/4 mt-4 sm:mt-0 sm:pl-4">
                            <div className="flex justify-between">
                              <h3 className="font-medium text-gray-900 line-clamp-2">{item.title}</h3>
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="text-gray-400 hover:text-red-500 ml-2"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Seller: {item.seller} • ⭐{item.sellerRating}</p>
                            <div className="flex items-center mt-2">
                              <span className="text-lg font-bold text-gray-900">₹{(item.price * 80).toLocaleString()}</span>
                              <span className="text-sm text-gray-500 line-through ml-2">₹{(item.originalPrice * 80).toLocaleString()}</span>
                              <span className="text-xs font-medium bg-green-100 text-green-800 ml-2 px-1.5 py-0.5 rounded">
                                {Math.round((item.originalPrice - item.price)/item.originalPrice*100)}% off
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                              <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                                Color: <span className="font-medium">{item.selectedColor}</span>
                              </div>
                              <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                                Size: <span className="font-medium">{item.selectedSize}</span>
                              </div>
                            </div>
                            <p className="text-xs text-green-600 mt-2 flex items-center">
                              <BsCheckCircleFill className="mr-1" /> {item.delivery}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-3">
                              <div className="flex items-center border rounded-lg w-fit">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                                  disabled={item.quantity <= 1}
                                >
                                  −
                                </button>
                                <span className="px-3 text-gray-800">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100"
                                >
                                  +
                                </button>
                              </div>
                              
                              <div className="flex space-x-4">
                                <button 
                                  onClick={() => saveForLater(item.id)}
                                  className={`flex items-center text-sm px-3 py-1.5 rounded-lg transition-all duration-200 ${
                                    clickedSaveButton === item.id 
                                      ? 'bg-blue-100 text-blue-700' 
                                      : 'text-gray-600 hover:bg-gray-100'
                                  }`}
                                >
                                  <FiHeart className="mr-1.5" /> 
                                  {clickedSaveButton === item.id ? 'Saved!' : 'Save for later'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {/* Saved Items */}
                {savedItems.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b">
                      <h2 className="font-semibold text-gray-800">Saved for later ({savedItems.length})</h2>
                    </div>
                    {savedItems.map(item => (
                      <div key={item.id} className="flex flex-col sm:flex-row p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-150">
                        <div className="sm:w-1/4 flex justify-center p-2">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="h-32 w-full object-contain"
                          />
                        </div>
                        <div className="sm:w-3/4 mt-4 sm:mt-0 sm:pl-4">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-gray-900 line-clamp-2">{item.title}</h3>
                            <button 
                              onClick={() => removeSavedItem(item.id)}
                              className="text-gray-400 hover:text-red-500 ml-2"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                          <div className="flex items-center mt-2">
                            <span className="text-lg font-bold text-gray-900">₹{(item.price * 80).toLocaleString()}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">₹{(item.originalPrice * 80).toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-green-600 mt-2 flex items-center">
                            <BsCheckCircleFill className="mr-1" /> {item.delivery}
                          </p>
                          
                          <div className="flex space-x-3 mt-4">
                            <button 
                              onClick={() => moveToCart(item.id)}
                              className="flex items-center text-sm px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                              <FiShoppingCart className="mr-1.5" /> Move to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Section - Price Summary */}
              <div className="lg:w-1/3 space-y-4">
                {/* Price Summary */}
                <div className="bg-white rounded-xl shadow-sm p-5 sticky top-4">
                  <h3 className="font-semibold text-gray-900 text-lg mb-4">Price Details</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                      <span>₹{(subtotal * 80).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Product Discount</span>
                      <span className="text-green-600">-₹{(productDiscount * 80).toLocaleString()}</span>
                    </div>
                    
                    {appliedCoupon && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Coupon Discount ({appliedCoupon.name})</span>
                        <span className="text-green-600">-₹{(couponDiscount * 80).toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Charges</span>
                      <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                      </span>
                    </div>
                    
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-bold text-gray-900">
                        <span>Total Amount</span>
                        <span>₹{totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="text-green-600 text-xs mt-2 py-2 px-3 bg-green-50 rounded-lg">
                      You will save ₹{(totalDiscount * 80).toLocaleString()} on this order
                    </div>
                  </div>
                  
                  <button 
                    className={`w-full py-3 rounded-lg mt-6 font-medium transition-colors duration-200 ${
                      cartItems.length === 0 
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    disabled={cartItems.length === 0}
                  >
                    {cartItems.length === 0 ? 'Your cart is empty' : 'Proceed to Checkout'}
                  </button>
                  
                  <div className="flex items-center mt-4 text-xs text-gray-500">
                    <BsShieldFillCheck className="text-green-500 mr-2 text-base" />
                    <span>Safe and Secure Payments. Easy returns.</span>
                  </div>
                </div>
                
                {/* Coupon Section */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <div className="flex items-center mb-3">
                    <RiCoupon2Line className="text-yellow-500 mr-2 text-lg" />
                    <span className="font-medium text-gray-900">Apply Coupons</span>
                  </div>
                  {appliedCoupon ? (
                    <div className="flex justify-between items-center bg-green-50 rounded-lg p-3">
                      <div>
                        <p className="font-medium text-green-800">{appliedCoupon.name} Applied</p>
                        <p className="text-xs text-green-600">Discount applied successfully</p>
                      </div>
                      <button 
                        onClick={removeCoupon}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex">
                      <input 
                        type="text" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code" 
                        className="flex-grow border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button 
                        onClick={applyCoupon}
                        className="bg-blue-600 text-white px-4 py-2 rounded-r-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Delivery Guarantee */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <div className="flex items-start">
                    <BsCheckCircleFill className="text-green-500 mr-3 mt-0.5 text-lg" />
                    <div>
                      <p className="font-medium text-gray-900">Delivery Guarantee</p>
                      <p className="text-xs text-gray-500 mt-1">
                        If we fail to deliver your products within the promised time, you can claim a refund of the shipping fees.
                      </p>
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