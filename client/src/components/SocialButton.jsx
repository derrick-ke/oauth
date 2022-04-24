const SocialButton = ({ children }) => {
  return (
    <button className="px-8 border-2 rounded-lg py-2 border-gray-300 text-gray-500 hover:text-indigo-500 hover:shadow">
      {children}
    </button>
  );
};

export default SocialButton;
