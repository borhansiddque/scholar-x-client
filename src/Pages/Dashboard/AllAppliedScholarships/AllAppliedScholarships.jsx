import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const AllAppliedScholarships = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [sortBy, setSortBy] = useState(""); // new

  useEffect(() => {
    fetchApplications();
  }, [sortBy]); // trigger on sort change

  const fetchApplications = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/all-applied-scholarships`,
      { params: { sortBy } }
    );
    setApplications(res.data);
  };

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });
    if (confirm.isConfirmed) {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/update-application/${id}`,
        {
          status: "rejected",
        }
      );
      fetchApplications();
      Swal.fire("Cancelled!", "Application has been rejected.", "success");
    }
  };

  const handleFeedbackSubmit = async () => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/application-feedback/${selectedApp._id}`,
      { feedback: feedbackText }
    );
    setShowFeedback(false);
    setFeedbackText("");
    fetchApplications();
    Swal.fire("Feedback Sent", "Successfully submitted feedback.", "success");
  };

  const handleStatusChange = async (id, newStatus) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/update-application/${id}`,
      {
        status: newStatus,
      }
    );
    fetchApplications();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-5">
        <h2 className="text-xl font-bold">All Applied Scholarships</h2>
        {/* Sorting dropdown */}
        <div className="">
          <select
            className="border p-2 rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">-- Sort By --</option>
            <option value="appliedAt">Sort by Applied Date</option>
            <option value="applicationDeadline">Sort by Deadline</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2">University</th>
              <th>Scholarship</th>
              <th>Degree</th>
              <th>Category</th>
              <th>Status</th>
              <th>Applied At</th>
              <th>Scholarship Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-t">
                <td className="p-2">{app.universityName}</td>
                <td className="p-2">{app.scholarshipName}</td>
                <td className="p-2">{app.applyingDegree}</td>
                <td className="p-2">{app.scholarshipCategory}</td>
                <td className="p-2">
                  {app.status === "rejected" ? (
                    <span className="bg-red-500 text-white p-1 rounded">
                      Rejected
                    </span>
                  ) : (
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(app._id, e.target.value)
                      }
                      className={`border px-2 py-1 rounded ${
                        app.status === "rejected" ? "bg-red-500 text-white" : ""
                      }`}
                      disabled={app.status === "rejected"}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                    </select>
                  )}
                </td>
                <td className="p-2">
                  {new Date(app.appliedAt).toLocaleDateString()}
                </td>
                <td className="p-2">
                  {new Date(app.applicationDeadline).toLocaleDateString()}
                </td>
                <td className="p-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSelectedApp(app);
                      setShowDetails(true);
                    }}
                    className="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => {
                      setSelectedApp(app);
                      setFeedbackText(app.feedback || "");
                      setShowFeedback(true);
                    }}
                    className="px-2 py-1 bg-yellow-500 text-white rounded cursor-pointer"
                  >
                    Feedback
                  </button>
                  <button
                    onClick={() => handleCancel(app._id)}
                    className={`px-2 py-1 bg-red-500 text-white rounded ${
                      app.status === "rejected"
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    disabled={app.status === "rejected"}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      <Modal open={showDetails} onClose={() => setShowDetails(false)} center>
        {selectedApp && (
          <div className="p-2">
            <h3 className="text-lg font-semibold mb-2">Application Details</h3>
            <p>
              <strong>University:</strong> {selectedApp.universityName}
            </p>
            <p>
              <strong>Scholarship:</strong> {selectedApp.scholarshipName}
            </p>
            <p>
              <strong>Degree:</strong> {selectedApp.applyingDegree}
            </p>
            <p>
              <strong>Category:</strong> {selectedApp.scholarshipCategory}
            </p>
            <p>
              <strong>Email:</strong> {selectedApp.userEmail}
            </p>
            <p>
              <strong>Phone:</strong> {selectedApp.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedApp.address}
            </p>
            <p>
              <strong>Gender:</strong> {selectedApp.gender}
            </p>
          </div>
        )}
      </Modal>

      {/* Feedback Modal */}
      <Modal open={showFeedback} onClose={() => setShowFeedback(false)} center>
        <div className="p-2 w-80">
          <h3 className="text-lg font-semibold mb-4">Provide Feedback</h3>
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="w-full border p-2 h-28"
            placeholder="Enter feedback here..."
          ></textarea>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setShowFeedback(false)}
              className="px-3 py-1 bg-gray-400 text-white rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleFeedbackSubmit}
              className="px-3 py-1 bg-green-500 text-white rounded cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AllAppliedScholarships;
