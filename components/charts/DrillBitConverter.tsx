'use client';

import { useState } from 'react';
import { Search, Calculator } from 'lucide-react';

interface DrillBitData {
  fraction: string;
  decimal: string;
  metric: string;
  letter: string;
  number: string;
}

const drillBitData: DrillBitData[] = [
  { fraction: '1/64', decimal: '0.0156', metric: '0.397', letter: '', number: '' },
  { fraction: '1/32', decimal: '0.0313', metric: '0.794', letter: '', number: '' },
  { fraction: '3/64', decimal: '0.0469', metric: '1.191', letter: '', number: '' },
  { fraction: '1/16', decimal: '0.0625', metric: '1.588', letter: '', number: '60' },
  { fraction: '5/64', decimal: '0.0781', metric: '1.984', letter: '', number: '59' },
  { fraction: '3/32', decimal: '0.0938', metric: '2.381', letter: '', number: '58' },
  { fraction: '7/64', decimal: '0.1094', metric: '2.778', letter: '', number: '57' },
  { fraction: '1/8', decimal: '0.1250', metric: '3.175', letter: '', number: '56' },
  { fraction: '9/64', decimal: '0.1406', metric: '3.572', letter: '', number: '55' },
  { fraction: '5/32', decimal: '0.1563', metric: '3.969', letter: '', number: '54' },
  { fraction: '11/64', decimal: '0.1719', metric: '4.366', letter: '', number: '53' },
  { fraction: '3/16', decimal: '0.1875', metric: '4.763', letter: '', number: '52' },
  { fraction: '13/64', decimal: '0.2031', metric: '5.159', letter: '', number: '51' },
  { fraction: '7/32', decimal: '0.2188', metric: '5.556', letter: '', number: '50' },
  { fraction: '15/64', decimal: '0.2344', metric: '5.953', letter: '', number: '49' },
  { fraction: '1/4', decimal: '0.2500', metric: '6.350', letter: '', number: '48' },
  { fraction: '17/64', decimal: '0.2656', metric: '6.747', letter: '', number: '47' },
  { fraction: '9/32', decimal: '0.2813', metric: '7.144', letter: '', number: '46' },
  { fraction: '19/64', decimal: '0.2969', metric: '7.541', letter: '', number: '45' },
  { fraction: '5/16', decimal: '0.3125', metric: '7.938', letter: '', number: '44' },
  { fraction: '21/64', decimal: '0.3281', metric: '8.334', letter: '', number: '43' },
  { fraction: '11/32', decimal: '0.3438', metric: '8.731', letter: '', number: '42' },
  { fraction: '23/64', decimal: '0.3594', metric: '9.128', letter: '', number: '41' },
  { fraction: '3/8', decimal: '0.3750', metric: '9.525', letter: '', number: '40' },
  { fraction: '25/64', decimal: '0.3906', metric: '9.922', letter: '', number: '39' },
  { fraction: '13/32', decimal: '0.4063', metric: '10.319', letter: '', number: '38' },
  { fraction: '27/64', decimal: '0.4219', metric: '10.716', letter: '', number: '37' },
  { fraction: '7/16', decimal: '0.4375', metric: '11.113', letter: '', number: '36' },
  { fraction: '29/64', decimal: '0.4531', metric: '11.509', letter: '', number: '35' },
  { fraction: '15/32', decimal: '0.4688', metric: '11.906', letter: '', number: '34' },
  { fraction: '31/64', decimal: '0.4844', metric: '12.303', letter: '', number: '33' },
  { fraction: '1/2', decimal: '0.5000', metric: '12.700', letter: '', number: '32' },
  { fraction: '33/64', decimal: '0.5156', metric: '13.097', letter: '', number: '31' },
  { fraction: '17/32', decimal: '0.5313', metric: '13.494', letter: '', number: '30' },
  { fraction: '35/64', decimal: '0.5469', metric: '13.891', letter: '', number: '29' },
  { fraction: '9/16', decimal: '0.5625', metric: '14.288', letter: '', number: '28' },
  { fraction: '37/64', decimal: '0.5781', metric: '14.684', letter: '', number: '27' },
  { fraction: '19/32', decimal: '0.5938', metric: '15.081', letter: '', number: '26' },
  { fraction: '39/64', decimal: '0.6094', metric: '15.478', letter: '', number: '25' },
  { fraction: '5/8', decimal: '0.6250', metric: '15.875', letter: '', number: '24' },
  { fraction: '41/64', decimal: '0.6406', metric: '16.272', letter: '', number: '23' },
  { fraction: '21/32', decimal: '0.6563', metric: '16.669', letter: '', number: '22' },
  { fraction: '43/64', decimal: '0.6719', metric: '17.066', letter: '', number: '21' },
  { fraction: '11/16', decimal: '0.6875', metric: '17.463', letter: '', number: '20' },
  { fraction: '45/64', decimal: '0.7031', metric: '17.859', letter: '', number: '19' },
  { fraction: '23/32', decimal: '0.7188', metric: '18.256', letter: '', number: '18' },
  { fraction: '47/64', decimal: '0.7344', metric: '18.653', letter: '', number: '17' },
  { fraction: '3/4', decimal: '0.7500', metric: '19.050', letter: '', number: '16' },
  { fraction: '49/64', decimal: '0.7656', metric: '19.447', letter: '', number: '15' },
  { fraction: '25/32', decimal: '0.7813', metric: '19.844', letter: '', number: '14' },
  { fraction: '51/64', decimal: '0.7969', metric: '20.241', letter: '', number: '13' },
  { fraction: '13/16', decimal: '0.8125', metric: '20.638', letter: '', number: '12' },
  { fraction: '53/64', decimal: '0.8281', metric: '21.034', letter: '', number: '11' },
  { fraction: '27/32', decimal: '0.8438', metric: '21.431', letter: '', number: '10' },
  { fraction: '55/64', decimal: '0.8594', metric: '21.828', letter: '', number: '9' },
  { fraction: '7/8', decimal: '0.8750', metric: '22.225', letter: '', number: '8' },
  { fraction: '57/64', decimal: '0.8906', metric: '22.622', letter: '', number: '7' },
  { fraction: '29/32', decimal: '0.9063', metric: '23.019', letter: '', number: '6' },
  { fraction: '59/64', decimal: '0.9219', metric: '23.416', letter: '', number: '5' },
  { fraction: '15/16', decimal: '0.9375', metric: '23.813', letter: '', number: '4' },
  { fraction: '61/64', decimal: '0.9531', metric: '24.209', letter: '', number: '3' },
  { fraction: '31/32', decimal: '0.9688', metric: '24.606', letter: '', number: '2' },
  { fraction: '63/64', decimal: '0.9844', metric: '25.003', letter: '', number: '1' },
  { fraction: '1', decimal: '1.0000', metric: '25.400', letter: '', number: '' },
];

export default function DrillBitConverter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState<'fraction' | 'decimal' | 'metric'>('fraction');
  const [result, setResult] = useState<DrillBitData | null>(null);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleConvert = () => {
    if (!inputValue) return;

    let found: DrillBitData | null = null;

    switch (inputType) {
      case 'fraction':
        found = drillBitData.find(bit => bit.fraction === inputValue);
        break;
      case 'decimal':
        const decimalValue = parseFloat(inputValue);
        found = drillBitData.find(bit => Math.abs(parseFloat(bit.decimal) - decimalValue) < 0.001);
        break;
      case 'metric':
        const metricValue = parseFloat(inputValue);
        found = drillBitData.find(bit => Math.abs(parseFloat(bit.metric) - metricValue) < 0.1);
        break;
    }

    setResult(found || null);
  };

  const filteredData = drillBitData.filter(bit => 
    bit.fraction.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bit.decimal.includes(searchTerm) ||
    bit.metric.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Converter Tool */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Quick Converter</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Input Type</label>
            <select
              value={inputType}
              onChange={(e) => setInputType(e.target.value as any)}
              className="input-field"
            >
              <option value="fraction">Fraction</option>
              <option value="decimal">Decimal</option>
              <option value="metric">Metric (mm)</option>
            </select>
          </div>
          <div>
            <label className="form-label">Value</label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="input-field"
              placeholder={inputType === 'fraction' ? 'e.g., 1/4' : inputType === 'decimal' ? 'e.g., 0.25' : 'e.g., 6.35'}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleConvert}
              className="btn-primary w-full"
            >
              Convert
            </button>
          </div>
        </div>

        {result && (
          <div className="mt-4 bg-white rounded-lg p-4 border border-blue-300">
            <h4 className="font-medium text-blue-900 mb-2">Conversion Result</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-blue-600">Fraction:</span>
                <div className="font-mono font-medium">{result.fraction}</div>
              </div>
              <div>
                <span className="text-blue-600">Decimal:</span>
                <div className="font-mono font-medium">{result.decimal}</div>
              </div>
              <div>
                <span className="text-blue-600">Metric:</span>
                <div className="font-mono font-medium">{result.metric} mm</div>
              </div>
              {result.number && (
                <div>
                  <span className="text-blue-600">Number:</span>
                  <div className="font-mono font-medium">#{result.number}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
        <input
          type="text"
          placeholder="Search drill bits..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Drill Bit Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Fraction</th>
              <th>Decimal (inches)</th>
              <th>Metric (mm)</th>
              <th>Number Size</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((bit, index) => (
              <tr key={index}>
                <td className="font-mono font-medium">{bit.fraction}</td>
                <td className="font-mono">{bit.decimal}</td>
                <td className="font-mono">{bit.metric}</td>
                <td className="font-mono">{bit.number ? `#${bit.number}` : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-900 mb-2">Common Drill Sizes</h4>
          <div className="space-y-1 text-sm text-green-800">
            <div>1/16" - Small pilot holes</div>
            <div>1/8" - Standard pilot holes</div>
            <div>1/4" - Common fastener size</div>
            <div>3/8" - Medium applications</div>
            <div>1/2" - Large applications</div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900 mb-2">Conversion Tips</h4>
          <div className="space-y-1 text-sm text-yellow-800">
            <div>• 1 inch = 25.4 mm</div>
            <div>• For tap drill: subtract pitch from major diameter</div>
            <div>• Letter sizes: A-Z (0.234" to 0.413")</div>
            <div>• Number sizes: #80 to #1 (0.0135" to 0.228")</div>
          </div>
        </div>
      </div>
    </div>
  );
}