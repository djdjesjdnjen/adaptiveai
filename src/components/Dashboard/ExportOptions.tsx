import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const ExportOptions: React.FC = () => {
  const handleExport = (format: 'csv' | 'json' | 'pdf') => {
    // Implement export logic here
    console.log(`Exporting as ${format}`);
  };

  return (
    <div className="flex gap-2 justify-end p-4">
      <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
        <Download className="h-4 w-4 mr-2" />
        CSV
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleExport('json')}>
        <Download className="h-4 w-4 mr-2" />
        JSON
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
        <Download className="h-4 w-4 mr-2" />
        PDF
      </Button>
    </div>
  );
};

export default ExportOptions;