import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import toast from "react-hot-toast";

export default function DonationFailCancelPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tranId = searchParams.get("tran_id");
    if (tranId) {
      fetch(`${import.meta.env.VITE_SERVER_URL}/donations/${tranId}`, { method: "DELETE" })
        .then(() => {
          toast.error("Payment Failed or Cancelled");
          setTimeout(() => navigate("/"), 2000);
        })
        .catch(() => {
          toast.error("Failed to delete donation");
          setTimeout(() => navigate("/"), 2000);
        });
    } else {
      navigate("/");
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h2 className="text-2xl font-semibold">Your donation could not be processed.</h2>
    </div>
  );
}
