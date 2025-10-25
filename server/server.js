import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import admin from "firebase-admin";
import routes from "./routes/index.js";

// ===========================
// Load Environment Variables
// ===========================
config();

const app = express();
app.use(cors());
app.use(express.json());

// ===========================
// Firebase Setup
// ===========================
if (!process.env.FB_KEY) {
  console.error("❌ Missing environment variable: FB_KEY");
  process.exit(1);
}

try {
  const decodedKey = Buffer.from(process.env.FB_KEY, "base64").toString("utf8");
  const serviceAccount = JSON.parse(decodedKey);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  console.log("🔥 Firebase Admin initialized");
} catch (err) {
  console.error("❌ Firebase initialization failed:", err.message);
  process.exit(1);
}

// ===========================
// MongoDB Setup
// ===========================
if (!process.env.MONGODB_URI) {
  console.error("❌ Missing environment variable: MONGODB_URI");
  process.exit(1);
}

let client = null;

export async function connectDB() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }

  return client.db("share_bite");
}

// ===========================
// Routes
// ===========================
app.use("/", routes(connectDB));

// ===========================
// Export for Vercel
// ===========================
export default app;

// ===========================
// Local Development Support
// ===========================
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}
