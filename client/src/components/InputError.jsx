import { FaInfoCircle } from "react-icons/fa";

const InputError = ({ children }) => {
  return (
    <p className="text-sm text-red-500 font-semibold flex ml-1">{children}</p>
  );
};

export default InputError;
