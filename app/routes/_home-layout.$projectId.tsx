import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useParams } from "@remix-run/react";
import { ProjectPage } from "~/components/ProjectPage";
import { projects } from "~/content/projects";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { projectId } = params;

  if (!projectId) {
    throw new Error("No projectId provided");
  }

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    throw json("Not Foundg", { status: 404 });
  }

  return null
};

export default function ProjectThisPortfolio() {
  const { projectId } = useParams();

  if (!projectId) {
    throw new Error("No projectId provided");
  }

  const project = projects.find((p) => p.id === projectId);

  
  if (!project) {
    throw new Error(`Project with id ${projectId} not found`);
  }
  
  const ProjectContent = project.default;

  return (
    <ProjectPage>
      <ProjectContent />
    </ProjectPage>
  )
}
