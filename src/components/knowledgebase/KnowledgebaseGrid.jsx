import React, { useState } from 'react';
import KnowledgebaseCard from '../../components/dashboard/KnowledgebaseCard';
import SearchInput from '../../components/shared/SearchInput';
import FilterDropdown from '../../components/shared/FilterDropdown';
import FilterOption from '../../components/shared/FilterOption';
import { knowledgebaseData } from '../../api/mockData';

const KnowledgebaseGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    featured: ''
  });

  // Filter articles based on search and filters
  const filteredArticles = knowledgebaseData.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filters.category || article.category === filters.category;
    const matchesFeatured = filters.featured === '' || 
                           (filters.featured === 'true' && article.featured) || 
                           (filters.featured === 'false' && !article.featured);
    
    return matchesSearch && matchesCategory && matchesFeatured;
  });

  // Get unique categories for filter dropdown
  const categories = [...new Set(knowledgebaseData.map(article => article.category))];

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      featured: ''
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      {/* Header with search and filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Knowledge Base</h2>
        
        <div className="flex flex-wrap gap-3">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search articles..."
            className="w-64"
          />
          
          <FilterDropdown
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={clearFilters}
          >
            <FilterOption
              label="Category"
              type="select"
              value={filters.category}
              onChange={(value) => handleFilterChange('category', value)}
              options={["", ...categories]}
            />
            <FilterOption
              label="Featured"
              type="select"
              value={filters.featured}
              onChange={(value) => handleFilterChange('featured', value)}
              options={["", "true", "false"]}
              optionLabels={["All", "Featured", "Not Featured"]}
            />
          </FilterDropdown>
        </div>
      </div>
      
      {/* Articles grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <KnowledgebaseCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No articles found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default KnowledgebaseGrid;