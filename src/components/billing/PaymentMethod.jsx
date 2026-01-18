import { CreditCard } from "lucide-react";

const PaymentMethod = ({ method, onOpenUpdatePayment }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Payment Method</h3>
        <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <CreditCard size={24} className="text-blue-500 mr-4" />
            <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {method.type} ending in {method.last4}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Expires {method.expiry}
                </p>
            </div>
        </div>
        <button
            onClick={onOpenUpdatePayment}
            className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
        >
            <span>Update Payment Method</span>
        </button>
    </div>
);

export default PaymentMethod;