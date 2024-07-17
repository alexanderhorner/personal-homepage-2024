import AboutMe from "~/content/about-me.mdx";
import { ProseArticleModal } from "~/components/ProseArticleModal";

export default function About() {
  return (
    <ProseArticleModal>
      <AboutMe/>
    </ProseArticleModal>
  )
}
