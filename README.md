# BHCNation - Church Management System (v1 Beta)

Welcome to the **BHCNation** Church Management System. This repository contains the source code for the **v1 Beta** web application. BHCNation is designed to be an end-to-end operational software suite for churches, covering everything from member directories to financial tracking and artificial intelligence-powered pastoral intelligence.

## Features Currently Implemented

This v1 release operates entirely within the browser (`localStorage`) for rapid beta testing without requiring complex backend setup.

- **Dashboard & AI Intelligence:** Live statistical overview of operations with a native integration to the Google Gemini API for real-time pastoral insights.
- **Directory & Members:** Complete member management, dynamic real-time filtering, and visual cards highlighting new converts vs. active members.
- **Finance (Giving):** A dedicated ledger tracking Income, Expenses, Tithes, and maintenance costs format automatically in Nigerian Naira (₦).
- **Programs & Events:** An interactive calendar scheduling system with dynamic logic for uncompleted/upcoming events.
- **Departments & Units:** Intuitive cards outlining unit heads and calculating specific member distributions per department.
- **Volunteers Base:** A dedicated roster mapping specific availability to core operational roles (e.g. Media, Choir).
- **Inventory System:** Essential tracking for operational equipment, quantifying assets, and monitoring physical condition statuses.

## Tech Stack

This project is built using modern, fast web architecture designed to later scale into full-production Multi-Tenant Apps via Capacitor across iOS and Android.

*   [React 19](https://react.dev/) - Core UI Library
*   [Vite](https://vitejs.dev/) - Extremely fast Next-Generation Frontend Tooling
*   [Tailwind CSS v3](https://tailwindcss.com/) - Utility-first styling including Glassmorphism configurations.
*   [Firebase Hosting](https://firebase.google.com/docs/hosting) - Production Deployment

## Running the Application Locally

1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Clone this repository to your local machine.
3. Open a terminal in the root directory and install the dependencies:
   ```bash
   npm install
   ```
4. Start the local Vite development server:
   ```bash
   npm run dev
   ```
5. Click the `http://localhost:5173` link in your terminal to view the app.

## Upcoming Architecture (v2 Roadmap)

This version operates on offline-first `AppDataContext`. The roadmap for the v2 production rollout involves:

1.  **Multi-Tenancy Setup:** Stamping all data with `tenantId` to isolate multiple churches safely.
2.  **IAM Security Controls:** Securing routes dynamically depending on Unit Head or Lead Pastor access levels.
3.  **Firebase Firestore Integration:** Migrating from browser storage to a centralized NoSQL cloud database for instantaneous collaboration across multiple administrative devices.

---
*Developed for BHCNation Operations.*
