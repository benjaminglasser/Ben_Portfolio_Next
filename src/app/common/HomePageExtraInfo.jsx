import Link from "next/link";

const HomePageExtraInfo = () => {
  return (
    <div className="sm:col-span-3 absolute top-0 w-full p-5 text-greyDark h-[500px] md:h-[70vh] z-10">
      <div className="flex flex-col justify-between h-full relative">
        <p className="tag">
          <i className="text-sm text-white">
            product designer, media artist + musician
          </i>
        </p>
        <div className="description absolute right-0 bottom-0">
          <p className="text-end text-white">Born 1994</p>
          <p className="text-end text-white">34.0766°N, -118.2593°W</p>
          <p className="text-end text-white">
            lead product designer at{" "}
            <span className="ojuju text-white hover:text-black">
              <Link
                href="https://easelapps.ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                Easel AI
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePageExtraInfo;
