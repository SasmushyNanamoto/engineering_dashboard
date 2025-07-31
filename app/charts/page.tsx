import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Download, Search, Calculator } from 'lucide-react';
import ThreadPitchTable from '@/components/charts/ThreadPitchTable';
import DrillBitConverter from '@/components/charts/DrillBitConverter';
import HardnessConverter from '@/components/charts/HardnessConverter';
import SurfaceFinishChart from '@/components/charts/SurfaceFinishChart';

export default async function ChartsPage() {
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
              <h1 className="text-2xl font-bold text-secondary-900">Charts & Conversions</h1>
              <p className="text-secondary-600 mt-2">
                Comprehensive reference charts and conversion tools for engineering applications
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="btn-secondary flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Download All Charts
              </button>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="#thread-pitch" className="card hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <Calculator className="h-8 w-8 text-primary-600 mr-3" />
              <div>
                <h3 className="font-medium text-secondary-900">Thread Pitch</h3>
                <p className="text-sm text-secondary-600">Metric to Imperial</p>
              </div>
            </div>
          </a>

          <a href="#drill-bits" className="card hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <Calculator className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-secondary-900">Drill Bits</h3>
                <p className="text-sm text-secondary-600">Fraction to Decimal</p>
              </div>
            </div>
          </a>

          <a href="#hardness" className="card hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <Calculator className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h3 className="font-medium text-secondary-900">Hardness Scales</h3>
                <p className="text-sm text-secondary-600">Brinell, Rockwell, Vickers</p>
              </div>
            </div>
          </a>

          <a href="#surface-finish" className="card hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <Calculator className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h3 className="font-medium text-secondary-900">Surface Finish</h3>
                <p className="text-sm text-secondary-600">Ra, Rz, N values</p>
              </div>
            </div>
          </a>
        </div>

        {/* Thread Pitch Table */}
        <div id="thread-pitch" className="card">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">
            Thread Pitch Conversion Table
          </h2>
          <ThreadPitchTable />
        </div>

        {/* Drill Bit Converter */}
        <div id="drill-bits" className="card">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">
            Drill Bit Size Converter
          </h2>
          <DrillBitConverter />
        </div>

        {/* Hardness Converter */}
        <div id="hardness" className="card">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">
            Hardness Scale Converter
          </h2>
          <HardnessConverter />
        </div>

        {/* Surface Finish Chart */}
        <div id="surface-finish" className="card">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">
            Surface Finish Reference Chart
          </h2>
          <SurfaceFinishChart />
        </div>

        {/* Additional Conversion Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Temperature Conversion */}
          <div className="card">
            <h3 className="text-md font-semibold text-secondary-900 mb-4">
              Temperature Conversion
            </h3>
            <div className="space-y-3">
              <div className="formula-box">
                <strong>°F to °C:</strong> (°F - 32) × 5/9
              </div>
              <div className="formula-box">
                <strong>°C to °F:</strong> (°C × 9/5) + 32
              </div>
              <div className="formula-box">
                <strong>°C to K:</strong> °C + 273.15
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Common Temperatures:</strong><br/>
                Room Temp: 20°C (68°F)<br/>
                Water Boiling: 100°C (212°F)<br/>
                Steel Annealing: 800-900°C (1472-1652°F)
              </p>
            </div>
          </div>

          {/* Pressure Conversion */}
          <div className="card">
            <h3 className="text-md font-semibold text-secondary-900 mb-4">
              Pressure Conversion
            </h3>
            <div className="space-y-3">
              <div className="formula-box">
                <strong>PSI to Bar:</strong> PSI × 0.0689
              </div>
              <div className="formula-box">
                <strong>Bar to PSI:</strong> Bar × 14.5038
              </div>
              <div className="formula-box">
                <strong>MPa to PSI:</strong> MPa × 145.038
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Common Pressures:</strong><br/>
                Atmospheric: 14.7 PSI (1.013 bar)<br/>
                Hydraulic: 2000-3000 PSI<br/>
                Pneumatic: 80-120 PSI
              </p>
            </div>
          </div>
        </div>

        {/* Material Properties */}
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">
            Common Material Properties
          </h2>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Density (g/cm³)</th>
                  <th>Tensile Strength (MPa)</th>
                  <th>Yield Strength (MPa)</th>
                  <th>Elastic Modulus (GPa)</th>
                  <th>Thermal Conductivity (W/m·K)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mild Steel</td>
                  <td>7.85</td>
                  <td>400-550</td>
                  <td>250-350</td>
                  <td>200</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>Stainless Steel 304</td>
                  <td>8.0</td>
                  <td>520</td>
                  <td>205</td>
                  <td>193</td>
                  <td>16.2</td>
                </tr>
                <tr>
                  <td>Aluminum 6061</td>
                  <td>2.7</td>
                  <td>310</td>
                  <td>276</td>
                  <td>68.9</td>
                  <td>167</td>
                </tr>
                <tr>
                  <td>Copper</td>
                  <td>8.96</td>
                  <td>220</td>
                  <td>70</td>
                  <td>110</td>
                  <td>401</td>
                </tr>
                <tr>
                  <td>Titanium Grade 2</td>
                  <td>4.51</td>
                  <td>345</td>
                  <td>275</td>
                  <td>105</td>
                  <td>21.9</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-900">
              Report Issues or Request Changes
            </h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-600">All charts verified</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="btn-primary">
              Report Accuracy Issue
            </button>
            <button className="btn-secondary">
              Request Additional Charts
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}