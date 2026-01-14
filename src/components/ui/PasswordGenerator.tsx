import { useState } from 'react';
import { Lock, Copy, Check, RefreshCw, Shield } from 'lucide-react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      setPassword('');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const copyToClipboard = async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, text: 'Very Weak', color: 'text-red-600' };
    
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 1;

    if (score <= 2) return { score, text: 'Weak', color: 'text-red-600' };
    if (score <= 4) return { score, text: 'Fair', color: 'text-yellow-600' };
    if (score <= 6) return { score, text: 'Good', color: 'text-blue-600' };
    return { score, text: 'Strong', color: 'text-green-600' };
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center space-x-3">
          <Lock className="w-8 h-8 text-red-600 dark:text-red-400" />
          <span>Password Generator</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create secure, random passwords with customizable options
        </p>
      </div>

      {/* Generated Password */}
      <div className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <input
              type="text"
              value={password}
              readOnly
              placeholder="Generated password will appear here..."
              className="w-full px-4 py-3 font-mono text-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg"
            />
            {password && (
              <div className="mt-2 flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className={`text-sm font-medium ${strength.color}`}>
                  Strength: {strength.text}
                </span>
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      strength.score <= 2 ? 'bg-red-500' :
                      strength.score <= 4 ? 'bg-yellow-500' :
                      strength.score <= 6 ? 'bg-blue-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(strength.score / 7) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          <button
            onClick={copyToClipboard}
            disabled={!password}
            className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Options */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
        <h2 className="text-lg font-semibold mb-4">Password Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Length */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Length: {length}
            </label>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>4</span>
              <span>64</span>
            </div>
          </div>

          {/* Character Types */}
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm">Uppercase (A-Z)</span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm">Lowercase (a-z)</span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm">Numbers (0-9)</span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm">Symbols (!@#$...)</span>
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={generatePassword}
            disabled={!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols}
            className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Generate Password</span>
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">Secure</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Cryptographically secure random generation
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">Customizable</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Control length and character types
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">Strength Indicator</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Real-time password strength analysis
          </p>
        </div>
      </div>

      {/* Security Tips */}
      <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
        <h3 className="font-semibold mb-2 text-red-700 dark:text-red-300">Security Tips</h3>
        <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
          <li>• Use unique passwords for each account</li>
          <li>• Consider using a password manager</li>
          <li>• Enable two-factor authentication when available</li>
          <li>• Update passwords regularly</li>
          <li>• Avoid personal information in passwords</li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordGenerator;
