# 🏥 FIT Physio Therapy — Clinic Billing System

<p align="center">

  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />

</p>

<p align="center">

  <strong>A modern clinic billing and invoice management system for FIT Physio Therapy.</strong>

</p>

<p align="center">

  Create professional invoices • Manage patient details • Calculate GST • Upload signatures • Generate A4 PDFs

</p>

---

## 🌐 Live Application

### 🖥️ Frontend

**FIT Physio Therapy — Clinic Billing**

https://clinic-bill-making.onrender.com

### ⚙️ Backend API

**Clinic Billing API**

https://clinic-bill-making2.onrender.com

---

# 📸 Project Overview

FIT Physio Therapy Clinic Billing System is a web-based application designed to simplify the process of creating and managing clinic invoices.

The application provides a clean billing interface where authorized users can:

- Log in securely
- Enter patient information
- Add multiple treatments
- Calculate treatment charges
- Apply GST
- Select payment methods
- Upload an authorized signature
- Preview invoices
- Generate professional A4 PDF invoices

---

# ✨ Features

## 🧾 Professional Invoice Generation

Create structured invoices containing:

- Clinic information
- Patient information
- Registration number
- Invoice number
- Invoice date
- Treatment details
- Diagnosis / clinical notes
- Payment information
- GST
- Grand total
- Authorized signature

---

## 👤 Patient Management

Each invoice can contain:

| Field | Description |
|---|---|
| Patient Name | Patient's full name |
| Gender | Patient gender |
| Age | Patient age |
| Mobile | Patient contact number |
| Registration No. | Clinic/patient registration number |
| Referred By | Referring doctor/person |
| Diagnosis | Diagnosis or clinical notes |

---

# 💆 Treatment Management

Multiple treatments can be added to a single invoice.

Each treatment contains:

```text
┌───────────────┬──────────────────────┬────────────┬────────────┐
│ Visits        │ Treatment            │ Rate       │ Amount     │
├───────────────┼──────────────────────┼────────────┼────────────┤
│ 5             │ Physiotherapy Session│ ₹500       │ ₹2,500     │
│ 3             │ Manual Therapy       │ ₹400       │ ₹1,200     │
└───────────────┴──────────────────────┴────────────┴────────────┘
