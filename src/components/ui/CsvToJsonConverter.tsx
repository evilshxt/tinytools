import { useState } from 'react';
import { FileText, Copy, Check, Download, ArrowLeftRight } from 'lucide-react';

const CsvToJsonConverter = () => {
  const [csvInput, setCsvInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeaders, setHasHeaders] = useState(true);

  const parseCSV = (csv: string, delim: string, headers: boolean): any[] => {
    const lines = csv.trim().split('\n');
    if (lines.length === 0) return [];

    const result: any[] = [];
    const headerLine = lines[0];
    const headersList = headerLine.split(delim).map(h => h.trim().replace(/^"(.*)"$/, '$1'));
    const dataLines = headers ? lines.slice(1) : lines;

    dataLines.forEach((line) => {
      if (line.trim() === '') return;
      
      const values = line.split(delim).map(v => {
        // Handle quoted values with commas inside
        if (v.startsWith('"') && v.endsWith('"')) {
          return v.slice(1, -1).replace(/""/g, '"');
        }
        return v.trim();
      });

      if (headers) {
        const obj: any = {};
        headersList.forEach((header, i) => {
          obj[header] = values[i] || '';
        });
        result.push(obj);
      } else {
        result.push(values);
      }
    });

    return result;
  };

  const convertToJson = () => {
    if (csvInput.trim()) {
      try {
        const parsed = parseCSV(csvInput, delimiter, hasHeaders);
        const jsonString = JSON.stringify(parsed, null, 2);
        setJsonOutput(jsonString);
      } catch (error) {
        setJsonOutput('// Error parsing CSV: ' + (error as Error).message);
      }
    } else {
      setJsonOutput('');
    }
  };

  const handleInputChange = (value: string) => {
    setCsvInput(value);
    if (value.trim()) {
      setTimeout(convertToJson, 100); // Small delay for better UX
    } else {
      setJsonOutput('');
    }
  };

  const copyToClipboard = async () => {
    if (jsonOutput && !jsonOutput.startsWith('// Error')) {
      try {
        await navigator.clipboard.writeText(jsonOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const downloadJSON = () => {
    if (jsonOutput && !jsonOutput.startsWith('// Error')) {
      const blob = new Blob([jsonOutput], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const loadSample = () => {
    const sample = `Name,Age,City,Country
John Doe,28,New York,USA
Jane Smith,32,London,UK
Bob Johnson,45,Tokyo,Japan
Alice Brown,24,Paris,France
Charlie Wilson,38,Sydney,Australia`;

    setCsvInput(sample);
    setTimeout(convertToJson, 100);
  };

  const clearAll = () => {
    setCsvInput('');
    setJsonOutput('');
  };

  const swapData = () => {
    if (jsonOutput && !jsonOutput.startsWith('// Error')) {
      setCsvInput(jsonOutput);
      setJsonOutput(csvInput);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center space-x-3">
          <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
          <span>CSV to JSON Converter</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Convert CSV data to JSON format with customizable options
        </p>
      </div>

      {/* Options */}
      <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Delimiter</label>
            <select
              value={delimiter}
              onChange={(e) => {
                setDelimiter(e.target.value);
                setTimeout(convertToJson, 0);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm"
            >
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="\t">Tab (\t)</option>
              <option value="|">Pipe (|)</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasHeaders}
                onChange={(e) => {
                  setHasHeaders(e.target.checked);
                  setTimeout(convertToJson, 0);
                }}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium">First row has headers</span>
            </label>
          </div>

          <div className="flex items-center justify-end">
            <button
              onClick={swapData}
              disabled={!csvInput || !jsonOutput || jsonOutput.startsWith('// Error')}
              className="flex items-center space-x-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Swap</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CSV Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">CSV Input</h2>
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
            value={csvInput}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Paste your CSV data here..."
            className="w-full h-80 p-4 font-mono text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          />
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {csvInput.split('\n').filter(line => line.trim()).length} rows • {csvInput.length} characters
          </div>
        </div>

        {/* JSON Output */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">JSON Output</h2>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                disabled={!jsonOutput || jsonOutput.startsWith('// Error')}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                onClick={downloadJSON}
                disabled={!jsonOutput || jsonOutput.startsWith('// Error')}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          <textarea
            value={jsonOutput}
            readOnly
            placeholder="JSON will appear here..."
            className={`w-full h-80 p-4 font-mono text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg resize-none ${
              jsonOutput.startsWith('// Error') ? 'text-red-600 dark:text-red-400' : ''
            }`}
          />
        </div>
      </div>

      {/* Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">Flexible Delimiters</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Support for comma, semicolon, tab, and pipe delimiters
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">Header Detection</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Option to use first row as object keys
          </p>
        </div>
      </div>

      {/* Format Info */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="font-semibold mb-2 text-green-700 dark:text-green-300">CSV Format</h3>
          <p className="text-sm text-green-600 dark:text-green-400">
            Comma-separated values with optional quoted fields for handling special characters
          </p>
        </div>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">JSON Format</h3>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            JavaScript Object Notation - widely supported data format for APIs and web applications
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <h3 className="font-semibold mb-3 text-purple-700 dark:text-purple-300">Common Use Cases</h3>
        <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-1">
          <li>• Converting spreadsheet data for web applications</li>
          <li>• Migrating data between different systems</li>
          <li>• Processing exported data from databases</li>
          <li>• Preparing configuration files for applications</li>
          <li>• Data analysis and transformation workflows</li>
        </ul>
      </div>
    </div>
  );
};

export default CsvToJsonConverter;
