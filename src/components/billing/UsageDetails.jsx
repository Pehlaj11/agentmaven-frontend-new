const UsageBar = ({ item }) => {
    const percentage = Math.min((item.used / item.total) * 100, 100);
    return (
        <div>
            <div className="flex justify-between items-center mb-1 text-sm">
                <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                    {item.used.toLocaleString()} / {item.total.toLocaleString()} {item.unit}
                </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

const UsageDetails = ({ usage }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Usage This Month</h3>
        <div className="space-y-4">
            {usage.map(item => <UsageBar key={item.name} item={item} />)}
        </div>
    </div>
);

export default UsageDetails;