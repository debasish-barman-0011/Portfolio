import { useEffect, useState } from 'react';
import api from '../../utils/api';
import AdminNavbar from '../../components/AdminNavbar';
import Swal from 'sweetalert2';

const AdminCommunityPosts = () => {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [search, setSearch] = useState('');
  const fetchData = async () => {
    const p = await api.get('/api/community/pending');
    setPending(p.data);
    const a = await api.get('/api/community/approved?limit=100');
    setApproved(a.data.members);
  };
  useEffect(() => { fetchData(); }, []);
  const handleApprove = async (id) => { await api.patch(`/api/community/${id}/approve`); fetchData(); Swal.fire('Approved', '', 'success'); };
  const handleReject = async (id) => { await api.patch(`/api/community/${id}/reject`); fetchData(); };
  const handleUpdate = async (id, updates) => { await api.patch(`/api/community/${id}`, updates); fetchData(); };
  const filteredApproved = approved.filter(m => m.fullName.toLowerCase().includes(search.toLowerCase()) || m.mobile.includes(search));
  return (
    <div><AdminNavbar /><div className="p-8">
      <h1 className="text-3xl mb-6">Community Management</h1>
      <h2 className="text-2xl mb-4">Pending Requests</h2>
      <div className="overflow-x-auto mb-8"><table className="w-full bg-[#262626] rounded"><thead><tr><th>Name</th><th>Mobile</th><th>Hometown</th><th>Occupation</th><th>Actions</th></tr></thead><tbody>
        {pending.map(p => (<tr key={p._id}><td>{p.fullName}</td><td>{p.mobile}</td><td>{p.hometown}</td><td>{p.occupation}</td><td><button onClick={() => handleApprove(p._id)} className="bg-[#04aa6d] px-3 py-1 rounded mr-2">Approve</button><button onClick={() => handleReject(p._id)} className="bg-red-600 px-3 py-1 rounded">Reject</button></td></tr>))}
      </tbody></table></div>
      <h2 className="text-2xl mb-4">Approved Members</h2>
      <input type="text" placeholder="Search" className="bg-[#262626] p-2 rounded w-full mb-4" value={search} onChange={e => setSearch(e.target.value)} />
      <div className="overflow-x-auto"><table className="w-full bg-[#262626] rounded"><thead><tr><th>Name</th><th>Mobile</th><th>Hometown</th><th>Occupation</th><th>Actions</th></tr></thead><tbody>
        {filteredApproved.map(m => (<tr key={m._id}><td><input defaultValue={m.fullName} onBlur={e => handleUpdate(m._id, { fullName: e.target.value })} className="bg-black p-1 rounded" /></td><td><input defaultValue={m.mobile} onBlur={e => handleUpdate(m._id, { mobile: e.target.value })} className="bg-black p-1 rounded" /></td><td><input defaultValue={m.hometown} onBlur={e => handleUpdate(m._id, { hometown: e.target.value })} className="bg-black p-1 rounded" /></td><td><input defaultValue={m.occupation} onBlur={e => handleUpdate(m._id, { occupation: e.target.value })} className="bg-black p-1 rounded" /></td><td><button onClick={() => handleReject(m._id)} className="bg-red-600 px-3 py-1 rounded">Remove</button></td></tr>))}
      </tbody></table></div>
    </div></div>
  );
};
export default AdminCommunityPosts;