import Link from "next/link";

const HomePageExtraInfo = () => {
  return (
    <div className="sm:col-span-3 absolute top-0 w-full p-5 text-greyDark h-[500px] md:h-[70vh] z-10">
      <div className="flex flex-col justify-between h-full relative">
        <p className="tag">
          <i className="text-sm text-white">
            designer, media artist + musician
          </i>
        </p>
        <div className="description absolute right-0 bottom-0">
          <p className="text-end text-white">born 1994</p>
          <p className="text-end text-white">34.0766°N, -118.2593°W</p>
          <p className="text-end text-white">
            experience designer at{" "}
            <span className="ojuju text-white hover:text-black">
              <Link
                href="https://cdn.sanity.io/images/bl383u0v/production/b8bf3938336ab457e1045e90fe737ce0c59f1cde-1500x1000.jpg?rect=0,106,1500,788&w=1200&h=630&q=70&fit=crop&auto=format"
                target="_blank"
                rel="noopener noreferrer"
              >
                adobe
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePageExtraInfo;
