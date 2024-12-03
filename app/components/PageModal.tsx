import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { PropsWithChildren, ReactNode } from "react";
import { PageDialog } from "./PageDialog";


export const PageModal = ({ children }: PropsWithChildren) => {
  return (
    <PageDialog>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0, transition: { ease: "easeOut" } }}
        exit={{ opacity: 0, y: 200, transition: { ease: "anticipate" } }}
        className="bg-white p-6 pb-20 sm:px-10 sm:pt-10 md:px-14 max-w-fit mx-auto flex flex-col gap-5 hyphens-auto rounded-3xl my-24"
      >

        <Link
          autoFocus
          to="/"
          aria-label="Close modal"
          preventScrollReset
          className="sticky top-8 ml-auto text-2xl et
            text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors
            rounded-full w-8 h-8 grid place-items-center"
        >
          <FontAwesomeIcon icon={faXmark} className="text-base"/>
        </Link>

          {children}

      </motion.div>
      
    </PageDialog>
  );
}
