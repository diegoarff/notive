import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI as string);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection established');
});

connection.on('error', (err) => {
  console.log(err);
  process.exit(0);
});
