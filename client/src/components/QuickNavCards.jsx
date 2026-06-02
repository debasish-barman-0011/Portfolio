import { Link } from 'react-router-dom';

const QuickNavCards = () => {
  const items = [
    { name: 'Education', path: '/education', icon: '🎓' },
    { name: 'Certificates', path: '/certificates', icon: '📜' },
    { name: 'Highlights', path: '/achievements', icon: '🏆' },
    { name: 'Community', path: '/community', icon: '👥' }
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-[#262626]">
      {items.map(item => (
        <Link key={item.name} to={item.path} className="bg-black p-4 rounded-xl text-center hover:scale-105 transition">
          <div className="text-4xl">{item.icon}</div>
          <h3 className="text-xl mt-2">{item.name}</h3>
        </Link>
      ))}
    </div>
  );
};
export default QuickNavCards;