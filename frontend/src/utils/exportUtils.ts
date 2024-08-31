import { Workbook } from 'exceljs';

interface ExportData {
  [key: string]: string | number | boolean | Date;
}

export const exportToCSV = (data: ExportData[], filename: string): void => {
  const csvContent =
    'data:text/csv;charset=utf-8,' +
    data.map((row) => Object.values(row).join(',')).join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToExcel = async (
  data: ExportData[],
  filename: string
): Promise<void> => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  // Add headers
  const headers = Object.keys(data[0]);
  worksheet.addRow(headers);

  // Add data
  data.forEach((item) => {
    worksheet.addRow(Object.values(item));
  });

  // Generate Excel file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = window.URL.createObjectURL(blob);

  // Trigger download
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.xlsx`;
  link.click();

  // Clean up
  window.URL.revokeObjectURL(url);
};
