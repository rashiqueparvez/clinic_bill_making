function SignatureUpload({setSignature}){

function upload(e){

const file=e.target.files[0]

if(!file)return

const reader=new FileReader()

reader.onload=()=>{

localStorage.setItem(
"signature",
reader.result
)

setSignature(reader.result)

}

reader.readAsDataURL(file)

}

return(

<div>

<label
className="
font-semibold
block
mb-2
"
>

Upload Signature

</label>

<input
type="file"
accept="image/*"
onChange={upload}
/>

</div>

)

}

export default SignatureUpload