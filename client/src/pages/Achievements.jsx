import { useEffect, useState } from 'react';
import api from '../utils/api';
import FilterBar from '../components/FilterBar';

const Achievements = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('latest');
  const [search, setSearch] = useState('');
  useEffect(() => {
    api.get('/api/achievements').then(res => setItems(res.data)).catch(console.error);
  }, []);
  let filtered = [...items];
  if (search) filtered = filtered.filter(a => a.title.toLowerCase().includes(search.toLowerCase()));
  if (filter === 'latest') filtered.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (filter === 'oldest') filtered.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
  if (filter === 'shuffle') filtered.sort(() => 0.5 - Math.random());
  return (
    <div className="p-8">
      <FilterBar filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} placeholder="Search achievements" />
      <div className="space-y-8">
        {filtered.map(ach => (
          <div key={ach._id} className="flex flex-col md:flex-row gap-6 bg-[#262626] p-4 rounded-xl">
            <img src={ach.bannerUrl} className="md:w-1/3 rounded object-cover h-48" onError={(e)=>e.target.src='/assets/placeholder2.jpg'} />
            <div><h2 className="text-2xl">{ach.title}</h2><p className="text-[#ffa500]">{ach.tagline}</p><p className="mt-2">{ach.description}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Achievements;