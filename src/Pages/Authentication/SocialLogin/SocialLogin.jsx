import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";

const SocialLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = () => {
    googleLogin()
      .then(async (result) => {
        const user = result.user;
        // console.log(user);
        const userData = {
          name: user.displayName || "Anonymous",
          image: user.photoURL,
          email: user.email,
          role: "user",
        };

        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/users`,
            userData
          );
          // console.log("User response from backend:", data);
          navigate(`${location.state ? location.state : "/"}`);
          toast.success(`Welcome ${user.displayName} | You Login Successfully`);
        } catch (error) {
          console.error(
            "Error saving user:",
            error.response?.data || error.message
          );
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div>
      <div className="divider">OR</div>
      <div className="w-full md:w-3/4 mx-auto">
        <button
          onClick={handleGoogleLogin}
          className="btn bg-white text-black border-[#e5e5e5] w-full"
        >
          <FcGoogle size={25}></FcGoogle>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
