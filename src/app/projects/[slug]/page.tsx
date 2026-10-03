import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/projects/CaseStudy";
import { site } from "@/content/config/site";
import { getPublishableProject, getPublishableProjects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return getPublishableProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPublishableProject(slug);
  if (!project) return {};

  const title = `${project.title} case study`;
  const description = project.summary;
  const url = `${site.url}/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${title} | Tejas Vermani`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Tejas Vermani`,
      description,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getPublishableProject(slug);
  if (!project) notFound();

  return <CaseStudy project={project} />;
}
