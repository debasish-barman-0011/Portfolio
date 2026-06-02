import { useEffect, useState } from 'react';
import api from '../utils/api';

const ProjectCarousel = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    api.get('/api/projects').then(res => setProjects(res.data)).catch(err => console.error(err));
  }, []);
  return (
    <div className="overflow-x-auto flex gap-6 p-6">
      {projects.map(p => (
        <div key={p._id} className="min-w-[280px] relative group rounded-xl overflow-hidden bg-[#262626]">
          <img src={p.bannerUrl} className="w-full h-48 object-cover" onError={(e)=>e.target.src='/assets/placeholder2.jpg'} />
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition p-4 flex flex-col justify-center items-center text-center">
            <h3 className="text-xl">{p.title}</h3>
            <p className="text-sm">{p.description.substring(0,150)}...</p>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-2 text-[#ff004f]">🔗</a>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProjectCarousel;