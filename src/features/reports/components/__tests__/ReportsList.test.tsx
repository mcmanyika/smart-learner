import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/test/utils';
import { ReportsList } from '../students/ReportsList';
import { formatDate } from '@/lib/utils/date';

const mockReports = [
  {
    id: '1',
    title: 'Test Report',
    type: 'academic',
    teacherName: 'John Smith',
    uploadedAt: '2024-03-20T10:00:00Z',
  },
  {
    id: '2',
    title: 'Another Report',
    type: 'attendance',
    teacherName: 'Jane Doe',
    uploadedAt: '2024-03-19T10:00:00Z',
  },
];

describe('ReportsList', () => {
  it('renders reports correctly', () => {
    const onView = vi.fn();
    const onDownload = vi.fn();

    render(
      <ReportsList
        reports={mockReports}
        onView={onView}
        onDownload={onDownload}
      />
    );

    expect(screen.getByText('Test Report')).toBeInTheDocument();
    expect(screen.getByText('Another Report')).toBeInTheDocument();
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText(formatDate('2024-03-20T10:00:00Z'))).toBeInTheDocument();
  });

  it('calls onView when view button is clicked', () => {
    const onView = vi.fn();
    const onDownload = vi.fn();

    render(
      <ReportsList
        reports={mockReports}
        onView={onView}
        onDownload={onDownload}
      />
    );

    const viewButtons = screen.getAllByRole('button', { name: /view/i });
    fireEvent.click(viewButtons[0]);

    expect(onView).toHaveBeenCalledWith(mockReports[0]);
  });

  it('calls onDownload when download button is clicked', () => {
    const onView = vi.fn();
    const onDownload = vi.fn();

    render(
      <ReportsList
        reports={mockReports}
        onView={onView}
        onDownload={onDownload}
      />
    );

    const downloadButtons = screen.getAllByRole('button', { name: /download/i });
    fireEvent.click(downloadButtons[0]);

    expect(onDownload).toHaveBeenCalledWith(mockReports[0]);
  });

  it('displays empty state when no reports', () => {
    const onView = vi.fn();
    const onDownload = vi.fn();

    render(
      <ReportsList
        reports={[]}
        onView={onView}
        onDownload={onDownload}
      />
    );

    expect(screen.getByText(/no reports found/i)).toBeInTheDocument();
  });
});