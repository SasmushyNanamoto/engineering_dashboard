'use client';

import { useState } from 'react';

interface SurfaceFinishData {
  nValue: string;
  ra: string;
  rz: string;
  description: string;
  applications: string;
  machining: string;
}

const surfaceFinishData: SurfaceFinishData[] = [
  { nValue: 'N1', ra: '0.025', rz: '0.1', description: 'Mirror finish', applications: 'Optical components, precision instruments', machining: 'Lapping, polishing' },
  { nValue: 'N2', ra: '0.05', rz: '0.2', description: 'Super fine finish', applications: 'Bearing surfaces, hydraulic components', machining: 'Fine grinding, honing' },
  { nValue: 'N3', ra: '0.1', rz: '0.4', description: 'Fine finish', applications: 'Sliding surfaces, seals', machining: 'Grinding, fine turning' },
  { nValue: 'N4', ra: '0.2', rz: '0.8', description: 'Medium fine finish', applications: 'General precision parts', machining: 'Turning, milling' },
  { nValue: 'N5', ra: '0.4', rz: '1.6', description: 'Medium finish', applications: 'General engineering parts', machining: 'Turning, milling' },
  { nValue: 'N6', ra: '0.8', rz: '3.2', description: 'Medium coarse finish', applications: 'Non-critical surfaces', machining: 'Rough turning, milling' },
  { nValue: 'N7', ra: '1.6', rz: '6.3', description: 'Coarse finish', applications: 'Non-functional surfaces', machining: 'Rough machining' },
  { nValue: 'N8', ra: '3.2', rz: '12.5', description: 'Very coarse finish', applications: 'Casting surfaces', machining: 'Casting, forging' },
  { nValue: 'N9', ra: '6.3', rz: '25', description: 'Extremely coarse', applications: 'Rough surfaces', machining: 'Casting, flame cutting' },
  { nValue: 'N10', ra: '12.5', rz: '50', description: 'Rough surface', applications: 'Unfinished surfaces', machining: 'Casting, rough cutting' },
  { nValue: 'N11', ra: '25', rz: '100', description: 'Very rough surface', applications: 'Unfinished castings', machining: 'Casting only' },
  { nValue: 'N12', ra: '50', rz: '200', description: 'Extremely rough', applications: 'Unfinished surfaces', machining: 'Casting only' },
];

export default function SurfaceFinishChart() {
  const [selectedFinish, setSelectedFinish] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = surfaceFinishData.filter(finish =>
    finish.nValue.toLowerCase().includes(searchTerm.toLowerCase()) ||
    finish.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    finish.applications.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedFinishData = surfaceFinishData.find(f => f.nValue === selectedFinish);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search surface finishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Surface Finish Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>N Value</th>
              <th>Ra (μm)</th>
              <th>Rz (μm)</th>
              <th>Description</th>
              <th>Applications</th>
              <th>Machining Method</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((finish, index) => (
              <tr 
                key={index}
                onClick={() => setSelectedFinish(finish.nValue)}
                className={`cursor-pointer ${selectedFinish === finish.nValue ? 'bg-primary-50' : ''}`}
              >
                <td className="font-mono font-medium">{finish.nValue}</td>
                <td className="font-mono">{finish.ra}</td>
                <td className="font-mono">{finish.rz}</td>
                <td className="text-sm">{finish.description}</td>
                <td className="text-sm text-secondary-600">{finish.applications}</td>
                <td className="text-sm text-secondary-600">{finish.machining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Finish Details */}
      {selectedFinishData && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            {selectedFinishData.nValue} - {selectedFinishData.description}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Specifications</h4>
              <div className="space-y-2 text-sm text-blue-700">
                <div><strong>Ra (Average Roughness):</strong> {selectedFinishData.ra} μm</div>
                <div><strong>Rz (Maximum Height):</strong> {selectedFinishData.rz} μm</div>
                <div><strong>Description:</strong> {selectedFinishData.description}</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Applications</h4>
              <p className="text-sm text-blue-700">{selectedFinishData.applications}</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Machining Methods</h4>
              <p className="text-sm text-blue-700">{selectedFinishData.machining}</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Quality Level</h4>
              <div className="text-sm text-blue-700">
                {parseInt(selectedFinishData.nValue.slice(1)) <= 3 ? (
                  <span className="text-green-600 font-medium">High Precision</span>
                ) : parseInt(selectedFinishData.nValue.slice(1)) <= 6 ? (
                  <span className="text-yellow-600 font-medium">Standard Precision</span>
                ) : (
                  <span className="text-red-600 font-medium">Rough Finish</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Surface Finish Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-900 mb-2">Surface Finish Parameters</h4>
          <div className="space-y-2 text-sm text-green-800">
            <div><strong>Ra (Average Roughness):</strong> Arithmetic average of surface heights</div>
            <div><strong>Rz (Maximum Height):</strong> Average of 5 highest peaks and 5 lowest valleys</div>
            <div><strong>N Value:</strong> ISO standard classification system</div>
            <div><strong>μm (Micrometer):</strong> Unit of measurement (1 μm = 0.001 mm)</div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900 mb-2">Selection Guidelines</h4>
          <div className="space-y-1 text-sm text-yellow-800">
            <div>• N1-N3: High precision applications</div>
            <div>• N4-N6: General engineering parts</div>
            <div>• N7-N9: Non-critical surfaces</div>
            <div>• N10-N12: Unfinished surfaces</div>
          </div>
        </div>
      </div>

      {/* Measurement Methods */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
        <h4 className="font-medium text-secondary-900 mb-2">Surface Finish Measurement</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-secondary-700">
          <div>
            <h5 className="font-medium text-secondary-800 mb-1">Contact Methods</h5>
            <ul className="space-y-1">
              <li>• Profilometer (stylus)</li>
              <li>• Surface roughness tester</li>
              <li>• Contact probe measurement</li>
              <li>• Most accurate method</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-secondary-800 mb-1">Non-Contact Methods</h5>
            <ul className="space-y-1">
              <li>• Optical profilometer</li>
              <li>• Laser scanning</li>
              <li>• White light interferometry</li>
              <li>• Faster but less accurate</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Common Applications */}
      <div className="card">
        <h4 className="font-medium text-secondary-900 mb-4">Common Applications by Finish</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <h5 className="font-medium text-secondary-800">High Precision (N1-N3)</h5>
            <ul className="space-y-1 text-secondary-600">
              <li>• Bearing surfaces</li>
              <li>• Hydraulic components</li>
              <li>• Optical components</li>
              <li>• Precision instruments</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-secondary-800">Standard (N4-N6)</h5>
            <ul className="space-y-1 text-secondary-600">
              <li>• General engineering parts</li>
              <li>• Sliding surfaces</li>
              <li>• Seals and gaskets</li>
              <li>• Assembly components</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-secondary-800">Rough (N7-N12)</h5>
            <ul className="space-y-1 text-secondary-600">
              <li>• Non-functional surfaces</li>
              <li>• Casting surfaces</li>
              <li>• Unfinished parts</li>
              <li>• Structural components</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}