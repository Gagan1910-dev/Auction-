import mongoose from "mongoose";

export const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_AUCTION_PLATFORM",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to the database successfully.");
  } catch (error) {
    console.error(`❌ Database connection failed: ${error.message}`);
    process.exit(1); // Exit process if connection fails
  }
};
