import { Repeat, CheckCircle } from "lucide-react";

const CurrentPlan = ({ plan, onOpenChangePlan }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <div className="flex flex-wrap justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Current Plan
        </h3>
        <p className="text-2xl font-bold text-blue-500 mt-2">
          {plan.name}{" "}
          <span className="text-lg font-medium text-gray-500 dark:text-gray-400">
            / ${plan.price}/month
          </span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Your plan renews on {plan.renewalDate}.
        </p>
      </div>
      <button
        onClick={onOpenChangePlan}
        className="mt-4 lg:mt-0 flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
      >
        <Repeat size={16} />
        <span>Change Plan</span>
      </button>
    </div>
    <div className="border-t dark:border-gray-700 mt-4 pt-4">
      <ul className="space-y-2 text-sm">
        {plan.details.map((detail, index) => (
          <li
            key={index}
            className="flex items-center text-gray-600 dark:text-gray-300"
          >
            <CheckCircle
              size={16}
              className="text-green-500 mr-2 flex-shrink-0"
            />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default CurrentPlan;
