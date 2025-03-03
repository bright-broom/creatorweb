import { works } from "@/lib/works";
import { WorkDetails } from "./work-details";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return works.map((work) => ({
    id: work.id.toString(),
  }));
}

export default function WorkPage({ params }: { params: { id: string } }) {
  const work = works.find((w) => w.id === parseInt(params.id));

  if (!work) {
    notFound();
  }

  return <WorkDetails work={work} />;
}