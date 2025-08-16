import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddScholarshipForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  const imgbbApiKey = import.meta.env.VITE_imgbbApiKey;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setLoadingImage(true);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );
      setImageUrl(response.data.data.url);
      toast.success("Image uploaded!");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Image upload failed.");
    } finally {
      setLoadingImage(false);
    }
  };

  const handleAddScholarship = async (e) => {
    e.preventDefault();
    const form = e.target;

    const scholarshipData = {
      scholarshipName: form.scholarshipName.value,
      universityName: form.universityName.value,
      universityImage: imageUrl,
      universityCountry: form.universityCountry.value,
      universityCity: form.universityCity.value,
      universityRank: form.universityRank.value,
      subjectCategory: form.subjectCategory.value,
      scholarshipCategory: form.scholarshipCategory.value,
      degree: form.degree.value,
      tuitionFees: form.tuitionFees.value || null,
      applicationFees: form.applicationFees.value,
      serviceCharge: form.serviceCharge.value,
      applicationDeadline: form.applicationDeadline.value,
      postDate: form.postDate.value,
      postedUserEmail: form.postedUserEmail.value,
      scholarshipDescription: form.scholarshipDescription.value,
    };

    if (!imageUrl) {
      toast.error("Please upload the university image/logo.");
      return;
    }

    // Send Scholar Data Backend
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/scholarships`,
        scholarshipData
      );
      // console.log("Scholarship submitted:", response.data);
      toast.success("Scholarship submitted successfully!");
    } catch (error) {
      console.error(
        "Error adding scholarship:",
        error.response?.data || error.message
      );
    } finally {
      setImageUrl("");
    }
    form.reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg my-10 md:my-20">
      <h2 className="text-3xl font-bold mb-5 text-blue-500 text-center">
        Add New Scholarship
      </h2>

      <form
        onSubmit={handleAddScholarship}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="">
          <label className="text-sm font-semibold text-gray-500">
            Scholarship Name
          </label>
          <input
            type="text"
            name="scholarshipName"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>
        <div className="">
          <label className="text-sm font-semibold text-gray-500">
            University Name
          </label>

          <input
            type="text"
            name="universityName"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="text-sm font-semibold text-gray-500">
            Upload University Logo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full mt-1"
            required
          />
          {loadingImage && <p className="text-sm mt-1">Uploading image...</p>}
          {imageUrl && (
            <img src={imageUrl} alt="Uploaded" className="w-20 mt-2 rounded" />
          )}
        </div>

        <div className="">
          <label className="text-sm font-semibold text-gray-500">
            University Country
          </label>
          <input
            type="text"
            name="universityCountry"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>
        <div className="">
          <label className="text-sm font-semibold text-gray-500">
            University City
          </label>
          <input
            type="text"
            name="universityCity"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>
        <div className="">
          <label className="text-sm font-semibold text-gray-500">
            University World Rank
          </label>
          <input
            type="number"
            name="universityRank"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>

        <div className="">
          <label className="text-sm font-semibold text-gray-500">
            Subject Category
          </label>
          <select
            name="subjectCategory"
            className="select select-bordered w-full mt-1"
            required
          >
            <option value="" disabled>
              Select Subject Category
            </option>
            <option value={"Agriculture"}>Agriculture</option>
            <option value={"Engineering"}>Engineering</option>
            <option value={"Doctor"}>Doctor</option>
          </select>
        </div>

        <div className="">
          <label className="text-sm font-semibold text-gray-500">
            Scholarship Category
          </label>
          <select
            name="scholarshipCategory"
            className="select select-bordered w-full mt-1"
            required
          >
            <option value="" disabled>
              Select Scholarship Category
            </option>
            <option value={"Full Fund"}>Full Fund</option>
            <option value={"Partial"}>Partial</option>
            <option value={"Self-Fund"}>Self-Fund</option>
          </select>
        </div>

        <div className="">
          <label className="text-sm font-semibold text-gray-500">Degree</label>
          <select
            name="degree"
            className="select select-bordered w-full mt-1"
            required
          >
            <option value="" disabled>
              Select Degree
            </option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>

        <div className="">
          <label className="text-sm font-semibold text-gray-500">
            Tuition Fees (optional)
          </label>
          <input
            type="number"
            name="tuitionFees"
            className="input input-bordered w-full mt-1"
          />
        </div>
        <div className="">
          <label className="text-sm font-semibold text-gray-500">
            Application Fees
          </label>
          <input
            type="number"
            name="applicationFees"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>
        <div className="">
          <label className="text-sm font-semibold text-gray-500">
            Service Charge
          </label>
          <input
            type="number"
            name="serviceCharge"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>
        <div className="">
          <label className="text-sm font-semibold text-gray-500">
            Application Deadline
          </label>

          <input
            type="date"
            name="applicationDeadline"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>
        <div className="">
          <label className="text-sm font-semibold text-gray-500">
            Post Date
          </label>
          <input
            type="date"
            name="postDate"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>
        <div className="">
          <label className="text-sm font-semibold text-gray-500">
            Posted User Email
          </label>
          <input
            type="email"
            name="postedUserEmail"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="text-sm font-semibold text-gray-500">
            Scholarship Description
          </label>
          <textarea
            name="scholarshipDescription"
            className="textarea w-full"
            placeholder="Scholarship Description"
            rows={5}
          ></textarea>
        </div>

        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="btn w-full border-none bg-blue-500 hover:bg-blue-600 text-white shadow-none hover:shadow-md hover:shadow-blue-600 transition-all duration-300"
          >
            Submit Scholarship
          </button>
        </div>
      </form>
    </div>
  );
}
