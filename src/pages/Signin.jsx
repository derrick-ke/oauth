import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div className="h-screen w-full mx-auto flex items-center justify-center xl:bg-gray-200 lg:bg-gray-200 md:bg-gray-200 sm:bg-gray-200">
      <div className="h-fit w-fit py-12 px-5 xl:px-20 lg:px-20 md:px-20 sm:px-20 md:px-20 bg-white rounded-lg">
        <h1 className="text-3xl font-bold mb-2 tracking-tighter">
          Sign in to your account
        </h1>
        <h3
          className="text-gray-600
         font-semibold mb-6 text-sm"
        >
          Or{" "}
          <Link to="/sign-up" className="text-indigo-500">
            create a new account
          </Link>
        </h3>
        <h3 className="text-gray-600 mb-2 font-semibold ">Sign in with</h3>
        <div className="flex justify-between mb-7">
          <button className="px-8 border-2 rounded-lg py-2 border-gray-300 text-gray-500 hover:text-indigo-500 ">
            <FaFacebook className=" text-2xl " />
          </button>
          <button className="px-8 border-2 rounded-lg py-2 border-gray-300 text-gray-500 hover:text-indigo-500 ">
            <FaGoogle className=" text-2xl " />
          </button>
          <button className="px-8 border-2 rounded-lg py-2 border-gray-300 text-gray-500 hover:text-indigo-500 ">
            <FaGithub className=" text-2xl " />
          </button>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="h-0.5 w-full grow bg-gray-400"></span>
          <span className="w-fit grow-0 shrink-0 text-center text-gray-400 text-sm mx-3">
            Or continue with
          </span>
          <span className="h-0.5 w-full grow bg-gray-400"></span>
        </div>
        <form>
          <div className="my-2 xl:my-5 lg:my-5 md:my-5">
            <label className="text-gray-600 font-semibold" htmlFor="email">
              Email address
            </label>
            <input
              className="w-full rounded-lg border-2 border-gray-300 py-2 mt-2 px-3 focus:outline-indigo-500"
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className="my-2 xl:my-5 lg:my-5 md:my-5">
            <label className="text-gray-600 font-semibold" htmlFor="password">
              Password
            </label>
            <input
              className="w-full rounded-lg border-2 border-gray-300 py-2 mt-2 px-3 focus:outline-indigo-500 "
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="w-full text-right my-5">
            <Link
              className="font-semibold text-indigo-500 text-sm"
              to="/forgot-password"
            >
              Forgot your password?
            </Link>
          </div>
          <button className="bg-indigo-500 rounded-lg text-white w-full py-3 font-semibold">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
