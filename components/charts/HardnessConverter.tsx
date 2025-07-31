'use client';

import { useState } from 'react';

interface HardnessData {
  material: string;
  brinell: string;
  rockwellB: string;
  rockwellC: string;
  vickers: string;
  description: string;
}

const hardnessData: HardnessData[] = [
  { material: 'Mild Steel', brinell: '120-180', rockwellB: '70-95', rockwellC: '15-25', vickers: '130-190', description: 'Low carbon steel' },
  { material: 'Medium Carbon Steel', brinell: '180-250', rockwellB: '95-105', rockwellC: '25-35', vickers: '190-260', description: '0.3-0.6% carbon' },
  { material: 'High Carbon Steel', brinell: '250-350', rockwellB: '105-115', rockwellC: '35-45', vickers: '260-370', description: '0.6-1.0% carbon' },
  { material: 'Tool Steel', brinell: '350-600', rockwellB: '115-125', rockwellC: '45-65', vickers: '370-630', description: 'High hardness for tools' },
  { material: 'Stainless Steel 304', brinell: '150-200', rockwellB: '80-95', rockwellC: '20-30', vickers: '160-210', description: 'Austenitic stainless' },
  { material: 'Stainless Steel 316', brinell: '160-210', rockwellB: '85-100', rockwellC: '25-35', vickers: '170-220', description: 'Corrosion resistant' },
  { material: 'Aluminum 6061', brinell: '30-95', rockwellB: '40-70', rockwellC: 'N/A', vickers: '35-100', description: 'Heat treatable aluminum' },
  { material: 'Copper', brinell: '35-95', rockwellB: '45-75', rockwellC: 'N/A', vickers: '40-100', description: 'Pure copper' },
  { material: 'Brass', brinell: '55-140', rockwellB: '55-85', rockwellC: 'N/A', vickers: '60-150', description: 'Copper-zinc alloy' },
  { material: 'Cast Iron', brinell: '150-300', rockwellB: '85-110', rockwellC: '20-40', vickers: '160-320', description: 'Gray cast iron' },
];

export default function HardnessConverter() {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [inputScale, setInputScale] = useState<'brinell' | 'rockwellB' | 'rockwellC' | 'vickers'>('brinell');
  const [result, setResult] = useState<HardnessData | null>(null);

  const handleConvert = () => {
    if (!inputValue || !selectedMaterial) return;

    const material = hardnessData.find(m => m.material === selectedMaterial);
    if (!material) return;

    setResult(material);
  };

  const getApproximateConversions = (value: number, scale: string) => {
    const conversions: { [key: string]: string } = {};
    
    switch (scale) {
      case 'brinell':
        // Approximate conversions (these are rough estimates)
        conversions.rockwellB = `${Math.round(value * 0.5 + 20)}`;
        conversions.rockwellC = `${Math.round(value * 0.15 - 5)}`;
        conversions.vickers = `${Math.round(value * 1.05)}`;
        break;
      case 'rockwellB':
        conversions.brinell = `${Math.round((value - 20) * 2)}`;
        conversions.rockwellC = `${Math.round((value - 20) * 0.3)}`;
        conversions.vickers = `${Math.round((value - 20) * 2.1)}`;
        break;
      case 'rockwellC':
        conversions.brinell = `${Math.round((value + 5) * 6.7)}`;
        conversions.rockwellB = `${Math.round((value + 5) * 3.3 + 20)}`;
        conversions.vickers = `${Math.round((value + 5) * 7)}`;
        break;
      case 'vickers':
        conversions.brinell = `${Math.round(value * 0.95)}`;
        conversions.rockwellB = `${Math.round(value * 0.48 + 20)}`;
        conversions.rockwellC = `${Math.round(value * 0.14 - 5)}`;
        break;
    }

    return conversions;
  };

  return (
    <div className="space-y-6">
      {/* Converter Tool */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-4">Hardness Converter</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Material</label>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="input-field"
            >
              <option value="">Select Material</option>
              {hardnessData.map((material) => (
                <option key={material.material} value={material.material}>
                  {material.material}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Hardness Scale</label>
            <select
              value={inputScale}
              onChange={(e) => setInputScale(e.target.value as any)}
              className="input-field"
            >
              <option value="brinell">Brinell (HB)</option>
              <option value="rockwellB">Rockwell B (HRB)</option>
              <option value="rockwellC">Rockwell C (HRC)</option>
              <option value="vickers">Vickers (HV)</option>
            </select>
          </div>
          <div>
            <label className="form-label">Value</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="input-field"
              placeholder="Enter hardness value"
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleConvert}
            className="btn-primary"
            disabled={!selectedMaterial || !inputValue}
          >
            Get Material Values
          </button>
          <button
            onClick={() => {
              if (inputValue && inputScale) {
                const conversions = getApproximateConversions(parseFloat(inputValue), inputScale);
                setResult({
                  material: 'Approximate Conversion',
                  brinell: conversions.brinell || 'N/A',
                  rockwellB: conversions.rockwellB || 'N/A',
                  rockwellC: conversions.rockwellC || 'N/A',
                  vickers: conversions.vickers || 'N/A',
                  description: 'Estimated conversion (not exact)'
                });
              }
            }}
            className="btn-secondary"
            disabled={!inputValue}
          >
            Approximate Conversion
          </button>
        </div>

        {result && (
          <div className="mt-4 bg-white rounded-lg p-4 border border-green-300">
            <h4 className="font-medium text-green-900 mb-2">{result.material}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-green-600">Brinell (HB):</span>
                <div className="font-mono font-medium">{result.brinell}</div>
              </div>
              <div>
                <span className="text-green-600">Rockwell B (HRB):</span>
                <div className="font-mono font-medium">{result.rockwellB}</div>
              </div>
              <div>
                <span className="text-green-600">Rockwell C (HRC):</span>
                <div className="font-mono font-medium">{result.rockwellC}</div>
              </div>
              <div>
                <span className="text-green-600">Vickers (HV):</span>
                <div className="font-mono font-medium">{result.vickers}</div>
              </div>
            </div>
            <p className="text-xs text-green-700 mt-2">{result.description}</p>
          </div>
        )}
      </div>

      {/* Hardness Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Material</th>
              <th>Brinell (HB)</th>
              <th>Rockwell B (HRB)</th>
              <th>Rockwell C (HRC)</th>
              <th>Vickers (HV)</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {hardnessData.map((material, index) => (
              <tr key={index}>
                <td className="font-medium">{material.material}</td>
                <td className="font-mono">{material.brinell}</td>
                <td className="font-mono">{material.rockwellB}</td>
                <td className="font-mono">{material.rockwellC}</td>
                <td className="font-mono">{material.vickers}</td>
                <td className="text-sm text-secondary-600">{material.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hardness Scale Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Hardness Scales</h4>
          <div className="space-y-2 text-sm text-blue-800">
            <div><strong>Brinell (HB):</strong> Uses 10mm steel ball, good for soft to medium materials</div>
            <div><strong>Rockwell B (HRB):</strong> Uses 1/16" steel ball, for softer materials</div>
            <div><strong>Rockwell C (HRC):</strong> Uses diamond cone, for harder materials</div>
            <div><strong>Vickers (HV):</strong> Uses diamond pyramid, most accurate</div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900 mb-2">Conversion Notes</h4>
          <div className="space-y-1 text-sm text-yellow-800">
            <div>• Conversions are approximate</div>
            <div>• Material composition affects accuracy</div>
            <div>• Heat treatment changes hardness</div>
            <div>• Test method affects results</div>
          </div>
        </div>
      </div>

      {/* Hardness Testing Tips */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
        <h4 className="font-medium text-secondary-900 mb-2">Hardness Testing Tips</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-secondary-700">
          <div>
            <h5 className="font-medium text-secondary-800 mb-1">Surface Preparation</h5>
            <ul className="space-y-1">
              <li>• Clean, smooth surface required</li>
              <li>• Remove scale, rust, coatings</li>
              <li>• Surface should be flat</li>
              <li>• Minimum thickness: 10x indentation depth</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-secondary-800 mb-1">Testing Conditions</h5>
            <ul className="space-y-1">
              <li>• Room temperature (20°C)</li>
              <li>• Stable mounting</li>
              <li>• Proper test force</li>
              <li>• Multiple readings for accuracy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}