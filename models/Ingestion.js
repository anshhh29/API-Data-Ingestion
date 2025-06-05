const mongoose = require('mongoose');

const BatchSchema = new mongoose.Schema({
  batch_id: { type: String },
  ids: [Number],
  status: { type: String, enum: ['yet_to_start', 'triggered', 'completed'], default: 'yet_to_start' }
});

const IngestionSchema = new mongoose.Schema({
  ingestion_id: { type: String },
  priority: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'] },
  createdAt: { type: Date, default: Date.now },
  batches: [BatchSchema]
});

module.exports = mongoose.model('Ingestion', IngestionSchema);
