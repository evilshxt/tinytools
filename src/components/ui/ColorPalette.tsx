import { useState } from 'react';
import { Palette, Copy, Check, RefreshCw, Download } from 'lucide-react';

interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

const ColorPalette = () => {
  const [baseColor, setBaseColor] = useState('#3B82F6');
  const [palette, setPalette] = useState<Color[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const generatePalette = () => {
    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    const colors: Color[] = [];
    
    // Generate complementary colors
    for (let i = 0; i < 5; i++) {
      const newHue = (hsl.h + (i * 72)) % 360;
      const newRgb = hslToRgb(newHue, hsl.s, hsl.l);
      const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
      
      colors.push({
        hex,
        rgb: newRgb,
        hsl: { h: newHue, s: hsl.s, l: hsl.l }
      });
    }
    
    // Add variations (lighter and darker)
    const variations: Color[] = [];
    for (let i = 0; i < 3; i++) {
      const lightness = Math.max(10, Math.min(90, hsl.l + (i - 1) * 20));
      const newRgb = hslToRgb(hsl.h, hsl.s, lightness);
      const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
      
      variations.push({
        hex,
        rgb: newRgb,
        hsl: { h: hsl.h, s: hsl.s, l: lightness }
      });
    }
    
    setPalette([...colors, ...variations]);
  };

  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;
    
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadPalette = () => {
    if (palette.length === 0) return;
    
    const content = palette.map(color => 
      `${color.hex} - RGB(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}) - HSL(${color.hsl.h}°, ${color.hsl.s}%, ${color.hsl.l}%)`
    ).join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color-palette.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center space-x-3">
          <Palette className="w-8 h-8 text-pink-600 dark:text-pink-400" />
          <span>Color Palette Generator</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generate beautiful color palettes from any base color
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center space-x-3">
            <label htmlFor="color" className="text-sm font-medium">
              Base Color:
            </label>
            <input
              id="color"
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-20 h-10 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
            />
            <input
              type="text"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm font-mono focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="#000000"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={generatePalette}
              className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate Palette</span>
            </button>
            
            {palette.length > 0 && (
              <button
                onClick={downloadPalette}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Palette Display */}
      {palette.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {palette.map((color, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div
                  className="h-24 w-full"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="p-3 space-y-2">
                  <div className="font-mono text-sm font-semibold">{color.hex}</div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">RGB</span>
                      <button
                        onClick={() => copyToClipboard(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`, index * 10)}
                        className="text-xs hover:text-pink-600 dark:hover:text-pink-400"
                      >
                        {copiedIndex === index * 10 ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400">
                      {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">HSL</span>
                      <button
                        onClick={() => copyToClipboard(`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`, index * 10 + 1)}
                        className="text-xs hover:text-pink-600 dark:hover:text-pink-400"
                      >
                        {copiedIndex === index * 10 + 1 ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400">
                      {color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%
                    </div>
                  </div>
                  
                  <button
                    onClick={() => copyToClipboard(color.hex, index)}
                    className="w-full mt-2 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-1"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-3 h-3 text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy HEX</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Initial State */}
      {palette.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Palette className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No Palette Generated Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Choose a base color and click "Generate Palette" to create complementary colors
          </p>
        </div>
      )}

      {/* Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">Color Theory</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This generator creates complementary colors using HSL color space for harmonious palettes
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">Multiple Formats</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Each color is provided in HEX, RGB, and HSL formats for maximum flexibility
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;
