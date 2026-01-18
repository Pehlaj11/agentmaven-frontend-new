import { motion } from "framer-motion";
import { BrainCircuit, CheckCircle, TrendingUp, Calendar, Tag } from "lucide-react";

const ArticleCard = ({ article }) => {
  // Format the date properly
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return "N/A";
    }
  };

  // Get the last updated date from either updatedAt or updated_at
  const lastUpdated = article.updatedAt || article.updated_at || article.lastUpdated;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="border-b dark:border-gray-700 pb-4 last:border-b-0"
    >
      <h4 className="font-bold text-md text-gray-800 dark:text-white mb-1 hover:text-blue-600 cursor-pointer">
        {article.title || "Untitled Article"}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
        {article.content || "No content available"}
      </p>

      {/* Performance metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
          <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
            <BrainCircuit size={16} className="mr-2 text-purple-500" />
            <span className="text-xs font-medium">AI Access Count</span>
          </div>
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            {(article.aiAccessCount || 0).toLocaleString()}
          </p>
          <div className="flex items-center mt-1">
            <TrendingUp size={12} className="text-green-500 mr-1" />
            <span className="text-xs text-green-600 dark:text-green-400">+12% this month</span>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
          <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
            <CheckCircle size={16} className="mr-2 text-green-500" />
            <span className="text-xs font-medium">Success Rate</span>
          </div>
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            {article.successRate || 0}%
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mt-2">
            <div 
              className="bg-green-500 h-1.5 rounded-full" 
              style={{ width: `${article.successRate || 0}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
          <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
            <Calendar size={16} className="mr-2 text-blue-500" />
            <span className="text-xs font-medium">Last Updated</span>
          </div>
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            {formatDate(lastUpdated)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Recently updated</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
        <div className="flex items-center">
          <Tag size={12} className="mr-1 text-gray-400" />
          <span>
            Category:{" "}
            <span className="font-medium text-blue-500">
              {article.category || "Uncategorized"}
            </span>
          </span>
        </div>
        {article.featured && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Featured
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ArticleCard;