import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiStar, FiShoppingCart, FiHeart, FiShare2 } from 'react-icons/fi';
import { BsCheckCircleFill, BsShieldFillCheck } from 'react-icons/bs';
import { RiExchangeLine, RiCoupon2Line } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

export default function Details() {
    const [products, setProducts] = useState([]);
    const [activeImage, setActiveImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [wishlisted, setWishlisted] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();

    useEffect(() => {
        async function getdata() {
            try {
                let res = await fetch(`https://fakestoreapi.com/products/${id}`);
                let data = await res.json();
                setProducts([data]);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }
        getdata();
    }, [id]);

    const product = products[0] || {
        title: 'Loading...',
        price: 0,
        description: '',
        rating: { rate: 0, count: 0 },
        image: '',
        category: ''
    };

    const enhancedProduct = {
        ...product,
        images: [product.image, product.image, product.image, product.image],
        originalPrice: Math.round(product.price * 1.2),
        discount: 20,
        reviews: product.rating.count,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        highlights: [
            'High quality material',
            'Comfortable fit',
            'Durable construction',
            'Easy to maintain'
        ],
        deliveryDate: 'Delivery by Tomorrow',
        codAvailable: true,
        returnPolicy: '14 days return policy',
        seller: 'SuperCom Retail',
        sellerRating: 4.2,
        colorOptions: ['Red', 'Blue', 'Black', 'Green'],
        selectedColor: 'Blue'
    };

    const [similarProducts, setSimilarProducts] = useState([]);
    useEffect(() => {
        async function getSimilarProducts() {
            try {
                let res = await fetch(`https://fakestoreapi.com/products/category/${product.category}`);
                let data = await res.json();
                setSimilarProducts(data.filter(p => p.id !== product.id).slice(0, 6));
            } catch (error) {
                console.error("Error fetching similar products:", error);
            }
        }

        if (product.category) {
            getSimilarProducts();
        }
    }, [product.category, product.id]);

[/* In the price display section */]

    // const [newQuantity,setQuantity] = useState(); 
    const handleQuantityIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
    };

    const handleQuantityDecrease = () => {

        if (quantity < 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
        }
    };

    return (

        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow">
                {/* Main Product Section */}
                <div className="container mx-auto bg-white p-4 rounded shadow-sm mt-4">
                    <div className="flex flex-col md:flex-row">
                        {/* Product Images */}
                        <div className="md:w-2/5 flex flex-col md:flex-row ">
                            <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 mr-4">
                                {enhancedProduct.images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Product ${index + 1}`}
                                        className={`w-16 h-16 object-cover  rounded cursor-pointer border-4 ${activeImage === index ? 'border-blue-500' : 'border-gray-200'}`}
                                        onClick={() => setActiveImage(index)}
                                    />
                                ))}
                            </div>
                            <div className="relative w-full h-96 mt-4 md:mt-0">
                                <img
                                    src={enhancedProduct.images[activeImage]}
                                    alt="Main Product"
                                    className="w-full h-full object-contain  hover:scale-105 "
                                />
                                <button
                                    className="absolute top-1/2 left-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                                    onClick={() => setActiveImage((activeImage - 1 + enhancedProduct.images.length) % enhancedProduct.images.length)}
                                >
                                    <FiChevronLeft />
                                </button>
                                <button
                                    className="absolute top-1/2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                                    onClick={() => setActiveImage((activeImage + 1) % enhancedProduct.images.length)}
                                >
                                    <FiChevronRight />
                                </button>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="md:w-3/5 md:pl-8 mt-6 md:mt-0">
                            <h1 className="text-2xl font-medium">{enhancedProduct.title}</h1>
                            <div className="flex items-center mt-2">
                                <div className="flex items-center bg-green-700 text-white px-2 py-1 rounded-sm text-sm">
                                    <span>{enhancedProduct.rating.rate}</span>
                                    <FiStar className="ml-1" size={14} />
                                </div>
                                <span className="text-blue-500 ml-2 text-sm">{enhancedProduct.reviews} Ratings & Reviews</span>
                                <span className="text-blue-500 ml-4 text-sm">1.2K+ bought in past month</span>
                            </div>
                            {/* In the price display section */}
                            <div className="mt-4">
                                <div className="flex items-center">
                                    <span className="text-3xl font-medium">₹{(enhancedProduct.price * 80 * quantity).toFixed(2)}</span>
                                    <span className="text-gray-500 line-through ml-3">₹{(enhancedProduct.originalPrice * 80 * quantity).toFixed(2)}</span>
                                    <span className="text-green-600 ml-3">{enhancedProduct.discount}% off</span>
                                </div>
                                <div className="text-green-600 text-sm mt-1">inclusive of all taxes</div>
                            </div>

                            {/* In the quantity section */}
                            <div className="mt-6">
                                <h3 className="font-medium">Quantity</h3>
                                <div className="flex items-center mt-2 border rounded w-fit">
                                    <button
                                        className="px-3 py-1 border-r text-xl"
                                        onClick={handleQuantityDecrease}
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1">{quantity}</span>
                                    <button
                                        className="px-3 py-1 border-l text-xl"
                                        onClick={handleQuantityIncrease}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="font-medium">Color</h3>
                                <div className="flex space-x-3 mt-2">
                                    {enhancedProduct.colorOptions.map(color => (
                                        <button
                                            key={color}
                                            className={`px-4 py-1 border rounded-full ${enhancedProduct.selectedColor === color ? 'border-blue-500 text-blue-500' : 'border-gray-300'}`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="font-medium">Size</h3>
                                <div className="flex space-x-3 mt-2">
                                    {enhancedProduct.sizes.map(size => (
                                        <button
                                            key={size}
                                            className={`w-12 h-10 flex items-center justify-center border rounded ${selectedSize === size ? 'border-blue-500 text-blue-500' : 'border-gray-300'} hover:border-blue-500`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                    <button className="text-blue-500 text-sm flex items-center">
                                        Size Guide
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="font-medium">Quantity</h3>
                                <div className="flex items-center mt-2 border rounded w-fit">
                                    <button
                                        className="px-3 py-1 border-r text-xl"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1">{quantity}</span>
                                    <button
                                        className="px-3 py-1 border-l text-xl"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 flex space-x-4">
                                <Link to="/Cartinfo" state={{  productId: product.id }}>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-full font-medium flex items-center justify-center">
                                    <FiShoppingCart className="mr-2" />
                                    ADD TO CART
                                </button>
                                </Link>
                                <button className="bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-8 rounded-full font-medium">
                                    BUY NOW
                                </button>
                                <button
                                    className={`border rounded-full p-3 ${wishlisted ? ' text-white bg-red-500' : 'text-gray-500 border-gray-300'}`}
                                    onClick={() => setWishlisted(!wishlisted)}
                                >
                                    <FiHeart />
                                </button>
                            </div>

                            <div className="mt-6 border-t pt-4">
                                <div className="flex items-center">
                                    <BsShieldFillCheck className="text-gray-500 mr-2" />
                                    <span className="text-sm">1 Year Warranty</span>
                                </div>
                                <div className="flex items-center mt-2">
                                    <RiExchangeLine className="text-gray-500 mr-2" />
                                    <span className="text-sm">14 Days Easy Return</span>
                                </div>
                                <div className="flex items-center mt-2">
                                    <BsCheckCircleFill className="text-gray-500 mr-2" />
                                    <span className="text-sm">Delivery by {enhancedProduct.deliveryDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seller & Offers Section */}
                <div className="container mx-auto mt-4 flex flex-col md:flex-row gap-4">
                    <div className="bg-white p-4 rounded shadow-sm md:w-2/3">
                        <h2 className="text-lg font-medium">Seller</h2>
                        <div className="mt-3 flex items-start">
                            <div className="flex-1">
                                <div className="flex items-center">
                                    <span className="text-blue-500 font-medium">{enhancedProduct.seller}</span>
                                    <div className="flex items-center bg-green-700 text-white px-1 rounded-sm text-xs ml-2">
                                        <span>{enhancedProduct.sellerRating}</span>
                                        <FiStar className="ml-1" size={10} />
                                    </div>
                                </div>
                                <div className="mt-2 text-sm">
                                    <div>7 Days Replacement Policy</div>
                                    <div>GST invoice available</div>
                                </div>
                            </div>
                            <button className="text-blue-500 border border-blue-500 px-4 py-1 rounded">
                                View More
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded shadow-sm md:w-1/3">
                        <h2 className="text-lg font-medium">Delivery Options</h2>
                        <div className="mt-3">
                            <input type="text" placeholder="Enter Delivery Pincode" className="border p-2 rounded w-full" />
                            <div className="mt-2 flex items-center text-green-600">
                                <BsCheckCircleFill className="mr-2" />
                                <span>Delivery by {enhancedProduct.deliveryDate}</span>
                            </div>
                            {enhancedProduct.codAvailable && (
                                <div className="text-green-600 mt-1 flex items-center">
                                    <BsCheckCircleFill className="mr-2" />
                                    <span>Cash on Delivery available</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="container mx-auto mt-4 bg-white p-4 rounded shadow-sm">
                    <div className="flex border-b">
                        <button className="px-4 py-2 font-medium border-b-2 border-blue-500 text-blue-500">Product Details</button>
                        <button className="px-4 py-2 font-medium text-gray-600">Specifications</button>
                        <button className="px-4 py-2 font-medium text-gray-600">Reviews</button>
                    </div>

                    <div className="mt-4">
                        <h3 className="font-medium">Description</h3>
                        <p className="mt-2 text-gray-600">{enhancedProduct.description}</p>

                        <h3 className="font-medium mt-4">Features</h3>
                        <ul className="mt-2 space-y-2">
                            {enhancedProduct.highlights.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-gray-500 mr-2">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Offers Section */}
                <div className="container mx-auto mt-4 bg-white p-4 rounded shadow-sm">
                    <h2 className="text-lg font-medium">Available offers</h2>
                    <div className="mt-3 space-y-3">
                        <div className="flex">
                            <RiCoupon2Line className="text-green-600 mt-1 mr-2" />
                            <div className="text-sm">
                                <span className="font-medium">Bank Offer</span> 5% Cashback on Flipkart Axis Bank Card
                                <span className="text-blue-500 ml-2 cursor-pointer">T&C</span>
                            </div>
                        </div>
                        <div className="flex">
                            <RiCoupon2Line className="text-green-600 mt-1 mr-2" />
                            <div className="text-sm">
                                <span className="font-medium">Special Price</span> Get extra 10% off (price inclusive of discount)
                                <span className="text-blue-500 ml-2 cursor-pointer">T&C</span>
                            </div>
                        </div>
                        <div className="flex">
                            <RiCoupon2Line className="text-green-600 mt-1 mr-2" />
                            <div className="text-sm">
                                <span className="font-medium">Partner Offer</span> Sign up for Pay Later and get Gift Card worth ₹100
                                <span className="text-blue-500 ml-2 cursor-pointer">T&C</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                {similarProducts.length > 0 && (
                    <div className="container mx-auto mt-4 bg-white p-4 rounded shadow-sm mb-8">
                        <h2 className="text-lg font-medium">Similar Products</h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                            {similarProducts.map((item, index) => (
                                <Link to={`/Details/${item.id}`} key={index} className="block">
                                    <div key={index} className="border rounded p-3 cursor-pointer hover:shadow-md transition-shadow">
                                        <img
                                            src={item.image}
                                            alt="Similar Product"
                                            className="w-full h-40 object-contain"
                                        />
                                        <div className="mt-2 text-sm font-medium truncate">{item.title}</div>
                                        <div className="flex items-center mt-1">
                                            <span className="text-green-600 text-xs">{item.rating.rate}</span>
                                            <FiStar className="text-green-600 ml-1" size={10} />
                                            <span className="text-gray-500 text-xs ml-1">({item.rating.count})</span>
                                        </div>
                                        <div className="mt-1">
                                            <span className="font-medium">₹{item.price * 80}</span>
                                            <span className="text-gray-500 line-through text-xs ml-1">₹{Math.round(item.price * 80 * 1.2)}</span>
                                            <span className="text-green-600 text-xs ml-1">20% off</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}