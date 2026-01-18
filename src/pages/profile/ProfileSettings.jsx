    export const ProfileSettings = () => (
        <div>
             <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Profile Information</h3>
             <form className="space-y-4">
                 <div className="flex items-center space-x-4">
                     <img src={settingsData.profile.avatar} className="w-20 h-20 rounded-full" />
                     <div>
                         <button type="button" className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">Change</button>
                         <p className="text-xs text-gray-500 mt-1">JPG, GIF or PNG. 1MB max.</p>
                     </div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <input type="text" defaultValue={settingsData.profile.name} className="mt-1 w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input type="email" defaultValue={settingsData.profile.email} className="mt-1 w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Language</label>
                    <select defaultValue={settingsData.profile.language} className="mt-1 w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <option>English (US)</option>
                        <option>Español</option>
                        <option>Français</option>
                    </select>
                 </div>
                 <div className="pt-4 text-right">
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">Save Changes</button>
                 </div>
             </form>
        </div>
    );
    