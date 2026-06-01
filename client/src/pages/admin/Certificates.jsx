import { useEffect, useState } from 'react';
import api from '../../utils/api';
import AdminNavbar from '../../components/AdminNavbar';
import Swal from 'sweetalert2';

const AdminCertificates = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', issuer: '', description: '', imageUrl: '' });
  const fetchItems = async () => { const res = await api.get('/api/certificates'); setItems(res.data); };
  useEffect(() => { fetchItems(); }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/api/certificates', form);
    Swal.fire('Added', 'Certificate added', 'success');
    fetchItems();
    setForm({ title: '', issuer: '', description: '', imageUrl: '' });
  };
  const handleUpdate = async (id, updates) => { await api.patch(`/api/certificates/${id}`, updates); fetchItems(); };
  const handleDelete = async (id) => {
    if (await Swal.fire({ title: 'Confirm', text: 'Delete?', icon: 'warning', showCancelButton: true }).then(r => r.isConfirmed)) {
      await api.delete(`/api/certificates/${id}`);
      fetchItems();
    }
  };
  return (
    <div><AdminNavbar /><div className="p-8"><h1 className="text-3xl mb-6">Manage Certificates</h1>
      <form onSubmit={handleSubmit} className="bg-[#262626] p-6 rounded mb-8 space-y-4">
        <input type="text" placeholder="Title" className="w-full p-2 bg-black rounded" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <input type="text" placeholder="Issuer" className="w-full p-2 bg-black rounded" value={form.issuer} onChange={e => setForm({...form, issuer: e.target.value})} required />
        <textarea placeholder="Description" className="w-full p-2 bg-black rounded" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
        <input type="url" placeholder="Certificate Image URL (JPG)" className="w-full p-2 bg-black rounded" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} required />
        <button type="submit" className="bg-[#ff004f] px-6 py-2 rounded">Add Certificate</button>
      </form>
      <div className="overflow-x-auto"><table className="w-full bg-[#262626] rounded"><thead><tr><th>Title</th><th>Issuer</th><th>Actions</th></tr></thead><tbody>
        {items.map(i => (<tr key={i._id}><td><input defaultValue={i.title} onBlur={e => handleUpdate(i._id, { title: e.target.value })} className="bg-black p-1 rounded" /></td><td><input defaultValue={i.issuer} onBlur={e => handleUpdate(i._id, { issuer: e.target.value })} className="bg-black p-1 rounded" /></td><td><button onClick={() => handleDelete(i._id)} className="bg-red-600 px-3 py-1 rounded">Delete</button></td></tr>))}
      </tbody></table></div>
    </div></div>
  );
};
export default AdminCertificates;