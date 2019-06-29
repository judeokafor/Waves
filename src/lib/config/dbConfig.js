import mongoose from 'mongoose';
import env from './env';

mongoose
  .connect(env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`MongoDB connected to ${env.DATABASE_URL}`);
  })
  .catch((err) => {
    console.log(err);
  });
