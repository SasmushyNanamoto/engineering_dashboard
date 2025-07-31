'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Home, 
  Zap, 
  Scissors, 
  RotateCcw, 
  Drill, 
  BarChart3, 
  Wrench, 
  Shield, 
  Users, 
  HelpCircle, 
  BookOpen, 
  FileText, 
  AlertTriangle,
  Settings,
  LogOut,
  Search,
  User
} from 'lucide-react';
import { User as UserType } from '@/lib/database';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: UserType;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Welding', href: '/welding', icon: Zap },
  { name: 'Grinding', href: '/grinding', icon: Scissors },
  { name: 'Turning', href: '/turning', icon: RotateCcw },
  { name: 'Milling', href: '/milling', icon: Drill },
  { name: 'Drilling & Tapping', href: '/drilling', icon: Drill },
  { name: 'Charts & Conversions', href: '/charts', icon: BarChart3 },
  { name: 'Tooling & Geometry', href: '/tooling', icon: Wrench },
  { name: 'Materials', href: '/materials', icon: Shield },
  { name: 'Safety & PPE', href: '/safety', icon: Shield },
  { name: 'Community Forum', href: '/forum', icon: Users },
  { name: 'Help', href: '/help', icon: HelpCircle },
  { name: 'How-To Guides', href: '/guides', icon: BookOpen },
  { name: 'Privacy Statement', href: '/privacy', icon: FileText },
  { name: 'Request Change', href: '/feedback', icon: AlertTriangle },
];

export default function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Mobile menu */}
      <div className={`lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-secondary-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
            <div className="flex flex-shrink-0 items-center px-4 py-6">
              <h1 className="text-xl font-semibold text-secondary-900">Engineering Dashboard</h1>
            </div>
            <div className="mt-6 h-0 flex-1 overflow-y-auto">
              <nav className="space-y-1 px-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                        isActive
                          ? 'bg-primary-100 text-primary-900'
                          : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="mr-4 h-6 w-6" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-secondary-200">
          <div className="flex items-center flex-shrink-0 px-4 py-6">
            <h1 className="text-xl font-semibold text-secondary-900">Engineering Dashboard</h1>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-primary-100 text-primary-900'
                        : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-secondary-200">
          <button
            type="button"
            className="px-4 border-r border-secondary-200 text-secondary-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-secondary-400 focus-within:text-secondary-600">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2 border border-secondary-300 rounded-md leading-5 bg-white placeholder-secondary-500 focus:outline-none focus:placeholder-secondary-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Search tools, formulas, charts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="ml-4 flex items-center md:ml-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-secondary-400" />
                  <span className="text-sm font-medium text-secondary-700">{user.username}</span>
                  {user.role === 'admin' && (
                    <span className="badge badge-info">Admin</span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-secondary-400 hover:text-secondary-500"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}