import React, { useState, useEffect } from 'react';
import { Phone, Clock, Users, TrendingUp } from 'lucide-react';
import StatCard from './StatCard';

const RealTimeStats = () => {
  const [stats, setStats] = useState({
    ongoingCalls: 0,
    queuedCalls: 0,
    avgWaitTime: 0,
    completedToday: 0
  });

  useEffect(() => {
    // Simulate real-time updates
    const updateStats = () => {
      setStats({
        ongoingCalls: Math.floor(Math.random() * 10) + 5,
        queuedCalls: Math.floor(Math.random() * 5),
        avgWaitTime: Math.floor(Math.random() * 120),
        completedToday: Math.floor(Math.random() * 50) + 100
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      title: 'Ongoing Calls',
      value: stats.ongoingCalls,
      icon: Phone,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Queued Calls',
      value: stats.queuedCalls,
      icon: Clock,
      color: 'bg-yellow-500',
      change: '-3%'
    },
    {
      title: 'Avg Wait Time',
      value: `${stats.avgWaitTime}s`,
      icon: Users,
      color: 'bg-green-500',
      change: '-5s'
    },
    {
      title: 'Completed Today',
      value: stats.completedToday,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+8%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <StatCard
          key={index}
          title={item.title}
          value={item.value}
          icon={item.icon}
          change={item.change}
        />
      ))}
    </div>
  );
};

export default RealTimeStats;