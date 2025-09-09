import error from "../assets/error-white.svg"
const Error = ({ message }) => {
  return (
    <div className="w-auto text-center text-white py-3 px-4 bg-red-500 font-bold rounded-[10px] flex items-center">
        <img src={error} className="mr-4"/>
      {message}
    </div>
  );
};

export default Error;
