import React from "react";
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

export default DropdownWithDescription;
