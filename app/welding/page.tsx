import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ChevronDown, ChevronRight, Download, AlertTriangle, CheckCircle } from 'lucide-react';
import WeldingCalculator from '@/components/welding/WeldingCalculator';
import WeldSymbols from '@/components/welding/WeldSymbols';
import JointTypes from '@/components/welding/JointTypes';

export default async function WeldingPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">Welding</h1>
              <p className="text-secondary-600 mt-2">
                Comprehensive welding guides, calculators, and reference materials
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="btn-secondary flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Download Charts
              </button>
            </div>
          </div>
        </div>

        {/* Safety Warning */}
        <div className="warning-box">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Safety First
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Always wear appropriate PPE including welding helmet, gloves, and protective clothing. 
                Ensure proper ventilation and follow all safety protocols.
              </p>
            </div>
          </div>
        </div>

        {/* Joint Types */}
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">
            Joint Types
          </h2>
          <JointTypes />
        </div>

        {/* Welding Calculator */}
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">
            Welding Calculator
          </h2>
          <WeldingCalculator />
        </div>

        {/* Weld Symbols */}
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">
            Weld Symbols & Diagrams
          </h2>
          <WeldSymbols />
        </div>

        {/* MIG/TIG/STICK Settings */}
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">
            Process Settings Cheat Sheet
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* MIG Settings */}
            <div className="border border-secondary-200 rounded-lg p-4">
              <h3 className="font-medium text-secondary-900 mb-3">MIG Welding</h3>
              <div className="space-y-3">
                <div className="formula-box">
                  <strong>Current (A):</strong> Wire Diameter (mm) × 125
                </div>
                <div className="formula-box">
                  <strong>Voltage (V):</strong> Current (A) × 0.04 + 14
                </div>
                <div className="formula-box">
                  <strong>Wire Speed:</strong> Current (A) × 2.5 (ipm)
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> For 0.035" wire on 1/4" steel: ~180A, 18V, 450 ipm
                </p>
              </div>
            </div>

            {/* TIG Settings */}
            <div className="border border-secondary-200 rounded-lg p-4">
              <h3 className="font-medium text-secondary-900 mb-3">TIG Welding</h3>
              <div className="space-y-3">
                <div className="formula-box">
                  <strong>Current (A):</strong> Material Thickness (mm) × 40
                </div>
                <div className="formula-box">
                  <strong>Gas Flow:</strong> 15-20 CFH (Argon)
                </div>
                <div className="formula-box">
                  <strong>Electrode:</strong> 2% Thoriated Tungsten
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> For 1/8" aluminum: ~50A, 15 CFH, 3/32" electrode
                </p>
              </div>
            </div>

            {/* STICK Settings */}
            <div className="border border-secondary-200 rounded-lg p-4">
              <h3 className="font-medium text-secondary-900 mb-3">STICK Welding</h3>
              <div className="space-y-3">
                <div className="formula-box">
                  <strong>Current (A):</strong> Electrode Diameter (mm) × 40
                </div>
                <div className="formula-box">
                  <strong>Arc Length:</strong> Electrode Diameter (mm)
                </div>
                <div className="formula-box">
                  <strong>Travel Speed:</strong> 6-8 inches/minute
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> For 1/8" 6013: ~125A, 1/8" arc length
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Weld Defects */}
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">
            Common Weld Defects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <h4 className="font-medium text-red-800 mb-2">Porosity</h4>
                <p className="text-sm text-red-700">
                  Gas pockets in weld. Caused by contaminated base metal, improper gas coverage, or moisture.
                </p>
                <p className="text-sm text-red-600 mt-2">
                  <strong>Prevention:</strong> Clean base metal, check gas flow, use dry electrodes
                </p>
              </div>

              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <h4 className="font-medium text-red-800 mb-2">Undercut</h4>
                <p className="text-sm text-red-700">
                  Groove melted into base metal at toe of weld. Caused by excessive current or travel speed.
                </p>
                <p className="text-sm text-red-600 mt-2">
                  <strong>Prevention:</strong> Reduce current, slow travel speed, proper angle
                </p>
              </div>

              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <h4 className="font-medium text-red-800 mb-2">Incomplete Fusion</h4>
                <p className="text-sm text-red-700">
                  Lack of fusion between weld metal and base metal. Caused by insufficient heat input.
                </p>
                <p className="text-sm text-red-600 mt-2">
                  <strong>Prevention:</strong> Increase current, proper joint preparation, correct technique
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <h4 className="font-medium text-red-800 mb-2">Cracking</h4>
                <p className="text-sm text-red-700">
                  Fractures in weld or heat affected zone. Caused by high restraint, improper preheat.
                </p>
                <p className="text-sm text-red-600 mt-2">
                  <strong>Prevention:</strong> Proper preheat, control cooling rate, correct filler metal
                </p>
              </div>

              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <h4 className="font-medium text-red-800 mb-2">Slag Inclusions</h4>
                <p className="text-sm text-red-700">
                  Non-metallic material trapped in weld. Common in stick welding with improper technique.
                </p>
                <p className="text-sm text-red-600 mt-2">
                  <strong>Prevention:</strong> Proper cleaning between passes, correct electrode angle
                </p>
              </div>

              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <h4 className="font-medium text-red-800 mb-2">Spatter</h4>
                <p className="text-sm text-red-700">
                  Small particles of weld metal expelled during welding. Caused by excessive current or voltage.
                </p>
                <p className="text-sm text-red-600 mt-2">
                  <strong>Prevention:</strong> Optimize settings, proper gas coverage, clean base metal
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-900">
              Report Issues or Request Changes
            </h2>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm text-green-600">Last verified: 2 days ago</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="btn-primary">
              Report Accuracy Issue
            </button>
            <button className="btn-secondary">
              Request Change
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}