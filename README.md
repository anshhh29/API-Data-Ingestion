# 🧪 Data Ingestion API

A RESTful API system for data ingestion with asynchronous batch processing, rate limiting, and priority-based execution.

---

## 🚀 Features

- ⚙️ Asynchronous batching (3 IDs per batch)
- ⏱️ Rate Limiting: 1 batch processed every 5 seconds
- 📊 Priority Queue: `HIGH` > `MEDIUM` > `LOW`
- 🗂️ Persistent tracking using MongoDB
- 🔁 REST APIs: `/ingest`, `/status/:ingestion_id`

---

## 🔧 Run Locally

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/ingestion-api.git
cd ingestion-api/backend

# Install dependencies
npm install

# Set up .env file
cp .env.example .env
# OR create `.env` with:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/ingestion_test

# Start the development server
npm run dev
#   A P I - D a t a - I n g e s t i o n  
 