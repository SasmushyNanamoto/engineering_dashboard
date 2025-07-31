'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface JointType {
  name: string;
  description: string;
  applications: string[];
  advantages: string[];
  disadvantages: string[];
  preparation: string;
}

const jointTypes: JointType[] = [
  {
    name: 'Butt Joint',
    description: 'Two pieces of metal joined end-to-end or edge-to-edge',
    applications: ['Pipe welding', 'Plate joining', 'Structural steel'],
    advantages: ['Simple preparation', 'Good strength', 'Minimal distortion'],
    disadvantages: ['Limited to similar thickness', 'Requires precise alignment'],
    preparation: 'Square cut edges, optional bevel for thicker materials'
  },
  {
    name: 'Fillet Joint',
    description: 'Triangular cross-section weld joining two surfaces at right angles',
    applications: ['T-joints', 'Lap joints', 'Corner joints'],
    advantages: ['No edge preparation needed', 'Versatile', 'Good strength'],
    disadvantages: ['Lower strength than butt joints', 'More filler metal required'],
    preparation: 'Clean surfaces, proper fit-up, no special edge preparation'
  },
  {
    name: 'Corner Joint',
    description: 'Two pieces joined at right angles forming an L-shape',
    applications: ['Box fabrication', 'Frame construction', 'Sheet metal'],
    advantages: ['Good appearance', 'Simple preparation', 'Versatile'],
    disadvantages: ['Limited strength', 'Can be difficult to access'],
    preparation: 'Clean edges, proper fit-up, optional bevel for strength'
  },
  {
    name: 'T-Joint',
    description: 'One piece welded perpendicular to another forming a T-shape',
    applications: ['Structural steel', 'Pipe to plate', 'Frame construction'],
    advantages: ['Good strength', 'Versatile', 'Common in construction'],
    disadvantages: ['Can cause distortion', 'Requires proper technique'],
    preparation: 'Clean surfaces, proper fit-up, optional bevel for thicker materials'
  },
  {
    name: 'Lap Joint',
    description: 'Two pieces overlapped and welded along the edges',
    applications: ['Sheet metal', 'Thin materials', 'Repair work'],
    advantages: ['Simple preparation', 'Good for thin materials', 'Versatile'],
    disadvantages: ['Lower strength', 'More filler metal', 'Can trap contaminants'],
    preparation: 'Clean surfaces, proper overlap, good fit-up'
  }
];

export default function JointTypes() {
  const [expandedJoint, setExpandedJoint] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {jointTypes.map((joint, index) => (
        <div key={joint.name} className="border border-secondary-200 rounded-lg">
          <button
            onClick={() => setExpandedJoint(expandedJoint === index ? null : index)}
            className="accordion-header w-full"
          >
            <div className="flex items-center">
              <div className="diagram-container w-16 h-16 mr-4">
                <svg className="w-12 h-12 text-secondary-400" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <rect x="14" y="2" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <line x1="10" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-secondary-900">{joint.name}</h3>
                <p className="text-sm text-secondary-600">{joint.description}</p>
              </div>
            </div>
            {expandedJoint === index ? (
              <ChevronDown className="h-5 w-5 text-secondary-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-secondary-400" />
            )}
          </button>

          {expandedJoint === index && (
            <div className="accordion-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">Applications</h4>
                  <ul className="text-sm text-secondary-700 space-y-1">
                    {joint.applications.map((app, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">Preparation</h4>
                  <p className="text-sm text-secondary-700">{joint.preparation}</p>
                </div>

                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">Advantages</h4>
                  <ul className="text-sm text-secondary-700 space-y-1">
                    {joint.advantages.map((adv, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {adv}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">Disadvantages</h4>
                  <ul className="text-sm text-secondary-700 space-y-1">
                    {joint.disadvantages.map((dis, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        {dis}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}