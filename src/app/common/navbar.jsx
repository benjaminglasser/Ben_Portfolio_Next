"use client";
import Link from "next/link";
// import { useRouter } from "next/router";

const Navbar = () => {
  // const router = useRouter();

  const navigateToWork = () => {
    // Set a flag in sessionStorage before navigating
    sessionStorage.setItem("navigateToWork", "true");
    router.push("/?scrollTo=work");
  };

  const ROUTES = [
    { label: "PLAY", route: "/play" },
    { label: "INFO", route: "/info" },
  ];

  return (
    <div className="px-10 flex justify-between items-center border-b border-black">
      <h3>
        <Link href="/" className="hover:text-pink ">
          BENJAMIN GLASSER
        </Link>
      </h3>
      <div className="flex">
        {/* <h3
          onClick={navigateToWork}
          className="cursor-pointer hover:text-pink px-2.5 py-0.5 border-r border-t border-black dark:border-white"
        >
          WORK
        </h3> */}
        {ROUTES.map((item, idx) => (
          <Link
            href={item.route}
            key={idx}
            className={`border-r border-t border-black dark:border-white px-2.5 py-0.5 hover:text-pink dark:hover:text-pink ${
              idx < ROUTES.length - 1 ? "mr-2" : ""
            }`}
          >
            <h3 className="ml-8">{item.label}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
