const FilterBar = ({ filter, setFilter, search, setSearch, placeholder = "Search..." }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <input type="text" placeholder={placeholder} className="bg-[#262626] p-2 rounded flex-1" value={search} onChange={e => setSearch(e.target.value)} />
      <select className="bg-[#262626] p-2 rounded" value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="latest">Latest First</option><option value="oldest">Oldest First</option><option value="shuffle">Shuffle</option>
      </select>
    </div>
  );
};
export default FilterBar;