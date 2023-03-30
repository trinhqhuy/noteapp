import { useContext, useState, useEffect } from "react";
// import imageArr from "../assets/avatar/index";
import { Store } from "../context/GobalState";
const Profile = ({ avatar, username }) => {
  const { state, dispatch } = useContext(Store);
  const [image, setImage] = useState("");
  useEffect(() => {
    avatar != undefined &&
      import(`../assets/avatar/${avatar}.png`)
        .then((image) => setImage(image?.default))
        .catch((err) => console.error(err));
  }, [avatar]);
  return (
    <div className="flex flex-row items-center justify-center">
      <button
        className="m-3 p-2 flex flex-row justify-center items-center"
        onClick={() =>
          dispatch({
            type: "isPopOversAccount",
            payload: !state.isPopOversAccount,
          })
        }>
        <img className="w-10 h-10 rounded-full mr-2" src={image} alt="" />
      </button>
    </div>
  );
};

export default Profile;
