const DefaultTool = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Welcome to Tiny Tools
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Fast, clean utilities for your daily work
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Instant results with no loading delays
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold mb-2">Single Purpose</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Each tool solves one specific problem
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-semibold mb-2">Works Offline</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No internet connection required
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Get Started</h2>
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p className="mb-4">
            Select a tool from the sidebar to get started. Each tool is designed to be:
          </p>
          <ul className="text-left max-w-md mx-auto space-y-2">
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Simple and intuitive</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Free from ads and popups</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Privacy-focused</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Always available</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-500">
        <p>Choose a tool from the sidebar to begin</p>
      </div>
    </div>
  );
};

export default DefaultTool;
