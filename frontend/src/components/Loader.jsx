import { useRef, useEffect } from "react";
import Spinner from "./Spinner";
function Loader() {
  const loaderRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      loaderRef.current.classList.add("animate-fadeIn");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed z-50 translate-y-[-50%] translate-x-[-50%] left-[50%] top-[50%] transform-gpu min-w-screen "
      ref={loaderRef}>
      <Spinner />
    </div>
  );
}
export default Loader;
