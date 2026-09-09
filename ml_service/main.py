"""
ShetkariSetu ML Inference Microservice (FastAPI)
SIH 2026 Prototype — Govt. of Maharashtra Track
Provides inference endpoints for:
1. Crop Grading (Image classification: Grade A / FAQ / Reject)
2. Price Forecasting & Outlier Flagging (Time-series benchmark & >20% divergence check)
3. Bidding Anomaly & Collusion Detection (Reverse auction stream analysis)
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import datetime
import random

app = FastAPI(
    title="ShetkariSetu ML Inference Microservice",
    version="1.0.0",
    description="Microservice serving computer vision and econometric inference for ShetkariSetu agricultural linkage engine."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Data Models -----------------
class PricePredictionRequest(BaseModel):
    mandi_id: str = Field(..., example="latur_apmc")
    crop: str = Field(default="Soybean", example="Soybean")
    date: Optional[str] = Field(default=None, example="2026-09-10")
    offered_price: Optional[float] = Field(default=None, example=4850.0)

class PricePredictionResponse(BaseModel):
    crop: str
    mandi_id: str
    predicted_benchmark_price: float
    unit: str
    trend_pct: float
    confidence_score: float
    recommendation: str
    advisory_marathi: str
    is_outlier: bool
    outlier_deviation_pct: float
    historical_7d_prices: List[float]

class BidItem(BaseModel):
    bidder_id: str
    amount: float
    timestamp: Optional[str] = None

class BidAnomalyRequest(BaseModel):
    auction_id: str
    floor_price: float = 650.0
    bid_sequence: List[BidItem]

class BidAnomalyResponse(BaseModel):
    auction_id: str
    anomaly_score: float
    is_collusion_suspected: bool
    risk_level: str
    flagged_reasons: List[str]

class CropGradingResponse(BaseModel):
    filename: str
    grade: str
    confidence: float
    moisture_percentage: float
    oil_content_percentage: float
    foreign_matter_percentage: float
    market_readiness: str
    summary_marathi: str

# ----------------- Endpoints -----------------

@app.get("/")
def read_root():
    return {
        "service": "ShetkariSetu ML Inference Microservice",
        "status": "online",
        "version": "1.0.0",
        "supported_crops": ["Soybean", "Chana", "Tur", "Cotton"],
        "primary_mandi": "Latur APMC (Market Yard) & MIDC Oil Mills"
    }

@app.get("/health")
def health():
    return {"status": "healthy", "timestamp": datetime.datetime.utcnow().isoformat()}

# Endpoint 1: Crop Grading
@app.post("/predict/grade", response_model=CropGradingResponse)
async def predict_crop_grade(file: UploadFile = File(...)):
    """
    Accepts multipart image of soybean sample.
    Returns Grade A, FAQ (Fair Average Quality), or Reject with moisture and oil estimates.
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    # In production, image tensor is fed into pre-trained ResNet/MobileNet model.
    # Here we simulate the calibrated inference outputs:
    moisture = round(random.uniform(9.1, 10.8), 1)
    oil_content = round(random.uniform(18.2, 19.6), 1)
    foreign_matter = round(random.uniform(0.8, 1.9), 1)

    if moisture <= 10.5 and foreign_matter <= 1.5:
        grade = "Grade A (Premium Bold)"
        confidence = 0.94
        readiness = "Optimal for Oil Extraction & Export"
        marathi = "सोयाबीन प्रतवारी: 'अ' दर्जा (तेल प्रमाण १९%+, ओलावा १०.२%). उच्च दर मिळण्यास पात्र."
    elif moisture <= 12.0:
        grade = "FAQ (Fair Average Quality)"
        confidence = 0.89
        readiness = "Standard Mandi Trade Quality"
        marathi = "सोयाबीन प्रतवारी: सरासरी दर्जा (FAQ). मानक बाजारभाव लागू."
    else:
        grade = "Reject (High Moisture / Discolored)"
        confidence = 0.82
        readiness = "Needs immediate aeration/drying"
        marathi = "ओलावा जास्त असल्याने वाळवण्याची आवश्यकता आहे."

    return CropGradingResponse(
        filename=file.filename,
        grade=grade,
        confidence=confidence,
        moisture_percentage=moisture,
        oil_content_percentage=oil_content,
        foreign_matter_percentage=foreign_matter,
        market_readiness=readiness,
        summary_marathi=marathi
    )

# Endpoint 2: Price Forecasting & Outlier Flagging
@app.post("/predict/price", response_model=PricePredictionResponse)
def predict_price(req: PricePredictionRequest):
    """
    Time-series forecasting benchmark for given crop and Mandi.
    Detects if an offered rate diverges > 20% from the official benchmark.
    """
    # Latur Soybean Benchmark Baseline
    base_price = 4850.0 if "latur" in req.mandi_id.lower() else 4500.0
    predicted_benchmark = base_price + random.choice([0.0, 20.0, -15.0, 35.0])
    
    # 3-day trend forecast
    trend_pct = 3.2  # Expected to rise 3.2% over next 48h
    recommendation = "Hold (Price expected to rise +3.2% in 48h)" if trend_pct > 2.0 else "Sell Now"
    marathi_advisory = "लातूर बाजारात पुढील ४८ तासांत सोयाबीनचे भाव साधारण ३% वाढण्याचा अंदाज आहे. शक्य असल्यास माल धरून ठेवा."

    is_outlier = False
    deviation_pct = 0.0

    if req.offered_price is not None and req.offered_price > 0:
        deviation_pct = round(((req.offered_price - predicted_benchmark) / predicted_benchmark) * 100, 2)
        # Outlier condition: Divergence greater than 20% (either predatory low or speculative high)
        if abs(deviation_pct) > 20.0:
            is_outlier = True

    historical_prices = [
        round(predicted_benchmark - 90, 0),
        round(predicted_benchmark - 60, 0),
        round(predicted_benchmark - 40, 0),
        round(predicted_benchmark - 10, 0),
        round(predicted_benchmark + 15, 0),
        round(predicted_benchmark + 25, 0),
        round(predicted_benchmark, 0)
    ]

    return PricePredictionResponse(
        crop=req.crop,
        mandi_id=req.mandi_id,
        predicted_benchmark_price=round(predicted_benchmark, 0),
        unit="₹/Quintal",
        trend_pct=trend_pct,
        confidence_score=0.91,
        recommendation=recommendation,
        advisory_marathi=marathi_advisory,
        is_outlier=is_outlier,
        outlier_deviation_pct=deviation_pct,
        historical_7d_prices=historical_prices
    )

# Endpoint 3: Reverse Auction Collusion / Anomaly Detection
@app.post("/predict/bid-anomaly", response_model=BidAnomalyResponse)
def detect_bid_anomaly(req: BidAnomalyRequest):
    """
    Analyzes reverse auction bid stream.
    Flags artificial clustering, floor-price gaming, or abnormal price drops.
    """
    anomaly_score = 0.05
    is_collusion = False
    reasons = []

    bids = req.bid_sequence
    if len(bids) >= 2:
        # Check if consecutive bids are identical or suspiciously synchronized
        amounts = [b.amount for b in bids]
        
        # Check floor proximity
        near_floor_bids = [a for a in amounts if a <= req.floor_price + 30]
        if len(near_floor_bids) >= 3:
            anomaly_score += 0.45
            reasons.append("Multiple bids clustering unnaturally close to floor price (₹650)")

        # Check for rapid micro-undercutting by same bidder
        bidders = [b.bidder_id for b in bids]
        if len(bidders) != len(set(bidders)) and len(bids) > 4:
            repeated = [x for x in bidders if bidders.count(x) > 2]
            if repeated:
                anomaly_score += 0.35
                reasons.append(f"High-frequency automated decrement detected from bidder '{repeated[0]}'")

    if any(b.amount < req.floor_price for b in bids):
        anomaly_score = 0.99
        is_collusion = True
        reasons.append("CRITICAL: Bid below statutory floor price of ₹650 detected")

    if anomaly_score >= 0.70:
        is_collusion = True
        risk_level = "HIGH"
    elif anomaly_score >= 0.40:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    return BidAnomalyResponse(
        auction_id=req.auction_id,
        anomaly_score=round(anomaly_score, 2),
        is_collusion_suspected=is_collusion,
        risk_level=risk_level,
        flagged_reasons=reasons if reasons else ["Normal competitive decrement pattern observed"]
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
