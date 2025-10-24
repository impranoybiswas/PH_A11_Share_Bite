import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import admin from "firebase-admin";

// Load environment variables
config({ path: ".env.local" });

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

const decodedKey = Buffer.from(process.env.FB_KEY, "base64").toString("utf8");
const serviceAccount = JSON.parse(decodedKey);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers?.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    req.decoded = await admin.auth().verifyIdToken(token);
    next();
  } catch (error) {
    return res.status(401).send({ message: "Forbidden" });
  }
};

console.log("✅ Firebase initialized");

// ===========================
// MongoDB Setup
// ===========================
if (!process.env.MONGODB_URI) {
  console.error("❌ Missing environment variable: MONGODB_URI");
  process.exit(1);
}

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

export async function connectDB() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client.db("share_bite");
}

// ===========================
// Routes Import
// ===========================
import donationRoutes from "./donations.js";
import userRoutes from "./users.js";
import foodRoutes from "./foods.js";
import commentRoutes from "./comments.js";

app.get("/", (req, res) => res.send("🚀 Share Bite Server running"));

app.use("/donations", donationRoutes(connectDB));
app.use("/users", userRoutes(connectDB));
app.use("/foods", foodRoutes(connectDB));
app.use("/comments", commentRoutes(connectDB));

export default app;
