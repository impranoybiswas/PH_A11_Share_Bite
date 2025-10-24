"use client";

import { useState } from "react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function DonationButton({ amount = 5, disabled }) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const doner = user?.email;

  async function handleDonate() {
    if (!amount || amount <= 0) return toast.error("Amount must be greater than 0");
    if (!user || !doner) return toast.error("Please login to donate");

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount.toString(), doner }),
      });

      const text = await res.text(); // SSLCommerz sometimes returns HTML
      let data;
      try {
        data = JSON.parse(text); // try parse JSON
      } catch (err) {
        console.log("Non-JSON response from SSLCommerz:", text, err);
        toast.error("Payment initiation failed. Check console for details.");
        setLoading(false);
        return;
      }

      if (data?.GatewayPageURL) {
        window.location.href = data.GatewayPageURL;
      } else {
        console.log("SSLCommerz response:", data);
        toast.error("Payment initiation failed!");
      }
    } catch (err) {
      console.error("Donation request error:", err);
      toast.error("Error initiating payment. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      className={`btn btn-secondary w-full mt-3 shadow-none text-white transition-all duration-300 ease-in-out ${
        loading ? "opacity-50 pointer-events-none" : ""
      }`}
      onClick={handleDonate}
      disabled={loading || disabled}
    >
      {loading ? "Processing..." : `Donate ${amount} BDT`}
    </button>
  );
}
