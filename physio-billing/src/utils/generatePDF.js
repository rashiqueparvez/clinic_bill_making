
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const generatePDF = async () => {
  const invoice = document.getElementById("invoice");

  if (!invoice) {
    alert("Invoice not found");
    return;
  }

  try {
    // Save original background
    const originalBg = invoice.style.backgroundColor;

    // Force white background for PDF
    invoice.style.backgroundColor = "#ffffff";

    const canvas = await html2canvas(invoice, {
      // Reduced from 2 to 1.5 to reduce PDF size
      scale: 1.5,

      useCORS: true,

      allowTaint: false,

      backgroundColor: "#ffffff",

      logging: false,

      imageTimeout: 15000,
    });

    // Restore original background
    invoice.style.backgroundColor = originalBg;

    /*
     * JPEG instead of PNG.
     *
     * PNG creates very large PDF files because the entire
     * invoice screenshot is stored losslessly.
     *
     * JPEG compression dramatically reduces the file size.
     */
    const qualityLevels = [0.75, 0.65, 0.55, 0.45, 0.35];

    let pdfBlob = null;

    for (const quality of qualityLevels) {
      // Convert canvas to compressed JPEG
      const imgData = canvas.toDataURL(
        "image/jpeg",
        quality
      );

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pdfWidth = 210;
      const pdfHeight = 297;

      // Small margins
      const margin = 5;

      const availableWidth = pdfWidth - margin * 2;
      const availableHeight = pdfHeight - margin * 2;

      // Maintain original aspect ratio
      const canvasRatio = canvas.width / canvas.height;

      let imgWidth = availableWidth;
      let imgHeight = imgWidth / canvasRatio;

      // Make sure invoice fits completely on A4
      if (imgHeight > availableHeight) {
        imgHeight = availableHeight;
        imgWidth = imgHeight * canvasRatio;
      }

      // Center invoice on A4
      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      pdf.addImage(
        imgData,
        "JPEG",
        x,
        y,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );

      // Create PDF blob so we can check its size
      pdfBlob = pdf.output("blob");

      const sizeMB =
        pdfBlob.size / (1024 * 1024);

      console.log(
        `PDF quality: ${quality} | Size: ${sizeMB.toFixed(2)} MB`
      );

      /*
       * Target:
       * Less than 3.5 MB.
       *
       * This gives us a safety margin below your
       * 4 MB requirement.
       */
      if (sizeMB < 3.5) {
        break;
      }
    }

    if (!pdfBlob) {
      throw new Error("PDF generation failed");
    }

    // Create download URL
    const url = URL.createObjectURL(pdfBlob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `Invoice-${invoice.id}.pdf`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    // Free browser memory
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);

    console.log(
      `Final PDF size: ${(pdfBlob.size / (1024 * 1024)).toFixed(2)} MB`
    );

  } catch (error) {
    console.error("PDF generation failed:", error);

    // Make sure background is restored even if an error occurs
    invoice.style.backgroundColor = "";

    alert("PDF generation failed");
  }
};

export default generatePDF;

