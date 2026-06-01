import { useEffect, useState } from 'react';
import api from '../../utils/api';
import AdminNavbar from '../../components/AdminNavbar';
import Swal from 'sweetalert2';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', url: '', description: '', sequence: 0, isActive: true, bannerUrl: '' });
  const fetchProjects = async () => { const res = await api.get('/api/projects/admin'); setProjects(res.data); };
  useEffect(() => { fetchProjects(); }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/api/projects', form);
    Swal.fire('Added', 'Project added', 'success');
    fetchProjects();
    setForm({ title: '', url: '', description: '', sequence: 0, isActive: true, bannerUrl: '' });
  };
  const handleDelete = async (id) => {
    if (await Swal.fire({ title: 'Confirm', text: 'Delete?', icon: 'warning', showCancelButton: true }).then(r => r.isConfirmed)) {
      await api.delete(`/api/projects/${id}`);
      fetchProjects();
    }
  };
  const handleUpdate = async (id, updates) => {
    await api.patch(`/api/projects/${id}`, updates);
    fetchProjects();
  };
  return (
    <div><AdminNavbar /><div className="p-8"><h1 className="text-3xl mb-6">Manage Projects</h1>
      <form onSubmit={handleSubmit} className="bg-[#262626] p-6 rounded mb-8 space-y-4">
        <input type="text" placeholder="Title" className="w-full p-2 bg-black rounded" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <input type="url" placeholder="Project URL" className="w-full p-2 bg-black rounded" value={form.url} onChange={e => setForm({...form, url: e.target.value})} required />
        <textarea placeholder="Description (max 300)" maxLength="300" className="w-full p-2 bg-black rounded" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
        <input type="text" placeholder="Banner Image URL" className="w-full p-2 bg-black rounded" value={form.bannerUrl} onChange={e => setForm({...form, bannerUrl: e.target.value})} required />
        <input type="number" placeholder="Sequence" className="w-full p-2 bg-black rounded" value={form.sequence} onChange={e => setForm({...form, sequence: parseInt(e.target.value)})} />
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} /> Active</label>
        <button type="submit" className="bg-[#ff004f] px-6 py-2 rounded">Add Project</button>
      </form>
      <div className="overflow-x-auto"><table className="w-full bg-[#262626] rounded"><thead><tr><th>Title</th><th>URL</th><th>Active</th><th>Actions</th></tr></thead><tbody>
        {projects.map(p => (<tr key={p._id}><td><input defaultValue={p.title} onBlur={e => handleUpdate(p._id, { title: e.target.value })} className="bg-black p-1 rounded" /></td><td><input defaultValue={p.url} onBlur={e => handleUpdate(p._id, { url: e.target.value })} className="bg-black p-1 rounded" /></td><td><input type="checkbox" checked={p.isActive} onChange={e => handleUpdate(p._id, { isActive: e.target.checked })} /></td><td><button onClick={() => handleDelete(p._id)} className="bg-red-600 px-3 py-1 rounded">Delete</button></td></tr>))}
      </tbody></table></div>
    </div></div>
  );
};
export default AdminProjects;