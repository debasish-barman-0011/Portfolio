import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const navigate = useNavigate();

  const login = (newToken) => {
    localStorage.setItem('adminToken', newToken);
    setToken(newToken);
  };

  const logout = async () => {
    if (token) {
      try {
        await api.post('/api/auth/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
      } catch (err) {}
    }
    localStorage.removeItem('adminToken');
    setToken(null);
    navigate('/admin/login');
    Swal.fire('Logged out', 'Session ended', 'info');
  };

  useEffect(() => {
    if (!token) return;
    
    let idleTimer;
    const resetTimer = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        Swal.fire({
          title: 'Inactivity timeout',
          text: 'You will be logged out in 30 seconds',
          timer: 30000,
          showConfirmButton: false,
          didDestroy: () => logout()
        });
      }, 5 * 60 * 1000);
    };
    
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('keydown', resetTimer);
    resetTimer();
    
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};