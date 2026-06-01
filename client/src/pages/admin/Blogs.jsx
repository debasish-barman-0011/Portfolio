import { useEffect, useState } from 'react';
import api from '../../utils/api';
import AdminNavbar from '../../components/AdminNavbar';
import Swal from 'sweetalert2';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', tagline: '', description: '', bannerUrl: '' });
  const fetchBlogs = async () => { const res = await api.get('/api/blogs/all'); setBlogs(res.data); };
  useEffect(() => { fetchBlogs(); }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/api/blogs', form);
    Swal.fire('Added', 'Blog added', 'success');
    fetchBlogs();
    setForm({ title: '', tagline: '', description: '', bannerUrl: '' });
  };
  const handleUpdate = async (id, updates) => { await api.patch(`/api/blogs/${id}`, updates); fetchBlogs(); };
  const handleDelete = async (id) => {
    if (await Swal.fire({ title: 'Confirm', text: 'Delete?', icon: 'warning', showCancelButton: true }).then(r => r.isConfirmed)) {
      await api.delete(`/api/blogs/${id}`);
      fetchBlogs();
    }
  };
  return (
    <div><AdminNavbar /><div className="p-8"><h1 className="text-3xl mb-6">Manage Blogs</h1>
      <form onSubmit={handleSubmit} className="bg-[#262626] p-6 rounded mb-8 space-y-4">
        <input type="text" placeholder="Title" className="w-full p-2 bg-black rounded" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <input type="text" placeholder="Tagline" className="w-full p-2 bg-black rounded" value={form.tagline} onChange={e => setForm({...form, tagline: e.target.value})} />
        <textarea placeholder="Description" className="w-full p-2 bg-black rounded" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
        <input type="url" placeholder="Banner Image URL" className="w-full p-2 bg-black rounded" value={form.bannerUrl} onChange={e => setForm({...form, bannerUrl: e.target.value})} required />
        <button type="submit" className="bg-[#ff004f] px-6 py-2 rounded">Add Blog</button>
      </form>
      <div className="overflow-x-auto"><table className="w-full bg-[#262626] rounded"><thead><tr><th>Title</th><th>Tagline</th><th>Created</th><th>Actions</th></tr></thead><tbody>
        {blogs.map(b => (<tr key={b._id}><td><input defaultValue={b.title} onBlur={e => handleUpdate(b._id, { title: e.target.value })} className="bg-black p-1 rounded" /></td><td><input defaultValue={b.tagline} onBlur={e => handleUpdate(b._id, { tagline: e.target.value })} className="bg-black p-1 rounded" /></td><td>{new Date(b.createdAt).toLocaleDateString()}</td><td><button onClick={() => handleDelete(b._id)} className="bg-red-600 px-3 py-1 rounded">Delete</button></td></tr>))}
      </tbody></table></div>
    </div></div>
  );
};
export default AdminBlogs;