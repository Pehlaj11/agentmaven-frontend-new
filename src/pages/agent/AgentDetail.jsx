import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Play, Pause, Phone, MessageSquare, BarChart3 } from "lucide-react";
import { agentsData } from "../../api/mockData";
import FormInput from "../../components/shared/FormInput";
import FormSelect from "../../components/shared/FormSelect";
import FormTextarea from "../../components/shared/FormTextarea";
import FormButton from "../../components/shared/FormButton";
import { toast } from "react-hot-toast";

const AgentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the agent by ID or use the first agent as fallback
  const agent = agentsData.find(a => a.id === id) || agentsData[0];
  
  const [agentConfig, setAgentConfig] = useState({
    name: agent?.name || "",
    modelType: agent?.modelType || "gpt-4",
    personality: agent?.personality || "Professional",
    tone: agent?.tone || "Friendly",
    language: agent?.language || "English",
    description: agent?.description || "",
    maxTokens: agent?.maxTokens || 1000,
    temperature: agent?.temperature || 0.7,
    topP: agent?.topP || 0.9,
    frequencyPenalty: agent?.frequencyPenalty || 0,
    presencePenalty: agent?.presencePenalty || 0,
    customInstructions: agent?.customInstructions || "",
    callObjective: agent?.callObjective || "General Support",
    callStrategy: agent?.callStrategy || "Problem Resolution",
    escalationThreshold: agent?.escalationThreshold || 80,
    useKnowledgeBase: agent?.useKnowledgeBase !== undefined ? agent?.useKnowledgeBase : true,
    callScript: agent?.callScript || ""
  });

  const handleInputChange = (field, value) => {
    setAgentConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // console.log("Saving agent configuration:", agentConfig);
    toast.success("Agent configuration saved successfully");
    navigate('/agents');
  };

  if (!agent) {
    return (
      <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <p className="text-gray-600 dark:text-gray-400">Agent not found.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Agents
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center">
            <img 
              src={agent.avatar} 
              alt={agent.name} 
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{agent.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">{agent.description || "General Support Agent"}</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800/50">
              <Play size={16} className="mr-2" />
              Activate
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50">
              <Phone size={16} className="mr-2" />
              Test Call
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
            <p className="font-semibold text-gray-900 dark:text-white">{agent.status}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Calls</p>
            <p className="font-semibold text-gray-900 dark:text-white">{agent.totalCalls}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Success Rate</p>
            <p className="font-semibold text-gray-900 dark:text-white">{agent.successRate}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Agent Configuration</h2>
          <FormButton onClick={handleSave}>
            <Save size={16} className="mr-2" />
            Save Changes
          </FormButton>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <MessageSquare className="mr-2" size={18} />
              Basic Configuration
            </h3>
            
            <div className="space-y-4">
              <FormInput
                label="Agent Name"
                type="text"
                value={agentConfig.name}
                onChange={(value) => handleInputChange('name', value)}
              />
              
              <FormTextarea
                label="Description"
                value={agentConfig.description}
                onChange={(value) => handleInputChange('description', value)}
                rows={2}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormSelect
                  label="Model Type"
                  value={agentConfig.modelType}
                  onChange={(value) => handleInputChange('modelType', value)}
                  options={["gpt-4", "gpt-3.5", "claude", "llama"]}
                />
                
                <FormSelect
                  label="Language"
                  value={agentConfig.language}
                  onChange={(value) => handleInputChange('language', value)}
                  options={["English", "Spanish", "French", "German", "Japanese"]}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormSelect
                  label="Personality"
                  value={agentConfig.personality}
                  onChange={(value) => handleInputChange('personality', value)}
                  options={["Professional", "Friendly", "Casual", "Formal"]}
                />
                
                <FormSelect
                  label="Tone"
                  value={agentConfig.tone}
                  onChange={(value) => handleInputChange('tone', value)}
                  options={["Friendly", "Authoritative", "Empathetic", "Neutral"]}
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <BarChart3 className="mr-2" size={18} />
              Advanced Settings
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Max Tokens"
                  type="number"
                  value={agentConfig.maxTokens}
                  onChange={(value) => handleInputChange('maxTokens', parseInt(value))}
                />
                
                <FormInput
                  label="Temperature"
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={agentConfig.temperature}
                  onChange={(value) => handleInputChange('temperature', parseFloat(value))}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Top P"
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={agentConfig.topP}
                  onChange={(value) => handleInputChange('topP', parseFloat(value))}
                />
                
                <FormInput
                  label="Escalation Threshold (%)"
                  type="number"
                  min="0"
                  max="100"
                  value={agentConfig.escalationThreshold}
                  onChange={(value) => handleInputChange('escalationThreshold', parseInt(value))}
                />
              </div>
              
              <FormTextarea
                label="Custom Instructions"
                value={agentConfig.customInstructions}
                onChange={(value) => handleInputChange('customInstructions', value)}
                rows={2}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Phone className="mr-2" size={18} />
            Call Script
          </h3>
          <FormTextarea
            value={agentConfig.callScript}
            onChange={(value) => handleInputChange('callScript', value)}
            placeholder="Define the agent's conversation script and behavior"
            rows={4}
          />
        </div>
      </div>
    </main>
  );
};

export default AgentDetail;
