import jsPDF from "jspdf";

const generateInvoice = (items, total, buyer) => {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Theme Variables
  const colors = {
    primary: "#7C3AED", // Violet 600
    text: "#1F2937",    // Slate 800
    muted: "#6B7280",   // Slate 500
    line: "#E5E7EB",    // Gray 200
    bg: "#F9FAFB"       // Slate 50
  };

  let y = 20;

  // --- Header ---
  doc.setTextColor(colors.primary);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("INVOICE", 20, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(colors.muted);
  doc.text("VoiceCart Pvt. Ltd.", 20, y + 6);
  doc.text("www.voicecart.dev", 20, y + 11);

  // Invoice Meta
  doc.setFont("helvetica", "bold");
  doc.setTextColor(colors.text);
  const invoiceId = `VC-${Math.floor(100000 + Math.random() * 900000)}`;
  doc.text(`Invoice #${invoiceId}`, pageWidth - 20, y, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setTextColor(colors.muted);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 20, y + 6, { align: "right" });

  y += 30;

  // --- Bill To Section ---
  doc.setDrawColor(colors.line);
  doc.line(20, y, pageWidth - 20, y);
  y += 10;

  doc.setFontSize(9);
  doc.setTextColor(colors.muted);
  doc.text("BILLED TO", 20, y);

  y += 6;
  doc.setFontSize(11);
  doc.setTextColor(colors.text);
  doc.setFont("helvetica", "bold");
  doc.text(buyer.name || "Valued Customer", 20, y);

  doc.setFont("helvetica", "normal");
  const addressLines = doc.splitTextToSize(buyer.address || "No address provided", 70);
  doc.text(addressLines, 20, y + 5);

  y += (addressLines.length * 5) + 5;
  doc.text(buyer.email || "", 20, y);

  y += 20;

  // --- Items Table ---
  // Table Header
  doc.setFontSize(9);
  doc.setTextColor(colors.muted);
  doc.setFont("helvetica", "bold");
  doc.text("DESCRIPTION", 20, y);
  doc.text("QTY", 130, y, { align: "right" });
  doc.text("PRICE", 160, y, { align: "right" });
  doc.text("TOTAL", 190, y, { align: "right" });

  y += 5;
  doc.setDrawColor(colors.line);
  doc.line(20, y, pageWidth - 20, y);
  y += 10;

  // Items
  doc.setFont("helvetica", "normal");
  doc.setTextColor(colors.text);

  items.forEach((item) => {
    const itemName = doc.splitTextToSize(item.name, 90);
    doc.text(itemName, 20, y);
    doc.text(String(item.quantity), 130, y, { align: "right" });
    doc.text(`$${item.price.toFixed(2)}`, 160, y, { align: "right" });
    doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 190, y, { align: "right" });

    y += (itemName.length * 5) + 5;
  });

  // --- Total Summary Box ---
  y += 10;
  doc.setFillColor(colors.bg);
  doc.roundedRect(120, y, 70, 30, 2, 2, 'F');

  y += 8;
  doc.setFontSize(10);
  doc.setTextColor(colors.muted);
  doc.text("Subtotal", 130, y);
  doc.text(`$${total.toFixed(2)}`, 180, y, { align: "right" });

  y += 7;
  doc.text("Tax", 130, y);
  doc.text("$0.00", 180, y, { align: "right" });

  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(colors.text);
  doc.text("Grand Total", 130, y);
  doc.setTextColor(colors.primary);
  doc.text(`$${total.toFixed(2)}`, 180, y, { align: "right" });

  // --- Footer ---
  doc.setFillColor(colors.text);
  doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');

  doc.setFontSize(8);
  doc.setTextColor("#FFFFFF");
  doc.text("Thank you for choosing VoiceCart.", pageWidth / 2, pageHeight - 12, { align: "center" });
  doc.text("For support, contact support@voicecart.dev", pageWidth / 2, pageHeight - 8, { align: "center" });

  doc.save(`VoiceCart_Invoice_${invoiceId}.pdf`);
  return Promise.resolve();
};

export default generateInvoice;