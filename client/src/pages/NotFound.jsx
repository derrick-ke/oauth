import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen w-full mx-auto flex items-center justify-center xl:bg-gray-200 lg:bg-gray-200 md:bg-gray-200 sm:bg-gray-200">
      <div className="h-fit w-fit py-12 px-5 xl:px-20 lg:px-20 md:px-20 sm:px-20 md:px-20 bg-white rounded-lg">
        <h1 className="text-6xl font-bold mb-5">Oops!</h1>
        <p>Can't find what you're looking for.</p>
        <div className="mt-5">
          <Link
            to="/"
            className="flex items-center text-indigo-500 font-semibold text-sm "
          >
            <FaHome className="inline mr-1" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
