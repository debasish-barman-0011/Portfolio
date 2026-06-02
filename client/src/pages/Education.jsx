import { useEffect, useState } from 'react';
import api from '../utils/api';

const Education = () => {
  const [educations, setEducations] = useState([]);
  useEffect(() => {
    api.get('/api/education').then(res => setEducations(res.data)).catch(console.error);
  }, []);
  return (
    <div className="p-8 space-y-8">
      {educations.map(edu => (
        <div key={edu._id} className="flex flex-col md:flex-row gap-6 bg-[#262626] p-4 rounded-xl">
          <img src={edu.bannerUrl} className="md:w-1/3 rounded object-cover h-48" onError={(e)=>e.target.src='/assets/placeholder2.jpg'} />
          <div><h2 className="text-2xl">{edu.institute}</h2><p className="text-[#04aa6d]">{edu.level} | {edu.year}</p><p className="mt-2">{edu.description}</p></div>
        </div>
      ))}
    </div>
  );
};
export default Education;