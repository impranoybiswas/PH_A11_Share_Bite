const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config({ path: ".env.local" });

app.get("/", (req, res) => {
  res.send("Share Bite Server by Pranoy");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Firebase INIT

const admin = require("firebase-admin");
const decoded = Buffer.from(process.env.FB_KEY, "base64").toString("utf8");
const serviceAccount = JSON.parse(decoded);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//Verify Token

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers?.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Unauthoriazed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Forbidden" });
  }
};

// module.exports = admin;

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to MONGO
    const database = client.db("share_bite");
    //Users
    const userCollection = database.collection("users");

    app.get("/users", async (req, res) => {
      const email = req.query.email;
      const user = await userCollection.findOne({ email: email });

      const users = await userCollection.find({}).toArray();
      if (!email) return res.send(users);

      try {
        if (!email) return res.status(404).send("Food Not Found");
        res.send(user);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });

    app.post("/add-user", async (req, res) => {
      const data = req.body;
      const email = req.body.email;

      const user = await userCollection.findOne({ email: email });
      if (user) return res.status(400).send("User Already Exists");

      const result = await userCollection.insertOne(data);
      res.send(result);
    });

    app.patch("/update-user/:email", async (req, res) => {
      const email = req.params.email;
      const updatedData = req.body;
      const filter = { email: email };
      const result = await userCollection.updateOne(filter, {
        $set: updatedData,
      });
      res.send(result);
    });

    //All Foods
    const foodCollection = database.collection("foods");

    app.post("/add-food", async (req, res) => {
      const data = req.body;
      const result = await foodCollection.insertOne(data);
      res.send(result);
    });

    app.get("/foods", async (req, res) => {
      const foods = await foodCollection.find({}).toArray();
      res.send(foods);
    });

    app.get("/foods/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const food = await foodCollection.findOne(filter);
      res.send(food);
    });

    app.patch("/update-food/:id", async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      const filter = { _id: new ObjectId(id) };
      const result = await foodCollection.updateOne(filter, {
        $set: updatedData,
      });

      res.send(result);
    });

    app.patch("/add-order/:id", async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      const filter = { _id: new ObjectId(id) };
      const result = await foodCollection.updateOne(filter, {
        $set: updatedData,
      });
      res.send(result);
    });

    app.delete("/delete-food/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await foodCollection.deleteOne(filter);
      res.send(result);
    });

    // Get total number of foods
app.get("/stats/total-foods", async (req, res) => {
  try {
    const totalFoods = await foodCollection.countDocuments({});
    res.send({ totalFoods });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get number of foods added by a specific user
app.get("/stats/user-foods/:email", async (req, res) => {
  try {
    const email = req.params.email;
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }

    const userFoodsCount = await foodCollection.countDocuments({ "author.email": email });
    res.send({ userFoodsCount });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

    //Close The Conection
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
