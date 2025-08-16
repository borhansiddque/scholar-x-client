import React, { useEffect, useState } from "react";
import Container from "../../Components/Container";
import axios from "axios";
import { Link } from "react-router";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 6; // cards per page

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/scholarships?page=${currentPage}&limit=${limit}&search=${searchTerm}`
        );
        setScholarships(res.data.scholarships);
        setTotalCount(res.data.totalCount);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      }
    };
    fetchScholarships();
  }, [currentPage, searchTerm]); // 👈 fetch again when searchTerm changes

  const filteredScholarships = scholarships.filter((scholarship) => {
    const term = searchTerm.toLowerCase();
    return (
      scholarship.scholarshipName.toLowerCase().includes(term) ||
      scholarship.universityName.toLowerCase().includes(term) ||
      scholarship.degree.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-7xl mx-auto min-h-[75vh] my-10">
      <h2 className="text-4xl font-bold mb-4 text-center">All Scholarships</h2>

      {/* Search Input */}
      <div className="flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Search by Scholarship, University, or Degree"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 sm:w-1/2"
        />
      </div>

      {filteredScholarships.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-2xl font-semibold text-gray-700 mb-2">
            No Data Found
          </p>
          <p className="text-gray-500">
            Try adjusting your filters or search criteria.
          </p>
        </div>
      ) : (
        <>
          {/* Scholarship Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {filteredScholarships.map((scholarship) => (
              <div
                key={scholarship._id}
                className="border rounded-lg shadow p-4 bg-white"
              >
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={scholarship.universityImage}
                    alt={scholarship.universityName}
                    className="h-16 w-16 mb-2 rounded-full"
                  />
                  <h3 className="text-xl font-semibold text-blue-600 text-center">
                    {scholarship.scholarshipName}
                  </h3>
                </div>
                <div className="my-5">
                  <h3 className="text-lg">
                    <strong>University:</strong> {scholarship.universityName}
                  </h3>
                  <p className="text-gray-700 mb-1">
                    <strong>Degree:</strong> {scholarship.degree}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Scholarship Category:</strong>{" "}
                    {scholarship.scholarshipCategory}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Location:</strong> {scholarship.universityCity},{" "}
                    {scholarship.universityCountry}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Application Deadline:</strong>{" "}
                    {scholarship.applicationDeadline}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Subject Category:</strong>{" "}
                    {scholarship.subjectCategory}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Application Fees:</strong> $
                    {scholarship.applicationFees}
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Rating:</strong>{" "}
                    {/* You’ll want to compute actual rating averages here */}
                    {scholarship.ratingPoint
                      ? scholarship.ratingPoint.toFixed(1)
                      : "No ratings"}
                  </p>
                </div>
                <Link
                  to={`/scholarship/${scholarship._id}`}
                  className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300"
                >
                  Scholarship Details
                </Link>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed "
            >
              Prev
            </button>

            <span className="px-4 py-2 text-lg font-medium">
              Page {currentPage} of {Math.ceil(totalCount / limit)}
            </span>

            <button
              disabled={currentPage === Math.ceil(totalCount / limit)}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllScholarships;
