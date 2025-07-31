'use client';

import { useState } from 'react';
import { Calculator, Zap, Settings } from 'lucide-react';

interface CalculationResult {
  current: number;
  voltage: number;
  wireSpeed?: number;
  gasFlow?: number;
  arcLength?: number;
  travelSpeed?: number;
}

export default function WeldingCalculator() {
  const [process, setProcess] = useState<'mig' | 'tig' | 'stick'>('mig');
  const [materialThickness, setMaterialThickness] = useState('');
  const [wireDiameter, setWireDiameter] = useState('');
  const [electrodeDiameter, setElectrodeDiameter] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateSettings = () => {
    const thickness = parseFloat(materialThickness);
    const wire = parseFloat(wireDiameter);
    const electrode = parseFloat(electrodeDiameter);

    if (isNaN(thickness)) return;

    let calculatedResult: CalculationResult;

    switch (process) {
      case 'mig':
        if (isNaN(wire)) return;
        const current = wire * 125;
        const voltage = current * 0.04 + 14;
        const wireSpeed = current * 2.5;
        calculatedResult = { current, voltage, wireSpeed };
        break;

      case 'tig':
        const tigCurrent = thickness * 40;
        const gasFlow = 17.5; // Average CFH
        calculatedResult = { current: tigCurrent, voltage: 0, gasFlow };
        break;

      case 'stick':
        if (isNaN(electrode)) return;
        const stickCurrent = electrode * 40;
        const arcLength = electrode;
        const travelSpeed = 7; // inches per minute
        calculatedResult = { current: stickCurrent, voltage: 0, arcLength, travelSpeed };
        break;

      default:
        return;
    }

    setResult(calculatedResult);
  };

  return (
    <div className="space-y-6">
      {/* Process Selection */}
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => setProcess('mig')}
          className={`p-4 rounded-lg border-2 transition-colors ${
            process === 'mig'
              ? 'border-primary-500 bg-primary-50 text-primary-700'
              : 'border-secondary-200 hover:border-secondary-300'
          }`}
        >
          <Zap className="h-6 w-6 mx-auto mb-2" />
          <span className="text-sm font-medium">MIG</span>
        </button>
        <button
          onClick={() => setProcess('tig')}
          className={`p-4 rounded-lg border-2 transition-colors ${
            process === 'tig'
              ? 'border-primary-500 bg-primary-50 text-primary-700'
              : 'border-secondary-200 hover:border-secondary-300'
          }`}
        >
          <Settings className="h-6 w-6 mx-auto mb-2" />
          <span className="text-sm font-medium">TIG</span>
        </button>
        <button
          onClick={() => setProcess('stick')}
          className={`p-4 rounded-lg border-2 transition-colors ${
            process === 'stick'
              ? 'border-primary-500 bg-primary-50 text-primary-700'
              : 'border-secondary-200 hover:border-secondary-300'
          }`}
        >
          <Calculator className="h-6 w-6 mx-auto mb-2" />
          <span className="text-sm font-medium">STICK</span>
        </button>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Material Thickness (mm)</label>
          <input
            type="number"
            step="0.1"
            value={materialThickness}
            onChange={(e) => setMaterialThickness(e.target.value)}
            className="input-field"
            placeholder="e.g., 6.35"
          />
        </div>

        {process === 'mig' && (
          <div>
            <label className="form-label">Wire Diameter (mm)</label>
            <input
              type="number"
              step="0.1"
              value={wireDiameter}
              onChange={(e) => setWireDiameter(e.target.value)}
              className="input-field"
              placeholder="e.g., 0.9"
            />
          </div>
        )}

        {process === 'stick' && (
          <div>
            <label className="form-label">Electrode Diameter (mm)</label>
            <input
              type="number"
              step="0.1"
              value={electrodeDiameter}
              onChange={(e) => setElectrodeDiameter(e.target.value)}
              className="input-field"
              placeholder="e.g., 3.2"
            />
          </div>
        )}
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateSettings}
        className="btn-primary w-full md:w-auto"
        disabled={!materialThickness}
      >
        Calculate Settings
      </button>

      {/* Results */}
      {result && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">
            Recommended Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="text-sm text-green-600 mb-1">Current</div>
              <div className="text-2xl font-bold text-green-800">
                {result.current.toFixed(0)} A
              </div>
            </div>

            {result.voltage > 0 && (
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="text-sm text-green-600 mb-1">Voltage</div>
                <div className="text-2xl font-bold text-green-800">
                  {result.voltage.toFixed(1)} V
                </div>
              </div>
            )}

            {result.wireSpeed && (
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="text-sm text-green-600 mb-1">Wire Speed</div>
                <div className="text-2xl font-bold text-green-800">
                  {result.wireSpeed.toFixed(0)} ipm
                </div>
              </div>
            )}

            {result.gasFlow && (
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="text-sm text-green-600 mb-1">Gas Flow</div>
                <div className="text-2xl font-bold text-green-800">
                  {result.gasFlow} CFH
                </div>
              </div>
            )}

            {result.arcLength && (
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="text-sm text-green-600 mb-1">Arc Length</div>
                <div className="text-2xl font-bold text-green-800">
                  {result.arcLength} mm
                </div>
              </div>
            )}

            {result.travelSpeed && (
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="text-sm text-green-600 mb-1">Travel Speed</div>
                <div className="text-2xl font-bold text-green-800">
                  {result.travelSpeed} ipm
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> These are starting settings. Adjust based on your specific conditions, 
              material type, and joint configuration. Always test on scrap material first.
            </p>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">Quick Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Start with these settings and adjust based on sound and appearance</li>
          <li>• For thicker materials, increase current by 10-20%</li>
          <li>• For thin materials, reduce current to prevent burn-through</li>
          <li>• Always wear appropriate PPE and ensure proper ventilation</li>
        </ul>
      </div>
    </div>
  );
}