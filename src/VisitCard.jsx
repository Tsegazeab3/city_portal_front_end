import React from "react";
function VisitCard({ title, description }) {
  return (
    <div className="bg-linear-180 from-[#a6a6a6]/20 to-[#ffffff]/20 rounded-3xl flex flex-col min-h-[16rem] w-full g-4 p-6 backdrop-blur-[5px]">
      <h1 className="text-xl text-center mb-2 text-white font-bold">{title}</h1>
      <p className='text-md text-left text-black font-medium'>{description}</p>
    </div>
  );
}
export default VisitCard;
