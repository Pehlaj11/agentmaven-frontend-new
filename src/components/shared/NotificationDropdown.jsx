import React from 'react';
import { AlertCircle, Check, Users, CreditCard } from 'lucide-react';

const iconMap = {
    AlertCircle,
    Check,
    Users,
    CreditCard
};

const NotificationDropdown = ({ notifications }) => {
    return (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-50">
            <div className="p-3 border-b dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
            </div>
            <ul className="py-2 max-h-96 overflow-y-auto">
                {notifications.map(notif => {
                    const Icon = iconMap[notif.icon];
                    return (
                        <li key={notif.id} className="flex items-start p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            {Icon && <Icon className={`w-5 h-5 mt-1 mr-3 flex-shrink-0 ${notif.color}`} />}
                            <div>
                                <p className="text-sm text-gray-700 dark:text-gray-200">{notif.message}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">{notif.time}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default NotificationDropdown;