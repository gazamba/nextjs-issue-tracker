import prisma from "@/prisma/client";
import { Heading, Flex, Card } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import delay from "delay";

interface Props {
  params: { id: string };
}

const IssuesDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    notFound();
  }

  await delay(2000);

  return (
    <div className="space-y-3">
      <Heading>{issue.title}</Heading>
      <Flex gap="3">
        <IssueStatusBadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card className="prose">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssuesDetailPage;
