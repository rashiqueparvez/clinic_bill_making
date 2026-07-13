import jsPDF from "jspdf"
import html2canvas from "html2canvas"

const generatePDF = async () => {

const invoice =
document.getElementById("invoice")

if(!invoice){

alert("Invoice not found")

return

}

try{

const originalBg =
invoice.style.backgroundColor

invoice.style.backgroundColor="#ffffff"

const canvas =
await html2canvas(

invoice,

{

scale:2,

useCORS:true,

backgroundColor:"#ffffff",

logging:false

}

)

invoice.style.backgroundColor=
originalBg

const imgData =
canvas.toDataURL("image/png")

const pdf =
new jsPDF({

orientation:"portrait",

unit:"mm",

format:"a4"

})

const pdfWidth=210

const pdfHeight=
(canvas.height*pdfWidth)
/canvas.width

pdf.addImage(

imgData,

"PNG",

0,

0,

pdfWidth,

pdfHeight

)

pdf.save(

`Invoice-${invoice.id}.pdf`

)

}

catch(error){

console.log(error)

alert(

"PDF generation failed"

)

}

}

export default generatePDF