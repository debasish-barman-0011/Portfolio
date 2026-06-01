const SearchBar = ({ value, onChange, placeholder }) => {
  return <input type="text" placeholder={placeholder} className="bg-[#262626] p-2 rounded w-full" value={value} onChange={e => onChange(e.target.value)} />;
};
export default SearchBar;