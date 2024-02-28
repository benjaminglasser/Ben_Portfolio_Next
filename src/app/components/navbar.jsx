"use client";
import Grid from "@mui/system/Unstable_Grid/Grid";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const ROUTES = [
    { label: "WORK", route: "/work" },
    { label: "PLAY", route: "/play" },
    { label: "INFO", route: "/info" },
  ];

  const pathname = usePathname();
  return (
    <>
      <Grid container className="navbar">


        {pathname === "/work" | pathname === "/play" | pathname === "/info" ? (
          <Grid xs={12} md={pathname !== "/" ? 12 : 9} className="relative">
              <h1 className="dark:text-white  text-black   cursor-pointer font-medium text-center gmd:mt-10 md:text-end md:px-0 font-lato">
                <Link className="hover:text-pink dark:hover:text-pink" href="/">BENJAMIN GLASSER</Link>
              </h1> 
            <div className="px-0">
              <div className="flex  justify-end mt-10 border-t-[0.4px]  border-black dark:border-white">
                {ROUTES.map((item, idx) => (
                  <Link
                    href={item?.route}
                    key={idx}
                    className="size-full md:w-auto"
                  >
                  <div className="navCntr text-sm md: text-pink hover:text-white dark:text-pink hover:bg-pink dark:hover:text-white text-center border-r border-b-[0.4px] border-black dark:border-white cursor-pointer">
                    <h2 className="link">
                      {item?.label}
                    </h2>
                  </div>

                  </Link>
                ))}
              </div>
            </div>
          </Grid>
        ) 

        : pathname === "/" ? (
          <>
            <Grid xs={12} md={pathname !== "/" ? 12 : 9} className="relative">
            <div className="bg-black w-6 lg:w-6 h-[22rem] absolute right-0 top-0 mt-[-60px] extra-info" />
              <h1 className="dark:text-white  text-black  cursor-pointer font-medium text-center mt-10 md:mt-10 md:text-end md:pr-14 pt-2 font-lato">
                <Link className="hover:text-pink dark:hover:text-pink" href="/">BENJAMIN GLASSER</Link>
              </h1>
              <div className="px-0 md:px-8 lg:px-32">
                <div className="flex justify-between md:justify-end mt-4 md:mt-10 border-t-[0.4px]  border-black dark:border-white">
                  {ROUTES.map((item, idx) => (
                    <Link
                      href={item?.route}
                      key={idx}
                      className="w-full md:w-auto "
                    >
                    <div className="navCntr text-sm md: text-pink hover:text-white dark:text-pink hover:bg-pink dark:hover:text-white text-center border-r border-b-[0.4px] border-black dark:border-white cursor-pointer">
                    <h2 className="link">
                      {item?.label}
                    </h2>
                  </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Grid>
            <Grid sm={3} className="extra-info">
            
              <div className="pl-4 pt-9 flex flex-col justify-between h-full relative">
                <p className="tag">
                  <i className="text-sm">media artist, musician + designer</i>
                </p>
                <div className="description absolute right-0 -bottom-[7rem] ">
                  <p className="text-end ">Born 1994</p>
                  <p className="text-end">
                    Currently in{" "}
                    <span className="font-sprat">
                      Los Angeles
                    </span>
                  </p>
                </div>
              </div>
            </Grid>
          </>
          
        ):

        (
          
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-screen px-8 md:w-auto lg:px-10">
              <div className=" flex justify-between md:justify-end mt-4 md:mt-4 border-t border-l md:border-t md:border-b-0 border-black dark:border-white">
                {ROUTES.map((item, idx) => (
                  <Link
                    href={item?.route}
                    key={idx}
                    className="w-full md:w-auto "
                  >
                    <div className="navCntr text-sm md: bg-black text-pink hover:text-white dark:text-pink hover:bg-pink dark:hover:text-white text-center border-r border-b-[0.4px] border-black dark:border-white cursor-pointer">
                    <h2 className="link">
                      {item?.label}
                    </h2>
                  </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
        )}


        
      </Grid>
    </>
  );
};

export default Navbar;
