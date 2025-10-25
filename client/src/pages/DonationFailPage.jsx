import { useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function DonationFailPage() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Dontation Failed!");
    setTimeout(() => navigate("/"), 2000);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-2">
      <div className="loading loading-ring loading-lg loading-error"></div>
      <h2 className="md:text-2xl font-semibold">Processing your donation...</h2>
    </div>
  );
}
