import { useNavigate, useLocation } from "react-router-dom";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import SocialButton from "./SocialButton";

const SocialLinks = () => {
  const location = useLocation();
  return (
    <>
      <h3 className="text-gray-600 mb-2 font-semibold ">
        Sign {location.pathname === "/sign-up" ? "up" : "in"} with
      </h3>
      <div className="flex justify-between mb-7">
        <SocialButton>
          <FaFacebook className=" text-2xl " />
        </SocialButton>
        <SocialButton>
          <FaGoogle className=" text-2xl " />
        </SocialButton>
        <SocialButton>
          <FaGithub className=" text-2xl " />
        </SocialButton>
      </div>
      <div className="flex justify-between items-center mb-6">
        <span className="h-0.5 w-full grow bg-gray-400"></span>
        <span className="w-fit grow-0 shrink-0 text-center text-gray-400 text-sm mx-3">
          Or continue with
        </span>
        <span className="h-0.5 w-full grow bg-gray-400"></span>
      </div>
    </>
  );
};

export default SocialLinks;
