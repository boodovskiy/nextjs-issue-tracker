"use client";

import dynamic from "next/dynamic";
import type { Issue } from "@prisma/client";
import IssueFormSkeleton from "./IssueFormSkeleton";

const IssueForm = dynamic(() => import("./IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  issue?: Issue;
}

const IssueFormLoader = ({ issue }: Props) => {
  return <IssueForm issue={issue} />;
};

export default IssueFormLoader;
