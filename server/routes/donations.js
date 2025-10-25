import express from "express";
import { ObjectId } from "mongodb";

export default (connectDB) => {
  const router = express.Router();

  // ===========================
  // Create donation payment
  // ===========================
  router.post("/", async (req, res) => {
    try {
      const { amount, doner } = req.body;

      if (!amount || !doner) {
        return res
          .status(400)
          .json({ message: "Missing fields: amount or doner" });
      }

      if (
        !process.env.SSLC_STORE_ID ||
        !process.env.SSLC_STORE_PASS ||
        !process.env.CLIENT_URL
      ) {
        return res
          .status(500)
          .json({ message: "Missing SSLCommerz environment variables" });
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
        success_url: `${process.env.BASE_URL}/donations/success/${tranId}`,
        fail_url: `${process.env.BASE_URL}/donations/fail/${tranId}`,
        cancel_url: `${process.env.BASE_URL}/donations/fail/${tranId}`,
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
      const response = await fetch(
        "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
        {
          method: "POST",
          body: new URLSearchParams(payload),
        }
      );

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
      return res
        .status(500)
        .json({ message: "Payment initiation failed", error: err.message });
    }
  });

  // ===========================
  // Mark donation as success
  // ===========================
  router.post("/success/:tranId", async (req, res) => {
    try {
      const { tranId } = req.params;
      const db = await connectDB();
      const donationCollection = db.collection("donations");

      await donationCollection.updateOne(
        { tranId },
        { $set: { status: "success" } }
      );

      // ✅ এখন redirect করো frontend এ
      return res.redirect(`${process.env.CLIENT_URL}/donation-success`);
    } catch (error) {
      console.error("Redirect error:", error);
      res
        .status(500)
        .json({ message: "Redirection failed", error: error.message });
    }
  });

  // ===========================
  // Delete donation (Fail / Cancel)
  // ===========================
  router.post("/fail/:tranId", async (req, res) => {
    try {
      const { tranId } = req.params;
      const db = await connectDB();
      const donationCollection = db.collection("donations");

      // Delete the pending donation
      const result = await donationCollection.deleteOne({ tranId });

      console.log(`❌ Donation failed/canceled: ${tranId}`);

      // Redirect user back to client
      return res.redirect(`${process.env.CLIENT_URL}/donation-fail`);
    } catch (err) {
      console.error("Failed to delete donation:", err);
      res
        .status(500)
        .json({ message: "Failed to delete donation", error: err.message });
    }
  });

  return router;
};
