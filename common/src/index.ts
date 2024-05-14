import { z, ZodError } from "zod";

export const bodySchema = z.object({
  username: z.string().min(5),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$])[A-Za-z\d@#$]+$/,
      "Password must contain at least one uppercase letter, one digit, and one of special character"
    ),
  email: z.string().email(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
});

export const loginSchema = z.object({
  username: z
    .string()
    .min(5, "your username should have at least more then 5 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$])[A-Za-z\d@#$]+$/,
      "Password must contain at least one uppercase letter, one digit, and one of special character"
    ),
});

export const createBloginput = z.object({
  Title: z.string(),
  content: z.string(),
  summary: z.string(),
  userId: z.number(),
});

export const updateBloginput = z.object({
  Title: z.string(),
  content: z.string(),
  summary: z.string(),
  id: z.number(),
});
export type Inputs = {
  id: number;
  name: string;
  placeholder: string;
  type: string;
  label: string;
};

export type CreateBlogInput = z.infer<typeof createBloginput>;
export type UpdateBloginput = z.infer<typeof updateBloginput>;
export type login = z.infer<typeof loginSchema>;
export type body = z.infer<typeof bodySchema>;
