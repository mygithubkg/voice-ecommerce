import jsPDF from "jspdf";

/**
 * Generates a modern, themed PDF invoice.
 * @param {Array} items - The list of items in the cart.
 * @param {number} total - The grand total.
 * @param {object} buyer - The buyer's information.
 * @returns {Promise<void>} A promise that resolves when the PDF is saved.
 */
const generateInvoice = (items, total, buyer) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 0;

  // Define Theme Colors
  const primaryColor = "#4F46E5"; // Indigo
  const secondaryColor = "#10B981"; // A splash of cyan/green for accents
  const textColor = "#1F2937"; // Dark Gray
  const lightTextColor = "#6B7280"; // Medium Gray
  const backgroundColor = "#F9FAFB"; // Very Light Gray

  // --- Header Section ---
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, pageWidth, 30, 'F');

  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#FFFFFF");
  doc.text("INVOICE", 20, 20);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("VoiceCart Pvt. Ltd.", pageWidth - 20, 15, { align: "right" });
  doc.text("Ghaziabad, Uttar Pradesh, India", pageWidth - 20, 20, { align: "right" });
  y = 45;

  // --- Invoice Details ---
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(textColor);
  doc.text("Bill To:", 20, y);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(lightTextColor);
  doc.text(buyer.name || "N/A", 20, y + 6);
  const addressLines = doc.splitTextToSize(buyer.address || "No address provided", 80);
  doc.text(addressLines, 20, y + 12);
  const addressHeight = addressLines.length * 5;
  doc.text(buyer.email || "N/A", 20, y + 12 + addressHeight);
  doc.text(buyer.phone || "N/A", 20, y + 18 + addressHeight);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(textColor);
  const invoiceId = `VC-${Math.floor(100000 + Math.random() * 900000)}`;
  doc.text("Invoice #:", pageWidth - 60, y);
  doc.text("Date:", pageWidth - 60, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(lightTextColor);
  doc.text(invoiceId, pageWidth - 20, y, { align: "right" });
  doc.text(new Date().toLocaleDateString(), pageWidth - 20, y + 6, { align: "right" });

  y += 30 + addressHeight;

  // --- Items Table ---
  const tableHeaders = ["Item Description", "Qty", "Price", "Total"];
  const colWidths = [100, 25, 30, 30];
  let x = 15;

  // Table Header
  doc.setFillColor(primaryColor);
  doc.rect(x, y, pageWidth - 30, 10, 'F');
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#FFFFFF");
  doc.setFontSize(11);
  doc.text(tableHeaders[0], x + 5, y + 7); // Item
  doc.text(tableHeaders[1], x + colWidths[0] + 12, y + 7, { align: "center" }); // Qty
  doc.text(tableHeaders[2], x + colWidths[0] + colWidths[1] + 20, y + 7, { align: "right" }); // Price
  doc.text(tableHeaders[3], x + colWidths[0] + colWidths[1] + colWidths[2] + 28, y + 7, { align: "right" }); // Total

  y += 10;

  // Table Body
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textColor);
  doc.setFontSize(10);

  items.forEach((item, index) => {
    // Zebra stripes
    if (index % 2 === 0) {
      doc.setFillColor(backgroundColor);
      doc.rect(x, y, pageWidth - 30, 10, 'F');
    }
    const itemNameLines = doc.splitTextToSize(item.name, 90);
    const itemY = y + 7;

    doc.text(itemNameLines, x + 5, itemY);
    doc.text(String(item.quantity), x + colWidths[0] + 12, itemY, { align: "center" });
    doc.text(`$${item.price.toFixed(2)}`, x + colWidths[0] + colWidths[1] + 20, itemY, { align: "right" });
    doc.text(`$${(item.price * item.quantity).toFixed(2)}`, x + colWidths[0] + colWidths[1] + colWidths[2] + 28, itemY, { align: "right" });
    
    // Adjust y for next item, considering wrapped item names
    const lineHeight = itemNameLines.length > 1 ? (itemNameLines.length * 5) + 5 : 10;
    y += lineHeight;
    
    // Add page break if content overflows
    if (y > pageHeight - 40) {
        doc.addPage();
        y = 20;
    }
  });

  // --- Totals Section ---
  y += 10;
  const totalX = pageWidth - 80;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(textColor);
  doc.text("Subtotal:", totalX, y);
  doc.text(`$${total.toFixed(2)}`, pageWidth - 20, y, { align: "right" });
  
  y += 7;
  doc.text("Tax (0%):", totalX, y);
  doc.text("$0.00", pageWidth - 20, y, { align: "right" });
  
  y += 5;
  doc.setDrawColor(primaryColor);
  doc.setLineWidth(0.5);
  doc.line(totalX - 5, y, pageWidth - 15, y);
  
  y += 7;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(primaryColor);
  doc.text("Total:", totalX, y);
  doc.text(`$${total.toFixed(2)}`, pageWidth - 20, y, { align: "right" });

  // --- Footer Section ---
  const footerY = pageHeight - 20;
  doc.setFillColor(primaryColor);
  doc.rect(0, footerY - 5, pageWidth, 25, 'F');
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#FFFFFF");
  doc.text("Thank you for your business!", pageWidth / 2, footerY + 5, { align: "center" });
  doc.text("www.voicecart.dev", pageWidth / 2, footerY + 11, { align: "center" });

  // --- Save ---
  doc.save(`VoiceCart_Invoice_${invoiceId}.pdf`);
  return Promise.resolve();
};

export default generateInvoice;
