import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import Loading from "../../Components/Loading";
import useUserRole from "../../hooks/useUserRole";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AuthContext } from "../../Provider/AuthProvider";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const { userRole } = useUserRole();

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/scholarship/${id}`
        );
        setScholarship(res.data);
      } catch (error) {
        console.error("Error fetching scholarship:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [id]);

  useEffect(() => {
    const checkIfApplied = async () => {
      if (user?.email && scholarship?._id) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/check-application`,
            {
              params: {
                email: user.email,
                scholarshipId: scholarship._id,
              },
            }
          );
          setAlreadyApplied(res.data.applied);
        } catch (err) {
          console.error("Error checking application status:", err);
        }
      }
    };

    checkIfApplied();
  }, [user, scholarship]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/reviews-by-scholarship/${id}`
        );
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, [id]);

  if (loading) return <Loading></Loading>;
  if (!scholarship) return <p>Scholarship not found.</p>;

  const {
    scholarshipName,
    universityName,
    universityImage,
    universityCountry,
    universityCity,
    universityRank,
    subjectCategory,
    scholarshipCategory,
    degree,
    tuitionFees,
    applicationFees,
    serviceCharge,
    applicationDeadline,
    postDate,
    stipend,
    scholarshipDescription,
  } = scholarship;

  return (
    <div className="px-4">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md my-12">
        {/* University Info */}
        <p className="bg-blue-600 text-white text-base inline-block px-3 py-1 rounded-sm font-semibold mb-3">
          Rank: {universityRank}
        </p>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={universityImage}
              alt={`${universityName} logo`}
              className="w-20 h-20 object-contain"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
                {universityName}
              </h1>
              <p className="text-gray-600">
                {universityCity}, {universityCountry}
              </p>
            </div>
          </div>
          <p className="text-gray-500 mb-5 text-sm">
            <strong>Post Date:</strong> {postDate}
          </p>
        </div>

        {/* Scholarship Details */}
        <div className="space-y-4 text-gray-700">
          <p>
            <strong>Scholarship Name:</strong> {scholarshipName}
          </p>
          <p>
            <strong>Scholarship Category:</strong> {scholarshipCategory}
          </p>
          <p>
            <strong>Subject:</strong> {subjectCategory}
          </p>
          <p>
            <strong>Degree:</strong> {degree}
          </p>
          <p>
            <strong>Tuition Fees:</strong> {tuitionFees}
          </p>
          <p>
            <strong>Application Fees:</strong> {applicationFees}
          </p>
          <p>
            <strong>Service Charge:</strong> {serviceCharge}
          </p>
          <p>
            <strong>Application Deadline:</strong> {applicationDeadline}
          </p>
          {stipend && (
            <p>
              <strong>Stipend:</strong> {stipend}
            </p>
          )}
          {scholarshipDescription && (
            <div>
              <strong>Description:</strong>
              <p className="mt-1">{scholarshipDescription}</p>
            </div>
          )}
        </div>

        {userRole === "admin" || userRole === "moderator" ? (
          <Link
            to="/dashboard/manage-scholarships"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition mt-6"
          >
            Manage Scholarship
          </Link>
        ) : alreadyApplied ? (
          <button
            disabled
            className="inline-block px-6 py-3 bg-gray-400 text-white rounded mt-6 cursor-not-allowed"
          >
            Already Applied
          </button>
        ) : (
          <Link
            to={`/apply-scholarship/${id}`}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition mt-6"
          >
            Apply for Scholarship
          </Link>
        )}
      </div>

      {reviews.length === 0 && (
        <div className="max-w-4xl mx-auto my-10">
          <h2 className="text-xl font-bold mb-4">Reviews</h2>
          <p className="text-center text-gray-500">
            No reviews available for this scholarship.
          </p>
        </div>
      )}

      {reviews.length > 0 && (
        <div className="max-w-4xl mx-auto my-10">
          <h2 className="text-xl font-bold mb-4">Reviews</h2>
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={3000}
            emulateTouch
          >
            {reviews.map((review) => (
              <div key={review._id} className="p-6 bg-gray-100 rounded shadow">
                <div className="flex flex-col items-center justify-center gap-4 mb-4">
                  <div className="">
                    <img
                      src={review.userImage}
                      alt={review.userName}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  </div>
                  <div className="">
                    <p className="font-semibold">{review.userName}</p>
                    <p className="text-sm text-gray-500">{review.reviewDate}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  <p className="mb-2">
                    <strong>Rating:</strong> ⭐ {review.rating}
                  </p>
                  <p>{review.comment}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default ScholarshipDetails;
