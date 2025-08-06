import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { 
  FiUser, FiMail, FiLock, FiCreditCard, FiShoppingBag, 
  FiSettings, FiLogOut, FiEdit, FiCamera, FiCheck, 
  FiSave, FiX, FiAward, FiHome, FiHeart, FiMapPin, FiBell, FiPhone,
  FiPackage, FiTruck, FiCheckCircle, FiStar, FiDollarSign,
  FiPlus, FiTrash2, FiDownload, FiChevronRight, FiImage, FiUpload
} from 'react-icons/fi';

export const AccountDashboard = () => {
  // Enhanced user data with Lakshay as the name
  const [user, setUser] = useState({
    name: "Lakshay Verma",
    email: "lakshay.verma@example.com",
    phone: "+91 98765 43210",
    membership: "Premium Plus",
    joinDate: "March 2022",
    orders: 18,
    rewardsPoints: 2450,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshay",
    bio: "Tech enthusiast and fashion lover. Always exploring new trends in technology and style. Based in New Delhi, India.",
    addresses: [
      {
        id: 1,
        type: "Home",
        street: "45 Green Park Extension",
        city: "New Delhi",
        state: "Delhi",
        zip: "110016",
        country: "India",
        isDefault: true
      },
      {
        id: 2,
        type: "Work",
        street: "Cyber City, Tower B",
        city: "Gurugram",
        state: "Haryana",
        zip: "122002",
        country: "India",
        isDefault: false
      }
    ],
    paymentMethods: [
      {
        id: 1,
        type: "Visa",
        last4: "4242",
        expiry: "12/25",
        isDefault: true
      },
      {
        id: 2,
        type: "Mastercard",
        last4: "5555",
        expiry: "06/24",
        isDefault: false
      },
      {
        id: 3,
        type: "PayPal",
        email: "lakshay.verma@example.com",
        isDefault: false
      }
    ],
    wishlist: 12,
    notifications: true,
    recentSearches: ["wireless earbuds", "smart watch", "running shoes", "leather backpack"],
    loyaltyTier: "Platinum",
    socialConnections: [
      { provider: "Google", connected: true },
      { provider: "Facebook", connected: false },
      { provider: "Apple", connected: true }
    ]
  });

  const [editData, setEditData] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newAddress, setNewAddress] = useState({
    type: "Home",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    isDefault: false
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: "Visa",
    cardNumber: "",
    name: "Lakshay Verma",
    expiry: "",
    cvv: "",
    isDefault: false
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  // Avatar options with more variety
  const avatarOptions = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshay",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshay1",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshay2",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshay3",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshay4",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshay5",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshay6",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshay7"
  ];

  // Enhanced orders data
  const recentOrders = [
    {
      id: "ORD-12345",
      date: "2023-06-15",
      status: "Delivered",
      items: 3,
      total: 149.99,
      tracking: "SHIP-98765",
      products: [
        { 
          name: "Wireless Headphones Pro", 
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200", 
          price: 99.99,
          quantity: 1,
          status: "Delivered June 18",
          review: true
        },
        { 
          name: "Smart Watch X3", 
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200", 
          price: 199.99,
          quantity: 1,
          status: "Delivered June 18",
          review: false
        },
        { 
          name: "Phone Case", 
          image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200", 
          price: 19.99,
          quantity: 1,
          status: "Delivered June 18",
          review: true
        }
      ]
    },
    {
      id: "ORD-12344",
      date: "2023-06-10",
      status: "Shipped",
      items: 2,
      total: 89.98,
      tracking: "SHIP-54321",
      products: [
        { 
          name: "Premium Cotton T-Shirt", 
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200", 
          price: 29.99,
          quantity: 2,
          status: "Shipped June 12",
          review: false
        }
      ]
    },
    {
      id: "ORD-12343",
      date: "2023-05-28",
      status: "Processing",
      items: 1,
      total: 49.99,
      products: [
        { 
          name: "Wireless Earbuds", 
          image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200", 
          price: 49.99,
          quantity: 1,
          status: "Preparing for shipment",
          review: false
        }
      ]
    }
  ];

  // Wishlist items
  const wishlistItems = [
    {
      id: "WISH-1",
      name: "Genuine Leather Wallet",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200",
      price: 39.99,
      originalPrice: 49.99,
      rating: 4.5,
      reviews: 128,
      inStock: true,
      discount: 20
    },
    {
      id: "WISH-2",
      name: "Premium Bluetooth Speaker",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200",
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.2,
      reviews: 56,
      inStock: true,
      discount: 25
    },
    {
      id: "WISH-3",
      name: "Advanced Fitness Tracker",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.7,
      reviews: 342,
      inStock: false,
      discount: 20
    },
    {
      id: "WISH-4",
      name: "Minimalist Backpack",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200",
      price: 59.99,
      originalPrice: 79.99,
      rating: 4.3,
      reviews: 87,
      inStock: true,
      discount: 25
    }
  ];

  // Recently viewed items
  const recentlyViewed = [
    {
      id: "VIEW-1",
      name: "Wireless Charging Pad",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200",
      price: 29.99,
      rating: 4.1,
      reviews: 42
    },
    {
      id: "VIEW-2",
      name: "Smart Light Bulb",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?w=200",
      price: 19.99,
      rating: 4.3,
      reviews: 156
    },
    {
      id: "VIEW-3",
      name: "Ergonomic Mouse",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=200",
      price: 34.99,
      rating: 4.6,
      reviews: 89
    },
    {
      id: "VIEW-4",
      name: "Mechanical Keyboard",
      image: "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=200",
      price: 99.99,
      rating: 4.8,
      reviews: 213
    }
  ];

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSelect = (avatarUrl) => {
    setEditData({ ...editData, avatar: avatarUrl });
    setUploadedImage(null);
    setShowAvatarModal(false);
  };

  const handleUseUploadedImage = () => {
    if (uploadedImage) {
      setEditData({ ...editData, avatar: uploadedImage });
      setShowAvatarModal(false);
    }
  };

  const handleEdit = () => {
    setEditData({ ...user });
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUploadedImage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPaymentMethod({
      ...newPaymentMethod,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const addNewAddress = () => {
    const updatedAddresses = [...user.addresses, { ...newAddress, id: user.addresses.length + 1 }];
    setUser({ ...user, addresses: updatedAddresses });
    setNewAddress({
      type: "Home",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "India",
      isDefault: false
    });
    setShowAddressForm(false);
  };

  const addNewPaymentMethod = () => {
    const updatedPayments = [...user.paymentMethods, { 
      ...newPaymentMethod, 
      id: user.paymentMethods.length + 1,
      last4: newPaymentMethod.cardNumber.slice(-4)
    }];
    setUser({ ...user, paymentMethods: updatedPayments });
    setNewPaymentMethod({
      type: "Visa",
      cardNumber: "",
      name: "Lakshay Verma",
      expiry: "",
      cvv: "",
      isDefault: false
    });
    setShowPaymentForm(false);
  };

  const setDefaultAddress = (id) => {
    const updatedAddresses = user.addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    setUser({ ...user, addresses: updatedAddresses });
  };

  const setDefaultPayment = (id) => {
    const updatedPayments = user.paymentMethods.map(payment => ({
      ...payment,
      isDefault: payment.id === id
    }));
    setUser({ ...user, paymentMethods: updatedPayments });
  };

  const removeAddress = (id) => {
    const updatedAddresses = user.addresses.filter(addr => addr.id !== id);
    setUser({ ...user, addresses: updatedAddresses });
  };

  const removePayment = (id) => {
    const updatedPayments = user.paymentMethods.filter(payment => payment.id !== id);
    setUser({ ...user, paymentMethods: updatedPayments });
  };

  const toggleSocialConnection = (provider) => {
    const updatedConnections = user.socialConnections.map(conn => 
      conn.provider === provider ? { ...conn, connected: !conn.connected } : conn
    );
    setUser({ ...user, socialConnections: updatedConnections });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-md overflow-hidden p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome back, Lakshay!</h2>
                  <p className="opacity-90">You have {user.rewardsPoints} reward points. Keep shopping to earn more!</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full mr-3">
                    <FiAward className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Loyalty Tier</p>
                    <p className="font-semibold">{user.loyaltyTier} Member</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <FiShoppingBag className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-2xl font-semibold text-gray-800">{user.orders}</p>
                  </div>
                </div>
                <Link to="/account/orders" className="mt-3 inline-block text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  View all orders →
                </Link>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <FiHeart className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Wishlist Items</p>
                    <p className="text-2xl font-semibold text-gray-800">{user.wishlist}</p>
                  </div>
                </div>
                <Link to="/account/wishlist" className="mt-3 inline-block text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  View wishlist →
                </Link>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-amber-100 p-3 rounded-lg mr-4">
                    <FiAward className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Reward Points</p>
                    <p className="text-2xl font-semibold text-gray-800">{user.rewardsPoints}</p>
                  </div>
                </div>
                <Link to="/rewards" className="mt-3 inline-block text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  Redeem points →
                </Link>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
                <Link to="/account/orders" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="divide-y divide-gray-100">
                {recentOrders.slice(0, 2).map(order => (
                  <div key={order.id} className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-3 md:mb-0">
                        <h4 className="font-medium text-gray-800">Order #{order.id}</h4>
                        <p className="text-gray-500 text-sm">Placed on {new Date(order.date).toLocaleDateString('en-US', { 
                          year: 'numeric', month: 'short', day: 'numeric' 
                        })}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status}
                        </span>
                        <p className="text-gray-600 text-sm">Total: <span className="font-medium">${order.total.toFixed(2)}</span></p>
                        <Link 
                          to={`/account/orders/${order.id}`}
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium whitespace-nowrap"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recently Viewed */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Recently Viewed</h3>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {recentlyViewed.map(item => (
                    <div key={item.id} className="group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 relative">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                          <FiHeart className="text-gray-600" />
                        </button>
                      </div>
                      <h4 className="font-medium text-gray-800 truncate">{item.name}</h4>
                      <div className="flex items-center mt-1">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <FiStar 
                              key={i} 
                              className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'fill-current' : ''}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">({item.reviews})</span>
                      </div>
                      <p className="text-gray-800 font-medium mt-1">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
            {isEditing ? (
              <div>
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleCancel}
                      className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FiX className="mr-2" /> Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                    >
                      <FiSave className="mr-2" /> Save Changes
                    </button>
                  </div>
                </div>

                <div className="p-5 space-y-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-3">
                      <img 
                        src={editData.avatar} 
                        alt="User profile" 
                        className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100"
                      />
                      <button 
                        onClick={() => setShowAvatarModal(true)}
                        className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-50"
                      >
                        <FiCamera className="text-indigo-600" />
                      </button>
                    </div>
                    <button 
                      onClick={() => setShowAvatarModal(true)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      Change Avatar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={editData.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={editData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={editData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Membership
                      </label>
                      <div className="relative">
                        <FiAward className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                          name="membership"
                          value={editData.membership}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                        >
                          <option value="Basic">Basic</option>
                          <option value="Premium">Premium</option>
                          <option value="Premium Plus">Premium Plus</option>
                          <option value="Platinum">Platinum</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      About You
                    </label>
                    <textarea
                      name="bio"
                      value={editData.bio}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      placeholder="Tell us a little about yourself..."
                    ></textarea>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Social Connections</h3>
                    <div className="space-y-2">
                      {user.socialConnections.map(connection => (
                        <div key={connection.provider} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                              connection.provider === 'Google' ? 'bg-red-100' :
                              connection.provider === 'Facebook' ? 'bg-blue-100' :
                              'bg-gray-100'
                            }`}>
                              {connection.provider === 'Google' ? (
                                <span className="text-red-600">G</span>
                              ) : connection.provider === 'Facebook' ? (
                                <span className="text-blue-600">f</span>
                              ) : (
                                <span className="text-gray-600">A</span>
                              )}
                            </div>
                            <span>{connection.provider}</span>
                          </div>
                          <button
                            onClick={() => toggleSocialConnection(connection.provider)}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              connection.connected ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'
                            }`}
                          >
                            {connection.connected ? 'Connected' : 'Connect'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                  <button
                    onClick={handleEdit}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                  >
                    <FiEdit className="mr-2" /> Edit Profile
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex flex-col items-center mb-8">
                    <img 
                      src={user.avatar} 
                      alt="User profile" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 mb-3"
                    />
                    <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                    <span className="mt-2 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
                      {user.membership} Member
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">CONTACT INFORMATION</h4>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <FiMail className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                            <div>
                              <p className="text-gray-800">{user.email}</p>
                              <p className="text-gray-500 text-sm">Email Address</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <FiPhone className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                            <div>
                              <p className="text-gray-800">{user.phone}</p>
                              <p className="text-gray-500 text-sm">Phone Number</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">MEMBERSHIP</h4>
                        <div className="flex items-start">
                          <FiAward className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="text-gray-800">{user.membership} Member since {user.joinDate}</p>
                            <p className="text-gray-500 text-sm">Loyalty Program</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">SOCIAL CONNECTIONS</h4>
                        <div className="flex flex-wrap gap-2">
                          {user.socialConnections.map(connection => (
                            <span key={connection.provider} className={`px-3 py-1 rounded-full text-xs font-medium ${
                              connection.connected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {connection.provider} {connection.connected ? '✓' : '✗'}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">ABOUT</h4>
                      <p className="text-gray-800 mb-4">{user.bio}</p>
                      
                      <h4 className="text-sm font-medium text-gray-500 mb-2">RECENT SEARCHES</h4>
                      <div className="flex flex-wrap gap-2">
                        {user.recentSearches.map((search, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            {search}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'orders':
        return (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Order History</h2>
              <p className="text-gray-500 text-sm mt-1">View and manage your recent orders</p>
            </div>
            
            {recentOrders.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {recentOrders.map(order => (
                  <div key={order.id} className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-gray-800">Order #{order.id}</h3>
                        <p className="text-gray-500 text-sm">Placed on {new Date(order.date).toLocaleDateString('en-US', { 
                          year: 'numeric', month: 'short', day: 'numeric' 
                        })}</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      {order.products.map((product, idx) => (
                        <div key={idx} className="flex items-start py-3">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-16 h-16 object-cover rounded-md border border-gray-200 mr-4"
                          />
                          <div className="flex-grow">
                            <h4 className="font-medium text-gray-800">{product.name}</h4>
                            <p className="text-gray-500 text-sm">Qty: {product.quantity}</p>
                            <p className="text-gray-500 text-sm">{product.status}</p>
                            {order.status === 'Delivered' && !product.review && (
                              <button className="mt-1 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                Write a Review
                              </button>
                            )}
                          </div>
                          <div className="text-gray-800 font-medium">${product.price.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                    
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-gray-100 pt-4">
                      <div className="mb-2 sm:mb-0">
                        {order.tracking && (
                          <div className="flex items-center text-sm text-gray-600">
                            <FiTruck className="mr-2" />
                            <span>Tracking: {order.tracking}</span>
                            <button className="ml-2 text-indigo-600 hover:text-indigo-800 font-medium">
                              Track Package
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                          <FiDownload className="inline mr-2" />
                          Invoice
                        </button>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm shadow-sm">
                          <FiShoppingBag className="inline mr-2" />
                          Buy Again
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FiPackage className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">No Orders Yet</h3>
                <p className="text-gray-500 mb-6">You haven't placed any orders with us yet.</p>
                <Link
                  to="/products"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md inline-block"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        );
      case 'wishlist':
        return (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Your Wishlist</h2>
                <p className="text-gray-500 text-sm mt-1">{wishlistItems.length} items</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                  <FiDownload className="inline mr-2" />
                  Share
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                  <FiTrash2 className="inline mr-2" />
                  Clear All
                </button>
              </div>
            </div>
            
            {wishlistItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-5">
                {wishlistItems.map(item => (
                  <div key={item.id} className="group relative">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3 relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      {!item.inStock && (
                        <span className="absolute top-2 left-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          Out of Stock
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex justify-between items-center">
                          <button className="text-white hover:text-indigo-300">
                            <FiShoppingBag />
                          </button>
                          <button className="text-white hover:text-red-300">
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-medium text-gray-800 mb-1">{item.name}</h3>
                    <div className="flex items-center mb-1">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i} 
                            className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'fill-current' : ''}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">({item.reviews})</span>
                    </div>
                    <div className="flex items-center">
                      <p className="text-gray-800 font-medium">${item.price.toFixed(2)}</p>
                      {item.originalPrice && (
                        <p className="text-gray-400 text-sm line-through ml-2">${item.originalPrice.toFixed(2)}</p>
                      )}
                      {item.discount && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                          -{item.discount}%
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FiHeart className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">Your Wishlist is Empty</h3>
                <p className="text-gray-500 mb-6">Save items you love to buy them later</p>
                <Link
                  to="/products"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md inline-block"
                >
                  Browse Products
                </Link>
              </div>
            )}
          </div>
        );
      case 'addresses':
        return (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Saved Addresses</h2>
                <p className="text-gray-500 text-sm mt-1">Manage your delivery addresses</p>
              </div>
              <button
                onClick={() => setShowAddressForm(true)}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
              >
                <FiPlus className="mr-2" /> Add New Address
              </button>
            </div>
            
            {showAddressForm && (
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                    <select
                      name="type"
                      value={newAddress.type}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      name="street"
                      value={newAddress.street}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="123 Main St"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={newAddress.city}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="New Delhi"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={newAddress.state}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Delhi"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input
                      type="text"
                      name="zip"
                      value={newAddress.zip}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="110016"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={newAddress.country}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      disabled
                    />
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="isDefault"
                    id="defaultAddress"
                    checked={newAddress.isDefault}
                    onChange={handleAddressChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="defaultAddress" className="ml-2 block text-sm text-gray-700">
                    Set as default address
                  </label>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAddressForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addNewAddress}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                  >
                    Save Address
                  </button>
                </div>
              </div>
            )}
            
            <div className="divide-y divide-gray-100">
              {user.addresses.length > 0 ? (
                user.addresses.map(address => (
                  <div key={address.id} className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center mb-2">
                          <h3 className="font-medium text-gray-800 mr-3">{address.type}</h3>
                          {address.isDefault && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">{address.street}</p>
                        <p className="text-gray-600">
                          {address.city}, {address.state} {address.zip}
                        </p>
                        <p className="text-gray-600">{address.country}</p>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setDefaultAddress(address.id)}
                          disabled={address.isDefault}
                          className={`px-3 py-1 rounded-lg text-sm ${
                            address.isDefault 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          }`}
                        >
                          Set as Default
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 text-sm">
                          Edit
                        </button>
                        <button
                          onClick={() => removeAddress(address.id)}
                          disabled={address.isDefault}
                          className={`px-3 py-1 rounded-lg text-sm ${
                            address.isDefault 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FiMapPin className="text-gray-400 text-3xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">No Saved Addresses</h3>
                  <p className="text-gray-500 mb-6">Add addresses for faster checkout</p>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md inline-block"
                  >
                    Add Address
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      case 'payments':
        return (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Payment Methods</h2>
                <p className="text-gray-500 text-sm mt-1">Manage your saved payment options</p>
              </div>
              <button
                onClick={() => setShowPaymentForm(true)}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
              >
                <FiPlus className="mr-2" /> Add New Method
              </button>
            </div>
            
            {showPaymentForm && (
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Add Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Type</label>
                    <select
                      name="type"
                      value={newPaymentMethod.type}
                      onChange={handlePaymentChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Visa">Visa</option>
                      <option value="Mastercard">Mastercard</option>
                      <option value="American Express">American Express</option>
                      <option value="Discover">Discover</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={newPaymentMethod.cardNumber}
                      onChange={handlePaymentChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                    <input
                      type="text"
                      name="name"
                      value={newPaymentMethod.name}
                      onChange={handlePaymentChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Lakshay Verma"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        value={newPaymentMethod.expiry}
                        onChange={handlePaymentChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={newPaymentMethod.cvv}
                        onChange={handlePaymentChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="isDefault"
                    id="defaultPayment"
                    checked={newPaymentMethod.isDefault}
                    onChange={handlePaymentChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="defaultPayment" className="ml-2 block text-sm text-gray-700">
                    Set as default payment method
                  </label>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowPaymentForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addNewPaymentMethod}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                  >
                    Save Payment Method
                  </button>
                </div>
              </div>
            )}
            
            <div className="divide-y divide-gray-100">
              {user.paymentMethods.length > 0 ? (
                user.paymentMethods.map(payment => (
                  <div key={payment.id} className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center mb-2">
                          {payment.type === 'Visa' ? (
                            <div className="w-10 h-6 bg-blue-900 text-white rounded flex items-center justify-center mr-3">
                              <span className="text-xs font-bold">VISA</span>
                            </div>
                          ) : payment.type === 'Mastercard' ? (
                            <div className="w-10 h-6 bg-yellow-500 text-white rounded flex items-center justify-center mr-3">
                              <span className="text-xs font-bold">MC</span>
                            </div>
                          ) : payment.type === 'PayPal' ? (
                            <div className="w-10 h-6 bg-blue-500 text-white rounded flex items-center justify-center mr-3">
                              <span className="text-xs font-bold">PP</span>
                            </div>
                          ) : (
                            <div className="w-10 h-6 bg-gray-500 text-white rounded flex items-center justify-center mr-3">
                              <span className="text-xs font-bold">{payment.type.charAt(0)}</span>
                            </div>
                          )}
                          <h3 className="font-medium text-gray-800 mr-3">
                            {payment.type} {payment.last4 ? `•••• ${payment.last4}` : ''}
                          </h3>
                          {payment.isDefault && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              Default
                            </span>
                          )}
                        </div>
                        {payment.expiry && (
                          <p className="text-gray-600">Expires {payment.expiry}</p>
                        )}
                        {payment.email && (
                          <p className="text-gray-600">{payment.email}</p>
                        )}
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setDefaultPayment(payment.id)}
                          disabled={payment.isDefault}
                          className={`px-3 py-1 rounded-lg text-sm ${
                            payment.isDefault 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          }`}
                        >
                          Set as Default
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 text-sm">
                          Edit
                        </button>
                        <button
                          onClick={() => removePayment(payment.id)}
                          disabled={payment.isDefault}
                          className={`px-3 py-1 rounded-lg text-sm ${
                            payment.isDefault 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FiCreditCard className="text-gray-400 text-3xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">No Payment Methods</h3>
                  <p className="text-gray-500 mb-6">Add payment methods for faster checkout</p>
                  <button
                    onClick={() => setShowPaymentForm(true)}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md inline-block"
                  >
                    Add Payment Method
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Account Settings</h2>
              <p className="text-gray-500 text-sm mt-1">Manage your account preferences</p>
            </div>
            
            <div className="p-5 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Notification Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">Email Notifications</h4>
                      <p className="text-gray-500 text-sm">Receive updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={user.notifications}
                        onChange={() => setUser({...user, notifications: !user.notifications})}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">SMS Notifications</h4>
                      <p className="text-gray-500 text-sm">Receive updates via text message</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={false}
                        onChange={() => {}}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">Push Notifications</h4>
                      <p className="text-gray-500 text-sm">Receive app notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={true}
                        onChange={() => {}}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Security</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">Change Password</h4>
                      <p className="text-gray-500 text-sm">Last changed 3 months ago</p>
                    </div>
                    <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm shadow-sm">
                      Change
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">Two-Factor Authentication</h4>
                      <p className="text-gray-500 text-sm">Add an extra layer of security</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={false}
                        onChange={() => {}}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">Login History</h4>
                      <p className="text-gray-500 text-sm">View recent account activity</p>
                    </div>
                    <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                      View
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Account Actions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">Download Data</h4>
                      <p className="text-gray-500 text-sm">Request a copy of your personal data</p>
                    </div>
                    <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                      <FiDownload className="inline mr-1" /> Request
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">Deactivate Account</h4>
                      <p className="text-gray-500 text-sm">Temporarily disable your account</p>
                    </div>
                    <button className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors text-sm">
                      Deactivate
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">Delete Account</h4>
                      <p className="text-gray-500 text-sm">Permanently delete your account</p>
                    </div>
                    <button className="px-3 py-1 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={user.avatar} 
                      alt="User profile" 
                      className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800">{user.name}</h3>
                      <p className="text-gray-500 text-sm">{user.membership} Member</p>
                    </div>
                  </div>
                </div>
                
                <nav className="p-2">
                  <ul className="space-y-1">
                    <li>
                      <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === 'dashboard' 
                            ? 'bg-indigo-50 text-indigo-700' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <FiHome className="mr-3" />
                        Dashboard
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === 'profile' 
                            ? 'bg-indigo-50 text-indigo-700' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <FiUser className="mr-3" />
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === 'orders' 
                            ? 'bg-indigo-50 text-indigo-700' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <FiShoppingBag className="mr-3" />
                        Orders
                        <span className="ml-auto bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs">
                          {user.orders}
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('wishlist')}
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === 'wishlist' 
                            ? 'bg-indigo-50 text-indigo-700' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <FiHeart className="mr-3" />
                        Wishlist
                        <span className="ml-auto bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs">
                          {user.wishlist}
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('addresses')}
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === 'addresses' 
                            ? 'bg-indigo-50 text-indigo-700' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <FiMapPin className="mr-3" />
                        Addresses
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('payments')}
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === 'payments' 
                            ? 'bg-indigo-50 text-indigo-700' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <FiCreditCard className="mr-3" />
                        Payments
                      </button>
                    </li>
                    <li>
                                            <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === 'settings' 
                            ? 'bg-indigo-50 text-indigo-700' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <FiSettings className="mr-3" />
                        Settings
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <FiLogOut className="mr-3" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Rewards Card */}
              <div className="mt-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-sm overflow-hidden p-5 text-white">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Reward Points</h3>
                  <FiAward className="text-xl" />
                </div>
                <p className="text-2xl font-bold mb-2">{user.rewardsPoints}</p>
                <p className="text-sm opacity-90 mb-4">Earn more points with every purchase</p>
                <Link
                  to="/rewards"
                  className="inline-block w-full px-4 py-2 bg-white bg-opacity-20 rounded-lg text-center text-sm font-medium hover:bg-opacity-30 transition-colors"
                >
                  Redeem Points
                </Link>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>

      {/* Avatar Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">Change Avatar</h3>
              <button 
                onClick={() => {
                  setShowAvatarModal(false);
                  setUploadedImage(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            
            <div className="p-5">
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Upload Your Photo</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500 transition-colors"
                  onClick={() => fileInputRef.current.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden" 
                    accept="image/*"
                  />
                  {uploadedImage ? (
                    <div className="flex flex-col items-center">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded preview" 
                        className="w-24 h-24 rounded-full object-cover mb-3"
                      />
                      <button
                        onClick={handleUseUploadedImage}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm shadow-sm"
                      >
                        Use This Photo
                      </button>
                    </div>
                  ) : (
                    <>
                      <FiUpload className="mx-auto text-3xl text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 2MB</p>
                    </>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Choose an Avatar</h4>
                <div className="grid grid-cols-4 gap-3">
                  {avatarOptions.map((avatar, index) => (
                    <button
                      key={index}
                      onClick={() => handleAvatarSelect(avatar)}
                      className="p-1 rounded-full border-2 border-transparent hover:border-indigo-500 transition-colors"
                    >
                      <img 
                        src={avatar} 
                        alt={`Avatar option ${index}`}
                        className="w-full h-auto rounded-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => {
                  setShowAvatarModal(false);
                  setUploadedImage(null);
                }}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AccountDashboard;