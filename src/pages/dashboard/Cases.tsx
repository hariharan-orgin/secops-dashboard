import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const filterOptions = ['All Cases', 'Open', 'In Progress', 'Closed'];

export default function Cases() {
  const [filter, setFilter] = useState('All Cases');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Case Management</h1>
          <p className="text-muted-foreground mt-1">Manage security cases</p>
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="px-4 py-2 rounded-lg border border-input bg-card text-foreground flex items-center gap-2 hover:bg-muted transition-colors min-w-[140px]"
          >
            <span className="text-sm">{filter}</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
          
          {isFilterOpen && (
            <div className="absolute right-0 z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFilter(option);
                    setIsFilterOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-muted text-foreground transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cases List - Empty State */}
      <div className="bg-card rounded-lg border border-border min-h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">No cases found</p>
      </div>
    </div>
  );
}
