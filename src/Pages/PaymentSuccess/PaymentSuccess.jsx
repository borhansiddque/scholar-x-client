import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasSubmitted = useRef(false);

  const data = searchParams.get("data");

  useEffect(() => {
    if (!data || hasSubmitted.current) return;

    hasSubmitted.current = true;

    let parsedData;
    try {
      parsedData = JSON.parse(decodeURIComponent(data));
    } catch (error) {
      console.error("Invalid data parameter:", error);
      toast.error("Invalid payment data");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_API_URL}/applied-scholarships`, parsedData)
      .then(() => {
        toast.success("Application submitted successfully!");
        navigate("/dashboard/my-applications");
      })
      .catch((error) => {
        console.error("Submission error:", error);
        toast.error("Failed to save application");
      });
  }, [data, navigate]);

  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold text-green-600">
        Processing your application...
      </h2>
    </div>
  );
};

export default PaymentSuccess;
