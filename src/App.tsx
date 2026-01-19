import { useState, useEffect } from 'react';
import { Wrench, Sun, Moon, Search, Clock } from 'lucide-react';
import Sidebar from './components/Sidebar';
import DefaultTool from './components/ui/DefaultTool';
import JsonFormatter from './components/ui/JsonFormatter';
import Base64Encoder from './components/ui/Base64Encoder';
import UuidGenerator from './components/ui/UuidGenerator';
import UrlEncoder from './components/ui/UrlEncoder';
import ColorPalette from './components/ui/ColorPalette';
import CssGradient from './components/ui/CssGradient';
import QrCodeGenerator from './components/ui/QrCodeGenerator';
import PasswordGenerator from './components/ui/PasswordGenerator';
import HashGenerator from './components/ui/HashGenerator';
import MarkdownPreview from './components/ui/MarkdownPreview';
import CssMinifier from './components/ui/CssMinifier';
import CsvToJsonConverter from './components/ui/CsvToJsonConverter';
import UrlShortener from './components/ui/UrlShortener';

function App() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const tools = [
    {
      id: 'json-formatter',
      name: 'JSON Formatter',
      category: 'Text & Dev',
      icon: 'Code'
    },
    {
      id: 'base64-encoder',
      name: 'Base64 Encoder/Decoder',
      category: 'Text & Dev',
      icon: 'Lock'
    },
    {
      id: 'url-encoder',
      name: 'URL Encode/Decode',
      category: 'Text & Dev',
      icon: 'Link'
    },
    {
      id: 'hash-generator',
      name: 'Hash Generator',
      category: 'Text & Dev',
      icon: 'Hash'
    },
    {
      id: 'markdown-preview',
      name: 'Markdown Preview',
      category: 'Text & Dev',
      icon: 'FileText'
    },
    {
      id: 'css-minifier',
      name: 'CSS Minifier',
      category: 'Text & Dev',
      icon: 'Minimize2'
    },
    {
      id: 'color-palette',
      name: 'Color Palette Generator',
      category: 'UI & Design',
      icon: 'Palette'
    },
    {
      id: 'css-gradient',
      name: 'CSS Gradient Generator',
      category: 'UI & Design',
      icon: 'Droplet'
    },
    {
      id: 'qr-code-generator',
      name: 'QR Code Generator',
      category: 'UI & Design',
      icon: 'QrCode'
    },
    {
      id: 'password-generator',
      name: 'Password Generator',
      category: 'File & Misc',
      icon: 'Lock'
    },
    {
      id: 'uuid-generator',
      name: 'UUID Generator',
      category: 'File & Misc',
      icon: 'Fingerprint'
    },
    {
      id: 'csv-to-json',
      name: 'CSV to JSON Converter',
      category: 'File & Misc',
      icon: 'FileText'
    },
    {
      id: 'url-shortener',
      name: 'URL Shortener',
      category: 'File & Misc',
      icon: 'Link'
    }
  ];

  const renderTool = () => {
    if (!selectedTool) {
      return <DefaultTool />;
    }
    
    switch (selectedTool) {
      case 'json-formatter':
        return <JsonFormatter />;
      case 'base64-encoder':
        return <Base64Encoder />;
      case 'uuid-generator':
        return <UuidGenerator />;
      case 'url-encoder':
        return <UrlEncoder />;
      case 'color-palette':
        return <ColorPalette />;
      case 'css-gradient':
        return <CssGradient />;
      case 'qr-code-generator':
        return <QrCodeGenerator />;
      case 'password-generator':
        return <PasswordGenerator />;
      case 'hash-generator':
        return <HashGenerator />;
      case 'markdown-preview':
        return <MarkdownPreview />;
      case 'css-minifier':
        return <CssMinifier />;
      case 'csv-to-json':
        return <CsvToJsonConverter />;
      case 'url-shortener':
        return <UrlShortener />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">{tools.find(t => t.id === selectedTool)?.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">Tool component coming soon...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Wrench className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl font-bold">Tiny Tools</h1>
            {selectedTool && (
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <span>/</span>
                <span>{tools.find(t => t.id === selectedTool)?.name}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{currentTime.toLocaleTimeString()}</span>
              <span className="text-xs">{currentTime.toLocaleDateString()}</span>
            </div>
            
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex flex-1 pt-16">
          {/* Sidebar */}
          <Sidebar
            tools={tools}
            selectedTool={selectedTool}
            onToolSelect={setSelectedTool}
          />

          {/* Main Content Area */}
          <main className="flex-1 p-6">
            {renderTool()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;