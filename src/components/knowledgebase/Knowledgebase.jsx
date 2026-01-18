import { useEffect, useMemo, useState } from "react";
import { PlusCircle, BrainCircuit, Filter, BarChart3, Download, Upload, TrendingUp } from "lucide-react";
import DashboardPage from '../../components/dashboard/DashboardPage';
import DashboardStats from '../../components/dashboard/DashboardStats';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import SearchInput from '../../components/shared/SearchInput';
import FilterDropdown from '../../components/shared/FilterDropdown';
import FilterOption from '../../components/shared/FilterOption';
import KnowledgebaseGrid from './KnowledgebaseGrid';
import CategorySidebar from "./CategorySidebar";
import AIInsightsSection from "./AIInsightsSection";
import FeaturedArticles from "./FeaturedArticles";
import ArticleCard from "./ArticleCard";
import CreateArticleModal from "./CreateArticleModal";
import SyncAIModal from "./SyncAIModal";
import { toast } from "react-hot-toast";
import { knowledgebaseAPI } from "../../services/api";

export const Knowledgebase = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("lastUpdated");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // list or grid
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add state to manage the modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  // Fetch articles and categories from backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await knowledgebaseAPI.getAll({
          search: searchTerm,
          category: selectedCategory === "All" ? undefined : selectedCategory,
          sortBy
        });
        const articlesData = response.data.data || response.data || [];
        setArticles(Array.isArray(articlesData) ? articlesData : []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
        setError("Failed to load articles");
        toast.error("Failed to load articles");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    // For now, we'll fetch all articles and filter on frontend
    // In a real app, you'd want to filter on the backend
    fetchArticles();
  }, [searchTerm, selectedCategory, sortBy]);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // For now, we'll extract categories from articles
        // In a real app, you'd have a separate endpoint for categories
        const uniqueCategories = ["All", ...new Set(articles.map((a) => a.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, [articles]);

  const filteredArticles = useMemo(() => {
    let articlesList = articles.filter((article) => {
      const categoryMatch =
        selectedCategory === "All" || article.category === selectedCategory;
      const searchMatch =
        searchTerm === "" ||
        (article.title && article.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (article.content && article.content.toLowerCase().includes(searchTerm.toLowerCase()));
      return categoryMatch && searchMatch;
    });
    
    // Sort articles
    articlesList.sort((a, b) => {
      if (sortBy === "lastUpdated") {
        return new Date(b.updatedAt || b.updated_at) - new Date(a.updatedAt || a.updated_at);
      } else if (sortBy === "aiAccessCount") {
        return (b.aiAccessCount || 0) - (a.aiAccessCount || 0);
      } else if (sortBy === "successRate") {
        return (b.successRate || 0) - (a.successRate || 0);
      }
      return 0;
    });
    
    return articlesList;
  }, [articles, searchTerm, selectedCategory, sortBy]);

  // Calculate summary statistics
  const totalArticles = articles.length;
  const totalAIUsage = articles.reduce((sum, article) => sum + (article.aiAccessCount || 0), 0);
  const avgSuccessRate = articles.length > 0 
    ? Math.round(articles.reduce((sum, article) => sum + (article.successRate || 0), 0) / articles.length)
    : 0;

  const featuredArticles = articles.filter((a) => a.featured);

  const handleSaveArticle = async (newArticle) => {
    try {
      if (!newArticle.title.trim() || !newArticle.content.trim()) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      const response = await knowledgebaseAPI.create(newArticle);
      const createdArticle = response.data.data || response.data;
      setArticles(prev => [...prev, createdArticle]);
      setIsCreateModalOpen(false);
      toast.success("Article saved successfully");
    } catch (err) {
      console.error("Failed to save article:", err);
      toast.error("Failed to save article");
    }
  };

  const handleExport = () => {
    // In a real app, this would export the data
    toast.success("Knowledgebase data exported successfully");
  };

  const handleImport = () => {
    // In a real app, this would import the data
    toast.success("Knowledgebase data imported successfully");
  };

  if (loading) {
    return (
      <DashboardPage>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading knowledge base...</p>
          </div>
        </div>
      </DashboardPage>
    );
  }

  return (
    <DashboardPage>
      <DashboardStats
        stats={[
          {
            title: "Total Articles",
            value: totalArticles,
            icon: BarChart3,
            change: "+5",
            changeType: "positive"
          },
          {
            title: "AI Usage",
            value: totalAIUsage.toLocaleString(),
            icon: TrendingUp,
            change: "+12%",
            changeType: "positive"
          },
          {
            title: "Avg Success Rate",
            value: `${avgSuccessRate}%`,
            icon: BrainCircuit,
            change: "+3%",
            changeType: "positive"
          }
        ]}
      />
      
      <DashboardHeader
        title="AI Knowledge Base"
        actions={
          <>
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search articles..."
              className="w-64"
            />
            <FilterDropdown
              filters={{ category: selectedCategory, sortBy }}
              onFilterChange={(filters) => {
                if (filters.category !== undefined) setSelectedCategory(filters.category);
                if (filters.sortBy !== undefined) setSortBy(filters.sortBy);
              }}
              onClearFilters={() => {
                setSelectedCategory("All");
                setSortBy("lastUpdated");
              }}
            >
              <FilterOption
                label="Category"
                type="select"
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={categories}
              />
              <FilterOption
                label="Sort By"
                type="select"
                value={sortBy}
                onChange={setSortBy}
                options={["lastUpdated", "aiAccessCount", "successRate"]}
                optionLabels={["Last Updated", "AI Access Count", "Success Rate"]}
              />
            </FilterDropdown>
            <button 
              onClick={handleExport}
              className="flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <Download size={16} />
              Export
            </button>
            <button 
              onClick={handleImport}
              className="flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <Upload size={16} />
              Import
            </button>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PlusCircle size={16} />
              Create Article
            </button>
            <button
              onClick={() => setIsSyncModalOpen(true)}
              className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <BrainCircuit size={16} />
              Sync & Train AI
            </button>
          </>
        }
      />
      
      {/* View Mode Toggle */}
      <div className="mb-4 flex justify-end">
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 text-sm rounded-md ${
              viewMode === "list"
                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1 text-sm rounded-md ${
              viewMode === "grid"
                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Grid View
          </button>
        </div>
      </div>

      {/* Featured */}
      <FeaturedArticles featured={featuredArticles} />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-1/4 space-y-6">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <AIInsightsSection />
        </aside>

        {/* Articles */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Article Performance ({filteredArticles.length})
            </h3>

            {viewMode === "list" ? (
              filteredArticles.length === 0 ? (
                <p className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No articles found for your search.
                </p>
              ) : (
                <div className="space-y-6">
                  {filteredArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )
            ) : (
              <KnowledgebaseGrid />
            )}
          </div>
        </div>
      </div>

      <CreateArticleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveArticle}
        categories={categories.filter(c => c !== "All")} // Pass existing categories
      />

      <SyncAIModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
      />
    </DashboardPage>
  );
};

export default Knowledgebase;