const Card = ({ children }) => {
  return (
    <div className="h-fit w-90 xl:w-fit lg:w-fit md:w-fit sm:w-fit py-12 px-5 xl:px-20 lg:px-20 md:px-20 sm:px-20 md:px-20 bg-white rounded-lg">
      {children}
    </div>
  );
};

export default Card;
