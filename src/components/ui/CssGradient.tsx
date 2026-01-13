import { useState } from 'react';
import { Droplet, Copy, Check, Download, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface GradientStop {
  color: string;
  position: number;
}

const CssGradient = () => {
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(90);
  const [stops, setStops] = useState<GradientStop[]>([
    { color: '#3B82F6', position: 0 },
    { color: '#8B5CF6', position: 100 }
  ]);
  const [copied, setCopied] = useState(false);

  const generateGradient = () => {
    const colorStops = stops
      .sort((a, b) => a.position - b.position)
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');

    if (gradientType === 'linear') {
      return `linear-gradient(${angle}deg, ${colorStops})`;
    } else {
      return `radial-gradient(circle, ${colorStops})`;
    }
  };

  const gradient = generateGradient();

  const updateStop = (index: number, field: keyof GradientStop, value: string | number) => {
    const newStops = [...stops];
    if (field === 'position') {
      newStops[index][field] = Math.max(0, Math.min(100, Number(value)));
    } else {
      newStops[index][field] = value as string;
    }
    setStops(newStops);
  };

  const addStop = () => {
    if (stops.length < 5) {
      const newPosition = stops.length > 0 
        ? Math.min(100, (stops[stops.length - 1].position + stops[0].position) / 2)
        : 50;
      setStops([...stops, { color: '#FF6B6B', position: newPosition }]);
    }
  };

  const removeStop = (index: number) => {
    if (stops.length > 2) {
      setStops(stops.filter((_, i) => i !== index));
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`background: ${gradient};`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadCSS = () => {
    const css = `/* CSS Gradient */\n.gradient {\n  background: ${gradient};\n  /* Fallback for old browsers */\n  background: -webkit-${gradient};\n  background: -moz-${gradient};\n}\n\n/* Additional properties */\n.gradient {\n  width: 100%;\n  height: 400px;\n  border-radius: 8px;\n}`;
    
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gradient.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const randomizeColors = () => {
    const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setStops(stops.map(stop => ({ ...stop, color: randomColor() })));
  };

  const presets = [
    { name: 'Sunset', stops: [{ color: '#FF6B6B', position: 0 }, { color: '#4ECDC4', position: 100 }] },
    { name: 'Ocean', stops: [{ color: '#667eea', position: 0 }, { color: '#764ba2', position: 100 }] },
    { name: 'Forest', stops: [{ color: '#134E5E', position: 0 }, { color: '#71B280', position: 100 }] },
    { name: 'Fire', stops: [{ color: '#F12711', position: 0 }, { color: '#F5AF19', position: 100 }] },
    { name: 'Purple Dream', stops: [{ color: '#667eea', position: 0 }, { color: '#764ba2', position: 100 }] },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setStops(preset.stops);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center space-x-3">
          <Droplet className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
          <span>CSS Gradient Generator</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create beautiful CSS gradients with live preview
        </p>
      </div>

      {/* Preview */}
      <div className="mb-6">
        <div 
          className="w-full h-64 rounded-lg shadow-lg"
          style={{ background: gradient }}
        />
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gradient Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Gradient Type</label>
            <div className="flex space-x-2">
              <button
                onClick={() => setGradientType('linear')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  gradientType === 'linear' 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Linear
              </button>
              <button
                onClick={() => setGradientType('radial')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  gradientType === 'radial' 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Radial
              </button>
            </div>
          </div>

          {/* Angle (for linear gradient) */}
          {gradientType === 'linear' && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Angle: {angle}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          {/* Actions */}
          <div>
            <label className="block text-sm font-medium mb-2">Actions</label>
            <div className="flex space-x-2">
              <button
                onClick={randomizeColors}
                className="flex items-center space-x-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Random</span>
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                onClick={downloadCSS}
                className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Color Stops */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Color Stops</h3>
          <button
            onClick={addStop}
            disabled={stops.length >= 5}
            className="flex items-center space-x-1 px-3 py-1 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Stop</span>
          </button>
        </div>
        
        <div className="space-y-3">
          {stops.map((stop, index) => (
            <div key={index} className="flex items-center space-x-3">
              <input
                type="color"
                value={stop.color}
                onChange={(e) => updateStop(index, 'color', e.target.value)}
                className="w-12 h-12 rounded cursor-pointer"
              />
              <input
                type="text"
                value={stop.color}
                onChange={(e) => updateStop(index, 'color', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 font-mono text-sm"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={stop.position}
                  onChange={(e) => updateStop(index, 'position', e.target.value)}
                  className="w-20 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">%</span>
              </div>
              <button
                onClick={() => removeStop(index)}
                disabled={stops.length <= 2}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Presets */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
        <h3 className="text-lg font-semibold mb-4">Presets</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {presets.map((preset, index) => (
            <button
              key={index}
              onClick={() => applyPreset(preset)}
              className="relative h-20 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              style={{
                background: `linear-gradient(135deg, ${preset.stops[0].color} 0%, ${preset.stops[1].color} 100%)`
              }}
            >
              <span className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* CSS Output */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">CSS Code</h3>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
          <pre className="text-sm font-mono text-gray-800 dark:text-gray-200">
            <code>background: {gradient};</code>
          </pre>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Browser Compatibility</h4>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            This gradient works in all modern browsers. For older browsers, consider using the downloaded CSS file which includes vendor prefixes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CssGradient;
