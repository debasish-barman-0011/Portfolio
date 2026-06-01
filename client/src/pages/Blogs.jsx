import { useEffect, useState } from 'react';
import api from '../utils/api';
import FilterBar from '../components/FilterBar';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('latest');
  const [search, setSearch] = useState('');
  useEffect(() => {
    api.get('/api/blogs/all').then(res => setBlogs(res.data)).catch(console.error);
  }, []);
  let filtered = [...blogs];
  if (search) filtered = filtered.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.tagline.toLowerCase().includes(search.toLowerCase()));
  if (filter === 'latest') filtered.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (filter === 'oldest') filtered.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
  if (filter === 'shuffle') filtered.sort(() => 0.5 - Math.random());
  return (
    <div className="p-8">
      <FilterBar filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} placeholder="Search by title/tagline" />
      <div className="space-y-8">
        {filtered.map(blog => (
          <div key={blog._id} className="flex flex-col md:flex-row gap-6 bg-[#262626] p-4 rounded">
            <img src={blog.bannerUrl} className="md:w-1/3 rounded object-cover h-48" onError={(e)=>e.target.src='/assets/placeholder.jpg'} />
            <div><h2 className="text-2xl">{blog.title}</h2><p className="text-gray-400">{blog.tagline}</p><p className="mt-2">{blog.description.substring(0,200)}...</p></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Blogs;