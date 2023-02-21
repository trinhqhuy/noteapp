import { useState, useEffect } from "react";

const Test = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleOtherComponentClick = () => {
    setTimeout(() => setIsVisible(false), 500); // delay hiding by 500ms
  };

  useEffect(() => {
    if (!isVisible) {
      const timerId = setTimeout(() => {
        // do something before unmounting, e.g. call a callback function
      }, 500); // add additional delay before unmounting by 500ms

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [isVisible]);

  return (
    <div
      className={`my-component transition-opacity ${
        isVisible ? "" : "opacity-0"
      }`}>
      {/* Component content */}
      <button onClick={handleOtherComponentClick}>Click me to fade out</button>
    </div>
  );
};
export default Test;
