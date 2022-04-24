import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const ForgotPassword = () => {
  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Card>
        <h1 className="text-3xl font-bold mb-2 tracking-tighter">
          Forgot password
        </h1>
        <div>
          <h3 className="text-gray-400 mb-6 ">
            Please enter the email address you use to sign in below.
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 xl:mb-4 lg:mb-4 md:mb-4">
            <label className="text-gray-600 font-semibold" htmlFor="email">
              Email address
            </label>
            <input
              className="w-full rounded-lg border-2 border-gray-300 py-2 mt-2 px-3 focus:outline-indigo-500"
              type="text"
              name="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            className="transition	bg-indigo-500 rounded-lg text-white w-full py-3 font-semibold mt-4 hover:bg-indigo-600 disabled:bg-gray-300"
            disabled={!validEmail ? true : false}
          >
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
      </Card>
    </>
  );
};

export default ForgotPassword;
