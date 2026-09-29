import { useRef } from "react";

function SignatureUpload({ setSignature }) {
    const fileInputRef = useRef(null);

    function upload(e) {
        const file = e.target.files[0];

        if (!file) return;

        // Only allow image files
        if (!file.type.startsWith("image/")) {
            alert("Please upload an image file.");
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            localStorage.setItem("signature", reader.result);
            setSignature(reader.result);
        };

        reader.readAsDataURL(file);
    }

    function removeSignature() {
        localStorage.removeItem("signature");
        setSignature("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    return (
        <>
            <style>{`
                .signature-upload-container {
                    width: 100%;
                }

                .signature-upload-label {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #1f2937;
                }

                .signature-upload-box {
                    width: 100%;
                    border: 1.5px dashed #cbd5e1;
                    border-radius: 10px;
                    background: #f8fafc;
                    padding: 16px;
                    box-sizing: border-box;
                    transition: all 0.2s ease;
                }

                .signature-upload-box:hover {
                    border-color: #2563eb;
                    background: #f8fbff;
                }

                .signature-file-input {
                    width: 100%;
                    font-size: 14px;
                    color: #475569;
                    cursor: pointer;
                }

                .signature-file-input::file-selector-button {
                    margin-right: 12px;
                    padding: 8px 14px;
                    border: none;
                    border-radius: 7px;
                    background: #2563eb;
                    color: white;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                }

                .signature-file-input::file-selector-button:hover {
                    background: #1d4ed8;
                }

                .signature-preview {
                    margin-top: 14px;
                    padding: 12px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                }

                .signature-preview-title {
                    font-size: 12px;
                    color: #64748b;
                    margin-bottom: 8px;
                }

                .signature-image-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                }

                .signature-image {
                    max-width: 220px;
                    max-height: 80px;
                    object-fit: contain;
                    display: block;
                }

                .signature-remove-button {
                    flex-shrink: 0;
                    padding: 7px 12px;
                    border: 1px solid #fecaca;
                    border-radius: 7px;
                    background: #fff;
                    color: #dc2626;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                }

                .signature-remove-button:hover {
                    background: #fef2f2;
                }

                .signature-help-text {
                    margin-top: 8px;
                    font-size: 12px;
                    color: #64748b;
                    line-height: 1.4;
                }

                @media (max-width: 600px) {
                    .signature-upload-box {
                        padding: 12px;
                    }

                    .signature-image-wrapper {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .signature-image {
                        max-width: 180px;
                        max-height: 70px;
                    }

                    .signature-remove-button {
                        width: 100%;
                    }
                }

                @media (max-width: 400px) {
                    .signature-file-input {
                        font-size: 12px;
                    }

                    .signature-file-input::file-selector-button {
                        padding: 7px 10px;
                        font-size: 12px;
                    }
                }
            `}</style>

            <div className="signature-upload-container">

                <label className="signature-upload-label">
                    Upload Signature
                </label>

                <div className="signature-upload-box">

                    <input
                        ref={fileInputRef}
                        className="signature-file-input"
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        onChange={upload}
                    />

                    <p className="signature-help-text">
                        Upload a PNG, JPG or WebP image of the authorized signature.
                    </p>

                    {/* Preview */}
                    {localStorage.getItem("signature") && (
                        <div className="signature-preview">

                            <div className="signature-preview-title">
                                Signature Preview
                            </div>

                            <div className="signature-image-wrapper">

                                <img
                                    className="signature-image"
                                    src={localStorage.getItem("signature")}
                                    alt="Uploaded signature"
                                />

                                <button
                                    type="button"
                                    className="signature-remove-button"
                                    onClick={removeSignature}
                                >
                                    Remove
                                </button>

                            </div>

                        </div>
                    )}

                </div>
            </div>
        </>
    );
}

export default SignatureUpload;