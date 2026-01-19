import { useState } from 'react';
import { Link, Copy, Check, ExternalLink, BarChart } from 'lucide-react';

interface ShortenedUrl {
  original: string;
  short: string;
  clicks: number;
  createdAt: string;
}

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [urlHistory, setUrlHistory] = useState<ShortenedUrl[]>([]);

  // Simple hash function for demo (in production use a proper URL shortening service)
  const generateShortCode = (url: string): string => {
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
      const char = url.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36).substring(0, 6);
  };

  const shortenUrl = () => {
    if (!originalUrl.trim()) return;

    // Basic URL validation
    try {
      new URL(originalUrl);
    } catch {
      alert('Please enter a valid URL');
      return;
    }

    const shortCode = generateShortCode(originalUrl);
    const shortUrl = `${window.location.origin}/s/${shortCode}`;
    
    setShortenedUrl(shortUrl);
    
    // Add to history
    const newEntry: ShortenedUrl = {
      original: originalUrl,
      short: shortUrl,
      clicks: 0,
      createdAt: new Date().toLocaleString()
    };
    
    setUrlHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Keep last 10
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const clearHistory = () => {
    setUrlHistory([]);
  };

  const loadSample = () => {
    setOriginalUrl('https://github.com/evilshxt/tinytools');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center space-x-3">
          <Link className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <span>URL Shortener</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create short, memorable URLs for long links
        </p>
      </div>

      {/* Main Shortener */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Enter URL to shorten</label>
            <div className="flex space-x-3">
              <input
                type="url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && shortenUrl()}
                placeholder="https://example.com/very/long/url/that/needs/to/be/shortened"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
              />
              <button
                onClick={shortenUrl}
                disabled={!originalUrl.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Shorten
              </button>
            </div>
          </div>

          {shortenedUrl && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Short URL:</div>
                  <div className="font-mono text-sm break-all">{shortenedUrl}</div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => copyToClipboard(shortenedUrl)}
                    className="flex items-center space-x-1 px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                  <a
                    href={shortenedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 px-3 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* History Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center space-x-2">
            <BarChart className="w-5 h-5" />
            <span>Recent Short URLs</span>
          </h2>
          <div className="flex space-x-2">
            {urlHistory.length > 0 && (
              <button
                onClick={clearHistory}
                className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              >
                Clear History
              </button>
            )}
            <button
              onClick={loadSample}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Load Sample
            </button>
          </div>
        </div>

        {urlHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Link className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No shortened URLs yet. Create your first one above!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {urlHistory.map((entry, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-sm text-blue-600 dark:text-blue-400 mb-1 break-all">
                      {entry.short}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {entry.original}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {entry.createdAt} • {entry.clicks} clicks
                    </div>
                  </div>
                  <div className="flex space-x-1 ml-3">
                    <button
                      onClick={() => copyToClipboard(entry.short)}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <a
                      href={entry.original}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">Instant Shortening</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Generate short URLs instantly with a single click
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">Click Tracking</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track how many times your shortened URLs are clicked
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-300">Common Use Cases</h3>
        <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
          <li>• Sharing long links on social media with character limits</li>
          <li>• Creating memorable links for marketing campaigns</li>
          <li>• Tracking link performance and click analytics</li>
          <li>• Simplifying URLs for print materials</li>
          <li>• Masking affiliate links for cleaner appearance</li>
        </ul>
      </div>

      {/* Note */}
      <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          <strong>Note:</strong> This is a demonstration URL shortener. In production, integrate with services like Bitly, TinyURL, or build a backend with proper URL redirection and analytics.
        </p>
      </div>
    </div>
  );
};

export default UrlShortener;
