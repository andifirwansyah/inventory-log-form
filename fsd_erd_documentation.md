# Inventory Log Form (ILF) Documentation

This document provides a detailed Functional Specification Document (FSD) and Entity Relationship Diagram (ERD) for the **Inventory Log Form** application.

---

## 1. Functional Specification Document (FSD)

### 1.1 Project Overview
The **Inventory Log Form (ILF)** is a web-based and PWA-enabled application designed for efficient inventory tracking. It allows users to scan barcodes/QR codes, select products from a master list, and log stock information (quantity, condition, expiration date) into a centralized database.

### 1.2 Tech Stack
- **Frontend**: Nuxt 3 (Vue.js)
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Database & Auth**: Supabase
- **Validation**: Yup
- **PWA**: @vite-pwa/nuxt
- **Scanning**: vue-qrcode-reader

### 1.3 Key Features
1.  **Authentication**:
    - Email-based look-up to verify user existence.
    - 4-digit PIN authentication (using Supabase Auth password mechanism).
    - Persistent sessions using cookies.
2.  **Inventory Logging**:
    - Location ID assignment.
    - Product selection via SKU/Name search or Barcode scanning.
    - Condition tracking (Good, Damage, QR).
    - Automatic calculation of `Total Qty` based on `Qty` and `UOM Qty`.
    - Date picking for expiration tracking.
3.  **Master Data Management**:
    - Centralized list of products (`master_products`).
    - Standardized Units of Measure (UOM).
4.  **User Experience**:
    - Responsive mobile-first design.
    - Toast notifications for success/error feedback.
    - PWA support for home-screen installation.

### 1.4 User Flow
1.  **Welcome**: User enters email.
2.  **PIN Verification**: User enters 4-digit PIN.
3.  **Main Menu**: Navigation to Inventory Form or Account.
4.  **Log Form**:
    - User enters Location ID.
    - User selects/scans Product.
    - User fills in Qty, Condition, and Expiry.
    - User clicks **Save** (stays on form) or **Finish** (submits and returns to menu).

---

## 2. Entity Relationship Diagram (ERD)

The application relies on four main tables in Supabase:

### 2.1 Table: `profiles`
Stores user-specific information.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key (Auth ID) |
| `email` | `text` | Unique email address |
| `full_name` | `text` | User's display name |
| `pin` | `text` | Encrypted PIN (managed by Supabase Auth) |

### 2.2 Table: `warehouses`
Stores the dynamic list of warehouses available for selection.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `bigint` | Primary Key |
| `name` | `text` | Full warehouse name (Label) |
| `code` | `text` | Unique warehouse code (Value) |
| `created_at` | `timestamp`| Entry creation time |

### 2.3 Table: `master_products`
Stores the master list of available products.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `bigint` | Primary Key |
| `sku` | `text` | Unique SKU code |
| `name` | `text` | Product name |
| `description`| `text` | Long description |
| `uom` | `text` | Default Unit of Measure |

### 2.3 Table: `stocks`
Logs every inventory movement/entry.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `bigint` | Primary Key |
| `location_id` | `text` | Physical location ID |
| `description` | `text` | Product description/name |
| `barcode` | `text` | Scanned barcode value |
| `expired` | `text` | Expiration date (Format: DD/MM/YY) |
| `qty` | `numeric` | Entered quantity |
| `condition` | `text` | 'good', 'damage', 'qr' |
| `uom` | `text` | Unit of Measure |
| `uom_qty` | `numeric` | Quantity per UOM |
| `total_qty` | `numeric` | Calculated (`qty * uom_qty`) |
| `username` | `text` | Logged-in user email |
| `created_at` | `timestamp`| Entry creation time |

### 2.5 Table: `stocks` Relationships
- `stocks.warehouse` stores the `code` from the `warehouses` table.
- `stocks.username` matches the `email` in `profiles`.

---

## 3. Supabase Configuration Guide

To connect the application to Supabase, follow these steps:

1.  **Credentials Location**:
    The application looks for configuration in the `.env` file at the root of the project.
2.  **Required Variables**:
    Create a `.env` file in `services/frontend-vue/inventory-log/` with the following content:
    ```bash
    SUPABASE_URL=https://your-project-id.supabase.co
    SUPABASE_KEY=your-announ-key
    ```
    *Note: These are handled by the `@nuxtjs/supabase` module automatically.*

3.  **Database Setup**:
    - Ensure the tables `profiles`, `master_products`, and `stocks` are created in your Supabase project.
    - Enable **Row Level Security (RLS)** as needed for your project's security requirements.

---

## 4. Local Development

To run the project locally:
1.  Navigate to `services/frontend-vue/inventory-log`.
2.  Install dependencies: `npm install`.
3.  Start dev server: `npm run dev`.
