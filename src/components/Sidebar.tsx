import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Code, Lock, Link, Palette, Droplet, Fingerprint, Hash, FileText, Minimize2, QrCode } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  category: string;
  icon: string;
}

interface SidebarProps {
  tools: Tool[];
  selectedTool: string | null;
  onToolSelect: (toolId: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Lock,
  Link,
  Palette,
  Droplet,
  Fingerprint,
  Hash,
  FileText,
  Minimize2,
  QrCode,
};

const Sidebar: React.FC<SidebarProps> = ({ tools, selectedTool, onToolSelect }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Group tools by category
  const toolsByCategory = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  return (
    <aside className={`bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Collapse Toggle */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Tools List */}
      <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
        {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
          <div key={category}>
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                {category}
              </h3>
            )}
            <ul className="space-y-1">
              {categoryTools.map((tool) => {
                const IconComponent = iconMap[tool.icon];
                const isActive = selectedTool === tool.id;
                return (
                  <li key={tool.id}>
                    <button
                      onClick={() => onToolSelect(tool.id)}
                      className={`w-full flex items-center justify-center p-3 rounded-lg transition-colors group relative ${
                        isActive
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                      title={tool.name}
                    >
                      {IconComponent && (
                        <IconComponent className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                      )}
                      
                      {/* Active indicator dot for collapsed view */}
                      {isCollapsed && isActive && (
                        <div className="absolute left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                      )}
                      
                      {!isCollapsed && (
                        <span className="ml-3 text-sm font-medium truncate">{tool.name}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
