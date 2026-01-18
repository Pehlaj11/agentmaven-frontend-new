// All mock data for the dashboard

import { AlertCircle, Check, CreditCard, Users } from "lucide-react";

export const dailyCallData = [
  { name: "Mon", calls: 400 },
  { name: "Tue", calls: 300 },
  { name: "Wed", calls: 500 },
  { name: "Thu", calls: 450 },
  { name: "Fri", calls: 600 },
  { name: "Sat", calls: 350 },
  { name: "Sun", calls: 200 },
];
export 
const agentLeaderboardData = [
  { rank: 1, name: "Agent Gamma", successRate: "95.7%", change: "up" },
  { rank: 2, name: "Agent Alpha", successRate: "89.1%", change: "down" },
];
export const recentCallsData = [
  {
    id: "C001",
    number: "+1 (555) 123-4567",
    duration: "2m 15s",
    status: "Completed",
    agent: "Agent Alpha",
    time: "2 mins ago",
    sentiment: "Positive",
    summary: "Customer was happy with the resolution.",
    transcript: "...",
    purpose: "Support",
  },
  {
    id: "C003",
    number: "+1 (555) 234-5678",
    duration: "5m 30s",
    status: "Completed",
    agent: "Agent Gamma",
    time: "10 mins ago",
    sentiment: "Neutral",
    summary: "Standard inquiry about product features.",
    transcript: "...",
    purpose: "Sales",
  },
];
export const callPurposeData = [
  { name: "Support", value: 450 },
  { name: "Sales", value: 320 },
  { name: "Follow-up", value: 180 },
  { name: "Other", value: 50 },
];
export const generateMockData = () => {
    const now = Date.now();
    return {
        ongoing: [
            { id: 1, number: '+1 (555) 123-4567', agent: 'Alice Johnson', purpose: 'Sales Inquiry', startTime: now - 125 * 1000 },
            { id: 2, number: '+44 20 7946 0958', agent: 'Bob Williams', purpose: 'Support Request', startTime: now - 340 * 1000 },
            { id: 3, number: '+1 (555) 987-6543', agent: 'Charlie Brown', purpose: 'Billing Question', startTime: now - 45 * 1000 },
            { id: 4, number: '+61 2 9876 5432', agent: 'Diana Miller', purpose: 'Product Demo', startTime: now - 820 * 1000 },
            { id: 5, number: '+1 (555) 234-5678', agent: 'Ethan Davis', purpose: 'Account Update', startTime: now - 15 * 1000 },
        ],
        queued: [
            { id: 6, number: '+49 30 1234567', purpose: 'New Customer', queueTime: now - 180 * 1000 },
            { id: 7, number: '+1 (555) 876-5432', purpose: 'Technical Support', queueTime: now - 95 * 1000 },
            { id: 8, number: '+33 1 23 45 67 89', purpose: 'Partnership', queueTime: now - 30 * 1000 },
        ],
    };
};


export const liveCallsData = {
  ongoing: [
    {
      id: "L001",
      number: "+1 (555) 321-9876",
      agent: "Agent Alpha",
      purpose: "Support",
      startTime: Date.now() - 135 * 1000,
    },
    {
      id: "L002",
      number: "+1 (555) 654-1234",
      agent: "Agent Gamma",
      purpose: "Sales",
      startTime: Date.now() - 45 * 1000,
    },
  ],
  queued: [
    {
      id: "Q001",
      number: "+1 (555) 222-3333",
      purpose: "Support",
      queueTime: Date.now() - 25 * 1000,
    },
  ],
};
export const agentsData = [
  {
    id: "A01",
    name: "Agent Alpha",
    status: "In a Call",
    totalCalls: 235,
    avgHandleTime: "3m 15s",
    successRate: "89.1%",
    avatar: "https://placehold.co/64x64/A0AEC0/4A5568?text=AA",
    performanceHistory: [
      { day: "Mon", calls: 30 },
      { day: "Tue", calls: 45 },
      { day: "Wed", calls: 40 },
      { day: "Thu", calls: 50 },
      { day: "Fri", calls: 35 },
      { day: "Sat", calls: 20 },
      { day: "Sun", calls: 15 },
    ],
    // Basic settings
    modelType: 'gpt-4',
    personality: 'Professional',
    tone: 'Friendly',
    language: 'English',
    description: 'General Support Agent',
    // Advanced settings
    maxTokens: 1000,
    temperature: 0.7,
    topP: 0.9,
    frequencyPenalty: 0,
    presencePenalty: 0,
    customInstructions: 'Focus on resolving customer issues quickly and effectively.',
    // Call handling settings
    callObjective: 'Support',
    callStrategy: 'Problem Resolution',
    escalationThreshold: 80,
    useKnowledgeBase: true,
    callScript: 'Greet the customer, identify their issue, provide a solution, and confirm satisfaction.'
  },
  {
    id: "A03",
    name: "Agent Gamma",
    status: "Online",
    totalCalls: 289,
    avgHandleTime: "2m 50s",
    successRate: "95.7%",
    avatar: "https://placehold.co/64x64/A0AEC0/4A5568?text=AG",
    performanceHistory: [
      { day: "Mon", calls: 40 },
      { day: "Tue", calls: 50 },
      { day: "Wed", calls: 55 },
      { day: "Thu", calls: 60 },
      { day: "Fri", calls: 45 },
      { day: "Sat", calls: 25 },
      { day: "Sun", calls: 14 },
    ],
    // Basic settings
    modelType: 'gpt-4',
    personality: 'Friendly',
    tone: 'Empathetic',
    language: 'English',
    description: 'Sales Agent',
    // Advanced settings
    maxTokens: 1200,
    temperature: 0.8,
    topP: 0.95,
    frequencyPenalty: 0.1,
    presencePenalty: 0.1,
    customInstructions: 'Focus on identifying customer needs and presenting relevant solutions.',
    // Call handling settings
    callObjective: 'Sales',
    callStrategy: 'Needs Assessment',
    escalationThreshold: 70,
    useKnowledgeBase: true,
    callScript: 'Introduce yourself, ask qualifying questions, present solutions, and close the sale.'
  },
];

// Function to create a new agent
export const createAgent = (agentData) => {
  const newAgent = {
    id: `A${Math.floor(100 + Math.random() * 900)}`,
    name: agentData.name,
    status: "Offline",
    totalCalls: 0,
    avgHandleTime: "0m 0s",
    successRate: "0%",
    avatar: `https://placehold.co/64x64/A0AEC0/4A5568?text=${agentData.name.substring(0, 2).toUpperCase()}`,
    performanceHistory: [
      { day: "Mon", calls: 0 },
      { day: "Tue", calls: 0 },
      { day: "Wed", calls: 0 },
      { day: "Thu", calls: 0 },
      { day: "Fri", calls: 0 },
      { day: "Sat", calls: 0 },
      { day: "Sun", calls: 0 },
    ],
    // Basic settings
    modelType: agentData.modelType || 'gpt-4',
    personality: agentData.personality || 'Professional',
    tone: agentData.tone || 'Friendly',
    language: agentData.language || 'English',
    description: agentData.description || '',
    // Advanced settings
    maxTokens: agentData.maxTokens || 1000,
    temperature: agentData.temperature || 0.7,
    topP: agentData.topP || 0.9,
    frequencyPenalty: agentData.frequencyPenalty || 0,
    presencePenalty: agentData.presencePenalty || 0,
    customInstructions: agentData.customInstructions || '',
    // Call handling settings
    callObjective: agentData.callObjective || 'General Support',
    callStrategy: agentData.callStrategy || 'Problem Resolution',
    escalationThreshold: agentData.escalationThreshold || 80,
    useKnowledgeBase: agentData.useKnowledgeBase !== undefined ? agentData.useKnowledgeBase : true,
    callScript: agentData.callScript || ''
  };
  return newAgent;
};

export const callLogsData = Array.from({ length: 50 }, (_, i) => {
  const agents = [
    "Agent Alpha",
    "Agent Beta",
    "Agent Gamma",
    "Agent Delta",
    "Agent Epsilon",
  ];
  const status = ["Completed", "Missed", "Voicemail"][i % 3];
  const durationSeconds =
    status === "Completed" ? 60 + Math.floor(Math.random() * 300) : 0;
  const date = new Date(Date.now() - i * 3600000 * Math.random());
  return {
    id: `LOG${1001 + i}`,
    number: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(
      1000 + Math.random() * 9000
    )}`,
    agent: agents[i % agents.length],
    status,
    purpose: ["Support", "Sales", "Follow-up"][i % 3],
    direction: ["Inbound", "Outbound"][i % 2],
    date: date.toISOString(),
    duration: durationSeconds,
    cost:
      status === "Completed"
        ? ((durationSeconds / 60) * 0.15).toFixed(2)
        : "0.00",
    summary: "...",
    transcript: "...",
  };
});
export const analyticsData = {
  costVsConversion: [
    { month: "Jan", cost: 4000, conversion: 2.4 },
    { month: "Feb", cost: 3000, conversion: 3.1 },
    { month: "Mar", cost: 5000, conversion: 2.8 },
    { month: "Apr", cost: 4500, conversion: 3.9 },
  ],
  sentimentTrend: [
    { date: "08-01", positive: 400, neutral: 200, negative: 50 },
    { date: "08-02", positive: 450, neutral: 180, negative: 60 },
    { date: "08-03", positive: 420, neutral: 220, negative: 40 },
  ],
  peakTimes: Array.from({ length: 7 }, (_, day) => ({
    day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day],
    hours: Array.from({ length: 24 }, (_, hour) => ({
      hour: `${hour.toString().padStart(2, "0")}:00`,
      volume: Math.floor(Math.random() * (hour > 8 && hour < 18 ? 100 : 20)),
    })),
  })),
};

// New Advanced Analytics Data

export const agentPerformanceData = [
  {
    subject: "Success Rate",
    "Agent Alpha": 89,
    "Agent Gamma": 96,
    fullMark: 100,
  },
  {
    subject: "Call Volume",
    "Agent Alpha": 75,
    "Agent Gamma": 90,
    fullMark: 100,
  },
  {
    subject: "Efficiency",
    "Agent Alpha": 85,
    "Agent Gamma": 92,
    fullMark: 100,
  },
  {
    subject: "Positive Sentiment",
    "Agent Alpha": 90,
    "Agent Gamma": 95,
    fullMark: 100,
  },
  { subject: "Adherence", "Agent Alpha": 95, "Agent Gamma": 88, fullMark: 100 },
];
export const purposeSentimentData = [
  { purpose: "Support", positive: 250, neutral: 150, negative: 50 },
  { purpose: "Sales", positive: 200, neutral: 80, negative: 40 },
  { purpose: "Follow-up", positive: 120, neutral: 50, negative: 10 },
  { purpose: "Other", positive: 20, neutral: 25, negative: 5 },
];
export 
const keywordData = [
  { name: "Refund", size: 400, color: "#4F46E5" },
  { name: "Billing", size: 320, color: "#34D399" },
  { name: "Upgrade", size: 250, color: "#FBBF24" },
  { name: "Cancel", size: 220, color: "#F87171" },
  { name: "Technical Issue", size: 180, color: "#A78BFA" },
  { name: "Pricing", size: 150, color: "#60A5FA" },
  { name: "Login Problem", size: 120, color: "#F472B6" },
  { name: "New Feature", size: 100, color: "#FB923C" },
];
export const knowledgebaseData = [
     {
    id: 1,
    title: 'How to Reset Your Password',
    content: 'To reset your password, go to the login page and click "Forgot Password". You will receive an email with instructions...',
    category: 'Account Management',
    lastUpdated: '2025-09-01',
    featured: true,
    aiAccessCount: 1250, // <-- New Metric
    successRate: 95,      // <-- New Metric
  },
  {
    id: 2,
    title: 'Understanding Your First Invoice',
    content: 'Your first invoice includes a pro-rated charge for the current billing cycle and the full charge for the upcoming cycle. You can view a detailed breakdown in your billing portal.',
    category: 'Billing',
    lastUpdated: '2025-08-15',
    featured: false,
    aiAccessCount: 980,
    successRate: 91,
  },
  {
    id: 3,
    title: 'Troubleshooting Connection Issues',
    content: 'If you are experiencing connection issues, first check your internet connection. Try restarting your router and computer. If the problem persists, contact our support team with your diagnostic logs.',
    category: 'Technical Support',
    lastUpdated: '2025-09-10',
    featured: true,
    aiAccessCount: 2100,
    successRate: 78,
  },
  {
    id: 4,
    title: "How to Use the 'Auto-Dial' Feature",
    content: "The Auto-Dial feature allows you to automatically call numbers from a pre-loaded list. To enable it, navigate to the 'Campaigns' tab, select your list, and click 'Start Auto-Dial'.",
    category: 'Product Features',
    lastUpdated: '2025-07-20',
    featured: false,
    aiAccessCount: 450,
    successRate: 99,
  },
  {
    id: 5,
    title: 'Updating Your Payment Method',
    content: 'To update your payment method, go to "Settings", then "Billing". Click on "Manage Payment Methods" to add a new card or remove an existing one.',
    category: 'Billing',
    lastUpdated: '2025-09-05',
    featured: true,
    aiAccessCount: 1500,
    successRate: 98,
  },
  {
    id: 6,
    title: 'How to Add a New User to Your Team',
    content: 'As an administrator, you can add new users by navigating to the "Team Management" section in your settings. Click "Invite User" and enter their email address to send an invitation.',
    category: 'Account Management',
    lastUpdated: '2025-08-22',
    featured: false,
    aiAccessCount: 670,
    successRate: 92,
  },
  {
    id: 7,
    title: 'Clearing Browser Cache and Cookies',
    content: 'Sometimes, clearing your browser cache can resolve display or loading issues. In Chrome, you can do this by going to Settings > Privacy and security > Clear browsing data.',
    category: 'Technical Support',
    lastUpdated: '2025-06-11',
    featured: false,
    aiAccessCount: 810,
    successRate: 85,
  },
  {
    id: 8,
    title: 'Exporting Call Reports',
    content: 'You can export detailed call reports in CSV format. Go to the "Analytics" tab, set your desired date range and filters, and click the "Export" button at the top right.',
    category: 'Product Features',
    lastUpdated: '2025-09-12',
    featured: false,
    aiAccessCount: 520,
    successRate: 96,
  },
  {
    id: "KB01",
    title: "How to Handle Billing Disputes",
    category: "Billing",
    lastUpdated: "2025-08-15",
    content:
      "When a customer has a billing dispute, first listen carefully to their concern. Verify their identity and pull up their account...",
    featured: true,
  },
  {
    id: "KB02",
    title: "Product Tiers and Pricing",
    category: "Sales",
    lastUpdated: "2025-08-10",
    content:
      "Our product is offered in three tiers: Basic, Pro, and Enterprise. The Basic plan is $19/month and includes...",
    featured: true,
  },
  {
    id: "KB03",
    title: "Troubleshooting Common Login Issues",
    category: "Technical Support",
    lastUpdated: "2025-08-20",
    content:
      'If a user cannot log in, ask them to first try resetting their password using the "Forgot Password" link...',
    featured: true,
  },
];

export const aiInsights = {
  knowledgeGaps: [
    "International shipping costs",
    "Policy on damaged goods refunds",
    "Enterprise plan bulk discounts",
    "Integration with Salesforce API",
    "Data residency and storage options"
  ]
};
export const notificationsData = [
  {
    id: 1,
    icon: AlertCircle,
    color: "text-red-500",
    message: 'Campaign "Q3 Product Launch" has low answer rate.',
    time: "2m ago",
  },
  {
    id: 2,
    icon: Check,
    color: "text-green-500",
    message: 'Knowledgebase article "Refund Policy" was updated.',
    time: "1h ago",
  },
  {
    id: 3,
    icon: Users,
    color: "text-blue-500",
    message: 'New agent "Agent Zeta" was added.',
    time: "3h ago",
  },
  {
    id: 4,
    icon: CreditCard,
    color: "text-yellow-500",
    message: "Your monthly invoice is ready for review.",
    time: "1d ago",
  },
];
export const conversationsData = [
  {
    id: "CONV001",
    customerNumber: "+1 (555) 123-4567",
    agentName: "Agent Alpha",
    lastMessage: "You're welcome! Have a great day.",
    timestamp: "10m ago",
    duration: "3m 45s",
    sentiment: "Positive",
    transcript: [
      {
        speaker: "Agent",
        text: "Thank you for calling Customer Support, how can I help you today?",
      },
      {
        speaker: "Customer",
        text: "Hi, I have a question about my recent bill.",
      },
      {
        speaker: "Agent",
        text: "I can certainly help with that. Can you please provide me with your account number?",
      },
      { speaker: "Customer", text: "Yes, it's 123-456-789." },
      {
        speaker: "Agent",
        text: "Thank you. I see the charge you're referring to. It was for the premium subscription upgrade you made last week.",
      },
      {
        speaker: "Customer",
        text: "Oh, I see. I forgot about that. Thank you for clarifying!",
      },
      {
        speaker: "Agent",
        text: "You're welcome! Is there anything else I can assist you with?",
      },
      { speaker: "Customer", text: "No, that's all. Thanks!" },
      { speaker: "Agent", text: "You're welcome! Have a great day." },
    ],
  },
  {
    id: "CONV002",
    customerNumber: "+1 (555) 987-6543",
    agentName: "Agent Gamma",
    lastMessage: "I understand. Let me transfer you.",
    timestamp: "45m ago",
    duration: "5m 12s",
    sentiment: "Negative",
    transcript: [
      { speaker: "Agent", text: "Thank you for calling. How can I help?" },
      {
        speaker: "Customer",
        text: "I want to cancel my service. I've been trying for an hour and your website is broken.",
      },
      {
        speaker: "Agent",
        text: "I apologize for the frustration you've experienced. I can process the cancellation for you, but I need to inform you about the early termination fee.",
      },
      {
        speaker: "Customer",
        text: "A fee? This is ridiculous. I want to speak to a manager.",
      },
      {
        speaker: "Agent",
        text: "I understand. Let me transfer you to my supervisor.",
      },
    ],
  },
];
export const usageAndBillingData = {
  currentPlan: {
    name: "Pro Plan",
    price: 249,
    details: [
      "Up to 10 Agents",
      "10,000 Call Minutes/mo",
      "Advanced Analytics",
      "Knowledgebase Integration",
    ],
    renewalDate: "September 25, 2025",
  },
  usage: [
    { name: "Call Minutes", used: 6850, total: 10000, unit: "mins" },
    { name: "Calls Made", used: 1287, total: 5000, unit: "calls" },
    { name: "Active Agents", used: 8, total: 10, unit: "agents" },
  ],
  billingHistory: [
    { id: "INV-0825", date: "August 1, 2025", amount: 249.0, status: "Paid" },
    { id: "INV-0725", date: "July 1, 2025", amount: 249.0, status: "Paid" },
    { id: "INV-0625", date: "June 1, 2025", amount: 249.0, status: "Paid" },
  ],
  paymentMethod: {
    type: "Visa",
    last4: "4242",
    expiry: "12/2028",
  },
};

export const initialApiKeys = [
  {
    id: 1,
    name: "Primary Server Key",
    key: "sk_live_xxxxxxxxxxxx1234",
    status: "Active",
    created: "2025-01-15",
    lastUsed: "2025-08-28",
  },
  {
    id: 2,
    name: "Analytics Service Key",
    key: "sk_live_xxxxxxxxxxxx5678",
    status: "Active",
    created: "2025-03-20",
    lastUsed: "2025-08-25",
  },
  {
    id: 3,
    name: "Old Staging Key",
    key: "sk_test_xxxxxxxxxxxx9012",
    status: "Revoked",
    created: "2024-11-10",
    lastUsed: "2025-02-11",
  },
];
export const securityData = {
  mfaEnabled: true,
  activeSessions: [
    {
      id: 1,
      device: "Chrome on macOS",
      location: "Chennai, IN",
      ip: "103.48.197.110",
      isCurrent: true,
      lastSeen: "Active now",
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "Mumbai, IN",
      ip: "182.75.118.98",
      isCurrent: false,
      lastSeen: "2 hours ago",
    },
  ],
  securityLogs: [
    {
      id: 1,
      event: "Successful Login",
      ip: "103.48.197.110",
      time: "2025-08-29T14:15:00Z",
    },
    {
      id: 2,
      event: "API Key Generated",
      ip: "103.48.197.110",
      time: "2025-08-29T11:05:00Z",
    },
    {
      id: 3,
      event: "Password Changed",
      ip: "202.83.21.14",
      time: "2025-08-27T09:30:00Z",
    },
  ],
};
export const settingsData = {
  profile: {
    name: "Salim Sk",
    email: "salim.sk@example.com",
    avatar: "https://placehold.co/40x40/E2E8F0/4A5568?text=A",
    language: "English (US)",
  },
  notifications: {
    callAlerts: true,
    voicemail: true,
    weeklySummary: false,
  },
  audio: {
    input: "Default - Microphone (Realtek)",
    output: "Default - Speakers (Realtek)",
  },
  team: [
    {
      id: 1,
      name: "Salim Sk",
      email: "salim.sk@example.com",
      role: "Admin",
      avatar: "https://placehold.co/40x40/E2E8F0/4A5568?text=A",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      role: "Agent",
      avatar: "https://placehold.co/40x40/ecc94b/a0aec0?text=JD",
    },
  ],
};

// --- MOCK DATA ---






















