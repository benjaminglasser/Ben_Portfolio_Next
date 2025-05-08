"use client";
import { PuffLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <PuffLoader
        color="#A9232C"
        loading
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
} 