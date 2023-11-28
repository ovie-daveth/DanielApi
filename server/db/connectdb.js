import mongoose from 'mongoose';

const connectdb = async (uri) => {
  await mongoose.connect(uri);
}

export default connectdb