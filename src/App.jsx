import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import CallLogs from "./pages/callLogs/CallLogs";
import { Analytics } from "./pages/analytics/Analytics";
import { ApiKeys } from "./pages/apikeys/ApiKeys";
import { SettingsPage } from "./pages/settings/SettingsPage";
import Layout from "./components/layout/Layout";
import Knowledgebase from "./components/knowledgebase/Knowledgebase";
import Dashboard from "./pages/dashboard/Dashboard";
import Agents from "./pages/agent/Agents";
import AgentDetail from "./pages/agent/AgentDetail";
import LiveCalls from "./pages/liveCalls/LiveCalls";
import { Conversations } from "./pages/conversation/Conversations";
import { UsageAndBilling } from "./pages/billing/UsageBilling";
import { SecurityPage } from "./pages/security/SecurityPage";
import { AdvancedReporting } from "./pages/analytics/AdvancedReporting";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import socketService from "./services/socket";

function App() {
  // Initialize Socket.io connection
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      socketService.connect(token);
      console.log('Socket.io connected');
    }

    return () => {
      socketService.disconnect();
      console.log('Socket.io disconnected');
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agents/:id" element={<AgentDetail />} />
          <Route path="/live-calls" element={<LiveCalls />} />
          <Route path="/call-logs" element={<CallLogs />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/advanced-reporting" element={<AdvancedReporting />} />
          <Route path="/conversations" element={<Conversations />} />
          <Route path="/knowledgebase" element={<Knowledgebase />} />
          <Route path="/usage-billing" element={<UsageAndBilling />} />
          <Route path="/api-keys" element={<ApiKeys />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;