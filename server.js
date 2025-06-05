const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');

  if (process.env.NODE_ENV !== 'test') {
    require('./queue/worker');
  }

  app.listen(process.env.PORT || 5000, () =>
    console.log('Server running')
  );
});
