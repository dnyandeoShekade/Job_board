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
    const rawUri = process.env.MONGO_URI;
    if (!rawUri) {
      console.error("CRITICAL: MONGO_URI environment variable is missing.");
      return;
    }

    const connectionUri = formatMongoUri(rawUri);

    // Safe logging without exposing password
    const safeDisplay = connectionUri.replace(/:([^@]+)@/, ":****@");
    console.log("Connecting to MongoDB:", safeDisplay);

    await mongoose.connect(connectionUri);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database connection error:", error.message || error);
    // Do not call process.exit(1) so Express stays running to serve CORS & health checks
  }
};

module.exports = connectDB;
