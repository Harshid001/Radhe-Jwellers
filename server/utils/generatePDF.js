const PDFDocument = require('pdfkit');

/**
 * Generate a billing PDF
 */
const generateBillPDF = (bill, customer, settings = {}) => {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  
  const shopName = settings.shopName || 'Radhe Jewellers';
  const shopAddress = settings.address || '';
  const shopPhone = settings.phone || '';
  const gstNumber = settings.gstNumber || '';

  // Header
  doc.fontSize(22).font('Helvetica-Bold').text(shopName, { align: 'center' });
  doc.fontSize(10).font('Helvetica').text('Trusted Gold & Silver Services', { align: 'center' });
  if (shopAddress) doc.text(shopAddress, { align: 'center' });
  if (shopPhone) doc.text(`Phone: ${shopPhone}`, { align: 'center' });
  if (gstNumber) doc.text(`GST: ${gstNumber}`, { align: 'center' });
  
  doc.moveDown();
  doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
  doc.moveDown();

  // Bill details
  doc.fontSize(14).font('Helvetica-Bold').text('INVOICE', { align: 'center' });
  doc.moveDown(0.5);
  
  doc.fontSize(10).font('Helvetica');
  doc.text(`Bill No: ${bill.billNumber}`, 50);
  doc.text(`Date: ${new Date(bill.createdAt).toLocaleDateString('en-IN')}`, 350, doc.y - 14);
  doc.text(`Type: ${bill.transactionType}`, 50);
  
  doc.moveDown();
  
  // Customer details
  doc.font('Helvetica-Bold').text('Customer Details:');
  doc.font('Helvetica');
  doc.text(`Name: ${customer.name}`);
  doc.text(`Mobile: ${customer.mobile}`);
  if (customer.address) doc.text(`Address: ${customer.address}`);
  
  doc.moveDown();
  doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
  doc.moveDown();

  // Table header
  const tableTop = doc.y;
  doc.font('Helvetica-Bold').fontSize(10);
  doc.text('Item', 50, tableTop);
  doc.text('Metal', 150, tableTop);
  doc.text('Purity', 210, tableTop);
  doc.text('Weight(g)', 270, tableTop);
  doc.text('Rate/g', 340, tableTop);
  doc.text('Amount', 420, tableTop);

  doc.moveTo(50, tableTop + 15).lineTo(545, tableTop + 15).stroke();

  // Table row
  const rowY = tableTop + 25;
  doc.font('Helvetica').fontSize(10);
  doc.text(bill.ornamentType, 50, rowY);
  doc.text(bill.metalType, 150, rowY);
  doc.text(bill.purity, 210, rowY);
  doc.text(bill.weight.toString(), 270, rowY);
  doc.text(`₹${bill.rate.toLocaleString('en-IN')}`, 340, rowY);
  doc.text(`₹${(bill.metalValue || 0).toLocaleString('en-IN')}`, 420, rowY);

  doc.moveTo(50, rowY + 20).lineTo(545, rowY + 20).stroke();

  // Totals
  let totalY = rowY + 35;
  doc.font('Helvetica').fontSize(10);
  doc.text('Metal Value:', 340, totalY);
  doc.text(`₹${(bill.metalValue || 0).toLocaleString('en-IN')}`, 450, totalY, { align: 'right', width: 95 });
  
  totalY += 18;
  doc.text('Making Charges:', 340, totalY);
  doc.text(`₹${(bill.makingCharges || 0).toLocaleString('en-IN')}`, 450, totalY, { align: 'right', width: 95 });
  
  totalY += 18;
  doc.text('Wastage Charges:', 340, totalY);
  doc.text(`₹${(bill.wastageCharges || 0).toLocaleString('en-IN')}`, 450, totalY, { align: 'right', width: 95 });
  
  totalY += 18;
  doc.text(`GST (${bill.gstPercentage}%):`, 340, totalY);
  doc.text(`₹${(bill.gstAmount || 0).toLocaleString('en-IN')}`, 450, totalY, { align: 'right', width: 95 });
  
  totalY += 5;
  doc.moveTo(340, totalY + 15).lineTo(545, totalY + 15).stroke();
  
  totalY += 22;
  doc.font('Helvetica-Bold').fontSize(12);
  doc.text('TOTAL:', 340, totalY);
  doc.text(`₹${bill.finalAmount.toLocaleString('en-IN')}`, 450, totalY, { align: 'right', width: 95 });

  totalY += 25;
  doc.font('Helvetica').fontSize(10);
  doc.text(`Payment Mode: ${bill.paymentMode}`, 50, totalY);

  // Footer
  doc.moveDown(4);
  doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
  doc.moveDown(0.5);
  doc.fontSize(9).text(settings.invoiceTerms || 'Thank you for your business!', { align: 'center' });

  return doc;
};

/**
 * Generate a repair receipt PDF
 */
const generateRepairPDF = (repair, customer, settings = {}) => {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  
  const shopName = settings.shopName || 'Radhe Jewellers';

  doc.fontSize(22).font('Helvetica-Bold').text(shopName, { align: 'center' });
  doc.fontSize(10).font('Helvetica').text('Repair Receipt', { align: 'center' });
  doc.moveDown();
  doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
  doc.moveDown();

  doc.fontSize(14).font('Helvetica-Bold').text('REPAIR RECEIPT', { align: 'center' });
  doc.moveDown();

  doc.fontSize(10).font('Helvetica');
  const details = [
    ['Repair ID', repair.repairId],
    ['Date', new Date(repair.createdAt).toLocaleDateString('en-IN')],
    ['Customer', customer.name],
    ['Mobile', repair.mobile],
    ['Ornament', repair.ornamentType],
    ['Metal', repair.metalType],
    ['Weight', `${repair.weight}g`],
    ['Problem', repair.problemDescription],
    ['Estimated Charge', `₹${(repair.estimatedCharge || 0).toLocaleString('en-IN')}`],
    ['Final Charge', `₹${(repair.finalCharge || 0).toLocaleString('en-IN')}`],
    ['Expected Delivery', repair.expectedDeliveryDate ? new Date(repair.expectedDeliveryDate).toLocaleDateString('en-IN') : 'TBD'],
    ['Status', repair.status]
  ];

  details.forEach(([label, value]) => {
    doc.font('Helvetica-Bold').text(`${label}: `, 50, doc.y, { continued: true });
    doc.font('Helvetica').text(value);
  });

  doc.moveDown(2);
  doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
  doc.moveDown(0.5);
  doc.fontSize(9).text('Please keep this receipt for collecting your ornament.', { align: 'center' });

  return doc;
};

/**
 * Generate a loan receipt PDF
 */
const generateLoanPDF = (loan, customer, settings = {}) => {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  
  const shopName = settings.shopName || 'Radhe Jewellers';

  doc.fontSize(22).font('Helvetica-Bold').text(shopName, { align: 'center' });
  doc.fontSize(10).font('Helvetica').text('Loan Receipt', { align: 'center' });
  doc.moveDown();
  doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
  doc.moveDown();

  doc.fontSize(14).font('Helvetica-Bold').text('LOAN RECEIPT', { align: 'center' });
  doc.moveDown();

  doc.fontSize(10).font('Helvetica');
  const details = [
    ['Loan ID', loan.loanId],
    ['Date', new Date(loan.startDate).toLocaleDateString('en-IN')],
    ['Customer', customer.name],
    ['Mobile', loan.mobile],
    ['Ornament', loan.ornamentType],
    ['Metal', loan.metalType],
    ['Weight', `${loan.weight}g`],
    ['Purity', loan.purity],
    ['Estimated Value', `₹${loan.estimatedValue.toLocaleString('en-IN')}`],
    ['Loan Percentage', `${loan.loanPercentage}%`],
    ['Loan Amount', `₹${loan.loanAmount.toLocaleString('en-IN')}`],
    ['Monthly Interest', `${loan.monthlyInterestRate}%`],
    ['Duration', `${loan.durationMonths} months`],
    ['Due Date', new Date(loan.dueDate).toLocaleDateString('en-IN')],
    ['Interest Amount', `₹${(loan.interestAmount || 0).toLocaleString('en-IN')}`],
    ['Penalty', `₹${(loan.penalty || 0).toLocaleString('en-IN')}`],
    ['Final Payable', `₹${loan.finalPayableAmount.toLocaleString('en-IN')}`],
    ['Paid Amount', `₹${(loan.paidAmount || 0).toLocaleString('en-IN')}`],
    ['Remaining', `₹${(loan.remainingAmount || 0).toLocaleString('en-IN')}`],
    ['Status', loan.status]
  ];

  details.forEach(([label, value]) => {
    doc.font('Helvetica-Bold').text(`${label}: `, 50, doc.y, { continued: true });
    doc.font('Helvetica').text(value);
  });

  doc.moveDown(2);
  doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
  doc.moveDown(0.5);
  doc.fontSize(9).text('This is a computer generated receipt.', { align: 'center' });

  return doc;
};

module.exports = { generateBillPDF, generateRepairPDF, generateLoanPDF };
