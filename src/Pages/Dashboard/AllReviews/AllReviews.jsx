import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/all-reviews`)
      .then((res) => setReviews(res.data))
      .catch(() => toast.error("Failed to load reviews"));
  }, []);

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
        } else {
          toast.error("Failed to delete");
        }
      } catch {
        toast.error("Error deleting review");
      }
    }
  };

  return (
    <div className="p-6">
      {reviews.length <= 0 ? (
        <div className="col-span-3 text-center">
          <p className="text-gray-500 text-3xl">No reviews available</p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">All Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border p-4 rounded-lg shadow-md bg-white space-y-2"
              >
                <h3 className="text-lg font-semibold">
                  🎓 {review.universityName}
                </h3>
                <p className="text-sm text-gray-500">
                  Subject: {review.subjectCategory || "N/A"}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={review.userImage || "/default-user.png"}
                    alt="Reviewer"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{review.userName}</p>
                    <p className="text-sm text-gray-400">
                      {review.reviewDate || "N/A"}
                    </p>
                  </div>
                </div>
                <p className="text-yellow-600 font-semibold">
                  ⭐ Rating: {review.rating}
                </p>
                <p className="italic text-gray-700">"{review.comment}"</p>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="btn btn-sm btn-error text-white mt-3"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllReviews;
