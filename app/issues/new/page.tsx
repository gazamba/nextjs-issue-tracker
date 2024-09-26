import React from "react";
import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
});

const NewIssuePage = () => {
  return (
    <div>
      <IssueForm />
    </div>
  );
};

export default NewIssuePage;
