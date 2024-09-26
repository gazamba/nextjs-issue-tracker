import zod from "zod";

export const issueSchema = zod.object({
  title: zod.string().min(1, "Title is required"), // Add a custom error message
  description: zod.string(),
});
