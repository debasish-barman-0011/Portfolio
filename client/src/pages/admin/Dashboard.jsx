import { useEffect, useState } from 'react';
import api from '../../utils/api';
import AdminNavbar from '../../components/AdminNavbar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  useEffect(() => {
    api.get('/api/stats').then(res => setStats(res.data)).catch(console.error);
  }, []);
  const pieData = [
    { name: 'Projects', value: stats.projectCount || 0 },
    { name: 'Education', value: stats.educationCount || 0 },
    { name: 'Achievements', value: stats.achievementCount || 0 },
    { name: 'Certificates', value: stats.certificateCount || 0 }
  ];
  const COLORS = ['#ff004f', '#04aa6d', '#3f51b5', '#ffa500'];
  return (
    <div><AdminNavbar /><div className="p-8">
      <h1 className="text-3xl mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#262626] p-4 rounded text-center"><div className="text-2xl">{stats.projectCount || 0}</div><div>Projects</div></div>
        <div className="bg-[#262626] p-4 rounded text-center"><div className="text-2xl">{stats.educationCount || 0}</div><div>Education</div></div>
        <div className="bg-[#262626] p-4 rounded text-center"><div className="text-2xl">{stats.achievementCount || 0}</div><div>Achievements</div></div>
        <div className="bg-[#262626] p-4 rounded text-center"><div className="text-2xl">{stats.certificateCount || 0}</div><div>Certificates</div></div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 bg-[#262626] p-4 rounded"><h3 className="text-xl mb-4">Content Distribution</h3><PieChart width={300} height={300}><Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>{pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}</Pie><Tooltip /></PieChart></div>
        <div className="md:w-1/2 bg-[#262626] p-4 rounded"><h3 className="text-xl mb-4">Login Frequency (last 7 days)</h3><BarChart width={400} height={300} data={stats.loginFrequency || []}><XAxis dataKey="_id" /><YAxis /><Tooltip /><Bar dataKey="count" fill="#ff004f" /></BarChart></div>
      </div>
      <div className="mt-8 bg-[#262626] p-4 rounded"><h3 className="text-xl mb-2">Total Visits: {stats.totalVisits || 0}</h3></div>
    </div></div>
  );
};
export default Dashboard;