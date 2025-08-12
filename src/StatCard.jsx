import React, { useState, useEffect, useRef } from "react";

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
export default StatCard;
