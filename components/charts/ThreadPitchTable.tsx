'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface ThreadData {
  metric: string;
  imperial: string;
  pitch: string;
  tpi: string;
  majorDiameter: string;
  minorDiameter: string;
  tapDrill: string;
}

const threadData: ThreadData[] = [
  { metric: 'M3', imperial: '1/8-40', pitch: '0.5', tpi: '40', majorDiameter: '3.0', minorDiameter: '2.459', tapDrill: '2.5' },
  { metric: 'M4', imperial: '5/32-32', pitch: '0.7', tpi: '32', majorDiameter: '4.0', minorDiameter: '3.242', tapDrill: '3.3' },
  { metric: 'M5', imperial: '3/16-24', pitch: '0.8', tpi: '24', majorDiameter: '5.0', minorDiameter: '4.134', tapDrill: '4.2' },
  { metric: 'M6', imperial: '1/4-20', pitch: '1.0', tpi: '20', majorDiameter: '6.0', minorDiameter: '4.917', tapDrill: '5.0' },
  { metric: 'M8', imperial: '5/16-18', pitch: '1.25', tpi: '18', majorDiameter: '8.0', minorDiameter: '6.647', tapDrill: '6.8' },
  { metric: 'M10', imperial: '3/8-16', pitch: '1.5', tpi: '16', majorDiameter: '10.0', minorDiameter: '8.376', tapDrill: '8.5' },
  { metric: 'M12', imperial: '1/2-13', pitch: '1.75', tpi: '13', majorDiameter: '12.0', minorDiameter: '10.106', tapDrill: '10.2' },
  { metric: 'M14', imperial: '9/16-12', pitch: '2.0', tpi: '12', majorDiameter: '14.0', minorDiameter: '11.835', tapDrill: '12.0' },
  { metric: 'M16', imperial: '5/8-11', pitch: '2.0', tpi: '11', majorDiameter: '16.0', minorDiameter: '13.835', tapDrill: '14.0' },
  { metric: 'M20', imperial: '3/4-10', pitch: '2.5', tpi: '10', majorDiameter: '20.0', minorDiameter: '17.294', tapDrill: '17.5' },
  { metric: 'M24', imperial: '1-8', pitch: '3.0', tpi: '8', majorDiameter: '24.0', minorDiameter: '20.752', tapDrill: '21.0' },
  { metric: 'M30', imperial: '1 1/4-7', pitch: '3.5', tpi: '7', majorDiameter: '30.0', minorDiameter: '26.211', tapDrill: '26.5' },
];

export default function ThreadPitchTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'metric' | 'imperial'>('metric');

  const filteredData = threadData
    .filter(thread => 
      thread.metric.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.imperial.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'metric') {
        return parseInt(a.metric.slice(1)) - parseInt(b.metric.slice(1));
      } else {
        return a.imperial.localeCompare(b.imperial);
      }
    });

  return (
    <div className="space-y-4">
      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
          <input
            type="text"
            placeholder="Search threads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('metric')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              sortBy === 'metric'
                ? 'bg-primary-100 text-primary-700 border border-primary-300'
                : 'bg-secondary-100 text-secondary-700 border border-secondary-300 hover:bg-secondary-200'
            }`}
          >
            Sort by Metric
          </button>
          <button
            onClick={() => setSortBy('imperial')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              sortBy === 'imperial'
                ? 'bg-primary-100 text-primary-700 border border-primary-300'
                : 'bg-secondary-100 text-secondary-700 border border-secondary-300 hover:bg-secondary-200'
            }`}
          >
            Sort by Imperial
          </button>
        </div>
      </div>

      {/* Thread Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Metric Thread</th>
              <th>Imperial Equivalent</th>
              <th>Pitch (mm)</th>
              <th>TPI</th>
              <th>Major Diameter (mm)</th>
              <th>Minor Diameter (mm)</th>
              <th>Tap Drill (mm)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((thread, index) => (
              <tr key={index}>
                <td className="font-mono font-medium">{thread.metric}</td>
                <td className="font-mono">{thread.imperial}</td>
                <td className="font-mono">{thread.pitch}</td>
                <td className="font-mono">{thread.tpi}</td>
                <td className="font-mono">{thread.majorDiameter}</td>
                <td className="font-mono">{thread.minorDiameter}</td>
                <td className="font-mono">{thread.tapDrill}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Common Metric Threads</h4>
          <div className="space-y-1 text-sm text-blue-800">
            <div>M6 - Most common for small fasteners</div>
            <div>M8 - Standard for medium applications</div>
            <div>M10 - Common for structural connections</div>
            <div>M12 - Standard for heavy-duty applications</div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-900 mb-2">Common Imperial Threads</h4>
          <div className="space-y-1 text-sm text-green-800">
            <div>1/4-20 - Most common small thread</div>
            <div>3/8-16 - Standard medium thread</div>
            <div>1/2-13 - Common for structural</div>
            <div>3/4-10 - Heavy-duty applications</div>
          </div>
        </div>
      </div>

      {/* Thread Formulas */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
        <h4 className="font-medium text-secondary-900 mb-2">Thread Formulas</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="formula-box">
            <strong>Pitch to TPI:</strong> TPI = 25.4 ÷ Pitch (mm)
          </div>
          <div className="formula-box">
            <strong>TPI to Pitch:</strong> Pitch (mm) = 25.4 ÷ TPI
          </div>
          <div className="formula-box">
            <strong>Minor Diameter:</strong> Major Diameter - (1.0825 × Pitch)
          </div>
          <div className="formula-box">
            <strong>Tap Drill Size:</strong> Major Diameter - Pitch
          </div>
        </div>
      </div>
    </div>
  );
}