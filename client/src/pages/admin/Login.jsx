// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../utils/api';
// import Swal from 'sweetalert2';
// import { useAuth } from '../../context/AuthContext';

// const AdminLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [code, setCode] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post('/api/auth/login', { email, password, secretCode: code });
//       login(res.data.token);
//       navigate('/admin/dashboard');
//     } catch (err) {
//       Swal.fire('Login failed', err.response?.data?.message || 'Invalid credentials', 'error');
//     }
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#080808]">
//       <form onSubmit={handleSubmit} className="bg-[#262626] p-8 rounded-xl w-96 shadow-xl">
//         <h2 className="text-2xl mb-6 text-center">Admin Login</h2>
//         <input type="email" placeholder="Email" className="w-full p-3 mb-4 bg-black rounded" value={email} onChange={e => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" className="w-full p-3 mb-4 bg-black rounded" value={password} onChange={e => setPassword(e.target.value)} required />
//         <input type="text" placeholder="IST Secret Code (HHMM)" className="w-full p-3 mb-6 bg-black rounded" value={code} onChange={e => setCode(e.target.value)} required />
//         <button type="submit" className="bg-[#ff004f] w-full py-3 rounded font-bold">Login</button>
//       </form>
//     </div>
//   );
// };
// export default AdminLogin;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending login request...');
      const res = await api.post('/api/auth/login', { email, password, secretCode: code });
      console.log('Login response:', res.data);
      
      if (res.data.success && res.data.token) {
        login(res.data.token);
        console.log('Token stored, navigating to dashboard');
        navigate('/admin/dashboard');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      Swal.fire('Login failed', err.response?.data?.message || 'Check credentials', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080808]">
      <form onSubmit={handleSubmit} className="bg-[#262626] p-8 rounded-xl w-96 shadow-xl">
        {/* <h2 className="text-2xl mb-6 text-center">Admin Login</h2> */}
        <Link
        to="/"
        className="inline-flex items-center text-gray-300 hover:text-[#ff004f] mb-4 transition"
      >
        {"<<<"}Back to Home
      </Link>
        <img src="/assets/logo.jpg" alt="Logo" className="mx-auto mb-6" />
        <input type="email" placeholder="Email" className="w-full p-3 mb-4 bg-black rounded" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-3 mb-4 bg-black rounded" value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="text" placeholder="IST Secret" className="w-full p-3 mb-6 bg-black rounded" value={code} onChange={e => setCode(e.target.value)} required />
        <button type="submit" className="bg-[#ff004f] w-full py-3 rounded font-bold">Login</button>
        
      </form>
      
    </div>
  );
};
export default AdminLogin;