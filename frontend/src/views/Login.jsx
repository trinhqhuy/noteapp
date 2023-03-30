import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate, Navigate } from "react-router-dom";
import InputPassword from "../components/InputPassword";
import SideBarAuth from "../components/SideBarAuth";
import { loginUser } from "../redux/apiRequest";
import { useEffect } from "react";
import { useMemo } from "react";
import Toast from "../components/Toast";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHidePassword, setHidePassword] = useState(true);
  const [isToast, setToast] = useState(false);
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const onChangeInputPassword = () => {
    if (isHidePassword === false) {
      setHidePassword(true);
    } else {
      setHidePassword(false);
    }
  };
  if (isLoggedIn) {
    return <Navigate to="/" />;
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
      const newUser = {
        username: values.username,
        password: values.password,
      };
      loginUser(newUser, dispatch, navigate).then(() => {
        if (currentUser) return setToast(false);
        else {
          setToast(true);
          const timer = setTimeout(() => setToast(false), 6000);
          return () => clearTimeout(timer);
        }
      });
    },
  });
  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  });

  return (
    <div className="grid grid-cols-1 md:relative lg:relative xl:relative 2xl:relative md:flex lg:flex xl:flex 2xl:flex">
      <SideBarAuth />
      <div className="md:w-3/5 lg:w-3/5 xl:w-4/6 2xl:w-4/6 bg-[#F0F5FE] dark:bg-gray-800 min-h-screen flex flex-col justify-center items-center">
        {isToast && (
          <Toast setToast={setToast} message="Wrong account or password!" />
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
                onClick={() => onChangeInputPassword()}>
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
              disabled={!formik.dirty || !formik.isValid}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
