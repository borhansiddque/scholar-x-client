import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Tooltip } from "react-tooltip";
import Container from "../../../Components/Container";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    loginUser(email, password)
      .then(async (result) => {
        const user = result.user;
        navigate(`${location.state ? location.state : "/"}`);
        toast.success(`You Login Successfully | Welcome ${user.displayName}`);
        const userEmail = {
          email: user.email,
        };
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/users`,
          userEmail
        );
        // console.log("User response from backend:", data);
      })
      .catch((error) => {
        const msg = error?.message || "Login failed due to unknown error";
        setError(
          "Your Login Information is invalid - Please Check Email or Password"
        );
        toast.error(msg);
      });
  };

  return (
    <Container>
      <div className="shadow-md shadow-blue-200 w-full max-w-md mx-auto p-8 rounded my-10">
        <form onSubmit={handleLogin}>
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
            Login to ScholarX
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring focus:border-blue-400"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full mb-6 p-3 border rounded focus:outline-none focus:ring focus:border-blue-400"
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
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white text-lg font-medium py-2 rounded hover:bg-blue-600 transition duration-300 cursor-pointer"
          >
            Log In
          </button>
        </form>

        <SocialLogin></SocialLogin>

        <p className="mt-4 text-center">
          Don't have an Account?{" "}
          <Link
            to={"/register"}
            className="text-blue-500 font-semibold underline"
          >
            Register
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Login;
