
import { createContext } from "react";
import { useState } from "react";
const InputContext = createContext()
const InputPassword = (props) => {
  const [isHidePassword, setHidePassword] = useState(true);
  const onChangeInputPassword = () => {
    if (isHidePassword === false) {
      setHidePassword(true);
    } else {
      setHidePassword(false);
    }
  };
  return (
    <div className="relative">
     <input
        type={isHidePassword ? "password" : "text"}
        className="block text-black bg-lightBlue focus-visible:outline-none py-3 px-3 mb-5 w-72 sm:w-80 md:w-96 lg:w-96 xl:w-96 2xl:w-96 min-w-full rounded-md"
        onChange={(e) => props.sendToChild(e.target.value)}
      />
      <button
        type="button"
        className="text-greatBlue absolute inset-y-0 right-0 pr-3 mb-5 flex items-center mr-3 leading-5"
        onClick={() => onChangeInputPassword()}
      >
        {isHidePassword ? (
          <i className="fa-regular fa-eye"></i>
        ) : (
          <i className="fa-regular fa-eye-slash"></i>
        )}
      </button>
    </div>
  );
};

export default InputPassword;
