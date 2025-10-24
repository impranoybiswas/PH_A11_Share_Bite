import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import toast from "react-hot-toast";

export default function DonationSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tranId = searchParams.get("tran_id");
    if (tranId) {
      fetch(`${import.meta.env.VITE_SERVER_URL}/donations/${tranId}/success`, { method: "PATCH" })
        .then(() => {
          toast.success("Payment Successful!");
          setTimeout(() => navigate("/"), 2000);
        })
        .catch(() => {
          toast.error("Failed to update donation");
          setTimeout(() => navigate("/"), 2000);
        });
    } else {
      navigate("/");
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h2 className="text-2xl font-semibold">Processing your donation...</h2>
    </div>
  );
}
