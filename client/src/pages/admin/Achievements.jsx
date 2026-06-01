import { useEffect, useState } from 'react';
import api from '../../utils/api';
import AdminNavbar from '../../components/AdminNavbar';
import Swal from 'sweetalert2';

const AdminAchievements = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', tagline: '', description: '', bannerUrl: '' });
  const fetchItems = async () => { const res = await api.get('/api/achievements'); setItems(res.data); };
  useEffect(() => { fetchItems(); }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/api/achievements', form);
    Swal.fire('Added', 'Achievement added', 'success');
    fetchItems();
    setForm({ title: '', tagline: '', description: '', bannerUrl: '' });
  };
  const handleUpdate = async (id, updates) => { await api.patch(`/api/achievements/${id}`, updates); fetchItems(); };
  const handleDelete = async (id) => {
    if (await Swal.fire({ title: 'Confirm', text: 'Delete?', icon: 'warning', showCancelButton: true }).then(r => r.isConfirmed)) {
      await api.delete(`/api/achievements/${id}`);
      fetchItems();
    }
  };
  return (
    <div><AdminNavbar /><div className="p-8"><h1 className="text-3xl mb-6">Manage Achievements</h1>
      <form onSubmit={handleSubmit} className="bg-[#262626] p-6 rounded mb-8 space-y-4">
        <input type="text" placeholder="Title" className="w-full p-2 bg-black rounded" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <input type="text" placeholder="Tagline" className="w-full p-2 bg-black rounded" value={form.tagline} onChange={e => setForm({...form, tagline: e.target.value})} />
        <textarea placeholder="Description" className="w-full p-2 bg-black rounded" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
        <input type="url" placeholder="Banner Image URL" className="w-full p-2 bg-black rounded" value={form.bannerUrl} onChange={e => setForm({...form, bannerUrl: e.target.value})} required />
        <button type="submit" className="bg-[#ff004f] px-6 py-2 rounded">Add Achievement</button>
      </form>
      <div className="overflow-x-auto"><table className="w-full bg-[#262626] rounded"><thead><tr><th>Title</th><th>Tagline</th><th>Actions</th></tr></thead><tbody>
        {items.map(i => (<tr key={i._id}><td><input defaultValue={i.title} onBlur={e => handleUpdate(i._id, { title: e.target.value })} className="bg-black p-1 rounded" /></td><td><input defaultValue={i.tagline} onBlur={e => handleUpdate(i._id, { tagline: e.target.value })} className="bg-black p-1 rounded" /></td><td><button onClick={() => handleDelete(i._id)} className="bg-red-600 px-3 py-1 rounded">Delete</button></td></tr>))}
      </tbody></table></div>
    </div></div>
  );
};
export default AdminAchievements;