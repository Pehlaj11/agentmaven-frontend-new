import React from 'react';
import UsageCard from '../../components/dashboard/UsageCard';
import { CreditCard, Calendar, CheckCircle } from 'lucide-react';
import { usageAndBillingData } from '../../api/mockData';

const UsageBillingGrid = () => {
  const { currentPlan, usage, billingHistory, paymentMethod } = usageAndBillingData;

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Current Plan</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage your subscription and billing details</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Upgrade Plan
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{currentPlan.name}</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">${currentPlan.price}<span className="text-lg font-normal text-gray-500">/month</span></p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm font-medium">
                Active
              </span>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Plan Details</h4>
              <ul className="space-y-2">
                {currentPlan.details.map((detail, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4 inline mr-1" />
                Renews on {currentPlan.renewalDate}
              </p>
            </div>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Method</h3>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-gray-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{paymentMethod.type}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">**** **** **** {paymentMethod.last4}</p>
                </div>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">{paymentMethod.expiry}</span>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <button className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                Update Payment Method
              </button>
              <button className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                Billing History
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Usage Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Usage Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {usage.map((usageItem, index) => (
            <UsageCard key={index} usageItem={usageItem} />
          ))}
        </div>
      </div>
      
      {/* Billing History */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Billing History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                <th className="py-3 px-4 font-semibold">Invoice</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Amount</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((invoice, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-3 px-4 font-medium">{invoice.id}</td>
                  <td className="py-3 px-4">{invoice.date}</td>
                  <td className="py-3 px-4">${invoice.amount.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.status === "Paid" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 dark:text-blue-400 hover:underline">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsageBillingGrid;