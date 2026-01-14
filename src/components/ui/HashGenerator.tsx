import { useState } from 'react';
import { Hash, Copy, Check, RefreshCw } from 'lucide-react';
import CryptoJS from 'crypto-js';

const HashGenerator = () => {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({
    md5: '',
    sha1: '',
    sha256: '',
    sha512: ''
  });
  const [copied, setCopied] = useState<string | null>(null);

  const generateHashes = (text: string) => {
    if (text.trim()) {
      setHashes({
        md5: CryptoJS.MD5(text).toString(),
        sha1: CryptoJS.SHA1(text).toString(),
        sha256: CryptoJS.SHA256(text).toString(),
        sha512: CryptoJS.SHA512(text).toString()
      });
    } else {
      setHashes({
        md5: '',
        sha1: '',
        sha256: '',
        sha512: ''
      });
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    generateHashes(value);
  };

  const copyToClipboard = async (hashType: string, hashValue: string) => {
    if (hashValue) {
      try {
        await navigator.clipboard.writeText(hashValue);
        setCopied(hashType);
        setTimeout(() => setCopied(null), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const clearAll = () => {
    setInput('');
    setHashes({
      md5: '',
      sha1: '',
      sha256: '',
      sha512: ''
    });
  };

  const randomizeInput = () => {
    const samples = [
      'Hello, World!',
      'password123',
      'example@email.com',
      'https://github.com/evilshxt/tinytools',
      'The quick brown fox jumps over the lazy dog'
    ];
    const randomSample = samples[Math.floor(Math.random() * samples.length)];
    handleInputChange(randomSample);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center space-x-3">
          <Hash className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          <span>Hash Generator</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generate MD5, SHA1, SHA256, and SHA512 hashes instantly
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Input Text</h2>
          <div className="flex space-x-2">
            <button
              onClick={randomizeInput}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Sample</span>
            </button>
            <button
              onClick={clearAll}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Clear
            </button>
          </div>
        </div>
        
        <textarea
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full h-32 p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
        />
        
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {input.length} characters
        </div>
      </div>

      {/* Hashes */}
      <div className="space-y-4">
        {[
          { type: 'md5', name: 'MD5', bits: 128, color: 'purple' },
          { type: 'sha1', name: 'SHA1', bits: 160, color: 'blue' },
          { type: 'sha256', name: 'SHA256', bits: 256, color: 'green' },
          { type: 'sha512', name: 'SHA512', bits: 512, color: 'red' }
        ].map((hash) => (
          <div key={hash.type} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center space-x-2">
                <span>{hash.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {hash.bits}-bit
                </span>
              </h3>
              <button
                onClick={() => copyToClipboard(hash.type, hashes[hash.type as keyof typeof hashes])}
                disabled={!hashes[hash.type as keyof typeof hashes]}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copied === hash.type ? (
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
            
            <div className="font-mono text-sm bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-600 break-all">
              {hashes[hash.type as keyof typeof hashes] || (
                <span className="text-gray-400">Hash will appear here...</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">Multiple Algorithms</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Support for MD5, SHA1, SHA256, and SHA512 hash functions
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">Instant Generation</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Hashes are generated instantly as you type
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <h3 className="font-semibold mb-2 text-orange-700 dark:text-orange-300">About Hash Functions</h3>
          <p className="text-sm text-orange-600 dark:text-orange-400">
            Hash functions convert input data into a fixed-size string of characters, useful for data integrity and security.
          </p>
        </div>
        
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h3 className="font-semibold mb-2 text-yellow-700 dark:text-yellow-300">Security Note</h3>
          <p className="text-sm text-yellow-600 dark:text-yellow-400">
            MD5 and SHA1 are considered cryptographically weak. Use SHA256 or SHA512 for security applications.
          </p>
        </div>
      </div>

      {/* Note */}
      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <p className="text-sm text-green-700 dark:text-green-300">
          <strong>Production Ready:</strong> Using crypto-js library for accurate, cryptographically secure hash functions.
        </p>
      </div>
    </div>
  );
};

export default HashGenerator;
