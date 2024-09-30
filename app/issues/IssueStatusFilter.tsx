"use client";

import React from "react";
import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  {
    label: "All",
  },
  {
    label: "Open",
    value: "OPEN",
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
  {
    label: "Closed",
    value: "CLOSED",
  },
];

const IssueStatusFilter = () => {
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status && status != "All" ? `?status=${status}` : "";
        router.push("/issues" + query);
      }}
    >
      <Select.Trigger
        className="cursor-pointer"
        placeholder="Filter by status..."
      />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item
            className="cursor-pointer"
            key={status.label}
            value={status.value || "All"}
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
