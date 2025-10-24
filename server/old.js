const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const admin = require("firebase-admin");
const fetch = require("node-fetch"); // if Node < 18

dotenv.config({ path: ".env.local" });

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Firebase Admin Init
const decodedKey = Buffer.from(process.env.FB_KEY, "base64").toString("utf8");
const serviceAccount = JSON.parse(decodedKey);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Verify Firebase Token
const verifyToken = async (req, res, next) => {
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

// MongoDB Connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Base Route
app.get("/", (req, res) => res.send("Share Bite Server by Pranoy"));

async function run() {
  try {
    await client.connect(); // connect to MongoDB
    const database = client.db("share_bite");

    // Collections
    const userCollection = database.collection("users");
    const foodCollection = database.collection("foods");
    const donationCollection = database.collection("donations");

    // ===========================
    // Users
    // ===========================
    app.get("/users", async (req, res) => {
      try {
        const email = req.query.email;
        if (email) {
          const user = await userCollection.findOne({ email });
          return res.send(user || {});
        }
        const users = await userCollection.find({}).toArray();
        res.send(users);
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    });

    app.post("/add-user", async (req, res) => {
      try {
        const data = req.body;
        const existingUser = await userCollection.findOne({
          email: data.email,
        });
        if (existingUser) return res.status(400).send("User Already Exists");
        const result = await userCollection.insertOne(data);
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send("Failed to add user");
      }
    });

    app.patch("/update-user/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const updatedData = req.body;
        const result = await userCollection.updateOne(
          { email },
          { $set: updatedData }
        );
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send("Failed to update user");
      }
    });

    // ===========================
    // Foods
    // ===========================
    app.post("/add-food", async (req, res) => {
      try {
        const data = req.body;
        const result = await foodCollection.insertOne(data);
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send("Failed to add food");
      }
    });

    app.get("/foods", async (req, res) => {
      try {
        const foods = await foodCollection.find({}).toArray();
        res.send(foods);
      } catch (err) {
        console.error(err);
        res.status(500).send("Failed to fetch foods");
      }
    });

    app.get("/foods/:id", verifyToken, async (req, res) => {
      try {
        const food = await foodCollection.findOne({
          _id: new ObjectId(req.params.id),
        });
        res.send(food);
      } catch (err) {
        console.error(err);
        res.status(500).send("Failed to fetch food");
      }
    });

    app.patch("/update-food/:id", async (req, res) => {
      try {
        const result = await foodCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body }
        );
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send("Failed to update food");
      }
    });

    app.delete("/delete-food/:id", async (req, res) => {
      try {
        const result = await foodCollection.deleteOne({
          _id: new ObjectId(req.params.id),
        });
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send("Failed to delete food");
      }
    });

    // ===========================
    // Donations
    // ===========================
    app.post("/donations", async (req, res) => {
      try {
        const { amount, doner } = req.body;
        if (!amount || !doner)
          return res.status(400).json({ message: "Missing fields" });

        const tranId = new Date().getTime().toString();

        // Save donation as pending
        await donationCollection.insertOne({
          tranId,
          amount,
          doner,
          status: "pending",
          createdAt: new Date(),
        });

        const payload = {
          store_id: process.env.SSLC_STORE_ID,
          store_passwd: process.env.SSLC_STORE_PASS,
          total_amount: amount,
          currency: "BDT",
          tran_id: tranId,
          success_url: `${process.env.CLIENT_URL}/donation-success?tran_id=${tranId}`,
          fail_url: `${process.env.CLIENT_URL}/donation-fail?tran_id=${tranId}`,
          cancel_url: `${process.env.CLIENT_URL}/donation-cancel?tran_id=${tranId}`,
          cus_name: doner,
          cus_email: doner,
          cus_phone: "N/A",
          cus_add1: "N/A",
          cus_city: "N/A",
          cus_country: "Bangladesh",
          shipping_method: "NO",
          product_name: "Share Bite Donation",
          product_category: "Donation",
          product_profile: "N/A",
          value_a: tranId,
        };

        const sslUrl = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";
        const response = await fetch(sslUrl, {
          method: "POST",
          body: new URLSearchParams(payload),
        });
        const data = await response.json();

        if (data?.GatewayPageURL) {
          res.json({ GatewayPageURL: data.GatewayPageURL });
        } else {
          console.log("SSLCommerz response:", data);
          res
            .status(500)
            .json({ message: "SSLCommerz session creation failed" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create donation/payment" });
      }
    });

    // Mark success
    app.patch("/donations/:tranId/success", async (req, res) => {
      try {
        const { tranId } = req.params;
        const result = await donationCollection.updateOne(
          { tranId },
          { $set: { status: "success" } }
        );
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).send("Failed to mark donation success");
      }
    });

    // Delete donation (fail/cancel)
    app.delete("/donations/:tranId", async (req, res) => {
      try {
        const { tranId } = req.params;
        const result = await donationCollection.deleteOne({ tranId });
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).send("Failed to delete donation");
      }
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}

run().catch(console.dir);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
