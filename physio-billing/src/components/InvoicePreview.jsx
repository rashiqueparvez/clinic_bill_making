import { useEffect, useRef, useState } from "react";

function InvoicePreview({
    invoiceNo,
    data,
    signature,
}) {
    const subtotal = data.items.reduce(
        (sum, item) =>
            sum +
            Number(item.visits || 0) *
                Number(item.rate || 0),
        0
    );

    const gstPercent = Number(data.gst || 0);
    const gst = (subtotal * gstPercent) / 100;
    const total = subtotal + gst;

    const invoiceWidth = 794;
    const invoiceHeight = 1123;

    const previewContainerRef = useRef(null);

    const [scale, setScale] = useState(1);

    useEffect(() => {
        function updateScale() {
            if (!previewContainerRef.current) {
                return;
            }

            const containerWidth =
                previewContainerRef.current.clientWidth;

            if (!containerWidth) {
                return;
            }

            const availableWidth =
                containerWidth - 4;

            const calculatedScale =
                Math.min(
                    1,
                    availableWidth / invoiceWidth
                );

            setScale(calculatedScale);
        }

        updateScale();

        window.addEventListener(
            "resize",
            updateScale
        );

        return () => {
            window.removeEventListener(
                "resize",
                updateScale
            );
        };
    }, []);

    return (
        <>
            <style>{`

                * {
                    box-sizing: border-box;
                }

                .invoice-preview-container {
                    width: 100%;
                    max-width: 100%;

                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    overflow: hidden;

                    box-sizing: border-box;
                }

                .invoice-preview-label {
                    width: 100%;
                    margin: 0 0 10px;

                    color: #71818a;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 11px;
                    font-weight: 700;

                    text-transform: uppercase;
                    letter-spacing: 1px;

                    text-align: left;
                }

                .invoice-preview-stage {
                    width: 100%;

                    display: flex;
                    justify-content: center;
                    align-items: flex-start;

                    overflow: hidden;

                    box-sizing: border-box;
                }

                /*
                 * This wrapper is only for responsive
                 * screen display.
                 *
                 * The PDF generator will temporarily
                 * remove this transform before capture.
                 */

                .invoice-preview-scale-wrapper {
                    width: 794px;
                    height: 1123px;

                    flex-shrink: 0;

                    transform-origin: top center;

                    transition:
                        transform 0.15s ease;
                }

                /*
                 * ACTUAL INVOICE DOCUMENT
                 *
                 * Keep this exactly 794 x 1123.
                 */

                .invoice-preview-document {
                    width: 794px;
                    height: 1123px;

                    background: #ffffff;

                    padding: 22px;

                    box-sizing: border-box;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    font-size: 13px;

                    line-height: 1.4;

                    letter-spacing: normal;

                    word-spacing: normal;

                    color: #222222;

                    position: relative;

                    overflow: hidden;

                    box-shadow:
                        0 8px 30px
                        rgba(16, 42, 56, 0.12);

                    /*
                     * Helps html2canvas preserve
                     * normal text rendering.
                     */

                    text-rendering: geometricPrecision;
                }

                .invoice-preview-document * {
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    letter-spacing: normal;

                    word-spacing: normal;
                }

                .invoice-clinic-name {
                    margin: 0;

                    color: #2563EB;

                    font-size: 26px;

                    font-weight: 700;

                    line-height: 1.2;

                    white-space: nowrap;
                }

                .invoice-clinic-details {
                    font-size: 13px;

                    margin-top: 8px;

                    line-height: 1.6;
                }

                .invoice-clinic-details div {
                    margin: 0;
                    padding: 0;
                }

                .invoice-section-title {
                    background: #EFF6FF;

                    padding: 8px 12px;

                    font-weight: 700;

                    color: #1D4ED8;

                    line-height: 1.4;
                }

                .invoice-patient-grid {
                    display: grid;

                    grid-template-columns:
                        1fr 1fr;

                    gap: 10px;

                    padding: 12px;

                    font-size: 13px;

                    line-height: 1.4;
                }

                .invoice-patient-grid div {
                    min-width: 0;
                }

                .invoice-diagnosis {
                    min-height: 60px;

                    padding: 12px;

                    font-size: 13px;

                    line-height: 1.6;

                    word-break: normal;

                    overflow-wrap: break-word;
                }

                .invoice-services-table {
                    width: 100%;

                    border-collapse: collapse;

                    margin-top: 18px;

                    font-size: 13px;

                    table-layout: fixed;
                }

                .invoice-services-table th,
                .invoice-services-table td {
                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    letter-spacing: normal;

                    word-spacing: normal;
                }

                .invoice-treatment-cell {
                    text-align: left;

                    word-break: normal;

                    overflow-wrap: break-word;
                }

                .invoice-bottom-section {
                    display: flex;

                    justify-content:
                        space-between;

                    margin-top: 20px;

                    align-items: flex-start;
                }

                .invoice-payment-box {
                    width: 240px;

                    border:
                        1px solid #D1D5DB;

                    border-radius: 6px;

                    overflow: hidden;
                }

                .invoice-total-box {
                    width: 250px;

                    border:
                        2px solid #2563EB;

                    border-radius: 8px;

                    overflow: hidden;
                }

                .invoice-signature-section {
                    margin-top: 45px;

                    display: flex;

                    justify-content:
                        space-between;

                    align-items:
                        flex-end;
                }

                .invoice-signature-image {
                    width: 120px;

                    height: 60px;

                    object-fit: contain;

                    display: block;

                    margin: 0 auto;
                }

                .invoice-signature-line {
                    border-top:
                        1px solid #000;

                    width: 180px;

                    margin-top: 5px;

                    padding-top: 6px;

                    text-align: center;

                    font-weight: 600;

                    font-size: 13px;
                }

                .invoice-footer {
                    position: absolute;

                    bottom: 20px;

                    left: 20px;

                    right: 20px;

                    border-top:
                        2px solid #2563EB;

                    padding-top: 12px;

                    text-align: center;

                    font-size: 12px;

                    color: #666666;
                }

                @media (max-width: 600px) {

                    .invoice-preview-label {
                        padding-left: 2px;
                        font-size: 10px;
                    }

                }

                @media (max-width: 400px) {

                    .invoice-preview-label {
                        font-size: 9px;
                    }

                }

            `}</style>

            <div
                ref={previewContainerRef}
                className="invoice-preview-container"
            >

                <p className="invoice-preview-label">
                    Invoice Preview
                </p>

                <div
                    className="invoice-preview-stage"
                    style={{
                        height:
                            invoiceHeight * scale,
                    }}
                >

                    {/* Responsive screen wrapper */}
                    <div
                        className="invoice-preview-scale-wrapper"
                        data-invoice-scale-wrapper="true"
                        style={{
                            transform:
                                `scale(${scale})`,
                        }}
                    >

                        {/* =================================
                            ACTUAL INVOICE
                        ================================= */}

                        <div
                            id="invoice"
                            className="invoice-preview-document"
                        >

                            {/* =================================
                                HEADER
                            ================================= */}

                            <div
                                style={{
                                    display: "flex",

                                    justifyContent:
                                        "space-between",

                                    borderBottom:
                                        "3px solid #2563EB",

                                    paddingBottom:
                                        "12px",
                                }}
                            >

                                <div
                                    style={{
                                        display: "flex",

                                        gap: "15px",

                                        minWidth: 0,
                                    }}
                                >

                                    <img
                                        src="/logo.png"
                                        alt="FIT Physio Therapy"
                                        style={{
                                            width: "90px",

                                            height: "90px",

                                            objectFit:
                                                "contain",

                                            flexShrink: 0,
                                        }}
                                    />

                                    <div>

                                        <h1 className="invoice-clinic-name">
                                            FIT PHYSIO THERAPY
                                        </h1>

                                        <div className="invoice-clinic-details">

                                            <div>
                                                Physiotherapy
                                                {" "}
                                                &amp;
                                                {" "}
                                                Rehabilitation
                                                {" "}
                                                Centre
                                            </div>

                                            <div>
                                                #52, 1st Main,
                                                {" "}
                                                1st Block,
                                                {" "}
                                                1st Stage,
                                                {" "}
                                                HBR Layout,
                                                {" "}
                                                Bangalore - 560043
                                            </div>

                                            <div>
                                                Reg No :
                                                {" "}
                                                23/25/0017/2024
                                            </div>

                                            <div>
                                                Phone :
                                                {" "}
                                                +91 9606723416
                                            </div>

                                            <div>
                                                Email :
                                                {" "}
                                                fitphysiotherapy4@gmail.com
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* Invoice Box */}

                                <div
                                    style={{
                                        width: "210px",

                                        minWidth: "210px",

                                        border:
                                            "2px solid #2563EB",

                                        borderRadius: "8px",

                                        overflow: "hidden",
                                    }}
                                >

                                    <div
                                        style={{
                                            background:
                                                "#2563EB",

                                            color: "#ffffff",

                                            textAlign:
                                                "center",

                                            padding: "8px",

                                            fontWeight: "700",

                                            fontSize: "14px",
                                        }}
                                    >
                                        INVOICE
                                    </div>

                                    <div
                                        style={{
                                            padding: "10px",

                                            fontSize: "13px",

                                            lineHeight: "1.8",
                                        }}
                                    >

                                        <div>
                                            <b>
                                                Invoice :
                                            </b>
                                            {" "}
                                            FIT-{invoiceNo}
                                        </div>

                                        <div>
                                            <b>
                                                Date :
                                            </b>
                                            {" "}
                                            {data.date || "-"}
                                        </div>

                                        <div>
                                            <b>
                                                Mobile :
                                            </b>
                                            {" "}
                                            {data.mobile || "-"}
                                        </div>

                                        <div>
                                            <b>
                                                Payment :
                                            </b>
                                            {" "}
                                            {data.paymentMode || "-"}
                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* =================================
                                PATIENT INFORMATION
                            ================================= */}

                            <div
                                style={{
                                    marginTop: "15px",

                                    border:
                                        "1px solid #D1D5DB",
                                }}
                            >

                                <div className="invoice-section-title">
                                    PATIENT INFORMATION
                                </div>

                                <div className="invoice-patient-grid">

                                    <div>
                                        <b>Name</b>
                                        <br />
                                        {data.name || "-"}
                                    </div>

                                    <div>
                                        <b>Gender</b>
                                        <br />
                                        {data.gender || "-"}
                                    </div>

                                    <div>
                                        <b>Age</b>
                                        <br />
                                        {data.age || "-"}
                                    </div>

                                    <div>
                                        <b>Mobile</b>
                                        <br />
                                        {data.mobile || "-"}
                                    </div>

                                    <div>
                                        <b>Referred By</b>
                                        <br />
                                        {data.referredBy || "-"}
                                    </div>

                                    <div>
                                        <b>Registration No</b>
                                        <br />
                                        {data.regNo || "-"}
                                    </div>

                                </div>

                            </div>

                            {/* =================================
                                DIAGNOSIS
                            ================================= */}

                            <div
                                style={{
                                    marginTop: "15px",

                                    border:
                                        "1px solid #D1D5DB",
                                }}
                            >

                                <div className="invoice-section-title">
                                    DIAGNOSIS / CLINICAL NOTES
                                </div>

                                <div className="invoice-diagnosis">
                                    {data.diagnosis || "-"}
                                </div>

                            </div>

                            {/* =================================
                                SERVICES
                            ================================= */}

                            <table
                                className="invoice-services-table"
                            >

                                <thead>

                                    <tr
                                        style={{
                                            background:
                                                "#2563EB",

                                            color:
                                                "#ffffff",
                                        }}
                                    >

                                        <th
                                            style={
                                                headerCell
                                            }
                                        >
                                            Visits
                                        </th>

                                        <th
                                            style={
                                                headerCell
                                            }
                                        >
                                            Treatment
                                        </th>

                                        <th
                                            style={
                                                headerCell
                                            }
                                        >
                                            Rate
                                        </th>

                                        <th
                                            style={
                                                headerCell
                                            }
                                        >
                                            Amount
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {data.items.map(
                                        (
                                            item,
                                            index
                                        ) => {

                                            const rowTotal =
                                                Number(
                                                    item.visits ||
                                                        0
                                                ) *
                                                Number(
                                                    item.rate ||
                                                        0
                                                );

                                            return (
                                                <tr
                                                    key={
                                                        index
                                                    }
                                                >

                                                    <td
                                                        style={
                                                            cell
                                                        }
                                                    >
                                                        {
                                                            item.visits ||
                                                            "-"
                                                        }
                                                    </td>

                                                    <td
                                                        style={{
                                                            ...cell,

                                                            textAlign:
                                                                "left",

                                                            overflowWrap:
                                                                "break-word",
                                                        }}
                                                    >
                                                        {
                                                            item.description ||
                                                            "-"
                                                        }
                                                    </td>

                                                    <td
                                                        style={
                                                            cell
                                                        }
                                                    >
                                                        ₹
                                                        {Number(
                                                            item.rate ||
                                                                0
                                                        ).toFixed(
                                                            2
                                                        )}
                                                    </td>

                                                    <td
                                                        style={
                                                            cell
                                                        }
                                                    >
                                                        ₹
                                                        {rowTotal.toFixed(
                                                            2
                                                        )}
                                                    </td>

                                                </tr>
                                            );
                                        }
                                    )}

                                </tbody>

                            </table>

                            {/* =================================
                                TOTAL SECTION
                            ================================= */}

                            <div className="invoice-bottom-section">

                                {/* Payment */}

                                <div className="invoice-payment-box">

                                    <div
                                        style={{
                                            background:
                                                "#EFF6FF",

                                            color:
                                                "#1D4ED8",

                                            fontWeight:
                                                "700",

                                            padding:
                                                "8px",

                                            textAlign:
                                                "center",
                                        }}
                                    >
                                        PAYMENT DETAILS
                                    </div>

                                    <div
                                        style={{
                                            padding:
                                                "10px",

                                            fontSize:
                                                "13px",

                                            lineHeight:
                                                "1.8",
                                        }}
                                    >

                                        <div>
                                            <b>
                                                Mode :
                                            </b>
                                            {" "}
                                            {
                                                data.paymentMode ||
                                                "-"
                                            }
                                        </div>

                                        <div>
                                            <b>
                                                Status :
                                            </b>
                                            {" "}
                                            Paid
                                        </div>

                                        <div>
                                            <b>
                                                Invoice :
                                            </b>
                                            {" "}
                                            FIT-{invoiceNo}
                                        </div>

                                    </div>

                                </div>

                                {/* Total */}

                                <div className="invoice-total-box">

                                    <Row
                                        label="Subtotal"
                                        value={
                                            subtotal
                                        }
                                    />

                                    <Row
                                        label={`GST (${gstPercent}%)`}
                                        value={gst}
                                    />

                                    <div
                                        style={{
                                            display:
                                                "flex",

                                            justifyContent:
                                                "space-between",

                                            background:
                                                "#2563EB",

                                            color:
                                                "#ffffff",

                                            padding:
                                                "10px 12px",

                                            fontWeight:
                                                "700",

                                            fontSize:
                                                "15px",
                                        }}
                                    >

                                        <span>
                                            Grand Total
                                        </span>

                                        <span>
                                            ₹
                                            {total.toFixed(
                                                2
                                            )}
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* =================================
                                SIGNATURE
                            ================================= */}

                            <div className="invoice-signature-section">

                                <div
                                    style={{
                                        fontSize:
                                            "13px",

                                        color:
                                            "#555555",

                                        lineHeight:
                                            "1.5",
                                    }}
                                >

                                    Thank you for choosing
                                    <br />

                                    <b>
                                        FIT PHYSIO THERAPY
                                    </b>

                                </div>

                                <div
                                    style={{
                                        textAlign:
                                            "center",
                                    }}
                                >

                                    {signature && (
                                        <img
                                            src={
                                                signature
                                            }
                                            alt="Doctor Signature"
                                            className="invoice-signature-image"
                                        />
                                    )}

                                    <div className="invoice-signature-line">
                                        Authorized Signature
                                    </div>

                                </div>

                            </div>

                            {/* =================================
                                FOOTER
                            ================================= */}

                            <div className="invoice-footer">
                                This is a computer generated invoice.
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

/* =========================================
   TABLE STYLES
========================================= */

const headerCell = {
    border: "1px solid #D1D5DB",

    padding: "8px",

    textAlign: "center",

    fontWeight: "700",

    fontSize: "13px",

    lineHeight: "1.4",

    whiteSpace: "nowrap",
};

const cell = {
    border: "1px solid #D1D5DB",

    padding: "8px",

    textAlign: "center",

    fontSize: "12px",

    lineHeight: "1.4",

    fontFamily:
        "Arial, Helvetica, sans-serif",

    letterSpacing: "normal",

    wordSpacing: "normal",
};

/* =========================================
   TOTAL ROW
========================================= */

function Row({
    label,
    value,
}) {
    return (
        <div
            style={{
                display: "flex",

                justifyContent:
                    "space-between",

                alignItems: "center",

                padding: "10px 12px",

                borderBottom:
                    "1px solid #E5E7EB",

                fontSize: "13px",

                lineHeight: "1.4",

                fontFamily:
                    "Arial, Helvetica, sans-serif",
            }}
        >

            <span
                style={{
                    fontWeight: "600",

                    color: "#374151",
                }}
            >
                {label}
            </span>

            <span
                style={{
                    fontWeight: "700",

                    color: "#111827",

                    whiteSpace: "nowrap",
                }}
            >
                ₹
                {Number(value).toFixed(2)}
            </span>

        </div>
    );
}

export default InvoicePreview;