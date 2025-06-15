import jsPDF from "jspdf";

export function generateInvoice({ user, items, total }) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Invoice", 14, 20);
  doc.setFontSize(12);
  doc.text(`Name: ${user.name}`, 14, 30);
  doc.text(`Address: ${user.address}`, 14, 38);
  doc.text("\nProducts:", 14, 48);

  let y = 56;
  items.forEach((item, idx) => {
    doc.text(
      `${idx + 1}. ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`,
      14,
      y
    );
    y += 8;
  });
  doc.text(`\nTotal: $${total.toFixed(2)}`, 14, y + 4);
  doc.save("invoice.pdf");
}
