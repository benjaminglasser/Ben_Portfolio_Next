import Link from "next/link";

const HomePageExtraInfo = () => {
  return (
    <div className="sm:col-span-3 absolute top-0 w-full p-5 text-greyDark h-[350px] md:h-[450px] z-10">
      <div className="flex flex-col justify-between h-full relative">
        <p className="tag">
          <i className="text-sm">media artist, musician + designer</i>
        </p>
        <div className="description absolute right-[2rem] -bottom-[8rem]">
          <p className="text-end">Born 1994</p>
          <p className="text-end">
            Currently at{" "}
            <span className="ojuju hover:text-pink">
              <Link
                href="https://easelapps.ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                Easel AI
              </Link>
            </span>
          </p>
          <p className="text-end">30.2672°N, 97.7431°W</p>
        </div>
      </div>
    </div>
  );
};

export default HomePageExtraInfo;
