import { Link, NavLink, useNavigate } from "react-router-dom";
import SideBarAuth from "../components/SideBarAuth";
import { useState } from "react";
// import InputPassword from "../components/InputPassword";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { registerUser } from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
const SignUp = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [isHidePassword, setHidePassword] = useState(true);
  const onChangeInputPassword = () => {
    if (isHidePassword === false) {
      setHidePassword(true);
    } else {
      setHidePassword(false);
    }
  };
  const [isHideRePassword, setHideRePassword] = useState(true);
  const onChangeInputRePassword = () => {
    if (isHideRePassword === false) {
      setHideRePassword(true);
    } else {
      setHideRePassword(false);
    }
  };
  const user = useSelector((state) => state.auth.login?.currentUser);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      repassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Required")
        .min(6, "You need to type higher 5 character"),
      email: Yup.string()
        .required("Required")
        .matches(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          "The value is not a valid email address"
        ),
      password: Yup.string()
        .required("Required")
        .min(8, "The password need higher 8 character")
        .matches(
          /^[A-Za-z]\w{7,14}$/,
          "The password must contain letters, numbers, no special characters"
        ),
      repassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password")], "Your passwords do not match"),
    }),
    onSubmit: (values) => {
      const newUser = {
        username: values.username,
        password: values.password,
        email: values.email,
      };
      registerUser(newUser, dispatch, navigate);
    },
  });
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  return (
    <div className="grid grid-cols-1 gap-3 md:gap-0 lg:gap-0 xl:gap-0 2xl:gap-0 md:relative lg:relative xl:relative 2xl:relative md:flex lg:flex xl:flex 2xl:flex">
      <SideBarAuth />
      <div className="md:w-3/5 lg:w-3/5 xl:w-4/6 2xl:w-4/6 bg-[#F0F5FE] dark:bg-gray-800 h-full min-h-screen flex flex-col justify-center items-center">
        <div className="w-72 sm:w-80 md:w-96 lg:w-96 xl:w-96 2xl:w-96 mt-24 lg:mt-10 xl:mt-5 2xl:mt-5">
          <div className="text-black dark:text-white text-3xl font-bold ">
            Wellcome to Notes.
          </div>
          <div className="text-black dark:text-white text-xl font-medium mb-5 mt-4">
            You have account?{" "}
            <Link to="/login" className="text-greatBlue">
              Sign in
            </Link>
          </div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col">
            <label className="text-black dark:text-white text-lg font-bold my-3">
              Username
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                className="text-black bg-lightBlue focus-visible:outline-none py-3 px-3 mb-5 w-72 sm:w-80 md:w-96 lg:w-96 xl:w-96 2xl:w-96 min-w-full rounded-md"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.errors.username && (
                <div className="text-greatBlue absolute inset-y-0 right-0 pr-3 mb-5 flex items-center mr-3 leading-5">
                  <i className="fa-regular fa-circle-exclamation text-greatRed"></i>
                </div>
              )}
            </div>
            {formik.errors.username && (
              <p className="text-greatRed text-sm">{formik.errors.username}</p>
            )}
            <label className="text-black dark:text-white text-lg font-bold my-3">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                className="text-black bg-lightBlue focus-visible:outline-none py-3 px-3 mb-5 w-72 sm:w-80 md:w-96 lg:w-96 xl:w-96 2xl:w-96 min-w-full rounded-md"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && (
                <div className="text-greatBlue absolute inset-y-0 right-0 pr-3 mb-5 flex items-center mr-3 leading-5">
                  <i className="fa-regular fa-circle-exclamation text-greatRed"></i>
                </div>
              )}
            </div>
            {formik.errors.email && (
              <p className="text-greatRed text-sm">{formik.errors.email}</p>
            )}
            <label className="text-black dark:text-white text-lg font-bold my-3">
              Password
            </label>

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
            <label className="text-black dark:text-white text-lg font-bold my-3">
              Re-Password
            </label>
            <div className="relative">
              <input
                id="repassword"
                type={isHideRePassword ? "password" : "text"}
                className="block text-black bg-lightBlue focus-visible:outline-none py-3 px-3 mb-5 w-72 sm:w-80 md:w-96 lg:w-96 xl:w-96 2xl:w-96 min-w-full rounded-md"
                value={formik.values.repassword}
                onChange={formik.handleChange}
              />
              <button
                type="button"
                className="text-greatBlue absolute inset-y-0 right-0 pr-3 mb-5 flex items-center mr-3 leading-5"
                onClick={() => onChangeInputRePassword()}>
                {isHideRePassword ? (
                  <i className="fa-regular fa-eye"></i>
                ) : (
                  <i className="fa-regular fa-eye-slash"></i>
                )}
              </button>
            </div>
            {formik.errors.repassword && (
              <p className="text-greatRed text-sm">
                {formik.errors.repassword}
              </p>
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

export default SignUp;
