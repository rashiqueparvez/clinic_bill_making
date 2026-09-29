
import { Link } from "react-router-dom";
import InvoiceForm from "../components/InvoiceForm";

function Billing() {
    return (
        <>
            <style>{`

                /* =========================================
                   GLOBAL BILLING PAGE
                ========================================= */

                .billing-app-shell {
                    width: 100%;
                    min-height: 100vh;
                    display: flex;
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
                    box-sizing: border-box;
                    overflow-x: hidden;
                }

                .billing-app-shell *,
                .billing-app-shell *::before,
                .billing-app-shell *::after {
                    box-sizing: border-box;
                }

                /* =========================================
                   SIDEBAR
                ========================================= */

                .billing-sidebar {
                    width: 250px;
                    min-width: 250px;
                    height: 100vh;
                    min-height: 100vh;

                    position: sticky;
                    top: 0;

                    background: #062b5b;
                    color: white;

                    display: flex;
                    flex-direction: column;

                    padding: 24px 16px;

                    z-index: 50;
                }

                .billing-sidebar-brand {
                    display: flex;
                    align-items: center;
                    gap: 12px;

                    padding: 8px 10px 24px;

                    border-bottom: 1px solid
                        rgba(255,255,255,0.12);
                }

                .billing-sidebar-brand img {
                    width: 46px;
                    height: 46px;

                    flex-shrink: 0;

                    object-fit: contain;

                    border-radius: 10px;

                    background: #ffffff;

                    padding: 4px;
                }

                .billing-brand-text {
                    min-width: 0;

                    display: flex;
                    flex-direction: column;

                    line-height: 1.1;
                }

                .billing-brand-text strong {
                    color: #ffffff;

                    font-size: 15px;
                    font-weight: 800;

                    letter-spacing: 0.5px;

                    white-space: nowrap;
                }

                .billing-brand-text span {
                    margin-top: 5px;

                    color: rgba(255,255,255,0.62);

                    font-size: 9px;
                    font-weight: 600;

                    letter-spacing: 2px;
                }

                /* =========================================
                   SIDEBAR NAVIGATION
                ========================================= */

                .billing-sidebar-nav {
                    width: 100%;

                    display: flex;
                    flex-direction: column;

                    gap: 7px;

                    margin-top: 27px;
                }

                .billing-sidebar-link {
                    width: 100%;

                    display: flex;
                    align-items: center;

                    gap: 13px;

                    padding: 13px 14px;

                    border-radius: 11px;

                    color: rgba(255,255,255,0.68);

                    text-decoration: none;

                    font-size: 14px;
                    font-weight: 500;

                    transition:
                        background 0.2s ease,
                        color 0.2s ease,
                        transform 0.2s ease;
                }

                .billing-sidebar-link span {
                    width: 22px;
                    min-width: 22px;

                    display: inline-flex;
                    align-items: center;
                    justify-content: center;

                    font-size: 18px;
                    line-height: 1;
                }

                .billing-sidebar-link:hover {
                    background: rgba(255,255,255,0.08);

                    color: #ffffff;

                    transform: translateX(2px);
                }

                .billing-sidebar-link.active {
                    background: #1fa392;

                    color: #ffffff;

                    box-shadow:
                        0 8px 20px rgba(31,163,146,0.22);
                }

                /* =========================================
                   SIDEBAR FOOTER
                ========================================= */

                .billing-sidebar-footer {
                    margin-top: auto;

                    padding: 15px 8px 4px;

                    border-top: 1px solid
                        rgba(255,255,255,0.12);
                }

                .billing-clinic-status {
                    display: flex;
                    align-items: center;

                    gap: 9px;

                    color: rgba(255,255,255,0.7);

                    font-size: 12px;
                    font-weight: 500;
                }

                .billing-status-dot {
                    width: 8px;
                    height: 8px;

                    flex-shrink: 0;

                    border-radius: 50%;

                    background: #35d39a;

                    box-shadow:
                        0 0 0 4px
                        rgba(53,211,154,0.12);
                }

                /* =========================================
                   MAIN CONTENT
                ========================================= */

                .billing-main-content {
                    flex: 1;

                    width: calc(100% - 250px);
                    min-width: 0;

                    min-height: 100vh;

                    padding: 34px 40px 60px;

                    overflow-x: hidden;
                }

                /* =========================================
                   TOP HEADER
                ========================================= */

                .billing-topbar {
                    width: 100%;
                    max-width: 1500px;

                    margin: 0 auto 30px;

                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                }

                .billing-eyebrow {
                    margin: 0 0 7px;

                    color: #1fa392;

                    font-size: 11px;
                    font-weight: 800;

                    letter-spacing: 2px;
                }

                .billing-topbar h1 {
                    margin: 0;

                    color: #132c39;

                    font-size: 30px;
                    line-height: 1.2;

                    font-weight: 750;

                    letter-spacing: -0.6px;
                }

                .billing-page-description {
                    max-width: 600px;

                    margin: 9px 0 0;

                    color: #71818a;

                    font-size: 14px;
                    line-height: 1.6;
                }

                /* =========================================
                   FORM WRAPPER
                ========================================= */

                .billing-form-wrapper {
                    width: 100%;
                    max-width: 1500px;

                    margin: 0 auto;

                    min-width: 0;
                }

                /* =========================================
                   FORM SAFETY
                ========================================= */

                .billing-form-wrapper > * {
                    max-width: 100%;
                }

                .billing-main-content form {
                    width: 100%;
                    max-width: 100%;
                }

                .billing-main-content input,
                .billing-main-content textarea,
                .billing-main-content select,
                .billing-main-content button {
                    max-width: 100%;
                }

                .billing-main-content input,
                .billing-main-content textarea,
                .billing-main-content select {
                    box-sizing: border-box;
                }

                .billing-main-content button {
                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease,
                        opacity 0.2s ease;
                }

                .billing-main-content button:active {
                    transform: translateY(0);
                }

                /* =========================================
                   LARGE DESKTOP
                ========================================= */

                @media (min-width: 1500px) {

                    .billing-main-content {
                        padding-left: 50px;
                        padding-right: 50px;
                    }

                }

                /* =========================================
                   DESKTOP / SMALL LAPTOP
                ========================================= */

                @media (max-width: 1200px) {

                    .billing-sidebar {
                        width: 225px;
                        min-width: 225px;
                    }

                    .billing-main-content {
                        width: calc(100% - 225px);

                        padding:
                            30px
                            25px
                            50px;
                    }

                    .billing-topbar h1 {
                        font-size: 27px;
                    }

                }

                /* =========================================
                   TABLET
                ========================================= */

                @media (max-width: 900px) {

                    .billing-app-shell {
                        display: block;
                    }

                    /* Turn sidebar into top navigation */

                    .billing-sidebar {
                        width: 100%;
                        min-width: 100%;

                        height: auto;
                        min-height: auto;

                        position: relative;

                        padding:
                            12px
                            14px
                            10px;
                    }

                    .billing-sidebar-brand {
                        padding:
                            5px
                            7px
                            12px;
                    }

                    .billing-sidebar-brand img {
                        width: 42px;
                        height: 42px;
                    }

                    .billing-brand-text strong {
                        font-size: 14px;
                    }

                    .billing-brand-text span {
                        font-size: 8px;
                    }

                    .billing-sidebar-nav {
                        flex-direction: row;

                        gap: 6px;

                        margin-top: 11px;

                        overflow-x: auto;
                        overflow-y: hidden;

                        padding:
                            1px
                            1px
                            3px;

                        scrollbar-width: thin;
                    }

                    .billing-sidebar-link {
                        width: auto;
                        min-width: max-content;

                        flex-shrink: 0;

                        padding:
                            10px
                            12px;

                        font-size: 12px;
                    }

                    .billing-sidebar-link span {
                        width: auto;
                        min-width: auto;

                        font-size: 16px;
                    }

                    .billing-sidebar-footer {
                        display: none;
                    }

                    .billing-main-content {
                        width: 100%;

                        min-height: auto;

                        padding:
                            26px
                            20px
                            45px;
                    }

                    .billing-topbar {
                        margin-bottom: 23px;
                    }

                    .billing-topbar h1 {
                        font-size: 25px;
                    }

                    .billing-page-description {
                        font-size: 13px;
                    }

                }

                /* =========================================
                   MOBILE
                ========================================= */

                @media (max-width: 600px) {

                    .billing-sidebar {
                        padding:
                            10px
                            10px
                            8px;
                    }

                    .billing-sidebar-brand {
                        gap: 10px;

                        padding:
                            4px
                            5px
                            10px;
                    }

                    .billing-sidebar-brand img {
                        width: 38px;
                        height: 38px;
                    }

                    .billing-brand-text strong {
                        font-size: 13px;
                    }

                    .billing-brand-text span {
                        margin-top: 3px;

                        font-size: 7px;
                        letter-spacing: 1.7px;
                    }

                    .billing-sidebar-nav {
                        gap: 5px;

                        margin-top: 9px;
                    }

                    .billing-sidebar-link {
                        padding:
                            9px
                            10px;

                        border-radius: 8px;

                        font-size: 11px;
                    }

                    .billing-sidebar-link span {
                        font-size: 15px;
                    }

                    .billing-main-content {
                        padding:
                            22px
                            12px
                            35px;
                    }

                    .billing-topbar {
                        margin-bottom: 19px;
                    }

                    .billing-eyebrow {
                        margin-bottom: 5px;

                        font-size: 9px;
                        letter-spacing: 1.7px;
                    }

                    .billing-topbar h1 {
                        font-size: 22px;
                        letter-spacing: -0.4px;
                    }

                    .billing-page-description {
                        margin-top: 7px;

                        font-size: 12px;
                        line-height: 1.55;
                    }

                }

                /* =========================================
                   SMALL MOBILE
                ========================================= */

                @media (max-width: 400px) {

                    .billing-sidebar-brand img {
                        width: 35px;
                        height: 35px;
                    }

                    .billing-brand-text strong {
                        font-size: 12px;
                    }

                    .billing-sidebar-link {
                        padding:
                            8px
                            9px;

                        font-size: 10px;
                    }

                    .billing-sidebar-link span {
                        font-size: 14px;
                    }

                    .billing-main-content {
                        padding:
                            19px
                            9px
                            30px;
                    }

                    .billing-topbar h1 {
                        font-size: 20px;
                    }

                    .billing-page-description {
                        font-size: 11px;
                    }

                }

                /* =========================================
                   VERY SMALL DEVICES
                ========================================= */

                @media (max-width: 330px) {

                    .billing-brand-text {
                        display: none;
                    }

                    .billing-sidebar-brand {
                        justify-content: center;
                    }

                    .billing-sidebar-nav {
                        justify-content: flex-start;
                    }

                    .billing-sidebar-link {
                        font-size: 9px;
                    }

                    .billing-main-content {
                        padding-left: 7px;
                        padding-right: 7px;
                    }

                }

            `}</style>

            <div className="billing-app-shell">

                {/* =========================================
                    SIDEBAR
                ========================================= */}

                <aside className="billing-sidebar">

                    <div className="billing-sidebar-brand">

                        <img
                            src="/logo.png"
                            alt="FIT Physio Therapy"
                        />

                        <div className="billing-brand-text">

                            <strong>
                                FIT PHYSIO
                            </strong>

                            <span>
                                THERAPY
                            </span>

                        </div>

                    </div>

                    <nav className="billing-sidebar-nav">

                        <Link
                            to="/"
                            className="billing-sidebar-link"
                        >
                            <span>⌂</span>
                            Dashboard
                        </Link>

                        <Link
                            to="/billing"
                            className="billing-sidebar-link active"
                        >
                            <span>＋</span>
                            New Invoice
                        </Link>

                        <Link
                            to="/dashboard"
                            className="billing-sidebar-link"
                        >
                            <span>▣</span>
                            Invoice History
                        </Link>

                    </nav>

                    <div className="billing-sidebar-footer">

                        <div className="billing-clinic-status">

                            <span className="billing-status-dot"></span>

                            Clinic Online

                        </div>

                    </div>

                </aside>

                {/* =========================================
                    MAIN CONTENT
                ========================================= */}

                <main className="billing-main-content">

                    <header className="billing-topbar">

                        <div>

                            <p className="billing-eyebrow">
                                BILLING
                            </p>

                            <h1>
                                Create New Invoice
                            </h1>

                            <p className="billing-page-description">
                                Enter patient and treatment
                                details to generate a
                                professional invoice.
                            </p>

                        </div>

                    </header>

                    <section className="billing-form-wrapper">

                        <InvoiceForm />

                    </section>

                </main>

            </div>
        </>
    );
}

export default Billing;
