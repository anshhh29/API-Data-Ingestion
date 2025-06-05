const { v4: uuidv4 } = require('uuid');
const Ingestion = require('../models/Ingestion');

exports.ingest = async (req, res) => {
  const { ids, priority } = req.body;
  if (!ids || !Array.isArray(ids) || !priority) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const batches = [];
  for (let i = 0; i < ids.length; i += 3) {
    batches.push({
      batch_id: uuidv4(),
      ids: ids.slice(i, i + 3),
      status: 'yet_to_start'
    });
  }

  const ingestion_id = uuidv4();
  const doc = new Ingestion({ ingestion_id, priority, batches });
  await doc.save();

  res.json({ ingestion_id });
};

exports.getStatus = async (req, res) => {
  const { ingestion_id } = req.params;
  const doc = await Ingestion.findOne({ ingestion_id });

  if (!doc) return res.status(404).json({ error: 'Not found' });

  let outerStatus = 'yet_to_start';
  const statuses = doc.batches.map(b => b.status);

  if (statuses.every(s => s === 'completed')) outerStatus = 'completed';
  else if (statuses.includes('triggered') || statuses.includes('completed')) outerStatus = 'triggered';

  res.json({
    ingestion_id: doc.ingestion_id,
    status: outerStatus,
    batches: doc.batches
  });
};
