import React from 'react';
import Image from 'next/image';
import logo from '../../public/images/logo5.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer id="footer" className="bg-gray-800 text-white py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="flex justify-center md:justify-start ml-20">
                <a href="/">
                    <Image src={logo} alt="Logo" width={150} height={75} className="footer-logo" />
                </a>
            </div>
            <div className="flex flex-col">
                <h2 className="text-lg font-semibold mb-4">SUPPORT</h2>
                <ul>
                    <li className="mb-2"><a href="/faq" className="hover:underline">FAQ</a></li>
                    <li className="mb-2"><a href="/contact" className="hover:underline">Contact Us</a></li>
                    <li className="mb-2"><a href="/returns" className="hover:underline">Returns</a></li>
                </ul>
            </div>
            <div className="flex flex-col">
                <h2 className="text-lg font-semibold mb-4">Useful Links</h2>
                <ul>
                    <li className="mb-2"><a href="/" className="hover:underline">Home</a></li>
                    <li className="mb-2"><a href="/about" className="hover:underline">About Us</a></li>
                    <li className="mb-2"><a href="/contact" className="hover:underline">Contact Us</a></li>
                </ul>
            </div>
            <div className="flex flex-col">
                <h2 className="text-lg font-semibold mb-4">Our Services</h2>
                <ul>
                    <li className="mb-2"><a href="/publicproduct" className="hover:underline">Products</a></li>
                    <li className="mb-2"><a href="/publiccategory" className="hover:underline">Categories</a></li>
                    <li className="mb-2"><a href="/publiccategory" className="hover:underline">Categories</a></li>
                </ul>
            </div>
            <div className="flex flex-col">
                <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
                <ul>
                    <li className="mb-2 flex items-center"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />DHA 2, Islamabad Pakistan.</li>
                    <li className="mb-2 flex items-center"><FontAwesomeIcon icon={faPhone} className="mr-2" />(+92) 333 1906382</li>
                    <li className="mb-2 flex items-center"><FontAwesomeIcon icon={faPhone} className="mr-2" />(+92) 51 0000000</li>
                    <li className="mb-2 flex items-center"><FontAwesomeIcon icon={faEnvelope} className="mr-2" />nicenick1992@gmail.com</li>
                </ul>
                <div className="flex justify-center md:justify-start space-x-4 mt-4">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
                        <FaFacebookF />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
                        <FaTwitter />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
                        <FaInstagram />
                    </a>
                    <a href="https://wa.me/923331906382" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
                        <FaWhatsapp />
                    </a>
                    <a href="https://www.linkedin.com/in/syed-jawad-ali-080286b9/" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
                        <FaLinkedinIn />
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
                        <FaYoutube />
                    </a>
                </div>
            </div>
        </div>
        <div className="text-center mt-8">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </footer>

    );
};

export default Footer;
