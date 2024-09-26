"use client";

import { AlertDialog, Flex, Button, Box } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/app/components";
import "@/app/globals.css";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteIssue = async () => {
    try {
      setIsDeleting(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            style={{ cursor: "pointer" }}
            disabled={isDeleting}
            color="red"
          >
            <Box>Delete Issue {isDeleting && <Spinner />}</Box>
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This issue will be pertmanently deleted.
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                style={{ cursor: "pointer" }}
                onClick={deleteIssue}
                variant="solid"
                color="red"
              >
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description size="2">
            This issue could not be deleted. Please try again.
          </AlertDialog.Description>
          <AlertDialog.Cancel>
            <Button
              style={{ cursor: "pointer" }}
              mt="2"
              onClick={() => setError(false)}
              variant="soft"
              color="gray"
            >
              OK
            </Button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
