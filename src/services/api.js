import axios from 'axios';

// Create axios instance with default config
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await API.post('/auth/refresh-token', { refreshToken });
          const { token: newToken } = response.data;

          localStorage.setItem('token', newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return API(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (email, password) => API.post('/auth/login', { email, password }),
  signup: (name, email, password) => API.post('/auth/signup', { name, email, password }),
  logout: () => API.post('/auth/logout'),
  getMe: () => API.get('/auth/me')
};

// Agent endpoints
export const agentAPI = {
  getAll: (params) => API.get('/agents', { params }),
  getById: (id) => API.get(`/agents/${id}`),
  create: (data) => API.post('/agents', data),
  update: (id, data) => API.put(`/agents/${id}`, data),
  delete: (id) => API.delete(`/agents/${id}`),
  updateStatus: (id, status) => API.patch(`/agents/${id}/status`, { status }),
  duplicate: (id) => API.post(`/agents/${id}/duplicate`)
};

// Call endpoints
export const callAPI = {
  getLiveCalls: () => API.get('/calls/live'),
  startCall: (data) => API.post('/calls/start', data),
  endCall: (id) => API.post(`/calls/${id}/end`),
  getStats: () => API.get('/calls/stats')
};

// Call logs endpoints
export const callLogAPI = {
  getAll: (params) => API.get('/call-logs', { params }),
  getById: (id) => API.get(`/call-logs/${id}`),
  getRecent: (limit = 10) => API.get('/call-logs/recent', { params: { limit } }),
  getStats: () => API.get('/call-logs/stats'),
  delete: (id) => API.delete(`/call-logs/${id}`)
};

// Analytics endpoints
export const analyticsAPI = {
  getDashboard: () => API.get('/analytics/dashboard'),
  getAgentPerformance: () => API.get('/analytics/agent-performance'),
  getCallDistribution: () => API.get('/analytics/call-distribution')
};

// Knowledgebase endpoints
export const knowledgebaseAPI = {
  getAll: (params) => API.get('/knowledgebase', { params }),
  getById: (id) => API.get(`/knowledgebase/${id}`),
  create: (data) => API.post('/knowledgebase', data),
  update: (id, data) => API.put(`/knowledgebase/${id}`, data),
  delete: (id) => API.delete(`/knowledgebase/${id}`)
};

// Billing endpoints
export const billingAPI = {
  getUsage: () => API.get('/billing/usage'),
  getHistory: (params) => API.get('/billing/history', { params }),
  getMetrics: (period) => API.get(`/billing/metrics/${period}`),
  updateMetrics: () => API.post('/billing/metrics/update')
};

// API Keys endpoints
export const apiKeyAPI = {
  getAll: () => API.get('/api-keys'),
  create: (data) => API.post('/api-keys', data),
  revoke: (id) => API.delete(`/api-keys/${id}`)
};

// Security endpoints
export const securityAPI = {
  getSessions: () => API.get('/security/sessions'),
  getLogs: (params) => API.get('/security/logs', { params }),
  revokeSession: (id) => API.delete(`/security/sessions/${id}`)
};

// Conversation endpoints
export const conversationAPI = {
  getAll: (params) => API.get('/conversations', { params }),
  getById: (id) => API.get(`/conversations/${id}`),
  create: (data) => API.post('/conversations', data),
  update: (id, data) => API.put(`/conversations/${id}`, data)
};

// Notification endpoints
export const notificationAPI = {
  getAll: (params) => API.get('/notifications', { params }),
  markAsRead: (id) => API.patch(`/notifications/${id}/read`),
  markAllAsRead: () => API.patch('/notifications/read-all'),
  delete: (id) => API.delete(`/notifications/${id}`)
};

// Search endpoints
export const searchAPI = {
  globalSearch: (query, type) => API.get('/search', { params: { q: query, type } })
};

export default API;