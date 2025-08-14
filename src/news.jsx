import React from "react";
import NewsCard from "./newsCard";
function NewsListHorizontal({ News_object }) {
  return (
    <>
      <div className="h-120 snap-start flex flex-row gap-4 md:gap-8 mt-4 md:mt-10 p-4 md:p-8 overflow-hidden">
        {News_object.map((news_page) => (
          <NewsCard
            key={news_page.index}
            title={news_page.title}
            text={news_page.text}
            image={news_page.image}
          />
        ))}
      </div>
    </>
  );
}
function NewsListVertical({ News_object }) {
  return (
    <>
      <div className="w-full h-auto snap-start flex flex-col lg:flex-col gap-4 md:gap-8 md:py-4">
        {News_object.map((news_page) => (
          <NewsCard
            key={news_page.index}
            title={news_page.title}
            text={news_page.text}
            image={news_page.image}
          />
        ))}
      </div>
    </>
  );
}
const newsObject = [
  {
    index: 0,
    title: "Summit",
    text: "Ethiopia, with the help of Italy, will be hosting the upcoming UN food systems Summit. In connection with this conference, Prime Minister Abiy Ahmed (PhD) received and spoke to heads of institutions and leaders who arrived in Addis Ababa.</br>The Prime Minister received and spoke to the Prime Minister of Italy, the President of Somalia, the UN Deputy Secretary-General, the Director-General of FAO, the President of IFAD, the UN Assistant Secretary-General, and the UNDP Regional Director for Africa.",
    image: "../src/assets/news.jpg"
  },
  {
    index: 1,
    title: "UN Food Summit",
    text: "Ethiopia, with the help of Italy, will be hosting the upcoming UN food systems Summit. In connection with this conference, Prime Minister Abiy Ahmed (PhD) received and spoke to heads of institutions and leaders who arrived in Addis Ababa.</br>The Prime Minister received and spoke to the Prime Minister of Italy, the President of Somalia, the UN Deputy Secretary-General, the Director-General of FAO, the President of IFAD, the UN Assistant Secretary-General, and the UNDP Regional Director for Africa.",
    image: "../src/assets/news1.jpg"
  },
  {
    index: 2,
    title: "UN Food Summit",
    text: "Ethiopia, with the help of Italy, will be hosting the upcoming UN food systems Summit. In connection with this conference, Prime Minister Abiy Ahmed (PhD) received and spoke to heads of institutions and leaders who arrived in Addis Ababa.<br/>The Prime Minister received and spoke to the Prime Minister of Italy, the President of Somalia, the UN Deputy Secretary-Secretary, and the UNDP Regional Director for Africa.",
    image: "../src/assets/news1.jpg"
  },
  {
    index: 3,
    title: "UN Food Summit",
    text: "Ethiopia, with the help of Italy, will be hosting the upcoming UN food systems Summit. In connection with this conference, Prime Minister Abiy Ahmed (PhD) received and spoke to heads of institutions and leaders who arrived in Addis Ababa.<br/>The Prime Minister received and spoke to the Prime Minister of Italy, the President of Somalia, the UN Deputy Secretary-Secretary, and the UNDP Regional Director for Africa.",
    image: "../src/assets/news1.jpg"
  }
];

function NewsHorizontal() {
  return (< NewsListHorizontal News_object={newsObject} />);
}
function NewsVertical() {
  return (< NewsListVertical News_object={newsObject} />);
}


export default NewsVertical;
export { NewsVertical, NewsHorizontal };
