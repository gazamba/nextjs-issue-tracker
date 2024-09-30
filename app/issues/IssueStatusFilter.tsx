"use client";

import React from "react";
import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";

const IssueStatusFilter = () => {
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
  return (
    <Select.Root>
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
