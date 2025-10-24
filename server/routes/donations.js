import { Router } from "express";
import fetch from "node-fetch";
import { config } from "dotenv";

export default (connectDB) => {
  const router = Router();

  // Load environment variables
  config({ path: ".env.local" });

  // ===========================
  // Create donation payment
  // ===========================
  router.post("/", async (req, res) => {
    try {
      const { amount, doner } = req.body;

      if (!amount || !doner) {
        return res.status(400).json({ message: "Missing fields: amount or doner" });
      }

      if (!process.env.SSLC_STORE_ID || !process.env.SSLC_STORE_PASS || !process.env.CLIENT_URL) {
        return res.status(500).json({ message: "Missing SSLCommerz environment variables" });
      }

      const db = await connectDB();
      const donationCollection = db.collection("donations");

      // Unique transaction ID
      const tranId = new Date().getTime().toString();

      // Insert initial donation record (status: pending)
      await donationCollection.insertOne({
        tranId,
        amount: Number(amount),
        doner,
        status: "pending",
        createdAt: new Date(),
      });

      // SSLCommerz payload
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

      // Make POST request to SSLCommerz sandbox
      const response = await fetch("https://sandbox.sslcommerz.com/gwprocess/v4/api.php", {
        method: "POST",
        body: new URLSearchParams(payload),
      });

      const data = await response.json();
      console.log("SSLCommerz response:", data);

      if (data?.GatewayPageURL) {
        return res.json({ GatewayPageURL: data.GatewayPageURL });
      } else {
        return res.status(500).json({
          message: "SSLCommerz session creation failed",
          response: data, // return full response for debugging
        });
      }
    } catch (err) {
      console.error("SSLCommerz error:", err);
      return res.status(500).json({ message: "Payment initiation failed", error: err.message });
    }
  });

  // ===========================
  // Mark donation as success
  // ===========================
  router.patch("/donations/:tranId/success", async (req, res) => {
    try {
      const db = await connectDB();
      const donationCollection = db.collection("donations");

      const result = await donationCollection.updateOne(
        { tranId: req.params.tranId },
        { $set: { status: "success", updatedAt: new Date() } }
      );

      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to mark donation as success" });
    }
  });

  // ===========================
  // Delete donation (fail/cancel)
  // ===========================
  router.delete("/donations/:tranId", async (req, res) => {
    try {
      const db = await connectDB();
      const donationCollection = db.collection("donations");

      const result = await donationCollection.deleteOne({ tranId: req.params.tranId });
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete donation" });
    }
  });

  return router;
};
