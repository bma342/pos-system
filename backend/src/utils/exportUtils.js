const ExcelJS = require 'exceljs';
const PDFDocument = require 'pdfkit';
const { Readable } = require 'stream';

const exportToExcel = async (data[], sheetName) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  // Add headers
  const headers = Object.keys(data[0]);
  worksheet.addRow(headers);

  // Add data
  data.forEach(item => {
    worksheet.addRow(Object.values(item));
  });

  return await workbook.xlsx.writeBuffer();
};

const exportToPDF = (data[]) => {
  const doc = new PDFDocument();
  const stream = new Readable();
  stream._read = () => {};

  doc.pipe(stream);

  // Add headers
  const headers = Object.keys(data[0]);
  doc.text(headers.join(', '));

  // Add data
  data.forEach(item => {
    doc.text(Object.values(item).join(', '));
  });

  doc.end();

  return stream;
};