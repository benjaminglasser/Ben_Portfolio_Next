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
          <h1 className="text-black hover:text-pink cursor-pointer font-medium text-center md:text-end md:px-8 font-lato">
            <Link href="/">BENJAMIN GLASSER</Link>
          </h1>
          <div className="px-0 lg:px-24">
            <div className="flex justify-center md:justify-end mt-4 md:mt-10 border-y md:border-t md:border-b-0">
              {ROUTES.map((item, idx) => (
                <Link href={item?.route} key={idx}>
                  <h2 className="md:tracking-[1em] sm:tracking-[1.5em] text-sm hover:text-white hover:bg-pink w-full md:w-auto md:px-10 md:pl-16 text-center border-r md:border-b border-black cursor-pointer">
                    {item?.label}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
        </Grid>
        {pathname === "/" && (
          <Grid md={3} className="hidden lg:block">
            <div className="bg-black w-5 h-1/3 absolute top-0" />
            <div className="pl-10 flex flex-col justify-between h-full">
              <p className="tag">
                <i className="text-sm">media artist, musician + designer</i>
              </p>
              <div className="description">
                <p className="text-end text-sm font-semibold">Born 1994</p>
                <p className="text-end text-sm font-semibold">
                  Currently in{" "}
                  <span className="font-extralight text-xl font-sprat">
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
