import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import { clinicConfig } from '../config/clinicConfig';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Doctor', path: '/about' },
    { name: 'Areas of Care', path: '/services' },
    { name: 'AI Assistant', path: '/ai-assistant' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-heading font-bold text-xl md:text-2xl text-primary">
                Dr. Anoop Kumar Rai
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-gray-600 hover:text-primary transition-colors">
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <>
                <Link to={user.role === 'admin' ? "/admin/dashboard" : "/dashboard"} className="text-gray-600 hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-gray-600 hover:text-primary transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-primary transition-colors">
                  Login
                </Link>
                <Link to="/register" className="text-gray-600 hover:text-primary transition-colors">
                  Register
                </Link>
              </>
            )}
            
            <Link to="/book-appointment" className="btn-primary">
              BOOK APPOINTMENT
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-primary">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link 
                  to={user.role === 'admin' ? "/admin/dashboard" : "/dashboard"} 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/register" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>Register</Link>
              </>
            )}
            <Link to="/book-appointment" className="block px-3 py-2 text-base font-medium text-primary font-bold hover:bg-gray-50" onClick={() => setIsOpen(false)}>
              BOOK APPOINTMENT
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
