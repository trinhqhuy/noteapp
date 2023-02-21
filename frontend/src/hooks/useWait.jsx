import React, { lazy } from "react";

const useWait = (delay) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export default useWait;
