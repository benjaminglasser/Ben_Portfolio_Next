import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const HomePageExtraInfo = ({ isLoading }) => {
  const pathname = usePathname();
  const isPlayPage = pathname === "/play";
  const isWorkDetailPage = pathname.startsWith("/work-detail");

  return (
    <div className="sm:col-span-3 absolute top-0 w-full p-5 text-greyDark h-[500px] md:h-[70vh] z-10">
      <div className="flex flex-col justify-between h-full relative">
        <motion.p 
          className="tag"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ 
            duration: 0.5,
            delay: 0.5,
            ease: "easeInOut"
          }}
        >
          <i className="text-sm text-white">
            designer, media artist + musician
          </i>
        </motion.p>
        <motion.div 
          className="description absolute right-0 bottom-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ 
            duration: 0.5,
            delay: 0.5,
            ease: "easeInOut"
          }}
        >
          <p className="text-end text-white">born 1994</p>
          <p className="text-end text-white">34°04'35"N 118°15'33"W</p>
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
        </motion.div>
      </div>
    </div>
  );
};

export default HomePageExtraInfo;
