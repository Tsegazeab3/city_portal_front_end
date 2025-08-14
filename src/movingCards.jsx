import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// --- CardWithHoverDescription Component ---
// This is your custom card component for displaying service information.
const CardWithHoverDescription = ({ title1, title2, description, image, listItems, backImage }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      // Added bg-gray-600 for visibility when images might not load
      className="flex-none col-span-1 relative h-60 w-full rounded-xl flex flex-col justify-end transition-transform duration-500 ease-in-out hover:scale-110 group bg-gray-600"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Conditionally render the description and the list */}
      {!isHovered ? (
        <div className='p-4 md:p-8 '>
          {/* Using provided image path with placeholder as fallback */}
          <div
            className="h-20 w-20 rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${image || 'https://placehold.co/80x80/000000/FFFFFF?text=Logo'})` }}
          ></div>
          <div className="mt-4 text-3xl font-medium flex flex-col ">
            <h1 className="text-3xl font-medium text-white">{title1}</h1> {/* Added text-white for visibility */}
            <h1 className="text-3xl font-medium text-white" >{title2}</h1> {/* Added text-white for visibility */}
          </div>
          {/* Using provided image path with placeholder as fallback */}
          <img className='absolute h-full w-full rounded-xl top-0 right-0 -z-10 object-cover' src={backImage || 'https://placehold.co/400x240/555555/FFFFFF?text=Background'} alt="Background" />
        </div>
      ) : (
        <>
          {/* Note: animate-card-title-coming-in and animate-card-text-coming-in are not defined in this code. */}
          {/* If they are custom CSS animations, ensure their definitions are globally available or in a style tag. */}
          <h1 className="relative mt-4 text-white text-xl font-medium pl-3 underline top-3 hover:text-amber-150">{`${title1} ${title2}`}</h1> {/* Changed text-black to text-white for better contrast on hover background */}
          <ul className="mt-4 md:p-8 list-inside list-disc text-sm ease-in-out bg-[#535353] w-full h-50">
            <p className="text-white text-start text-sm ">{description}</p>
            {listItems && listItems.map((item, index) => (
              <li className="text-white" key={index}>{item}</li>
            ))}
          </ul>
          {/* Using provided image path with placeholder as fallback */}
          <img className='absolute h-full w-full blur-[8px] rounded-xl top-0 right-0 -z-10 object-cover' src={backImage || 'https://placehold.co/400x240/555555/FFFFFF?text=Background'} alt="Blurred Background" />
        </>
      )}
    </div>
  );
};

// --- MovingServiceAnimation Component (Your Main Carousel Logic) ---
function MovingServiceAnimation({ serviceObjects }) { // Correctly destructure serviceObjects from props

  // Use the passed serviceObjects directly as allCards
  const allCards = serviceObjects;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCards, setActiveCards] = useState([]);
  const [transitioningCards, setTransitioningCards] = useState([]);
  const [animationState, setAnimationState] = useState({ direction: null, trigger: false });

  // Helper function to get a slice of 3 cards, handling wrap-around.
  const getThreeCards = (startIdx) => {
    const cards = [];
    if (!allCards || allCards.length === 0) return []; // Handle empty allCards array
    for (let i = 0; i < 3; i++) {
      // Use modulo to loop back to the beginning if index exceeds array length
      cards.push(allCards[(startIdx + i) % allCards.length]);
    }
    return cards;
  };

  useEffect(() => {
    if (allCards.length > 0) { // Ensure allCards is populated before setting initial state
      setActiveCards(getThreeCards(0));
    }
  }, [allCards]); // Add allCards to dependency array to re-run if it changes

  // --- Animation Handlers ---
  const handleNext = () => {
    if (animationState.trigger) return;

    const nextStartIdx = (currentIndex + 3) % allCards.length;
    setTransitioningCards(getThreeCards(nextStartIdx));
    setAnimationState({ direction: 'next', trigger: true });
    setCurrentIndex(nextStartIdx);
  };

  const handlePrev = () => {
    if (animationState.trigger) return;

    let prevStartIdx = currentIndex - 3;
    if (prevStartIdx < 0) {
      prevStartIdx = allCards.length + prevStartIdx;
    }
    setTransitioningCards(getThreeCards(prevStartIdx));
    setAnimationState({ direction: 'prev', trigger: true });
    setCurrentIndex(prevStartIdx);
  };

  // Callback function executed when the CSS transition completes.
  const onAnimationEnd = () => {
    if (animationState.trigger) {
      setActiveCards(transitioningCards);
      setTransitioningCards([]);
      setAnimationState({ direction: null, trigger: false });
    }
  };

  // --- Render Logic for Each Card Slot ---
  const renderCardSlot = (cardIndexInSet) => {
    const currentCard = activeCards[cardIndexInSet];
    const incomingOrOutgoingCard = transitioningCards[cardIndexInSet];

    const isNext = animationState.direction === 'next';
    const isPrev = animationState.direction === 'prev';
    const isTriggered = animationState.trigger;

    return (
      <div
        key={cardIndexInSet}
        className="relative rounded-lg shadow-lg overflow-hidden h-full min-h-[250px] bg-gray-700"
      >
        {/* Outgoing Card (from activeCards) */}
        {currentCard && (
          <div
            key={`outgoing-${currentCard.id}`}
            className={`
              absolute inset-0
              flex flex-col items-center justify-center text-center
              transition-all duration-300 ease-in-out transform
              ${isTriggered && isNext ? '-translate-x-full opacity-0 pointer-events-none' : ''}
              ${isTriggered && isPrev ? 'translate-x-full opacity-0 pointer-events-none' : ''}
              ${!isTriggered ? 'translate-x-0 opacity-100' : ''}
            `}
            onTransitionEnd={cardIndexInSet === 0 && isTriggered ? onAnimationEnd : undefined}
          >
            <CardWithHoverDescription {...currentCard} />
          </div>
        )}

        {/* Incoming Card (from transitioningCards) */}
        {incomingOrOutgoingCard && (
          <div
            key={`incoming-${incomingOrOutgoingCard.id}`}
            className={`
              absolute inset-0
              flex flex-col items-center justify-center text-center
              transition-all duration-300 ease-in-out transform
              ${isTriggered && isNext ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}
              ${isTriggered && isPrev ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}
            `}
          >
            <CardWithHoverDescription {...incomingOrOutgoingCard} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="flex justify-center mb-6 space-x-4">
            <button
              onClick={handlePrev}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 flex items-center justify-center"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 flex items-center justify-center"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 auto-rows-fr">
            {Array.from({ length: 3 }).map((_, i) => renderCardSlot(i))}
          </div>
        </main>
      </div>
    </div>
  );
}

// --- ServiceCards Component (Provides Data and Renders the Carousel) ---
function ServiceCards() {
  // Define your service card data objects
  const propertyTaxServiceCard = {
    id: 0, // Add unique IDs for keys
    title1: 'Property Tax',
    title2: '& Assessment',
    description: 'Addis Ababa property tax information, payment options, assessment records, and related legal documentation.',
    image: '../src/assets/images/property_logo.png', // Original image path
    backImage: '../src/assets/images/anbesa_bus.jpg', // Original image path
    listItems: [
      'Tax payment portal',
      'Property assessment records',
      'Legal amendments and updates',
    ]
  };

  const publicTransportServiceCard = {
    id: 1,
    title1: 'Public',
    title2: 'Transportation',
    description: 'Access bus schedules, route maps, ticket information, and real time updates for all public transportation services',
    image: '../src/assets/transportation_logo.png', // Original image path
    backImage: '../src/assets/images/anbesa_bus.jpg', // Original image path
    listItems: [
      "Bus schedules and routes",
      "Online ticket booking",
      "Service updates and alerts"
    ],
  };

  const latestAmendmentServiceCard = {
    id: 2,
    title1: 'Latest',
    title2: 'Amendments',
    description: 'Stay updated with the latest legal amendments, policy changes, and regulatory updates affecting city residents.',
    image: '../src/assets/property_logo.png', // Original image path
    backImage: 'https://placehold.co/400x240/555555/FFFFFF?text=Amend_BG', // Placeholder for missing original or use provided if available
    listItems: [
      "Recent policy changes",
      "Legal document updates",
      "Regulatory announcements",
    ],
  };

  const fireRescueServiceCard = {
    id: 3,
    title1: 'Fire &',
    title2: 'Rescue Services',
    description: 'Access fire department services, report hazardous conditions, and get emergency assistance information.',
    image: '../src/assets/images/addis_ababa_fire_station_logo.png', // Original image path
    backImage: '../src/assets/images/fire_fighters.jpg', // Original image path
    listItems: [
      "Dial 991 or 916",
      "Text for assistance",
    ],
  }

  const fireRescueServiceCard1 = {
    id: 4,
    title1: 'Health &',
    title2: 'Medical Services',
    description: 'Find information on clinics, hospitals, and public health initiatives.',
    image: 'https://placehold.co/80x80/000000/FFFFFF?text=Health',
    backImage: 'https://placehold.co/400x240/555555/FFFFFF?text=Health_BG',
    listItems: [
      "Emergency medical contacts",
      "Clinic locators",
      "Public health campaigns",
    ],
  }
  const fireRescueServiceCard2 = {
    id: 5,
    title1: 'Waste &',
    title2: 'Recycling',
    description: 'Learn about waste collection schedules and recycling programs.',
    image: 'https://placehold.co/80x80/000000/FFFFFF?text=Waste',
    backImage: 'https://placehold.co/400x240/555555/FFFFFF?text=Waste_BG',
    listItems: [
      "Collection days",
      "Recycling centers",
      "Environmental initiatives",
    ],
  }
  const fireRescueServiceCard3 = {
    id: 6,
    title1: 'Parks &',
    title2: 'Recreation',
    description: 'Discover local parks, recreational facilities, and community events.',
    image: 'https://placehold.co/80x80/000000/FFFFFF?text=Parks',
    backImage: 'https://placehold.co/400x240/555555/FFFFFF?text=Parks_BG',
    listItems: [
      "Park locations",
      "Event calendar",
      "Facility bookings",
    ],
  }
  const fireRescueServiceCard4 = {
    id: 7,
    title1: 'Education &',
    title2: 'Schools',
    description: 'Access information on public schools, adult education, and vocational training.',
    image: 'https://placehold.co/80x80/000000/FFFFFF?text=Education',
    backImage: 'https://placehold.co/400x240/555555/FFFFFF?text=Edu_BG',
    listItems: [
      "School directories",
      "Enrollment information",
      "Scholarship opportunities",
    ],
  }
  const fireRescueServiceCard5 = {
    id: 8,
    title1: 'Water &',
    title2: 'Sewer Services',
    description: 'Information on water supply, billing, and wastewater treatment.',
    image: 'https://placehold.co/80x80/000000/FFFFFF?text=Water',
    backImage: 'https://placehold.co/400x240/555555/FFFFFF?text=Water_BG',
    listItems: [
      "Billing inquiries",
      "Service interruptions",
      "Conservation tips",
    ],
  }

  // Combine all service cards into a single array.
  // This array is already correctly structured and can be passed directly.
  const serviceArray = [
    propertyTaxServiceCard,
    publicTransportServiceCard,
    latestAmendmentServiceCard,
    fireRescueServiceCard,
    fireRescueServiceCard1,
    fireRescueServiceCard2,
    fireRescueServiceCard3,
    fireRescueServiceCard4,
    fireRescueServiceCard5,
  ];

  return (
    <MovingServiceAnimation
      serviceObjects={serviceArray} // Pass the array directly as a prop
    />
  );
}

export default ServiceCards;

