import Header from "./Header";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import { NewsHorizontal, NewsVertical } from "./news";

const single_object = {
  index: 0,
  image: "../src/assets/images/news_picture.png",
  title: "Ahead of summit, Trump questions what’s changed about Putin",
  text: `President Donald Trump has often bragged about his warm relationship with Russia’s Vladimir Putin. But in the months leading up to the leaders’ first meeting in six years, Trump began asking Europeans and White House aides what’s changed about his counterpart.
The line of questioning, described to CNN by three people familiar with the matter, speaks to Trump’s growing frustration with Putin leading up to their summit in Alaska Friday to discuss ending Russia’s years-long invasion of Ukraine. Trump promised to quickly broker a peace deal even before he took office. Not only has Putin resisted ceasefire proposals, but Russia has escalated its attacks on Ukraine this year.
While there have been some indications that Putin’s short-term objectives in Ukraine may have shifted – underpinning an optimism within the White House that an agreement can be reached – the prevailing view of the US intelligence community is far more skeptical. Putin maintains the same maximalist territorial goals as he has throughout the war and would likely use a ceasefire to refit his forces and possibly even make another run at Kyiv, multiple people familiar with recent US intelligence reporting on Russia said. And despite European calls for security guarantees for Ukraine, Putin still wants to ensure that Ukraine never joins NATO and that foreign peacekeepers don’t enter the territory, the people said.“Putin thinks he is winning, so he has no reason to bend,” said one person familiar with the recent US intelligence assessments, who, like others in this story, spoke on the condition of anonymity to discuss sensitive matters. “His thinking is he might as well pocket the wins he has now, including the Ukrainian territory he has already taken by force, and then make another run to take more later,” the person said.`
}
function Single_article({ article }) {
  return (
    <div id="whole" className="p-8 grid grid-cols-1 w-full md:grid-rows-[auto_auto_auto] gap-4">
      <div id="title" className="h-16  row-span-1 flex justify-center items-center">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-5">{article.title}</h1>
      </div>
      <img className="block h-auto w-auto bg-amber-100 object-contain " src={article.image} alt="" />
      <div id="article" className="row-span-1 min-h-16 "><p className="text-lg whitespace-pre-line text-justify">{article.text}</p></div>
    </div>
  )
}
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQueryList = window.matchMedia(query);
      setMatches(mediaQueryList.matches);
      const listener = (event) => setMatches(event.matches);
      mediaQueryList.addEventListener('change', listener);
      return () => {
        mediaQueryList.removeEventListener('change', listener);
      };
    }
  }, [query]);

  return matches;
}
function MyResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 750px)');
  const isDesktop = useMediaQuery('(min-width: 751px)');

  console.log("Current screen size:", window.innerWidth);
  console.log("isMobile is:", isMobile);
  console.log("isDesktop is:", isDesktop);
  return isDesktop ? <NewsVertical /> : <NewsHorizontal />;
};

function NewsPage() {

  return (
    <div className=" grid grid-cols-1 lg:grid-rows-[auto_auto_auto] h-auto">
      <div className="">
        <Header />
      </div>
      <div className="grid grid-rows-1 md:grid-cols-[3fr_1fr] grid-cols-1 justify-start items-start">
        <Single_article article={single_object} />
        <MyResponsiveComponent />
      </div>

      <div>
        <Footer />
      </div>
    </div>

  );
};

export default NewsPage;
