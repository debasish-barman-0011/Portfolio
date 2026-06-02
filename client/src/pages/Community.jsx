import { useEffect, useState } from 'react';
import api from '../utils/api';
import Swal from 'sweetalert2';
import FilterBar from '../components/FilterBar';

const Community = () => {
  const [members, setMembers] = useState([]);
  const [filter, setFilter] = useState('latest');
  const [search, setSearch] = useState('');
  const [showReg, setShowReg] = useState(false);
  const [form, setForm] = useState({ fullName: '', mobile: '', hometown: '', occupation: '', introduction: '' });
  useEffect(() => {
    api.get('/api/community/approved?limit=50').then(res => setMembers(res.data.members)).catch(console.error);
    
    setTimeout(() => {
      Swal.fire({ title: 'Join Community', text: 'Register to connect!', icon: 'info', confirmButtonText: 'Register' }).then(res => res.isConfirmed && setShowReg(true));
    }, 15000);
  }, []);
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/community/register', form);
      Swal.fire('Success', 'Registration submitted for approval', 'success');
      setShowReg(false);
      setForm({ fullName: '', mobile: '', hometown: '', occupation: '', introduction: '' });
    } catch (err) { Swal.fire('Error', err.response?.data?.message, 'error'); }
  };
  let filtered = members.filter(m => m.fullName.toLowerCase().includes(search.toLowerCase()) || m.mobile.includes(search));
  if (filter === 'latest') filtered.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (filter === 'oldest') filtered.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
  if (filter === 'az') filtered.sort((a,b) => a.fullName.localeCompare(b.fullName));
  if (filter === 'shuffle') filtered.sort(() => 0.5 - Math.random());
  return (
    <div className="p-8">
      {showReg && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#262626] p-6 rounded-xl w-full max-w-md">
            <h2 className="text-2xl mb-4">Register as Member</h2>
            <form onSubmit={handleRegister} className="space-y-3">
              <input type="text" placeholder="Full Name" className="w-full p-2 bg-black rounded" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} required />
              <input type="tel" placeholder="Mobile Number" pattern="[6-9][0-9]{9}" className="w-full p-2 bg-black rounded" value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} required />
              <input type="text" placeholder="Hometown" className="w-full p-2 bg-black rounded" value={form.hometown} onChange={e => setForm({...form, hometown: e.target.value})} required />
              <input type="text" placeholder="Occupation" className="w-full p-2 bg-black rounded" value={form.occupation} onChange={e => setForm({...form, occupation: e.target.value})} required />
              <textarea placeholder="Brief introduction" rows="3" className="w-full p-2 bg-black rounded" value={form.introduction} onChange={e => setForm({...form, introduction: e.target.value})} required />
              <div className="flex gap-3"><button type="submit" className="bg-[#04aa6d] px-4 py-2 rounded">Register Now</button><button type="button" onClick={() => setShowReg(false)} className="bg-gray-600 px-4 py-2 rounded">Cancel</button></div>
            </form>
          </div>
        </div>
      )}
      <FilterBar filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} placeholder="Search by name, mobile" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(m => (
          <div key={m._id} className="bg-[#262626] p-4 rounded-xl"><h3 className="text-xl font-bold">{m.fullName}</h3><p>📍 {m.hometown}</p><p>📞 {m.mobile.slice(0,6)}xxxx{m.mobile.slice(-2)}</p><p>💼 {m.occupation}</p><p className="mt-2">{m.introduction.substring(0,150)}...</p></div>
        ))}
      </div>
    </div>
  );
};
export default Community;