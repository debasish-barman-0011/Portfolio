import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleAdminClick = () => {
    setMenuOpen(false);
    if (token) navigate('/admin/dashboard');
    else navigate('/admin/login');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-[#2f3030] sticky top-0 z-50 flex justify-between items-center px-4 md:px-8 py-3 shadow-md">
      <Link to="/" className="flex items-center">
        <img src="/assets/logo.jpg" alt="logo" className="h-8 md:h-10" onError={(e)=>e.target.src='/assets/placeholder.jpg'} />
        {/* <span className="ml-2 text-white font-semibold hidden sm:inline">Debasish Barman</span> */}
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 items-center">
        <li><Link to="/" className="hover:text-[#ff004f] transition">Home</Link></li>
        <li><Link to="/blogs" className="hover:text-[#ff004f] transition">Blogs</Link></li>
        <li><Link to="/community" className="hover:text-[#ff004f] transition">Community</Link></li>
        <li><Link to="/education" className="hover:text-[#ff004f] transition">Education</Link></li>
        <li><Link to="/certificates" className="hover:text-[#ff004f] transition">Certificates</Link></li>
        <li><Link to="/achievements" className="hover:text-[#ff004f] transition">Achievements</Link></li>
        <li><Link to="/contact" className="hover:text-[#ff004f] transition">Contact</Link></li>
        <li><button onClick={handleAdminClick} className="text-[#ff004f] font-semibold hover:underline">Login</button></li>
      </ul>

      {/* Mobile Hamburger */}
      <button className="md:hidden text-white text-2xl focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-[#04aa6d] z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden shadow-lg`}>
        <div className="flex justify-end p-4">
          <button className="text-white text-2xl" onClick={closeMenu}>✕</button>
        </div>
        <ul className="flex flex-col items-center space-y-6 mt-8">
          <li><Link to="/" onClick={closeMenu} className="text-white text-lg hover:text-[#ff004f]">Home</Link></li>
          <li><Link to="/blogs" onClick={closeMenu} className="text-white text-lg hover:text-[#ff004f]">Blogs</Link></li>
          <li><Link to="/community" onClick={closeMenu} className="text-white text-lg hover:text-[#ff004f]">Community</Link></li>
          <li><Link to="/education" onClick={closeMenu} className="text-white text-lg hover:text-[#ff004f]">Education</Link></li>
          <li><Link to="/certificates" onClick={closeMenu} className="text-white text-lg hover:text-[#ff004f]">Certificates</Link></li>
          <li><Link to="/achievements" onClick={closeMenu} className="text-white text-lg hover:text-[#ff004f]">Achievements</Link></li>
          <li><Link to="/contact" onClick={closeMenu} className="text-white text-lg hover:text-[#ff004f]">Contact</Link></li>
          <li><button onClick={handleAdminClick} className="text-[#ff004f] font-bold text-lg">Login</button></li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;