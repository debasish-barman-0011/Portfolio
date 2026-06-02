import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/admin/login'); };
  return (
    <nav className="bg-[#2f3030] p-4 flex flex-wrap gap-4 justify-between items-center">
      <div className="flex gap-4 flex-wrap">
        <Link to="/admin/dashboard" className="hover:text-[#ff004f]">Dashboard</Link>
        <Link to="/admin/projects" className="hover:text-[#ff004f]">Projects</Link>
        <Link to="/admin/education" className="hover:text-[#ff004f]">Education</Link>
        <Link to="/admin/achievements" className="hover:text-[#ff004f]">Achievements</Link>
        <Link to="/admin/certificates" className="hover:text-[#ff004f]">Certificates</Link>
        <Link to="/admin/blogs" className="hover:text-[#ff004f]">Blogs</Link>
        <Link to="/admin/community-posts" className="hover:text-[#ff004f]">Community</Link>
        <Link to="/admin/locker" className="hover:text-[#ff004f]">Locker</Link>
        <Link to="/admin/contact-messages" className="hover:text-[#ff004f]">Contact Msgs</Link>
        <Link to="/admin/resume-downloads" className="hover:text-[#ff004f]">Resume Logs</Link>
      </div>
      <button onClick={handleLogout} className="bg-red-600 px-4 py-1 rounded">Logout</button>
    </nav>
  );
};
export default AdminNavbar;