
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Stethoscope,
  ShieldCheck,
  FileText,
  Users,
  Receipt,
  ArrowRight,
  LockKeyhole,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!username.trim()) {
      setError("Please enter your username.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );

      if (!res.data?.token) {
        setError("Login failed. No authentication token received.");
        return;
      }

      login(res.data.token);

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);

      if (err.response?.status === 401) {
        setError("Invalid username or password.");
      } else if (err.response?.status === 400) {
        setError(
          err.response?.data?.message ||
            "Please check your login details."
        );
      } else {
        setError(
          "Unable to connect to the server. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`

        * {
          box-sizing: border-box;
        }

        .login-page {
          min-height: 100vh;
          display: flex;
          background: #f5f8fa;
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        /* =========================================
           LEFT SIDE
        ========================================= */

        .login-left {
          width: 52%;
          min-height: 100vh;

          position: relative;
          overflow: hidden;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          padding: 42px 55px;

          color: white;

          background:
            linear-gradient(
              145deg,
              #062f31 0%,
              #075c5a 50%,
              #0f766e 100%
            );
        }

        .login-left::before {
          content: "";

          position: absolute;

          width: 520px;
          height: 520px;

          right: -250px;
          top: -200px;

          border-radius: 50%;

          border: 90px solid
            rgba(255, 255, 255, 0.035);
        }

        .login-left::after {
          content: "";

          position: absolute;

          width: 350px;
          height: 350px;

          left: -210px;
          bottom: -200px;

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.035);
        }

        /* =========================================
           BRAND
        ========================================= */

        .login-brand {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: center;

          gap: 13px;
        }

        .login-brand-icon {
          width: 54px;
          height: 54px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 15px;

          color: #0f766e;
          background: white;

          box-shadow:
            0 10px 30px
            rgba(0, 0, 0, 0.15);
        }

        .login-brand-text strong {
          display: block;

          font-size: 17px;
          font-weight: 800;

          letter-spacing: 0.08em;
        }

        .login-brand-text span {
          display: block;

          margin-top: 3px;

          color:
            rgba(255, 255, 255, 0.6);

          font-size: 9px;
          letter-spacing: 0.25em;
        }

        /* =========================================
           LEFT CONTENT
        ========================================= */

        .login-left-content {
          position: relative;
          z-index: 2;

          max-width: 590px;

          margin-bottom: 50px;
        }

        .login-label {
          display: flex;
          align-items: center;

          gap: 9px;

          margin-bottom: 18px;

          color:
            rgba(255, 255, 255, 0.65);

          font-size: 10px;
          font-weight: 800;

          letter-spacing: 0.2em;
        }

        .login-label::before {
          content: "";

          width: 27px;
          height: 2px;

          background: #72e2d9;
        }

        .login-left-content h1 {
          margin: 0;

          font-size:
            clamp(
              42px,
              4.4vw,
              64px
            );

          line-height: 1.03;

          letter-spacing: -0.055em;

          font-weight: 800;
        }

        .login-left-content h1 span {
          color: #70e1d8;
        }

        .login-left-content > p {
          max-width: 500px;

          margin-top: 22px;

          color:
            rgba(255, 255, 255, 0.65);

          font-size: 14px;

          line-height: 1.8;
        }

        /* =========================================
           FEATURES
        ========================================= */

        .login-features {
          display: grid;

          grid-template-columns:
            repeat(2, 1fr);

          gap: 12px;

          margin-top: 30px;

          max-width: 470px;
        }

        .login-feature {
          display: flex;
          align-items: center;

          gap: 10px;

          padding: 10px;

          border-radius: 9px;

          color:
            rgba(255, 255, 255, 0.72);

          background:
            rgba(255, 255, 255, 0.055);

          font-size: 11px;
        }

        .login-feature-icon {
          width: 29px;
          height: 29px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 8px;

          color: #75e1d8;

          background:
            rgba(255, 255, 255, 0.08);
        }

        /* =========================================
           COPYRIGHT
        ========================================= */

        .login-copyright {
          position: relative;
          z-index: 2;

          color:
            rgba(255, 255, 255, 0.32);

          font-size: 10px;
        }

        /* =========================================
           RIGHT SIDE
        ========================================= */

        .login-right {
          width: 48%;
          min-height: 100vh;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 40px;
        }

        .login-card {
          width: 100%;
          max-width: 430px;

          padding: 38px;

          border:
            1px solid #e5e9ec;

          border-radius: 20px;

          background: white;

          box-shadow:
            0 25px 70px
            rgba(15, 23, 42, 0.08);
        }

        /* =========================================
           MOBILE LOGO
        ========================================= */

        .mobile-login-icon {
          display: none;

          width: 64px;
          height: 64px;

          align-items: center;
          justify-content: center;

          margin: 0 auto 25px;

          border-radius: 17px;

          color: #0f766e;

          background: #e8f6f4;
        }

        /* =========================================
           FORM HEADER
        ========================================= */

        .login-overline {
          margin: 0 0 8px;

          color: #0f766e;

          font-size: 10px;
          font-weight: 800;

          letter-spacing: 0.17em;
        }

        .login-card h2 {
          margin: 0;

          color: #172033;

          font-size: 29px;

          line-height: 1.2;

          font-weight: 800;

          letter-spacing: -0.045em;
        }

        .login-subtitle {
          margin: 10px 0 28px;

          color: #7b8490;

          font-size: 13px;

          line-height: 1.6;
        }

        /* =========================================
           ERROR
        ========================================= */

        .login-error {
          display: flex;
          align-items: center;

          gap: 9px;

          padding: 12px 13px;

          margin-bottom: 19px;

          border:
            1px solid #fecaca;

          border-radius: 9px;

          color: #b91c1c;

          background: #fff5f5;

          font-size: 12px;
        }

        .login-error-icon {
          width: 20px;
          height: 20px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: white;

          background: #ef4444;

          font-size: 11px;
          font-weight: 700;
        }

        /* =========================================
           FORM
        ========================================= */

        .login-form {
          display: flex;
          flex-direction: column;
        }

        .login-form label {
          margin-bottom: 7px;

          color: #374151;

          font-size: 12px;
          font-weight: 600;
        }

        .login-input-wrapper {
          position: relative;

          margin-bottom: 18px;
        }

        .login-input-icon {
          position: absolute;

          left: 14px;
          top: 50%;

          transform:
            translateY(-50%);

          color: #9ca3af;

          pointer-events: none;
        }

        .login-form input {
          width: 100%;
          height: 48px;

          padding:
            0 14px 0 43px;

          border:
            1px solid #dfe4e8;

          border-radius: 9px;

          outline: none;

          color: #172033;

          background: white;

          font-size: 13px;

          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .login-form input::placeholder {
          color: #a3abb5;
        }

        .login-form input:focus {
          border-color: #0f766e;

          box-shadow:
            0 0 0 3px
            rgba(15, 118, 110, 0.08);
        }

        .login-form input:disabled {
          background: #f8fafc;

          cursor: not-allowed;
        }

        /* =========================================
           PASSWORD
        ========================================= */

        .password-wrapper {
          position: relative;

          margin-bottom: 23px;
        }

        .password-wrapper input {
          padding-right: 60px;
        }

        .password-toggle {
          position: absolute;

          right: 10px;
          top: 50%;

          transform:
            translateY(-50%);

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 6px;

          border: none;

          color: #6b7280;

          background: transparent;

          cursor: pointer;
        }

        .password-toggle:hover {
          color: #0f766e;
        }

        /* =========================================
           LOGIN BUTTON
        ========================================= */

        .login-submit {
          width: 100%;
          height: 48px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          border: none;

          border-radius: 9px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #0f766e,
              #0b625d
            );

          font-size: 13px;
          font-weight: 700;

          cursor: pointer;

          box-shadow:
            0 8px 20px
            rgba(
              15,
              118,
              110,
              0.18
            );

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            opacity 0.2s ease;
        }

        .login-submit:hover {
          transform:
            translateY(-1px);

          box-shadow:
            0 12px 25px
            rgba(
              15,
              118,
              110,
              0.24
            );
        }

        .login-submit:disabled {
          opacity: 0.65;

          cursor: not-allowed;

          transform: none;
        }

        /* =========================================
           LOADING
        ========================================= */

        .login-spinner {
          width: 15px;
          height: 15px;

          border:
            2px solid
            rgba(
              255,
              255,
              255,
              0.35
            );

          border-top-color: white;

          border-radius: 50%;

          animation:
            login-spin
            0.7s linear infinite;
        }

        @keyframes login-spin {
          to {
            transform:
              rotate(360deg);
          }
        }

        /* =========================================
           SECURITY
        ========================================= */

        .login-security {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 6px;

          margin-top: 22px;

          color: #9ca3af;

          font-size: 10px;
        }

        .login-security svg {
          color: #0f766e;
        }

        /* =========================================
           RESPONSIVE
        ========================================= */

        @media (max-width: 950px) {

          .login-left {
            width: 45%;

            padding: 35px;
          }

          .login-right {
            width: 55%;

            padding: 25px;
          }

          .login-left-content h1 {
            font-size: 43px;
          }

          .login-features {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 700px) {

          .login-page {
            min-height: 100vh;

            display: block;

            background:
              linear-gradient(
                145deg,
                #edf7f6,
                #f7fafb
              );
          }

          .login-left {
            display: none;
          }

          .login-right {
            width: 100%;
            min-height: 100vh;

            padding:
              20px 16px;

            align-items: center;
          }

          .login-card {
            max-width: 430px;

            padding: 30px 24px;

            border-radius: 17px;
          }

          .mobile-login-icon {
            display: flex;
          }

          .login-card h2 {
            font-size: 26px;
          }
        }

        @media (max-width: 400px) {

          .login-right {
            padding:
              15px 12px;
          }

          .login-card {
            padding: 25px 20px;
          }

          .login-card h2 {
            font-size: 24px;
          }
        }

      `}</style>

      <div className="login-page">

        {/* =====================================
            LEFT SIDE
        ===================================== */}

        <section className="login-left">

          <div className="login-brand">

            <div className="login-brand-icon">
              <Stethoscope size={30} />
            </div>

            <div className="login-brand-text">

              <strong>
                FIT PHYSIO
              </strong>

              <span>
                THERAPY
              </span>

            </div>

          </div>


          <div className="login-left-content">

            <div className="login-label">
              CLINIC BILLING
            </div>

            <h1>
              Simple billing.
              <br />

              <span>
                Professional care.
              </span>
            </h1>

            <p>
              Manage your physiotherapy
              clinic billing, create
              professional invoices and
              keep patient records
              organized from one place.
            </p>


            <div className="login-features">

              <div className="login-feature">

                <span className="login-feature-icon">
                  <ShieldCheck size={15} />
                </span>

                Secure Doctor Login

              </div>

              <div className="login-feature">

                <span className="login-feature-icon">
                  <Receipt size={15} />
                </span>

                Patient Billing

              </div>

              <div className="login-feature">

                <span className="login-feature-icon">
                  <FileText size={15} />
                </span>

                PDF Invoices

              </div>

              <div className="login-feature">

                <span className="login-feature-icon">
                  <Users size={15} />
                </span>

                Patient History

              </div>

            </div>

          </div>


          <div className="login-copyright">

            © {new Date().getFullYear()}
            {" "}
            FIT PHYSIO THERAPY.
            All rights reserved.

          </div>

        </section>


        {/* =====================================
            RIGHT SIDE
        ===================================== */}

        <section className="login-right">

          <div className="login-card">

            <div className="mobile-login-icon">

              <Stethoscope size={31} />

            </div>


            <p className="login-overline">
              WELCOME BACK
            </p>

            <h2>
              Doctor Login
            </h2>

            <p className="login-subtitle">
              Sign in to access your
              clinic billing dashboard.
            </p>


            {/* ERROR */}

            {error && (

              <div className="login-error">

                <span className="login-error-icon">
                  !
                </span>

                <span>
                  {error}
                </span>

              </div>

            )}


            <form
              className="login-form"
              onSubmit={handleLogin}
            >

              {/* USERNAME */}

              <label>
                Username
              </label>

              <div className="login-input-wrapper">

                <span className="login-input-icon">
                  <Users size={16} />
                </span>

                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value
                    )
                  }
                  autoComplete="username"
                  disabled={loading}
                  required
                />

              </div>


              {/* PASSWORD */}

              <label>
                Password
              </label>

              <div className="password-wrapper">

                <span className="login-input-icon">
                  <LockKeyhole size={16} />
                </span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  autoComplete="current-password"
                  disabled={loading}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >

                {loading ? (

                  <>
                    <span className="login-spinner"></span>

                    Signing In...
                  </>

                ) : (

                  <>
                    Sign In

                    <ArrowRight
                      size={17}
                    />
                  </>

                )}

              </button>

            </form>


            {/* SECURITY */}

            <div className="login-security">

              <LockKeyhole size={12} />

              Secure clinic access

            </div>

          </div>

        </section>

      </div>
    </>
  );
}
