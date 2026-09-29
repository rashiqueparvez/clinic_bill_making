
import {
    useContext,
    useEffect,
    useState,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    AuthContext,
} from "../context/AuthContext";

function Home() {
    const [invoices, setInvoices] = useState([]);

    const { logout } =
        useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        const saved = JSON.parse(
            localStorage.getItem(
                "invoices"
            ) || "[]"
        );

        setInvoices(
            [...saved].reverse()
        );
    }, []);

    const totalRevenue =
        invoices.reduce(
            (sum, invoice) =>
                sum +
                (Number(invoice.total) || 0),
            0
        );

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    const todayInvoices =
        invoices.filter(
            (invoice) =>
                invoice.date === today
        );

    const handleLogout = () => {
        logout();

        navigate("/login");
    };

    return (
        <div className="app-shell">

            {/* =========================
                SIDEBAR
            ========================= */}

            <aside className="sidebar">

                <div className="sidebar-brand">

                    <img
                        src="/logo.png"
                        alt="FIT Physio Therapy"
                    />

                    <div>
                        <strong>
                            FIT PHYSIO
                        </strong>

                        <span>
                            THERAPY
                        </span>
                    </div>

                </div>

                <nav className="sidebar-nav">

                    <Link
                        to="/"
                        className="
sidebar-link
active
"
                    >
                        <span>⌂</span>
                        Dashboard
                    </Link>

                    <Link
                        to="/billing"
                        className="sidebar-link"
                    >
                        <span>＋</span>
                        New Invoice
                    </Link>

                    <Link
                        to="/dashboard"
                        className="sidebar-link"
                    >
                        <span>▣</span>
                        Invoice History
                    </Link>

                </nav>

                {/* =========================
                    LOGOUT
                ========================= */}

                <div className="sidebar-logout">

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="logout-button"
                    >
                        <span>
                            ↪
                        </span>

                        <span className="logout-text">
                            Logout
                        </span>
                    </button>

                </div>

                {/* =========================
                    STATUS
                ========================= */}

                <div className="sidebar-footer">

                    <div className="clinic-status">

                        <span className="status-dot"></span>

                        <span>
                            Clinic Online
                        </span>

                    </div>

                </div>

            </aside>

            {/* =========================
                MAIN
            ========================= */}

            <main className="main-content">

                {/* TOP BAR */}

                <header className="topbar">

                    <div>

                        <p className="eyebrow">
                            CLINIC MANAGEMENT
                        </p>

                        <h1>
                            Dashboard
                        </h1>

                    </div>

                    <Link
                        to="/billing"
                        className="primary-button"
                    >
                        + New Invoice
                    </Link>

                </header>

                {/* WELCOME */}

                <section className="welcome-card">

                    <div>

                        <p className="eyebrow">
                            WELCOME BACK
                        </p>

                        <h2>
                            Manage your clinic
                            billing with ease.
                        </h2>

                        <p>
                            Create professional
                            invoices, manage
                            patient billing and
                            download PDF receipts.
                        </p>

                    </div>

                    <div className="welcome-icon">
                        +
                    </div>

                </section>

                {/* STATS */}

                <section className="stats-grid">

                    <div className="stat-card">

                        <div
                            className="
stat-icon
blue
"
                        >
                            ₹
                        </div>

                        <div>

                            <span>
                                Total Revenue
                            </span>

                            <strong>
                                ₹
                                {totalRevenue.toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                        </div>

                    </div>

                    <div className="stat-card">

                        <div
                            className="
stat-icon
green
"
                        >
                            #
                        </div>

                        <div>

                            <span>
                                Total Invoices
                            </span>

                            <strong>
                                {invoices.length}
                            </strong>

                        </div>

                    </div>

                    <div className="stat-card">

                        <div
                            className="
stat-icon
purple
"
                        >
                            ✓
                        </div>

                        <div>

                            <span>
                                Today's Invoices
                            </span>

                            <strong>
                                {
                                    todayInvoices.length
                                }
                            </strong>

                        </div>

                    </div>

                </section>

                {/* CONTENT */}

                <section className="content-grid">

                    {/* QUICK ACTIONS */}

                    <div className="dashboard-card">

                        <div className="card-header">

                            <div>

                                <p className="eyebrow">
                                    QUICK ACTIONS
                                </p>

                                <h3>
                                    Get started
                                </h3>

                            </div>

                        </div>

                        <div className="quick-actions">

                            <Link
                                to="/billing"
                                className="
quick-action
"
                            >

                                <span className="quick-icon">
                                    ＋
                                </span>

                                <div>

                                    <strong>
                                        Create Invoice
                                    </strong>

                                    <small>
                                        Generate a new
                                        patient bill
                                    </small>

                                </div>

                            </Link>

                            <Link
                                to="/dashboard"
                                className="
quick-action
"
                            >

                                <span className="quick-icon">
                                    ▣
                                </span>

                                <div>

                                    <strong>
                                        Invoice History
                                    </strong>

                                    <small>
                                        View previous
                                        invoices
                                    </small>

                                </div>

                            </Link>

                        </div>

                    </div>

                    {/* RECENT INVOICES */}

                    <div className="dashboard-card">

                        <div className="card-header">

                            <div>

                                <p className="eyebrow">
                                    RECENT
                                </p>

                                <h3>
                                    Recent Invoices
                                </h3>

                            </div>

                            <Link
                                to="/dashboard"
                                className="text-link"
                            >
                                View all
                            </Link>

                        </div>

                        <div className="invoice-list">

                            {invoices.length === 0 ? (

                                <div className="empty-state">

                                    <div>
                                        ▣
                                    </div>

                                    <p>
                                        No invoices yet
                                    </p>

                                    <small>
                                        Your recent
                                        invoices will
                                        appear here.
                                    </small>

                                </div>

                            ) : (

                                invoices
                                    .slice(0, 5)
                                    .map(
                                        (invoice) => (

                                            <div
                                                className="invoice-row"
                                                key={
                                                    invoice.invoiceId
                                                }
                                            >

                                                <div className="invoice-avatar">
                                                    ₹
                                                </div>

                                                <div className="invoice-info">

                                                    <strong>
                                                        {
                                                            invoice.invoiceId
                                                        }
                                                    </strong>

                                                    <span>
                                                        {
                                                            invoice.customer ||
                                                            "Patient"
                                                        }
                                                    </span>

                                                </div>

                                                <strong className="invoice-amount">

                                                    ₹
                                                    {Number(
                                                        invoice.total ||
                                                        0
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}

                                                </strong>

                                            </div>

                                        )
                                    )

                            )}

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Home;

