import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Community from './pages/Community';
import Education from './pages/Education';
import Certificates from './pages/Certificates';
import Achievements from './pages/Achievements';
import Contact from './pages/Contact';
import DownloadResume from './pages/DownloadResume';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProjects from './pages/admin/Projects';
import AdminEducation from './pages/admin/Education';
import AdminAchievements from './pages/admin/Achievements';
import AdminCertificates from './pages/admin/Certificates';
import AdminBlogs from './pages/admin/Blogs';
import AdminCommunityPosts from './pages/admin/CommunityPosts';
import AdminLocker from './pages/admin/Locker';
import AdminContactMessages from './pages/admin/ContactMessages';
import AdminResumeDownloads from './pages/admin/ResumeDownloads';

function App() {
  console.log('App rendering - no redirects for public routes');
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <Loader />
        <ScrollToTop />
        <Routes>
          {/* ALL PUBLIC ROUTES - no authentication required */}
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/blogs" element={<><Navbar /><Blogs /><Footer /></>} />
          <Route path="/community" element={<><Navbar /><Community /><Footer /></>} />
          <Route path="/education" element={<><Navbar /><Education /><Footer /></>} />
          <Route path="/certificates" element={<><Navbar /><Certificates /><Footer /></>} />
          <Route path="/achievements" element={<><Navbar /><Achievements /><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
          <Route path="/download-resume" element={<><Navbar /><DownloadResume /><Footer /></>} />
          
          {/* ADMIN ROUTES - only these require login via PrivateRoute */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/projects" element={<PrivateRoute><AdminProjects /></PrivateRoute>} />
          <Route path="/admin/education" element={<PrivateRoute><AdminEducation /></PrivateRoute>} />
          <Route path="/admin/achievements" element={<PrivateRoute><AdminAchievements /></PrivateRoute>} />
          <Route path="/admin/certificates" element={<PrivateRoute><AdminCertificates /></PrivateRoute>} />
          <Route path="/admin/blogs" element={<PrivateRoute><AdminBlogs /></PrivateRoute>} />
          <Route path="/admin/community-posts" element={<PrivateRoute><AdminCommunityPosts /></PrivateRoute>} />
          <Route path="/admin/locker" element={<PrivateRoute><AdminLocker /></PrivateRoute>} />
          <Route path="/admin/contact-messages" element={<PrivateRoute><AdminContactMessages /></PrivateRoute>} />
          <Route path="/admin/resume-downloads" element={<PrivateRoute><AdminResumeDownloads /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;