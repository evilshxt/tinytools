import { useState } from 'react';
import { Minimize2, Copy, Check, Download } from 'lucide-react';

const CssMinifier = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [minifiedSize, setMinifiedSize] = useState(0);

  const minifyCSS = (css: string): string => {
    return css
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove whitespace
      .replace(/\s+/g, ' ')
      // Remove space after semicolons and colons
      .replace(/;\s+/g, ';')
      .replace(/:\s+/g, ':')
      // Remove space around braces
      .replace(/\{\s+/g, '{')
      .replace(/;\s*\}/g, '}')
      // Remove unnecessary semicolons
      .replace(/;}/g, '}')
      // Remove leading/trailing whitespace
      .trim();
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (value.trim()) {
      const minified = minifyCSS(value);
      setOutput(minified);
      setOriginalSize(value.length);
      setMinifiedSize(minified.length);
    } else {
      setOutput('');
      setOriginalSize(0);
      setMinifiedSize(0);
    }
  };

  const copyToClipboard = async () => {
    if (output) {
      try {
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const downloadCSS = () => {
    if (output) {
      const blob = new Blob([output], { type: 'text/css' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'style.min.css';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const loadSample = () => {
    const sample = `/* Sample CSS for minification */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
}

.header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px 0;
    text-align: center;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.button {
    display: inline-block;
    padding: 12px 24px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
    .container {
        padding: 0 10px;
    }
    
    .header {
        padding: 15px 0;
    }
}`;

    handleInputChange(sample);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setOriginalSize(0);
    setMinifiedSize(0);
  };

  const getSavings = () => {
    if (originalSize === 0) return 0;
    return ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center space-x-3">
          <Minimize2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <span>CSS Minifier</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Compress CSS code by removing whitespace and comments
        </p>
      </div>

      {/* Stats */}
      {originalSize > 0 && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">Original Size</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {originalSize.toLocaleString()} bytes
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">Minified Size</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {minifiedSize.toLocaleString()} bytes
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">Savings</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {getSavings()}%
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Input CSS</h2>
            <div className="flex space-x-2">
              <button
                onClick={loadSample}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Load Sample
              </button>
              <button
                onClick={clearAll}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Clear
              </button>
            </div>
          </div>
          
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Paste your CSS code here..."
            className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Output */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Minified CSS</h2>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                disabled={!output}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                onClick={downloadCSS}
                disabled={!output}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          <textarea
            value={output}
            readOnly
            placeholder="Minified CSS will appear here..."
            className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg resize-none"
          />
        </div>
      </div>

      {/* Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">Size Reduction</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Remove unnecessary whitespace and comments to reduce file size
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">Performance Boost</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Faster load times and reduced bandwidth usage
          </p>
        </div>
      </div>

      {/* Optimization Tips */}
      <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <h3 className="font-semibold mb-3 text-purple-700 dark:text-purple-300">Optimization Tips</h3>
        <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-1">
          <li>• Remove unused CSS rules and selectors</li>
          <li>• Combine similar properties (margin-top, margin-right, etc.)</li>
          <li>• Use shorthand properties (background, font, margin, padding)</li>
          <li>• Avoid @import statements for better performance</li>
          <li>• Consider CSS-in-JS for component-based applications</li>
        </ul>
      </div>
    </div>
  );
};

export default CssMinifier;
