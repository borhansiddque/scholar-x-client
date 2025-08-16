import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import Loading from "../../Components/Loading";

const TopScholarships = () => {
  const [topScholarships, setTopScholarships] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopScholarships = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/scholarships/top`
        );
        setTopScholarships(res.data);
      } catch (error) {
        console.error("Error fetching top scholarships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopScholarships();
  }, []);

  return (
    <section className="mt-20 px-4 md:px-3">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
        Top Scholarships
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
            {topScholarships.map((scholarship) => (
              <div
                key={scholarship._id}
                className="border border-gray-200 rounded-lg shadow p-4 bg-white flex flex-col"
              >
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={scholarship.universityImage}
                    alt={scholarship.universityName}
                    className="h-16 w-16 mb-2 rounded-full"
                  />
                  <h3 className="text-lg font-semibold text-blue-600">
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
                  className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300 text-center"
                >
                  Scholarship Details
                </Link>
              </div>
            ))}
          </div>

          {topScholarships.length === 6 && (
            <div className="text-center">
              <Link to="/scholarships">
                <button className="px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                  All Scholarships
                </button>
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default TopScholarships;
