
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileJson, FileSpreadsheet } from 'lucide-react';

const ExportOptions = () => {
  const handleExport = (format: 'csv' | 'json') => {
    // TODO: Implement export logic
    console.log(`Exporting as ${format}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Export Data</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          CSV
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleExport('json')}>
          <FileJson className="h-4 w-4 mr-2" />
          JSON
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExportOptions;
