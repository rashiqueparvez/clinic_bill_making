
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import InvoiceForm from "../components/InvoiceForm";

export default function Dashboard() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            <style>{`

                /* =========================================
                   DASHBOARD
                ========================================= */

                .dashboard-page {
                    min-height: 100vh;
                    background: #f4f7f9;
                    color: #172b35;
                    font-family:
                        Inter,
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        Roboto,
                        Arial,
                        sans-serif;
                }

                /* =========================================
                   HEADER
                ========================================= */

                .dashboard-header {
                    width: 100%;
                    background: #ffffff;
                    border-bottom: 1px solid #e5ebee;
                    box-shadow: 0 3px 15px rgba(16, 42, 56, 0.05);
                }

                .dashboard-header-inner {
                    max-width: 1500px;
                    margin: 0 auto;
                    padding: 18px 32px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    box-sizing: border-box;
                }

                /* =========================================
                   BRAND
                ========================================= */

                .dashboard-brand {
                    display: flex;
                    align-items: center;
                    gap: 13px;
                    min-width: 0;
                }

                .dashboard-logo {
                    width: 48px;
                    height: 48px;
                    object-fit: contain;
                    border-radius: 11px;
                    background: #ffffff;
                    border: 1px solid #e5ebee;
                    padding: 4px;
                    box-sizing: border-box;
                }

                .dashboard-brand-text {
                    min-width: 0;
                }

                .dashboard-brand-text h1 {
                    margin: 0;
                    color: #062b5b;
                    font-size: 21px;
                    font-weight: 800;
                    letter-spacing: -0.3px;
                    line-height: 1.2;
                }

                .dashboard-brand-text p {
                    margin: 4px 0 0;
                    color: #7b8a92;
                    font-size: 12px;
                    line-height: 1.4;
                }

                /* =========================================
                   HEADER ACTIONS
                ========================================= */

                .dashboard-header-actions {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .dashboard-status {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 12px;
                    background: #effaf7;
                    border: 1px solid #d6eee9;
                    border-radius: 9px;
                    color: #178b7c;
                    font-size: 11px;
                    font-weight: 700;
                }

                .dashboard-status-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #22b983;
                    box-shadow: 0 0 0 3px rgba(34,185,131,0.12);
                }

                /* =========================================
                   LOGOUT
                ========================================= */

                .dashboard-logout-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    border: 1px solid #f2caca;
                    background: #fff7f7;
                    color: #d14343;
                    padding: 9px 16px;
                    border-radius: 9px;
                    font-family: inherit;
                    font-size: 12px;
                    font-weight: 700;
                    cursor: pointer;
                    transition:
                        background 0.2s ease,
                        color 0.2s ease,
                        border-color 0.2s ease,
                        transform 0.2s ease;
                }

                .dashboard-logout-button:hover {
                    background: #d14343;
                    border-color: #d14343;
                    color: #ffffff;
                    transform: translateY(-1px);
                }

                .dashboard-logout-icon {
                    font-size: 16px;
                    line-height: 1;
                }

                /* =========================================
                   MAIN
                ========================================= */

                .dashboard-main {
                    width: 100%;
                    max-width: 1500px;
                    margin: 0 auto;
                    padding: 30px 32px 60px;
                    box-sizing: border-box;
                }

                /* =========================================
                   WELCOME SECTION
                ========================================= */

                .dashboard-welcome {
                    margin-bottom: 25px;
                }

                .dashboard-eyebrow {
                    margin: 0 0 6px;
                    color: #1fa392;
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 2px;
                }

                .dashboard-welcome h2 {
                    margin: 0;
                    color: #17313e;
                    font-size: 28px;
                    font-weight: 750;
                    letter-spacing: -0.5px;
                }

                .dashboard-welcome p {
                    margin: 7px 0 0;
                    color: #7a8991;
                    font-size: 13px;
                }

                /* =========================================
                   QUICK INFO CARDS
                ========================================= */

                .dashboard-info-grid {
                    display: grid;
                    grid-template-columns:
                        repeat(3, minmax(0, 1fr));
                    gap: 16px;
                    margin-bottom: 26px;
                }

                .dashboard-info-card {
                    background: #ffffff;
                    border: 1px solid #e5ebee;
                    border-radius: 14px;
                    padding: 18px;
                    display: flex;
                    align-items: center;
                    gap: 13px;
                    box-shadow: 0 5px 20px rgba(16, 42, 56, 0.04);
                }

                .dashboard-info-icon {
                    width: 42px;
                    height: 42px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 11px;
                    background: #eef9f7;
                    color: #1fa392;
                    font-size: 20px;
                    flex-shrink: 0;
                }

                .dashboard-info-card h3 {
                    margin: 0;
                    color: #263e49;
                    font-size: 12px;
                    font-weight: 700;
                }

                .dashboard-info-card p {
                    margin: 4px 0 0;
                    color: #829098;
                    font-size: 11px;
                }

                /* =========================================
                   BILLING AREA
                ========================================= */

                .dashboard-billing-area {
                    width: 100%;
                }

                /* =========================================
                   MOBILE
                ========================================= */

                @media (max-width: 800px) {

                    .dashboard-header-inner {
                        padding: 15px 18px;
                    }

                    .dashboard-status {
                        display: none;
                    }

                    .dashboard-main {
                        padding: 25px 18px 45px;
                    }

                    .dashboard-info-grid {
                        grid-template-columns: 1fr;
                    }

                    .dashboard-welcome h2 {
                        font-size: 24px;
                    }
                }

                @media (max-width: 550px) {

                    .dashboard-header-inner {
                        align-items: flex-start;
                    }

                    .dashboard-brand-text h1 {
                        font-size: 17px;
                    }

                    .dashboard-brand-text p {
                        font-size: 10px;
                    }

                    .dashboard-logo {
                        width: 42px;
                        height: 42px;
                    }

                    .dashboard-logout-button {
                        width: 40px;
                        height: 40px;
                        padding: 0;
                        border-radius: 9px;
                    }

                    .dashboard-logout-text {
                        display: none;
                    }

                    .dashboard-main {
                        padding: 21px 12px 35px;
                    }

                    .dashboard-welcome {
                        margin-bottom: 20px;
                    }

                    .dashboard-welcome h2 {
                        font-size: 21px;
                    }

                    .dashboard-welcome p {
                        font-size: 12px;
                    }

                }

            `}</style>

            <div className="dashboard-page">

                {/* =========================================
                    HEADER
                ========================================= */}

                <header className="dashboard-header">

                    <div className="dashboard-header-inner">

                        {/* Brand */}

                        <div className="dashboard-brand">

                            <img
                                src="/logo.png"
                                alt="FIT Physio Therapy"
                                className="dashboard-logo"
                            />

                            <div className="dashboard-brand-text">

                                <h1>
                                    FIT PHYSIO THERAPY
                                </h1>

                                <p>
                                    Clinic Billing & Prescription System
                                </p>

                            </div>

                        </div>

                        {/* Actions */}

                        <div className="dashboard-header-actions">

                            <div className="dashboard-status">

                                <span className="dashboard-status-dot"></span>

                                Clinic Online

                            </div>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="dashboard-logout-button"
                            >

                                <span className="dashboard-logout-icon">
                                    ↪
                                </span>

                                <span className="dashboard-logout-text">
                                    Logout
                                </span>

                            </button>

                        </div>

                    </div>

                </header>

                {/* =========================================
                    MAIN CONTENT
                ========================================= */}

                <main className="dashboard-main">

                    <section className="dashboard-welcome">

                        <p className="dashboard-eyebrow">
                            CLINIC DASHBOARD
                        </p>

                        <h2>
                            Create a New Invoice
                        </h2>

                        <p>
                            Enter patient and treatment details
                            below to generate a professional invoice.
                        </p>

                    </section>

                    {/* Quick Information */}

                    <section className="dashboard-info-grid">

                        <div className="dashboard-info-card">

                            <div className="dashboard-info-icon">
                                +
                            </div>

                            <div>
                                <h3>
                                    New Invoice
                                </h3>

                                <p>
                                    Create a patient bill
                                </p>
                            </div>

                        </div>

                        <div className="dashboard-info-card">

                            <div className="dashboard-info-icon">
                                ₹
                            </div>

                            <div>
                                <h3>
                                    Billing
                                </h3>

                                <p>
                                    Manage treatment charges
                                </p>
                            </div>

                        </div>

                        <div className="dashboard-info-card">

                            <div className="dashboard-info-icon">
                                ✓
                            </div>

                            <div>
                                <h3>
                                    Local Storage
                                </h3>

                                <p>
                                    Invoice data stored locally
                                </p>
                            </div>

                        </div>

                    </section>

                    {/* Billing */}

                    <section className="dashboard-billing-area">

                        <InvoiceForm />

                    </section>

                </main>

            </div>
        </>
    );
}

