import { useState } from 'react';
import api from '../utils/api';
import Swal from 'sweetalert2';

const DownloadResume = () => {
  const [form, setForm] = useState({ fullName: '', mobile: '', purpose: '' });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/resume/log', form);
      window.open(res.data.downloadUrl, '_blank');
      Swal.fire('Success', 'Resume is downloading', 'success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message, 'error');
    }
  };
  return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-3xl mb-6">Download Resume</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Full Name" className="w-full p-3 bg-[#262626] rounded" required onChange={e => setForm({...form, fullName: e.target.value})} />
        <input type="tel" placeholder="Mobile Number" pattern="[6-9][0-9]{9}" className="w-full p-3 bg-[#262626] rounded" required onChange={e => setForm({...form, mobile: e.target.value})} />
        <select className="w-full p-3 bg-[#262626] rounded" required onChange={e => setForm({...form, purpose: e.target.value})}>
          <option value="">Select Purpose</option>
          <option>Explore</option><option> Recruitment</option><option>Collaboration</option><option>IT Consultation</option><option>Group Project</option><option>Others</option>
        </select>
        <button type="submit" className="bg-[#04aa6d] w-full py-3 rounded">Download Now</button>
      </form>
    </div>
  );
};
export default DownloadResume;