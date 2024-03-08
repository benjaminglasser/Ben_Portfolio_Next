import React from "react";
import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <PuffLoader
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
