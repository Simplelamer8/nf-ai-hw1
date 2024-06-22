import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const client = await mongoose.connect(
      process.env.MONGODB_URL || 'mongodb://localhost:27017/lecture1'
    , {dbName: "AIchat"});
    console.log('MongoDB connected...')
  } catch (err: any) {
    console.error(err.message)
    process.exit(1)
  }
}

export default connectDB