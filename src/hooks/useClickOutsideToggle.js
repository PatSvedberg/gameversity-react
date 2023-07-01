import { useEffect, useRef, useState } from "react";

const useClickOutsideToggle = () => {
  // State for tracking the expanded/collapsed state
  const [expanded, setExpanded] = useState(false);

  // Ref for the target element
  const ref = useRef(null);
  useEffect(() => {
    // Function to handle the click outside event
    const handleClickOutside = (event) => {
      // Check if the clicked element is outside the ref element
      if (ref.current && !ref.current.contains(event.target)) {
        // If clicked outside, collapse the component
        setExpanded(false);
      }
    };

    // Add event listener for mouseup event
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  // Return the expanded state, setExpanded function, and ref
  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;
