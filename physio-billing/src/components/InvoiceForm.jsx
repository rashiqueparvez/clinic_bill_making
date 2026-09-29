
import { useEffect, useState } from "react";
import InvoicePreview from "./InvoicePreview";
import SignatureUpload from "./SignatureUpload";
import generatePDF from "../utils/generatePDF";
import Select from "react-select";

const serviceTemplates = [
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
    "Home Exercise Program",
];

const serviceOptions = serviceTemplates.map((service) => ({
    value: service,
    label: service,
}));

function InvoiceForm() {
    const [invoiceNo, setInvoiceNo] = useState(295);

    const [signature, setSignature] = useState("");

    const [history, setHistory] = useState([]);

    const [formData, setFormData] = useState({
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
                rate: "",
            },
        ],

        gst: "0",
        paymentMode: "Cash",
    });

    useEffect(() => {
        const savedInvoice = localStorage.getItem("invoiceNo");

        if (savedInvoice) {
            setInvoiceNo(Number(savedInvoice));
        }

        const savedSignature = localStorage.getItem("signature");

        if (savedSignature) {
            setSignature(savedSignature);
        }

        loadHistory();
    }, []);

    function loadHistory() {
        const invoices = JSON.parse(
            localStorage.getItem("invoices") || "[]"
        );

        setHistory([...invoices].reverse());
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function handleItemChange(index, field, value) {
        const updated = [...formData.items];

        updated[index][field] = value;

        setFormData({
            ...formData,
            items: updated,
        });
    }

    function addSession() {
        setFormData({
            ...formData,
            items: [
                ...formData.items,
                {
                    visits: "",
                    description: "",
                    rate: "",
                },
            ],
        });
    }

    function removeSession(index) {
        if (formData.items.length === 1) return;

        const updated = formData.items.filter(
            (_, i) => i !== index
        );

        setFormData({
            ...formData,
            items: updated,
        });
    }

    function selectTemplate(service) {
        const updated = [...formData.items];

        updated[updated.length - 1].description = service;

        setFormData({
            ...formData,
            items: updated,
        });
    }

    function generateBill() {
        const subtotal = formData.items.reduce(
            (sum, item) =>
                sum +
                (Number(item.visits) || 0) *
                (Number(item.rate) || 0),
            0
        );

        const gst =
            (subtotal * Number(formData.gst)) / 100;

        const total = subtotal + gst;

        const invoiceId = `FIT-${invoiceNo}`;

        const invoices = JSON.parse(
            localStorage.getItem("invoices") || "[]"
        );

        const newInvoice = {
            invoiceId,
            customer: formData.name,
            mobile: formData.mobile,
            regNo: formData.regNo,
            date: formData.date,
            items: formData.items,
            total,
            createdAt: Date.now(),
        };

        invoices.push(newInvoice);

        localStorage.setItem(
            "invoices",
            JSON.stringify(invoices)
        );

        localStorage.setItem(
            "invoiceNo",
            invoiceNo + 1
        );

        setInvoiceNo((prev) => prev + 1);

        loadHistory();

        alert(`${invoiceId}\nGenerated`);
    }

    return (
        <>
            <style>{`

                /* =========================================
                   INVOICE FORM
                ========================================= */

                .invoice-form-container {
                    width: 100%;
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) minmax(420px, 1fr);
                    gap: 28px;
                    align-items: start;
                }

                /* =========================================
                   FORM CARD
                ========================================= */

                .invoice-form-card {
                    background: #ffffff;
                    border: 1px solid #e4eaee;
                    border-radius: 18px;
                    padding: 28px;
                    box-shadow: 0 8px 30px rgba(16, 42, 56, 0.06);
                    box-sizing: border-box;
                }

                .invoice-form-header {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 15px;
                    margin-bottom: 25px;
                    padding-bottom: 18px;
                    border-bottom: 1px solid #edf1f3;
                }

                .invoice-form-title {
                    margin: 0;
                    font-size: 21px;
                    font-weight: 750;
                    color: #17313e;
                    letter-spacing: -0.3px;
                }

                .invoice-form-subtitle {
                    margin: 5px 0 0;
                    font-size: 12px;
                    color: #83919a;
                }

                .invoice-number-badge {
                    background: #eef9f7;
                    color: #178c7d;
                    border: 1px solid #d6f0eb;
                    border-radius: 9px;
                    padding: 7px 11px;
                    font-size: 12px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                /* =========================================
                   SECTION
                ========================================= */

                .invoice-section {
                    margin-bottom: 23px;
                }

                .invoice-section-title {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    margin: 0 0 13px;
                    color: #29424e;
                    font-size: 13px;
                    font-weight: 750;
                    text-transform: uppercase;
                    letter-spacing: 0.7px;
                }

                .invoice-section-title::before {
                    content: "";
                    width: 4px;
                    height: 16px;
                    border-radius: 5px;
                    background: #1fa392;
                }

                /* =========================================
                   FORM GRID
                ========================================= */

                .invoice-form-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 13px;
                }

                .invoice-form-full {
                    grid-column: 1 / -1;
                }

                .invoice-field {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .invoice-field label {
                    color: #5f7079;
                    font-size: 11px;
                    font-weight: 650;
                }

                /* =========================================
                   INPUTS
                ========================================= */

                .invoice-input,
                .invoice-select,
                .invoice-textarea {
                    width: 100%;
                    border: 1px solid #dbe3e7;
                    background: #fbfcfd;
                    color: #233943;
                    border-radius: 9px;
                    padding: 11px 12px;
                    outline: none;
                    box-sizing: border-box;
                    font-family: inherit;
                    font-size: 13px;
                    transition:
                        border-color 0.2s ease,
                        box-shadow 0.2s ease,
                        background 0.2s ease;
                }

                .invoice-input:hover,
                .invoice-select:hover,
                .invoice-textarea:hover {
                    border-color: #c7d3d9;
                }

                .invoice-input:focus,
                .invoice-select:focus,
                .invoice-textarea:focus {
                    border-color: #1fa392;
                    background: #ffffff;
                    box-shadow: 0 0 0 3px rgba(31,163,146,0.10);
                }

                .invoice-input::placeholder,
                .invoice-textarea::placeholder {
                    color: #9aa7ad;
                }

                .invoice-textarea {
                    resize: vertical;
                    min-height: 84px;
                    line-height: 1.5;
                }

                /* =========================================
                   TREATMENT SEARCH
                ========================================= */

                .treatment-search {
                    margin-top: 6px;
                }

                .treatment-search .select__control {
                    border-color: #dbe3e7;
                    border-radius: 9px;
                    min-height: 43px;
                    box-shadow: none;
                    background: #fbfcfd;
                }

                .treatment-search .select__control:hover {
                    border-color: #c7d3d9;
                }

                .treatment-search .select__control--is-focused {
                    border-color: #1fa392;
                    box-shadow: 0 0 0 3px rgba(31,163,146,0.10);
                }

                /* =========================================
                   TREATMENT ROW
                ========================================= */

                .treatment-list {
                    display: flex;
                    flex-direction: column;
                    gap: 9px;
                    margin-top: 13px;
                }

                .treatment-row {
                    display: grid;
                    grid-template-columns: 85px minmax(0, 1fr) 95px 40px;
                    gap: 8px;
                    align-items: center;
                }

                .treatment-row .invoice-input {
                    min-width: 0;
                }

                .remove-treatment {
                    height: 41px;
                    width: 40px;
                    border: 1px solid #ffd5d5;
                    background: #fff5f5;
                    color: #dc4d4d;
                    border-radius: 9px;
                    cursor: pointer;
                    font-size: 15px;
                    font-weight: 700;
                    transition:
                        background 0.2s ease,
                        color 0.2s ease,
                        transform 0.2s ease;
                }

                .remove-treatment:hover {
                    background: #dc4d4d;
                    color: #ffffff;
                    transform: translateY(-1px);
                }

                /* =========================================
                   ADD SESSION
                ========================================= */

                .add-session-button {
                    margin-top: 11px;
                    border: 1px dashed #b9dcd7;
                    background: #f1faf8;
                    color: #188f80;
                    padding: 10px 14px;
                    border-radius: 9px;
                    font-family: inherit;
                    font-size: 12px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .add-session-button:hover {
                    background: #e6f6f3;
                    border-color: #1fa392;
                    transform: translateY(-1px);
                }

                /* =========================================
                   BILLING OPTIONS
                ========================================= */

                .billing-options {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 13px;
                }

                /* =========================================
                   SIGNATURE
                ========================================= */

                .signature-section {
                    margin-top: 4px;
                    padding: 15px;
                    border: 1px solid #e5ecef;
                    background: #fafcfc;
                    border-radius: 11px;
                }

                /* =========================================
                   ACTION BUTTONS
                ========================================= */

                .invoice-actions {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    margin-top: 23px;
                    padding-top: 20px;
                    border-top: 1px solid #edf1f3;
                }

                .invoice-action-button {
                    border: none;
                    border-radius: 10px;
                    padding: 13px 16px;
                    font-family: inherit;
                    font-size: 13px;
                    font-weight: 700;
                    cursor: pointer;
                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease,
                        opacity 0.2s ease;
                }

                .invoice-action-button:hover {
                    transform: translateY(-1px);
                }

                .invoice-generate-button {
                    color: #ffffff;
                    background: #1fa392;
                    box-shadow: 0 6px 16px rgba(31,163,146,0.18);
                }

                .invoice-generate-button:hover {
                    box-shadow: 0 9px 20px rgba(31,163,146,0.25);
                }

                .invoice-pdf-button {
                    color: #ffffff;
                    background: #173f5f;
                    box-shadow: 0 6px 16px rgba(23,63,95,0.16);
                }

                .invoice-pdf-button:hover {
                    box-shadow: 0 9px 20px rgba(23,63,95,0.23);
                }

                /* =========================================
                   PREVIEW AREA
                ========================================= */

                .invoice-preview-wrapper {
                    min-width: 0;
                    position: sticky;
                    top: 25px;
                }

                .invoice-preview-label {
                    margin: 0 0 10px 3px;
                    color: #72818a;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                /* =========================================
                   RESPONSIVE
                ========================================= */

                @media (max-width: 1200px) {

                    .invoice-form-container {
                        grid-template-columns: minmax(0, 1fr);
                    }

                    .invoice-preview-wrapper {
                        position: static;
                    }
                }

                @media (max-width: 650px) {

                    .invoice-form-card {
                        padding: 19px;
                        border-radius: 14px;
                    }

                    .invoice-form-grid {
                        grid-template-columns: 1fr;
                    }

                    .invoice-form-full {
                        grid-column: auto;
                    }

                    .billing-options {
                        grid-template-columns: 1fr;
                    }

                    .treatment-row {
                        grid-template-columns: 70px minmax(0, 1fr) 80px 38px;
                        gap: 5px;
                    }

                    .remove-treatment {
                        width: 38px;
                    }

                    .invoice-actions {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 450px) {

                    .invoice-form-card {
                        padding: 15px;
                    }

                    .invoice-form-title {
                        font-size: 18px;
                    }

                    .invoice-number-badge {
                        font-size: 10px;
                        padding: 6px 8px;
                    }

                    .treatment-row {
                        grid-template-columns: 1fr 38px;
                    }

                    .treatment-row .visits-input,
                    .treatment-row .rate-input {
                        width: 100%;
                    }

                    .treatment-row .description-input {
                        grid-column: 1 / -1;
                    }

                    .remove-treatment {
                        grid-column: 2;
                        grid-row: 1;
                    }
                }

            `}</style>

            <div className="invoice-form-container">

                {/* =========================================
                    LEFT SIDE - FORM
                ========================================= */}

                <div className="invoice-form-card">

                    <div className="invoice-form-header">

                        <div>
                            <h2 className="invoice-form-title">
                                Customer Details
                            </h2>

                            <p className="invoice-form-subtitle">
                                Enter patient and treatment information
                            </p>
                        </div>

                        <div className="invoice-number-badge">
                            Invoice #{invoiceNo}
                        </div>

                    </div>

                    {/* =========================
                        CUSTOMER DETAILS
                    ========================= */}

                    <div className="invoice-section">

                        <h3 className="invoice-section-title">
                            Patient Information
                        </h3>

                        <div className="invoice-form-grid">

                            {/* Customer Name */}

                            <div className="invoice-field invoice-form-full">

                                <label>
                                    Customer Name
                                </label>

                                <input
                                    name="name"
                                    placeholder="Enter customer name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="invoice-input"
                                />

                            </div>

                            {/* Gender */}

                            <div className="invoice-field">

                                <label>
                                    Gender
                                </label>

                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="invoice-select"
                                >
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>

                            </div>

                            {/* Age */}

                            <div className="invoice-field">

                                <label>
                                    Age
                                </label>

                                <input
                                    name="age"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="Age"
                                    value={formData.age}
                                    onChange={(e) => {

                                        const value =
                                            e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 3);

                                        setFormData({
                                            ...formData,
                                            age: value,
                                        });

                                    }}
                                    className="invoice-input"
                                />

                            </div>

                            {/* Mobile */}

                            <div className="invoice-field">

                                <label>
                                    Mobile Number
                                </label>

                                <input
                                    name="mobile"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="10 digit mobile number"
                                    value={formData.mobile}
                                    onChange={(e) => {

                                        const value =
                                            e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 10);

                                        setFormData({
                                            ...formData,
                                            mobile: value,
                                        });

                                    }}
                                    minLength={10}
                                    maxLength={10}
                                    className="invoice-input"
                                />

                            </div>

                            {/* Registration Number */}

                            <div className="invoice-field">

                                <label>
                                    Registration Number
                                </label>

                                <input
                                    name="regNo"
                                    type="text"
                                    placeholder="Registration number"
                                    value={formData.regNo}
                                    onChange={handleChange}
                                    className="invoice-input"
                                />

                            </div>

                            {/* Date */}

                            <div className="invoice-field">

                                <label>
                                    Invoice Date
                                </label>

                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="invoice-input"
                                />

                            </div>

                            {/* Referred By */}

                            <div className="invoice-field">

                                <label>
                                    Referred By
                                </label>

                                <input
                                    name="referredBy"
                                    placeholder="Doctor / Referral"
                                    value={formData.referredBy}
                                    onChange={handleChange}
                                    className="invoice-input"
                                />

                            </div>

                            {/* Diagnosis */}

                            <div className="invoice-field invoice-form-full">

                                <label>
                                    Diagnosis
                                </label>

                                <textarea
                                    name="diagnosis"
                                    placeholder="Enter diagnosis or treatment notes"
                                    rows="3"
                                    value={formData.diagnosis}
                                    onChange={handleChange}
                                    className="invoice-textarea"
                                />

                            </div>

                        </div>

                    </div>

                    {/* =========================
                        TREATMENTS
                    ========================= */}

                    <div className="invoice-section">

                        <h3 className="invoice-section-title">
                            Treatment & Services
                        </h3>

                        <div className="treatment-search">

                            <Select
                                options={serviceOptions}
                                placeholder="🔍 Search treatment..."
                                isSearchable
                                isClearable
                                onChange={(selected) => {

                                    if (!selected) return;

                                    selectTemplate(
                                        selected.value
                                    );

                                }}
                            />

                        </div>

                        <div className="treatment-list">

                            {formData.items.map(
                                (item, index) => (

                                    <div
                                        key={index}
                                        className="treatment-row"
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
                                            className="invoice-input visits-input"
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
                                            className="invoice-input description-input"
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
                                            className="invoice-input rate-input"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeSession(index)
                                            }
                                            className="remove-treatment"
                                            title="Remove treatment"
                                        >
                                            ×
                                        </button>

                                    </div>

                                )
                            )}

                        </div>

                        <button
                            type="button"
                            onClick={addSession}
                            className="add-session-button"
                        >
                            + Add Treatment
                        </button>

                    </div>

                    {/* =========================
                        BILLING DETAILS
                    ========================= */}

                    <div className="invoice-section">

                        <h3 className="invoice-section-title">
                            Billing Details
                        </h3>

                        <div className="billing-options">

                            <div className="invoice-field">

                                <label>
                                    GST
                                </label>

                                <input
                                    name="gst"
                                    placeholder="GST %"
                                    value={formData.gst}
                                    onChange={handleChange}
                                    className="invoice-input"
                                />

                            </div>

                            <div className="invoice-field">

                                <label>
                                    Payment Mode
                                </label>

                                <select
                                    name="paymentMode"
                                    value={formData.paymentMode}
                                    onChange={handleChange}
                                    className="invoice-select"
                                >
                                    <option>Cash</option>
                                    <option>UPI</option>
                                    <option>Card</option>
                                </select>

                            </div>

                        </div>

                    </div>

                    {/* =========================
                        SIGNATURE
                    ========================= */}

                    <div className="invoice-section">

                        <h3 className="invoice-section-title">
                            Signature
                        </h3>

                        <div className="signature-section">

                            <SignatureUpload
                                setSignature={setSignature}
                            />

                        </div>

                    </div>

                    {/* =========================
                        ACTIONS
                    ========================= */}

                    <div className="invoice-actions">

                        <button
                            type="button"
                            onClick={generateBill}
                            className="
                                invoice-action-button
                                invoice-generate-button
                            "
                        >
                            Generate Invoice
                        </button>

                        <button
                            type="button"
                            onClick={generatePDF}
                            className="
                                invoice-action-button
                                invoice-pdf-button
                            "
                        >
                            Save as PDF
                        </button>

                    </div>

                </div>

                {/* =========================================
                    RIGHT SIDE - LIVE PREVIEW
                ========================================= */}

                <div className="invoice-preview-wrapper">

                    <p className="invoice-preview-label">
                        Live Invoice Preview
                    </p>

                    <InvoicePreview
                        invoiceNo={invoiceNo}
                        data={formData}
                        signature={signature}
                    />

                </div>

            </div>
        </>
    );
}

export default InvoiceForm;

