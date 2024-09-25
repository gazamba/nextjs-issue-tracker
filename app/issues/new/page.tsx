"use client";

import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { newIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import delay from "delay";

// const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
//   ssr: false,
// }); // dynamic import to prevent SSR for lazy loading

type IssueForm = z.infer<typeof newIssueSchema>;

const NewIssuePage = async () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubitting, setIsSubitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(newIssueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  }); // good practice to keep logic separate from TSX markup return

  await delay(1000);
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button style={{ cursor: "pointer" }} disabled={isSubitting}>
          Submit New Issue
          {isSubitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
