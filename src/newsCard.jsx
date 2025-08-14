import React from "react";
const NewsCard = ({ title, text, image, alt, link }) => {
  return (
    <article className="flex w-full h-100 flex-col flex-1 rounded-2xl bg-gray-100 shadow-lg">
      <div className="flex-1 overflow-hidden">
        <img
          className="w-full h-full object-cover object-top rounded-t-2xl"
          src={image}
          alt={alt}
        />
      </div>
      <section className="overflow-hidden flex-1 flex flex-col p-4 md:p-8">
        <h1 className="text-center font-bold text-xl md:text-2xl">{title} </h1>
        <p className="font-medium text-sm md:text-md mt-2" dangerouslySetInnerHTML={{ __html: text }} />
        <a className="opacity-100 block underline min-w-20 mt-auto ml-auto" href={link}>
          Read more
        </a>
      </section>
    </article>
  );
};

export default NewsCard;
