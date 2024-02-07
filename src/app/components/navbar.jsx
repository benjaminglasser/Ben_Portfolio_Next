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
      <Grid container>
        <Grid xs={12} md={pathname !== "/" ? 12 : 9}>
          <h1 className="dark:text-white text-black hover:text-pink cursor-pointer font-medium text-center md:text-end md:px-8 font-lato">
            <Link href="/">BENJAMIN GLASSER</Link>
          </h1>
          <div className="px-0 md:px-8 lg:px-32">
            <div className="flex justify-between md:justify-end mt-4 md:mt-10 border-y-[0.4px] md:border-t-[0.4px] md:border-b-0 border-black dark:border-white">
              {ROUTES.map((item, idx) => (
                <Link
                  href={item?.route}
                  key={idx}
                  className="w-full md:w-auto "
                >
                  <h2 className="text-xs tracking-[0.6em] sm:tracking-[0.8em] md:tracking-[1em] md:text-sm text-black dark:text-white hover:text-white hover:bg-pink  text-center md:px-5 md:pl-8 border-r md:border-b-[0.4px] border-black dark:border-white cursor-pointer">
                    {item?.label}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
        </Grid>
        {pathname === "/" && (
          <Grid sm={3} className="extra-info">
            <div className="bg-black w-4 lg:w-6 h-[17.35rem] absolute top-0" />
            <div className="pl-10 flex flex-col justify-between h-full relative">
              <p className="tag">
                <i className="text-sm">media artist, musician + designer</i>
              </p>
              <div className="description absolute right-0 -bottom-[7rem] text-sm">
                <p className="text-end font-semibold">Born 1994</p>
                <p className="text-end font-semibold">
                  Currently in{" "}
                  <span className="font-extralight font-sprat">
                    Los Angeles
                  </span>
                </p>
              </div>
            </div>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Navbar;
