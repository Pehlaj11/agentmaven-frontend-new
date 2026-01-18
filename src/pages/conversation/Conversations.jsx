import React, { useState } from "react";
import { Download, Search, Filter, MessageCircle, ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { conversationsData } from "../../api/mockData";
import DashboardPage from "../../components/dashboard/DashboardPage";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import SearchInput from "../../components/shared/SearchInput";
import FilterDropdown from "../../components/shared/FilterDropdown";
import FilterOption from "../../components/shared/FilterOption";
import { toast } from "react-hot-toast";

export const Conversations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    agent: "",
    sentiment: "",
    dateRange: ""
  });
  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      agent: "",
      sentiment: "",
      dateRange: ""
    });
  };

  const handleExport = (conversation) => {
    // console.log("Exporting conversation:", conversation.id);
    toast.success(`Conversation ${conversation.id} exported successfully`);
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case "Positive": return <ThumbsUp className="h-4 w-4 text-green-500" />;
      case "Negative": return <ThumbsDown className="h-4 w-4 text-red-500" />;
      case "Neutral": return <Minus className="h-4 w-4 text-yellow-500" />;
      default: return <MessageCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "Positive": return "text-green-500";
      case "Negative": return "text-red-500";
      case "Neutral": return "text-yellow-500";
      default: return "text-gray-500";
    }
  };

  // Filter conversations based on search and filters
  const filteredConversations = conversationsData.filter(conversation => {
    const matchesSearch = conversation.customerNumber.includes(searchTerm) || 
                         conversation.agentName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAgent = !filters.agent || conversation.agentName === filters.agent;
    const matchesSentiment = !filters.sentiment || conversation.sentiment === filters.sentiment;
    
    return matchesSearch && matchesAgent && matchesSentiment;
  });

  // Get unique agents for filter dropdown
  const uniqueAgents = [...new Set(conversationsData.map(c => c.agentName))];

  return (
    <DashboardPage>
      <DashboardHeader
        title="Conversations"
        actions={
          <>
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search conversations..."
              className="w-64"
            />
            <FilterDropdown
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={clearFilters}
            >
              <FilterOption
                label="Agent"
                type="select"
                value={filters.agent}
                onChange={(value) => handleFilterChange('agent', value)}
                options={["", ...uniqueAgents]}
              />
              <FilterOption
                label="Sentiment"
                type="select"
                value={filters.sentiment}
                onChange={(value) => handleFilterChange('sentiment', value)}
                options={["", "Positive", "Neutral", "Negative"]}
              />
              <FilterOption
                label="Date Range"
                type="select"
                value={filters.dateRange}
                onChange={(value) => handleFilterChange('dateRange', value)}
                options={["", "today", "week", "month"]}
              />
            </FilterDropdown>
            <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
              <Download size={16} />
              Export All
            </button>
          </>
        }
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation List */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Conversations ({filteredConversations.length})
          </h3>
          <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
            {filteredConversations.map(conversation => (
              <div 
                key={conversation.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedConversation?.id === conversation.id 
                    ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700" 
                    : "bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{conversation.customerNumber}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{conversation.agentName}</p>
                  </div>
                  <div className={`flex items-center ${getSentimentColor(conversation.sentiment)}`}>
                    {getSentimentIcon(conversation.sentiment)}
                    <span className="text-xs ml-1">{conversation.sentiment}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">
                  {conversation.lastMessage}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{conversation.timestamp}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExport(conversation);
                    }}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Export
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Conversation Detail */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {selectedConversation ? (
            <>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Conversation with {selectedConversation.customerNumber}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Agent: {selectedConversation.agentName} • {selectedConversation.timestamp}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className={`flex items-center ${getSentimentColor(selectedConversation.sentiment)}`}>
                    {getSentimentIcon(selectedConversation.sentiment)}
                    <span className="ml-1">{selectedConversation.sentiment}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Duration: {selectedConversation.duration}</span>
                  <span className="text-gray-600 dark:text-gray-400">ID: {selectedConversation.id}</span>
                </div>
              </div>
              
              <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                {selectedConversation.transcript.map((message, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg ${
                      message.speaker === "Agent" 
                        ? "bg-blue-50 dark:bg-blue-900/20 ml-10" 
                        : "bg-gray-100 dark:bg-gray-700/50 mr-10"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className={`font-medium ${
                        message.speaker === "Agent" 
                          ? "text-blue-700 dark:text-blue-300" 
                          : "text-gray-700 dark:text-gray-300"
                      }`}>
                        {message.speaker}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {message.timestamp || `Message ${index + 1}`}
                      </span>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200">{message.text}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400">
                Select a conversation to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardPage>
  );
};