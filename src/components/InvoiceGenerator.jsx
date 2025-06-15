import jsPDF from "jspdf";

const generateInvoice = (items, total, buyer) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Branding Header
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(40, 40, 90);
  doc.text("VoiceCart Pvt. Ltd.", pageWidth / 2, y, { align: "center" });

  y += 10;
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text("Official Invoice", pageWidth / 2, y, { align: "center" });

  // Date and Invoice Number
  y += 10;
  doc.setTextColor(0);
  doc.setFontSize(11);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, y);
  doc.text(`Invoice #: VC-${Math.floor(100000 + Math.random() * 900000)}`, pageWidth - 14, y, { align: "right" });

  // Buyer Info Box
y += 10;
doc.setFont("helvetica", "bold");
doc.setTextColor(0);
doc.text("Bill To:", 18, y + 8);

// Prepare wrapped address
doc.setFont("helvetica", "normal");
doc.setTextColor(60);
const addressLines = doc.splitTextToSize(buyer.address || "", 80);
const addressHeight = addressLines.length * 6; // Approx. 6 units per line

// Calculate total height of the info box
const boxHeight = 30 + addressHeight; // Name (1 line) + Email + Phone + Address block

// Draw background box
doc.setFillColor(240, 248, 255);
doc.roundedRect(14, y, pageWidth - 28, boxHeight, 3, 3, 'F');

// Re-draw all text after box
doc.setFont("helvetica", "bold");
doc.setTextColor(0);
doc.text("Bill To:", 18, y + 8);

doc.setFont("helvetica", "normal");
doc.setTextColor(60);
doc.text(buyer.name || "", 18, y + 16);
doc.text(buyer.email || "", 18, y + 22);
doc.text(buyer.phone || "", 18, y + 28);
doc.text(addressLines, 18, y + 34);

y += boxHeight + 5; // Move Y below the box for next section


  // Table Headers
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.setFillColor(220, 230, 255);
  doc.roundedRect(14, y, pageWidth - 28, 10, 2, 2, 'F');
  doc.text("Item", 16, y + 7);
  doc.text("Qty", 96, y + 7);
  doc.text("Price", 126, y + 7);
  doc.text("Total", 166, y + 7);

  // Items
  y += 15;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(50);
  items.forEach((item) => {
    doc.text(item.name, 16, y);
    doc.text(String(item.quantity), 96, y);
    doc.text(`$${item.price.toFixed(2)}`, 126, y);
    doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 166, y);
    y += 8;
  });

  // Grand Total
  y += 8;
  doc.setDrawColor(160);
  doc.line(14, y, pageWidth - 14, y);
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(20, 20, 60);
  doc.text("Grand Total:", 126, y);
  doc.text(`$${total.toFixed(2)}`, 166, y);

  // Footer
  y += 25;
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(120);
  doc.text("Thank you for shopping with VoiceCart! Visit us again.", pageWidth / 2, y, { align: "center" });

  // Save
  doc.save("VoiceCart_Invoice.pdf");
  return Promise.resolve();
};

export default generateInvoice;
