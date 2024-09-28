"use client";

import React, { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";
import { Issue, User } from "@prisma/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/app/components/Skeleton";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const assigneIssue = (userId: string) => {
    axios
      .patch("/api/issues/" + issue.id, {
        assignedUserId: userId === "unassigned" ? null : userId,
      })
      .catch(() => toast.error("Failed to update assignee"));
    // TODO: Style better the toast component
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedUserId || "unassigned"}
        onValueChange={assigneIssue}
      >
        <Select.Trigger className="cursor-pointer" placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item className="cursor-pointer" value="unassigned">
              Unassigned
            </Select.Item>
            {users?.map((user) => (
              <Select.Item
                className="cursor-pointer"
                key={user.id}
                value={user.id}
              >
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });

export default AssigneeSelect;
