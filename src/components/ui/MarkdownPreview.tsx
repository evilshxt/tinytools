import { useState } from 'react';
import { FileText, Copy, Check, Eye, EyeOff } from 'lucide-react';
import { marked } from 'marked';

const MarkdownPreview = () => {
  const [markdown, setMarkdown] = useState('');
  const [copied, setCopied] = useState(false);
  const [showHtml, setShowHtml] = useState(false);

  const html = marked(markdown);

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const loadSample = () => {
    const sample = `# Welcome to Markdown Preview

This is a **bold** text and this is *italic* text.

## Features

- Real-time markdown parsing
- Live preview
- HTML export
- Copy functionality

### Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Links

Check out [Tiny Tools](https://tinytools-preview.vercel.app) for more utilities!

> This is a blockquote
> Multiple lines are supported`;

    setMarkdown(sample);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center space-x-3">
          <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <span>Markdown Preview</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Write markdown and see live HTML preview instantly
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Markdown Editor</h2>
            <div className="flex space-x-2">
              <button
                onClick={loadSample}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Load Sample
              </button>
              <button
                onClick={() => copyToClipboard(markdown)}
                disabled={!markdown}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy MD'}</span>
              </button>
            </div>
          </div>
          
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Write your markdown here..."
            className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {markdown.length} characters • {markdown.split('\n').length} lines
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Preview</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowHtml(!showHtml)}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {showHtml ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showHtml ? 'Preview' : 'HTML'}</span>
              </button>
              <button
                onClick={() => copyToClipboard(html)}
                disabled={!markdown}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy HTML'}</span>
              </button>
            </div>
          </div>
          
          <div className="h-96 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-y-auto">
            {showHtml ? (
              <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {html || '<!-- HTML will appear here -->'}
              </pre>
            ) : (
              <div 
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: html || '<p>Preview will appear here...</p>' }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">Real-time Preview</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            See formatted output as you type
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">HTML Export</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Copy generated HTML for use in web projects
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">Common Syntax</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Support for headers, lists, links, code blocks, and more
          </p>
        </div>
      </div>

      {/* Markdown Reference */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-300">Quick Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600 dark:text-blue-400">
          <div>
            <strong>Headers:</strong> # H1, ## H2, ### H3
          </div>
          <div>
            <strong>Emphasis:</strong> *italic* **bold**
          </div>
          <div>
            <strong>Links:</strong> [text](url)
          </div>
          <div>
            <strong>Code:</strong> `inline` ```block```
          </div>
          <div>
            <strong>Lists:</strong> * item or - item
          </div>
          <div>
            <strong>Quotes:</strong> &gt; quote text
          </div>
          <div>
            <strong>Line breaks:</strong> 2 spaces at end of line
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <p className="text-sm text-green-700 dark:text-green-300">
          <strong>Production Ready:</strong> Using marked library for complete, standards-compliant markdown parsing.
        </p>
      </div>
    </div>
  );
};

export default MarkdownPreview;
