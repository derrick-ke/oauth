import { useState, useRef, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { HiEye } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import SocialLinks from "../components/SocialLinks";
import { signInUser } from "../context/user/UserActions";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const Signin = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await signInUser(email, password);

    if (response.status !== "success") {
      setErrMsg("Incorrect email or password");
    }

    navigate("/");
  };

  return (
    <>
      <Card>
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
        <SocialLinks />
        <form onSubmit={handleSubmit}>
          <p
            ref={errRef}
            className={
              errMsg
                ? " flex items-center bg-red-400 rounded-lg px-3 py-4 text-white text-sm mb-5"
                : "hidden"
            }
          >
            <FaInfoCircle className="mr-1" />
            {errMsg}
          </p>
          <div className="my-2 xl:my-5 lg:my-5 md:my-5">
            <label className="text-gray-600 font-semibold" htmlFor="email">
              Email address:
            </label>
            <input
              className="w-full rounded-lg border-2 border-gray-300 py-2 mt-2 px-3 focus:outline-indigo-500"
              type="email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
              ref={emailRef}
            />
          </div>
          <div className="my-2 xl:my-5 lg:my-5 md:my-5 relative">
            <label className="text-gray-600 font-semibold" htmlFor="password">
              Password:
            </label>
            <input
              className="w-full rounded-lg border-2 border-gray-300 py-2 mt-2 pl-3 pr-8 focus:outline-indigo-500 "
              type={showPassword ? "text" : "password"}
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <HiEye
              className="absolute right-3 bottom-3.5 cursor-pointer text-gray-600"
              onClick={() => setShowPassword((prevState) => !prevState)}
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
          <button
            className="transition	bg-indigo-500 rounded-lg text-white w-full py-3 font-semibold mt-4 hover:bg-indigo-600 disabled:bg-gray-300"
            disabled={!validEmail || !password ? true : false}
          >
            Sign in
          </button>
        </form>
      </Card>
    </>
  );
};

export default Signin;
