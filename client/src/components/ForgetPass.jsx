import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import Button from "../customs/Button";
import Input from "../customs/Input";
import SectionHead from "../customs/SectionHead";

export default function ForgetPass() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForPass = async (e) => {
    e.preventDefault(); // Prevent page reload

    const email = e.target.email.value.trim();
    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
      setMessage("Email sent successfully.");
      e.target.reset(); // Clear form
      document.getElementById("forget_pass").close(); // Close modal AFTER success
    } catch (err) {
      console.error(err);
      setMessage("Failed to send reset email.");
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <span
        className="text-sm text-right hover:underline cursor-pointer p-3 text-blue-500"
        onClick={() => document.getElementById("forget_pass").showModal()}
      >
        Forgot password?
      </span>

      <dialog id="forget_pass" className="modal">
        <div className="modal-box space-y-4">
          <div
            className="text-right cursor-pointer text-sm font-semibold text-gray-500 hover:text-red-500"
            onClick={() => document.getElementById("forget_pass").close()}
          >
            ✕ Close
          </div>

          <SectionHead
            title="Reset Your Password"
            subtitle="Enter your registered email"
          />

          <form
            className="flex flex-col gap-5 min-w-[300px]"
            onSubmit={handleForPass}
          >
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your email"
              required
            />
            {message && <p className="text-primary text-sm">{message}</p>}
            <Button
              type="submit"
              label={loading ? "Sending..." : "Send Reset Link"}
              disabled={loading}
            />
          </form>
        </div>
      </dialog>
    </div>
  );
}
