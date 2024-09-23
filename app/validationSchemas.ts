import zod from "zod";

export const newIssueSchema = zod.object({
  title: zod.string().min(1, "Title is required"), // Add a custom error message
  description: zod.string(),
});
