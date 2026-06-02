import { useEffect, useState } from 'react';
import api from '../../utils/api';
import AdminNavbar from '../../components/AdminNavbar';
import Swal from 'sweetalert2';

const AdminResumeDownloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [search, setSearch] = useState('');

  const fetchDownloads = async () => {
    const res = await api.get('/api/resume/logs');
    setDownloads(res.data);
  };

  useEffect(() => { fetchDownloads(); }, []);

  const handleDelete = async (id) => {
    if (await Swal.fire({ title: 'Confirm', text: 'Delete this download record?', icon: 'warning', showCancelButton: true }).then(r => r.isConfirmed)) {
      await api.delete(`/api/resume/logs/${id}`);
      fetchDownloads();
      Swal.fire('Deleted', 'Record removed', 'success');
    }
  };

  const filteredDownloads = downloads.filter(d => 
    d.fullName.toLowerCase().includes(search.toLowerCase()) ||
    d.mobile.includes(search) ||
    d.purpose.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div><AdminNavbar /><div className="p-8">
      <h1 className="text-3xl mb-6">Resume Download Logs</h1>
      <input type="text" placeholder="Search by name, mobile or purpose..." className="w-full p-3 bg-[#262626] rounded mb-6" value={search} onChange={e => setSearch(e.target.value)} />
      <div className="overflow-x-auto">
        <table className="w-full bg-[#262626] rounded">
          <thead><tr className="border-b border-gray-700"><th className="p-3 text-left">Name</th><th className="p-3 text-left">Mobile</th><th className="p-3 text-left">Purpose</th><th className="p-3 text-left">IP Address</th><th className="p-3 text-left">Date</th><th className="p-3 text-left">Actions</th></tr></thead>
          <tbody>
            {filteredDownloads.map(d => (
              <tr key={d._id} className="border-b border-gray-700">
                <td className="p-3">{d.fullName}</td>
                <td className="p-3">{d.mobile}</td>
                <td className="p-3">{d.purpose}</td>
                <td className="p-3">{d.ip}</td>
                <td className="p-3">{new Date(d.createdAt).toLocaleString()}</td>
                <td className="p-3"><button onClick={() => handleDelete(d._id)} className="bg-red-600 px-3 py-1 rounded">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredDownloads.length === 0 && <p className="text-center text-gray-400 mt-6">No downloads recorded</p>}
      </div>
    </div></div>
  );
};
export default AdminResumeDownloads;