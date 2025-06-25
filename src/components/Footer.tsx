
import { Link } from 'react-router-dom';
import { Music, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold">Artistly</span>
            </Link>
            <p className="text-gray-400">
              Connecting event planners with talented performing artists across India.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/artists" className="text-gray-400 hover:text-white transition-colors">Find Artists</Link></li>
              <li><Link to="/onboarding" className="text-gray-400 hover:text-white transition-colors">Join as Artist</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/artists?category=Singers" className="text-gray-400 hover:text-white transition-colors">Singers</Link></li>
              <li><Link to="/artists?category=Dancers" className="text-gray-400 hover:text-white transition-colors">Dancers</Link></li>
              <li><Link to="/artists?category=DJs" className="text-gray-400 hover:text-white transition-colors">DJs</Link></li>
              <li><Link to="/artists?category=Speakers" className="text-gray-400 hover:text-white transition-colors">Speakers</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="mailto:support@artistly.com" className="hover:text-white transition-colors">
                  Email: support@artistly.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  Phone: +91 9876543210
                </a>
              </li>
              <li>Address: Mumbai, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Artistly.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
