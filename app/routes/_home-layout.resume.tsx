import Resume from "~/content/resume.mdx";
import { ProseArticleModal } from "~/components/ProseArticleModal";

export default function About() {
  return (
    <ProseArticleModal>
      <Resume/>
    </ProseArticleModal>
  )
}
