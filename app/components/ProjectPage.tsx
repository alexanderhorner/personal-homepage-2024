import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { PageModal } from "./PageModal";

interface ProjectPageProps {
  children: ReactNode;
}

export const ProjectPage = ({ children }: ProjectPageProps) => {
  return (
    <PageModal>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0, transition: { ease: "easeOut" } }}
        exit={{ opacity: 0, y: 200, transition: { ease: "anticipate" } }}
        className="bg-white p-6 sm:px-10 sm:pt-10 pb-20 max-w-fit mx-auto flex flex-col gap-5 hyphens-auto rounded-3xl my-24"
      >

        <Link
          autoFocus
          to="/"
          preventScrollReset
          className="sticky top-8 ml-auto text-2xl et
            text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors
            rounded-full w-8 h-8 grid place-items-center"
        >
          <FontAwesomeIcon icon={faXmark} className="text-base"/>
        </Link>

        <article className="prose">
          {children}
        </article>

      </motion.div>
      
    </PageModal>
  );
}