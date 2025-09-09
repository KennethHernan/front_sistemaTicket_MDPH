import React from "react";

const DefaultOption = () => (
  <div className="border border-[#ebebeb] flex gap-[10px] p-3 rounded-md">
    <div className="w-[130px] rounded-[5px] animate-pulse bg-[#ebebeb] h-[130px] overflow-hidden flex items-center justify-center bg-cover"></div>
    <section>
      <div className="font-normal h-5 bg-[#ebebeb] animate-pulse w-[100px] rounded-[5px]"></div>
      <ul className="w-auto list-disc pl-5">
        <li className="bg-[#ebebeb] mt-1 animate-pulse w-[100px] rounded-[5px]"></li>
        <li className="bg-[#ebebeb] mt-1 animate-pulse w-[100px] rounded-[5px]"></li>
        <li className="bg-[#ebebeb] mt-1 animate-pulse w-[100px] rounded-[5px]"></li>
        <li className="bg-[#ebebeb] mt-1 animate-pulse w-[100px] rounded-[5px]"></li>
      </ul>
    </section>
  </div>
);

export default DefaultOption;