import { useEffect, useState } from 'react';
import api from '../../utils/api';
import AdminNavbar from '../../components/AdminNavbar';
import Swal from 'sweetalert2';

const AdminLocker = () => {
  const [docs, setDocs] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', fileUrl: '', fileType: 'pdf' });
  const fetchDocs = async () => {
    const res = await api.get('/api/locker', { headers: { 'X-Locker-Token': import.meta.env.VITE_LOCKER_SECRET || 'test123' } });
    setDocs(res.data);
  };
  useEffect(() => { fetchDocs(); }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/api/locker', form, { headers: { 'X-Locker-Token': import.meta.env.VITE_LOCKER_SECRET || 'test123' } });
    Swal.fire('Added', 'Document added', 'success');
    fetchDocs();
    setForm({ title: '', description: '', fileUrl: '', fileType: 'pdf' });
  };
  const handleDelete = async (id) => {
    if (await Swal.fire({ title: 'Confirm', text: 'Delete?', icon: 'warning', showCancelButton: true }).then(r => r.isConfirmed)) {
      await api.delete(`/api/locker/${id}`, { headers: { 'X-Locker-Token': import.meta.env.VITE_LOCKER_SECRET || 'test123' } });
      fetchDocs();
    }
  };
  return (
    <div><AdminNavbar /><div className="p-8">
      <h1 className="text-3xl mb-6">Secure Locker</h1>
      <form onSubmit={handleSubmit} className="bg-[#262626] p-6 rounded mb-8 space-y-4">
        <input type="text" placeholder="Title" className="w-full p-2 bg-black rounded" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <input type="text" placeholder="Description" className="w-full p-2 bg-black rounded" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        <input type="url" placeholder="File URL (Google Drive or image URL)" className="w-full p-2 bg-black rounded" value={form.fileUrl} onChange={e => setForm({...form, fileUrl: e.target.value})} required />
        <select className="w-full p-2 bg-black rounded" value={form.fileType} onChange={e => setForm({...form, fileType: e.target.value})}><option value="pdf">PDF</option><option value="jpeg">JPEG</option><option value="jpg">JPG</option></select>
        <button type="submit" className="bg-[#ff004f] px-6 py-2 rounded">Add Document</button>
      </form>
      <div className="overflow-x-auto"><table className="w-full bg-[#262626] rounded"><thead><tr><th>Title</th><th>Description</th><th>Type</th><th>Created</th><th>Actions</th></tr></thead><tbody>
        {docs.map(d => (<tr key={d._id}><td>{d.title}</td><td>{d.description}</td><td>{d.fileType}</td><td>{new Date(d.createdAt).toLocaleDateString()}</td><td><a href={d.fileUrl} target="_blank" className="bg-blue-600 px-3 py-1 rounded mr-2 inline-block">View</a><button onClick={() => handleDelete(d._id)} className="bg-red-600 px-3 py-1 rounded">Delete</button></td></tr>))}
      </tbody></table></div>
    </div></div>
  );
};
export default AdminLocker;