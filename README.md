# ShetkariSetu (शेतकरी सेतू) — Smart Agricultural Market Linkage Platform

> **Smart India Hackathon (SIH 2026) Prototype**  
> **Track**: Government of Maharashtra — Strengthening Market Linkages & Eliminating Price Asymmetry for Farmers  
> **Ground Benchmark Scenario**: Farmer in Lamjana village (Ausa Taluka, District Latur) selling 15 quintals of soybean.

---

## 🌟 Executive Overview

In rural Maharashtra, farmers routinely suffer from **distress selling** due to information asymmetry, predatory commission agent deductions, and prohibitive transport costs. A farmer in Lamjana selling 15 quintals of soybean typically settles for ₹4,400/quintal at the local sub-yard, while the main Latur APMC trades at ₹4,820/quintal and Kirti Gold Oil Mill buys directly at ₹4,950/quintal.

**ShetkariSetu bridges this gap through a 3-portal ecosystem:**
1. **Portal A (Farmer Portal)**: Multilingual Marathi/English interface with Bhashini voice/WhatsApp input, real-time Net Take-Home arbitrage engine (Rate × Qty − APMC Cess − Transport), live transit tracking, and offline PWA resilience.
2. **Portal B (Adat & Mill Owner Portal)**: Daily rate publisher with ML-backed APMC outlier detection (>20% divergence flagged), incoming dispatches queue, and one-click digital weighing slip + simulated non-custodial escrow release.
3. **Portal C (Transporter Bidding Engine)**: 10-minute timed reverse auction powered by Socket.io, quick-decrement bidding, and **hard server-side floor price protection (rejects any bid < ₹650)**.

---

## 🏗️ System Architecture

```
                                  +---------------------------------------+
                                  |     Farmer Portal (PWA / Web)         |
                                  | - Bhashini Voice Input (Marathi)      |
                                  | - Net Take-Home Arbitrage Engine      |
                                  | - IndexedDB Offline Queue & Sync      |
                                  | - SMS / USSD Fallback Gateway         |
                                  +-------------------+-------------------+
                                                      |
                                                      v
+------------------------+        +-------------------+-------------------+        +------------------------+
|  Adat & Mill Portal    | <----> |   Express + Socket.io Engine (Node)   | <----> |  Transporter Engine    |
| - Rate Publisher       |        | - Mongoose 2dsphere Geospatial Index  |        | - 10-Min Reverse Auction|
| - ML Outlier Alert     |        | - Server Floor Price Validation (₹650)|        | - Quick Decrement (-50)|
| - Digital Weigh Slip   |        | - Resilient Dual-Mode Store           |        | - Anomaly / Collusion  |
| - Escrow Release (UPI) |        +-------------------+-------------------+        +------------------------+
+------------------------+                            |
                                                      v
                                  +-------------------+-------------------+
                                  |   Python FastAPI ML Microservice      |
                                  | - POST /predict/grade (Image CV)      |
                                  | - POST /predict/price (Time Series)   |
                                  | - POST /predict/bid-anomaly (Collusion)
                                  +---------------------------------------+
```

---

## ⚖️ Key Legal & Regulatory Differentiator (Feasibility Score 10/10)

Agricultural market prototypes often fail due to allegations of **disintermediation** (violating APMC rules) and **unlicensed fund holding** (violating RBI payment aggregator guidelines).

ShetkariSetu directly solves this:
- **Works with APMCs**: Integrates licensed Adat commission agents and certified direct mill processors (holding Direct Marketing Licenses under Maharashtra APMC Act, 1963). APMC statutory cess (1.05%) is calculated and audited transparently.
- **Simulated Non-Custodial Escrow**: ShetkariSetu never takes custody of transaction funds. Funds are held in a scheduled bank escrow pool (Razorpay Route pattern) and programmatically split upon digital weighing slip verification.
- **Full Legal Analysis**: Consult [COMPLIANCE.md](./COMPLIANCE.md) at the repository root.

---

## 🚀 90-Second Live Walkthrough Guide (For SIH Judges)

| Step | Action | What to Observe |
| :---: | :--- | :--- |
| **1** | Open **Farmer Portal** (`/farmer`) | Tap **Simulate Voice** in Marathi: *"माझ्याकडे लामजणा येथे १५ क्विंटल सोयाबीन आहे"*. Bhashini ASR extracts entities: Soybean, 15 Qtl, Lamjana. |
| **2** | Review **Arbitrage Comparison** | Observe Net Take-Home: Kirti Gold Mill nets **₹73,350**, unlocking **+₹7,700 surplus** over local distress selling (₹65,650). View the transparent deduction drawer and AI Bullish trend forecast. |
| **3** | Click **Lock Price & Book Transport** | The **Trust & Compliance Modal** opens, presenting the non-custodial escrow agreement and APMC compliance confirmation. |
| **4** | Open **Transporter Engine** (`/transporter`) | Observe the 10-minute live reverse auction room over Socket.io. Click **-₹50** decrement. Then test clicking **चाचणी: ₹६००** to witness **hard server-side floor price rejection** (bids below ₹650 rejected). |
| **5** | Switch to **Adat & Mill Portal** (`/mill`) | Test entering a predatory rate (e.g. ₹6,200) to trigger the **ML Outlier Alert (>20% divergence)**. View the incoming Lamjana dispatch, click **वजन पावती**, and trigger the **UPI Escrow Split Release**. |
| **6** | Test **Offline Resilience** | Toggle **Lite Mode** or inspect the **SMS/USSD Fallback Simulator** demonstrating zero-smartphone connectivity. |

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Service Worker PWA, IndexedDB
- **Backend**: Node.js, Express, Socket.io, Mongoose with `2dsphere` geospatial indexing + resilient in-memory fallback
- **ML Inference**: Python FastAPI microservice (`ml_service/`) with endpoints for crop grading, price outlier detection, and bid anomaly/collusion analysis
- **Compliance Model**: Non-custodial programmatic split settlement (Razorpay Route framework) & Maharashtra APMC Regulatory adherence

---

## 💻 Quickstart (Zero-Setup Execution)

### Prerequisites
- Node.js 18+ (tested on Node 24)
- npm

### 1. Run Backend Server
```bash
cd backend
npm install
npm run dev
# Starts on port 5000 with Socket.io reverse auction active
```

### 2. Run Frontend Web Application
```bash
cd frontend
npm install
npm run dev
# Open http://localhost:3000
```

### 3. (Optional) Run Python ML Microservice
```bash
cd ml_service
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```
*(Note: If Python is not running locally, the Node.js backend features built-in high-fidelity ML inference proxies so your demo never fails!)*
