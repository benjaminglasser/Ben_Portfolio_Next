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
    <div className="sticky top-0 z-50 flex justify-between items-center border-b border-black dark:border-white bg-white dark:bg-black">
      <h3>
        <Link
          href="/"
          className="hover:text-pink dark:text-white dark:hover:text-pink"
        >
          BENJAMIN GLASSER
        </Link>
      </h3>
      <div className="flex">
        {/* Uncomment and apply dark mode styles as needed
        <h3
          onClick={navigateToWork}
          className="cursor-pointer hover:text-pink px-2.5 py-0.5 border-r border-t border-black dark:border-white dark:text-white dark:hover:text-pink"
        >
          WORK
        </h3> */}
        {ROUTES.map((item, idx) => (
          <Link
            href={item.route}
            key={idx}
            className={`border-r border-t border-black dark:border-white dark:text-white px-2.5 py-0.5 hover:text-pink dark:hover:text-pink ${
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
