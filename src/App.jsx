import React, { useState, useEffect, useRef } from 'react';
import NewsCard from './newsCard';
import CardWithHoverDescription from './cardWithHover';
import DropdownWithDescription from './DropdownWithDescription';
import StatCard from './StatCard';
import VisitCard from './VisitCard';
import Charts from './Charts';
import Header from './Header';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

{/* Card animation for services */ }
// A custom hook to detect if an element is on screen using IntersectionObserver
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};

// A custom hook to handle the counting animation
const useCounter = (targetValue, duration = 2000, startCounting) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const newCount = percentage * targetValue;
      setCount(Math.round(newCount));
      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [targetValue, duration, startCounting]);

  return count;
};

// Mock data for the charts, based on hypothetical trends


// Header component with responsive hamburger menu


function WelcomeTitle() {
  return (
    <div className="w-full lg:w-auto">
      <h1 className="text-4xl md:text-7xl text-white text-center lg:text-left font-bold">Welcome to</h1>
      <h1 className="text-4xl md:text-7xl text-white text-center lg:text-left font-bold">Addis Ababa</h1>
    </div>
  );
};


const First_page = () => {
  const image_url_list = [
    "../src/assets/images/first_front_page_wallpaper/AddisView.jpg",
    "../src/assets/images/first_front_page_wallpaper/nightbg_960x539.jpg",
    "../src/assets/images/first_front_page_wallpaper/3.jpg"
  ];

  const cardsData = [
    { title: "Visit Sheger Park", description: "Sheger Park (Amharic: ሸገር ፓርክ), also known as Friendship Park, is the biggest urban park in Addis Ababa, Ethiopia. The park is right next to Unity Park (which houses a zoo, and historical archives)Sheger Park was opened on 10 September 2020, in the presence of high-level Ethiopian government ministers, the president, the prime minister and the first lady" },
    { title: "Visit Adwa Museum", description: "The Adwa Victory Memorial Museum, or Adwa Museum, is a new museum in Addis Ababa. It honors Ethiopia's historic win over Italy in the 1896 Battle of Adwa. The museum stands as a proud symbol of Ethiopia's strength, unity, and fight for freedom. located in the Piazza area and St. George's Cathedral" },
    { title: "Visit Addis Ababa at Night", description: "Experience the vibrant nightlife of the city. From bustling markets to lively entertainment districts, Addis Ababa offers a unique after-dark adventure with a dynamic atmosphere and stunning city lights." },
  ];

  // A single state to manage the index for both images and cards
  const [currentIndex, setCurrentIndex] = useState(0);
  // Effect for automatic image and card content change with a fade transition
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % image_url_list.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [image_url_list.length, currentIndex]);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % image_url_list.length);
  };

  return (
    <div className="relative flex flex-col justify-center items-center px-4 md:px-16 w-screen h-screen snap-start">
      <Header />
      {/* Container for the background images with cross-fade effect */}
      <div className="absolute top-0 left-0 w-screen h-screen -z-10">
        {image_url_list.map((src, index) => (
          <img
            key={src}
            className={`absolute h-screen w-screen object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            src={src}
            alt="Addis Ababa city view"
            onError={(e) => { e.target.src = 'https://placehold.co/960x539/2E86C1/white?text=Image+Load+Error'; }}
          />
        ))}
      </div>

      {/* Main content container with flexbox for responsive layout */}
      <div className="flex flex-1 flex-col lg:flex-row justify-between items-center lg:items-center w-full max-w-7xl mx-auto z-10 px-4 md:px-8 pt-24 pb-32">
        <div className="flex-shrink-0 mb-8 lg:mb-0">
          <WelcomeTitle />
        </div>

        {/* This div controls the width of the card. I've adjusted it to be more compact. */}
        <div className="flex flex-1 flex-col gap-4 md:gap-8 justify-center w-full max-w-sm lg:pr-10 lg:max-w-md">
          {/* Only one card is rendered now */}
          <VisitCard
            title={cardsData[currentIndex].title}
            description={cardsData[currentIndex].description}
          />
        </div>
      </div>

      {/* Next Card button with SVG icon */}
      <div className='absolute z-10 group bottom-auto top-auto right-8'>
        <button
          onClick={handleNext}
          className="active:-translate-y-2 p-3 bg-white/20 text-black rounded-full hover:shadow-lg hover:cursor-pointer hover:bg-white/75 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          aria-label="Next Card"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-sm">
              Dedicated to serving the citizens of Addis Ababa with timely information and reliable services.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Services</a></li>
              <li><a href="#" className="hover:underline">News & Events</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Address: Meskel Square, Addis Ababa</li>
              <li>Phone: +251 11 123 4567</li>
              <li>Email: info@addisababa.gov</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          &copy; 2024 Addis Ababa City Administration. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

const CommunityEngagement = () => (
  <div className="p-4 w-screen px-4 md:px-16 h-auto gap-4 md:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <div className="p-4 flex flex-col shadow-md shadow-gray-200 hover:shadow-lg hover:shadow-gray-500 hover:relative hover:bottom-2 rounded-2xl border border-black ">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-[url('https://placehold.co/32x32/3b82f6/white?text=V')] bg-cover rounded-xl"></div>
        <h1 className="text-lg font-bold">Volunteer Programs</h1>
      </div>
      <p className="mt-2 text-sm">Join city-wide initiatives to improve our communities and make a difference.</p>
    </div>
    <div className="p-4 flex flex-col shadow-md shadow-gray-200 hover:shadow-lg hover:shadow-gray-500 hover:relative hover:bottom-2 rounded-2xl border border-black ">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-[url('https://placehold.co/32x32/3b82f6/white?text=E')] bg-cover rounded-xl"></div>
        <h1 className="text-lg font-bold">Local Events & Festivals</h1>
      </div>
      <p className="mt-2 text-sm">Find and participate in local festivals, cultural events, and community gatherings.</p>
    </div>
    <div className="p-4 flex flex-col shadow-md shadow-gray-200 hover:shadow-lg hover:shadow-gray-500 hover:relative hover:bottom-2 rounded-2xl border border-black ">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-[url('https://placehold.co/32x32/3b82f6/white?text=S')] bg-cover rounded-xl"></div>
        <h1 className="text-lg font-bold">Submit a Suggestion</h1>
      </div>
      <p className="mt-2 text-sm">Share your ideas and feedback to help shape the future of our city.</p>
    </div>
    <div className="p-4 flex flex-col shadow-md shadow-gray-200 hover:shadow-lg hover:shadow-gray-500 hover:relative hover:bottom-2 rounded-2xl border border-black ">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-[url('https://placehold.co/32x32/3b82f6/white?text=F')] bg-cover rounded-xl"></div>
        <h1 className="text-lg font-bold">Public Forums</h1>
      </div>
      <p className="mt-2 text-sm">Engage in discussions with city officials and other citizens on important topics.</p>
    </div>
    <div className="p-4 flex flex-col shadow-md shadow-gray-200 hover:shadow-lg hover:shadow-gray-500 hover:relative hover:bottom-2 rounded-2xl border border-black ">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-[url('https://placehold.co/32x32/3b82f6/white?text=Y')] bg-cover rounded-xl"></div>
        <h1 className="text-lg font-bold">Youth Programs</h1>
      </div>
      <p className="mt-2 text-sm">Explore opportunities for young people, including mentorship and educational support.</p>
    </div>
    <div className="p-4 flex flex-col shadow-md shadow-gray-200 hover:shadow-lg hover:shadow-gray-500 hover:relative hover:bottom-2 rounded-2xl border border-black ">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-[url('https://placehold.co/32x32/3b82f6/white?text=N')] bg-cover rounded-xl"></div>
        <h1 className="text-lg font-bold">Neighborhood Watch</h1>
      </div>
      <p className="mt-2 text-sm">Learn about and join local initiatives to keep your neighborhood safe.</p>
    </div>
  </div>
);

const UrbanInfrastructure = () => (
  <div className=" p-4 w-screen px-4 md:px-16 h-auto gap-4 md:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <div className="flex flex-col shadow-md shadow-gray-200 hover:shadow-lg hover:shadow-gray-500 hover:relative hover:bottom-2 p-4 rounded-2xl border border-black ">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-[url('https://placehold.co/32x32/3b82f6/white?text=W')] bg-cover rounded-xl"></div>
        <h1 className="text-lg font-bold">Water & Sanitation</h1>
      </div>
      <p className="mt-2 text-sm">Information on water services, bill payments, and sanitation projects.</p>
    </div>
    <div className="flex flex-col shadow-md shadow-gray-200 hover:shadow-lg hover:shadow-gray-500 hover:relative hover:bottom-2 p-4 rounded-2xl border border-black ">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-[url('https://placehold.co/32x32/3b82f6/white?text=E')] bg-cover rounded-xl"></div>
        <h1 className="text-lg font-bold">Electricity Services</h1>
      </div>
      <p className="mt-2 text-sm">Access to electricity billing, outage reports, and new service applications.</p>
    </div>
    <div className="flex flex-col shadow-md shadow-gray-200 hover:shadow-lg hover:shadow-gray-500 hover:relative hover:bottom-2 p-4 rounded-2xl border border-black ">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-[url('https://placehold.co/32x32/3b82f6/white?text=R')] bg-cover rounded-xl"></div>
        <h1 className="text-lg font-bold">Road Maintenance</h1>
      </div>
      <p className="mt-2 text-sm">Report potholes and road damage, and check for ongoing road projects.</p>
    </div>
    <div className="flex flex-col shadow-md shadow-gray-200 hover:shadow-lg hover:shadow-gray-500 hover:relative hover:bottom-2 p-4 rounded-2xl border border-black ">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-[url('https://placehold.co/32x32/3b82f6/white?text=T')] bg-cover rounded-xl"></div>
        <h1 className="text-lg font-bold">Telecom & Internet</h1>
      </div>
      <p className="mt-2 text-sm">Information on city-wide internet and telecommunication services.</p>
    </div>
    <div className="flex flex-col shadow-md shadow-gray-200 hover:shadow-lg hover:shadow-gray-500 hover:relative hover:bottom-2 p-4 rounded-2xl border border-black ">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-[url('https://placehold.co/32x32/3b82f6/white?text=M')] bg-cover rounded-xl"></div>
        <h1 className="text-lg font-bold">Waste Management</h1>
      </div>
      <p className="mt-2 text-sm">Find schedules for waste collection and recycling programs.</p>
    </div>
  </div>
);

function Main() {
  const populationGrowthData = [
    { name: '2021', population: 5228000 },
    { name: '2022', population: 5461000 },
    { name: '2023', population: 5708000 },
    { name: '2024', population: 5957000 },
  ];

  const propertyTaxServiceCard = {
    title1: 'Property Tax',
    title2: '& Assessment',
    description: 'Addis Ababa property tax information, payment options, assessment records, and related legal documentation.',
    image: '../src/assets/images/property_logo.png',
    backImage: '../src/assets/images/anbesa_bus.jpg',
    listItems: [
      'Tax payment portal',
      'Property assessment records',
      'Legal amendments and updates',
    ]
  };
  const publicTransportServiceCard = {
    title1: 'Public',
    title2: 'Transportation',
    description: 'Access bus schedules, route maps, ticket information, and real time updates for all public transportation services',
    image: '../src/assets/transportation_logo.png',
    backImage: '../src/assets/images/anbesa_bus.jpg',
    listItems: [
      "Bus schedules and routes",
      "Online ticket booking",
      "Service updates and alerts"
    ],
  };

  const latestAmendmentServiceCard = {
    title1: 'Latest',
    title2: 'Amendments',
    description: 'Stay updated with the latest legal amendments, policy changes, and regulatory updates affecting city residents.',
    image: '../src/assets/property_logo.png',
    listItems: [
      "Recent policy changes",
      "Legal document updates",
      "Regulatory announcements",
    ],
  };

  const fireRescueServiceCard = {
    title1: 'Fire &',
    title2: 'Rescue Services',
    description: 'Access fire department services, report hazardous conditions, and get emergency assistance information.',
    image: '../src/assets/images/addis_ababa_fire_station_logo.png',
    backImage: '../src/assets/images/fire_fighters.jpg',
    listItems: [
      "Dial 991 or 916",
      "Text for assistance",
    ],
  }

  return (
    <main className="bg-[#f2f2f2]snap-y snap-mandatory h-screen overflow-x-hidden overflow-y-scroll">
      <First_page />
      <Charts />
      <div className="min-h-screen snap-start container bg-[#f2f2f2] mx-auto w-screen flex flex-col lg:flex-row p-4 md:p-8  lg:justify-start ">
        <div className="lg:w-100 flex flex-col shrink-0 overflow-hidden rounded-xl rounded-br-none shadow-lg">
          <img className="object-cover" src="../src/assets/adanech_pic.jpg" alt="Dr Adanech Abebe" />
          <div className="bg-[#0d4d99] flex-auto max-h-[50vh] overflow-y-auto flex flex-col p-4 md:p-5">
            <h1 className="text-white text-center text-xl font-bold">Dr Adanech Abebe</h1>
            <p className="text-white text-sm md:text-base text-justify mt-2">Adanech Abebe is the current mayor of Addis Ababa, making history as the first woman to hold the position. She was appointed in 2020 and has since focused on urban development and improving public services. Before becoming mayor, she served as Ethiopia’s Minister of Revenue. Adanech is known for her leadership in reforming tax systems and combating corruption. As mayor, she has worked on infrastructure projects and housing programs for low-income residents. Her role highlights the increasing presence of women in Ethiopian politics and leadership.</p>
          </div>
        </div>
        <div className="w-screen bg-[#f2f2f2] rounded-xl rounded-bl-none xlshadow-lg flex flex-col gap-4 p-4  md:p-8 justify-start">
          <h2 className="text-center font-bold text-2xl">About Addis</h2>
          <p className="flex-wrap text-sm md:text-lg mb-20">Addis Ababa is the capital city of Ethiopia and one of the highest capitals in the world, sitting at about 2,355 meters above sea level. It was founded in 1886 by Emperor Menelik II and means "new flower" in Amharic. The city serves as the political, cultural, and economic center of the country. It is home to the African Union headquarters and numerous international organizations. Addis Ababa is known for its diverse population, vibrant markets, and historic landmarks like the National Museum and Holy Trinity Cathedral. Despite rapid development, the city still preserves elements of its rich cultural heritage.</p>
          <div className="bg-[#f2f2f2] rounded-xl hover:shadow-2xl p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4">Population Growth (2021-2024)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={populationGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                  domain={[5000000, 'auto']}
                />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="population" stroke="#3b82f6" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>
      <div className="h-auto snap-start w-screen p-4 md:p-8">
        <div className="container mx-auto">
          <h1 className="text-center my-4 md:my-8 text-2xl md:text-3xl">City Services & Information </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:p-40 lg:grid-cols-3 gap-4 md:gap-8 w-full mx-auto">
            <CardWithHoverDescription
              title1={publicTransportServiceCard.title1}
              title2={publicTransportServiceCard.title2}
              description={publicTransportServiceCard.description}
              image={publicTransportServiceCard.image}
              backImage={publicTransportServiceCard.backImage}
              listItems={publicTransportServiceCard.listItems}
            />
            <CardWithHoverDescription
              title1={propertyTaxServiceCard.title1}
              title2={propertyTaxServiceCard.title2}
              description={propertyTaxServiceCard.description}
              image={propertyTaxServiceCard.image}
              backImage={propertyTaxServiceCard.backImage}
              listItems={propertyTaxServiceCard.listItems}
            />
            <CardWithHoverDescription
              title1={latestAmendmentServiceCard.title1}
              title2={latestAmendmentServiceCard.title2}
              description={latestAmendmentServiceCard.description}
              image={latestAmendmentServiceCard.image}
              backImage={latestAmendmentServiceCard.backImage}
              listItems={latestAmendmentServiceCard.listItems}
            />
            <CardWithHoverDescription
              title1={fireRescueServiceCard.title1}
              title2={fireRescueServiceCard.title2}
              description={fireRescueServiceCard.description}
              image={fireRescueServiceCard.image}
              backImage={fireRescueServiceCard.backImage}
              listItems={fireRescueServiceCard.listItems}
            />
          </div>
        </div>
      </div>
      <h1 className="text-center my-4 md:my-8 text-2xl md:text-3xl">Recent News</h1>
      <div className="h-120 snap-start flex flex-col lg:flex-row gap-4 md:gap-8 mt-4 md:mt-10 p-4 md:p-8">
        <article className="flex flex-col flex-1 rounded-2xl bg-gray-100 shadow-lg">
          <div className="flex-1 overflow-hidden">
            <img className="w-full h-full object-cover object-top rounded-t-2xl" src="../src/assets/news1.jpg" alt="UN Food Summit" />
          </div>
          <section className="flex-1 flex flex-col p-4 md:p-8">
            <h1 className="text-center font-bold text-xl md:text-2xl">UN Food Summit</h1>
            <p className="font-medium text-sm md:text-md mt-2">Ethiopia, with the help of Italy, will be hosting the upcoming UN food systems Summit. In connection with this conference, Prime Minister Abiy Ahmed (PhD) received and spoke to heads of institutions and leaders who arrived in Addis Ababa.<br />
              The Prime Minister received and spoke to the Prime Minister of Italy, the President of Somalia, the UN Deputy Secretary-General, the Director-General of FAO, the President of IFAD, the UN Assistant Secretary-General, and the UNDP Regional Director for Africa.</p>
            <a className="block underline min-w-20 mt-auto ml-auto" href="#">Read more</a>
          </section>
        </article>
        <NewsCard
          text={"Ethiopia, with the help of Italy, will be hosting the upcoming UN food systems Summit. In connection with this conference, Prime Minister Abiy Ahmed (PhD) received and spoke to heads of institutions and leaders who arrived in Addis Ababa.</br>The Prime Minister received and spoke to the Prime Minister of Italy, the President of Somalia, the UN Deputy Secretary-General, the Director-General of FAO, the President of IFAD, the UN Assistant Secretary-General, and the UNDP Regional Director for Africa."}
          image={"../src/assets/news1.jpg"}
        />
        <article className="flex flex-col flex-1 relative rounded-2xl bg-gray-100 shadow-lg">
          <div className="flex-1 overflow-hidden">
            <img className="w-full h-full object-cover object-center rounded-t-2xl" src="../src/assets/news.jpg" alt="UN Food Summit" />
          </div>
          <section className="flex-1 flex flex-col p-4 md:p-8">
            <h1 className="text-center font-bold text-xl md:text-2xl">UN Food Summit</h1>
            <p className="font-medium text-sm md:text-md mt-2">Ethiopia, with the help of Italy, will be hosting the upcoming UN food systems Summit. In connection with this conference, Prime Minister Abiy Ahmed (PhD) received and spoke to heads of institutions and leaders who arrived in Addis Ababa.<br />
              The Prime Minister received and spoke to the Prime Minister of Italy, the President of Somalia, the UN Deputy Secretary-Secretary, and the UNDP Regional Director for Africa.</p>
            <a className="block underline min-w-20 mt-auto ml-auto" href="#">Read more</a>
          </section>
        </article>
        <article className="flex flex-col flex-1 relative rounded-2xl bg-gray-100 shadow-lg">
          <div className="flex-1 overflow-auto">
            <img className="w-full h-full object-cover object-center rounded-t-2xl" src="../src/assets/news.jpg" alt="UN Food Summit" />
          </div>
          <section className="flex-1 flex flex-col p-4 md:p-8">
            <h1 className="text-center font-bold text-xl md:text-2xl">UN Food Summit</h1>
            <p className="font-medium text-sm md:text-md mt-2">Ethiopia, with the help of Italy, will be hosting the upcoming UN food systems Summit. In connection with this conference, Prime Minister Abiy Ahmed (PhD) received and spoke to heads of institutions and leaders who arrived in Addis Ababa.<br />
              The Prime Minister received and spoke to the Prime Minister of Italy, the President of Somalia, the UN Deputy Secretary-Secretary, and the UNDP Regional Director for Africa.</p>
            <a className="block underline min-w-20 mt-auto ml-auto" href="#">Read more</a>
          </section>
        </article>
      </div>
      <div className="min-h-100 snap-start p-4 md:p-8 flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 w-full">
          <div className="p-4 md:p-8 rounded-2xl flex flex-col border border-black shadow-lg">
            <img className='w-16 h-16 mb-4 md:mb-8' src="../src/assets/images/addisababa_police_logo.png" />
            <h2 className="text-xl font-bold text-center">Public Safety & Emergency Services</h2>
            <p className="text-sm md:text-md font-medium text-justify mt-2"> Report criminal activities and hazardous situations to local authorities through our secure reporting system. You can call them through:</p>
            <ul className="list-disc list-inside text-sm mt-2">
              <li>Dial 991 or 916</li>
              <li>Text for assistance</li>
            </ul>
          </div>
          <div className="p-4 md:p-8 rounded-2xl flex flex-col border border-black shadow-lg">
            <img className='w-16 h-16 mb-4 md:mb-8' src="../src/assets/images/addis_ababa_fire_station_logo.png" />
            <h2 className="text-xl font-bold text-center">Fire & Rescue Services</h2>
            <p className="text-sm md:text-md font-medium text-start mt-2">Access fire department services, report hazardous conditions, and get emergency assistance information.</p>
            <ul className="list-disc list-inside text-sm mt-2">
              <li>Dial 991 or 916</li>
              <li>Text for assistance</li>
            </ul>
          </div>
          <div className="p-4 md:p-8 rounded-2xl flex flex-col border border-black shadow-lg">
            <img className='w-16 h-16 mb-4 md:mb-8' src="../src/assets/images/traffic_bureau.png" />
            <h2 className="text-xl font-bold text-center">Traffic & Road Incidents</h2>
            <p className="text-sm md:text-md font-medium text-justify mt-2">Report traffic accidents, road hazards, and access real-time traffic incident updates and alerts.</p>
            <ul className="list-disc list-inside text-sm mt-2">
              <li>Dial 991 or 916</li>
              <li>Text for assistance</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="h-auto p-4 md:p-8">
        <h1 className="text-center my-8 text-3xl">Community & Engagement</h1>
        <CommunityEngagement />
      </div>
      <div className="h-auto p-4 md:p-8">
        <h1 className="text-center my-8 text-3xl">Urban Infrastructure & Utilities</h1>
        <UrbanInfrastructure />
      </div>
      <Footer />
    </main >
  );
}

function App() {
  return (
    <Main />
  );
}

export default App;

