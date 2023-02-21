import NavBar from "../components/NavBar";
import girlPhone from "../assets/illustrations/girlPhone.png";
import boyComputer from "../assets/illustrations/boyComputer.png";
import Carousel from "../components/Carousel";
import twoGirl from "../assets/illustrations/twoGirl.png";
import Logo from "../assets/Logo.v1.png";
import { Link } from "react-router-dom";
const SideBarAuth = () => {
  const imageCarousel = [
    {
      id: "1",
      src: girlPhone,
      alt: "Image 1",
      title: "Help you control your notes easily",
    },
    {
      id: "2",
      src: boyComputer,
      alt: "Image 2",
      title: "Works on multiple devices",
    },
    {
      id: "3",
      src: twoGirl,
      alt: "Image 3",
      title: "Connect with many users",
    },
  ];
  return (
    <>
      <div className=" md:w-2/5 lg:w-2/5 xl:w-2/6 bg-[#BFDBFE] dark:bg-[#023e7d] min-h-full md:min-h-screen lg:min-h-screen xl:min-h-screen 2xl:min-h-screen">
        <div className="flex flex-col justify-center items-center">
          <Link
            to="/"
            className="flex flex-row justify-end items-end content-end">
            <img
              className="w-20 m-5 mb-1 mr-1"
              src={Logo}
              alt="Logo"
              loading="lazy"
            />
            <span className="text-3xl font-extrabold text-black dark:text-white m-5 ml-0 mb-0">
              otes.
            </span>
          </Link>
          <Carousel imageCarousel={imageCarousel} />
        </div>
      </div>
    </>
  );
};

export default SideBarAuth;
