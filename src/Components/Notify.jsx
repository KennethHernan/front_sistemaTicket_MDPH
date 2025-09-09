import check from "../assets/check-white.svg";
const Notify = ({ message }) => {
  return (
    <div className="select-none fixed mt-4 px-9 top-0 w-auto h-[60px] bg-[#3fba2c] rounded-[5px] shadow-md text-white text-[17px] flex items-center justify-center">
      <img src={check} className="w-9" />
      <p className="ml-2">{message}</p>
    </div>
  );
};

export default Notify;
