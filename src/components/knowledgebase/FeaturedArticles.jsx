import { Star } from "lucide-react";
import { motion } from "framer-motion";

const FeaturedArticles = ({ featured }) => (
  <>
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
      <Star className="h-5 w-5 mr-2 text-yellow-400" />
      Featured Articles
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {featured.map((article) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        >
          <h4 className="font-bold text-md text-blue-600 dark:text-blue-400 mb-2">
            {article.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {article.content}
          </p>
        </motion.div>
      ))}
    </div>
  </>
);

export default FeaturedArticles;
