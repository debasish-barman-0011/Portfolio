import { useEffect, useState } from 'react';
import api from '../utils/api';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import FilterBar from '../components/FilterBar';

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [filter, setFilter] = useState('latest');
  const [search, setSearch] = useState('');
  useEffect(() => {
    api.get('/api/certificates').then(res => setCerts(res.data)).catch(console.error);
  }, []);
  const downloadPDF = (imageUrl, title) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;
    img.onload = () => { const pdf = new jsPDF('landscape'); pdf.addImage(img, 'JPEG', 10, 10, 280, 190); pdf.save(`${title}.pdf`); Swal.fire('Downloaded', 'Certificate saved', 'success'); };
    img.onerror = () => Swal.fire('Error', 'Could not load image', 'error');
  };
  let filtered = [...certs];
  if (search) filtered = filtered.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.issuer.toLowerCase().includes(search.toLowerCase()));
  if (filter === 'latest') filtered.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (filter === 'oldest') filtered.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
  if (filter === 'shuffle') filtered.sort(() => 0.5 - Math.random());
  return (
    <div className="p-8">
      <FilterBar filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} placeholder="Search by title/issuer" />
      <div className="space-y-8">
        {filtered.map(cert => (
          <div key={cert._id} className="flex flex-col md:flex-row gap-6 bg-[#262626] p-4 rounded-xl">
            <img src={cert.imageUrl} className="md:w-1/3 rounded object-cover h-48" onError={(e)=>e.target.src='/assets/placeholder2.jpg'} />
            <div className="flex-1"><h2 className="text-2xl">{cert.title}</h2><p className="text-[#04aa6d]">{cert.issuer}</p><p className="mt-2">{cert.description}</p><button onClick={() => downloadPDF(cert.imageUrl, cert.title)} className="mt-3 bg-[#ff004f] px-4 py-1 rounded">Download PDF</button></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Certificates;