import { useState } from "react";
import { toast } from "react-toastify";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
  });

  const { email, password, confirmPassword, firstname, lastname } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.keys(formData).forEach((key) => {
      formData[key] = formData[key].replace(/\s/g, "");
      if (formData[key] === "") {
        toast.error(`${key} cannot be empty`);
      } else if (key === "firstname" || key === "lastname") {
        const regEx = new RegExp(/^[a-z ,.'-]+$/i);
        regEx.exec(formData[key]) == null &&
          toast.error(`${key} should not contain special characters`);
      }
    });
  };

  return (
    <div className="h-screen w-full mx-auto flex items-center justify-center xl:bg-gray-200 lg:bg-gray-200 md:bg-gray-200 sm:bg-gray-200">
      <div className="h-fit w-fit py-12 px-5 xl:px-20 lg:px-20 md:px-20 sm:px-20 md:px-20 bg-white rounded-lg">
        <h1 className="text-3xl font-bold mb-2 tracking-tighter">
          Create your account
        </h1>
        <h3
          className="text-gray-600
         font-semibold mb-6 text-sm"
        >
          Or{" "}
          <Link to="/sign-in" className="text-indigo-500">
            sign in to an existing account
          </Link>
        </h3>
        <h3 className="text-gray-600 mb-2 font-semibold ">Sign up with</h3>
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
        <form onSubmit={handleSubmit}>
          <div className="flex mb-2 xl:mb-4 lg:mb-4 md:mb-4">
            <div className="mr-2">
              <label
                className="text-gray-600 font-semibold"
                htmlFor="firstname"
              >
                First Name
              </label>
              <input
                className="w-full rounded-lg border-2 border-gray-300 py-2 mt-2 px-2 focus:outline-indigo-500"
                type="text"
                value={firstname}
                id="firstname"
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="ml-2">
              <label className="text-gray-600 font-semibold" htmlFor="lastname">
                Last Name
              </label>
              <input
                className="w-full rounded-lg border-2 border-gray-300 py-2 mt-2 px-2 focus:outline-indigo-500"
                type="text"
                value={lastname}
                id="lastname"
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
          </div>
          <div className="mb-2 xl:mb-4 lg:mb-4 md:mb-4">
            <label className="text-gray-600 font-semibold" htmlFor="email">
              Email address
            </label>
            <input
              className="w-full rounded-lg border-2 border-gray-300 py-2 mt-2 px-2 focus:outline-indigo-500"
              type="email"
              value={email}
              id="email"
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-2 xl:mb-4 lg:mb-4 md:mb-4">
            <label className="text-gray-600 font-semibold" htmlFor="password">
              Password
            </label>
            <input
              className="w-full rounded-lg border-2 border-gray-300 py-2 mt-2 px-2 focus:outline-indigo-500 "
              type="password"
              value={password}
              id="password"
              onChange={handleChange}
              required
              minLength="8"
            />
          </div>
          <div className="mb-2 xl:mb-4 lg:mb-4 md:mb-4 ">
            <label
              className="text-gray-600 font-semibold"
              htmlFor="confirmPassword"
              required
            >
              Confirm Password
            </label>
            <input
              className="w-full rounded-lg border-2 border-gray-300 py-2 mt-2 px-2 focus:outline-indigo-500 "
              type="password"
              value={confirmPassword}
              id="confirmPassword"
              onChange={handleChange}
              required
              minLength="8"
            />
          </div>
          <button className="transition	bg-indigo-500 rounded-lg text-white w-full py-3 font-semibold mt-4 hover:bg-indigo-600">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
