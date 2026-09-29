import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const generatePDF = async (invoiceNo) => {
    const invoice = document.getElementById("invoice");

    if (!invoice) {
        alert("Invoice not found");
        return;
    }

    const scaleWrapper = document.querySelector(
        '[data-invoice-scale-wrapper="true"]'
    );

    const originalTransform =
        scaleWrapper?.style.transform || "";

    const originalTransformOrigin =
        scaleWrapper?.style.transformOrigin || "";

    try {
        /*
         * Remove mobile/responsive scale
         * before creating the PDF.
         */
        if (scaleWrapper) {
            scaleWrapper.style.transform = "none";
            scaleWrapper.style.transformOrigin =
                "top left";
        }

        /*
         * Give the browser time to repaint
         * the unscaled invoice.
         */
        await new Promise((resolve) => {
            requestAnimationFrame(() => {
                requestAnimationFrame(resolve);
            });
        });

        const canvas = await html2canvas(
            invoice,
            {
                scale: 2,

                width: 794,
                height: 1123,

                windowWidth: 794,
                windowHeight: 1123,

                useCORS: true,

                allowTaint: false,

                backgroundColor: "#ffffff",

                logging: false,

                imageTimeout: 15000,

                letterRendering: true,
            }
        );

        /*
         * Restore responsive preview.
         */
        if (scaleWrapper) {
            scaleWrapper.style.transform =
                originalTransform;

            scaleWrapper.style.transformOrigin =
                originalTransformOrigin;
        }

        const imgData =
            canvas.toDataURL(
                "image/jpeg",
                0.85
            );

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
            compress: true,
        });

        const pdfWidth = 210;
        const pdfHeight = 297;

        const margin = 5;

        const availableWidth =
            pdfWidth - margin * 2;

        const availableHeight =
            pdfHeight - margin * 2;

        const ratio =
            canvas.width / canvas.height;

        let imgWidth =
            availableWidth;

        let imgHeight =
            imgWidth / ratio;

        if (
            imgHeight >
            availableHeight
        ) {
            imgHeight =
                availableHeight;

            imgWidth =
                imgHeight * ratio;
        }

        const x =
            (pdfWidth - imgWidth) / 2;

        const y =
            (pdfHeight - imgHeight) / 2;

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

        pdf.save(
            `Invoice-FIT-${invoiceNo || "invoice"}.pdf`
        );

    } catch (error) {

        console.error(
            "PDF generation failed:",
            error
        );

        if (scaleWrapper) {
            scaleWrapper.style.transform =
                originalTransform;

            scaleWrapper.style.transformOrigin =
                originalTransformOrigin;
        }

        alert(
            "PDF generation failed. Please try again."
        );
    }
};

export default generatePDF;