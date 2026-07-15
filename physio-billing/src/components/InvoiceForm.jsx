import { useEffect, useState } from "react"
import InvoicePreview from "./InvoicePreview"
import SignatureUpload from "./SignatureUpload"
import generatePDF from "../utils/generatePDF"
import Select from "react-select";

const serviceTemplates = /*[

    "Physiotherapy Session",
    "Dry Needling",
    "Manual Therapy",
    "Electro Therapy",
    "Sports Rehab",
    "Post Surgery Rehab"

]*/
[
  "Physiotherapy Consultation",
  "Physiotherapy Session",
  "Sports Physiotherapy",
  "Orthopedic Physiotherapy",
  "Neurological Physiotherapy",
  "Pediatric Physiotherapy",
  "Geriatric Physiotherapy",
  "Women's Health Physiotherapy",
  "Post Operative Rehabilitation",
  "Post Fracture Rehabilitation",
  "ACL Rehabilitation",
  "Shoulder Rehabilitation",
  "Spine Rehabilitation",
  "Back Pain Treatment",
  "Neck Pain Treatment",
  "Knee Pain Treatment",
  "Frozen Shoulder Treatment",
  "Tennis Elbow Treatment",
  "Plantar Fasciitis Treatment",
  "Sciatica Treatment",
  "Cervical Spondylosis Treatment",
  "Lumbar Spondylosis Treatment",
  "Electro Therapy",
  "IFT Therapy",
  "TENS Therapy",
  "Ultrasound Therapy",
  "Laser Therapy",
  "Short Wave Diathermy",
  "Wax Therapy",
  "Traction Therapy",
  "Dry Needling",
  "Cupping Therapy",
  "Manual Therapy",
  "Myofascial Release",
  "Trigger Point Release",
  "Soft Tissue Mobilization",
  "Joint Mobilization",
  "Sports Massage",
  "Kinesio Taping",
  "Posture Correction",
  "Balance Training",
  "Gait Training",
  "Strengthening Exercises",
  "Stretching Exercises",
  "Home Exercise Program"
]
const serviceOptions = serviceTemplates.map(service => ({
    value: service,
    label: service
}));

function InvoiceForm() {

    const [invoiceNo, setInvoiceNo] =
        useState(295)

    const [signature, setSignature] =
        useState("")

    const [history, setHistory] =
        useState([])

    const [formData, setFormData] =
        useState({

            name: "",
            gender: "Male",
            age: "",
            mobile: "",
            regNo: "",
            date: "",
            referredBy: "",
            diagnosis: "",

            items: [

                {

                    visits: "",
                    description: "",
                    rate: ""

                }

            ],

            gst: "0",

            paymentMode: "Cash"

        })

    useEffect(() => {

        const savedInvoice =

            localStorage.getItem(
                "invoiceNo"
            )

        if (savedInvoice) {

            setInvoiceNo(
                Number(savedInvoice)
            )

        }

        const savedSignature =

            localStorage.getItem(
                "signature"
            )

        if (savedSignature) {

            setSignature(
                savedSignature
            )

        }

        loadHistory()

    }, [])

    function loadHistory() {

        const invoices =

            JSON.parse(

                localStorage.getItem(
                    "invoices"
                ) || "[]"

            )

        setHistory(

            [...invoices].reverse()

        )

    }

    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]:

                e.target.value

        })

    }

    function handleItemChange(

        index,
        field,
        value

    ) {

        const updated =

            [...formData.items]

        updated[index][field] =
            value

        setFormData({

            ...formData,

            items: updated

        })

    }

    function addSession() {

        setFormData({

            ...formData,

            items: [

                ...formData.items,

                {

                    visits: "",
                    description: "",
                    rate: ""

                }

            ]

        })

    }

    function removeSession(index) {

        if (

            formData.items.length === 1

        ) return

        const updated =

            formData.items.filter(

                (_, i) =>

                    i !== index

            )

        setFormData({

            ...formData,

            items: updated

        })

    }

    function selectTemplate(service) {

        const updated =

            [...formData.items]

        updated[
            updated.length - 1
        ].description =

            service

        setFormData({

            ...formData,

            items: updated

        })

    }

    function generateBill() {

        const subtotal =

            formData.items.reduce(

                (sum, item) =>

                    sum +

                    (

                        (Number(
                            item.visits
                        ) || 0)

                        *

                        (Number(
                            item.rate
                        ) || 0)

                    ),

                0

            )

        const gst =

            (subtotal *

                Number(
                    formData.gst
                )) / 100

        const total =

            subtotal + gst

        const invoiceId =

            `FIT-${invoiceNo}`

        const invoices =

            JSON.parse(

                localStorage.getItem(
                    "invoices"
                ) || "[]"

            )

        const newInvoice = {

            invoiceId,

            customer:
                formData.name,

            mobile:
                formData.mobile,

            regNo:
                formData.regNo,

            date:
                formData.date,

            items:
                formData.items,

            total,

            createdAt:

                Date.now()

        }

        invoices.push(
            newInvoice
        )

        localStorage.setItem(

            "invoices",

            JSON.stringify(
                invoices
            )

        )

        localStorage.setItem(

            "invoiceNo",

            invoiceNo + 1

        )

        setInvoiceNo(

            prev => prev + 1

        )

        loadHistory()

        alert(

            `${invoiceId}
Generated`

        )

    }

    return (

        <div
            className="
grid
lg:grid-cols-2
gap-8
items-start
"
        >

            <div
                className="
bg-white
p-6
rounded-xl
shadow
"
            >

                <h2
                    className="
text-2xl
font-bold
mb-5
"
                >

                    Customer Details

                </h2>

                <input
                    name="name"
                    placeholder="Customer Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="
border
p-3
w-full
mb-3
rounded
"
                />

                <div
                    className="
grid
grid-cols-2
gap-3
"
                >

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="
border
p-3
rounded
"
                    >

                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>

                    </select>

                    <input
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                        className="
border
p-3
rounded
"
                    />

                </div>

                <input
                    name="mobile"
                    placeholder="Mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="
border
p-3
my-3
rounded
w-full
"
                />



                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="
border
p-3
mb-3
rounded
w-full
"
                />

                <input
                    name="referredBy"
                    placeholder="Referred By"
                    value={formData.referredBy}
                    onChange={handleChange}
                    className="
border
p-3
mb-3
rounded
w-full
"
                />

                <textarea
                    name="diagnosis"
                    placeholder="Diagnosis"
                    rows="3"
                    value={formData.diagnosis}
                    onChange={handleChange}
                    className="
border
p-3
rounded
mb-3
w-full
"
                />

                <div className="mb-4">
  <Select
    options={serviceOptions}
    placeholder="🔍 Search Treatment..."
    isSearchable
    isClearable
    onChange={(selected) => {
      if (!selected) return;
      selectTemplate(selected.value);
    }}
  />
</div>

                {

                    formData.items.map(

                        (item, index) => (

                            <div

                                key={index}

                                className="
grid
grid-cols-4
gap-2
mb-3
"

                            >

                                <input
                                    placeholder="Visits"
                                    value={item.visits}
                                    onChange={(e) =>

                                        handleItemChange(

                                            index,
                                            "visits",
                                            e.target.value

                                        )

                                    }
                                    className="
border
p-3
rounded
"
                                />

                                <input
                                    placeholder="Description"
                                    value={item.description}
                                    onChange={(e) =>

                                        handleItemChange(

                                            index,
                                            "description",
                                            e.target.value

                                        )

                                    }
                                    className="
border
p-3
rounded
"
                                />

                                <input
                                    placeholder="Rate"
                                    value={item.rate}
                                    onChange={(e) =>

                                        handleItemChange(

                                            index,
                                            "rate",
                                            e.target.value

                                        )

                                    }
                                    className="
border
p-3
rounded
"
                                />

                                <button

                                    onClick={() =>

                                        removeSession(index)

                                    }

                                    className="
bg-red-500
text-white
rounded
"

                                >

                                    X

                                </button>

                            </div>

                        )

                    )

                }

                <button
                    onClick={addSession}
                    className="
bg-gray-700
text-white
px-4
py-2
rounded
mb-3
"
                >

                    + Add Session

                </button>

                <input
                    name="gst"
                    placeholder="GST %"
                    value={formData.gst}
                    onChange={handleChange}
                    className="
border
p-3
rounded
mb-3
w-full
"
                />

                <select
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleChange}
                    className="
border
p-3
rounded
w-full
"
                >

                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Card</option>

                </select>

                <div className="mt-5">

                    <SignatureUpload
                        setSignature={setSignature}
                    />

                </div>

                <div
                    className="
flex
gap-3
mt-5
"
                >

                    <button
                        onClick={generateBill}
                        className="
bg-blue-600
text-white
flex-1
py-3
rounded
"
                    >

                        Generate

                    </button>

                    <button
                        onClick={generatePDF}
                        className="
bg-green-600
text-white
flex-1
py-3
rounded
"
                    >

                        Save PDF

                    </button>

                </div>

            </div>

            <InvoicePreview

                invoiceNo={invoiceNo}

                data={formData}

                signature={signature}

            />

        </div>

    )

}

export default InvoiceForm
