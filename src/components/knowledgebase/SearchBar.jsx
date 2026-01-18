import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="relative mb-6">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
    <input
      type="text"
      placeholder="Search articles used by the AI..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full bg-white dark:bg-gray-800 border border-transparent rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
    />
  </div>
);

export default SearchBar;
