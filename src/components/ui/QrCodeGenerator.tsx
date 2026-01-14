import { useState } from 'react';
import { QrCode, Copy, Check, Download, RefreshCw } from 'lucide-react';
import QRCode from 'qrcode';

const QrCodeGenerator = () => {
  const [input, setInput] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [size, setSize] = useState(256);
  const [copied, setCopied] = useState(false);

  const generateQR = async () => {
    if (input.trim()) {
      try {
        const options = {
          width: size,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        };
        
        const dataUrl = await QRCode.toDataURL(input, options);
        setQrCodeDataUrl(dataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
        setQrCodeDataUrl('');
      }
    } else {
      setQrCodeDataUrl('');
    }
  };

  const copyToClipboard = async () => {
    if (input) {
      try {
        await navigator.clipboard.writeText(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const downloadQR = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = qrCodeDataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const randomizeInput = () => {
    const samples = [
      'https://github.com/evilshxt/tinytools',
      'https://tinytools-preview.vercel.app',
      'Hello, World!',
      'Contact: example@email.com',
      'Tel: +1234567890'
    ];
    const randomSample = samples[Math.floor(Math.random() * samples.length)];
    setInput(randomSample);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center space-x-3">
          <QrCode className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <span>QR Code Generator</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create QR codes from text, URLs, or any data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Input</h2>
            <button
              onClick={randomizeInput}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Sample</span>
            </button>
          </div>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onInput={generateQR}
            placeholder="Enter text, URL, or any data to encode..."
            className="w-full h-32 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          />
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">
                Size: {size}x{size}px
              </label>
              <input
                type="range"
                min="128"
                max="512"
                step="32"
                value={size}
                onChange={(e) => {
                  setSize(Number(e.target.value));
                  setTimeout(generateQR, 0);
                }}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={copyToClipboard}
              disabled={!input}
              className="flex items-center space-x-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>
          </div>
        </div>

        {/* QR Code Display */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">QR Code</h2>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            {qrCodeDataUrl ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img 
                    src={qrCodeDataUrl} 
                    alt="QR Code" 
                    className="border border-gray-200 dark:border-gray-600 rounded"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
                
                <button
                  onClick={downloadQR}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PNG</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Enter text to generate QR code</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">Instant Generation</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            QR codes are generated instantly as you type
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">Multiple Sizes</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose from 128px to 512px for different use cases
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
        <h3 className="font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Common Use Cases</h3>
        <ul className="text-sm text-indigo-600 dark:text-indigo-400 space-y-1">
          <li>• WiFi network credentials</li>
          <li>• Business cards and contact information</li>
          <li>• Product links and promotions</li>
          <li>• Event tickets and invitations</li>
          <li>• Restaurant menus and information</li>
        </ul>
      </div>

      {/* Note */}
      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <p className="text-sm text-green-700 dark:text-green-300">
          <strong>Production Ready:</strong> Using qrcode library for accurate, scannable QR codes with reliable image export.
        </p>
      </div>
    </div>
  );
};

export default QrCodeGenerator;
