const mongoose = require("mongoose");

/**
 * Normalizes MongoDB URI by safely URL-encoding special characters (like @ or %) in credentials
 */
function formatMongoUri(rawUri) {
  if (!rawUri) return rawUri;
  const match = rawUri.match(/^(mongodb(?:\+srv)?:\/\/)([^:]+):(.*)@([^@]+)$/);
  if (match) {
    const protocol = match[1];
    const user = match[2];
    const pass = match[3];
    const hostAndQuery = match[4];
    const cleanPass = encodeURIComponent(decodeURIComponent(pass));
    const cleanUser = encodeURIComponent(decodeURIComponent(user));
    return `${protocol}${cleanUser}:${cleanPass}@${hostAndQuery}`;
  }
  return rawUri;
}

// Function to connect MongoDB
const connectDB = async () => {
  try {
    const connectionUri = formatMongoUri(process.env.MONGO_URI);
    await mongoose.connect(connectionUri);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
