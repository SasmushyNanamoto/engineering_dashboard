import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Zap, 
  Scissors, 
  RotateCcw, 
  Drill, 
  BarChart3, 
  Wrench, 
  Shield, 
  Users, 
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }

  const quickTools = [
    {
      name: 'Welding',
      description: 'Joint types, weld symbols, settings',
      href: '/welding',
      icon: Zap,
      color: 'bg-orange-500',
    },
    {
      name: 'Turning',
      description: 'Speeds & feeds, thread cutting',
      href: '/turning',
      icon: RotateCcw,
      color: 'bg-blue-500',
    },
    {
      name: 'Charts & Conversions',
      description: 'Thread pitch, drill bits, hardness',
      href: '/charts',
      icon: BarChart3,
      color: 'bg-green-500',
    },
    {
      name: 'Safety & PPE',
      description: 'Safety guidelines and equipment',
      href: '/safety',
      icon: Shield,
      color: 'bg-red-500',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'formula_used',
      title: 'Welding current calculation',
      description: 'Used MIG welding current formula',
      time: '2 hours ago',
      icon: Zap,
    },
    {
      id: 2,
      type: 'conversion',
      title: 'Thread pitch conversion',
      description: 'Converted M8 to imperial thread',
      time: '4 hours ago',
      icon: BarChart3,
    },
    {
      id: 3,
      type: 'safety_check',
      title: 'PPE requirements checked',
      description: 'Reviewed grinding safety requirements',
      time: '1 day ago',
      icon: Shield,
    },
  ];

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
          <h1 className="text-2xl font-bold text-secondary-900">
            Welcome back, {user.username}!
          </h1>
          <p className="text-secondary-600 mt-2">
            Access your professional engineering tools and resources
          </p>
        </div>

        {/* Quick Tools Grid */}
        <div>
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">
            Quick Access Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${tool.color} text-white`}>
                    <tool.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-secondary-900">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-secondary-500 mt-1">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-500">Verified Formulas</p>
                <p className="text-2xl font-bold text-secondary-900">247</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-500">Time Saved</p>
                <p className="text-2xl font-bold text-secondary-900">12.5 hrs</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-500">Pending Reviews</p>
                <p className="text-2xl font-bold text-secondary-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-secondary-200">
          <div className="px-6 py-4 border-b border-secondary-200">
            <h2 className="text-lg font-semibold text-secondary-900">
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="p-2 bg-secondary-100 rounded-lg">
                    <activity.icon className="h-5 w-5 text-secondary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-secondary-900">
                      {activity.title}
                    </p>
                    <p className="text-xs text-secondary-500">
                      {activity.description}
                    </p>
                  </div>
                  <div className="text-xs text-secondary-400">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/forum"
              className="flex items-center p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
            >
              <Users className="h-5 w-5 text-primary-600 mr-3" />
              <span className="text-sm font-medium text-secondary-900">
                Join Community Discussion
              </span>
            </Link>
            
            <Link
              href="/feedback"
              className="flex items-center p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
            >
              <AlertTriangle className="h-5 w-5 text-accent-600 mr-3" />
              <span className="text-sm font-medium text-secondary-900">
                Report Accuracy Issue
              </span>
            </Link>
            
            <Link
              href="/guides"
              className="flex items-center p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
            >
              <TrendingUp className="h-5 w-5 text-green-600 mr-3" />
              <span className="text-sm font-medium text-secondary-900">
                View How-To Guides
              </span>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}