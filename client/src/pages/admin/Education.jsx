import { useEffect, useState } from 'react';
import api from '../../utils/api';
import AdminNavbar from '../../components/AdminNavbar';
import Swal from 'sweetalert2';

const AdminEducation = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ level: 'Undergraduate', year: '', institute: '', description: '', bannerUrl: '' });
  const fetchItems = async () => { const res = await api.get('/api/education'); setItems(res.data); };
  useEffect(() => { fetchItems(); }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/api/education', form);
    Swal.fire('Added', 'Education entry added', 'success');
    fetchItems();
    setForm({ level: 'Undergraduate', year: '', institute: '', description: '', bannerUrl: '' });
  };
  const handleDelete = async (id) => {
    if (await Swal.fire({ title: 'Confirm', text: 'Delete?', icon: 'warning', showCancelButton: true }).then(r => r.isConfirmed)) {
      await api.delete(`/api/education/${id}`);
      fetchItems();
    }
  };
  return (
    <div><AdminNavbar /><div className="p-8"><h1 className="text-3xl mb-6">Manage Education</h1>
      <form onSubmit={handleSubmit} className="bg-[#262626] p-6 rounded mb-8 space-y-4">
        <select className="w-full p-2 bg-black rounded" value={form.level} onChange={e => setForm({...form, level: e.target.value})}><option>School</option><option>Higher Secondary</option><option>Undergraduate</option><option>Postgraduate</option><option>Certification</option></select>
        <input type="text" placeholder="Year (e.g., 2022-2025)" className="w-full p-2 bg-black rounded" value={form.year} onChange={e => setForm({...form, year: e.target.value})} required />
        <input type="text" placeholder="Institute Name" className="w-full p-2 bg-black rounded" value={form.institute} onChange={e => setForm({...form, institute: e.target.value})} required />
        <textarea placeholder="Description" className="w-full p-2 bg-black rounded" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
        <input type="url" placeholder="Institute Image URL" className="w-full p-2 bg-black rounded" value={form.bannerUrl} onChange={e => setForm({...form, bannerUrl: e.target.value})} required />
        <button type="submit" className="bg-[#ff004f] px-6 py-2 rounded">Add Entry</button>
      </form>
      <div className="overflow-x-auto"><table className="w-full bg-[#262626] rounded"><thead><tr><th>Level</th><th>Institute</th><th>Year</th><th>Actions</th></tr></thead><tbody>
        {items.map(i => (<tr key={i._id}><td>{i.level}</td><td>{i.institute}</td><td>{i.year}</td><td><button onClick={() => handleDelete(i._id)} className="bg-red-600 px-3 py-1 rounded">Delete</button></td></tr>))}
      </tbody></table></div>
    </div></div>
  );
};
export default AdminEducation;