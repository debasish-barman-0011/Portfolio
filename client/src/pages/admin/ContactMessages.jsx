import { useEffect, useState } from 'react';
import api from '../../utils/api';
import AdminNavbar from '../../components/AdminNavbar';
import Swal from 'sweetalert2';

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState('');

  const fetchMessages = async () => {
    const res = await api.get('/api/contact');
    setMessages(res.data);
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id) => {
    if (await Swal.fire({ title: 'Confirm', text: 'Delete this message?', icon: 'warning', showCancelButton: true }).then(r => r.isConfirmed)) {
      await api.delete(`/api/contact/${id}`);
      fetchMessages();
      Swal.fire('Deleted', 'Message removed', 'success');
    }
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div><AdminNavbar /><div className="p-8">
      <h1 className="text-3xl mb-6">Contact Form Messages</h1>
      <input type="text" placeholder="Search by name, email or message..." className="w-full p-3 bg-[#262626] rounded mb-6" value={search} onChange={e => setSearch(e.target.value)} />
      <div className="overflow-x-auto">
        <table className="w-full bg-[#262626] rounded">
          <thead><tr className="border-b border-gray-700"><th className="p-3 text-left">Name</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Message</th><th className="p-3 text-left">Date</th><th className="p-3 text-left">Actions</th></tr></thead>
          <tbody>
            {filteredMessages.map(m => (
              <tr key={m._id} className="border-b border-gray-700">
                <td className="p-3">{m.name}</td>
                <td className="p-3">{m.email}</td>
                <td className="p-3 max-w-md truncate">{m.message}</td>
                <td className="p-3">{new Date(m.createdAt).toLocaleString()}</td>
                <td className="p-3"><button onClick={() => handleDelete(m._id)} className="bg-red-600 px-3 py-1 rounded">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredMessages.length === 0 && <p className="text-center text-gray-400 mt-6">No messages found</p>}
      </div>
    </div></div>
  );
};
export default AdminContactMessages;