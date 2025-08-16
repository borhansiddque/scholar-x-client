import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../Components/Loading";
import { AuthContext } from "../../Provider/AuthProvider";

const ApplyScholarship = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({});
  const { user } = useContext(AuthContext);
  const imgbbApiKey = import.meta.env.VITE_imgbbApiKey;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/scholarship/${id}`)
      .then((res) => setScholarship(res.data))
      .catch(() => toast.error("Failed to load scholarship"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Start loading

    try {
      // 🔁 Upload photo if needed
      const imageData = new FormData();
      imageData.append("image", formData.photo);
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        imageData
      );
      const photoURL = imgRes.data.data.url;

      const applicationData = {
        ...formData,
        photo: photoURL,
        scholarship_id: id,
        scholarshipName: scholarship.scholarshipName,
        scholarshipCategory: scholarship.scholarshipCategory,
        subjectCategory: scholarship.subjectCategory,
        universityName: scholarship.universityName,
        serviceCharge: scholarship.serviceCharge,
        applicationFees: scholarship.applicationFees,
        applicationDeadline: scholarship.applicationDeadline,
        status: "pending",
        userId: user.uid,
        userName: user.name,
        userEmail: user.email,
        applyDate: new Date(),
      };

      // 🧾 Go to payment first
      const paymentResult = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-payment-intent`,
        {
          amount: scholarship.applicationFees,
          applicationData,
        }
      );

      if (paymentResult.data.url) {
        window.location.href = paymentResult.data.url;
      } else {
        toast.error("Payment initialization failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setSubmitting(false); // Stop loading (in case payment URL fails)
    }
  };

  if (loading) return <Loading />;
  if (!scholarship) return <p>Scholarship not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 bg-white shadow rounded my-10">
      <h2 className="text-xl font-bold mb-6">
        Apply for: {scholarship.scholarshipName}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="phone"
          required
          onChange={handleChange}
          placeholder="Phone Number"
          className="input input-bordered w-full"
        />
        <input
          type="file"
          name="photo"
          accept="image/*"
          required
          onChange={handleChange}
          className="file-input file-input-bordered w-full"
        />
        <input
          type="text"
          name="address"
          required
          onChange={handleChange}
          placeholder="Address (village, district, country)"
          className="input input-bordered w-full"
        />

        <select
          name="gender"
          required
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <select
          name="applyingDegree"
          required
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Degree</option>
          <option>Diploma</option>
          <option>Bachelor</option>
          <option>Masters</option>
        </select>

        <input
          type="text"
          name="sscResult"
          required
          onChange={handleChange}
          placeholder="SSC Result"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="hscResult"
          required
          onChange={handleChange}
          placeholder="HSC Result"
          className="input input-bordered w-full"
        />

        <select
          name="studyGap"
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Study Gap?</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        {/* Read-only values */}
        <input
          type="text"
          value={scholarship.universityName}
          readOnly
          className="input input-bordered w-full"
        />
        <input
          type="text"
          value={scholarship.scholarshipCategory}
          readOnly
          className="input input-bordered w-full"
        />
        <input
          type="text"
          value={scholarship.subjectCategory}
          readOnly
          className="input input-bordered w-full"
        />

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={submitting}
        >
          {submitting ? "Redirecting to Payment..." : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
};

export default ApplyScholarship;
