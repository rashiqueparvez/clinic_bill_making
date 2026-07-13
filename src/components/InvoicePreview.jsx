function InvoicePreview({

invoiceNo,
data,
signature

}){

const subtotal=

data.items.reduce(

(sum,item)=>

sum+

(

(Number(item.visits)||0)

*

(Number(item.rate)||0)

),

0

)

const gstPercent=

Number(data.gst||0)

const gst=

(subtotal*gstPercent)/100

const total=

subtotal+gst

return(

<div

id="invoice"

style={{

background:"#fff",
width:"794px",
minHeight:"1123px",
padding:"40px",
margin:"auto",
fontFamily:"Arial",
color:"#000"

}}

>

{/* HEADER */}

<div

style={{

display:"flex",
justifyContent:"space-between",
borderBottom:"2px solid black",
paddingBottom:"20px"

}}

>

<div

style={{

display:"flex",
gap:"20px",
alignItems:"center"

}}

>

<img

src="/logo.png"

alt="logo"

style={{

width:"150px",
height:"150px",
objectFit:"contain"

}}

/>

<div>

<h1

style={{

fontSize:"32px",
fontWeight:"700",
color:"#1D4ED8",
margin:"0"

}}

>

FIT PHYSIO THERAPY

</h1>

<p>

#52 1st Main,
1st Block,
1st Stage

</p>

<p>

HBR Layout,
Bangalore - 560043

</p>

<p>
    Reg No: 23/25/0017/2024
</p>

<p>

fitphysiotherapy4@gmail.com

</p>

<p>

+91 9606723416

</p>

</div>

</div>

<div
style={{
textAlign:"right"
}}
>

<h2
style={{
fontSize:"34px"
}}
>

INVOICE

</h2>

<p>

Invoice :

{invoiceNo}

</p>

<p>

Date :

{data.date}

</p>

<p>

Mobile :

{data.mobile}

</p>

</div>

</div>

{/* CUSTOMER */}

<div

style={{

display:"grid",

gridTemplateColumns:

"1fr 1fr",

gap:"15px",

marginTop:"30px"

}}

>

<p>

Name :

{data.name}

</p>

<p>

Gender :

{data.gender}

</p>

<p>

Age :

{data.age}

</p>



<p>

Mobile :

{data.mobile}

</p>

<p>

Referred :

{data.referredBy}

</p>

</div>

<div

style={{

border:"1px solid black",
padding:"15px",
marginTop:"20px"

}}

>

<b>

Diagnosis /
Comments

</b>

<p>

{data.diagnosis}

</p>

</div>

{/* TABLE */}

<table

style={{

width:"100%",
marginTop:"30px",
borderCollapse:"collapse"

}}

>

<thead>

<tr>

<th style={cell}>

Visits

</th>

<th style={cell}>

Description

</th>

<th style={cell}>

Rate

</th>

<th style={cell}>

Total

</th>

</tr>

</thead>

<tbody>

{

data.items.map(

(item,index)=>{

const rowTotal=

(Number(item.visits)||0)

*

(Number(item.rate)||0)

return(

<tr
key={index}
>

<td style={cell}>

{item.visits}

</td>

<td style={cell}>

{item.description}

</td>

<td style={cell}>

₹

{

Number(

item.rate||0

).toFixed(2)

}

</td>

<td style={cell}>

₹

{

rowTotal.toFixed(2)

}

</td>

</tr>

)

}

)

}

</tbody>

</table>

{/* TOTAL */}

<div

style={{

display:"flex",
justifyContent:"flex-end",
marginTop:"30px"

}}

>

<div

style={{

width:"280px",
border:"1px solid black"

}}

>

<Row
label="Subtotal"
value={subtotal}
/>

<Row
label={`GST (${gstPercent}%)`}
value={gst}
/>

<Row
label="Grand Total"
value={total}
bold
/>

</div>

</div>

{/* FOOTER */}

<div

style={{

display:"flex",
justifyContent:"space-between",
marginTop:"80px",
alignItems:"flex-end"

}}

>

<div>

Payment :

{data.paymentMode}

</div>

<div
style={{
textAlign:"center"
}}
>

{

signature&&(

<img

src={signature}

alt="signature"

style={{

width:"140px",
height:"80px",
objectFit:"contain"

}}

/>

)

}

<p>

<b>

FOR FIT PHYSIO THERAPY

</b>

</p>

</div>

</div>

</div>

)

}

const cell={

border:"1px solid black",
padding:"10px",
textAlign:"center"

}

function Row({

label,
value,
bold

}){

return(

<div

style={{

display:"flex",

justifyContent:"space-between",

padding:"10px",

borderBottom:

"1px solid black",

fontWeight:

bold?"700":"400"

}}

>

<span>

{label}

</span>

<span>

₹{

Number(

value

).toFixed(2)

}

</span>

</div>

)

}

export default InvoicePreview