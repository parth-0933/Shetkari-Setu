# ShetkariSetu — Regulatory, Legal & Compliance Framework

> **Document Version**: 1.0 (SIH 2026 Evaluation Edition)  
> **Applicability**: Government of Maharashtra — APMC Act, Digital Agricultural Markets & Non-Custodial Payment Facilitation  
> **Key Benchmark**: Lamjana Village (Ausa Taluka, Latur) to Latur APMC / Kirti Gold & ADM Agro-Processing Units

---

## Executive Summary

One of the most frequent legal objections encountered by agricultural market-linkage prototypes is the allegation of **unlawful disintermediation** (attempting to bypass statutory Agricultural Produce Market Committees without licenses) and **unlicensed financial custodial operations** (holding farmer proceeds directly without an RBI Payment Aggregator / Escrow license).

**ShetkariSetu has been architected from the ground up to solve both challenges:**
1. **Co-existence with APMC Regulations**: It functions alongside licensed APMC Adat traders and registered processing mills rather than circumventing them.
2. **Non-Custodial Escrow Architecture**: It utilizes a programmatic split-settlement pattern (modeled on RBI-compliant UPI-escrow / Razorpay Route) where the platform never takes custody of farmer funds.

---

## 1. Compliance with the Maharashtra APMC Act

### Statutory Context
Under the **Maharashtra Agricultural Produce Marketing (Development and Regulation) Act, 1963** (and subsequent amendments, including the Maharashtra Agricultural Produce Marketing (Regulation) Amendment Act, 2018):
- Farmers possess the statutory right to sell agricultural produce outside the physical market yard to licensed private processors, direct marketers, or exporters.
- Physical transactions inside the yard require registered commission agents (*Adatyas*) who hold valid APMC licenses.

### How ShetkariSetu Complies:
| Statutory Requirement | Traditional Disintermediation Risk | ShetkariSetu Compliance Architecture |
| :--- | :--- | :--- |
| **Market Cess & Development Fees** | Bypassing Mandis deprives the APMC board of legally mandated market fees (approx 1.05%). | ShetkariSetu **transparently computes and accounts for APMC user cess** in the arbitrage engine. Transactions settled through APMC Adats maintain full fee audit trails. |
| **Direct Mill Purchasing** | Unauthorized buying of notified produce outside market yards without registration. | ShetkariSetu exclusively links farmers with **certified direct purchasers** (e.g., licensed oil mills such as Kirti Gold / ADM) holding active Direct Marketing Licences (DML) issued by the Directorate of Marketing, Maharashtra. |
| **Dispute Resolution** | Lack of grievance mechanism for weights and payments. | ShetkariSetu provides an **immutable Digital Weighing Slip** signed electronically by both parties. Any dispute escalates directly to the designated APMC Secretary / Taluka Sub-Divisional Officer. |

---

## 2. Non-Custodial Simulated Escrow Mechanism

### Why Traditional Platforms Fail Regulatory Scrutiny
Under Reserve Bank of India (RBI) *Guidelines on Regulation of Payment Aggregators and Payment Gateways*, non-banking platforms are **strictly prohibited from holding customer funds in private current accounts** without an authorized Payment Aggregator (PA) license.

### ShetkariSetu Solution: Simulated Non-Custodial Hold (Razorpay Route Pattern)
ShetkariSetu operates strictly as a **Technology Service Provider (TSP)** and **does not hold custody of transaction funds**.

```
+-----------------------------------------------------------------------------------+
|                            NON-CUSTODIAL ESCROW FLOW                              |
+-----------------------------------------------------------------------------------+
  [Buyer: Mill / Adat]
          |
          v
  (Authorizes UPI / e-Mandate Hold via Escrow Partner Bank: e.g., SBI / HDFC Agri-Escrow)
          |
          +--------------------------------------------+
          | [Funds Held in RBI-Regulated Escrow Pool]  |
          |       (ShetkariSetu has ZERO custody)      |
          +--------------------------------------------+
                                  |
            +---------------------+---------------------+
            | [Condition 1: Digital Weighing Slip Signed] |
            | [Condition 2: Farmer OTP Verification]     |
            +---------------------+---------------------+
                                  |
                                  v
                    (Programmatic Split Settlement)
                     /                           \
                    v                             v
      [Farmer Account (95-98% Net)]     [Transporter Account (Transit Fee)]
```

### Digital Consent Agreement
Before activating any Price-Lock, both the farmer and buyer view and digitally accept the **ShetkariSetu Tripartite Price-Lock Memorandum**:
- Specifies that the locked price is contingent on fair average quality (FAQ) moisture thresholds (<10%).
- Confirms the non-custodial nature of the bank escrow hold.
- Stipulates an automatic timeout release if transit exceeds the agreed SLA without justifiable force majeure.

---

## 3. Ground Benchmark Scenario Context (Latur District)

- **Origin**: Lamjana Village, Ausa Taluka, District Latur, Maharashtra (Latitude 18.257°, Longitude 76.621°).
- **Produce**: 15 Quintals (1.5 Metric Tonnes) of Soybean (Grade A / FAQ).
- **Route 1 — Local Mandi (Ausa)**: 12 km, lower price realization (₹4,400/Qtl), negligible transport (₹350), net take-home = ₹65,650.
- **Route 2 — Latur APMC (Market Yard)**: 38 km, competitive benchmark rate (₹4,820/Qtl), APMC cess (₹759), transport (₹850), net take-home = ₹70,691.
- **Route 3 — Direct Oil Mill (Kirti Gold, MIDC Latur)**: 41 km, premium bulk purchase (₹4,950/Qtl), zero APMC cess (direct marketing), transport (₹900), net take-home = ₹73,350 (+₹7,700 vs local distress selling).

ShetkariSetu eliminates the information barrier and logistics bottleneck that historically forced Lamjana farmers to sell at lower rates at local aggregation points.

---

## 4. Summary for Hackathon Evaluation Panel
1. **Legally defensible**: Does not evade APMC taxes or bypass licensed ecosystem players.
2. **Financially compliant**: Employs non-custodial, event-triggered escrow via scheduled commercial banking rails.
3. **Technically auditable**: Digital weighing slips, GPS-timestamped dispatches, and algorithmic floor-price enforcement.
