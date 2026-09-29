
import { Link } from "react-router-dom";
import {
    Home,
    LogIn,
    TriangleAlert,
    ArrowLeft,
} from "lucide-react";

export default function NotFound() {
    const token = localStorage.getItem("token");

    return (
        <>
            <style>{`

                /* =========================================
                   404 PAGE
                ========================================= */

                .not-found-page {
                    min-height: 100vh;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                    box-sizing: border-box;

                    background:
                        radial-gradient(
                            circle at 10% 20%,
                            rgba(31, 163, 146, 0.10),
                            transparent 30%
                        ),
                        radial-gradient(
                            circle at 90% 80%,
                            rgba(6, 43, 91, 0.10),
                            transparent 30%
                        ),
                        linear-gradient(
                            135deg,
                            #eef8ff 0%,
                            #ffffff 50%,
                            #effcf9 100%
                        );

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
                   CARD
                ========================================= */

                .not-found-card {
                    width: 100%;
                    max-width: 560px;
                    background: #ffffff;
                    border-radius: 24px;
                    overflow: hidden;

                    border: 1px solid rgba(16, 42, 56, 0.08);

                    box-shadow:
                        0 25px 70px rgba(16, 42, 56, 0.13),
                        0 5px 20px rgba(16, 42, 56, 0.05);
                }

                /* =========================================
                   HEADER
                ========================================= */

                .not-found-header {
                    position: relative;
                    overflow: hidden;

                    padding: 35px 25px 32px;
                    text-align: center;

                    background:
                        linear-gradient(
                            135deg,
                            #062b5b 0%,
                            #0a3c76 55%,
                            #1fa392 140%
                        );
                }

                .not-found-header::before {
                    content: "";
                    position: absolute;
                    width: 180px;
                    height: 180px;
                    border-radius: 50%;
                    top: -100px;
                    right: -60px;
                    background: rgba(255,255,255,0.06);
                }

                .not-found-header::after {
                    content: "";
                    position: absolute;
                    width: 130px;
                    height: 130px;
                    border-radius: 50%;
                    bottom: -80px;
                    left: -45px;
                    background: rgba(255,255,255,0.05);
                }

                /* =========================================
                   LOGO
                ========================================= */

                .not-found-logo {
                    position: relative;
                    z-index: 1;

                    width: 90px;
                    height: 90px;
                    display: block;
                    margin: 0 auto;

                    object-fit: contain;

                    background: #ffffff;
                    border-radius: 50%;
                    padding: 8px;
                    box-sizing: border-box;

                    box-shadow:
                        0 12px 30px rgba(0,0,0,0.18);
                }

                .not-found-clinic-name {
                    position: relative;
                    z-index: 1;

                    margin: 17px 0 0;

                    color: #ffffff;
                    font-size: 27px;
                    font-weight: 800;
                    letter-spacing: -0.5px;
                }

                .not-found-clinic-subtitle {
                    position: relative;
                    z-index: 1;

                    margin: 7px 0 0;

                    color: rgba(255,255,255,0.72);
                    font-size: 13px;
                }

                /* =========================================
                   BODY
                ========================================= */

                .not-found-body {
                    padding: 42px 35px 38px;
                    text-align: center;
                }

                /* =========================================
                   ALERT ICON
                ========================================= */

                .not-found-alert-wrapper {
                    width: 86px;
                    height: 86px;

                    margin: 0 auto;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    background: #fff3f3;
                    border: 1px solid #ffdede;

                    color: #dc4d4d;

                    box-shadow:
                        0 8px 25px rgba(220, 77, 77, 0.10);
                }

                /* =========================================
                   404
                ========================================= */

                .not-found-number {
                    margin: 17px 0 0;

                    color: #062b5b;

                    font-size: 88px;
                    line-height: 0.95;

                    font-weight: 900;
                    letter-spacing: -5px;
                }

                .not-found-title {
                    margin: 13px 0 0;

                    color: #203640;

                    font-size: 27px;
                    line-height: 1.2;

                    font-weight: 750;
                    letter-spacing: -0.5px;
                }

                .not-found-description {
                    max-width: 390px;
                    margin: 14px auto 0;

                    color: #7b8a92;

                    font-size: 14px;
                    line-height: 1.7;
                }

                /* =========================================
                   BUTTON
                ========================================= */

                .not-found-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 9px;

                    margin-top: 28px;

                    padding: 12px 21px;

                    border-radius: 10px;

                    color: #ffffff;
                    text-decoration: none;

                    font-size: 13px;
                    font-weight: 700;

                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease,
                        background 0.2s ease;
                }

                .not-found-button:hover {
                    transform: translateY(-2px);
                }

                .not-found-dashboard-button {
                    background: #062b5b;

                    box-shadow:
                        0 8px 18px rgba(6, 43, 91, 0.18);
                }

                .not-found-dashboard-button:hover {
                    background: #0a3c76;

                    box-shadow:
                        0 11px 24px rgba(6, 43, 91, 0.25);
                }

                .not-found-login-button {
                    background: #1fa392;

                    box-shadow:
                        0 8px 18px rgba(31, 163, 146, 0.18);
                }

                .not-found-login-button:hover {
                    background: #188c7e;

                    box-shadow:
                        0 11px 24px rgba(31, 163, 146, 0.25);
                }

                /* =========================================
                   FOOTER
                ========================================= */

                .not-found-footer {
                    border-top: 1px solid #edf1f3;

                    padding: 14px 20px;

                    background: #fafcfc;

                    text-align: center;
                }

                .not-found-footer p {
                    margin: 0;

                    color: #9aa7ad;

                    font-size: 11px;
                }

                /* =========================================
                   MOBILE
                ========================================= */

                @media (max-width: 600px) {

                    .not-found-page {
                        padding: 15px;
                    }

                    .not-found-card {
                        border-radius: 19px;
                    }

                    .not-found-header {
                        padding: 28px 20px 27px;
                    }

                    .not-found-logo {
                        width: 76px;
                        height: 76px;
                    }

                    .not-found-clinic-name {
                        font-size: 22px;
                    }

                    .not-found-clinic-subtitle {
                        font-size: 11px;
                    }

                    .not-found-body {
                        padding: 32px 22px 30px;
                    }

                    .not-found-alert-wrapper {
                        width: 72px;
                        height: 72px;
                    }

                    .not-found-number {
                        font-size: 70px;
                    }

                    .not-found-title {
                        font-size: 22px;
                    }

                    .not-found-description {
                        font-size: 13px;
                    }

                    .not-found-button {
                        width: 100%;
                        box-sizing: border-box;
                    }
                }

            `}</style>

            <div className="not-found-page">

                <div className="not-found-card">

                    {/* =====================================
                        HEADER
                    ===================================== */}

                    <div className="not-found-header">

                        <img
                            src="/logo.png"
                            alt="FIT PHYSIO THERAPY"
                            className="not-found-logo"
                        />

                        <h1 className="not-found-clinic-name">
                            FIT PHYSIO THERAPY
                        </h1>

                        <p className="not-found-clinic-subtitle">
                            Clinic Management System
                        </p>

                    </div>

                    {/* =====================================
                        BODY
                    ===================================== */}

                    <div className="not-found-body">

                        <div className="not-found-alert-wrapper">

                            <TriangleAlert
                                size={43}
                                strokeWidth={1.8}
                            />

                        </div>

                        <h1 className="not-found-number">
                            404
                        </h1>

                        <h2 className="not-found-title">
                            Page Not Found
                        </h2>

                        <p className="not-found-description">
                            The page you are looking for doesn't
                            exist or may have been moved to another
                            location.
                        </p>

                        {token ? (

                            <Link
                                to="/"
                                className="
                                    not-found-button
                                    not-found-dashboard-button
                                "
                            >

                                <Home size={18} />

                                Go to Dashboard

                            </Link>

                        ) : (

                            <Link
                                to="/login"
                                className="
                                    not-found-button
                                    not-found-login-button
                                "
                            >

                                <LogIn size={18} />

                                Go to Login

                            </Link>

                        )}

                    </div>

                    {/* =====================================
                        FOOTER
                    ===================================== */}

                    <div className="not-found-footer">

                        <p>
                            © 2026 FIT PHYSIO THERAPY
                        </p>

                    </div>

                </div>

            </div>
        </>
    );
}

