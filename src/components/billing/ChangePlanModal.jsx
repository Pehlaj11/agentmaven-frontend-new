import { useState } from "react";

// Mock data for available plans
const availablePlans = [
  {
    name: "Starter",
    price: 29,
    details: ["Up to 1,000 call minutes", "5 AI Agents", "Basic Analytics"],
  },
  {
    name: "Professional",
    price: 99,
    details: [
      "Up to 5,000 call minutes",
      "25 AI Agents",
      "Advanced Analytics",
      "API Access",
    ],
  },
  {
    name: "Enterprise",
    price: 249,
    details: [
      "Unlimited call minutes",
      "Unlimited AI Agents",
      "Premium Support",
      "Custom Integrations",
    ],
  },
];

const ChangePlanModal = ({ isOpen, onClose, currentPlanName, onSave }) => {
  const [selectedPlan, setSelectedPlan] = useState(
    availablePlans.find((p) => p.name === currentPlanName) || availablePlans[0]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 m-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Change Your Plan
        </h2>
        <div className="space-y-3">
          {availablePlans.map((plan) => (
            <div
              key={plan.name}
              onClick={() => setSelectedPlan(plan)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedPlan.name === plan.name
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500"
                  : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
              }`}
            >
              <p className="font-bold text-gray-900 dark:text-white">
                {plan.name} - ${plan.price}/month
              </p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {plan.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(selectedPlan)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 cursor-pointer transition-colors"
          >
            Confirm Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePlanModal;
