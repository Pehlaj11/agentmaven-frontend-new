import React from 'react';
import { BookOpen, Star, TrendingUp } from 'lucide-react';

const KnowledgebaseCard = ({ article }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">{article.title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{article.category}</p>
        </div>
        {article.featured && (
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
        )}
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-2">
        {article.content}
      </p>
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Updated: {new Date(article.lastUpdated).toLocaleDateString()}
        </span>
        
        <div className="flex items-center">
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          <span className="text-xs font-medium text-green-600 dark:text-green-400">
            {article.successRate}%
          </span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">AI Access</span>
          <span className="text-xs font-medium text-gray-900 dark:text-white">
            {article.aiAccessCount}
          </span>
        </div>
        <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <div 
            className="bg-blue-500 h-1.5 rounded-full" 
            style={{ width: `${Math.min(100, article.aiAccessCount / 50)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgebaseCard;