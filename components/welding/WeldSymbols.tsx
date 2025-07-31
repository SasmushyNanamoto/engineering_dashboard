'use client';

import { useState } from 'react';

interface WeldSymbol {
  symbol: string;
  name: string;
  description: string;
  application: string;
  notes: string;
}

const weldSymbols: WeldSymbol[] = [
  {
    symbol: '◄',
    name: 'Fillet Weld',
    description: 'Triangular cross-section weld',
    application: 'T-joints, lap joints, corner joints',
    notes: 'Most common weld type, no edge preparation required'
  },
  {
    symbol: '◄►',
    name: 'Butt Weld',
    description: 'Weld joining two pieces end-to-end',
    application: 'Pipe welding, plate joining',
    notes: 'Requires edge preparation for thicker materials'
  },
  {
    symbol: '◄◄',
    name: 'Double Fillet',
    description: 'Two fillet welds on opposite sides',
    application: 'T-joints requiring high strength',
    notes: 'Provides better strength than single fillet'
  },
  {
    symbol: '◄◄►',
    name: 'Double Butt',
    description: 'Butt weld with reinforcement on both sides',
    application: 'Critical structural joints',
    notes: 'Highest strength, requires full penetration'
  },
  {
    symbol: '◄◄◄',
    name: 'Plug Weld',
    description: 'Weld through a hole in overlapping pieces',
    application: 'Lap joints, sheet metal',
    notes: 'Provides additional strength to lap joints'
  },
  {
    symbol: '◄◄◄►',
    name: 'Slot Weld',
    description: 'Weld through an elongated hole',
    application: 'Lap joints, structural connections',
    notes: 'Similar to plug weld but with elongated hole'
  }
];

export default function WeldSymbols() {
  const [selectedSymbol, setSelectedSymbol] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Basic Symbols */}
      <div>
        <h3 className="text-md font-medium text-secondary-900 mb-4">
          Common Weld Symbols
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {weldSymbols.map((symbol, index) => (
            <button
              key={index}
              onClick={() => setSelectedSymbol(selectedSymbol === index ? null : index)}
              className={`p-4 border rounded-lg text-center transition-colors ${
                selectedSymbol === index
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-secondary-200 hover:border-secondary-300'
              }`}
            >
              <div className="text-2xl font-bold text-secondary-900 mb-2">
                {symbol.symbol}
              </div>
              <div className="text-sm font-medium text-secondary-700">
                {symbol.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Symbol Details */}
      {selectedSymbol !== null && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-4">
            {weldSymbols[selectedSymbol].name}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-blue-800 mb-2">Description</h5>
              <p className="text-sm text-blue-700">
                {weldSymbols[selectedSymbol].description}
              </p>
            </div>
            <div>
              <h5 className="font-medium text-blue-800 mb-2">Application</h5>
              <p className="text-sm text-blue-700">
                {weldSymbols[selectedSymbol].application}
              </p>
            </div>
            <div className="md:col-span-2">
              <h5 className="font-medium text-blue-800 mb-2">Notes</h5>
              <p className="text-sm text-blue-700">
                {weldSymbols[selectedSymbol].notes}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Weld Symbol Elements */}
      <div className="border border-secondary-200 rounded-lg p-6">
        <h3 className="text-md font-medium text-secondary-900 mb-4">
          Weld Symbol Elements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-secondary-900 mb-2">Reference Line</h4>
            <div className="bg-secondary-100 p-3 rounded-lg">
              <div className="w-full h-1 bg-secondary-400 mb-2"></div>
              <p className="text-sm text-secondary-700">
                Horizontal line that serves as the base for the weld symbol
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-secondary-900 mb-2">Arrow</h4>
            <div className="bg-secondary-100 p-3 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-1 bg-secondary-400"></div>
                <div className="w-0 h-0 border-l-4 border-l-secondary-400 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
              </div>
              <p className="text-sm text-secondary-700 mt-2">
                Points to the location of the weld
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-secondary-900 mb-2">Weld Symbol</h4>
            <div className="bg-secondary-100 p-3 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-secondary-700">◄</div>
              </div>
              <p className="text-sm text-secondary-700 mt-2">
                Indicates the type of weld to be made
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-secondary-900 mb-2">Dimensions</h4>
            <div className="bg-secondary-100 p-3 rounded-lg">
              <div className="text-center">
                <div className="text-sm font-mono text-secondary-700">1/4"</div>
              </div>
              <p className="text-sm text-secondary-700 mt-2">
                Size and length specifications for the weld
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reading Weld Symbols */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-md font-medium text-green-900 mb-4">
          How to Read Weld Symbols
        </h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center text-green-700 text-sm font-bold mr-3 mt-0.5">
              1
            </div>
            <div>
              <h4 className="font-medium text-green-800">Find the Reference Line</h4>
              <p className="text-sm text-green-700">
                The horizontal line is the base of the weld symbol
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center text-green-700 text-sm font-bold mr-3 mt-0.5">
              2
            </div>
            <div>
              <h4 className="font-medium text-green-800">Check the Arrow Side</h4>
              <p className="text-sm text-green-700">
                Symbols below the line apply to the arrow side of the joint
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center text-green-700 text-sm font-bold mr-3 mt-0.5">
              3
            </div>
            <div>
              <h4 className="font-medium text-green-800">Check the Other Side</h4>
              <p className="text-sm text-green-700">
                Symbols above the line apply to the opposite side of the joint
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center text-green-700 text-sm font-bold mr-3 mt-0.5">
              4
            </div>
            <div>
              <h4 className="font-medium text-green-800">Read Dimensions</h4>
              <p className="text-sm text-green-700">
                Numbers indicate weld size, length, and spacing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}