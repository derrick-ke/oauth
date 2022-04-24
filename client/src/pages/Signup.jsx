import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { HiEye } from "react-icons/hi";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import SocialLinks from "../components/SocialLinks";
import InputError from "../components/InputError";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const Signup = () => {
  //create ref from firstname
  const firstnameRef = useRef();

  //create state for the fields
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // create useeffect for focussing on firstname

  useEffect(() => {
    firstnameRef.current.focus();
  }, []);

  // create useeffect for validating fields

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    const match = confirmPassword === password;
    console.log(match);
    setValidConfirmPassword(match);
  }, [password, confirmPassword]);

  //handle form submittion
  const handleSubmit = () => {};

  return (
    <>
      <Card>
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
        <SocialLinks />
        <form className="w-80" onSubmit={handleSubmit}>
          <div className="flex mb-2 xl:mb-4 lg:mb-4 md:mb-4">
            <div className="mr-1">
              <label
                className="text-gray-600 font-semibold"
                htmlFor="firstname"
              >
                First Name
              </label>
              <input
                className="w-full rounded-lg border-2 border-gray-300 py-2 mt-2 px-2 focus: outline-gray-400"
                type="text"
                value={firstname}
                id="firstname"
                onChange={(e) => setFirstName(e.target.value)}
                required
                autoComplete="off"
                ref={firstnameRef}
              />
            </div>
            {}
            <div className="ml-1">
              <label className="text-gray-600 font-semibold" htmlFor="lastname">
                Last Name
              </label>
              <input
                className="w-full rounded-lg border-2 border-gray-300 py-2 mt-2 px-2 focus: outline-gray-400"
                type="text"
                value={lastname}
                id="lastname"
                onChange={(e) => setLastName(e.target.value)}
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
              className="w-full rounded-lg border-2 border-gray-300 py-2 mt-2 px-2 focus: outline-gray-400"
              type="email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            {!validEmail && email && !emailFocus && (
              <InputError>Please enter a valid email</InputError>
            )}
          </div>
          <div className="mb-2 xl:mb-4 lg:mb-4 md:mb-4 ">
            <label className="text-gray-600 font-semibold" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="w-full rounded-lg border-2 border-gray-300 py-2 mt-2 px-2 focus: outline-gray-400 "
                type={showPassword ? "text" : "password"}
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <HiEye
                className="absolute right-3 bottom-3.5 cursor-pointer text-gray-600"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
            {!validPassword && password && !passwordFocus && (
              <InputError>
                Minimum eight characters, at least one letter and one number
              </InputError>
            )}
          </div>
          <div className="mb-2 xl:mb-4 lg:mb-4 md:mb-4 relative">
            <label
              className="text-gray-600 font-semibold"
              htmlFor="confirmPassword"
              required
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="w-full rounded-lg border-2 border-gray-300 py-2 mt-2 px-2 focus: outline-gray-400"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="8"
                onFocus={() => setConfirmPasswordFocus(true)}
                onBlur={() => setConfirmPasswordFocus(false)}
                onPaste={(e) => {
                  e.preventDefault();
                  return false;
                }}
              />
              <HiEye
                className="absolute right-3 bottom-3.5 cursor-pointer text-gray-600"
                onClick={() =>
                  setShowConfirmPassword((prevState) => !prevState)
                }
              />
            </div>
            {!validConfirmPassword && confirmPassword && (
              <InputError>Passwords must match</InputError>
            )}
          </div>
          <button
            className="transition	bg-indigo-500 rounded-lg text-white w-full py-3 font-semibold mt-4 hover:bg-indigo-600 disabled:bg-gray-300"
            disabled={
              !firstname ||
              !lastname ||
              !validEmail ||
              !validPassword ||
              !validConfirmPassword
                ? true
                : false
            }
          >
            Sign up
          </button>
        </form>
      </Card>
    </>
  );
};

export default Signup;
