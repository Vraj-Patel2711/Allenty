"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, AlertTriangle, User, Users } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Inventory', icon: Package, path: '/inventory' },
    { name: 'Alerts', icon: AlertTriangle, path: '/alerts' },
    //{ name: 'Employees', icon: Users, path: '/employees' },
    { name: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-gray-100">
        <img src="/icon.png" alt="Allenty Logo" className="h-10 w-auto object-contain" />
        <p className="text-xs text-gray-400 mt-2 font-medium uppercase tracking-wider">Manager Portal</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <Link href="/profile" className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm flex-shrink-0 group-hover:bg-blue-700 transition-colors">
            AK
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-900 truncate">Akshay Kumar</p>
            <p className="text-xs text-blue-600 font-semibold truncate hover:text-blue-800"></p>
          </div>
        </Link>
      </div>
    </aside>
  );
}