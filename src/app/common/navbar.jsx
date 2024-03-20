import Grid from "@mui/material/Grid";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const ROUTES = [
    { label: "PLAY", route: "/play" },
    { label: "INFO", route: "/info" },
  ];

  const pathname = usePathname();

  return (
    <Grid
      container
      className="navbar sticky top-0 pt-2 z-50 flex justify-between items-center border-b border-black dark:border-white bg-white dark:bg-black"
    >
      <Grid item xs={6} className="flex items-center ">
        <Link href="/">
          <h3 className="text-black dark:text-white cursor-pointer hover:text-pink dark:hover:text-pink">
            BENJAMIN GLASSER
          </h3>
        </Link>
      </Grid>
      <Grid item xs={6} className="flex justify-end items-center ">
        {ROUTES.map((item, idx) => (
          <Link
            href={item.route}
            key={idx}
            className={`border-r border-t border-black dark:border-white dark:text-white px-2.5 py-0.5 hover:text-pink dark:hover:text-pink ${
              idx < ROUTES.length - 1 ? "mr-2" : ""
            }`}
          >
            <h3 className="ml-4 md:ml-8">{item.label}</h3>
          </Link>
        ))}
      </Grid>
    </Grid>
  );
};

export default Navbar;
