import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Provider/AuthProvider";

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editApp, setEditApp] = useState(null);
  const [viewApp, setViewApp] = useState(null);
  const [reviewApp, setReviewApp] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/applied-scholarships?email=${
            user.email
          }`
        )
        .then((res) => setApplications(res.data))
        .catch(() => toast.error("Failed to load applications"))
        .finally(() => setLoading(false));
    }
  }, [user]);
  // console.log(reviewApp);
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const today = new Date();
    const reviewDate = today.toLocaleDateString("en-CA");

    const reviewData = {
      universityId: reviewApp.scholarship_id || "", // make sure your data includes this
      universityName: reviewApp.universityName,
      scholarshipName: reviewApp.scholarshipName,
      subjectCategory: reviewApp.subjectCategory,
      rating,
      comment,
      reviewDate,
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL || "",
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-review`,
        reviewData
      );
      if (res.data.insertedId) {
        toast.success("Review submitted successfully!");
        setReviewApp(null);
        setRating("");
        setComment("");
      }
    } catch {
      toast.error("Failed to submit review");
    }
  };

  const handleCancel = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel it!",
      });

      if (confirm.isConfirmed) {
        const res = await axios.delete(
          `${import.meta.env.VITE_API_URL}/cancel-application/${id}`
        );
        if (res.data.deletedCount > 0) {
          toast.success("Application removed successfully");
          setApplications((prev) => prev.filter((app) => app._id !== id));
        } else {
          toast.error("Failed to delete application");
        }
      }
    } catch (err) {
      toast.error("Error occurred while cancelling");
    }
  };

  const handleEdit = (app) => {
    if (app.status === "pending") {
      setEditApp(app);
    } else {
      Swal.fire(
        "Not Allowed",
        "You can't edit this application as it is processing or completed.",
        "warning"
      );
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/update-application/${editApp._id}`,
        editApp
      );
      if (res.data.modifiedCount > 0) {
        toast.success("Application updated");
        setApplications((prev) =>
          prev.map((app) => (app._id === editApp._id ? { ...editApp } : app))
        );
        setEditApp(null);
      }
    } catch {
      toast.error("Update failed");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditApp({ ...editApp, [name]: value });
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>
      <table className="table w-full table-zebra">
        <thead>
          <tr>
            <th>University</th>
            <th>Address</th>
            <th>Subject</th>
            <th>Degree</th>
            <th>Fees</th>
            <th>Service</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 && (
            <tr>
              <td colSpan="9" className="text-center text-gray-500 text-xl">
                No applications found.
              </td>
            </tr>
          )}
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.universityName}</td>
              <td>{app.address || "N/A"}</td>
              <td>{app.subjectCategory}</td>
              <td>{app.applyingDegree}</td>
              <td>${app.applicationFees}</td>
              <td>${app.serviceCharge}</td>
              <td>
                <span
                  className={`badge text-white ${
                    {
                      pending: "bg-yellow-500",
                      processing: "bg-blue-500",
                      completed: "bg-green-600",
                      rejected: "bg-red-600",
                    }[app.status]
                  }`}
                >
                  {app.status}
                </span>
              </td>
              <td>{app.feedback || "N/A"}</td>
              <td className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setViewApp(app)}
                  className="btn btn-sm btn-info text-white"
                >
                  Details
                </button>
                <button
                  onClick={() => handleEdit(app)}
                  className="btn btn-sm btn-warning text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCancel(app._id)}
                  disabled={["completed", "rejected"].includes(app.status)}
                  className="btn btn-sm btn-error text-white"
                >
                  Cancel
                </button>
                <button
                  className="btn btn-sm btn-success text-white"
                  onClick={() => setReviewApp(app)}
                >
                  Add Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Details Modal */}
      <Modal open={!!viewApp} onClose={() => setViewApp(null)} center>
        <h3 className="text-xl font-bold mb-4">Application Details</h3>
        {viewApp && (
          <div className="space-y-2">
            <p>
              <strong>University:</strong> {viewApp.universityName}
            </p>
            <p>
              <strong>Address:</strong> {viewApp.address}
            </p>
            <p>
              <strong>Degree:</strong> {viewApp.applyingDegree}
            </p>
            <p>
              <strong>Subject:</strong> {viewApp.subjectCategory}
            </p>
            <p>
              <strong>Fees:</strong> ${viewApp.applicationFees}
            </p>
            <p>
              <strong>Status:</strong> {viewApp.status}
            </p>
            <p>
              <strong>Feedback:</strong> {viewApp.feedback || "N/A"}
            </p>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal open={!!editApp} onClose={() => setEditApp(null)} center>
        <h3 className="text-xl font-bold mb-4">Edit Application</h3>
        {editApp && (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <label className="font-semibold">Address</label>
            <input
              type="text"
              name="address"
              className="input input-bordered w-full mt-1"
              value={editApp.address || ""}
              onChange={handleEditChange}
              placeholder="Address"
              required
            />
            <label className="font-semibold">Phone Number</label>
            <input
              type="text"
              name="phone"
              className="input input-bordered w-full mt-1"
              value={editApp.phone || ""}
              onChange={handleEditChange}
              placeholder="Phone Number"
              required
            />
            <label className="font-semibold">SSC Result</label>

            <input
              type="text"
              name="sscResult"
              className="input input-bordered w-full mt-1"
              value={editApp.sscResult || ""}
              onChange={handleEditChange}
              placeholder="SSC Result"
              required
            />
            <label className="font-semibold">HSC Result</label>

            <input
              type="text"
              name="hscResult"
              className="input input-bordered w-full mt-1"
              value={editApp.hscResult || ""}
              onChange={handleEditChange}
              placeholder="HSC Result"
              required
            />
            <button type="submit" className="btn btn-primary w-full">
              Update
            </button>
          </form>
        )}
      </Modal>
      {/* Review Modal */}
      <Modal open={!!reviewApp} onClose={() => setReviewApp(null)} center>
        <h3 className="text-xl font-bold mb-4">Add Review</h3>
        {reviewApp && (
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <p>
              <strong>Scholarship:</strong> {reviewApp.scholarshipName}
            </p>
            <p>
              <strong>University:</strong> {reviewApp.universityName}
            </p>
            <label className="block font-semibold">Rating (1 to 5)</label>
            <input
              type="number"
              min="1"
              max="5"
              className="input input-bordered w-full"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
            <label className="block font-semibold">Comment</label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              placeholder="Write your review..."
            />
            <button type="submit" className="btn btn-primary w-full">
              Submit Review
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default MyApplications;
