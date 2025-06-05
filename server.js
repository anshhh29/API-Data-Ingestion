const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');

  if (process.env.NODE_ENV !== 'test') {
    require('./queue/worker');
  }

  app.listen(process.env.PORT, () =>
    console.log('Server running')
  );
});
