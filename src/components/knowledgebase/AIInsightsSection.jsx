import { TrendingUp } from "lucide-react";
import { aiInsights } from "../../api/mockData";

const AIInsightsSection = () => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
      <TrendingUp size={18} className="mr-2 text-green-500" />
      AI Insights
    </h3>
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
        Knowledge Gaps Identified:
      </h4>
      <ul className="list-disc list-inside space-y-2 text-xs text-gray-500 dark:text-gray-400">
        {aiInsights.knowledgeGaps.map((gap, index) => (
          <li key={index}>{gap}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default AIInsightsSection;
