import React, { useState } from "react";
import { Camera, Save, Bell, Volume2, Mic, User, Mail, Key } from "lucide-react";
import { settingsData } from "../../api/mockData";
import DashboardPage from "../../components/dashboard/DashboardPage";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import FormInput from "../../components/shared/FormInput";
import FormSelect from "../../components/shared/FormSelect";
import FormCheckbox from "../../components/shared/FormCheckbox";
import FormButton from "../../components/shared/FormButton";
import { toast } from "react-hot-toast";

export const SettingsPage = () => {
  const [profileData, setProfileData] = useState({
    name: settingsData.profile.name,
    email: settingsData.profile.email,
    language: settingsData.profile.language,
  });
  
  const [notificationSettings, setNotificationSettings] = useState(settingsData.notifications);
  const [audioSettings, setAudioSettings] = useState(settingsData.audio);
  const [teamMembers] = useState(settingsData.team);

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAudioChange = (field, value) => {
    setAudioSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = (profileData) => {
    // console.log("Saving profile data:", profileData);
    toast.success("Profile updated successfully!");
  };

  const handleAvatarChange = () => {
    // console.log("Avatar change functionality would open a file dialog in a real application.");
    toast.info("Avatar change functionality would open a file dialog in a real application.");
  };

  return (
    <DashboardPage>
      <DashboardHeader
        title="Settings"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
              <User className="mr-2" size={20} />
              Profile Settings
            </h2>
            
            <div className="flex items-center mb-6">
              <div className="relative">
                <img 
                  src={profileData.avatar || settingsData.profile.avatar} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full"
                />
                <button 
                  onClick={handleAvatarChange}
                  className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 text-white"
                >
                  <Camera size={14} />
                </button>
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900 dark:text-white">{profileData.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{profileData.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Full Name"
                type="text"
                value={profileData.name}
                onChange={(value) => handleProfileChange('name', value)}
              />
              
              <FormInput
                label="Email Address"
                type="email"
                value={profileData.email}
                onChange={(value) => handleProfileChange('email', value)}
              />
              
              <FormSelect
                label="Language"
                value={profileData.language}
                onChange={(value) => handleProfileChange('language', value)}
                options={["English (US)", "English (UK)", "Spanish", "French", "German"]}
              />
            </div>
            
            <div className="mt-6">
              <FormButton onClick={handleSaveProfile}>
                <Save size={16} className="mr-2" />
                Save Changes
              </FormButton>
            </div>
          </div>
          
          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
              <Bell className="mr-2" size={20} />
              Notification Preferences
            </h2>
            
            <div className="space-y-4">
              <FormCheckbox
                label="Call Alerts"
                checked={notificationSettings.callAlerts}
                onChange={(value) => handleNotificationChange('callAlerts', value)}
              />
              
              <FormCheckbox
                label="Voicemail Notifications"
                checked={notificationSettings.voicemail}
                onChange={(value) => handleNotificationChange('voicemail', value)}
              />
              
              <FormCheckbox
                label="Weekly Summary"
                checked={notificationSettings.weeklySummary}
                onChange={(value) => handleNotificationChange('weeklySummary', value)}
              />
            </div>
          </div>
          
          {/* Audio Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
              <Mic className="mr-2" size={20} />
              Audio Settings
            </h2>
            
            <div className="space-y-4">
              <FormSelect
                label="Microphone"
                value={audioSettings.input}
                onChange={(value) => handleAudioChange('input', value)}
                options={[
                  "Default - Microphone (Realtek)",
                  "USB Microphone",
                  "Bluetooth Headset"
                ]}
              />
              
              <FormSelect
                label="Speaker"
                value={audioSettings.output}
                onChange={(value) => handleAudioChange('output', value)}
                options={[
                  "Default - Speakers (Realtek)",
                  "USB Headphones",
                  "Bluetooth Speaker"
                ]}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Team Members */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
              <User className="mr-2" size={20} />
              Team Members
            </h2>
            
            <div className="space-y-4">
              {teamMembers.map(member => (
                <div key={member.id} className="flex items-center">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-4 w-full py-2 text-center text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20">
              Invite Member
            </button>
          </div>
          
          {/* Security */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
              <Key className="mr-2" size={20} />
              Security
            </h2>
            
            <div className="space-y-4">
              <button className="w-full py-2 text-center text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                Change Password
              </button>
              
              <button className="w-full py-2 text-center text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                Two-Factor Authentication
              </button>
              
              <button className="w-full py-2 text-center text-red-600 dark:text-red-400 border border-red-600 dark:border-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                Logout from All Devices
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardPage>
  );
};