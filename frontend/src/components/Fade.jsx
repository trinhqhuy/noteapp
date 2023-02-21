import { useState, useEffect } from "react";

function Fade({ show, children }) {
  const [shouldRender, setRender] = useState(show);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };
  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  return (
    shouldRender && (
      <div
        className={
          "transform-gpu " + show ? "animate-fadeIn" : "animate-fadeOut"
        }
        onAnimationEnd={onAnimationEnd}>
        {children}
      </div>
    )
  );
}

export default Fade;
