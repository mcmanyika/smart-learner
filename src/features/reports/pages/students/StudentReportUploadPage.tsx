import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ReportUploadForm } from '../../components/students/ReportUploadForm';
import { ReportsList } from '../../components/students/ReportsList';
import { reportsService } from '../../api/reports.service';
import type { ReportUploadData, StudentReport } from '../../types';

export function StudentReportUploadPage() {
  const { toast } = useToast();
  const [reports, setReports] = useState<StudentReport[]>([]);

  const handleUpload = async (data: ReportUploadData) => {
    try {
      const newReport = await reportsService.uploadReport(data);
      setReports([newReport, ...reports]);
      toast({
        title: 'Success',
        description: 'Report uploaded successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to upload report',
      });
    }
  };

  const handleView = (report: StudentReport) => {
    window.open(report.fileUrl, '_blank');
  };

  const handleDownload = async (report: StudentReport) => {
    try {
      const blob = await reportsService.downloadReport(report.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${report.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to download report',
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Student Report</h1>
        <p className="text-muted-foreground">
          Upload and manage student reports and assessments
        </p>
      </div>

      <Card className="p-6">
        <ReportUploadForm onSubmit={handleUpload} />
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Recent Reports</h2>
        <ReportsList
          reports={reports}
          onView={handleView}
          onDownload={handleDownload}
        />
      </Card>
    </div>
  );
}