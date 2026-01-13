import { useState } from 'react';
import { Lock, Unlock, Copy, Check, ArrowLeftRight, Trash2 } from 'lucide-react';

const Base64Encoder = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const encode = (text: string) => {
    try {
      return btoa(text);
    } catch (e) {
      return 'Error: Unable to encode text';
    }
  };

  const decode = (base64: string) => {
    try {
      return atob(base64);
    } catch (e) {
      return 'Error: Invalid Base64 string';
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center space-x-3">
          {mode === 'encode' ? <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" /> : <Unlock className="w-8 h-8 text-green-600 dark:text-green-400" />}
          <span>Base64 {mode === 'encode' ? 'Encoder' : 'Decoder'}</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {mode === 'encode' ? 'Convert text to Base64 format' : 'Convert Base64 back to readable text'}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {mode === 'encode' ? 'Text Input' : 'Base64 Input'}
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
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
            className="w-full h-64 p-4 font-mono text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {mode === 'encode' ? 'Base64 Output' : 'Text Output'}
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
            placeholder={`${mode === 'encode' ? 'Base64' : 'Decoded text'} will appear here...`}
            className="w-full h-64 p-4 font-mono text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg resize-none"
          />
        </div>
      </div>

      {/* Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2 flex items-center space-x-2">
            <Lock className="w-4 h-4" />
            <span>Encoding</span>
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Convert plain text to Base64 for safe data transmission
          </p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2 flex items-center space-x-2">
            <Unlock className="w-4 h-4" />
            <span>Decoding</span>
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Convert Base64 back to original readable text
          </p>
        </div>
      </div>

      {/* Common Use Cases */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Common Use Cases</h3>
        <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
          <li>• Email attachments and headers</li>
          <li>• Data URLs for images and files</li>
          <li>• Basic authentication headers</li>
          <li>• Embedding binary data in text formats</li>
        </ul>
      </div>
    </div>
  );
};

export default Base64Encoder;
