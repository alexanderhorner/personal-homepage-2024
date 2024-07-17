import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Link, Outlet, useLocation, useNavigate, useOutlet } from "@remix-run/react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "framer-motion";
import { cloneElement, useState } from "react";
import ElevatorPitch from "~/content/elevator-pitch.mdx"
import PortfolioIntroduction from "~/content/portfolio-introduction.mdx"
import AboutMe from "~/content/about-me.mdx"
import { projects } from "~/content/projects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export const meta: MetaFunction = () => {
  return [
    { title: "Alexander Horner" },
    { name: "description", content: "I am Alexander Horner, a developer and designer. Welcome to my personal homepage!" },
  ];
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "preload",
      href: "/images/modern-architecture-q60-x0.5.webp",
      as: "image",
    },
  ];
};

const AnimatedOutlet = (): React.JSX.Element => {
  const { pathname } = useLocation();
  const element = useOutlet();

  return (
    <AnimatePresence initial={false}>
      {element && cloneElement(element, { key: pathname })}
    </AnimatePresence>
  );
};


export default function Index() {
  return (
    <div className="relative">
      <HeroSection />
      <AboutMeSection />

      <AnimatedOutlet />

      <PorfolioSection/>

      <CallToAction />

      <Footer />
    </div>
  );
}



const Header = () => {
  return (
    <header className="flex items-center justify-left gap-4 px-5 py-6 md:px-6 lg:px-8">
      <span className="text-orange-600 mr-auto font-display font-medium">Alexander Horner</span>
      <Link 
        to="https://www.linkedin.com/in/alexander-horner-5ba3a31a0" 
        className="text-gray-800 transition-opacity hover:opacity-60 text-2xl w-7 h-7 grid place-items-center"
      >
        <FontAwesomeIcon icon={faLinkedin} className=""/>
        {/* LinkedIn */}
      </Link>

      <Link 
        to="https://github.com/alexanderhorner"
        className="text-gray-800 transition-opacity hover:opacity-60 text-2xl w-7 h-7 grid place-items-center"
      >
        <FontAwesomeIcon icon={faGithub} className=""/>
        {/* GitHub */}
      </Link>
    </header>
  );
}

const HeroSection = () => {
  return (
    <section className="bg-modern-architecture bg-cover bg-center lg:text-center
      grid grid-cols-1 grid-rows-[4fr,auto,6fr] md:grid-rows-[5fr,auto,5fr]
      h-[clamp(640px,100svh,700px)] md:h-[clamp(640px,100svh,750px)] lg:h-[clamp(640px,100svh,800px)]"
    >
      <div className="">
        <Header />
      </div>

      <div className="">

        <h1 className="text-5xl md:text-6xl font-semibold px-5 font-display md:px-6 lg:px-8 max-w-screen-lg lg:mx-auto pr-10">
          Combining Visual Creativity with Technical Excellence
        </h1>

        <h2 className="text-orange-600 px-5 mt-3 md:px-6 lg:px-8 text-lg md:text-xl">
          Software Development and Design
        </h2>

        {/* <div className="flex gap-5 mt-10 px-5 md:px-6 lg:px-8 lg:justify-center">
          <Link 
            to="https://www.linkedin.com/in/alexander-horner-5ba3a31a0" 
            className="backdrop-blur-sm border border-gray-900 border-solid py-2 px-4 inline-block hover:bg-gray-900 hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faLinkedin} className="mr-2"/>
            LinkedIn
          </Link>

          <Link 
            to="https://github.com/alexanderhorner"
            className="backdrop-blur-sm border border-gray-900 border-solid py-2 px-4 inline-block hover:bg-gray-900 hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faGithub} className="mr-2"/>
            GitHub
          </Link>
        </div> */}

      </div>

    </section>
  )
}

const AboutMeSection = () => {

  return (
    <section className="bg-white py-20 md:py-32 px-5 md:px-6 lg:px-8 xl:px-20 max-w-screen-xl mx-auto">

      <div className="prose prose-orange md:prose-lg prose-strong:underline prose-strong:decoration-orange-500 prose-strong:underline-offset-2 prose-strong:decoration-from-font prose-headings:font-display">
        <ElevatorPitch />
      </div>

      <Link 
        to="/about" 
        preventScrollReset
        className="border border-gray-900 border-solid py-2 px-3 inline-block mt-5 hover:bg-gray-100 transition-colors"
      >
        More about me
      </Link>

    </section>
  )
}

const PorfolioSection = () => {
  return (
    <section className="bg-gray-100 py-20 px-5 md:px-6 lg:px-8 xl:px-20 xl:py-24 max-w-screen-xl mx-auto">

        <div className="grid gap-y-10 gap-x-10 grid-cols-[repeat(auto-fill,minmax(min(344px,100%),1fr))]">
          <div className="prose prose-orange md:prose-lg col-span-1 md:col-span-2">
            <PortfolioIntroduction />
          </div>

          { projects.map((project) => (
            <PortfolioItemCard 
              key={project.id}
              id={project.id}
              img={project.img}
              title={project.title}
              description={project.description}
            />
          ))}
        </div>

    </section>
  )
}

interface PortfolioItemProps {
  id: string;
  img: string;
  title: string;
  description: string;
}

export const PortfolioItemCard = ({ id, title, img, description }: PortfolioItemProps) => {
  return (
    <Link to={id} className="block" preventScrollReset>

      <div 
        className="bg-white rounded-md overflow-hidden block shadow-xl hover:shadow-2xl transition-all duration-500" 
      >

        <div>
          <img src={img} alt="Forrest" className="w-full aspect-video object-cover" width={1920} height={1080}/>
        </div>      

        <div className="p-4">
          <h3 className="font-bold leading-snug">
            {title}
          </h3>
          <div className="text-gray-600 mt-1 line-clamp-2 leading-snug">
            {description}
          </div>
        </div>
        
      </div>

    </Link>
  )
}

const CallToAction = () => {
  return (
    <section className="py-32 px-4 bg-white">
      <div className="text-center">
        <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">Interested in working together?</p>
        <p className="text-lg md:text-xl text-gray-600">Let's connect.</p>
      </div>

      <div className="flex justify-center gap-5 mt-8 md:text-lg">
        <Link 
          to="https://www.linkedin.com/in/alexander-horner-5ba3a31a0" 
          className="border border-gray-900 border-solid py-2 px-4 inline-block hover:bg-gray-900 hover:text-white transition-colors"
        >
          <FontAwesomeIcon icon={faLinkedin} className="mr-2"/>
          LinkedIn
        </Link>

        <Link 
          to="https://github.com/alexanderhorner"
          className="border border-gray-900 border-solid py-2 px-4 inline-block hover:bg-gray-900 hover:text-white transition-colors"
        >
          <FontAwesomeIcon icon={faGithub} className="mr-2"/>
          GitHub
        </Link>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 py-10 text-center">
      <div className="text-sm">
         © 2024 Alexander Horner
      </div>
    </footer>
  )
}
