import React from 'react';
import { MessageCircle, Clock, User, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

const ConversationItem = ({ conversation, onClick }) => {
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "Positive":
        return "text-green-500";
      case "Negative":
        return "text-red-500";
      case "Neutral":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case "Positive":
        return <ThumbsUp className="h-4 w-4" />;
      case "Negative":
        return <ThumbsDown className="h-4 w-4" />;
      case "Neutral":
        return <Minus className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md cursor-pointer"
      onClick={() => onClick(conversation)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{conversation.customerNumber}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{conversation.agentName}</p>
        </div>
        <div className={`flex items-center ${getSentimentColor(conversation.sentiment)}`}>
          {getSentimentIcon(conversation.sentiment)}
          <span className="text-xs ml-1">{conversation.sentiment}</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-700 dark:text-gray-300 mt-3 line-clamp-2">
        {conversation.lastMessage}
      </p>
      
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3 w-3 mr-1" />
          {conversation.timestamp}
        </div>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <User className="h-3 w-3 mr-1" />
          {conversation.duration}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;