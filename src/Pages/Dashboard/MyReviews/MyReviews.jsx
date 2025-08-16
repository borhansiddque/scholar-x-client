import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Provider/AuthProvider";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [editReview, setEditReview] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/my-reviews?email=${user.email}`)
        .then((res) => setReviews(res.data))
        .catch(() => toast.error("Failed to fetch reviews"));
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_API_URL}/delete-review/${id}`
        );
        if (res.data.deletedCount > 0) {
          toast.success("Review deleted");
          setReviews((prev) => prev.filter((r) => r._id !== id));
        }
      } catch {
        toast.error("Delete failed");
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/update-review/${editReview._id}`,
        {
          rating: editReview.rating,
          comment: editReview.comment,
        }
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Your review has been updated.", "success");
        setReviews((prev) =>
          prev.map((r) => (r._id === editReview._id ? editReview : r))
        );
        setEditReview(null);
      }
    } catch {
      toast.error("Update failed");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditReview({ ...editReview, [name]: value });
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      <table className="table w-full table-zebra">
        <thead>
          <tr>
            <th>Scholarship</th>
            <th>University</th>
            <th>Comment</th>
            <th>Review Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-gray-500">
                No reviews found.
              </td>
            </tr>
          ) : (
            reviews.map((review) => (
              <tr key={review._id}>
                <td>{review.scholarshipName}</td>
                <td>{review.universityName}</td>
                <td>{review.comment}</td>
                <td>{review.reviewDate}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => setEditReview(review)}
                    className="btn btn-sm btn-warning text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Modal open={!!editReview} onClose={() => setEditReview(null)} center>
        <h3 className="text-xl font-bold mb-4">Edit Review</h3>
        {editReview && (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <label className="font-semibold">Scholarship</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={editReview.scholarshipName}
              disabled
            />
            <label className="font-semibold">University</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={editReview.universityName}
              disabled
            />
            <label className="font-semibold">Rating</label>
            <input
              type="number"
              name="rating"
              className="input input-bordered w-full"
              min="1"
              max="5"
              value={editReview.rating}
              onChange={handleEditChange}
              required
            />
            <label className="font-semibold">Comment</label>
            <textarea
              name="comment"
              className="textarea textarea-bordered w-full"
              value={editReview.comment}
              onChange={handleEditChange}
              required
            />
            <button type="submit" className="btn btn-primary w-full">
              Update Review
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default MyReviews;
