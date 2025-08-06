import React, { useState, useEffect, useRef } from 'react';
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
const CardWithHoverDescription = ({ title, description, image, listItems }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="p-4 md:p-8 border border-black rounded-xl flex flex-col justify-start transition-transform duration-300 ease-in-out hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="h-12 w-12 bg-cover"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <h1 className="mt-4 text-xl font-medium">{title}</h1>

      {/* Conditionally render the description and the list */}
      {!isHovered ? (
        <p className="mt-4 text-start text-sm">{description}</p>
      ) : (
        <ul className="mt-4 list-inside list-disc text-sm">
          {listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
const DropdownWithDescription = ({ title, description }) => {
  // `isHovered` will be true when the mouse is over the component, and false otherwise.
  // `setIsHovered` is the function we'll use to update this state.
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="dropdown-container"
      // When the mouse enters the container, set isHovered to true.
      onMouseEnter={() => setIsHovered(true)}
      // When the mouse leaves, set isHovered to false.
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="dropdown-title">{title}</div>
      {/* This section will only render if `isHovered` is true. */}
      {isHovered && (
        <div className="dropdown-description">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};


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

// Component for a single stats card with a counting animation
const StatCard = ({ title, value, unit, icon }) => {
  const [ref, isVisible] = useOnScreen({ rootMargin: '-100px 0px -100px 0px' });
  const animatedValue = useCounter(value, 2000, isVisible);
  const formattedValue = animatedValue.toLocaleString();

  return (
    <div ref={ref} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center">
      <div className="text-4xl text-blue-600 mb-2">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <div className="text-4xl font-bold text-blue-900 mt-2">
        {formattedValue}
      </div>
      <p className="text-gray-500">{unit}</p>
    </div>
  );
};

// Mock data for the charts, based on hypothetical trends
const populationGrowthData = [
  { name: '2021', population: 5228000 },
  { name: '2022', population: 5461000 },
  { name: '2023', population: 5708000 },
  { name: '2024', population: 5957000 },
];

const visitorData = [
  { name: 'Jan-Jun', visitors: 5000000, color: '#1e40af' },
];

function Charts() {
  return (
    <div className="min-h-screen snap-start bg-gray-100 p-4 md:p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-10">Addis Ababa City Stats</h1>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-10">
          <StatCard
            title="Population"
            value={5957000}
            unit="2025 Est."
            icon="👥"
          />
          <StatCard
            title="Area"
            value={527}
            unit="sq. km"
            icon="🗺️"
          />
          <StatCard
            title="Visitors"
            value={5000000}
            unit="past 6 months"
            icon="✈️"
          />
          <StatCard
            title="Revenue"
            value={111000000000}
            unit="Birr (past 6 months)"
            icon="💰"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Population Growth Chart */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
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

          {/* Visitor Stats Chart */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4">Visitors (Past 6 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip />
                <Bar dataKey="visitors" fill="#1e40af" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Header component with responsive hamburger menu
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20 flex justify-between items-center h-16 w-screen bg-[#37393A] p-4 md:p-6 opacity-100">
      {/* City Logo visible on all screen sizes */}
      <div className="flex items-center">
        <a className="block h-11 w-11 rounded-full overflow-hidden">
          <img src="https://placehold.co/44x44/37393A/white?text=Logo" alt="Addis Ababa Logo" />
        </a>
      </div>

      {/* Desktop Navigation visible on medium screens and up */}
      <div className="hidden md:flex flex-grow justify-center">
        <ul className="flex flex-wrap justify-center gap-4">
          <li className="text-white hover:text-gray-300 hover:underline">Home</li>
          <li className="text-white hover:text-gray-300 hover:underline">Government</li>
          <li className="text-white hover:text-gray-300 hover:underline">News</li>
          <li className="text-white hover:text-gray-300 hover:underline">Service</li>
          <li className="text-white hover:text-gray-300 hover:underline">Programs</li>
          <li className="text-white hover:text-gray-300 hover:underline">Economy</li>
          <li className="text-white hover:text-gray-300 hover:underline">Gallery</li>
          <li className="text-white hover:text-gray-300 hover:underline">Resource</li>
          <li className="text-white hover:text-gray-300 hover:underline">Contact</li>
          <li className="relative top-1 text-white hover:text-gray-300 w-6 h-8 hidden md:block">
            {/* Search icon placeholder */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </li>
        </ul>
      </div>

      {/* Hamburger button visible on small screens only */}
      <button onClick={toggleMenu} className="md:hidden text-white p-2">
        {/* Hamburger icon SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 z-30 flex flex-col items-center justify-center space-y-8">
          <button onClick={toggleMenu} className="absolute top-4 right-4 text-white p-2">
            {/* Close icon SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul className="flex flex-col items-center space-y-6 text-2xl">
            <li className="text-white hover:text-gray-300" onClick={toggleMenu}><a href="#">Home</a></li>
            <li className="text-white hover:text-gray-300" onClick={toggleMenu}><a href="#">Government</a></li>
            <li className="text-white hover:text-gray-300" onClick={toggleMenu}><a href="#">News</a></li>
            <li className="text-white hover:text-gray-300" onClick={toggleMenu}><a href="#">Service</a></li>
            <li className="text-white hover:text-gray-300" onClick={toggleMenu}><a href="#">Programs</a></li>
            <li className="text-white hover:text-gray-300" onClick={toggleMenu}><a href="#">Economy</a></li>
            <li className="text-white hover:text-gray-300" onClick={toggleMenu}><a href="#">Gallery</a></li>
            <li className="text-white hover:text-gray-300" onClick={toggleMenu}><a href="#">Resource</a></li>
            <li className="text-white hover:text-gray-300" onClick={toggleMenu}><a href="#">Contact</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}


function WelcomeTitle() {
  return (
    <div className="w-full lg:w-auto">
      <h1 className="text-4xl md:text-7xl text-white text-center lg:text-left font-bold">Welcome to</h1>
      <h1 className="text-4xl md:text-7xl text-white text-center lg:text-left font-bold">Addis Ababa</h1>
    </div>
  );
};

function VisitCard({ title, description }) {
  return (
    <div className="bg-linear-180 from-[#a6a6a6]/20 to-[#ffffff]/20 rounded-3xl flex flex-col min-h-[16rem] w-full g-4 p-6 backdrop-blur-[5px]">
      <h1 className="text-xl text-center mb-2 text-white font-bold">{title}</h1>
      <p className='text-md text-left text-black font-medium'>{description}</p>
    </div>
  );
}

const First_page = () => {
  const image_url_list = [
    "../src/assets/images/first_front_page_wallpaper/AddisView.jpg",
    "../src/assets/images/first_front_page_wallpaper/nightbg_960x539.jpg",
    "../src/assets/images/first_front_page_wallpaper/3.jpg"
  ];

  const cardsData = [
    { title: "Visit Adwa Museum", description: "The Adwa Victory Memorial Museum, or Adwa Museum, is a new museum in Addis Ababa. It honors Ethiopia's historic win over Italy in the 1896 Battle of Adwa. The museum stands as a proud symbol of Ethiopia's strength, unity, and fight for freedom. located in the Piazza area and St. George's Cathedral" },
    { title: "Visit Sheger Park", description: "Sheger Park (Amharic: ሸገር ፓርክ), also known as Friendship Park, is the biggest urban park in Addis Ababa, Ethiopia. The park is right next to Unity Park (which houses a zoo, and historical archives)Sheger Park was opened on 10 September 2020, in the presence of high-level Ethiopian government ministers, the president, the prime minister and the first lady" },
    { title: "Visit Addis Ababa at Night", description: "Experience the vibrant nightlife of the city. From bustling markets to lively entertainment districts, Addis Ababa offers a unique after-dark adventure with a dynamic atmosphere and stunning city lights." },
  ];

  // A single state to manage the index for both images and cards
  const [currentIndex, setCurrentIndex] = useState(0);

  // Effect for automatic image and card content change with a fade transition
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % image_url_list.length);
    }, 5000); // Change image and card every 5 seconds

    return () => clearInterval(intervalId);
  }, [image_url_list.length]);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % image_url_list.length);
  };

  return (
    <div className="relative flex flex-col justify-center items-center px-4 md:px-16 w-screen h-screen snap-start">
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
        <div className="flex flex-1 flex-col gap-4 md:gap-8 justify-center w-full max-w-sm lg:max-w-md">
          {/* Only one card is rendered now */}
          <VisitCard
            title={cardsData[currentIndex].title}
            description={cardsData[currentIndex].description}
          />
        </div>
      </div>

      {/* Next Card button with SVG icon */}
      <button
        onClick={handleNext}
        className="absolute bottom-8 right-8 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        aria-label="Next Card"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
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
  <div className="p-4 w-screen px-4 md:px-16 h-auto gap-4 md:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
  const cardData1 = {
    title: 'Property Tax & Assessment',
    description: 'Addis Ababa property tax information, payment options, assessment records, and related legal documentation.',
    image: '../src/assets/property_logo.png',
    listItems: [
      'Tax payment portal',
      'Property assessment records',
      'Legal amendments and updates',
    ],
  };
  const cardData2 = {
    title: ' Public Transportation',
    description: 'Access bus schedules, route maps, ticket information, and real time updates for all public transportation services',
    image: '../src/assets/transportation_logo.png',
    listItems: [
      "Bus schedules and routes",
      "Online ticket booking",
      "Service updates and alerts"
    ],
  };

  const cardData3 = {
    title: 'Latest Amendments',
    description: 'Stay updated with the latest legal amendments, policy changes, and regulatory updates affecting city residents.',
    image: '../src/assets/property_logo.png',
    listItems: [
      "Recent policy changes",
      "Legal document updates",
      "Regulatory announcements",
    ],
  };

  return (
    <main className="snap-y snap-mandatory h-screen overflow-y-scroll">
      <First_page />
      <Charts />
      <div className="min-h-screen snap-start container mx-auto flex w-screen flex-col lg:flex-row p-4 md:p-8  lg:justify-start">
        <div className="lg:w-100 flex flex-col overflow-hidden rounded-xl shadow-lg">
          <img className="object-cover" src="../src/assets/adanech_pic.jpg" alt="Dr Adanech Abebe" />
          <div className="bg-[#0d4d99] flex-auto max-h-[50vh] overflow-y-auto flex flex-col p-4 md:p-5">
            <h1 className="text-white text-center text-xl font-bold">Dr Adanech Abebe</h1>
            <p className="text-white text-sm md:text-base text-justify mt-2">Adanech Abebe is the current mayor of Addis Ababa, making history as the first woman to hold the position. She was appointed in 2020 and has since focused on urban development and improving public services. Before becoming mayor, she served as Ethiopia’s Minister of Revenue. Adanech is known for her leadership in reforming tax systems and combating corruption. As mayor, she has worked on infrastructure projects and housing programs for low-income residents. Her role highlights the increasing presence of women in Ethiopian politics and leadership.</p>
          </div>
        </div>
        <div className="w-200 bg-white rounded-xl shadow-lg flex flex-col gap-4 p-4 md:p-8 justify-start">
          <h2 className="text-center font-bold text-2xl">About Addis</h2>
          <p className="flex-wrap text-sm md:text-lg mb-20">Addis Ababa is the capital city of Ethiopia and one of the highest capitals in the world, sitting at about 2,355 meters above sea level. It was founded in 1886 by Emperor Menelik II and means "new flower" in Amharic. The city serves as the political, cultural, and economic center of the country. It is home to the African Union headquarters and numerous international organizations. Addis Ababa is known for its diverse population, vibrant markets, and historic landmarks like the National Museum and Holy Trinity Cathedral. Despite rapid development, the city still preserves elements of its rich cultural heritage.</p>
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
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
      <div className="hover:min-h-screen h-50 snap-start w-screen p-4 md:p-8">
        <div className="container mx-auto">
          <h1 className="text-center my-4 md:my-8 text-2xl md:text-3xl">City Services & Information </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 w-full mx-auto">
            <CardWithHoverDescription
              title={cardData1.title}
              description={cardData1.description}
              image={cardData1.image}
              listItems={cardData1.listItems}
            />
            <CardWithHoverDescription
              title={cardData2.title}
              description={cardData2.description}
              image={cardData2.image}
              listItems={cardData2.listItems}
            />
            <CardWithHoverDescription
              title={cardData3.title}
              description={cardData3.description}
              image={cardData3.image}
              listItems={cardData3.listItems}
            />
          </div>
        </div>
      </div>
      <div className="min-h-200 snap-start flex flex-col lg:flex-row gap-4 md:gap-8 mt-4 md:mt-10 p-4 md:p-8">
        <article className="flex flex-col flex-1 rounded-2xl bg-gray-100 shadow-lg">
          <div className="flex-1 overflow-auto">
            <img className="w-full h-full object-cover object-top rounded-t-2xl" src="../src/assets/news1.jpg" alt="UN Food Summit" />
          </div>
          <section className="flex-1 flex flex-col p-4 md:p-8">
            <h1 className="text-center font-bold text-xl md:text-2xl">UN Food Summit</h1>
            <p className="font-medium text-sm md:text-md mt-2">Ethiopia, with the help of Italy, will be hosting the upcoming UN food systems Summit. In connection with this conference, Prime Minister Abiy Ahmed (PhD) received and spoke to heads of institutions and leaders who arrived in Addis Ababa.<br />
              The Prime Minister received and spoke to the Prime Minister of Italy, the President of Somalia, the UN Deputy Secretary-General, the Director-General of FAO, the President of IFAD, the UN Assistant Secretary-General, and the UNDP Regional Director for Africa.</p>
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
      <div className="min-h-screen snap-start p-4 md:p-8 flex flex-col items-center">
        <h1 className="text-center my-4 md:my-8 text-2xl md:text-3xl">Public Safety & Emergency Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 w-full">
          <div className="p-4 md:p-8 rounded-2xl flex flex-col border border-black shadow-lg">
            <div className="w-16 h-16 bg-[url('https://placehold.co/64x64/000000/white?text=P')] bg-cover bg-center mb-4 md:mb-8"></div>
            <h2 className="text-xl font-bold text-center">Public Safety & Emergency Services</h2>
            <p className="text-sm md:text-md font-medium text-justify mt-2"> Report criminal activities and hazardous situations to local authorities through our secure reporting system. You can call them through:</p>
            <ul className="list-disc list-inside text-sm mt-2">
              <li>Dial 991 or 916</li>
              <li>Text for assistance</li>
            </ul>
          </div>
          <div className="p-4 md:p-8 rounded-2xl flex flex-col border border-black shadow-lg">
            <div className="w-16 h-16 bg-[url('https://placehold.co/64x64/000000/white?text=F')] bg-cover bg-center mb-4 md:mb-8"></div>
            <h2 className="text-xl font-bold text-center">Fire & Rescue Services</h2>
            <p className="text-sm md:text-md font-medium text-start mt-2">Access fire department services, report hazardous conditions, and get emergency assistance information.</p>
            <ul className="list-disc list-inside text-sm mt-2">
              <li>Dial 991 or 916</li>
              <li>Text for assistance</li>
            </ul>
          </div>
          <div className="p-4 md:p-8 rounded-2xl flex flex-col border border-black shadow-lg">
            <div className="w-16 h-16 bg-[url('https://placehold.co/64x64/000000/white?text=T')] bg-cover bg-center mb-4 md:mb-8"></div>
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
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;

