import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="h-screen w-full mx-auto flex items-center justify-center xl:bg-gray-200 lg:bg-gray-200 md:bg-gray-200 sm:bg-gray-200">
      <div className="h-fit w-fit py-12 px-5 xl:px-20 lg:px-20 md:px-20 sm:px-20 md:px-20 bg-white rounded-lg">
        <h1 className="text-3xl font-bold mb-2 tracking-tighter">
          Forgot password
        </h1>
        <div>
          <h3
            className="text-gray-500
      mb-6 text-sm"
          >
            Please enter the email address you use to sign in below.
          </h3>
        </div>
        <form>
          <div className="mb-2 xl:mb-4 lg:mb-4 md:mb-4">
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
          <button className="bg-indigo-500 rounded-lg text-white w-full py-3 font-semibold my-4">
            Request Password Reset
          </button>
        </form>
        <div className="mt-5 text-center">
          <Link
            to="/sign-in"
            className="text-indigo-500 font-semibold text-sm "
          >
            Back to Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
