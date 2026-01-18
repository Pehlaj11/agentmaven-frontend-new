const CategorySidebar = ({ categories, selectedCategory, setSelectedCategory }) => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md mb-6">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
      Categories
    </h3>
    <ul className="space-y-2">
      {categories.map((category) => (
        <li key={category}>
          <button
            onClick={() => setSelectedCategory(category)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
              selectedCategory === category
                ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default CategorySidebar;
