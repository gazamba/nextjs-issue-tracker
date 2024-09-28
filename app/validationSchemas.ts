import zod from "zod";

export const issueSchema = zod.object({
  title: zod.string().min(1, "Title is required").max(255).optional(),
  description: zod.string().max(65535).optional(),
});

export const patchIssueSchema = zod.object({
  title: zod.string().min(1, "Title is required").max(255).optional(),
  description: zod.string().max(65535).optional(),
  assignedUserId: zod
    .string()
    .min(1, "Assignee user id is required")
    .max(255)
    .optional()
    .nullable(),
});
