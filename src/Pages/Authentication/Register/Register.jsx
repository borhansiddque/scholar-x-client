import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import Container from "../../../Components/Container";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../../Provider/AuthProvider";

const Register = () => {
  const { setUser, registerUser, updateUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const regExUppercase = /(?=.*[A-Z])/;
    const regExLength = /.{6,}/;
    const regExSpecialChar = /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/;

    // Validate password
    if (!regExLength.test(password)) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (!regExUppercase.test(password)) {
      setError("Password must have at least one uppercase letter (A-Z)");
      return;
    }
    if (!regExSpecialChar.test(password)) {
      setError("Password must have at least one special character (!@#$...)");
      return;
    }

    try {
      const result = await registerUser(email, password);
      const user = result.user;

      await updateUser({ displayName: name, photoURL: imageUrl });
      setUser({ ...user, displayName: name, photoURL: imageUrl });
      navigate("/");
      toast.success("Account Create Successfully");

      const userData = {
        name: name || "Anonymous",
        image: imageUrl,
        email: email,
        role: "user",
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData);
    } catch (err) {
      console.error("Caught error:", err);
      const code = err.code;
      let errMsg = err.message || "Registration failed";
      if (code === "auth/email-already-in-use") {
        errMsg = "Email already in use. Please log in.";
      }
      setError(errMsg);
      toast.error(errMsg);
    }
  };

  return (
    <Container>
      <div className="shadow-md shadow-blue-200 w-full max-w-md mx-auto p-8 rounded my-10">
        <form onSubmit={handleRegister}>
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
            Register at ScholarX
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring focus:border-blue-400"
            required
          />

          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full"
              required
            />
            {loadingImage && <p className="text-sm mt-1">Uploading image...</p>}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Uploaded"
                className="w-20 mt-2 rounded"
              />
            )}
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring focus:border-blue-400"
            required
          />

          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-400"
              required
            />
            <div className="absolute top-3 right-2 cursor-pointer">
              <Tooltip id="my-tooltip" />
              {showPassword ? (
                <FaRegEyeSlash
                  size={25}
                  onClick={() => setShowPassword(false)}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Hide Password"
                  data-tooltip-place="top"
                ></FaRegEyeSlash>
              ) : (
                <FaRegEye
                  size={25}
                  onClick={() => setShowPassword(true)}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Show Password"
                  data-tooltip-place="top"
                ></FaRegEye>
              )}
            </div>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white text-lg font-medium py-2 rounded hover:bg-blue-600 transition duration-300 cursor-pointer"
          >
            Register
          </button>
        </form>
        <SocialLogin></SocialLogin>
        <p className="mt-4 text-center">
          Already have an Account?{" "}
          <Link to={"/login"} className="text-blue-500 font-semibold underline">
            Login
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Register;
