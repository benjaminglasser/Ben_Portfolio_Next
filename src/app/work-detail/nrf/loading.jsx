import React from "react";
import { CircleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="mt-72 w-screen h-screen flex justify-center items-center">
      <CircleLoader
        color="#ff477b"
        loading
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
