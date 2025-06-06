import * as ThisPortfolio from "./this-portfolio.mdx";
import * as Portfolio2022 from "./portfolio-2022.mdx";
import * as WggHomepage from "./wgg-homepage.mdx";
import * as DentistryHomepage from "./dentistry-homepage.mdx";
import * as InteractiveEducation from "./interactive-education.mdx";
import * as Resume from "./resume.mdx";
import * as AboutMe from "./about-me.mdx";
import * as AiNovelViewSynthesis from "./ai-novel-view-synthesis.mdx";

export const projects = [
  ThisPortfolio,
  AiNovelViewSynthesis,
  WggHomepage,
  // InteractiveErm,
  Portfolio2022,
  DentistryHomepage,
  InteractiveEducation,
];

export const articles = [
  ...projects,
  Resume,
  AboutMe,
];