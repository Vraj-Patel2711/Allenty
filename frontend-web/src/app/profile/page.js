"use client";
import { useRouter } from 'next/navigation';
import { LogOut, ChevronRight, Bell, Moon } from 'lucide-react';

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push('/');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile & Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">Profile Information</h3>
          
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-blue-900 text-white flex items-center justify-center text-2xl font-bold mr-6 shadow-inner">
              AK
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Akshay Kumar</h2>
              <p className="text-blue-600 font-semibold">Warehouse Manager</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Email</span>
              <span className="text-gray-900 font-semibold">akshay.kumar@warehouse.com</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Employee ID</span>
              <span className="text-gray-900 font-semibold">AK001</span>
            </div>
          </div>

          <button className="w-full mt-8 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            Edit Profile
          </button>
        </div>

        <div className="space-y-8">
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">Account Settings</h3>
            
            <button onClick={() => router.push('/forgot-password')} >
            <div className="flex justify-between items-center py-4 cursor-pointer hover:bg-gray-50 rounded-lg px-2 transition-colors -mx-2">
              <span className="font-semibold text-gray-900">Change Password</span>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
            </button>

            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mt-6 mb-4">Preferences</h3>
            
            <div className="flex justify-between items-center py-4">
              <div className="flex items-start">
                <Bell className="text-gray-400 mr-3 mt-0.5" size={20} />
                <div>
                  <span className="block font-semibold text-gray-900">Notifications</span>
                  <span className="text-sm text-gray-500">Receive alerts</span>
                </div>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex justify-between items-center py-4">
              <div className="flex items-start">
                <Moon className="text-gray-400 mr-3 mt-0.5" size={20} />
                <div>
                  <span className="block font-semibold text-gray-900">Dark Mode</span>
                  <span className="text-sm text-gray-500">Toggle theme</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">App Information</h3>
            
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-500 font-medium">Version</span>
              <span className="text-gray-900 font-semibold">1.0.0</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-500 font-medium">Build</span>
              <span className="text-gray-900 font-semibold">2025.11.10</span>
            </div>

            <button 
              onClick={handleLogout} 
              className="w-full mt-6 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center"
            >
              <LogOut size={20} className="mr-2" />
              Log Out
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
