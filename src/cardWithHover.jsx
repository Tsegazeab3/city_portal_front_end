import React, { useState, useEffect, useRef } from 'react';
const CardWithHoverDescription = ({ title1, title2, description, image, listItems, backImage }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex-none col-span-1 relative h-60 w-full mr-2 border border-black rounded-xl flex flex-col justify-end transition-transform duration-500 ease-in-out hover:scale-110 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Conditionally render the description and the list */}
      {!isHovered ? (
        <div className='p-4 md:p-8 '>
          <div
            className="h-20 w-20 rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className="mt-4 text-3xl font-medium flex flex-col ">
            <h1 className="text-3xl font-medium">{title1}</h1>
            <h1 className="text-3xl font-medium" >{title2}</h1>
          </div>
          <img className='absolute h-full w-full rounded-xl top-0 right-0 -z-10' src={backImage} />
        </div>
      ) : (
        <>
          <h1 className="relative mt-4 text-black text-xl font-medium pl-3 underline top-3 hover:text-amber-150 animate-card-title-coming-in">{`${title1} ${title2}`}</h1>
          <ul className="mt-4 md:p-8 list-inside list-disc text-sm animate-card-text-coming-in ease-in-out bg-[#535353] w-full h-50">
            <p className="text-white text-start text-sm ">{description}</p>
            {listItems.map((item, index) => (
              <li className="text-white" key={index}>{item}</li>
            ))}
          </ul>
          <img className='absolute h-full w-full blur-[8px] rounded-xl top-0 right-0 -z-10' src={backImage} />
        </>
      )}
    </div>
  );
};
export default CardWithHoverDescription;
