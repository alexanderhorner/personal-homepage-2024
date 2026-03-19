import { PropsWithChildren } from "react";
import { PageModal } from "./PageModal";


export const ProseArticleModal = ({ children }: PropsWithChildren) => {
  return (
    <PageModal>
      <article className="prose prose-orange md:prose-lg">
        {children}
      </article>
    </PageModal>
  );
};
