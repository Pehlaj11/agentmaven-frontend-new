import { Download } from "lucide-react";
import StatusBadge from "../shared/StatusBadge";
import toast from "react-hot-toast"; // Import toast only

const BillingHistory = ({ history }) => {
  const handleDownload = (invoiceId) => {
  try {
    // Simulate download action
    const isDownloaded = Math.random() > 0.2; // simulate success 80% of the time

    if (isDownloaded) {
      toast.success(`Invoice ${invoiceId} downloaded!`);
    } else {
      throw new Error("Download failed"); // simulate error
    }
  } catch (err) {
    toast.error(`Invoice ${invoiceId} failed to download!`);
  }
};

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Billing History
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 uppercase">
              <th className="py-2 px-4 font-medium">Invoice ID</th>
              <th className="py-2 px-4 font-medium">Date</th>
              <th className="py-2 px-4 font-medium">Amount</th>
              <th className="py-2 px-4 font-medium">Status</th>
              <th className="py-2 px-4 font-medium text-right"></th>
            </tr>
          </thead>
          <tbody>
            {history.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b dark:border-gray-700 last:border-0 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="py-3 px-4 font-mono">{invoice.id}</td>
                <td className="py-3 px-4">{invoice.date}</td>
                <td className="py-3 px-4">${invoice.amount.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <StatusBadge status={invoice.status} />
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleDownload(invoice.id)}
                    className="flex items-center space-x-1 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingHistory;