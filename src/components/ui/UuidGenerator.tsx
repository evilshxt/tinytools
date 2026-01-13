import { useState } from 'react';
import { Fingerprint, Copy, Check, RefreshCw, Download } from 'lucide-react';

const UuidGenerator = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateUUIDs = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
  };

  const copyToClipboard = async (uuid: string, index: number) => {
    try {
      await navigator.clipboard.writeText(uuid);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyAllToClipboard = async () => {
    try {
      const allUuids = uuids.join('\n');
      await navigator.clipboard.writeText(allUuids);
      setCopiedIndex(-1); // Special value for "all copied"
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy all:', err);
    }
  };

  const downloadAsFile = () => {
    if (uuids.length === 0) return;
    
    const content = uuids.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uuids.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setUuids([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center space-x-3">
          <Fingerprint className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <span>UUID Generator</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generate unique identifiers instantly
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center space-x-3">
            <label htmlFor="count" className="text-sm font-medium">
              Number of UUIDs:
            </label>
            <input
              id="count"
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={generateUUIDs}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate</span>
            </button>
            
            {uuids.length > 0 && (
              <>
                <button
                  onClick={copyAllToClipboard}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy All</span>
                </button>
                
                <button
                  onClick={downloadAsFile}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                
                <button
                  onClick={clearAll}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Clear
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      {uuids.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Generated UUIDs ({uuids.length})
            </h2>
            {copiedIndex === -1 && (
              <span className="text-sm text-green-600 dark:text-green-400 flex items-center space-x-1">
                <Check className="w-4 h-4" />
                <span>All copied!</span>
              </span>
            )}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <code className="font-mono text-sm text-gray-900 dark:text-gray-100 flex-1 mr-4">
                    {uuid}
                  </code>
                  
                  <button
                    onClick={() => copyToClipboard(uuid, index)}
                    className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Initial State */}
      {uuids.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Fingerprint className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No UUIDs Generated Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Click the "Generate" button to create unique identifiers
          </p>
        </div>
      )}

      {/* Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">What is a UUID?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            A Universally Unique Identifier is a 128-bit number used to identify information in computer systems
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">Version 4 UUIDs</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            These are randomly generated UUIDs, perfect for most use cases requiring unique identifiers
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <h3 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Common Use Cases</h3>
        <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-1">
          <li>• Database primary keys</li>
          <li>• Transaction identifiers</li>
          <li>• Session tokens</li>
          <li>• File naming in distributed systems</li>
          <li>• API request tracking</li>
        </ul>
      </div>
    </div>
  );
};

export default UuidGenerator;
