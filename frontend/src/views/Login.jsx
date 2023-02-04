import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate, Navigate } from "react-router-dom";
import InputPassword from "../components/InputPassword";
import SideBarAuth from "../components/SideBarAuth";
import { loginUser } from "../redux/apiRequest";
import Logo from '../assets/favicons.png'
import { useEffect } from "react";
import { useMemo } from "react";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHidePassword, setHidePassword] = useState(true);
  const [isToast, setToast] = useState(false)
  const user = useSelector((state) => state.auth.login?.error);
  const currentUser = useSelector((state) => state.auth.login?.currentUser)
  const { isLoggedIn } = useSelector(state => state.auth);
  const onChangeInputPassword = () => {
    if (isHidePassword === false) {
      setHidePassword(true);
    } else {
      setHidePassword(false);
    }
  };
  if(isLoggedIn) {
    return <Navigate to="/"/>
  }
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(6, "Username has 5 characters or more"),
      password: Yup.string()
        .min(8, "Password has 8 characters or more")
        .matches(
          /^[A-Za-z]\w{7,14}$/,
          "The password must contain letters, numbers, no special characters"
        ),
    }),
    onSubmit: (values) => {
      // console.log(values.username);
      const newUser = {
        username: values.username,
        password: values.password,
      };
      loginUser(newUser, dispatch, navigate);
      handleOnSubmit()
    },
  });
  const handleOnSubmit = () => {
    if(currentUser != null) {
      setStatus(user)
    }
  }
  // console.log(currentUser)
  const setStatus = (value) => {
    setToast(value)
  }
  useEffect(() => {
    if(currentUser) {
      navigate("/")
    }
  })
  useMemo(() => setStatus(user), [user])
  return (
    <div className="grid grid-cols-1 gap-3 md:relative lg:relative xl:relative 2xl:relative md:flex lg:flex xl:flex 2xl:flex">
      <SideBarAuth />
      <div className="md:w-3/5 lg:w-3/5 xl:w-4/6 2xl:w-4/6 bg-[#F0F5FE] dark:bg-gray-800 min-h-screen flex flex-col justify-center items-center">
        {isToast ? (
          <div
          id="toast-notification"
          className="p-4 w-full max-w-xs text-gray-900 bg-white/70 backdrop-blur-xl border-2 border-white rounded-lg shadow"
          role="alert"
        >
          <div className="flex items-center mb-3">
            <span className="mb-1 text-sm font-semibold text-gray-900">
              New notification
            </span>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5  text-gray-500 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 "
              data-dismiss-target="#toast-notification"
              aria-label="Close"
              onClick={() => setStatus(false)}
            >
              <span className="sr-only">Close</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <div className="inline-block relative shrink-0">
              <img
                className="w-12 rounded-full"
                src={Logo}
                
              />
              <span className="inline-flex absolute right-0 bottom-0 justify-center items-center w-6 h-6 bg-blue-600 rounded-full text-white">
                <i className="fa-solid fa-bell text-sm"></i>
                <span className="sr-only">Message icon</span>
              </span>
            </div>
            <div className="ml-3 text-sm font-normal">
              {/* <div className="text-sm font-semibold text-gray-900">
                Bonnie Green
              </div> */}
              <div className="text-sm font-normal">
               Wrong account or password!
              </div>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-500">
                a few seconds ago
              </span>
            </div>
          </div>
        </div>
        ) : (
          <></>
        )}
        <div className="w-72 sm:w-80 md:w-96 lg:w-96 xl:w-96 2xl:w-96 mb-20">
          <div className="text-black dark:text-white text-3xl font-bold">
            Wellcome to Notes.
          </div>
          <div className="text-black dark:text-white text-xl font-medium mb-10 mt-4">
            New Here?{" "}
            <Link to="/signup" className="text-greatBlue">
              Create account
            </Link>
          </div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col">
            <label className="text-black dark:text-white text-lg font-bold my-3">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="text-black bg-lightBlue focus-visible:outline-none py-3 px-3 mb-5 w-72 sm:w-80 md:w-96 lg:w-96 xl:w-96 2xl:w-96 min-w-full rounded-md"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.errors.username && (
              <p className="text-greatRed text-sm">{formik.errors.username}</p>
            )}
            <label className="text-black dark:text-white text-lg font-bold my-3">
              Password
            </label>
            {/* <InputPassword sendToChild={setValueInputPassword} /> */}
            <div className="relative">
              <input
                id="password"
                type={isHidePassword ? "password" : "text"}
                className="block text-black bg-lightBlue focus-visible:outline-none py-3 px-3 mb-5 w-72 sm:w-80 md:w-96 lg:w-96 xl:w-96 2xl:w-96 min-w-full rounded-md"
                value={formik.values.password}
                onChange={formik.handleChange}
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
            {formik.errors.password && (
              <p className="text-greatRed text-sm">{formik.errors.password}</p>
            )}
            <button
              type="submit"
              className="text-white bg-greatBlue font-bold mt-5 mb-10 py-3 w-72 sm:w-80 md:w-96 lg:w-96 xl:w-96 2xl:w-96 min-h-full rounded-md"
            >
              Sign In
            </button>
            

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
