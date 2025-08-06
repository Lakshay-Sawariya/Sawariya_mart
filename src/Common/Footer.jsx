  // Footer.jsx
  import React from 'react';
  import {
    FiFacebook,
    FiTwitter,
    FiInstagram,
    FiLinkedin,
    FiYoutube,
    FiCreditCard,
    FiTruck,
    FiShield,
    FiHelpCircle,
    FiMail,
    FiPhone,
    FiMapPin,
    FiGift,
    FiShoppingCart
  } from 'react-icons/fi';

  const Footer = () => {
    const currentYear = new Date().getFullYear();

    // Data for reusable sections
    const shopCategories = [
      { text: "Electronics", href: "#", color: "text-purple-600 hover:text-purple-400 hover:font-bold" },
      { text: "Fashion", href: "#", color: "text-purple-600 hover:text-purple-400 hover:font-bold" },
      { text: "Home & Kitchen", href: "#", color: "text-purple-600 hover:text-purple-400 hover:font-bold" },
      { text: "Beauty & Personal Care", href: "#", color: "text-purple-600 hover:text-purple-400 hover:font-bold" },
      { text: "Sports & Outdoors", href: "#", color: "text-purple-600 hover:text-purple-400 hover:font-bold" },
      { text: "Books & Stationery", href: "#", color: "text-purple-600 hover:text-purple-400 hover:font-bold" }
    ];

    const customerServiceLinks = [
      { text: "Contact Us", href: "#", icon: <FiMail size={14} className="mr-2" /> },
      { text: "FAQs", href: "#", icon: <FiHelpCircle size={14} className="mr-2" /> },
      { text: "Shipping Policy", href: "#", icon: <FiTruck size={14} className="mr-2" /> },
      { text: "Returns & Refunds", href: "#", icon: <FiCreditCard size={14} className="mr-2" /> },
      { text: "Track Your Order", href: "#", icon: <FiMapPin size={14} className="mr-2" /> },
      { text: "Size Guide", href: "#", icon: <FiShield size={14} className="mr-2" /> }
    ];

    const services = [
      {
        icon: <FiTruck size={32} className="text-indigo-600" />,
        title: "Free Shipping",
        description: "On all orders over $50",
        highlight: "Shop now",
        bg: "bg-gradient-to-br from-indigo-50 to-purple-50"
      },
      {
        icon: <FiCreditCard size={32} className="text-purple-600" />,
        title: "Secure Payment",
        description: "100% protected payments",
        highlight: "More info",
        bg: "bg-gradient-to-br from-purple-50 to-pink-50"
      },
      {
        icon: <FiGift size={32} className="text-pink-600" />,
        title: "Daily Offers",
        description: "Discounts up to 70%",
        highlight: "View deals",
        bg: "bg-gradient-to-br from-pink-50 to-rose-50"
      },
      {
        icon: <FiShield size={32} className="text-blue-600" />,
        title: "2-Year Warranty",
        description: "Quality guarantee",
        highlight: "Our promise",
        bg: "bg-gradient-to-br from-blue-50 to-indigo-50"
      }
    ];

    const socialMedia = [
      { icon: <FiFacebook size={20} />, color: "bg-blue-600 hover:bg-blue-700" },
      { icon: <FiTwitter size={20} />, color: "bg-sky-500 hover:bg-sky-600" },
      { icon: <FiInstagram size={20} />, color: "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700" },
      { icon: <FiLinkedin size={20} />, color: "bg-blue-700 hover:bg-blue-800" },
      { icon: <FiYoutube size={20} />, color: "bg-red-600 hover:bg-red-700" }
    ];

    const paymentMethods = ['visa', 'mastercard', 'paypal', 'apple', 'amazon'];

    return (
      <footer className="bg-gradient-to-b from-gray-50 to-gray-100 text-gray-700 border-t border-gray-200">
        {/* Top Services */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                highlight={service.highlight}
                bg={service.bg}
              />
            ))}
          </div>
        </div>

        {/* Main Footer */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div>
              {/* Logo */}
              <a href="/" className="flex items-center space-x-2 group">
                
                <span className=" bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-[2rem] font-bold text-transparent hidden sm:block">
                  Sawariya<span className=" text-gray-800">Mart</span>
                </span>
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform shadow-md">
                  <FiShoppingCart size={20} className="text-white" />
                </div>
              </a>
              <p className="mb-4 text-gray-600">
                Your one-stop shop for all your needs. We offer quality products with fast delivery and excellent customer service.
              </p>
              <div className="mt-6">
                <h4 className="font-semibold mb-3 text-gray-900">Payment Methods</h4>
                <div className="flex flex-wrap gap-3">
                  {paymentMethods.map((method, index) => (
                    <PaymentMethod key={index} icon={method} />
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">Shop Categories</h3>
              <ul className="space-y-3">
                {shopCategories.map((item, index) => (
                  <FooterLink key={index} href={item.href} text={item.text} color={item.color} />
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">Customer Service</h3>
              <ul className="space-y-3">
                {customerServiceLinks.map((item, index) => (
                  <FooterLink key={index} href={item.href} text={item.text} icon={item.icon} />
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">Get Updates</h3>
              <p className="mb-4 text-gray-600">
                Subscribe to our newsletter for the latest updates, offers and more.
              </p>
              <NewsletterForm />

              <div className="mt-6 space-y-3">
                <ContactInfo icon={<FiMail size={18} className="text-indigo-600" />} text="support@sawariyamart.com" />
                <ContactInfo icon={<FiPhone size={18} className="text-indigo-600" />} text="+1 (800) 123-4567" />
                <ContactInfo icon={<FiMapPin size={18} className="text-indigo-600" />} text="123 Main St, San Francisco, CA" />
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3 text-gray-900">Follow Us</h4>
                <div className="flex space-x-3">
                  {socialMedia.map((social, index) => (
                    <SocialIcon
                      key={index}
                      icon={social.icon}
                      color={social.color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

    {/* Bottom Footer */}
  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-6">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-lg font-bold text-white/90">© {currentYear} SawariyaMart. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          {paymentMethods.slice(0, 4).map((method, index) => (
            <div key={index} className="bg-white p-2 rounded-md">
              <PaymentIcon name={method} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
      </footer>
    );
  };

  // Sub-components
  const ServiceCard = ({ icon, title, description, highlight, bg }) => (
    <div className={`flex items-start space-x-4 p-5 rounded-xl transition-all duration-200 hover:shadow-md ${bg}`}>
      <div className="mt-1 flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <a
          href="#"
          className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:underline transition-all"
          aria-label={`Learn more about ${title}`}
        >
          {highlight}
        </a>
      </div>
    </div>
  );

  const PaymentMethod = ({ icon }) => {
    const iconMap = {
      'visa': 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
      'mastercard': 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
      'paypal': 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
      'apple': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      'amazon': 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
    };

    return (
      <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
        <img
          src={iconMap[icon]}
          className="h-6 w-auto object-contain"
          alt={`${icon} payment method`}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
    );
  };

  const PaymentIcon = ({ name }) => {
    const iconMap = {
      'visa': 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
      'mastercard': 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
      'paypal': 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
      'apple': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'
    };

    return (
      <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
        <img
          src={iconMap[name]}
          className="h-5 w-auto"
          alt={`${name} payment icon`}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
    );
  };

  const SocialIcon = ({ icon, color = 'bg-gray-200 hover:bg-gray-300' }) => (
    <a
      href="#"
      className={`text-white p-2.5 rounded-full transition-all duration-200 ${color} shadow-sm hover:shadow-md`}
      aria-label="Follow us on social media"
    >
      {icon}
    </a>
  );

  const FooterLink = ({ href, text, icon, color = 'text-gray-600 hover:text-indigo-600' }) => (
    <li>
      <a
        href={href}
        className={`${color} transition-all duration-200 flex items-center`}
        aria-label={text}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {text}
      </a>
    </li>
  );

  const NewsletterForm = () => {
    const [email, setEmail] = React.useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      alert(`Thank you for subscribing with ${email}`);
      setEmail('');
    };

    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="flex-grow px-4 py-3 border-2 border-gray-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all hover:border-indigo-300 shadow-sm"
          aria-label="Email for newsletter subscription"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all duration-200 text-sm font-medium whitespace-nowrap shadow-md hover:shadow-lg"
          aria-label="Subscribe to newsletter"
        >
          Subscribe
        </button>
      </form>
    );
  };

  const ContactInfo = ({ icon, text }) => (
    <div className="flex items-center space-x-3 group">
      <span className="flex-shrink-0 p-2 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-all">
        {icon}
      </span>
      <span className="text-gray-600 group-hover:text-indigo-600 group-hover:font-medium transition-all duration-200">
        {text}
      </span>
    </div>
  );

  export default Footer;