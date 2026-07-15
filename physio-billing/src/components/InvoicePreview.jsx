function InvoicePreview({
    invoiceNo,
    data,
    signature,
}) {
    const subtotal = data.items.reduce(
        (sum, item) =>
            sum +
            (Number(item.visits || 0) *
                Number(item.rate || 0)),
        0
    );

    const gstPercent = Number(data.gst || 0);

    const gst = (subtotal * gstPercent) / 100;

    const total = subtotal + gst;

    return (
        <div
            id="invoice"
            style={{
                width: "794px",
                height: "1123px",
                background: "#ffffff",
                margin: "0 auto",
                padding: "22px",
                boxSizing: "border-box",
                fontFamily: "'Segoe UI',sans-serif",
                color: "#222",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* HEADER */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "3px solid #2563EB",
                    paddingBottom: "12px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                    }}
                >
                    <img
                        src="/logo.png"
                        alt="logo"
                        style={{
                            width: "90px",
                            height: "90px",
                            objectFit: "contain",
                        }}
                    />

                    <div>
                        <h1
                            style={{
                                margin: 0,
                                color: "#2563EB",
                                fontSize: "26px",
                                fontWeight: "700",
                            }}
                        >
                            FIT PHYSIO THERAPY
                        </h1>

                        <div
                            style={{
                                fontSize: "13px",
                                marginTop: "8px",
                                lineHeight: "1.6",
                            }}
                        >
                            <div>
                                Physiotherapy &
                                Rehabilitation Centre
                            </div>

                            <div>
                                #52, 1st Main,
                                1st Block,
                                1st Stage,
                                HBR Layout,
                                Bangalore - 560043
                            </div>

                            <div>
                                Reg No :
                                23/25/0017/2024
                            </div>

                            <div>
                                📞 +91 9606723416
                            </div>

                            <div>
                                ✉ fitphysiotherapy4@gmail.com
                            </div>
                        </div>
                    </div>
                </div>

                {/* Invoice Box */}

                <div
                    style={{
                        width: "210px",
                        border: "2px solid #2563EB",
                        borderRadius: "8px",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            background: "#2563EB",
                            color: "#fff",
                            textAlign: "center",
                            padding: "8px",
                            fontWeight: "700",
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
                            <b>Invoice :</b>
                            FIT-{invoiceNo}
                        </div>

                        <div>
                            <b>Date :</b>
                            {data.date}
                        </div>

                        <div>
                            <b>Mobile :</b>
                            {data.mobile}
                        </div>

                        <div>
                            <b>Payment :</b>
                            {data.paymentMode}
                        </div>
                    </div>
                </div>
            </div>

            {/* PATIENT DETAILS */}

            <div
                style={{
                    marginTop: "15px",
                    border: "1px solid #D1D5DB",
                }}
            >
                <div
                    style={{
                        background: "#EFF6FF",
                        padding: "8px 12px",
                        fontWeight: "700",
                        color: "#1D4ED8",
                    }}
                >
                    PATIENT INFORMATION
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "1fr 1fr",
                        gap: "10px",
                        padding: "12px",
                        fontSize: "13px",
                    }}
                >
                    <div>
                        <b>Name</b>
                        <br />
                        {data.name}
                    </div>

                    <div>
                        <b>Gender</b>
                        <br />
                        {data.gender}
                    </div>

                    <div>
                        <b>Age</b>
                        <br />
                        {data.age}
                    </div>

                    <div>
                        <b>Mobile</b>
                        <br />
                        {data.mobile}
                    </div>

                    <div>
                        <b>Referred By</b>
                        <br />
                        {data.referredBy}
                    </div>

                    <div>
                        <b>Registration No</b>
                        <br />
                        {data.regNo || "-"}
                    </div>
                </div>
            </div>

            {/* Diagnosis */}

            <div
                style={{
                    marginTop: "15px",
                    border: "1px solid #D1D5DB",
                }}
            >
                <div
                    style={{
                        background: "#EFF6FF",
                        padding: "8px 12px",
                        fontWeight: "700",
                        color: "#1D4ED8",
                    }}
                >
                    DIAGNOSIS / CLINICAL NOTES
                </div>

                <div
                    style={{
                        minHeight: "60px",
                        padding: "12px",
                        fontSize: "13px",
                        lineHeight: "1.6",
                    }}
                >
                    {data.diagnosis}
                </div>
            </div>

            {/* SERVICES TABLE */}

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "18px",
                    fontSize: "13px",
                }}
            >
                <thead>
                    <tr
                        style={{
                            background: "#2563EB",
                            color: "#fff",
                        }}
                    >
                        <th style={headerCell}>
                            Visits
                        </th>

                        <th style={headerCell}>
                            Treatment
                        </th>

                        <th style={headerCell}>
                            Rate
                        </th>

                        <th style={headerCell}>
                            Amount
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {data.items.map(
                        (item, index) => {
                            const rowTotal =
                                Number(item.visits || 0) *
                                Number(item.rate || 0);

                            return (
                                <tr key={index}>
                                    <td style={cell}>
                                        {item.visits}
                                    </td>

                                    <td
                                        style={{
                                            ...cell,
                                            textAlign: "left",
                                        }}
                                    >
                                        {item.description}
                                    </td>

                                    <td style={cell}>
                                        ₹
                                        {Number(
                                            item.rate || 0
                                        ).toFixed(2)}
                                    </td>

                                    <td style={cell}>
                                        ₹
                                        {rowTotal.toFixed(2)}
                                    </td>
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>

            {/* PART 2 STARTS HERE */}
            {/* TOTAL SECTION */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    alignItems: "flex-start",
                }}
            >
                {/* Payment */}

                <div
                    style={{
                        width: "240px",
                        border: "1px solid #D1D5DB",
                        borderRadius: "6px",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            background: "#EFF6FF",
                            color: "#1D4ED8",
                            fontWeight: "700",
                            padding: "8px",
                            textAlign: "center",
                        }}
                    >
                        PAYMENT DETAILS
                    </div>

                    <div
                        style={{
                            padding: "10px",
                            fontSize: "13px",
                            lineHeight: "1.8",
                        }}
                    >
                        <div>
                            <b>Mode :</b> {data.paymentMode}
                        </div>

                        <div>
                            <b>Status :</b> Paid
                        </div>

                        <div>
                            <b>Invoice :</b> FIT-{invoiceNo}
                        </div>
                    </div>
                </div>

                {/* Total */}

                <div
                    style={{
                        width: "250px",
                        border: "2px solid #2563EB",
                        borderRadius: "8px",
                        overflow: "hidden",
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

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            background: "#2563EB",
                            color: "#fff",
                            padding: "10px 12px",
                            fontWeight: "700",
                            fontSize: "15px",
                        }}
                    >
                        <span>
                            Grand Total
                        </span>

                        <span>
                            ₹{total.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {/* SIGNATURE */}

            <div
                style={{
                    marginTop: "45px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                }}
            >
                <div
                    style={{
                        fontSize: "13px",
                        color: "#555",
                    }}
                >
                    Thank you for choosing
                    <br />
                    <b>FIT PHYSIO THERAPY</b>
                </div>

                <div
                    style={{
                        textAlign: "center",
                    }}
                >
                    {signature && (
                        <img
                            src={signature}
                            alt="Doctor Signature"
                            style={{
                                width: "120px",
                                height: "60px",
                                objectFit: "contain",
                            }}
                        />
                    )}

                    <div
                        style={{
                            borderTop: "1px solid #000",
                            width: "180px",
                            marginTop: "5px",
                            paddingTop: "6px",
                            textAlign: "center",
                            fontWeight: "600",
                            fontSize: "13px",
                        }}
                    >
                        Authorized Signature
                    </div>


                </div>
            </div>

            {/* FOOTER */}

            <div
  
                style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    right: "20px",
                    borderTop: "2px solid #2563EB",
                    paddingTop: "12px",
                    textAlign: "center", 
                    fontSize: "12px",
                    color: "#666",
                }}
            >
                This is a computer generated invoice.
            </div>

            {/* PART 3 STARTS HERE */}
        </div>
    );
}

/* ===========================
   TABLE STYLES
=========================== */

const headerCell = {
    border: "1px solid #D1D5DB",
    padding: "8px",
    textAlign: "center",
    fontWeight: "700",
    fontSize: "13px",
};

const cell = {
    border: "1px solid #D1D5DB",
    padding: "8px",
    textAlign: "center",
    fontSize: "12px",
};

/* ===========================
   TOTAL ROW
=========================== */

function Row({
    label,
    value,
}) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 12px",
                borderBottom: "1px solid #E5E7EB",
                fontSize: "13px",
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
                }}
            >
                ₹{Number(value).toFixed(2)}
            </span>
        </div>
    );
}

export default InvoicePreview;