import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaInfoCircle } from "react-icons/fa";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [modalMode, setModalMode] = useState("view"); // 'view' or 'edit'
  const [open, setOpen] = useState(false);

  // console.log(scholarships);
  

  const fetchScholarships = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/all-scholarships`);
      setScholarships(res.data.scholarships);
      
    } catch (err) {
      toast.error("Failed to fetch scholarships.");
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  const openModal = (scholarship, mode) => {
    setSelectedScholarship({ ...scholarship });
    setModalMode(mode);
    setOpen(true);
  };

  const closeModal = () => {
    setSelectedScholarship(null);
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedScholarship((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/scholarships/${selectedScholarship._id}`, selectedScholarship);
      toast.success("Scholarship updated successfully!");
      fetchScholarships();
      closeModal();
    } catch {
      toast.error("Failed to update scholarship.");
    }
  };

  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/scholarships/${id}`);
      toast.success("Scholarship deleted.");
      fetchScholarships();
    } catch {
      toast.error("Failed to delete.");
    }
  }
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Scholarships</h2>
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Scholarship</th>
              <th className="p-2">University</th>
              <th className="p-2">Subject</th>
              <th className="p-2">Degree</th>
              <th className="p-2">App. Fee</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              scholarships.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-xl">No scholarships available.</td>
                </tr>
              )
            }
            {scholarships.map((s) => (
              <tr key={s._id} className="text-center border-t">
                <td className="p-2 max-w-[200px] truncate whitespace-nowrap overflow-hidden text-ellipsis">{s.scholarshipName}</td>
                <td className="p-2 max-w-[180px] truncate whitespace-nowrap overflow-hidden text-ellipsis">{s.universityName}</td>
                <td className="p-2">{s.subjectCategory}</td>
                <td className="p-2">{s.degree}</td>
                <td className="p-2">${s.applicationFees}</td>
                <td className="p-2 flex gap-3 justify-center items-center">
                  <button onClick={() => openModal(s, "view")} className="text-blue-600 cursor-pointer">
                    <FaInfoCircle />
                  </button>
                  <button onClick={() => openModal(s, "edit")} className="text-green-600 cursor-pointer">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(s._id)} className="text-red-600 cursor-pointer">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View/Edit Modal */}
      <Modal open={open} onClose={closeModal} center classNames={{ modal: "w-[800px] max-w-[95vw]" }}>
        {selectedScholarship && (
          <div className="space-y-3 max-h-[80vh] overflow-y-auto p-2">
            <h3 className="text-xl font-bold mb-2 capitalize">
              {modalMode === "view" ? "Scholarship Details" : "Edit Scholarship"}
            </h3>

            {Object.entries(selectedScholarship).map(([key, value]) => {
              if (key === "_id") return null;
              return modalMode === "view" ? (
                <div key={key}>
                  <strong>{key}:</strong> {value}
                </div>
              ) : (
                <div key={key}>
                  <label className="block text-sm font-medium mb-1">{key}</label>
                  <input
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
              );
            })}

            {modalMode === "edit" && (
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded mt-4"
              >
                Update
              </button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManageScholarships;
