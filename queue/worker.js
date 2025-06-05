const Ingestion = require('../models/Ingestion');

const queue = [];
let processing = false;

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function processNextBatch() {
  if (processing || queue.length === 0) return;

  processing = true;
  const next = queue.shift();

  const { batch, ingestion_id } = next;
  batch.status = 'triggered';
  await next.doc.save();

  // simulate fetching data from external API
  await delay(5000);
  batch.status = 'completed';
  await next.doc.save();

  processing = false;
  processNextBatch();
}

async function enqueueBatches() {
  const docs = await Ingestion.find();
  const allBatches = [];

  docs.forEach(doc => {
    doc.batches.forEach(batch => {
      if (batch.status === 'yet_to_start') {
        allBatches.push({ doc, batch, priority: doc.priority, createdAt: doc.createdAt, ingestion_id: doc.ingestion_id });
      }
    });
  });

  allBatches.sort((a, b) => {
    const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return a.createdAt - b.createdAt;
  });

  if (queue.length === 0 && allBatches.length > 0) {
    queue.push(...allBatches.slice(0, 1)); // one batch per 5 seconds
    processNextBatch();
  }
}

setInterval(enqueueBatches, 1000);
