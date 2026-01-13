import { useState } from 'react';
import { Link, Link2, Copy, Check, ArrowLeftRight, Trash2 } from 'lucide-react';

const UrlEncoder = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const encode = (text: string) => {
    try {
      return encodeURIComponent(text);
    } catch (e) {
      return 'Error: Unable to encode URL';
    }
  };

  const decode = (encoded: string) => {
    try {
      return decodeURIComponent(encoded);
    } catch (e) {
      return 'Error: Invalid URL encoding';
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (value.trim()) {
      const result = mode === 'encode' ? encode(value) : decode(value);
      setOutput(result);
    } else {
      setOutput('');
    }
  };

  const handleModeToggle = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    
    // Swap input and output
    if (input.trim() || output.trim()) {
      setInput(output);
      setOutput(input);
    }
  };

  const handleCopy = async () => {
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

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  // Common URL components for quick testing
  const testCases = [
    { input: 'Hello World!', mode: 'encode' as const },
    { input: 'https://example.com/search?q=hello world&page=1', mode: 'encode' as const },
    { input: 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26page%3D1', mode: 'decode' as const },
    { input: 'user@example.com', mode: 'encode' as const },
  ];

  const loadTestCase = (testCase: typeof testCases[0]) => {
    setMode(testCase.mode);
    setInput(testCase.input);
    const result = testCase.mode === 'encode' ? encode(testCase.input) : decode(testCase.input);
    setOutput(result);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center space-x-3">
          {mode === 'encode' ? <Link className="w-8 h-8 text-blue-600 dark:text-blue-400" /> : <Link2 className="w-8 h-8 text-green-600 dark:text-green-400" />}
          <span>URL {mode === 'encode' ? 'Encoder' : 'Decoder'}</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {mode === 'encode' ? 'Convert text to URL-safe format' : 'Convert URL-encoded text back to readable format'}
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="mb-6 flex justify-center">
        <button
          onClick={handleModeToggle}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          <ArrowLeftRight className="w-4 h-4" />
          <span>Switch to {mode === 'encode' ? 'Decoder' : 'Encoder'}</span>
        </button>
      </div>

      {/* Test Cases */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Quick Test Cases:</h3>
        <div className="flex flex-wrap gap-2">
          {testCases.map((testCase, index) => (
            <button
              key={index}
              onClick={() => loadTestCase(testCase)}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {testCase.mode === 'encode' ? 'Encode' : 'Decode'}: {testCase.input.substring(0, 20)}...
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {mode === 'encode' ? 'Text Input' : 'URL-Encoded Input'}
            </h2>
            <button
              onClick={handleClear}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>
          
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to URL-encode...' : 'Enter URL-encoded text to decode...'}
            className="w-full h-64 p-4 font-mono text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {mode === 'encode' ? 'URL-Encoded Output' : 'Decoded Output'}
            </h2>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          
          <textarea
            value={output}
            readOnly
            placeholder={`${mode === 'encode' ? 'URL-encoded' : 'Decoded'} text will appear here...`}
            className="w-full h-64 p-4 font-mono text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg resize-none"
          />
        </div>
      </div>

      {/* Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2 flex items-center space-x-2">
            <Link className="w-4 h-4" />
            <span>URL Encoding</span>
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Convert special characters to %XX format for safe URL transmission
          </p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2 flex items-center space-x-2">
            <Link2 className="w-4 h-4" />
            <span>URL Decoding</span>
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Convert %XX encoded characters back to readable text
          </p>
        </div>
      </div>

      {/* Character Reference */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Common URL Encodings</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-blue-600 dark:text-blue-400">
          <div><code>Space</code> → <code>%20</code></div>
          <div><code>!</code> → <code>%21</code></div>
          <div><code>@</code> → <code>%40</code></div>
          <div><code>#</code> → <code>%23</code></div>
          <div><code>$</code> → <code>%24</code></div>
          <div><code>%</code> → <code>%25</code></div>
          <div><code>&</code> → <code>%26</code></div>
          <div><code>+</code> → <code>%2B</code></div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="font-semibold mb-2 text-green-700 dark:text-green-300">Common Use Cases</h3>
        <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
          <li>• Query parameters in URLs</li>
          <li>• Form data submission</li>
          <li>• API endpoint parameters</li>
          <li>• File names in URLs</li>
          <li>• Email links with parameters</li>
        </ul>
      </div>
    </div>
  );
};

export default UrlEncoder;
